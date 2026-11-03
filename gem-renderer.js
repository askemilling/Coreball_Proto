/* Small, reusable image sprites: color is derived exclusively from current HP. */
(()=>{
const hues=[[.30,.32,.35],[1,1,1],[.08,.88,.58],[.05,.59,1],[.66,.24,1],[1,.62,.13],[1,.16,.47],[.29,.25,.39]];
const size=64;
window.COREBALL_JEWELS=hues.map(()=>Array.from({length:4},()=>{const c=document.createElement('canvas');c.width=c.height=size;return c}));
const atlas=new Image();
window.COREBALL_ART_READY=new Promise((resolve,reject)=>{atlas.onload=()=>{
 const cellW=atlas.naturalWidth/2,cellH=atlas.naturalHeight/2;
 for(let v=0;v<4;v++){
  const src=document.createElement('canvas');src.width=src.height=size;const sc=src.getContext('2d',{willReadFrequently:true});sc.drawImage(atlas,(v%2)*cellW,Math.floor(v/2)*cellH,cellW,cellH,0,0,size,size);const original=sc.getImageData(0,0,size,size);
  for(let t=0;t<8;t++){
   const c=window.COREBALL_JEWELS[t][v],ctx=c.getContext('2d'),out=ctx.createImageData(size,size),rgb=hues[t];
   for(let i=0;i<original.data.length;i+=4){const a=original.data[i+3];if(!a)continue;const l=(original.data[i]*.25+original.data[i+1]*.55+original.data[i+2]*.2)/255;const white=Math.max(0,(l-.72)/.28)*(t===0?.20:1);for(let k=0;k<3;k++){const base=rgb[k]*Math.pow(l,.8)*1.15;out.data[i+k]=Math.min(255,255*(base*(1-white)+white));}out.data[i+3]=a;}
   ctx.putImageData(out,0,0);
  }
 }
 resolve();};atlas.onerror=()=>reject(new Error('Gemstone artwork failed to load'));});
atlas.src='./assets/jewels-v9.png';
})();

