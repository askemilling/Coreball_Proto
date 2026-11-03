/* COREBALL gemstone sprite renderer — 32 prerendered high-DPI glass jewels */
(function(){
const palettes=[
['#f8fcff','#7bd8ff','#276bde','#0b226a'],
['#ffffff','#d9e8ff','#8b9dff','#243b96'],
['#c3ffe6','#1af0bc','#008c85','#003b5c'],
['#d4f9ff','#20caff','#1467ff','#10297b'],
['#f5c9ff','#e24cff','#8a1ae0','#321166'],
['#fff6bb','#ffca48','#f18419','#69310c'],
['#ffd8f4','#ff69b8','#e21d80','#690b56'],
['#ddd4ff','#987cf8','#5544ba','#17143e']
];
const forms=[
[[0,-.96],[.48,-.84],[.88,-.46],[1,0],[.76,.69],[.3,.96],[-.3,.96],[-.76,.69],[-1,0],[-.88,-.46],[-.48,-.84]],
[[-.68,-.9],[.68,-.9],[.94,-.62],[.94,.62],[.68,.9],[-.68,.9],[-.94,.62],[-.94,-.62]],
[[0,-1],[.6,-.55],[.82,.1],[.46,.77],[0,1],[-.46,.77],[-.82,.1],[-.6,-.55]],
[[0,-1],[.94,-.03],[0,1],[-.94,-.03]]
];
function path(ctx,p){ctx.beginPath();ctx.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)ctx.lineTo(p[i][0],p[i][1]);ctx.closePath()}
function jewel(t,v){
const cv=document.createElement('canvas');cv.width=cv.height=160;const c=cv.getContext('2d'),col=palettes[t];c.translate(80,80);
const p=forms[v].map(([x,y])=>[x*56,y*56]);c.save();c.shadowColor=col[1];c.shadowBlur=10;c.fillStyle=col[2];path(c,p);c.fill();c.restore();
c.save();path(c,p);c.clip();
let base=c.createRadialGradient(-24,-35,2,4,7,85);base.addColorStop(0,'#ffffff');base.addColorStop(.17,col[0]);base.addColorStop(.45,col[1]);base.addColorStop(.75,col[2]);base.addColorStop(1,col[3]);c.fillStyle=base;c.fillRect(-65,-65,130,130);
const q=p.map(([x,y])=>[x*.54,y*.54]);for(let i=0;i<p.length;i++){
let j=(i+1)%p.length;let g=c.createLinearGradient(p[i][0],p[i][1],q[j][0],q[j][1]);let a=(i+v*3)%5;
g.addColorStop(0,a===0?'#ffffff':a===1?col[0]:a===2?col[3]:col[1]);g.addColorStop(.47,a===0?col[1]:a===1?col[2]:col[0]);g.addColorStop(1,a%2?col[3]:col[2]);c.fillStyle=g;c.globalAlpha=.92;path(c,[p[i],p[j],q[j],q[i]]);c.fill();
let k=c.createLinearGradient(q[i][0],q[i][1],-q[i][0],-q[i][1]);k.addColorStop(0,(i%3===0)?'#ffffff':col[1]);k.addColorStop(.42,(i%4===0)?col[3]:col[2]);k.addColorStop(1,(i%3===1)?'#ffffff':col[0]);c.fillStyle=k;c.globalAlpha=.9;path(c,[q[i],q[j],[0,0]]);c.fill();
}
c.globalAlpha=.8;c.strokeStyle='#ffffff';c.lineWidth=1.4;path(c,q);c.stroke();
let sheen=c.createLinearGradient(-45,-53,42,49);sheen.addColorStop(0,'rgba(255,255,255,.65)');sheen.addColorStop(.24,'rgba(255,255,255,0)');sheen.addColorStop(.5,'rgba(255,255,255,.16)');sheen.addColorStop(.65,'rgba(255,255,255,0)');sheen.addColorStop(1,'rgba(255,255,255,.3)');c.globalAlpha=1;c.fillStyle=sheen;c.fillRect(-60,-60,120,120);
c.restore();
c.strokeStyle=col[0];c.lineWidth=2.4;c.shadowColor=col[1];c.shadowBlur=5;path(c,p);c.stroke();c.shadowBlur=0;
c.strokeStyle='rgba(255,255,255,.92)';c.lineWidth=2;c.beginPath();c.moveTo(p[0][0],p[0][1]);c.lineTo(p[1][0],p[1][1]);c.stroke();
c.save();c.translate(-30,-34);c.fillStyle='#ffffff';c.globalAlpha=.9;c.beginPath();c.moveTo(0,-9);c.lineTo(2,-2);c.lineTo(9,0);c.lineTo(2,2);c.lineTo(0,9);c.lineTo(-2,2);c.lineTo(-9,0);c.lineTo(-2,-2);c.fill();c.restore();
return cv;
}
window.COREBALL_JEWELS=Array.from({length:8},(_,t)=>Array.from({length:4},(_,v)=>jewel(t,v)));
})();