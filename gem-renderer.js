/* COREBALL: image-based, pre-baked jewel sprites. No per-frame filters. */
(()=>{
const colors=['#a6bed4','#eeeaff','#32e8a6','#36caff','#b46bff','#ffb342','#ff4b82','#575575'];
window.COREBALL_JEWELS=colors.map(()=>Array.from({length:4},()=>{const c=document.createElement('canvas');c.width=c.height=192;return c}));
const atlas=new Image();
window.COREBALL_ART_READY=new Promise((resolve,reject)=>{atlas.onload=()=>{
 const cellW=atlas.naturalWidth/2,cellH=atlas.naturalHeight/2;
 for(let t=0;t<8;t++)for(let v=0;v<4;v++){
  const c=window.COREBALL_JEWELS[t][v],ctx=c.getContext('2d');
  ctx.drawImage(atlas,(v%2)*cellW,Math.floor(v/2)*cellH,cellW,cellH,0,0,192,192);
  // Multiply preserves the photographed refractions; screen restores brilliant highlights.
  ctx.globalCompositeOperation='multiply';ctx.fillStyle=colors[t];ctx.fillRect(0,0,192,192);
  ctx.globalCompositeOperation='destination-in';ctx.drawImage(atlas,(v%2)*cellW,Math.floor(v/2)*cellH,cellW,cellH,0,0,192,192);
  ctx.globalCompositeOperation='screen';ctx.globalAlpha=t===7?.15:.23;ctx.drawImage(atlas,(v%2)*cellW,Math.floor(v/2)*cellH,cellW,cellH,0,0,192,192);
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
 }
 resolve();};atlas.onerror=()=>reject(new Error('Gem atlas could not load'));});
atlas.src='./assets/jewels-atlas.png';
})();
