/* Small, reusable image sprites: color is derived exclusively from current HP. */
(()=>{
const hues=[[.52,.59,.67],[1,1,1],[.08,.88,.58],[.05,.59,1],[.66,.24,1],[1,.62,.13],[1,.16,.47],[.29,.25,.39]];
const size=128;
const rimOffsets=[[-5,0],[5,0],[0,-5],[0,5],[-4,-4],[4,-4],[-4,4],[4,4]];
const edgeColors=[[128,164,201],[232,247,255],[57,255,183],[76,196,255],[188,124,255],[255,193,92],[255,112,167],[134,117,177]];
window.COREBALL_GLOWS=edgeColors.map(color=>{
 const c=document.createElement('canvas');c.width=c.height=96;const ctx=c.getContext('2d'),rgb=color.join(','),light=ctx.createRadialGradient(48,48,0,48,48,48);
 light.addColorStop(0,'rgba('+rgb+',.12)');light.addColorStop(.38,'rgba('+rgb+',.48)');light.addColorStop(.64,'rgba('+rgb+',.24)');light.addColorStop(1,'rgba('+rgb+',0)');ctx.fillStyle=light;ctx.fillRect(0,0,96,96);return c;
});
window.COREBALL_JEWELS=hues.map(()=>Array.from({length:4},()=>{const c=document.createElement('canvas');c.width=c.height=size;return c}));
const atlas=new Image();
window.COREBALL_ART_READY=new Promise((resolve,reject)=>{atlas.onload=()=>{
 const cellW=atlas.naturalWidth/2,cellH=atlas.naturalHeight/2;
 for(let v=0;v<4;v++){
  const src=document.createElement('canvas');src.width=src.height=size;const sc=src.getContext('2d',{willReadFrequently:true});sc.imageSmoothingEnabled=true;sc.imageSmoothingQuality='high';sc.drawImage(atlas,(v%2)*cellW,Math.floor(v/2)*cellH,cellW,cellH,0,0,size,size);const original=sc.getImageData(0,0,size,size);
  for(let t=0;t<8;t++){
   const c=window.COREBALL_JEWELS[t][v],ctx=c.getContext('2d'),out=ctx.createImageData(size,size),rgb=hues[t];
   for(let i=0;i<original.data.length;i+=4){const a=original.data[i+3];if(!a)continue;const l=(original.data[i]*.25+original.data[i+1]*.55+original.data[i+2]*.2)/255;const white=Math.max(0,(l-.72)/.28);for(let k=0;k<3;k++){const base=rgb[k]*Math.pow(l,.8)*1.15;out.data[i+k]=Math.min(255,255*(base*(1-white)+white));}out.data[i+3]=a;}
   // Bake the fine silhouette rim and its halo once; no per-frame blur.
   const rim=document.createElement('canvas');rim.width=rim.height=size;const rc=rim.getContext('2d'),edge=rc.createImageData(size,size),color=edgeColors[t];
   for(let y=5;y<size-5;y++)for(let x=5;x<size-5;x++){
    const i=(y*size+x)*4,a=out.data[i+3];let outer=a;
    for(const [dx,dy] of rimOffsets)outer=Math.max(outer,out.data[((y+dy)*size+x+dx)*4+3]);
    const alpha=Math.max(0,outer-a)*.95;if(alpha<1)continue;
    edge.data[i]=color[0];edge.data[i+1]=color[1];edge.data[i+2]=color[2];edge.data[i+3]=alpha;
   }
   rc.putImageData(edge,0,0);
   const faceted=document.createElement('canvas');faceted.width=faceted.height=size;faceted.getContext('2d').putImageData(out,0,0);
   ctx.clearRect(0,0,size,size);ctx.save();ctx.shadowColor='rgb('+color.join(',')+')';ctx.shadowBlur=18;ctx.drawImage(rim,0,0);ctx.shadowBlur=8;ctx.drawImage(rim,0,0);ctx.restore();ctx.drawImage(faceted,0,0);
  }
 }
 resolve();};atlas.onerror=()=>reject(new Error('Gemstone artwork failed to load'));});
atlas.src='./assets/jewels-v9.png';
})();

