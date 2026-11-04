/* Live, flat-shaded 3D meshes for 1-HP gray crystals. No external libraries. */
(()=>{
'use strict';
const surface=document.createElement('canvas');
let gl=null,instancing=null,program=null,meshes=[],enabled=true,available=false,healthy=false,lastError='',software=false,softwareFrame=-1;
try{enabled=localStorage.getItem('coreball-gray-3d')!=='off';}catch{}
const vertexSource=`
precision highp float;
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec4 aInstance;
uniform vec2 uBoard;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vAlpha;
mat3 rx(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}
mat3 ry(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
mat3 rz(float a){float c=cos(a),s=sin(a);return mat3(c,s,0.,-s,c,0.,0.,0.,1.);}
void main(){
 float seed=aInstance.z;
 float ax=.30+sin(uTime*.38+seed)*.18;
 float ay=-.20+cos(uTime*.31+seed*1.7)*.28;
 float az=sin(seed*2.7)*.26+sin(uTime*.18+seed)*.08;
 mat3 rotation=rz(az)*ry(ay)*rx(ax);
 vec3 position=rotation*aPosition;
 float scale=7.2;
 vec2 world=vec2(aInstance.x+position.x*scale,aInstance.y-position.y*scale);
 gl_Position=vec4(world.x/uBoard.x*2.-1.,1.-world.y/uBoard.y*2.,-position.z*.1,1.);
 vNormal=rotation*aNormal;vPosition=position;vAlpha=aInstance.w;
}`;
const fragmentSource=`
precision highp float;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vAlpha;
void main(){
 vec3 n=normalize(vNormal),view=vec3(0.,0.,1.);
 vec3 key=normalize(vec3(-.55,.65,.9));
 vec3 fill=normalize(vec3(.8,-.25,.4));
 float diffuse=max(0.,dot(n,key));
 float bounce=max(0.,dot(n,fill));
 vec3 reflection=reflect(-view,n);
 float sky=smoothstep(-.5,.8,reflection.y);
 vec3 environment=mix(vec3(.025,.035,.06),vec3(.52,.62,.76),sky);
 float softbox=pow(max(0.,dot(reflection,normalize(vec3(-.6,.8,1.)))),28.);
 float strip=pow(max(0.,1.-abs(reflection.y+.22)*2.8),18.);
 environment+=vec3(.96,.98,1.)*softbox+vec3(.48,.61,.8)*strip*.35;
 float fresnel=.13+.7*pow(1.-abs(n.z),3.);
 float spec=pow(max(0.,dot(n,normalize(key+view))),75.);
 float movingSpec=pow(max(0.,dot(n,normalize(vec3(sin(uTime*.22)*.7,.3,1.)))),100.);
 vec3 graphite=vec3(.19,.23,.275);
 vec3 color=graphite*(.48+diffuse*.78+bounce*.25)+environment*(.34+fresnel*.75);
 color+=vec3(.92,.97,1.)*(spec*.9+movingSpec*.32);
 color+=vec3(.10,.16,.22)*pow(max(0.,1.-abs(n.z)),2.);
 color=pow(clamp(color,0.,1.),vec3(.88));
 gl_FragColor=vec4(color*vAlpha,vAlpha);
}`;
function shader(type,source){
 const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
 if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s)||'Gray crystal shader failed');
 return s;
}
function geometry(outline){
 const vertices=[],normals=[];
 const point=(p,scale,z)=>[p[0]*scale,p[1]*scale,z];
 function triangle(a,b,c){
  const u=b.map((x,i)=>x-a[i]),v=c.map((x,i)=>x-a[i]);
  let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
  const length=Math.hypot(...n)||1;n=n.map(x=>x/length);
  for(const p of [a,b,c]){vertices.push(...p);normals.push(...n);}
 }
 const count=outline.length;
 for(let i=0;i<count;i++){
  const j=(i+1)%count,p=outline[i],q=outline[j];
  const ti=point(p,.39,.36),tj=point(q,.39,.36);
  const ci=point(p,.71,.22),cj=point(q,.71,.22);
  const gi=point(p,1.,0.),gj=point(q,1.,0.);
  const bi=point(p,.97,-.07),bj=point(q,.97,-.07);
  triangle([0,0,.36],ti,tj);
  triangle(ti,ci,cj);triangle(ti,cj,tj);
  // Alternating cuts give each crown face a different normal.
  const mid=[(p[0]+q[0])*.5*.86,(p[1]+q[1])*.5*.86,.09];
  triangle(ci,gi,mid);triangle(ci,mid,cj);triangle(cj,mid,gj);triangle(gi,gj,mid);
  triangle(gi,bi,bj);triangle(gi,bj,gj);
  triangle(bi,[0,0,-.78],bj);
 }
 return {positions:new Float32Array(vertices),normals:new Float32Array(normals),count:vertices.length/3};
}
function makeMesh(outline){
 const model=geometry(outline),position=gl.createBuffer(),normal=gl.createBuffer(),instances=gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER,position);gl.bufferData(gl.ARRAY_BUFFER,model.positions,gl.STATIC_DRAW);
 gl.bindBuffer(gl.ARRAY_BUFFER,normal);gl.bufferData(gl.ARRAY_BUFFER,model.normals,gl.STATIC_DRAW);
 return {...model,position,normal,instances,data:new Float32Array(256*4)};
}
function shapes(){
 const round=Array.from({length:12},(_,i)=>{const a=i*Math.PI/6+Math.PI/12;return [Math.cos(a),Math.sin(a)];});
 const emerald=[[-.48,-1],[.48,-1],[.72,-.72],[.72,.72],[.48,1],[-.48,1],[-.72,.72],[-.72,-.72]];
 const pear=[[0,1.06],[-.45,.55],[-.72,0],[-.65,-.65],[-.35,-.95],[0,-1.05],[.35,-.95],[.65,-.65],[.72,0],[.45,.55]];
 const princess=[[-.65,-.88],[.65,-.88],[.88,-.65],[.88,.65],[.65,.88],[-.65,.88],[-.88,.65],[-.88,-.65]];

return [round,emerald,pear,princess];
}
const softwareModels=shapes().map(geometry),softwareAtlas=document.createElement('canvas');softwareAtlas.width=softwareAtlas.height=256;const softwareCtx=softwareAtlas.getContext('2d');

function setup(){
 available=false;healthy=false;
 gl=surface.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:true,depth:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
 if(!gl){software=true;available=true;healthy=true;lastError='';return;}
 instancing=gl.getExtension('ANGLE_instanced_arrays');
 if(!instancing){software=true;available=true;healthy=true;lastError='';return;}
 const vs=shader(gl.VERTEX_SHADER,vertexSource),fs=shader(gl.FRAGMENT_SHADER,fragmentSource);
 program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||'Gray crystal program failed');
 gl.deleteShader(vs);gl.deleteShader(fs);
 program.position=gl.getAttribLocation(program,'aPosition');program.normal=gl.getAttribLocation(program,'aNormal');program.instance=gl.getAttribLocation(program,'aInstance');
 program.board=gl.getUniformLocation(program,'uBoard');program.time=gl.getUniformLocation(program,'uTime');
 meshes=shapes().map(makeMesh);
 gl.useProgram(program);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
 gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
 // Render both sides: a pavilion remains visible while the gem rocks.
 gl.disable(gl.CULL_FACE);gl.clearColor(0,0,0,0);
 software=false;available=true;healthy=true;lastError='';
}

const softwareCanvas=document.createElement('canvas'),softwareCanvasCtx=softwareCanvas.getContext('2d');
function rotated(v,ax,ay,az){
 const cx=Math.cos(ax),sx=Math.sin(ax),cy=Math.cos(ay),sy=Math.sin(ay),cz=Math.cos(az),sz=Math.sin(az);
 const x=v[0],y=v[1]*cx-v[2]*sx,z=v[1]*sx+v[2]*cx;
 const xx=x*cy+z*sy,zz=-x*sy+z*cy;return [xx*cz-y*sz,xx*sz+y*cz,zz];
}
function shadeNormal(n,time){
 const norm=v=>{const m=Math.hypot(...v)||1;return v.map(x=>x/m);},dot=(x,y)=>x.reduce((sum,n,i)=>sum+n*y[i],0),smooth=(a,b,v)=>{const t=Math.max(0,Math.min(1,(v-a)/(b-a)));return t*t*(3-2*t);};
 const key=norm([-.55,.65,.9]),fill=norm([.8,-.25,.4]),half=norm([key[0],key[1],key[2]+1]),reflection=[2*n[2]*n[0],2*n[2]*n[1],2*n[2]*n[2]-1];
 const diffuse=Math.max(0,dot(n,key)),bounce=Math.max(0,dot(n,fill)),sky=smooth(-.5,.8,reflection[1]),fresnel=.13+.7*Math.pow(1-Math.abs(n[2]),3);
 const box=Math.pow(Math.max(0,dot(reflection,norm([-.6,.8,1]))),28),strip=Math.pow(Math.max(0,1-Math.abs(reflection[1]+.22)*2.8),18);
 const spec=Math.pow(Math.max(0,dot(n,half)),75),moving=Math.pow(Math.max(0,dot(n,norm([Math.sin(time*.22)*.7,.3,1]))),100);
 const base=[.19,.23,.275],low=[.025,.035,.06],high=[.52,.62,.76],line=[.48,.61,.8],shine=[.92,.97,1],edge=[.10,.16,.22];
 const rgb=base.map((c,k)=>{const env=low[k]+(high[k]-low[k])*sky+shine[k]*box+line[k]*strip*.35;const value=c*(.48+diffuse*.78+bounce*.25)+env*(.34+fresnel*.75)+shine[k]*(spec*.9+moving*.32)+edge[k]*Math.pow(1-Math.abs(n[2]),2);return Math.round(Math.pow(Math.max(0,Math.min(1,value)),.88)*255);});
 return 'rgb('+rgb.join(',')+')';
}
function softwareTiles(time){
 const frame=Math.floor(time/100);if(frame===softwareFrame)return;softwareFrame=frame;
 softwareCtx.clearRect(0,0,256,256);const seconds=time*.001;
 for(let variant=0;variant<4;variant++)for(let phase=0;phase<4;phase++){
  const seed=phase*1.7,ax=.30+Math.sin(seconds*.38+seed)*.18,ay=-.20+Math.cos(seconds*.31+seed*1.7)*.28,az=Math.sin(seed*2.7)*.26+Math.sin(seconds*.18+seed)*.08,model=softwareModels[variant],triangles=[];
  for(let i=0;i<model.positions.length;i+=9){
   const points=[0,3,6].map(offset=>rotated([model.positions[i+offset],model.positions[i+offset+1],model.positions[i+offset+2]],ax,ay,az)),normal=rotated([model.normals[i],model.normals[i+1],model.normals[i+2]],ax,ay,az);
   triangles.push({points,z:points.reduce((sum,p)=>sum+p[2],0)/3,color:shadeNormal(normal,seconds)});
  }
  triangles.sort((a,b)=>a.z-b.z);const ox=variant*64+32,oy=phase*64+32;
  for(const tri of triangles){softwareCtx.fillStyle=tri.color;softwareCtx.beginPath();for(let i=0;i<3;i++){const p=tri.points[i],x=ox+p[0]*22,y=oy-p[1]*22;if(i===0)softwareCtx.moveTo(x,y);else softwareCtx.lineTo(x,y);}softwareCtx.closePath();softwareCtx.fill();}
 }
}
function renderSoftware(gems,time,width,height,pixelWidth,pixelHeight,ceiling){
 if(softwareCanvas.width!==pixelWidth||softwareCanvas.height!==pixelHeight){softwareCanvas.width=pixelWidth;softwareCanvas.height=pixelHeight;}
 const target=softwareCanvasCtx;target.setTransform(pixelWidth/width,0,0,pixelHeight/height,0,0);target.clearRect(0,0,width,height);target.imageSmoothingEnabled=true;target.imageSmoothingQuality='high';softwareTiles(time);
 const size=64*7.2/22;
 for(const gem of gems){if(gem.dead||gem.boss||gem.super||gem.bomb||gem.hp!==1)continue;let y=gem.y,alpha=1;
  if(gem.emerge>0){const u=1-gem.emerge/18;y=ceiling+10+(gem.y-ceiling-10)*(1-Math.pow(1-u,3));alpha=Math.min(1,u*4);}
  target.globalAlpha=alpha;const phase=Math.abs(Math.floor(gem.x*.127+gem.y*.071))%4;target.drawImage(softwareAtlas,(gem.variant||0)%4*64,phase*64,64,64,gem.x-size/2,y-size/2,size,size);
 }
 target.globalAlpha=1;return softwareCanvas;
}

function render(gems,time,width,height,pixelWidth,pixelHeight,ceiling){
 if(!api.ready)return null;
 if(software){try{return renderSoftware(gems,time,width,height,pixelWidth,pixelHeight,ceiling);}catch(error){healthy=false;lastError=error.message;return null;}}
 try{
  if(surface.width!==pixelWidth||surface.height!==pixelHeight){surface.width=pixelWidth;surface.height=pixelHeight;}
  gl.viewport(0,0,surface.width,surface.height);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.useProgram(program);gl.uniform2f(program.board,width,height);gl.uniform1f(program.time,time*.001);
  const counts=[0,0,0,0];
  for(const gem of gems){
   if(gem.dead||gem.boss||gem.super||gem.bomb||gem.hp!==1)continue;
   const variant=(gem.variant||0)%4,mesh=meshes[variant],index=counts[variant]++;
   if((index+1)*4>mesh.data.length){const larger=new Float32Array(mesh.data.length*2);larger.set(mesh.data);mesh.data=larger;}
   let y=gem.y,alpha=1;
   if(gem.emerge>0){const u=1-gem.emerge/18,eased=1-Math.pow(1-u,3);y=ceiling+10+(gem.y-ceiling-10)*eased;alpha=Math.min(1,u*4);}
   mesh.data.set([gem.x,y,gem.x*.127+gem.y*.071,alpha],index*4);
  }
  for(let i=0;i<4;i++){
   const mesh=meshes[i],count=counts[i];if(!count)continue;
   gl.bindBuffer(gl.ARRAY_BUFFER,mesh.position);gl.enableVertexAttribArray(program.position);gl.vertexAttribPointer(program.position,3,gl.FLOAT,false,0,0);instancing.vertexAttribDivisorANGLE(program.position,0);
   gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normal);gl.enableVertexAttribArray(program.normal);gl.vertexAttribPointer(program.normal,3,gl.FLOAT,false,0,0);instancing.vertexAttribDivisorANGLE(program.normal,0);
   gl.bindBuffer(gl.ARRAY_BUFFER,mesh.instances);gl.bufferData(gl.ARRAY_BUFFER,mesh.data.subarray(0,count*4),gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(program.instance);gl.vertexAttribPointer(program.instance,4,gl.FLOAT,false,0,0);instancing.vertexAttribDivisorANGLE(program.instance,1);
   instancing.drawArraysInstancedANGLE(gl.TRIANGLES,0,mesh.count,count);
  }
  return surface;
 }catch(error){healthy=false;lastError=error.message;return null;}
}
const api={diagnostics:()=>({available,enabled,healthy,renderer:software?'software-3d':'webgl',lastError}),get available(){return available;},get enabled(){return enabled;},get ready(){return available&&healthy&&enabled;},setEnabled(value){enabled=!!value;try{localStorage.setItem('coreball-gray-3d',enabled?'on':'off');}catch{}return api.ready;},render};
window.COREBALL_GREY3D=api;
surface.addEventListener('webglcontextlost',event=>{event.preventDefault();healthy=false;});
surface.addEventListener('webglcontextrestored',()=>{try{setup();}catch{healthy=false;}});
try{setup();}catch(error){lastError=error.message;software=true;available=true;healthy=true;}
})();