(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();const pa="182",yh=0,Va=1,Mh=2,lr=1,wh=2,ps=3,tn=0,Xe=1,Yt=2,ki=0,zn=1,Ha=2,Wa=3,qa=4,Sh=5,mn=100,bh=101,Eh=102,Th=103,Ah=104,Ch=200,Rh=201,Ph=202,Ih=203,xo=204,vo=205,Lh=206,Dh=207,Nh=208,Fh=209,Uh=210,Bh=211,Oh=212,zh=213,kh=214,_o=0,yo=1,Mo=2,Vn=3,wo=4,So=5,bo=6,Eo=7,fl=0,Gh=1,Vh=2,Si=0,pl=1,ml=2,gl=3,xl=4,vl=5,_l=6,yl=7,Ml=300,yn=301,Hn=302,To=303,Ao=304,yr=306,Co=1e3,Oi=1001,Ro=1002,De=1003,Hh=1004,Ds=1005,Oe=1006,Rr=1007,vn=1008,Je=1009,wl=1010,Sl=1011,ys=1012,ma=1013,Ei=1014,Mi=1015,Vi=1016,ga=1017,xa=1018,Ms=1020,bl=35902,El=35899,Tl=1021,Al=1022,hi=1023,Hi=1026,_n=1027,Cl=1028,va=1029,Wn=1030,_a=1031,ya=1033,hr=33776,ur=33777,dr=33778,fr=33779,Po=35840,Io=35841,Lo=35842,Do=35843,No=36196,Fo=37492,Uo=37496,Bo=37488,Oo=37489,zo=37490,ko=37491,Go=37808,Vo=37809,Ho=37810,Wo=37811,qo=37812,Xo=37813,Yo=37814,Zo=37815,Ko=37816,jo=37817,$o=37818,Jo=37819,Qo=37820,ta=37821,ea=36492,ia=36494,na=36495,sa=36283,ra=36284,oa=36285,aa=36286,Wh=3200,Rl=0,qh=1,$i="",ni="srgb",qn="srgb-linear",mr="linear",oe="srgb",Sn=7680,Xa=519,Xh=512,Yh=513,Zh=514,Ma=515,Kh=516,jh=517,wa=518,$h=519,Ya=35044,Za="300 es",wi=2e3,gr=2001;function Pl(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function xr(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Jh(){const o=xr("canvas");return o.style.display="block",o}const Ka={};function ja(...o){const t="THREE."+o.shift();console.log(t,...o)}function Ut(...o){const t="THREE."+o.shift();console.warn(t,...o)}function Qt(...o){const t="THREE."+o.shift();console.error(t,...o)}function ws(...o){const t=o.join(" ");t in Ka||(Ka[t]=!0,Ut(...o))}function Qh(o,t,e){return new Promise(function(i,n){function s(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:n();break;case o.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}class Kn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,r=n.length;s<r;s++)n[s].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pr=Math.PI/180,ca=180/Math.PI;function jn(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ue[o&255]+Ue[o>>8&255]+Ue[o>>16&255]+Ue[o>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]).toLowerCase()}function Xt(o,t,e){return Math.max(t,Math.min(e,o))}function tu(o,t){return(o%t+t)%t}function Ir(o,t,e){return(1-e)*o+e*t}function ns(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function We(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class yt{constructor(t=0,e=0){yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*n+t.x,this.y=s*n+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}let $n=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,r,a){let c=i[n+0],l=i[n+1],h=i[n+2],u=i[n+3],d=s[r+0],f=s[r+1],m=s[r+2],x=s[r+3];if(a<=0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a>=1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=x;return}if(u!==x||c!==d||l!==f||h!==m){let p=c*d+l*f+h*m+u*x;p<0&&(d=-d,f=-f,m=-m,x=-x,p=-p);let g=1-a;if(p<.9995){const v=Math.acos(p),y=Math.sin(v);g=Math.sin(g*v)/y,a=Math.sin(a*v)/y,c=c*g+d*a,l=l*g+f*a,h=h*g+m*a,u=u*g+x*a}else{c=c*g+d*a,l=l*g+f*a,h=h*g+m*a,u=u*g+x*a;const v=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=v,l*=v,h*=v,u*=v}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,s,r){const a=i[n],c=i[n+1],l=i[n+2],h=i[n+3],u=s[r],d=s[r+1],f=s[r+2],m=s[r+3];return t[e]=a*m+h*u+c*f-l*d,t[e+1]=c*m+h*d+l*u-a*f,t[e+2]=l*m+h*f+a*d-c*u,t[e+3]=h*m-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(n/2),u=a(s/2),d=c(i/2),f=c(n/2),m=c(s/2);switch(r){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(r-n)*f}else if(i>a&&i>u){const f=2*Math.sqrt(1+i-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(n+r)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-i-u);this._w=(s-l)/f,this._x=(n+r)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-i-a);this._w=(r-n)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+r*a+n*l-s*c,this._y=n*h+r*c+s*a-i*l,this._z=s*h+r*l+i*c-n*a,this._w=r*h-i*a-n*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let i=t._x,n=t._y,s=t._z,r=t._w,a=this.dot(t);a<0&&(i=-i,n=-n,s=-s,r=-r,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+i*e,this._y=this._y*c+n*e,this._z=this._z*c+s*e,this._w=this._w*c+r*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+n*e,this._z=this._z*c+s*e,this._w=this._w*c+r*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class N{constructor(t=0,e=0,i=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($a.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($a.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,r=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*r,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*r,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*n-a*i),h=2*(a*e-s*n),u=2*(s*i-r*e);return this.x=e+c*l+r*u-a*h,this.y=i+c*h+a*l-s*u,this.z=n+c*u+s*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,r=e.x,a=e.y,c=e.z;return this.x=n*c-s*a,this.y=s*r-i*c,this.z=i*a-n*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Lr.copy(this).projectOnVector(t),this.sub(Lr)}reflect(t){return this.sub(Lr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lr=new N,$a=new $n;class kt{constructor(t,e,i,n,s,r,a,c,l){kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,r,a,c,l)}set(t,e,i,n,s,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=n,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=i,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,r=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],f=i[5],m=i[8],x=n[0],p=n[3],g=n[6],v=n[1],y=n[4],_=n[7],E=n[2],T=n[5],C=n[8];return s[0]=r*x+a*v+c*E,s[3]=r*p+a*y+c*T,s[6]=r*g+a*_+c*C,s[1]=l*x+h*v+u*E,s[4]=l*p+h*y+u*T,s[7]=l*g+h*_+u*C,s[2]=d*x+f*v+m*E,s[5]=d*p+f*y+m*T,s[8]=d*g+f*_+m*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-i*s*h+i*a*c+n*s*l-n*r*c}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*r-a*l,d=a*c-h*s,f=l*s-r*c,m=e*u+i*d+n*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=u*x,t[1]=(n*l-h*i)*x,t[2]=(a*i-n*r)*x,t[3]=d*x,t[4]=(h*e-n*c)*x,t[5]=(n*s-a*e)*x,t[6]=f*x,t[7]=(i*c-l*e)*x,t[8]=(r*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,r,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*r+l*a)+r+t,-n*l,n*c,-n*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Dr.makeScale(t,e)),this}rotate(t){return this.premultiply(Dr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Dr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Dr=new kt,Ja=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qa=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function eu(){const o={enabled:!0,workingColorSpace:qn,spaces:{},convert:function(n,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===oe&&(n.r=Gi(n.r),n.g=Gi(n.g),n.b=Gi(n.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===oe&&(n.r=kn(n.r),n.g=kn(n.g),n.b=kn(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===$i?mr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,r){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return ws("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return ws("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(n,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return o.define({[qn]:{primaries:t,whitePoint:i,transfer:mr,toXYZ:Ja,fromXYZ:Qa,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ni},outputColorSpaceConfig:{drawingBufferColorSpace:ni}},[ni]:{primaries:t,whitePoint:i,transfer:oe,toXYZ:Ja,fromXYZ:Qa,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ni}}}),o}const Kt=eu();function Gi(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function kn(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let bn;class iu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{bn===void 0&&(bn=xr("canvas")),bn.width=t.width,bn.height=t.height;const n=bn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=bn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=xr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let r=0;r<s.length;r++)s[r]=Gi(s[r]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Gi(e[i]/255)*255):e[i]=Gi(e[i]);return{data:e,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let nu=0;class Sa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=jn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let r=0,a=n.length;r<a;r++)n[r].isDataTexture?s.push(Nr(n[r].image)):s.push(Nr(n[r]))}else s=Nr(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function Nr(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?iu.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let su=0;const Fr=new N;class ze extends Kn{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,i=Oi,n=Oi,s=Oe,r=vn,a=hi,c=Je,l=ze.DEFAULT_ANISOTROPY,h=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=jn(),this.name="",this.source=new Sa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fr).x}get height(){return this.source.getSize(Fr).y}get depth(){return this.source.getSize(Fr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Ut(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ml)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Co:t.x=t.x-Math.floor(t.x);break;case Oi:t.x=t.x<0?0:1;break;case Ro:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Co:t.y=t.y-Math.floor(t.y);break;case Oi:t.y=t.y<0?0:1;break;case Ro:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=Ml;ze.DEFAULT_ANISOTROPY=1;class Me{constructor(t=0,e=0,i=0,n=1){Me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n+r[12]*s,this.y=r[1]*e+r[5]*i+r[9]*n+r[13]*s,this.z=r[2]*e+r[6]*i+r[10]*n+r[14]*s,this.w=r[3]*e+r[7]*i+r[11]*n+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],x=c[2],p=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+p)<.1&&Math.abs(l+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(f+1)/2,E=(g+1)/2,T=(h+d)/4,C=(u+x)/4,L=(m+p)/4;return y>_&&y>E?y<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(y),n=T/i,s=C/i):_>E?_<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(_),i=T/n,s=L/n):E<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(E),i=C/s,n=L/s),this.set(i,n,s,e),this}let v=Math.sqrt((p-m)*(p-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(p-m)/v,this.y=(u-x)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ru extends Kn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);const n={width:t,height:e,depth:i.depth},s=new ze(n);this.textures=[];const r=i.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Oe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new Sa(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bi extends ru{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Il extends ze{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=De,this.minFilter=De,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ou extends ze{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=De,this.minFilter=De,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class As{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ri.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ri.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ri.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,ri):ri.fromBufferAttribute(s,r),ri.applyMatrix4(t.matrixWorld),this.expandByPoint(ri);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ns.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ns.copy(i.boundingBox)),Ns.applyMatrix4(t.matrixWorld),this.union(Ns)}const n=t.children;for(let s=0,r=n.length;s<r;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ri),ri.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),Fs.subVectors(this.max,ss),En.subVectors(t.a,ss),Tn.subVectors(t.b,ss),An.subVectors(t.c,ss),Wi.subVectors(Tn,En),qi.subVectors(An,Tn),an.subVectors(En,An);let e=[0,-Wi.z,Wi.y,0,-qi.z,qi.y,0,-an.z,an.y,Wi.z,0,-Wi.x,qi.z,0,-qi.x,an.z,0,-an.x,-Wi.y,Wi.x,0,-qi.y,qi.x,0,-an.y,an.x,0];return!Ur(e,En,Tn,An,Fs)||(e=[1,0,0,0,1,0,0,0,1],!Ur(e,En,Tn,An,Fs))?!1:(Us.crossVectors(Wi,qi),e=[Us.x,Us.y,Us.z],Ur(e,En,Tn,An,Fs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ri).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ri).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ri=[new N,new N,new N,new N,new N,new N,new N,new N],ri=new N,Ns=new As,En=new N,Tn=new N,An=new N,Wi=new N,qi=new N,an=new N,ss=new N,Fs=new N,Us=new N,cn=new N;function Ur(o,t,e,i,n){for(let s=0,r=o.length-3;s<=r;s+=3){cn.fromArray(o,s);const a=n.x*Math.abs(cn.x)+n.y*Math.abs(cn.y)+n.z*Math.abs(cn.z),c=t.dot(cn),l=e.dot(cn),h=i.dot(cn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const au=new As,rs=new N,Br=new N;let Mr=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):au.setFromPoints(t).getCenter(i);let n=0;for(let s=0,r=t.length;s<r;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rs.subVectors(t,this.center);const e=rs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(rs,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Br.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rs.copy(t.center).add(Br)),this.expandByPoint(rs.copy(t.center).sub(Br))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}};const Pi=new N,Or=new N,Bs=new N,Xi=new N,zr=new N,Os=new N,kr=new N;let Ll=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pi.copy(this.origin).addScaledVector(this.direction,e),Pi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){Or.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),Xi.copy(this.origin).sub(Or);const s=t.distanceTo(e)*.5,r=-this.direction.dot(Bs),a=Xi.dot(this.direction),c=-Xi.dot(Bs),l=Xi.lengthSq(),h=Math.abs(1-r*r);let u,d,f,m;if(h>0)if(u=r*c-a,d=r*a-c,m=s*h,u>=0)if(d>=-m)if(d<=m){const x=1/h;u*=x,d*=x,f=u*(u+r*d+2*a)+d*(r*u+d+2*c)+l}else d=s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-r*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(r*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=r>0?-s:s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Or).addScaledVector(Bs,d),f}intersectSphere(t,e){Pi.subVectors(t.center,this.origin);const i=Pi.dot(this.direction),n=Pi.dot(Pi)-i*i,s=t.radius*t.radius;if(n>s)return null;const r=Math.sqrt(s-n),a=i-r,c=i+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,n=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,n=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),i>r||s>n||((s>i||isNaN(i))&&(i=s),(r<n||isNaN(n))&&(n=r),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),i>c||a>n)||((a>i||i!==i)&&(i=a),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,e,i,n,s){zr.subVectors(e,t),Os.subVectors(i,t),kr.crossVectors(zr,Os);let r=this.direction.dot(kr),a;if(r>0){if(n)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Xi.subVectors(this.origin,t);const c=a*this.direction.dot(Os.crossVectors(Xi,Os));if(c<0)return null;const l=a*this.direction.dot(zr.cross(Xi));if(l<0||c+l>r)return null;const h=-a*Xi.dot(kr);return h<0?null:this.at(h/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ge{constructor(t,e,i,n,s,r,a,c,l,h,u,d,f,m,x,p){ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,r,a,c,l,h,u,d,f,m,x,p)}set(t,e,i,n,s,r,a,c,l,h,u,d,f,m,x,p){const g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=n,g[1]=s,g[5]=r,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=x,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ge().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,n=1/Cn.setFromMatrixColumn(t,0).length(),s=1/Cn.setFromMatrixColumn(t,1).length(),r=1/Cn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,r=Math.cos(i),a=Math.sin(i),c=Math.cos(n),l=Math.sin(n),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=r*h,f=r*u,m=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+m*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=m+f*l,e[10]=r*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,m=l*h,x=l*u;e[0]=d+x*a,e[4]=m*a-f,e[8]=r*l,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=f*a-m,e[6]=x+d*a,e[10]=r*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,m=l*h,x=l*u;e[0]=d-x*a,e[4]=-r*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=r*h,e[9]=x-d*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const d=r*h,f=r*u,m=a*h,x=a*u;e[0]=c*h,e[4]=m*l-f,e[8]=d*l+x,e[1]=c*u,e[5]=x*l+d,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const d=r*c,f=r*l,m=a*c,x=a*l;e[0]=c*h,e[4]=x-d*u,e[8]=m*u+f,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+m,e[10]=d-x*u}else if(t.order==="XZY"){const d=r*c,f=r*l,m=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+x,e[5]=r*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cu,t,lu)}lookAt(t,e,i){const n=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Yi.crossVectors(i,je),Yi.lengthSq()===0&&(Math.abs(i.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Yi.crossVectors(i,je)),Yi.normalize(),zs.crossVectors(je,Yi),n[0]=Yi.x,n[4]=zs.x,n[8]=je.x,n[1]=Yi.y,n[5]=zs.y,n[9]=je.y,n[2]=Yi.z,n[6]=zs.z,n[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,r=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],f=i[13],m=i[2],x=i[6],p=i[10],g=i[14],v=i[3],y=i[7],_=i[11],E=i[15],T=n[0],C=n[4],L=n[8],M=n[12],S=n[1],P=n[5],U=n[9],I=n[13],O=n[2],B=n[6],D=n[10],V=n[14],X=n[3],J=n[7],nt=n[11],ot=n[15];return s[0]=r*T+a*S+c*O+l*X,s[4]=r*C+a*P+c*B+l*J,s[8]=r*L+a*U+c*D+l*nt,s[12]=r*M+a*I+c*V+l*ot,s[1]=h*T+u*S+d*O+f*X,s[5]=h*C+u*P+d*B+f*J,s[9]=h*L+u*U+d*D+f*nt,s[13]=h*M+u*I+d*V+f*ot,s[2]=m*T+x*S+p*O+g*X,s[6]=m*C+x*P+p*B+g*J,s[10]=m*L+x*U+p*D+g*nt,s[14]=m*M+x*I+p*V+g*ot,s[3]=v*T+y*S+_*O+E*X,s[7]=v*C+y*P+_*B+E*J,s[11]=v*L+y*U+_*D+E*nt,s[15]=v*M+y*I+_*V+E*ot,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],x=t[7],p=t[11],g=t[15],v=c*f-l*d,y=a*f-l*u,_=a*d-c*u,E=r*f-l*h,T=r*d-c*h,C=r*u-a*h;return e*(x*v-p*y+g*_)-i*(m*v-p*E+g*T)+n*(m*y-x*E+g*C)-s*(m*_-x*T+p*C)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],x=t[13],p=t[14],g=t[15],v=u*p*l-x*d*l+x*c*f-a*p*f-u*c*g+a*d*g,y=m*d*l-h*p*l-m*c*f+r*p*f+h*c*g-r*d*g,_=h*x*l-m*u*l+m*a*f-r*x*f-h*a*g+r*u*g,E=m*u*c-h*x*c-m*a*d+r*x*d+h*a*p-r*u*p,T=e*v+i*y+n*_+s*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return t[0]=v*C,t[1]=(x*d*s-u*p*s-x*n*f+i*p*f+u*n*g-i*d*g)*C,t[2]=(a*p*s-x*c*s+x*n*l-i*p*l-a*n*g+i*c*g)*C,t[3]=(u*c*s-a*d*s-u*n*l+i*d*l+a*n*f-i*c*f)*C,t[4]=y*C,t[5]=(h*p*s-m*d*s+m*n*f-e*p*f-h*n*g+e*d*g)*C,t[6]=(m*c*s-r*p*s-m*n*l+e*p*l+r*n*g-e*c*g)*C,t[7]=(r*d*s-h*c*s+h*n*l-e*d*l-r*n*f+e*c*f)*C,t[8]=_*C,t[9]=(m*u*s-h*x*s-m*i*f+e*x*f+h*i*g-e*u*g)*C,t[10]=(r*x*s-m*a*s+m*i*l-e*x*l-r*i*g+e*a*g)*C,t[11]=(h*a*s-r*u*s-h*i*l+e*u*l+r*i*f-e*a*f)*C,t[12]=E*C,t[13]=(h*x*n-m*u*n+m*i*d-e*x*d-h*i*p+e*u*p)*C,t[14]=(m*a*n-r*x*n-m*i*c+e*x*c+r*i*p-e*a*p)*C,t[15]=(r*u*n-h*a*n+h*i*c-e*u*c-r*i*d+e*a*d)*C,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,r=t.x,a=t.y,c=t.z,l=s*r,h=s*a;return this.set(l*r+i,l*a-n*c,l*c+n*a,0,l*a+n*c,h*a+i,h*c-n*r,0,l*c-n*a,h*c+n*r,s*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,r){return this.set(1,i,s,0,t,1,r,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,r=e._y,a=e._z,c=e._w,l=s+s,h=r+r,u=a+a,d=s*l,f=s*h,m=s*u,x=r*h,p=r*u,g=a*u,v=c*l,y=c*h,_=c*u,E=i.x,T=i.y,C=i.z;return n[0]=(1-(x+g))*E,n[1]=(f+_)*E,n[2]=(m-y)*E,n[3]=0,n[4]=(f-_)*T,n[5]=(1-(d+g))*T,n[6]=(p+v)*T,n[7]=0,n[8]=(m+y)*C,n[9]=(p-v)*C,n[10]=(1-(d+x))*C,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;if(t.x=n[12],t.y=n[13],t.z=n[14],this.determinant()===0)return i.set(1,1,1),e.identity(),this;let s=Cn.set(n[0],n[1],n[2]).length();const r=Cn.set(n[4],n[5],n[6]).length(),a=Cn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),oi.copy(this);const l=1/s,h=1/r,u=1/a;return oi.elements[0]*=l,oi.elements[1]*=l,oi.elements[2]*=l,oi.elements[4]*=h,oi.elements[5]*=h,oi.elements[6]*=h,oi.elements[8]*=u,oi.elements[9]*=u,oi.elements[10]*=u,e.setFromRotationMatrix(oi),i.x=s,i.y=r,i.z=a,this}makePerspective(t,e,i,n,s,r,a=wi,c=!1){const l=this.elements,h=2*s/(e-t),u=2*s/(i-n),d=(e+t)/(e-t),f=(i+n)/(i-n);let m,x;if(c)m=s/(r-s),x=r*s/(r-s);else if(a===wi)m=-(r+s)/(r-s),x=-2*r*s/(r-s);else if(a===gr)m=-r/(r-s),x=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,n,s,r,a=wi,c=!1){const l=this.elements,h=2/(e-t),u=2/(i-n),d=-(e+t)/(e-t),f=-(i+n)/(i-n);let m,x;if(c)m=1/(r-s),x=r/(r-s);else if(a===wi)m=-2/(r-s),x=-(r+s)/(r-s);else if(a===gr)m=-1/(r-s),x=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Cn=new N,oi=new ge,cu=new N(0,0,0),lu=new N(1,1,1),Yi=new N,zs=new N,je=new N,tc=new ge,ec=new $n;class fi{constructor(t=0,e=0,i=0,n=fi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],r=n[4],a=n[8],c=n[1],l=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Xt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return tc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ec.setFromEuler(this),this.setFromQuaternion(ec,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fi.DEFAULT_ORDER="XYZ";class Dl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hu=0;const ic=new N,Rn=new $n,Ii=new ge,ks=new N,os=new N,uu=new N,du=new $n,nc=new N(1,0,0),sc=new N(0,1,0),rc=new N(0,0,1),oc={type:"added"},fu={type:"removed"},Pn={type:"childadded",child:null},Gr={type:"childremoved",child:null};class Fe extends Kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DEFAULT_UP.clone();const t=new N,e=new fi,i=new $n,n=new N(1,1,1);function s(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ge},normalMatrix:{value:new kt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=Fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Rn.setFromAxisAngle(t,e),this.quaternion.multiply(Rn),this}rotateOnWorldAxis(t,e){return Rn.setFromAxisAngle(t,e),this.quaternion.premultiply(Rn),this}rotateX(t){return this.rotateOnAxis(nc,t)}rotateY(t){return this.rotateOnAxis(sc,t)}rotateZ(t){return this.rotateOnAxis(rc,t)}translateOnAxis(t,e){return ic.copy(t).applyQuaternion(this.quaternion),this.position.add(ic.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nc,t)}translateY(t){return this.translateOnAxis(sc,t)}translateZ(t){return this.translateOnAxis(rc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ii.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ks.copy(t):ks.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ii.lookAt(os,ks,this.up):Ii.lookAt(ks,os,this.up),this.quaternion.setFromRotationMatrix(Ii),n&&(Ii.extractRotation(n.matrixWorld),Rn.setFromRotationMatrix(Ii),this.quaternion.premultiply(Rn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(oc),Pn.child=t,this.dispatchEvent(Pn),Pn.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(fu),Gr.child=t,this.dispatchEvent(Gr),Gr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(oc),Pn.child=t,this.dispatchEvent(Pn),Pn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,r=n.length;s<r;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,t,uu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,du,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,r=n.length;s<r;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(a=>({...a})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));n.material=a}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];n.animations.push(s(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),u=r(t.shapes),d=r(t.skeletons),f=r(t.animations),m=r(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=n,i;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}Fe.DEFAULT_UP=new N(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new N,Li=new N,Vr=new N,Di=new N,In=new N,Ln=new N,ac=new N,Hr=new N,Wr=new N,qr=new N,Xr=new Me,Yr=new Me,Zr=new Me;class li{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),ai.subVectors(t,e),n.cross(ai);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){ai.subVectors(n,e),Li.subVectors(i,e),Vr.subVectors(t,e);const r=ai.dot(ai),a=ai.dot(Li),c=ai.dot(Vr),l=Li.dot(Li),h=Li.dot(Vr),u=r*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,m=(r*h-a*c)*d;return s.set(1-f-m,m,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(t,e,i,n,s,r,a,c){return this.getBarycoord(t,e,i,n,Di)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Di.x),c.addScaledVector(r,Di.y),c.addScaledVector(a,Di.z),c)}static getInterpolatedAttribute(t,e,i,n,s,r){return Xr.setScalar(0),Yr.setScalar(0),Zr.setScalar(0),Xr.fromBufferAttribute(t,e),Yr.fromBufferAttribute(t,i),Zr.fromBufferAttribute(t,n),r.setScalar(0),r.addScaledVector(Xr,s.x),r.addScaledVector(Yr,s.y),r.addScaledVector(Zr,s.z),r}static isFrontFacing(t,e,i,n){return ai.subVectors(i,e),Li.subVectors(t,e),ai.cross(Li).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ai.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),ai.cross(Li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return li.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return li.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return li.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return li.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return li.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let r,a;In.subVectors(n,i),Ln.subVectors(s,i),Hr.subVectors(t,i);const c=In.dot(Hr),l=Ln.dot(Hr);if(c<=0&&l<=0)return e.copy(i);Wr.subVectors(t,n);const h=In.dot(Wr),u=Ln.dot(Wr);if(h>=0&&u<=h)return e.copy(n);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(i).addScaledVector(In,r);qr.subVectors(t,s);const f=In.dot(qr),m=Ln.dot(qr);if(m>=0&&f<=m)return e.copy(s);const x=f*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(i).addScaledVector(Ln,a);const p=h*m-f*u;if(p<=0&&u-h>=0&&f-m>=0)return ac.subVectors(s,n),a=(u-h)/(u-h+(f-m)),e.copy(n).addScaledVector(ac,a);const g=1/(p+x+d);return r=x*g,a=d*g,e.copy(i).addScaledVector(In,r).addScaledVector(Ln,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function Kr(o,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?o+(t-o)*6*e:e<1/2?t:e<2/3?o+(t-o)*6*(2/3-e):o}class Ot{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ni){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=Kt.workingColorSpace){if(t=tu(t,1),e=Xt(e,0,1),i=Xt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,r=2*i-s;this.r=Kr(r,s,t+1/3),this.g=Kr(r,s,t),this.b=Kr(r,s,t-1/3)}return Kt.colorSpaceToWorking(this,n),this}setStyle(t,e=ni){function i(s){s!==void 0&&parseFloat(s)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=n[1],a=n[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Ut("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ni){const i=Nl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}copyLinearToSRGB(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ni){return Kt.workingToColorSpace(Be.copy(this),t),Math.round(Xt(Be.r*255,0,255))*65536+Math.round(Xt(Be.g*255,0,255))*256+Math.round(Xt(Be.b*255,0,255))}getHexString(t=ni){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Be.copy(this),e);const i=Be.r,n=Be.g,s=Be.b,r=Math.max(i,n,s),a=Math.min(i,n,s);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const u=r-a;switch(l=h<=.5?u/(r+a):u/(2-r-a),r){case i:c=(n-s)/u+(n<s?6:0);break;case n:c=(s-i)/u+2;break;case s:c=(i-n)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=ni){Kt.workingToColorSpace(Be.copy(this),t);const e=Be.r,i=Be.g,n=Be.b;return t!==ni?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+e,Zi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Zi),t.getHSL(Gs);const i=Ir(Zi.h,Gs.h,e),n=Ir(Zi.s,Gs.s,e),s=Ir(Zi.l,Gs.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Ot;Ot.NAMES=Nl;let pu=0,Jn=class extends Kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=jn(),this.name="",this.type="Material",this.blending=zn,this.side=tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xo,this.blendDst=vo,this.blendEquation=mn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=Vn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sn,this.stencilZFail=Sn,this.stencilZPass=Sn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Ut(`Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Ut(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==zn&&(i.blending=this.blending),this.side!==tn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==xo&&(i.blendSrc=this.blendSrc),this.blendDst!==vo&&(i.blendDst=this.blendDst),this.blendEquation!==mn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Sn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Sn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Sn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const r=[];for(const a in s){const c=s[a];delete c.metadata,r.push(c)}return r}if(e){const s=n(t.textures),r=n(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class xt extends Jn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new N,Vs=new yt;let mu=0;class di{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ya,this.updateRanges=[],this.gpuType=Mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Vs.fromBufferAttribute(this,e),Vs.applyMatrix3(t),this.setXY(e,Vs.x,Vs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ns(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=We(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ns(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ns(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ns(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ns(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array),n=We(n,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ya&&(t.usage=this.usage),t}}class Fl extends di{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Ul extends di{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class jt extends di{constructor(t,e,i){super(new Float32Array(t),e,i)}}let gu=0;const ii=new ge,jr=new Fe,Dn=new N,$e=new As,as=new As,Le=new N;class Pe extends Kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pl(t)?Ul:Fl)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new kt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ii.makeRotationFromQuaternion(t),this.applyMatrix4(ii),this}rotateX(t){return ii.makeRotationX(t),this.applyMatrix4(ii),this}rotateY(t){return ii.makeRotationY(t),this.applyMatrix4(ii),this}rotateZ(t){return ii.makeRotationZ(t),this.applyMatrix4(ii),this}translate(t,e,i){return ii.makeTranslation(t,e,i),this.applyMatrix4(ii),this}scale(t,e,i){return ii.makeScale(t,e,i),this.applyMatrix4(ii),this}lookAt(t){return jr.lookAt(t),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Dn).negate(),this.translate(Dn.x,Dn.y,Dn.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new jt(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new As);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];$e.setFromBufferAttribute(s),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const i=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){const a=e[s];as.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors($e.min,as.min),$e.expandByPoint(Le),Le.addVectors($e.max,as.max),$e.expandByPoint(Le)):($e.expandByPoint(as.min),$e.expandByPoint(as.max))}$e.getCenter(i);let n=0;for(let s=0,r=t.count;s<r;s++)Le.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Le));if(e)for(let s=0,r=e.length;s<r;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Le.fromBufferAttribute(a,l),c&&(Dn.fromBufferAttribute(t,l),Le.add(Dn)),n=Math.max(n,i.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new di(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<i.count;L++)a[L]=new N,c[L]=new N;const l=new N,h=new N,u=new N,d=new yt,f=new yt,m=new yt,x=new N,p=new N;function g(L,M,S){l.fromBufferAttribute(i,L),h.fromBufferAttribute(i,M),u.fromBufferAttribute(i,S),d.fromBufferAttribute(s,L),f.fromBufferAttribute(s,M),m.fromBufferAttribute(s,S),h.sub(l),u.sub(l),f.sub(d),m.sub(d);const P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(P),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[L].add(x),a[M].add(x),a[S].add(x),c[L].add(p),c[M].add(p),c[S].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let L=0,M=v.length;L<M;++L){const S=v[L],P=S.start,U=S.count;for(let I=P,O=P+U;I<O;I+=3)g(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const y=new N,_=new N,E=new N,T=new N;function C(L){E.fromBufferAttribute(n,L),T.copy(E);const M=a[L];y.copy(M),y.sub(E.multiplyScalar(E.dot(M))).normalize(),_.crossVectors(T,M);const P=_.dot(c[L])<0?-1:1;r.setXYZW(L,y.x,y.y,y.z,P)}for(let L=0,M=v.length;L<M;++L){const S=v[L],P=S.start,U=S.count;for(let I=P,O=P+U;I<O;I+=3)C(t.getX(I+0)),C(t.getX(I+1)),C(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new di(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const n=new N,s=new N,r=new N,a=new N,c=new N,l=new N,h=new N,u=new N;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),x=t.getX(d+1),p=t.getX(d+2);n.fromBufferAttribute(e,m),s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,p),h.subVectors(r,s),u.subVectors(n,s),h.cross(u),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,p),a.add(h),c.add(h),l.add(h),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)n.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,s),u.subVectors(n,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,m=0;for(let x=0,p=c.length;x<p;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let g=0;g<h;g++)d[m++]=l[f++]}return new di(d,h,u)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Pe,i=this.index.array,n=this.attributes;for(const a in n){const c=n[a],l=t(c,i);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,i);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const n={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(n[c]=h,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const l in n){const h=n[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cc=new ge,ln=new Ll,Hs=new Mr,lc=new N,Ws=new N,qs=new N,Xs=new N,$r=new N,Ys=new N,hc=new N,Zs=new N;class q extends Fe{constructor(t=new Pe,e=new xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const a=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const a=this.morphTargetInfluences;if(s&&a){Ys.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&($r.fromBufferAttribute(u,t),r?Ys.addScaledVector($r,h):Ys.addScaledVector($r.sub(e),h))}e.add(Ys)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Hs.copy(i.boundingSphere),Hs.applyMatrix4(s),ln.copy(t.ray).recast(t.near),!(Hs.containsPoint(ln.origin)===!1&&(ln.intersectSphere(Hs,lc)===null||ln.origin.distanceToSquared(lc)>(t.far-t.near)**2))&&(cc.copy(s).invert(),ln.copy(t.ray).applyMatrix4(cc),!(i.boundingBox!==null&&ln.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ln)))}_computeIntersections(t,e,i){let n;const s=this.geometry,r=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(r))for(let m=0,x=d.length;m<x;m++){const p=d[m],g=r[p.materialIndex],v=Math.max(p.start,f.start),y=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let _=v,E=y;_<E;_+=3){const T=a.getX(_),C=a.getX(_+1),L=a.getX(_+2);n=Ks(this,g,t,i,l,h,u,T,C,L),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let p=m,g=x;p<g;p+=3){const v=a.getX(p),y=a.getX(p+1),_=a.getX(p+2);n=Ks(this,r,t,i,l,h,u,v,y,_),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}else if(c!==void 0)if(Array.isArray(r))for(let m=0,x=d.length;m<x;m++){const p=d[m],g=r[p.materialIndex],v=Math.max(p.start,f.start),y=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let _=v,E=y;_<E;_+=3){const T=_,C=_+1,L=_+2;n=Ks(this,g,t,i,l,h,u,T,C,L),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const m=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let p=m,g=x;p<g;p+=3){const v=p,y=p+1,_=p+2;n=Ks(this,r,t,i,l,h,u,v,y,_),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}}}function xu(o,t,e,i,n,s,r,a){let c;if(t.side===Xe?c=i.intersectTriangle(r,s,n,!0,a):c=i.intersectTriangle(n,s,r,t.side===tn,a),c===null)return null;Zs.copy(a),Zs.applyMatrix4(o.matrixWorld);const l=e.ray.origin.distanceTo(Zs);return l<e.near||l>e.far?null:{distance:l,point:Zs.clone(),object:o}}function Ks(o,t,e,i,n,s,r,a,c,l){o.getVertexPosition(a,Ws),o.getVertexPosition(c,qs),o.getVertexPosition(l,Xs);const h=xu(o,t,e,i,Ws,qs,Xs,hc);if(h){const u=new N;li.getBarycoord(hc,Ws,qs,Xs,u),n&&(h.uv=li.getInterpolatedAttribute(n,a,c,l,u,new yt)),s&&(h.uv1=li.getInterpolatedAttribute(s,a,c,l,u,new yt)),r&&(h.normal=li.getInterpolatedAttribute(r,a,c,l,u,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new N,materialIndex:0};li.getNormal(Ws,qs,Xs,d.normal),h.face=d,h.barycoord=u}return h}class Ye extends Pe{constructor(t=1,e=1,i=1,n=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:r};const a=this;n=Math.floor(n),s=Math.floor(s),r=Math.floor(r);const c=[],l=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,i,e,t,r,s,0),m("z","y","x",1,-1,i,e,-t,r,s,1),m("x","z","y",1,1,t,i,e,n,r,2),m("x","z","y",1,-1,t,i,-e,n,r,3),m("x","y","z",1,-1,t,e,i,n,s,4),m("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(c),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(u,2));function m(x,p,g,v,y,_,E,T,C,L,M){const S=_/C,P=E/L,U=_/2,I=E/2,O=T/2,B=C+1,D=L+1;let V=0,X=0;const J=new N;for(let nt=0;nt<D;nt++){const ot=nt*P-I;for(let at=0;at<B;at++){const Ft=at*S-U;J[x]=Ft*v,J[p]=ot*y,J[g]=O,l.push(J.x,J.y,J.z),J[x]=0,J[p]=0,J[g]=T>0?1:-1,h.push(J.x,J.y,J.z),u.push(at/C),u.push(1-nt/L),V+=1}}for(let nt=0;nt<L;nt++)for(let ot=0;ot<C;ot++){const at=d+ot+B*nt,Ft=d+ot+B*(nt+1),ae=d+(ot+1)+B*(nt+1),ie=d+(ot+1)+B*nt;c.push(at,Ft,ie),c.push(Ft,ae,ie),X+=6}a.addGroup(f,X,M),f+=X,d+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ye(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xn(o){const t={};for(const e in o){t[e]={};for(const i in o[e]){const n=o[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Ge(o){const t={};for(let e=0;e<o.length;e++){const i=Xn(o[e]);for(const n in i)t[n]=i[n]}return t}function vu(o){const t=[];for(let e=0;e<o.length;e++)t.push(o[e].clone());return t}function Bl(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const _u={clone:Xn,merge:Ge};var yu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ti extends Jn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yu,this.fragmentShader=Mu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xn(t.uniforms),this.uniformsGroups=vu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const r=this.uniforms[n].value;r&&r.isTexture?e.uniforms[n]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[n]={type:"m4",value:r.toArray()}:e.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Ol extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ki=new N,uc=new yt,dc=new yt;class si extends Ol{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ca*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ca*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z),Ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z)}getViewSize(t,e){return this.getViewBounds(t,uc,dc),e.subVectors(dc,uc)}setViewOffset(t,e,i,n,s,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Pr*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;s+=r.offsetX*n/c,e-=r.offsetY*i/l,n*=r.width/c,i*=r.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Nn=-90,Fn=1;class wu extends Fe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new si(Nn,Fn,t,e);n.layers=this.layers,this.add(n);const s=new si(Nn,Fn,t,e);s.layers=this.layers,this.add(s);const r=new si(Nn,Fn,t,e);r.layers=this.layers,this.add(r);const a=new si(Nn,Fn,t,e);a.layers=this.layers,this.add(a);const c=new si(Nn,Fn,t,e);c.layers=this.layers,this.add(c);const l=new si(Nn,Fn,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,r,a,c]=e;for(const l of e)this.remove(l);if(t===wi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===gr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,r,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,r),t.setRenderTarget(i,2,n),t.render(e,a),t.setRenderTarget(i,3,n),t.render(e,c),t.setRenderTarget(i,4,n),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class zl extends ze{constructor(t=[],e=yn,i,n,s,r,a,c,l,h){super(t,e,i,n,s,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class kl extends bi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new zl(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Ye(5,5,5),s=new Ti({name:"CubemapFromEquirect",uniforms:Xn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:ki});s.uniforms.tEquirect.value=e;const r=new q(n,s),a=e.minFilter;return e.minFilter===vn&&(e.minFilter=Oe),new wu(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,n);t.setRenderTarget(s)}}class Ne extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Su={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ne,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ne,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ne,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const x of t.hand.values()){const p=e.getJointPose(x,i),g=this._getHandJoint(l,x);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Su)))}return a!==null&&(a.visible=n!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ne;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class ba{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ot(t),this.near=e,this.far=i}clone(){return new ba(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bu extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Eu extends ze{constructor(t=null,e=1,i=1,n,s,r,a,c,l=De,h=De,u,d){super(null,r,a,c,l,h,n,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qr=new N,Tu=new N,Au=new kt;class pn{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Qr.subVectors(i,e).cross(Tu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Qr),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Au.getNormalMatrix(t),n=this.coplanarPoint(Qr).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hn=new Mr,Cu=new yt(.5,.5),js=new N;class Ea{constructor(t=new pn,e=new pn,i=new pn,n=new pn,s=new pn,r=new pn){this.planes=[t,e,i,n,s,r]}set(t,e,i,n,s,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(n),a[4].copy(s),a[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=wi,i=!1){const n=this.planes,s=t.elements,r=s[0],a=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],m=s[8],x=s[9],p=s[10],g=s[11],v=s[12],y=s[13],_=s[14],E=s[15];if(n[0].setComponents(l-r,f-h,g-m,E-v).normalize(),n[1].setComponents(l+r,f+h,g+m,E+v).normalize(),n[2].setComponents(l+a,f+u,g+x,E+y).normalize(),n[3].setComponents(l-a,f-u,g-x,E-y).normalize(),i)n[4].setComponents(c,d,p,_).normalize(),n[5].setComponents(l-c,f-d,g-p,E-_).normalize();else if(n[4].setComponents(l-c,f-d,g-p,E-_).normalize(),e===wi)n[5].setComponents(l+c,f+d,g+p,E+_).normalize();else if(e===gr)n[5].setComponents(c,d,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hn)}intersectsSprite(t){hn.center.set(0,0,0);const e=Cu.distanceTo(t.center);return hn.radius=.7071067811865476+e,hn.applyMatrix4(t.matrixWorld),this.intersectsSphere(hn)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(js.x=n.normal.x>0?t.max.x:t.min.x,js.y=n.normal.y>0?t.max.y:t.min.y,js.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(js)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Gl extends Jn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const fc=new ge,la=new Ll,$s=new Mr,Js=new N;class Ru extends Fe{constructor(t=new Pe,e=new Gl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$s.copy(i.boundingSphere),$s.applyMatrix4(n),$s.radius+=s,t.ray.intersectsSphere($s)===!1)return;fc.copy(n).invert(),la.copy(t.ray).applyMatrix4(fc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){const d=Math.max(0,r.start),f=Math.min(l.count,r.start+r.count);for(let m=d,x=f;m<x;m++){const p=l.getX(m);Js.fromBufferAttribute(u,p),pc(Js,p,c,n,t,e,this)}}else{const d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let m=d,x=f;m<x;m++)Js.fromBufferAttribute(u,m),pc(Js,m,c,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const a=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function pc(o,t,e,i,n,s,r){const a=la.distanceSqToPoint(o);if(a<e){const c=new N;la.closestPointToPoint(o,c),c.applyMatrix4(i);const l=n.ray.origin.distanceTo(c);if(l<n.near||l>n.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class en extends ze{constructor(t,e,i,n,s,r,a,c,l){super(t,e,i,n,s,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ss extends ze{constructor(t,e,i=Ei,n,s,r,a=De,c=De,l,h=Hi,u=1){if(h!==Hi&&h!==_n)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,n,s,r,a,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Sa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Pu extends Ss{constructor(t,e=Ei,i=yn,n,s,r=De,a=De,c,l=Hi){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,n,s,r,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Vl extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ta extends Pe{constructor(t=1,e=1,i=4,n=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:n,heightSegments:s},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),s=Math.max(1,Math.floor(s));const r=[],a=[],c=[],l=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,m=i*2+s,x=n+1,p=new N,g=new N;for(let v=0;v<=m;v++){let y=0,_=0,E=0,T=0;if(v<=i){const M=v/i,S=M*Math.PI/2;_=-h-t*Math.cos(S),E=t*Math.sin(S),T=-t*Math.cos(S),y=M*u}else if(v<=i+s){const M=(v-i)/s;_=-h+M*e,E=t,T=0,y=u+M*d}else{const M=(v-i-s)/i,S=M*Math.PI/2;_=h+t*Math.sin(S),E=t*Math.cos(S),T=t*Math.sin(S),y=u+d+M*u}const C=Math.max(0,Math.min(1,y/f));let L=0;v===0?L=.5/n:v===m&&(L=-.5/n);for(let M=0;M<=n;M++){const S=M/n,P=S*Math.PI*2,U=Math.sin(P),I=Math.cos(P);g.x=-E*I,g.y=_,g.z=E*U,a.push(g.x,g.y,g.z),p.set(-E*I,T,E*U),p.normalize(),c.push(p.x,p.y,p.z),l.push(S+L,C)}if(v>0){const M=(v-1)*x;for(let S=0;S<n;S++){const P=M+S,U=M+S+1,I=v*x+S,O=v*x+S+1;r.push(P,U,I),r.push(U,O,I)}}}this.setIndex(r),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ta(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Qi extends Pe{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);const s=[],r=[],a=[],c=[],l=new N,h=new yt;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=i+u/e*n;l.x=t*Math.cos(f),l.y=t*Math.sin(f),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[d]/t+1)/2,h.y=(r[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(a,3)),this.setAttribute("uv",new jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ve extends Pe{constructor(t=1,e=1,i=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c};const l=this;n=Math.floor(n),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const x=[],p=i/2;let g=0;v(),r===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(d,3)),this.setAttribute("uv",new jt(f,2));function v(){const _=new N,E=new N;let T=0;const C=(e-t)/i;for(let L=0;L<=s;L++){const M=[],S=L/s,P=S*(e-t)+t;for(let U=0;U<=n;U++){const I=U/n,O=I*c+a,B=Math.sin(O),D=Math.cos(O);E.x=P*B,E.y=-S*i+p,E.z=P*D,u.push(E.x,E.y,E.z),_.set(B,C,D).normalize(),d.push(_.x,_.y,_.z),f.push(I,1-S),M.push(m++)}x.push(M)}for(let L=0;L<n;L++)for(let M=0;M<s;M++){const S=x[M][L],P=x[M+1][L],U=x[M+1][L+1],I=x[M][L+1];(t>0||M!==0)&&(h.push(S,P,I),T+=3),(e>0||M!==s-1)&&(h.push(P,U,I),T+=3)}l.addGroup(g,T,0),g+=T}function y(_){const E=m,T=new yt,C=new N;let L=0;const M=_===!0?t:e,S=_===!0?1:-1;for(let U=1;U<=n;U++)u.push(0,p*S,0),d.push(0,S,0),f.push(.5,.5),m++;const P=m;for(let U=0;U<=n;U++){const O=U/n*c+a,B=Math.cos(O),D=Math.sin(O);C.x=M*D,C.y=p*S,C.z=M*B,u.push(C.x,C.y,C.z),d.push(0,S,0),T.x=B*.5+.5,T.y=D*.5*S+.5,f.push(T.x,T.y),m++}for(let U=0;U<n;U++){const I=E+U,O=P+U;_===!0?h.push(O,O+1,I):h.push(O+1,O,I),L+=3}l.addGroup(g,L,_===!0?1:2),g+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ve(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nn extends ve{constructor(t=1,e=1,i=32,n=1,s=!1,r=0,a=Math.PI*2){super(0,t,e,i,n,s,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(t){return new nn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Cs extends Pe{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};const s=[],r=[];a(n),l(i),h(),this.setAttribute("position",new jt(s,3)),this.setAttribute("normal",new jt(s.slice(),3)),this.setAttribute("uv",new jt(r,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new N,_=new N,E=new N;for(let T=0;T<e.length;T+=3)f(e[T+0],y),f(e[T+1],_),f(e[T+2],E),c(y,_,E,v)}function c(v,y,_,E){const T=E+1,C=[];for(let L=0;L<=T;L++){C[L]=[];const M=v.clone().lerp(_,L/T),S=y.clone().lerp(_,L/T),P=T-L;for(let U=0;U<=P;U++)U===0&&L===T?C[L][U]=M:C[L][U]=M.clone().lerp(S,U/P)}for(let L=0;L<T;L++)for(let M=0;M<2*(T-L)-1;M++){const S=Math.floor(M/2);M%2===0?(d(C[L][S+1]),d(C[L+1][S]),d(C[L][S])):(d(C[L][S+1]),d(C[L+1][S+1]),d(C[L+1][S]))}}function l(v){const y=new N;for(let _=0;_<s.length;_+=3)y.x=s[_+0],y.y=s[_+1],y.z=s[_+2],y.normalize().multiplyScalar(v),s[_+0]=y.x,s[_+1]=y.y,s[_+2]=y.z}function h(){const v=new N;for(let y=0;y<s.length;y+=3){v.x=s[y+0],v.y=s[y+1],v.z=s[y+2];const _=p(v)/2/Math.PI+.5,E=g(v)/Math.PI+.5;r.push(_,1-E)}m(),u()}function u(){for(let v=0;v<r.length;v+=6){const y=r[v+0],_=r[v+2],E=r[v+4],T=Math.max(y,_,E),C=Math.min(y,_,E);T>.9&&C<.1&&(y<.2&&(r[v+0]+=1),_<.2&&(r[v+2]+=1),E<.2&&(r[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function f(v,y){const _=v*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function m(){const v=new N,y=new N,_=new N,E=new N,T=new yt,C=new yt,L=new yt;for(let M=0,S=0;M<s.length;M+=9,S+=6){v.set(s[M+0],s[M+1],s[M+2]),y.set(s[M+3],s[M+4],s[M+5]),_.set(s[M+6],s[M+7],s[M+8]),T.set(r[S+0],r[S+1]),C.set(r[S+2],r[S+3]),L.set(r[S+4],r[S+5]),E.copy(v).add(y).add(_).divideScalar(3);const P=p(E);x(T,S+0,v,P),x(C,S+2,y,P),x(L,S+4,_,P)}}function x(v,y,_,E){E<0&&v.x===1&&(r[y]=v.x-1),_.x===0&&_.z===0&&(r[y]=E/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.vertices,t.indices,t.radius,t.detail)}}class Aa extends Cs{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,n=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Aa(t.radius,t.detail)}}class Ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ut("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,n=this.getPoint(0),s=0;e.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),s+=i.distanceTo(n),e.push(s),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let n=0;const s=i.length;let r;e?r=e:r=t*i[s-1];let a=0,c=s-1,l;for(;a<=c;)if(n=Math.floor(a+(c-a)/2),l=i[n]-r,l<0)a=n+1;else if(l>0)c=n-1;else{c=n;break}if(n=c,i[n]===r)return n/(s-1);const h=i[n],d=i[n+1]-h,f=(r-h)/d;return(n+f)/(s-1)}getTangent(t,e){let n=t-1e-4,s=t+1e-4;n<0&&(n=0),s>1&&(s=1);const r=this.getPoint(n),a=this.getPoint(s),c=e||(r.isVector2?new yt:new N);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new N,n=[],s=[],r=[],a=new N,c=new ge;for(let f=0;f<=t;f++){const m=f/t;n[f]=this.getTangentAt(m,new N)}s[0]=new N,r[0]=new N;let l=Number.MAX_VALUE;const h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),a.crossVectors(n[0],i).normalize(),s[0].crossVectors(n[0],a),r[0].crossVectors(n[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(n[f-1],n[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Xt(n[f-1].dot(n[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,m))}r[f].crossVectors(n[f],s[f])}if(e===!0){let f=Math.acos(Xt(s[0].dot(s[t]),-1,1));f/=t,n[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(c.makeRotationAxis(n[m],f*m)),r[m].crossVectors(n[m],s[m])}return{tangents:n,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ca extends Ai{constructor(t=0,e=0,i=1,n=1,s=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=n,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new yt){const i=e,n=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=n;for(;s>n;)s-=n;s<Number.EPSILON&&(r?s=0:s=n),this.aClockwise===!0&&!r&&(s===n?s=-n:s=s-n);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Iu extends Ca{constructor(t,e,i,n,s,r){super(t,e,i,i,n,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Ra(){let o=0,t=0,e=0,i=0;function n(s,r,a,c){o=s,t=a,e=-3*s+3*r-2*a-c,i=2*s-2*r+a+c}return{initCatmullRom:function(s,r,a,c,l){n(r,a,l*(a-s),l*(c-r))},initNonuniformCatmullRom:function(s,r,a,c,l,h,u){let d=(r-s)/l-(a-s)/(l+h)+(a-r)/h,f=(a-r)/h-(c-r)/(h+u)+(c-a)/u;d*=h,f*=h,n(r,a,d,f)},calc:function(s){const r=s*s,a=r*s;return o+t*s+e*r+i*a}}}const Qs=new N,to=new Ra,eo=new Ra,io=new Ra;class Lu extends Ai{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new N){const i=e,n=this.points,s=n.length,r=(s-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=n[(a-1)%s]:(Qs.subVectors(n[0],n[1]).add(n[0]),l=Qs);const u=n[a%s],d=n[(a+1)%s];if(this.closed||a+2<s?h=n[(a+2)%s]:(Qs.subVectors(n[s-1],n[s-2]).add(n[s-1]),h=Qs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),p<1e-4&&(p=x),to.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,x,p),eo.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,x,p),io.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,x,p)}else this.curveType==="catmullrom"&&(to.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),eo.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),io.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return i.set(to.calc(c),eo.calc(c),io.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new N().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function mc(o,t,e,i,n){const s=(i-t)*.5,r=(n-e)*.5,a=o*o,c=o*a;return(2*e-2*i+s+r)*c+(-3*e+3*i-2*s-r)*a+s*o+e}function Du(o,t){const e=1-o;return e*e*t}function Nu(o,t){return 2*(1-o)*o*t}function Fu(o,t){return o*o*t}function xs(o,t,e,i){return Du(o,t)+Nu(o,e)+Fu(o,i)}function Uu(o,t){const e=1-o;return e*e*e*t}function Bu(o,t){const e=1-o;return 3*e*e*o*t}function Ou(o,t){return 3*(1-o)*o*o*t}function zu(o,t){return o*o*o*t}function vs(o,t,e,i,n){return Uu(o,t)+Bu(o,e)+Ou(o,i)+zu(o,n)}class Hl extends Ai{constructor(t=new yt,e=new yt,i=new yt,n=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new yt){const i=e,n=this.v0,s=this.v1,r=this.v2,a=this.v3;return i.set(vs(t,n.x,s.x,r.x,a.x),vs(t,n.y,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ku extends Ai{constructor(t=new N,e=new N,i=new N,n=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new N){const i=e,n=this.v0,s=this.v1,r=this.v2,a=this.v3;return i.set(vs(t,n.x,s.x,r.x,a.x),vs(t,n.y,s.y,r.y,a.y),vs(t,n.z,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wl extends Ai{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gu extends Ai{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ql extends Ai{constructor(t=new yt,e=new yt,i=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new yt){const i=e,n=this.v0,s=this.v1,r=this.v2;return i.set(xs(t,n.x,s.x,r.x),xs(t,n.y,s.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vu extends Ai{constructor(t=new N,e=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new N){const i=e,n=this.v0,s=this.v1,r=this.v2;return i.set(xs(t,n.x,s.x,r.x),xs(t,n.y,s.y,r.y),xs(t,n.z,s.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xl extends Ai{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){const i=e,n=this.points,s=(n.length-1)*t,r=Math.floor(s),a=s-r,c=n[r===0?r:r-1],l=n[r],h=n[r>n.length-2?n.length-1:r+1],u=n[r>n.length-3?n.length-1:r+2];return i.set(mc(a,c.x,l.x,h.x,u.x),mc(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new yt().fromArray(n))}return this}}var gc=Object.freeze({__proto__:null,ArcCurve:Iu,CatmullRomCurve3:Lu,CubicBezierCurve:Hl,CubicBezierCurve3:ku,EllipseCurve:Ca,LineCurve:Wl,LineCurve3:Gu,QuadraticBezierCurve:ql,QuadraticBezierCurve3:Vu,SplineCurve:Xl});class Hu extends Ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new gc[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),n=this.getCurveLengths();let s=0;for(;s<n.length;){if(n[s]>=i){const r=n[s]-i,a=this.curves[s],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,n=this.curves.length;i<n;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let n=0,s=this.curves;n<s.length;n++){const r=s[n],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const n=t.curves[e];this.curves.push(n.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const n=this.curves[e];t.curves.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const n=t.curves[e];this.curves.push(new gc[n.type]().fromJSON(n))}return this}}class xc extends Hu{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Wl(this.currentPoint.clone(),new yt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,n){const s=new ql(this.currentPoint.clone(),new yt(t,e),new yt(i,n));return this.curves.push(s),this.currentPoint.set(i,n),this}bezierCurveTo(t,e,i,n,s,r){const a=new Hl(this.currentPoint.clone(),new yt(t,e),new yt(i,n),new yt(s,r));return this.curves.push(a),this.currentPoint.set(s,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Xl(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,n,s,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,n,s,r),this}absarc(t,e,i,n,s,r){return this.absellipse(t,e,i,i,n,s,r),this}ellipse(t,e,i,n,s,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,n,s,r,a,c),this}absellipse(t,e,i,n,s,r,a,c){const l=new Ca(t,e,i,n,s,r,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}let Rs=class extends xc{constructor(t){super(t),this.uuid=jn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,n=this.holes.length;i<n;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const n=t.holes[e];this.holes.push(n.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const n=this.holes[e];t.holes.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const n=t.holes[e];this.holes.push(new xc().fromJSON(n))}return this}};function Wu(o,t,e=2){const i=t&&t.length,n=i?t[0]*e:o.length;let s=Yl(o,0,n,e,!0);const r=[];if(!s||s.next===s.prev)return r;let a,c,l;if(i&&(s=Ku(o,t,s,e)),o.length>80*e){a=o[0],c=o[1];let h=a,u=c;for(let d=e;d<n;d+=e){const f=o[d],m=o[d+1];f<a&&(a=f),m<c&&(c=m),f>h&&(h=f),m>u&&(u=m)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return bs(s,r,e,a,c,l,0),r}function Yl(o,t,e,i,n){let s;if(n===od(o,t,e,i)>0)for(let r=t;r<e;r+=i)s=vc(r/i|0,o[r],o[r+1],s);else for(let r=e-i;r>=t;r-=i)s=vc(r/i|0,o[r],o[r+1],s);return s&&Yn(s,s.next)&&(Ts(s),s=s.next),s}function Mn(o,t){if(!o)return o;t||(t=o);let e=o,i;do if(i=!1,!e.steiner&&(Yn(e,e.next)||xe(e.prev,e,e.next)===0)){if(Ts(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function bs(o,t,e,i,n,s,r){if(!o)return;!r&&s&&td(o,i,n,s);let a=o;for(;o.prev!==o.next;){const c=o.prev,l=o.next;if(s?Xu(o,i,n,s):qu(o)){t.push(c.i,o.i,l.i),Ts(o),o=l.next,a=l.next;continue}if(o=l,o===a){r?r===1?(o=Yu(Mn(o),t),bs(o,t,e,i,n,s,2)):r===2&&Zu(o,t,e,i,n,s):bs(Mn(o),t,e,i,n,s,1);break}}}function qu(o){const t=o.prev,e=o,i=o.next;if(xe(t,e,i)>=0)return!1;const n=t.x,s=e.x,r=i.x,a=t.y,c=e.y,l=i.y,h=Math.min(n,s,r),u=Math.min(a,c,l),d=Math.max(n,s,r),f=Math.max(a,c,l);let m=i.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&ms(n,a,s,c,r,l,m.x,m.y)&&xe(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Xu(o,t,e,i){const n=o.prev,s=o,r=o.next;if(xe(n,s,r)>=0)return!1;const a=n.x,c=s.x,l=r.x,h=n.y,u=s.y,d=r.y,f=Math.min(a,c,l),m=Math.min(h,u,d),x=Math.max(a,c,l),p=Math.max(h,u,d),g=ha(f,m,t,e,i),v=ha(x,p,t,e,i);let y=o.prevZ,_=o.nextZ;for(;y&&y.z>=g&&_&&_.z<=v;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=p&&y!==n&&y!==r&&ms(a,h,c,u,l,d,y.x,y.y)&&xe(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=x&&_.y>=m&&_.y<=p&&_!==n&&_!==r&&ms(a,h,c,u,l,d,_.x,_.y)&&xe(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=g;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=p&&y!==n&&y!==r&&ms(a,h,c,u,l,d,y.x,y.y)&&xe(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=v;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=p&&_!==n&&_!==r&&ms(a,h,c,u,l,d,_.x,_.y)&&xe(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Yu(o,t){let e=o;do{const i=e.prev,n=e.next.next;!Yn(i,n)&&Kl(i,e,e.next,n)&&Es(i,n)&&Es(n,i)&&(t.push(i.i,e.i,n.i),Ts(e),Ts(e.next),e=o=n),e=e.next}while(e!==o);return Mn(e)}function Zu(o,t,e,i,n,s){let r=o;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&nd(r,a)){let c=jl(r,a);r=Mn(r,r.next),c=Mn(c,c.next),bs(r,t,e,i,n,s,0),bs(c,t,e,i,n,s,0);return}a=a.next}r=r.next}while(r!==o)}function Ku(o,t,e,i){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s]*i,c=s<r-1?t[s+1]*i:o.length,l=Yl(o,a,c,i,!1);l===l.next&&(l.steiner=!0),n.push(id(l))}n.sort(ju);for(let s=0;s<n.length;s++)e=$u(n[s],e);return e}function ju(o,t){let e=o.x-t.x;if(e===0&&(e=o.y-t.y,e===0)){const i=(o.next.y-o.y)/(o.next.x-o.x),n=(t.next.y-t.y)/(t.next.x-t.x);e=i-n}return e}function $u(o,t){const e=Ju(o,t);if(!e)return t;const i=jl(e,o);return Mn(i,i.next),Mn(e,e.next)}function Ju(o,t){let e=t;const i=o.x,n=o.y;let s=-1/0,r;if(Yn(o,e))return e;do{if(Yn(o,e.next))return e.next;if(n<=e.y&&n>=e.next.y&&e.next.y!==e.y){const u=e.x+(n-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=i&&u>s&&(s=u,r=e.x<e.next.x?e:e.next,u===i))return r}e=e.next}while(e!==t);if(!r)return null;const a=r,c=r.x,l=r.y;let h=1/0;e=r;do{if(i>=e.x&&e.x>=c&&i!==e.x&&Zl(n<l?i:s,n,c,l,n<l?s:i,n,e.x,e.y)){const u=Math.abs(n-e.y)/(i-e.x);Es(e,o)&&(u<h||u===h&&(e.x>r.x||e.x===r.x&&Qu(r,e)))&&(r=e,h=u)}e=e.next}while(e!==a);return r}function Qu(o,t){return xe(o.prev,o,t.prev)<0&&xe(t.next,o,o.next)<0}function td(o,t,e,i){let n=o;do n.z===0&&(n.z=ha(n.x,n.y,t,e,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==o);n.prevZ.nextZ=null,n.prevZ=null,ed(n)}function ed(o){let t,e=1;do{let i=o,n;o=null;let s=null;for(t=0;i;){t++;let r=i,a=0;for(let l=0;l<e&&(a++,r=r.nextZ,!!r);l++);let c=e;for(;a>0||c>0&&r;)a!==0&&(c===0||!r||i.z<=r.z)?(n=i,i=i.nextZ,a--):(n=r,r=r.nextZ,c--),s?s.nextZ=n:o=n,n.prevZ=s,s=n;i=r}s.nextZ=null,e*=2}while(t>1);return o}function ha(o,t,e,i,n){return o=(o-e)*n|0,t=(t-i)*n|0,o=(o|o<<8)&16711935,o=(o|o<<4)&252645135,o=(o|o<<2)&858993459,o=(o|o<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,o|t<<1}function id(o){let t=o,e=o;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==o);return e}function Zl(o,t,e,i,n,s,r,a){return(n-r)*(t-a)>=(o-r)*(s-a)&&(o-r)*(i-a)>=(e-r)*(t-a)&&(e-r)*(s-a)>=(n-r)*(i-a)}function ms(o,t,e,i,n,s,r,a){return!(o===r&&t===a)&&Zl(o,t,e,i,n,s,r,a)}function nd(o,t){return o.next.i!==t.i&&o.prev.i!==t.i&&!sd(o,t)&&(Es(o,t)&&Es(t,o)&&rd(o,t)&&(xe(o.prev,o,t.prev)||xe(o,t.prev,t))||Yn(o,t)&&xe(o.prev,o,o.next)>0&&xe(t.prev,t,t.next)>0)}function xe(o,t,e){return(t.y-o.y)*(e.x-t.x)-(t.x-o.x)*(e.y-t.y)}function Yn(o,t){return o.x===t.x&&o.y===t.y}function Kl(o,t,e,i){const n=er(xe(o,t,e)),s=er(xe(o,t,i)),r=er(xe(e,i,o)),a=er(xe(e,i,t));return!!(n!==s&&r!==a||n===0&&tr(o,e,t)||s===0&&tr(o,i,t)||r===0&&tr(e,o,i)||a===0&&tr(e,t,i))}function tr(o,t,e){return t.x<=Math.max(o.x,e.x)&&t.x>=Math.min(o.x,e.x)&&t.y<=Math.max(o.y,e.y)&&t.y>=Math.min(o.y,e.y)}function er(o){return o>0?1:o<0?-1:0}function sd(o,t){let e=o;do{if(e.i!==o.i&&e.next.i!==o.i&&e.i!==t.i&&e.next.i!==t.i&&Kl(e,e.next,o,t))return!0;e=e.next}while(e!==o);return!1}function Es(o,t){return xe(o.prev,o,o.next)<0?xe(o,t,o.next)>=0&&xe(o,o.prev,t)>=0:xe(o,t,o.prev)<0||xe(o,o.next,t)<0}function rd(o,t){let e=o,i=!1;const n=(o.x+t.x)/2,s=(o.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&n<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==o);return i}function jl(o,t){const e=ua(o.i,o.x,o.y),i=ua(t.i,t.x,t.y),n=o.next,s=t.prev;return o.next=t,t.prev=o,e.next=n,n.prev=e,i.next=e,e.prev=i,s.next=i,i.prev=s,i}function vc(o,t,e,i){const n=ua(o,t,e);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Ts(o){o.next.prev=o.prev,o.prev.next=o.next,o.prevZ&&(o.prevZ.nextZ=o.nextZ),o.nextZ&&(o.nextZ.prevZ=o.prevZ)}function ua(o,t,e){return{i:o,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function od(o,t,e,i){let n=0;for(let s=t,r=e-i;s<e;s+=i)n+=(o[r]-o[s])*(o[s+1]+o[r+1]),r=s;return n}class ad{static triangulate(t,e,i=2){return Wu(t,e,i)}}class _s{static area(t){const e=t.length;let i=0;for(let n=e-1,s=0;s<e;n=s++)i+=t[n].x*t[s].y-t[s].x*t[n].y;return i*.5}static isClockWise(t){return _s.area(t)<0}static triangulateShape(t,e){const i=[],n=[],s=[];_c(t),yc(i,t);let r=t.length;e.forEach(_c);for(let c=0;c<e.length;c++)n.push(r),r+=e[c].length,yc(i,e[c]);const a=ad.triangulate(i,n);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function _c(o){const t=o.length;t>2&&o[t-1].equals(o[0])&&o.pop()}function yc(o,t){for(let e=0;e<t.length;e++)o.push(t[e].x),o.push(t[e].y)}class wr extends Cs{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new wr(t.radius,t.detail)}}class qt extends Pe{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,r=e/2,a=Math.floor(i),c=Math.floor(n),l=a+1,h=c+1,u=t/a,d=e/c,f=[],m=[],x=[],p=[];for(let g=0;g<h;g++){const v=g*d-r;for(let y=0;y<l;y++){const _=y*u-s;m.push(_,-v,0),x.push(0,0,1),p.push(y/a),p.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<a;v++){const y=v+l*g,_=v+l*(g+1),E=v+1+l*(g+1),T=v+1+l*g;f.push(y,_,T),f.push(_,E,T)}this.setIndex(f),this.setAttribute("position",new jt(m,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qt(t.width,t.height,t.widthSegments,t.heightSegments)}}class pi extends Pe{constructor(t=.5,e=1,i=32,n=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:s,thetaLength:r},i=Math.max(3,i),n=Math.max(1,n);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/n,f=new N,m=new yt;for(let x=0;x<=n;x++){for(let p=0;p<=i;p++){const g=s+p/i*r;f.x=u*Math.cos(g),f.y=u*Math.sin(g),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let x=0;x<n;x++){const p=x*(i+1);for(let g=0;g<i;g++){const v=g+p,y=v,_=v+i+1,E=v+i+2,T=v+1;a.push(y,_,T),a.push(_,E,T)}}this.setIndex(a),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(l,3)),this.setAttribute("uv",new jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Qn extends Pe{constructor(t=new Rs([new yt(0,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],n=[],s=[],r=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new jt(n,3)),this.setAttribute("normal",new jt(s,3)),this.setAttribute("uv",new jt(r,2));function l(h){const u=n.length/3,d=h.extractPoints(e);let f=d.shape;const m=d.holes;_s.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,g=m.length;p<g;p++){const v=m[p];_s.isClockWise(v)===!0&&(m[p]=v.reverse())}const x=_s.triangulateShape(f,m);for(let p=0,g=m.length;p<g;p++){const v=m[p];f=f.concat(v)}for(let p=0,g=f.length;p<g;p++){const v=f[p];n.push(v.x,v.y,0),s.push(0,0,1),r.push(v.x,v.y)}for(let p=0,g=x.length;p<g;p++){const v=x[p],y=v[0]+u,_=v[1]+u,E=v[2]+u;i.push(y,_,E),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return cd(e,t)}static fromJSON(t,e){const i=[];for(let n=0,s=t.shapes.length;n<s;n++){const r=e[t.shapes[n]];i.push(r)}return new Qn(i,t.curveSegments)}}function cd(o,t){if(t.shapes=[],Array.isArray(o))for(let e=0,i=o.length;e<i;e++){const n=o[e];t.shapes.push(n.uuid)}else t.shapes.push(o.uuid);return t}class pe extends Pe{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(r+a,Math.PI);let l=0;const h=[],u=new N,d=new N,f=[],m=[],x=[],p=[];for(let g=0;g<=i;g++){const v=[],y=g/i;let _=0;g===0&&r===0?_=.5/e:g===i&&c===Math.PI&&(_=-.5/e);for(let E=0;E<=e;E++){const T=E/e;u.x=-t*Math.cos(n+T*s)*Math.sin(r+y*a),u.y=t*Math.cos(r+y*a),u.z=t*Math.sin(n+T*s)*Math.sin(r+y*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),p.push(T+_,1-y),v.push(l++)}h.push(v)}for(let g=0;g<i;g++)for(let v=0;v<e;v++){const y=h[g][v+1],_=h[g][v],E=h[g+1][v],T=h[g+1][v+1];(g!==0||r>0)&&f.push(y,_,T),(g!==i-1||c<Math.PI)&&f.push(_,E,T)}this.setIndex(f),this.setAttribute("position",new jt(m,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class vr extends Cs{constructor(t=1,e=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],n=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,n,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vr(t.radius,t.detail)}}class ts extends Pe{constructor(t=1,e=.4,i=12,n=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:s},i=Math.floor(i),n=Math.floor(n);const r=[],a=[],c=[],l=[],h=new N,u=new N,d=new N;for(let f=0;f<=i;f++)for(let m=0;m<=n;m++){const x=m/n*s,p=f/i*Math.PI*2;u.x=(t+e*Math.cos(p))*Math.cos(x),u.y=(t+e*Math.cos(p))*Math.sin(x),u.z=e*Math.sin(p),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/n),l.push(f/i)}for(let f=1;f<=i;f++)for(let m=1;m<=n;m++){const x=(n+1)*f+m-1,p=(n+1)*(f-1)+m-1,g=(n+1)*(f-1)+m,v=(n+1)*f+m;r.push(x,p,v),r.push(p,g,v)}this.setIndex(r),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ts(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ld extends Ti{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Lt extends Jn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rl,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class hd extends Jn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ud extends Jn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class $l extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const no=new ge,Mc=new N,wc=new N;class dd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.mapType=Je,this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ea,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Mc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Mc),wc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(wc),e.updateMatrixWorld(),no.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(no,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(no)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Pa extends Ol{constructor(t=-1,e=1,i=1,n=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,r=i+t,a=n+e,c=n-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class fd extends dd{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pd extends $l{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new fd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class md extends $l{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class gd extends si{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class xd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Sc(o,t,e,i){const n=vd(i);switch(e){case Tl:return o*t;case Cl:return o*t/n.components*n.byteLength;case va:return o*t/n.components*n.byteLength;case Wn:return o*t*2/n.components*n.byteLength;case _a:return o*t*2/n.components*n.byteLength;case Al:return o*t*3/n.components*n.byteLength;case hi:return o*t*4/n.components*n.byteLength;case ya:return o*t*4/n.components*n.byteLength;case hr:case ur:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case dr:case fr:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Io:case Do:return Math.max(o,16)*Math.max(t,8)/4;case Po:case Lo:return Math.max(o,8)*Math.max(t,8)/2;case No:case Fo:case Bo:case Oo:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Uo:case zo:case ko:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Go:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case qo:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case Xo:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case jo:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case $o:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case Jo:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case ta:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case ea:case ia:case na:return Math.ceil(o/4)*Math.ceil(t/4)*16;case sa:case ra:return Math.ceil(o/4)*Math.ceil(t/4)*8;case oa:case aa:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vd(o){switch(o){case Je:case wl:return{byteLength:1,components:1};case ys:case Sl:case Vi:return{byteLength:2,components:1};case ga:case xa:return{byteLength:2,components:4};case Ei:case ma:case Mi:return{byteLength:4,components:1};case bl:case El:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pa}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pa);function Jl(){let o=null,t=!1,e=null,i=null;function n(s,r){e(s,r),i=o.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=o.requestAnimationFrame(n),t=!0)},stop:function(){o.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){o=s}}}function _d(o){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=o.createBuffer();o.bindBuffer(c,d),o.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=o.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=o.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=o.HALF_FLOAT:f=o.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=o.SHORT;else if(l instanceof Uint32Array)f=o.UNSIGNED_INT;else if(l instanceof Int32Array)f=o.INT;else if(l instanceof Int8Array)f=o.BYTE;else if(l instanceof Uint8Array)f=o.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(o.bindBuffer(l,a),u.length===0)o.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],x=u[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const x=u[f];o.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function n(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(o.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:n,remove:s,update:r}}var yd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Md=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ed=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Td=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ad=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Rd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ld=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Nd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Xd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",$d=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ef=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,of=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,af=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,df=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ff=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_f=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ef=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Af=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Pf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,If=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Df=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ff=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Of=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Hf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,jf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$f=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,np=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ap=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,up=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_p=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ap=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Cp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Rp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ip=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Np=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:yd,alphahash_pars_fragment:Md,alphamap_fragment:wd,alphamap_pars_fragment:Sd,alphatest_fragment:bd,alphatest_pars_fragment:Ed,aomap_fragment:Td,aomap_pars_fragment:Ad,batching_pars_vertex:Cd,batching_vertex:Rd,begin_vertex:Pd,beginnormal_vertex:Id,bsdfs:Ld,iridescence_fragment:Dd,bumpmap_pars_fragment:Nd,clipping_planes_fragment:Fd,clipping_planes_pars_fragment:Ud,clipping_planes_pars_vertex:Bd,clipping_planes_vertex:Od,color_fragment:zd,color_pars_fragment:kd,color_pars_vertex:Gd,color_vertex:Vd,common:Hd,cube_uv_reflection_fragment:Wd,defaultnormal_vertex:qd,displacementmap_pars_vertex:Xd,displacementmap_vertex:Yd,emissivemap_fragment:Zd,emissivemap_pars_fragment:Kd,colorspace_fragment:jd,colorspace_pars_fragment:$d,envmap_fragment:Jd,envmap_common_pars_fragment:Qd,envmap_pars_fragment:tf,envmap_pars_vertex:ef,envmap_physical_pars_fragment:ff,envmap_vertex:nf,fog_vertex:sf,fog_pars_vertex:rf,fog_fragment:of,fog_pars_fragment:af,gradientmap_pars_fragment:cf,lightmap_pars_fragment:lf,lights_lambert_fragment:hf,lights_lambert_pars_fragment:uf,lights_pars_begin:df,lights_toon_fragment:pf,lights_toon_pars_fragment:mf,lights_phong_fragment:gf,lights_phong_pars_fragment:xf,lights_physical_fragment:vf,lights_physical_pars_fragment:_f,lights_fragment_begin:yf,lights_fragment_maps:Mf,lights_fragment_end:wf,logdepthbuf_fragment:Sf,logdepthbuf_pars_fragment:bf,logdepthbuf_pars_vertex:Ef,logdepthbuf_vertex:Tf,map_fragment:Af,map_pars_fragment:Cf,map_particle_fragment:Rf,map_particle_pars_fragment:Pf,metalnessmap_fragment:If,metalnessmap_pars_fragment:Lf,morphinstance_vertex:Df,morphcolor_vertex:Nf,morphnormal_vertex:Ff,morphtarget_pars_vertex:Uf,morphtarget_vertex:Bf,normal_fragment_begin:Of,normal_fragment_maps:zf,normal_pars_fragment:kf,normal_pars_vertex:Gf,normal_vertex:Vf,normalmap_pars_fragment:Hf,clearcoat_normal_fragment_begin:Wf,clearcoat_normal_fragment_maps:qf,clearcoat_pars_fragment:Xf,iridescence_pars_fragment:Yf,opaque_fragment:Zf,packing:Kf,premultiplied_alpha_fragment:jf,project_vertex:$f,dithering_fragment:Jf,dithering_pars_fragment:Qf,roughnessmap_fragment:tp,roughnessmap_pars_fragment:ep,shadowmap_pars_fragment:ip,shadowmap_pars_vertex:np,shadowmap_vertex:sp,shadowmask_pars_fragment:rp,skinbase_vertex:op,skinning_pars_vertex:ap,skinning_vertex:cp,skinnormal_vertex:lp,specularmap_fragment:hp,specularmap_pars_fragment:up,tonemapping_fragment:dp,tonemapping_pars_fragment:fp,transmission_fragment:pp,transmission_pars_fragment:mp,uv_pars_fragment:gp,uv_pars_vertex:xp,uv_vertex:vp,worldpos_vertex:_p,background_vert:yp,background_frag:Mp,backgroundCube_vert:wp,backgroundCube_frag:Sp,cube_vert:bp,cube_frag:Ep,depth_vert:Tp,depth_frag:Ap,distance_vert:Cp,distance_frag:Rp,equirect_vert:Pp,equirect_frag:Ip,linedashed_vert:Lp,linedashed_frag:Dp,meshbasic_vert:Np,meshbasic_frag:Fp,meshlambert_vert:Up,meshlambert_frag:Bp,meshmatcap_vert:Op,meshmatcap_frag:zp,meshnormal_vert:kp,meshnormal_frag:Gp,meshphong_vert:Vp,meshphong_frag:Hp,meshphysical_vert:Wp,meshphysical_frag:qp,meshtoon_vert:Xp,meshtoon_frag:Yp,points_vert:Zp,points_frag:Kp,shadow_vert:jp,shadow_frag:$p,sprite_vert:Jp,sprite_frag:Qp},ft={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},yi={basic:{uniforms:Ge([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Ge([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Ge([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Ge([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Ge([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Ge([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Ge([ft.points,ft.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Ge([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Ge([ft.common,ft.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Ge([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Ge([ft.sprite,ft.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:Ge([ft.common,ft.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:Ge([ft.lights,ft.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};yi.physical={uniforms:Ge([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const ir={r:0,b:0,g:0},un=new fi,tm=new ge;function em(o,t,e,i,n,s,r){const a=new Ot(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function x(y){let _=!1;const E=m(y);E===null?g(a,c):E&&E.isColor&&(g(E,1),_=!0);const T=o.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(o.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function p(y,_){const E=m(_);E&&(E.isCubeTexture||E.mapping===yr)?(h===void 0&&(h=new q(new Ye(1,1,1),new Ti({name:"BackgroundCubeMaterial",uniforms:Xn(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),un.copy(_.backgroundRotation),un.x*=-1,un.y*=-1,un.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(un.y*=-1,un.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(un)),h.material.toneMapped=Kt.getTransfer(E.colorSpace)!==oe,(u!==E||d!==E.version||f!==o.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=o.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new q(new qt(2,2),new Ti({name:"BackgroundMaterial",uniforms:Xn(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(E.colorSpace)!==oe,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==o.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=o.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,_){y.getRGB(ir,Bl(o)),i.buffers.color.setClear(ir.r,ir.g,ir.b,_,r)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),c=_,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,g(a,c)},render:x,addToRenderList:p,dispose:v}}function im(o,t){const e=o.getParameter(o.MAX_VERTEX_ATTRIBS),i={},n=d(null);let s=n,r=!1;function a(S,P,U,I,O){let B=!1;const D=u(I,U,P);s!==D&&(s=D,l(s.object)),B=f(S,I,U,O),B&&m(S,I,U,O),O!==null&&t.update(O,o.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,_(S,P,U,I),O!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return o.createVertexArray()}function l(S){return o.bindVertexArray(S)}function h(S){return o.deleteVertexArray(S)}function u(S,P,U){const I=U.wireframe===!0;let O=i[S.id];O===void 0&&(O={},i[S.id]=O);let B=O[P.id];B===void 0&&(B={},O[P.id]=B);let D=B[I];return D===void 0&&(D=d(c()),B[I]=D),D}function d(S){const P=[],U=[],I=[];for(let O=0;O<e;O++)P[O]=0,U[O]=0,I[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:I,object:S,attributes:{},index:null}}function f(S,P,U,I){const O=s.attributes,B=P.attributes;let D=0;const V=U.getAttributes();for(const X in V)if(V[X].location>=0){const nt=O[X];let ot=B[X];if(ot===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(ot=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(ot=S.instanceColor)),nt===void 0||nt.attribute!==ot||ot&&nt.data!==ot.data)return!0;D++}return s.attributesNum!==D||s.index!==I}function m(S,P,U,I){const O={},B=P.attributes;let D=0;const V=U.getAttributes();for(const X in V)if(V[X].location>=0){let nt=B[X];nt===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(nt=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(nt=S.instanceColor));const ot={};ot.attribute=nt,nt&&nt.data&&(ot.data=nt.data),O[X]=ot,D++}s.attributes=O,s.attributesNum=D,s.index=I}function x(){const S=s.newAttributes;for(let P=0,U=S.length;P<U;P++)S[P]=0}function p(S){g(S,0)}function g(S,P){const U=s.newAttributes,I=s.enabledAttributes,O=s.attributeDivisors;U[S]=1,I[S]===0&&(o.enableVertexAttribArray(S),I[S]=1),O[S]!==P&&(o.vertexAttribDivisor(S,P),O[S]=P)}function v(){const S=s.newAttributes,P=s.enabledAttributes;for(let U=0,I=P.length;U<I;U++)P[U]!==S[U]&&(o.disableVertexAttribArray(U),P[U]=0)}function y(S,P,U,I,O,B,D){D===!0?o.vertexAttribIPointer(S,P,U,O,B):o.vertexAttribPointer(S,P,U,I,O,B)}function _(S,P,U,I){x();const O=I.attributes,B=U.getAttributes(),D=P.defaultAttributeValues;for(const V in B){const X=B[V];if(X.location>=0){let J=O[V];if(J===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(J=S.instanceColor)),J!==void 0){const nt=J.normalized,ot=J.itemSize,at=t.get(J);if(at===void 0)continue;const Ft=at.buffer,ae=at.type,ie=at.bytesPerElement,j=ae===o.INT||ae===o.UNSIGNED_INT||J.gpuType===ma;if(J.isInterleavedBufferAttribute){const tt=J.data,Mt=tt.stride,zt=J.offset;if(tt.isInstancedInterleavedBuffer){for(let bt=0;bt<X.locationSize;bt++)g(X.location+bt,tt.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let bt=0;bt<X.locationSize;bt++)p(X.location+bt);o.bindBuffer(o.ARRAY_BUFFER,Ft);for(let bt=0;bt<X.locationSize;bt++)y(X.location+bt,ot/X.locationSize,ae,nt,Mt*ie,(zt+ot/X.locationSize*bt)*ie,j)}else{if(J.isInstancedBufferAttribute){for(let tt=0;tt<X.locationSize;tt++)g(X.location+tt,J.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let tt=0;tt<X.locationSize;tt++)p(X.location+tt);o.bindBuffer(o.ARRAY_BUFFER,Ft);for(let tt=0;tt<X.locationSize;tt++)y(X.location+tt,ot/X.locationSize,ae,nt,ot*ie,ot/X.locationSize*tt*ie,j)}}else if(D!==void 0){const nt=D[V];if(nt!==void 0)switch(nt.length){case 2:o.vertexAttrib2fv(X.location,nt);break;case 3:o.vertexAttrib3fv(X.location,nt);break;case 4:o.vertexAttrib4fv(X.location,nt);break;default:o.vertexAttrib1fv(X.location,nt)}}}}v()}function E(){L();for(const S in i){const P=i[S];for(const U in P){const I=P[U];for(const O in I)h(I[O].object),delete I[O];delete P[U]}delete i[S]}}function T(S){if(i[S.id]===void 0)return;const P=i[S.id];for(const U in P){const I=P[U];for(const O in I)h(I[O].object),delete I[O];delete P[U]}delete i[S.id]}function C(S){for(const P in i){const U=i[P];if(U[S.id]===void 0)continue;const I=U[S.id];for(const O in I)h(I[O].object),delete I[O];delete U[S.id]}}function L(){M(),r=!0,s!==n&&(s=n,l(s.object))}function M(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:a,reset:L,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:p,disableUnusedAttributes:v}}function nm(o,t,e){let i;function n(l){i=l}function s(l,h){o.drawArrays(i,l,h),e.update(h,i,1)}function r(l,h,u){u!==0&&(o.drawArraysInstanced(i,l,h,u),e.update(h,i,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,i,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)r(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,h,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*d[x];e.update(m,i,1)}}this.setMode=n,this.render=s,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function sm(o,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");n=o.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(C){return!(C!==hi&&i.convert(C)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const L=C===Vi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Je&&i.convert(C)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Mi&&!L)}function c(C){if(C==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Ut("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),m=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=o.getParameter(o.MAX_TEXTURE_SIZE),p=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),g=o.getParameter(o.MAX_VERTEX_ATTRIBS),v=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),y=o.getParameter(o.MAX_VARYING_VECTORS),_=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),E=o.getParameter(o.MAX_SAMPLES),T=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,maxSamples:E,samples:T}}function rm(o){const t=this;let e=null,i=0,n=!1,s=!1;const r=new pn,a=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,x=u.clipIntersection,p=u.clipShadows,g=o.get(u);if(!n||m===null||m.length===0||s&&!p)s?h(null):l();else{const v=s?0:i,y=v*4;let _=g.clippingState||null;c.value=_,_=h(m,d,y,f);for(let E=0;E!==y;++E)_[E]=e[E];g.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,m){const x=u!==null?u.length:0;let p=null;if(x!==0){if(p=c.value,m!==!0||p===null){const g=f+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let y=0,_=f;y!==x;++y,_+=4)r.copy(u[y]).applyMatrix4(v,a),r.normal.toArray(p,_),p[_+3]=r.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function om(o){let t=new WeakMap;function e(r,a){return a===To?r.mapping=yn:a===Ao&&(r.mapping=Hn),r}function i(r){if(r&&r.isTexture){const a=r.mapping;if(a===To||a===Ao)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new kl(c.height);return l.fromEquirectangularTexture(o,r),t.set(r,l),r.addEventListener("dispose",n),e(l.texture,r.mapping)}else return null}}return r}function n(r){const a=r.target;a.removeEventListener("dispose",n);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const Ji=4,bc=[.125,.215,.35,.446,.526,.582],gn=20,am=256,cs=new Pa,Ec=new Ot;let so=null,ro=0,oo=0,ao=!1;const cm=new N;class Tc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,s={}){const{size:r=256,position:a=cm}=s;so=this._renderer.getRenderTarget(),ro=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,n,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(so,ro,oo),this._renderer.xr.enabled=ao,t.scissorTest=!1,Un(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yn||t.mapping===Hn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),so=this._renderer.getRenderTarget(),ro=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Oe,minFilter:Oe,generateMipmaps:!1,type:Vi,format:hi,colorSpace:qn,depthBuffer:!1},n=Ac(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ac(t,e,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=lm(s)),this._blurMaterial=um(s,t,e),this._ggxMaterial=hm(s,t,e)}return n}_compileMaterial(t){const e=new q(new Pe,t);this._renderer.compile(e,cs)}_sceneToCubeUV(t,e,i,n,s){const c=new si(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ec),u.toneMapping=Si,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new q(new Ye,new xt({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,p=x.material;let g=!1;const v=t.background;v?v.isColor&&(p.color.copy(v),t.background=null,g=!0):(p.color.copy(Ec),g=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[y],s.y,s.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[y]));const E=this._cubeSize;Un(n,_*E,y>2?E:0,E,E),u.setRenderTarget(n),g&&u.render(x,c),u.render(t,c)}u.toneMapping=f,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===yn||t.mapping===Hn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cc());const s=n?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Un(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(r,cs)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodMeshes.length;for(let s=1;s<n;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=i}_applyGGXFilter(t,e,i){const n=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,a=this._lodMeshes[i];a.material=r;const c=r.uniforms,l=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=0+l*1.25,f=u*d,{_lodMax:m}=this,x=this._sizeLods[i],p=3*x*(i>m-Ji?i-m+Ji:0),g=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=m-e,Un(s,p,g,3*x,2*x),n.setRenderTarget(s),n.render(a,cs),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-i,Un(t,p,g,3*x,2*x),n.setRenderTarget(t),n.render(a,cs)}_blur(t,e,i,n,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,n,"latitudinal",s),this._halfBlur(r,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Qt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[n];u.material=l;const d=l.uniforms,f=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*gn-1),x=s/m,p=isFinite(s)?1+Math.floor(h*x):gn;p>gn&&Ut(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${gn}`);const g=[];let v=0;for(let C=0;C<gn;++C){const L=C/x,M=Math.exp(-L*L/2);g.push(M),C===0?v+=M:C<p&&(v+=2*M)}for(let C=0;C<g.length;C++)g[C]=g[C]/v;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=g,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-i;const _=this._sizeLods[n],E=3*_*(n>y-Ji?n-y+Ji:0),T=4*(this._cubeSize-_);Un(e,E,T,3*_,2*_),c.setRenderTarget(e),c.render(u,cs)}}function lm(o){const t=[],e=[],i=[];let n=o;const s=o-Ji+1+bc.length;for(let r=0;r<s;r++){const a=Math.pow(2,n);t.push(a);let c=1/a;r>o-Ji?c=bc[r-o+Ji-1]:r===0&&(c=0),e.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,x=3,p=2,g=1,v=new Float32Array(x*m*f),y=new Float32Array(p*m*f),_=new Float32Array(g*m*f);for(let T=0;T<f;T++){const C=T%3*2/3-1,L=T>2?0:-1,M=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];v.set(M,x*m*T),y.set(d,p*m*T);const S=[T,T,T,T,T,T];_.set(S,g*m*T)}const E=new Pe;E.setAttribute("position",new di(v,x)),E.setAttribute("uv",new di(y,p)),E.setAttribute("faceIndex",new di(_,g)),i.push(new q(E,null)),n>Ji&&n--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Ac(o,t,e){const i=new bi(o,t,e);return i.texture.mapping=yr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Un(o,t,e,i,n){o.viewport.set(t,e,i,n),o.scissor.set(t,e,i,n)}function hm(o,t,e){return new Ti({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:am,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Sr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function um(o,t,e){const i=new Float32Array(gn),n=new N(0,1,0);return new Ti({name:"SphericalGaussianBlur",defines:{n:gn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Sr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Cc(){return new Ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Rc(){return new Ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Sr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dm(o){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===To||c===Ao,h=c===yn||c===Hn;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Tc(o)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&n(f)?(e===null&&(e=new Tc(o)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function n(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:r}}function fm(o){const t={};function e(i){if(t[i]!==void 0)return t[i];const n=o.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&ws("WebGLRenderer: "+i+" extension not supported."),n}}}function pm(o,t,e,i){const n={},s=new WeakMap;function r(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",r),delete n[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return n[d.id]===!0||(d.addEventListener("dispose",r),n[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)t.update(d[f],o.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,m=u.attributes.position;let x=0;if(f!==null){const v=f.array;x=f.version;for(let y=0,_=v.length;y<_;y+=3){const E=v[y+0],T=v[y+1],C=v[y+2];d.push(E,T,T,C,C,E)}}else if(m!==void 0){const v=m.array;x=m.version;for(let y=0,_=v.length/3-1;y<_;y+=3){const E=y+0,T=y+1,C=y+2;d.push(E,T,T,C,C,E)}}else return;const p=new(Pl(d)?Ul:Fl)(d,1);p.version=x;const g=s.get(u);g&&t.remove(g),s.set(u,p)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function mm(o,t,e){let i;function n(d){i=d}let s,r;function a(d){s=d.type,r=d.bytesPerElement}function c(d,f){o.drawElements(i,f,s,d*r),e.update(f,i,1)}function l(d,f,m){m!==0&&(o.drawElementsInstanced(i,f,s,d*r,m),e.update(f,i,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,m);let p=0;for(let g=0;g<m;g++)p+=f[g];e.update(p,i,1)}function u(d,f,m,x){if(m===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d.length;g++)l(d[g]/r,f[g],x[g]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,s,d,0,x,0,m);let g=0;for(let v=0;v<m;v++)g+=f[v]*x[v];e.update(g,i,1)}}this.setMode=n,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function gm(o){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,a){switch(e.calls++,r){case o.TRIANGLES:e.triangles+=a*(s/3);break;case o.LINES:e.lines+=a*(s/2);break;case o.LINE_STRIP:e.lines+=a*(s-1);break;case o.LINE_LOOP:e.lines+=a*s;break;case o.POINTS:e.points+=a*s;break;default:Qt("WebGLInfo: Unknown draw mode:",r);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function xm(o,t,e){const i=new WeakMap,n=new Me;function s(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(a);if(d===void 0||d.count!==u){let S=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var f=S;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),x===!0&&(_=2),p===!0&&(_=3);let E=a.attributes.position.count*_,T=1;E>t.maxTextureSize&&(T=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const C=new Float32Array(E*T*4*u),L=new Il(C,E,T,u);L.type=Mi,L.needsUpdate=!0;const M=_*4;for(let P=0;P<u;P++){const U=g[P],I=v[P],O=y[P],B=E*T*4*P;for(let D=0;D<U.count;D++){const V=D*M;m===!0&&(n.fromBufferAttribute(U,D),C[B+V+0]=n.x,C[B+V+1]=n.y,C[B+V+2]=n.z,C[B+V+3]=0),x===!0&&(n.fromBufferAttribute(I,D),C[B+V+4]=n.x,C[B+V+5]=n.y,C[B+V+6]=n.z,C[B+V+7]=0),p===!0&&(n.fromBufferAttribute(O,D),C[B+V+8]=n.x,C[B+V+9]=n.y,C[B+V+10]=n.z,C[B+V+11]=O.itemSize===4?n.w:1)}}d={count:u,texture:L,size:new yt(E,T)},i.set(a,d),a.addEventListener("dispose",S)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(o,"morphTexture",r.morphTexture,e);else{let m=0;for(let p=0;p<l.length;p++)m+=l[p];const x=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(o,"morphTargetBaseInfluence",x),c.getUniforms().setValue(o,"morphTargetInfluences",l)}c.getUniforms().setValue(o,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(o,"morphTargetsTextureSize",d.size)}return{update:s}}function vm(o,t,e,i){let n=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,u=t.get(c,h);if(n.get(u)!==l&&(t.update(u),n.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),n.get(c)!==l&&(e.update(c.instanceMatrix,o.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,o.ARRAY_BUFFER),n.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;n.get(d)!==l&&(d.update(),n.set(d,l))}return u}function r(){n=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:r}}const _m={[pl]:"LINEAR_TONE_MAPPING",[ml]:"REINHARD_TONE_MAPPING",[gl]:"CINEON_TONE_MAPPING",[xl]:"ACES_FILMIC_TONE_MAPPING",[_l]:"AGX_TONE_MAPPING",[yl]:"NEUTRAL_TONE_MAPPING",[vl]:"CUSTOM_TONE_MAPPING"};function ym(o,t,e,i,n){const s=new bi(t,e,{type:o,depthBuffer:i,stencilBuffer:n}),r=new bi(t,e,{type:Vi,depthBuffer:!1,stencilBuffer:!1}),a=new Pe;a.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new jt([0,2,0,0,2,0],2));const c=new ld({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new q(a,c),h=new Pa(-1,1,1,-1,0,1);let u=null,d=null,f=!1,m,x=null,p=[],g=!1;this.setSize=function(v,y){s.setSize(v,y),r.setSize(v,y);for(let _=0;_<p.length;_++){const E=p[_];E.setSize&&E.setSize(v,y)}},this.setEffects=function(v){p=v,g=p.length>0&&p[0].isRenderPass===!0;const y=s.width,_=s.height;for(let E=0;E<p.length;E++){const T=p[E];T.setSize&&T.setSize(y,_)}},this.begin=function(v,y){if(f||v.toneMapping===Si&&p.length===0)return!1;if(x=y,y!==null){const _=y.width,E=y.height;(s.width!==_||s.height!==E)&&this.setSize(_,E)}return g===!1&&v.setRenderTarget(s),m=v.toneMapping,v.toneMapping=Si,!0},this.hasRenderPass=function(){return g},this.end=function(v,y){v.toneMapping=m,f=!0;let _=s,E=r;for(let T=0;T<p.length;T++){const C=p[T];if(C.enabled!==!1&&(C.render(v,E,_,y),C.needsSwap!==!1)){const L=_;_=E,E=L}}if(u!==v.outputColorSpace||d!==v.toneMapping){u=v.outputColorSpace,d=v.toneMapping,c.defines={},Kt.getTransfer(u)===oe&&(c.defines.SRGB_TRANSFER="");const T=_m[d];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=_.texture,v.setRenderTarget(x),v.render(l,h),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),r.dispose(),a.dispose(),c.dispose()}}const Ql=new ze,da=new Ss(1,1),th=new Il,eh=new ou,ih=new zl,Pc=[],Ic=[],Lc=new Float32Array(16),Dc=new Float32Array(9),Nc=new Float32Array(4);function es(o,t,e){const i=o[0];if(i<=0||i>0)return o;const n=t*e;let s=Pc[n];if(s===void 0&&(s=new Float32Array(n),Pc[n]=s),t!==0){i.toArray(s,0);for(let r=1,a=0;r!==t;++r)a+=e,o[r].toArray(s,a)}return s}function Ce(o,t){if(o.length!==t.length)return!1;for(let e=0,i=o.length;e<i;e++)if(o[e]!==t[e])return!1;return!0}function Re(o,t){for(let e=0,i=t.length;e<i;e++)o[e]=t[e]}function br(o,t){let e=Ic[t];e===void 0&&(e=new Int32Array(t),Ic[t]=e);for(let i=0;i!==t;++i)e[i]=o.allocateTextureUnit();return e}function Mm(o,t){const e=this.cache;e[0]!==t&&(o.uniform1f(this.addr,t),e[0]=t)}function wm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2fv(this.addr,t),Re(e,t)}}function Sm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;o.uniform3fv(this.addr,t),Re(e,t)}}function bm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4fv(this.addr,t),Re(e,t)}}function Em(o,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;o.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;Nc.set(i),o.uniformMatrix2fv(this.addr,!1,Nc),Re(e,i)}}function Tm(o,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;o.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;Dc.set(i),o.uniformMatrix3fv(this.addr,!1,Dc),Re(e,i)}}function Am(o,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;o.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;Lc.set(i),o.uniformMatrix4fv(this.addr,!1,Lc),Re(e,i)}}function Cm(o,t){const e=this.cache;e[0]!==t&&(o.uniform1i(this.addr,t),e[0]=t)}function Rm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2iv(this.addr,t),Re(e,t)}}function Pm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;o.uniform3iv(this.addr,t),Re(e,t)}}function Im(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4iv(this.addr,t),Re(e,t)}}function Lm(o,t){const e=this.cache;e[0]!==t&&(o.uniform1ui(this.addr,t),e[0]=t)}function Dm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2uiv(this.addr,t),Re(e,t)}}function Nm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;o.uniform3uiv(this.addr,t),Re(e,t)}}function Fm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4uiv(this.addr,t),Re(e,t)}}function Um(o,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(o.uniform1i(this.addr,n),i[0]=n);let s;this.type===o.SAMPLER_2D_SHADOW?(da.compareFunction=e.isReversedDepthBuffer()?wa:Ma,s=da):s=Ql,e.setTexture2D(t||s,n)}function Bm(o,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(o.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||eh,n)}function Om(o,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(o.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||ih,n)}function zm(o,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(o.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||th,n)}function km(o){switch(o){case 5126:return Mm;case 35664:return wm;case 35665:return Sm;case 35666:return bm;case 35674:return Em;case 35675:return Tm;case 35676:return Am;case 5124:case 35670:return Cm;case 35667:case 35671:return Rm;case 35668:case 35672:return Pm;case 35669:case 35673:return Im;case 5125:return Lm;case 36294:return Dm;case 36295:return Nm;case 36296:return Fm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Bm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return zm}}function Gm(o,t){o.uniform1fv(this.addr,t)}function Vm(o,t){const e=es(t,this.size,2);o.uniform2fv(this.addr,e)}function Hm(o,t){const e=es(t,this.size,3);o.uniform3fv(this.addr,e)}function Wm(o,t){const e=es(t,this.size,4);o.uniform4fv(this.addr,e)}function qm(o,t){const e=es(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,e)}function Xm(o,t){const e=es(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,e)}function Ym(o,t){const e=es(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,e)}function Zm(o,t){o.uniform1iv(this.addr,t)}function Km(o,t){o.uniform2iv(this.addr,t)}function jm(o,t){o.uniform3iv(this.addr,t)}function $m(o,t){o.uniform4iv(this.addr,t)}function Jm(o,t){o.uniform1uiv(this.addr,t)}function Qm(o,t){o.uniform2uiv(this.addr,t)}function t0(o,t){o.uniform3uiv(this.addr,t)}function e0(o,t){o.uniform4uiv(this.addr,t)}function i0(o,t,e){const i=this.cache,n=t.length,s=br(e,n);Ce(i,s)||(o.uniform1iv(this.addr,s),Re(i,s));let r;this.type===o.SAMPLER_2D_SHADOW?r=da:r=Ql;for(let a=0;a!==n;++a)e.setTexture2D(t[a]||r,s[a])}function n0(o,t,e){const i=this.cache,n=t.length,s=br(e,n);Ce(i,s)||(o.uniform1iv(this.addr,s),Re(i,s));for(let r=0;r!==n;++r)e.setTexture3D(t[r]||eh,s[r])}function s0(o,t,e){const i=this.cache,n=t.length,s=br(e,n);Ce(i,s)||(o.uniform1iv(this.addr,s),Re(i,s));for(let r=0;r!==n;++r)e.setTextureCube(t[r]||ih,s[r])}function r0(o,t,e){const i=this.cache,n=t.length,s=br(e,n);Ce(i,s)||(o.uniform1iv(this.addr,s),Re(i,s));for(let r=0;r!==n;++r)e.setTexture2DArray(t[r]||th,s[r])}function o0(o){switch(o){case 5126:return Gm;case 35664:return Vm;case 35665:return Hm;case 35666:return Wm;case 35674:return qm;case 35675:return Xm;case 35676:return Ym;case 5124:case 35670:return Zm;case 35667:case 35671:return Km;case 35668:case 35672:return jm;case 35669:case 35673:return $m;case 5125:return Jm;case 36294:return Qm;case 36295:return t0;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return i0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return s0;case 36289:case 36303:case 36311:case 36292:return r0}}class a0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=km(e.type)}}class c0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=o0(e.type)}}class l0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,r=n.length;s!==r;++s){const a=n[s];a.setValue(t,e[a.id],i)}}}const co=/(\w+)(\])?(\[|\.)?/g;function Fc(o,t){o.seq.push(t),o.map[t.id]=t}function h0(o,t,e){const i=o.name,n=i.length;for(co.lastIndex=0;;){const s=co.exec(i),r=co.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===n){Fc(e,l===void 0?new a0(a,o,t):new c0(a,o,t));break}else{let u=e.map[a];u===void 0&&(u=new l0(a),Fc(e,u)),e=u}}}class pr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=t.getActiveUniform(e,r),c=t.getUniformLocation(e,a.name);h0(a,c,this)}const n=[],s=[];for(const r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(r):s.push(r);n.length>0&&(this.seq=n.concat(s))}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,r=e.length;s!==r;++s){const a=e[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.id in e&&i.push(r)}return i}}function Uc(o,t,e){const i=o.createShader(t);return o.shaderSource(i,e),o.compileShader(i),i}const u0=37297;let d0=0;function f0(o,t){const e=o.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let r=n;r<s;r++){const a=r+1;i.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return i.join(`
`)}const Bc=new kt;function p0(o){Kt._getMatrix(Bc,Kt.workingColorSpace,o);const t=`mat3( ${Bc.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(o)){case mr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function Oc(o,t,e){const i=o.getShaderParameter(t,o.COMPILE_STATUS),s=(o.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+f0(o.getShaderSource(t),a)}else return s}function m0(o,t){const e=p0(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const g0={[pl]:"Linear",[ml]:"Reinhard",[gl]:"Cineon",[xl]:"ACESFilmic",[_l]:"AgX",[yl]:"Neutral",[vl]:"Custom"};function x0(o,t){const e=g0[t];return e===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const nr=new N;function v0(){Kt.getLuminanceCoefficients(nr);const o=nr.x.toFixed(4),t=nr.y.toFixed(4),e=nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _0(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gs).join(`
`)}function y0(o){const t=[];for(const e in o){const i=o[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function M0(o,t){const e={},i=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=o.getActiveAttrib(t,n),r=s.name;let a=1;s.type===o.FLOAT_MAT2&&(a=2),s.type===o.FLOAT_MAT3&&(a=3),s.type===o.FLOAT_MAT4&&(a=4),e[r]={type:s.type,location:o.getAttribLocation(t,r),locationSize:a}}return e}function gs(o){return o!==""}function zc(o,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kc(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const w0=/^[ \t]*#include +<([\w\d./]+)>/gm;function fa(o){return o.replace(w0,b0)}const S0=new Map;function b0(o,t){let e=Gt[t];if(e===void 0){const i=S0.get(t);if(i!==void 0)e=Gt[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return fa(e)}const E0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gc(o){return o.replace(E0,T0)}function T0(o,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function Vc(o){let t=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?t+=`
#define HIGH_PRECISION`:o.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const A0={[lr]:"SHADOWMAP_TYPE_PCF",[ps]:"SHADOWMAP_TYPE_VSM"};function C0(o){return A0[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const R0={[yn]:"ENVMAP_TYPE_CUBE",[Hn]:"ENVMAP_TYPE_CUBE",[yr]:"ENVMAP_TYPE_CUBE_UV"};function P0(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":R0[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const I0={[Hn]:"ENVMAP_MODE_REFRACTION"};function L0(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":I0[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const D0={[fl]:"ENVMAP_BLENDING_MULTIPLY",[Gh]:"ENVMAP_BLENDING_MIX",[Vh]:"ENVMAP_BLENDING_ADD"};function N0(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":D0[o.combine]||"ENVMAP_BLENDING_NONE"}function F0(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function U0(o,t,e,i){const n=o.getContext(),s=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=C0(e),l=P0(e),h=L0(e),u=N0(e),d=F0(e),f=_0(e),m=y0(s),x=n.createProgram();let p,g,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(gs).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(gs).join(`
`),g.length>0&&(g+=`
`)):(p=[Vc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gs).join(`
`),g=[Vc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?Gt.tonemapping_pars_fragment:"",e.toneMapping!==Si?x0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,m0("linearToOutputTexel",e.outputColorSpace),v0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(gs).join(`
`)),r=fa(r),r=zc(r,e),r=kc(r,e),a=fa(a),a=zc(a,e),a=kc(a,e),r=Gc(r),a=Gc(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===Za?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Za?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=v+p+r,_=v+g+a,E=Uc(n,n.VERTEX_SHADER,y),T=Uc(n,n.FRAGMENT_SHADER,_);n.attachShader(x,E),n.attachShader(x,T),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function C(P){if(o.debug.checkShaderErrors){const U=n.getProgramInfoLog(x)||"",I=n.getShaderInfoLog(E)||"",O=n.getShaderInfoLog(T)||"",B=U.trim(),D=I.trim(),V=O.trim();let X=!0,J=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(X=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(n,x,E,T);else{const nt=Oc(n,E,"vertex"),ot=Oc(n,T,"fragment");Qt("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+nt+`
`+ot)}else B!==""?Ut("WebGLProgram: Program Info Log:",B):(D===""||V==="")&&(J=!1);J&&(P.diagnostics={runnable:X,programLog:B,vertexShader:{log:D,prefix:p},fragmentShader:{log:V,prefix:g}})}n.deleteShader(E),n.deleteShader(T),L=new pr(n,x),M=M0(n,x)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=n.getProgramParameter(x,u0)),S},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=d0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=T,this}let B0=0;class O0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new z0(t),e.set(t,i)),i}}class z0{constructor(t){this.id=B0++,this.code=t,this.usedTimes=0}}function k0(o,t,e,i,n,s,r){const a=new Dl,c=new O0,l=new Set,h=[],u=new Map,d=n.logarithmicDepthBuffer;let f=n.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return l.add(M),M===0?"uv":`uv${M}`}function p(M,S,P,U,I){const O=U.fog,B=I.geometry,D=M.isMeshStandardMaterial?U.environment:null,V=(M.isMeshStandardMaterial?e:t).get(M.envMap||D),X=V&&V.mapping===yr?V.image.height:null,J=m[M.type];M.precision!==null&&(f=n.getMaxPrecision(M.precision),f!==M.precision&&Ut("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const nt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ot=nt!==void 0?nt.length:0;let at=0;B.morphAttributes.position!==void 0&&(at=1),B.morphAttributes.normal!==void 0&&(at=2),B.morphAttributes.color!==void 0&&(at=3);let Ft,ae,ie,j;if(J){const se=yi[J];Ft=se.vertexShader,ae=se.fragmentShader}else Ft=M.vertexShader,ae=M.fragmentShader,c.update(M),ie=c.getVertexShaderID(M),j=c.getFragmentShaderID(M);const tt=o.getRenderTarget(),Mt=o.state.buffers.depth.getReversed(),zt=I.isInstancedMesh===!0,bt=I.isBatchedMesh===!0,$t=!!M.map,Ie=!!M.matcap,Zt=!!V,ne=!!M.aoMap,le=!!M.lightMap,Vt=!!M.bumpMap,Se=!!M.normalMap,F=!!M.displacementMap,be=!!M.emissiveMap,ee=!!M.metalnessMap,ue=!!M.roughnessMap,Tt=M.anisotropy>0,R=M.clearcoat>0,w=M.dispersion>0,k=M.iridescence>0,K=M.sheen>0,Q=M.transmission>0,Z=Tt&&!!M.anisotropyMap,Ct=R&&!!M.clearcoatMap,lt=R&&!!M.clearcoatNormalMap,Et=R&&!!M.clearcoatRoughnessMap,Nt=k&&!!M.iridescenceMap,it=k&&!!M.iridescenceThicknessMap,ut=K&&!!M.sheenColorMap,St=K&&!!M.sheenRoughnessMap,At=!!M.specularMap,ht=!!M.specularColorMap,Ht=!!M.specularIntensityMap,z=Q&&!!M.transmissionMap,mt=Q&&!!M.thicknessMap,rt=!!M.gradientMap,gt=!!M.alphaMap,et=M.alphaTest>0,$=!!M.alphaHash,ct=!!M.extensions;let Bt=Si;M.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Bt=o.toneMapping);const de={shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:Ft,fragmentShader:ae,defines:M.defines,customVertexShaderID:ie,customFragmentShaderID:j,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:bt,batchingColor:bt&&I._colorsTexture!==null,instancing:zt,instancingColor:zt&&I.instanceColor!==null,instancingMorph:zt&&I.morphTexture!==null,outputColorSpace:tt===null?o.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:qn,alphaToCoverage:!!M.alphaToCoverage,map:$t,matcap:Ie,envMap:Zt,envMapMode:Zt&&V.mapping,envMapCubeUVHeight:X,aoMap:ne,lightMap:le,bumpMap:Vt,normalMap:Se,displacementMap:F,emissiveMap:be,normalMapObjectSpace:Se&&M.normalMapType===qh,normalMapTangentSpace:Se&&M.normalMapType===Rl,metalnessMap:ee,roughnessMap:ue,anisotropy:Tt,anisotropyMap:Z,clearcoat:R,clearcoatMap:Ct,clearcoatNormalMap:lt,clearcoatRoughnessMap:Et,dispersion:w,iridescence:k,iridescenceMap:Nt,iridescenceThicknessMap:it,sheen:K,sheenColorMap:ut,sheenRoughnessMap:St,specularMap:At,specularColorMap:ht,specularIntensityMap:Ht,transmission:Q,transmissionMap:z,thicknessMap:mt,gradientMap:rt,opaque:M.transparent===!1&&M.blending===zn&&M.alphaToCoverage===!1,alphaMap:gt,alphaTest:et,alphaHash:$,combine:M.combine,mapUv:$t&&x(M.map.channel),aoMapUv:ne&&x(M.aoMap.channel),lightMapUv:le&&x(M.lightMap.channel),bumpMapUv:Vt&&x(M.bumpMap.channel),normalMapUv:Se&&x(M.normalMap.channel),displacementMapUv:F&&x(M.displacementMap.channel),emissiveMapUv:be&&x(M.emissiveMap.channel),metalnessMapUv:ee&&x(M.metalnessMap.channel),roughnessMapUv:ue&&x(M.roughnessMap.channel),anisotropyMapUv:Z&&x(M.anisotropyMap.channel),clearcoatMapUv:Ct&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:lt&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:it&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:St&&x(M.sheenRoughnessMap.channel),specularMapUv:At&&x(M.specularMap.channel),specularColorMapUv:ht&&x(M.specularColorMap.channel),specularIntensityMapUv:Ht&&x(M.specularIntensityMap.channel),transmissionMapUv:z&&x(M.transmissionMap.channel),thicknessMapUv:mt&&x(M.thicknessMap.channel),alphaMapUv:gt&&x(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Se||Tt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!B.attributes.uv&&($t||gt),fog:!!O,useFog:M.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Mt,skinning:I.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:at,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:o.shadowMap.enabled&&P.length>0,shadowMapType:o.shadowMap.type,toneMapping:Bt,decodeVideoTexture:$t&&M.map.isVideoTexture===!0&&Kt.getTransfer(M.map.colorSpace)===oe,decodeVideoTextureEmissive:be&&M.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(M.emissiveMap.colorSpace)===oe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Yt,flipSided:M.side===Xe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ct&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&M.extensions.multiDraw===!0||bt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return de.vertexUv1s=l.has(1),de.vertexUv2s=l.has(2),de.vertexUv3s=l.has(3),l.clear(),de}function g(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)S.push(P),S.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(v(S,M),y(S,M),S.push(o.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function v(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){const S=m[M.type];let P;if(S){const U=yi[S];P=_u.clone(U.uniforms)}else P=M.uniforms;return P}function E(M,S){let P=u.get(S);return P!==void 0?++P.usedTimes:(P=new U0(o,S,M,s),h.push(P),u.set(S,P)),P}function T(M){if(--M.usedTimes===0){const S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),u.delete(M.cacheKey),M.destroy()}}function C(M){c.remove(M)}function L(){c.dispose()}return{getParameters:p,getProgramCacheKey:g,getUniforms:_,acquireProgram:E,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:L}}function G0(){let o=new WeakMap;function t(r){return o.has(r)}function e(r){let a=o.get(r);return a===void 0&&(a={},o.set(r,a)),a}function i(r){o.delete(r)}function n(r,a,c){o.get(r)[a]=c}function s(){o=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function V0(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function Hc(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function Wc(){const o=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function r(u,d,f,m,x,p){let g=o[t];return g===void 0?(g={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:x,group:p},o[t]=g):(g.id=u.id,g.object=u,g.geometry=d,g.material=f,g.groupOrder=m,g.renderOrder=u.renderOrder,g.z=x,g.group=p),t++,g}function a(u,d,f,m,x,p){const g=r(u,d,f,m,x,p);f.transmission>0?i.push(g):f.transparent===!0?n.push(g):e.push(g)}function c(u,d,f,m,x,p){const g=r(u,d,f,m,x,p);f.transmission>0?i.unshift(g):f.transparent===!0?n.unshift(g):e.unshift(g)}function l(u,d){e.length>1&&e.sort(u||V0),i.length>1&&i.sort(d||Hc),n.length>1&&n.sort(d||Hc)}function h(){for(let u=t,d=o.length;u<d;u++){const f=o[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:a,unshift:c,finish:h,sort:l}}function H0(){let o=new WeakMap;function t(i,n){const s=o.get(i);let r;return s===void 0?(r=new Wc,o.set(i,[r])):n>=s.length?(r=new Wc,s.push(r)):r=s[n],r}function e(){o=new WeakMap}return{get:t,dispose:e}}function W0(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Ot};break;case"SpotLight":e={position:new N,direction:new N,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new N,halfWidth:new N,halfHeight:new N};break}return o[t.id]=e,e}}}function q0(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=e,e}}}let X0=0;function Y0(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function Z0(o){const t=new W0,e=q0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);const n=new N,s=new ge,r=new ge;function a(l){let h=0,u=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let f=0,m=0,x=0,p=0,g=0,v=0,y=0,_=0,E=0,T=0,C=0;l.sort(Y0);for(let M=0,S=l.length;M<S;M++){const P=l[M],U=P.color,I=P.intensity,O=P.distance;let B=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Wn?B=P.shadow.map.texture:B=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=U.r*I,u+=U.g*I,d+=U.b*I;else if(P.isLightProbe){for(let D=0;D<9;D++)i.probe[D].addScaledVector(P.sh.coefficients[D],I);C++}else if(P.isDirectionalLight){const D=t.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const V=P.shadow,X=e.get(P);X.shadowIntensity=V.intensity,X.shadowBias=V.bias,X.shadowNormalBias=V.normalBias,X.shadowRadius=V.radius,X.shadowMapSize=V.mapSize,i.directionalShadow[f]=X,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=P.shadow.matrix,v++}i.directional[f]=D,f++}else if(P.isSpotLight){const D=t.get(P);D.position.setFromMatrixPosition(P.matrixWorld),D.color.copy(U).multiplyScalar(I),D.distance=O,D.coneCos=Math.cos(P.angle),D.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),D.decay=P.decay,i.spot[x]=D;const V=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,V.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[x]=V.matrix,P.castShadow){const X=e.get(P);X.shadowIntensity=V.intensity,X.shadowBias=V.bias,X.shadowNormalBias=V.normalBias,X.shadowRadius=V.radius,X.shadowMapSize=V.mapSize,i.spotShadow[x]=X,i.spotShadowMap[x]=B,_++}x++}else if(P.isRectAreaLight){const D=t.get(P);D.color.copy(U).multiplyScalar(I),D.halfWidth.set(P.width*.5,0,0),D.halfHeight.set(0,P.height*.5,0),i.rectArea[p]=D,p++}else if(P.isPointLight){const D=t.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),D.distance=P.distance,D.decay=P.decay,P.castShadow){const V=P.shadow,X=e.get(P);X.shadowIntensity=V.intensity,X.shadowBias=V.bias,X.shadowNormalBias=V.normalBias,X.shadowRadius=V.radius,X.shadowMapSize=V.mapSize,X.shadowCameraNear=V.camera.near,X.shadowCameraFar=V.camera.far,i.pointShadow[m]=X,i.pointShadowMap[m]=B,i.pointShadowMatrix[m]=P.shadow.matrix,y++}i.point[m]=D,m++}else if(P.isHemisphereLight){const D=t.get(P);D.skyColor.copy(P.color).multiplyScalar(I),D.groundColor.copy(P.groundColor).multiplyScalar(I),i.hemi[g]=D,g++}}p>0&&(o.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ft.LTC_FLOAT_1,i.rectAreaLTC2=ft.LTC_FLOAT_2):(i.rectAreaLTC1=ft.LTC_HALF_1,i.rectAreaLTC2=ft.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const L=i.hash;(L.directionalLength!==f||L.pointLength!==m||L.spotLength!==x||L.rectAreaLength!==p||L.hemiLength!==g||L.numDirectionalShadows!==v||L.numPointShadows!==y||L.numSpotShadows!==_||L.numSpotMaps!==E||L.numLightProbes!==C)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=p,i.point.length=m,i.hemi.length=g,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=_+E-T,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,L.directionalLength=f,L.pointLength=m,L.spotLength=x,L.rectAreaLength=p,L.hemiLength=g,L.numDirectionalShadows=v,L.numPointShadows=y,L.numSpotShadows=_,L.numSpotMaps=E,L.numLightProbes=C,i.version=X0++)}function c(l,h){let u=0,d=0,f=0,m=0,x=0;const p=h.matrixWorldInverse;for(let g=0,v=l.length;g<v;g++){const y=l[g];if(y.isDirectionalLight){const _=i.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(p),u++}else if(y.isSpotLight){const _=i.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(p),f++}else if(y.isRectAreaLight){const _=i.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),r.identity(),s.copy(y.matrixWorld),s.premultiply(p),r.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(r),_.halfHeight.applyMatrix4(r),m++}else if(y.isPointLight){const _=i.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),d++}else if(y.isHemisphereLight){const _=i.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(p),x++}}}return{setup:a,setupView:c,state:i}}function qc(o){const t=new Z0(o),e=[],i=[];function n(h){l.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function r(h){i.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:r}}function K0(o){let t=new WeakMap;function e(n,s=0){const r=t.get(n);let a;return r===void 0?(a=new qc(o),t.set(n,[a])):s>=r.length?(a=new qc(o),r.push(a)):a=r[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const j0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,J0=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],Q0=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Xc=new ge,ls=new N,lo=new N;function tg(o,t,e){let i=new Ea;const n=new yt,s=new yt,r=new Me,a=new hd,c=new ud,l={},h=e.maxTextureSize,u={[tn]:Xe,[Xe]:tn,[Yt]:Yt},d=new Ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:j0,fragmentShader:$0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Pe;m.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new q(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lr;let g=this.type;this.render=function(T,C,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;T.type===wh&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),T.type=lr);const M=o.getRenderTarget(),S=o.getActiveCubeFace(),P=o.getActiveMipmapLevel(),U=o.state;U.setBlending(ki),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const I=g!==this.type;I&&C.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(B=>B.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,B=T.length;O<B;O++){const D=T[O],V=D.shadow;if(V===void 0){Ut("WebGLShadowMap:",D,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;n.copy(V.mapSize);const X=V.getFrameExtents();if(n.multiply(X),s.copy(V.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/X.x),n.x=s.x*X.x,V.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/X.y),n.y=s.y*X.y,V.mapSize.y=s.y)),V.map===null||I===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===ps){if(D.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new bi(n.x,n.y,{format:Wn,type:Vi,minFilter:Oe,magFilter:Oe,generateMipmaps:!1}),V.map.texture.name=D.name+".shadowMap",V.map.depthTexture=new Ss(n.x,n.y,Mi),V.map.depthTexture.name=D.name+".shadowMapDepth",V.map.depthTexture.format=Hi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=De,V.map.depthTexture.magFilter=De}else{D.isPointLight?(V.map=new kl(n.x),V.map.depthTexture=new Pu(n.x,Ei)):(V.map=new bi(n.x,n.y),V.map.depthTexture=new Ss(n.x,n.y,Ei)),V.map.depthTexture.name=D.name+".shadowMap",V.map.depthTexture.format=Hi;const nt=o.state.buffers.depth.getReversed();this.type===lr?(V.map.depthTexture.compareFunction=nt?wa:Ma,V.map.depthTexture.minFilter=Oe,V.map.depthTexture.magFilter=Oe):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=De,V.map.depthTexture.magFilter=De)}V.camera.updateProjectionMatrix()}const J=V.map.isWebGLCubeRenderTarget?6:1;for(let nt=0;nt<J;nt++){if(V.map.isWebGLCubeRenderTarget)o.setRenderTarget(V.map,nt),o.clear();else{nt===0&&(o.setRenderTarget(V.map),o.clear());const ot=V.getViewport(nt);r.set(s.x*ot.x,s.y*ot.y,s.x*ot.z,s.y*ot.w),U.viewport(r)}if(D.isPointLight){const ot=V.camera,at=V.matrix,Ft=D.distance||ot.far;Ft!==ot.far&&(ot.far=Ft,ot.updateProjectionMatrix()),ls.setFromMatrixPosition(D.matrixWorld),ot.position.copy(ls),lo.copy(ot.position),lo.add(J0[nt]),ot.up.copy(Q0[nt]),ot.lookAt(lo),ot.updateMatrixWorld(),at.makeTranslation(-ls.x,-ls.y,-ls.z),Xc.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Xc,ot.coordinateSystem,ot.reversedDepth)}else V.updateMatrices(D);i=V.getFrustum(),_(C,L,V.camera,D,this.type)}V.isPointLightShadow!==!0&&this.type===ps&&v(V,L),V.needsUpdate=!1}g=this.type,p.needsUpdate=!1,o.setRenderTarget(M,S,P)};function v(T,C){const L=t.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new bi(n.x,n.y,{format:Wn,type:Vi})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,o.setRenderTarget(T.mapPass),o.clear(),o.renderBufferDirect(C,null,L,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,o.setRenderTarget(T.map),o.clear(),o.renderBufferDirect(C,null,L,f,x,null)}function y(T,C,L,M){let S=null;const P=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)S=P;else if(S=L.isPointLight===!0?c:a,o.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const U=S.uuid,I=C.uuid;let O=l[U];O===void 0&&(O={},l[U]=O);let B=O[I];B===void 0&&(B=S.clone(),O[I]=B,C.addEventListener("dispose",E)),S=B}if(S.visible=C.visible,S.wireframe=C.wireframe,M===ps?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=o.properties.get(S);U.light=L}return S}function _(T,C,L,M,S){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===ps)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const I=t.update(T),O=T.material;if(Array.isArray(O)){const B=I.groups;for(let D=0,V=B.length;D<V;D++){const X=B[D],J=O[X.materialIndex];if(J&&J.visible){const nt=y(T,J,M,S);T.onBeforeShadow(o,T,C,L,I,nt,X),o.renderBufferDirect(L,null,I,nt,T,X),T.onAfterShadow(o,T,C,L,I,nt,X)}}}else if(O.visible){const B=y(T,O,M,S);T.onBeforeShadow(o,T,C,L,I,B,null),o.renderBufferDirect(L,null,I,B,T,null),T.onAfterShadow(o,T,C,L,I,B,null)}}const U=T.children;for(let I=0,O=U.length;I<O;I++)_(U[I],C,L,M,S)}function E(T){T.target.removeEventListener("dispose",E);for(const L in l){const M=l[L],S=T.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const eg={[_o]:yo,[Mo]:bo,[wo]:Eo,[Vn]:So,[yo]:_o,[bo]:Mo,[Eo]:wo,[So]:Vn};function ig(o,t){function e(){let z=!1;const mt=new Me;let rt=null;const gt=new Me(0,0,0,0);return{setMask:function(et){rt!==et&&!z&&(o.colorMask(et,et,et,et),rt=et)},setLocked:function(et){z=et},setClear:function(et,$,ct,Bt,de){de===!0&&(et*=Bt,$*=Bt,ct*=Bt),mt.set(et,$,ct,Bt),gt.equals(mt)===!1&&(o.clearColor(et,$,ct,Bt),gt.copy(mt))},reset:function(){z=!1,rt=null,gt.set(-1,0,0,0)}}}function i(){let z=!1,mt=!1,rt=null,gt=null,et=null;return{setReversed:function($){if(mt!==$){const ct=t.get("EXT_clip_control");$?ct.clipControlEXT(ct.LOWER_LEFT_EXT,ct.ZERO_TO_ONE_EXT):ct.clipControlEXT(ct.LOWER_LEFT_EXT,ct.NEGATIVE_ONE_TO_ONE_EXT),mt=$;const Bt=et;et=null,this.setClear(Bt)}},getReversed:function(){return mt},setTest:function($){$?tt(o.DEPTH_TEST):Mt(o.DEPTH_TEST)},setMask:function($){rt!==$&&!z&&(o.depthMask($),rt=$)},setFunc:function($){if(mt&&($=eg[$]),gt!==$){switch($){case _o:o.depthFunc(o.NEVER);break;case yo:o.depthFunc(o.ALWAYS);break;case Mo:o.depthFunc(o.LESS);break;case Vn:o.depthFunc(o.LEQUAL);break;case wo:o.depthFunc(o.EQUAL);break;case So:o.depthFunc(o.GEQUAL);break;case bo:o.depthFunc(o.GREATER);break;case Eo:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}gt=$}},setLocked:function($){z=$},setClear:function($){et!==$&&(mt&&($=1-$),o.clearDepth($),et=$)},reset:function(){z=!1,rt=null,gt=null,et=null,mt=!1}}}function n(){let z=!1,mt=null,rt=null,gt=null,et=null,$=null,ct=null,Bt=null,de=null;return{setTest:function(se){z||(se?tt(o.STENCIL_TEST):Mt(o.STENCIL_TEST))},setMask:function(se){mt!==se&&!z&&(o.stencilMask(se),mt=se)},setFunc:function(se,mi,Ci){(rt!==se||gt!==mi||et!==Ci)&&(o.stencilFunc(se,mi,Ci),rt=se,gt=mi,et=Ci)},setOp:function(se,mi,Ci){($!==se||ct!==mi||Bt!==Ci)&&(o.stencilOp(se,mi,Ci),$=se,ct=mi,Bt=Ci)},setLocked:function(se){z=se},setClear:function(se){de!==se&&(o.clearStencil(se),de=se)},reset:function(){z=!1,mt=null,rt=null,gt=null,et=null,$=null,ct=null,Bt=null,de=null}}}const s=new e,r=new i,a=new n,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,x=!1,p=null,g=null,v=null,y=null,_=null,E=null,T=null,C=new Ot(0,0,0),L=0,M=!1,S=null,P=null,U=null,I=null,O=null;const B=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,V=0;const X=o.getParameter(o.VERSION);X.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(X)[1]),D=V>=1):X.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),D=V>=2);let J=null,nt={};const ot=o.getParameter(o.SCISSOR_BOX),at=o.getParameter(o.VIEWPORT),Ft=new Me().fromArray(ot),ae=new Me().fromArray(at);function ie(z,mt,rt,gt){const et=new Uint8Array(4),$=o.createTexture();o.bindTexture(z,$),o.texParameteri(z,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(z,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let ct=0;ct<rt;ct++)z===o.TEXTURE_3D||z===o.TEXTURE_2D_ARRAY?o.texImage3D(mt,0,o.RGBA,1,1,gt,0,o.RGBA,o.UNSIGNED_BYTE,et):o.texImage2D(mt+ct,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,et);return $}const j={};j[o.TEXTURE_2D]=ie(o.TEXTURE_2D,o.TEXTURE_2D,1),j[o.TEXTURE_CUBE_MAP]=ie(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[o.TEXTURE_2D_ARRAY]=ie(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),j[o.TEXTURE_3D]=ie(o.TEXTURE_3D,o.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),tt(o.DEPTH_TEST),r.setFunc(Vn),Vt(!1),Se(Va),tt(o.CULL_FACE),ne(ki);function tt(z){h[z]!==!0&&(o.enable(z),h[z]=!0)}function Mt(z){h[z]!==!1&&(o.disable(z),h[z]=!1)}function zt(z,mt){return u[z]!==mt?(o.bindFramebuffer(z,mt),u[z]=mt,z===o.DRAW_FRAMEBUFFER&&(u[o.FRAMEBUFFER]=mt),z===o.FRAMEBUFFER&&(u[o.DRAW_FRAMEBUFFER]=mt),!0):!1}function bt(z,mt){let rt=f,gt=!1;if(z){rt=d.get(mt),rt===void 0&&(rt=[],d.set(mt,rt));const et=z.textures;if(rt.length!==et.length||rt[0]!==o.COLOR_ATTACHMENT0){for(let $=0,ct=et.length;$<ct;$++)rt[$]=o.COLOR_ATTACHMENT0+$;rt.length=et.length,gt=!0}}else rt[0]!==o.BACK&&(rt[0]=o.BACK,gt=!0);gt&&o.drawBuffers(rt)}function $t(z){return m!==z?(o.useProgram(z),m=z,!0):!1}const Ie={[mn]:o.FUNC_ADD,[bh]:o.FUNC_SUBTRACT,[Eh]:o.FUNC_REVERSE_SUBTRACT};Ie[Th]=o.MIN,Ie[Ah]=o.MAX;const Zt={[Ch]:o.ZERO,[Rh]:o.ONE,[Ph]:o.SRC_COLOR,[xo]:o.SRC_ALPHA,[Uh]:o.SRC_ALPHA_SATURATE,[Nh]:o.DST_COLOR,[Lh]:o.DST_ALPHA,[Ih]:o.ONE_MINUS_SRC_COLOR,[vo]:o.ONE_MINUS_SRC_ALPHA,[Fh]:o.ONE_MINUS_DST_COLOR,[Dh]:o.ONE_MINUS_DST_ALPHA,[Bh]:o.CONSTANT_COLOR,[Oh]:o.ONE_MINUS_CONSTANT_COLOR,[zh]:o.CONSTANT_ALPHA,[kh]:o.ONE_MINUS_CONSTANT_ALPHA};function ne(z,mt,rt,gt,et,$,ct,Bt,de,se){if(z===ki){x===!0&&(Mt(o.BLEND),x=!1);return}if(x===!1&&(tt(o.BLEND),x=!0),z!==Sh){if(z!==p||se!==M){if((g!==mn||_!==mn)&&(o.blendEquation(o.FUNC_ADD),g=mn,_=mn),se)switch(z){case zn:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Ha:o.blendFunc(o.ONE,o.ONE);break;case Wa:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case qa:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:Qt("WebGLState: Invalid blending: ",z);break}else switch(z){case zn:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Ha:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case Wa:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qa:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",z);break}v=null,y=null,E=null,T=null,C.set(0,0,0),L=0,p=z,M=se}return}et=et||mt,$=$||rt,ct=ct||gt,(mt!==g||et!==_)&&(o.blendEquationSeparate(Ie[mt],Ie[et]),g=mt,_=et),(rt!==v||gt!==y||$!==E||ct!==T)&&(o.blendFuncSeparate(Zt[rt],Zt[gt],Zt[$],Zt[ct]),v=rt,y=gt,E=$,T=ct),(Bt.equals(C)===!1||de!==L)&&(o.blendColor(Bt.r,Bt.g,Bt.b,de),C.copy(Bt),L=de),p=z,M=!1}function le(z,mt){z.side===Yt?Mt(o.CULL_FACE):tt(o.CULL_FACE);let rt=z.side===Xe;mt&&(rt=!rt),Vt(rt),z.blending===zn&&z.transparent===!1?ne(ki):ne(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),r.setFunc(z.depthFunc),r.setTest(z.depthTest),r.setMask(z.depthWrite),s.setMask(z.colorWrite);const gt=z.stencilWrite;a.setTest(gt),gt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),be(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?tt(o.SAMPLE_ALPHA_TO_COVERAGE):Mt(o.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(z){S!==z&&(z?o.frontFace(o.CW):o.frontFace(o.CCW),S=z)}function Se(z){z!==yh?(tt(o.CULL_FACE),z!==P&&(z===Va?o.cullFace(o.BACK):z===Mh?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Mt(o.CULL_FACE),P=z}function F(z){z!==U&&(D&&o.lineWidth(z),U=z)}function be(z,mt,rt){z?(tt(o.POLYGON_OFFSET_FILL),(I!==mt||O!==rt)&&(o.polygonOffset(mt,rt),I=mt,O=rt)):Mt(o.POLYGON_OFFSET_FILL)}function ee(z){z?tt(o.SCISSOR_TEST):Mt(o.SCISSOR_TEST)}function ue(z){z===void 0&&(z=o.TEXTURE0+B-1),J!==z&&(o.activeTexture(z),J=z)}function Tt(z,mt,rt){rt===void 0&&(J===null?rt=o.TEXTURE0+B-1:rt=J);let gt=nt[rt];gt===void 0&&(gt={type:void 0,texture:void 0},nt[rt]=gt),(gt.type!==z||gt.texture!==mt)&&(J!==rt&&(o.activeTexture(rt),J=rt),o.bindTexture(z,mt||j[z]),gt.type=z,gt.texture=mt)}function R(){const z=nt[J];z!==void 0&&z.type!==void 0&&(o.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function w(){try{o.compressedTexImage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function k(){try{o.compressedTexImage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function K(){try{o.texSubImage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Q(){try{o.texSubImage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Z(){try{o.compressedTexSubImage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Ct(){try{o.compressedTexSubImage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function lt(){try{o.texStorage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Et(){try{o.texStorage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Nt(){try{o.texImage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function it(){try{o.texImage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function ut(z){Ft.equals(z)===!1&&(o.scissor(z.x,z.y,z.z,z.w),Ft.copy(z))}function St(z){ae.equals(z)===!1&&(o.viewport(z.x,z.y,z.z,z.w),ae.copy(z))}function At(z,mt){let rt=l.get(mt);rt===void 0&&(rt=new WeakMap,l.set(mt,rt));let gt=rt.get(z);gt===void 0&&(gt=o.getUniformBlockIndex(mt,z.name),rt.set(z,gt))}function ht(z,mt){const gt=l.get(mt).get(z);c.get(mt)!==gt&&(o.uniformBlockBinding(mt,gt,z.__bindingPointIndex),c.set(mt,gt))}function Ht(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),r.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),h={},J=null,nt={},u={},d=new WeakMap,f=[],m=null,x=!1,p=null,g=null,v=null,y=null,_=null,E=null,T=null,C=new Ot(0,0,0),L=0,M=!1,S=null,P=null,U=null,I=null,O=null,Ft.set(0,0,o.canvas.width,o.canvas.height),ae.set(0,0,o.canvas.width,o.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:tt,disable:Mt,bindFramebuffer:zt,drawBuffers:bt,useProgram:$t,setBlending:ne,setMaterial:le,setFlipSided:Vt,setCullFace:Se,setLineWidth:F,setPolygonOffset:be,setScissorTest:ee,activeTexture:ue,bindTexture:Tt,unbindTexture:R,compressedTexImage2D:w,compressedTexImage3D:k,texImage2D:Nt,texImage3D:it,updateUBOMapping:At,uniformBlockBinding:ht,texStorage2D:lt,texStorage3D:Et,texSubImage2D:K,texSubImage3D:Q,compressedTexSubImage2D:Z,compressedTexSubImage3D:Ct,scissor:ut,viewport:St,reset:Ht}}function ng(o,t,e,i,n,s,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new yt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,w){return f?new OffscreenCanvas(R,w):xr("canvas")}function x(R,w,k){let K=1;const Q=Tt(R);if((Q.width>k||Q.height>k)&&(K=k/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Z=Math.floor(K*Q.width),Ct=Math.floor(K*Q.height);u===void 0&&(u=m(Z,Ct));const lt=w?m(Z,Ct):u;return lt.width=Z,lt.height=Ct,lt.getContext("2d").drawImage(R,0,0,Z,Ct),Ut("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+Ct+")."),lt}else return"data"in R&&Ut("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function p(R){return R.generateMipmaps}function g(R){o.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?o.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function y(R,w,k,K,Q=!1){if(R!==null){if(o[R]!==void 0)return o[R];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Z=w;if(w===o.RED&&(k===o.FLOAT&&(Z=o.R32F),k===o.HALF_FLOAT&&(Z=o.R16F),k===o.UNSIGNED_BYTE&&(Z=o.R8)),w===o.RED_INTEGER&&(k===o.UNSIGNED_BYTE&&(Z=o.R8UI),k===o.UNSIGNED_SHORT&&(Z=o.R16UI),k===o.UNSIGNED_INT&&(Z=o.R32UI),k===o.BYTE&&(Z=o.R8I),k===o.SHORT&&(Z=o.R16I),k===o.INT&&(Z=o.R32I)),w===o.RG&&(k===o.FLOAT&&(Z=o.RG32F),k===o.HALF_FLOAT&&(Z=o.RG16F),k===o.UNSIGNED_BYTE&&(Z=o.RG8)),w===o.RG_INTEGER&&(k===o.UNSIGNED_BYTE&&(Z=o.RG8UI),k===o.UNSIGNED_SHORT&&(Z=o.RG16UI),k===o.UNSIGNED_INT&&(Z=o.RG32UI),k===o.BYTE&&(Z=o.RG8I),k===o.SHORT&&(Z=o.RG16I),k===o.INT&&(Z=o.RG32I)),w===o.RGB_INTEGER&&(k===o.UNSIGNED_BYTE&&(Z=o.RGB8UI),k===o.UNSIGNED_SHORT&&(Z=o.RGB16UI),k===o.UNSIGNED_INT&&(Z=o.RGB32UI),k===o.BYTE&&(Z=o.RGB8I),k===o.SHORT&&(Z=o.RGB16I),k===o.INT&&(Z=o.RGB32I)),w===o.RGBA_INTEGER&&(k===o.UNSIGNED_BYTE&&(Z=o.RGBA8UI),k===o.UNSIGNED_SHORT&&(Z=o.RGBA16UI),k===o.UNSIGNED_INT&&(Z=o.RGBA32UI),k===o.BYTE&&(Z=o.RGBA8I),k===o.SHORT&&(Z=o.RGBA16I),k===o.INT&&(Z=o.RGBA32I)),w===o.RGB&&(k===o.UNSIGNED_INT_5_9_9_9_REV&&(Z=o.RGB9_E5),k===o.UNSIGNED_INT_10F_11F_11F_REV&&(Z=o.R11F_G11F_B10F)),w===o.RGBA){const Ct=Q?mr:Kt.getTransfer(K);k===o.FLOAT&&(Z=o.RGBA32F),k===o.HALF_FLOAT&&(Z=o.RGBA16F),k===o.UNSIGNED_BYTE&&(Z=Ct===oe?o.SRGB8_ALPHA8:o.RGBA8),k===o.UNSIGNED_SHORT_4_4_4_4&&(Z=o.RGBA4),k===o.UNSIGNED_SHORT_5_5_5_1&&(Z=o.RGB5_A1)}return(Z===o.R16F||Z===o.R32F||Z===o.RG16F||Z===o.RG32F||Z===o.RGBA16F||Z===o.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(R,w){let k;return R?w===null||w===Ei||w===Ms?k=o.DEPTH24_STENCIL8:w===Mi?k=o.DEPTH32F_STENCIL8:w===ys&&(k=o.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Ei||w===Ms?k=o.DEPTH_COMPONENT24:w===Mi?k=o.DEPTH_COMPONENT32F:w===ys&&(k=o.DEPTH_COMPONENT16),k}function E(R,w){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==De&&R.minFilter!==Oe?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function T(R){const w=R.target;w.removeEventListener("dispose",T),L(w),w.isVideoTexture&&h.delete(w)}function C(R){const w=R.target;w.removeEventListener("dispose",C),S(w)}function L(R){const w=i.get(R);if(w.__webglInit===void 0)return;const k=R.source,K=d.get(k);if(K){const Q=K[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(R),Object.keys(K).length===0&&d.delete(k)}i.remove(R)}function M(R){const w=i.get(R);o.deleteTexture(w.__webglTexture);const k=R.source,K=d.get(k);delete K[w.__cacheKey],r.memory.textures--}function S(R){const w=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(w.__webglFramebuffer[K]))for(let Q=0;Q<w.__webglFramebuffer[K].length;Q++)o.deleteFramebuffer(w.__webglFramebuffer[K][Q]);else o.deleteFramebuffer(w.__webglFramebuffer[K]);w.__webglDepthbuffer&&o.deleteRenderbuffer(w.__webglDepthbuffer[K])}else{if(Array.isArray(w.__webglFramebuffer))for(let K=0;K<w.__webglFramebuffer.length;K++)o.deleteFramebuffer(w.__webglFramebuffer[K]);else o.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&o.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&o.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let K=0;K<w.__webglColorRenderbuffer.length;K++)w.__webglColorRenderbuffer[K]&&o.deleteRenderbuffer(w.__webglColorRenderbuffer[K]);w.__webglDepthRenderbuffer&&o.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const k=R.textures;for(let K=0,Q=k.length;K<Q;K++){const Z=i.get(k[K]);Z.__webglTexture&&(o.deleteTexture(Z.__webglTexture),r.memory.textures--),i.remove(k[K])}i.remove(R)}let P=0;function U(){P=0}function I(){const R=P;return R>=n.maxTextures&&Ut("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+n.maxTextures),P+=1,R}function O(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function B(R,w){const k=i.get(R);if(R.isVideoTexture&&ee(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const K=R.image;if(K===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{j(k,R,w);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(o.TEXTURE_2D,k.__webglTexture,o.TEXTURE0+w)}function D(R,w){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){j(k,R,w);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(o.TEXTURE_2D_ARRAY,k.__webglTexture,o.TEXTURE0+w)}function V(R,w){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){j(k,R,w);return}e.bindTexture(o.TEXTURE_3D,k.__webglTexture,o.TEXTURE0+w)}function X(R,w){const k=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){tt(k,R,w);return}e.bindTexture(o.TEXTURE_CUBE_MAP,k.__webglTexture,o.TEXTURE0+w)}const J={[Co]:o.REPEAT,[Oi]:o.CLAMP_TO_EDGE,[Ro]:o.MIRRORED_REPEAT},nt={[De]:o.NEAREST,[Hh]:o.NEAREST_MIPMAP_NEAREST,[Ds]:o.NEAREST_MIPMAP_LINEAR,[Oe]:o.LINEAR,[Rr]:o.LINEAR_MIPMAP_NEAREST,[vn]:o.LINEAR_MIPMAP_LINEAR},ot={[Xh]:o.NEVER,[$h]:o.ALWAYS,[Yh]:o.LESS,[Ma]:o.LEQUAL,[Zh]:o.EQUAL,[wa]:o.GEQUAL,[Kh]:o.GREATER,[jh]:o.NOTEQUAL};function at(R,w){if(w.type===Mi&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Oe||w.magFilter===Rr||w.magFilter===Ds||w.magFilter===vn||w.minFilter===Oe||w.minFilter===Rr||w.minFilter===Ds||w.minFilter===vn)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(R,o.TEXTURE_WRAP_S,J[w.wrapS]),o.texParameteri(R,o.TEXTURE_WRAP_T,J[w.wrapT]),(R===o.TEXTURE_3D||R===o.TEXTURE_2D_ARRAY)&&o.texParameteri(R,o.TEXTURE_WRAP_R,J[w.wrapR]),o.texParameteri(R,o.TEXTURE_MAG_FILTER,nt[w.magFilter]),o.texParameteri(R,o.TEXTURE_MIN_FILTER,nt[w.minFilter]),w.compareFunction&&(o.texParameteri(R,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(R,o.TEXTURE_COMPARE_FUNC,ot[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===De||w.minFilter!==Ds&&w.minFilter!==vn||w.type===Mi&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");o.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,n.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Ft(R,w){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",T));const K=w.source;let Q=d.get(K);Q===void 0&&(Q={},d.set(K,Q));const Z=O(w);if(Z!==R.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:o.createTexture(),usedTimes:0},r.memory.textures++,k=!0),Q[Z].usedTimes++;const Ct=Q[R.__cacheKey];Ct!==void 0&&(Q[R.__cacheKey].usedTimes--,Ct.usedTimes===0&&M(w)),R.__cacheKey=Z,R.__webglTexture=Q[Z].texture}return k}function ae(R,w,k){return Math.floor(Math.floor(R/k)/w)}function ie(R,w,k,K){const Z=R.updateRanges;if(Z.length===0)e.texSubImage2D(o.TEXTURE_2D,0,0,0,w.width,w.height,k,K,w.data);else{Z.sort((it,ut)=>it.start-ut.start);let Ct=0;for(let it=1;it<Z.length;it++){const ut=Z[Ct],St=Z[it],At=ut.start+ut.count,ht=ae(St.start,w.width,4),Ht=ae(ut.start,w.width,4);St.start<=At+1&&ht===Ht&&ae(St.start+St.count-1,w.width,4)===ht?ut.count=Math.max(ut.count,St.start+St.count-ut.start):(++Ct,Z[Ct]=St)}Z.length=Ct+1;const lt=o.getParameter(o.UNPACK_ROW_LENGTH),Et=o.getParameter(o.UNPACK_SKIP_PIXELS),Nt=o.getParameter(o.UNPACK_SKIP_ROWS);o.pixelStorei(o.UNPACK_ROW_LENGTH,w.width);for(let it=0,ut=Z.length;it<ut;it++){const St=Z[it],At=Math.floor(St.start/4),ht=Math.ceil(St.count/4),Ht=At%w.width,z=Math.floor(At/w.width),mt=ht,rt=1;o.pixelStorei(o.UNPACK_SKIP_PIXELS,Ht),o.pixelStorei(o.UNPACK_SKIP_ROWS,z),e.texSubImage2D(o.TEXTURE_2D,0,Ht,z,mt,rt,k,K,w.data)}R.clearUpdateRanges(),o.pixelStorei(o.UNPACK_ROW_LENGTH,lt),o.pixelStorei(o.UNPACK_SKIP_PIXELS,Et),o.pixelStorei(o.UNPACK_SKIP_ROWS,Nt)}}function j(R,w,k){let K=o.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(K=o.TEXTURE_2D_ARRAY),w.isData3DTexture&&(K=o.TEXTURE_3D);const Q=Ft(R,w),Z=w.source;e.bindTexture(K,R.__webglTexture,o.TEXTURE0+k);const Ct=i.get(Z);if(Z.version!==Ct.__version||Q===!0){e.activeTexture(o.TEXTURE0+k);const lt=Kt.getPrimaries(Kt.workingColorSpace),Et=w.colorSpace===$i?null:Kt.getPrimaries(w.colorSpace),Nt=w.colorSpace===$i||lt===Et?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,w.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,w.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let it=x(w.image,!1,n.maxTextureSize);it=ue(w,it);const ut=s.convert(w.format,w.colorSpace),St=s.convert(w.type);let At=y(w.internalFormat,ut,St,w.colorSpace,w.isVideoTexture);at(K,w);let ht;const Ht=w.mipmaps,z=w.isVideoTexture!==!0,mt=Ct.__version===void 0||Q===!0,rt=Z.dataReady,gt=E(w,it);if(w.isDepthTexture)At=_(w.format===_n,w.type),mt&&(z?e.texStorage2D(o.TEXTURE_2D,1,At,it.width,it.height):e.texImage2D(o.TEXTURE_2D,0,At,it.width,it.height,0,ut,St,null));else if(w.isDataTexture)if(Ht.length>0){z&&mt&&e.texStorage2D(o.TEXTURE_2D,gt,At,Ht[0].width,Ht[0].height);for(let et=0,$=Ht.length;et<$;et++)ht=Ht[et],z?rt&&e.texSubImage2D(o.TEXTURE_2D,et,0,0,ht.width,ht.height,ut,St,ht.data):e.texImage2D(o.TEXTURE_2D,et,At,ht.width,ht.height,0,ut,St,ht.data);w.generateMipmaps=!1}else z?(mt&&e.texStorage2D(o.TEXTURE_2D,gt,At,it.width,it.height),rt&&ie(w,it,ut,St)):e.texImage2D(o.TEXTURE_2D,0,At,it.width,it.height,0,ut,St,it.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){z&&mt&&e.texStorage3D(o.TEXTURE_2D_ARRAY,gt,At,Ht[0].width,Ht[0].height,it.depth);for(let et=0,$=Ht.length;et<$;et++)if(ht=Ht[et],w.format!==hi)if(ut!==null)if(z){if(rt)if(w.layerUpdates.size>0){const ct=Sc(ht.width,ht.height,w.format,w.type);for(const Bt of w.layerUpdates){const de=ht.data.subarray(Bt*ct/ht.data.BYTES_PER_ELEMENT,(Bt+1)*ct/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,et,0,0,Bt,ht.width,ht.height,1,ut,de)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,it.depth,ut,ht.data)}else e.compressedTexImage3D(o.TEXTURE_2D_ARRAY,et,At,ht.width,ht.height,it.depth,0,ht.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?rt&&e.texSubImage3D(o.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,it.depth,ut,St,ht.data):e.texImage3D(o.TEXTURE_2D_ARRAY,et,At,ht.width,ht.height,it.depth,0,ut,St,ht.data)}else{z&&mt&&e.texStorage2D(o.TEXTURE_2D,gt,At,Ht[0].width,Ht[0].height);for(let et=0,$=Ht.length;et<$;et++)ht=Ht[et],w.format!==hi?ut!==null?z?rt&&e.compressedTexSubImage2D(o.TEXTURE_2D,et,0,0,ht.width,ht.height,ut,ht.data):e.compressedTexImage2D(o.TEXTURE_2D,et,At,ht.width,ht.height,0,ht.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?rt&&e.texSubImage2D(o.TEXTURE_2D,et,0,0,ht.width,ht.height,ut,St,ht.data):e.texImage2D(o.TEXTURE_2D,et,At,ht.width,ht.height,0,ut,St,ht.data)}else if(w.isDataArrayTexture)if(z){if(mt&&e.texStorage3D(o.TEXTURE_2D_ARRAY,gt,At,it.width,it.height,it.depth),rt)if(w.layerUpdates.size>0){const et=Sc(it.width,it.height,w.format,w.type);for(const $ of w.layerUpdates){const ct=it.data.subarray($*et/it.data.BYTES_PER_ELEMENT,($+1)*et/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,$,it.width,it.height,1,ut,St,ct)}w.clearLayerUpdates()}else e.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,ut,St,it.data)}else e.texImage3D(o.TEXTURE_2D_ARRAY,0,At,it.width,it.height,it.depth,0,ut,St,it.data);else if(w.isData3DTexture)z?(mt&&e.texStorage3D(o.TEXTURE_3D,gt,At,it.width,it.height,it.depth),rt&&e.texSubImage3D(o.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,ut,St,it.data)):e.texImage3D(o.TEXTURE_3D,0,At,it.width,it.height,it.depth,0,ut,St,it.data);else if(w.isFramebufferTexture){if(mt)if(z)e.texStorage2D(o.TEXTURE_2D,gt,At,it.width,it.height);else{let et=it.width,$=it.height;for(let ct=0;ct<gt;ct++)e.texImage2D(o.TEXTURE_2D,ct,At,et,$,0,ut,St,null),et>>=1,$>>=1}}else if(Ht.length>0){if(z&&mt){const et=Tt(Ht[0]);e.texStorage2D(o.TEXTURE_2D,gt,At,et.width,et.height)}for(let et=0,$=Ht.length;et<$;et++)ht=Ht[et],z?rt&&e.texSubImage2D(o.TEXTURE_2D,et,0,0,ut,St,ht):e.texImage2D(o.TEXTURE_2D,et,At,ut,St,ht);w.generateMipmaps=!1}else if(z){if(mt){const et=Tt(it);e.texStorage2D(o.TEXTURE_2D,gt,At,et.width,et.height)}rt&&e.texSubImage2D(o.TEXTURE_2D,0,0,0,ut,St,it)}else e.texImage2D(o.TEXTURE_2D,0,At,ut,St,it);p(w)&&g(K),Ct.__version=Z.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function tt(R,w,k){if(w.image.length!==6)return;const K=Ft(R,w),Q=w.source;e.bindTexture(o.TEXTURE_CUBE_MAP,R.__webglTexture,o.TEXTURE0+k);const Z=i.get(Q);if(Q.version!==Z.__version||K===!0){e.activeTexture(o.TEXTURE0+k);const Ct=Kt.getPrimaries(Kt.workingColorSpace),lt=w.colorSpace===$i?null:Kt.getPrimaries(w.colorSpace),Et=w.colorSpace===$i||Ct===lt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,w.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,w.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const Nt=w.isCompressedTexture||w.image[0].isCompressedTexture,it=w.image[0]&&w.image[0].isDataTexture,ut=[];for(let $=0;$<6;$++)!Nt&&!it?ut[$]=x(w.image[$],!0,n.maxCubemapSize):ut[$]=it?w.image[$].image:w.image[$],ut[$]=ue(w,ut[$]);const St=ut[0],At=s.convert(w.format,w.colorSpace),ht=s.convert(w.type),Ht=y(w.internalFormat,At,ht,w.colorSpace),z=w.isVideoTexture!==!0,mt=Z.__version===void 0||K===!0,rt=Q.dataReady;let gt=E(w,St);at(o.TEXTURE_CUBE_MAP,w);let et;if(Nt){z&&mt&&e.texStorage2D(o.TEXTURE_CUBE_MAP,gt,Ht,St.width,St.height);for(let $=0;$<6;$++){et=ut[$].mipmaps;for(let ct=0;ct<et.length;ct++){const Bt=et[ct];w.format!==hi?At!==null?z?rt&&e.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,0,0,Bt.width,Bt.height,At,Bt.data):e.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,Ht,Bt.width,Bt.height,0,Bt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,0,0,Bt.width,Bt.height,At,ht,Bt.data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,Ht,Bt.width,Bt.height,0,At,ht,Bt.data)}}}else{if(et=w.mipmaps,z&&mt){et.length>0&&gt++;const $=Tt(ut[0]);e.texStorage2D(o.TEXTURE_CUBE_MAP,gt,Ht,$.width,$.height)}for(let $=0;$<6;$++)if(it){z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ut[$].width,ut[$].height,At,ht,ut[$].data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ht,ut[$].width,ut[$].height,0,At,ht,ut[$].data);for(let ct=0;ct<et.length;ct++){const de=et[ct].image[$].image;z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,0,0,de.width,de.height,At,ht,de.data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,Ht,de.width,de.height,0,At,ht,de.data)}}else{z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,At,ht,ut[$]):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ht,At,ht,ut[$]);for(let ct=0;ct<et.length;ct++){const Bt=et[ct];z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,0,0,At,ht,Bt.image[$]):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,Ht,At,ht,Bt.image[$])}}}p(w)&&g(o.TEXTURE_CUBE_MAP),Z.__version=Q.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function Mt(R,w,k,K,Q,Z){const Ct=s.convert(k.format,k.colorSpace),lt=s.convert(k.type),Et=y(k.internalFormat,Ct,lt,k.colorSpace),Nt=i.get(w),it=i.get(k);if(it.__renderTarget=w,!Nt.__hasExternalTextures){const ut=Math.max(1,w.width>>Z),St=Math.max(1,w.height>>Z);Q===o.TEXTURE_3D||Q===o.TEXTURE_2D_ARRAY?e.texImage3D(Q,Z,Et,ut,St,w.depth,0,Ct,lt,null):e.texImage2D(Q,Z,Et,ut,St,0,Ct,lt,null)}e.bindFramebuffer(o.FRAMEBUFFER,R),be(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,K,Q,it.__webglTexture,0,F(w)):(Q===o.TEXTURE_2D||Q>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,K,Q,it.__webglTexture,Z),e.bindFramebuffer(o.FRAMEBUFFER,null)}function zt(R,w,k){if(o.bindRenderbuffer(o.RENDERBUFFER,R),w.depthBuffer){const K=w.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Z=_(w.stencilBuffer,Q),Ct=w.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;be(w)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,F(w),Z,w.width,w.height):k?o.renderbufferStorageMultisample(o.RENDERBUFFER,F(w),Z,w.width,w.height):o.renderbufferStorage(o.RENDERBUFFER,Z,w.width,w.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Ct,o.RENDERBUFFER,R)}else{const K=w.textures;for(let Q=0;Q<K.length;Q++){const Z=K[Q],Ct=s.convert(Z.format,Z.colorSpace),lt=s.convert(Z.type),Et=y(Z.internalFormat,Ct,lt,Z.colorSpace);be(w)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,F(w),Et,w.width,w.height):k?o.renderbufferStorageMultisample(o.RENDERBUFFER,F(w),Et,w.width,w.height):o.renderbufferStorage(o.RENDERBUFFER,Et,w.width,w.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function bt(R,w,k){const K=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(o.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(w.depthTexture);if(Q.__renderTarget=w,(!Q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),K){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,w.depthTexture.addEventListener("dispose",T)),Q.__webglTexture===void 0){Q.__webglTexture=o.createTexture(),e.bindTexture(o.TEXTURE_CUBE_MAP,Q.__webglTexture),at(o.TEXTURE_CUBE_MAP,w.depthTexture);const Nt=s.convert(w.depthTexture.format),it=s.convert(w.depthTexture.type);let ut;w.depthTexture.format===Hi?ut=o.DEPTH_COMPONENT24:w.depthTexture.format===_n&&(ut=o.DEPTH24_STENCIL8);for(let St=0;St<6;St++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ut,w.width,w.height,0,Nt,it,null)}}else B(w.depthTexture,0);const Z=Q.__webglTexture,Ct=F(w),lt=K?o.TEXTURE_CUBE_MAP_POSITIVE_X+k:o.TEXTURE_2D,Et=w.depthTexture.format===_n?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(w.depthTexture.format===Hi)be(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Et,lt,Z,0,Ct):o.framebufferTexture2D(o.FRAMEBUFFER,Et,lt,Z,0);else if(w.depthTexture.format===_n)be(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Et,lt,Z,0,Ct):o.framebufferTexture2D(o.FRAMEBUFFER,Et,lt,Z,0);else throw new Error("Unknown depthTexture format")}function $t(R){const w=i.get(R),k=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),K){const Q=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),w.__depthDisposeCallback=Q}w.__boundDepthTexture=K}if(R.depthTexture&&!w.__autoAllocateDepthBuffer)if(k)for(let K=0;K<6;K++)bt(w.__webglFramebuffer[K],R,K);else{const K=R.texture.mipmaps;K&&K.length>0?bt(w.__webglFramebuffer[0],R,0):bt(w.__webglFramebuffer,R,0)}else if(k){w.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer[K]),w.__webglDepthbuffer[K]===void 0)w.__webglDepthbuffer[K]=o.createRenderbuffer(),zt(w.__webglDepthbuffer[K],R,!1);else{const Q=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Z=w.__webglDepthbuffer[K];o.bindRenderbuffer(o.RENDERBUFFER,Z),o.framebufferRenderbuffer(o.FRAMEBUFFER,Q,o.RENDERBUFFER,Z)}}else{const K=R.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=o.createRenderbuffer(),zt(w.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Z=w.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Z),o.framebufferRenderbuffer(o.FRAMEBUFFER,Q,o.RENDERBUFFER,Z)}}e.bindFramebuffer(o.FRAMEBUFFER,null)}function Ie(R,w,k){const K=i.get(R);w!==void 0&&Mt(K.__webglFramebuffer,R,R.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),k!==void 0&&$t(R)}function Zt(R){const w=R.texture,k=i.get(R),K=i.get(w);R.addEventListener("dispose",C);const Q=R.textures,Z=R.isWebGLCubeRenderTarget===!0,Ct=Q.length>1;if(Ct||(K.__webglTexture===void 0&&(K.__webglTexture=o.createTexture()),K.__version=w.version,r.memory.textures++),Z){k.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer[lt]=[];for(let Et=0;Et<w.mipmaps.length;Et++)k.__webglFramebuffer[lt][Et]=o.createFramebuffer()}else k.__webglFramebuffer[lt]=o.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer=[];for(let lt=0;lt<w.mipmaps.length;lt++)k.__webglFramebuffer[lt]=o.createFramebuffer()}else k.__webglFramebuffer=o.createFramebuffer();if(Ct)for(let lt=0,Et=Q.length;lt<Et;lt++){const Nt=i.get(Q[lt]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=o.createTexture(),r.memory.textures++)}if(R.samples>0&&be(R)===!1){k.__webglMultisampledFramebuffer=o.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(o.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let lt=0;lt<Q.length;lt++){const Et=Q[lt];k.__webglColorRenderbuffer[lt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,k.__webglColorRenderbuffer[lt]);const Nt=s.convert(Et.format,Et.colorSpace),it=s.convert(Et.type),ut=y(Et.internalFormat,Nt,it,Et.colorSpace,R.isXRRenderTarget===!0),St=F(R);o.renderbufferStorageMultisample(o.RENDERBUFFER,St,ut,R.width,R.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+lt,o.RENDERBUFFER,k.__webglColorRenderbuffer[lt])}o.bindRenderbuffer(o.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=o.createRenderbuffer(),zt(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Z){e.bindTexture(o.TEXTURE_CUBE_MAP,K.__webglTexture),at(o.TEXTURE_CUBE_MAP,w);for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0)for(let Et=0;Et<w.mipmaps.length;Et++)Mt(k.__webglFramebuffer[lt][Et],R,w,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Et);else Mt(k.__webglFramebuffer[lt],R,w,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);p(w)&&g(o.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let lt=0,Et=Q.length;lt<Et;lt++){const Nt=Q[lt],it=i.get(Nt);let ut=o.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ut=R.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),e.bindTexture(ut,it.__webglTexture),at(ut,Nt),Mt(k.__webglFramebuffer,R,Nt,o.COLOR_ATTACHMENT0+lt,ut,0),p(Nt)&&g(ut)}e.unbindTexture()}else{let lt=o.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(lt=R.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),e.bindTexture(lt,K.__webglTexture),at(lt,w),w.mipmaps&&w.mipmaps.length>0)for(let Et=0;Et<w.mipmaps.length;Et++)Mt(k.__webglFramebuffer[Et],R,w,o.COLOR_ATTACHMENT0,lt,Et);else Mt(k.__webglFramebuffer,R,w,o.COLOR_ATTACHMENT0,lt,0);p(w)&&g(lt),e.unbindTexture()}R.depthBuffer&&$t(R)}function ne(R){const w=R.textures;for(let k=0,K=w.length;k<K;k++){const Q=w[k];if(p(Q)){const Z=v(R),Ct=i.get(Q).__webglTexture;e.bindTexture(Z,Ct),g(Z),e.unbindTexture()}}}const le=[],Vt=[];function Se(R){if(R.samples>0){if(be(R)===!1){const w=R.textures,k=R.width,K=R.height;let Q=o.COLOR_BUFFER_BIT;const Z=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ct=i.get(R),lt=w.length>1;if(lt)for(let Nt=0;Nt<w.length;Nt++)e.bindFramebuffer(o.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Nt,o.RENDERBUFFER,null),e.bindFramebuffer(o.FRAMEBUFFER,Ct.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Nt,o.TEXTURE_2D,null,0);e.bindFramebuffer(o.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const Et=R.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let Nt=0;Nt<w.length;Nt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=o.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=o.STENCIL_BUFFER_BIT)),lt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Ct.__webglColorRenderbuffer[Nt]);const it=i.get(w[Nt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,it,0)}o.blitFramebuffer(0,0,k,K,0,0,k,K,Q,o.NEAREST),c===!0&&(le.length=0,Vt.length=0,le.push(o.COLOR_ATTACHMENT0+Nt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(le.push(Z),Vt.push(Z),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Vt)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,le))}if(e.bindFramebuffer(o.READ_FRAMEBUFFER,null),e.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),lt)for(let Nt=0;Nt<w.length;Nt++){e.bindFramebuffer(o.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Nt,o.RENDERBUFFER,Ct.__webglColorRenderbuffer[Nt]);const it=i.get(w[Nt]).__webglTexture;e.bindFramebuffer(o.FRAMEBUFFER,Ct.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Nt,o.TEXTURE_2D,it,0)}e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const w=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[w])}}}function F(R){return Math.min(n.maxSamples,R.samples)}function be(R){const w=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ee(R){const w=r.render.frame;h.get(R)!==w&&(h.set(R,w),R.update())}function ue(R,w){const k=R.colorSpace,K=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==qn&&k!==$i&&(Kt.getTransfer(k)===oe?(K!==hi||Q!==Je)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",k)),w}function Tt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=D,this.setTexture3D=V,this.setTextureCube=X,this.rebindTextures=Ie,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=$t,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=be,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function sg(o,t){function e(i,n=$i){let s;const r=Kt.getTransfer(n);if(i===Je)return o.UNSIGNED_BYTE;if(i===ga)return o.UNSIGNED_SHORT_4_4_4_4;if(i===xa)return o.UNSIGNED_SHORT_5_5_5_1;if(i===bl)return o.UNSIGNED_INT_5_9_9_9_REV;if(i===El)return o.UNSIGNED_INT_10F_11F_11F_REV;if(i===wl)return o.BYTE;if(i===Sl)return o.SHORT;if(i===ys)return o.UNSIGNED_SHORT;if(i===ma)return o.INT;if(i===Ei)return o.UNSIGNED_INT;if(i===Mi)return o.FLOAT;if(i===Vi)return o.HALF_FLOAT;if(i===Tl)return o.ALPHA;if(i===Al)return o.RGB;if(i===hi)return o.RGBA;if(i===Hi)return o.DEPTH_COMPONENT;if(i===_n)return o.DEPTH_STENCIL;if(i===Cl)return o.RED;if(i===va)return o.RED_INTEGER;if(i===Wn)return o.RG;if(i===_a)return o.RG_INTEGER;if(i===ya)return o.RGBA_INTEGER;if(i===hr||i===ur||i===dr||i===fr)if(r===oe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===hr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===hr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ur)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===dr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Po||i===Io||i===Lo||i===Do)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Po)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Io)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Lo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Do)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===No||i===Fo||i===Uo||i===Bo||i===Oo||i===zo||i===ko)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===No||i===Fo)return r===oe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Uo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Bo)return s.COMPRESSED_R11_EAC;if(i===Oo)return s.COMPRESSED_SIGNED_R11_EAC;if(i===zo)return s.COMPRESSED_RG11_EAC;if(i===ko)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Go||i===Vo||i===Ho||i===Wo||i===qo||i===Xo||i===Yo||i===Zo||i===Ko||i===jo||i===$o||i===Jo||i===Qo||i===ta)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Go)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Vo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ho)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Wo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===qo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Yo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Zo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ko)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$o)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Jo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ta)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ea||i===ia||i===na)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ea)return r===oe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ia)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===na)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===sa||i===ra||i===oa||i===aa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===sa)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ra)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===oa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===aa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ms?o.UNSIGNED_INT_24_8:o[i]!==void 0?o[i]:null}return{convert:e}}const rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,og=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ag{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Vl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ti({vertexShader:rg,fragmentShader:og,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new q(new qt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cg extends Kn{constructor(t,e){super();const i=this;let n=null,s=1,r=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null;const x=typeof XRWebGLBinding<"u",p=new ag,g={},v=e.getContextAttributes();let y=null,_=null;const E=[],T=[],C=new yt;let L=null;const M=new si;M.viewport=new Me;const S=new si;S.viewport=new Me;const P=[M,S],U=new gd;let I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let tt=E[j];return tt===void 0&&(tt=new Jr,E[j]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(j){let tt=E[j];return tt===void 0&&(tt=new Jr,E[j]=tt),tt.getGripSpace()},this.getHand=function(j){let tt=E[j];return tt===void 0&&(tt=new Jr,E[j]=tt),tt.getHandSpace()};function B(j){const tt=T.indexOf(j.inputSource);if(tt===-1)return;const Mt=E[tt];Mt!==void 0&&(Mt.update(j.inputSource,j.frame,l||r),Mt.dispatchEvent({type:j.type,data:j.inputSource}))}function D(){n.removeEventListener("select",B),n.removeEventListener("selectstart",B),n.removeEventListener("selectend",B),n.removeEventListener("squeeze",B),n.removeEventListener("squeezestart",B),n.removeEventListener("squeezeend",B),n.removeEventListener("end",D),n.removeEventListener("inputsourceschange",V);for(let j=0;j<E.length;j++){const tt=T[j];tt!==null&&(T[j]=null,E[j].disconnect(tt))}I=null,O=null,p.reset();for(const j in g)delete g[j];t.setRenderTarget(y),f=null,d=null,u=null,n=null,_=null,ie.stop(),i.isPresenting=!1,t.setPixelRatio(L),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(n,e)),u},this.getFrame=function(){return m},this.getSession=function(){return n},this.setSession=async function(j){if(n=j,n!==null){if(y=t.getRenderTarget(),n.addEventListener("select",B),n.addEventListener("selectstart",B),n.addEventListener("selectend",B),n.addEventListener("squeeze",B),n.addEventListener("squeezestart",B),n.addEventListener("squeezeend",B),n.addEventListener("end",D),n.addEventListener("inputsourceschange",V),v.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,zt=null,bt=null;v.depth&&(bt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=v.stencil?_n:Hi,zt=v.stencil?Ms:Ei);const $t={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer($t),n.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new bi(d.textureWidth,d.textureHeight,{format:hi,type:Je,depthTexture:new Ss(d.textureWidth,d.textureHeight,zt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Mt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,e,Mt),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new bi(f.framebufferWidth,f.framebufferHeight,{format:hi,type:Je,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await n.requestReferenceSpace(a),ie.setContext(n),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function V(j){for(let tt=0;tt<j.removed.length;tt++){const Mt=j.removed[tt],zt=T.indexOf(Mt);zt>=0&&(T[zt]=null,E[zt].disconnect(Mt))}for(let tt=0;tt<j.added.length;tt++){const Mt=j.added[tt];let zt=T.indexOf(Mt);if(zt===-1){for(let $t=0;$t<E.length;$t++)if($t>=T.length){T.push(Mt),zt=$t;break}else if(T[$t]===null){T[$t]=Mt,zt=$t;break}if(zt===-1)break}const bt=E[zt];bt&&bt.connect(Mt)}}const X=new N,J=new N;function nt(j,tt,Mt){X.setFromMatrixPosition(tt.matrixWorld),J.setFromMatrixPosition(Mt.matrixWorld);const zt=X.distanceTo(J),bt=tt.projectionMatrix.elements,$t=Mt.projectionMatrix.elements,Ie=bt[14]/(bt[10]-1),Zt=bt[14]/(bt[10]+1),ne=(bt[9]+1)/bt[5],le=(bt[9]-1)/bt[5],Vt=(bt[8]-1)/bt[0],Se=($t[8]+1)/$t[0],F=Ie*Vt,be=Ie*Se,ee=zt/(-Vt+Se),ue=ee*-Vt;if(tt.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ue),j.translateZ(ee),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),bt[10]===-1)j.projectionMatrix.copy(tt.projectionMatrix),j.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Tt=Ie+ee,R=Zt+ee,w=F-ue,k=be+(zt-ue),K=ne*Zt/R*Tt,Q=le*Zt/R*Tt;j.projectionMatrix.makePerspective(w,k,K,Q,Tt,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ot(j,tt){tt===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(tt.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(n===null)return;let tt=j.near,Mt=j.far;p.texture!==null&&(p.depthNear>0&&(tt=p.depthNear),p.depthFar>0&&(Mt=p.depthFar)),U.near=S.near=M.near=tt,U.far=S.far=M.far=Mt,(I!==U.near||O!==U.far)&&(n.updateRenderState({depthNear:U.near,depthFar:U.far}),I=U.near,O=U.far),U.layers.mask=j.layers.mask|6,M.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;const zt=j.parent,bt=U.cameras;ot(U,zt);for(let $t=0;$t<bt.length;$t++)ot(bt[$t],zt);bt.length===2?nt(U,M,S):U.projectionMatrix.copy(M.projectionMatrix),at(j,U,zt)};function at(j,tt,Mt){Mt===null?j.matrix.copy(tt.matrixWorld):(j.matrix.copy(Mt.matrixWorld),j.matrix.invert(),j.matrix.multiply(tt.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(tt.projectionMatrix),j.projectionMatrixInverse.copy(tt.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ca*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(j){return g[j]};let Ft=null;function ae(j,tt){if(h=tt.getViewerPose(l||r),m=tt,h!==null){const Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let zt=!1;Mt.length!==U.cameras.length&&(U.cameras.length=0,zt=!0);for(let Zt=0;Zt<Mt.length;Zt++){const ne=Mt[Zt];let le=null;if(f!==null)le=f.getViewport(ne);else{const Se=u.getViewSubImage(d,ne);le=Se.viewport,Zt===0&&(t.setRenderTargetTextures(_,Se.colorTexture,Se.depthStencilTexture),t.setRenderTarget(_))}let Vt=P[Zt];Vt===void 0&&(Vt=new si,Vt.layers.enable(Zt),Vt.viewport=new Me,P[Zt]=Vt),Vt.matrix.fromArray(ne.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(ne.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(le.x,le.y,le.width,le.height),Zt===0&&(U.matrix.copy(Vt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),zt===!0&&U.cameras.push(Vt)}const bt=n.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){u=i.getBinding();const Zt=u.getDepthInformation(Mt[0]);Zt&&Zt.isValid&&Zt.texture&&p.init(Zt,n.renderState)}if(bt&&bt.includes("camera-access")&&x){t.state.unbindTexture(),u=i.getBinding();for(let Zt=0;Zt<Mt.length;Zt++){const ne=Mt[Zt].camera;if(ne){let le=g[ne];le||(le=new Vl,g[ne]=le);const Vt=u.getCameraImage(ne);le.sourceTexture=Vt}}}}for(let Mt=0;Mt<E.length;Mt++){const zt=T[Mt],bt=E[Mt];zt!==null&&bt!==void 0&&bt.update(zt,tt,l||r)}Ft&&Ft(j,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),m=null}const ie=new Jl;ie.setAnimationLoop(ae),this.setAnimationLoop=function(j){Ft=j},this.dispose=function(){}}}const dn=new fi,lg=new ge;function hg(o,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,Bl(o)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function n(p,g,v,y,_){g.isMeshBasicMaterial||g.isMeshLambertMaterial?s(p,g):g.isMeshToonMaterial?(s(p,g),u(p,g)):g.isMeshPhongMaterial?(s(p,g),h(p,g)):g.isMeshStandardMaterial?(s(p,g),d(p,g),g.isMeshPhysicalMaterial&&f(p,g,_)):g.isMeshMatcapMaterial?(s(p,g),m(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),x(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(r(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?c(p,g,v,y):g.isSpriteMaterial?l(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Xe&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Xe&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const v=t.get(g),y=v.envMap,_=v.envMapRotation;y&&(p.envMap.value=y,dn.copy(_),dn.x*=-1,dn.y*=-1,dn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(dn.y*=-1,dn.z*=-1),p.envMapRotation.value.setFromMatrix4(lg.makeRotationFromEuler(dn)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function r(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function c(p,g,v,y){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=y*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function l(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,v){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Xe&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function x(p,g){const v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function ug(o,t,e,i){let n={},s={},r=[];const a=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const _=y.program;i.uniformBlockBinding(v,_)}function l(v,y){let _=n[v.id];_===void 0&&(m(v),_=h(v),n[v.id]=_,v.addEventListener("dispose",p));const E=y.program;i.updateUBOMapping(v,E);const T=t.render.frame;s[v.id]!==T&&(d(v),s[v.id]=T)}function h(v){const y=u();v.__bindingPointIndex=y;const _=o.createBuffer(),E=v.__size,T=v.usage;return o.bindBuffer(o.UNIFORM_BUFFER,_),o.bufferData(o.UNIFORM_BUFFER,E,T),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,y,_),_}function u(){for(let v=0;v<a;v++)if(r.indexOf(v)===-1)return r.push(v),v;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=n[v.id],_=v.uniforms,E=v.__cache;o.bindBuffer(o.UNIFORM_BUFFER,y);for(let T=0,C=_.length;T<C;T++){const L=Array.isArray(_[T])?_[T]:[_[T]];for(let M=0,S=L.length;M<S;M++){const P=L[M];if(f(P,T,M,E)===!0){const U=P.__offset,I=Array.isArray(P.value)?P.value:[P.value];let O=0;for(let B=0;B<I.length;B++){const D=I[B],V=x(D);typeof D=="number"||typeof D=="boolean"?(P.__data[0]=D,o.bufferSubData(o.UNIFORM_BUFFER,U+O,P.__data)):D.isMatrix3?(P.__data[0]=D.elements[0],P.__data[1]=D.elements[1],P.__data[2]=D.elements[2],P.__data[3]=0,P.__data[4]=D.elements[3],P.__data[5]=D.elements[4],P.__data[6]=D.elements[5],P.__data[7]=0,P.__data[8]=D.elements[6],P.__data[9]=D.elements[7],P.__data[10]=D.elements[8],P.__data[11]=0):(D.toArray(P.__data,O),O+=V.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,U,P.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function f(v,y,_,E){const T=v.value,C=y+"_"+_;if(E[C]===void 0)return typeof T=="number"||typeof T=="boolean"?E[C]=T:E[C]=T.clone(),!0;{const L=E[C];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return E[C]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function m(v){const y=v.uniforms;let _=0;const E=16;for(let C=0,L=y.length;C<L;C++){const M=Array.isArray(y[C])?y[C]:[y[C]];for(let S=0,P=M.length;S<P;S++){const U=M[S],I=Array.isArray(U.value)?U.value:[U.value];for(let O=0,B=I.length;O<B;O++){const D=I[O],V=x(D),X=_%E,J=X%V.boundary,nt=X+J;_+=J,nt!==0&&E-nt<V.storage&&(_+=E-nt),U.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=_,_+=V.storage}}}const T=_%E;return T>0&&(_+=E-T),v.__size=_,v.__cache={},this}function x(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ut("WebGLRenderer: Unsupported uniform value type.",v),y}function p(v){const y=v.target;y.removeEventListener("dispose",p);const _=r.indexOf(y.__bindingPointIndex);r.splice(_,1),o.deleteBuffer(n[y.id]),delete n[y.id],delete s[y.id]}function g(){for(const v in n)o.deleteBuffer(n[v]);r=[],n={},s={}}return{bind:c,update:l,dispose:g}}const dg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let gi=null;function fg(){return gi===null&&(gi=new Eu(dg,16,16,Wn,Vi),gi.name="DFG_LUT",gi.minFilter=Oe,gi.magFilter=Oe,gi.wrapS=Oi,gi.wrapT=Oi,gi.generateMipmaps=!1,gi.needsUpdate=!0),gi}class pg{constructor(t={}){const{canvas:e=Jh(),context:i=null,depth:n=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Je}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=r;const x=f,p=new Set([ya,_a,va]),g=new Set([Je,Ei,ys,Ms,ga,xa]),v=new Uint32Array(4),y=new Int32Array(4);let _=null,E=null;const T=[],C=[];let L=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let S=!1;this._outputColorSpace=ni;let P=0,U=0,I=null,O=-1,B=null;const D=new Me,V=new Me;let X=null;const J=new Ot(0);let nt=0,ot=e.width,at=e.height,Ft=1,ae=null,ie=null;const j=new Me(0,0,ot,at),tt=new Me(0,0,ot,at);let Mt=!1;const zt=new Ea;let bt=!1,$t=!1;const Ie=new ge,Zt=new N,ne=new Me,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Vt=!1;function Se(){return I===null?Ft:1}let F=i;function be(A,G){return e.getContext(A,G)}try{const A={alpha:!0,depth:n,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${pa}`),e.addEventListener("webglcontextlost",Bt,!1),e.addEventListener("webglcontextrestored",de,!1),e.addEventListener("webglcontextcreationerror",se,!1),F===null){const G="webgl2";if(F=be(G,A),F===null)throw be(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw Qt("WebGLRenderer: "+A.message),A}let ee,ue,Tt,R,w,k,K,Q,Z,Ct,lt,Et,Nt,it,ut,St,At,ht,Ht,z,mt,rt,gt,et;function $(){ee=new fm(F),ee.init(),rt=new sg(F,ee),ue=new sm(F,ee,t,rt),Tt=new ig(F,ee),ue.reversedDepthBuffer&&d&&Tt.buffers.depth.setReversed(!0),R=new gm(F),w=new G0,k=new ng(F,ee,Tt,w,ue,rt,R),K=new om(M),Q=new dm(M),Z=new _d(F),gt=new im(F,Z),Ct=new pm(F,Z,R,gt),lt=new vm(F,Ct,Z,R),Ht=new xm(F,ue,k),St=new rm(w),Et=new k0(M,K,Q,ee,ue,gt,St),Nt=new hg(M,w),it=new H0,ut=new K0(ee),ht=new em(M,K,Q,Tt,lt,m,c),At=new tg(M,lt,ue),et=new ug(F,R,ue,Tt),z=new nm(F,ee,R),mt=new mm(F,ee,R),R.programs=Et.programs,M.capabilities=ue,M.extensions=ee,M.properties=w,M.renderLists=it,M.shadowMap=At,M.state=Tt,M.info=R}$(),x!==Je&&(L=new ym(x,e.width,e.height,n,s));const ct=new cg(M,F);this.xr=ct,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=ee.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ee.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Ft},this.setPixelRatio=function(A){A!==void 0&&(Ft=A,this.setSize(ot,at,!1))},this.getSize=function(A){return A.set(ot,at)},this.setSize=function(A,G,Y=!0){if(ct.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}ot=A,at=G,e.width=Math.floor(A*Ft),e.height=Math.floor(G*Ft),Y===!0&&(e.style.width=A+"px",e.style.height=G+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(ot*Ft,at*Ft).floor()},this.setDrawingBufferSize=function(A,G,Y){ot=A,at=G,Ft=Y,e.width=Math.floor(A*Y),e.height=Math.floor(G*Y),this.setViewport(0,0,A,G)},this.setEffects=function(A){if(x===Je){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let G=0;G<A.length;G++)if(A[G].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(D)},this.getViewport=function(A){return A.copy(j)},this.setViewport=function(A,G,Y,W){A.isVector4?j.set(A.x,A.y,A.z,A.w):j.set(A,G,Y,W),Tt.viewport(D.copy(j).multiplyScalar(Ft).round())},this.getScissor=function(A){return A.copy(tt)},this.setScissor=function(A,G,Y,W){A.isVector4?tt.set(A.x,A.y,A.z,A.w):tt.set(A,G,Y,W),Tt.scissor(V.copy(tt).multiplyScalar(Ft).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(A){Tt.setScissorTest(Mt=A)},this.setOpaqueSort=function(A){ae=A},this.setTransparentSort=function(A){ie=A},this.getClearColor=function(A){return A.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,Y=!0){let W=0;if(A){let H=!1;if(I!==null){const dt=I.texture.format;H=p.has(dt)}if(H){const dt=I.texture.type,vt=g.has(dt),pt=ht.getClearColor(),wt=ht.getClearAlpha(),Rt=pt.r,Dt=pt.g,Pt=pt.b;vt?(v[0]=Rt,v[1]=Dt,v[2]=Pt,v[3]=wt,F.clearBufferuiv(F.COLOR,0,v)):(y[0]=Rt,y[1]=Dt,y[2]=Pt,y[3]=wt,F.clearBufferiv(F.COLOR,0,y))}else W|=F.COLOR_BUFFER_BIT}G&&(W|=F.DEPTH_BUFFER_BIT),Y&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Bt,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",se,!1),ht.dispose(),it.dispose(),ut.dispose(),w.dispose(),K.dispose(),Q.dispose(),lt.dispose(),gt.dispose(),et.dispose(),Et.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Fa),ct.removeEventListener("sessionend",Ua),rn.stop()};function Bt(A){A.preventDefault(),ja("WebGLRenderer: Context Lost."),S=!0}function de(){ja("WebGLRenderer: Context Restored."),S=!1;const A=R.autoReset,G=At.enabled,Y=At.autoUpdate,W=At.needsUpdate,H=At.type;$(),R.autoReset=A,At.enabled=G,At.autoUpdate=Y,At.needsUpdate=W,At.type=H}function se(A){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function mi(A){const G=A.target;G.removeEventListener("dispose",mi),Ci(G)}function Ci(A){dh(A),w.remove(A)}function dh(A){const G=w.get(A).programs;G!==void 0&&(G.forEach(function(Y){Et.releaseProgram(Y)}),A.isShaderMaterial&&Et.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,Y,W,H,dt){G===null&&(G=le);const vt=H.isMesh&&H.matrixWorld.determinant()<0,pt=ph(A,G,Y,W,H);Tt.setMaterial(W,vt);let wt=Y.index,Rt=1;if(W.wireframe===!0){if(wt=Ct.getWireframeAttribute(Y),wt===void 0)return;Rt=2}const Dt=Y.drawRange,Pt=Y.attributes.position;let Wt=Dt.start*Rt,ce=(Dt.start+Dt.count)*Rt;dt!==null&&(Wt=Math.max(Wt,dt.start*Rt),ce=Math.min(ce,(dt.start+dt.count)*Rt)),wt!==null?(Wt=Math.max(Wt,0),ce=Math.min(ce,wt.count)):Pt!=null&&(Wt=Math.max(Wt,0),ce=Math.min(ce,Pt.count));const _e=ce-Wt;if(_e<0||_e===1/0)return;gt.setup(H,W,pt,Y,wt);let ye,he=z;if(wt!==null&&(ye=Z.get(wt),he=mt,he.setIndex(ye)),H.isMesh)W.wireframe===!0?(Tt.setLineWidth(W.wireframeLinewidth*Se()),he.setMode(F.LINES)):he.setMode(F.TRIANGLES);else if(H.isLine){let It=W.linewidth;It===void 0&&(It=1),Tt.setLineWidth(It*Se()),H.isLineSegments?he.setMode(F.LINES):H.isLineLoop?he.setMode(F.LINE_LOOP):he.setMode(F.LINE_STRIP)}else H.isPoints?he.setMode(F.POINTS):H.isSprite&&he.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ws("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),he.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))he.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const It=H._multiDrawStarts,re=H._multiDrawCounts,Jt=H._multiDrawCount,Ze=wt?Z.get(wt).bytesPerElement:1,wn=w.get(W).currentProgram.getUniforms();for(let Ke=0;Ke<Jt;Ke++)wn.setValue(F,"_gl_DrawID",Ke),he.render(It[Ke]/Ze,re[Ke])}else if(H.isInstancedMesh)he.renderInstances(Wt,_e,H.count);else if(Y.isInstancedBufferGeometry){const It=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,re=Math.min(Y.instanceCount,It);he.renderInstances(Wt,_e,re)}else he.render(Wt,_e)};function Na(A,G,Y){A.transparent===!0&&A.side===Yt&&A.forceSinglePass===!1?(A.side=Xe,A.needsUpdate=!0,Ls(A,G,Y),A.side=tn,A.needsUpdate=!0,Ls(A,G,Y),A.side=Yt):Ls(A,G,Y)}this.compile=function(A,G,Y=null){Y===null&&(Y=A),E=ut.get(Y),E.init(G),C.push(E),Y.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),A!==Y&&A.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights();const W=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const dt=H.material;if(dt)if(Array.isArray(dt))for(let vt=0;vt<dt.length;vt++){const pt=dt[vt];Na(pt,Y,H),W.add(pt)}else Na(dt,Y,H),W.add(dt)}),E=C.pop(),W},this.compileAsync=function(A,G,Y=null){const W=this.compile(A,G,Y);return new Promise(H=>{function dt(){if(W.forEach(function(vt){w.get(vt).currentProgram.isReady()&&W.delete(vt)}),W.size===0){H(A);return}setTimeout(dt,10)}ee.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Tr=null;function fh(A){Tr&&Tr(A)}function Fa(){rn.stop()}function Ua(){rn.start()}const rn=new Jl;rn.setAnimationLoop(fh),typeof self<"u"&&rn.setContext(self),this.setAnimationLoop=function(A){Tr=A,ct.setAnimationLoop(A),A===null?rn.stop():rn.start()},ct.addEventListener("sessionstart",Fa),ct.addEventListener("sessionend",Ua),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;const Y=ct.enabled===!0&&ct.isPresenting===!0,W=L!==null&&(I===null||Y)&&L.begin(M,I);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(G),G=ct.getCamera()),A.isScene===!0&&A.onBeforeRender(M,A,G,I),E=ut.get(A,C.length),E.init(G),C.push(E),Ie.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),zt.setFromProjectionMatrix(Ie,wi,G.reversedDepth),$t=this.localClippingEnabled,bt=St.init(this.clippingPlanes,$t),_=it.get(A,T.length),_.init(),T.push(_),ct.enabled===!0&&ct.isPresenting===!0){const vt=M.xr.getDepthSensingMesh();vt!==null&&Ar(vt,G,-1/0,M.sortObjects)}Ar(A,G,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(ae,ie),Vt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Vt&&ht.addToRenderList(_,A),this.info.render.frame++,bt===!0&&St.beginShadows();const H=E.state.shadowsArray;if(At.render(H,A,G),bt===!0&&St.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&L.hasRenderPass())===!1){const vt=_.opaque,pt=_.transmissive;if(E.setupLights(),G.isArrayCamera){const wt=G.cameras;if(pt.length>0)for(let Rt=0,Dt=wt.length;Rt<Dt;Rt++){const Pt=wt[Rt];Oa(vt,pt,A,Pt)}Vt&&ht.render(A);for(let Rt=0,Dt=wt.length;Rt<Dt;Rt++){const Pt=wt[Rt];Ba(_,A,Pt,Pt.viewport)}}else pt.length>0&&Oa(vt,pt,A,G),Vt&&ht.render(A),Ba(_,A,G)}I!==null&&U===0&&(k.updateMultisampleRenderTarget(I),k.updateRenderTargetMipmap(I)),W&&L.end(M),A.isScene===!0&&A.onAfterRender(M,A,G),gt.resetDefaultState(),O=-1,B=null,C.pop(),C.length>0?(E=C[C.length-1],bt===!0&&St.setGlobalState(M.clippingPlanes,E.state.camera)):E=null,T.pop(),T.length>0?_=T[T.length-1]:_=null};function Ar(A,G,Y,W){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)Y=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)E.pushLight(A),A.castShadow&&E.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||zt.intersectsSprite(A)){W&&ne.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ie);const vt=lt.update(A),pt=A.material;pt.visible&&_.push(A,vt,pt,Y,ne.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||zt.intersectsObject(A))){const vt=lt.update(A),pt=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ne.copy(A.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),ne.copy(vt.boundingSphere.center)),ne.applyMatrix4(A.matrixWorld).applyMatrix4(Ie)),Array.isArray(pt)){const wt=vt.groups;for(let Rt=0,Dt=wt.length;Rt<Dt;Rt++){const Pt=wt[Rt],Wt=pt[Pt.materialIndex];Wt&&Wt.visible&&_.push(A,vt,Wt,Y,ne.z,Pt)}}else pt.visible&&_.push(A,vt,pt,Y,ne.z,null)}}const dt=A.children;for(let vt=0,pt=dt.length;vt<pt;vt++)Ar(dt[vt],G,Y,W)}function Ba(A,G,Y,W){const{opaque:H,transmissive:dt,transparent:vt}=A;E.setupLightsView(Y),bt===!0&&St.setGlobalState(M.clippingPlanes,Y),W&&Tt.viewport(D.copy(W)),H.length>0&&Is(H,G,Y),dt.length>0&&Is(dt,G,Y),vt.length>0&&Is(vt,G,Y),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Oa(A,G,Y,W){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[W.id]===void 0){const Wt=ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[W.id]=new bi(1,1,{generateMipmaps:!0,type:Wt?Vi:Je,minFilter:vn,samples:ue.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const dt=E.state.transmissionRenderTarget[W.id],vt=W.viewport||D;dt.setSize(vt.z*M.transmissionResolutionScale,vt.w*M.transmissionResolutionScale);const pt=M.getRenderTarget(),wt=M.getActiveCubeFace(),Rt=M.getActiveMipmapLevel();M.setRenderTarget(dt),M.getClearColor(J),nt=M.getClearAlpha(),nt<1&&M.setClearColor(16777215,.5),M.clear(),Vt&&ht.render(Y);const Dt=M.toneMapping;M.toneMapping=Si;const Pt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),E.setupLightsView(W),bt===!0&&St.setGlobalState(M.clippingPlanes,W),Is(A,Y,W),k.updateMultisampleRenderTarget(dt),k.updateRenderTargetMipmap(dt),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let ce=0,_e=G.length;ce<_e;ce++){const ye=G[ce],{object:he,geometry:It,material:re,group:Jt}=ye;if(re.side===Yt&&he.layers.test(W.layers)){const Ze=re.side;re.side=Xe,re.needsUpdate=!0,za(he,Y,W,It,re,Jt),re.side=Ze,re.needsUpdate=!0,Wt=!0}}Wt===!0&&(k.updateMultisampleRenderTarget(dt),k.updateRenderTargetMipmap(dt))}M.setRenderTarget(pt,wt,Rt),M.setClearColor(J,nt),Pt!==void 0&&(W.viewport=Pt),M.toneMapping=Dt}function Is(A,G,Y){const W=G.isScene===!0?G.overrideMaterial:null;for(let H=0,dt=A.length;H<dt;H++){const vt=A[H],{object:pt,geometry:wt,group:Rt}=vt;let Dt=vt.material;Dt.allowOverride===!0&&W!==null&&(Dt=W),pt.layers.test(Y.layers)&&za(pt,G,Y,wt,Dt,Rt)}}function za(A,G,Y,W,H,dt){A.onBeforeRender(M,G,Y,W,H,dt),A.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(M,G,Y,W,A,dt),H.transparent===!0&&H.side===Yt&&H.forceSinglePass===!1?(H.side=Xe,H.needsUpdate=!0,M.renderBufferDirect(Y,G,W,H,A,dt),H.side=tn,H.needsUpdate=!0,M.renderBufferDirect(Y,G,W,H,A,dt),H.side=Yt):M.renderBufferDirect(Y,G,W,H,A,dt),A.onAfterRender(M,G,Y,W,H,dt)}function Ls(A,G,Y){G.isScene!==!0&&(G=le);const W=w.get(A),H=E.state.lights,dt=E.state.shadowsArray,vt=H.state.version,pt=Et.getParameters(A,H.state,dt,G,Y),wt=Et.getProgramCacheKey(pt);let Rt=W.programs;W.environment=A.isMeshStandardMaterial?G.environment:null,W.fog=G.fog,W.envMap=(A.isMeshStandardMaterial?Q:K).get(A.envMap||W.environment),W.envMapRotation=W.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Rt===void 0&&(A.addEventListener("dispose",mi),Rt=new Map,W.programs=Rt);let Dt=Rt.get(wt);if(Dt!==void 0){if(W.currentProgram===Dt&&W.lightsStateVersion===vt)return Ga(A,pt),Dt}else pt.uniforms=Et.getUniforms(A),A.onBeforeCompile(pt,M),Dt=Et.acquireProgram(pt,wt),Rt.set(wt,Dt),W.uniforms=pt.uniforms;const Pt=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Pt.clippingPlanes=St.uniform),Ga(A,pt),W.needsLights=gh(A),W.lightsStateVersion=vt,W.needsLights&&(Pt.ambientLightColor.value=H.state.ambient,Pt.lightProbe.value=H.state.probe,Pt.directionalLights.value=H.state.directional,Pt.directionalLightShadows.value=H.state.directionalShadow,Pt.spotLights.value=H.state.spot,Pt.spotLightShadows.value=H.state.spotShadow,Pt.rectAreaLights.value=H.state.rectArea,Pt.ltc_1.value=H.state.rectAreaLTC1,Pt.ltc_2.value=H.state.rectAreaLTC2,Pt.pointLights.value=H.state.point,Pt.pointLightShadows.value=H.state.pointShadow,Pt.hemisphereLights.value=H.state.hemi,Pt.directionalShadowMap.value=H.state.directionalShadowMap,Pt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Pt.spotShadowMap.value=H.state.spotShadowMap,Pt.spotLightMatrix.value=H.state.spotLightMatrix,Pt.spotLightMap.value=H.state.spotLightMap,Pt.pointShadowMap.value=H.state.pointShadowMap,Pt.pointShadowMatrix.value=H.state.pointShadowMatrix),W.currentProgram=Dt,W.uniformsList=null,Dt}function ka(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=pr.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function Ga(A,G){const Y=w.get(A);Y.outputColorSpace=G.outputColorSpace,Y.batching=G.batching,Y.batchingColor=G.batchingColor,Y.instancing=G.instancing,Y.instancingColor=G.instancingColor,Y.instancingMorph=G.instancingMorph,Y.skinning=G.skinning,Y.morphTargets=G.morphTargets,Y.morphNormals=G.morphNormals,Y.morphColors=G.morphColors,Y.morphTargetsCount=G.morphTargetsCount,Y.numClippingPlanes=G.numClippingPlanes,Y.numIntersection=G.numClipIntersection,Y.vertexAlphas=G.vertexAlphas,Y.vertexTangents=G.vertexTangents,Y.toneMapping=G.toneMapping}function ph(A,G,Y,W,H){G.isScene!==!0&&(G=le),k.resetTextureUnits();const dt=G.fog,vt=W.isMeshStandardMaterial?G.environment:null,pt=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:qn,wt=(W.isMeshStandardMaterial?Q:K).get(W.envMap||vt),Rt=W.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Dt=!!Y.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pt=!!Y.morphAttributes.position,Wt=!!Y.morphAttributes.normal,ce=!!Y.morphAttributes.color;let _e=Si;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(_e=M.toneMapping);const ye=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,he=ye!==void 0?ye.length:0,It=w.get(W),re=E.state.lights;if(bt===!0&&($t===!0||A!==B)){const ke=A===B&&W.id===O;St.setState(W,A,ke)}let Jt=!1;W.version===It.__version?(It.needsLights&&It.lightsStateVersion!==re.state.version||It.outputColorSpace!==pt||H.isBatchedMesh&&It.batching===!1||!H.isBatchedMesh&&It.batching===!0||H.isBatchedMesh&&It.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&It.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&It.instancing===!1||!H.isInstancedMesh&&It.instancing===!0||H.isSkinnedMesh&&It.skinning===!1||!H.isSkinnedMesh&&It.skinning===!0||H.isInstancedMesh&&It.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&It.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&It.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&It.instancingMorph===!1&&H.morphTexture!==null||It.envMap!==wt||W.fog===!0&&It.fog!==dt||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==St.numPlanes||It.numIntersection!==St.numIntersection)||It.vertexAlphas!==Rt||It.vertexTangents!==Dt||It.morphTargets!==Pt||It.morphNormals!==Wt||It.morphColors!==ce||It.toneMapping!==_e||It.morphTargetsCount!==he)&&(Jt=!0):(Jt=!0,It.__version=W.version);let Ze=It.currentProgram;Jt===!0&&(Ze=Ls(W,G,H));let wn=!1,Ke=!1,is=!1;const fe=Ze.getUniforms(),Ve=It.uniforms;if(Tt.useProgram(Ze.program)&&(wn=!0,Ke=!0,is=!0),W.id!==O&&(O=W.id,Ke=!0),wn||B!==A){Tt.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),fe.setValue(F,"projectionMatrix",A.projectionMatrix),fe.setValue(F,"viewMatrix",A.matrixWorldInverse);const He=fe.map.cameraPosition;He!==void 0&&He.setValue(F,Zt.setFromMatrixPosition(A.matrixWorld)),ue.logarithmicDepthBuffer&&fe.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&fe.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),B!==A&&(B=A,Ke=!0,is=!0)}if(It.needsLights&&(re.state.directionalShadowMap.length>0&&fe.setValue(F,"directionalShadowMap",re.state.directionalShadowMap,k),re.state.spotShadowMap.length>0&&fe.setValue(F,"spotShadowMap",re.state.spotShadowMap,k),re.state.pointShadowMap.length>0&&fe.setValue(F,"pointShadowMap",re.state.pointShadowMap,k)),H.isSkinnedMesh){fe.setOptional(F,H,"bindMatrix"),fe.setOptional(F,H,"bindMatrixInverse");const ke=H.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),fe.setValue(F,"boneTexture",ke.boneTexture,k))}H.isBatchedMesh&&(fe.setOptional(F,H,"batchingTexture"),fe.setValue(F,"batchingTexture",H._matricesTexture,k),fe.setOptional(F,H,"batchingIdTexture"),fe.setValue(F,"batchingIdTexture",H._indirectTexture,k),fe.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&fe.setValue(F,"batchingColorTexture",H._colorsTexture,k));const ei=Y.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&Ht.update(H,Y,Ze),(Ke||It.receiveShadow!==H.receiveShadow)&&(It.receiveShadow=H.receiveShadow,fe.setValue(F,"receiveShadow",H.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ve.envMap.value=wt,Ve.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&G.environment!==null&&(Ve.envMapIntensity.value=G.environmentIntensity),Ve.dfgLUT!==void 0&&(Ve.dfgLUT.value=fg()),Ke&&(fe.setValue(F,"toneMappingExposure",M.toneMappingExposure),It.needsLights&&mh(Ve,is),dt&&W.fog===!0&&Nt.refreshFogUniforms(Ve,dt),Nt.refreshMaterialUniforms(Ve,W,Ft,at,E.state.transmissionRenderTarget[A.id]),pr.upload(F,ka(It),Ve,k)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(pr.upload(F,ka(It),Ve,k),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&fe.setValue(F,"center",H.center),fe.setValue(F,"modelViewMatrix",H.modelViewMatrix),fe.setValue(F,"normalMatrix",H.normalMatrix),fe.setValue(F,"modelMatrix",H.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const ke=W.uniformsGroups;for(let He=0,Cr=ke.length;He<Cr;He++){const on=ke[He];et.update(on,Ze),et.bind(on,Ze)}}return Ze}function mh(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function gh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,G,Y){const W=w.get(A);W.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),w.get(A.texture).__webglTexture=G,w.get(A.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Y,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){const Y=w.get(A);Y.__webglFramebuffer=G,Y.__useDefaultFramebuffer=G===void 0};const xh=F.createFramebuffer();this.setRenderTarget=function(A,G=0,Y=0){I=A,P=G,U=Y;let W=null,H=!1,dt=!1;if(A){const pt=w.get(A);if(pt.__useDefaultFramebuffer!==void 0){Tt.bindFramebuffer(F.FRAMEBUFFER,pt.__webglFramebuffer),D.copy(A.viewport),V.copy(A.scissor),X=A.scissorTest,Tt.viewport(D),Tt.scissor(V),Tt.setScissorTest(X),O=-1;return}else if(pt.__webglFramebuffer===void 0)k.setupRenderTarget(A);else if(pt.__hasExternalTextures)k.rebindTextures(A,w.get(A.texture).__webglTexture,w.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Dt=A.depthTexture;if(pt.__boundDepthTexture!==Dt){if(Dt!==null&&w.has(Dt)&&(A.width!==Dt.image.width||A.height!==Dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(A)}}const wt=A.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(dt=!0);const Rt=w.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Rt[G])?W=Rt[G][Y]:W=Rt[G],H=!0):A.samples>0&&k.useMultisampledRTT(A)===!1?W=w.get(A).__webglMultisampledFramebuffer:Array.isArray(Rt)?W=Rt[Y]:W=Rt,D.copy(A.viewport),V.copy(A.scissor),X=A.scissorTest}else D.copy(j).multiplyScalar(Ft).floor(),V.copy(tt).multiplyScalar(Ft).floor(),X=Mt;if(Y!==0&&(W=xh),Tt.bindFramebuffer(F.FRAMEBUFFER,W)&&Tt.drawBuffers(A,W),Tt.viewport(D),Tt.scissor(V),Tt.setScissorTest(X),H){const pt=w.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+G,pt.__webglTexture,Y)}else if(dt){const pt=G;for(let wt=0;wt<A.textures.length;wt++){const Rt=w.get(A.textures[wt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+wt,Rt.__webglTexture,Y,pt)}}else if(A!==null&&Y!==0){const pt=w.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pt.__webglTexture,Y)}O=-1},this.readRenderTargetPixels=function(A,G,Y,W,H,dt,vt,pt=0){if(!(A&&A.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=w.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&vt!==void 0&&(wt=wt[vt]),wt){Tt.bindFramebuffer(F.FRAMEBUFFER,wt);try{const Rt=A.textures[pt],Dt=Rt.format,Pt=Rt.type;if(!ue.textureFormatReadable(Dt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ue.textureTypeReadable(Pt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-W&&Y>=0&&Y<=A.height-H&&(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+pt),F.readPixels(G,Y,W,H,rt.convert(Dt),rt.convert(Pt),dt))}finally{const Rt=I!==null?w.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(A,G,Y,W,H,dt,vt,pt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=w.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&vt!==void 0&&(wt=wt[vt]),wt)if(G>=0&&G<=A.width-W&&Y>=0&&Y<=A.height-H){Tt.bindFramebuffer(F.FRAMEBUFFER,wt);const Rt=A.textures[pt],Dt=Rt.format,Pt=Rt.type;if(!ue.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Wt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Wt),F.bufferData(F.PIXEL_PACK_BUFFER,dt.byteLength,F.STREAM_READ),A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+pt),F.readPixels(G,Y,W,H,rt.convert(Dt),rt.convert(Pt),0);const ce=I!==null?w.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,ce);const _e=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Qh(F,_e,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Wt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,dt),F.deleteBuffer(Wt),F.deleteSync(_e),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,Y=0){const W=Math.pow(2,-Y),H=Math.floor(A.image.width*W),dt=Math.floor(A.image.height*W),vt=G!==null?G.x:0,pt=G!==null?G.y:0;k.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,Y,0,0,vt,pt,H,dt),Tt.unbindTexture()};const vh=F.createFramebuffer(),_h=F.createFramebuffer();this.copyTextureToTexture=function(A,G,Y=null,W=null,H=0,dt=null){dt===null&&(H!==0?(ws("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),dt=H,H=0):dt=0);let vt,pt,wt,Rt,Dt,Pt,Wt,ce,_e;const ye=A.isCompressedTexture?A.mipmaps[dt]:A.image;if(Y!==null)vt=Y.max.x-Y.min.x,pt=Y.max.y-Y.min.y,wt=Y.isBox3?Y.max.z-Y.min.z:1,Rt=Y.min.x,Dt=Y.min.y,Pt=Y.isBox3?Y.min.z:0;else{const ei=Math.pow(2,-H);vt=Math.floor(ye.width*ei),pt=Math.floor(ye.height*ei),A.isDataArrayTexture?wt=ye.depth:A.isData3DTexture?wt=Math.floor(ye.depth*ei):wt=1,Rt=0,Dt=0,Pt=0}W!==null?(Wt=W.x,ce=W.y,_e=W.z):(Wt=0,ce=0,_e=0);const he=rt.convert(G.format),It=rt.convert(G.type);let re;G.isData3DTexture?(k.setTexture3D(G,0),re=F.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(k.setTexture2DArray(G,0),re=F.TEXTURE_2D_ARRAY):(k.setTexture2D(G,0),re=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,G.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,G.unpackAlignment);const Jt=F.getParameter(F.UNPACK_ROW_LENGTH),Ze=F.getParameter(F.UNPACK_IMAGE_HEIGHT),wn=F.getParameter(F.UNPACK_SKIP_PIXELS),Ke=F.getParameter(F.UNPACK_SKIP_ROWS),is=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ye.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ye.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Rt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Dt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Pt);const fe=A.isDataArrayTexture||A.isData3DTexture,Ve=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){const ei=w.get(A),ke=w.get(G),He=w.get(ei.__renderTarget),Cr=w.get(ke.__renderTarget);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,He.__webglFramebuffer),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Cr.__webglFramebuffer);for(let on=0;on<wt;on++)fe&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,w.get(A).__webglTexture,H,Pt+on),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,w.get(G).__webglTexture,dt,_e+on)),F.blitFramebuffer(Rt,Dt,vt,pt,Wt,ce,vt,pt,F.DEPTH_BUFFER_BIT,F.NEAREST);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||A.isRenderTargetTexture||w.has(A)){const ei=w.get(A),ke=w.get(G);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,vh),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,_h);for(let He=0;He<wt;He++)fe?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ei.__webglTexture,H,Pt+He):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ei.__webglTexture,H),Ve?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.__webglTexture,dt,_e+He):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ke.__webglTexture,dt),H!==0?F.blitFramebuffer(Rt,Dt,vt,pt,Wt,ce,vt,pt,F.COLOR_BUFFER_BIT,F.NEAREST):Ve?F.copyTexSubImage3D(re,dt,Wt,ce,_e+He,Rt,Dt,vt,pt):F.copyTexSubImage2D(re,dt,Wt,ce,Rt,Dt,vt,pt);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Ve?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(re,dt,Wt,ce,_e,vt,pt,wt,he,It,ye.data):G.isCompressedArrayTexture?F.compressedTexSubImage3D(re,dt,Wt,ce,_e,vt,pt,wt,he,ye.data):F.texSubImage3D(re,dt,Wt,ce,_e,vt,pt,wt,he,It,ye):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,dt,Wt,ce,vt,pt,he,It,ye.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,dt,Wt,ce,ye.width,ye.height,he,ye.data):F.texSubImage2D(F.TEXTURE_2D,dt,Wt,ce,vt,pt,he,It,ye);F.pixelStorei(F.UNPACK_ROW_LENGTH,Jt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ze),F.pixelStorei(F.UNPACK_SKIP_PIXELS,wn),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ke),F.pixelStorei(F.UNPACK_SKIP_IMAGES,is),dt===0&&G.generateMipmaps&&F.generateMipmap(re),Tt.unbindTexture()},this.initRenderTarget=function(A){w.get(A).__webglFramebuffer===void 0&&k.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?k.setTextureCube(A,0):A.isData3DTexture?k.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?k.setTexture2DArray(A,0):k.setTexture2D(A,0),Tt.unbindTexture()},this.resetState=function(){P=0,U=0,I=null,Tt.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class ui{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new b);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new b);const i=this.elements,n=t.x,s=t.y,r=t.z;return e.x=i[0]*n+i[1]*s+i[2]*r,e.y=i[3]*n+i[4]*s+i[5]*r,e.z=i[6]*n+i[7]*s+i[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new ui);const i=this.elements,n=t.elements,s=e.elements,r=i[0],a=i[1],c=i[2],l=i[3],h=i[4],u=i[5],d=i[6],f=i[7],m=i[8],x=n[0],p=n[1],g=n[2],v=n[3],y=n[4],_=n[5],E=n[6],T=n[7],C=n[8];return s[0]=r*x+a*v+c*E,s[1]=r*p+a*y+c*T,s[2]=r*g+a*_+c*C,s[3]=l*x+h*v+u*E,s[4]=l*p+h*y+u*T,s[5]=l*g+h*_+u*C,s[6]=d*x+f*v+m*E,s[7]=d*p+f*y+m*T,s[8]=d*g+f*_+m*C,e}scale(t,e){e===void 0&&(e=new ui);const i=this.elements,n=e.elements;for(let s=0;s!==3;s++)n[3*s+0]=t.x*i[3*s+0],n[3*s+1]=t.y*i[3*s+1],n[3*s+2]=t.z*i[3*s+2];return e}solve(t,e){e===void 0&&(e=new b);const i=3,n=4,s=[];let r,a;for(r=0;r<i*n;r++)s.push(0);for(r=0;r<3;r++)for(a=0;a<3;a++)s[r+n*a]=this.elements[r+3*a];s[3]=t.x,s[7]=t.y,s[11]=t.z;let c=3;const l=c;let h;const u=4;let d;do{if(r=l-c,s[r+n*r]===0){for(a=r+1;a<l;a++)if(s[r+n*a]!==0){h=u;do d=u-h,s[d+n*r]+=s[d+n*a];while(--h);break}}if(s[r+n*r]!==0)for(a=r+1;a<l;a++){const f=s[r+n*a]/s[r+n*r];h=u;do d=u-h,s[d+n*a]=d<=r?0:s[d+n*a]-s[d+n*r]*f;while(--h)}}while(--c);if(e.z=s[2*n+3]/s[2*n+2],e.y=(s[1*n+3]-s[1*n+2]*e.z)/s[1*n+1],e.x=(s[0*n+3]-s[0*n+2]*e.z-s[0*n+1]*e.y)/s[0*n+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,i){if(i===void 0)return this.elements[e+3*t];this.elements[e+3*t]=i}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";for(let i=0;i<9;i++)t+=this.elements[i]+",";return t}reverse(t){t===void 0&&(t=new ui);const e=3,i=6,n=mg;let s,r;for(s=0;s<3;s++)for(r=0;r<3;r++)n[s+i*r]=this.elements[s+3*r];n[3]=1,n[9]=0,n[15]=0,n[4]=0,n[10]=1,n[16]=0,n[5]=0,n[11]=0,n[17]=1;let a=3;const c=a;let l;const h=i;let u;do{if(s=c-a,n[s+i*s]===0){for(r=s+1;r<c;r++)if(n[s+i*r]!==0){l=h;do u=h-l,n[u+i*s]+=n[u+i*r];while(--l);break}}if(n[s+i*s]!==0)for(r=s+1;r<c;r++){const d=n[s+i*r]/n[s+i*s];l=h;do u=h-l,n[u+i*r]=u<=s?0:n[u+i*r]-n[u+i*s]*d;while(--l)}}while(--a);s=2;do{r=s-1;do{const d=n[s+i*r]/n[s+i*s];l=i;do u=i-l,n[u+i*r]=n[u+i*r]-n[u+i*s]*d;while(--l)}while(r--)}while(--s);s=2;do{const d=1/n[s+i*s];l=i;do u=i-l,n[u+i*s]=n[u+i*s]*d;while(--l)}while(s--);s=2;do{r=2;do{if(u=n[e+r+i*s],isNaN(u)||u===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,r,u)}while(r--)}while(s--);return t}setRotationFromQuaternion(t){const e=t.x,i=t.y,n=t.z,s=t.w,r=e+e,a=i+i,c=n+n,l=e*r,h=e*a,u=e*c,d=i*a,f=i*c,m=n*c,x=s*r,p=s*a,g=s*c,v=this.elements;return v[0]=1-(d+m),v[1]=h-g,v[2]=u+p,v[3]=h+g,v[4]=1-(l+m),v[5]=f-x,v[6]=u-p,v[7]=f+x,v[8]=1-(l+d),this}transpose(t){t===void 0&&(t=new ui);const e=this.elements,i=t.elements;let n;return i[0]=e[0],i[4]=e[4],i[8]=e[8],n=e[1],i[1]=e[3],i[3]=n,n=e[2],i[2]=e[6],i[6]=n,n=e[5],i[5]=e[7],i[7]=n,t}}const mg=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class b{constructor(t,e,i){t===void 0&&(t=0),e===void 0&&(e=0),i===void 0&&(i=0),this.x=t,this.y=e,this.z=i}cross(t,e){e===void 0&&(e=new b);const i=t.x,n=t.y,s=t.z,r=this.x,a=this.y,c=this.z;return e.x=a*s-c*n,e.y=c*i-r*s,e.z=r*n-a*i,e}set(t,e,i){return this.x=t,this.y=e,this.z=i,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new b(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new b(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new ui([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,i=this.z,n=Math.sqrt(t*t+e*e+i*i);if(n>0){const s=1/n;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return n}unit(t){t===void 0&&(t=new b);const e=this.x,i=this.y,n=this.z;let s=Math.sqrt(e*e+i*i+n*n);return s>0?(s=1/s,t.x=e*s,t.y=i*s,t.z=n*s):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,i=this.z;return Math.sqrt(t*t+e*e+i*i)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,i=this.y,n=this.z,s=t.x,r=t.y,a=t.z;return Math.sqrt((s-e)*(s-e)+(r-i)*(r-i)+(a-n)*(a-n))}distanceSquared(t){const e=this.x,i=this.y,n=this.z,s=t.x,r=t.y,a=t.z;return(s-e)*(s-e)+(r-i)*(r-i)+(a-n)*(a-n)}scale(t,e){e===void 0&&(e=new b);const i=this.x,n=this.y,s=this.z;return e.x=t*i,e.y=t*n,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new b),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,i){return i===void 0&&(i=new b),i.x=this.x+t*e.x,i.y=this.y+t*e.y,i.z=this.z+t*e.z,i}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new b),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const i=this.length();if(i>0){const n=gg,s=1/i;n.set(this.x*s,this.y*s,this.z*s);const r=xg;Math.abs(n.x)<.9?(r.set(1,0,0),n.cross(r,t)):(r.set(0,1,0),n.cross(r,t)),n.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,i){const n=this.x,s=this.y,r=this.z;i.x=n+(t.x-n)*e,i.y=s+(t.y-s)*e,i.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(Yc),Yc.almostEquals(t,e)}clone(){return new b(this.x,this.y,this.z)}}b.ZERO=new b(0,0,0);b.UNIT_X=new b(1,0,0);b.UNIT_Y=new b(0,1,0);b.UNIT_Z=new b(0,0,1);const gg=new b,xg=new b,Yc=new b;class ti{constructor(t){t===void 0&&(t={}),this.lowerBound=new b,this.upperBound=new b,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,i,n){const s=this.lowerBound,r=this.upperBound,a=i;s.copy(t[0]),a&&a.vmult(s,s),r.copy(s);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,Zc),l=Zc),l.x>r.x&&(r.x=l.x),l.x<s.x&&(s.x=l.x),l.y>r.y&&(r.y=l.y),l.y<s.y&&(s.y=l.y),l.z>r.z&&(r.z=l.z),l.z<s.z&&(s.z=l.z)}return e&&(e.vadd(s,s),e.vadd(r,r)),n&&(s.x-=n,s.y-=n,s.z-=n,r.x+=n,r.y+=n,r.z+=n),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new ti().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,i=this.upperBound,n=t.lowerBound,s=t.upperBound,r=n.x<=i.x&&i.x<=s.x||e.x<=s.x&&s.x<=i.x,a=n.y<=i.y&&i.y<=s.y||e.y<=s.y&&s.y<=i.y,c=n.z<=i.z&&i.z<=s.z||e.z<=s.z&&s.z<=i.z;return r&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,i=this.upperBound,n=t.lowerBound,s=t.upperBound;return e.x<=n.x&&i.x>=s.x&&e.y<=n.y&&i.y>=s.y&&e.z<=n.z&&i.z>=s.z}getCorners(t,e,i,n,s,r,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),i.set(h.x,h.y,l.z),n.set(l.x,h.y,h.z),s.set(h.x,l.y,h.z),r.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const i=Kc,n=i[0],s=i[1],r=i[2],a=i[3],c=i[4],l=i[5],h=i[6],u=i[7];this.getCorners(n,s,r,a,c,l,h,u);for(let d=0;d!==8;d++){const f=i[d];t.pointToLocal(f,f)}return e.setFromPoints(i)}toWorldFrame(t,e){const i=Kc,n=i[0],s=i[1],r=i[2],a=i[3],c=i[4],l=i[5],h=i[6],u=i[7];this.getCorners(n,s,r,a,c,l,h,u);for(let d=0;d!==8;d++){const f=i[d];t.pointToWorld(f,f)}return e.setFromPoints(i)}overlapsRay(t){const{direction:e,from:i}=t,n=1/e.x,s=1/e.y,r=1/e.z,a=(this.lowerBound.x-i.x)*n,c=(this.upperBound.x-i.x)*n,l=(this.lowerBound.y-i.y)*s,h=(this.upperBound.y-i.y)*s,u=(this.lowerBound.z-i.z)*r,d=(this.upperBound.z-i.z)*r,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(u,d)),m=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(u,d));return!(m<0||f>m)}}const Zc=new b,Kc=[new b,new b,new b,new b,new b,new b,new b,new b];class jc{constructor(){this.matrix=[]}get(t,e){let{index:i}=t,{index:n}=e;if(n>i){const s=n;n=i,i=s}return this.matrix[(i*(i+1)>>1)+n-1]}set(t,e,i){let{index:n}=t,{index:s}=e;if(s>n){const r=s;s=n,n=r}this.matrix[(n*(n+1)>>1)+s-1]=i?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class nh{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;return i[t]===void 0&&(i[t]=[]),i[t].includes(e)||i[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return!!(i[t]!==void 0&&i[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const i=this._listeners;if(i[t]===void 0)return this;const n=i[t].indexOf(e);return n!==-1&&i[t].splice(n,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const i=this._listeners[t.type];if(i!==void 0){t.target=this;for(let n=0,s=i.length;n<s;n++)i[n].call(this,t)}return this}}class we{constructor(t,e,i,n){t===void 0&&(t=0),e===void 0&&(e=0),i===void 0&&(i=0),n===void 0&&(n=1),this.x=t,this.y=e,this.z=i,this.w=n}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const i=Math.sin(e*.5);return this.x=t.x*i,this.y=t.y*i,this.z=t.z*i,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new b),this.normalize();const e=2*Math.acos(this.w),i=Math.sqrt(1-this.w*this.w);return i<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/i,t.y=this.y/i,t.z=this.z/i),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const i=vg,n=_g;t.tangents(i,n),this.setFromAxisAngle(i,Math.PI)}else{const i=t.cross(e);this.x=i.x,this.y=i.y,this.z=i.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new we);const i=this.x,n=this.y,s=this.z,r=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=i*h+r*a+n*l-s*c,e.y=n*h+r*c+s*a-i*l,e.z=s*h+r*l+i*c-n*a,e.w=r*h-i*a-n*c-s*l,e}inverse(t){t===void 0&&(t=new we);const e=this.x,i=this.y,n=this.z,s=this.w;this.conjugate(t);const r=1/(e*e+i*i+n*n+s*s);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new we),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new b);const i=t.x,n=t.y,s=t.z,r=this.x,a=this.y,c=this.z,l=this.w,h=l*i+a*s-c*n,u=l*n+c*i-r*s,d=l*s+r*n-a*i,f=-r*i-a*n-c*s;return e.x=h*l+f*-r+u*-c-d*-a,e.y=u*l+f*-a+d*-r-h*-c,e.z=d*l+f*-c+h*-a-u*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let i,n,s;const r=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=r*a+c*l;if(h>.499&&(i=2*Math.atan2(r,l),n=Math.PI/2,s=0),h<-.499&&(i=-2*Math.atan2(r,l),n=-Math.PI/2,s=0),i===void 0){const u=r*r,d=a*a,f=c*c;i=Math.atan2(2*a*l-2*r*c,1-2*d-2*f),n=Math.asin(2*h),s=Math.atan2(2*r*l-2*a*c,1-2*u-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=i,t.z=n,t.x=s}setFromEuler(t,e,i,n){n===void 0&&(n="XYZ");const s=Math.cos(t/2),r=Math.cos(e/2),a=Math.cos(i/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(i/2);return n==="XYZ"?(this.x=c*r*a+s*l*h,this.y=s*l*a-c*r*h,this.z=s*r*h+c*l*a,this.w=s*r*a-c*l*h):n==="YXZ"?(this.x=c*r*a+s*l*h,this.y=s*l*a-c*r*h,this.z=s*r*h-c*l*a,this.w=s*r*a+c*l*h):n==="ZXY"?(this.x=c*r*a-s*l*h,this.y=s*l*a+c*r*h,this.z=s*r*h+c*l*a,this.w=s*r*a-c*l*h):n==="ZYX"?(this.x=c*r*a-s*l*h,this.y=s*l*a+c*r*h,this.z=s*r*h-c*l*a,this.w=s*r*a+c*l*h):n==="YZX"?(this.x=c*r*a+s*l*h,this.y=s*l*a+c*r*h,this.z=s*r*h-c*l*a,this.w=s*r*a-c*l*h):n==="XZY"&&(this.x=c*r*a-s*l*h,this.y=s*l*a-c*r*h,this.z=s*r*h+c*l*a,this.w=s*r*a+c*l*h),this}clone(){return new we(this.x,this.y,this.z,this.w)}slerp(t,e,i){i===void 0&&(i=new we);const n=this.x,s=this.y,r=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,u=t.w,d,f,m,x,p;return f=n*c+s*l+r*h+a*u,f<0&&(f=-f,c=-c,l=-l,h=-h,u=-u),1-f>1e-6?(d=Math.acos(f),m=Math.sin(d),x=Math.sin((1-e)*d)/m,p=Math.sin(e*d)/m):(x=1-e,p=e),i.x=x*n+p*c,i.y=x*s+p*l,i.z=x*r+p*h,i.w=x*a+p*u,i}integrate(t,e,i,n){n===void 0&&(n=new we);const s=t.x*i.x,r=t.y*i.y,a=t.z*i.z,c=this.x,l=this.y,h=this.z,u=this.w,d=e*.5;return n.x+=d*(s*u+r*h-a*l),n.y+=d*(r*u+a*c-s*h),n.z+=d*(a*u+s*l-r*c),n.w+=d*(-s*c-r*l-a*h),n}}const vg=new b,_g=new b,yg={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class _t{constructor(t){t===void 0&&(t={}),this.id=_t.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,i,n){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}_t.idCounter=0;_t.types=yg;class te{constructor(t){t===void 0&&(t={}),this.position=new b,this.quaternion=new we,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return te.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return te.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new b),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,i,n){return n===void 0&&(n=new b),i.vsub(t,n),e.conjugate($c),$c.vmult(n,n),n}static pointToWorldFrame(t,e,i,n){return n===void 0&&(n=new b),e.vmult(i,n),n.vadd(t,n),n}static vectorToWorldFrame(t,e,i){return i===void 0&&(i=new b),t.vmult(e,i),i}static vectorToLocalFrame(t,e,i,n){return n===void 0&&(n=new b),e.w*=-1,e.vmult(i,n),e.w*=-1,n}}const $c=new we;class Gn extends _t{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:i=[],normals:n=[],axes:s,boundingSphereRadius:r}=t;super({type:_t.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=i,this.faceNormals=n,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,i=this.uniqueEdges;i.length=0;const n=new b;for(let s=0;s!==t.length;s++){const r=t[s],a=r.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[r[c]].vsub(e[r[l]],n),n.normalize();let h=!1;for(let u=0;u!==i.length;u++)if(i[u].almostEquals(n)||i[u].almostEquals(n)){h=!0;break}h||i.push(n.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let n=0;n<this.faces[t].length;n++)if(!this.vertices[this.faces[t][n]])throw new Error(`Vertex ${this.faces[t][n]} not found!`);const e=this.faceNormals[t]||new b;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const i=this.vertices[this.faces[t][0]];if(e.dot(i)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let n=0;n<this.faces[t].length;n++)console.warn(`.vertices[${this.faces[t][n]}] = Vec3(${this.vertices[this.faces[t][n]].toString()})`)}}}getFaceNormal(t,e){const i=this.faces[t],n=this.vertices[i[0]],s=this.vertices[i[1]],r=this.vertices[i[2]];Gn.computeNormal(n,s,r,e)}static computeNormal(t,e,i,n){const s=new b,r=new b;e.vsub(t,r),i.vsub(e,s),s.cross(r,n),n.isZero()||n.normalize()}clipAgainstHull(t,e,i,n,s,r,a,c,l){const h=new b;let u=-1,d=-Number.MAX_VALUE;for(let m=0;m<i.faces.length;m++){h.copy(i.faceNormals[m]),s.vmult(h,h);const x=h.dot(r);x>d&&(d=x,u=m)}const f=[];for(let m=0;m<i.faces[u].length;m++){const x=i.vertices[i.faces[u][m]],p=new b;p.copy(x),s.vmult(p,p),n.vadd(p,p),f.push(p)}u>=0&&this.clipFaceAgainstHull(r,t,e,f,a,c,l)}findSeparatingAxis(t,e,i,n,s,r,a,c){const l=new b,h=new b,u=new b,d=new b,f=new b,m=new b;let x=Number.MAX_VALUE;const p=this;if(p.uniqueAxes)for(let g=0;g!==p.uniqueAxes.length;g++){i.vmult(p.uniqueAxes[g],l);const v=p.testSepAxis(l,t,e,i,n,s);if(v===!1)return!1;v<x&&(x=v,r.copy(l))}else{const g=a?a.length:p.faces.length;for(let v=0;v<g;v++){const y=a?a[v]:v;l.copy(p.faceNormals[y]),i.vmult(l,l);const _=p.testSepAxis(l,t,e,i,n,s);if(_===!1)return!1;_<x&&(x=_,r.copy(l))}}if(t.uniqueAxes)for(let g=0;g!==t.uniqueAxes.length;g++){s.vmult(t.uniqueAxes[g],h);const v=p.testSepAxis(h,t,e,i,n,s);if(v===!1)return!1;v<x&&(x=v,r.copy(h))}else{const g=c?c.length:t.faces.length;for(let v=0;v<g;v++){const y=c?c[v]:v;h.copy(t.faceNormals[y]),s.vmult(h,h);const _=p.testSepAxis(h,t,e,i,n,s);if(_===!1)return!1;_<x&&(x=_,r.copy(h))}}for(let g=0;g!==p.uniqueEdges.length;g++){i.vmult(p.uniqueEdges[g],d);for(let v=0;v!==t.uniqueEdges.length;v++)if(s.vmult(t.uniqueEdges[v],f),d.cross(f,m),!m.almostZero()){m.normalize();const y=p.testSepAxis(m,t,e,i,n,s);if(y===!1)return!1;y<x&&(x=y,r.copy(m))}}return n.vsub(e,u),u.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,i,n,s,r){const a=this;Gn.project(a,t,i,n,ho),Gn.project(e,t,s,r,uo);const c=ho[0],l=ho[1],h=uo[0],u=uo[1];if(c<u||h<l)return!1;const d=c-u,f=h-l;return d<f?d:f}calculateLocalInertia(t,e){const i=new b,n=new b;this.computeLocalAABB(n,i);const s=i.x-n.x,r=i.y-n.y,a=i.z-n.z;e.x=1/12*t*(2*r*2*r+2*a*2*a),e.y=1/12*t*(2*s*2*s+2*a*2*a),e.z=1/12*t*(2*r*2*r+2*s*2*s)}getPlaneConstantOfFace(t){const e=this.faces[t],i=this.faceNormals[t],n=this.vertices[e[0]];return-i.dot(n)}clipFaceAgainstHull(t,e,i,n,s,r,a){const c=new b,l=new b,h=new b,u=new b,d=new b,f=new b,m=new b,x=new b,p=this,g=[],v=n,y=g;let _=-1,E=Number.MAX_VALUE;for(let S=0;S<p.faces.length;S++){c.copy(p.faceNormals[S]),i.vmult(c,c);const P=c.dot(t);P<E&&(E=P,_=S)}if(_<0)return;const T=p.faces[_];T.connectedFaces=[];for(let S=0;S<p.faces.length;S++)for(let P=0;P<p.faces[S].length;P++)T.indexOf(p.faces[S][P])!==-1&&S!==_&&T.connectedFaces.indexOf(S)===-1&&T.connectedFaces.push(S);const C=T.length;for(let S=0;S<C;S++){const P=p.vertices[T[S]],U=p.vertices[T[(S+1)%C]];P.vsub(U,l),h.copy(l),i.vmult(h,h),e.vadd(h,h),u.copy(this.faceNormals[_]),i.vmult(u,u),e.vadd(u,u),h.cross(u,d),d.negate(d),f.copy(P),i.vmult(f,f),e.vadd(f,f);const I=T.connectedFaces[S];m.copy(this.faceNormals[I]);const O=this.getPlaneConstantOfFace(I);x.copy(m),i.vmult(x,x);const B=O-x.dot(e);for(this.clipFaceAgainstPlane(v,y,x,B);v.length;)v.shift();for(;y.length;)v.push(y.shift())}m.copy(this.faceNormals[_]);const L=this.getPlaneConstantOfFace(_);x.copy(m),i.vmult(x,x);const M=L-x.dot(e);for(let S=0;S<v.length;S++){let P=x.dot(v[S])+M;if(P<=s&&(console.log(`clamped: depth=${P} to minDist=${s}`),P=s),P<=r){const U=v[S];if(P<=1e-6){const I={point:U,normal:x,depth:P};a.push(I)}}}}clipFaceAgainstPlane(t,e,i,n){let s,r;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];s=i.dot(c)+n;for(let h=0;h<a;h++){if(l=t[h],r=i.dot(l)+n,s<0)if(r<0){const u=new b;u.copy(l),e.push(u)}else{const u=new b;c.lerp(l,s/(s-r),u),e.push(u)}else if(r<0){const u=new b;c.lerp(l,s/(s-r),u),e.push(u),e.push(l)}c=l,s=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new b);const i=this.vertices,n=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(i[s],n[s]),t.vadd(n[s],n[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const i=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let n=0;n<this.vertices.length;n++){const s=i[n];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new b);const i=this.faceNormals,n=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(i[s],n[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let i=0;i!==e.length;i++){const n=e[i].lengthSquared();n>t&&(t=n)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,i,n){const s=this.vertices;let r,a,c,l,h,u,d=new b;for(let f=0;f<s.length;f++){d.copy(s[f]),e.vmult(d,d),t.vadd(d,d);const m=d;(r===void 0||m.x<r)&&(r=m.x),(l===void 0||m.x>l)&&(l=m.x),(a===void 0||m.y<a)&&(a=m.y),(h===void 0||m.y>h)&&(h=m.y),(c===void 0||m.z<c)&&(c=m.z),(u===void 0||m.z>u)&&(u=m.z)}i.set(r,a,c),n.set(l,h,u)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new b);const e=this.vertices;for(let i=0;i<e.length;i++)t.vadd(e[i],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const i=this.vertices.length,n=this.vertices;if(e){for(let s=0;s<i;s++){const r=n[s];e.vmult(r,r)}for(let s=0;s<this.faceNormals.length;s++){const r=this.faceNormals[s];e.vmult(r,r)}}if(t)for(let s=0;s<i;s++){const r=n[s];r.vadd(t,r)}}pointIsInside(t){const e=this.vertices,i=this.faces,n=this.faceNormals,s=new b;this.getAveragePointLocal(s);for(let r=0;r<this.faces.length;r++){let a=n[r];const c=e[i[r][0]],l=new b;t.vsub(c,l);const h=a.dot(l),u=new b;s.vsub(c,u);const d=a.dot(u);if(h<0&&d>0||h>0&&d<0)return!1}return-1}static project(t,e,i,n,s){const r=t.vertices.length,a=Mg;let c=0,l=0;const h=wg,u=t.vertices;h.setZero(),te.vectorToLocalFrame(i,n,e,a),te.pointToLocalFrame(i,n,h,h);const d=h.dot(a);l=c=u[0].dot(a);for(let f=1;f<r;f++){const m=u[f].dot(a);m>c&&(c=m),m<l&&(l=m)}if(l-=d,c-=d,l>c){const f=l;l=c,c=f}s[0]=c,s[1]=l}}const ho=[],uo=[];new b;const Mg=new b,wg=new b;class zi extends _t{constructor(t){super({type:_t.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,i=this.halfExtents.z,n=b,s=[new n(-t,-e,-i),new n(t,-e,-i),new n(t,e,-i),new n(-t,e,-i),new n(-t,-e,i),new n(t,-e,i),new n(t,e,i),new n(-t,e,i)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new n(0,0,1),new n(0,1,0),new n(1,0,0)],c=new Gn({vertices:s,faces:r,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new b),zi.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,i){const n=t;i.x=1/12*e*(2*n.y*2*n.y+2*n.z*2*n.z),i.y=1/12*e*(2*n.x*2*n.x+2*n.z*2*n.z),i.z=1/12*e*(2*n.y*2*n.y+2*n.x*2*n.x)}getSideNormals(t,e){const i=t,n=this.halfExtents;if(i[0].set(n.x,0,0),i[1].set(0,n.y,0),i[2].set(0,0,n.z),i[3].set(-n.x,0,0),i[4].set(0,-n.y,0),i[5].set(0,0,-n.z),e!==void 0)for(let s=0;s!==i.length;s++)e.vmult(i[s],i[s]);return i}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,i){const n=this.halfExtents,s=[[n.x,n.y,n.z],[-n.x,n.y,n.z],[-n.x,-n.y,n.z],[-n.x,-n.y,-n.z],[n.x,-n.y,-n.z],[n.x,n.y,-n.z],[-n.x,n.y,-n.z],[n.x,-n.y,n.z]];for(let r=0;r<s.length;r++)ji.set(s[r][0],s[r][1],s[r][2]),e.vmult(ji,ji),t.vadd(ji,ji),i(ji.x,ji.y,ji.z)}calculateWorldAABB(t,e,i,n){const s=this.halfExtents;xi[0].set(s.x,s.y,s.z),xi[1].set(-s.x,s.y,s.z),xi[2].set(-s.x,-s.y,s.z),xi[3].set(-s.x,-s.y,-s.z),xi[4].set(s.x,-s.y,-s.z),xi[5].set(s.x,s.y,-s.z),xi[6].set(-s.x,s.y,-s.z),xi[7].set(s.x,-s.y,s.z);const r=xi[0];e.vmult(r,r),t.vadd(r,r),n.copy(r),i.copy(r);for(let a=1;a<8;a++){const c=xi[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,u=c.z;l>n.x&&(n.x=l),h>n.y&&(n.y=h),u>n.z&&(n.z=u),l<i.x&&(i.x=l),h<i.y&&(i.y=h),u<i.z&&(i.z=u)}}}const ji=new b,xi=[new b,new b,new b,new b,new b,new b,new b,new b],Ia={DYNAMIC:1,STATIC:2,KINEMATIC:4},La={AWAKE:0,SLEEPY:1,SLEEPING:2};class st extends nh{constructor(t){t===void 0&&(t={}),super(),this.id=st.idCounter++,this.index=-1,this.world=null,this.vlambda=new b,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new b,this.previousPosition=new b,this.interpolatedPosition=new b,this.initPosition=new b,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new b,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new b,this.force=new b;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?st.STATIC:st.DYNAMIC,typeof t.type==typeof st.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=st.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new b,this.quaternion=new we,this.initQuaternion=new we,this.previousQuaternion=new we,this.interpolatedQuaternion=new we,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new b,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new b,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new b,this.invInertia=new b,this.invInertiaWorld=new ui,this.invMassSolve=0,this.invInertiaSolve=new b,this.invInertiaWorldSolve=new ui,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new b(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new b(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new ti,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new b,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=st.AWAKE,this.wakeUpAfterNarrowphase=!1,t===st.SLEEPING&&this.dispatchEvent(st.wakeupEvent)}sleep(){this.sleepState=st.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,i=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),n=this.sleepSpeedLimit**2;e===st.AWAKE&&i<n?(this.sleepState=st.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(st.sleepyEvent)):e===st.SLEEPY&&i>n?this.wakeUp():e===st.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(st.sleepEvent))}}updateSolveMassProperties(){this.sleepState===st.SLEEPING||this.type===st.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new b),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new b),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new b),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new b),this.quaternion.vmult(t,e),e}addShape(t,e,i){const n=new b,s=new we;return e&&n.copy(e),i&&s.copy(i),this.shapes.push(t),this.shapeOffsets.push(n),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,i=t.length;let n=0;for(let s=0;s!==i;s++){const r=t[s];r.updateBoundingSphereRadius();const a=e[s].length(),c=r.boundingSphereRadius;a+c>n&&(n=a+c)}this.boundingRadius=n}updateAABB(){const t=this.shapes,e=this.shapeOffsets,i=this.shapeOrientations,n=t.length,s=Sg,r=bg,a=this.quaternion,c=this.aabb,l=Eg;for(let h=0;h!==n;h++){const u=t[h];a.vmult(e[h],s),s.vadd(this.position,s),a.mult(i[h],r),u.calculateWorldAABB(s,r,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const i=Tg,n=Ag;i.setRotationFromQuaternion(this.quaternion),i.transpose(n),i.scale(e,i),i.mmult(n,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new b),this.type!==st.DYNAMIC)return;this.sleepState===st.SLEEPING&&this.wakeUp();const i=Cg;e.cross(t,i),this.force.vadd(t,this.force),this.torque.vadd(i,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new b),this.type!==st.DYNAMIC)return;const i=Rg,n=Pg;this.vectorToWorldFrame(t,i),this.vectorToWorldFrame(e,n),this.applyForce(i,n)}applyTorque(t){this.type===st.DYNAMIC&&(this.sleepState===st.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new b),this.type!==st.DYNAMIC)return;this.sleepState===st.SLEEPING&&this.wakeUp();const i=e,n=Ig;n.copy(t),n.scale(this.invMass,n),this.velocity.vadd(n,this.velocity);const s=Lg;i.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new b),this.type!==st.DYNAMIC)return;const i=Dg,n=Ng;this.vectorToWorldFrame(t,i),this.vectorToWorldFrame(e,n),this.applyImpulse(i,n)}updateMassProperties(){const t=Fg;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,i=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),zi.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!i?1/e.x:0,e.y>0&&!i?1/e.y:0,e.z>0&&!i?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const i=new b;return t.vsub(this.position,i),this.angularVelocity.cross(i,e),this.velocity.vadd(e,e),e}integrate(t,e,i){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===st.DYNAMIC||this.type===st.KINEMATIC)||this.sleepState===st.SLEEPING)return;const n=this.velocity,s=this.angularVelocity,r=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,u=this.invInertiaWorld,d=this.linearFactor,f=h*t;n.x+=a.x*f*d.x,n.y+=a.y*f*d.y,n.z+=a.z*f*d.z;const m=u.elements,x=this.angularFactor,p=c.x*x.x,g=c.y*x.y,v=c.z*x.z;s.x+=t*(m[0]*p+m[1]*g+m[2]*v),s.y+=t*(m[3]*p+m[4]*g+m[5]*v),s.z+=t*(m[6]*p+m[7]*g+m[8]*v),r.x+=n.x*t,r.y+=n.y*t,r.z+=n.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(i?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}st.idCounter=0;st.COLLIDE_EVENT_NAME="collide";st.DYNAMIC=Ia.DYNAMIC;st.STATIC=Ia.STATIC;st.KINEMATIC=Ia.KINEMATIC;st.AWAKE=La.AWAKE;st.SLEEPY=La.SLEEPY;st.SLEEPING=La.SLEEPING;st.wakeupEvent={type:"wakeup"};st.sleepyEvent={type:"sleepy"};st.sleepEvent={type:"sleep"};const Sg=new b,bg=new we,Eg=new ti,Tg=new ui,Ag=new ui;new ui;const Cg=new b,Rg=new b,Pg=new b,Ig=new b,Lg=new b,Dg=new b,Ng=new b,Fg=new b;class Ug{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,i){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!((t.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&t.collisionFilterMask)===0||((t.type&st.STATIC)!==0||t.sleepState===st.SLEEPING)&&((e.type&st.STATIC)!==0||e.sleepState===st.SLEEPING))}intersectionTest(t,e,i,n){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,i,n):this.doBoundingSphereBroadphase(t,e,i,n)}doBoundingSphereBroadphase(t,e,i,n){const s=Bg;e.position.vsub(t.position,s);const r=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<r&&(i.push(t),n.push(e))}doBoundingBoxBroadphase(t,e,i,n){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(i.push(t),n.push(e))}makePairsUnique(t,e){const i=Og,n=zg,s=kg,r=t.length;for(let a=0;a!==r;a++)n[a]=t[a],s[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==r;a++){const c=n[a].id,l=s[a].id,h=c<l?`${c},${l}`:`${l},${c}`;i[h]=a,i.keys.push(h)}for(let a=0;a!==i.keys.length;a++){const c=i.keys.pop(),l=i[c];t.push(n[l]),e.push(s[l]),delete i[c]}}setWorld(t){}static boundingSphereCheck(t,e){const i=new b;t.position.vsub(e.position,i);const n=t.shapes[0],s=e.shapes[0];return Math.pow(n.boundingSphereRadius+s.boundingSphereRadius,2)>i.lengthSquared()}aabbQuery(t,e,i){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const Bg=new b;new b;new we;new b;const Og={keys:[]},zg=[],kg=[];new b;new b;new b;class sh extends Ug{constructor(){super()}collisionPairs(t,e,i){const n=t.bodies,s=n.length;let r,a;for(let c=0;c!==s;c++)for(let l=0;l!==c;l++)r=n[c],a=n[l],this.needBroadphaseCollision(r,a)&&this.intersectionTest(r,a,e,i)}aabbQuery(t,e,i){i===void 0&&(i=[]);for(let n=0;n<t.bodies.length;n++){const s=t.bodies[n];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&i.push(s)}return i}}class _r{constructor(){this.rayFromWorld=new b,this.rayToWorld=new b,this.hitNormalWorld=new b,this.hitPointWorld=new b,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,i,n,s,r,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(i),this.hitPointWorld.copy(n),this.shape=s,this.body=r,this.distance=a}}let rh,oh,ah,ch,lh,hh,uh;const Da={CLOSEST:1,ANY:2,ALL:4};rh=_t.types.SPHERE;oh=_t.types.PLANE;ah=_t.types.BOX;ch=_t.types.CYLINDER;lh=_t.types.CONVEXPOLYHEDRON;hh=_t.types.HEIGHTFIELD;uh=_t.types.TRIMESH;class Te{get[rh](){return this._intersectSphere}get[oh](){return this._intersectPlane}get[ah](){return this._intersectBox}get[ch](){return this._intersectConvex}get[lh](){return this._intersectConvex}get[hh](){return this._intersectHeightfield}get[uh](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new b),e===void 0&&(e=new b),this.from=t.clone(),this.to=e.clone(),this.direction=new b,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Te.ANY,this.result=new _r,this.hasHit=!1,this.callback=i=>{}}intersectWorld(t,e){return this.mode=e.mode||Te.ANY,this.result=e.result||new _r,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Jc),fo.length=0,t.broadphase.aabbQuery(t,Jc,fo),this.intersectBodies(fo),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const i=this.checkCollisionResponse;if(i&&!t.collisionResponse||(this.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&this.collisionFilterMask)===0)return;const n=Gg,s=Vg;for(let r=0,a=t.shapes.length;r<a;r++){const c=t.shapes[r];if(!(i&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],s),t.quaternion.vmult(t.shapeOffsets[r],n),n.vadd(t.position,n),this.intersectShape(c,s,n,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let i=0,n=t.length;!this.result.shouldStop&&i<n;i++)this.intersectBody(t[i])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,i,n){const s=this.from;if(ix(s,this.direction,i)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,i,n,t)}_intersectBox(t,e,i,n,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,i,n,s)}_intersectPlane(t,e,i,n,s){const r=this.from,a=this.to,c=this.direction,l=new b(0,0,1);e.vmult(l,l);const h=new b;r.vsub(i,h);const u=h.dot(l);a.vsub(i,h);const d=h.dot(l);if(u*d>0||r.distanceTo(a)<u)return;const f=l.dot(c);if(Math.abs(f)<this.precision)return;const m=new b,x=new b,p=new b;r.vsub(i,m);const g=-l.dot(m)/f;c.scale(g,x),r.vadd(x,p),this.reportIntersection(l,p,s,n,-1)}getAABB(t){const{lowerBound:e,upperBound:i}=t,n=this.to,s=this.from;e.x=Math.min(n.x,s.x),e.y=Math.min(n.y,s.y),e.z=Math.min(n.z,s.z),i.x=Math.max(n.x,s.x),i.y=Math.max(n.y,s.y),i.z=Math.max(n.z,s.z)}_intersectHeightfield(t,e,i,n,s){t.data,t.elementSize;const r=Hg;r.from.copy(this.from),r.to.copy(this.to),te.pointToLocalFrame(i,e,r.from,r.from),te.pointToLocalFrame(i,e,r.to,r.to),r.updateDirection();const a=Wg;let c,l,h,u;c=l=0,h=u=t.data.length-1;const d=new ti;r.getAABB(d),t.getIndexOfPosition(d.lowerBound.x,d.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(d.upperBound.x,d.upperBound.y,a,!0),h=Math.min(h,a[0]+1),u=Math.min(u,a[1]+1);for(let f=c;f<h;f++)for(let m=l;m<u;m++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,m,d),!!d.overlapsRay(r)){if(t.getConvexTrianglePillar(f,m,!1),te.pointToWorldFrame(i,e,t.pillarOffset,sr),this._intersectConvex(t.pillarConvex,e,sr,n,s,Qc),this.result.shouldStop)return;t.getConvexTrianglePillar(f,m,!0),te.pointToWorldFrame(i,e,t.pillarOffset,sr),this._intersectConvex(t.pillarConvex,e,sr,n,s,Qc)}}}_intersectSphere(t,e,i,n,s){const r=this.from,a=this.to,c=t.radius,l=(a.x-r.x)**2+(a.y-r.y)**2+(a.z-r.z)**2,h=2*((a.x-r.x)*(r.x-i.x)+(a.y-r.y)*(r.y-i.y)+(a.z-r.z)*(r.z-i.z)),u=(r.x-i.x)**2+(r.y-i.y)**2+(r.z-i.z)**2-c**2,d=h**2-4*l*u,f=qg,m=Xg;if(!(d<0))if(d===0)r.lerp(a,d,f),f.vsub(i,m),m.normalize(),this.reportIntersection(m,f,s,n,-1);else{const x=(-h-Math.sqrt(d))/(2*l),p=(-h+Math.sqrt(d))/(2*l);if(x>=0&&x<=1&&(r.lerp(a,x,f),f.vsub(i,m),m.normalize(),this.reportIntersection(m,f,s,n,-1)),this.result.shouldStop)return;p>=0&&p<=1&&(r.lerp(a,p,f),f.vsub(i,m),m.normalize(),this.reportIntersection(m,f,s,n,-1))}}_intersectConvex(t,e,i,n,s,r){const a=Yg,c=tl,l=r&&r.faceList||null,h=t.faces,u=t.vertices,d=t.faceNormals,f=this.direction,m=this.from,x=this.to,p=m.distanceTo(x),g=l?l.length:h.length,v=this.result;for(let y=0;!v.shouldStop&&y<g;y++){const _=l?l[y]:y,E=h[_],T=d[_],C=e,L=i;c.copy(u[E[0]]),C.vmult(c,c),c.vadd(L,c),c.vsub(m,c),C.vmult(T,a);const M=f.dot(a);if(Math.abs(M)<this.precision)continue;const S=a.dot(c)/M;if(!(S<0)){f.scale(S,qe),qe.vadd(m,qe),ci.copy(u[E[0]]),C.vmult(ci,ci),L.vadd(ci,ci);for(let P=1;!v.shouldStop&&P<E.length-1;P++){vi.copy(u[E[P]]),_i.copy(u[E[P+1]]),C.vmult(vi,vi),C.vmult(_i,_i),L.vadd(vi,vi),L.vadd(_i,_i);const U=qe.distanceTo(m);!(Te.pointInTriangle(qe,ci,vi,_i)||Te.pointInTriangle(qe,vi,ci,_i))||U>p||this.reportIntersection(a,qe,s,n,_)}}}}_intersectTrimesh(t,e,i,n,s,r){const a=Zg,c=tx,l=ex,h=tl,u=Kg,d=jg,f=$g,m=Qg,x=Jg,p=t.indices;t.vertices;const g=this.from,v=this.to,y=this.direction;l.position.copy(i),l.quaternion.copy(e),te.vectorToLocalFrame(i,e,y,u),te.pointToLocalFrame(i,e,g,d),te.pointToLocalFrame(i,e,v,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,d.x*=t.scale.x,d.y*=t.scale.y,d.z*=t.scale.z,f.vsub(d,u),u.normalize();const _=d.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let E=0,T=c.length;!this.result.shouldStop&&E!==T;E++){const C=c[E];t.getNormal(C,a),t.getVertex(p[C*3],ci),ci.vsub(d,h);const L=u.dot(a),M=a.dot(h)/L;if(M<0)continue;u.scale(M,qe),qe.vadd(d,qe),t.getVertex(p[C*3+1],vi),t.getVertex(p[C*3+2],_i);const S=qe.distanceSquared(d);!(Te.pointInTriangle(qe,vi,ci,_i)||Te.pointInTriangle(qe,ci,vi,_i))||S>_||(te.vectorToWorldFrame(e,a,x),te.pointToWorldFrame(i,e,qe,m),this.reportIntersection(x,m,s,n,C))}c.length=0}reportIntersection(t,e,i,n,s){const r=this.from,a=this.to,c=r.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case Te.ALL:this.hasHit=!0,l.set(r,a,t,e,i,n,c),l.hasHit=!0,this.callback(l);break;case Te.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,i,n,c));break;case Te.ANY:this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,i,n,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,i,n){n.vsub(e,xn),i.vsub(e,hs),t.vsub(e,po);const s=xn.dot(xn),r=xn.dot(hs),a=xn.dot(po),c=hs.dot(hs),l=hs.dot(po);let h,u;return(h=c*a-r*l)>=0&&(u=s*l-r*a)>=0&&h+u<s*c-r*r}}Te.CLOSEST=Da.CLOSEST;Te.ANY=Da.ANY;Te.ALL=Da.ALL;const Jc=new ti,fo=[],hs=new b,po=new b,Gg=new b,Vg=new we,qe=new b,ci=new b,vi=new b,_i=new b;new b;new _r;const Qc={faceList:[0]},sr=new b,Hg=new Te,Wg=[],qg=new b,Xg=new b,Yg=new b;new b;new b;const tl=new b,Zg=new b,Kg=new b,jg=new b,$g=new b,Jg=new b,Qg=new b;new ti;const tx=[],ex=new te,xn=new b,rr=new b;function ix(o,t,e){e.vsub(o,xn);const i=xn.dot(t);return t.scale(i,rr),rr.vadd(o,rr),e.distanceTo(rr)}class nx{static defaults(t,e){t===void 0&&(t={});for(let i in e)i in t||(t[i]=e[i]);return t}}class el{constructor(){this.spatial=new b,this.rotational=new b}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Ps{constructor(t,e,i,n){i===void 0&&(i=-1e6),n===void 0&&(n=1e6),this.id=Ps.idCounter++,this.minForce=i,this.maxForce=n,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new el,this.jacobianElementB=new el,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,i){const n=e,s=t,r=i;this.a=4/(r*(1+4*n)),this.b=4*n/(1+4*n),this.eps=4/(r*r*s*(1+4*n))}computeB(t,e,i){const n=this.computeGW(),s=this.computeGq(),r=this.computeGiMf();return-s*t-n*e-r*i}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,i=this.bi,n=this.bj,s=i.position,r=n.position;return t.spatial.dot(s)+e.spatial.dot(r)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,i=this.bi,n=this.bj,s=i.velocity,r=n.velocity,a=i.angularVelocity,c=n.angularVelocity;return t.multiplyVectors(s,a)+e.multiplyVectors(r,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,i=this.bi,n=this.bj,s=i.vlambda,r=n.vlambda,a=i.wlambda,c=n.wlambda;return t.multiplyVectors(s,a)+e.multiplyVectors(r,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,i=this.bi,n=this.bj,s=i.force,r=i.torque,a=n.force,c=n.torque,l=i.invMassSolve,h=n.invMassSolve;return s.scale(l,il),a.scale(h,nl),i.invInertiaWorldSolve.vmult(r,sl),n.invInertiaWorldSolve.vmult(c,rl),t.multiplyVectors(il,sl)+e.multiplyVectors(nl,rl)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,i=this.bi,n=this.bj,s=i.invMassSolve,r=n.invMassSolve,a=i.invInertiaWorldSolve,c=n.invInertiaWorldSolve;let l=s+r;return a.vmult(t.rotational,or),l+=or.dot(t.rotational),c.vmult(e.rotational,or),l+=or.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,i=this.jacobianElementB,n=this.bi,s=this.bj,r=sx;n.vlambda.addScaledVector(n.invMassSolve*t,e.spatial,n.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,i.spatial,s.vlambda),n.invInertiaWorldSolve.vmult(e.rotational,r),n.wlambda.addScaledVector(t,r,n.wlambda),s.invInertiaWorldSolve.vmult(i.rotational,r),s.wlambda.addScaledVector(t,r,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Ps.idCounter=0;const il=new b,nl=new b,sl=new b,rl=new b,or=new b,sx=new b;class rx extends Ps{constructor(t,e,i){i===void 0&&(i=1e6),super(t,e,0,i),this.restitution=0,this.ri=new b,this.rj=new b,this.ni=new b}computeB(t){const e=this.a,i=this.b,n=this.bi,s=this.bj,r=this.ri,a=this.rj,c=ox,l=ax,h=n.velocity,u=n.angularVelocity;n.force,n.torque;const d=s.velocity,f=s.angularVelocity;s.force,s.torque;const m=cx,x=this.jacobianElementA,p=this.jacobianElementB,g=this.ni;r.cross(g,c),a.cross(g,l),g.negate(x.spatial),c.negate(x.rotational),p.spatial.copy(g),p.rotational.copy(l),m.copy(s.position),m.vadd(a,m),m.vsub(n.position,m),m.vsub(r,m);const v=g.dot(m),y=this.restitution+1,_=y*d.dot(g)-y*h.dot(g)+f.dot(l)-u.dot(c),E=this.computeGiMf();return-v*e-_*i-t*E}getImpactVelocityAlongNormal(){const t=lx,e=hx,i=ux,n=dx,s=fx;return this.bi.position.vadd(this.ri,i),this.bj.position.vadd(this.rj,n),this.bi.getVelocityAtWorldPoint(i,t),this.bj.getVelocityAtWorldPoint(n,e),t.vsub(e,s),this.ni.dot(s)}}const ox=new b,ax=new b,cx=new b,lx=new b,hx=new b,ux=new b,dx=new b,fx=new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;class ol extends Ps{constructor(t,e,i){super(t,e,-i,i),this.ri=new b,this.rj=new b,this.t=new b}computeB(t){this.a;const e=this.b;this.bi,this.bj;const i=this.ri,n=this.rj,s=px,r=mx,a=this.t;i.cross(a,s),n.cross(a,r);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),s.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(r);const h=this.computeGW(),u=this.computeGiMf();return-h*e-t*u}}const px=new b,mx=new b;class Er{constructor(t,e,i){i=nx.defaults(i,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Er.idCounter++,this.materials=[t,e],this.friction=i.friction,this.restitution=i.restitution,this.contactEquationStiffness=i.contactEquationStiffness,this.contactEquationRelaxation=i.contactEquationRelaxation,this.frictionEquationStiffness=i.frictionEquationStiffness,this.frictionEquationRelaxation=i.frictionEquationRelaxation}}Er.idCounter=0;class Qe{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Qe.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Qe.idCounter=0;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new Te;new b;new b;new b;new b(1,0,0),new b(0,1,0),new b(0,0,1);new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;class Zn extends _t{constructor(t){if(super({type:_t.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new b);const i=2*t*this.radius*this.radius/5;return e.x=i,e.y=i,e.z=i,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,i,n){const s=this.radius,r=["x","y","z"];for(let a=0;a<r.length;a++){const c=r[a];i[c]=t[c]-s,n[c]=t[c]+s}}}new b;new b;new b;new b;new b;new b;new b;new b;new b;class sn extends Gn{constructor(t,e,i,n){if(t===void 0&&(t=1),e===void 0&&(e=1),i===void 0&&(i=1),n===void 0&&(n=8),t<0)throw new Error("The cylinder radiusTop cannot be negative.");if(e<0)throw new Error("The cylinder radiusBottom cannot be negative.");const s=n,r=[],a=[],c=[],l=[],h=[],u=Math.cos,d=Math.sin;r.push(new b(-e*d(0),-i*.5,e*u(0))),l.push(0),r.push(new b(-t*d(0),i*.5,t*u(0))),h.push(1);for(let m=0;m<s;m++){const x=2*Math.PI/s*(m+1),p=2*Math.PI/s*(m+.5);m<s-1?(r.push(new b(-e*d(x),-i*.5,e*u(x))),l.push(2*m+2),r.push(new b(-t*d(x),i*.5,t*u(x))),h.push(2*m+3),c.push([2*m,2*m+1,2*m+3,2*m+2])):c.push([2*m,2*m+1,1,0]),(s%2===1||m<s/2)&&a.push(new b(-d(p),0,u(p)))}c.push(l),a.push(new b(0,1,0));const f=[];for(let m=0;m<h.length;m++)f.push(h[h.length-m-1]);c.push(f),super({vertices:r,faces:c,axes:a}),this.type=_t.types.CYLINDER,this.radiusTop=t,this.radiusBottom=e,this.height=i,this.numSegments=n}}new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new ti;new b;new ti;new b;new b;new b;new b;new b;new b;new b;new ti;new b;new te;new ti;class gx{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,i=e.indexOf(t);i!==-1&&e.splice(i,1)}removeAllEquations(){this.equations.length=0}}class xx extends gx{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let i=0;const n=this.iterations,s=this.tolerance*this.tolerance,r=this.equations,a=r.length,c=e.bodies,l=c.length,h=t;let u,d,f,m,x,p;if(a!==0)for(let _=0;_!==l;_++)c[_].updateSolveMassProperties();const g=_x,v=yx,y=vx;g.length=a,v.length=a,y.length=a;for(let _=0;_!==a;_++){const E=r[_];y[_]=0,v[_]=E.computeB(h),g[_]=1/E.computeC()}if(a!==0){for(let T=0;T!==l;T++){const C=c[T],L=C.vlambda,M=C.wlambda;L.set(0,0,0),M.set(0,0,0)}for(i=0;i!==n;i++){m=0;for(let T=0;T!==a;T++){const C=r[T];u=v[T],d=g[T],p=y[T],x=C.computeGWlambda(),f=d*(u-x-C.eps*p),p+f<C.minForce?f=C.minForce-p:p+f>C.maxForce&&(f=C.maxForce-p),y[T]+=f,m+=f>0?f:-f,C.addToWlambda(f)}if(m*m<s)break}for(let T=0;T!==l;T++){const C=c[T],L=C.velocity,M=C.angularVelocity;C.vlambda.vmul(C.linearFactor,C.vlambda),L.vadd(C.vlambda,L),C.wlambda.vmul(C.angularFactor,C.wlambda),M.vadd(C.wlambda,M)}let _=r.length;const E=1/h;for(;_--;)r[_].multiplier=y[_]*E}return i}}const vx=[],_x=[],yx=[];class Mx{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class wx extends Mx{constructor(){super(...arguments),this.type=b}constructObject(){return new b}}const me={sphereSphere:_t.types.SPHERE,spherePlane:_t.types.SPHERE|_t.types.PLANE,boxBox:_t.types.BOX|_t.types.BOX,sphereBox:_t.types.SPHERE|_t.types.BOX,planeBox:_t.types.PLANE|_t.types.BOX,convexConvex:_t.types.CONVEXPOLYHEDRON,sphereConvex:_t.types.SPHERE|_t.types.CONVEXPOLYHEDRON,planeConvex:_t.types.PLANE|_t.types.CONVEXPOLYHEDRON,boxConvex:_t.types.BOX|_t.types.CONVEXPOLYHEDRON,sphereHeightfield:_t.types.SPHERE|_t.types.HEIGHTFIELD,boxHeightfield:_t.types.BOX|_t.types.HEIGHTFIELD,convexHeightfield:_t.types.CONVEXPOLYHEDRON|_t.types.HEIGHTFIELD,sphereParticle:_t.types.PARTICLE|_t.types.SPHERE,planeParticle:_t.types.PLANE|_t.types.PARTICLE,boxParticle:_t.types.BOX|_t.types.PARTICLE,convexParticle:_t.types.PARTICLE|_t.types.CONVEXPOLYHEDRON,cylinderCylinder:_t.types.CYLINDER,sphereCylinder:_t.types.SPHERE|_t.types.CYLINDER,planeCylinder:_t.types.PLANE|_t.types.CYLINDER,boxCylinder:_t.types.BOX|_t.types.CYLINDER,convexCylinder:_t.types.CONVEXPOLYHEDRON|_t.types.CYLINDER,heightfieldCylinder:_t.types.HEIGHTFIELD|_t.types.CYLINDER,particleCylinder:_t.types.PARTICLE|_t.types.CYLINDER,sphereTrimesh:_t.types.SPHERE|_t.types.TRIMESH,planeTrimesh:_t.types.PLANE|_t.types.TRIMESH};class Sx{get[me.sphereSphere](){return this.sphereSphere}get[me.spherePlane](){return this.spherePlane}get[me.boxBox](){return this.boxBox}get[me.sphereBox](){return this.sphereBox}get[me.planeBox](){return this.planeBox}get[me.convexConvex](){return this.convexConvex}get[me.sphereConvex](){return this.sphereConvex}get[me.planeConvex](){return this.planeConvex}get[me.boxConvex](){return this.boxConvex}get[me.sphereHeightfield](){return this.sphereHeightfield}get[me.boxHeightfield](){return this.boxHeightfield}get[me.convexHeightfield](){return this.convexHeightfield}get[me.sphereParticle](){return this.sphereParticle}get[me.planeParticle](){return this.planeParticle}get[me.boxParticle](){return this.boxParticle}get[me.convexParticle](){return this.convexParticle}get[me.cylinderCylinder](){return this.convexConvex}get[me.sphereCylinder](){return this.sphereConvex}get[me.planeCylinder](){return this.planeConvex}get[me.boxCylinder](){return this.boxConvex}get[me.convexCylinder](){return this.convexConvex}get[me.heightfieldCylinder](){return this.heightfieldCylinder}get[me.particleCylinder](){return this.particleCylinder}get[me.sphereTrimesh](){return this.sphereTrimesh}get[me.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new wx,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,i,n,s,r){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new rx(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&i.collisionResponse&&n.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=i.material||t.material,h=n.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=s||i,a.sj=r||n,a}createFrictionEquationsFromContact(t,e){const i=t.bi,n=t.bj,s=t.si,r=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=s.material||i.material,u=r.material||n.material;if(h&&u&&h.friction>=0&&u.friction>=0&&(l=h.friction*u.friction),l>0){const d=l*(a.frictionGravity||a.gravity).length();let f=i.invMass+n.invMass;f>0&&(f=1/f);const m=this.frictionEquationPool,x=m.length?m.pop():new ol(i,n,d*f),p=m.length?m.pop():new ol(i,n,d*f);return x.bi=p.bi=i,x.bj=p.bj=n,x.minForce=p.minForce=-d*f,x.maxForce=p.maxForce=d*f,x.ri.copy(t.ri),x.rj.copy(t.rj),p.ri.copy(t.ri),p.rj.copy(t.rj),t.ni.tangents(x.t,p.t),x.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),p.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),x.enabled=p.enabled=t.enabled,e.push(x,p),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const i=this.frictionResult[this.frictionResult.length-2],n=this.frictionResult[this.frictionResult.length-1];fn.setZero(),Bn.setZero(),On.setZero();const s=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==s?(fn.vadd(e.ni,fn),Bn.vadd(e.ri,Bn),On.vadd(e.rj,On)):(fn.vsub(e.ni,fn),Bn.vadd(e.rj,Bn),On.vadd(e.ri,On));const r=1/t;Bn.scale(r,i.ri),On.scale(r,i.rj),n.ri.copy(i.ri),n.rj.copy(i.rj),fn.normalize(),fn.tangents(i.t,n.t)}getContacts(t,e,i,n,s,r,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=n,this.frictionResult=r;const c=Tx,l=Ax,h=bx,u=Ex;for(let d=0,f=t.length;d!==f;d++){const m=t[d],x=e[d];let p=null;m.material&&x.material&&(p=i.getContactMaterial(m.material,x.material)||null);const g=m.type&st.KINEMATIC&&x.type&st.STATIC||m.type&st.STATIC&&x.type&st.KINEMATIC||m.type&st.KINEMATIC&&x.type&st.KINEMATIC;for(let v=0;v<m.shapes.length;v++){m.quaternion.mult(m.shapeOrientations[v],c),m.quaternion.vmult(m.shapeOffsets[v],h),h.vadd(m.position,h);const y=m.shapes[v];for(let _=0;_<x.shapes.length;_++){x.quaternion.mult(x.shapeOrientations[_],l),x.quaternion.vmult(x.shapeOffsets[_],u),u.vadd(x.position,u);const E=x.shapes[_];if(!(y.collisionFilterMask&E.collisionFilterGroup&&E.collisionFilterMask&y.collisionFilterGroup)||h.distanceTo(u)>y.boundingSphereRadius+E.boundingSphereRadius)continue;let T=null;y.material&&E.material&&(T=i.getContactMaterial(y.material,E.material)||null),this.currentContactMaterial=T||p||i.defaultContactMaterial;const C=y.type|E.type,L=this[C];if(L){let M=!1;y.type<E.type?M=L.call(this,y,E,h,u,c,l,m,x,y,E,g):M=L.call(this,E,y,u,h,l,c,x,m,y,E,g),M&&g&&(i.shapeOverlapKeeper.set(y.id,E.id),i.bodyOverlapKeeper.set(m.id,x.id))}}}}}sphereSphere(t,e,i,n,s,r,a,c,l,h,u){if(u)return i.distanceSquared(n)<(t.radius+e.radius)**2;const d=this.createContactEquation(a,c,t,e,l,h);n.vsub(i,d.ni),d.ni.normalize(),d.ri.copy(d.ni),d.rj.copy(d.ni),d.ri.scale(t.radius,d.ri),d.rj.scale(-e.radius,d.rj),d.ri.vadd(i,d.ri),d.ri.vsub(a.position,d.ri),d.rj.vadd(n,d.rj),d.rj.vsub(c.position,d.rj),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}spherePlane(t,e,i,n,s,r,a,c,l,h,u){const d=this.createContactEquation(a,c,t,e,l,h);if(d.ni.set(0,0,1),r.vmult(d.ni,d.ni),d.ni.negate(d.ni),d.ni.normalize(),d.ni.scale(t.radius,d.ri),i.vsub(n,ar),d.ni.scale(d.ni.dot(ar),al),ar.vsub(al,d.rj),-ar.dot(d.ni)<=t.radius){if(u)return!0;const f=d.ri,m=d.rj;f.vadd(i,f),f.vsub(a.position,f),m.vadd(n,m),m.vsub(c.position,m),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}}boxBox(t,e,i,n,s,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,i,n,s,r,a,c,t,e,u)}sphereBox(t,e,i,n,s,r,a,c,l,h,u){const d=this.v3pool,f=Qx;i.vsub(n,cr),e.getSideNormals(f,r);const m=t.radius;let x=!1;const p=ev,g=iv,v=nv;let y=null,_=0,E=0,T=0,C=null;for(let D=0,V=f.length;D!==V&&x===!1;D++){const X=jx;X.copy(f[D]);const J=X.length();X.normalize();const nt=cr.dot(X);if(nt<J+m&&nt>0){const ot=$x,at=Jx;ot.copy(f[(D+1)%3]),at.copy(f[(D+2)%3]);const Ft=ot.length(),ae=at.length();ot.normalize(),at.normalize();const ie=cr.dot(ot),j=cr.dot(at);if(ie<Ft&&ie>-Ft&&j<ae&&j>-ae){const tt=Math.abs(nt-J-m);if((C===null||tt<C)&&(C=tt,E=ie,T=j,y=J,p.copy(X),g.copy(ot),v.copy(at),_++,u))return!0}}}if(_){x=!0;const D=this.createContactEquation(a,c,t,e,l,h);p.scale(-m,D.ri),D.ni.copy(p),D.ni.negate(D.ni),p.scale(y,p),g.scale(E,g),p.vadd(g,p),v.scale(T,v),p.vadd(v,D.rj),D.ri.vadd(i,D.ri),D.ri.vsub(a.position,D.ri),D.rj.vadd(n,D.rj),D.rj.vsub(c.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}let L=d.get();const M=tv;for(let D=0;D!==2&&!x;D++)for(let V=0;V!==2&&!x;V++)for(let X=0;X!==2&&!x;X++)if(L.set(0,0,0),D?L.vadd(f[0],L):L.vsub(f[0],L),V?L.vadd(f[1],L):L.vsub(f[1],L),X?L.vadd(f[2],L):L.vsub(f[2],L),n.vadd(L,M),M.vsub(i,M),M.lengthSquared()<m*m){if(u)return!0;x=!0;const J=this.createContactEquation(a,c,t,e,l,h);J.ri.copy(M),J.ri.normalize(),J.ni.copy(J.ri),J.ri.scale(m,J.ri),J.rj.copy(L),J.ri.vadd(i,J.ri),J.ri.vsub(a.position,J.ri),J.rj.vadd(n,J.rj),J.rj.vsub(c.position,J.rj),this.result.push(J),this.createFrictionEquationsFromContact(J,this.frictionResult)}d.release(L),L=null;const S=d.get(),P=d.get(),U=d.get(),I=d.get(),O=d.get(),B=f.length;for(let D=0;D!==B&&!x;D++)for(let V=0;V!==B&&!x;V++)if(D%3!==V%3){f[V].cross(f[D],S),S.normalize(),f[D].vadd(f[V],P),U.copy(i),U.vsub(P,U),U.vsub(n,U);const X=U.dot(S);S.scale(X,I);let J=0;for(;J===D%3||J===V%3;)J++;O.copy(i),O.vsub(I,O),O.vsub(P,O),O.vsub(n,O);const nt=Math.abs(X),ot=O.length();if(nt<f[J].length()&&ot<m){if(u)return!0;x=!0;const at=this.createContactEquation(a,c,t,e,l,h);P.vadd(I,at.rj),at.rj.copy(at.rj),O.negate(at.ni),at.ni.normalize(),at.ri.copy(at.rj),at.ri.vadd(n,at.ri),at.ri.vsub(i,at.ri),at.ri.normalize(),at.ri.scale(m,at.ri),at.ri.vadd(i,at.ri),at.ri.vsub(a.position,at.ri),at.rj.vadd(n,at.rj),at.rj.vsub(c.position,at.rj),this.result.push(at),this.createFrictionEquationsFromContact(at,this.frictionResult)}}d.release(S,P,U,I,O)}planeBox(t,e,i,n,s,r,a,c,l,h,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,i,n,s,r,a,c,t,e,u)}convexConvex(t,e,i,n,s,r,a,c,l,h,u,d,f){const m=vv;if(!(i.distanceTo(n)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,i,s,n,r,m,d,f)){const x=[],p=_v;t.clipAgainstHull(i,s,e,n,r,m,-100,100,x);let g=0;for(let v=0;v!==x.length;v++){if(u)return!0;const y=this.createContactEquation(a,c,t,e,l,h),_=y.ri,E=y.rj;m.negate(y.ni),x[v].normal.negate(p),p.scale(x[v].depth,p),x[v].point.vadd(p,_),E.copy(x[v].point),_.vsub(i,_),E.vsub(n,E),_.vadd(i,_),_.vsub(a.position,_),E.vadd(n,E),E.vsub(c.position,E),this.result.push(y),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(y,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}}sphereConvex(t,e,i,n,s,r,a,c,l,h,u){const d=this.v3pool;i.vsub(n,sv);const f=e.faceNormals,m=e.faces,x=e.vertices,p=t.radius;let g=!1;for(let v=0;v!==x.length;v++){const y=x[v],_=cv;r.vmult(y,_),n.vadd(_,_);const E=av;if(_.vsub(i,E),E.lengthSquared()<p*p){if(u)return!0;g=!0;const T=this.createContactEquation(a,c,t,e,l,h);T.ri.copy(E),T.ri.normalize(),T.ni.copy(T.ri),T.ri.scale(p,T.ri),_.vsub(n,T.rj),T.ri.vadd(i,T.ri),T.ri.vsub(a.position,T.ri),T.rj.vadd(n,T.rj),T.rj.vsub(c.position,T.rj),this.result.push(T),this.createFrictionEquationsFromContact(T,this.frictionResult);return}}for(let v=0,y=m.length;v!==y&&g===!1;v++){const _=f[v],E=m[v],T=lv;r.vmult(_,T);const C=hv;r.vmult(x[E[0]],C),C.vadd(n,C);const L=uv;T.scale(-p,L),i.vadd(L,L);const M=dv;L.vsub(C,M);const S=M.dot(T),P=fv;if(i.vsub(C,P),S<0&&P.dot(T)>0){const U=[];for(let I=0,O=E.length;I!==O;I++){const B=d.get();r.vmult(x[E[I]],B),n.vadd(B,B),U.push(B)}if(Kx(U,T,i)){if(u)return!0;g=!0;const I=this.createContactEquation(a,c,t,e,l,h);T.scale(-p,I.ri),T.negate(I.ni);const O=d.get();T.scale(-S,O);const B=d.get();T.scale(-p,B),i.vsub(n,I.rj),I.rj.vadd(B,I.rj),I.rj.vadd(O,I.rj),I.rj.vadd(n,I.rj),I.rj.vsub(c.position,I.rj),I.ri.vadd(i,I.ri),I.ri.vsub(a.position,I.ri),d.release(O),d.release(B),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult);for(let D=0,V=U.length;D!==V;D++)d.release(U[D]);return}else for(let I=0;I!==E.length;I++){const O=d.get(),B=d.get();r.vmult(x[E[(I+1)%E.length]],O),r.vmult(x[E[(I+2)%E.length]],B),n.vadd(O,O),n.vadd(B,B);const D=rv;B.vsub(O,D);const V=ov;D.unit(V);const X=d.get(),J=d.get();i.vsub(O,J);const nt=J.dot(V);V.scale(nt,X),X.vadd(O,X);const ot=d.get();if(X.vsub(i,ot),nt>0&&nt*nt<D.lengthSquared()&&ot.lengthSquared()<p*p){if(u)return!0;const at=this.createContactEquation(a,c,t,e,l,h);X.vsub(n,at.rj),X.vsub(i,at.ni),at.ni.normalize(),at.ni.scale(p,at.ri),at.rj.vadd(n,at.rj),at.rj.vsub(c.position,at.rj),at.ri.vadd(i,at.ri),at.ri.vsub(a.position,at.ri),this.result.push(at),this.createFrictionEquationsFromContact(at,this.frictionResult);for(let Ft=0,ae=U.length;Ft!==ae;Ft++)d.release(U[Ft]);d.release(O),d.release(B),d.release(X),d.release(ot),d.release(J);return}d.release(O),d.release(B),d.release(X),d.release(ot),d.release(J)}for(let I=0,O=U.length;I!==O;I++)d.release(U[I])}}}planeConvex(t,e,i,n,s,r,a,c,l,h,u){const d=pv,f=mv;f.set(0,0,1),s.vmult(f,f);let m=0;const x=gv;for(let p=0;p!==e.vertices.length;p++)if(d.copy(e.vertices[p]),r.vmult(d,d),n.vadd(d,d),d.vsub(i,x),f.dot(x)<=0){if(u)return!0;const v=this.createContactEquation(a,c,t,e,l,h),y=xv;f.scale(f.dot(x),y),d.vsub(y,y),y.vsub(i,v.ri),v.ni.copy(f),d.vsub(n,v.rj),v.ri.vadd(i,v.ri),v.ri.vsub(a.position,v.ri),v.rj.vadd(n,v.rj),v.rj.vsub(c.position,v.rj),this.result.push(v),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(v,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}boxConvex(t,e,i,n,s,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,i,n,s,r,a,c,t,e,u)}sphereHeightfield(t,e,i,n,s,r,a,c,l,h,u){const d=e.data,f=t.radius,m=e.elementSize,x=Iv,p=Pv;te.pointToLocalFrame(n,r,i,p);let g=Math.floor((p.x-f)/m)-1,v=Math.ceil((p.x+f)/m)+1,y=Math.floor((p.y-f)/m)-1,_=Math.ceil((p.y+f)/m)+1;if(v<0||_<0||g>d.length||y>d[0].length)return;g<0&&(g=0),v<0&&(v=0),y<0&&(y=0),_<0&&(_=0),g>=d.length&&(g=d.length-1),v>=d.length&&(v=d.length-1),_>=d[0].length&&(_=d[0].length-1),y>=d[0].length&&(y=d[0].length-1);const E=[];e.getRectMinMax(g,y,v,_,E);const T=E[0],C=E[1];if(p.z-f>C||p.z+f<T)return;const L=this.result;for(let M=g;M<v;M++)for(let S=y;S<_;S++){const P=L.length;let U=!1;if(e.getConvexTrianglePillar(M,S,!1),te.pointToWorldFrame(n,r,e.pillarOffset,x),i.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.sphereConvex(t,e.pillarConvex,i,x,s,r,a,c,t,e,u)),u&&U||(e.getConvexTrianglePillar(M,S,!0),te.pointToWorldFrame(n,r,e.pillarOffset,x),i.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.sphereConvex(t,e.pillarConvex,i,x,s,r,a,c,t,e,u)),u&&U))return!0;if(L.length-P>2)return}}boxHeightfield(t,e,i,n,s,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,i,n,s,r,a,c,t,e,u)}convexHeightfield(t,e,i,n,s,r,a,c,l,h,u){const d=e.data,f=e.elementSize,m=t.boundingSphereRadius,x=Cv,p=Rv,g=Av;te.pointToLocalFrame(n,r,i,g);let v=Math.floor((g.x-m)/f)-1,y=Math.ceil((g.x+m)/f)+1,_=Math.floor((g.y-m)/f)-1,E=Math.ceil((g.y+m)/f)+1;if(y<0||E<0||v>d.length||_>d[0].length)return;v<0&&(v=0),y<0&&(y=0),_<0&&(_=0),E<0&&(E=0),v>=d.length&&(v=d.length-1),y>=d.length&&(y=d.length-1),E>=d[0].length&&(E=d[0].length-1),_>=d[0].length&&(_=d[0].length-1);const T=[];e.getRectMinMax(v,_,y,E,T);const C=T[0],L=T[1];if(!(g.z-m>L||g.z+m<C))for(let M=v;M<y;M++)for(let S=_;S<E;S++){let P=!1;if(e.getConvexTrianglePillar(M,S,!1),te.pointToWorldFrame(n,r,e.pillarOffset,x),i.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.convexConvex(t,e.pillarConvex,i,x,s,r,a,c,null,null,u,p,null)),u&&P||(e.getConvexTrianglePillar(M,S,!0),te.pointToWorldFrame(n,r,e.pillarOffset,x),i.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.convexConvex(t,e.pillarConvex,i,x,s,r,a,c,null,null,u,p,null)),u&&P))return!0}}sphereParticle(t,e,i,n,s,r,a,c,l,h,u){const d=Sv;if(d.set(0,0,1),n.vsub(i,d),d.lengthSquared()<=t.radius*t.radius){if(u)return!0;const m=this.createContactEquation(c,a,e,t,l,h);d.normalize(),m.rj.copy(d),m.rj.scale(t.radius,m.rj),m.ni.copy(d),m.ni.negate(m.ni),m.ri.set(0,0,0),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}}planeParticle(t,e,i,n,s,r,a,c,l,h,u){const d=yv;d.set(0,0,1),a.quaternion.vmult(d,d);const f=Mv;if(n.vsub(a.position,f),d.dot(f)<=0){if(u)return!0;const x=this.createContactEquation(c,a,e,t,l,h);x.ni.copy(d),x.ni.negate(x.ni),x.ri.set(0,0,0);const p=wv;d.scale(d.dot(n),p),n.vsub(p,p),x.rj.copy(p),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}boxParticle(t,e,i,n,s,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,i,n,s,r,a,c,t,e,u)}convexParticle(t,e,i,n,s,r,a,c,l,h,u){let d=-1;const f=Ev,m=Tv;let x=null;const p=bv;if(p.copy(n),p.vsub(i,p),s.conjugate(cl),cl.vmult(p,p),t.pointIsInside(p)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(i,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let g=0,v=t.faces.length;g!==v;g++){const y=[t.worldVertices[t.faces[g][0]]],_=t.worldFaceNormals[g];n.vsub(y[0],ll);const E=-_.dot(ll);if(x===null||Math.abs(E)<Math.abs(x)){if(u)return!0;x=E,d=g,f.copy(_)}}if(d!==-1){const g=this.createContactEquation(c,a,e,t,l,h);f.scale(x,m),m.vadd(n,m),m.vsub(i,m),g.rj.copy(m),f.negate(g.ni),g.ri.set(0,0,0);const v=g.ri,y=g.rj;v.vadd(n,v),v.vsub(c.position,v),y.vadd(i,y),y.vsub(a.position,y),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,i,n,s,r,a,c,l,h,u){return this.convexHeightfield(e,t,n,i,r,s,c,a,l,h,u)}particleCylinder(t,e,i,n,s,r,a,c,l,h,u){return this.convexParticle(e,t,n,i,r,s,c,a,l,h,u)}sphereTrimesh(t,e,i,n,s,r,a,c,l,h,u){const d=Fx,f=Ux,m=Bx,x=Ox,p=zx,g=kx,v=Wx,y=Nx,_=Lx,E=qx;te.pointToLocalFrame(n,r,i,p);const T=t.radius;v.lowerBound.set(p.x-T,p.y-T,p.z-T),v.upperBound.set(p.x+T,p.y+T,p.z+T),e.getTrianglesInAABB(v,E);const C=Dx,L=t.radius*t.radius;for(let I=0;I<E.length;I++)for(let O=0;O<3;O++)if(e.getVertex(e.indices[E[I]*3+O],C),C.vsub(p,_),_.lengthSquared()<=L){if(y.copy(C),te.pointToWorldFrame(n,r,y,C),C.vsub(i,_),u)return!0;let B=this.createContactEquation(a,c,t,e,l,h);B.ni.copy(_),B.ni.normalize(),B.ri.copy(B.ni),B.ri.scale(t.radius,B.ri),B.ri.vadd(i,B.ri),B.ri.vsub(a.position,B.ri),B.rj.copy(C),B.rj.vsub(c.position,B.rj),this.result.push(B),this.createFrictionEquationsFromContact(B,this.frictionResult)}for(let I=0;I<E.length;I++)for(let O=0;O<3;O++){e.getVertex(e.indices[E[I]*3+O],d),e.getVertex(e.indices[E[I]*3+(O+1)%3],f),f.vsub(d,m),p.vsub(f,g);const B=g.dot(m);p.vsub(d,g);let D=g.dot(m);if(D>0&&B<0&&(p.vsub(d,g),x.copy(m),x.normalize(),D=g.dot(x),x.scale(D,g),g.vadd(d,g),g.distanceTo(p)<t.radius)){if(u)return!0;const X=this.createContactEquation(a,c,t,e,l,h);g.vsub(p,X.ni),X.ni.normalize(),X.ni.scale(t.radius,X.ri),X.ri.vadd(i,X.ri),X.ri.vsub(a.position,X.ri),te.pointToWorldFrame(n,r,g,g),g.vsub(c.position,X.rj),te.vectorToWorldFrame(r,X.ni,X.ni),te.vectorToWorldFrame(r,X.ri,X.ri),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult)}}const M=Gx,S=Vx,P=Hx,U=Ix;for(let I=0,O=E.length;I!==O;I++){e.getTriangleVertices(E[I],M,S,P),e.getNormal(E[I],U),p.vsub(M,g);let B=g.dot(U);if(U.scale(B,g),p.vsub(g,g),B=g.distanceTo(p),Te.pointInTriangle(g,M,S,P)&&B<t.radius){if(u)return!0;let D=this.createContactEquation(a,c,t,e,l,h);g.vsub(p,D.ni),D.ni.normalize(),D.ni.scale(t.radius,D.ri),D.ri.vadd(i,D.ri),D.ri.vsub(a.position,D.ri),te.pointToWorldFrame(n,r,g,g),g.vsub(c.position,D.rj),te.vectorToWorldFrame(r,D.ni,D.ni),te.vectorToWorldFrame(r,D.ri,D.ri),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}}E.length=0}planeTrimesh(t,e,i,n,s,r,a,c,l,h,u){const d=new b,f=Cx;f.set(0,0,1),s.vmult(f,f);for(let m=0;m<e.vertices.length/3;m++){e.getVertex(m,d);const x=new b;x.copy(d),te.pointToWorldFrame(n,r,x,d);const p=Rx;if(d.vsub(i,p),f.dot(p)<=0){if(u)return!0;const v=this.createContactEquation(a,c,t,e,l,h);v.ni.copy(f);const y=Px;f.scale(p.dot(f),y),d.vsub(y,y),v.ri.copy(y),v.ri.vsub(a.position,v.ri),v.rj.copy(d),v.rj.vsub(c.position,v.rj),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}}}const fn=new b,Bn=new b,On=new b,bx=new b,Ex=new b,Tx=new we,Ax=new we,Cx=new b,Rx=new b,Px=new b,Ix=new b,Lx=new b;new b;const Dx=new b,Nx=new b,Fx=new b,Ux=new b,Bx=new b,Ox=new b,zx=new b,kx=new b,Gx=new b,Vx=new b,Hx=new b,Wx=new ti,qx=[],ar=new b,al=new b,Xx=new b,Yx=new b,Zx=new b;function Kx(o,t,e){let i=null;const n=o.length;for(let s=0;s!==n;s++){const r=o[s],a=Xx;o[(s+1)%n].vsub(r,a);const c=Yx;a.cross(t,c);const l=Zx;e.vsub(r,l);const h=c.dot(l);if(i===null||h>0&&i===!0||h<=0&&i===!1){i===null&&(i=h>0);continue}else return!1}return!0}const cr=new b,jx=new b,$x=new b,Jx=new b,Qx=[new b,new b,new b,new b,new b,new b],tv=new b,ev=new b,iv=new b,nv=new b,sv=new b,rv=new b,ov=new b,av=new b,cv=new b,lv=new b,hv=new b,uv=new b,dv=new b,fv=new b;new b;new b;const pv=new b,mv=new b,gv=new b,xv=new b,vv=new b,_v=new b,yv=new b,Mv=new b,wv=new b,Sv=new b,cl=new we,bv=new b;new b;const Ev=new b,ll=new b,Tv=new b,Av=new b,Cv=new b,Rv=[0],Pv=new b,Iv=new b;class hl{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const i=e;e=t,t=i}return t<<16|e}set(t,e){const i=this.getKey(t,e),n=this.current;let s=0;for(;i>n[s];)s++;if(i!==n[s]){for(let r=n.length-1;r>=s;r--)n[r+1]=n[r];n[s]=i}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const i=this.current,n=this.previous,s=i.length,r=n.length;let a=0;for(let c=0;c<s;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=h===n[a],l||ul(t,h)}a=0;for(let c=0;c<r;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=i[a]===h,l||ul(e,h)}}}function ul(o,t){o.push((t&4294901760)>>16,t&65535)}const mo=(o,t)=>o<t?`${o}-${t}`:`${t}-${o}`;class Lv{constructor(){this.data={keys:[]}}get(t,e){const i=mo(t,e);return this.data[i]}set(t,e,i){const n=mo(t,e);this.get(t,e)||this.data.keys.push(n),this.data[n]=i}delete(t,e){const i=mo(t,e),n=this.data.keys.indexOf(i);n!==-1&&this.data.keys.splice(n,1),delete this.data[i]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const i=e.pop();delete t[i]}}}class Dv extends nh{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new b,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new b,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new sh,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new xx,this.constraints=[],this.narrowphase=new Sx(this),this.collisionMatrix=new jc,this.collisionMatrixPrevious=new jc,this.bodyOverlapKeeper=new hl,this.shapeOverlapKeeper=new hl,this.contactmaterials=[],this.contactMaterialTable=new Lv,this.defaultMaterial=new Qe("default"),this.defaultContactMaterial=new Er(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,i){i instanceof _r?this.raycastClosest(t,e,{skipBackfaces:!0},i):this.raycastAll(t,e,{skipBackfaces:!0},i)}raycastAll(t,e,i,n){return i===void 0&&(i={}),i.mode=Te.ALL,i.from=t,i.to=e,i.callback=n,go.intersectWorld(this,i)}raycastAny(t,e,i,n){return i===void 0&&(i={}),i.mode=Te.ANY,i.from=t,i.to=e,i.result=n,go.intersectWorld(this,i)}raycastClosest(t,e,i,n){return i===void 0&&(i={}),i.mode=Te.CLOSEST,i.from=t,i.to=e,i.result=n,go.intersectWorld(this,i)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof st&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,i=this.bodies,n=i.indexOf(t);if(n!==-1){i.splice(n,1);for(let s=0;s!==i.length;s++)i[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let i=0;i<e.length;i++){const n=e[i].shapes;for(let s=0;s<n.length;s++){const r=n[s];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const i=Ae.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const n=i-this.lastCallTime;this.step(t,n,e)}this.lastCallTime=i}step(t,e,i){if(i===void 0&&(i=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const n=Ae.now();let s=0;for(;this.accumulator>=t&&s<i&&(this.internalStep(t),this.accumulator-=t,s++,!(Ae.now()-n>t*1e3)););this.accumulator=this.accumulator%t;const r=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,r,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,r,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,i=Ov,n=zv,s=this.bodies.length,r=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,u=st.DYNAMIC;let d=-1/0;const f=this.constraints,m=Bv;c.length();const x=c.x,p=c.y,g=c.z;let v=0;for(l&&(d=Ae.now()),v=0;v!==s;v++){const I=r[v];if(I.type===u){const O=I.force,B=I.mass;O.x+=B*x,O.y+=B*p,O.z+=B*g}}for(let I=0,O=this.subsystems.length;I!==O;I++)this.subsystems[I].update();l&&(d=Ae.now()),i.length=0,n.length=0,this.broadphase.collisionPairs(this,i,n),l&&(h.broadphase=Ae.now()-d);let y=f.length;for(v=0;v!==y;v++){const I=f[v];if(!I.collideConnected)for(let O=i.length-1;O>=0;O-=1)(I.bodyA===i[O]&&I.bodyB===n[O]||I.bodyB===i[O]&&I.bodyA===n[O])&&(i.splice(O,1),n.splice(O,1))}this.collisionMatrixTick(),l&&(d=Ae.now());const _=Uv,E=e.length;for(v=0;v!==E;v++)_.push(e[v]);e.length=0;const T=this.frictionEquations.length;for(v=0;v!==T;v++)m.push(this.frictionEquations[v]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(i,n,this,e,_,this.frictionEquations,m),l&&(h.narrowphase=Ae.now()-d),l&&(d=Ae.now()),v=0;v<this.frictionEquations.length;v++)a.addEquation(this.frictionEquations[v]);const C=e.length;for(let I=0;I!==C;I++){const O=e[I],B=O.bi,D=O.bj,V=O.si,X=O.sj;let J;if(B.material&&D.material?J=this.getContactMaterial(B.material,D.material)||this.defaultContactMaterial:J=this.defaultContactMaterial,J.friction,B.material&&D.material&&(B.material.friction>=0&&D.material.friction>=0&&B.material.friction*D.material.friction,B.material.restitution>=0&&D.material.restitution>=0&&(O.restitution=B.material.restitution*D.material.restitution)),a.addEquation(O),B.allowSleep&&B.type===st.DYNAMIC&&B.sleepState===st.SLEEPING&&D.sleepState===st.AWAKE&&D.type!==st.STATIC){const nt=D.velocity.lengthSquared()+D.angularVelocity.lengthSquared(),ot=D.sleepSpeedLimit**2;nt>=ot*2&&(B.wakeUpAfterNarrowphase=!0)}if(D.allowSleep&&D.type===st.DYNAMIC&&D.sleepState===st.SLEEPING&&B.sleepState===st.AWAKE&&B.type!==st.STATIC){const nt=B.velocity.lengthSquared()+B.angularVelocity.lengthSquared(),ot=B.sleepSpeedLimit**2;nt>=ot*2&&(D.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(B,D,!0),this.collisionMatrixPrevious.get(B,D)||(us.body=D,us.contact=O,B.dispatchEvent(us),us.body=B,D.dispatchEvent(us)),this.bodyOverlapKeeper.set(B.id,D.id),this.shapeOverlapKeeper.set(V.id,X.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Ae.now()-d,d=Ae.now()),v=0;v!==s;v++){const I=r[v];I.wakeUpAfterNarrowphase&&(I.wakeUp(),I.wakeUpAfterNarrowphase=!1)}for(y=f.length,v=0;v!==y;v++){const I=f[v];I.update();for(let O=0,B=I.equations.length;O!==B;O++){const D=I.equations[O];a.addEquation(D)}}a.solve(t,this),l&&(h.solve=Ae.now()-d),a.removeAllEquations();const L=Math.pow;for(v=0;v!==s;v++){const I=r[v];if(I.type&u){const O=L(1-I.linearDamping,t),B=I.velocity;B.scale(O,B);const D=I.angularVelocity;if(D){const V=L(1-I.angularDamping,t);D.scale(V,D)}}}this.dispatchEvent(Fv),l&&(d=Ae.now());const S=this.stepnumber%(this.quatNormalizeSkip+1)===0,P=this.quatNormalizeFast;for(v=0;v!==s;v++)r[v].integrate(t,S,P);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Ae.now()-d),this.stepnumber+=1,this.dispatchEvent(Nv);let U=!0;if(this.allowSleep)for(U=!1,v=0;v!==s;v++){const I=r[v];I.sleepTick(this.time),I.sleepState!==st.SLEEPING&&(U=!0)}this.hasActiveBodies=U}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Ni,Fi),t){for(let s=0,r=Ni.length;s<r;s+=2)ds.bodyA=this.getBodyById(Ni[s]),ds.bodyB=this.getBodyById(Ni[s+1]),this.dispatchEvent(ds);ds.bodyA=ds.bodyB=null}if(e){for(let s=0,r=Fi.length;s<r;s+=2)fs.bodyA=this.getBodyById(Fi[s]),fs.bodyB=this.getBodyById(Fi[s+1]),this.dispatchEvent(fs);fs.bodyA=fs.bodyB=null}Ni.length=Fi.length=0;const i=this.hasAnyEventListener("beginShapeContact"),n=this.hasAnyEventListener("endShapeContact");if((i||n)&&this.shapeOverlapKeeper.getDiff(Ni,Fi),i){for(let s=0,r=Ni.length;s<r;s+=2){const a=this.getShapeById(Ni[s]),c=this.getShapeById(Ni[s+1]);Ui.shapeA=a,Ui.shapeB=c,a&&(Ui.bodyA=a.body),c&&(Ui.bodyB=c.body),this.dispatchEvent(Ui)}Ui.bodyA=Ui.bodyB=Ui.shapeA=Ui.shapeB=null}if(n){for(let s=0,r=Fi.length;s<r;s+=2){const a=this.getShapeById(Fi[s]),c=this.getShapeById(Fi[s+1]);Bi.shapeA=a,Bi.shapeB=c,a&&(Bi.bodyA=a.body),c&&(Bi.bodyB=c.body),this.dispatchEvent(Bi)}Bi.bodyA=Bi.bodyB=Bi.shapeA=Bi.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let i=0;i!==e;i++){const n=t[i];n.force,n.torque,n.force.set(0,0,0),n.torque.set(0,0,0)}}}new ti;const go=new Te,Ae=globalThis.performance||{};if(!Ae.now){let o=Date.now();Ae.timing&&Ae.timing.navigationStart&&(o=Ae.timing.navigationStart),Ae.now=()=>Date.now()-o}new b;const Nv={type:"postStep"},Fv={type:"preStep"},us={type:st.COLLIDE_EVENT_NAME,body:null,contact:null},Uv=[],Bv=[],Ov=[],zv=[],Ni=[],Fi=[],ds={type:"beginContact",bodyA:null,bodyB:null},fs={type:"endContact",bodyA:null,bodyB:null},Ui={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Bi={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class kv{constructor(t,e){this.scene=t,this.world=e,this.radius=.5,this.mass=7,this.maxSpeed=15,this.accelerationRate=3,this.decelerationRate=4,this.currentSpeed=0,this.turnSensitivity=8,this.hasShield=!1,this.isBoosted=!1,this.isGiant=!1,this.createMesh(),this.createBody()}createMesh(){const t=new pe(this.radius,32,32),e=new Lt({color:1710638,roughness:.3,metalness:.7});this.mesh=new q(t,e),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.scene.add(this.mesh);const i=new ts(this.radius*.7,.03,8,32),n=new Lt({color:15158332,roughness:.3});this.stripe=new q(i,n),this.stripe.rotation.x=Math.PI/2,this.mesh.add(this.stripe)}createBody(){const t=new Zn(this.radius);this.body=new st({mass:this.mass,shape:t,material:new Qe({friction:.3,restitution:.5}),linearDamping:.1,angularDamping:.3}),this.world.addBody(this.body)}reset(){this.body.position.set(0,1,0),this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.body.quaternion.set(0,0,0,1),this.currentSpeed=0,this.hasShield=!1,this.isBoosted=!1,this.setGiant(!1),this.update()}applyTiltForce(t,e){Math.random()<.02&&console.log("Tilt:",t.beta.toFixed(1),t.gamma.toFixed(1),"Speed:",this.currentSpeed.toFixed(1));const i=Math.max(0,-t.beta)/45,n=Math.max(0,t.beta)/45;i>.05?(this.currentSpeed+=this.accelerationRate*i*e,this.currentSpeed=Math.min(this.currentSpeed,this.maxSpeed)):n>.1?(this.currentSpeed-=this.decelerationRate*n*e,this.currentSpeed=Math.max(this.currentSpeed,0)):this.currentSpeed*=.99;const s=this.currentSpeed*2;this.body.velocity.z=s;const r=-t.gamma/45*this.turnSensitivity,a=Math.max(.3,this.currentSpeed/this.maxSpeed);this.body.velocity.x=r*a;const c=this.body.velocity.z/this.radius,l=-this.body.velocity.x/this.radius;this.body.angularVelocity.set(c,0,l)}update(){this.mesh.position.copy(this.body.position),this.mesh.quaternion.copy(this.body.quaternion)}getPosition(){return this.body.position}getVelocity(){return this.body.velocity}getSpeedPercent(){return this.currentSpeed/this.maxSpeed*100}boost(t=1.5,e=3e3){this.isBoosted||(this.isBoosted=!0,this.currentSpeed=Math.min(this.currentSpeed*t,this.maxSpeed),setTimeout(()=>{this.isBoosted=!1},e))}activateShield(){this.hasShield=!0,this.mesh.material.emissive=new Ot(3447003),this.mesh.material.emissiveIntensity=.3}consumeShield(){return this.hasShield?(this.hasShield=!1,this.mesh.material.emissive=new Ot(0),!0):!1}setGiant(t){this.isGiant=t;const e=t?2:1;this.mesh.scale.set(e,e,e),this.body.shapes[0].radius=this.radius*e,this.body.updateBoundingRadius()}setShrunk(t){this.isShrunk=t;const e=t?.5:1;this.mesh.scale.set(e,e,e),this.body.shapes[0].radius=this.radius*e,this.body.updateBoundingRadius(),t?(this.mesh.material.color.setHex(16738740),this.mesh.material.emissive=new Ot(16711935),this.mesh.material.emissiveIntensity=.3):(this.mesh.material.color.setHex(1710638),this.mesh.material.emissive=new Ot(0),this.mesh.material.emissiveIntensity=0)}setSlip(t){this.isSlipping=t,t?(this.body.linearDamping=.01,this.turnSensitivity=3,this.mesh.material.emissive=new Ot(240116),this.mesh.material.emissiveIntensity=.3):(this.body.linearDamping=.1,this.turnSensitivity=8,!this.hasShield&&!this.isShrunk&&!this.isSlowed&&(this.mesh.material.emissive=new Ot(0),this.mesh.material.emissiveIntensity=0))}slowDown(t=.3,e=6e3){if(this.isSlowed)return;this.isSlowed=!0;const i=this.maxSpeed,n=this.accelerationRate;this.maxSpeed*=t,this.accelerationRate*=t,this.currentSpeed=Math.min(this.currentSpeed,this.maxSpeed),this.mesh.material.emissive=new Ot(65535),this.mesh.material.emissiveIntensity=.4,setTimeout(()=>{this.isSlowed=!1,this.maxSpeed=i,this.accelerationRate=n,!this.hasShield&&!this.isShrunk&&(this.mesh.material.emissive=new Ot(0),this.mesh.material.emissiveIntensity=0)},e)}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Gv{constructor(t,e,i,n,s){this.scene=t,this.world=e,this.index=s,this.initialPosition={x:i,z:n},this.height=1.5,this.radiusTop=.1,this.radiusMiddle=.25,this.radiusBottom=.18,this.mass=1.2,this.knockedThreshold=.3,this.createMesh(),this.createBody(i,n)}createMesh(){const t=new Ne,e=new ve(this.radiusTop,this.radiusMiddle,this.height*.6,16),i=new Lt({color:16777215,roughness:.4,metalness:.1}),n=new q(e,i);n.position.y=this.height*.3,n.castShadow=!0,t.add(n);const s=new ve(this.radiusMiddle,this.radiusBottom,this.height*.4,16),r=new q(s,i);r.position.y=-this.height*.1,r.castShadow=!0,t.add(r);const a=new ve(this.radiusMiddle+.01,this.radiusMiddle+.01,.15,16),c=new Lt({color:15158332,roughness:.4}),l=new q(a,c);l.position.y=this.height*.1,t.add(l);const h=new q(a,c);h.position.y=this.height*.25,t.add(h),this.mesh=t,this.scene.add(this.mesh)}createBody(t,e){const i=new sn(this.radiusTop,this.radiusMiddle,this.height,8);this.body=new st({mass:this.mass,shape:i,material:new Qe({friction:.4,restitution:.55}),linearDamping:.05,angularDamping:.08});const n=new we;n.setFromAxisAngle(new b(1,0,0),0),this.body.quaternion.copy(n),this.body.position.set(t,this.height/2,e),this.world.addBody(this.body)}update(){this.mesh.position.copy(this.body.position),this.mesh.quaternion.copy(this.body.quaternion)}isKnocked(){const t=new fi().setFromQuaternion(new $n(this.body.quaternion.x,this.body.quaternion.y,this.body.quaternion.z,this.body.quaternion.w)),e=Math.abs(t.x),i=Math.abs(t.z),n=this.body.position.y<this.height*.3;return e>this.knockedThreshold||i>this.knockedThreshold||n}reset(){this.body.position.set(this.initialPosition.x,this.height/2,this.initialPosition.z),this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.body.quaternion.set(0,0,0,1),this.update()}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Vv{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.position={x:i,z:n},this.radius=s.radius||.8,this.height=s.height||.6,this.bounciness=s.bounciness||3.5,this.color=s.color||16739179,this.bounceForce=s.bounceForce||18,this.pulsePhase=Math.random()*Math.PI*2,this.isActive=!0,this.cooldown=0,this.onHit=s.onHit||null,this.createMesh(),this.createBody()}createMesh(){const t=new ve(this.radius,this.radius*1.1,this.height,24),e=new Lt({color:this.color,roughness:.3,metalness:.6,emissive:this.color,emissiveIntensity:.2});this.mesh=new q(t,e),this.mesh.position.set(this.position.x,this.height/2,this.position.z),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0;const i=new ts(this.radius*.9,.05,8,24),n=new xt({color:16777215,transparent:!0,opacity:.8});this.ring=new q(i,n),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=this.height/2+.02,this.mesh.add(this.ring);const s=new Qi(this.radius*.7,24),r=new xt({color:16777215,transparent:!0,opacity:.4});this.glow=new q(s,r),this.glow.rotation.x=-Math.PI/2,this.glow.position.y=this.height/2+.03,this.mesh.add(this.glow),this.scene.add(this.mesh)}createBody(){const t=new sn(this.radius,this.radius*1.1,this.height,12);this.body=new st({mass:0,shape:t,material:new Qe({friction:.1,restitution:this.bounciness}),position:new b(this.position.x,this.height/2,this.position.z)}),this.body.addEventListener("collide",e=>{this.isActive&&this.cooldown<=0&&this.triggerBounce(e)}),this.world.addBody(this.body)}triggerBounce(t){this.cooldown=.25;const e=t.body;if(e&&e.mass>0){const i=e.position.x-this.position.x,n=e.position.z-this.position.z,s=Math.sqrt(i*i+n*n)||1,r=(Math.random()-.5)*Math.PI/3,a=Math.cos(r),c=Math.sin(r),l=i/s*a-n/s*c,h=i/s*c+n/s*a,u=new b(l*this.bounceForce,8+Math.random()*5,h*this.bounceForce);e.velocity.copy(u)}this.mesh.scale.set(1.5,.5,1.5),this.mesh.position.y=this.height/2-.1,this.mesh.material.emissiveIntensity=1.5,this.mesh.material.color.setHex(16777215),this.glow.material.opacity=1,this.ring.material.opacity=1,this.ring.scale.set(1.5,1.5,1),setTimeout(()=>{this.mesh.material.color.setHex(this.color)},80),this.onHit&&this.onHit(this)}update(t){this.cooldown>0&&(this.cooldown-=t),this.mesh.scale.x+=(1-this.mesh.scale.x)*.15,this.mesh.scale.y+=(1-this.mesh.scale.y)*.15,this.mesh.scale.z+=(1-this.mesh.scale.z)*.15,this.mesh.position.y+=(this.height/2-this.mesh.position.y)*.15,this.mesh.material.emissiveIntensity+=(.3-this.mesh.material.emissiveIntensity)*.1,this.glow.material.opacity+=(.5-this.glow.material.opacity)*.1,this.ring.material.opacity+=(.8-this.ring.material.opacity)*.1,this.pulsePhase+=t*4;const e=1+Math.sin(this.pulsePhase)*.08;this.ring.scale.x+=(e-this.ring.scale.x)*.2,this.ring.scale.y+=(e-this.ring.scale.y)*.2}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Hv{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.initialPosition={x:i,z:n},this.position={x:i,z:n},this.speed=s.speed||8,this.detectionRadius=s.detectionRadius||10,this.attackRadius=s.attackRadius||1.5,this.state="idle",this.targetBall=null,this.onAttack=s.onAttack||null,this.hasCaughtBall=!1,this.animationTime=0,this.tailPhase=Math.random()*Math.PI*2,this.idleWanderAngle=0,this.idleWanderTarget=null,this.createMesh(),this.createBody()}createMesh(){this.mesh=new Ne;const t=new Ta(.3,.6,8,16),e=new Lt({color:16747520,roughness:.8}),i=new q(t,e);i.rotation.x=Math.PI/2,i.position.y=.4,this.mesh.add(i);const n=new pe(.25,16,16),s=new q(n,e);s.position.set(0,.5,.5),this.head=s,this.mesh.add(s);const r=new nn(.1,.2,4),a=new q(r,e);a.position.set(-.15,.7,.45),a.rotation.z=-.2,this.mesh.add(a);const c=new q(r,e);c.position.set(.15,.7,.45),c.rotation.z=.2,this.mesh.add(c);const l=new pe(.08,8,8),h=new xt({color:65280}),u=new q(l,h);u.position.set(-.1,.55,.7),this.leftEye=u,this.mesh.add(u);const d=new q(l,h);d.position.set(.1,.55,.7),this.rightEye=d,this.mesh.add(d);const f=new pe(.04,8,8),m=new xt({color:0}),x=new q(f,m);x.position.set(0,0,.05),u.add(x);const p=new q(f,m);p.position.set(0,0,.05),d.add(p);const g=new ve(.05,.08,.6,8);this.tail=new q(g,e),this.tail.position.set(0,.5,-.5),this.tail.rotation.x=-.5,this.mesh.add(this.tail);const v=new ve(.06,.05,.3,8),y=[{x:-.2,z:.2},{x:.2,z:.2},{x:-.2,z:-.2},{x:.2,z:-.2}];this.legs=[],y.forEach(_=>{const E=new q(v,e);E.position.set(_.x,.15,_.z),this.legs.push(E),this.mesh.add(E)}),this.mesh.position.set(this.position.x,0,this.position.z),this.mesh.castShadow=!0,this.scene.add(this.mesh)}createBody(){const t=new Zn(.4);this.body=new st({mass:0,shape:t,type:st.KINEMATIC,position:new b(this.position.x,.4,this.position.z)}),this.world.addBody(this.body)}setTarget(t){this.targetBall=t}update(t,e,i){if(this.animationTime+=t,this.tailPhase+=t*5,this.tail.rotation.z=Math.sin(this.tailPhase)*.5,!e||this.hasCaughtBall){this.idleAnimation(t);return}const n=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2)),s=i?Math.sqrt(i.x*i.x+i.y*i.y+i.z*i.z):0,r=e.y>1,a=s>12&&n>5,c=r||a;switch(c&&(this.state==="stalking"||this.state==="pouncing")&&(this.state="returning",this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1)),this.state){case"idle":this.idleAnimation(t),n<this.detectionRadius&&e.z>this.position.z-5&&!c&&(this.state="stalking",this.leftEye.scale.set(1.3,1.3,1.3),this.rightEye.scale.set(1.3,1.3,1.3));break;case"stalking":const l=e.z+i.z*.5,u=e.x+i.x*.5-this.position.x,d=l-this.position.z,f=Math.sqrt(u*u+d*d);if(f>.1){const C=this.speed*t;this.position.x+=u/f*C,this.position.z+=d/f*C,this.mesh.rotation.y=Math.atan2(u,d)}this.mesh.position.y=0+Math.sin(this.animationTime*15)*.05,n<this.attackRadius&&(this.state="pouncing",this.pounceStartY=0,this.pounceTime=0);break;case"pouncing":this.pounceTime+=t;const x=this.pounceTime/.3,p=Math.sin(x*Math.PI)*1.5;this.mesh.position.y=p,this.mesh.rotation.x=-x*Math.PI*.5;const g=e.x-this.position.x,v=e.z-this.position.z,y=Math.sqrt(g*g+v*v);if(y>.1){const C=this.speed*2*t;this.position.x+=g/y*C,this.position.z+=v/y*C}(x>=1||n<.5)&&(n<1&&(this.hasCaughtBall=!0,this.onAttack&&this.onAttack(this)),this.state="returning",this.mesh.rotation.x=0);break;case"returning":const _=this.initialPosition.x-this.position.x,E=this.initialPosition.z-this.position.z,T=Math.sqrt(_*_+E*E);if(T>.5){const C=this.speed*.5*t;this.position.x+=_/T*C,this.position.z+=E/T*C,this.mesh.rotation.y=Math.atan2(_,E)}else this.state="idle",this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1);this.mesh.position.y=0;break}this.mesh.position.x=this.position.x,this.mesh.position.z=this.position.z,this.body.position.set(this.position.x,.4,this.position.z),(this.state==="stalking"||this.state==="returning")&&this.legs.forEach((l,h)=>{l.position.y=.15+Math.sin(this.animationTime*20+h*Math.PI)*.1})}idleAnimation(t){(!this.idleWanderTarget||Math.random()<.01)&&(this.idleWanderAngle=Math.random()*Math.PI*2,this.idleWanderTarget={x:this.initialPosition.x+Math.cos(this.idleWanderAngle)*2,z:this.initialPosition.z+Math.sin(this.idleWanderAngle)*2});const e=this.idleWanderTarget.x-this.position.x,i=this.idleWanderTarget.z-this.position.z,n=Math.sqrt(e*e+i*i);if(n>.3){const s=this.speed*.3*t;this.position.x+=e/n*s,this.position.z+=i/n*s,this.mesh.rotation.y=Math.atan2(e,i),this.legs.forEach((r,a)=>{r.position.y=.15+Math.sin(this.animationTime*10+a*Math.PI)*.05})}this.mesh.position.x=this.position.x,this.mesh.position.z=this.position.z,this.body.position.set(this.position.x,.4,this.position.z)}reset(){this.position={...this.initialPosition},this.state="idle",this.hasCaughtBall=!1,this.mesh.position.set(this.position.x,0,this.position.z),this.mesh.rotation.set(0,0,0),this.body.position.set(this.position.x,.4,this.position.z),this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1)}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Wv{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.position={x:i,z:n},this.radius=s.radius||1.2,this.launchForce=s.launchForce||25,this.launchAngle=s.launchAngle||Math.PI/4,this.onLaunch=s.onLaunch||null,this.cooldown=0,this.isCharged=!0,this.chargeTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new Ne;const t=new ve(this.radius,this.radius*1.2,.3,24),e=new Lt({color:3447003,roughness:.3,metalness:.7}),i=new q(t,e);i.position.y=.15,this.mesh.add(i);const n=new ts(this.radius*.6,.08,8,24),s=new Lt({color:15158332,roughness:.4,metalness:.8});for(let m=0;m<3;m++){const x=new q(n,s);x.rotation.x=Math.PI/2,x.position.y=.35+m*.15,x.scale.set(1-m*.1,1-m*.1,1),this.mesh.add(x)}const r=new ve(this.radius*.9,this.radius*.9,.15,24),a=new Lt({color:15965202,roughness:.2,metalness:.9,emissive:15965202,emissiveIntensity:.3});this.plate=new q(r,a),this.plate.position.y=.8,this.mesh.add(this.plate);const c=new Rs;c.moveTo(0,.4),c.lineTo(-.2,0),c.lineTo(-.08,0),c.lineTo(-.08,-.4),c.lineTo(.08,-.4),c.lineTo(.08,0),c.lineTo(.2,0),c.closePath();const l=new Qn(c),h=new xt({color:65280,side:Yt});this.arrow=new q(l,h),this.arrow.rotation.x=-Math.PI/2,this.arrow.position.y=.9,this.mesh.add(this.arrow);const u=new pi(this.radius*.8,this.radius*1,24),d=new xt({color:65280,transparent:!0,opacity:.5,side:Yt});this.glow=new q(u,d),this.glow.rotation.x=-Math.PI/2,this.glow.position.y=.02,this.mesh.add(this.glow),this.particles=[];const f=new xt({color:65280,transparent:!0,opacity:.8});for(let m=0;m<8;m++){const x=new pe(.05,8,8),p=new q(x,f.clone());p.userData={angle:m/8*Math.PI*2,speed:1+Math.random()*.5,height:Math.random()},this.particles.push(p),this.mesh.add(p)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new sn(this.radius*.9,this.radius*.9,.3,12);this.body=new st({mass:0,shape:t,position:new b(this.position.x,.8,this.position.z)}),this.body.addEventListener("collide",e=>{this.isCharged&&this.cooldown<=0&&this.triggerLaunch(e.body)}),this.world.addBody(this.body)}triggerLaunch(t){this.isCharged=!1,this.cooldown=2;const e=new b(0,Math.sin(this.launchAngle)*this.launchForce,Math.cos(this.launchAngle)*this.launchForce);return t&&t.mass>0&&t.velocity.copy(e),this.plate.position.y=.4,this.plate.material.emissiveIntensity=1,this.arrow.material.color.setHex(16776960),this.onLaunch&&this.onLaunch(this,this.launchForce),e}update(t,e){if(this.cooldown>0&&(this.cooldown-=t,this.cooldown<=0&&(this.isCharged=!0)),this.plate.position.y+=(.8-this.plate.position.y)*.1,this.plate.material.emissiveIntensity+=(.3-this.plate.material.emissiveIntensity)*.1,this.isCharged){const i=Math.sin(Date.now()*.005)*.3+.5;this.glow.material.opacity=i,this.glow.material.color.setHex(65280),this.arrow.material.color.setHex(65280),this.particles.forEach(n=>{n.visible=!0,n.userData.angle+=t*n.userData.speed*3,n.userData.height+=t*2,n.userData.height>1.5&&(n.userData.height=0);const s=this.radius*.5*(1-n.userData.height/1.5);n.position.x=Math.cos(n.userData.angle)*s,n.position.z=Math.sin(n.userData.angle)*s,n.position.y=.3+n.userData.height,n.material.opacity=1-n.userData.height/1.5})}else this.glow.material.opacity=.2,this.glow.material.color.setHex(16737792),this.particles.forEach(i=>i.visible=!1);this.arrow.position.y=.9+Math.sin(Date.now()*.004)*.1}reset(){this.isCharged=!0,this.cooldown=0,this.plate.position.y=.8}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class qv{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.position={x:i,z:n},this.radius=s.radius||2,this.pullStrength=s.pullStrength||8,this.spinSpeed=s.spinSpeed||5,this.onCapture=s.onCapture||null,this.onRelease=s.onRelease||null,this.state="idle",this.capturedBall=null,this.spinAngle=0,this.spinTime=0,this.releaseDirection={x:0,z:1},this.createMesh(),this.createTrigger()}createMesh(){this.mesh=new Ne,this.rings=[];const t=[10181046,9323693,7091331,5975151];for(let u=0;u<4;u++){const d=new pi(this.radius*(.3+u*.2),this.radius*(.4+u*.2),32),f=new xt({color:t[u],transparent:!0,opacity:.6-u*.1,side:Yt}),m=new q(d,f);m.rotation.x=-Math.PI/2,m.position.y=.05+u*.02,m.userData={rotationSpeed:(4-u)*.5},this.rings.push(m),this.mesh.add(m)}const e=new Qi(this.radius*.3,24),i=new xt({color:1706542,side:Yt}),n=new q(e,i);n.rotation.x=-Math.PI/2,n.position.y=.01,this.mesh.add(n),this.spiralParticles=[];const s=new xt({color:14702333,transparent:!0,opacity:.8});for(let u=0;u<20;u++){const d=new pe(.08,8,8),f=new q(d,s.clone());f.userData={angle:u/20*Math.PI*2,radius:this.radius*.3+u/20*this.radius*.6,height:Math.random()*.5,speed:2+Math.random()},this.spiralParticles.push(f),this.mesh.add(f)}const r=new pi(this.radius,this.radius+.2,32),a=new xt({color:10181046,transparent:!0,opacity:.4,side:Yt});this.outerGlow=new q(r,a),this.outerGlow.rotation.x=-Math.PI/2,this.outerGlow.position.y=.02,this.mesh.add(this.outerGlow);const c=new Rs;c.moveTo(0,.6),c.lineTo(-.3,.1),c.lineTo(-.1,.1),c.lineTo(-.1,-.3),c.lineTo(.1,-.3),c.lineTo(.1,.1),c.lineTo(.3,.1),c.closePath();const l=new Qn(c),h=new xt({color:65280,transparent:!0,opacity:0,side:Yt});this.directionArrow=new q(l,h),this.directionArrow.rotation.x=-Math.PI/2,this.directionArrow.position.y=.15,this.directionArrow.position.z=this.radius+.5,this.mesh.add(this.directionArrow),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createTrigger(){const t=new sn(this.radius,this.radius,1,12);this.body=new st({mass:0,shape:t,collisionResponse:!1,position:new b(this.position.x,.5,this.position.z)}),this.body.userData={type:"vortex",vortex:this},this.world.addBody(this.body)}update(t,e,i){this.rings.forEach((r,a)=>{r.rotation.z+=t*r.userData.rotationSpeed*(this.state==="spinning"?3:1)}),this.spiralParticles.forEach(r=>{r.userData.angle+=t*r.userData.speed*(this.state==="spinning"?2:1),r.userData.radius-=t*.5,r.userData.radius<this.radius*.2&&(r.userData.radius=this.radius*.9),r.position.x=Math.cos(r.userData.angle)*r.userData.radius,r.position.z=Math.sin(r.userData.angle)*r.userData.radius,r.position.y=.1+Math.sin(r.userData.angle*2)*.3});const n=Math.sin(Date.now()*.003)*.2+.4;if(this.outerGlow.material.opacity=n,!e||!i)return{captured:!1};const s=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));switch(this.state){case"idle":s<this.radius&&e.y<1&&(this.state="capturing",this.capturedBall=i,this.onCapture&&this.onCapture(this));break;case"capturing":if(this.capturedBall){const r=new b(this.position.x-e.x,.5-e.y,this.position.z-e.z);r.normalize(),r.scale(this.pullStrength*t*60,r),this.capturedBall.velocity.x+=r.x,this.capturedBall.velocity.y+=r.y,this.capturedBall.velocity.z+=r.z,this.capturedBall.velocity.scale(.95,this.capturedBall.velocity),s<.5&&(this.state="spinning",this.spinAngle=0,this.spinTime=0)}break;case"spinning":if(this.spinTime+=t,this.spinAngle+=t*this.spinSpeed,this.capturedBall){const a=this.position.x+Math.cos(this.spinAngle)*.8,c=this.position.z+Math.sin(this.spinAngle)*.8;this.capturedBall.position.x=a,this.capturedBall.position.z=c,this.capturedBall.position.y=.5+Math.sin(this.spinTime*10)*.1,this.capturedBall.velocity.set(0,0,0),this.releaseDirection={x:Math.cos(this.spinAngle+Math.PI/2),z:Math.sin(this.spinAngle+Math.PI/2)},this.directionArrow.material.opacity=.8,this.directionArrow.rotation.z=-this.spinAngle-Math.PI/2,this.directionArrow.position.x=Math.cos(this.spinAngle+Math.PI/2)*(this.radius+.5),this.directionArrow.position.z=Math.sin(this.spinAngle+Math.PI/2)*(this.radius+.5);const l=this.spinTime*.5%1;this.rings.forEach(h=>{h.material.color.setHSL(.75+l*.1,1,.5)})}return{captured:!0,canRelease:!0,direction:this.releaseDirection};case"releasing":this.directionArrow.material.opacity=0,this.spinTime+=t,this.spinTime>1&&(this.state="idle",this.capturedBall=null);break}return{captured:this.state==="spinning",canRelease:this.state==="spinning"}}release(){if(this.state!=="spinning"||!this.capturedBall)return null;const t=20,e=new b(this.releaseDirection.x*t,5,this.releaseDirection.z*t);return this.capturedBall.velocity.copy(e),this.capturedBall,this.state="releasing",this.spinTime=0,this.onRelease&&this.onRelease(this,this.releaseDirection),e}reset(){this.state="idle",this.capturedBall=null,this.spinAngle=0,this.spinTime=0,this.directionArrow.material.opacity=0,this.rings.forEach(t=>t.material.color.setHex(10181046))}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Xv{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.position={x:i,z:n},this.trapType=s.trapType||["reverse","shrink","slow","blind"][Math.floor(Math.random()*4)],this.onTrigger=s.onTrigger||null,this.collected=!1,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new Ne;const t=new wr(.5);let e;switch(this.trapType){case"reverse":e=15965202;break;case"shrink":e=10181046;break;case"slow":e=3447003;break;case"blind":e=3066993;break;default:e=15965202}const i=new Lt({color:e,emissive:e,emissiveIntensity:.5,roughness:.2,metalness:.8});this.gem=new q(t,i),this.mesh.add(this.gem);const n=new qt(.2,.2),s=document.createElement("canvas");s.width=32,s.height=32;const r=s.getContext("2d");r.fillStyle="rgba(0,0,0,0.3)",r.font="24px Arial",r.textAlign="center",r.textBaseline="middle",r.fillText("💀",16,16);const a=new en(s),c=new xt({map:a,transparent:!0,side:Yt});this.skull=new q(n,c),this.skull.position.y=.6,this.mesh.add(this.skull),this.sparkles=[];for(let l=0;l<6;l++){const h=new q(new pe(.05,8,8),new xt({color:16777215,transparent:!0,opacity:.8}));h.userData={angle:l/6*Math.PI*2,speed:1+Math.random()},this.sparkles.push(h),this.mesh.add(h)}this.mesh.position.set(this.position.x,1,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new Zn(.6);this.body=new st({mass:0,shape:t,collisionResponse:!1,position:new b(this.position.x,1,this.position.z)}),this.body.userData={type:"fakeBonus",bonus:this},this.world.addBody(this.body)}update(t,e){return this.collected?{triggered:!1}:(this.animTime+=t,this.gem.rotation.y+=t*2,this.mesh.position.y=1+Math.sin(this.animTime*3)*.2,this.sparkles.forEach(i=>{i.userData.angle+=t*i.userData.speed*3,i.position.x=Math.cos(i.userData.angle)*.6,i.position.z=Math.sin(i.userData.angle)*.6,i.position.y=Math.sin(i.userData.angle*2)*.3,i.material.opacity=.5+Math.sin(this.animTime*10)*.3}),this.skull.material.opacity=.15+Math.sin(this.animTime*2)*.1,this.skull.rotation.y=this.animTime,e&&Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2))<1&&Math.abs(e.y-1)<1?this.trigger():{triggered:!1})}trigger(){return this.collected=!0,this.mesh.visible=!1,this.onTrigger&&this.onTrigger(this,this.trapType),{triggered:!0,trapType:this.trapType}}reset(){this.collected=!1,this.mesh.visible=!0}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Yv{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.position={x:i,z:n},this.explosionForce=s.explosionForce||25,this.onExplode=s.onExplode||null,this.hasExploded=!1,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new Ne;const t=new ve(.5,.6,1.2,16),e=new Lt({color:9127187,roughness:.8});this.barrel=new q(t,e),this.barrel.position.y=.6,this.mesh.add(this.barrel);const i=new ve(.52,.62,.2,16),n=new Lt({color:16711680,emissive:16711680,emissiveIntensity:.3}),s=new q(i,n);s.position.y=.3,this.mesh.add(s);const r=new q(i,n);r.position.y=.9,this.mesh.add(r);const a=new qt(.6,.6),c=document.createElement("canvas");c.width=64,c.height=64;const l=c.getContext("2d");l.fillStyle="#ffcc00",l.fillRect(0,0,64,64),l.fillStyle="#000000",l.font="40px Arial",l.textAlign="center",l.textBaseline="middle",l.fillText("💣",32,32);const h=new en(c),u=new xt({map:h,transparent:!0}),d=new q(a,u);d.position.set(0,.6,.55),this.mesh.add(d);const f=d.clone();f.position.set(0,.6,-.55),f.rotation.y=Math.PI,this.mesh.add(f);const m=new ve(.03,.03,.3,8),x=new xt({color:3355443});this.fuse=new q(m,x),this.fuse.position.set(.2,1.3,0),this.fuse.rotation.z=.3,this.mesh.add(this.fuse);const p=new pe(.08,8,8),g=new xt({color:16737792,transparent:!0});this.spark=new q(p,g),this.spark.position.set(.35,1.45,0),this.mesh.add(this.spark),this.smokeParticles=[];for(let v=0;v<5;v++){const y=new q(new pe(.05,6,6),new xt({color:6710886,transparent:!0,opacity:.5}));y.userData={offset:Math.random()*Math.PI*2},this.smokeParticles.push(y),this.mesh.add(y)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new sn(.5,.6,1.2,12);this.body=new st({mass:0,shape:t,position:new b(this.position.x,.6,this.position.z)}),this.body.addEventListener("collide",e=>{!this.hasExploded&&e.body.mass>0&&this.explode(e.body)}),this.world.addBody(this.body)}explode(t){this.hasExploded=!0;const e=Math.random()*Math.PI*2,i=10+Math.random()*10,n=new b(Math.cos(e)*this.explosionForce,i,Math.sin(e)*this.explosionForce);t&&t.velocity.copy(n),this.barrel.visible=!1,this.fuse.visible=!1,this.spark.visible=!1,this.createExplosionEffect(),this.onExplode&&this.onExplode(this,n)}createExplosionEffect(){const t=new pe(.5,16,16),e=new xt({color:16737792,transparent:!0,opacity:1});this.explosion=new q(t,e),this.explosion.position.y=.6,this.mesh.add(this.explosion);let i=1;const n=setInterval(()=>{i+=.5,this.explosion.scale.setScalar(i),this.explosion.material.opacity-=.1,this.explosion.material.opacity<=0&&(clearInterval(n),this.mesh.remove(this.explosion))},50)}update(t,e){if(this.hasExploded)return;this.animTime+=t,this.spark.material.opacity=.5+Math.sin(this.animTime*20)*.5,this.spark.scale.setScalar(.8+Math.sin(this.animTime*15)*.3);const i=Math.sin(this.animTime*10)>0?16737792:16763904;if(this.spark.material.color.setHex(i),this.smokeParticles.forEach((n,s)=>{n.userData.offset+=t*2;const r=n.userData.offset%1.5;n.position.set(.35+Math.sin(n.userData.offset*3+s)*.1,1.45+r,Math.cos(n.userData.offset*2+s)*.1),n.material.opacity=.5*(1-r/1.5)}),e){const n=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));n<3&&(this.barrel.rotation.z=Math.sin(this.animTime*30)*.1*(1-n/3),this.spark.scale.setScalar(1+(1-n/3)*.5))}}reset(){this.hasExploded=!1,this.barrel.visible=!0,this.fuse.visible=!0,this.spark.visible=!0,this.explosion&&this.mesh.remove(this.explosion)}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Zv{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.position={x:i,z:n},this.triggerRadius=s.triggerRadius||3,this.popupSpeed=s.popupSpeed||15,this.bounceForce=s.bounceForce||20,this.onPopup=s.onPopup||null,this.state="hidden",this.height=0,this.maxHeight=1.5,this.hasHitBall=!1,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new Ne;const t=new ve(.8,.8,.1,16),e=new Lt({color:5592405,roughness:.9});this.plate=new q(t,e),this.plate.position.y=.05,this.mesh.add(this.plate);const i=new xt({color:3355443,transparent:!0,opacity:.5});for(let l=0;l<4;l++){const h=new q(new qt(.05,.7),i);h.rotation.x=-Math.PI/2,h.rotation.z=l/4*Math.PI*2,h.position.y=.06,this.mesh.add(h)}this.spikeGroup=new Ne;const n=new nn(.3,1.2,8),s=new Lt({color:11184810,roughness:.3,metalness:.8}),r=new q(n,s);r.position.y=.6,this.spikeGroup.add(r);for(let l=0;l<4;l++){const h=l/4*Math.PI*2,u=new q(new nn(.15,.6,6),s);u.position.set(Math.cos(h)*.4,.3,Math.sin(h)*.4),this.spikeGroup.add(u)}const a=new ve(.7,.7,.2,16),c=new Lt({color:16711680,emissive:16711680,emissiveIntensity:.3});this.spikeBase=new q(a,c),this.spikeBase.position.y=.1,this.spikeGroup.add(this.spikeBase),this.spikeGroup.position.y=-this.maxHeight,this.mesh.add(this.spikeGroup),this.dustParticles=[];for(let l=0;l<8;l++){const h=new q(new pe(.1,6,6),new xt({color:9139029,transparent:!0,opacity:0}));h.userData={angle:l/8*Math.PI*2},this.dustParticles.push(h),this.mesh.add(h)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new sn(.5,.5,1.2,8);this.body=new st({mass:0,shape:t,type:st.KINEMATIC,collisionResponse:!1}),this.body.position.set(this.position.x,-1,this.position.z),this.body.addEventListener("collide",e=>{!this.hasHitBall&&this.state==="up"&&e.body.mass>0&&this.hitBall(e.body)}),this.world.addBody(this.body)}hitBall(t){this.hasHitBall=!0;const e=new b((Math.random()-.5)*10,this.bounceForce,-this.bounceForce*.5);t.velocity.copy(e),this.onPopup&&this.onPopup(this,e)}update(t,e){switch(this.animTime+=t,this.state){case"hidden":if(e){const n=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));n<this.triggerRadius&&e.z>this.position.z-2&&(this.state="popping",this.triggerDustEffect()),n<this.triggerRadius*1.5&&(this.plate.position.y=.05+Math.sin(this.animTime*30)*.02*(1-n/(this.triggerRadius*1.5)))}break;case"popping":this.height+=this.popupSpeed*t,this.height>=this.maxHeight&&(this.height=this.maxHeight,this.state="up",this.body.collisionResponse=!0),this.spikeGroup.position.y=-this.maxHeight+this.height,this.body.position.y=this.height*.5;break;case"up":this.spikeGroup.rotation.x=Math.sin(this.animTime*5)*.05,this.spikeGroup.rotation.z=Math.cos(this.animTime*5)*.05;const i=Math.sin(this.animTime*8)*.2+.5;this.spikeBase.material.emissiveIntensity=i,this.animTime>3&&this.hasHitBall&&(this.state="retracting");break;case"retracting":this.height-=this.popupSpeed*.5*t,this.height<=0&&(this.height=0,this.state="hidden",this.hasHitBall=!1,this.animTime=0,this.body.collisionResponse=!1),this.spikeGroup.position.y=-this.maxHeight+this.height,this.body.position.y=this.height*.5-1;break}this.dustParticles.forEach((i,n)=>{if(this.state==="popping"){const s=this.height/this.maxHeight;i.position.x=Math.cos(i.userData.angle)*(.8+s*2),i.position.z=Math.sin(i.userData.angle)*(.8+s*2),i.position.y=.2+s*.5,i.material.opacity=.6*(1-s),i.scale.setScalar(1+s)}else i.material.opacity=0})}triggerDustEffect(){this.dustParticles.forEach(t=>{t.material.opacity=.6,t.scale.setScalar(1)})}reset(){this.state="hidden",this.height=0,this.hasHitBall=!1,this.animTime=0,this.spikeGroup.position.y=-this.maxHeight,this.body.position.y=-1,this.body.collisionResponse=!1}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Kv{constructor(t,e,i,n={}){this.scene=t,this.position={x:e,z:i},this.radius=n.radius||3,this.strength=n.strength||15,this.type=n.type||"pull",this.targetX=n.targetX||e,this.targetZ=n.targetZ||i,this.animTime=0,this.createMesh()}createMesh(){this.mesh=new Ne;const t=new pi(.5,this.radius,32),e=new xt({color:this.type==="pull"?16711782:65382,transparent:!0,opacity:.4,side:Yt});this.base=new q(t,e),this.base.rotation.x=-Math.PI/2,this.base.position.y=.02,this.mesh.add(this.base),this.fieldRings=[];for(let h=0;h<4;h++){const u=new pi(this.radius*(.2+h*.2),this.radius*(.25+h*.2),32),d=new xt({color:this.type==="pull"?16711782:65382,transparent:!0,opacity:.6-h*.1,side:Yt}),f=new q(u,d);f.rotation.x=-Math.PI/2,f.position.y=.03+h*.02,f.userData={baseRadius:.2+h*.2},this.fieldRings.push(f),this.mesh.add(f)}const i=new ve(.4,.4,.3,16),n=new Lt({color:3355443,roughness:.3,metalness:.9});this.magnet=new q(i,n),this.magnet.position.y=.15,this.mesh.add(this.magnet);const s=new Ye(.4,.35,.2),r=new Lt({color:16711680,emissive:16711680,emissiveIntensity:.3}),a=new Lt({color:255,emissive:255,emissiveIntensity:.3}),c=new q(s,r);c.position.set(0,.2,.25),this.mesh.add(c);const l=new q(s,a);l.position.set(0,.2,-.25),this.mesh.add(l),this.createLabel("N",0,.4,.3,16711680),this.createLabel("S",0,.4,-.3,255),this.particles=[];for(let h=0;h<16;h++){const u=new q(new pe(.06,6,6),new xt({color:this.type==="pull"?16711782:65382,transparent:!0,opacity:.7}));u.userData={angle:h/16*Math.PI*2,radius:this.radius*.3+h%4*this.radius*.2,speed:1+Math.random()*.5},this.particles.push(u),this.mesh.add(u)}this.createWarningSign(),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createLabel(t,e,i,n,s){const r=document.createElement("canvas");r.width=32,r.height=32;const a=r.getContext("2d");a.fillStyle="#ffffff",a.font="bold 24px Arial",a.textAlign="center",a.textBaseline="middle",a.fillText(t,16,16);const c=new en(r),l=new xt({map:c,transparent:!0,side:Yt}),h=new q(new qt(.3,.3),l);h.position.set(e,i,n),this.mesh.add(h)}createWarningSign(){const t=document.createElement("canvas");t.width=128,t.height=64;const e=t.getContext("2d");e.fillStyle=this.type==="pull"?"#ff0066":"#00ff66",e.font="bold 20px Arial",e.textAlign="center",e.fillText(this.type==="pull"?"⚡ MAGNET ⚡":"⚡ REPEL ⚡",64,35);const i=new en(t),n=new xt({map:i,transparent:!0,side:Yt});this.warning=new q(new qt(1.5,.75),n),this.warning.position.y=1.5,this.mesh.add(this.warning)}update(t,e,i){if(this.animTime+=t,this.fieldRings.forEach((n,s)=>{if(this.type==="pull"){const r=1-(this.animTime*2+s*.5)%1*.3;n.scale.setScalar(r),n.material.opacity=(1-(this.animTime*2+s*.5)%1)*.5}else{const r=.7+(this.animTime*2+s*.5)%1*.5;n.scale.setScalar(r),n.material.opacity=(1-(this.animTime*2+s*.5)%1)*.5}}),this.particles.forEach(n=>{if(n.userData.angle+=t*n.userData.speed*(this.type==="pull"?1:-1),this.type==="pull"){const s=(this.animTime*.5+n.userData.radius)%1,r=n.userData.radius*(1-s*.7);n.position.x=Math.cos(n.userData.angle)*r,n.position.z=Math.sin(n.userData.angle)*r,n.position.y=.2+s*.5,n.material.opacity=.7*(1-s)}else{const s=(this.animTime*.5+n.userData.radius)%1,r=n.userData.radius*(.3+s*.7);n.position.x=Math.cos(n.userData.angle)*r,n.position.z=Math.sin(n.userData.angle)*r,n.position.y=.2+(1-s)*.5,n.material.opacity=.7*s}}),this.magnet.rotation.y+=t*2,this.warning.position.y=1.5+Math.sin(this.animTime*3)*.1,this.warning.rotation.y=Math.sin(this.animTime*2)*.2,e&&i){const n=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));if(n<this.radius&&e.y<2){const s=this.targetX-e.x,r=this.targetZ-e.z,a=this.strength*(1-n/this.radius),c=this.type==="pull"?1:-1;return i.velocity.x+=s*a*t*c*.5,i.velocity.z+=r*a*t*c*.5,this.base.material.opacity=.4+(1-n/this.radius)*.4,{affected:!0,type:this.type}}}return{affected:!1}}reset(){}dispose(){this.scene.remove(this.mesh)}}class jv{constructor(t,e,i,n={}){this.scene=t,this.position={x:e,z:i},this.width=n.width||3,this.length=n.length||6,this.speed=n.speed||8,this.direction=n.direction||1,this.animTime=0,this.createMesh()}createMesh(){this.mesh=new Ne;const t=new qt(this.width,this.length),e=new Lt({color:3355443,roughness:.8}),i=new q(t,e);i.rotation.x=-Math.PI/2,i.position.y=.01,this.mesh.add(i),this.chevrons=[];const n=Math.floor(this.length/.8);for(let x=0;x<n;x++){const p=new Ne,g=new Rs,v=this.width*.4,y=.3;g.moveTo(0,y),g.lineTo(-v,0),g.lineTo(-v+.1,0),g.lineTo(0,y-.15),g.lineTo(v-.1,0),g.lineTo(v,0),g.closePath();const _=new Qn(g),E=new xt({color:16763904,side:Yt,transparent:!0,opacity:.8}),T=new q(_,E);T.rotation.x=-Math.PI/2,T.rotation.z=this.direction>0?-Math.PI/2:Math.PI/2,p.add(T),p.position.z=-this.length/2+x*.8,p.userData={baseZ:p.position.z},this.chevrons.push(p),this.mesh.add(p)}const s=new Ye(.2,.3,this.length),r=new Lt({color:6710886,roughness:.5,metalness:.5}),a=new q(s,r);a.position.set(-this.width/2-.1,.15,0),this.mesh.add(a);const c=new q(s,r);c.position.set(this.width/2+.1,.15,0),this.mesh.add(c);const l=new ve(.2,.2,this.width+.4,16),h=new Lt({color:8947848,roughness:.3,metalness:.7});this.frontRoller=new q(l,h),this.frontRoller.rotation.z=Math.PI/2,this.frontRoller.position.set(0,.2,this.length/2),this.mesh.add(this.frontRoller),this.backRoller=new q(l,h),this.backRoller.rotation.z=Math.PI/2,this.backRoller.position.set(0,.2,-this.length/2),this.mesh.add(this.backRoller),this.createDirectionArrow(-this.width/2-.3,.5,0),this.createDirectionArrow(this.width/2+.3,.5,0);const u=new qt(.3,this.length),d=new xt({color:16763904,transparent:!0,opacity:.7}),f=new q(u,d);f.rotation.x=-Math.PI/2,f.position.set(-this.width/2+.15,.02,0),this.mesh.add(f);const m=new q(u,d);m.rotation.x=-Math.PI/2,m.position.set(this.width/2-.15,.02,0),this.mesh.add(m),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createDirectionArrow(t,e,i){const n=document.createElement("canvas");n.width=64,n.height=64;const s=n.getContext("2d");s.fillStyle="#ffcc00",s.font="50px Arial",s.textAlign="center",s.textBaseline="middle",s.fillText(this.direction>0?"→":"←",32,32);const r=new en(n),a=new xt({map:r,transparent:!0,side:Yt}),c=new q(new qt(.6,.6),a);c.position.set(t,e,i),c.rotation.y=t>0?-Math.PI/2:Math.PI/2,this.mesh.add(c)}update(t,e,i){if(this.animTime+=t,this.chevrons.forEach(n=>{n.position.x=Math.sin(this.animTime*this.speed*.5)*.1*this.direction,n.children[0].material.opacity=.6+Math.sin(this.animTime*8)*.2}),this.frontRoller.rotation.x+=t*this.speed*this.direction,this.backRoller.rotation.x+=t*this.speed*this.direction,e&&i){const n=this.width/2,s=this.length/2,r=e.x>=this.position.x-n&&e.x<=this.position.x+n,a=e.z>=this.position.z-s&&e.z<=this.position.z+s,c=e.y<1;if(r&&a&&c)return i.velocity.x+=this.speed*this.direction*t*3,{onBelt:!0,direction:this.direction}}return{onBelt:!1}}reset(){}dispose(){this.scene.remove(this.mesh)}}class $v{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.position={x:i,z:n},this.width=s.width||3,this.length=s.length||3,this.collapseDelay=s.collapseDelay||.5,this.onCollapse=s.onCollapse||null,this.state="solid",this.triggerTime=0,this.collapseProgress=0,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new Ne,this.tiles=[];const t=3,e=3,i=this.width/t,n=this.length/e;for(let l=0;l<t;l++)for(let h=0;h<e;h++){const u=new Ye(i-.05,.15,n-.05),d=new Lt({color:9139029,roughness:.9}),f=new q(u,d);f.position.set(-this.width/2+i/2+l*i,.075,-this.length/2+n/2+h*n),f.userData={fallDelay:Math.random()*.3,fallSpeed:0,rotationSpeed:new N((Math.random()-.5)*5,(Math.random()-.5)*5,(Math.random()-.5)*5)},f.castShadow=!0,this.tiles.push(f),this.mesh.add(f)}this.cracks=[];const s=new xt({color:0,transparent:!0,opacity:0});for(let l=1;l<t;l++){const h=new q(new qt(.05,this.length),s.clone());h.rotation.x=-Math.PI/2,h.position.set(-this.width/2+l*i,.16,0),this.cracks.push(h),this.mesh.add(h)}for(let l=1;l<e;l++){const h=new q(new qt(this.width,.05),s.clone());h.rotation.x=-Math.PI/2,h.position.set(0,.16,-this.length/2+l*n),this.cracks.push(h),this.mesh.add(h)}const r=new qt(this.width+.2,this.length+.2),a=new xt({color:6636321,transparent:!0,opacity:.3}),c=new q(r,a);c.rotation.x=-Math.PI/2,c.position.y=.005,this.mesh.add(c),this.dustParticles=[];for(let l=0;l<20;l++){const h=new q(new pe(.1,6,6),new xt({color:9139029,transparent:!0,opacity:0}));h.userData={vx:(Math.random()-.5)*3,vy:Math.random()*2,vz:(Math.random()-.5)*3},this.dustParticles.push(h),this.mesh.add(h)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new zi(new b(this.width/2,.1,this.length/2));this.body=new st({mass:0,shape:t,position:new b(this.position.x,.05,this.position.z)}),this.world.addBody(this.body)}update(t,e){switch(this.animTime+=t,this.state){case"solid":if(e){const s=Math.abs(e.x-this.position.x)<this.width/2,r=Math.abs(e.z-this.position.z)<this.length/2,a=e.y<1;s&&r&&a&&(this.state="cracking",this.triggerTime=0,this.tiles.forEach(c=>{c.material.color.setHex(7690821)}))}break;case"cracking":this.triggerTime+=t;const i=Math.min(this.triggerTime/this.collapseDelay,1);this.cracks.forEach((s,r)=>{s.material.opacity=i*.8});const n=i*.1;this.tiles.forEach(s=>{s.position.x+=(Math.random()-.5)*n,s.position.z+=(Math.random()-.5)*n,s.rotation.x=(Math.random()-.5)*n*.5,s.rotation.z=(Math.random()-.5)*n*.5}),this.triggerTime>=this.collapseDelay&&(this.state="collapsing",this.collapseProgress=0,this.world.removeBody(this.body),this.dustParticles.forEach(s=>{s.position.set((Math.random()-.5)*this.width,.2,(Math.random()-.5)*this.length),s.material.opacity=.7}),this.onCollapse&&this.onCollapse(this));break;case"collapsing":this.collapseProgress+=t,this.tiles.forEach(s=>{const r=s.userData.fallDelay;this.collapseProgress>r&&(this.collapseProgress-r,s.userData.fallSpeed+=20*t,s.position.y-=s.userData.fallSpeed*t,s.rotation.x+=s.userData.rotationSpeed.x*t,s.rotation.y+=s.userData.rotationSpeed.y*t,s.rotation.z+=s.userData.rotationSpeed.z*t,s.position.y<-3&&(s.material.opacity=Math.max(0,1-(-s.position.y-3)/2),s.material.transparent=!0))}),this.dustParticles.forEach(s=>{s.position.x+=s.userData.vx*t,s.position.y+=s.userData.vy*t,s.position.z+=s.userData.vz*t,s.material.opacity-=t*.5}),this.cracks.forEach(s=>{s.material.opacity-=t}),this.collapseProgress>3&&(this.state="collapsed");break}}reset(){this.state="solid",this.triggerTime=0,this.collapseProgress=0;const t=3,e=3,i=this.width/t,n=this.length/e;let s=0;for(let r=0;r<t;r++)for(let a=0;a<e;a++){const c=this.tiles[s];c.position.set(-this.width/2+i/2+r*i,.075,-this.length/2+n/2+a*n),c.rotation.set(0,0,0),c.material.color.setHex(9139029),c.material.opacity=1,c.material.transparent=!1,c.userData.fallSpeed=0,s++}this.cracks.forEach(r=>{r.material.opacity=0}),this.dustParticles.forEach(r=>{r.material.opacity=0}),this.world.bodies.includes(this.body)||(this.body.position.set(this.position.x,.05,this.position.z),this.world.addBody(this.body))}dispose(){this.scene.remove(this.mesh),this.world.bodies.includes(this.body)&&this.world.removeBody(this.body)}}class Jv{constructor(t,e,i,n={}){this.scene=t,this.position={x:e,z:i},this.width=n.width||6,this.length=n.length||8,this.type=n.type||"speed",this.onEnter=n.onEnter||null,this.onExit=n.onExit||null,this.isActive=!1,this.animTime=0,this.createMesh()}getZoneConfig(){const t={shrink:{color:16738740,secondaryColor:16716947,icon:"🔬",label:"SHRINK ZONE",particleColor:16738740},giant:{color:10181046,secondaryColor:9323693,icon:"🔮",label:"GIANT ZONE",particleColor:10181046},speed:{color:16750592,secondaryColor:16088064,icon:"⚡",label:"SPEED ZONE",particleColor:16771899},slip:{color:240116,secondaryColor:166097,icon:"🧊",label:"SLIP ZONE",particleColor:8508666},chaos:{color:15277667,secondaryColor:12720219,icon:"🌀",label:"CHAOS ZONE",particleColor:16728193},bomb:{color:16733986,secondaryColor:15092249,icon:"💣",label:"DANGER ZONE",particleColor:16740419}};return t[this.type]||t.speed}createMesh(){this.mesh=new Ne;const t=this.getZoneConfig(),e=new qt(this.width,this.length),i=new Lt({color:t.color,transparent:!0,opacity:.5,side:Yt}),n=new q(e,i);n.rotation.x=-Math.PI/2,n.position.y=.02,this.mesh.add(n),this.stripes=[];const s=Math.floor(this.length/1.5);for(let r=0;r<s;r++){const a=new qt(this.width,.3),c=new xt({color:t.secondaryColor,transparent:!0,opacity:.6}),l=new q(a,c);l.rotation.x=-Math.PI/2,l.position.y=.03,l.position.z=-this.length/2+r*1.5,l.userData={baseZ:l.position.z},this.stripes.push(l),this.mesh.add(l)}this.createEdgeGlow(t.color),this.createCornerMarkers(t),this.createFloatingLabel(t),this.particles=[],this.createParticles(t.particleColor),this.createWarningPillars(t),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createEdgeGlow(t){const e=new qt(this.width+.4,this.length+.4),i=new xt({color:t,transparent:!0,opacity:.3,side:Yt}),n=new q(e,i);n.rotation.x=-Math.PI/2,n.position.y=.01,this.mesh.add(n);const s=new xt({color:16777215,transparent:!0,opacity:.8});[{x:-this.width/2,z:0,w:.1,l:this.length},{x:this.width/2,z:0,w:.1,l:this.length},{x:0,z:-this.length/2,w:this.width,l:.1},{x:0,z:this.length/2,w:this.width,l:.1}].forEach(a=>{const c=new qt(a.w,a.l),l=new q(c,s.clone());l.rotation.x=-Math.PI/2,l.position.set(a.x,.04,a.z),this.mesh.add(l)})}createCornerMarkers(t){[{x:-this.width/2,z:-this.length/2},{x:this.width/2,z:-this.length/2},{x:-this.width/2,z:this.length/2},{x:this.width/2,z:this.length/2}].forEach(i=>{const n=new ve(.2,.2,.5,8),s=new Lt({color:t.secondaryColor,emissive:t.secondaryColor,emissiveIntensity:.5}),r=new q(n,s);r.position.set(i.x,.25,i.z),this.mesh.add(r)})}createFloatingLabel(t){const e=document.createElement("canvas");e.width=256,e.height=128;const i=e.getContext("2d");i.fillStyle="rgba(0, 0, 0, 0.7)",i.roundRect(10,10,236,108,15),i.fill(),i.font="40px Arial",i.textAlign="center",i.fillText(t.icon,128,55),i.font="bold 18px Arial",i.fillStyle="#ffffff",i.fillText(t.label,128,90);const n=new en(e),s=new xt({map:n,transparent:!0,side:Yt});this.label=new q(new qt(3,1.5),s),this.label.position.y=2.5,this.mesh.add(this.label)}createParticles(t){for(let e=0;e<20;e++){const i=new pe(.08,6,6),n=new xt({color:t,transparent:!0,opacity:.7}),s=new q(i,n);s.userData={baseX:(Math.random()-.5)*this.width,baseZ:(Math.random()-.5)*this.length,phase:Math.random()*Math.PI*2,speed:1+Math.random()},s.position.set(s.userData.baseX,.5+Math.random()*1.5,s.userData.baseZ),this.particles.push(s),this.mesh.add(s)}}createWarningPillars(t){(this.type==="bomb"||this.type==="chaos")&&[{x:-this.width/2-.3,z:0},{x:this.width/2+.3,z:0}].forEach(i=>{const n=new ve(.15,.15,2,8),s=new Lt({color:t.secondaryColor,emissive:t.color,emissiveIntensity:.3}),r=new q(n,s);r.position.set(i.x,1,i.z),this.mesh.add(r);const a=new pe(.2,8,8),c=new xt({color:16711680}),l=new q(a,c);l.position.set(i.x,2.1,i.z),l.userData={isWarningLight:!0},this.mesh.add(l)})}update(t,e,i){this.animTime+=t;const n=this.type==="speed"?8:this.type==="chaos"?12:4;if(this.stripes.forEach((s,r)=>{s.position.z=s.userData.baseZ+Math.sin(this.animTime*n+r*.5)*.3,s.material.opacity=.4+Math.sin(this.animTime*3+r*.3)*.2}),this.particles.forEach(s=>{const{phase:r,speed:a}=s.userData;s.position.y=.5+Math.sin(this.animTime*a+r)*.8+(this.animTime*.5+r)%2,s.position.x=s.userData.baseX+Math.sin(this.animTime*.5+r)*.3,s.material.opacity=.7-(s.position.y-.5)*.2,s.position.y>2.5&&(s.position.y=.5)}),this.label.position.y=2.5+Math.sin(this.animTime*2)*.2,this.label.rotation.y=Math.sin(this.animTime*.5)*.1,this.mesh.children.forEach(s=>{if(s.userData&&s.userData.isWarningLight){const r=Math.sin(this.animTime*5)>0?1:.3;s.material.opacity=r}}),e&&i){const s=this.isInZone(e);return s&&!this.isActive?(this.isActive=!0,this.onEnter&&this.onEnter(this,i)):!s&&this.isActive&&(this.isActive=!1,this.onExit&&this.onExit(this,i)),{inZone:s,type:this.type}}return{inZone:!1}}isInZone(t){const e=this.width/2,i=this.length/2;return t.x>=this.position.x-e&&t.x<=this.position.x+e&&t.z>=this.position.z-i&&t.z<=this.position.z+i&&t.y<3}reset(){this.isActive=!1}dispose(){this.scene.remove(this.mesh)}}class Qv{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.startPosition={x:i,z:n},this.radius=s.radius||.6,this.speed=s.speed||8,this.detectionRange=s.detectionRange||15,this.knockbackForce=s.knockbackForce||20,this.onHit=s.onHit||null,this.isChasing=!1,this.hasHit=!1,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){const t=new pe(this.radius,16,16),e=new Lt({color:16711680,emissive:16711680,emissiveIntensity:.3,roughness:.3,metalness:.7});this.mesh=new q(t,e),this.mesh.position.set(this.startPosition.x,this.radius+.1,this.startPosition.z),this.mesh.castShadow=!0,this.scene.add(this.mesh);const i=new pe(.12,8,8),n=new xt({color:16777215}),s=new pe(.06,8,8),r=new xt({color:0}),a=new q(i,n);a.position.set(-.2,.15,this.radius-.05),this.mesh.add(a);const c=new q(s,r);c.position.set(0,0,.08),a.add(c);const l=new q(i,n);l.position.set(.2,.15,this.radius-.05),this.mesh.add(l);const h=new q(s,r);h.position.set(0,0,.08),l.add(h);const u=new Ye(.2,.04,.04),d=new xt({color:0}),f=new q(u,d);f.position.set(-.2,.3,this.radius),f.rotation.z=.3,this.mesh.add(f);const m=new q(u,d);m.position.set(.2,.3,this.radius),m.rotation.z=-.3,this.mesh.add(m),this.warningRing=new q(new pi(this.detectionRange-.2,this.detectionRange,32),new xt({color:16711680,transparent:!0,opacity:.1,side:Yt})),this.warningRing.rotation.x=-Math.PI/2,this.warningRing.position.set(this.startPosition.x,.05,this.startPosition.z),this.scene.add(this.warningRing)}createBody(){const t=new Zn(this.radius);this.body=new st({mass:5,shape:t,material:new Qe({friction:.3,restitution:.8}),linearDamping:.5}),this.body.position.set(this.startPosition.x,this.radius+.1,this.startPosition.z),this.body.userData={type:"chaser"},this.world.addBody(this.body)}update(t,e,i){if(!e||this.hasHit)return;this.animTime+=t;const n=e.x-this.body.position.x,s=e.z-this.body.position.z,r=Math.sqrt(n*n+s*s);if(r<this.detectionRange){this.isChasing=!0,this.mesh.material.emissiveIntensity=.5+Math.sin(this.animTime*10)*.3,this.warningRing.material.opacity=.3;const a=n/r,c=s/r;this.body.velocity.x=a*this.speed,this.body.velocity.z=c*this.speed,this.mesh.lookAt(e.x,this.mesh.position.y,e.z),r<this.radius+.5&&this.hitBall(i,a,c)}else{this.isChasing=!1,this.mesh.material.emissiveIntensity=.3,this.warningRing.material.opacity=.1;const a=this.startPosition.x-this.body.position.x,c=this.startPosition.z-this.body.position.z,l=Math.sqrt(a*a+c*c);l>.5?(this.body.velocity.x=a/l*2,this.body.velocity.z=c/l*2):(this.body.velocity.x*=.9,this.body.velocity.z*=.9)}this.mesh.position.copy(this.body.position),this.mesh.position.y=this.radius+.1+Math.abs(Math.sin(this.animTime*5))*.2}hitBall(t,e,i){this.hasHit=!0,t.velocity.x+=e*this.knockbackForce,t.velocity.z+=i*this.knockbackForce*.5,t.velocity.y+=5,this.body.velocity.x=-e*10,this.body.velocity.z=-i*10,this.onHit&&this.onHit(this),setTimeout(()=>{this.hasHit=!1},2e3)}reset(){this.hasHit=!1,this.isChasing=!1,this.body.position.set(this.startPosition.x,this.radius+.1,this.startPosition.z),this.body.velocity.set(0,0,0)}dispose(){this.scene.remove(this.mesh),this.scene.remove(this.warningRing),this.world.removeBody(this.body)}}class t_{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.centerX=i,this.centerZ=n,this.patrolDistance=s.patrolDistance||4,this.speed=s.speed||3,this.direction=s.direction||"horizontal",this.knockbackForce=s.knockbackForce||15,this.onHit=s.onHit||null,this.phase=Math.random()*Math.PI*2,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){const t=new Ye(1.2,1.2,1.2),e=new Lt({color:16737792,emissive:16724736,emissiveIntensity:.2,roughness:.4,metalness:.6});this.mesh=new q(t,e),this.mesh.position.set(this.centerX,.8,this.centerZ),this.mesh.castShadow=!0,this.scene.add(this.mesh);const i=new nn(.15,.4,4),n=new Lt({color:16763904,emissive:16763904,emissiveIntensity:.3});[{x:0,y:.7,z:0,rx:0,rz:0},{x:0,y:-.7,z:0,rx:Math.PI,rz:0},{x:.7,y:0,z:0,rx:0,rz:-Math.PI/2},{x:-.7,y:0,z:0,rx:0,rz:Math.PI/2},{x:0,y:0,z:.7,rx:Math.PI/2,rz:0},{x:0,y:0,z:-.7,rx:-Math.PI/2,rz:0}].forEach(h=>{const u=new q(i,n);u.position.set(h.x,h.y,h.z),u.rotation.x=h.rx,u.rotation.z=h.rz,this.mesh.add(u)});const r=this.direction==="horizontal"?this.patrolDistance*2:.2,a=this.direction==="vertical"?this.patrolDistance*2:.2,c=new qt(r,a),l=new xt({color:16737792,transparent:!0,opacity:.2,side:Yt});this.pathIndicator=new q(c,l),this.pathIndicator.rotation.x=-Math.PI/2,this.pathIndicator.position.set(this.centerX,.02,this.centerZ),this.scene.add(this.pathIndicator)}createBody(){const t=new zi(new b(.6,.6,.6));this.body=new st({mass:0,shape:t,type:st.KINEMATIC,material:new Qe({friction:.1,restitution:1.5})}),this.body.position.set(this.centerX,.8,this.centerZ),this.body.userData={type:"patroller"},this.world.addBody(this.body)}update(t,e,i){this.animTime+=t;const n=Math.sin(this.animTime*this.speed+this.phase)*this.patrolDistance;this.direction==="horizontal"?this.body.position.x=this.centerX+n:this.body.position.z=this.centerZ+n,this.mesh.position.copy(this.body.position),this.mesh.rotation.x+=t*2,this.mesh.rotation.y+=t*3;const s=.2+Math.sin(this.animTime*5)*.1;if(this.mesh.material.emissiveIntensity=s,e&&i){const r=e.x-this.body.position.x,a=e.y-this.body.position.y,c=e.z-this.body.position.z,l=Math.sqrt(r*r+a*a+c*c);l<1.5&&this.hitBall(i,r,c,l)}}hitBall(t,e,i,n){const s=e/n,r=i/n;t.velocity.x+=s*this.knockbackForce,t.velocity.z+=r*this.knockbackForce*.5,t.velocity.y+=3,this.onHit&&this.onHit(this)}reset(){this.animTime=0}dispose(){this.scene.remove(this.mesh),this.scene.remove(this.pathIndicator),this.world.removeBody(this.body)}}class e_{constructor(t,e,i,n,s={}){this.scene=t,this.world=e,this.position={x:i,z:n},this.radius=s.radius||.8,this.explosionForce=s.explosionForce||25,this.cooldown=s.cooldown||2e3,this.onExplode=s.onExplode||null,this.isReady=!0,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){const t=new ve(this.radius,this.radius*1.2,1,16),e=new Lt({color:16729156,emissive:16711680,emissiveIntensity:.3,roughness:.3,metalness:.7});this.mesh=new q(t,e),this.mesh.position.set(this.position.x,.5,this.position.z),this.mesh.castShadow=!0,this.scene.add(this.mesh);const i=new ts(this.radius*.9,.05,8,16),n=new xt({color:16776960});for(let h=0;h<3;h++){const u=new q(i,n);u.position.y=-.3+h*.3,u.rotation.x=Math.PI/2,this.mesh.add(u)}const s=new Qi(.3,16),r=document.createElement("canvas");r.width=64,r.height=64;const a=r.getContext("2d");a.fillStyle="#ff0000",a.fillRect(0,0,64,64),a.font="40px Arial",a.fillStyle="#ffffff",a.textAlign="center",a.fillText("💥",32,48);const c=new en(r),l=new xt({map:c,transparent:!0});this.icon=new q(s,l),this.icon.rotation.x=-Math.PI/2,this.icon.position.y=.52,this.mesh.add(this.icon),this.dangerRing=new q(new pi(this.radius+.5,this.radius+1,32),new xt({color:16711680,transparent:!0,opacity:.2,side:Yt})),this.dangerRing.rotation.x=-Math.PI/2,this.dangerRing.position.set(this.position.x,.02,this.position.z),this.scene.add(this.dangerRing)}createBody(){const t=new sn(this.radius,this.radius*1.2,1,16);this.body=new st({mass:0,shape:t,material:new Qe({friction:.1,restitution:2})}),this.body.position.set(this.position.x,.5,this.position.z),this.body.userData={type:"explosiveBumper"},this.world.addBody(this.body)}update(t,e,i){if(this.animTime+=t,this.isReady){const n=.3+Math.sin(this.animTime*5)*.2;this.mesh.material.emissiveIntensity=n,this.dangerRing.material.opacity=.2+Math.sin(this.animTime*3)*.1;const s=1+Math.sin(this.animTime*4)*.05;this.mesh.scale.set(s,1,s)}if(this.icon.rotation.z+=t,e&&i&&this.isReady){const n=e.x-this.position.x,s=e.z-this.position.z,r=Math.sqrt(n*n+s*s);r<this.radius+.5&&this.explode(i,n,s,r)}}explode(t,e,i,n){this.isReady=!1;const s=n>0?e/n:0,r=n>0?i/n:1;t.velocity.x+=s*this.explosionForce,t.velocity.z+=r*this.explosionForce,t.velocity.y+=this.explosionForce*.5,this.mesh.material.emissiveIntensity=1,this.mesh.scale.set(1.3,1.3,1.3),this.onExplode&&this.onExplode(this,{x:s,z:r}),setTimeout(()=>{this.isReady=!0,this.mesh.material.emissiveIntensity=.3,this.mesh.scale.set(1,1,1)},this.cooldown)}reset(){this.isReady=!0,this.mesh.material.emissiveIntensity=.3,this.mesh.scale.set(1,1,1)}dispose(){this.scene.remove(this.mesh),this.scene.remove(this.dangerRing),this.world.removeBody(this.body)}}class i_{constructor(t,e,i={}){this.scene=t,this.world=e,this.obstacles=[],this.animatedObstacles=[],this.bonusItems=[],this.specialObstacles=[],this.terrainZones=[],this.width=16,this.length=240,this.pinAreaZ=235,this.groundMaterial=new Qe("ground"),this.obstacleMaterial=new Qe("obstacle"),this.onBumperHit=i.onBumperHit||null,this.onCatAttack=i.onCatAttack||null,this.onLaunch=i.onLaunch||null,this.onChaserHit=i.onChaserHit||null,this.onPatrollerHit=i.onPatrollerHit||null,this.onExplosiveBumperHit=i.onExplosiveBumperHit||null,this.onVortexCapture=i.onVortexCapture||null,this.onVortexRelease=i.onVortexRelease||null,this.onPachinkoHit=i.onPachinkoHit||null,this.onBonusCollect=i.onBonusCollect||null,this.onFakeBonusTrigger=i.onFakeBonusTrigger||null,this.onExplosion=i.onExplosion||null,this.onPopupSpike=i.onPopupSpike||null,this.onCollapsingFloor=i.onCollapsingFloor||null,this.onZoneEnter=i.onZoneEnter||null,this.onZoneExit=i.onZoneExit||null,this.themes=["grass","desert","ice","volcano","space","candy"],this.currentTheme="grass"}generate(t=1){this.dispose(),this.currentTheme=this.themes[(t-1)%this.themes.length],this.createGround(),this.createWalls(),this.generateRandomCourse(t),this.createPinArea()}getThemeColors(){const t={grass:{ground:4881497,accent:3066993,sky:8900331},desert:{ground:12759680,accent:15965202,sky:16767131},ice:{ground:8900331,accent:3447003,sky:13955577},volcano:{ground:4868682,accent:15158332,sky:2889744},space:{ground:1710638,accent:10181046,sky:657941},candy:{ground:16758465,accent:16738740,sky:16770281}};return t[this.currentTheme]||t.grass}createGround(){const t=this.getThemeColors(),e=new qt(this.width,this.length,1,20),i=new Lt({color:t.ground,roughness:.8});this.groundMesh=new q(e,i),this.groundMesh.rotation.x=-Math.PI/2,this.groundMesh.position.set(0,0,this.length/2),this.groundMesh.receiveShadow=!0,this.scene.add(this.groundMesh),this.createLaneLines();const n=new zi(new b(this.width/2,.1,this.length/2)),s=new st({mass:0,shape:n,material:this.groundMaterial});s.position.set(0,-.1,this.length/2),this.world.addBody(s),this.obstacles.push({body:s})}createLaneLines(){const t=new xt({color:16777215,transparent:!0,opacity:.3});for(let e=0;e<this.length;e+=4){const i=new qt(.1,2),n=new q(i,t);n.rotation.x=-Math.PI/2,n.position.set(0,.02,e+1),this.scene.add(n),this.obstacles.push({mesh:n})}for(let e=20;e<this.length-20;e+=20){const i=new qt(this.width*.8,.5),n=new q(i,t);n.rotation.x=-Math.PI/2,n.position.set(0,.02,e),this.scene.add(n),this.obstacles.push({mesh:n})}}createWalls(){const e=new Ye(.3,1.5,this.length),i=new Lt({color:4473924,roughness:.6}),n=new q(e,i);n.position.set(-this.width/2-.15,1.5/2,this.length/2),n.castShadow=!0,this.scene.add(n),this.obstacles.push({mesh:n});const s=n.clone();s.position.x=this.width/2+.15,this.scene.add(s),this.obstacles.push({mesh:s});const r=new zi(new b(.15,1.5/2,this.length/2)),a=new st({mass:0,shape:r,material:this.obstacleMaterial});a.position.set(-this.width/2-.15,1.5/2,this.length/2),this.world.addBody(a),this.obstacles.push({body:a});const c=new st({mass:0,shape:r,material:this.obstacleMaterial});c.position.set(this.width/2+.15,1.5/2,this.length/2),this.world.addBody(c),this.obstacles.push({body:c})}generateRandomCourse(t){const e=t*12345,i=this.seededRandom(e);[{start:10,end:50,name:"warmup"},{start:50,end:100,name:"hazards"},{start:100,end:150,name:"chaos"},{start:150,end:190,name:"gauntlet"},{start:190,end:220,name:"approach"}].forEach(s=>{this.generateSection(s,i,t)}),this.addSpecialEvent(t,i)}generateSection(t,e,i){const{start:n,end:s,name:r}=t,a=this.width;switch(r){case"warmup":if(e()>.4){const c=e()>.5?"ice":"sand";this.createTerrainZone(0,n+5,15,c)}for(let c=0;c<5;c++)if(e()>.3){const l=(e()-.5)*(a-2),h=n+5+e()*20;this.createBumper(l,h)}if(e()>.5&&this.createLaunchPad((e()-.5)*4,n+30),e()>.5&&this.createEffectZone(0,n+20,"speed"),i>=2&&e()>.5){const c=e()>.5?1:-1;this.createConveyorBelt((e()-.5)*4,n+35,c)}i>=2&&e()>.6&&this.createEffectZone((e()-.5)*4,n+38,"giant"),i>=3&&e()>.6&&this.createNarrowPath(n+25,10,3);break;case"hazards":e()>.3&&this.createPachinkoZone(0,n+5,12);for(let c=0;c<3;c++)if(e()>.3){const l=(e()-.5)*(a-4);this.createRotatingBar(l,n+15+c*10)}for(let c=0;c<6;c++)if(e()>.3){const l=(e()-.5)*(a-2),h=n+e()*(s-n);this.createRock(l,h)}if(i>=2){for(let c=0;c<2;c++)if(e()>.4){const l=(e()-.5)*(a-4),h=n+20+e()*20;this.createChaserEnemy(l,h)}}if(i>=2){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-5),h=n+25+e()*15,u=e()>.5?"horizontal":"vertical";this.createPatrollingObstacle(l,h,u)}}if(i>=2){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-3),h=n+10+e()*30;this.createExplosiveBarrel(l,h)}}if(i>=3){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-4),h=n+25+e()*15;this.createPopupSpike(l,h)}}i>=2&&e()>.5&&this.createEffectZone((e()-.5)*4,n+35,"slip"),i>=3&&e()>.5&&this.createEffectZone((e()-.5)*4,n+42,"shrink"),i>=4&&e()>.5&&this.createGapSection(n+35,4);break;case"chaos":for(let c=0;c<8;c++){const l=(e()-.5)*(a-2),h=n+5+c*5;this.createBumper(l,h)}if(i>=3&&e()>.3){const c=(e()-.5)*6,l=n+15+e()*15;this.createVortex(c,l)}if(i>=4&&e()>.3){const c=(e()-.5)*6,l=n+25+e()*10;this.createCat(c,l)}e()>.4&&this.createCliffPath(n+35,12);for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-4),h=n+10+e()*30;this.createLaunchPad(l,h)}if(i>=4){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-5),h=n+20+e()*20;this.createCollapsingFloor(l,h)}}if(i>=3){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*4,h=n+15+e()*25,u=e()>.5?1:-1;this.createConveyorBelt(l,h,u)}}if(i>=5&&e()>.4){const c=e()>.5?1:-1;this.createMagnetZone(0,n+30,"push",c*8,n+30)}e()>.5&&this.createEffectZone((e()-.5)*4,n+8,"speed"),i>=5&&e()>.5&&this.createWindingPath(n+25,20,3,2);break;case"gauntlet":for(let c=0;c<3;c++)this.createPiston(-a/2+1,n+5+c*12),this.createPiston(a/2-1,n+11+c*12);e()>.4&&this.createWindZone(0,n+20,15);for(let c=0;c<4;c++)if(e()>.3){const l=(e()-.5)*(a-4);this.createRotatingBar(l,n+5+c*8)}for(let c=0;c<3;c++)if(e()>.4){const l=(e()-.5)*(a-4),h=n+10+e()*25;this.createExplosiveBumper(l,h)}if(i>=4){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-4),h=n+15+e()*20;this.createChaserEnemy(l,h)}}for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-5),h=n+8+e()*25;this.createPatrollingObstacle(l,h,"horizontal")}e()>.4&&this.createVortex((e()-.5)*6,n+30);for(let c=0;c<3;c++)if(e()>.4){const l=(e()-.5)*(a-4),h=n+8+e()*25;this.createExplosiveBarrel(l,h)}for(let c=0;c<3;c++)if(e()>.5){const l=(e()-.5)*(a-3),h=n+15+e()*20;this.createPopupSpike(l,h)}if(i>=5){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-5),h=n+12+e()*20;this.createCollapsingFloor(l,h)}}i>=5&&e()>.4&&this.createEffectZone((e()-.5)*4,n+28,"bomb"),i>=3&&e()>.5&&this.createEffectZone((e()-.5)*4,n+35,"slip"),i>=6&&e()>.4&&this.createNarrowPath(n+30,12,2),i>=7&&e()>.5&&this.createGapSection(n+25,5);break;case"approach":for(let c=0;c<4;c++)this.createBumper(-3+c*2,n+5),this.createBumper(-3+c*2,n+12);if(this.createBonus((e()-.5)*6,n+e()*10,"speed"),this.createBonus((e()-.5)*6,n+15+e()*5,"giant"),i>=3&&e()>.4){const c=e()>.5?1:-1;this.createConveyorBelt(0,n+18,c)}i>=6&&e()>.5&&this.createPopupSpike((e()-.5)*4,n+22),i>=8&&e()>.4&&this.createPinIsland(5),i>=9&&e()>.5&&this.createNarrowPath(n+10,10,2.5);break}for(let c=0;c<2;c++)if(e()>.4){const l=["speed","shield","giant"],h=l[Math.floor(e()*l.length)];this.createBonus((e()-.5)*(a-2),n+e()*(s-n),h)}if(i>=3)for(let c=0;c<2;c++)e()>.5&&this.createFakeBonus((e()-.5)*(a-2),n+e()*(s-n))}addSpecialEvent(t,e){t===1?this.createArrowGuide(0,15):t===5?this.createBossBumperFormation(60):t===10&&this.createChaosZone(50,30)}createArrowGuide(t,e){const i=new Rs;i.moveTo(0,1),i.lineTo(-.5,0),i.lineTo(-.2,0),i.lineTo(-.2,-1),i.lineTo(.2,-1),i.lineTo(.2,0),i.lineTo(.5,0),i.closePath();const n=new Qn(i),s=new xt({color:65280,transparent:!0,opacity:.5,side:Yt}),r=new q(n,s);r.rotation.x=-Math.PI/2,r.position.set(t,.05,e),this.scene.add(r),this.obstacles.push({mesh:r})}createBossBumperFormation(t){[{x:0,z:t},{x:-1.5,z:t+3},{x:1.5,z:t+3},{x:-3,z:t+6},{x:0,z:t+6},{x:3,z:t+6},{x:-1.5,z:t+9},{x:1.5,z:t+9},{x:0,z:t+12}].forEach(i=>{this.createBumper(i.x,i.z,{color:16711680})})}createChaosZone(t,e){for(let i=0;i<15;i++){const n=(Math.random()-.5)*6,s=t+Math.random()*e,r=Math.random();r<.3?this.createBumper(n,s):r<.5?this.createRock(n,s):r<.7&&this.createRotatingBar(n,s)}this.createCat(-2,t+10),this.createCat(2,t+20),this.createVortex(0,t+15),this.createChaserEnemy(-3,t+25),this.createChaserEnemy(3,t+25),this.createExplosiveBumper(0,t+20),this.createLaunchPad(-4,t+5),this.createLaunchPad(4,t+5),this.createExplosiveBarrel(-5,t+8),this.createExplosiveBarrel(5,t+12),this.createExplosiveBarrel(0,t+22),this.createPopupSpike(-2,t+18),this.createPopupSpike(2,t+28),this.createPopupSpike(0,t+5),this.createPatrollingObstacle(-4,t+20,"horizontal"),this.createPatrollingObstacle(4,t+20,"horizontal"),this.createExplosiveBumper(-2,t+25),this.createExplosiveBumper(2,t+25),this.createConveyorBelt(-4,t+15,-1),this.createConveyorBelt(4,t+15,1),this.createCollapsingFloor(-2,t+12),this.createCollapsingFloor(2,t+8),this.createFakeBonus(-1,t+7),this.createFakeBonus(1,t+17),this.createBonus(0,t+3,"speed"),this.createBonus(-3,t+27,"giant")}createTerrainZone(t,e,i,n){let s,r;switch(n){case"ice":s=8900331,r=.05;break;case"sand":s=12759680,r=.8;break;case"mud":s=6636321,r=.9;break;default:s=4881497,r=.3}const a=new qt(this.width,i),c=new Lt({color:s,roughness:n==="ice"?.1:.9,transparent:!0,opacity:.8}),l=new q(a,c);l.rotation.x=-Math.PI/2,l.position.set(t,.01,e+i/2),l.receiveShadow=!0,this.scene.add(l);const h={type:n,friction:r,startZ:e,endZ:e+i,x:t,width:this.width};this.terrainZones.push(h),this.obstacles.push({mesh:l,zoneData:h,isTerrainZone:!0})}createWindZone(t,e,i){const n=new qt(this.width,i),s=new Lt({color:11393254,transparent:!0,opacity:.3}),r=new q(n,s);r.rotation.x=-Math.PI/2,r.position.set(t,.01,e+i/2),this.scene.add(r);const a=new Pe,c=50,l=new Float32Array(c*3);for(let m=0;m<c;m++)l[m*3]=(Math.random()-.5)*this.width,l[m*3+1]=Math.random()*2,l[m*3+2]=e+Math.random()*i;a.setAttribute("position",new di(l,3));const h=new Gl({color:16777215,size:.1,transparent:!0,opacity:.5}),u=new Ru(a,h);this.scene.add(u);const d=Math.random()>.5?1:-1,f={type:"wind",startZ:e,endZ:e+i,windForce:{x:d*5,z:0},particles:u};this.terrainZones.push(f),this.obstacles.push({mesh:r,particles:u,zoneData:f,isTerrainZone:!0})}createCliffPath(t,e){const n=new qt((this.width-3)/2,e),s=new Lt({color:1710638,roughness:1}),r=new q(n,s);r.rotation.x=-Math.PI/2,r.position.set(-(this.width/4+3/4),.02,t+e/2),this.scene.add(r),this.obstacles.push({mesh:r});const a=r.clone();a.position.x=this.width/4+3/4,this.scene.add(a),this.obstacles.push({mesh:a}),this.createDangerSign(-2.5,t),this.createDangerSign(2.5,t),this.terrainZones.push({type:"cliff",startZ:t,endZ:t+e,pathWidth:3})}createDangerSign(t,e){const i=new qt(.6,.6),n=document.createElement("canvas");n.width=64,n.height=64;const s=n.getContext("2d");s.fillStyle="#ffcc00",s.beginPath(),s.moveTo(32,5),s.lineTo(59,55),s.lineTo(5,55),s.closePath(),s.fill(),s.fillStyle="#000",s.font="bold 30px Arial",s.fillText("!",25,48);const r=new en(n),a=new xt({map:r,transparent:!0,side:Yt}),c=new q(i,a);c.position.set(t,1.5,e),c.rotation.y=Math.PI/4,this.scene.add(c),this.obstacles.push({mesh:c})}createRock(t,e){const i=.5+Math.random()*.3,n=new Aa(i,1),s=new Lt({color:6710886,roughness:.9}),r=new q(n,s);r.position.set(t,i,e),r.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),r.castShadow=!0,this.scene.add(r);const a=new Zn(i),c=new st({mass:0,shape:a,material:this.obstacleMaterial});c.position.set(t,i,e),this.world.addBody(c),this.obstacles.push({mesh:r,body:c})}createRotatingBar(t,e){const r=new Ye(4,.8,.3),a=new Lt({color:15158332,roughness:.5}),c=new q(r,a);c.position.set(t,.8/2+.1,e),c.castShadow=!0,this.scene.add(c);const l=new zi(new b(4/2,.8/2,.3/2)),h=new st({mass:0,shape:l,type:st.KINEMATIC});h.position.set(t,.8/2+.1,e),this.world.addBody(h),this.animatedObstacles.push({mesh:c,body:h,type:"rotating",speed:1.5+Math.random(),centerX:t,centerZ:e}),this.obstacles.push({mesh:c,body:h})}createPachinkoZone(t,e,i){const s=Math.floor(i/1.5),r=4,a=1.8;for(let u=0;u<s;u++){const d=u%2===0?0:a*.5,f=Math.floor(Math.random()*r);for(let m=0;m<r;m++){if(m===f)continue;const x=t-(r-1)*a/2+m*a+d,p=e+u*1.5,g=new ve(.1,.1,.8,12),v=new Lt({color:15965202,roughness:.2,metalness:.7,emissive:15965202,emissiveIntensity:.2}),y=new q(g,v);y.position.set(x,.4,p),y.castShadow=!0,this.scene.add(y);const _=new sn(.1,.1,.8,8),E=new st({mass:0,shape:_,material:new Qe({friction:.05,restitution:1.2})});E.position.set(x,.4,p),E.userData={type:"pachinko"},E.addEventListener("collide",()=>{this.onPachinkoHit&&this.onPachinkoHit({x,z:p}),y.material.emissiveIntensity=1,setTimeout(()=>{y.material.emissiveIntensity=.2},100)}),this.world.addBody(E),this.obstacles.push({mesh:y,body:E,isPachinko:!0})}}const c=new qt(r*a+2,i),l=new Lt({color:2899536,roughness:.9,transparent:!0,opacity:.5}),h=new q(c,l);h.rotation.x=-Math.PI/2,h.position.set(t,.01,e+i/2),this.scene.add(h),this.obstacles.push({mesh:h})}createBumper(t,e,i={}){const n=new Vv(this.scene,this.world,t,e,{...i,onHit:s=>{this.onBumperHit&&this.onBumperHit(s)}});this.specialObstacles.push(n)}createPiston(t,e){const r=new Ye(1,.8,.5),a=new Lt({color:3447003,roughness:.4,metalness:.6}),c=new q(r,a),l=t>0?this.width/2+1/2:-this.width/2-1/2;c.position.set(l,.8/2,e),c.castShadow=!0,this.scene.add(c);const h=new zi(new b(1/2,.8/2,.5/2)),u=new st({mass:0,shape:h,type:st.KINEMATIC});u.position.set(l,.8/2,e),this.world.addBody(u),this.animatedObstacles.push({mesh:c,body:u,type:"piston",startX:l,targetX:t>0?1.5:-1.5,direction:t>0?-1:1,speed:3+Math.random()*2,timer:Math.random()*2}),this.obstacles.push({mesh:c,body:u})}createCat(t,e){const i=new Hv(this.scene,this.world,t,e,{onAttack:n=>{this.onCatAttack&&this.onCatAttack(n)}});this.specialObstacles.push(i)}createChaserEnemy(t,e){const i=new Qv(this.scene,this.world,t,e,{onHit:n=>{this.onChaserHit&&this.onChaserHit(n)}});this.specialObstacles.push(i)}createPatrollingObstacle(t,e,i="horizontal"){const n=new t_(this.scene,this.world,t,e,{direction:i,onHit:s=>{this.onPatrollerHit&&this.onPatrollerHit(s)}});this.specialObstacles.push(n)}createExplosiveBumper(t,e){const i=new e_(this.scene,this.world,t,e,{onExplode:(n,s)=>{this.onExplosiveBumperHit&&this.onExplosiveBumperHit(n,s)}});this.specialObstacles.push(i)}createLaunchPad(t,e){const i=new Wv(this.scene,this.world,t,e,{onLaunch:(n,s)=>{this.onLaunch&&this.onLaunch(n,s)}});this.specialObstacles.push(i)}createVortex(t,e){const i=new qv(this.scene,this.world,t,e,{onCapture:n=>{this.onVortexCapture&&this.onVortexCapture(n)},onRelease:(n,s)=>{this.onVortexRelease&&this.onVortexRelease(n,s)}});this.specialObstacles.push(i)}createFakeBonus(t,e){const i=new Xv(this.scene,this.world,t,e,{onTrigger:(n,s)=>{this.onFakeBonusTrigger&&this.onFakeBonusTrigger(n,s)}});this.specialObstacles.push(i)}createExplosiveBarrel(t,e){const i=new Yv(this.scene,this.world,t,e,{onExplode:(n,s)=>{this.onExplosion&&this.onExplosion(n,s)}});this.specialObstacles.push(i)}createPopupSpike(t,e){const i=new Zv(this.scene,this.world,t,e,{onPopup:(n,s)=>{this.onPopupSpike&&this.onPopupSpike(n,s)}});this.specialObstacles.push(i)}createMagnetZone(t,e,i="pull",n=null,s=null){const r=new Kv(this.scene,t,e,{type:i,targetX:n||t,targetZ:s||e});this.specialObstacles.push(r)}createConveyorBelt(t,e,i=1){const n=new jv(this.scene,t,e,{direction:i});this.specialObstacles.push(n)}createCollapsingFloor(t,e){const i=new $v(this.scene,this.world,t,e,{onCollapse:n=>{this.onCollapsingFloor&&this.onCollapsingFloor(n)}});this.specialObstacles.push(i)}createEffectZone(t,e,i){const n=new Jv(this.scene,t,e,{type:i,onEnter:(s,r)=>{this.onZoneEnter&&this.onZoneEnter(s,i,r)},onExit:(s,r)=>{this.onZoneExit&&this.onZoneExit(s,i,r)}});this.specialObstacles.push(n)}createBonus(t,e,i){let s;switch(i){case"speed":s=15965202;break;case"shield":s=3447003;break;case"giant":s=10181046;break;default:s=3066993}const r=new wr(.4),a=new Lt({color:s,emissive:s,emissiveIntensity:.5,roughness:.2,metalness:.8}),c=new q(r,a);c.position.set(t,1,e),c.castShadow=!0,this.scene.add(c);const l=new Zn(.4*1.5),h=new st({mass:0,shape:l,collisionResponse:!1});h.position.set(t,1,e),h.userData={type:"bonus",bonusType:i},this.world.addBody(h),this.bonusItems.push({mesh:c,body:h,type:i,collected:!1})}createPinArea(){const t=new qt(6,10),e=new Lt({color:13935988,roughness:.6}),i=new q(t,e);i.rotation.x=-Math.PI/2,i.position.set(0,.02,this.pinAreaZ),i.receiveShadow=!0,this.scene.add(i),this.obstacles.push({mesh:i})}createGapSection(t,e=5){const i=new qt(this.width*.8,e),n=new Lt({color:657941,roughness:1,transparent:!0,opacity:.8}),s=new q(i,n);s.rotation.x=-Math.PI/2,s.position.set(0,.02,t+e/2),this.scene.add(s),this.obstacles.push({mesh:s}),this.createDangerSign(-3,t-1),this.createDangerSign(3,t-1),this.createLaunchPad(0,t-3),this.createBumper(-2,t+e/2),this.createBumper(2,t+e/2),this.terrainZones.push({type:"gap",startZ:t,endZ:t+e})}createNarrowPath(t,e=15,i=2){const n=new qt((this.width-i)/2,e),s=new Lt({color:1710638,roughness:1}),r=new q(n,s);r.rotation.x=-Math.PI/2,r.position.set(-(this.width/4+i/4),.02,t+e/2),this.scene.add(r),this.obstacles.push({mesh:r});const a=r.clone();a.position.x=this.width/4+i/4,this.scene.add(a),this.obstacles.push({mesh:a});const c=new qt(i,e),l=new Lt({color:15965202,roughness:.6,transparent:!0,opacity:.4}),h=new q(c,l);h.rotation.x=-Math.PI/2,h.position.set(0,.03,t+e/2),this.scene.add(h),this.obstacles.push({mesh:h}),this.createDangerSign(-i/2-.5,t),this.createDangerSign(i/2+.5,t);const u=Math.floor(e/4);for(let d=0;d<u;d++){const f=t+2+d*4;this.createBumper(-i/2-1,f,{color:16711680}),this.createBumper(i/2+1,f,{color:16711680})}}createWindingPath(t,e=30,i=4,n=2){const r=e/20,a=4;this.createDangerSign(-3,t-1),this.createDangerSign(3,t-1);for(let c=0;c<20;c++){const l=t+c*r,h=Math.sin(c/20*Math.PI*n)*i,u=new qt(a,r+.5),d=new Lt({color:15965202,roughness:.6,transparent:!0,opacity:.4}),f=new q(u,d);f.rotation.x=-Math.PI/2,f.position.set(h,.03,l+r/2),f.receiveShadow=!0,this.scene.add(f),this.obstacles.push({mesh:f});const m=Math.max(1,this.width/2+h-a/2);if(m>.5){const p=new q(new qt(m,r+.5),new Lt({color:1710638,roughness:1}));p.rotation.x=-Math.PI/2,p.position.set(-this.width/2+m/2,.02,l+r/2),this.scene.add(p),this.obstacles.push({mesh:p})}const x=Math.max(1,this.width/2-h-a/2);if(x>.5){const p=new q(new qt(x,r+.5),new Lt({color:1710638,roughness:1}));p.rotation.x=-Math.PI/2,p.position.set(this.width/2-x/2,.02,l+r/2),this.scene.add(p),this.obstacles.push({mesh:p})}c%4===0&&(this.createBumper(h-a/2-.5,l,{color:16729156}),this.createBumper(h+a/2+.5,l,{color:16729156}))}this.terrainZones.push({type:"winding",startZ:t,endZ:t+e,amplitude:i,frequency:n})}createPinIsland(t=6){const e=this.pinAreaZ-10-t,i=new qt(this.width*.8,t),n=new Lt({color:657941,roughness:1,transparent:!0,opacity:.8}),s=new q(i,n);s.rotation.x=-Math.PI/2,s.position.set(0,.02,e+t/2),this.scene.add(s),this.obstacles.push({mesh:s}),this.createDangerSign(-4,e-1),this.createDangerSign(4,e-1),this.createLaunchPad(0,e-4),this.createBumper(-3,e+t/2),this.createBumper(3,e+t/2),this.createBumper(0,e+t/2);const r=new ve(5,6,.3,32),a=new Lt({color:13935988,roughness:.6}),c=new q(r,a);c.position.set(0,.15,this.pinAreaZ+1.5),c.receiveShadow=!0,this.scene.add(c),this.obstacles.push({mesh:c}),this.terrainZones.push({type:"pinIsland",gapStart:e,gapEnd:e+t})}update(t,e,i){return this.animatedObstacles.forEach(n=>{if(n.type==="rotating"){const s=n.speed*t;n.mesh.rotation.y+=s,n.body.quaternion.setFromAxisAngle(new b(0,1,0),n.mesh.rotation.y)}if(n.type==="piston"){n.timer+=t;const s=Math.sin(n.timer*n.speed),r=Math.abs(n.targetX-n.startX),a=n.startX+(s+1)*.5*r*n.direction;n.mesh.position.x=a,n.body.position.x=a}}),this.specialObstacles.forEach(n=>{n.update&&n.update(t,e,i)}),this.bonusItems.forEach(n=>{n.collected||(n.mesh.rotation.y+=t*2,n.mesh.position.y=1+Math.sin(Date.now()*.003)*.2)}),this.terrainZones.forEach(n=>{if(n.type==="wind"&&n.particles){const s=n.particles.geometry.attributes.position.array;for(let r=0;r<s.length;r+=3)s[r]+=n.windForce.x*t,s[r]>this.width/2&&(s[r]=-this.width/2),s[r]<-this.width/2&&(s[r]=this.width/2);n.particles.geometry.attributes.position.needsUpdate=!0}}),e?this.checkTerrainEffects(e):null}checkTerrainEffects(t){for(const e of this.terrainZones)if(t.z>=e.startZ&&t.z<=e.endZ){if(e.type==="ice")return{type:"friction",value:.1};if(e.type==="sand"||e.type==="mud")return{type:"friction",value:.8};if(e.type==="wind")return{type:"wind",force:e.windForce}}return null}collectBonus(t){const e=this.bonusItems.find(i=>i.type===t&&!i.collected);return e?(e.collected=!0,this.scene.remove(e.mesh),this.world.removeBody(e.body),this.onBonusCollect&&this.onBonusCollect(t),!0):!1}resetSpecialObstacles(){this.specialObstacles.forEach(t=>{t.reset&&t.reset()})}seededRandom(t){let e=t;return function(){return e=Math.sin(e)*1e4,e-Math.floor(e)}}getPinAreaZ(){return this.pinAreaZ}dispose(){this.obstacles.forEach(t=>{t.mesh&&this.scene.remove(t.mesh),t.body&&this.world.removeBody(t.body),t.particles&&this.scene.remove(t.particles)}),this.animatedObstacles.forEach(t=>{t.mesh&&this.scene.remove(t.mesh),t.body&&this.world.removeBody(t.body)}),this.specialObstacles.forEach(t=>{t.dispose&&t.dispose()}),this.bonusItems.forEach(t=>{this.scene.remove(t.mesh),this.world.removeBody(t.body)}),this.obstacles=[],this.animatedObstacles=[],this.specialObstacles=[],this.bonusItems=[],this.terrainZones=[]}}class n_{constructor(){this.tilt={alpha:0,beta:0,gamma:0},this.calibration={beta:0,gamma:0},this.isEnabled=!1,this.isCalibrated=!1,this.hasGyroData=!1,this.isReversed=!1,this.isChaos=!1,this.chaosOffset={beta:0,gamma:0},this.chaosTimer=null,this.smoothing=.3,this.smoothedTilt={beta:0,gamma:0},this.handleOrientation=this.handleOrientation.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.keyboardState={ArrowUp:!1,ArrowDown:!1,ArrowLeft:!1,ArrowRight:!1}}enable(){this.isEnabled||(this.isEnabled=!0,console.log("TiltControl enabled"),window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),setTimeout(()=>{this.hasGyroData&&(this.calibrate(),console.log("Gyro calibrated"))},1e3))}disable(){this.isEnabled=!1,window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp)}handleOrientation(t){this.isEnabled&&t.beta!==null&&t.gamma!==null&&(this.hasGyroData=!0,this.tilt.alpha=t.alpha||0,this.tilt.beta=t.beta||0,this.tilt.gamma=t.gamma||0,this.isCalibrated&&(this.tilt.beta-=this.calibration.beta,this.tilt.gamma-=this.calibration.gamma),this.tilt.beta=Math.max(-90,Math.min(90,this.tilt.beta)),this.tilt.gamma=Math.max(-90,Math.min(90,this.tilt.gamma)),this.smoothedTilt.beta+=(this.tilt.beta-this.smoothedTilt.beta)*this.smoothing,this.smoothedTilt.gamma+=(this.tilt.gamma-this.smoothedTilt.gamma)*this.smoothing)}handleKeyDown(t){this.keyboardState.hasOwnProperty(t.key)&&(this.keyboardState[t.key]=!0,t.preventDefault())}handleKeyUp(t){this.keyboardState.hasOwnProperty(t.key)&&(this.keyboardState[t.key]=!1,t.preventDefault())}calibrate(){this.calibration.beta=this.tilt.beta,this.calibration.gamma=this.tilt.gamma,this.isCalibrated=!0}getTilt(){const t={beta:0,gamma:0};this.keyboardState.ArrowUp&&(t.beta+=30),this.keyboardState.ArrowDown&&(t.beta-=30),this.keyboardState.ArrowLeft&&(t.gamma-=30),this.keyboardState.ArrowRight&&(t.gamma+=30);let e;return t.beta!==0||t.gamma!==0?e=t:e={beta:this.smoothedTilt.beta,gamma:this.smoothedTilt.gamma},this.isReversed&&(e.gamma=-e.gamma),this.isChaos&&(e.beta+=this.chaosOffset.beta,e.gamma+=this.chaosOffset.gamma),e}setReversed(t){this.isReversed=t}setChaos(t){this.isChaos=t,t?(this.updateChaosOffset(),this.chaosTimer=setInterval(()=>{this.updateChaosOffset()},200)):(this.chaosTimer&&(clearInterval(this.chaosTimer),this.chaosTimer=null),this.chaosOffset={beta:0,gamma:0})}updateChaosOffset(){this.chaosOffset={beta:(Math.random()-.5)*40,gamma:(Math.random()-.5)*50}}hasGyro(){return this.hasGyroData}}class s_{constructor(){this.frames=[],this.reset()}reset(){this.frames=[];for(let t=0;t<10;t++)this.frames.push({throw1:null,throw2:null,throw3:null,score:null,cumulative:null,isStrike:!1,isSpare:!1})}recordThrow(t,e,i){const n=t-1,s=this.frames[n];t===10?e===1?(s.throw1=i,s.isStrike=i===10):e===2?(s.throw2=i,s.isStrike||(s.isSpare=s.throw1+i===10)):e===3&&(s.throw3=i):e===1?(s.throw1=i,s.isStrike=i===10):(s.throw2=i,s.isSpare=s.throw1+i===10),this.calculateScores()}calculateScores(){let t=0;for(let e=0;e<10;e++){const i=this.frames[e];if(i.throw1===null){i.score=null,i.cumulative=null;continue}if(e===9){if(i.throw1===null)continue;i.isStrike?i.throw2!==null&&i.throw3!==null&&(i.score=i.throw1+i.throw2+i.throw3):i.isSpare?i.throw3!==null&&(i.score=i.throw1+i.throw2+i.throw3):i.throw2!==null&&(i.score=i.throw1+i.throw2)}else if(i.isStrike){const n=this.getNextTwoThrows(e);n.length===2&&(i.score=10+n[0]+n[1])}else if(i.isSpare){const n=this.getNextThrow(e);n!==null&&(i.score=10+n)}else i.throw2!==null&&(i.score=i.throw1+i.throw2);i.score!==null&&(t+=i.score,i.cumulative=t)}}getNextThrow(t){const e=this.frames[t+1];return!e||e.throw1===null?null:e.throw1}getNextTwoThrows(t){const e=[];let i=t+1,n=0;for(;e.length<2&&i<10;){const s=this.frames[i];if(!s)break;if(n===0){if(s.throw1===null)break;if(e.push(s.throw1),n++,s.isStrike&&i<9){i++,n=0;continue}}if(n===1&&e.length<2){if(s.throw2===null)break;e.push(s.throw2)}break}if(i===9&&e.length<2){const s=this.frames[9];s.throw1!==null&&e.length===0&&e.push(s.throw1),s.throw2!==null&&e.length===1&&e.push(s.throw2)}return e}getTotalScore(){let t=0;for(const e of this.frames)e.score!==null?t+=e.score:e.throw1!==null&&(t+=e.throw1,e.throw2!==null&&(t+=e.throw2),e.throw3!==null&&(t+=e.throw3));return t}getFrameTotal(t){const e=this.frames[t-1];if(!e)return 0;let i=e.throw1||0;return e.throw2!==null&&(i+=e.throw2),i}isFrameComplete(t){const e=this.frames[t-1];return e?t===10?e.isStrike||e.isSpare?e.throw3!==null:e.throw2!==null:e.isStrike||e.throw2!==null:!1}getFrameData(){return this.frames}}class r_{constructor(t){this.scene=t,this.particles=[],this.emitters=[]}createStrikeEffect(t){const e=[15965202,15158332,3066993,3447003,10181046,16777215],i=100;for(let n=0;n<i;n++){const s=new qt(.15,.3),r=new xt({color:e[Math.floor(Math.random()*e.length)],side:Yt,transparent:!0}),a=new q(s,r);a.position.set(t.x+(Math.random()-.5)*2,t.y+Math.random()*3,t.z+(Math.random()-.5)*2),a.velocity=new N((Math.random()-.5)*15,Math.random()*20+10,(Math.random()-.5)*15),a.rotationSpeed=new N(Math.random()*10,Math.random()*10,Math.random()*10),a.life=3,a.maxLife=3,this.scene.add(a),this.particles.push(a)}}createSpareEffect(t){for(let i=0;i<50;i++){const n=new pe(.08,8,8),s=new xt({color:3066993,transparent:!0}),r=new q(n,s),a=i/50*Math.PI*2,c=2+Math.random()*2;r.position.set(t.x+Math.cos(a)*c,t.y+1,t.z+Math.sin(a)*c),r.velocity=new N(Math.cos(a)*5,Math.random()*10+5,Math.sin(a)*5),r.life=2,r.maxLife=2,this.scene.add(r),this.particles.push(r)}}createGutterEffect(t){for(let i=0;i<30;i++){const n=new pe(.05,6,6),s=new xt({color:3447003,transparent:!0}),r=new q(n,s);r.position.set(t.x+(Math.random()-.5)*4,t.y+8+Math.random()*2,t.z+(Math.random()-.5)*4),r.velocity=new N(0,-10,0),r.life=2,r.maxLife=2,this.scene.add(r),this.particles.push(r)}}createExplosionEffect(t,e=16737792){for(let n=0;n<40;n++){const s=new pe(.1+Math.random()*.1,8,8),r=new xt({color:e,transparent:!0}),a=new q(s,r);a.position.copy(t);const c=Math.random()*Math.PI*2,l=Math.random()*Math.PI,h=10+Math.random()*10;a.velocity=new N(Math.sin(l)*Math.cos(c)*h,Math.sin(l)*Math.sin(c)*h,Math.cos(l)*h),a.life=1.5,a.maxLife=1.5,this.scene.add(a),this.particles.push(a)}}createBounceEffect(t){for(let i=0;i<15;i++){const n=new pi(.1,.15,8),s=new xt({color:16776960,side:Yt,transparent:!0}),r=new q(n,s);r.position.copy(t),r.rotation.x=-Math.PI/2,r.scale.set(.1,.1,.1),r.targetScale=3+Math.random()*2,r.velocity=new N(0,.5,0),r.life=.5,r.maxLife=.5,r.isRing=!0,this.scene.add(r),this.particles.push(r)}}createLaunchEffect(t){for(let i=0;i<25;i++){const n=new nn(.1,.3,6),s=new xt({color:i%2===0?3447003:65280,transparent:!0}),r=new q(n,s),a=i/25*Math.PI*2,c=.5+Math.random()*.5;r.position.set(t.x+Math.cos(a)*c,t.y+.3,t.z+Math.sin(a)*c),r.rotation.x=Math.PI,r.velocity=new N(Math.cos(a)*3,Math.random()*8+12,Math.sin(a)*3),r.rotationSpeed=new N(Math.random()*5,Math.random()*5,Math.random()*5),r.life=1.5,r.maxLife=1.5,this.scene.add(r),this.particles.push(r)}}createVortexEffect(t){for(let i=0;i<30;i++){const n=new pe(.08,8,8),s=new xt({color:10181046,transparent:!0}),r=new q(n,s),a=i/30*Math.PI*4,c=.5+i/30*2;r.position.set(t.x+Math.cos(a)*c,t.y+.5+i/30*2,t.z+Math.sin(a)*c),r.velocity=new N(Math.cos(a+Math.PI/2)*8,5+Math.random()*3,Math.sin(a+Math.PI/2)*8),r.life=1.2,r.maxLife=1.2,this.scene.add(r),this.particles.push(r)}}createTrapEffect(t){const i=[16711782,16711935,0];for(let n=0;n<25;n++){const s=new vr(.15),r=new xt({color:i[Math.floor(Math.random()*i.length)],transparent:!0}),a=new q(s,r);a.position.copy(t);const c=n/25*Math.PI*2,l=8+Math.random()*5;a.velocity=new N(Math.cos(c)*l,Math.random()*8+3,Math.sin(c)*l),a.rotationSpeed=new N(Math.random()*10,Math.random()*10,Math.random()*10),a.life=1.5,a.maxLife=1.5,this.scene.add(a),this.particles.push(a)}}createSpikeEffect(t){for(let i=0;i<20;i++){const n=new nn(.08,.2,4),s=new xt({color:11184810,transparent:!0}),r=new q(n,s);r.position.set(t.x+(Math.random()-.5)*2,t.y+.5,t.z+(Math.random()-.5)*2),r.velocity=new N((Math.random()-.5)*8,Math.random()*15+8,(Math.random()-.5)*8),r.rotationSpeed=new N(Math.random()*15,Math.random()*15,Math.random()*15),r.life=1.2,r.maxLife=1.2,this.scene.add(r),this.particles.push(r)}for(let i=0;i<8;i++){const n=new Qi(.3,8),s=new xt({color:9139029,transparent:!0,side:Yt}),r=new q(n,s);r.position.set(t.x,.1,t.z),r.rotation.x=-Math.PI/2,r.scale.set(.1,.1,.1),r.targetScale=3+Math.random()*2,r.velocity=new N(0,.2,0),r.life=.8,r.maxLife=.8,r.isRing=!0,this.scene.add(r),this.particles.push(r)}}createCollapseEffect(t){for(let i=0;i<35;i++){const n=new pe(.1+Math.random()*.15,6,6),s=new xt({color:9139029,transparent:!0}),r=new q(n,s);r.position.set(t.x+(Math.random()-.5)*3,t.y+Math.random()*.5,t.z+(Math.random()-.5)*3),r.velocity=new N((Math.random()-.5)*5,Math.random()*6+2,(Math.random()-.5)*5),r.life=2,r.maxLife=2,this.scene.add(r),this.particles.push(r)}for(let i=0;i<15;i++){const n=new Ye(.2,.2,.2),s=new xt({color:6636321,transparent:!0}),r=new q(n,s);r.position.set(t.x+(Math.random()-.5)*2,t.y+.3,t.z+(Math.random()-.5)*2),r.velocity=new N((Math.random()-.5)*4,-Math.random()*5-5,(Math.random()-.5)*4),r.rotationSpeed=new N(Math.random()*8,Math.random()*8,Math.random()*8),r.life=2,r.maxLife=2,this.scene.add(r),this.particles.push(r)}}createPawPrintEffect(t){const e=new Qi(.15,16),i=new xt({color:9127187,transparent:!0,opacity:.8}),n=new q(e,i);n.position.set(t.x,.01,t.z),n.rotation.x=-Math.PI/2,n.life=3,n.maxLife=3,n.isStatic=!0,this.scene.add(n),this.particles.push(n);const s=new Qi(.08,16);[{x:-.12,z:-.2},{x:.12,z:-.2},{x:-.18,z:-.08},{x:.18,z:-.08}].forEach(a=>{const c=new q(s,i.clone());c.position.set(t.x+a.x,.01,t.z+a.z),c.rotation.x=-Math.PI/2,c.life=3,c.maxLife=3,c.isStatic=!0,this.scene.add(c),this.particles.push(c)})}update(t){for(let i=this.particles.length-1;i>=0;i--){const n=this.particles[i];if(n.life-=t,n.life<=0){this.scene.remove(n),this.particles.splice(i,1);continue}const s=n.life/n.maxLife;if(n.material&&(n.material.opacity=s),!n.isStatic)if(n.isRing){const r=n.targetScale*(1-s);n.scale.set(r,r,r),n.position.y+=n.velocity.y*t}else n.velocity.y+=-30*t,n.position.x+=n.velocity.x*t,n.position.y+=n.velocity.y*t,n.position.z+=n.velocity.z*t,n.rotationSpeed&&(n.rotation.x+=n.rotationSpeed.x*t,n.rotation.y+=n.rotationSpeed.y*t,n.rotation.z+=n.rotationSpeed.z*t)}}createBoostEffect(t){for(let i=0;i<20;i++){const n=new pe(.1,8,8),s=new xt({color:15965202,transparent:!0}),r=new q(n,s);r.position.set(t.x+(Math.random()-.5)*.5,t.y,t.z-Math.random()*2),r.velocity=new N((Math.random()-.5)*3,Math.random()*2,-Math.random()*10),r.life=.5,r.maxLife=.5,this.scene.add(r),this.particles.push(r)}}createPowerHitEffect(t){for(let r=0;r<30;r++){const a=new vr(.15),c=new xt({color:r%2===0?15158332:15965202,transparent:!0}),l=new q(a,c);l.position.set(t.x+(Math.random()-.5)*1,t.y+Math.random()*.5,t.z+(Math.random()-.5)*1),l.velocity=new N((Math.random()-.5)*8,Math.random()*5+3,(Math.random()-.5)*8),l.rotationSpeed=new N(Math.random()*15,Math.random()*15,Math.random()*15),l.life=1,l.maxLife=1,this.scene.add(l),this.particles.push(l)}const i=new pi(.5,.7,32),n=new xt({color:16711680,side:Yt,transparent:!0,opacity:.8}),s=new q(i,n);s.position.set(t.x,t.y+.5,t.z),s.rotation.x=-Math.PI/2,s.isRing=!0,s.targetScale=8,s.velocity=new N(0,0,0),s.life=.5,s.maxLife=.5,this.scene.add(s),this.particles.push(s)}clear(){this.particles.forEach(t=>this.scene.remove(t)),this.particles=[]}}class o_{constructor(){this.audioContext=null,this.masterGain=null,this.enabled=!0,this.initialized=!1}async init(){if(!this.initialized)try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.masterGain=this.audioContext.createGain(),this.masterGain.connect(this.audioContext.destination),this.masterGain.gain.value=.5,this.initialized=!0}catch{console.warn("Web Audio API not supported"),this.enabled=!1}}resume(){this.audioContext&&this.audioContext.state==="suspended"&&this.audioContext.resume()}playTone(t,e,i="sine",n=.3){if(!this.enabled||!this.audioContext)return;const s=this.audioContext.createOscillator(),r=this.audioContext.createGain();s.connect(r),r.connect(this.masterGain),s.frequency.value=t,s.type=i,r.gain.setValueAtTime(n,this.audioContext.currentTime),r.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+e),s.start(),s.stop(this.audioContext.currentTime+e)}playStrike(){if(!this.enabled)return;[523.25,659.25,783.99,1046.5].forEach((e,i)=>{setTimeout(()=>{this.playTone(e,.3,"square",.2),this.playTone(e*1.5,.3,"triangle",.1)},i*100)}),setTimeout(()=>this.playNoise(.5,.3),300)}playSpare(){if(!this.enabled)return;[392,493.88,587.33].forEach((e,i)=>{setTimeout(()=>{this.playTone(e,.2,"triangle",.25)},i*80)})}playGutter(){if(!this.enabled)return;[392,349.23,311.13,277.18].forEach((e,i)=>{setTimeout(()=>{this.playTone(e,.4,"sawtooth",.15)},i*200)})}playPinHit(){this.enabled&&(this.playTone(800+Math.random()*400,.1,"square",.2),this.playTone(200+Math.random()*100,.15,"triangle",.3))}playRolling(t){if(!this.enabled||!this.audioContext)return;const e=Math.min(t/15,1)*.1;this.playTone(80+t*3,.1,"sine",e)}playBumper(){this.enabled&&(this.playTone(600,.05,"square",.3),this.playTone(900,.1,"sine",.2),setTimeout(()=>{this.playTone(1200,.05,"square",.2)},50))}playCatMeow(){if(!this.enabled)return;const t=700,e=400,i=.4,n=this.audioContext.createOscillator(),s=this.audioContext.createGain();n.connect(s),s.connect(this.masterGain),n.type="sine",n.frequency.setValueAtTime(t,this.audioContext.currentTime),n.frequency.exponentialRampToValueAtTime(e,this.audioContext.currentTime+i*.7),n.frequency.exponentialRampToValueAtTime(t*.8,this.audioContext.currentTime+i),s.gain.setValueAtTime(.3,this.audioContext.currentTime),s.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+i),n.start(),n.stop(this.audioContext.currentTime+i)}playPitFall(){if(!this.enabled)return;const t=400;for(let e=0;e<5;e++)setTimeout(()=>{this.playTone(t-e*60,.15,"sine",.25)},e*80);setTimeout(()=>{this.playNoise(.2,.3),this.playTone(60,.3,"sawtooth",.3)},400)}playLaunch(){this.enabled&&(this.playTone(200,.1,"square",.3),setTimeout(()=>{this.playTone(400,.1,"square",.25)},50),setTimeout(()=>{this.playTone(800,.1,"square",.2)},100),setTimeout(()=>{this.playNoise(.3,.2)},100))}playVortex(){if(!this.enabled||!this.audioContext)return;const t=this.audioContext.createOscillator(),e=this.audioContext.createGain();t.connect(e),e.connect(this.masterGain),t.type="sine",t.frequency.setValueAtTime(200,this.audioContext.currentTime),t.frequency.linearRampToValueAtTime(600,this.audioContext.currentTime+.5),e.gain.setValueAtTime(.3,this.audioContext.currentTime),e.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.5),t.start(),t.stop(this.audioContext.currentTime+.5)}playVortexRelease(){if(!this.enabled)return;[300,450,600,800].forEach((e,i)=>{setTimeout(()=>{this.playTone(e,.1,"sine",.25)},i*40)}),this.playNoise(.2,.25)}playPachinko(){if(!this.enabled)return;const t=1e3+Math.random()*500;this.playTone(t,.08,"sine",.15)}playExplosion(){this.enabled&&(this.playNoise(.3,.5),this.playTone(60,.4,"sawtooth",.4),this.playTone(40,.5,"sine",.3))}playTrapActivate(){if(!this.enabled)return;[800,600,400,200].forEach((e,i)=>{setTimeout(()=>{this.playTone(e,.2,"sawtooth",.25)},i*100)}),setTimeout(()=>{this.playTone(100,.3,"square",.3)},300)}playSpikePopup(){this.enabled&&(this.playTone(1500,.05,"square",.3),this.playTone(200,.1,"sawtooth",.4),setTimeout(()=>{this.playTone(100,.15,"square",.25)},50))}playFloorCollapse(){this.enabled&&(this.playNoise(.5,.3),this.playTone(80,.4,"sawtooth",.3),setTimeout(()=>{this.playTone(60,.3,"sine",.25),this.playNoise(.3,.2)},200),setTimeout(()=>{this.playTone(40,.4,"sine",.2)},400))}playBoost(){if(!this.enabled)return;[261.63,329.63,392,523.25].forEach((e,i)=>{setTimeout(()=>{this.playTone(e,.15,"square",.2)},i*50)})}playGameOver(t){this.enabled&&(t?[523.25,659.25,783.99,659.25,783.99,1046.5].forEach((i,n)=>{setTimeout(()=>{this.playTone(i,.25,"square",.2),this.playTone(i/2,.25,"triangle",.15)},n*150)}):[392,349.23,329.63,293.66].forEach((i,n)=>{setTimeout(()=>{this.playTone(i,.4,"sawtooth",.2)},n*250)}))}playNoise(t,e=.3){if(!this.enabled||!this.audioContext)return;const i=this.audioContext.sampleRate*t,n=this.audioContext.createBuffer(1,i,this.audioContext.sampleRate),s=n.getChannelData(0);for(let l=0;l<i;l++)s[l]=Math.random()*2-1;const r=this.audioContext.createBufferSource(),a=this.audioContext.createGain(),c=this.audioContext.createBiquadFilter();r.buffer=n,c.type="lowpass",c.frequency.value=1e3,r.connect(c),c.connect(a),a.connect(this.masterGain),a.gain.setValueAtTime(e,this.audioContext.currentTime),a.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+t),r.start(),r.stop(this.audioContext.currentTime+t)}setVolume(t){this.masterGain&&(this.masterGain.gain.value=t)}toggle(){return this.enabled=!this.enabled,this.enabled}}class a_{constructor(){this.container=null,this.init()}init(){this.container=document.createElement("div"),this.container.id="celebration-container",this.container.innerHTML=`
      <div id="celebration-overlay" class="celebration hidden">
        <div class="celebration-content">
          <div class="celebration-icon"></div>
          <div class="celebration-text"></div>
          <div class="celebration-subtext"></div>
        </div>
      </div>
      <div id="emoji-rain"></div>
    `,document.body.appendChild(this.container);const t=document.createElement("style");t.textContent=`
      #celebration-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
      }

      #celebration-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s;
      }

      #celebration-overlay.show {
        opacity: 1;
      }

      .celebration-icon {
        font-size: 5rem;
        margin-bottom: 0.5rem;
        animation: bounce 0.5s ease infinite;
      }

      .celebration-text {
        font-size: 3rem;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        animation: pulse 0.3s ease infinite alternate;
      }

      .celebration-subtext {
        font-size: 1.2rem;
        margin-top: 0.5rem;
        color: #ccc;
      }

      /* Strike celebration */
      .celebration.strike .celebration-text {
        background: linear-gradient(45deg, #f39c12, #e74c3c, #f39c12);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 200% 200%;
        animation: gradient 0.5s ease infinite;
      }

      /* Spare celebration */
      .celebration.spare .celebration-text {
        color: #2ecc71;
      }

      /* Gutter */
      .celebration.gutter .celebration-text {
        color: #e74c3c;
      }

      .celebration.gutter .celebration-icon {
        animation: shake 0.5s ease infinite;
      }

      /* Turkey (3 strikes in a row) */
      .celebration.turkey .celebration-text {
        background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 400% 400%;
        animation: rainbow 1s ease infinite;
      }

      /* Perfect game */
      .celebration.perfect .celebration-content {
        animation: perfectPulse 0.5s ease infinite alternate;
      }

      #emoji-rain {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .falling-emoji {
        position: absolute;
        font-size: 2rem;
        animation: fall linear forwards;
        pointer-events: none;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      @keyframes pulse {
        from { transform: scale(1); }
        to { transform: scale(1.1); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }

      @keyframes gradient {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }

      @keyframes rainbow {
        0% { background-position: 0% 50%; }
        100% { background-position: 400% 50%; }
      }

      @keyframes perfectPulse {
        from {
          transform: scale(1);
          filter: brightness(1);
        }
        to {
          transform: scale(1.05);
          filter: brightness(1.3);
        }
      }

      @keyframes fall {
        0% {
          transform: translateY(-50px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `,document.head.appendChild(t)}showStrike(t=1){const e=document.getElementById("celebration-overlay"),i=e.querySelector(".celebration-icon"),n=e.querySelector(".celebration-text"),s=e.querySelector(".celebration-subtext");e.className="celebration",t>=3?(e.classList.add("turkey"),i.textContent="🦃",t===3?(n.textContent="TURKEY!",s.textContent="3 strikes in a row!"):t===4?(n.textContent="FOUR-BAGGER!",s.textContent="4 strikes in a row!"):t>=12?(e.classList.add("perfect"),i.textContent="👑",n.textContent="PERFECT GAME!",s.textContent="300 points!"):(n.textContent=`${t}X STRIKE!`,s.textContent=`${t} strikes in a row!`),this.startEmojiRain(["🎳","🔥","⭐","🏆","✨"],40)):(e.classList.add("strike"),i.textContent="🎳",n.textContent="STRIKE!",s.textContent=c_(),this.startEmojiRain(["🎳","⭐","✨","🎉"],20)),e.classList.remove("hidden"),e.classList.add("show"),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.classList.add("hidden"),300)},2e3)}showSpare(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),i=t.querySelector(".celebration-text"),n=t.querySelector(".celebration-subtext");t.className="celebration spare",e.textContent="👍",i.textContent="SPARE!",n.textContent=l_(),this.startEmojiRain(["✨","💚","👏"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showGutter(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),i=t.querySelector(".celebration-text"),n=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="😿",i.textContent="GUTTER!",n.textContent=h_(),this.startEmojiRain(["💧","😢","🕳️"],10),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showCatAttack(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),i=t.querySelector(".celebration-text"),n=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="🐱",i.textContent="MEOW!",n.textContent=u_(),this.startEmojiRain(["🐱","🐾","😸","🙀"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showPitFall(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),i=t.querySelector(".celebration-text"),n=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="🕳️",i.textContent="PIT FALL!",n.textContent=d_(),this.startEmojiRain(["🕳️","💀","⬇️","😱"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showExplosion(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),i=t.querySelector(".celebration-text"),n=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="💥",i.textContent="BOOM!",n.textContent=f_(),this.startEmojiRain(["💥","🔥","💣","🎆"],20),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showTrap(t){const e=document.getElementById("celebration-overlay"),i=e.querySelector(".celebration-icon"),n=e.querySelector(".celebration-text"),s=e.querySelector(".celebration-subtext");e.className="celebration gutter";const r={reverse:{icon:"🔄",text:"REVERSED!",emojis:["🔄","↩️","🌀","😵"]},shrink:{icon:"🔬",text:"SHRUNK!",emojis:["🔬","🐜","📍","😰"]},slow:{icon:"🐌",text:"SLOWED!",emojis:["🐌","🐢","⏰","😫"]},blind:{icon:"😵",text:"BLINDED!",emojis:["😵","💫","👀","🔆"]}},a=r[t]||r.reverse;i.textContent=a.icon,n.textContent=a.text,s.textContent=p_(t),this.startEmojiRain(a.emojis,15),e.classList.remove("hidden"),e.classList.add("show"),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.classList.add("hidden"),300)},1500)}startEmojiRain(t,e){const i=document.getElementById("emoji-rain");i.innerHTML="";for(let n=0;n<e;n++)setTimeout(()=>{const s=document.createElement("div");s.className="falling-emoji",s.textContent=t[Math.floor(Math.random()*t.length)],s.style.left=`${Math.random()*100}%`,s.style.animationDuration=`${2+Math.random()*2}s`,s.style.fontSize=`${1.5+Math.random()*1.5}rem`,i.appendChild(s),setTimeout(()=>s.remove(),4e3)},n*100)}showGameEnd(t,e=!1){const i=document.getElementById("celebration-overlay"),n=i.querySelector(".celebration-icon"),s=i.querySelector(".celebration-text"),r=i.querySelector(".celebration-subtext");i.className="celebration",t>=300?(i.classList.add("perfect"),n.textContent="👑",s.textContent="PERFECT!",r.textContent="The impossible achieved!",this.startEmojiRain(["👑","🏆","⭐","🎉","💎"],50)):t>=250?(i.classList.add("turkey"),n.textContent="🏆",s.textContent="INCREDIBLE!",r.textContent=`${t} points! You're a legend!`,this.startEmojiRain(["🏆","⭐","🔥"],30)):t>=200?(i.classList.add("strike"),n.textContent="🎯",s.textContent="EXCELLENT!",r.textContent=`${t} points! Amazing game!`,this.startEmojiRain(["🎳","⭐","✨"],25)):t>=150?(i.classList.add("spare"),n.textContent="👏",s.textContent="GREAT JOB!",r.textContent=`${t} points! Well played!`,this.startEmojiRain(["👏","✨"],15)):t>=100?(n.textContent="😊",s.textContent="GOOD GAME!",r.textContent=`${t} points. Keep practicing!`):t>=50?(n.textContent="🤔",s.textContent="NICE TRY",r.textContent=`${t} points. You can do better!`):(i.classList.add("gutter"),n.textContent="😅",s.textContent="OOPS...",r.textContent=`${t} points. Maybe bowling isn't your thing?`,this.startEmojiRain(["💧","😢"],10)),i.classList.remove("hidden"),i.classList.add("show"),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>i.classList.add("hidden"),300)},3e3)}}function c_(){const o=["Perfect hit!","Crushed it!","Bowling like a pro!","Nothing but pins!","Unstoppable!","On fire!","Textbook strike!","Clean sweep!"];return o[Math.floor(Math.random()*o.length)]}function l_(){const o=["Nice recovery!","Clutch pickup!","Never give up!","Second chance success!","Way to adapt!","Saved it!"];return o[Math.floor(Math.random()*o.length)]}function h_(){const o=["The pins are laughing...","Did you close your eyes?","At least you tried!","The lane has sides, you know...","Ouch, that hurts to watch","Even the ball is embarrassed","Plot twist: the gutter wins"];return o[Math.floor(Math.random()*o.length)]}function u_(){const o=["Cat attack! Ball destroyed!","Kitty wanted to play too!","The cat has claimed your ball!","Feline interference!","Cat 1, Bowler 0"];return o[Math.floor(Math.random()*o.length)]}function d_(){const o=["Into the abyss!","Should've watched your step!","Gravity wins again!","Pit trap activated!","Down you go!","The void claims another..."];return o[Math.floor(Math.random()*o.length)]}function f_(){const o=["Barrel goes BOOM!","Explosive surprise!","Watch out for red barrels!","Kaboom!","That was loud!","Danger: explosives!"];return o[Math.floor(Math.random()*o.length)]}function p_(o){const t={reverse:["Left is right, right is left!","Controls are backwards!","Mind the mirror!","Everything is opposite!"],shrink:["Tiny ball, tiny power!","Honey, I shrunk the ball!","So small...","Mini mode activated!"],slow:["Moving like molasses!","Speed reduced!","Slow motion mode!","Turtle speed!"],blind:["Can't see anything!","Flash bang!","Bright light!","Temporary blindness!"]},e=t[o]||t.reverse;return e[Math.floor(Math.random()*e.length)]}class m_{constructor(){this.audioContext=null,this.masterGain=null,this.isPlaying=!1,this.tempo=120,this.currentBeat=0,this.scheduledTime=0,this.scheduleAheadTime=.1,this.lookahead=25,this.timerID=null,this.intensity=.5,this.pattern=0}async init(){if(!this.audioContext)try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.masterGain=this.audioContext.createGain(),this.masterGain.connect(this.audioContext.destination),this.masterGain.gain.value=.3,this.filter=this.audioContext.createBiquadFilter(),this.filter.type="lowpass",this.filter.frequency.value=2e3,this.filter.connect(this.masterGain)}catch(t){console.warn("Music not supported:",t)}}start(){this.isPlaying||!this.audioContext||(this.audioContext.state==="suspended"&&this.audioContext.resume(),this.isPlaying=!0,this.scheduledTime=this.audioContext.currentTime,this.currentBeat=0,this.scheduler())}stop(){this.isPlaying=!1,this.timerID&&(clearTimeout(this.timerID),this.timerID=null)}scheduler(){if(!this.isPlaying)return;const t=60/this.tempo;for(;this.scheduledTime<this.audioContext.currentTime+this.scheduleAheadTime;)this.playBeat(this.scheduledTime,this.currentBeat),this.scheduledTime+=t/4,this.currentBeat=(this.currentBeat+1)%16;this.timerID=setTimeout(()=>this.scheduler(),this.lookahead)}playBeat(t,e){if(e%4===0&&this.playKick(t),(e===4||e===12)&&this.playSnare(t),this.intensity>.3&&(e%2===0?this.playHiHat(t,!1):this.intensity>.6&&this.playHiHat(t,!0)),e%4===0||this.intensity>.5&&e===6||this.intensity>.7&&e===14){const i=[55,65.41,73.42,82.41],n=Math.floor(e/4)%i.length;this.playBass(t,i[n])}if(this.intensity>.4&&(e===0||e===6||e===10)){const i=[220,261.63,293.66,329.63,392,440],n=i[Math.floor(Math.random()*i.length)];this.playSynth(t,n)}this.intensity>.7&&e===14&&this.playAccent(t)}playKick(t){const e=this.audioContext.createOscillator(),i=this.audioContext.createGain();e.connect(i),i.connect(this.filter),e.frequency.setValueAtTime(150,t),e.frequency.exponentialRampToValueAtTime(40,t+.1),i.gain.setValueAtTime(.8,t),i.gain.exponentialRampToValueAtTime(.01,t+.15),e.start(t),e.stop(t+.15)}playSnare(t){const e=this.audioContext.sampleRate*.1,i=this.audioContext.createBuffer(1,e,this.audioContext.sampleRate),n=i.getChannelData(0);for(let h=0;h<e;h++)n[h]=Math.random()*2-1;const s=this.audioContext.createBufferSource(),r=this.audioContext.createGain(),a=this.audioContext.createBiquadFilter();s.buffer=i,a.type="highpass",a.frequency.value=1e3,s.connect(a),a.connect(r),r.connect(this.filter),r.gain.setValueAtTime(.5,t),r.gain.exponentialRampToValueAtTime(.01,t+.1),s.start(t),s.stop(t+.1);const c=this.audioContext.createOscillator(),l=this.audioContext.createGain();c.connect(l),l.connect(this.filter),c.type="triangle",c.frequency.setValueAtTime(200,t),c.frequency.exponentialRampToValueAtTime(100,t+.05),l.gain.setValueAtTime(.3,t),l.gain.exponentialRampToValueAtTime(.01,t+.08),c.start(t),c.stop(t+.08)}playHiHat(t,e=!1){const i=this.audioContext.sampleRate*(e?.15:.05),n=this.audioContext.createBuffer(1,i,this.audioContext.sampleRate),s=n.getChannelData(0);for(let h=0;h<i;h++)s[h]=Math.random()*2-1;const r=this.audioContext.createBufferSource(),a=this.audioContext.createGain(),c=this.audioContext.createBiquadFilter();r.buffer=n,c.type="highpass",c.frequency.value=7e3,r.connect(c),c.connect(a),a.connect(this.filter);const l=e?.15:.05;a.gain.setValueAtTime(.2,t),a.gain.exponentialRampToValueAtTime(.01,t+l),r.start(t),r.stop(t+l)}playBass(t,e){const i=this.audioContext.createOscillator(),n=this.audioContext.createGain();i.connect(n),n.connect(this.filter),i.type="sawtooth",i.frequency.setValueAtTime(e,t),n.gain.setValueAtTime(.4,t),n.gain.exponentialRampToValueAtTime(.01,t+.2),i.start(t),i.stop(t+.2)}playSynth(t,e){const i=this.audioContext.createOscillator(),n=this.audioContext.createOscillator(),s=this.audioContext.createGain();i.connect(s),n.connect(s),s.connect(this.filter),i.type="square",n.type="sawtooth",i.frequency.setValueAtTime(e,t),n.frequency.setValueAtTime(e*1.01,t),s.gain.setValueAtTime(.15,t),s.gain.exponentialRampToValueAtTime(.01,t+.3),i.start(t),n.start(t),i.stop(t+.3),n.stop(t+.3)}playAccent(t){const e=this.audioContext.createOscillator(),i=this.audioContext.createGain();e.connect(i),i.connect(this.filter),e.type="sine",e.frequency.setValueAtTime(880,t),e.frequency.exponentialRampToValueAtTime(440,t+.1),i.gain.setValueAtTime(.3,t),i.gain.exponentialRampToValueAtTime(.01,t+.15),e.start(t),e.stop(t+.15)}setIntensity(t){this.intensity=Math.max(0,Math.min(1,t)),this.tempo=100+this.intensity*40,this.filter&&(this.filter.frequency.value=1e3+this.intensity*3e3)}setVolume(t){this.masterGain&&(this.masterGain.gain.value=t*.3)}onSpeedBoost(){this.setIntensity(Math.min(1,this.intensity+.2)),setTimeout(()=>this.setIntensity(Math.max(.3,this.intensity-.2)),3e3)}onCollision(){const t=this.intensity;this.setIntensity(Math.min(1,this.intensity+.1)),setTimeout(()=>this.setIntensity(t),500)}onZoneEnter(t){switch(t){case"speed":this.setIntensity(.9);break;case"chaos":this.setIntensity(1),this.tempo=150;break;case"slip":this.setIntensity(.4);break;default:this.setIntensity(.6)}}onZoneExit(){this.setIntensity(.5),this.tempo=120}}class g_{constructor(t){this.canvas=t,this.isRunning=!1,this.gameState="ready",this.currentFrame=1,this.currentThrow=1,this.pinsKnocked=0,this.pinsStandingBeforeThrow=10,this.frameScores=[],this.consecutiveStrikes=0,this.ballDestroyed=!1,this.pinAreaZ=235,this.scene=new bu,this.scene.background=new Ot(8900331),this.scene.fog=new ba(8900331,80,280),this.camera=new si(60,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new pg({canvas:this.canvas,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.world=new Dv,this.world.gravity.set(0,-9.82,0),this.world.broadphase=new sh,this.ball=null,this.pins=[],this.course=null,this.tiltControl=null,this.scoreSystem=null,this.particles=null,this.sounds=null,this.celebrations=null,this.music=null,this.activeEffects={reverse:!1,shrink:!1,giant:!1,slow:!1,speed:!1,slip:!1,chaos:!1,shield:!1},this.currentZone=null,this.tapBoostReady=!0,this.tapBoostCooldown=1500,this.powerHitActive=!1,this.powerHitMultiplier=1,this.throwTimeout=3e4,this.throwStartTime=0,this.isThrowActive=!1,this.clock=new xd,this.lastTime=0,this.init()}async init(){this.setupLighting(),this.setupCamera(),this.setupEffects(),this.createCourse(),this.createBall(),this.createPins(),this.setupControls(),this.setupScoreSystem(),window.addEventListener("resize",()=>this.onResize()),document.addEventListener("click",()=>this.sounds.init(),{once:!0}),document.addEventListener("touchstart",()=>this.sounds.init(),{once:!0}),this.setupTapHandling()}setupTapHandling(){const t=document.getElementById("game-screen"),e=i=>{if(this.gameState!=="playing"||this.ballDestroyed)return;const n=this.ball.getPosition(),s=this.pinAreaZ-n.z;s<15&&s>0?this.activatePowerHit():this.tapBoostReady&&this.activateTapBoost()};t.addEventListener("touchstart",e),t.addEventListener("click",i=>{i.target.tagName!=="BUTTON"&&e()})}activateTapBoost(){this.tapBoostReady&&(this.tapBoostReady=!1,this.ball.boost(1.5,500),this.showMessage("BOOST!","#f39c12"),this.sounds.playBoost(),this.particles.createBoostEffect(this.ball.getPosition()),setTimeout(()=>{this.tapBoostReady=!0},this.tapBoostCooldown))}activatePowerHit(){if(this.powerHitActive)return;this.powerHitActive=!0,this.powerHitMultiplier=2;const t=this.ball.getVelocity();this.ball.body.velocity.z=Math.max(t.z*1.5,20),this.showMessage("POWER HIT!","#e74c3c"),this.sounds.playStrike(),this.particles.createPowerHitEffect(this.ball.getPosition()),this.ball.mesh.material.emissive=new Ot(16711680),this.ball.mesh.material.emissiveIntensity=.8,setTimeout(()=>{this.ball.mesh.material.emissive=new Ot(0),this.ball.mesh.material.emissiveIntensity=0},1e3)}setupEffects(){this.particles=new r_(this.scene),this.sounds=new o_,this.celebrations=new a_,this.music=new m_}setupLighting(){const t=new md(16777215,.6);this.scene.add(t);const e=new pd(16777215,.8);e.position.set(10,20,10),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,e.shadow.camera.near=.5,e.shadow.camera.far=100,e.shadow.camera.left=-30,e.shadow.camera.right=30,e.shadow.camera.top=30,e.shadow.camera.bottom=-30,this.scene.add(e)}setupCamera(){this.camera.position.set(0,8,-5),this.camera.lookAt(0,0,20)}createCourse(){this.course=new i_(this.scene,this.world,{onBumperHit:t=>{this.sounds.playBumper(),this.particles.createBounceEffect(t.mesh.position)},onCatAttack:t=>{this.sounds.playCatMeow(),this.celebrations.showCatAttack(),this.destroyBall("cat")},onChaserHit:t=>{this.sounds.playExplosion(),this.particles.createBounceEffect(t.mesh.position),this.showMessage("KNOCKED!","#ff0000")},onPatrollerHit:t=>{this.sounds.playBumper(),this.particles.createBounceEffect(t.mesh.position),this.showMessage("PUSHED!","#ff6600")},onExplosiveBumperHit:(t,e)=>{this.sounds.playExplosion(),this.particles.createExplosionEffect(t.mesh.position),this.showMessage("BLAST!","#ff4444")},onLaunch:(t,e)=>{this.sounds.playLaunch(),this.particles.createLaunchEffect(t.mesh.position),this.showMessage("LAUNCH!","#3498db")},onVortexCapture:t=>{this.sounds.playVortex(),this.showMessage("TAP TO RELEASE!","#9b59b6")},onVortexRelease:(t,e)=>{this.sounds.playVortexRelease(),this.particles.createVortexEffect(t.mesh.position)},onPachinkoHit:t=>{this.sounds.playPachinko()},onBonusCollect:t=>{this.sounds.playBoost(),this.applyBonus(t)},onFakeBonusTrigger:(t,e)=>{this.sounds.playTrapActivate(),this.particles.createTrapEffect(t.mesh.position),this.applyTrapEffect(e)},onExplosion:(t,e)=>{this.sounds.playExplosion(),this.particles.createExplosionEffect(t.mesh.position),this.celebrations.showExplosion(),this.showMessage("BOOM!","#ff6600")},onPopupSpike:(t,e)=>{this.sounds.playSpikePopup(),this.particles.createSpikeEffect(t.mesh.position),this.showMessage("SURPRISE!","#ff0000")},onCollapsingFloor:t=>{this.sounds.playFloorCollapse(),this.particles.createCollapseEffect(t.mesh.position),this.showMessage("FLOOR COLLAPSE!","#8b4513")},onZoneEnter:(t,e,i)=>{this.handleZoneEnter(e,i)},onZoneExit:(t,e,i)=>{this.handleZoneExit(e,i)}}),this.course.generate(this.currentFrame),this.pinAreaZ=this.course.getPinAreaZ()}createBall(){this.ball=new kv(this.scene,this.world),this.ball.reset()}createPins(){this.pins.forEach(s=>s.dispose()),this.pins=[];const t=this.pinAreaZ,e=.52,i=.85;[{x:0,z:t},{x:-e,z:t+i},{x:e,z:t+i},{x:-e*2,z:t+i*2},{x:0,z:t+i*2},{x:e*2,z:t+i*2},{x:-e*3,z:t+i*3},{x:-e,z:t+i*3},{x:e,z:t+i*3},{x:e*3,z:t+i*3}].forEach((s,r)=>{const a=new Gv(this.scene,this.world,s.x,s.z,r);this.pins.push(a)})}setupControls(){this.tiltControl=new n_,this.tiltControl.enable()}setupScoreSystem(){this.scoreSystem=new s_}async start(){this.isRunning=!0,this.gameState="playing",this.pinsStandingBeforeThrow=10,this.frameScores=[],this.ball.reset(),this.updateUI(),this.throwStartTime=Date.now(),this.isThrowActive=!0,await this.music.init(),this.music.start(),this.animate()}animate(){if(!this.isRunning)return;requestAnimationFrame(()=>this.animate());const t=this.clock.getDelta();this.clock.getElapsedTime(),this.world.step(1/60,t,3),this.gameState==="playing"&&!this.ballDestroyed&&(this.updateBall(t),this.updateCamera(),this.checkGameState()),this.ballDestroyed||this.ball.update(),this.pins.forEach(n=>n.update());const e=this.ballDestroyed?null:this.ball.getPosition(),i=this.ballDestroyed?null:this.ball.getVelocity();this.course.update(t,e,i),this.particles.update(t),this.renderer.render(this.scene,this.camera)}updateBall(t){const e=this.tiltControl.getTilt();this.ball.applyTiltForce(e,t);const i=this.ball.getPosition(),n=this.course.checkTerrainEffects(i);n&&n.type==="wind"&&(this.ball.body.velocity.x+=n.force.x*t);const s=this.ball.getSpeedPercent();if(this.updateSpeedGauge(s),this.isThrowActive){const r=Date.now()-this.throwStartTime,a=Math.max(0,this.throwTimeout-r);if(this.updateTimer(a),a<=0){this.isThrowActive=!1,this.showMessage("TIME OUT!","#ff0000"),this.sounds.playGutter(),this.onBallFailed();return}}i.z<this.pinAreaZ-5&&i.y<-5&&this.onBallFailed()}updateTimer(t){const e=Math.ceil(t/1e3),i=document.getElementById("timer-display");i&&(i.textContent=`${e}s`,e<=3?(i.style.color="#e74c3c",i.style.animation="pulse 0.3s ease-in-out infinite alternate"):(i.style.color="#fff",i.style.animation="none"))}destroyBall(t){this.ballDestroyed=!0,this.ball.mesh.visible=!1,setTimeout(()=>{this.onBallFailed()},1500)}applyBonus(t){switch(t){case"speed":this.ball.boost(1.5,3e3),this.showMessage("SPEED BOOST!","#f39c12");break;case"shield":this.ball.activateShield(),this.showMessage("SHIELD!","#3498db");break;case"giant":this.ball.setGiant(!0),this.showMessage("GIANT MODE!","#9b59b6");break}}applyTrapEffect(t){switch(t){case"reverse":this.tiltControl.setReversed(!0),this.setActiveEffect("reverse",!0),this.showMessage("CONTROLS REVERSED!","#ff0066"),this.celebrations.showTrap("reverse"),setTimeout(()=>{this.tiltControl.setReversed(!1),this.setActiveEffect("reverse",!1)},5e3);break;case"shrink":this.ball.setShrunk(!0),this.setActiveEffect("shrink",!0),this.showMessage("SHRUNK!","#ff00ff"),this.celebrations.showTrap("shrink"),setTimeout(()=>{this.ball.setShrunk(!1),this.setActiveEffect("shrink",!1)},8e3);break;case"slow":this.ball.slowDown(.3,6e3),this.setActiveEffect("slow",!0),this.showMessage("SLOWED!","#00ffff"),this.celebrations.showTrap("slow"),setTimeout(()=>{this.setActiveEffect("slow",!1)},6e3);break;case"blind":this.triggerBlindEffect(),this.showMessage("BLINDED!","#ffffff"),this.celebrations.showTrap("blind");break}}triggerBlindEffect(){const t=document.createElement("div");t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      opacity: 1;
      pointer-events: none;
      z-index: 1000;
      transition: opacity 3s ease-out;
    `,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0"},100),setTimeout(()=>{t.remove()},3100)}handleZoneEnter(t,e){this.currentZone=t,this.sounds.playBoost(),this.music.onZoneEnter(t);const i=document.getElementById("zone-warning");i.className=`${t}-zone`,i.classList.remove("hidden");const n={shrink:"🔬 SHRINK ZONE!",giant:"🔮 GIANT ZONE!",speed:"⚡ SPEED ZONE!",slip:"🧊 SLIP ZONE!",chaos:"🌀 CHAOS ZONE!",bomb:"💣 DANGER ZONE!"};switch(i.textContent=n[t]||"SPECIAL ZONE!",t){case"shrink":this.ball.setShrunk(!0),this.setActiveEffect("shrink",!0),this.showMessage("SHRINKING!","#ff69b4");break;case"giant":this.ball.setGiant(!0),this.setActiveEffect("giant",!0),this.showMessage("GROWING!","#9b59b6");break;case"speed":this.ball.boost(2,0),this.setActiveEffect("speed",!0),this.showMessage("SPEED UP!","#ff9800");break;case"slip":this.ball.setSlip(!0),this.setActiveEffect("slip",!0),this.showMessage("SLIPPERY!","#03a9f4");break;case"bomb":this.setActiveEffect("bomb",!0),this.showMessage("DANGER!","#ff5722"),this.bombZoneInterval=setInterval(()=>{if(this.currentZone==="bomb"&&Math.random()>.7){const s=this.ball.getPosition();this.particles.createExplosionEffect({x:s.x+(Math.random()-.5)*4,y:s.y,z:s.z+(Math.random()-.5)*4},16733986),this.sounds.playExplosion(),this.ball.body.velocity.x+=(Math.random()-.5)*10,this.ball.body.velocity.z+=(Math.random()-.5)*5}},500);break}setTimeout(()=>{i.classList.add("hidden")},1500)}handleZoneExit(t,e){switch(this.currentZone=null,this.music.onZoneExit(),t){case"shrink":this.ball.setShrunk(!1),this.setActiveEffect("shrink",!1);break;case"giant":this.ball.setGiant(!1),this.setActiveEffect("giant",!1);break;case"speed":this.setActiveEffect("speed",!1);break;case"slip":this.ball.setSlip(!1),this.setActiveEffect("slip",!1);break;case"bomb":this.setActiveEffect("bomb",!1),this.bombZoneInterval&&(clearInterval(this.bombZoneInterval),this.bombZoneInterval=null);break}}setActiveEffect(t,e){this.activeEffects[t]=e,this.updateStatusEffectUI()}updateStatusEffectUI(){["reverse","shrink","giant","slow","speed","slip","chaos","shield"].forEach(e=>{const i=document.getElementById(`effect-${e}`);i&&(this.activeEffects[e]?i.classList.remove("hidden"):i.classList.add("hidden"))})}updateCamera(){const t=this.ball.getPosition(),e=t.x*.5,i=8,n=t.z-8;this.camera.position.x+=(e-this.camera.position.x)*.05,this.camera.position.y+=(i-this.camera.position.y)*.05,this.camera.position.z+=(n-this.camera.position.z)*.05,this.camera.lookAt(t.x,t.y,t.z+10)}checkGameState(){const t=this.ball.getPosition(),e=this.ball.getVelocity();if(t.z>this.pinAreaZ-5){if(t.y<-3){this.endThrow();return}Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)<.5&&this.endThrow()}}endThrow(){this.gameState="result",this.isThrowActive=!1;const t=Date.now()-this.throwStartTime,e=(this.throwTimeout-t)/1e3,i=this.pins.filter(s=>!s.isKnocked()),n=this.pinsStandingBeforeThrow-i.length;if(e>=18&&n>=1&&i.length>0){const s=Math.min(2,i.length);[...i].sort(()=>Math.random()-.5).slice(0,s).forEach(c=>{const l=20+Math.random()*10;c.body.velocity.z+=l,c.body.velocity.x+=(Math.random()-.5)*15,c.body.velocity.y+=8,c.body.angularVelocity.x+=(Math.random()-.5)*15,c.body.angularVelocity.z+=(Math.random()-.5)*15}),this.showMessage(`SPEED +${s}!`,"#f39c12"),this.sounds.playPinHit(),setTimeout(()=>this.completeEndThrow(),800);return}this.completeEndThrow()}completeEndThrow(){const t=this.pins.filter(s=>!s.isKnocked()).length,e=this.pinsStandingBeforeThrow-t;this.pinsKnocked=e,this.frameScores.push(e);const i=e===10&&this.currentThrow===1,n=this.currentThrow===2&&t===0;i?(this.consecutiveStrikes++,this.sounds.playStrike(),this.particles.createStrikeEffect(this.ball.getPosition()),this.celebrations.showStrike(this.consecutiveStrikes)):n?(this.consecutiveStrikes=0,this.sounds.playSpare(),this.particles.createSpareEffect(this.ball.getPosition()),this.celebrations.showSpare()):(this.consecutiveStrikes=0,e>0&&this.sounds.playPinHit()),this.scoreSystem.recordThrow(this.currentFrame,this.currentThrow,e),setTimeout(()=>this.showResult(),i||n?2e3:500)}onBallFailed(){this.gameState="result",this.isThrowActive=!1,this.pinsKnocked=0,this.consecutiveStrikes=0,this.frameScores.push(0),this.scoreSystem.recordThrow(this.currentFrame,this.currentThrow,0),this.ballDestroyed||(this.sounds.playGutter(),this.particles.createGutterEffect(this.ball.getPosition()),this.celebrations.showGutter()),setTimeout(()=>this.showResult(),2e3)}showResult(){const t=this.scoreSystem.frames[this.currentFrame-1],e=this.currentFrame===10;let i=`${this.pinsKnocked} pins`;if(this.pinsKnocked===10)(this.currentThrow===1||e&&this.pinsStandingBeforeThrow===10)&&(i="STRIKE!",this.showMessage("STRIKE!","#f1c40f"));else if(this.currentThrow===2&&!e)(t.throw1||0)+this.pinsKnocked===10&&(i="SPARE!",this.showMessage("SPARE!","#2ecc71"));else if(e&&this.currentThrow>=2){const a=this.pinsStandingBeforeThrow;this.pinsKnocked===a&&a===10?(i="STRIKE!",this.showMessage("STRIKE!","#f1c40f")):this.pinsKnocked===a&&a>0&&(i="SPARE!",this.showMessage("SPARE!","#2ecc71"))}document.getElementById("pins-knocked").textContent=i;let n="Next Frame";if(e){const a=t.throw1||0,c=t.throw2,l=a===10,h=!l&&c!==null&&a+c===10;this.currentThrow===1?n=l?"2nd Throw (Bonus)":"2nd Throw":this.currentThrow===2&&(l||h)?n="3rd Throw (Bonus)":n="Game Over"}else this.pinsKnocked===10&&this.currentThrow===1?n="Next Frame":this.currentThrow===1?n="2nd Throw":n="Next Frame";document.getElementById("next-frame-btn").textContent=n,this.updateScoreboard();const s=document.getElementById("scoreboard"),r=document.getElementById("result-scoreboard");r.innerHTML=s.outerHTML,document.getElementById("result-total").textContent=this.scoreSystem.getTotalScore(),window.app.showScreen("result-screen")}nextFrame(){const t=this.scoreSystem.frames[this.currentFrame-1];if(this.currentFrame===10)if(this.currentThrow===1)this.pinsKnocked===10?(this.currentThrow=2,this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.currentThrow=2,this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);else if(this.currentThrow===2){const i=t.throw1||0,n=t.throw2||0,s=i===10,r=!s&&i+n===10,a=s&&n===10;if(s||r)this.currentThrow=3,a||r?(this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);else{this.endGame();return}}else{this.endGame();return}else this.pinsKnocked===10&&this.currentThrow===1||this.currentThrow===2?(this.currentFrame++,this.currentThrow=1,this.frameScores=[],this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.currentThrow=2,this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);if(this.currentFrame>10){this.endGame();return}this.ballDestroyed=!1,this.ball.mesh.visible=!0,this.currentThrow===1?(this.course.generate(this.currentFrame),this.pinAreaZ=this.course.getPinAreaZ()):this.course.resetSpecialObstacles(),this.particles.clear(),window.app.showScreen("game-screen"),this.ball.reset(),this.gameState="playing",this.throwStartTime=Date.now(),this.isThrowActive=!0,this.updateUI()}removeKnockedPins(){this.pins.filter(e=>e.isKnocked()).forEach(e=>e.dispose()),this.pins=this.pins.filter(e=>!e.isKnocked())}removeAllPins(){this.pins.forEach(t=>t.dispose()),this.pins=[]}endGame(){const t=this.scoreSystem.getTotalScore();this.sounds.playGameOver(t>=150),this.celebrations.showGameEnd(t),this.updateScoreboard();const e=document.getElementById("scoreboard"),i=document.getElementById("result-scoreboard");i.innerHTML=e.outerHTML,document.getElementById("pins-knocked").textContent="GAME OVER",document.getElementById("result-total").textContent=t,document.getElementById("next-frame-btn").textContent="Play Again",document.getElementById("next-frame-btn").onclick=()=>{this.resetGame()},setTimeout(()=>{window.app.showScreen("result-screen")},3500)}resetGame(){this.currentFrame=1,this.currentThrow=1,this.pinsKnocked=0,this.pinsStandingBeforeThrow=10,this.frameScores=[],this.consecutiveStrikes=0,this.ballDestroyed=!1,this.ball.mesh.visible=!0,this.scoreSystem.reset(),this.resetScoreboardDisplay(),this.course.generate(1),this.pinAreaZ=this.course.getPinAreaZ(),this.removeAllPins(),this.createPins(),this.ball.reset(),this.particles.clear(),window.app.showScreen("game-screen"),this.gameState="playing",this.throwStartTime=Date.now(),this.isThrowActive=!0,this.updateUI(),document.getElementById("next-frame-btn").onclick=()=>{this.nextFrame()}}updateUI(){this.updateScoreboard()}updateScoreboard(){const t=this.scoreSystem.getFrameData();for(let e=0;e<10;e++){const i=document.querySelector(`.frame[data-frame="${e+1}"]`),n=t[e],s=e===9;i.classList.remove("current","completed"),e+1===this.currentFrame&&i.classList.add("current");const r=i.querySelector(".t1"),a=i.querySelector(".t2"),c=s?i.querySelector(".t3"):null,l=i.querySelector(".frame-score");if(r.classList.remove("strike","spare"),a.classList.remove("strike","spare"),c&&c.classList.remove("strike","spare"),s)if(n.throw1!==null?n.throw1===10?(r.textContent="X",r.classList.add("strike")):r.textContent=n.throw1===0?"-":n.throw1:r.textContent="-",n.throw2!==null?n.throw1===10?n.throw2===10?(a.textContent="X",a.classList.add("strike")):a.textContent=n.throw2===0?"-":n.throw2:n.throw1+n.throw2===10?(a.textContent="/",a.classList.add("spare")):a.textContent=n.throw2===0?"-":n.throw2:a.textContent="-",n.throw3!==null){const h=n.throw1===10&&n.throw2===10?0:n.throw1===10?n.throw2:n.throw1+n.throw2===10?0:null;n.throw3===10&&h===0?(c.textContent="X",c.classList.add("strike")):h!==null&&h+n.throw3===10?(c.textContent="/",c.classList.add("spare")):c.textContent=n.throw3===0?"-":n.throw3}else c&&(c.textContent="-");else n.throw1!==null?n.throw1===10?(r.textContent="",a.textContent="X",a.classList.add("strike")):(r.textContent=n.throw1===0?"-":n.throw1,n.throw2!==null?n.throw1+n.throw2===10?(a.textContent="/",a.classList.add("spare")):a.textContent=n.throw2===0?"-":n.throw2:a.textContent="-"):(r.textContent="-",a.textContent="-");if(n.cumulative!==null)l.textContent=n.cumulative,i.classList.add("completed");else if(n.throw1!==null){let h=n.throw1;n.throw2!==null&&(h+=n.throw2),n.throw3!==null&&(h+=n.throw3),l.textContent=""}else l.textContent="-"}}resetScoreboardDisplay(){for(let t=1;t<=10;t++){const e=document.querySelector(`.frame[data-frame="${t}"]`);e.classList.remove("current","completed");const i=e.querySelector(".t1"),n=e.querySelector(".t2"),s=e.querySelector(".t3"),r=e.querySelector(".frame-score");i.textContent="-",i.classList.remove("strike","spare"),n.textContent="-",n.classList.remove("strike","spare"),s&&(s.textContent="-",s.classList.remove("strike","spare")),r.textContent="-"}}updateSpeedGauge(t){document.getElementById("speed-bar").style.width=`${t}%`,document.getElementById("speed-text").textContent=`${Math.round(t)}%`}showMessage(t,e="#fff"){const i=document.getElementById("message-overlay");i.textContent=t,i.style.color=e,i.classList.remove("hidden"),setTimeout(()=>{i.classList.add("hidden")},1500)}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}}class dl{constructor(){this.game=null,this.gyroEnabled=!1,this.permissionRequested=!1,this.init()}init(){const t=document.getElementById("gyro-status"),e=document.getElementById("gyro-btn"),i=document.getElementById("start-btn"),n=document.getElementById("next-frame-btn"),s=/iPad|iPhone|iPod/.test(navigator.userAgent),r=!!window.DeviceOrientationEvent,a=r&&typeof DeviceOrientationEvent.requestPermission=="function";console.log("Device check:",{isIOS:s,hasGyro:r,needsPermission:a,userAgent:navigator.userAgent}),r?a?(t.textContent="タップして傾きセンサーを許可",t.className="status info",e.textContent="傾きセンサーを許可"):(this.gyroEnabled=!0,t.textContent="傾きセンサー: 利用可能",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled")):(t.textContent="PCモード: 矢印キーで操作",t.className="status info",e.textContent="矢印キーで操作",e.disabled=!0,e.style.opacity="0.5"),e.onclick=c=>{if(c.preventDefault(),c.stopPropagation(),console.log("Gyro button clicked"),t.textContent="リクエスト中...",this.permissionRequested){t.textContent="既にリクエスト済みです";return}a?(this.permissionRequested=!0,DeviceOrientationEvent.requestPermission().then(l=>{console.log("Permission state:",l),l==="granted"?(this.gyroEnabled=!0,t.textContent="許可されました！",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled")):(t.textContent="拒否されました（矢印キーで操作可）",t.className="status error",this.permissionRequested=!1)}).catch(l=>{console.error("Permission error:",l),t.textContent="エラー: "+l.message,t.className="status error",this.permissionRequested=!1})):r&&(this.gyroEnabled=!0,t.textContent="傾きセンサー: 有効",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled"))},i.onclick=()=>{this.startGame()},n.onclick=()=>{this.game&&this.game.nextFrame()}}startGame(){if(this.showScreen("game-screen"),this.lockOrientation(),!this.game){const t=document.getElementById("game-canvas");this.game=new g_(t)}this.game.start()}async lockOrientation(){try{screen.orientation&&screen.orientation.lock&&(await screen.orientation.lock("portrait"),console.log("Screen orientation locked to portrait"))}catch(t){console.log("Could not lock orientation:",t.message);try{const e=document.documentElement;e.requestFullscreen?(await e.requestFullscreen(),screen.orientation&&screen.orientation.lock&&await screen.orientation.lock("portrait")):e.webkitRequestFullscreen&&await e.webkitRequestFullscreen()}catch(e){console.log("Fullscreen fallback failed:",e.message)}}}showScreen(t){document.querySelectorAll(".screen").forEach(e=>{e.classList.add("hidden")}),document.getElementById(t).classList.remove("hidden")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.app=new dl}):window.app=new dl;
