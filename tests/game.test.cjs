/* npm install && npx playwright install chromium && npm test */
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'..');const server=http.createServer((req,res)=>{const u=new URL(req.url,'http://localhost');let file=path.resolve(root,'.'+decodeURIComponent(u.pathname));if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}if(file===root||u.pathname.endsWith('/'))file=path.join(file,'index.html');try{res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;try{
 browser=await chromium.launch({headless:true,...(process.env.COREBALL_CHROMIUM?{executablePath:process.env.COREBALL_CHROMIUM}:{}),args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:393,height:852},deviceScaleFactor:3});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.evaluate(()=>COREBALL_ART_READY);
 const result=await page.evaluate(()=>{
 const r={};r.wave1=gems.length===245&&gems.every(g=>g.hp===1&&g.t===0);endShot();r.wave2=wave===2&&gems.every(g=>g.hp===1&&g.t===0);reset();cash=1000;buy('damage');buy('size');buy('extra');r.upgrades=damage===2&&size>5&&extra===2;
 reset();let g=gems[0];g.x=180;g.y=200;gems=[g];balls=[{x:180,y:205,vx:0,vy:-5.6,live:true}];active=true;physics();r.collision=cleared===1;for(let i=0;i<120;i++)advanceEffects();r.loot=cash===1;
 reset();const bomb={x:100,y:100,t:0,hp:1,bomb:true,dead:false};gems=[bomb,{x:120,y:100,t:1,hp:2,dead:false}];destroy(bomb);for(let i=0;i<30;i++)advanceExplosions();r.chain=cleared===2;r.colors=[1,2,3,5,10,15,20,25].every((hp,t)=>jewelTier({hp})===t);r.mobile=document.body.scrollWidth===innerWidth&&DPR===2;r.compactSprites=COREBALL_JEWELS.flat().every(c=>c.width===64&&c.height===64);reset();return r;});
 for(const [name,passed] of Object.entries(result))assert.equal(passed,true,name);assert.deepEqual(errors,[]);console.log('PASS',Object.keys(result).join(', '));
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
