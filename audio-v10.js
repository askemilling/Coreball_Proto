/* COREBALL sample playback. Resume is gesture-backed; first sounds wait for readiness. */
(()=>{
 const files={crystal:'./assets/audio/glass-break.wav',bomb:'./assets/audio/bomb-blast.wav',upgrade:'./assets/audio/upgrade-reward.wav'};
 let ctx=null,master=null,compressor=null,decodeJob=null,unlocked=false,silentMedia=null,lastError='',pending=[];
 const buffers={},active=new Set(),lastPlayed={crystal:-Infinity,bomb:-Infinity};
 const limits={crystal:.075,bomb:.055,hit:.055,superupgrade:.18};
 const volumes={crystal:.22,bomb:.72,upgrade:.62,hit:.35,superupgrade:.65};
 const counts={crystal:0,bomb:0,upgrade:0,hit:0,superupgrade:0};
 const generatedKinds=['hit','superupgrade'];
 function requestSample(url){return fetch(url).then(r=>{if(!r.ok)throw Error('Audio HTTP '+r.status);return r.arrayBuffer();}).catch(error=>{lastError=error.message;return null;});}
 const requests=Object.fromEntries(Object.entries(files).map(([kind,url])=>[kind,requestSample(url)]));
 function decodeSamples(){const job=Promise.all(Object.entries(requests).map(async([kind,request])=>{const raw=await request;if(!raw)throw Error('Could not load '+kind+' audio');buffers[kind]=await ctx.decodeAudioData(raw.slice(0));}));job.catch(()=>{});return job;}
 function label(ready){const b=document.getElementById('soundtest');if(b){b.textContent=lastError?'♫ RETRY SOUND':'♫ SOUND';b.dataset.audioState=ready?'ready':lastError?'error':'locked';b.title=ready?'Sound ready — tap to preview':lastError||'Tap to enable and test sound';b.setAttribute('aria-label',ready?'Preview game sounds':'Enable game sounds');}}
 function stopVoices(){for(const source of active)try{source.stop();}catch{}active.clear();}

 function makeSyntheticSamples(){
  const sr=ctx.sampleRate;
  const crack=ctx.createBuffer(1,Math.ceil(sr*.19),sr),shell=crack.getChannelData(0);let seed=8731,previous=0;
  for(let i=0;i<shell.length;i++){
   const t=i/sr;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const noise=seed/2147483648-1,high=noise-previous*.82;previous=noise;
   let clicks=0;for(const [at,level,decay] of [[0,1,.006],[.017,.66,.009],[.043,.42,.012],[.078,.23,.015]])if(t>=at)clicks+=level*Math.exp(-(t-at)/decay);
   const shellTone=Math.sin(2*Math.PI*1840*t)*Math.exp(-t/0.028)+.35*Math.sin(2*Math.PI*3170*t)*Math.exp(-t/.018);
   shell[i]=Math.tanh(high*clicks*.45+shellTone*.13)*.75;
  }
  buffers.hit=crack;
  const reward=ctx.createBuffer(1,Math.ceil(sr*1.85),sr),song=reward.getChannelData(0),notes=[523.25,659.25,783.99,1046.5,1318.51,1567.98];
  for(let i=0;i<song.length;i++){
   const t=i/sr;let value=0;
   for(let n=0;n<notes.length;n++){const u=t-n*.095;if(u<0)continue;const env=(1-Math.exp(-u/.003))*Math.exp(-u/(.48+n*.035));value+=env*(Math.sin(2*Math.PI*notes[n]*u)+.22*Math.sin(2*Math.PI*notes[n]*2.76*u)*Math.exp(-u/.18))*.105;}
   const chord=(Math.sin(2*Math.PI*261.63*t)+.6*Math.sin(2*Math.PI*329.63*t)+.5*Math.sin(2*Math.PI*392*t))*(1-Math.exp(-t/.025))*Math.exp(-t/.42)*.1;
   const sparkle=Math.sin(2*Math.PI*3135.96*t)*Math.sin(2*Math.PI*7*t)*(1-Math.exp(-t/.12))*Math.exp(-t/.5)*.025;
   song[i]=Math.tanh((value+chord+sparkle)*1.35)*Math.min(1,(1.85-t)/.12);
  }
  buffers.superupgrade=reward;
 }

 function makeContext(){
  const Constructor=window.AudioContext||window.webkitAudioContext;
  if(!Constructor)throw Error('Web Audio is unavailable');
  ctx=new Constructor({latencyHint:'interactive'});master=ctx.createGain();master.gain.value=.85;
  compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-9;compressor.knee.value=12;compressor.ratio.value=4;compressor.attack.value=.003;compressor.release.value=.15;
  master.connect(compressor);compressor.connect(ctx.destination);
  makeSyntheticSamples();decodeJob=decodeSamples();

 }
 function playNow(kind){
  if(!unlocked||!ctx||ctx.state!=='running'||!buffers[kind]||document.hidden)return false;
  const now=ctx.currentTime;
  if(limits[kind]&&now-lastPlayed[kind]<limits[kind])return false;
  if((kind==='crystal'||kind==='hit')&&active.size>=12)return false;
  lastPlayed[kind]=now;
  const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffers[kind];
  source.playbackRate.value=(kind==='crystal'||kind==='hit')?.94+Math.random()*.12:kind==='bomb'?.97+Math.random()*.05:1;
  gain.gain.value=volumes[kind];source.connect(gain);gain.connect(master);active.add(source);
  source.onended=()=>{active.delete(source);source.disconnect();gain.disconnect();};
  source.start();counts[kind]++;return true;
 }
 function flush(){const queue=pending;pending=[];for(const item of queue)if(performance.now()-item.at<900)playNow(item.kind);}
 function unlock(){
  try{
   // The playback category lets iOS route game audio as media, including with Silent Mode.
   let hasPlaybackSession=false;
   try{if(navigator.audioSession){navigator.audioSession.type='playback';hasPlaybackSession=true;}}catch{}
   if(!hasPlaybackSession){
    if(!silentMedia){silentMedia=document.createElement('audio');silentMedia.src='./assets/audio/unlock.wav';silentMedia.loop=true;silentMedia.preload='auto';silentMedia.setAttribute('playsinline','');silentMedia.setAttribute('aria-hidden','true');silentMedia.style.display='none';document.body.append(silentMedia);}
    if(silentMedia.paused){const playing=silentMedia.play();if(playing)playing.catch(()=>{});}
   }
   if(!ctx||ctx.state==='closed'){stopVoices();decodeJob=null;unlocked=false;makeContext();}
   // Invoke synchronously in the gesture, then await the promise before playing anything.
   const resumed=ctx.resume();
   const oneFrame=ctx.createBufferSource();oneFrame.buffer=ctx.createBuffer(1,1,ctx.sampleRate);oneFrame.connect(ctx.destination);oneFrame.start();oneFrame.onended=()=>oneFrame.disconnect();
   return Promise.all([resumed,decodeJob]).then(()=>{unlocked=ctx.state==='running';if(unlocked){lastError='';flush();}label(unlocked);return unlocked;}).catch(error=>{lastError=error.message;unlocked=false;label(false);return false;});
  }catch(error){lastError=error.message;label(false);return Promise.resolve(false);}
 }
 function play(kind){
  if(!files[kind]&&!generatedKinds.includes(kind))return;
  if(!unlocked||!ctx||ctx.state!=='running'||!buffers[kind]){pending.push({kind,at:performance.now()});pending=pending.slice(-4);return;}
  playNow(kind);
 }
 let previewTimer=[];
 async function preview(){previewTimer.forEach(clearTimeout);previewTimer=[];pending=[];if(lastError&&ctx){for(const [kind,url] of Object.entries(files))requests[kind]=requestSample(url);decodeJob=decodeSamples();}if(!await unlock())return;playNow('superupgrade');previewTimer.push(setTimeout(()=>playNow('hit'),1900),setTimeout(()=>playNow('crystal'),2350),setTimeout(()=>playNow('bomb'),3050));}
 for(const event of ['pointerdown','touchstart','touchend','keydown'])document.addEventListener(event,()=>{unlock();},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){pending=[];stopVoices();previewTimer.forEach(clearTimeout);previewTimer=[];if(silentMedia)silentMedia.pause();}});
 window.COREBALL_AUDIO={unlock,play,preview,diagnostics:()=>({state:ctx?.state||'locked',ready:unlocked,loaded:Object.keys(buffers),active:active.size,counts:{...counts},lastError})};
})();
