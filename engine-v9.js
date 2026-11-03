
const files={"ball": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAFgklEQVR42u2dO24cMRBEpwlHTnUECT6GAKdy7hsoVajYsUOnewPlcirAxxDsI+gMcmAYMAztLsnpT3WzKt/ZIflYXeT8to2iKIqiKIqiKIqiqCSS1Tvg+uH1cu8xfnyWXwSIsKhqFaiEwBAoAgQIzCpACcEhSEsClBmaSjAJwSFISwC0AjgZQRKCQ5D2qBEeum85ByI4edyoER66UQkHIjg53agRHrpRaoAIT+7+E4LDkpbOgQhPnX4VwvNHHz9tP0d/8/S4Xa3uRLIiPDOwZIPKCyJZAR5LYJCB8oBIKsMTCQ4KSNYQSTV4kKBBgckSIqkCTwZwIkGygkiyw6MFzuHuZfg3t98uUoFkAVFqgGbhmYHFGioPiNIAZA3PDDjHoLm57x/w719fzGGyBkkbIqkGz5f3nYP7vP9ceoEaBSkTRFIBnl5oMsGUBaIUAFmBszJIcABlh0cTol6QKkAk2eCxAgfdjVAhgn0qIxKebdu2w4f9x7i5v+ha5fVsK6BulO4GyMJ9ouHRhKh3qyAKor3j1zLAU0G9EJ0DCQ0iqBLmHZg9XagXoh43QppkLYLalaUFEYoLwTgQovtYuJAWRCgu1DxpXS33ZINoZlzDHWhFeEYhQu6/5kHpdOlwzgHIqzPULBTqQKdmzwrwaE2mSBdqhId5yA2giKW71sVN9HPQyEMRZSzEgeg+dUpZs6BSq3P+zspIF/L8b6RNxt7xdneglZftFfsXZif63KyKcCGE/IVe6mHvB3rLzj0HNAoepDCtBpBW/tGw19tn28G1Pn6mMtYz7hAOdCw8ezsECjioV+xDAbIId1puUcF1osL0uwph8N/B7731ogowh7sXtWf0TQDKduNYNSeJ1vXD6+WpJzcau4iCz0DH6vFb5SvbMhZhOX8sBnjkIDoQRYAoUID45AV1jgM6EIVdwkYCNDWvqCBNB6IIEEWAKAJEESCKyg7Q6LuYqypLP9CBKAJEESCKAFEEiAGS7acDUaUAOvaG9XM3gq/qQrPtPtaf1h9toQNRdgB5fsCewlXapzJWK2MZ28sSRuEDNBukV3KhPe2MCtBpHKg6RJnbdxYgBmkGaGgH6n0xQFUX2tuuyBcruAKkUY+rQWTZHo/8A5OBRmZRFYg02hHtPt0AaeUgrVmRHSLr89fq555xbxwEnneJZfyMHWcbDM3zRShfIQBph7ssEHmdp1d4HgbIYz9odlahQ6R9fh7u0zveMnJQzde9WH1wBekNZxZgn4JH0316AWoWB2VIzR2WR8ZZRg+ewYUi3cgSHDT3CQfIAyIvkKwdxwsec4A8XUgTIguYvMrUudAc5T7bBvCm+qfH7crzG1f/D/oIUIi5xnvZruJAWUtZRqGWrqlVWNRMQtl1rQzPrJonrZY5YCV4opfukA7UM6tWgcgzNIdlIKss1LMyq5qLeiaIBTx7qkmL/PM9nVTNjTLCA1fCVoUoCh6IEmZZynrLWdaS1jsBrODRqB4N6WT2dF42N6oAj6oDWbpQJTeKBgcaICSIkGAadccs8JgAhAhRFEgzZTUTPGYAeUA0C5I1TLNZzGOVZZFTUwO0ByINqLSCu9cSPRVAnhBpguQpz70dq1WyWJ+493dXM4DkvSloeeFbPBoQ9fFeJJiidpKt75oQr4ZEfgE6EqTISxAet9yIZ4NQPiNuCRTKNSuv+7XEu2Go36KfgQr1AqfnzX4S0UBUiCrI+07RtkIjCU8xB6Ib1ZmQbeXGE54CABGi3P0maJ3CkpZrwjV2DuEp5UB0o1wTq7HTCE9ZB1rdjTJMIMnWqSuAlMl5JWsnVwQpY8mWCh2fGabsOU8qzeBMIFVZIJQCCBmoqivK0gBFArXKFsRSAFlBxf0qiqIoiqIoiqIoyke/AcXUHrHeCj2CAAAAAElFTkSuQmCC", "bomb": "data:image/png;base64,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"};const imgs={};for(const [k,url] of Object.entries(files)){let i=new Image();i.src=url;imgs[k]=i}
for(let t=0;t<8;t++)for(let v=0;v<4;v++){imgs['crystal'+t+'-'+v]=window.COREBALL_JEWELS[t][v];}const canvas=document.getElementById('game'),ctx=canvas.getContext('2d',{alpha:true});function displayScale(){const width=canvas.getBoundingClientRect().width||360;return Math.min(4.5,Math.max(1,(window.devicePixelRatio||1)*width/360));}const W=360,CEILING=42;function arenaHeight(){const r=canvas.getBoundingClientRect();return r.width&&r.height?W*r.height/r.width:485;}let H=arenaHeight(),FLOOR=H-24;let DPR=displayScale();canvas.width=Math.round(360*DPR);canvas.height=Math.round(H*DPR);ctx.setTransform(DPR,0,0,DPR,0,0);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';const $=id=>document.getElementById(id);const FAST_MULTIPLIER=4,FAST_IDLE_LIMIT_MS=10000;let fastForward=false,fastNoHitMs=0,spawnFramesRemaining=0;const tiers=[1,2,3,5,10,15,20,25],cols=['#8596ab','#ffffff','#32e8a6','#36caff','#b46bff','#ffb342','#ff4b82','#575575'];let superLevels={guns:0,saw:0,regen:0},pendingSuper=0,superPaused=false,shopOpen=false,projectiles=[];
let gems=[],balls=[],shards=[],coins=[],rings=[],rails=[],hp,wave,cleared,cash,damage,size,extra,dc,sc,ec,origin,aim,active,shotFrames,spawnSeed=0,ended=false,shake=0;const rand=(a,b)=>a+Math.random()*(b-a);const ri=(a,b)=>Math.floor(rand(a,b));
function blackLimit(){if(wave<70)return 0;if(wave<90)return 1;return Math.max(2,Math.floor((gems.filter(g=>!g.dead&&!g.boss).length+38)*(Math.min(5,2+(wave-90)*.08)/100)))}
function pickTier(){
// The opening waves contain ONLY grey 1-HP crystals.
if(wave<=2)return 0;
let choices=[0];
if(wave>=3)choices.push(1);
if(wave>=5)choices.push(2);
if(wave>=8)choices.push(3);
if(wave>=13)choices.push(4);
if(wave>=19)choices.push(5);
if(wave>=26)choices.push(6);
if(wave>=38&&gems.filter(g=>!g.dead&&g.t===7).length<blackLimit())choices.push(7);
const weights=[38,23,17,11,7,4,2,.12];
let total=choices.reduce((s,t)=>s+weights[t],0),z=Math.random()*total;
for(const t of choices){z-=weights[t];if(z<=0)return t}return 0;
}
function reward(t){return [1,2,3,5,8,12,18,25][t]}
function unlockAudio(){return window.COREBALL_AUDIO.unlock();}
function sound(kind){window.COREBALL_AUDIO.play(kind);}
function gemRadius(g){return g.boss?25:g.super?15:9;}
function currentBallRadius(){return size*(superLevels.saw?1.65:1);}
function launchY(){return FLOOR-currentBallRadius()-2;}
function railAboveLaunchZone(r){return r.y+Math.abs(Math.sin(r.angle))*r.len/2+6<FLOOR-64;}
function distanceToRail(x,y,rail){const ux=Math.cos(rail.angle),uy=Math.sin(rail.angle);const along=Math.max(-rail.len/2,Math.min(rail.len/2,(x-rail.x)*ux+(y-rail.y)*uy));return Math.hypot(x-rail.x-along*ux,y-rail.y-along*uy);}
function clearOfRails(x,y,g){return rails.every(r=>distanceToRail(x,y,r)>=gemRadius(g)+9);}
function freeGemPosition(x,y,g,ignore=null){const radius=gemRadius(g);return x>=radius+2&&x<=W-radius-2&&y>=CEILING+radius+2&&y<=FLOOR-radius-2&&clearOfRails(x,y,g)&&gems.every(other=>other===ignore||other.dead||Math.hypot(other.x-x,other.y-y)>=(g.boss||other.boss?gemRadius(other)+radius+2:14));}
function findGemPosition(lo,hi,g){lo=Math.max(lo,CEILING+gemRadius(g)+2);hi=Math.min(hi,FLOOR-gemRadius(g)-2);for(let k=0;k<500;k++){const x=rand(gemRadius(g)+2,W-gemRadius(g)-2),y=rand(lo,hi);if(freeGemPosition(x,y,g))return {x,y};}for(let y=lo;y<=hi;y+=3)for(let x=gemRadius(g)+2;x<=W-gemRadius(g)-2;x+=3)if(freeGemPosition(x,y,g))return {x,y};return null;}
function findRailSafePosition(lo,hi,g){lo=Math.max(lo,CEILING+gemRadius(g)+2);hi=Math.min(hi,FLOOR-gemRadius(g)-2);let best=null,bestClearance=-Infinity;for(let k=0;k<400;k++){const x=rand(gemRadius(g)+2,W-gemRadius(g)-2),y=rand(lo,hi);if(!clearOfRails(x,y,g))continue;let clearance=Infinity;for(const other of gems)if(!other.dead)clearance=Math.min(clearance,Math.hypot(other.x-x,other.y-y)-gemRadius(g)-gemRadius(other));if(clearance>bestClearance){bestClearance=clearance;best={x,y};}}return best;}
function addGems(n,lo,hi,emerging=false){const opening=wave===1;let added=0;for(let i=0;i<n;i++){const t=pickTier(),g={t,variant:ri(0,4),hp:tiers[t],bomb:Math.random()<.007,dead:false,cd:0,boss:false,emerge:emerging?18:0};const pos=findGemPosition(lo,hi,g)||findGemPosition(lo,opening?hi:Math.min(hi+45,FLOOR-12),g)||findRailSafePosition(lo,opening?hi:hi+45,g)||findRailSafePosition(lo,opening?hi:FLOOR-12,g);if(!pos)break;Object.assign(g,pos);gems.push(g);added++;}if(emerging&&added)spawnFramesRemaining=18;gemLayerDirty=true;return added;}
function relocateGem(g){let found=null;for(let radius=2;radius<=90&&!found;radius+=2)for(let k=0;k<24;k++){const angle=k*Math.PI/12,x=g.x+Math.cos(angle)*radius,y=g.y+Math.sin(angle)*radius;if(freeGemPosition(x,y,g,g)){found={x,y};break;}}if(!found){for(let y=CEILING+gemRadius(g)+2;y<FLOOR-gemRadius(g)-2&&!found;y+=4)for(let x=gemRadius(g)+2;x<W-gemRadius(g)-2;x+=4)if(freeGemPosition(x,y,g,g)){found={x,y};break;}}if(!found){let best=-Infinity;for(let y=CEILING+gemRadius(g)+2;y<FLOOR-gemRadius(g)-2;y+=5)for(let x=gemRadius(g)+2;x<W-gemRadius(g)-2;x+=5){if(!clearOfRails(x,y,g))continue;let clearance=Infinity;for(const other of gems)if(other!==g&&!other.dead)clearance=Math.min(clearance,Math.hypot(other.x-x,other.y-y)-gemRadius(other)-gemRadius(g));const score=clearance-Math.hypot(x-g.x,y-g.y)*.001;if(score>best){best=score;found={x,y};}}}if(found)Object.assign(g,found);return !!found;}
function resolveRailOverlaps(){for(const g of gems)if(!g.dead&&!clearOfRails(g.x,g.y,g))relocateGem(g);gemLayerDirty=true;}
function spawnBoss(){if(gems.some(g=>g.boss))return;const g={t:8,hp:100,bomb:false,dead:false,cd:0,boss:true};let pos=null;for(let y=CEILING+30;y<=CEILING+110&&!pos;y+=6){for(let offset=0;offset<=150&&!pos;offset+=10){for(const x of [180-offset,180+offset])if(clearOfRails(x,y,g)){pos={x,y};break;}}}if(!pos)pos=findGemPosition(CEILING+30,FLOOR-32,g);if(!pos)return;Object.assign(g,pos);gems.push(g);for(const other of gems){if(other===g||other.dead)continue;if(Math.hypot(other.x-g.x,other.y-g.y)<gemRadius(other)+gemRadius(g)+2)relocateGem(other);}rings.push({x:g.x,y:g.y,r:6,life:35});gemLayerDirty=true;}
function reset(){superLevels={guns:0,saw:0,regen:0};pendingSuper=0;superPaused=false;shopOpen=false;projectiles=[];$('shop').hidden=true;gemLayerDirty=true;fastForward=false;fastNoHitMs=0;spawnFramesRemaining=0;hp=100;wave=1;cleared=0;cash=0;damage=1;size=5;extra=1;dc=55;sc=100;ec=180;origin={x:180,y:launchY()};balls=[];shards=[];coins=[];rings=[];gems=[];rails=[{x:68,y:214,len:68,angle:-.28},{x:245,y:330,len:76,angle:.23}];rails=rails.filter(railAboveLaunchZone);aim=null;active=false;shotFrames=0;ended=false;shake=0;addGems(165,CEILING+12,252);$('over').style.display='none';update()}
const uiValues={};function textValue(id,value){if(uiValues[id]===value)return;uiValues[id]=value;$(id).textContent=value;}
function update(){for(const key of ['guns','saw','regen']){const n=superLevels[key];textValue(key+'level','LV '+n+' → '+(n+1)+' · +'+(n+1)+(key==='regen'?' HP / WAVE':' DMG'));}textValue('hp',hp);textValue('wave',wave);textValue('cleared',cleared);textValue('cash',cash);textValue('shopcash',cash);textValue('supercash',pendingSuper);for(const key of ['guns','saw','regen'])$('super'+key).disabled=pendingSuper<1||ended;const affordable=!ended&&(cash>=dc||(size<10&&cash>=sc)||(extra<8&&cash>=ec)||pendingSuper>0);$('openupgrade').classList.toggle('affordable',affordable);textValue('dmg',damage);if(uiValues.hpWidth!==hp){$('hpfill').style.width=hp+'%';uiValues.hpWidth=hp;}textValue('dc',dc+' ◆');textValue('sc',sc+' ◆');textValue('ec',ec+' ◆');for(const [id,cost] of [['damage',dc],['size',sc],['extra',ec]]){const disabled=cash<cost||(active&&!shopOpen)||ended||(id==='size'&&size>=10)||(id==='extra'&&extra>=8);if($(id).disabled!==disabled)$(id).disabled=disabled;}textValue('remaining',gems.filter(g=>!g.dead).length+' CRYSTALS'+(gems.some(g=>g.super&&!g.dead)?' · SUPER CRYSTAL!':gems.some(g=>g.boss)?' · GOLD BOSS!':''));textValue('status',active?(fastForward?'FAST FORWARD ×4':'IN FLIGHT'):spawnFramesRemaining?'CRYSTALS EMERGING':'READY');textValue('hint',active?'':spawnFramesRemaining?'CRYSTALS EMERGING':'DRAG ANYWHERE · RELEASE TO FIRE');const speed=$('fastforward');speed.disabled=!active;speed.setAttribute('aria-pressed',String(fastForward));textValue('fastforward',fastForward?'⚡ 4×':'⚡ »');}
function buy(type){unlockAudio();if((active&&!shopOpen)||ended||superPaused)return;let before=cash;if(type==='damage'&&cash>=dc){cash-=dc;damage++;dc=Math.ceil(dc*1.55)}if(type==='size'&&cash>=sc&&size<10){cash-=sc;size=Math.min(10,size+.7);sc=Math.ceil(sc*1.7)}if(type==='extra'&&cash>=ec&&extra<8){cash-=ec;extra=Math.min(8,extra+1);ec=Math.ceil(ec*1.9)}if(cash<before){if(!active)origin.y=launchY();sound('upgrade');}update()}
function toggleFastForward(){if(!active)return;fastForward=!fastForward;fastNoHitMs=0;update();}
$('fastforward').onclick=toggleFastForward;
$('damage').onclick=()=>buy('damage');$('size').onclick=()=>buy('size');$('extra').onclick=()=>buy('extra');$('soundtest').onclick=()=>window.COREBALL_AUDIO.preview();$('reset').onclick=reset;$('again').onclick=reset;
function coord(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}}
function aimPoint(p){return {x:origin.x+p.x-aim.startX,y:origin.y+p.y-aim.startY};}
const MIN_SHOT_ANGLE=2*Math.PI/180;
function shotDirection(p){let dx=origin.x-p.x,dy=origin.y-p.y;if(Math.hypot(dx,dy)<10){dx=0;dy=-1;}let mag=Math.hypot(dx,dy);dx/=mag;dy/=mag;if(dy>-Math.sin(MIN_SHOT_ANGLE)){dx=(dx<0?-1:1)*Math.cos(MIN_SHOT_ANGLE);dy=-Math.sin(MIN_SHOT_ANGLE);}return {dx,dy};}
canvas.addEventListener('pointerdown',e=>{unlockAudio();if(active||ended||superPaused||shopOpen||spawnFramesRemaining>0||aim||!e.isPrimary)return;const p=coord(e);canvas.setPointerCapture(e.pointerId);aim={x:origin.x,y:origin.y,startX:p.x,startY:p.y,pointerId:e.pointerId};});
canvas.addEventListener('pointermove',e=>{if(!aim||e.pointerId!==aim.pointerId)return;const p=aimPoint(coord(e));aim.x=p.x;aim.y=p.y;});
canvas.addEventListener('pointerup',e=>{if(!aim||active||ended||e.pointerId!==aim.pointerId)return;const p=aimPoint(coord(e)),{dx,dy}=shotDirection(p);balls=[];for(let i=0;i<extra;i++){let a=Math.max(-Math.PI+MIN_SHOT_ANGLE,Math.min(-MIN_SHOT_ANGLE,Math.atan2(dy,dx)+(i-(extra-1)/2)*.025));balls.push({x:origin.x,y:origin.y,vx:Math.cos(a)*5.6,vy:Math.sin(a)*5.6,live:true,last:0});}active=true;shotFrames=0;fastForward=false;fastNoHitMs=0;aim=null;update();});
canvas.addEventListener('pointercancel',e=>{if(aim&&e.pointerId===aim.pointerId)aim=null;});
canvas.addEventListener('lostpointercapture',e=>{if(aim&&e.pointerId===aim.pointerId)aim=null;});

function shardsAt(x,y,t,count=9){let color=cols[t];for(let i=0;i<count;i++){let a=rand(0,6.283),v=rand(1,4);shards.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rand(22,42),max:42,c:color,t,v:ri(0,4),angle:rand(0,6.28),spin:rand(-.2,.2),r:rand(1.5,4)})}if(shards.length>420)shards.splice(0,shards.length-420)}
function awardDestroyed(g){if(g.dead)return false;if(g.super){g.dead=true;gemLayerDirty=true;pendingSuper++;aim=null;rings.push({x:g.x,y:g.y,r:4,life:35});update();sound('upgrade');return true;}g.dead=true;gemLayerDirty=true;cleared++;rings.push({x:g.x,y:g.y,r:2,life:12,hit:true});shardsAt(g.x,g.y,g.boss?5:g.t,g.boss?35:11);coins.push({x:g.x,y:g.y,vx:rand(-1,1),vy:-rand(1,2),v:g.boss?250:reward(g.t),life:0});return true}
function hitGem(g,amount,fromBall=false){if(g.dead)return;g.hp-=amount;gemLayerDirty=true;fastNoHitMs=0;g.hitFlash=10;if(fromBall)g.cd=3;if(g.hp<=0)destroy(g);else{shardsAt(g.x,g.y,g.boss?5:jewelTier(g),3);rings.push({x:g.x,y:g.y,r:3,life:7,hit:true});}}
function detonate(g){rings.push({x:g.x,y:g.y,r:3,prev:0,max:74,speed:.9,life:90,explosion:true,affected:new Set()});shake=Math.max(shake,6);sound('bomb');}
function destroy(g){if(!awardDestroyed(g))return;if(g.bomb)detonate(g);else sound('crystal');}
function advanceExplosions(){for(const ring of [...rings]){if(!ring.explosion)continue;ring.prev=ring.r;ring.r=Math.min(ring.max,ring.r+ring.speed);ring.life--;if(!ring.affected)ring.affected=new Set();for(const g of gems){if(g.dead||ring.affected.has(g))continue;if(Math.hypot(g.x-ring.x,g.y-ring.y)<=ring.r+gemRadius(g)){ring.affected.add(g);hitGem(g,24);}}}}
function endShot(){projectiles=[];gemLayerDirty=true;active=false;fastForward=false;fastNoHitMs=0;balls=[];gems=gems.filter(g=>!g.dead);wave++;let lost=0;for(const g of gems){g.y+=30;if(g.y>FLOOR-(g.boss?24:9)){lost+=g.hp;g.dead=true;}}gems=gems.filter(g=>!g.dead);for(const rail of rails)rail.y+=15;rails=rails.filter(railAboveLaunchZone);if(wave%2===0&&rails.length<6){const x=rand(58,302),len=rand(45,85),angle=rand(-.6,.6);rails.push({x,y:CEILING+14+Math.abs(Math.sin(angle))*len/2,len,angle});}resolveRailOverlaps();hp=Math.min(100,Math.max(0,hp-lost)+superLevels.regen);if(hp===0){ended=true;$('over').style.display='flex';$('score').textContent=cleared+' CRYSTALS CLEARED';}else{if(wave===20)spawnBoss();addGems(Math.min(55,32+Math.floor(wave/3)),CEILING+12,CEILING+66,true);if(wave%10===0)spawnSuperCrystal();}update();}
function physics(){if(!active||superPaused||shopOpen)return;shotFrames++;advanceExplosions();advanceProjectiles();let live=0;for(const b of balls){if(!b.live)continue;if(superLevels.guns&&(b.gunFrames=(b.gunFrames||0)+1)>=60){b.gunFrames=0;for(const [vx,vy] of [[7,0],[-7,0],[0,7],[0,-7]])projectiles.push({x:b.x,y:b.y,vx,vy,damage:superLevels.guns,life:85});}const ballRadius=currentBallRadius();for(let sub=0;sub<2;sub++){b.x+=b.vx*.5;b.y+=b.vy*.5;if(b.x<ballRadius){b.x=ballRadius;b.vx=Math.abs(b.vx)}if(b.x>W-ballRadius){b.x=W-ballRadius;b.vx=-Math.abs(b.vx)}if(b.y<CEILING+ballRadius){b.y=CEILING+ballRadius;b.vy=Math.abs(b.vy)}if(b.vy>0&&b.y>=FLOOR-ballRadius){b.live=false;origin={x:Math.max(15,Math.min(345,b.x)),y:launchY()};break}for(const rail of rails){let ux=Math.cos(rail.angle),uy=Math.sin(rail.angle),nx=-uy,ny=ux,ax=rail.x-ux*rail.len/2,ay=rail.y-uy*rail.len/2;let along=(b.x-ax)*ux+(b.y-ay)*uy;let t=Math.max(0,Math.min(rail.len,along));let qx=ax+t*ux,qy=ay+t*uy;let dx=b.x-qx,dy=b.y-qy,dist=Math.hypot(dx,dy);let radius=ballRadius+3.5;if(dist<radius){let nxx=dist>.001?dx/dist:nx,nyy=dist>.001?dy/dist:ny;let dot=b.vx*nxx+b.vy*nyy;if(dot<0){b.vx-=2*dot*nxx;b.vy-=2*dot*nyy}b.x=qx+nxx*(radius+.7);b.y=qy+nyy*(radius+.7)}}for(const g of gems){if(g.dead||g.cd>0)continue;let dx=b.x-g.x,dy=b.y-g.y,dist2=dx*dx+dy*dy;if(dist2>(ballRadius+(g.boss?22:g.super?12:6.2))**2)continue;hitGem(g,damage+superLevels.saw,true);if(!g.dead){let dist=Math.sqrt(dist2)||1,nx=dx/dist,ny=dy/dist,dot=b.vx*nx+b.vy*ny;if(dot<0){b.vx-=2*dot*nx;b.vy-=2*dot*ny;b.x=g.x+nx*(ballRadius+(g.boss?23:g.super?13:7));b.y=g.y+ny*(ballRadius+(g.boss?23:g.super?13:7))}}break}}if(b.live)live++}for(const g of gems)if(g.cd>0)g.cd--;if(!live&&!projectiles.length&&!rings.some(r=>r.explosion)&&!superPaused)endShot()}
function image(name,x,y,w,h){const im=imgs[name];if(im&&(im instanceof HTMLCanvasElement||(im.complete&&im.naturalWidth)))ctx.drawImage(im,x,y,w,h)}
let gemLayerDirty=true;imgs.bomb.onload=()=>gemLayerDirty=true;
const gemLayer=document.createElement('canvas');gemLayer.width=canvas.width;gemLayer.height=canvas.height;
const gemCtx=gemLayer.getContext('2d');gemCtx.setTransform(DPR,0,0,DPR,0,0);gemCtx.imageSmoothingEnabled=true;gemCtx.imageSmoothingQuality='high';
function resizeRenderSurface(){const next=displayScale(),nextHeight=arenaHeight();if(Math.abs(next-DPR)<.01&&Math.abs(nextHeight-H)<.1)return;const previousFloor=FLOOR;H=nextHeight;FLOOR=H-24;const stretch=(FLOOR-CEILING)/(previousFloor-CEILING);for(const list of [gems,rails,balls,shards,coins,rings,projectiles])for(const item of list)item.y=CEILING+(item.y-CEILING)*stretch;for(const g of gems)if(!g.dead)g.y=Math.max(CEILING+gemRadius(g)+2,Math.min(FLOOR-gemRadius(g)-2,g.y));if(origin)origin.y=launchY();aim=null;rails=rails.filter(railAboveLaunchZone);resolveRailOverlaps();DPR=next;canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR);ctx.setTransform(DPR,0,0,DPR,0,0);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';gemLayer.width=canvas.width;gemLayer.height=canvas.height;gemCtx.setTransform(DPR,0,0,DPR,0,0);gemCtx.imageSmoothingEnabled=true;gemCtx.imageSmoothingQuality='high';gemLayerDirty=true;}
window.addEventListener('resize',resizeRenderSurface);
if('ResizeObserver' in window){const renderObserver=new ResizeObserver(resizeRenderSurface);renderObserver.observe(canvas);}
window.COREBALL_ART_READY.then(()=>gemLayerDirty=true);
function jewelTier(g){return Math.max(0,tiers.findIndex(h=>g.hp<=h));}
function rebuildGemLayer(){
 gemCtx.clearRect(0,0,W,H);
 for(const g of gems){if(g.dead||g.boss||g.super||g.emerge>0)continue;const s=g.bomb?19:18;const im=imgs[g.bomb?'bomb':'crystal'+jewelTier(g)+'-'+g.variant];if(im&&(im instanceof HTMLCanvasElement||(im.complete&&im.naturalWidth)))gemCtx.drawImage(im,g.x-s/2,g.y-s/2,s,s);}
 gemLayerDirty=false;
}
const railTexture=new Image();railTexture.src='./assets/rail-v9.svg';
const orbTexture=new Image();orbTexture.src='./assets/orb-v9.png';
const perfMode=new URLSearchParams(location.search).has('perf');
let perfOutput=null,frameSamples=[],cpuSamples=[],lastSample=0,lastRender=0;
if(perfMode){perfOutput=document.createElement('output');perfOutput.id='performance';perfOutput.style='display:block;position:fixed;bottom:4px;left:4px;z-index:99;background:#000c;color:#bff;padding:5px;font:11px monospace;pointer-events:none';document.body.append(perfOutput);}
function drawOrb(x,y,r){if(superLevels.saw)drawSaw(x,y,r);const im=orbTexture.complete&&orbTexture.naturalWidth?orbTexture:imgs.ball;if(im.complete&&im.naturalWidth)ctx.drawImage(im,x-r*1.7,y-r*1.7,r*3.4,r*3.4);}
function render(t){
 ctx.clearRect(0,0,W,H);ctx.save();
 if(shake>.3)ctx.translate(Math.sin(t*.11)*shake,Math.cos(t*.14)*shake);
 if(gemLayerDirty)rebuildGemLayer();ctx.drawImage(gemLayer,0,0,W,H);
 for(const rail of rails){ctx.save();ctx.translate(rail.x,rail.y);ctx.rotate(rail.angle);if(railTexture.complete&&railTexture.naturalWidth)ctx.drawImage(railTexture,-rail.len/2,-6,rail.len,12);else{ctx.fillStyle='#8aeaff';ctx.fillRect(-rail.len/2,-3,rail.len,6);}ctx.restore();}
 for(const g of gems){if(g.dead)continue;if(g.super){drawSuperCrystal(g,t);continue;}if(g.emerge>0&&!g.boss){const u=1-g.emerge/18,eased=1-(1-u)**3,y=CEILING+10+(g.y-CEILING-10)*eased,sz=g.bomb?19:18;ctx.globalAlpha=Math.min(1,u*4);image(g.bomb?'bomb':'crystal'+jewelTier(g)+'-'+g.variant,g.x-sz/2,y-sz/2,sz,sz);ctx.globalAlpha=1;}if(g.boss){const im=imgs['crystal5-3'];ctx.drawImage(im,g.x-25,g.y-25,50,50);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='bold 12px system-ui';ctx.fillText(g.hp,g.x,g.y+4);}else if(g.hitFlash>0){ctx.globalAlpha=g.hitFlash/15;ctx.fillStyle='#effaff';ctx.beginPath();ctx.arc(g.x,g.y,7+g.hitFlash*.25,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;}}
 // Sparse small highlights, rather than 245 glowing crosses each frame.
 for(let i=0;i<4;i++){const g=gems[(Math.floor(t/900)*13+i*59)%gems.length];if(!g||g.dead||g.bomb)continue;const pulse=Math.sin(t*.006+i*1.7);if(pulse>.7){ctx.globalAlpha=(pulse-.7)*2;ctx.fillStyle='#eafaff';ctx.fillRect(g.x-2,g.y-3,4,.65);ctx.fillRect(g.x-.3,g.y-5,.65,4);}}ctx.globalAlpha=1;
 for(const r of rings){ctx.globalAlpha=r.explosion?Math.min(1,r.life/12):Math.min(1,r.life/(r.hit?10:18));ctx.strokeStyle=r.explosion?'#ffb95b':'#d1efff';ctx.lineWidth=r.explosion?2:1;ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.stroke();if(r.explosion){ctx.globalAlpha*=.35;ctx.lineWidth=6;ctx.stroke();}}
 for(const s of shards){ctx.save();ctx.globalAlpha=Math.min(1,s.life/18);ctx.translate(s.x,s.y);ctx.rotate(s.angle);image('crystal'+s.t+'-'+s.v,-s.r,-s.r,s.r*2,s.r*2);ctx.restore();}ctx.globalAlpha=1;
 for(const c of coins){ctx.fillStyle='#ffe2a0';ctx.beginPath();ctx.moveTo(c.x,c.y-3);ctx.lineTo(c.x+2,c.y);ctx.lineTo(c.x,c.y+3);ctx.lineTo(c.x-2,c.y);ctx.fill();}
 drawProjectiles();for(const b of balls){if(!b.live)continue;for(let trail=4;trail>0;trail--){ctx.globalAlpha=.13*(1-trail/5);ctx.fillStyle='#67ceff';ctx.beginPath();ctx.arc(b.x-b.vx*trail,b.y-b.vy*trail,size*(1-trail/6),0,7);ctx.fill();}ctx.globalAlpha=1;drawOrb(b.x,b.y,size);}
 if(!active){drawOrb(origin.x,origin.y,size);if(aim){const {dx,dy}=shotDirection(aim);ctx.setLineDash([2,6]);ctx.strokeStyle='#b7eaff';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(origin.x,origin.y);ctx.lineTo(origin.x+dx*140,origin.y+dy*140);ctx.stroke();ctx.setLineDash([]);}}
 ctx.restore();
}
function advanceEffects(){
 if(spawnFramesRemaining>0)spawnFramesRemaining--;
 for(const g of gems)if(g.emerge>0){g.emerge--;if(g.emerge===0)gemLayerDirty=true;}

 if(shake>0)shake*=.76;
 for(const g of gems)if(g.hitFlash>0)g.hitFlash--;
 for(const r of rings)if(!r.explosion){r.r+=r.hit?1.5:3;r.life--;}
 rings=rings.filter(r=>r.life>0);
 for(const s of shards){s.x+=s.vx;s.y+=s.vy;s.vx*=.98;s.vy=s.vy*.98+.025;s.angle+=s.spin;s.life--;}
 shards=shards.filter(s=>s.life>0);
 for(const c of coins){c.life++;const dx=325-c.x,dy=-45-c.y;c.x+=dx*.065;c.y+=dy*.065;if(Math.hypot(dx,dy)<16||c.life>110){c.dead=true;cash+=c.v;}}
 coins=coins.filter(c=>!c.dead);
}

const UPDATE_RESUME_KEY='coreball-update-resume-v1';
let waitingVersion=null,checkingVersion=false,installingVersion=false;
function saveForUpdate(){
 const data={schema:1,savedAt:Date.now(),floor:FLOOR,hp,wave,cleared,cash,damage,size,extra,dc,sc,ec,origin,gems:gems.filter(g=>!g.dead),rails,coins,superLevels,pendingSuper,ended};
 sessionStorage.setItem(UPDATE_RESUME_KEY,JSON.stringify(data));
}
function resumeAfterUpdate(){
 try{
  const raw=sessionStorage.getItem(UPDATE_RESUME_KEY);if(!raw)return;
  const data=JSON.parse(raw);
  if(data.schema!==1||Date.now()-data.savedAt>300000||!['hp','wave','cleared','cash','damage','size','extra','dc','sc','ec','floor'].every(k=>Number.isFinite(data[k]))||!Array.isArray(data.gems)||!Array.isArray(data.rails)||!data.superLevels)return;
  ({hp,wave,cleared,cash,damage,size,extra,dc,sc,ec,origin,gems,rails,coins,superLevels,pendingSuper,ended}=data);
  const scale=(FLOOR-CEILING)/(data.floor-CEILING);
  for(const list of [gems,rails,coins])for(const item of list)item.y=CEILING+(item.y-CEILING)*scale;
  rails=rails.filter(railAboveLaunchZone);resolveRailOverlaps();origin.y=launchY();active=false;aim=null;shopOpen=false;superPaused=false;
  if(ended){$('over').style.display='flex';$('score').textContent=cleared+' CRYSTALS CLEARED';}
  gemLayerDirty=true;update();
 }catch(error){/* A failed restore must leave the reset game usable. */reset();}
 finally{try{sessionStorage.removeItem(UPDATE_RESUME_KEY);}catch(error){}}
}
async function checkForUpdate(){
 if(checkingVersion||waitingVersion||document.hidden)return;
 checkingVersion=true;
 try{
  const url=new URL('./index.html',location.href);url.searchParams.set('_update',Date.now());
  const response=await fetch(url,{cache:'no-store'});if(!response.ok)return;
  const html=await response.text(),match=html.match(/<title>COREBALL[^<]*V(\d+\.\d+)<\/title>/i),current=document.title.match(/V(\d+\.\d+)/);
  if(match&&current){const parts=match[1].split('.').map(Number),old=current[1].split('.').map(Number);if(parts[0]>old[0]||(parts[0]===old[0]&&parts[1]>old[1])){waitingVersion=match[1];textValue('update-notice','UPDATE READY · INSTALLING BETWEEN SHOTS');$('update-notice').hidden=false;}}
 }catch(error){/* Keep playing when offline. */}
 finally{checkingVersion=false;}
}
function installWaitingUpdate(){
 if(!waitingVersion||installingVersion||active||shopOpen||aim||spawnFramesRemaining||coins.length||rings.some(r=>r.explosion))return false;
 try{saveForUpdate();}catch(error){return false;}
 installingVersion=true;const url=new URL(location.href);url.searchParams.set('v',waitingVersion);location.replace(url.href);return true;
}
window.addEventListener('pageshow',checkForUpdate);
window.addEventListener('focus',checkForUpdate);
document.addEventListener?.('visibilitychange',()=>{if(!document.hidden)checkForUpdate();});
setInterval(checkForUpdate,60000);

let last=0,acc=0;
function stepWorld(elapsed){if(superPaused||shopOpen){acc=0;return;}acc+=Math.min(50,elapsed);if(fastForward&&active&&!document.hidden)fastNoHitMs+=Math.min(250,elapsed);let n=0;while(acc>=16.67&&n<3){const steps=fastForward?FAST_MULTIPLIER:1;for(let k=0;k<steps;k++){if(k>0&&!active)break;physics();advanceEffects();}acc-=16.67;n++;}if(fastForward&&active&&fastNoHitMs>=FAST_IDLE_LIMIT_MS)endShot();}
function frame(t){const cpuStart=performance.now();const elapsed=last?t-last:16.67;last=t;stepWorld(elapsed);if(installWaitingUpdate())return;
if(t-lastRender>=15){render(t);if(perfMode&&lastRender)frameSamples.push(t-lastRender);lastRender=t;}
if(t-lastSample>=100){update();lastSample=t;}
if(perfMode){cpuSamples.push(performance.now()-cpuStart);if(frameSamples.length>=120){const sorted=frameSamples.slice().sort((a,b)=>a-b);const cpu=cpuSamples.slice().sort((a,b)=>a-b);perfOutput.textContent='120 frames: '+(1000/(frameSamples.reduce((a,b)=>a+b)/frameSamples.length)).toFixed(1)+' FPS | p95 '+sorted[Math.floor(sorted.length*.95)].toFixed(1)+'ms | CPU p95 '+cpu[Math.floor(cpu.length*.95)].toFixed(1)+'ms | '+gems.filter(g=>!g.dead).length+' gems';frameSamples=[];cpuSamples=[];}}
requestAnimationFrame(frame);}reset();resumeAfterUpdate();requestAnimationFrame(frame);

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.getRegistrations().then(rs=>Promise.all(rs.map(r=>r.unregister()))).catch(()=>{}));}


function powerColor(level){return cols[Math.min(cols.length-1,Math.max(0,level-1))];}
function spawnSuperCrystal(){const g={super:true,t:4,variant:0,hp:15,maxHp:15,dead:false,cd:0,boss:false,emerge:0};const pos=findGemPosition(CEILING+20,CEILING+100,g)||findRailSafePosition(CEILING+20,CEILING+100,g);if(pos){Object.assign(g,pos);gems.push(g);gemLayerDirty=true;}}
function advanceProjectiles(){for(const p of projectiles){p.x+=p.vx;p.y+=p.vy;p.life--;if(p.x<0||p.x>W||p.y<CEILING||p.y>FLOOR){p.life=0;continue;}for(const g of gems){if(g.dead)continue;if(Math.hypot(p.x-g.x,p.y-g.y)<gemRadius(g)+4){hitGem(g,p.damage);p.life=0;break;}}}projectiles=projectiles.filter(p=>p.life>0);}
function drawProjectiles(){ctx.save();ctx.lineCap='round';for(const p of projectiles){const color=powerColor(p.damage);ctx.shadowColor=color;ctx.shadowBlur=9;ctx.strokeStyle=color;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(p.x-p.vx*1.6,p.y-p.vy*1.6);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.shadowBlur=0;ctx.strokeStyle='#ffffff';ctx.lineWidth=1.4;ctx.stroke();}ctx.restore();}
function drawSaw(x,y,r){ctx.save();ctx.translate(x,y);ctx.rotate(shotFrames*.12);ctx.shadowColor=powerColor(superLevels.saw);ctx.shadowBlur=5;ctx.fillStyle=powerColor(superLevels.saw);ctx.strokeStyle='#eef4ff';ctx.lineWidth=.6;ctx.beginPath();for(let i=0;i<48;i++){const a=i*Math.PI/24,rr=r*(i%2?1.30:1.65);ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}
function drawSuperCrystal(g,t){
 ctx.save();ctx.translate(g.x,g.y);
 const pulse=Math.sin(t*.006),glow=ctx.createRadialGradient(0,0,3,0,0,31);
 glow.addColorStop(0,'#fff3ffbb');glow.addColorStop(.4,'#d778ff66');glow.addColorStop(1,'#b83cff00');
 ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,31+pulse*2,0,Math.PI*2);ctx.fill();
 const fraction=Math.max(0,Math.min(1,g.hp/(g.maxHp||15)));
 ctx.strokeStyle='#d4a0ff25';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,21,0,Math.PI*2);ctx.stroke();
 if(fraction>0){ctx.strokeStyle='#f0caff';ctx.shadowColor='#d069ff';ctx.shadowBlur=8;ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.arc(0,0,21,-Math.PI/2,-Math.PI/2+Math.PI*2*fraction);ctx.stroke();}
 ctx.shadowColor='#dc90ff';ctx.shadowBlur=12+pulse*3;
 const gem=imgs['crystal4-3'];if(gem&&(gem instanceof HTMLCanvasElement||(gem.complete&&gem.naturalWidth)))ctx.drawImage(gem,-15,-15,30,30);
 ctx.shadowBlur=0;ctx.fillStyle='#ffffff';ctx.font='700 8px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.strokeStyle='#180b32';ctx.lineWidth=2;ctx.strokeText(String(Math.max(0,g.hp)),0,0);ctx.fillText(String(Math.max(0,g.hp)),0,0);
 ctx.restore();
}
$('openupgrade').onclick=()=>{if(ended||superPaused)return;aim=null;shopOpen=true;$('shop').hidden=false;update();};
$('closeshop').onclick=()=>{shopOpen=false;$('shop').hidden=true;};
for(const key of ['guns','saw','regen'])$('super'+key).onclick=()=>{if(!pendingSuper||ended||!shopOpen)return;superLevels[key]++;if(!active)origin.y=launchY();pendingSuper--;superPaused=false;sound('upgrade');update();};
