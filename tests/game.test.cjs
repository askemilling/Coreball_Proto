/* npm install && npx playwright install chromium && npm test */
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..');const server=http.createServer((req,res)=>{const u=new URL(req.url,'http://localhost');let file=path.resolve(root,'.'+decodeURIComponent(u.pathname));if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}if(file===root||u.pathname.endsWith('/'))file=path.join(file,'index.html');try{res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;try{
 browser=await chromium.launch({headless:true,...(process.env.COREBALL_CHROMIUM?{executablePath:process.env.COREBALL_CHROMIUM}:{}),args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:393,height:852},deviceScaleFactor:3});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{const proto=(window.AudioContext||window.webkitAudioContext).prototype;const original=proto.createDynamicsCompressor;proto.createDynamicsCompressor=function(...args){const node=original.apply(this,args);const probe=this.createAnalyser();probe.fftSize=1024;node.connect(probe);window.audioProbe=probe;return node;};});await page.goto('http://127.0.0.1:'+server.address().port);await page.evaluate(()=>COREBALL_ART_READY);
 const result=await page.evaluate(()=>{
 const r={};r.wave1=gems.length===245&&gems.every(g=>g.hp===1&&g.t===0);endShot();r.wave2=wave===2&&gems.every(g=>g.hp===1&&g.t===0);reset();cash=1000;buy('damage');buy('size');buy('extra');r.upgrades=damage===2&&size>5&&extra===2;
 reset();let g=gems[0];g.x=180;g.y=200;gems=[g];balls=[{x:180,y:205,vx:0,vy:-5.6,live:true}];active=true;physics();r.collision=cleared===1;for(let i=0;i<120;i++)advanceEffects();r.loot=cash===1;
 reset();const bomb={x:100,y:100,t:0,hp:1,bomb:true,dead:false};gems=[bomb,{x:120,y:100,t:1,hp:2,dead:false}];destroy(bomb);for(let i=0;i<30;i++)advanceExplosions();r.chain=cleared===2;r.colors=[1,2,3,5,10,15,20,25].every((hp,t)=>jewelTier({hp})===t);r.mobile=document.body.scrollWidth===innerWidth&&DPR===2;r.compactSprites=COREBALL_JEWELS.flat().every(c=>c.width===64&&c.height===64);reset();return r;});
 
 const box=await page.locator('#game').boundingBox();
 for(const [edge,ox,dragX] of [['left',15,-40],['right',345,40]]){
  await page.evaluate(x=>{reset();gems=[];rails=[];gemLayerDirty=true;origin={x,y:451};},ox);
  const sx=box.x+180*box.width/360,sy=box.y+390*box.height/485;
  await page.mouse.move(sx,sy);await page.mouse.down();await page.mouse.move(sx+dragX*box.width/360,sy+40*box.height/485);
  const prediction=await page.evaluate(()=>shotDirection(aim));await page.mouse.up();
  const shot=await page.evaluate(()=>({active,vx:balls[0]?.vx,vy:balls[0]?.vy}));
  assert.equal(shot.active,true,edge+' launch');assert.ok(Math.abs(shot.vx/5.6-prediction.dx)<.001,edge+' preview matches shot');assert.ok(shot.vy<0,edge+' shoots upward');assert.ok(edge==='left'?shot.vx>0:shot.vx<0,edge+' can drag from screen centre');
 }
 await page.evaluate(()=>{reset();gems=[];rails=[];gemLayerDirty=true;});
 await page.mouse.move(box.x+box.width/2,box.y+box.height*.8);await page.mouse.down();
 await page.dispatchEvent('#game','pointercancel',{pointerId:1,isPrimary:true});await page.mouse.up();
 assert.equal(await page.evaluate(()=>active),false,'cancel does not launch');
 await page.locator('#soundtest').click();
 await page.waitForFunction(()=>window.COREBALL_AUDIO.diagnostics().ready,{timeout:10000});
 await page.waitForTimeout(2400);
 const diagnostics=await page.evaluate(()=>COREBALL_AUDIO.diagnostics());
 assert.equal(diagnostics.state,'running');assert.equal(diagnostics.lastError,'');for(const kind of ['crystal','bomb','upgrade'])assert.ok(diagnostics.counts[kind]>0,kind+' sample actually scheduled');
 // Check energy at the real output graph, rather than only inspecting play counters.
 const energy=await page.evaluate(async()=>{sound('upgrade');let peak=0;const data=new Float32Array(window.audioProbe.fftSize);for(let i=0;i<15;i++){await new Promise(r=>setTimeout(r,20));window.audioProbe.getFloatTimeDomainData(data);for(const x of data)peak=Math.max(peak,Math.abs(x));}return peak;});
 assert.ok(energy>.001,'audible nonzero signal reaches master output');
 const recovered=await page.evaluate(async()=>{let testContext;/* Find context through the analyser, then force an interruption. */testContext=window.audioProbe.context;await testContext.suspend();sound('upgrade');const before=COREBALL_AUDIO.diagnostics().counts.upgrade;await COREBALL_AUDIO.unlock();await new Promise(r=>setTimeout(r,100));return {state:testContext.state,before,after:COREBALL_AUDIO.diagnostics().counts.upgrade};});
 assert.equal(recovered.state,'running');assert.equal(recovered.after,recovered.before+1,'first sound survives asynchronous resume');
 console.log('PASS edge dragging, prediction, pointer cancellation, 3 decoded samples, nonzero audio output, resume recovery');console.log('Audio output peak',energy.toFixed(3));
 const retryPage=await browser.newPage();let rejectOnce=true;
 await retryPage.route('**/assets/audio/glass-break.wav',route=>{if(rejectOnce){rejectOnce=false;return route.fulfill({status:503,body:'temporarily unavailable'});}return route.continue();});
 await retryPage.goto('http://127.0.0.1:'+server.address().port);await retryPage.locator('#soundtest').click();
 await retryPage.waitForFunction(()=>COREBALL_AUDIO.diagnostics().lastError!=='');
 await retryPage.locator('#soundtest').click();await retryPage.waitForFunction(()=>COREBALL_AUDIO.diagnostics().ready);
 assert.equal(await retryPage.locator('#soundtest').getAttribute('data-audio-state'),'ready','failed sample can be retried');await retryPage.close();console.log('PASS recovery after failed audio download');

for(const [name,passed] of Object.entries(result))assert.equal(passed,true,name);assert.deepEqual(errors,[]);console.log('PASS',Object.keys(result).join(', '));
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
