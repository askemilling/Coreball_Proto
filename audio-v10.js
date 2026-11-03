/* COREBALL sample playback. Resume is gesture-backed; first sounds wait for readiness. */
(()=>{
 const files={crystal:'./assets/audio/glass-break.wav',bomb:'./assets/audio/bomb-blast.wav',upgrade:'./assets/audio/upgrade-reward.wav'};
 let ctx=null,master=null,compressor=null,decodeJob=null,unlocked=false,silentMedia=null,lastError='',pending=[];
 const buffers={},active=new Set(),lastPlayed={crystal:-Infinity,bomb:-Infinity};
 const limits={crystal:.075,bomb:.055};
 const volumes={crystal:.22,bomb:.72,upgrade:.62};
 const counts={crystal:0,bomb:0,upgrade:0};
 function requestSample(url){return fetch(url).then(r=>{if(!r.ok)throw Error('Audio HTTP '+r.status);return r.arrayBuffer();}).catch(error=>{lastError=error.message;return null;});}
 const requests=Object.fromEntries(Object.entries(files).map(([kind,url])=>[kind,requestSample(url)]));
 function decodeSamples(){const job=Promise.all(Object.entries(requests).map(async([kind,request])=>{const raw=await request;if(!raw)throw Error('Could not load '+kind+' audio');buffers[kind]=await ctx.decodeAudioData(raw.slice(0));}));job.catch(()=>{});return job;}
 function label(ready){const b=document.getElementById('soundtest');if(b){b.textContent=lastError?'♫ RETRY SOUND':'♫ SOUND';b.dataset.audioState=ready?'ready':lastError?'error':'locked';b.title=ready?'Sound ready — tap to preview':lastError||'Tap to enable and test sound';b.setAttribute('aria-label',ready?'Preview game sounds':'Enable game sounds');}}
 function stopVoices(){for(const source of active)try{source.stop();}catch{}active.clear();}
 function makeContext(){
  const Constructor=window.AudioContext||window.webkitAudioContext;
  if(!Constructor)throw Error('Web Audio is unavailable');
  ctx=new Constructor({latencyHint:'interactive'});master=ctx.createGain();master.gain.value=.85;
  compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-9;compressor.knee.value=12;compressor.ratio.value=4;compressor.attack.value=.003;compressor.release.value=.15;
  master.connect(compressor);compressor.connect(ctx.destination);
  decodeJob=decodeSamples();

 }
 function playNow(kind){
  if(!unlocked||!ctx||ctx.state!=='running'||!buffers[kind]||document.hidden)return false;
  const now=ctx.currentTime;
  if(limits[kind]&&now-lastPlayed[kind]<limits[kind])return false;
  if(kind==='crystal'&&active.size>=12)return false;
  lastPlayed[kind]=now;
  const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffers[kind];
  source.playbackRate.value=kind==='crystal'?.94+Math.random()*.12:kind==='bomb'?.97+Math.random()*.05:1;
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
  if(!files[kind])return;
  if(!unlocked||!ctx||ctx.state!=='running'||!buffers[kind]){pending.push({kind,at:performance.now()});pending=pending.slice(-4);return;}
  playNow(kind);
 }
 let previewTimer=[];
 async function preview(){previewTimer.forEach(clearTimeout);previewTimer=[];pending=[];if(lastError&&ctx){for(const [kind,url] of Object.entries(files))requests[kind]=requestSample(url);decodeJob=decodeSamples();}if(!await unlock())return;playNow('upgrade');previewTimer.push(setTimeout(()=>playNow('crystal'),1150),setTimeout(()=>playNow('bomb'),2050));}
 for(const event of ['pointerdown','touchstart','touchend','keydown'])document.addEventListener(event,()=>{unlock();},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){pending=[];stopVoices();previewTimer.forEach(clearTimeout);previewTimer=[];if(silentMedia)silentMedia.pause();}});
 window.COREBALL_AUDIO={unlock,play,preview,diagnostics:()=>({state:ctx?.state||'locked',ready:unlocked,loaded:Object.keys(buffers),active:active.size,counts:{...counts},lastError})};
})();
