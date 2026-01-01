(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const ua="182",_h=0,ka=1,yh=2,sr=1,Mh=2,ls=3,Qn=0,He=1,de=2,On=0,Ui=1,Ga=2,Va=3,Ha=4,Sh=5,ui=100,wh=101,Eh=102,bh=103,Th=104,Ah=200,Ch=201,Rh=202,Ph=203,po=204,mo=205,Lh=206,Ih=207,Dh=208,Nh=209,Fh=210,Uh=211,Bh=212,Oh=213,zh=214,go=0,xo=1,vo=2,zi=3,_o=4,yo=5,Mo=6,So=7,ul=0,kh=1,Gh=2,yn=0,dl=1,fl=2,pl=3,ml=4,gl=5,xl=6,vl=7,_l=300,gi=301,ki=302,wo=303,Eo=304,mr=306,bo=1e3,Un=1001,To=1002,Pe=1003,Vh=1004,Cs=1005,Fe=1006,Tr=1007,pi=1008,Ze=1009,yl=1010,Ml=1011,ms=1012,da=1013,wn=1014,vn=1015,kn=1016,fa=1017,pa=1018,gs=1020,Sl=35902,wl=35899,El=1021,bl=1022,cn=1023,Gn=1026,mi=1027,Tl=1028,ma=1029,Gi=1030,ga=1031,xa=1033,rr=33776,or=33777,ar=33778,cr=33779,Ao=35840,Co=35841,Ro=35842,Po=35843,Lo=36196,Io=37492,Do=37496,No=37488,Fo=37489,Uo=37490,Bo=37491,Oo=37808,zo=37809,ko=37810,Go=37811,Vo=37812,Ho=37813,Wo=37814,qo=37815,Xo=37816,Yo=37817,Zo=37818,Ko=37819,jo=37820,$o=37821,Jo=36492,Qo=36494,ta=36495,ea=36283,na=36284,ia=36285,sa=36286,Hh=3200,Al=0,Wh=1,Kn="",Je="srgb",Vi="srgb-linear",hr="linear",ie="srgb",yi=7680,Wa=519,qh=512,Xh=513,Yh=514,va=515,Zh=516,Kh=517,_a=518,jh=519,qa=35044,Xa="300 es",_n=2e3,ur=2001;function Cl(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function dr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function $h(){const r=dr("canvas");return r.style.display="block",r}const Ya={};function Za(...r){const t="THREE."+r.shift();console.log(t,...r)}function Nt(...r){const t="THREE."+r.shift();console.warn(t,...r)}function Kt(...r){const t="THREE."+r.shift();console.error(t,...r)}function xs(...r){const t=r.join(" ");t in Ya||(Ya[t]=!0,Nt(...r))}function Jh(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}class qi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ar=Math.PI/180,ra=180/Math.PI;function Xi(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[r&255]+Ie[r>>8&255]+Ie[r>>16&255]+Ie[r>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Vt(r,t,e){return Math.max(t,Math.min(e,r))}function Qh(r,t){return(r%t+t)%t}function Cr(r,t,e){return(1-e)*r+e*t}function Ji(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ge(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class _t{constructor(t=0,e=0){_t.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}let Yi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3],u=s[o+0],f=s[o+1],p=s[o+2],x=s[o+3];if(a<=0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a>=1){t[e+0]=u,t[e+1]=f,t[e+2]=p,t[e+3]=x;return}if(d!==x||c!==u||l!==f||h!==p){let g=c*u+l*f+h*p+d*x;g<0&&(u=-u,f=-f,p=-p,x=-x,g=-g);let m=1-a;if(g<.9995){const v=Math.acos(g),_=Math.sin(v);m=Math.sin(m*v)/_,a=Math.sin(a*v)/_,c=c*m+u*a,l=l*m+f*a,h=h*m+p*a,d=d*m+x*a}else{c=c*m+u*a,l=l*m+f*a,h=h*m+p*a,d=d*m+x*a;const v=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=v,l*=v,h*=v,d*=v}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=s[o],u=s[o+1],f=s[o+2],p=s[o+3];return t[e]=a*p+h*d+c*f-l*u,t[e+1]=c*p+h*u+l*d-a*f,t[e+2]=l*p+h*f+a*u-c*d,t[e+3]=h*p-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(s/2),u=c(n/2),f=c(i/2),p=c(s/2);switch(o){case"XYZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"YZX":this._x=u*h*d+l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d-u*f*p;break;case"XZY":this._x=u*h*d-l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d+u*f*p;break;default:Nt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let n=t._x,i=t._y,s=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,s=-s,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+s*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+s*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ka.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ka.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-s*i),d=2*(s*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-s*d,this.z=i+c*d+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Rr.copy(this).projectOnVector(t),this.sub(Rr)}reflect(t){return this.sub(Rr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rr=new F,Ka=new Yi;class Bt{constructor(t,e,n,i,s,o,a,c,l){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l)}set(t,e,n,i,s,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],x=i[0],g=i[3],m=i[6],v=i[1],_=i[4],y=i[7],b=i[2],T=i[5],C=i[8];return s[0]=o*x+a*v+c*b,s[3]=o*g+a*_+c*T,s[6]=o*m+a*y+c*C,s[1]=l*x+h*v+d*b,s[4]=l*g+h*_+d*T,s[7]=l*m+h*y+d*C,s[2]=u*x+f*v+p*b,s[5]=u*g+f*_+p*T,s[8]=u*m+f*y+p*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*s,f=l*s-o*c,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return t[0]=d*x,t[1]=(i*l-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=u*x,t[4]=(h*e-i*c)*x,t[5]=(i*s-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Pr.makeScale(t,e)),this}rotate(t){return this.premultiply(Pr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Pr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Pr=new Bt,ja=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$a=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tu(){const r={enabled:!0,workingColorSpace:Vi,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ie&&(i.r=zn(i.r),i.g=zn(i.g),i.b=zn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ie&&(i.r=Bi(i.r),i.g=Bi(i.g),i.b=Bi(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Kn?hr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Vi]:{primaries:t,whitePoint:n,transfer:hr,toXYZ:ja,fromXYZ:$a,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Je},outputColorSpaceConfig:{drawingBufferColorSpace:Je}},[Je]:{primaries:t,whitePoint:n,transfer:ie,toXYZ:ja,fromXYZ:$a,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Je}}}),r}const qt=tu();function zn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Bi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Mi;class eu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Mi===void 0&&(Mi=dr("canvas")),Mi.width=t.width,Mi.height=t.height;const i=Mi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Mi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=dr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=zn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(zn(e[n]/255)*255):e[n]=zn(e[n]);return{data:e,width:t.width,height:t.height}}else return Nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let nu=0;class ya{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=Xi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Lr(i[o].image)):s.push(Lr(i[o]))}else s=Lr(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Lr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?eu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Nt("Texture: Unable to serialize Texture."),{})}let iu=0;const Ir=new F;class Ue extends qi{constructor(t=Ue.DEFAULT_IMAGE,e=Ue.DEFAULT_MAPPING,n=Un,i=Un,s=Fe,o=pi,a=cn,c=Ze,l=Ue.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=Xi(),this.name="",this.source=new ya(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ir).x}get height(){return this.source.getSize(Ir).y}get depth(){return this.source.getSize(Ir).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Nt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Nt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_l)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bo:t.x=t.x-Math.floor(t.x);break;case Un:t.x=t.x<0?0:1;break;case To:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bo:t.y=t.y-Math.floor(t.y);break;case Un:t.y=t.y<0?0:1;break;case To:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=_l;Ue.DEFAULT_ANISOTROPY=1;class xe{constructor(t=0,e=0,n=0,i=1){xe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(l+1)/2,y=(f+1)/2,b=(m+1)/2,T=(h+u)/4,C=(d+x)/4,I=(p+g)/4;return _>y&&_>b?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=T/n,s=C/n):y>b?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=T/i,s=I/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=C/s,i=I/s),this.set(n,i,s,e),this}let v=Math.sqrt((g-p)*(g-p)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-x)/v,this.z=(u-h)/v,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class su extends qi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);const i={width:t,height:e,depth:n.depth},s=new Ue(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Fe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new ya(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends su{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Rl extends Ue{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ru extends Ue{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ss{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,nn):nn.fromBufferAttribute(s,o),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Rs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rs.copy(n.boundingBox)),Rs.applyMatrix4(t.matrixWorld),this.union(Rs)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qi),Ps.subVectors(this.max,Qi),Si.subVectors(t.a,Qi),wi.subVectors(t.b,Qi),Ei.subVectors(t.c,Qi),Vn.subVectors(wi,Si),Hn.subVectors(Ei,wi),ii.subVectors(Si,Ei);let e=[0,-Vn.z,Vn.y,0,-Hn.z,Hn.y,0,-ii.z,ii.y,Vn.z,0,-Vn.x,Hn.z,0,-Hn.x,ii.z,0,-ii.x,-Vn.y,Vn.x,0,-Hn.y,Hn.x,0,-ii.y,ii.x,0];return!Dr(e,Si,wi,Ei,Ps)||(e=[1,0,0,0,1,0,0,0,1],!Dr(e,Si,wi,Ei,Ps))?!1:(Ls.crossVectors(Vn,Hn),e=[Ls.x,Ls.y,Ls.z],Dr(e,Si,wi,Ei,Ps))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(An),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const An=[new F,new F,new F,new F,new F,new F,new F,new F],nn=new F,Rs=new Ss,Si=new F,wi=new F,Ei=new F,Vn=new F,Hn=new F,ii=new F,Qi=new F,Ps=new F,Ls=new F,si=new F;function Dr(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){si.fromArray(r,s);const a=i.x*Math.abs(si.x)+i.y*Math.abs(si.y)+i.z*Math.abs(si.z),c=t.dot(si),l=e.dot(si),h=n.dot(si);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const ou=new Ss,ts=new F,Nr=new F;let gr=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ou.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ts.subVectors(t,this.center);const e=ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ts,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Nr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ts.copy(t.center).add(Nr)),this.expandByPoint(ts.copy(t.center).sub(Nr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}};const Cn=new F,Fr=new F,Is=new F,Wn=new F,Ur=new F,Ds=new F,Br=new F;let Pl=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Fr.copy(t).add(e).multiplyScalar(.5),Is.copy(e).sub(t).normalize(),Wn.copy(this.origin).sub(Fr);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Is),a=Wn.dot(this.direction),c=-Wn.dot(Is),l=Wn.lengthSq(),h=Math.abs(1-o*o);let d,u,f,p;if(h>0)if(d=o*c-a,u=o*a-c,p=s*h,d>=0)if(u>=-p)if(u<=p){const x=1/h;d*=x,u*=x,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-p?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=p?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Fr).addScaledVector(Is,u),f}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);const n=Cn.dot(this.direction),i=Cn.dot(Cn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(s=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,i,s){Ur.subVectors(e,t),Ds.subVectors(n,t),Br.crossVectors(Ur,Ds);let o=this.direction.dot(Br),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Wn.subVectors(this.origin,t);const c=a*this.direction.dot(Ds.crossVectors(Wn,Ds));if(c<0)return null;const l=a*this.direction.dot(Ur.cross(Wn));if(l<0||c+l>o)return null;const h=-a*Wn.dot(Br);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class fe{constructor(t,e,n,i,s,o,a,c,l,h,d,u,f,p,x,g){fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l,h,d,u,f,p,x,g)}set(t,e,n,i,s,o,a,c,l,h,d,u,f,p,x,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,n=t.elements,i=1/bi.setFromMatrixColumn(t,0).length(),s=1/bi.setFromMatrixColumn(t,1).length(),o=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=o*h,f=o*d,p=a*h,x=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+p*l,e[5]=u-x*l,e[9]=-a*c,e[2]=x-u*l,e[6]=p+f*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,p=l*h,x=l*d;e[0]=u+x*a,e[4]=p*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=x+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,p=l*h,x=l*d;e[0]=u-x*a,e[4]=-o*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,f=o*d,p=a*h,x=a*d;e[0]=c*h,e[4]=p*l-f,e[8]=u*l+x,e[1]=c*d,e[5]=x*l+u,e[9]=f*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,f=o*l,p=a*c,x=a*l;e[0]=c*h,e[4]=x-u*d,e[8]=p*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+p,e[10]=u-x*d}else if(t.order==="XZY"){const u=o*c,f=o*l,p=a*c,x=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+x,e[5]=o*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(au,t,cu)}lookAt(t,e,n){const i=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),qn.crossVectors(n,Xe),qn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),qn.crossVectors(n,Xe)),qn.normalize(),Ns.crossVectors(Xe,qn),i[0]=qn.x,i[4]=Ns.x,i[8]=Xe.x,i[1]=qn.y,i[5]=Ns.y,i[9]=Xe.y,i[2]=qn.z,i[6]=Ns.z,i[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],x=n[6],g=n[10],m=n[14],v=n[3],_=n[7],y=n[11],b=n[15],T=i[0],C=i[4],I=i[8],M=i[12],w=i[1],P=i[5],U=i[9],L=i[13],O=i[2],B=i[6],D=i[10],V=i[14],q=i[3],$=i[7],nt=i[11],st=i[15];return s[0]=o*T+a*w+c*O+l*q,s[4]=o*C+a*P+c*B+l*$,s[8]=o*I+a*U+c*D+l*nt,s[12]=o*M+a*L+c*V+l*st,s[1]=h*T+d*w+u*O+f*q,s[5]=h*C+d*P+u*B+f*$,s[9]=h*I+d*U+u*D+f*nt,s[13]=h*M+d*L+u*V+f*st,s[2]=p*T+x*w+g*O+m*q,s[6]=p*C+x*P+g*B+m*$,s[10]=p*I+x*U+g*D+m*nt,s[14]=p*M+x*L+g*V+m*st,s[3]=v*T+_*w+y*O+b*q,s[7]=v*C+_*P+y*B+b*$,s[11]=v*I+_*U+y*D+b*nt,s[15]=v*M+_*L+y*V+b*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],x=t[7],g=t[11],m=t[15],v=c*f-l*u,_=a*f-l*d,y=a*u-c*d,b=o*f-l*h,T=o*u-c*h,C=o*d-a*h;return e*(x*v-g*_+m*y)-n*(p*v-g*b+m*T)+i*(p*_-x*b+m*C)-s*(p*y-x*T+g*C)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],x=t[13],g=t[14],m=t[15],v=d*g*l-x*u*l+x*c*f-a*g*f-d*c*m+a*u*m,_=p*u*l-h*g*l-p*c*f+o*g*f+h*c*m-o*u*m,y=h*x*l-p*d*l+p*a*f-o*x*f-h*a*m+o*d*m,b=p*d*c-h*x*c-p*a*u+o*x*u+h*a*g-o*d*g,T=e*v+n*_+i*y+s*b;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return t[0]=v*C,t[1]=(x*u*s-d*g*s-x*i*f+n*g*f+d*i*m-n*u*m)*C,t[2]=(a*g*s-x*c*s+x*i*l-n*g*l-a*i*m+n*c*m)*C,t[3]=(d*c*s-a*u*s-d*i*l+n*u*l+a*i*f-n*c*f)*C,t[4]=_*C,t[5]=(h*g*s-p*u*s+p*i*f-e*g*f-h*i*m+e*u*m)*C,t[6]=(p*c*s-o*g*s-p*i*l+e*g*l+o*i*m-e*c*m)*C,t[7]=(o*u*s-h*c*s+h*i*l-e*u*l-o*i*f+e*c*f)*C,t[8]=y*C,t[9]=(p*d*s-h*x*s-p*n*f+e*x*f+h*n*m-e*d*m)*C,t[10]=(o*x*s-p*a*s+p*n*l-e*x*l-o*n*m+e*a*m)*C,t[11]=(h*a*s-o*d*s-h*n*l+e*d*l+o*n*f-e*a*f)*C,t[12]=b*C,t[13]=(h*x*i-p*d*i+p*n*u-e*x*u-h*n*g+e*d*g)*C,t[14]=(p*a*i-o*x*i-p*n*c+e*x*c+o*n*g-e*a*g)*C,t[15]=(o*d*i-h*a*i+h*n*c-e*d*c-o*n*u+e*a*u)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,h=o+o,d=a+a,u=s*l,f=s*h,p=s*d,x=o*h,g=o*d,m=a*d,v=c*l,_=c*h,y=c*d,b=n.x,T=n.y,C=n.z;return i[0]=(1-(x+m))*b,i[1]=(f+y)*b,i[2]=(p-_)*b,i[3]=0,i[4]=(f-y)*T,i[5]=(1-(u+m))*T,i[6]=(g+v)*T,i[7]=0,i[8]=(p+_)*C,i[9]=(g-v)*C,i[10]=(1-(u+x))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;if(t.x=i[12],t.y=i[13],t.z=i[14],this.determinant()===0)return n.set(1,1,1),e.identity(),this;let s=bi.set(i[0],i[1],i[2]).length();const o=bi.set(i[4],i[5],i[6]).length(),a=bi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),sn.copy(this);const l=1/s,h=1/o,d=1/a;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=d,sn.elements[9]*=d,sn.elements[10]*=d,e.setFromRotationMatrix(sn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=_n,c=!1){const l=this.elements,h=2*s/(e-t),d=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let p,x;if(c)p=s/(o-s),x=o*s/(o-s);else if(a===_n)p=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===ur)p=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=_n,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i);let p,x;if(c)p=1/(o-s),x=o/(o-s);else if(a===_n)p=-2/(o-s),x=-(o+s)/(o-s);else if(a===ur)p=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const bi=new F,sn=new fe,au=new F(0,0,0),cu=new F(1,1,1),qn=new F,Ns=new F,Xe=new F,Ja=new fe,Qa=new Yi;class un{constructor(t=0,e=0,n=0,i=un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ja.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ja,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qa.setFromEuler(this),this.setFromQuaternion(Qa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}un.DEFAULT_ORDER="XYZ";class Ll{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let lu=0;const tc=new F,Ti=new Yi,Rn=new fe,Fs=new F,es=new F,hu=new F,uu=new Yi,ec=new F(1,0,0),nc=new F(0,1,0),ic=new F(0,0,1),sc={type:"added"},du={type:"removed"},Ai={type:"childadded",child:null},Or={type:"childremoved",child:null};class Le extends qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=Xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new F,e=new un,n=new Yi,i=new F(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new fe},normalMatrix:{value:new Bt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ll,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ti.setFromAxisAngle(t,e),this.quaternion.multiply(Ti),this}rotateOnWorldAxis(t,e){return Ti.setFromAxisAngle(t,e),this.quaternion.premultiply(Ti),this}rotateX(t){return this.rotateOnAxis(ec,t)}rotateY(t){return this.rotateOnAxis(nc,t)}rotateZ(t){return this.rotateOnAxis(ic,t)}translateOnAxis(t,e){return tc.copy(t).applyQuaternion(this.quaternion),this.position.add(tc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ec,t)}translateY(t){return this.translateOnAxis(nc,t)}translateZ(t){return this.translateOnAxis(ic,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fs.copy(t):Fs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(es,Fs,this.up):Rn.lookAt(Fs,es,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Ti.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ti.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Kt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sc),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null):Kt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(du),Or.child=t,this.dispatchEvent(Or),Or.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sc),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,t,hu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,uu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(t.shapes,d)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Le.DEFAULT_UP=new F(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new F,Pn=new F,zr=new F,Ln=new F,Ci=new F,Ri=new F,rc=new F,kr=new F,Gr=new F,Vr=new F,Hr=new xe,Wr=new xe,qr=new xe;class an{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),rn.subVectors(t,e),i.cross(rn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){rn.subVectors(i,e),Pn.subVectors(n,e),zr.subVectors(t,e);const o=rn.dot(rn),a=rn.dot(Pn),c=rn.dot(zr),l=Pn.dot(Pn),h=Pn.dot(zr),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,p=(o*h-a*c)*u;return s.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,Ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ln.x),c.addScaledVector(o,Ln.y),c.addScaledVector(a,Ln.z),c)}static getInterpolatedAttribute(t,e,n,i,s,o){return Hr.setScalar(0),Wr.setScalar(0),qr.setScalar(0),Hr.fromBufferAttribute(t,e),Wr.fromBufferAttribute(t,n),qr.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Hr,s.x),o.addScaledVector(Wr,s.y),o.addScaledVector(qr,s.z),o}static isFrontFacing(t,e,n,i){return rn.subVectors(n,e),Pn.subVectors(t,e),rn.cross(Pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),rn.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return an.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return an.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return an.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return an.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return an.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;Ci.subVectors(i,n),Ri.subVectors(s,n),kr.subVectors(t,n);const c=Ci.dot(kr),l=Ri.dot(kr);if(c<=0&&l<=0)return e.copy(n);Gr.subVectors(t,i);const h=Ci.dot(Gr),d=Ri.dot(Gr);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ci,o);Vr.subVectors(t,s);const f=Ci.dot(Vr),p=Ri.dot(Vr);if(p>=0&&f<=p)return e.copy(s);const x=f*l-c*p;if(x<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(Ri,a);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return rc.subVectors(s,i),a=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(rc,a);const m=1/(g+x+u);return o=x*m,a=u*m,e.copy(n).addScaledVector(Ci,o).addScaledVector(Ri,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Il={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},Us={h:0,s:0,l:0};function Xr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Ht{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=qt.workingColorSpace){if(t=Qh(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Xr(o,s,t+1/3),this.g=Xr(o,s,t),this.b=Xr(o,s,t-1/3)}return qt.colorSpaceToWorking(this,i),this}setStyle(t,e=Je){function n(s){s!==void 0&&parseFloat(s)<1&&Nt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Nt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);Nt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){const n=Il[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Nt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=zn(t.r),this.g=zn(t.g),this.b=zn(t.b),this}copyLinearToSRGB(t){return this.r=Bi(t.r),this.g=Bi(t.g),this.b=Bi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return qt.workingToColorSpace(De.copy(this),t),Math.round(Vt(De.r*255,0,255))*65536+Math.round(Vt(De.g*255,0,255))*256+Math.round(Vt(De.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.workingToColorSpace(De.copy(this),e);const n=De.r,i=De.g,s=De.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(i-s)/d+(i<s?6:0);break;case i:c=(s-n)/d+2;break;case s:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Je){qt.workingToColorSpace(De.copy(this),t);const e=De.r,n=De.g,i=De.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Xn),this.setHSL(Xn.h+t,Xn.s+e,Xn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Xn),t.getHSL(Us);const n=Cr(Xn.h,Us.h,e),i=Cr(Xn.s,Us.s,e),s=Cr(Xn.l,Us.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new Ht;Ht.NAMES=Il;let fu=0,Zi=class extends qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=Xi(),this.name="",this.type="Material",this.blending=Ui,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=po,this.blendDst=mo,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yi,this.stencilZFail=yi,this.stencilZPass=yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Nt(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Nt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==po&&(n.blendSrc=this.blendSrc),this.blendDst!==mo&&(n.blendDst=this.blendDst),this.blendEquation!==ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class Jt extends Zi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Se=new F,Bs=new _t;let pu=0;class hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=qa,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Bs.fromBufferAttribute(this,e),Bs.applyMatrix3(t),this.setXY(e,Bs.x,Bs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ji(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ge(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ji(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ji(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ji(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ji(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),i=Ge(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),i=Ge(i,this.array),s=Ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==qa&&(t.usage=this.usage),t}}class Dl extends hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Nl extends hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Xt extends hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let mu=0;const $e=new fe,Yr=new Le,Pi=new F,Ye=new Ss,ns=new Ss,Re=new F;class Ae extends qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=Xi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cl(t)?Nl:Dl)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Bt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $e.makeRotationFromQuaternion(t),this.applyMatrix4($e),this}rotateX(t){return $e.makeRotationX(t),this.applyMatrix4($e),this}rotateY(t){return $e.makeRotationY(t),this.applyMatrix4($e),this}rotateZ(t){return $e.makeRotationZ(t),this.applyMatrix4($e),this}translate(t,e,n){return $e.makeTranslation(t,e,n),this.applyMatrix4($e),this}scale(t,e,n){return $e.makeScale(t,e,n),this.applyMatrix4($e),this}lookAt(t){return Yr.lookAt(t),Yr.updateMatrix(),this.applyMatrix4(Yr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Xt(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&Nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ss);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ye.setFromBufferAttribute(s),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Kt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Kt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];ns.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors(Ye.min,ns.min),Ye.expandByPoint(Re),Re.addVectors(Ye.max,ns.max),Ye.expandByPoint(Re)):(Ye.expandByPoint(ns.min),Ye.expandByPoint(ns.max))}Ye.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Re.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Re));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Re.fromBufferAttribute(a,l),c&&(Pi.fromBufferAttribute(t,l),Re.add(Pi)),i=Math.max(i,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Kt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Kt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new F,c[I]=new F;const l=new F,h=new F,d=new F,u=new _t,f=new _t,p=new _t,x=new F,g=new F;function m(I,M,w){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,w),u.fromBufferAttribute(s,I),f.fromBufferAttribute(s,M),p.fromBufferAttribute(s,w),h.sub(l),d.sub(l),f.sub(u),p.sub(u);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),a[I].add(x),a[M].add(x),a[w].add(x),c[I].add(g),c[M].add(g),c[w].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let I=0,M=v.length;I<M;++I){const w=v[I],P=w.start,U=w.count;for(let L=P,O=P+U;L<O;L+=3)m(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const _=new F,y=new F,b=new F,T=new F;function C(I){b.fromBufferAttribute(i,I),T.copy(b);const M=a[I];_.copy(M),_.sub(b.multiplyScalar(b.dot(M))).normalize(),y.crossVectors(T,M);const P=y.dot(c[I])<0?-1:1;o.setXYZW(I,_.x,_.y,_.z,P)}for(let I=0,M=v.length;I<M;++I){const w=v[I],P=w.start,U=w.count;for(let L=P,O=P+U;L<O;L+=3)C(t.getX(L+0)),C(t.getX(L+1)),C(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new F,s=new F,o=new F,a=new F,c=new F,l=new F,h=new F,d=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){const p=t.getX(u+0),x=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,p=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let m=0;m<h;m++)u[p++]=l[f++]}return new hn(u,h,d)}if(this.index===null)return Nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const oc=new fe,ri=new Pl,Os=new gr,ac=new F,zs=new F,ks=new F,Gs=new F,Zr=new F,Vs=new F,cc=new F,Hs=new F;class mt extends Le{constructor(t=new Ae,e=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Vs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],d=s[c];h!==0&&(Zr.fromBufferAttribute(d,t),o?Vs.addScaledVector(Zr,h):Vs.addScaledVector(Zr.sub(e),h))}e.add(Vs)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(s),ri.copy(t.ray).recast(t.near),!(Os.containsPoint(ri.origin)===!1&&(ri.intersectSphere(Os,ac)===null||ri.origin.distanceToSquared(ac)>(t.far-t.near)**2))&&(oc.copy(s).invert(),ri.copy(t.ray).applyMatrix4(oc),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ri)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,x=u.length;p<x;p++){const g=u[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),_=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,b=_;y<b;y+=3){const T=a.getX(y),C=a.getX(y+1),I=a.getX(y+2);i=Ws(this,m,t,n,l,h,d,T,C,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){const v=a.getX(g),_=a.getX(g+1),y=a.getX(g+2);i=Ws(this,o,t,n,l,h,d,v,_,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,x=u.length;p<x;p++){const g=u[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),_=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,b=_;y<b;y+=3){const T=y,C=y+1,I=y+2;i=Ws(this,m,t,n,l,h,d,T,C,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){const v=g,_=g+1,y=g+2;i=Ws(this,o,t,n,l,h,d,v,_,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function gu(r,t,e,n,i,s,o,a){let c;if(t.side===He?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side===Qn,a),c===null)return null;Hs.copy(a),Hs.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Hs);return l<e.near||l>e.far?null:{distance:l,point:Hs.clone(),object:r}}function Ws(r,t,e,n,i,s,o,a,c,l){r.getVertexPosition(a,zs),r.getVertexPosition(c,ks),r.getVertexPosition(l,Gs);const h=gu(r,t,e,n,zs,ks,Gs,cc);if(h){const d=new F;an.getBarycoord(cc,zs,ks,Gs,d),i&&(h.uv=an.getInterpolatedAttribute(i,a,c,l,d,new _t)),s&&(h.uv1=an.getInterpolatedAttribute(s,a,c,l,d,new _t)),o&&(h.normal=an.getInterpolatedAttribute(o,a,c,l,d,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new F,materialIndex:0};an.getNormal(zs,ks,Gs,u.normal),h.face=u,h.barycoord=d}return h}class Jn extends Ae{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,e,t,o,s,0),p("z","y","x",1,-1,n,e,-t,o,s,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Xt(l,3)),this.setAttribute("normal",new Xt(h,3)),this.setAttribute("uv",new Xt(d,2));function p(x,g,m,v,_,y,b,T,C,I,M){const w=y/C,P=b/I,U=y/2,L=b/2,O=T/2,B=C+1,D=I+1;let V=0,q=0;const $=new F;for(let nt=0;nt<D;nt++){const st=nt*P-L;for(let rt=0;rt<B;rt++){const Dt=rt*w-U;$[x]=Dt*v,$[g]=st*_,$[m]=O,l.push($.x,$.y,$.z),$[x]=0,$[g]=0,$[m]=T>0?1:-1,h.push($.x,$.y,$.z),d.push(rt/C),d.push(1-nt/I),V+=1}}for(let nt=0;nt<I;nt++)for(let st=0;st<C;st++){const rt=u+st+B*nt,Dt=u+st+B*(nt+1),se=u+(st+1)+B*(nt+1),Qt=u+(st+1)+B*nt;c.push(rt,Dt,Qt),c.push(Dt,se,Qt),q+=6}a.addGroup(f,q,M),f+=q,u+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Hi(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Oe(r){const t={};for(let e=0;e<r.length;e++){const n=Hi(r[e]);for(const i in n)t[i]=n[i]}return t}function xu(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Fl(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const vu={clone:Hi,merge:Oe};var _u=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class En extends Zi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_u,this.fragmentShader=yu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=xu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ul extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new F,lc=new _t,hc=new _t;class Qe extends Ul{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ra*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ra*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,lc,hc),e.subVectors(hc,lc)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Li=-90,Ii=1;class Mu extends Le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Qe(Li,Ii,t,e);i.layers=this.layers,this.add(i);const s=new Qe(Li,Ii,t,e);s.layers=this.layers,this.add(s);const o=new Qe(Li,Ii,t,e);o.layers=this.layers,this.add(o);const a=new Qe(Li,Ii,t,e);a.layers=this.layers,this.add(a);const c=new Qe(Li,Ii,t,e);c.layers=this.layers,this.add(c);const l=new Qe(Li,Ii,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===_n)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ur)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Bl extends Ue{constructor(t=[],e=gi,n,i,s,o,a,c,l,h){super(t,e,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ol extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Bl(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Jn(5,5,5),s=new En({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:On});s.uniforms.tEquirect.value=e;const o=new mt(i,s),a=e.minFilter;return e.minFilter===pi&&(e.minFilter=Fe),new Mu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}class Bn extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Su={type:"move"};class Kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;l.inputState.pinching&&u>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Su)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Bn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ma{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=n}clone(){return new Ma(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class wu extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Eu extends Ue{constructor(t=null,e=1,n=1,i,s,o,a,c,l=Pe,h=Pe,d,u){super(null,o,a,c,l,h,i,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const jr=new F,bu=new F,Tu=new Bt;class hi{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=jr.subVectors(n,e).cross(bu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(jr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Tu.getNormalMatrix(t),i=this.coplanarPoint(jr).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const oi=new gr,Au=new _t(.5,.5),qs=new F;class Sa{constructor(t=new hi,e=new hi,n=new hi,i=new hi,s=new hi,o=new hi){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_n,n=!1){const i=this.planes,s=t.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],d=s[5],u=s[6],f=s[7],p=s[8],x=s[9],g=s[10],m=s[11],v=s[12],_=s[13],y=s[14],b=s[15];if(i[0].setComponents(l-o,f-h,m-p,b-v).normalize(),i[1].setComponents(l+o,f+h,m+p,b+v).normalize(),i[2].setComponents(l+a,f+d,m+x,b+_).normalize(),i[3].setComponents(l-a,f-d,m-x,b-_).normalize(),n)i[4].setComponents(c,u,g,y).normalize(),i[5].setComponents(l-c,f-u,m-g,b-y).normalize();else if(i[4].setComponents(l-c,f-u,m-g,b-y).normalize(),e===_n)i[5].setComponents(l+c,f+u,m+g,b+y).normalize();else if(e===ur)i[5].setComponents(c,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(t){oi.center.set(0,0,0);const e=Au.distanceTo(t.center);return oi.radius=.7071067811865476+e,oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(qs.x=i.normal.x>0?t.max.x:t.min.x,qs.y=i.normal.y>0?t.max.y:t.min.y,qs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zl extends Zi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const uc=new fe,oa=new Pl,Xs=new gr,Ys=new F;class Cu extends Le{constructor(t=new Ae,e=new zl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(i),Xs.radius+=s,t.ray.intersectsSphere(Xs)===!1)return;uc.copy(i).invert(),oa.copy(t.ray).applyMatrix4(uc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let p=u,x=f;p<x;p++){const g=l.getX(p);Ys.fromBufferAttribute(d,g),dc(Ys,g,c,i,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,x=f;p<x;p++)Ys.fromBufferAttribute(d,p),dc(Ys,p,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function dc(r,t,e,n,i,s,o){const a=oa.distanceSqToPoint(r);if(a<e){const c=new F;oa.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class kl extends Ue{constructor(t,e,n,i,s,o,a,c,l){super(t,e,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vs extends Ue{constructor(t,e,n=wn,i,s,o,a=Pe,c=Pe,l,h=Gn,d=1){if(h!==Gn&&h!==mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ya(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ru extends vs{constructor(t,e=wn,n=gi,i,s,o=Pe,a=Pe,c,l=Gn){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Gl extends Ue{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class wa extends Ae{constructor(t=1,e=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:s},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const o=[],a=[],c=[],l=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,p=n*2+s,x=i+1,g=new F,m=new F;for(let v=0;v<=p;v++){let _=0,y=0,b=0,T=0;if(v<=n){const M=v/n,w=M*Math.PI/2;y=-h-t*Math.cos(w),b=t*Math.sin(w),T=-t*Math.cos(w),_=M*d}else if(v<=n+s){const M=(v-n)/s;y=-h+M*e,b=t,T=0,_=d+M*u}else{const M=(v-n-s)/n,w=M*Math.PI/2;y=h+t*Math.sin(w),b=t*Math.cos(w),T=t*Math.sin(w),_=d+u+M*d}const C=Math.max(0,Math.min(1,_/f));let I=0;v===0?I=.5/i:v===p&&(I=-.5/i);for(let M=0;M<=i;M++){const w=M/i,P=w*Math.PI*2,U=Math.sin(P),L=Math.cos(P);m.x=-b*L,m.y=y,m.z=b*U,a.push(m.x,m.y,m.z),g.set(-b*L,T,b*U),g.normalize(),c.push(g.x,g.y,g.z),l.push(w+I,C)}if(v>0){const M=(v-1)*x;for(let w=0;w<i;w++){const P=M+w,U=M+w+1,L=v*x+w,O=v*x+w+1;o.push(P,U,L),o.push(U,O,L)}}}this.setIndex(o),this.setAttribute("position",new Xt(a,3)),this.setAttribute("normal",new Xt(c,3)),this.setAttribute("uv",new Xt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wa(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class xi extends Ae{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],c=[],l=new F,h=new _t;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Xt(o,3)),this.setAttribute("normal",new Xt(a,3)),this.setAttribute("uv",new Xt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class en extends Ae{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],f=[];let p=0;const x=[],g=n/2;let m=0;v(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Xt(d,3)),this.setAttribute("normal",new Xt(u,3)),this.setAttribute("uv",new Xt(f,2));function v(){const y=new F,b=new F;let T=0;const C=(e-t)/n;for(let I=0;I<=s;I++){const M=[],w=I/s,P=w*(e-t)+t;for(let U=0;U<=i;U++){const L=U/i,O=L*c+a,B=Math.sin(O),D=Math.cos(O);b.x=P*B,b.y=-w*n+g,b.z=P*D,d.push(b.x,b.y,b.z),y.set(B,C,D).normalize(),u.push(y.x,y.y,y.z),f.push(L,1-w),M.push(p++)}x.push(M)}for(let I=0;I<i;I++)for(let M=0;M<s;M++){const w=x[M][I],P=x[M+1][I],U=x[M+1][I+1],L=x[M][I+1];(t>0||M!==0)&&(h.push(w,P,L),T+=3),(e>0||M!==s-1)&&(h.push(P,U,L),T+=3)}l.addGroup(m,T,0),m+=T}function _(y){const b=p,T=new _t,C=new F;let I=0;const M=y===!0?t:e,w=y===!0?1:-1;for(let U=1;U<=i;U++)d.push(0,g*w,0),u.push(0,w,0),f.push(.5,.5),p++;const P=p;for(let U=0;U<=i;U++){const O=U/i*c+a,B=Math.cos(O),D=Math.sin(O);C.x=M*D,C.y=g*w,C.z=M*B,d.push(C.x,C.y,C.z),u.push(0,w,0),T.x=B*.5+.5,T.y=D*.5*w+.5,f.push(T.x,T.y),p++}for(let U=0;U<i;U++){const L=b+U,O=P+U;y===!0?h.push(O,O+1,L):h.push(O+1,O,L),I+=3}l.addGroup(m,I,y===!0?1:2),m+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new en(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class xr extends en{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new xr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vr extends Ae{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),l(n),h(),this.setAttribute("position",new Xt(s,3)),this.setAttribute("normal",new Xt(s.slice(),3)),this.setAttribute("uv",new Xt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const _=new F,y=new F,b=new F;for(let T=0;T<e.length;T+=3)f(e[T+0],_),f(e[T+1],y),f(e[T+2],b),c(_,y,b,v)}function c(v,_,y,b){const T=b+1,C=[];for(let I=0;I<=T;I++){C[I]=[];const M=v.clone().lerp(y,I/T),w=_.clone().lerp(y,I/T),P=T-I;for(let U=0;U<=P;U++)U===0&&I===T?C[I][U]=M:C[I][U]=M.clone().lerp(w,U/P)}for(let I=0;I<T;I++)for(let M=0;M<2*(T-I)-1;M++){const w=Math.floor(M/2);M%2===0?(u(C[I][w+1]),u(C[I+1][w]),u(C[I][w])):(u(C[I][w+1]),u(C[I+1][w+1]),u(C[I+1][w]))}}function l(v){const _=new F;for(let y=0;y<s.length;y+=3)_.x=s[y+0],_.y=s[y+1],_.z=s[y+2],_.normalize().multiplyScalar(v),s[y+0]=_.x,s[y+1]=_.y,s[y+2]=_.z}function h(){const v=new F;for(let _=0;_<s.length;_+=3){v.x=s[_+0],v.y=s[_+1],v.z=s[_+2];const y=g(v)/2/Math.PI+.5,b=m(v)/Math.PI+.5;o.push(y,1-b)}p(),d()}function d(){for(let v=0;v<o.length;v+=6){const _=o[v+0],y=o[v+2],b=o[v+4],T=Math.max(_,y,b),C=Math.min(_,y,b);T>.9&&C<.1&&(_<.2&&(o[v+0]+=1),y<.2&&(o[v+2]+=1),b<.2&&(o[v+4]+=1))}}function u(v){s.push(v.x,v.y,v.z)}function f(v,_){const y=v*3;_.x=t[y+0],_.y=t[y+1],_.z=t[y+2]}function p(){const v=new F,_=new F,y=new F,b=new F,T=new _t,C=new _t,I=new _t;for(let M=0,w=0;M<s.length;M+=9,w+=6){v.set(s[M+0],s[M+1],s[M+2]),_.set(s[M+3],s[M+4],s[M+5]),y.set(s[M+6],s[M+7],s[M+8]),T.set(o[w+0],o[w+1]),C.set(o[w+2],o[w+3]),I.set(o[w+4],o[w+5]),b.copy(v).add(_).add(y).divideScalar(3);const P=g(b);x(T,w+0,v,P),x(C,w+2,_,P),x(I,w+4,y,P)}}function x(v,_,y,b){b<0&&v.x===1&&(o[_]=v.x-1),y.x===0&&y.z===0&&(o[_]=b/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vr(t.vertices,t.indices,t.radius,t.detail)}}class Ea extends vr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ea(t.radius,t.detail)}}class bn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Nt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=e||(o.isVector2?new _t:new F);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new F,i=[],s=[],o=[],a=new F,c=new fe;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new F)}s[0]=new F,o[0]=new F;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Vt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,p))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(Vt(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let p=1;p<=t;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ba extends bn{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new _t){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Pu extends ba{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ta(){let r=0,t=0,e=0,n=0;function i(s,o,a,c){r=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,d){let u=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Zs=new F,$r=new Ta,Jr=new Ta,Qr=new Ta;class Lu extends bn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new F){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%s]:(Zs.subVectors(i[0],i[1]).add(i[0]),l=Zs);const d=i[a%s],u=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Zs.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Zs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),$r.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,p,x,g),Jr.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,p,x,g),Qr.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&($r.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Jr.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Qr.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set($r.calc(c),Jr.calc(c),Qr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new F().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function fc(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,c=r*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*r+e}function Iu(r,t){const e=1-r;return e*e*t}function Du(r,t){return 2*(1-r)*r*t}function Nu(r,t){return r*r*t}function ds(r,t,e,n){return Iu(r,t)+Du(r,e)+Nu(r,n)}function Fu(r,t){const e=1-r;return e*e*e*t}function Uu(r,t){const e=1-r;return 3*e*e*r*t}function Bu(r,t){return 3*(1-r)*r*r*t}function Ou(r,t){return r*r*r*t}function fs(r,t,e,n,i){return Fu(r,t)+Uu(r,e)+Bu(r,n)+Ou(r,i)}class Vl extends bn{constructor(t=new _t,e=new _t,n=new _t,i=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new _t){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(fs(t,i.x,s.x,o.x,a.x),fs(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class zu extends bn{constructor(t=new F,e=new F,n=new F,i=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new F){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(fs(t,i.x,s.x,o.x,a.x),fs(t,i.y,s.y,o.y,a.y),fs(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Hl extends bn{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ku extends bn{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wl extends bn{constructor(t=new _t,e=new _t,n=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new _t){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(ds(t,i.x,s.x,o.x),ds(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gu extends bn{constructor(t=new F,e=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new F){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(ds(t,i.x,s.x,o.x),ds(t,i.y,s.y,o.y),ds(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ql extends bn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(fc(a,c.x,l.x,h.x,d.x),fc(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new _t().fromArray(i))}return this}}var pc=Object.freeze({__proto__:null,ArcCurve:Pu,CatmullRomCurve3:Lu,CubicBezierCurve:Vl,CubicBezierCurve3:zu,EllipseCurve:ba,LineCurve:Hl,LineCurve3:ku,QuadraticBezierCurve:Wl,QuadraticBezierCurve3:Gu,SplineCurve:ql});class Vu extends bn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new pc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new pc[i.type]().fromJSON(i))}return this}}class mc extends Vu{constructor(t){super(),this.type="Path",this.currentPoint=new _t,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Hl(this.currentPoint.clone(),new _t(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new Wl(this.currentPoint.clone(),new _t(t,e),new _t(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new Vl(this.currentPoint.clone(),new _t(t,e),new _t(n,i),new _t(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new ql(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,s,o,a,c),this}absellipse(t,e,n,i,s,o,a,c){const l=new ba(t,e,n,i,s,o,a,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}let _r=class extends mc{constructor(t){super(t),this.uuid=Xi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new mc().fromJSON(i))}return this}};function Hu(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=Xl(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=Zu(r,t,s,e)),r.length>80*e){a=r[0],c=r[1];let h=a,d=c;for(let u=e;u<i;u+=e){const f=r[u],p=r[u+1];f<a&&(a=f),p<c&&(c=p),f>h&&(h=f),p>d&&(d=p)}l=Math.max(h-a,d-c),l=l!==0?32767/l:0}return _s(s,o,e,a,c,l,0),o}function Xl(r,t,e,n,i){let s;if(i===rd(r,t,e,n)>0)for(let o=t;o<e;o+=n)s=gc(o/n|0,r[o],r[o+1],s);else for(let o=e-n;o>=t;o-=n)s=gc(o/n|0,r[o],r[o+1],s);return s&&Wi(s,s.next)&&(Ms(s),s=s.next),s}function vi(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Wi(e,e.next)||pe(e.prev,e,e.next)===0)){if(Ms(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function _s(r,t,e,n,i,s,o){if(!r)return;!o&&s&&Qu(r,n,i,s);let a=r;for(;r.prev!==r.next;){const c=r.prev,l=r.next;if(s?qu(r,n,i,s):Wu(r)){t.push(c.i,r.i,l.i),Ms(r),r=l.next,a=l.next;continue}if(r=l,r===a){o?o===1?(r=Xu(vi(r),t),_s(r,t,e,n,i,s,2)):o===2&&Yu(r,t,e,n,i,s):_s(vi(r),t,e,n,i,s,1);break}}}function Wu(r){const t=r.prev,e=r,n=r.next;if(pe(t,e,n)>=0)return!1;const i=t.x,s=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(i,s,o),d=Math.min(a,c,l),u=Math.max(i,s,o),f=Math.max(a,c,l);let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&hs(i,a,s,c,o,l,p.x,p.y)&&pe(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function qu(r,t,e,n){const i=r.prev,s=r,o=r.next;if(pe(i,s,o)>=0)return!1;const a=i.x,c=s.x,l=o.x,h=i.y,d=s.y,u=o.y,f=Math.min(a,c,l),p=Math.min(h,d,u),x=Math.max(a,c,l),g=Math.max(h,d,u),m=aa(f,p,t,e,n),v=aa(x,g,t,e,n);let _=r.prevZ,y=r.nextZ;for(;_&&_.z>=m&&y&&y.z<=v;){if(_.x>=f&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&hs(a,h,c,d,l,u,_.x,_.y)&&pe(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=f&&y.x<=x&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&hs(a,h,c,d,l,u,y.x,y.y)&&pe(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=m;){if(_.x>=f&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&hs(a,h,c,d,l,u,_.x,_.y)&&pe(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=v;){if(y.x>=f&&y.x<=x&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&hs(a,h,c,d,l,u,y.x,y.y)&&pe(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Xu(r,t){let e=r;do{const n=e.prev,i=e.next.next;!Wi(n,i)&&Zl(n,e,e.next,i)&&ys(n,i)&&ys(i,n)&&(t.push(n.i,e.i,i.i),Ms(e),Ms(e.next),e=r=i),e=e.next}while(e!==r);return vi(e)}function Yu(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&nd(o,a)){let c=Kl(o,a);o=vi(o,o.next),c=vi(c,c.next),_s(o,t,e,n,i,s,0),_s(c,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function Zu(r,t,e,n){const i=[];for(let s=0,o=t.length;s<o;s++){const a=t[s]*n,c=s<o-1?t[s+1]*n:r.length,l=Xl(r,a,c,n,!1);l===l.next&&(l.steiner=!0),i.push(ed(l))}i.sort(Ku);for(let s=0;s<i.length;s++)e=ju(i[s],e);return e}function Ku(r,t){let e=r.x-t.x;if(e===0&&(e=r.y-t.y,e===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function ju(r,t){const e=$u(r,t);if(!e)return t;const n=Kl(e,r);return vi(n,n.next),vi(e,e.next)}function $u(r,t){let e=t;const n=r.x,i=r.y;let s=-1/0,o;if(Wi(r,e))return e;do{if(Wi(r,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>s&&(s=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Yl(i<l?n:s,i,c,l,i<l?s:n,i,e.x,e.y)){const d=Math.abs(i-e.y)/(n-e.x);ys(e,r)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&Ju(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function Ju(r,t){return pe(r.prev,r,t.prev)<0&&pe(t.next,r,r.next)<0}function Qu(r,t,e,n){let i=r;do i.z===0&&(i.z=aa(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,td(i)}function td(r){let t,e=1;do{let n=r,i;r=null;let s=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,c--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,e*=2}while(t>1);return r}function aa(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function ed(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Yl(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function hs(r,t,e,n,i,s,o,a){return!(r===o&&t===a)&&Yl(r,t,e,n,i,s,o,a)}function nd(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!id(r,t)&&(ys(r,t)&&ys(t,r)&&sd(r,t)&&(pe(r.prev,r,t.prev)||pe(r,t.prev,t))||Wi(r,t)&&pe(r.prev,r,r.next)>0&&pe(t.prev,t,t.next)>0)}function pe(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Wi(r,t){return r.x===t.x&&r.y===t.y}function Zl(r,t,e,n){const i=js(pe(r,t,e)),s=js(pe(r,t,n)),o=js(pe(e,n,r)),a=js(pe(e,n,t));return!!(i!==s&&o!==a||i===0&&Ks(r,e,t)||s===0&&Ks(r,n,t)||o===0&&Ks(e,r,n)||a===0&&Ks(e,t,n))}function Ks(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function js(r){return r>0?1:r<0?-1:0}function id(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Zl(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function ys(r,t){return pe(r.prev,r,r.next)<0?pe(r,t,r.next)>=0&&pe(r,r.prev,t)>=0:pe(r,t,r.prev)<0||pe(r,r.next,t)<0}function sd(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Kl(r,t){const e=ca(r.i,r.x,r.y),n=ca(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function gc(r,t,e,n){const i=ca(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ms(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ca(r,t,e){return{i:r,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rd(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class od{static triangulate(t,e,n=2){return Hu(t,e,n)}}class ps{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return ps.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];xc(t),vc(n,t);let o=t.length;e.forEach(xc);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,vc(n,e[c]);const a=od.triangulate(n,i);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function xc(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function vc(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Aa extends vr{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Aa(t.radius,t.detail)}}class Ne extends Ae{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=t/a,u=e/c,f=[],p=[],x=[],g=[];for(let m=0;m<h;m++){const v=m*u-o;for(let _=0;_<l;_++){const y=_*d-s;p.push(y,-v,0),x.push(0,0,1),g.push(_/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<a;v++){const _=v+l*m,y=v+l*(m+1),b=v+1+l*(m+1),T=v+1+l*m;f.push(_,y,T),f.push(y,b,T)}this.setIndex(f),this.setAttribute("position",new Xt(p,3)),this.setAttribute("normal",new Xt(x,3)),this.setAttribute("uv",new Xt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.widthSegments,t.heightSegments)}}class ti extends Ae{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let d=t;const u=(e-t)/i,f=new F,p=new _t;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){const m=s+g/n*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}d+=u}for(let x=0;x<i;x++){const g=x*(n+1);for(let m=0;m<n;m++){const v=m+g,_=v,y=v+n+1,b=v+n+2,T=v+1;a.push(_,y,T),a.push(y,b,T)}}this.setIndex(a),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(l,3)),this.setAttribute("uv",new Xt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ti(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ws extends Ae{constructor(t=new _r([new _t(0,.5),new _t(-.5,-.5),new _t(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],s=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Xt(i,3)),this.setAttribute("normal",new Xt(s,3)),this.setAttribute("uv",new Xt(o,2));function l(h){const d=i.length/3,u=h.extractPoints(e);let f=u.shape;const p=u.holes;ps.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];ps.isClockWise(v)===!0&&(p[g]=v.reverse())}const x=ps.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];f=f.concat(v)}for(let g=0,m=f.length;g<m;g++){const v=f[g];i.push(v.x,v.y,0),s.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=x.length;g<m;g++){const v=x[g],_=v[0]+d,y=v[1]+d,b=v[2]+d;n.push(_,y,b),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return ad(e,t)}static fromJSON(t,e){const n=[];for(let i=0,s=t.shapes.length;i<s;i++){const o=e[t.shapes[i]];n.push(o)}return new ws(n,t.curveSegments)}}function ad(r,t){if(t.shapes=[],Array.isArray(r))for(let e=0,n=r.length;e<n;e++){const i=r[e];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t}class tn extends Ae{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],d=new F,u=new F,f=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){const v=[],_=m/n;let y=0;m===0&&o===0?y=.5/e:m===n&&c===Math.PI&&(y=-.5/e);for(let b=0;b<=e;b++){const T=b/e;d.x=-t*Math.cos(i+T*s)*Math.sin(o+_*a),d.y=t*Math.cos(o+_*a),d.z=t*Math.sin(i+T*s)*Math.sin(o+_*a),p.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),g.push(T+y,1-_),v.push(l++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){const _=h[m][v+1],y=h[m][v],b=h[m+1][v],T=h[m+1][v+1];(m!==0||o>0)&&f.push(_,y,T),(m!==n-1||c<Math.PI)&&f.push(y,b,T)}this.setIndex(f),this.setAttribute("position",new Xt(p,3)),this.setAttribute("normal",new Xt(x,3)),this.setAttribute("uv",new Xt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Es extends Ae{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new F,d=new F,u=new F;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const x=p/i*s,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(x),d.y=(t+e*Math.cos(g))*Math.sin(x),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const x=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,v=(i+1)*f+p;o.push(x,g,v),o.push(g,m,v)}this.setIndex(o),this.setAttribute("position",new Xt(a,3)),this.setAttribute("normal",new Xt(c,3)),this.setAttribute("uv",new Xt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class cd extends En{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ve extends Zi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Al,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ld extends Zi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class hd extends Zi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class jl extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const to=new fe,_c=new F,yc=new F;class ud{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.mapType=Ze,this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sa,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;_c.setFromMatrixPosition(t.matrixWorld),e.position.copy(_c),yc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yc),e.updateMatrixWorld(),to.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(to,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(to)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ca extends Ul{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class dd extends ud{constructor(){super(new Ca(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fd extends jl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new dd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class pd extends jl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class md extends Qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class gd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Mc(r,t,e,n){const i=xd(n);switch(e){case El:return r*t;case Tl:return r*t/i.components*i.byteLength;case ma:return r*t/i.components*i.byteLength;case Gi:return r*t*2/i.components*i.byteLength;case ga:return r*t*2/i.components*i.byteLength;case bl:return r*t*3/i.components*i.byteLength;case cn:return r*t*4/i.components*i.byteLength;case xa:return r*t*4/i.components*i.byteLength;case rr:case or:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ar:case cr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Co:case Po:return Math.max(r,16)*Math.max(t,8)/4;case Ao:case Ro:return Math.max(r,8)*Math.max(t,8)/2;case Lo:case Io:case No:case Fo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Do:case Uo:case Bo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Oo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case zo:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ko:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Go:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Ho:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case qo:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Xo:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case jo:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case $o:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Jo:case Qo:case ta:return Math.ceil(r/4)*Math.ceil(t/4)*16;case ea:case na:return Math.ceil(r/4)*Math.ceil(t/4)*8;case ia:case sa:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xd(r){switch(r){case Ze:case yl:return{byteLength:1,components:1};case ms:case Ml:case kn:return{byteLength:2,components:1};case fa:case pa:return{byteLength:2,components:4};case wn:case da:case vn:return{byteLength:4,components:1};case Sl:case wl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ua}}));typeof window<"u"&&(window.__THREE__?Nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ua);function $l(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function vd(r){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,d=l.byteLength,u=r.createBuffer();r.bindBuffer(c,u),r.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=r.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const h=c.array,d=c.updateRanges;if(r.bindBuffer(l,a),d.length===0)r.bufferSubData(l,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],x=d[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const x=d[f];r.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(r.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}var _d=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yd=`#ifdef USE_ALPHAHASH
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
#endif`,Md=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ed=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bd=`#ifdef USE_AOMAP
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
#endif`,Td=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ad=`#ifdef USE_BATCHING
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
#endif`,Cd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pd=`vec3 objectNormal = vec3( normal );
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
} // validated`,Id=`#ifdef USE_IRIDESCENCE
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
#endif`,Dd=`#ifdef USE_BUMPMAP
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
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Od=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Vd=`#define PI 3.141592653589793
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
} // validated`,Hd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Wd=`vec3 transformedNormal = objectNormal;
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
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kd="gl_FragColor = linearToOutputTexel( gl_FragColor );",jd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$d=`#ifdef USE_ENVMAP
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
#endif`,Jd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Qd=`#ifdef USE_ENVMAP
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
#endif`,tf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ef=`#ifdef USE_ENVMAP
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
#endif`,nf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,of=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,af=`#ifdef USE_GRADIENTMAP
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
}`,cf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uf=`uniform bool receiveShadow;
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
#endif`,df=`#ifdef USE_ENVMAP
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
#endif`,ff=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xf=`PhysicalMaterial material;
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
#endif`,vf=`uniform sampler2D dfgLUT;
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
}`,_f=`
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
#endif`,yf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ef=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Af=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rf=`#if defined( USE_POINTS_UV )
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
#endif`,Pf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,If=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Df=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`#ifdef USE_MORPHTARGETS
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
#endif`,Uf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Of=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vf=`#ifdef USE_NORMALMAP
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
#endif`,Hf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ep=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ip=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sp=`float getShadowMask() {
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
}`,rp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,op=`#ifdef USE_SKINNING
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
#endif`,ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cp=`#ifdef USE_SKINNING
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
#endif`,lp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,up=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fp=`#ifdef USE_TRANSMISSION
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
#endif`,pp=`#ifdef USE_TRANSMISSION
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
#endif`,mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _p=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yp=`uniform sampler2D t2D;
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
}`,Mp=`varying vec3 vWorldDirection;
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
}`,wp=`varying vec3 vWorldDirection;
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
}`,bp=`#include <common>
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
}`,Tp=`#if DEPTH_PACKING == 3200
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
}`,Ap=`#define DISTANCE
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
}`,Cp=`#define DISTANCE
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
}`,Rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pp=`uniform sampler2D tEquirect;
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Dp=`#include <common>
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
}`,Np=`uniform vec3 diffuse;
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
}`,Fp=`#define LAMBERT
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
}`,Up=`#define LAMBERT
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
}`,Bp=`#define MATCAP
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
}`,Op=`#define MATCAP
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
}`,zp=`#define NORMAL
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
}`,kp=`#define NORMAL
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
}`,Gp=`#define PHONG
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
}`,Vp=`#define PHONG
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
}`,Hp=`#define STANDARD
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
}`,Wp=`#define STANDARD
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
}`,qp=`#define TOON
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
}`,Xp=`#define TOON
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
}`,Yp=`uniform float size;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,Kp=`#include <common>
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
}`,jp=`uniform vec3 color;
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
}`,$p=`uniform float rotation;
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
}`,Jp=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:_d,alphahash_pars_fragment:yd,alphamap_fragment:Md,alphamap_pars_fragment:Sd,alphatest_fragment:wd,alphatest_pars_fragment:Ed,aomap_fragment:bd,aomap_pars_fragment:Td,batching_pars_vertex:Ad,batching_vertex:Cd,begin_vertex:Rd,beginnormal_vertex:Pd,bsdfs:Ld,iridescence_fragment:Id,bumpmap_pars_fragment:Dd,clipping_planes_fragment:Nd,clipping_planes_pars_fragment:Fd,clipping_planes_pars_vertex:Ud,clipping_planes_vertex:Bd,color_fragment:Od,color_pars_fragment:zd,color_pars_vertex:kd,color_vertex:Gd,common:Vd,cube_uv_reflection_fragment:Hd,defaultnormal_vertex:Wd,displacementmap_pars_vertex:qd,displacementmap_vertex:Xd,emissivemap_fragment:Yd,emissivemap_pars_fragment:Zd,colorspace_fragment:Kd,colorspace_pars_fragment:jd,envmap_fragment:$d,envmap_common_pars_fragment:Jd,envmap_pars_fragment:Qd,envmap_pars_vertex:tf,envmap_physical_pars_fragment:df,envmap_vertex:ef,fog_vertex:nf,fog_pars_vertex:sf,fog_fragment:rf,fog_pars_fragment:of,gradientmap_pars_fragment:af,lightmap_pars_fragment:cf,lights_lambert_fragment:lf,lights_lambert_pars_fragment:hf,lights_pars_begin:uf,lights_toon_fragment:ff,lights_toon_pars_fragment:pf,lights_phong_fragment:mf,lights_phong_pars_fragment:gf,lights_physical_fragment:xf,lights_physical_pars_fragment:vf,lights_fragment_begin:_f,lights_fragment_maps:yf,lights_fragment_end:Mf,logdepthbuf_fragment:Sf,logdepthbuf_pars_fragment:wf,logdepthbuf_pars_vertex:Ef,logdepthbuf_vertex:bf,map_fragment:Tf,map_pars_fragment:Af,map_particle_fragment:Cf,map_particle_pars_fragment:Rf,metalnessmap_fragment:Pf,metalnessmap_pars_fragment:Lf,morphinstance_vertex:If,morphcolor_vertex:Df,morphnormal_vertex:Nf,morphtarget_pars_vertex:Ff,morphtarget_vertex:Uf,normal_fragment_begin:Bf,normal_fragment_maps:Of,normal_pars_fragment:zf,normal_pars_vertex:kf,normal_vertex:Gf,normalmap_pars_fragment:Vf,clearcoat_normal_fragment_begin:Hf,clearcoat_normal_fragment_maps:Wf,clearcoat_pars_fragment:qf,iridescence_pars_fragment:Xf,opaque_fragment:Yf,packing:Zf,premultiplied_alpha_fragment:Kf,project_vertex:jf,dithering_fragment:$f,dithering_pars_fragment:Jf,roughnessmap_fragment:Qf,roughnessmap_pars_fragment:tp,shadowmap_pars_fragment:ep,shadowmap_pars_vertex:np,shadowmap_vertex:ip,shadowmask_pars_fragment:sp,skinbase_vertex:rp,skinning_pars_vertex:op,skinning_vertex:ap,skinnormal_vertex:cp,specularmap_fragment:lp,specularmap_pars_fragment:hp,tonemapping_fragment:up,tonemapping_pars_fragment:dp,transmission_fragment:fp,transmission_pars_fragment:pp,uv_pars_fragment:mp,uv_pars_vertex:gp,uv_vertex:xp,worldpos_vertex:vp,background_vert:_p,background_frag:yp,backgroundCube_vert:Mp,backgroundCube_frag:Sp,cube_vert:wp,cube_frag:Ep,depth_vert:bp,depth_frag:Tp,distance_vert:Ap,distance_frag:Cp,equirect_vert:Rp,equirect_frag:Pp,linedashed_vert:Lp,linedashed_frag:Ip,meshbasic_vert:Dp,meshbasic_frag:Np,meshlambert_vert:Fp,meshlambert_frag:Up,meshmatcap_vert:Bp,meshmatcap_frag:Op,meshnormal_vert:zp,meshnormal_frag:kp,meshphong_vert:Gp,meshphong_frag:Vp,meshphysical_vert:Hp,meshphysical_frag:Wp,meshtoon_vert:qp,meshtoon_frag:Xp,points_vert:Yp,points_frag:Zp,shadow_vert:Kp,shadow_frag:jp,sprite_vert:$p,sprite_frag:Jp},dt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},xn={basic:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Oe([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Oe([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Oe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Oe([dt.points,dt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Oe([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Oe([dt.common,dt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Oe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Oe([dt.sprite,dt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distance:{uniforms:Oe([dt.common,dt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distance_vert,fragmentShader:Ot.distance_frag},shadow:{uniforms:Oe([dt.lights,dt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};xn.physical={uniforms:Oe([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const $s={r:0,b:0,g:0},ai=new un,Qp=new fe;function tm(r,t,e,n,i,s,o){const a=new Ht(0);let c=s===!0?0:1,l,h,d=null,u=0,f=null;function p(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?e:t).get(y)),y}function x(_){let y=!1;const b=p(_);b===null?m(a,c):b&&b.isColor&&(m(b,1),y=!0);const T=r.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(_,y){const b=p(y);b&&(b.isCubeTexture||b.mapping===mr)?(h===void 0&&(h=new mt(new Jn(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:Hi(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ai.copy(y.backgroundRotation),ai.x*=-1,ai.y*=-1,ai.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Qp.makeRotationFromEuler(ai)),h.material.toneMapped=qt.getTransfer(b.colorSpace)!==ie,(d!==b||u!==b.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,d=b,u=b.version,f=r.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new mt(new Ne(2,2),new En({name:"BackgroundMaterial",uniforms:Hi(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=qt.getTransfer(b.colorSpace)!==ie,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||u!==b.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,d=b,u=b.version,f=r.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,y){_.getRGB($s,Fl(r)),n.buffers.color.setClear($s.r,$s.g,$s.b,y,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,m(a,c)},render:x,addToRenderList:g,dispose:v}}function em(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,o=!1;function a(w,P,U,L,O){let B=!1;const D=d(L,U,P);s!==D&&(s=D,l(s.object)),B=f(w,L,U,O),B&&p(w,L,U,O),O!==null&&t.update(O,r.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,y(w,P,U,L),O!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return r.createVertexArray()}function l(w){return r.bindVertexArray(w)}function h(w){return r.deleteVertexArray(w)}function d(w,P,U){const L=U.wireframe===!0;let O=n[w.id];O===void 0&&(O={},n[w.id]=O);let B=O[P.id];B===void 0&&(B={},O[P.id]=B);let D=B[L];return D===void 0&&(D=u(c()),B[L]=D),D}function u(w){const P=[],U=[],L=[];for(let O=0;O<e;O++)P[O]=0,U[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:L,object:w,attributes:{},index:null}}function f(w,P,U,L){const O=s.attributes,B=P.attributes;let D=0;const V=U.getAttributes();for(const q in V)if(V[q].location>=0){const nt=O[q];let st=B[q];if(st===void 0&&(q==="instanceMatrix"&&w.instanceMatrix&&(st=w.instanceMatrix),q==="instanceColor"&&w.instanceColor&&(st=w.instanceColor)),nt===void 0||nt.attribute!==st||st&&nt.data!==st.data)return!0;D++}return s.attributesNum!==D||s.index!==L}function p(w,P,U,L){const O={},B=P.attributes;let D=0;const V=U.getAttributes();for(const q in V)if(V[q].location>=0){let nt=B[q];nt===void 0&&(q==="instanceMatrix"&&w.instanceMatrix&&(nt=w.instanceMatrix),q==="instanceColor"&&w.instanceColor&&(nt=w.instanceColor));const st={};st.attribute=nt,nt&&nt.data&&(st.data=nt.data),O[q]=st,D++}s.attributes=O,s.attributesNum=D,s.index=L}function x(){const w=s.newAttributes;for(let P=0,U=w.length;P<U;P++)w[P]=0}function g(w){m(w,0)}function m(w,P){const U=s.newAttributes,L=s.enabledAttributes,O=s.attributeDivisors;U[w]=1,L[w]===0&&(r.enableVertexAttribArray(w),L[w]=1),O[w]!==P&&(r.vertexAttribDivisor(w,P),O[w]=P)}function v(){const w=s.newAttributes,P=s.enabledAttributes;for(let U=0,L=P.length;U<L;U++)P[U]!==w[U]&&(r.disableVertexAttribArray(U),P[U]=0)}function _(w,P,U,L,O,B,D){D===!0?r.vertexAttribIPointer(w,P,U,O,B):r.vertexAttribPointer(w,P,U,L,O,B)}function y(w,P,U,L){x();const O=L.attributes,B=U.getAttributes(),D=P.defaultAttributeValues;for(const V in B){const q=B[V];if(q.location>=0){let $=O[V];if($===void 0&&(V==="instanceMatrix"&&w.instanceMatrix&&($=w.instanceMatrix),V==="instanceColor"&&w.instanceColor&&($=w.instanceColor)),$!==void 0){const nt=$.normalized,st=$.itemSize,rt=t.get($);if(rt===void 0)continue;const Dt=rt.buffer,se=rt.type,Qt=rt.bytesPerElement,K=se===r.INT||se===r.UNSIGNED_INT||$.gpuType===da;if($.isInterleavedBufferAttribute){const Q=$.data,yt=Q.stride,Ut=$.offset;if(Q.isInstancedInterleavedBuffer){for(let wt=0;wt<q.locationSize;wt++)m(q.location+wt,Q.meshPerAttribute);w.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let wt=0;wt<q.locationSize;wt++)g(q.location+wt);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let wt=0;wt<q.locationSize;wt++)_(q.location+wt,st/q.locationSize,se,nt,yt*Qt,(Ut+st/q.locationSize*wt)*Qt,K)}else{if($.isInstancedBufferAttribute){for(let Q=0;Q<q.locationSize;Q++)m(q.location+Q,$.meshPerAttribute);w.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Q=0;Q<q.locationSize;Q++)g(q.location+Q);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let Q=0;Q<q.locationSize;Q++)_(q.location+Q,st/q.locationSize,se,nt,st*Qt,st/q.locationSize*Q*Qt,K)}}else if(D!==void 0){const nt=D[V];if(nt!==void 0)switch(nt.length){case 2:r.vertexAttrib2fv(q.location,nt);break;case 3:r.vertexAttrib3fv(q.location,nt);break;case 4:r.vertexAttrib4fv(q.location,nt);break;default:r.vertexAttrib1fv(q.location,nt)}}}}v()}function b(){I();for(const w in n){const P=n[w];for(const U in P){const L=P[U];for(const O in L)h(L[O].object),delete L[O];delete P[U]}delete n[w]}}function T(w){if(n[w.id]===void 0)return;const P=n[w.id];for(const U in P){const L=P[U];for(const O in L)h(L[O].object),delete L[O];delete P[U]}delete n[w.id]}function C(w){for(const P in n){const U=n[P];if(U[w.id]===void 0)continue;const L=U[w.id];for(const O in L)h(L[O].object),delete L[O];delete U[w.id]}}function I(){M(),o=!0,s!==i&&(s=i,l(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:M,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function nm(r,t,e){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,d){d!==0&&(r.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let p=0;p<d;p++)f+=h[p];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<l.length;p++)o(l[p],h[p],u[p]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let p=0;for(let x=0;x<d;x++)p+=h[x]*u[x];e.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function im(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==cn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const I=C===kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Ze&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==vn&&!I)}function c(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Nt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),_=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=r.getParameter(r.MAX_SAMPLES),T=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:y,maxSamples:b,samples:T}}function sm(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new hi,a=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=r.get(d);if(!i||p===null||p.length===0||s&&!g)s?h(null):l();else{const v=s?0:n,_=v*4;let y=m.clippingState||null;c.value=y,y=h(p,u,_,f);for(let b=0;b!==_;++b)y[b]=e[b];m.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=c.value,p!==!0||g===null){const m=f+x*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let _=0,y=f;_!==x;++_,y+=4)o.copy(d[_]).applyMatrix4(v,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function rm(r){let t=new WeakMap;function e(o,a){return a===wo?o.mapping=gi:a===Eo&&(o.mapping=ki),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===wo||a===Eo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Ol(c.height);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const $n=4,Sc=[.125,.215,.35,.446,.526,.582],di=20,om=256,is=new Ca,wc=new Ht;let eo=null,no=0,io=0,so=!1;const am=new F;class Ec{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,s={}){const{size:o=256,position:a=am}=s;eo=this._renderer.getRenderTarget(),no=this._renderer.getActiveCubeFace(),io=this._renderer.getActiveMipmapLevel(),so=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ac(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(eo,no,io),this._renderer.xr.enabled=so,t.scissorTest=!1,Di(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gi||t.mapping===ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),eo=this._renderer.getRenderTarget(),no=this._renderer.getActiveCubeFace(),io=this._renderer.getActiveMipmapLevel(),so=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:kn,format:cn,colorSpace:Vi,depthBuffer:!1},i=bc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bc(t,e,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cm(s)),this._blurMaterial=hm(s,t,e),this._ggxMaterial=lm(s,t,e)}return i}_compileMaterial(t){const e=new mt(new Ae,t);this._renderer.compile(e,is)}_sceneToCubeUV(t,e,n,i,s){const c=new Qe(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(wc),d.toneMapping=yn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new mt(new Jn,new Jt({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const v=t.background;v?v.isColor&&(g.color.copy(v),t.background=null,m=!0):(g.color.copy(wc),m=!0);for(let _=0;_<6;_++){const y=_%3;y===0?(c.up.set(0,l[_],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[_],s.y,s.z)):y===1?(c.up.set(0,0,l[_]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[_],s.z)):(c.up.set(0,l[_],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[_]));const b=this._cubeSize;Di(i,y*b,_>2?b:0,b,b),d.setRenderTarget(i),m&&d.render(x,c),d.render(t,c)}d.toneMapping=f,d.autoClear=u,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===gi||t.mapping===ki;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ac()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tc());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Di(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,is)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,f=d*u,{_lodMax:p}=this,x=this._sizeLods[n],g=3*x*(n>p-$n?n-p+$n:0),m=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=p-e,Di(s,g,m,3*x,2*x),i.setRenderTarget(s),i.render(a,is),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=p-n,Di(t,g,m,3*x,2*x),i.setRenderTarget(t),i.render(a,is)}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Kt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[i];d.material=l;const u=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*di-1),x=s/p,g=isFinite(s)?1+Math.floor(h*x):di;g>di&&Nt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${di}`);const m=[];let v=0;for(let C=0;C<di;++C){const I=C/x,M=Math.exp(-I*I/2);m.push(M),C===0?v+=M:C<g&&(v+=2*M)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:_}=this;u.dTheta.value=p,u.mipInt.value=_-n;const y=this._sizeLods[i],b=3*y*(i>_-$n?i-_+$n:0),T=4*(this._cubeSize-y);Di(e,b,T,3*y,2*y),c.setRenderTarget(e),c.render(d,is)}}function cm(r){const t=[],e=[],n=[];let i=r;const s=r-$n+1+Sc.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>r-$n?c=Sc[o-r+$n-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,x=3,g=2,m=1,v=new Float32Array(x*p*f),_=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let T=0;T<f;T++){const C=T%3*2/3-1,I=T>2?0:-1,M=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];v.set(M,x*p*T),_.set(u,g*p*T);const w=[T,T,T,T,T,T];y.set(w,m*p*T)}const b=new Ae;b.setAttribute("position",new hn(v,x)),b.setAttribute("uv",new hn(_,g)),b.setAttribute("faceIndex",new hn(y,m)),n.push(new mt(b,null)),i>$n&&i--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function bc(r,t,e){const n=new Mn(r,t,e);return n.texture.mapping=mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Di(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function lm(r,t,e){return new En({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:om,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:yr(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function hm(r,t,e){const n=new Float32Array(di),i=new F(0,1,0);return new En({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:yr(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Tc(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yr(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Ac(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function yr(){return`

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
	`}function um(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===wo||c===Eo,h=c===gi||c===ki;if(l||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Ec(r)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Ec(r)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function dm(r){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=r.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&xs("WebGLRenderer: "+n+" extension not supported."),i}}}function fm(r,t,e,n){const i={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete i[u.id];const f=s.get(u);f&&(t.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)t.update(u[f],r.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,p=d.attributes.position;let x=0;if(f!==null){const v=f.array;x=f.version;for(let _=0,y=v.length;_<y;_+=3){const b=v[_+0],T=v[_+1],C=v[_+2];u.push(b,T,T,C,C,b)}}else if(p!==void 0){const v=p.array;x=p.version;for(let _=0,y=v.length/3-1;_<y;_+=3){const b=_+0,T=_+1,C=_+2;u.push(b,T,T,C,C,b)}}else return;const g=new(Cl(u)?Nl:Dl)(u,1);g.version=x;const m=s.get(d);m&&t.remove(m),s.set(d,g)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function pm(r,t,e){let n;function i(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function c(u,f){r.drawElements(n,f,s,u*o),e.update(f,n,1)}function l(u,f,p){p!==0&&(r.drawElementsInstanced(n,f,s,u*o,p),e.update(f,n,p))}function h(u,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function d(u,f,p,x){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<u.length;m++)l(u[m]/o,f[m],x[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,x,0,p);let m=0;for(let v=0;v<p;v++)m+=f[v]*x[v];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function mm(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:Kt("WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function gm(r,t,e){const n=new WeakMap,i=new xe;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let w=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",w)};var f=w;u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let y=0;p===!0&&(y=1),x===!0&&(y=2),g===!0&&(y=3);let b=a.attributes.position.count*y,T=1;b>t.maxTextureSize&&(T=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const C=new Float32Array(b*T*4*d),I=new Rl(C,b,T,d);I.type=vn,I.needsUpdate=!0;const M=y*4;for(let P=0;P<d;P++){const U=m[P],L=v[P],O=_[P],B=b*T*4*P;for(let D=0;D<U.count;D++){const V=D*M;p===!0&&(i.fromBufferAttribute(U,D),C[B+V+0]=i.x,C[B+V+1]=i.y,C[B+V+2]=i.z,C[B+V+3]=0),x===!0&&(i.fromBufferAttribute(L,D),C[B+V+4]=i.x,C[B+V+5]=i.y,C[B+V+6]=i.z,C[B+V+7]=0),g===!0&&(i.fromBufferAttribute(O,D),C[B+V+8]=i.x,C[B+V+9]=i.y,C[B+V+10]=i.z,C[B+V+11]=O.itemSize===4?i.w:1)}}u={count:d,texture:I,size:new _t(b,T)},n.set(a,u),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const x=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(r,"morphTargetBaseInfluence",x),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function xm(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}const vm={[dl]:"LINEAR_TONE_MAPPING",[fl]:"REINHARD_TONE_MAPPING",[pl]:"CINEON_TONE_MAPPING",[ml]:"ACES_FILMIC_TONE_MAPPING",[xl]:"AGX_TONE_MAPPING",[vl]:"NEUTRAL_TONE_MAPPING",[gl]:"CUSTOM_TONE_MAPPING"};function _m(r,t,e,n,i){const s=new Mn(t,e,{type:r,depthBuffer:n,stencilBuffer:i}),o=new Mn(t,e,{type:kn,depthBuffer:!1,stencilBuffer:!1}),a=new Ae;a.setAttribute("position",new Xt([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Xt([0,2,0,0,2,0],2));const c=new cd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new mt(a,c),h=new Ca(-1,1,1,-1,0,1);let d=null,u=null,f=!1,p,x=null,g=[],m=!1;this.setSize=function(v,_){s.setSize(v,_),o.setSize(v,_);for(let y=0;y<g.length;y++){const b=g[y];b.setSize&&b.setSize(v,_)}},this.setEffects=function(v){g=v,m=g.length>0&&g[0].isRenderPass===!0;const _=s.width,y=s.height;for(let b=0;b<g.length;b++){const T=g[b];T.setSize&&T.setSize(_,y)}},this.begin=function(v,_){if(f||v.toneMapping===yn&&g.length===0)return!1;if(x=_,_!==null){const y=_.width,b=_.height;(s.width!==y||s.height!==b)&&this.setSize(y,b)}return m===!1&&v.setRenderTarget(s),p=v.toneMapping,v.toneMapping=yn,!0},this.hasRenderPass=function(){return m},this.end=function(v,_){v.toneMapping=p,f=!0;let y=s,b=o;for(let T=0;T<g.length;T++){const C=g[T];if(C.enabled!==!1&&(C.render(v,b,y,_),C.needsSwap!==!1)){const I=y;y=b,b=I}}if(d!==v.outputColorSpace||u!==v.toneMapping){d=v.outputColorSpace,u=v.toneMapping,c.defines={},qt.getTransfer(d)===ie&&(c.defines.SRGB_TRANSFER="");const T=vm[u];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(x),v.render(l,h),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),c.dispose()}}const Jl=new Ue,la=new vs(1,1),Ql=new Rl,th=new ru,eh=new Bl,Cc=[],Rc=[],Pc=new Float32Array(16),Lc=new Float32Array(9),Ic=new Float32Array(4);function Ki(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Cc[i];if(s===void 0&&(s=new Float32Array(i),Cc[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function be(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Te(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Mr(r,t){let e=Rc[t];e===void 0&&(e=new Int32Array(t),Rc[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function ym(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Mm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2fv(this.addr,t),Te(e,t)}}function Sm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;r.uniform3fv(this.addr,t),Te(e,t)}}function wm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4fv(this.addr,t),Te(e,t)}}function Em(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;Ic.set(n),r.uniformMatrix2fv(this.addr,!1,Ic),Te(e,n)}}function bm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;Lc.set(n),r.uniformMatrix3fv(this.addr,!1,Lc),Te(e,n)}}function Tm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(be(e,n))return;Pc.set(n),r.uniformMatrix4fv(this.addr,!1,Pc),Te(e,n)}}function Am(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Cm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2iv(this.addr,t),Te(e,t)}}function Rm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;r.uniform3iv(this.addr,t),Te(e,t)}}function Pm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4iv(this.addr,t),Te(e,t)}}function Lm(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Im(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2uiv(this.addr,t),Te(e,t)}}function Dm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;r.uniform3uiv(this.addr,t),Te(e,t)}}function Nm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4uiv(this.addr,t),Te(e,t)}}function Fm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(la.compareFunction=e.isReversedDepthBuffer()?_a:va,s=la):s=Jl,e.setTexture2D(t||s,i)}function Um(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||th,i)}function Bm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||eh,i)}function Om(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Ql,i)}function zm(r){switch(r){case 5126:return ym;case 35664:return Mm;case 35665:return Sm;case 35666:return wm;case 35674:return Em;case 35675:return bm;case 35676:return Tm;case 5124:case 35670:return Am;case 35667:case 35671:return Cm;case 35668:case 35672:return Rm;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Im;case 36295:return Dm;case 36296:return Nm;case 35678:case 36198:case 36298:case 36306:case 35682:return Fm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return Om}}function km(r,t){r.uniform1fv(this.addr,t)}function Gm(r,t){const e=Ki(t,this.size,2);r.uniform2fv(this.addr,e)}function Vm(r,t){const e=Ki(t,this.size,3);r.uniform3fv(this.addr,e)}function Hm(r,t){const e=Ki(t,this.size,4);r.uniform4fv(this.addr,e)}function Wm(r,t){const e=Ki(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function qm(r,t){const e=Ki(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Xm(r,t){const e=Ki(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Ym(r,t){r.uniform1iv(this.addr,t)}function Zm(r,t){r.uniform2iv(this.addr,t)}function Km(r,t){r.uniform3iv(this.addr,t)}function jm(r,t){r.uniform4iv(this.addr,t)}function $m(r,t){r.uniform1uiv(this.addr,t)}function Jm(r,t){r.uniform2uiv(this.addr,t)}function Qm(r,t){r.uniform3uiv(this.addr,t)}function t0(r,t){r.uniform4uiv(this.addr,t)}function e0(r,t,e){const n=this.cache,i=t.length,s=Mr(e,i);be(n,s)||(r.uniform1iv(this.addr,s),Te(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=la:o=Jl;for(let a=0;a!==i;++a)e.setTexture2D(t[a]||o,s[a])}function n0(r,t,e){const n=this.cache,i=t.length,s=Mr(e,i);be(n,s)||(r.uniform1iv(this.addr,s),Te(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||th,s[o])}function i0(r,t,e){const n=this.cache,i=t.length,s=Mr(e,i);be(n,s)||(r.uniform1iv(this.addr,s),Te(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||eh,s[o])}function s0(r,t,e){const n=this.cache,i=t.length,s=Mr(e,i);be(n,s)||(r.uniform1iv(this.addr,s),Te(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Ql,s[o])}function r0(r){switch(r){case 5126:return km;case 35664:return Gm;case 35665:return Vm;case 35666:return Hm;case 35674:return Wm;case 35675:return qm;case 35676:return Xm;case 5124:case 35670:return Ym;case 35667:case 35671:return Zm;case 35668:case 35672:return Km;case 35669:case 35673:return jm;case 5125:return $m;case 36294:return Jm;case 36295:return Qm;case 36296:return t0;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return s0}}class o0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=zm(e.type)}}class a0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=r0(e.type)}}class c0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const ro=/(\w+)(\])?(\[|\.)?/g;function Dc(r,t){r.seq.push(t),r.map[t.id]=t}function l0(r,t,e){const n=r.name,i=n.length;for(ro.lastIndex=0;;){const s=ro.exec(n),o=ro.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Dc(e,l===void 0?new o0(a,r,t):new a0(a,r,t));break}else{let d=e.map[a];d===void 0&&(d=new c0(a),Dc(e,d)),e=d}}}class lr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);l0(a,c,this)}const i=[],s=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Nc(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const h0=37297;let u0=0;function d0(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Fc=new Bt;function f0(r){qt._getMatrix(Fc,qt.workingColorSpace,r);const t=`mat3( ${Fc.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(r)){case hr:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return Nt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Uc(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+d0(r.getShaderSource(t),a)}else return s}function p0(r,t){const e=f0(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const m0={[dl]:"Linear",[fl]:"Reinhard",[pl]:"Cineon",[ml]:"ACESFilmic",[xl]:"AgX",[vl]:"Neutral",[gl]:"Custom"};function g0(r,t){const e=m0[t];return e===void 0?(Nt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Js=new F;function x0(){qt.getLuminanceCoefficients(Js);const r=Js.x.toFixed(4),t=Js.y.toFixed(4),e=Js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(us).join(`
`)}function _0(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function y0(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function us(r){return r!==""}function Bc(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Oc(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const M0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ha(r){return r.replace(M0,w0)}const S0=new Map;function w0(r,t){let e=Ot[t];if(e===void 0){const n=S0.get(t);if(n!==void 0)e=Ot[n],Nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ha(e)}const E0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zc(r){return r.replace(E0,b0)}function b0(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function kc(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const T0={[sr]:"SHADOWMAP_TYPE_PCF",[ls]:"SHADOWMAP_TYPE_VSM"};function A0(r){return T0[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const C0={[gi]:"ENVMAP_TYPE_CUBE",[ki]:"ENVMAP_TYPE_CUBE",[mr]:"ENVMAP_TYPE_CUBE_UV"};function R0(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":C0[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const P0={[ki]:"ENVMAP_MODE_REFRACTION"};function L0(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":P0[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const I0={[ul]:"ENVMAP_BLENDING_MULTIPLY",[kh]:"ENVMAP_BLENDING_MIX",[Gh]:"ENVMAP_BLENDING_ADD"};function D0(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":I0[r.combine]||"ENVMAP_BLENDING_NONE"}function N0(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function F0(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=A0(e),l=R0(e),h=L0(e),d=D0(e),u=N0(e),f=v0(e),p=_0(s),x=i.createProgram();let g,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(us).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(us).join(`
`),m.length>0&&(m+=`
`)):(g=[kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),m=[kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==yn?"#define TONE_MAPPING":"",e.toneMapping!==yn?Ot.tonemapping_pars_fragment:"",e.toneMapping!==yn?g0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,p0("linearToOutputTexel",e.outputColorSpace),x0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(us).join(`
`)),o=ha(o),o=Bc(o,e),o=Oc(o,e),a=ha(a),a=Bc(a,e),a=Oc(a,e),o=zc(o),a=zc(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Xa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Xa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=v+g+o,y=v+m+a,b=Nc(i,i.VERTEX_SHADER,_),T=Nc(i,i.FRAGMENT_SHADER,y);i.attachShader(x,b),i.attachShader(x,T),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function C(P){if(r.debug.checkShaderErrors){const U=i.getProgramInfoLog(x)||"",L=i.getShaderInfoLog(b)||"",O=i.getShaderInfoLog(T)||"",B=U.trim(),D=L.trim(),V=O.trim();let q=!0,$=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,b,T);else{const nt=Uc(i,b,"vertex"),st=Uc(i,T,"fragment");Kt("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+nt+`
`+st)}else B!==""?Nt("WebGLProgram: Program Info Log:",B):(D===""||V==="")&&($=!1);$&&(P.diagnostics={runnable:q,programLog:B,vertexShader:{log:D,prefix:g},fragmentShader:{log:V,prefix:m}})}i.deleteShader(b),i.deleteShader(T),I=new lr(i,x),M=y0(i,x)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(x,h0)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=u0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=T,this}let U0=0;class B0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new O0(t),e.set(t,n)),n}}class O0{constructor(t){this.id=U0++,this.code=t,this.usedTimes=0}}function z0(r,t,e,n,i,s,o){const a=new Ll,c=new B0,l=new Set,h=[],d=new Map,u=i.logarithmicDepthBuffer;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return l.add(M),M===0?"uv":`uv${M}`}function g(M,w,P,U,L){const O=U.fog,B=L.geometry,D=M.isMeshStandardMaterial?U.environment:null,V=(M.isMeshStandardMaterial?e:t).get(M.envMap||D),q=V&&V.mapping===mr?V.image.height:null,$=p[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&Nt("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const nt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,st=nt!==void 0?nt.length:0;let rt=0;B.morphAttributes.position!==void 0&&(rt=1),B.morphAttributes.normal!==void 0&&(rt=2),B.morphAttributes.color!==void 0&&(rt=3);let Dt,se,Qt,K;if($){const ee=xn[$];Dt=ee.vertexShader,se=ee.fragmentShader}else Dt=M.vertexShader,se=M.fragmentShader,c.update(M),Qt=c.getVertexShaderID(M),K=c.getFragmentShaderID(M);const Q=r.getRenderTarget(),yt=r.state.buffers.depth.getReversed(),Ut=L.isInstancedMesh===!0,wt=L.isBatchedMesh===!0,Yt=!!M.map,Ce=!!M.matcap,Wt=!!V,te=!!M.aoMap,oe=!!M.lightMap,zt=!!M.bumpMap,ye=!!M.normalMap,N=!!M.displacementMap,Me=!!M.emissiveMap,$t=!!M.metalnessMap,ce=!!M.roughnessMap,bt=M.anisotropy>0,R=M.clearcoat>0,S=M.dispersion>0,k=M.iridescence>0,Z=M.sheen>0,J=M.transmission>0,Y=bt&&!!M.anisotropyMap,At=R&&!!M.clearcoatMap,ct=R&&!!M.clearcoatNormalMap,Et=R&&!!M.clearcoatRoughnessMap,It=k&&!!M.iridescenceMap,et=k&&!!M.iridescenceThicknessMap,ht=Z&&!!M.sheenColorMap,St=Z&&!!M.sheenRoughnessMap,Tt=!!M.specularMap,lt=!!M.specularColorMap,kt=!!M.specularIntensityMap,z=J&&!!M.transmissionMap,pt=J&&!!M.thicknessMap,it=!!M.gradientMap,gt=!!M.alphaMap,tt=M.alphaTest>0,j=!!M.alphaHash,at=!!M.extensions;let Ft=yn;M.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ft=r.toneMapping);const le={shaderID:$,shaderType:M.type,shaderName:M.name,vertexShader:Dt,fragmentShader:se,defines:M.defines,customVertexShaderID:Qt,customFragmentShaderID:K,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:wt,batchingColor:wt&&L._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&L.instanceColor!==null,instancingMorph:Ut&&L.morphTexture!==null,outputColorSpace:Q===null?r.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Vi,alphaToCoverage:!!M.alphaToCoverage,map:Yt,matcap:Ce,envMap:Wt,envMapMode:Wt&&V.mapping,envMapCubeUVHeight:q,aoMap:te,lightMap:oe,bumpMap:zt,normalMap:ye,displacementMap:N,emissiveMap:Me,normalMapObjectSpace:ye&&M.normalMapType===Wh,normalMapTangentSpace:ye&&M.normalMapType===Al,metalnessMap:$t,roughnessMap:ce,anisotropy:bt,anisotropyMap:Y,clearcoat:R,clearcoatMap:At,clearcoatNormalMap:ct,clearcoatRoughnessMap:Et,dispersion:S,iridescence:k,iridescenceMap:It,iridescenceThicknessMap:et,sheen:Z,sheenColorMap:ht,sheenRoughnessMap:St,specularMap:Tt,specularColorMap:lt,specularIntensityMap:kt,transmission:J,transmissionMap:z,thicknessMap:pt,gradientMap:it,opaque:M.transparent===!1&&M.blending===Ui&&M.alphaToCoverage===!1,alphaMap:gt,alphaTest:tt,alphaHash:j,combine:M.combine,mapUv:Yt&&x(M.map.channel),aoMapUv:te&&x(M.aoMap.channel),lightMapUv:oe&&x(M.lightMap.channel),bumpMapUv:zt&&x(M.bumpMap.channel),normalMapUv:ye&&x(M.normalMap.channel),displacementMapUv:N&&x(M.displacementMap.channel),emissiveMapUv:Me&&x(M.emissiveMap.channel),metalnessMapUv:$t&&x(M.metalnessMap.channel),roughnessMapUv:ce&&x(M.roughnessMap.channel),anisotropyMapUv:Y&&x(M.anisotropyMap.channel),clearcoatMapUv:At&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:ct&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:et&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:St&&x(M.sheenRoughnessMap.channel),specularMapUv:Tt&&x(M.specularMap.channel),specularColorMapUv:lt&&x(M.specularColorMap.channel),specularIntensityMapUv:kt&&x(M.specularIntensityMap.channel),transmissionMapUv:z&&x(M.transmissionMap.channel),thicknessMapUv:pt&&x(M.thicknessMap.channel),alphaMapUv:gt&&x(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ye||bt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!B.attributes.uv&&(Yt||gt),fog:!!O,useFog:M.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:yt,skinning:L.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:rt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ft,decodeVideoTexture:Yt&&M.map.isVideoTexture===!0&&qt.getTransfer(M.map.colorSpace)===ie,decodeVideoTextureEmissive:Me&&M.emissiveMap.isVideoTexture===!0&&qt.getTransfer(M.emissiveMap.colorSpace)===ie,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===de,flipSided:M.side===He,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:at&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&M.extensions.multiDraw===!0||wt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return le.vertexUv1s=l.has(1),le.vertexUv2s=l.has(2),le.vertexUv3s=l.has(3),l.clear(),le}function m(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)w.push(P),w.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(v(w,M),_(w,M),w.push(r.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function v(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function _(M,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),M.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){const w=p[M.type];let P;if(w){const U=xn[w];P=vu.clone(U.uniforms)}else P=M.uniforms;return P}function b(M,w){let P=d.get(w);return P!==void 0?++P.usedTimes:(P=new F0(r,w,M,s),h.push(P),d.set(w,P)),P}function T(M){if(--M.usedTimes===0){const w=h.indexOf(M);h[w]=h[h.length-1],h.pop(),d.delete(M.cacheKey),M.destroy()}}function C(M){c.remove(M)}function I(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:b,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:I}}function k0(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function G0(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Gc(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Vc(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,p,x,g){let m=r[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:x,group:g},r[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=x,m.group=g),t++,m}function a(d,u,f,p,x,g){const m=o(d,u,f,p,x,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(d,u,f,p,x,g){const m=o(d,u,f,p,x,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(d,u){e.length>1&&e.sort(d||G0),n.length>1&&n.sort(u||Gc),i.length>1&&i.sort(u||Gc)}function h(){for(let d=t,u=r.length;d<u;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function V0(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new Vc,r.set(n,[o])):i>=s.length?(o=new Vc,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function H0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Ht};break;case"SpotLight":e={position:new F,direction:new F,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new F,halfWidth:new F,halfHeight:new F};break}return r[t.id]=e,e}}}function W0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let q0=0;function X0(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Y0(r){const t=new H0,e=W0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const i=new F,s=new fe,o=new fe;function a(l){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,p=0,x=0,g=0,m=0,v=0,_=0,y=0,b=0,T=0,C=0;l.sort(X0);for(let M=0,w=l.length;M<w;M++){const P=l[M],U=P.color,L=P.intensity,O=P.distance;let B=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Gi?B=P.shadow.map.texture:B=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=U.r*L,d+=U.g*L,u+=U.b*L;else if(P.isLightProbe){for(let D=0;D<9;D++)n.probe[D].addScaledVector(P.sh.coefficients[D],L);C++}else if(P.isDirectionalLight){const D=t.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const V=P.shadow,q=e.get(P);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=D,f++}else if(P.isSpotLight){const D=t.get(P);D.position.setFromMatrixPosition(P.matrixWorld),D.color.copy(U).multiplyScalar(L),D.distance=O,D.coneCos=Math.cos(P.angle),D.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),D.decay=P.decay,n.spot[x]=D;const V=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,V.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[x]=V.matrix,P.castShadow){const q=e.get(P);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,n.spotShadow[x]=q,n.spotShadowMap[x]=B,y++}x++}else if(P.isRectAreaLight){const D=t.get(P);D.color.copy(U).multiplyScalar(L),D.halfWidth.set(P.width*.5,0,0),D.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=D,g++}else if(P.isPointLight){const D=t.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),D.distance=P.distance,D.decay=P.decay,P.castShadow){const V=P.shadow,q=e.get(P);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,q.shadowCameraNear=V.camera.near,q.shadowCameraFar=V.camera.far,n.pointShadow[p]=q,n.pointShadowMap[p]=B,n.pointShadowMatrix[p]=P.shadow.matrix,_++}n.point[p]=D,p++}else if(P.isHemisphereLight){const D=t.get(P);D.skyColor.copy(P.color).multiplyScalar(L),D.groundColor.copy(P.groundColor).multiplyScalar(L),n.hemi[m]=D,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const I=n.hash;(I.directionalLength!==f||I.pointLength!==p||I.spotLength!==x||I.rectAreaLength!==g||I.hemiLength!==m||I.numDirectionalShadows!==v||I.numPointShadows!==_||I.numSpotShadows!==y||I.numSpotMaps!==b||I.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+b-T,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,I.directionalLength=f,I.pointLength=p,I.spotLength=x,I.rectAreaLength=g,I.hemiLength=m,I.numDirectionalShadows=v,I.numPointShadows=_,I.numSpotShadows=y,I.numSpotMaps=b,I.numLightProbes=C,n.version=q0++)}function c(l,h){let d=0,u=0,f=0,p=0,x=0;const g=h.matrixWorldInverse;for(let m=0,v=l.length;m<v;m++){const _=l[m];if(_.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),d++}else if(_.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(_.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(_.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),u++}else if(_.isHemisphereLight){const y=n.hemi[x];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:n}}function Hc(r){const t=new Y0(r),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Z0(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new Hc(r),t.set(i,[a])):s>=o.length?(a=new Hc(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const K0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,j0=`uniform sampler2D shadow_pass;
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
}`,$0=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],J0=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Wc=new fe,ss=new F,oo=new F;function Q0(r,t,e){let n=new Sa;const i=new _t,s=new _t,o=new xe,a=new ld,c=new hd,l={},h=e.maxTextureSize,d={[Qn]:He,[He]:Qn,[de]:de},u=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:K0,fragmentShader:j0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new Ae;p.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new mt(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sr;let m=this.type;this.render=function(T,C,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;T.type===Mh&&(Nt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),T.type=sr);const M=r.getRenderTarget(),w=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),U=r.state;U.setBlending(On),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const L=m!==this.type;L&&C.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(B=>B.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,B=T.length;O<B;O++){const D=T[O],V=D.shadow;if(V===void 0){Nt("WebGLShadowMap:",D,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const q=V.getFrameExtents();if(i.multiply(q),s.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/q.x),i.x=s.x*q.x,V.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/q.y),i.y=s.y*q.y,V.mapSize.y=s.y)),V.map===null||L===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===ls){if(D.isPointLight){Nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Mn(i.x,i.y,{format:Gi,type:kn,minFilter:Fe,magFilter:Fe,generateMipmaps:!1}),V.map.texture.name=D.name+".shadowMap",V.map.depthTexture=new vs(i.x,i.y,vn),V.map.depthTexture.name=D.name+".shadowMapDepth",V.map.depthTexture.format=Gn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Pe,V.map.depthTexture.magFilter=Pe}else{D.isPointLight?(V.map=new Ol(i.x),V.map.depthTexture=new Ru(i.x,wn)):(V.map=new Mn(i.x,i.y),V.map.depthTexture=new vs(i.x,i.y,wn)),V.map.depthTexture.name=D.name+".shadowMap",V.map.depthTexture.format=Gn;const nt=r.state.buffers.depth.getReversed();this.type===sr?(V.map.depthTexture.compareFunction=nt?_a:va,V.map.depthTexture.minFilter=Fe,V.map.depthTexture.magFilter=Fe):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Pe,V.map.depthTexture.magFilter=Pe)}V.camera.updateProjectionMatrix()}const $=V.map.isWebGLCubeRenderTarget?6:1;for(let nt=0;nt<$;nt++){if(V.map.isWebGLCubeRenderTarget)r.setRenderTarget(V.map,nt),r.clear();else{nt===0&&(r.setRenderTarget(V.map),r.clear());const st=V.getViewport(nt);o.set(s.x*st.x,s.y*st.y,s.x*st.z,s.y*st.w),U.viewport(o)}if(D.isPointLight){const st=V.camera,rt=V.matrix,Dt=D.distance||st.far;Dt!==st.far&&(st.far=Dt,st.updateProjectionMatrix()),ss.setFromMatrixPosition(D.matrixWorld),st.position.copy(ss),oo.copy(st.position),oo.add($0[nt]),st.up.copy(J0[nt]),st.lookAt(oo),st.updateMatrixWorld(),rt.makeTranslation(-ss.x,-ss.y,-ss.z),Wc.multiplyMatrices(st.projectionMatrix,st.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Wc,st.coordinateSystem,st.reversedDepth)}else V.updateMatrices(D);n=V.getFrustum(),y(C,I,V.camera,D,this.type)}V.isPointLightShadow!==!0&&this.type===ls&&v(V,I),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(M,w,P)};function v(T,C){const I=t.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Mn(i.x,i.y,{format:Gi,type:kn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(C,null,I,u,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(C,null,I,f,x,null)}function _(T,C,I,M){let w=null;const P=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)w=P;else if(w=I.isPointLight===!0?c:a,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const U=w.uuid,L=C.uuid;let O=l[U];O===void 0&&(O={},l[U]=O);let B=O[L];B===void 0&&(B=w.clone(),O[L]=B,C.addEventListener("dispose",b)),w=B}if(w.visible=C.visible,w.wireframe=C.wireframe,M===ls?w.side=C.shadowSide!==null?C.shadowSide:C.side:w.side=C.shadowSide!==null?C.shadowSide:d[C.side],w.alphaMap=C.alphaMap,w.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,w.map=C.map,w.clipShadows=C.clipShadows,w.clippingPlanes=C.clippingPlanes,w.clipIntersection=C.clipIntersection,w.displacementMap=C.displacementMap,w.displacementScale=C.displacementScale,w.displacementBias=C.displacementBias,w.wireframeLinewidth=C.wireframeLinewidth,w.linewidth=C.linewidth,I.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const U=r.properties.get(w);U.light=I}return w}function y(T,C,I,M,w){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===ls)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);const L=t.update(T),O=T.material;if(Array.isArray(O)){const B=L.groups;for(let D=0,V=B.length;D<V;D++){const q=B[D],$=O[q.materialIndex];if($&&$.visible){const nt=_(T,$,M,w);T.onBeforeShadow(r,T,C,I,L,nt,q),r.renderBufferDirect(I,null,L,nt,T,q),T.onAfterShadow(r,T,C,I,L,nt,q)}}}else if(O.visible){const B=_(T,O,M,w);T.onBeforeShadow(r,T,C,I,L,B,null),r.renderBufferDirect(I,null,L,B,T,null),T.onAfterShadow(r,T,C,I,L,B,null)}}const U=T.children;for(let L=0,O=U.length;L<O;L++)y(U[L],C,I,M,w)}function b(T){T.target.removeEventListener("dispose",b);for(const I in l){const M=l[I],w=T.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}const tg={[go]:xo,[vo]:Mo,[_o]:So,[zi]:yo,[xo]:go,[Mo]:vo,[So]:_o,[yo]:zi};function eg(r,t){function e(){let z=!1;const pt=new xe;let it=null;const gt=new xe(0,0,0,0);return{setMask:function(tt){it!==tt&&!z&&(r.colorMask(tt,tt,tt,tt),it=tt)},setLocked:function(tt){z=tt},setClear:function(tt,j,at,Ft,le){le===!0&&(tt*=Ft,j*=Ft,at*=Ft),pt.set(tt,j,at,Ft),gt.equals(pt)===!1&&(r.clearColor(tt,j,at,Ft),gt.copy(pt))},reset:function(){z=!1,it=null,gt.set(-1,0,0,0)}}}function n(){let z=!1,pt=!1,it=null,gt=null,tt=null;return{setReversed:function(j){if(pt!==j){const at=t.get("EXT_clip_control");j?at.clipControlEXT(at.LOWER_LEFT_EXT,at.ZERO_TO_ONE_EXT):at.clipControlEXT(at.LOWER_LEFT_EXT,at.NEGATIVE_ONE_TO_ONE_EXT),pt=j;const Ft=tt;tt=null,this.setClear(Ft)}},getReversed:function(){return pt},setTest:function(j){j?Q(r.DEPTH_TEST):yt(r.DEPTH_TEST)},setMask:function(j){it!==j&&!z&&(r.depthMask(j),it=j)},setFunc:function(j){if(pt&&(j=tg[j]),gt!==j){switch(j){case go:r.depthFunc(r.NEVER);break;case xo:r.depthFunc(r.ALWAYS);break;case vo:r.depthFunc(r.LESS);break;case zi:r.depthFunc(r.LEQUAL);break;case _o:r.depthFunc(r.EQUAL);break;case yo:r.depthFunc(r.GEQUAL);break;case Mo:r.depthFunc(r.GREATER);break;case So:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}gt=j}},setLocked:function(j){z=j},setClear:function(j){tt!==j&&(pt&&(j=1-j),r.clearDepth(j),tt=j)},reset:function(){z=!1,it=null,gt=null,tt=null,pt=!1}}}function i(){let z=!1,pt=null,it=null,gt=null,tt=null,j=null,at=null,Ft=null,le=null;return{setTest:function(ee){z||(ee?Q(r.STENCIL_TEST):yt(r.STENCIL_TEST))},setMask:function(ee){pt!==ee&&!z&&(r.stencilMask(ee),pt=ee)},setFunc:function(ee,dn,Tn){(it!==ee||gt!==dn||tt!==Tn)&&(r.stencilFunc(ee,dn,Tn),it=ee,gt=dn,tt=Tn)},setOp:function(ee,dn,Tn){(j!==ee||at!==dn||Ft!==Tn)&&(r.stencilOp(ee,dn,Tn),j=ee,at=dn,Ft=Tn)},setLocked:function(ee){z=ee},setClear:function(ee){le!==ee&&(r.clearStencil(ee),le=ee)},reset:function(){z=!1,pt=null,it=null,gt=null,tt=null,j=null,at=null,Ft=null,le=null}}}const s=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],p=null,x=!1,g=null,m=null,v=null,_=null,y=null,b=null,T=null,C=new Ht(0,0,0),I=0,M=!1,w=null,P=null,U=null,L=null,O=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,V=0;const q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(q)[1]),D=V>=1):q.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),D=V>=2);let $=null,nt={};const st=r.getParameter(r.SCISSOR_BOX),rt=r.getParameter(r.VIEWPORT),Dt=new xe().fromArray(st),se=new xe().fromArray(rt);function Qt(z,pt,it,gt){const tt=new Uint8Array(4),j=r.createTexture();r.bindTexture(z,j),r.texParameteri(z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let at=0;at<it;at++)z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY?r.texImage3D(pt,0,r.RGBA,1,1,gt,0,r.RGBA,r.UNSIGNED_BYTE,tt):r.texImage2D(pt+at,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,tt);return j}const K={};K[r.TEXTURE_2D]=Qt(r.TEXTURE_2D,r.TEXTURE_2D,1),K[r.TEXTURE_CUBE_MAP]=Qt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[r.TEXTURE_2D_ARRAY]=Qt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),K[r.TEXTURE_3D]=Qt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(r.DEPTH_TEST),o.setFunc(zi),zt(!1),ye(ka),Q(r.CULL_FACE),te(On);function Q(z){h[z]!==!0&&(r.enable(z),h[z]=!0)}function yt(z){h[z]!==!1&&(r.disable(z),h[z]=!1)}function Ut(z,pt){return d[z]!==pt?(r.bindFramebuffer(z,pt),d[z]=pt,z===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=pt),z===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=pt),!0):!1}function wt(z,pt){let it=f,gt=!1;if(z){it=u.get(pt),it===void 0&&(it=[],u.set(pt,it));const tt=z.textures;if(it.length!==tt.length||it[0]!==r.COLOR_ATTACHMENT0){for(let j=0,at=tt.length;j<at;j++)it[j]=r.COLOR_ATTACHMENT0+j;it.length=tt.length,gt=!0}}else it[0]!==r.BACK&&(it[0]=r.BACK,gt=!0);gt&&r.drawBuffers(it)}function Yt(z){return p!==z?(r.useProgram(z),p=z,!0):!1}const Ce={[ui]:r.FUNC_ADD,[wh]:r.FUNC_SUBTRACT,[Eh]:r.FUNC_REVERSE_SUBTRACT};Ce[bh]=r.MIN,Ce[Th]=r.MAX;const Wt={[Ah]:r.ZERO,[Ch]:r.ONE,[Rh]:r.SRC_COLOR,[po]:r.SRC_ALPHA,[Fh]:r.SRC_ALPHA_SATURATE,[Dh]:r.DST_COLOR,[Lh]:r.DST_ALPHA,[Ph]:r.ONE_MINUS_SRC_COLOR,[mo]:r.ONE_MINUS_SRC_ALPHA,[Nh]:r.ONE_MINUS_DST_COLOR,[Ih]:r.ONE_MINUS_DST_ALPHA,[Uh]:r.CONSTANT_COLOR,[Bh]:r.ONE_MINUS_CONSTANT_COLOR,[Oh]:r.CONSTANT_ALPHA,[zh]:r.ONE_MINUS_CONSTANT_ALPHA};function te(z,pt,it,gt,tt,j,at,Ft,le,ee){if(z===On){x===!0&&(yt(r.BLEND),x=!1);return}if(x===!1&&(Q(r.BLEND),x=!0),z!==Sh){if(z!==g||ee!==M){if((m!==ui||y!==ui)&&(r.blendEquation(r.FUNC_ADD),m=ui,y=ui),ee)switch(z){case Ui:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ga:r.blendFunc(r.ONE,r.ONE);break;case Va:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ha:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Kt("WebGLState: Invalid blending: ",z);break}else switch(z){case Ui:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ga:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Va:Kt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ha:Kt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Kt("WebGLState: Invalid blending: ",z);break}v=null,_=null,b=null,T=null,C.set(0,0,0),I=0,g=z,M=ee}return}tt=tt||pt,j=j||it,at=at||gt,(pt!==m||tt!==y)&&(r.blendEquationSeparate(Ce[pt],Ce[tt]),m=pt,y=tt),(it!==v||gt!==_||j!==b||at!==T)&&(r.blendFuncSeparate(Wt[it],Wt[gt],Wt[j],Wt[at]),v=it,_=gt,b=j,T=at),(Ft.equals(C)===!1||le!==I)&&(r.blendColor(Ft.r,Ft.g,Ft.b,le),C.copy(Ft),I=le),g=z,M=!1}function oe(z,pt){z.side===de?yt(r.CULL_FACE):Q(r.CULL_FACE);let it=z.side===He;pt&&(it=!it),zt(it),z.blending===Ui&&z.transparent===!1?te(On):te(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),s.setMask(z.colorWrite);const gt=z.stencilWrite;a.setTest(gt),gt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Me(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Q(r.SAMPLE_ALPHA_TO_COVERAGE):yt(r.SAMPLE_ALPHA_TO_COVERAGE)}function zt(z){w!==z&&(z?r.frontFace(r.CW):r.frontFace(r.CCW),w=z)}function ye(z){z!==_h?(Q(r.CULL_FACE),z!==P&&(z===ka?r.cullFace(r.BACK):z===yh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):yt(r.CULL_FACE),P=z}function N(z){z!==U&&(D&&r.lineWidth(z),U=z)}function Me(z,pt,it){z?(Q(r.POLYGON_OFFSET_FILL),(L!==pt||O!==it)&&(r.polygonOffset(pt,it),L=pt,O=it)):yt(r.POLYGON_OFFSET_FILL)}function $t(z){z?Q(r.SCISSOR_TEST):yt(r.SCISSOR_TEST)}function ce(z){z===void 0&&(z=r.TEXTURE0+B-1),$!==z&&(r.activeTexture(z),$=z)}function bt(z,pt,it){it===void 0&&($===null?it=r.TEXTURE0+B-1:it=$);let gt=nt[it];gt===void 0&&(gt={type:void 0,texture:void 0},nt[it]=gt),(gt.type!==z||gt.texture!==pt)&&($!==it&&(r.activeTexture(it),$=it),r.bindTexture(z,pt||K[z]),gt.type=z,gt.texture=pt)}function R(){const z=nt[$];z!==void 0&&z.type!==void 0&&(r.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function S(){try{r.compressedTexImage2D(...arguments)}catch(z){Kt("WebGLState:",z)}}function k(){try{r.compressedTexImage3D(...arguments)}catch(z){Kt("WebGLState:",z)}}function Z(){try{r.texSubImage2D(...arguments)}catch(z){Kt("WebGLState:",z)}}function J(){try{r.texSubImage3D(...arguments)}catch(z){Kt("WebGLState:",z)}}function Y(){try{r.compressedTexSubImage2D(...arguments)}catch(z){Kt("WebGLState:",z)}}function At(){try{r.compressedTexSubImage3D(...arguments)}catch(z){Kt("WebGLState:",z)}}function ct(){try{r.texStorage2D(...arguments)}catch(z){Kt("WebGLState:",z)}}function Et(){try{r.texStorage3D(...arguments)}catch(z){Kt("WebGLState:",z)}}function It(){try{r.texImage2D(...arguments)}catch(z){Kt("WebGLState:",z)}}function et(){try{r.texImage3D(...arguments)}catch(z){Kt("WebGLState:",z)}}function ht(z){Dt.equals(z)===!1&&(r.scissor(z.x,z.y,z.z,z.w),Dt.copy(z))}function St(z){se.equals(z)===!1&&(r.viewport(z.x,z.y,z.z,z.w),se.copy(z))}function Tt(z,pt){let it=l.get(pt);it===void 0&&(it=new WeakMap,l.set(pt,it));let gt=it.get(z);gt===void 0&&(gt=r.getUniformBlockIndex(pt,z.name),it.set(z,gt))}function lt(z,pt){const gt=l.get(pt).get(z);c.get(pt)!==gt&&(r.uniformBlockBinding(pt,gt,z.__bindingPointIndex),c.set(pt,gt))}function kt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},$=null,nt={},d={},u=new WeakMap,f=[],p=null,x=!1,g=null,m=null,v=null,_=null,y=null,b=null,T=null,C=new Ht(0,0,0),I=0,M=!1,w=null,P=null,U=null,L=null,O=null,Dt.set(0,0,r.canvas.width,r.canvas.height),se.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:Q,disable:yt,bindFramebuffer:Ut,drawBuffers:wt,useProgram:Yt,setBlending:te,setMaterial:oe,setFlipSided:zt,setCullFace:ye,setLineWidth:N,setPolygonOffset:Me,setScissorTest:$t,activeTexture:ce,bindTexture:bt,unbindTexture:R,compressedTexImage2D:S,compressedTexImage3D:k,texImage2D:It,texImage3D:et,updateUBOMapping:Tt,uniformBlockBinding:lt,texStorage2D:ct,texStorage3D:Et,texSubImage2D:Z,texSubImage3D:J,compressedTexSubImage2D:Y,compressedTexSubImage3D:At,scissor:ht,viewport:St,reset:kt}}function ng(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new _t,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,S){return f?new OffscreenCanvas(R,S):dr("canvas")}function x(R,S,k){let Z=1;const J=bt(R);if((J.width>k||J.height>k)&&(Z=k/Math.max(J.width,J.height)),Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(Z*J.width),At=Math.floor(Z*J.height);d===void 0&&(d=p(Y,At));const ct=S?p(Y,At):d;return ct.width=Y,ct.height=At,ct.getContext("2d").drawImage(R,0,0,Y,At),Nt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+At+")."),ct}else return"data"in R&&Nt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function g(R){return R.generateMipmaps}function m(R){r.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(R,S,k,Z,J=!1){if(R!==null){if(r[R]!==void 0)return r[R];Nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=S;if(S===r.RED&&(k===r.FLOAT&&(Y=r.R32F),k===r.HALF_FLOAT&&(Y=r.R16F),k===r.UNSIGNED_BYTE&&(Y=r.R8)),S===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(Y=r.R8UI),k===r.UNSIGNED_SHORT&&(Y=r.R16UI),k===r.UNSIGNED_INT&&(Y=r.R32UI),k===r.BYTE&&(Y=r.R8I),k===r.SHORT&&(Y=r.R16I),k===r.INT&&(Y=r.R32I)),S===r.RG&&(k===r.FLOAT&&(Y=r.RG32F),k===r.HALF_FLOAT&&(Y=r.RG16F),k===r.UNSIGNED_BYTE&&(Y=r.RG8)),S===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(Y=r.RG8UI),k===r.UNSIGNED_SHORT&&(Y=r.RG16UI),k===r.UNSIGNED_INT&&(Y=r.RG32UI),k===r.BYTE&&(Y=r.RG8I),k===r.SHORT&&(Y=r.RG16I),k===r.INT&&(Y=r.RG32I)),S===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(Y=r.RGB8UI),k===r.UNSIGNED_SHORT&&(Y=r.RGB16UI),k===r.UNSIGNED_INT&&(Y=r.RGB32UI),k===r.BYTE&&(Y=r.RGB8I),k===r.SHORT&&(Y=r.RGB16I),k===r.INT&&(Y=r.RGB32I)),S===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(Y=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(Y=r.RGBA16UI),k===r.UNSIGNED_INT&&(Y=r.RGBA32UI),k===r.BYTE&&(Y=r.RGBA8I),k===r.SHORT&&(Y=r.RGBA16I),k===r.INT&&(Y=r.RGBA32I)),S===r.RGB&&(k===r.UNSIGNED_INT_5_9_9_9_REV&&(Y=r.RGB9_E5),k===r.UNSIGNED_INT_10F_11F_11F_REV&&(Y=r.R11F_G11F_B10F)),S===r.RGBA){const At=J?hr:qt.getTransfer(Z);k===r.FLOAT&&(Y=r.RGBA32F),k===r.HALF_FLOAT&&(Y=r.RGBA16F),k===r.UNSIGNED_BYTE&&(Y=At===ie?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(Y=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(Y=r.RGB5_A1)}return(Y===r.R16F||Y===r.R32F||Y===r.RG16F||Y===r.RG32F||Y===r.RGBA16F||Y===r.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function y(R,S){let k;return R?S===null||S===wn||S===gs?k=r.DEPTH24_STENCIL8:S===vn?k=r.DEPTH32F_STENCIL8:S===ms&&(k=r.DEPTH24_STENCIL8,Nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===wn||S===gs?k=r.DEPTH_COMPONENT24:S===vn?k=r.DEPTH_COMPONENT32F:S===ms&&(k=r.DEPTH_COMPONENT16),k}function b(R,S){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==Pe&&R.minFilter!==Fe?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function T(R){const S=R.target;S.removeEventListener("dispose",T),I(S),S.isVideoTexture&&h.delete(S)}function C(R){const S=R.target;S.removeEventListener("dispose",C),w(S)}function I(R){const S=n.get(R);if(S.__webglInit===void 0)return;const k=R.source,Z=u.get(k);if(Z){const J=Z[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&M(R),Object.keys(Z).length===0&&u.delete(k)}n.remove(R)}function M(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const k=R.source,Z=u.get(k);delete Z[S.__cacheKey],o.memory.textures--}function w(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let J=0;J<S.__webglFramebuffer[Z].length;J++)r.deleteFramebuffer(S.__webglFramebuffer[Z][J]);else r.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)r.deleteFramebuffer(S.__webglFramebuffer[Z]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=R.textures;for(let Z=0,J=k.length;Z<J;Z++){const Y=n.get(k[Z]);Y.__webglTexture&&(r.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(k[Z])}n.remove(R)}let P=0;function U(){P=0}function L(){const R=P;return R>=i.maxTextures&&Nt("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),P+=1,R}function O(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function B(R,S){const k=n.get(R);if(R.isVideoTexture&&$t(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const Z=R.image;if(Z===null)Nt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Nt("WebGLRenderer: Texture marked for update but image is incomplete");else{K(k,R,S);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+S)}function D(R,S){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){K(k,R,S);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+S)}function V(R,S){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){K(k,R,S);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+S)}function q(R,S){const k=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){Q(k,R,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+S)}const $={[bo]:r.REPEAT,[Un]:r.CLAMP_TO_EDGE,[To]:r.MIRRORED_REPEAT},nt={[Pe]:r.NEAREST,[Vh]:r.NEAREST_MIPMAP_NEAREST,[Cs]:r.NEAREST_MIPMAP_LINEAR,[Fe]:r.LINEAR,[Tr]:r.LINEAR_MIPMAP_NEAREST,[pi]:r.LINEAR_MIPMAP_LINEAR},st={[qh]:r.NEVER,[jh]:r.ALWAYS,[Xh]:r.LESS,[va]:r.LEQUAL,[Yh]:r.EQUAL,[_a]:r.GEQUAL,[Zh]:r.GREATER,[Kh]:r.NOTEQUAL};function rt(R,S){if(S.type===vn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Fe||S.magFilter===Tr||S.magFilter===Cs||S.magFilter===pi||S.minFilter===Fe||S.minFilter===Tr||S.minFilter===Cs||S.minFilter===pi)&&Nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,$[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,$[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,$[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,nt[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,nt[S.minFilter]),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,st[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Pe||S.minFilter!==Cs&&S.minFilter!==pi||S.type===vn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Dt(R,S){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",T));const Z=S.source;let J=u.get(Z);J===void 0&&(J={},u.set(Z,J));const Y=O(S);if(Y!==R.__cacheKey){J[Y]===void 0&&(J[Y]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),J[Y].usedTimes++;const At=J[R.__cacheKey];At!==void 0&&(J[R.__cacheKey].usedTimes--,At.usedTimes===0&&M(S)),R.__cacheKey=Y,R.__webglTexture=J[Y].texture}return k}function se(R,S,k){return Math.floor(Math.floor(R/k)/S)}function Qt(R,S,k,Z){const Y=R.updateRanges;if(Y.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,S.width,S.height,k,Z,S.data);else{Y.sort((et,ht)=>et.start-ht.start);let At=0;for(let et=1;et<Y.length;et++){const ht=Y[At],St=Y[et],Tt=ht.start+ht.count,lt=se(St.start,S.width,4),kt=se(ht.start,S.width,4);St.start<=Tt+1&&lt===kt&&se(St.start+St.count-1,S.width,4)===lt?ht.count=Math.max(ht.count,St.start+St.count-ht.start):(++At,Y[At]=St)}Y.length=At+1;const ct=r.getParameter(r.UNPACK_ROW_LENGTH),Et=r.getParameter(r.UNPACK_SKIP_PIXELS),It=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,S.width);for(let et=0,ht=Y.length;et<ht;et++){const St=Y[et],Tt=Math.floor(St.start/4),lt=Math.ceil(St.count/4),kt=Tt%S.width,z=Math.floor(Tt/S.width),pt=lt,it=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,kt),r.pixelStorei(r.UNPACK_SKIP_ROWS,z),e.texSubImage2D(r.TEXTURE_2D,0,kt,z,pt,it,k,Z,S.data)}R.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ct),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Et),r.pixelStorei(r.UNPACK_SKIP_ROWS,It)}}function K(R,S,k){let Z=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=r.TEXTURE_3D);const J=Dt(R,S),Y=S.source;e.bindTexture(Z,R.__webglTexture,r.TEXTURE0+k);const At=n.get(Y);if(Y.version!==At.__version||J===!0){e.activeTexture(r.TEXTURE0+k);const ct=qt.getPrimaries(qt.workingColorSpace),Et=S.colorSpace===Kn?null:qt.getPrimaries(S.colorSpace),It=S.colorSpace===Kn||ct===Et?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let et=x(S.image,!1,i.maxTextureSize);et=ce(S,et);const ht=s.convert(S.format,S.colorSpace),St=s.convert(S.type);let Tt=_(S.internalFormat,ht,St,S.colorSpace,S.isVideoTexture);rt(Z,S);let lt;const kt=S.mipmaps,z=S.isVideoTexture!==!0,pt=At.__version===void 0||J===!0,it=Y.dataReady,gt=b(S,et);if(S.isDepthTexture)Tt=y(S.format===mi,S.type),pt&&(z?e.texStorage2D(r.TEXTURE_2D,1,Tt,et.width,et.height):e.texImage2D(r.TEXTURE_2D,0,Tt,et.width,et.height,0,ht,St,null));else if(S.isDataTexture)if(kt.length>0){z&&pt&&e.texStorage2D(r.TEXTURE_2D,gt,Tt,kt[0].width,kt[0].height);for(let tt=0,j=kt.length;tt<j;tt++)lt=kt[tt],z?it&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,lt.width,lt.height,ht,St,lt.data):e.texImage2D(r.TEXTURE_2D,tt,Tt,lt.width,lt.height,0,ht,St,lt.data);S.generateMipmaps=!1}else z?(pt&&e.texStorage2D(r.TEXTURE_2D,gt,Tt,et.width,et.height),it&&Qt(S,et,ht,St)):e.texImage2D(r.TEXTURE_2D,0,Tt,et.width,et.height,0,ht,St,et.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){z&&pt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,gt,Tt,kt[0].width,kt[0].height,et.depth);for(let tt=0,j=kt.length;tt<j;tt++)if(lt=kt[tt],S.format!==cn)if(ht!==null)if(z){if(it)if(S.layerUpdates.size>0){const at=Mc(lt.width,lt.height,S.format,S.type);for(const Ft of S.layerUpdates){const le=lt.data.subarray(Ft*at/lt.data.BYTES_PER_ELEMENT,(Ft+1)*at/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,Ft,lt.width,lt.height,1,ht,le)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,et.depth,ht,lt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,tt,Tt,lt.width,lt.height,et.depth,0,lt.data,0,0);else Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?it&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,et.depth,ht,St,lt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,tt,Tt,lt.width,lt.height,et.depth,0,ht,St,lt.data)}else{z&&pt&&e.texStorage2D(r.TEXTURE_2D,gt,Tt,kt[0].width,kt[0].height);for(let tt=0,j=kt.length;tt<j;tt++)lt=kt[tt],S.format!==cn?ht!==null?z?it&&e.compressedTexSubImage2D(r.TEXTURE_2D,tt,0,0,lt.width,lt.height,ht,lt.data):e.compressedTexImage2D(r.TEXTURE_2D,tt,Tt,lt.width,lt.height,0,lt.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?it&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,lt.width,lt.height,ht,St,lt.data):e.texImage2D(r.TEXTURE_2D,tt,Tt,lt.width,lt.height,0,ht,St,lt.data)}else if(S.isDataArrayTexture)if(z){if(pt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,gt,Tt,et.width,et.height,et.depth),it)if(S.layerUpdates.size>0){const tt=Mc(et.width,et.height,S.format,S.type);for(const j of S.layerUpdates){const at=et.data.subarray(j*tt/et.data.BYTES_PER_ELEMENT,(j+1)*tt/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,j,et.width,et.height,1,ht,St,at)}S.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ht,St,et.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Tt,et.width,et.height,et.depth,0,ht,St,et.data);else if(S.isData3DTexture)z?(pt&&e.texStorage3D(r.TEXTURE_3D,gt,Tt,et.width,et.height,et.depth),it&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ht,St,et.data)):e.texImage3D(r.TEXTURE_3D,0,Tt,et.width,et.height,et.depth,0,ht,St,et.data);else if(S.isFramebufferTexture){if(pt)if(z)e.texStorage2D(r.TEXTURE_2D,gt,Tt,et.width,et.height);else{let tt=et.width,j=et.height;for(let at=0;at<gt;at++)e.texImage2D(r.TEXTURE_2D,at,Tt,tt,j,0,ht,St,null),tt>>=1,j>>=1}}else if(kt.length>0){if(z&&pt){const tt=bt(kt[0]);e.texStorage2D(r.TEXTURE_2D,gt,Tt,tt.width,tt.height)}for(let tt=0,j=kt.length;tt<j;tt++)lt=kt[tt],z?it&&e.texSubImage2D(r.TEXTURE_2D,tt,0,0,ht,St,lt):e.texImage2D(r.TEXTURE_2D,tt,Tt,ht,St,lt);S.generateMipmaps=!1}else if(z){if(pt){const tt=bt(et);e.texStorage2D(r.TEXTURE_2D,gt,Tt,tt.width,tt.height)}it&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ht,St,et)}else e.texImage2D(r.TEXTURE_2D,0,Tt,ht,St,et);g(S)&&m(Z),At.__version=Y.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Q(R,S,k){if(S.image.length!==6)return;const Z=Dt(R,S),J=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+k);const Y=n.get(J);if(J.version!==Y.__version||Z===!0){e.activeTexture(r.TEXTURE0+k);const At=qt.getPrimaries(qt.workingColorSpace),ct=S.colorSpace===Kn?null:qt.getPrimaries(S.colorSpace),Et=S.colorSpace===Kn||At===ct?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const It=S.isCompressedTexture||S.image[0].isCompressedTexture,et=S.image[0]&&S.image[0].isDataTexture,ht=[];for(let j=0;j<6;j++)!It&&!et?ht[j]=x(S.image[j],!0,i.maxCubemapSize):ht[j]=et?S.image[j].image:S.image[j],ht[j]=ce(S,ht[j]);const St=ht[0],Tt=s.convert(S.format,S.colorSpace),lt=s.convert(S.type),kt=_(S.internalFormat,Tt,lt,S.colorSpace),z=S.isVideoTexture!==!0,pt=Y.__version===void 0||Z===!0,it=J.dataReady;let gt=b(S,St);rt(r.TEXTURE_CUBE_MAP,S);let tt;if(It){z&&pt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,gt,kt,St.width,St.height);for(let j=0;j<6;j++){tt=ht[j].mipmaps;for(let at=0;at<tt.length;at++){const Ft=tt[at];S.format!==cn?Tt!==null?z?it&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,at,0,0,Ft.width,Ft.height,Tt,Ft.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,at,kt,Ft.width,Ft.height,0,Ft.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?it&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,at,0,0,Ft.width,Ft.height,Tt,lt,Ft.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,at,kt,Ft.width,Ft.height,0,Tt,lt,Ft.data)}}}else{if(tt=S.mipmaps,z&&pt){tt.length>0&&gt++;const j=bt(ht[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,gt,kt,j.width,j.height)}for(let j=0;j<6;j++)if(et){z?it&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ht[j].width,ht[j].height,Tt,lt,ht[j].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,kt,ht[j].width,ht[j].height,0,Tt,lt,ht[j].data);for(let at=0;at<tt.length;at++){const le=tt[at].image[j].image;z?it&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,at+1,0,0,le.width,le.height,Tt,lt,le.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,at+1,kt,le.width,le.height,0,Tt,lt,le.data)}}else{z?it&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Tt,lt,ht[j]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,kt,Tt,lt,ht[j]);for(let at=0;at<tt.length;at++){const Ft=tt[at];z?it&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,at+1,0,0,Tt,lt,Ft.image[j]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+j,at+1,kt,Tt,lt,Ft.image[j])}}}g(S)&&m(r.TEXTURE_CUBE_MAP),Y.__version=J.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function yt(R,S,k,Z,J,Y){const At=s.convert(k.format,k.colorSpace),ct=s.convert(k.type),Et=_(k.internalFormat,At,ct,k.colorSpace),It=n.get(S),et=n.get(k);if(et.__renderTarget=S,!It.__hasExternalTextures){const ht=Math.max(1,S.width>>Y),St=Math.max(1,S.height>>Y);J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?e.texImage3D(J,Y,Et,ht,St,S.depth,0,At,ct,null):e.texImage2D(J,Y,Et,ht,St,0,At,ct,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),Me(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,J,et.__webglTexture,0,N(S)):(J===r.TEXTURE_2D||J>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,J,et.__webglTexture,Y),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ut(R,S,k){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer){const Z=S.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,Y=y(S.stencilBuffer,J),At=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Me(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,N(S),Y,S.width,S.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,N(S),Y,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Y,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,At,r.RENDERBUFFER,R)}else{const Z=S.textures;for(let J=0;J<Z.length;J++){const Y=Z[J],At=s.convert(Y.format,Y.colorSpace),ct=s.convert(Y.type),Et=_(Y.internalFormat,At,ct,Y.colorSpace);Me(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,N(S),Et,S.width,S.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,N(S),Et,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Et,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function wt(R,S,k){const Z=S.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(S.depthTexture);if(J.__renderTarget=S,(!J.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Z){if(J.__webglInit===void 0&&(J.__webglInit=!0,S.depthTexture.addEventListener("dispose",T)),J.__webglTexture===void 0){J.__webglTexture=r.createTexture(),e.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),rt(r.TEXTURE_CUBE_MAP,S.depthTexture);const It=s.convert(S.depthTexture.format),et=s.convert(S.depthTexture.type);let ht;S.depthTexture.format===Gn?ht=r.DEPTH_COMPONENT24:S.depthTexture.format===mi&&(ht=r.DEPTH24_STENCIL8);for(let St=0;St<6;St++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ht,S.width,S.height,0,It,et,null)}}else B(S.depthTexture,0);const Y=J.__webglTexture,At=N(S),ct=Z?r.TEXTURE_CUBE_MAP_POSITIVE_X+k:r.TEXTURE_2D,Et=S.depthTexture.format===mi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(S.depthTexture.format===Gn)Me(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Et,ct,Y,0,At):r.framebufferTexture2D(r.FRAMEBUFFER,Et,ct,Y,0);else if(S.depthTexture.format===mi)Me(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Et,ct,Y,0,At):r.framebufferTexture2D(r.FRAMEBUFFER,Et,ct,Y,0);else throw new Error("Unknown depthTexture format")}function Yt(R){const S=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const Z=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const J=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),S.__depthDisposeCallback=J}S.__boundDepthTexture=Z}if(R.depthTexture&&!S.__autoAllocateDepthBuffer)if(k)for(let Z=0;Z<6;Z++)wt(S.__webglFramebuffer[Z],R,Z);else{const Z=R.texture.mipmaps;Z&&Z.length>0?wt(S.__webglFramebuffer[0],R,0):wt(S.__webglFramebuffer,R,0)}else if(k){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=r.createRenderbuffer(),Ut(S.__webglDepthbuffer[Z],R,!1);else{const J=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,Y),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,Y)}}else{const Z=R.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),Ut(S.__webglDepthbuffer,R,!1);else{const J=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Y),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,Y)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ce(R,S,k){const Z=n.get(R);S!==void 0&&yt(Z.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&Yt(R)}function Wt(R){const S=R.texture,k=n.get(R),Z=n.get(S);R.addEventListener("dispose",C);const J=R.textures,Y=R.isWebGLCubeRenderTarget===!0,At=J.length>1;if(At||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=S.version,o.memory.textures++),Y){k.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[ct]=[];for(let Et=0;Et<S.mipmaps.length;Et++)k.__webglFramebuffer[ct][Et]=r.createFramebuffer()}else k.__webglFramebuffer[ct]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let ct=0;ct<S.mipmaps.length;ct++)k.__webglFramebuffer[ct]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(At)for(let ct=0,Et=J.length;ct<Et;ct++){const It=n.get(J[ct]);It.__webglTexture===void 0&&(It.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&Me(R)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ct=0;ct<J.length;ct++){const Et=J[ct];k.__webglColorRenderbuffer[ct]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[ct]);const It=s.convert(Et.format,Et.colorSpace),et=s.convert(Et.type),ht=_(Et.internalFormat,It,et,Et.colorSpace,R.isXRRenderTarget===!0),St=N(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,St,ht,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ct,r.RENDERBUFFER,k.__webglColorRenderbuffer[ct])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),Ut(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Y){e.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),rt(r.TEXTURE_CUBE_MAP,S);for(let ct=0;ct<6;ct++)if(S.mipmaps&&S.mipmaps.length>0)for(let Et=0;Et<S.mipmaps.length;Et++)yt(k.__webglFramebuffer[ct][Et],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et);else yt(k.__webglFramebuffer[ct],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);g(S)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ct=0,Et=J.length;ct<Et;ct++){const It=J[ct],et=n.get(It);let ht=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ht=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ht,et.__webglTexture),rt(ht,It),yt(k.__webglFramebuffer,R,It,r.COLOR_ATTACHMENT0+ct,ht,0),g(It)&&m(ht)}e.unbindTexture()}else{let ct=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ct=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ct,Z.__webglTexture),rt(ct,S),S.mipmaps&&S.mipmaps.length>0)for(let Et=0;Et<S.mipmaps.length;Et++)yt(k.__webglFramebuffer[Et],R,S,r.COLOR_ATTACHMENT0,ct,Et);else yt(k.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,ct,0);g(S)&&m(ct),e.unbindTexture()}R.depthBuffer&&Yt(R)}function te(R){const S=R.textures;for(let k=0,Z=S.length;k<Z;k++){const J=S[k];if(g(J)){const Y=v(R),At=n.get(J).__webglTexture;e.bindTexture(Y,At),m(Y),e.unbindTexture()}}}const oe=[],zt=[];function ye(R){if(R.samples>0){if(Me(R)===!1){const S=R.textures,k=R.width,Z=R.height;let J=r.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=n.get(R),ct=S.length>1;if(ct)for(let It=0;It<S.length;It++)e.bindFramebuffer(r.FRAMEBUFFER,At.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,At.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer);const Et=R.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let It=0;It<S.length;It++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=r.STENCIL_BUFFER_BIT)),ct){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,At.__webglColorRenderbuffer[It]);const et=n.get(S[It]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,et,0)}r.blitFramebuffer(0,0,k,Z,0,0,k,Z,J,r.NEAREST),c===!0&&(oe.length=0,zt.length=0,oe.push(r.COLOR_ATTACHMENT0+It),R.depthBuffer&&R.resolveDepthBuffer===!1&&(oe.push(Y),zt.push(Y),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,zt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,oe))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ct)for(let It=0;It<S.length;It++){e.bindFramebuffer(r.FRAMEBUFFER,At.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.RENDERBUFFER,At.__webglColorRenderbuffer[It]);const et=n.get(S[It]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,At.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.TEXTURE_2D,et,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const S=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function N(R){return Math.min(i.maxSamples,R.samples)}function Me(R){const S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function $t(R){const S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function ce(R,S){const k=R.colorSpace,Z=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==Vi&&k!==Kn&&(qt.getTransfer(k)===ie?(Z!==cn||J!==Ze)&&Nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Kt("WebGLTextures: Unsupported texture color space:",k)),S}function bt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=D,this.setTexture3D=V,this.setTextureCube=q,this.rebindTextures=Ce,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=Me,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function ig(r,t){function e(n,i=Kn){let s;const o=qt.getTransfer(i);if(n===Ze)return r.UNSIGNED_BYTE;if(n===fa)return r.UNSIGNED_SHORT_4_4_4_4;if(n===pa)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Sl)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===wl)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===yl)return r.BYTE;if(n===Ml)return r.SHORT;if(n===ms)return r.UNSIGNED_SHORT;if(n===da)return r.INT;if(n===wn)return r.UNSIGNED_INT;if(n===vn)return r.FLOAT;if(n===kn)return r.HALF_FLOAT;if(n===El)return r.ALPHA;if(n===bl)return r.RGB;if(n===cn)return r.RGBA;if(n===Gn)return r.DEPTH_COMPONENT;if(n===mi)return r.DEPTH_STENCIL;if(n===Tl)return r.RED;if(n===ma)return r.RED_INTEGER;if(n===Gi)return r.RG;if(n===ga)return r.RG_INTEGER;if(n===xa)return r.RGBA_INTEGER;if(n===rr||n===or||n===ar||n===cr)if(o===ie)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===rr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===or)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ar)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===rr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===or)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ar)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===cr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ao||n===Co||n===Ro||n===Po)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ao)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Co)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ro)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Po)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lo||n===Io||n===Do||n===No||n===Fo||n===Uo||n===Bo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Lo||n===Io)return o===ie?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Do)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===No)return s.COMPRESSED_R11_EAC;if(n===Fo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Uo)return s.COMPRESSED_RG11_EAC;if(n===Bo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oo||n===zo||n===ko||n===Go||n===Vo||n===Ho||n===Wo||n===qo||n===Xo||n===Yo||n===Zo||n===Ko||n===jo||n===$o)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Oo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ko)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Go)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Vo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ho)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$o)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Jo||n===Qo||n===ta)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Jo)return o===ie?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ta)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ea||n===na||n===ia||n===sa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===ea)return s.COMPRESSED_RED_RGTC1_EXT;if(n===na)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ia)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}const sg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rg=`
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

}`;class og{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Gl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new En({vertexShader:sg,fragmentShader:rg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new mt(new Ne(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ag extends qi{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,p=null;const x=typeof XRWebGLBinding<"u",g=new og,m={},v=e.getContextAttributes();let _=null,y=null;const b=[],T=[],C=new _t;let I=null;const M=new Qe;M.viewport=new xe;const w=new Qe;w.viewport=new xe;const P=[M,w],U=new md;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let Q=b[K];return Q===void 0&&(Q=new Kr,b[K]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(K){let Q=b[K];return Q===void 0&&(Q=new Kr,b[K]=Q),Q.getGripSpace()},this.getHand=function(K){let Q=b[K];return Q===void 0&&(Q=new Kr,b[K]=Q),Q.getHandSpace()};function B(K){const Q=T.indexOf(K.inputSource);if(Q===-1)return;const yt=b[Q];yt!==void 0&&(yt.update(K.inputSource,K.frame,l||o),yt.dispatchEvent({type:K.type,data:K.inputSource}))}function D(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",V);for(let K=0;K<b.length;K++){const Q=T[K];Q!==null&&(T[K]=null,b[K].disconnect(Q))}L=null,O=null,g.reset();for(const K in m)delete m[K];t.setRenderTarget(_),f=null,u=null,d=null,i=null,y=null,Qt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&Nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(_=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",D),i.addEventListener("inputsourceschange",V),v.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Ut=null,wt=null;v.depth&&(wt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=v.stencil?mi:Gn,Ut=v.stencil?gs:wn);const Yt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Yt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Mn(u.textureWidth,u.textureHeight,{format:cn,type:Ze,depthTexture:new vs(u.textureWidth,u.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const yt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,yt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Mn(f.framebufferWidth,f.framebufferHeight,{format:cn,type:Ze,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Qt.setContext(i),Qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function V(K){for(let Q=0;Q<K.removed.length;Q++){const yt=K.removed[Q],Ut=T.indexOf(yt);Ut>=0&&(T[Ut]=null,b[Ut].disconnect(yt))}for(let Q=0;Q<K.added.length;Q++){const yt=K.added[Q];let Ut=T.indexOf(yt);if(Ut===-1){for(let Yt=0;Yt<b.length;Yt++)if(Yt>=T.length){T.push(yt),Ut=Yt;break}else if(T[Yt]===null){T[Yt]=yt,Ut=Yt;break}if(Ut===-1)break}const wt=b[Ut];wt&&wt.connect(yt)}}const q=new F,$=new F;function nt(K,Q,yt){q.setFromMatrixPosition(Q.matrixWorld),$.setFromMatrixPosition(yt.matrixWorld);const Ut=q.distanceTo($),wt=Q.projectionMatrix.elements,Yt=yt.projectionMatrix.elements,Ce=wt[14]/(wt[10]-1),Wt=wt[14]/(wt[10]+1),te=(wt[9]+1)/wt[5],oe=(wt[9]-1)/wt[5],zt=(wt[8]-1)/wt[0],ye=(Yt[8]+1)/Yt[0],N=Ce*zt,Me=Ce*ye,$t=Ut/(-zt+ye),ce=$t*-zt;if(Q.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ce),K.translateZ($t),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),wt[10]===-1)K.projectionMatrix.copy(Q.projectionMatrix),K.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const bt=Ce+$t,R=Wt+$t,S=N-ce,k=Me+(Ut-ce),Z=te*Wt/R*bt,J=oe*Wt/R*bt;K.projectionMatrix.makePerspective(S,k,Z,J,bt,R),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function st(K,Q){Q===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(Q.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let Q=K.near,yt=K.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(yt=g.depthFar)),U.near=w.near=M.near=Q,U.far=w.far=M.far=yt,(L!==U.near||O!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),L=U.near,O=U.far),U.layers.mask=K.layers.mask|6,M.layers.mask=U.layers.mask&3,w.layers.mask=U.layers.mask&5;const Ut=K.parent,wt=U.cameras;st(U,Ut);for(let Yt=0;Yt<wt.length;Yt++)st(wt[Yt],Ut);wt.length===2?nt(U,M,w):U.projectionMatrix.copy(M.projectionMatrix),rt(K,U,Ut)};function rt(K,Q,yt){yt===null?K.matrix.copy(Q.matrixWorld):(K.matrix.copy(yt.matrixWorld),K.matrix.invert(),K.matrix.multiply(Q.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(Q.projectionMatrix),K.projectionMatrixInverse.copy(Q.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ra*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(K){return m[K]};let Dt=null;function se(K,Q){if(h=Q.getViewerPose(l||o),p=Q,h!==null){const yt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Ut=!1;yt.length!==U.cameras.length&&(U.cameras.length=0,Ut=!0);for(let Wt=0;Wt<yt.length;Wt++){const te=yt[Wt];let oe=null;if(f!==null)oe=f.getViewport(te);else{const ye=d.getViewSubImage(u,te);oe=ye.viewport,Wt===0&&(t.setRenderTargetTextures(y,ye.colorTexture,ye.depthStencilTexture),t.setRenderTarget(y))}let zt=P[Wt];zt===void 0&&(zt=new Qe,zt.layers.enable(Wt),zt.viewport=new xe,P[Wt]=zt),zt.matrix.fromArray(te.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(te.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(oe.x,oe.y,oe.width,oe.height),Wt===0&&(U.matrix.copy(zt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ut===!0&&U.cameras.push(zt)}const wt=i.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const Wt=d.getDepthInformation(yt[0]);Wt&&Wt.isValid&&Wt.texture&&g.init(Wt,i.renderState)}if(wt&&wt.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let Wt=0;Wt<yt.length;Wt++){const te=yt[Wt].camera;if(te){let oe=m[te];oe||(oe=new Gl,m[te]=oe);const zt=d.getCameraImage(te);oe.sourceTexture=zt}}}}for(let yt=0;yt<b.length;yt++){const Ut=T[yt],wt=b[yt];Ut!==null&&wt!==void 0&&wt.update(Ut,Q,l||o)}Dt&&Dt(K,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),p=null}const Qt=new $l;Qt.setAnimationLoop(se),this.setAnimationLoop=function(K){Dt=K},this.dispose=function(){}}}const ci=new un,cg=new fe;function lg(r,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Fl(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,_,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),x(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,v,_):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===He&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===He&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=t.get(m),_=v.envMap,y=v.envMapRotation;_&&(g.envMap.value=_,ci.copy(y),ci.x*=-1,ci.y*=-1,ci.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),g.envMapRotation.value.setFromMatrix4(cg.makeRotationFromEuler(ci)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,v,_){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=_*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===He&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const v=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hg(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,_){const y=_.program;n.uniformBlockBinding(v,y)}function l(v,_){let y=i[v.id];y===void 0&&(p(v),y=h(v),i[v.id]=y,v.addEventListener("dispose",g));const b=_.program;n.updateUBOMapping(v,b);const T=t.render.frame;s[v.id]!==T&&(u(v),s[v.id]=T)}function h(v){const _=d();v.__bindingPointIndex=_;const y=r.createBuffer(),b=v.__size,T=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,b,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,y),y}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Kt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const _=i[v.id],y=v.uniforms,b=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let T=0,C=y.length;T<C;T++){const I=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,w=I.length;M<w;M++){const P=I[M];if(f(P,T,M,b)===!0){const U=P.__offset,L=Array.isArray(P.value)?P.value:[P.value];let O=0;for(let B=0;B<L.length;B++){const D=L[B],V=x(D);typeof D=="number"||typeof D=="boolean"?(P.__data[0]=D,r.bufferSubData(r.UNIFORM_BUFFER,U+O,P.__data)):D.isMatrix3?(P.__data[0]=D.elements[0],P.__data[1]=D.elements[1],P.__data[2]=D.elements[2],P.__data[3]=0,P.__data[4]=D.elements[3],P.__data[5]=D.elements[4],P.__data[6]=D.elements[5],P.__data[7]=0,P.__data[8]=D.elements[6],P.__data[9]=D.elements[7],P.__data[10]=D.elements[8],P.__data[11]=0):(D.toArray(P.__data,O),O+=V.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,_,y,b){const T=v.value,C=_+"_"+y;if(b[C]===void 0)return typeof T=="number"||typeof T=="boolean"?b[C]=T:b[C]=T.clone(),!0;{const I=b[C];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return b[C]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function p(v){const _=v.uniforms;let y=0;const b=16;for(let C=0,I=_.length;C<I;C++){const M=Array.isArray(_[C])?_[C]:[_[C]];for(let w=0,P=M.length;w<P;w++){const U=M[w],L=Array.isArray(U.value)?U.value:[U.value];for(let O=0,B=L.length;O<B;O++){const D=L[O],V=x(D),q=y%b,$=q%V.boundary,nt=q+$;y+=$,nt!==0&&b-nt<V.storage&&(y+=b-nt),U.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=V.storage}}}const T=y%b;return T>0&&(y+=b-T),v.__size=y,v.__cache={},this}function x(v){const _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?Nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Nt("WebGLRenderer: Unsupported uniform value type.",v),_}function g(v){const _=v.target;_.removeEventListener("dispose",g);const y=o.indexOf(_.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function m(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:c,update:l,dispose:m}}const ug=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fn=null;function dg(){return fn===null&&(fn=new Eu(ug,16,16,Gi,kn),fn.name="DFG_LUT",fn.minFilter=Fe,fn.magFilter=Fe,fn.wrapS=Un,fn.wrapT=Un,fn.generateMipmaps=!1,fn.needsUpdate=!0),fn}class fg{constructor(t={}){const{canvas:e=$h(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Ze}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const x=f,g=new Set([xa,ga,ma]),m=new Set([Ze,wn,ms,gs,fa,pa]),v=new Uint32Array(4),_=new Int32Array(4);let y=null,b=null;const T=[],C=[];let I=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let w=!1;this._outputColorSpace=Je;let P=0,U=0,L=null,O=-1,B=null;const D=new xe,V=new xe;let q=null;const $=new Ht(0);let nt=0,st=e.width,rt=e.height,Dt=1,se=null,Qt=null;const K=new xe(0,0,st,rt),Q=new xe(0,0,st,rt);let yt=!1;const Ut=new Sa;let wt=!1,Yt=!1;const Ce=new fe,Wt=new F,te=new xe,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function ye(){return L===null?Dt:1}let N=n;function Me(A,G){return e.getContext(A,G)}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ua}`),e.addEventListener("webglcontextlost",Ft,!1),e.addEventListener("webglcontextrestored",le,!1),e.addEventListener("webglcontextcreationerror",ee,!1),N===null){const G="webgl2";if(N=Me(G,A),N===null)throw Me(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw Kt("WebGLRenderer: "+A.message),A}let $t,ce,bt,R,S,k,Z,J,Y,At,ct,Et,It,et,ht,St,Tt,lt,kt,z,pt,it,gt,tt;function j(){$t=new dm(N),$t.init(),it=new ig(N,$t),ce=new im(N,$t,t,it),bt=new eg(N,$t),ce.reversedDepthBuffer&&u&&bt.buffers.depth.setReversed(!0),R=new mm(N),S=new k0,k=new ng(N,$t,bt,S,ce,it,R),Z=new rm(M),J=new um(M),Y=new vd(N),gt=new em(N,Y),At=new fm(N,Y,R,gt),ct=new xm(N,At,Y,R),kt=new gm(N,ce,k),St=new sm(S),Et=new z0(M,Z,J,$t,ce,gt,St),It=new lg(M,S),et=new V0,ht=new Z0($t),lt=new tm(M,Z,J,bt,ct,p,c),Tt=new Q0(M,ct,ce),tt=new hg(N,R,ce,bt),z=new nm(N,$t,R),pt=new pm(N,$t,R),R.programs=Et.programs,M.capabilities=ce,M.extensions=$t,M.properties=S,M.renderLists=et,M.shadowMap=Tt,M.state=bt,M.info=R}j(),x!==Ze&&(I=new _m(x,e.width,e.height,i,s));const at=new ag(M,N);this.xr=at,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const A=$t.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=$t.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Dt},this.setPixelRatio=function(A){A!==void 0&&(Dt=A,this.setSize(st,rt,!1))},this.getSize=function(A){return A.set(st,rt)},this.setSize=function(A,G,X=!0){if(at.isPresenting){Nt("WebGLRenderer: Can't change size while VR device is presenting.");return}st=A,rt=G,e.width=Math.floor(A*Dt),e.height=Math.floor(G*Dt),X===!0&&(e.style.width=A+"px",e.style.height=G+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(st*Dt,rt*Dt).floor()},this.setDrawingBufferSize=function(A,G,X){st=A,rt=G,Dt=X,e.width=Math.floor(A*X),e.height=Math.floor(G*X),this.setViewport(0,0,A,G)},this.setEffects=function(A){if(x===Ze){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let G=0;G<A.length;G++)if(A[G].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(D)},this.getViewport=function(A){return A.copy(K)},this.setViewport=function(A,G,X,W){A.isVector4?K.set(A.x,A.y,A.z,A.w):K.set(A,G,X,W),bt.viewport(D.copy(K).multiplyScalar(Dt).round())},this.getScissor=function(A){return A.copy(Q)},this.setScissor=function(A,G,X,W){A.isVector4?Q.set(A.x,A.y,A.z,A.w):Q.set(A,G,X,W),bt.scissor(V.copy(Q).multiplyScalar(Dt).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(A){bt.setScissorTest(yt=A)},this.setOpaqueSort=function(A){se=A},this.setTransparentSort=function(A){Qt=A},this.getClearColor=function(A){return A.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor(...arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,X=!0){let W=0;if(A){let H=!1;if(L!==null){const ut=L.texture.format;H=g.has(ut)}if(H){const ut=L.texture.type,xt=m.has(ut),ft=lt.getClearColor(),Mt=lt.getClearAlpha(),Ct=ft.r,Lt=ft.g,Rt=ft.b;xt?(v[0]=Ct,v[1]=Lt,v[2]=Rt,v[3]=Mt,N.clearBufferuiv(N.COLOR,0,v)):(_[0]=Ct,_[1]=Lt,_[2]=Rt,_[3]=Mt,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}G&&(W|=N.DEPTH_BUFFER_BIT),X&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ft,!1),e.removeEventListener("webglcontextrestored",le,!1),e.removeEventListener("webglcontextcreationerror",ee,!1),lt.dispose(),et.dispose(),ht.dispose(),S.dispose(),Z.dispose(),J.dispose(),ct.dispose(),gt.dispose(),tt.dispose(),Et.dispose(),at.dispose(),at.removeEventListener("sessionstart",Da),at.removeEventListener("sessionend",Na),ei.stop()};function Ft(A){A.preventDefault(),Za("WebGLRenderer: Context Lost."),w=!0}function le(){Za("WebGLRenderer: Context Restored."),w=!1;const A=R.autoReset,G=Tt.enabled,X=Tt.autoUpdate,W=Tt.needsUpdate,H=Tt.type;j(),R.autoReset=A,Tt.enabled=G,Tt.autoUpdate=X,Tt.needsUpdate=W,Tt.type=H}function ee(A){Kt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function dn(A){const G=A.target;G.removeEventListener("dispose",dn),Tn(G)}function Tn(A){uh(A),S.remove(A)}function uh(A){const G=S.get(A).programs;G!==void 0&&(G.forEach(function(X){Et.releaseProgram(X)}),A.isShaderMaterial&&Et.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,X,W,H,ut){G===null&&(G=oe);const xt=H.isMesh&&H.matrixWorld.determinant()<0,ft=fh(A,G,X,W,H);bt.setMaterial(W,xt);let Mt=X.index,Ct=1;if(W.wireframe===!0){if(Mt=At.getWireframeAttribute(X),Mt===void 0)return;Ct=2}const Lt=X.drawRange,Rt=X.attributes.position;let Gt=Lt.start*Ct,re=(Lt.start+Lt.count)*Ct;ut!==null&&(Gt=Math.max(Gt,ut.start*Ct),re=Math.min(re,(ut.start+ut.count)*Ct)),Mt!==null?(Gt=Math.max(Gt,0),re=Math.min(re,Mt.count)):Rt!=null&&(Gt=Math.max(Gt,0),re=Math.min(re,Rt.count));const me=re-Gt;if(me<0||me===1/0)return;gt.setup(H,W,ft,X,Mt);let ge,ae=z;if(Mt!==null&&(ge=Y.get(Mt),ae=pt,ae.setIndex(ge)),H.isMesh)W.wireframe===!0?(bt.setLineWidth(W.wireframeLinewidth*ye()),ae.setMode(N.LINES)):ae.setMode(N.TRIANGLES);else if(H.isLine){let Pt=W.linewidth;Pt===void 0&&(Pt=1),bt.setLineWidth(Pt*ye()),H.isLineSegments?ae.setMode(N.LINES):H.isLineLoop?ae.setMode(N.LINE_LOOP):ae.setMode(N.LINE_STRIP)}else H.isPoints?ae.setMode(N.POINTS):H.isSprite&&ae.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)xs("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ae.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if($t.get("WEBGL_multi_draw"))ae.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Pt=H._multiDrawStarts,ne=H._multiDrawCounts,Zt=H._multiDrawCount,We=Mt?Y.get(Mt).bytesPerElement:1,_i=S.get(W).currentProgram.getUniforms();for(let qe=0;qe<Zt;qe++)_i.setValue(N,"_gl_DrawID",qe),ae.render(Pt[qe]/We,ne[qe])}else if(H.isInstancedMesh)ae.renderInstances(Gt,me,H.count);else if(X.isInstancedBufferGeometry){const Pt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ne=Math.min(X.instanceCount,Pt);ae.renderInstances(Gt,me,ne)}else ae.render(Gt,me)};function Ia(A,G,X){A.transparent===!0&&A.side===de&&A.forceSinglePass===!1?(A.side=He,A.needsUpdate=!0,As(A,G,X),A.side=Qn,A.needsUpdate=!0,As(A,G,X),A.side=de):As(A,G,X)}this.compile=function(A,G,X=null){X===null&&(X=A),b=ht.get(X),b.init(G),C.push(b),X.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),A!==X&&A.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),b.setupLights();const W=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ut=H.material;if(ut)if(Array.isArray(ut))for(let xt=0;xt<ut.length;xt++){const ft=ut[xt];Ia(ft,X,H),W.add(ft)}else Ia(ut,X,H),W.add(ut)}),b=C.pop(),W},this.compileAsync=function(A,G,X=null){const W=this.compile(A,G,X);return new Promise(H=>{function ut(){if(W.forEach(function(xt){S.get(xt).currentProgram.isReady()&&W.delete(xt)}),W.size===0){H(A);return}setTimeout(ut,10)}$t.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let wr=null;function dh(A){wr&&wr(A)}function Da(){ei.stop()}function Na(){ei.start()}const ei=new $l;ei.setAnimationLoop(dh),typeof self<"u"&&ei.setContext(self),this.setAnimationLoop=function(A){wr=A,at.setAnimationLoop(A),A===null?ei.stop():ei.start()},at.addEventListener("sessionstart",Da),at.addEventListener("sessionend",Na),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){Kt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;const X=at.enabled===!0&&at.isPresenting===!0,W=I!==null&&(L===null||X)&&I.begin(M,L);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(G),G=at.getCamera()),A.isScene===!0&&A.onBeforeRender(M,A,G,L),b=ht.get(A,C.length),b.init(G),C.push(b),Ce.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Ut.setFromProjectionMatrix(Ce,_n,G.reversedDepth),Yt=this.localClippingEnabled,wt=St.init(this.clippingPlanes,Yt),y=et.get(A,T.length),y.init(),T.push(y),at.enabled===!0&&at.isPresenting===!0){const xt=M.xr.getDepthSensingMesh();xt!==null&&Er(xt,G,-1/0,M.sortObjects)}Er(A,G,0,M.sortObjects),y.finish(),M.sortObjects===!0&&y.sort(se,Qt),zt=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,zt&&lt.addToRenderList(y,A),this.info.render.frame++,wt===!0&&St.beginShadows();const H=b.state.shadowsArray;if(Tt.render(H,A,G),wt===!0&&St.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&I.hasRenderPass())===!1){const xt=y.opaque,ft=y.transmissive;if(b.setupLights(),G.isArrayCamera){const Mt=G.cameras;if(ft.length>0)for(let Ct=0,Lt=Mt.length;Ct<Lt;Ct++){const Rt=Mt[Ct];Ua(xt,ft,A,Rt)}zt&&lt.render(A);for(let Ct=0,Lt=Mt.length;Ct<Lt;Ct++){const Rt=Mt[Ct];Fa(y,A,Rt,Rt.viewport)}}else ft.length>0&&Ua(xt,ft,A,G),zt&&lt.render(A),Fa(y,A,G)}L!==null&&U===0&&(k.updateMultisampleRenderTarget(L),k.updateRenderTargetMipmap(L)),W&&I.end(M),A.isScene===!0&&A.onAfterRender(M,A,G),gt.resetDefaultState(),O=-1,B=null,C.pop(),C.length>0?(b=C[C.length-1],wt===!0&&St.setGlobalState(M.clippingPlanes,b.state.camera)):b=null,T.pop(),T.length>0?y=T[T.length-1]:y=null};function Er(A,G,X,W){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)b.pushLight(A),A.castShadow&&b.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Ut.intersectsSprite(A)){W&&te.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ce);const xt=ct.update(A),ft=A.material;ft.visible&&y.push(A,xt,ft,X,te.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Ut.intersectsObject(A))){const xt=ct.update(A),ft=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),te.copy(A.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),te.copy(xt.boundingSphere.center)),te.applyMatrix4(A.matrixWorld).applyMatrix4(Ce)),Array.isArray(ft)){const Mt=xt.groups;for(let Ct=0,Lt=Mt.length;Ct<Lt;Ct++){const Rt=Mt[Ct],Gt=ft[Rt.materialIndex];Gt&&Gt.visible&&y.push(A,xt,Gt,X,te.z,Rt)}}else ft.visible&&y.push(A,xt,ft,X,te.z,null)}}const ut=A.children;for(let xt=0,ft=ut.length;xt<ft;xt++)Er(ut[xt],G,X,W)}function Fa(A,G,X,W){const{opaque:H,transmissive:ut,transparent:xt}=A;b.setupLightsView(X),wt===!0&&St.setGlobalState(M.clippingPlanes,X),W&&bt.viewport(D.copy(W)),H.length>0&&Ts(H,G,X),ut.length>0&&Ts(ut,G,X),xt.length>0&&Ts(xt,G,X),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function Ua(A,G,X,W){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[W.id]===void 0){const Gt=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[W.id]=new Mn(1,1,{generateMipmaps:!0,type:Gt?kn:Ze,minFilter:pi,samples:ce.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace})}const ut=b.state.transmissionRenderTarget[W.id],xt=W.viewport||D;ut.setSize(xt.z*M.transmissionResolutionScale,xt.w*M.transmissionResolutionScale);const ft=M.getRenderTarget(),Mt=M.getActiveCubeFace(),Ct=M.getActiveMipmapLevel();M.setRenderTarget(ut),M.getClearColor($),nt=M.getClearAlpha(),nt<1&&M.setClearColor(16777215,.5),M.clear(),zt&&lt.render(X);const Lt=M.toneMapping;M.toneMapping=yn;const Rt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),b.setupLightsView(W),wt===!0&&St.setGlobalState(M.clippingPlanes,W),Ts(A,X,W),k.updateMultisampleRenderTarget(ut),k.updateRenderTargetMipmap(ut),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let re=0,me=G.length;re<me;re++){const ge=G[re],{object:ae,geometry:Pt,material:ne,group:Zt}=ge;if(ne.side===de&&ae.layers.test(W.layers)){const We=ne.side;ne.side=He,ne.needsUpdate=!0,Ba(ae,X,W,Pt,ne,Zt),ne.side=We,ne.needsUpdate=!0,Gt=!0}}Gt===!0&&(k.updateMultisampleRenderTarget(ut),k.updateRenderTargetMipmap(ut))}M.setRenderTarget(ft,Mt,Ct),M.setClearColor($,nt),Rt!==void 0&&(W.viewport=Rt),M.toneMapping=Lt}function Ts(A,G,X){const W=G.isScene===!0?G.overrideMaterial:null;for(let H=0,ut=A.length;H<ut;H++){const xt=A[H],{object:ft,geometry:Mt,group:Ct}=xt;let Lt=xt.material;Lt.allowOverride===!0&&W!==null&&(Lt=W),ft.layers.test(X.layers)&&Ba(ft,G,X,Mt,Lt,Ct)}}function Ba(A,G,X,W,H,ut){A.onBeforeRender(M,G,X,W,H,ut),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(M,G,X,W,A,ut),H.transparent===!0&&H.side===de&&H.forceSinglePass===!1?(H.side=He,H.needsUpdate=!0,M.renderBufferDirect(X,G,W,H,A,ut),H.side=Qn,H.needsUpdate=!0,M.renderBufferDirect(X,G,W,H,A,ut),H.side=de):M.renderBufferDirect(X,G,W,H,A,ut),A.onAfterRender(M,G,X,W,H,ut)}function As(A,G,X){G.isScene!==!0&&(G=oe);const W=S.get(A),H=b.state.lights,ut=b.state.shadowsArray,xt=H.state.version,ft=Et.getParameters(A,H.state,ut,G,X),Mt=Et.getProgramCacheKey(ft);let Ct=W.programs;W.environment=A.isMeshStandardMaterial?G.environment:null,W.fog=G.fog,W.envMap=(A.isMeshStandardMaterial?J:Z).get(A.envMap||W.environment),W.envMapRotation=W.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Ct===void 0&&(A.addEventListener("dispose",dn),Ct=new Map,W.programs=Ct);let Lt=Ct.get(Mt);if(Lt!==void 0){if(W.currentProgram===Lt&&W.lightsStateVersion===xt)return za(A,ft),Lt}else ft.uniforms=Et.getUniforms(A),A.onBeforeCompile(ft,M),Lt=Et.acquireProgram(ft,Mt),Ct.set(Mt,Lt),W.uniforms=ft.uniforms;const Rt=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Rt.clippingPlanes=St.uniform),za(A,ft),W.needsLights=mh(A),W.lightsStateVersion=xt,W.needsLights&&(Rt.ambientLightColor.value=H.state.ambient,Rt.lightProbe.value=H.state.probe,Rt.directionalLights.value=H.state.directional,Rt.directionalLightShadows.value=H.state.directionalShadow,Rt.spotLights.value=H.state.spot,Rt.spotLightShadows.value=H.state.spotShadow,Rt.rectAreaLights.value=H.state.rectArea,Rt.ltc_1.value=H.state.rectAreaLTC1,Rt.ltc_2.value=H.state.rectAreaLTC2,Rt.pointLights.value=H.state.point,Rt.pointLightShadows.value=H.state.pointShadow,Rt.hemisphereLights.value=H.state.hemi,Rt.directionalShadowMap.value=H.state.directionalShadowMap,Rt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Rt.spotShadowMap.value=H.state.spotShadowMap,Rt.spotLightMatrix.value=H.state.spotLightMatrix,Rt.spotLightMap.value=H.state.spotLightMap,Rt.pointShadowMap.value=H.state.pointShadowMap,Rt.pointShadowMatrix.value=H.state.pointShadowMatrix),W.currentProgram=Lt,W.uniformsList=null,Lt}function Oa(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=lr.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function za(A,G){const X=S.get(A);X.outputColorSpace=G.outputColorSpace,X.batching=G.batching,X.batchingColor=G.batchingColor,X.instancing=G.instancing,X.instancingColor=G.instancingColor,X.instancingMorph=G.instancingMorph,X.skinning=G.skinning,X.morphTargets=G.morphTargets,X.morphNormals=G.morphNormals,X.morphColors=G.morphColors,X.morphTargetsCount=G.morphTargetsCount,X.numClippingPlanes=G.numClippingPlanes,X.numIntersection=G.numClipIntersection,X.vertexAlphas=G.vertexAlphas,X.vertexTangents=G.vertexTangents,X.toneMapping=G.toneMapping}function fh(A,G,X,W,H){G.isScene!==!0&&(G=oe),k.resetTextureUnits();const ut=G.fog,xt=W.isMeshStandardMaterial?G.environment:null,ft=L===null?M.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Vi,Mt=(W.isMeshStandardMaterial?J:Z).get(W.envMap||xt),Ct=W.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Lt=!!X.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Rt=!!X.morphAttributes.position,Gt=!!X.morphAttributes.normal,re=!!X.morphAttributes.color;let me=yn;W.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(me=M.toneMapping);const ge=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ae=ge!==void 0?ge.length:0,Pt=S.get(W),ne=b.state.lights;if(wt===!0&&(Yt===!0||A!==B)){const Be=A===B&&W.id===O;St.setState(W,A,Be)}let Zt=!1;W.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==ne.state.version||Pt.outputColorSpace!==ft||H.isBatchedMesh&&Pt.batching===!1||!H.isBatchedMesh&&Pt.batching===!0||H.isBatchedMesh&&Pt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Pt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Pt.instancing===!1||!H.isInstancedMesh&&Pt.instancing===!0||H.isSkinnedMesh&&Pt.skinning===!1||!H.isSkinnedMesh&&Pt.skinning===!0||H.isInstancedMesh&&Pt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Pt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Pt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Pt.instancingMorph===!1&&H.morphTexture!==null||Pt.envMap!==Mt||W.fog===!0&&Pt.fog!==ut||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==St.numPlanes||Pt.numIntersection!==St.numIntersection)||Pt.vertexAlphas!==Ct||Pt.vertexTangents!==Lt||Pt.morphTargets!==Rt||Pt.morphNormals!==Gt||Pt.morphColors!==re||Pt.toneMapping!==me||Pt.morphTargetsCount!==ae)&&(Zt=!0):(Zt=!0,Pt.__version=W.version);let We=Pt.currentProgram;Zt===!0&&(We=As(W,G,H));let _i=!1,qe=!1,$i=!1;const he=We.getUniforms(),ze=Pt.uniforms;if(bt.useProgram(We.program)&&(_i=!0,qe=!0,$i=!0),W.id!==O&&(O=W.id,qe=!0),_i||B!==A){bt.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),he.setValue(N,"projectionMatrix",A.projectionMatrix),he.setValue(N,"viewMatrix",A.matrixWorldInverse);const ke=he.map.cameraPosition;ke!==void 0&&ke.setValue(N,Wt.setFromMatrixPosition(A.matrixWorld)),ce.logarithmicDepthBuffer&&he.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&he.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),B!==A&&(B=A,qe=!0,$i=!0)}if(Pt.needsLights&&(ne.state.directionalShadowMap.length>0&&he.setValue(N,"directionalShadowMap",ne.state.directionalShadowMap,k),ne.state.spotShadowMap.length>0&&he.setValue(N,"spotShadowMap",ne.state.spotShadowMap,k),ne.state.pointShadowMap.length>0&&he.setValue(N,"pointShadowMap",ne.state.pointShadowMap,k)),H.isSkinnedMesh){he.setOptional(N,H,"bindMatrix"),he.setOptional(N,H,"bindMatrixInverse");const Be=H.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),he.setValue(N,"boneTexture",Be.boneTexture,k))}H.isBatchedMesh&&(he.setOptional(N,H,"batchingTexture"),he.setValue(N,"batchingTexture",H._matricesTexture,k),he.setOptional(N,H,"batchingIdTexture"),he.setValue(N,"batchingIdTexture",H._indirectTexture,k),he.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&he.setValue(N,"batchingColorTexture",H._colorsTexture,k));const je=X.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&kt.update(H,X,We),(qe||Pt.receiveShadow!==H.receiveShadow)&&(Pt.receiveShadow=H.receiveShadow,he.setValue(N,"receiveShadow",H.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(ze.envMap.value=Mt,ze.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&G.environment!==null&&(ze.envMapIntensity.value=G.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=dg()),qe&&(he.setValue(N,"toneMappingExposure",M.toneMappingExposure),Pt.needsLights&&ph(ze,$i),ut&&W.fog===!0&&It.refreshFogUniforms(ze,ut),It.refreshMaterialUniforms(ze,W,Dt,rt,b.state.transmissionRenderTarget[A.id]),lr.upload(N,Oa(Pt),ze,k)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(lr.upload(N,Oa(Pt),ze,k),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&he.setValue(N,"center",H.center),he.setValue(N,"modelViewMatrix",H.modelViewMatrix),he.setValue(N,"normalMatrix",H.normalMatrix),he.setValue(N,"modelMatrix",H.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Be=W.uniformsGroups;for(let ke=0,br=Be.length;ke<br;ke++){const ni=Be[ke];tt.update(ni,We),tt.bind(ni,We)}}return We}function ph(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function mh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,G,X){const W=S.get(A);W.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),S.get(A.texture).__webglTexture=G,S.get(A.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:X,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){const X=S.get(A);X.__webglFramebuffer=G,X.__useDefaultFramebuffer=G===void 0};const gh=N.createFramebuffer();this.setRenderTarget=function(A,G=0,X=0){L=A,P=G,U=X;let W=null,H=!1,ut=!1;if(A){const ft=S.get(A);if(ft.__useDefaultFramebuffer!==void 0){bt.bindFramebuffer(N.FRAMEBUFFER,ft.__webglFramebuffer),D.copy(A.viewport),V.copy(A.scissor),q=A.scissorTest,bt.viewport(D),bt.scissor(V),bt.setScissorTest(q),O=-1;return}else if(ft.__webglFramebuffer===void 0)k.setupRenderTarget(A);else if(ft.__hasExternalTextures)k.rebindTextures(A,S.get(A.texture).__webglTexture,S.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Lt=A.depthTexture;if(ft.__boundDepthTexture!==Lt){if(Lt!==null&&S.has(Lt)&&(A.width!==Lt.image.width||A.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(A)}}const Mt=A.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(ut=!0);const Ct=S.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ct[G])?W=Ct[G][X]:W=Ct[G],H=!0):A.samples>0&&k.useMultisampledRTT(A)===!1?W=S.get(A).__webglMultisampledFramebuffer:Array.isArray(Ct)?W=Ct[X]:W=Ct,D.copy(A.viewport),V.copy(A.scissor),q=A.scissorTest}else D.copy(K).multiplyScalar(Dt).floor(),V.copy(Q).multiplyScalar(Dt).floor(),q=yt;if(X!==0&&(W=gh),bt.bindFramebuffer(N.FRAMEBUFFER,W)&&bt.drawBuffers(A,W),bt.viewport(D),bt.scissor(V),bt.setScissorTest(q),H){const ft=S.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+G,ft.__webglTexture,X)}else if(ut){const ft=G;for(let Mt=0;Mt<A.textures.length;Mt++){const Ct=S.get(A.textures[Mt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Mt,Ct.__webglTexture,X,ft)}}else if(A!==null&&X!==0){const ft=S.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ft.__webglTexture,X)}O=-1},this.readRenderTargetPixels=function(A,G,X,W,H,ut,xt,ft=0){if(!(A&&A.isWebGLRenderTarget)){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=S.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&xt!==void 0&&(Mt=Mt[xt]),Mt){bt.bindFramebuffer(N.FRAMEBUFFER,Mt);try{const Ct=A.textures[ft],Lt=Ct.format,Rt=Ct.type;if(!ce.textureFormatReadable(Lt)){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ce.textureTypeReadable(Rt)){Kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-W&&X>=0&&X<=A.height-H&&(A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ft),N.readPixels(G,X,W,H,it.convert(Lt),it.convert(Rt),ut))}finally{const Ct=L!==null?S.get(L).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(A,G,X,W,H,ut,xt,ft=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=S.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&xt!==void 0&&(Mt=Mt[xt]),Mt)if(G>=0&&G<=A.width-W&&X>=0&&X<=A.height-H){bt.bindFramebuffer(N.FRAMEBUFFER,Mt);const Ct=A.textures[ft],Lt=Ct.format,Rt=Ct.type;if(!ce.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ce.textureTypeReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Gt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Gt),N.bufferData(N.PIXEL_PACK_BUFFER,ut.byteLength,N.STREAM_READ),A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ft),N.readPixels(G,X,W,H,it.convert(Lt),it.convert(Rt),0);const re=L!==null?S.get(L).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,re);const me=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Jh(N,me,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Gt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ut),N.deleteBuffer(Gt),N.deleteSync(me),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,X=0){const W=Math.pow(2,-X),H=Math.floor(A.image.width*W),ut=Math.floor(A.image.height*W),xt=G!==null?G.x:0,ft=G!==null?G.y:0;k.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,xt,ft,H,ut),bt.unbindTexture()};const xh=N.createFramebuffer(),vh=N.createFramebuffer();this.copyTextureToTexture=function(A,G,X=null,W=null,H=0,ut=null){ut===null&&(H!==0?(xs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ut=H,H=0):ut=0);let xt,ft,Mt,Ct,Lt,Rt,Gt,re,me;const ge=A.isCompressedTexture?A.mipmaps[ut]:A.image;if(X!==null)xt=X.max.x-X.min.x,ft=X.max.y-X.min.y,Mt=X.isBox3?X.max.z-X.min.z:1,Ct=X.min.x,Lt=X.min.y,Rt=X.isBox3?X.min.z:0;else{const je=Math.pow(2,-H);xt=Math.floor(ge.width*je),ft=Math.floor(ge.height*je),A.isDataArrayTexture?Mt=ge.depth:A.isData3DTexture?Mt=Math.floor(ge.depth*je):Mt=1,Ct=0,Lt=0,Rt=0}W!==null?(Gt=W.x,re=W.y,me=W.z):(Gt=0,re=0,me=0);const ae=it.convert(G.format),Pt=it.convert(G.type);let ne;G.isData3DTexture?(k.setTexture3D(G,0),ne=N.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(k.setTexture2DArray(G,0),ne=N.TEXTURE_2D_ARRAY):(k.setTexture2D(G,0),ne=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,G.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,G.unpackAlignment);const Zt=N.getParameter(N.UNPACK_ROW_LENGTH),We=N.getParameter(N.UNPACK_IMAGE_HEIGHT),_i=N.getParameter(N.UNPACK_SKIP_PIXELS),qe=N.getParameter(N.UNPACK_SKIP_ROWS),$i=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ge.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ge.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ct),N.pixelStorei(N.UNPACK_SKIP_ROWS,Lt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Rt);const he=A.isDataArrayTexture||A.isData3DTexture,ze=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){const je=S.get(A),Be=S.get(G),ke=S.get(je.__renderTarget),br=S.get(Be.__renderTarget);bt.bindFramebuffer(N.READ_FRAMEBUFFER,ke.__webglFramebuffer),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,br.__webglFramebuffer);for(let ni=0;ni<Mt;ni++)he&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,S.get(A).__webglTexture,H,Rt+ni),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,S.get(G).__webglTexture,ut,me+ni)),N.blitFramebuffer(Ct,Lt,xt,ft,Gt,re,xt,ft,N.DEPTH_BUFFER_BIT,N.NEAREST);bt.bindFramebuffer(N.READ_FRAMEBUFFER,null),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||A.isRenderTargetTexture||S.has(A)){const je=S.get(A),Be=S.get(G);bt.bindFramebuffer(N.READ_FRAMEBUFFER,xh),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,vh);for(let ke=0;ke<Mt;ke++)he?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,je.__webglTexture,H,Rt+ke):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,je.__webglTexture,H),ze?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Be.__webglTexture,ut,me+ke):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Be.__webglTexture,ut),H!==0?N.blitFramebuffer(Ct,Lt,xt,ft,Gt,re,xt,ft,N.COLOR_BUFFER_BIT,N.NEAREST):ze?N.copyTexSubImage3D(ne,ut,Gt,re,me+ke,Ct,Lt,xt,ft):N.copyTexSubImage2D(ne,ut,Gt,re,Ct,Lt,xt,ft);bt.bindFramebuffer(N.READ_FRAMEBUFFER,null),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ze?A.isDataTexture||A.isData3DTexture?N.texSubImage3D(ne,ut,Gt,re,me,xt,ft,Mt,ae,Pt,ge.data):G.isCompressedArrayTexture?N.compressedTexSubImage3D(ne,ut,Gt,re,me,xt,ft,Mt,ae,ge.data):N.texSubImage3D(ne,ut,Gt,re,me,xt,ft,Mt,ae,Pt,ge):A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ut,Gt,re,xt,ft,ae,Pt,ge.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ut,Gt,re,ge.width,ge.height,ae,ge.data):N.texSubImage2D(N.TEXTURE_2D,ut,Gt,re,xt,ft,ae,Pt,ge);N.pixelStorei(N.UNPACK_ROW_LENGTH,Zt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,We),N.pixelStorei(N.UNPACK_SKIP_PIXELS,_i),N.pixelStorei(N.UNPACK_SKIP_ROWS,qe),N.pixelStorei(N.UNPACK_SKIP_IMAGES,$i),ut===0&&G.generateMipmaps&&N.generateMipmap(ne),bt.unbindTexture()},this.initRenderTarget=function(A){S.get(A).__webglFramebuffer===void 0&&k.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?k.setTextureCube(A,0):A.isData3DTexture?k.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?k.setTexture2DArray(A,0):k.setTexture2D(A,0),bt.unbindTexture()},this.resetState=function(){P=0,U=0,L=null,bt.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class ln{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new E);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new E);const n=this.elements,i=t.x,s=t.y,o=t.z;return e.x=n[0]*i+n[1]*s+n[2]*o,e.y=n[3]*i+n[4]*s+n[5]*o,e.z=n[6]*i+n[7]*s+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new ln);const n=this.elements,i=t.elements,s=e.elements,o=n[0],a=n[1],c=n[2],l=n[3],h=n[4],d=n[5],u=n[6],f=n[7],p=n[8],x=i[0],g=i[1],m=i[2],v=i[3],_=i[4],y=i[5],b=i[6],T=i[7],C=i[8];return s[0]=o*x+a*v+c*b,s[1]=o*g+a*_+c*T,s[2]=o*m+a*y+c*C,s[3]=l*x+h*v+d*b,s[4]=l*g+h*_+d*T,s[5]=l*m+h*y+d*C,s[6]=u*x+f*v+p*b,s[7]=u*g+f*_+p*T,s[8]=u*m+f*y+p*C,e}scale(t,e){e===void 0&&(e=new ln);const n=this.elements,i=e.elements;for(let s=0;s!==3;s++)i[3*s+0]=t.x*n[3*s+0],i[3*s+1]=t.y*n[3*s+1],i[3*s+2]=t.z*n[3*s+2];return e}solve(t,e){e===void 0&&(e=new E);const n=3,i=4,s=[];let o,a;for(o=0;o<n*i;o++)s.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)s[o+i*a]=this.elements[o+3*a];s[3]=t.x,s[7]=t.y,s[11]=t.z;let c=3;const l=c;let h;const d=4;let u;do{if(o=l-c,s[o+i*o]===0){for(a=o+1;a<l;a++)if(s[o+i*a]!==0){h=d;do u=d-h,s[u+i*o]+=s[u+i*a];while(--h);break}}if(s[o+i*o]!==0)for(a=o+1;a<l;a++){const f=s[o+i*a]/s[o+i*o];h=d;do u=d-h,s[u+i*a]=u<=o?0:s[u+i*a]-s[u+i*o]*f;while(--h)}}while(--c);if(e.z=s[2*i+3]/s[2*i+2],e.y=(s[1*i+3]-s[1*i+2]*e.z)/s[1*i+1],e.x=(s[0*i+3]-s[0*i+2]*e.z-s[0*i+1]*e.y)/s[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";for(let n=0;n<9;n++)t+=this.elements[n]+",";return t}reverse(t){t===void 0&&(t=new ln);const e=3,n=6,i=pg;let s,o;for(s=0;s<3;s++)for(o=0;o<3;o++)i[s+n*o]=this.elements[s+3*o];i[3]=1,i[9]=0,i[15]=0,i[4]=0,i[10]=1,i[16]=0,i[5]=0,i[11]=0,i[17]=1;let a=3;const c=a;let l;const h=n;let d;do{if(s=c-a,i[s+n*s]===0){for(o=s+1;o<c;o++)if(i[s+n*o]!==0){l=h;do d=h-l,i[d+n*s]+=i[d+n*o];while(--l);break}}if(i[s+n*s]!==0)for(o=s+1;o<c;o++){const u=i[s+n*o]/i[s+n*s];l=h;do d=h-l,i[d+n*o]=d<=s?0:i[d+n*o]-i[d+n*s]*u;while(--l)}}while(--a);s=2;do{o=s-1;do{const u=i[s+n*o]/i[s+n*s];l=n;do d=n-l,i[d+n*o]=i[d+n*o]-i[d+n*s]*u;while(--l)}while(o--)}while(--s);s=2;do{const u=1/i[s+n*s];l=n;do d=n-l,i[d+n*s]=i[d+n*s]*u;while(--l)}while(s--);s=2;do{o=2;do{if(d=i[e+o+n*s],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,o,d)}while(o--)}while(s--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,s=t.w,o=e+e,a=n+n,c=i+i,l=e*o,h=e*a,d=e*c,u=n*a,f=n*c,p=i*c,x=s*o,g=s*a,m=s*c,v=this.elements;return v[0]=1-(u+p),v[1]=h-m,v[2]=d+g,v[3]=h+m,v[4]=1-(l+p),v[5]=f-x,v[6]=d-g,v[7]=f+x,v[8]=1-(l+u),this}transpose(t){t===void 0&&(t=new ln);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const pg=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class E{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new E);const n=t.x,i=t.y,s=t.z,o=this.x,a=this.y,c=this.z;return e.x=a*s-c*i,e.y=c*n-o*s,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new E(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new E(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new ln([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new E);const e=this.x,n=this.y,i=this.z;let s=Math.sqrt(e*e+n*n+i*i);return s>0?(s=1/s,t.x=e*s,t.y=n*s,t.z=i*s):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z;return Math.sqrt((s-e)*(s-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z;return(s-e)*(s-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new E);const n=this.x,i=this.y,s=this.z;return e.x=t*n,e.y=t*i,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new E),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new E),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new E),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=mg,s=1/n;i.set(this.x*s,this.y*s,this.z*s);const o=gg;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,s=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=s+(t.y-s)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(qc),qc.almostEquals(t,e)}clone(){return new E(this.x,this.y,this.z)}}E.ZERO=new E(0,0,0);E.UNIT_X=new E(1,0,0);E.UNIT_Y=new E(0,1,0);E.UNIT_Z=new E(0,0,1);const mg=new E,gg=new E,qc=new E;class Ke{constructor(t){t===void 0&&(t={}),this.lowerBound=new E,this.upperBound=new E,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const s=this.lowerBound,o=this.upperBound,a=n;s.copy(t[0]),a&&a.vmult(s,s),o.copy(s);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,Xc),l=Xc),l.x>o.x&&(o.x=l.x),l.x<s.x&&(s.x=l.x),l.y>o.y&&(o.y=l.y),l.y<s.y&&(s.y=l.y),l.z>o.z&&(o.z=l.z),l.z<s.z&&(s.z=l.z)}return e&&(e.vadd(s,s),e.vadd(o,o)),i&&(s.x-=i,s.y-=i,s.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new Ke().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound,o=i.x<=n.x&&n.x<=s.x||e.x<=s.x&&s.x<=n.x,a=i.y<=n.y&&n.y<=s.y||e.y<=s.y&&s.y<=n.y,c=i.z<=n.z&&n.z<=s.z||e.z<=s.z&&s.z<=n.z;return o&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound;return e.x<=i.x&&n.x>=s.x&&e.y<=i.y&&n.y>=s.y&&e.z<=i.z&&n.z>=s.z}getCorners(t,e,n,i,s,o,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),s.set(h.x,l.y,h.z),o.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const n=Yc,i=n[0],s=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,s,o,a,c,l,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=Yc,i=n[0],s=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,s,o,a,c,l,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,s=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*s,h=(this.upperBound.y-n.y)*s,d=(this.lowerBound.z-n.z)*o,u=(this.upperBound.z-n.z)*o,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(d,u)),p=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(d,u));return!(p<0||f>p)}}const Xc=new E,Yc=[new E,new E,new E,new E,new E,new E,new E,new E];class Zc{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:s}=e;if(s>i){const o=s;s=i,i=o}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class nh{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,t)}return this}}class _e{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new E),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=xg,i=vg;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new _e);const n=this.x,i=this.y,s=this.z,o=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+o*a+i*l-s*c,e.y=i*h+o*c+s*a-n*l,e.z=s*h+o*l+n*c-i*a,e.w=o*h-n*a-i*c-s*l,e}inverse(t){t===void 0&&(t=new _e);const e=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(t);const o=1/(e*e+n*n+i*i+s*s);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new _e),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new E);const n=t.x,i=t.y,s=t.z,o=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*s-c*i,d=l*i+c*n-o*s,u=l*s+o*i-a*n,f=-o*n-a*i-c*s;return e.x=h*l+f*-o+d*-c-u*-a,e.y=d*l+f*-a+u*-o-h*-c,e.z=u*l+f*-c+h*-a-d*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,s;const o=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=o*a+c*l;if(h>.499&&(n=2*Math.atan2(o,l),i=Math.PI/2,s=0),h<-.499&&(n=-2*Math.atan2(o,l),i=-Math.PI/2,s=0),n===void 0){const d=o*o,u=a*a,f=c*c;n=Math.atan2(2*a*l-2*o*c,1-2*u-2*f),i=Math.asin(2*h),s=Math.atan2(2*o*l-2*a*c,1-2*d-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=s}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const s=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*o*a+s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a-c*l*h):i==="YXZ"?(this.x=c*o*a+s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a+c*l*h):i==="ZXY"?(this.x=c*o*a-s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a-c*l*h):i==="ZYX"?(this.x=c*o*a-s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a+c*l*h):i==="YZX"?(this.x=c*o*a+s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a-c*l*h):i==="XZY"&&(this.x=c*o*a-s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a+c*l*h),this}clone(){return new _e(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new _e);const i=this.x,s=this.y,o=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,d=t.w,u,f,p,x,g;return f=i*c+s*l+o*h+a*d,f<0&&(f=-f,c=-c,l=-l,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),p=Math.sin(u),x=Math.sin((1-e)*u)/p,g=Math.sin(e*u)/p):(x=1-e,g=e),n.x=x*i+g*c,n.y=x*s+g*l,n.z=x*o+g*h,n.w=x*a+g*d,n}integrate(t,e,n,i){i===void 0&&(i=new _e);const s=t.x*n.x,o=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,d=this.w,u=e*.5;return i.x+=u*(s*d+o*h-a*l),i.y+=u*(o*d+a*c-s*h),i.z+=u*(a*d+s*l-o*c),i.w+=u*(-s*c-o*l-a*h),i}}const xg=new E,vg=new E,_g={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class vt{constructor(t){t===void 0&&(t={}),this.id=vt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}vt.idCounter=0;vt.types=_g;class jt{constructor(t){t===void 0&&(t={}),this.position=new E,this.quaternion=new _e,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return jt.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return jt.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new E),n.vsub(t,i),e.conjugate(Kc),Kc.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new E),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new E),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new E),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const Kc=new _e;class Oi extends vt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:o}=t;super({type:vt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new E;for(let s=0;s!==t.length;s++){const o=t[s],a=o.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[o[c]].vsub(e[o[l]],i),i.normalize();let h=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new E;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],s=this.vertices[n[1]],o=this.vertices[n[2]];Oi.computeNormal(i,s,o,e)}static computeNormal(t,e,n,i){const s=new E,o=new E;e.vsub(t,o),n.vsub(e,s),s.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,s,o,a,c,l){const h=new E;let d=-1,u=-Number.MAX_VALUE;for(let p=0;p<n.faces.length;p++){h.copy(n.faceNormals[p]),s.vmult(h,h);const x=h.dot(o);x>u&&(u=x,d=p)}const f=[];for(let p=0;p<n.faces[d].length;p++){const x=n.vertices[n.faces[d][p]],g=new E;g.copy(x),s.vmult(g,g),i.vadd(g,g),f.push(g)}d>=0&&this.clipFaceAgainstHull(o,t,e,f,a,c,l)}findSeparatingAxis(t,e,n,i,s,o,a,c){const l=new E,h=new E,d=new E,u=new E,f=new E,p=new E;let x=Number.MAX_VALUE;const g=this;if(g.uniqueAxes)for(let m=0;m!==g.uniqueAxes.length;m++){n.vmult(g.uniqueAxes[m],l);const v=g.testSepAxis(l,t,e,n,i,s);if(v===!1)return!1;v<x&&(x=v,o.copy(l))}else{const m=a?a.length:g.faces.length;for(let v=0;v<m;v++){const _=a?a[v]:v;l.copy(g.faceNormals[_]),n.vmult(l,l);const y=g.testSepAxis(l,t,e,n,i,s);if(y===!1)return!1;y<x&&(x=y,o.copy(l))}}if(t.uniqueAxes)for(let m=0;m!==t.uniqueAxes.length;m++){s.vmult(t.uniqueAxes[m],h);const v=g.testSepAxis(h,t,e,n,i,s);if(v===!1)return!1;v<x&&(x=v,o.copy(h))}else{const m=c?c.length:t.faces.length;for(let v=0;v<m;v++){const _=c?c[v]:v;h.copy(t.faceNormals[_]),s.vmult(h,h);const y=g.testSepAxis(h,t,e,n,i,s);if(y===!1)return!1;y<x&&(x=y,o.copy(h))}}for(let m=0;m!==g.uniqueEdges.length;m++){n.vmult(g.uniqueEdges[m],u);for(let v=0;v!==t.uniqueEdges.length;v++)if(s.vmult(t.uniqueEdges[v],f),u.cross(f,p),!p.almostZero()){p.normalize();const _=g.testSepAxis(p,t,e,n,i,s);if(_===!1)return!1;_<x&&(x=_,o.copy(p))}}return i.vsub(e,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,s,o){const a=this;Oi.project(a,t,n,i,ao),Oi.project(e,t,s,o,co);const c=ao[0],l=ao[1],h=co[0],d=co[1];if(c<d||h<l)return!1;const u=c-d,f=h-l;return u<f?u:f}calculateLocalInertia(t,e){const n=new E,i=new E;this.computeLocalAABB(i,n);const s=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*s*2*s+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*s*2*s)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,s,o,a){const c=new E,l=new E,h=new E,d=new E,u=new E,f=new E,p=new E,x=new E,g=this,m=[],v=i,_=m;let y=-1,b=Number.MAX_VALUE;for(let w=0;w<g.faces.length;w++){c.copy(g.faceNormals[w]),n.vmult(c,c);const P=c.dot(t);P<b&&(b=P,y=w)}if(y<0)return;const T=g.faces[y];T.connectedFaces=[];for(let w=0;w<g.faces.length;w++)for(let P=0;P<g.faces[w].length;P++)T.indexOf(g.faces[w][P])!==-1&&w!==y&&T.connectedFaces.indexOf(w)===-1&&T.connectedFaces.push(w);const C=T.length;for(let w=0;w<C;w++){const P=g.vertices[T[w]],U=g.vertices[T[(w+1)%C]];P.vsub(U,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),d.copy(this.faceNormals[y]),n.vmult(d,d),e.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(P),n.vmult(f,f),e.vadd(f,f);const L=T.connectedFaces[w];p.copy(this.faceNormals[L]);const O=this.getPlaneConstantOfFace(L);x.copy(p),n.vmult(x,x);const B=O-x.dot(e);for(this.clipFaceAgainstPlane(v,_,x,B);v.length;)v.shift();for(;_.length;)v.push(_.shift())}p.copy(this.faceNormals[y]);const I=this.getPlaneConstantOfFace(y);x.copy(p),n.vmult(x,x);const M=I-x.dot(e);for(let w=0;w<v.length;w++){let P=x.dot(v[w])+M;if(P<=s&&(console.log(`clamped: depth=${P} to minDist=${s}`),P=s),P<=o){const U=v[w];if(P<=1e-6){const L={point:U,normal:x,depth:P};a.push(L)}}}}clipFaceAgainstPlane(t,e,n,i){let s,o;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];s=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],o=n.dot(l)+i,s<0)if(o<0){const d=new E;d.copy(l),e.push(d)}else{const d=new E;c.lerp(l,s/(s-o),d),e.push(d)}else if(o<0){const d=new E;c.lerp(l,s/(s-o),d),e.push(d),e.push(l)}c=l,s=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new E);const n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(n[s],i[s]),t.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const s=n[i];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new E);const n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const s=this.vertices;let o,a,c,l,h,d,u=new E;for(let f=0;f<s.length;f++){u.copy(s[f]),e.vmult(u,u),t.vadd(u,u);const p=u;(o===void 0||p.x<o)&&(o=p.x),(l===void 0||p.x>l)&&(l=p.x),(a===void 0||p.y<a)&&(a=p.y),(h===void 0||p.y>h)&&(h=p.y),(c===void 0||p.z<c)&&(c=p.z),(d===void 0||p.z>d)&&(d=p.z)}n.set(o,a,c),i.set(l,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new E);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let s=0;s<n;s++){const o=i[s];e.vmult(o,o)}for(let s=0;s<this.faceNormals.length;s++){const o=this.faceNormals[s];e.vmult(o,o)}}if(t)for(let s=0;s<n;s++){const o=i[s];o.vadd(t,o)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,s=new E;this.getAveragePointLocal(s);for(let o=0;o<this.faces.length;o++){let a=i[o];const c=e[n[o][0]],l=new E;t.vsub(c,l);const h=a.dot(l),d=new E;s.vsub(c,d);const u=a.dot(d);if(h<0&&u>0||h>0&&u<0)return!1}return-1}static project(t,e,n,i,s){const o=t.vertices.length,a=yg;let c=0,l=0;const h=Mg,d=t.vertices;h.setZero(),jt.vectorToLocalFrame(n,i,e,a),jt.pointToLocalFrame(n,i,h,h);const u=h.dot(a);l=c=d[0].dot(a);for(let f=1;f<o;f++){const p=d[f].dot(a);p>c&&(c=p),p<l&&(l=p)}if(l-=u,c-=u,l>c){const f=l;l=c,c=f}s[0]=c,s[1]=l}}const ao=[],co=[];new E;const yg=new E,Mg=new E;class jn extends vt{constructor(t){super({type:vt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=E,s=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new Oi({vertices:s,faces:o,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new E),jn.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let s=0;s!==n.length;s++)e.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<s.length;o++)Zn.set(s[o][0],s[o][1],s[o][2]),e.vmult(Zn,Zn),t.vadd(Zn,Zn),n(Zn.x,Zn.y,Zn.z)}calculateWorldAABB(t,e,n,i){const s=this.halfExtents;pn[0].set(s.x,s.y,s.z),pn[1].set(-s.x,s.y,s.z),pn[2].set(-s.x,-s.y,s.z),pn[3].set(-s.x,-s.y,-s.z),pn[4].set(s.x,-s.y,-s.z),pn[5].set(s.x,s.y,-s.z),pn[6].set(-s.x,s.y,-s.z),pn[7].set(s.x,-s.y,s.z);const o=pn[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){const c=pn[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,d=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),d>i.z&&(i.z=d),l<n.x&&(n.x=l),h<n.y&&(n.y=h),d<n.z&&(n.z=d)}}}const Zn=new E,pn=[new E,new E,new E,new E,new E,new E,new E,new E],Ra={DYNAMIC:1,STATIC:2,KINEMATIC:4},Pa={AWAKE:0,SLEEPY:1,SLEEPING:2};class ot extends nh{constructor(t){t===void 0&&(t={}),super(),this.id=ot.idCounter++,this.index=-1,this.world=null,this.vlambda=new E,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new E,this.previousPosition=new E,this.interpolatedPosition=new E,this.initPosition=new E,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new E,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new E,this.force=new E;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?ot.STATIC:ot.DYNAMIC,typeof t.type==typeof ot.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=ot.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new E,this.quaternion=new _e,this.initQuaternion=new _e,this.previousQuaternion=new _e,this.interpolatedQuaternion=new _e,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new E,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new E,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new E,this.invInertia=new E,this.invInertiaWorld=new ln,this.invMassSolve=0,this.invInertiaSolve=new E,this.invInertiaWorldSolve=new ln,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new E(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new E(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Ke,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new E,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=ot.AWAKE,this.wakeUpAfterNarrowphase=!1,t===ot.SLEEPING&&this.dispatchEvent(ot.wakeupEvent)}sleep(){this.sleepState=ot.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===ot.AWAKE&&n<i?(this.sleepState=ot.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(ot.sleepyEvent)):e===ot.SLEEPY&&n>i?this.wakeUp():e===ot.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(ot.sleepEvent))}}updateSolveMassProperties(){this.sleepState===ot.SLEEPING||this.type===ot.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new E),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new E),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new E,s=new _e;return e&&i.copy(e),n&&s.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let s=0;s!==n;s++){const o=t[s];o.updateBoundingSphereRadius();const a=e[s].length(),c=o.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,s=Sg,o=wg,a=this.quaternion,c=this.aabb,l=Eg;for(let h=0;h!==i;h++){const d=t[h];a.vmult(e[h],s),s.vadd(this.position,s),a.mult(n[h],o),d.calculateWorldAABB(s,o,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=bg,i=Tg;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new E),this.type!==ot.DYNAMIC)return;this.sleepState===ot.SLEEPING&&this.wakeUp();const n=Ag;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new E),this.type!==ot.DYNAMIC)return;const n=Cg,i=Rg;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===ot.DYNAMIC&&(this.sleepState===ot.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new E),this.type!==ot.DYNAMIC)return;this.sleepState===ot.SLEEPING&&this.wakeUp();const n=e,i=Pg;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const s=Lg;n.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new E),this.type!==ot.DYNAMIC)return;const n=Ig,i=Dg;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=Ng;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),jn.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new E;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===ot.DYNAMIC||this.type===ot.KINEMATIC)||this.sleepState===ot.SLEEPING)return;const i=this.velocity,s=this.angularVelocity,o=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*t;i.x+=a.x*f*u.x,i.y+=a.y*f*u.y,i.z+=a.z*f*u.z;const p=d.elements,x=this.angularFactor,g=c.x*x.x,m=c.y*x.y,v=c.z*x.z;s.x+=t*(p[0]*g+p[1]*m+p[2]*v),s.y+=t*(p[3]*g+p[4]*m+p[5]*v),s.z+=t*(p[6]*g+p[7]*m+p[8]*v),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}ot.idCounter=0;ot.COLLIDE_EVENT_NAME="collide";ot.DYNAMIC=Ra.DYNAMIC;ot.STATIC=Ra.STATIC;ot.KINEMATIC=Ra.KINEMATIC;ot.AWAKE=Pa.AWAKE;ot.SLEEPY=Pa.SLEEPY;ot.SLEEPING=Pa.SLEEPING;ot.wakeupEvent={type:"wakeup"};ot.sleepyEvent={type:"sleepy"};ot.sleepEvent={type:"sleep"};const Sg=new E,wg=new _e,Eg=new Ke,bg=new ln,Tg=new ln;new ln;const Ag=new E,Cg=new E,Rg=new E,Pg=new E,Lg=new E,Ig=new E,Dg=new E,Ng=new E;class Fg{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!((t.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&t.collisionFilterMask)===0||((t.type&ot.STATIC)!==0||t.sleepState===ot.SLEEPING)&&((e.type&ot.STATIC)!==0||e.sleepState===ot.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const s=Ug;e.position.vsub(t.position,s);const o=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=Bg,i=Og,s=zg,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],s[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){const c=i[a].id,l=s[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(s[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new E;t.position.vsub(e.position,n);const i=t.shapes[0],s=e.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const Ug=new E;new E;new _e;new E;const Bg={keys:[]},Og=[],zg=[];new E;new E;new E;class ih extends Fg{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,s=i.length;let o,a;for(let c=0;c!==s;c++)for(let l=0;l!==c;l++)o=i[c],a=i[l],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const s=t.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&n.push(s)}return n}}class fr{constructor(){this.rayFromWorld=new E,this.rayToWorld=new E,this.hitNormalWorld=new E,this.hitPointWorld=new E,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,s,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=o,this.distance=a}}let sh,rh,oh,ah,ch,lh,hh;const La={CLOSEST:1,ANY:2,ALL:4};sh=vt.types.SPHERE;rh=vt.types.PLANE;oh=vt.types.BOX;ah=vt.types.CYLINDER;ch=vt.types.CONVEXPOLYHEDRON;lh=vt.types.HEIGHTFIELD;hh=vt.types.TRIMESH;class we{get[sh](){return this._intersectSphere}get[rh](){return this._intersectPlane}get[oh](){return this._intersectBox}get[ah](){return this._intersectConvex}get[ch](){return this._intersectConvex}get[lh](){return this._intersectHeightfield}get[hh](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new E),e===void 0&&(e=new E),this.from=t.clone(),this.to=e.clone(),this.direction=new E,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=we.ANY,this.result=new fr,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||we.ANY,this.result=e.result||new fr,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(jc),lo.length=0,t.broadphase.aabbQuery(t,jc,lo),this.intersectBodies(lo),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||(this.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&this.collisionFilterMask)===0)return;const i=kg,s=Gg;for(let o=0,a=t.shapes.length;o<a;o++){const c=t.shapes[o];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],s),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(c,s,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const s=this.from;if(ex(s,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,s)}_intersectPlane(t,e,n,i,s){const o=this.from,a=this.to,c=this.direction,l=new E(0,0,1);e.vmult(l,l);const h=new E;o.vsub(n,h);const d=h.dot(l);a.vsub(n,h);const u=h.dot(l);if(d*u>0||o.distanceTo(a)<d)return;const f=l.dot(c);if(Math.abs(f)<this.precision)return;const p=new E,x=new E,g=new E;o.vsub(n,p);const m=-l.dot(p)/f;c.scale(m,x),o.vadd(x,g),this.reportIntersection(l,g,s,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,s=this.from;e.x=Math.min(i.x,s.x),e.y=Math.min(i.y,s.y),e.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(t,e,n,i,s){t.data,t.elementSize;const o=Vg;o.from.copy(this.from),o.to.copy(this.to),jt.pointToLocalFrame(n,e,o.from,o.from),jt.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();const a=Hg;let c,l,h,d;c=l=0,h=d=t.data.length-1;const u=new Ke;o.getAABB(u),t.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=c;f<h;f++)for(let p=l;p<d;p++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,p,u),!!u.overlapsRay(o)){if(t.getConvexTrianglePillar(f,p,!1),jt.pointToWorldFrame(n,e,t.pillarOffset,Qs),this._intersectConvex(t.pillarConvex,e,Qs,i,s,$c),this.result.shouldStop)return;t.getConvexTrianglePillar(f,p,!0),jt.pointToWorldFrame(n,e,t.pillarOffset,Qs),this._intersectConvex(t.pillarConvex,e,Qs,i,s,$c)}}}_intersectSphere(t,e,n,i,s){const o=this.from,a=this.to,c=t.radius,l=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),d=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-c**2,u=h**2-4*l*d,f=Wg,p=qg;if(!(u<0))if(u===0)o.lerp(a,u,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,s,i,-1);else{const x=(-h-Math.sqrt(u))/(2*l),g=(-h+Math.sqrt(u))/(2*l);if(x>=0&&x<=1&&(o.lerp(a,x,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,s,i,-1)),this.result.shouldStop)return;g>=0&&g<=1&&(o.lerp(a,g,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,s,i,-1))}}_intersectConvex(t,e,n,i,s,o){const a=Xg,c=Jc,l=o&&o.faceList||null,h=t.faces,d=t.vertices,u=t.faceNormals,f=this.direction,p=this.from,x=this.to,g=p.distanceTo(x),m=l?l.length:h.length,v=this.result;for(let _=0;!v.shouldStop&&_<m;_++){const y=l?l[_]:_,b=h[y],T=u[y],C=e,I=n;c.copy(d[b[0]]),C.vmult(c,c),c.vadd(I,c),c.vsub(p,c),C.vmult(T,a);const M=f.dot(a);if(Math.abs(M)<this.precision)continue;const w=a.dot(c)/M;if(!(w<0)){f.scale(w,Ve),Ve.vadd(p,Ve),on.copy(d[b[0]]),C.vmult(on,on),I.vadd(on,on);for(let P=1;!v.shouldStop&&P<b.length-1;P++){mn.copy(d[b[P]]),gn.copy(d[b[P+1]]),C.vmult(mn,mn),C.vmult(gn,gn),I.vadd(mn,mn),I.vadd(gn,gn);const U=Ve.distanceTo(p);!(we.pointInTriangle(Ve,on,mn,gn)||we.pointInTriangle(Ve,mn,on,gn))||U>g||this.reportIntersection(a,Ve,s,i,y)}}}}_intersectTrimesh(t,e,n,i,s,o){const a=Yg,c=Qg,l=tx,h=Jc,d=Zg,u=Kg,f=jg,p=Jg,x=$g,g=t.indices;t.vertices;const m=this.from,v=this.to,_=this.direction;l.position.copy(n),l.quaternion.copy(e),jt.vectorToLocalFrame(n,e,_,d),jt.pointToLocalFrame(n,e,m,u),jt.pointToLocalFrame(n,e,v,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,f.vsub(u,d),d.normalize();const y=u.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let b=0,T=c.length;!this.result.shouldStop&&b!==T;b++){const C=c[b];t.getNormal(C,a),t.getVertex(g[C*3],on),on.vsub(u,h);const I=d.dot(a),M=a.dot(h)/I;if(M<0)continue;d.scale(M,Ve),Ve.vadd(u,Ve),t.getVertex(g[C*3+1],mn),t.getVertex(g[C*3+2],gn);const w=Ve.distanceSquared(u);!(we.pointInTriangle(Ve,mn,on,gn)||we.pointInTriangle(Ve,on,mn,gn))||w>y||(jt.vectorToWorldFrame(e,a,x),jt.pointToWorldFrame(n,e,Ve,p),this.reportIntersection(x,p,s,i,C))}c.length=0}reportIntersection(t,e,n,i,s){const o=this.from,a=this.to,c=o.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case we.ALL:this.hasHit=!0,l.set(o,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case we.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c));break;case we.ANY:this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,fi),n.vsub(e,rs),t.vsub(e,ho);const s=fi.dot(fi),o=fi.dot(rs),a=fi.dot(ho),c=rs.dot(rs),l=rs.dot(ho);let h,d;return(h=c*a-o*l)>=0&&(d=s*l-o*a)>=0&&h+d<s*c-o*o}}we.CLOSEST=La.CLOSEST;we.ANY=La.ANY;we.ALL=La.ALL;const jc=new Ke,lo=[],rs=new E,ho=new E,kg=new E,Gg=new _e,Ve=new E,on=new E,mn=new E,gn=new E;new E;new fr;const $c={faceList:[0]},Qs=new E,Vg=new we,Hg=[],Wg=new E,qg=new E,Xg=new E;new E;new E;const Jc=new E,Yg=new E,Zg=new E,Kg=new E,jg=new E,$g=new E,Jg=new E;new Ke;const Qg=[],tx=new jt,fi=new E,tr=new E;function ex(r,t,e){e.vsub(r,fi);const n=fi.dot(t);return t.scale(n,tr),tr.vadd(r,tr),e.distanceTo(tr)}class nx{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class Qc{constructor(){this.spatial=new E,this.rotational=new E}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class bs{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=bs.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Qc,this.jacobianElementB=new Qc,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,s=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*s*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),s=this.computeGq(),o=this.computeGiMf();return-s*t-i*e-o*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,o=i.position;return t.spatial.dot(s)+e.spatial.dot(o)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,o=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(s,a)+e.multiplyVectors(o,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,o=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(s,a)+e.multiplyVectors(o,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,o=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return s.scale(l,tl),a.scale(h,el),n.invInertiaWorldSolve.vmult(o,nl),i.invInertiaWorldSolve.vmult(c,il),t.multiplyVectors(tl,nl)+e.multiplyVectors(el,il)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=s+o;return a.vmult(t.rotational,er),l+=er.dot(t.rotational),c.vmult(e.rotational,er),l+=er.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,o=ix;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,o),s.wlambda.addScaledVector(t,o,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}bs.idCounter=0;const tl=new E,el=new E,nl=new E,il=new E,er=new E,ix=new E;class sx extends bs{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new E,this.rj=new E,this.ni=new E}computeB(t){const e=this.a,n=this.b,i=this.bi,s=this.bj,o=this.ri,a=this.rj,c=rx,l=ox,h=i.velocity,d=i.angularVelocity;i.force,i.torque;const u=s.velocity,f=s.angularVelocity;s.force,s.torque;const p=ax,x=this.jacobianElementA,g=this.jacobianElementB,m=this.ni;o.cross(m,c),a.cross(m,l),m.negate(x.spatial),c.negate(x.rotational),g.spatial.copy(m),g.rotational.copy(l),p.copy(s.position),p.vadd(a,p),p.vsub(i.position,p),p.vsub(o,p);const v=m.dot(p),_=this.restitution+1,y=_*u.dot(m)-_*h.dot(m)+f.dot(l)-d.dot(c),b=this.computeGiMf();return-v*e-y*n-t*b}getImpactVelocityAlongNormal(){const t=cx,e=lx,n=hx,i=ux,s=dx;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,s),this.ni.dot(s)}}const rx=new E,ox=new E,ax=new E,cx=new E,lx=new E,hx=new E,ux=new E,dx=new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;class sl extends bs{constructor(t,e,n){super(t,e,-n,n),this.ri=new E,this.rj=new E,this.t=new E}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,s=fx,o=px,a=this.t;n.cross(a,s),i.cross(a,o);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),s.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(o);const h=this.computeGW(),d=this.computeGiMf();return-h*e-t*d}}const fx=new E,px=new E;class Sr{constructor(t,e,n){n=nx.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Sr.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}Sr.idCounter=0;class Sn{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Sn.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Sn.idCounter=0;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new we;new E;new E;new E;new E(1,0,0),new E(0,1,0),new E(0,0,1);new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;class pr extends vt{constructor(t){if(super({type:vt.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new E);const n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){const s=this.radius,o=["x","y","z"];for(let a=0;a<o.length;a++){const c=o[a];n[c]=t[c]-s,i[c]=t[c]+s}}}new E;new E;new E;new E;new E;new E;new E;new E;new E;class ji extends Oi{constructor(t,e,n,i){if(t===void 0&&(t=1),e===void 0&&(e=1),n===void 0&&(n=1),i===void 0&&(i=8),t<0)throw new Error("The cylinder radiusTop cannot be negative.");if(e<0)throw new Error("The cylinder radiusBottom cannot be negative.");const s=i,o=[],a=[],c=[],l=[],h=[],d=Math.cos,u=Math.sin;o.push(new E(-e*u(0),-n*.5,e*d(0))),l.push(0),o.push(new E(-t*u(0),n*.5,t*d(0))),h.push(1);for(let p=0;p<s;p++){const x=2*Math.PI/s*(p+1),g=2*Math.PI/s*(p+.5);p<s-1?(o.push(new E(-e*u(x),-n*.5,e*d(x))),l.push(2*p+2),o.push(new E(-t*u(x),n*.5,t*d(x))),h.push(2*p+3),c.push([2*p,2*p+1,2*p+3,2*p+2])):c.push([2*p,2*p+1,1,0]),(s%2===1||p<s/2)&&a.push(new E(-u(g),0,d(g)))}c.push(l),a.push(new E(0,1,0));const f=[];for(let p=0;p<h.length;p++)f.push(h[h.length-p-1]);c.push(f),super({vertices:o,faces:c,axes:a}),this.type=vt.types.CYLINDER,this.radiusTop=t,this.radiusBottom=e,this.height=n,this.numSegments=i}}new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new Ke;new E;new Ke;new E;new E;new E;new E;new E;new E;new E;new Ke;new E;new jt;new Ke;class mx{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class gx extends mx{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,s=this.tolerance*this.tolerance,o=this.equations,a=o.length,c=e.bodies,l=c.length,h=t;let d,u,f,p,x,g;if(a!==0)for(let y=0;y!==l;y++)c[y].updateSolveMassProperties();const m=vx,v=_x,_=xx;m.length=a,v.length=a,_.length=a;for(let y=0;y!==a;y++){const b=o[y];_[y]=0,v[y]=b.computeB(h),m[y]=1/b.computeC()}if(a!==0){for(let T=0;T!==l;T++){const C=c[T],I=C.vlambda,M=C.wlambda;I.set(0,0,0),M.set(0,0,0)}for(n=0;n!==i;n++){p=0;for(let T=0;T!==a;T++){const C=o[T];d=v[T],u=m[T],g=_[T],x=C.computeGWlambda(),f=u*(d-x-C.eps*g),g+f<C.minForce?f=C.minForce-g:g+f>C.maxForce&&(f=C.maxForce-g),_[T]+=f,p+=f>0?f:-f,C.addToWlambda(f)}if(p*p<s)break}for(let T=0;T!==l;T++){const C=c[T],I=C.velocity,M=C.angularVelocity;C.vlambda.vmul(C.linearFactor,C.vlambda),I.vadd(C.vlambda,I),C.wlambda.vmul(C.angularFactor,C.wlambda),M.vadd(C.wlambda,M)}let y=o.length;const b=1/h;for(;y--;)o[y].multiplier=_[y]*b}return n}}const xx=[],vx=[],_x=[];class yx{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class Mx extends yx{constructor(){super(...arguments),this.type=E}constructObject(){return new E}}const ue={sphereSphere:vt.types.SPHERE,spherePlane:vt.types.SPHERE|vt.types.PLANE,boxBox:vt.types.BOX|vt.types.BOX,sphereBox:vt.types.SPHERE|vt.types.BOX,planeBox:vt.types.PLANE|vt.types.BOX,convexConvex:vt.types.CONVEXPOLYHEDRON,sphereConvex:vt.types.SPHERE|vt.types.CONVEXPOLYHEDRON,planeConvex:vt.types.PLANE|vt.types.CONVEXPOLYHEDRON,boxConvex:vt.types.BOX|vt.types.CONVEXPOLYHEDRON,sphereHeightfield:vt.types.SPHERE|vt.types.HEIGHTFIELD,boxHeightfield:vt.types.BOX|vt.types.HEIGHTFIELD,convexHeightfield:vt.types.CONVEXPOLYHEDRON|vt.types.HEIGHTFIELD,sphereParticle:vt.types.PARTICLE|vt.types.SPHERE,planeParticle:vt.types.PLANE|vt.types.PARTICLE,boxParticle:vt.types.BOX|vt.types.PARTICLE,convexParticle:vt.types.PARTICLE|vt.types.CONVEXPOLYHEDRON,cylinderCylinder:vt.types.CYLINDER,sphereCylinder:vt.types.SPHERE|vt.types.CYLINDER,planeCylinder:vt.types.PLANE|vt.types.CYLINDER,boxCylinder:vt.types.BOX|vt.types.CYLINDER,convexCylinder:vt.types.CONVEXPOLYHEDRON|vt.types.CYLINDER,heightfieldCylinder:vt.types.HEIGHTFIELD|vt.types.CYLINDER,particleCylinder:vt.types.PARTICLE|vt.types.CYLINDER,sphereTrimesh:vt.types.SPHERE|vt.types.TRIMESH,planeTrimesh:vt.types.PLANE|vt.types.TRIMESH};class Sx{get[ue.sphereSphere](){return this.sphereSphere}get[ue.spherePlane](){return this.spherePlane}get[ue.boxBox](){return this.boxBox}get[ue.sphereBox](){return this.sphereBox}get[ue.planeBox](){return this.planeBox}get[ue.convexConvex](){return this.convexConvex}get[ue.sphereConvex](){return this.sphereConvex}get[ue.planeConvex](){return this.planeConvex}get[ue.boxConvex](){return this.boxConvex}get[ue.sphereHeightfield](){return this.sphereHeightfield}get[ue.boxHeightfield](){return this.boxHeightfield}get[ue.convexHeightfield](){return this.convexHeightfield}get[ue.sphereParticle](){return this.sphereParticle}get[ue.planeParticle](){return this.planeParticle}get[ue.boxParticle](){return this.boxParticle}get[ue.convexParticle](){return this.convexParticle}get[ue.cylinderCylinder](){return this.convexConvex}get[ue.sphereCylinder](){return this.sphereConvex}get[ue.planeCylinder](){return this.planeConvex}get[ue.boxCylinder](){return this.boxConvex}get[ue.convexCylinder](){return this.convexConvex}get[ue.heightfieldCylinder](){return this.heightfieldCylinder}get[ue.particleCylinder](){return this.particleCylinder}get[ue.sphereTrimesh](){return this.sphereTrimesh}get[ue.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new Mx,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,s,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new sx(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=s||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,s=t.si,o=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=s.material||n.material,d=o.material||i.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(l=h.friction*d.friction),l>0){const u=l*(a.frictionGravity||a.gravity).length();let f=n.invMass+i.invMass;f>0&&(f=1/f);const p=this.frictionEquationPool,x=p.length?p.pop():new sl(n,i,u*f),g=p.length?p.pop():new sl(n,i,u*f);return x.bi=g.bi=n,x.bj=g.bj=i,x.minForce=g.minForce=-u*f,x.maxForce=g.maxForce=u*f,x.ri.copy(t.ri),x.rj.copy(t.rj),g.ri.copy(t.ri),g.rj.copy(t.rj),t.ni.tangents(x.t,g.t),x.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),g.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),x.enabled=g.enabled=t.enabled,e.push(x,g),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];li.setZero(),Ni.setZero(),Fi.setZero();const s=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==s?(li.vadd(e.ni,li),Ni.vadd(e.ri,Ni),Fi.vadd(e.rj,Fi)):(li.vsub(e.ni,li),Ni.vadd(e.rj,Ni),Fi.vadd(e.ri,Fi));const o=1/t;Ni.scale(o,n.ri),Fi.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),li.normalize(),li.tangents(n.t,i.t)}getContacts(t,e,n,i,s,o,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;const c=bx,l=Tx,h=wx,d=Ex;for(let u=0,f=t.length;u!==f;u++){const p=t[u],x=e[u];let g=null;p.material&&x.material&&(g=n.getContactMaterial(p.material,x.material)||null);const m=p.type&ot.KINEMATIC&&x.type&ot.STATIC||p.type&ot.STATIC&&x.type&ot.KINEMATIC||p.type&ot.KINEMATIC&&x.type&ot.KINEMATIC;for(let v=0;v<p.shapes.length;v++){p.quaternion.mult(p.shapeOrientations[v],c),p.quaternion.vmult(p.shapeOffsets[v],h),h.vadd(p.position,h);const _=p.shapes[v];for(let y=0;y<x.shapes.length;y++){x.quaternion.mult(x.shapeOrientations[y],l),x.quaternion.vmult(x.shapeOffsets[y],d),d.vadd(x.position,d);const b=x.shapes[y];if(!(_.collisionFilterMask&b.collisionFilterGroup&&b.collisionFilterMask&_.collisionFilterGroup)||h.distanceTo(d)>_.boundingSphereRadius+b.boundingSphereRadius)continue;let T=null;_.material&&b.material&&(T=n.getContactMaterial(_.material,b.material)||null),this.currentContactMaterial=T||g||n.defaultContactMaterial;const C=_.type|b.type,I=this[C];if(I){let M=!1;_.type<b.type?M=I.call(this,_,b,h,d,c,l,p,x,_,b,m):M=I.call(this,b,_,d,h,l,c,x,p,_,b,m),M&&m&&(n.shapeOverlapKeeper.set(_.id,b.id),n.bodyOverlapKeeper.set(p.id,x.id))}}}}}sphereSphere(t,e,n,i,s,o,a,c,l,h,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;const u=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(t.radius,u.ri),u.rj.scale(-e.radius,u.rj),u.ri.vadd(n,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(i,u.rj),u.rj.vsub(c.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(t,e,n,i,s,o,a,c,l,h,d){const u=this.createContactEquation(a,c,t,e,l,h);if(u.ni.set(0,0,1),o.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(t.radius,u.ri),n.vsub(i,nr),u.ni.scale(u.ni.dot(nr),rl),nr.vsub(rl,u.rj),-nr.dot(u.ni)<=t.radius){if(d)return!0;const f=u.ri,p=u.rj;f.vadd(n,f),f.vsub(a.position,f),p.vadd(i,p),p.vsub(c.position,p),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(t,e,n,i,s,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,s,o,a,c,t,e,d)}sphereBox(t,e,n,i,s,o,a,c,l,h,d){const u=this.v3pool,f=Jx;n.vsub(i,ir),e.getSideNormals(f,o);const p=t.radius;let x=!1;const g=tv,m=ev,v=nv;let _=null,y=0,b=0,T=0,C=null;for(let D=0,V=f.length;D!==V&&x===!1;D++){const q=Kx;q.copy(f[D]);const $=q.length();q.normalize();const nt=ir.dot(q);if(nt<$+p&&nt>0){const st=jx,rt=$x;st.copy(f[(D+1)%3]),rt.copy(f[(D+2)%3]);const Dt=st.length(),se=rt.length();st.normalize(),rt.normalize();const Qt=ir.dot(st),K=ir.dot(rt);if(Qt<Dt&&Qt>-Dt&&K<se&&K>-se){const Q=Math.abs(nt-$-p);if((C===null||Q<C)&&(C=Q,b=Qt,T=K,_=$,g.copy(q),m.copy(st),v.copy(rt),y++,d))return!0}}}if(y){x=!0;const D=this.createContactEquation(a,c,t,e,l,h);g.scale(-p,D.ri),D.ni.copy(g),D.ni.negate(D.ni),g.scale(_,g),m.scale(b,m),g.vadd(m,g),v.scale(T,v),g.vadd(v,D.rj),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),D.rj.vadd(i,D.rj),D.rj.vsub(c.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}let I=u.get();const M=Qx;for(let D=0;D!==2&&!x;D++)for(let V=0;V!==2&&!x;V++)for(let q=0;q!==2&&!x;q++)if(I.set(0,0,0),D?I.vadd(f[0],I):I.vsub(f[0],I),V?I.vadd(f[1],I):I.vsub(f[1],I),q?I.vadd(f[2],I):I.vsub(f[2],I),i.vadd(I,M),M.vsub(n,M),M.lengthSquared()<p*p){if(d)return!0;x=!0;const $=this.createContactEquation(a,c,t,e,l,h);$.ri.copy(M),$.ri.normalize(),$.ni.copy($.ri),$.ri.scale(p,$.ri),$.rj.copy(I),$.ri.vadd(n,$.ri),$.ri.vsub(a.position,$.ri),$.rj.vadd(i,$.rj),$.rj.vsub(c.position,$.rj),this.result.push($),this.createFrictionEquationsFromContact($,this.frictionResult)}u.release(I),I=null;const w=u.get(),P=u.get(),U=u.get(),L=u.get(),O=u.get(),B=f.length;for(let D=0;D!==B&&!x;D++)for(let V=0;V!==B&&!x;V++)if(D%3!==V%3){f[V].cross(f[D],w),w.normalize(),f[D].vadd(f[V],P),U.copy(n),U.vsub(P,U),U.vsub(i,U);const q=U.dot(w);w.scale(q,L);let $=0;for(;$===D%3||$===V%3;)$++;O.copy(n),O.vsub(L,O),O.vsub(P,O),O.vsub(i,O);const nt=Math.abs(q),st=O.length();if(nt<f[$].length()&&st<p){if(d)return!0;x=!0;const rt=this.createContactEquation(a,c,t,e,l,h);P.vadd(L,rt.rj),rt.rj.copy(rt.rj),O.negate(rt.ni),rt.ni.normalize(),rt.ri.copy(rt.rj),rt.ri.vadd(i,rt.ri),rt.ri.vsub(n,rt.ri),rt.ri.normalize(),rt.ri.scale(p,rt.ri),rt.ri.vadd(n,rt.ri),rt.ri.vsub(a.position,rt.ri),rt.rj.vadd(i,rt.rj),rt.rj.vsub(c.position,rt.rj),this.result.push(rt),this.createFrictionEquationsFromContact(rt,this.frictionResult)}}u.release(w,P,U,L,O)}planeBox(t,e,n,i,s,o,a,c,l,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,s,o,a,c,t,e,d)}convexConvex(t,e,n,i,s,o,a,c,l,h,d,u,f){const p=xv;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,s,i,o,p,u,f)){const x=[],g=vv;t.clipAgainstHull(n,s,e,i,o,p,-100,100,x);let m=0;for(let v=0;v!==x.length;v++){if(d)return!0;const _=this.createContactEquation(a,c,t,e,l,h),y=_.ri,b=_.rj;p.negate(_.ni),x[v].normal.negate(g),g.scale(x[v].depth,g),x[v].point.vadd(g,y),b.copy(x[v].point),y.vsub(n,y),b.vsub(i,b),y.vadd(n,y),y.vsub(a.position,y),b.vadd(i,b),b.vsub(c.position,b),this.result.push(_),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(_,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(t,e,n,i,s,o,a,c,l,h,d){const u=this.v3pool;n.vsub(i,iv);const f=e.faceNormals,p=e.faces,x=e.vertices,g=t.radius;let m=!1;for(let v=0;v!==x.length;v++){const _=x[v],y=av;o.vmult(_,y),i.vadd(y,y);const b=ov;if(y.vsub(n,b),b.lengthSquared()<g*g){if(d)return!0;m=!0;const T=this.createContactEquation(a,c,t,e,l,h);T.ri.copy(b),T.ri.normalize(),T.ni.copy(T.ri),T.ri.scale(g,T.ri),y.vsub(i,T.rj),T.ri.vadd(n,T.ri),T.ri.vsub(a.position,T.ri),T.rj.vadd(i,T.rj),T.rj.vsub(c.position,T.rj),this.result.push(T),this.createFrictionEquationsFromContact(T,this.frictionResult);return}}for(let v=0,_=p.length;v!==_&&m===!1;v++){const y=f[v],b=p[v],T=cv;o.vmult(y,T);const C=lv;o.vmult(x[b[0]],C),C.vadd(i,C);const I=hv;T.scale(-g,I),n.vadd(I,I);const M=uv;I.vsub(C,M);const w=M.dot(T),P=dv;if(n.vsub(C,P),w<0&&P.dot(T)>0){const U=[];for(let L=0,O=b.length;L!==O;L++){const B=u.get();o.vmult(x[b[L]],B),i.vadd(B,B),U.push(B)}if(Zx(U,T,n)){if(d)return!0;m=!0;const L=this.createContactEquation(a,c,t,e,l,h);T.scale(-g,L.ri),T.negate(L.ni);const O=u.get();T.scale(-w,O);const B=u.get();T.scale(-g,B),n.vsub(i,L.rj),L.rj.vadd(B,L.rj),L.rj.vadd(O,L.rj),L.rj.vadd(i,L.rj),L.rj.vsub(c.position,L.rj),L.ri.vadd(n,L.ri),L.ri.vsub(a.position,L.ri),u.release(O),u.release(B),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult);for(let D=0,V=U.length;D!==V;D++)u.release(U[D]);return}else for(let L=0;L!==b.length;L++){const O=u.get(),B=u.get();o.vmult(x[b[(L+1)%b.length]],O),o.vmult(x[b[(L+2)%b.length]],B),i.vadd(O,O),i.vadd(B,B);const D=sv;B.vsub(O,D);const V=rv;D.unit(V);const q=u.get(),$=u.get();n.vsub(O,$);const nt=$.dot(V);V.scale(nt,q),q.vadd(O,q);const st=u.get();if(q.vsub(n,st),nt>0&&nt*nt<D.lengthSquared()&&st.lengthSquared()<g*g){if(d)return!0;const rt=this.createContactEquation(a,c,t,e,l,h);q.vsub(i,rt.rj),q.vsub(n,rt.ni),rt.ni.normalize(),rt.ni.scale(g,rt.ri),rt.rj.vadd(i,rt.rj),rt.rj.vsub(c.position,rt.rj),rt.ri.vadd(n,rt.ri),rt.ri.vsub(a.position,rt.ri),this.result.push(rt),this.createFrictionEquationsFromContact(rt,this.frictionResult);for(let Dt=0,se=U.length;Dt!==se;Dt++)u.release(U[Dt]);u.release(O),u.release(B),u.release(q),u.release(st),u.release($);return}u.release(O),u.release(B),u.release(q),u.release(st),u.release($)}for(let L=0,O=U.length;L!==O;L++)u.release(U[L])}}}planeConvex(t,e,n,i,s,o,a,c,l,h,d){const u=fv,f=pv;f.set(0,0,1),s.vmult(f,f);let p=0;const x=mv;for(let g=0;g!==e.vertices.length;g++)if(u.copy(e.vertices[g]),o.vmult(u,u),i.vadd(u,u),u.vsub(n,x),f.dot(x)<=0){if(d)return!0;const v=this.createContactEquation(a,c,t,e,l,h),_=gv;f.scale(f.dot(x),_),u.vsub(_,_),_.vsub(n,v.ri),v.ni.copy(f),u.vsub(i,v.rj),v.ri.vadd(n,v.ri),v.ri.vsub(a.position,v.ri),v.rj.vadd(i,v.rj),v.rj.vsub(c.position,v.rj),this.result.push(v),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(v,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}boxConvex(t,e,n,i,s,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,d)}sphereHeightfield(t,e,n,i,s,o,a,c,l,h,d){const u=e.data,f=t.radius,p=e.elementSize,x=Pv,g=Rv;jt.pointToLocalFrame(i,o,n,g);let m=Math.floor((g.x-f)/p)-1,v=Math.ceil((g.x+f)/p)+1,_=Math.floor((g.y-f)/p)-1,y=Math.ceil((g.y+f)/p)+1;if(v<0||y<0||m>u.length||_>u[0].length)return;m<0&&(m=0),v<0&&(v=0),_<0&&(_=0),y<0&&(y=0),m>=u.length&&(m=u.length-1),v>=u.length&&(v=u.length-1),y>=u[0].length&&(y=u[0].length-1),_>=u[0].length&&(_=u[0].length-1);const b=[];e.getRectMinMax(m,_,v,y,b);const T=b[0],C=b[1];if(g.z-f>C||g.z+f<T)return;const I=this.result;for(let M=m;M<v;M++)for(let w=_;w<y;w++){const P=I.length;let U=!1;if(e.getConvexTrianglePillar(M,w,!1),jt.pointToWorldFrame(i,o,e.pillarOffset,x),n.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.sphereConvex(t,e.pillarConvex,n,x,s,o,a,c,t,e,d)),d&&U||(e.getConvexTrianglePillar(M,w,!0),jt.pointToWorldFrame(i,o,e.pillarOffset,x),n.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.sphereConvex(t,e.pillarConvex,n,x,s,o,a,c,t,e,d)),d&&U))return!0;if(I.length-P>2)return}}boxHeightfield(t,e,n,i,s,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,d)}convexHeightfield(t,e,n,i,s,o,a,c,l,h,d){const u=e.data,f=e.elementSize,p=t.boundingSphereRadius,x=Av,g=Cv,m=Tv;jt.pointToLocalFrame(i,o,n,m);let v=Math.floor((m.x-p)/f)-1,_=Math.ceil((m.x+p)/f)+1,y=Math.floor((m.y-p)/f)-1,b=Math.ceil((m.y+p)/f)+1;if(_<0||b<0||v>u.length||y>u[0].length)return;v<0&&(v=0),_<0&&(_=0),y<0&&(y=0),b<0&&(b=0),v>=u.length&&(v=u.length-1),_>=u.length&&(_=u.length-1),b>=u[0].length&&(b=u[0].length-1),y>=u[0].length&&(y=u[0].length-1);const T=[];e.getRectMinMax(v,y,_,b,T);const C=T[0],I=T[1];if(!(m.z-p>I||m.z+p<C))for(let M=v;M<_;M++)for(let w=y;w<b;w++){let P=!1;if(e.getConvexTrianglePillar(M,w,!1),jt.pointToWorldFrame(i,o,e.pillarOffset,x),n.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.convexConvex(t,e.pillarConvex,n,x,s,o,a,c,null,null,d,g,null)),d&&P||(e.getConvexTrianglePillar(M,w,!0),jt.pointToWorldFrame(i,o,e.pillarOffset,x),n.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.convexConvex(t,e.pillarConvex,n,x,s,o,a,c,null,null,d,g,null)),d&&P))return!0}}sphereParticle(t,e,n,i,s,o,a,c,l,h,d){const u=Sv;if(u.set(0,0,1),i.vsub(n,u),u.lengthSquared()<=t.radius*t.radius){if(d)return!0;const p=this.createContactEquation(c,a,e,t,l,h);u.normalize(),p.rj.copy(u),p.rj.scale(t.radius,p.rj),p.ni.copy(u),p.ni.negate(p.ni),p.ri.set(0,0,0),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}}planeParticle(t,e,n,i,s,o,a,c,l,h,d){const u=_v;u.set(0,0,1),a.quaternion.vmult(u,u);const f=yv;if(i.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;const x=this.createContactEquation(c,a,e,t,l,h);x.ni.copy(u),x.ni.negate(x.ni),x.ri.set(0,0,0);const g=Mv;u.scale(u.dot(i),g),i.vsub(g,g),x.rj.copy(g),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}boxParticle(t,e,n,i,s,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,d)}convexParticle(t,e,n,i,s,o,a,c,l,h,d){let u=-1;const f=Ev,p=bv;let x=null;const g=wv;if(g.copy(i),g.vsub(n,g),s.conjugate(ol),ol.vmult(g,g),t.pointIsInside(g)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let m=0,v=t.faces.length;m!==v;m++){const _=[t.worldVertices[t.faces[m][0]]],y=t.worldFaceNormals[m];i.vsub(_[0],al);const b=-y.dot(al);if(x===null||Math.abs(b)<Math.abs(x)){if(d)return!0;x=b,u=m,f.copy(y)}}if(u!==-1){const m=this.createContactEquation(c,a,e,t,l,h);f.scale(x,p),p.vadd(i,p),p.vsub(n,p),m.rj.copy(p),f.negate(m.ni),m.ri.set(0,0,0);const v=m.ri,_=m.rj;v.vadd(i,v),v.vsub(c.position,v),_.vadd(n,_),_.vsub(a.position,_),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,s,o,a,c,l,h,d){return this.convexHeightfield(e,t,i,n,o,s,c,a,l,h,d)}particleCylinder(t,e,n,i,s,o,a,c,l,h,d){return this.convexParticle(e,t,i,n,o,s,c,a,l,h,d)}sphereTrimesh(t,e,n,i,s,o,a,c,l,h,d){const u=Nx,f=Fx,p=Ux,x=Bx,g=Ox,m=zx,v=Hx,_=Dx,y=Lx,b=Wx;jt.pointToLocalFrame(i,o,n,g);const T=t.radius;v.lowerBound.set(g.x-T,g.y-T,g.z-T),v.upperBound.set(g.x+T,g.y+T,g.z+T),e.getTrianglesInAABB(v,b);const C=Ix,I=t.radius*t.radius;for(let L=0;L<b.length;L++)for(let O=0;O<3;O++)if(e.getVertex(e.indices[b[L]*3+O],C),C.vsub(g,y),y.lengthSquared()<=I){if(_.copy(C),jt.pointToWorldFrame(i,o,_,C),C.vsub(n,y),d)return!0;let B=this.createContactEquation(a,c,t,e,l,h);B.ni.copy(y),B.ni.normalize(),B.ri.copy(B.ni),B.ri.scale(t.radius,B.ri),B.ri.vadd(n,B.ri),B.ri.vsub(a.position,B.ri),B.rj.copy(C),B.rj.vsub(c.position,B.rj),this.result.push(B),this.createFrictionEquationsFromContact(B,this.frictionResult)}for(let L=0;L<b.length;L++)for(let O=0;O<3;O++){e.getVertex(e.indices[b[L]*3+O],u),e.getVertex(e.indices[b[L]*3+(O+1)%3],f),f.vsub(u,p),g.vsub(f,m);const B=m.dot(p);g.vsub(u,m);let D=m.dot(p);if(D>0&&B<0&&(g.vsub(u,m),x.copy(p),x.normalize(),D=m.dot(x),x.scale(D,m),m.vadd(u,m),m.distanceTo(g)<t.radius)){if(d)return!0;const q=this.createContactEquation(a,c,t,e,l,h);m.vsub(g,q.ni),q.ni.normalize(),q.ni.scale(t.radius,q.ri),q.ri.vadd(n,q.ri),q.ri.vsub(a.position,q.ri),jt.pointToWorldFrame(i,o,m,m),m.vsub(c.position,q.rj),jt.vectorToWorldFrame(o,q.ni,q.ni),jt.vectorToWorldFrame(o,q.ri,q.ri),this.result.push(q),this.createFrictionEquationsFromContact(q,this.frictionResult)}}const M=kx,w=Gx,P=Vx,U=Px;for(let L=0,O=b.length;L!==O;L++){e.getTriangleVertices(b[L],M,w,P),e.getNormal(b[L],U),g.vsub(M,m);let B=m.dot(U);if(U.scale(B,m),g.vsub(m,m),B=m.distanceTo(g),we.pointInTriangle(m,M,w,P)&&B<t.radius){if(d)return!0;let D=this.createContactEquation(a,c,t,e,l,h);m.vsub(g,D.ni),D.ni.normalize(),D.ni.scale(t.radius,D.ri),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),jt.pointToWorldFrame(i,o,m,m),m.vsub(c.position,D.rj),jt.vectorToWorldFrame(o,D.ni,D.ni),jt.vectorToWorldFrame(o,D.ri,D.ri),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}}b.length=0}planeTrimesh(t,e,n,i,s,o,a,c,l,h,d){const u=new E,f=Ax;f.set(0,0,1),s.vmult(f,f);for(let p=0;p<e.vertices.length/3;p++){e.getVertex(p,u);const x=new E;x.copy(u),jt.pointToWorldFrame(i,o,x,u);const g=Cx;if(u.vsub(n,g),f.dot(g)<=0){if(d)return!0;const v=this.createContactEquation(a,c,t,e,l,h);v.ni.copy(f);const _=Rx;f.scale(g.dot(f),_),u.vsub(_,_),v.ri.copy(_),v.ri.vsub(a.position,v.ri),v.rj.copy(u),v.rj.vsub(c.position,v.rj),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}}}const li=new E,Ni=new E,Fi=new E,wx=new E,Ex=new E,bx=new _e,Tx=new _e,Ax=new E,Cx=new E,Rx=new E,Px=new E,Lx=new E;new E;const Ix=new E,Dx=new E,Nx=new E,Fx=new E,Ux=new E,Bx=new E,Ox=new E,zx=new E,kx=new E,Gx=new E,Vx=new E,Hx=new Ke,Wx=[],nr=new E,rl=new E,qx=new E,Xx=new E,Yx=new E;function Zx(r,t,e){let n=null;const i=r.length;for(let s=0;s!==i;s++){const o=r[s],a=qx;r[(s+1)%i].vsub(o,a);const c=Xx;a.cross(t,c);const l=Yx;e.vsub(o,l);const h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const ir=new E,Kx=new E,jx=new E,$x=new E,Jx=[new E,new E,new E,new E,new E,new E],Qx=new E,tv=new E,ev=new E,nv=new E,iv=new E,sv=new E,rv=new E,ov=new E,av=new E,cv=new E,lv=new E,hv=new E,uv=new E,dv=new E;new E;new E;const fv=new E,pv=new E,mv=new E,gv=new E,xv=new E,vv=new E,_v=new E,yv=new E,Mv=new E,Sv=new E,ol=new _e,wv=new E;new E;const Ev=new E,al=new E,bv=new E,Tv=new E,Av=new E,Cv=[0],Rv=new E,Pv=new E;class cl{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let o=i.length-1;o>=s;o--)i[o+1]=i[o];i[s]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,s=n.length,o=i.length;let a=0;for(let c=0;c<s;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=h===i[a],l||ll(t,h)}a=0;for(let c=0;c<o;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||ll(e,h)}}}function ll(r,t){r.push((t&4294901760)>>16,t&65535)}const uo=(r,t)=>r<t?`${r}-${t}`:`${t}-${r}`;class Lv{constructor(){this.data={keys:[]}}get(t,e){const n=uo(t,e);return this.data[n]}set(t,e,n){const i=uo(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=uo(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class Iv extends nh{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new E,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new E,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new ih,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new gx,this.constraints=[],this.narrowphase=new Sx(this),this.collisionMatrix=new Zc,this.collisionMatrixPrevious=new Zc,this.bodyOverlapKeeper=new cl,this.shapeOverlapKeeper=new cl,this.contactmaterials=[],this.contactMaterialTable=new Lv,this.defaultMaterial=new Sn("default"),this.defaultContactMaterial=new Sr(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof fr?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=we.ALL,n.from=t,n.to=e,n.callback=i,fo.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=we.ANY,n.from=t,n.to=e,n.result=i,fo.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=we.CLOSEST,n.from=t,n.to=e,n.result=i,fo.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof ot&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let s=0;s<i.length;s++){const o=i[s];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Ee.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Ee.now();let s=0;for(;this.accumulator>=t&&s<n&&(this.internalStep(t),this.accumulator-=t,s++,!(Ee.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,o,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,o,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=Bv,i=Ov,s=this.bodies.length,o=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,d=ot.DYNAMIC;let u=-1/0;const f=this.constraints,p=Uv;c.length();const x=c.x,g=c.y,m=c.z;let v=0;for(l&&(u=Ee.now()),v=0;v!==s;v++){const L=o[v];if(L.type===d){const O=L.force,B=L.mass;O.x+=B*x,O.y+=B*g,O.z+=B*m}}for(let L=0,O=this.subsystems.length;L!==O;L++)this.subsystems[L].update();l&&(u=Ee.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=Ee.now()-u);let _=f.length;for(v=0;v!==_;v++){const L=f[v];if(!L.collideConnected)for(let O=n.length-1;O>=0;O-=1)(L.bodyA===n[O]&&L.bodyB===i[O]||L.bodyB===n[O]&&L.bodyA===i[O])&&(n.splice(O,1),i.splice(O,1))}this.collisionMatrixTick(),l&&(u=Ee.now());const y=Fv,b=e.length;for(v=0;v!==b;v++)y.push(e[v]);e.length=0;const T=this.frictionEquations.length;for(v=0;v!==T;v++)p.push(this.frictionEquations[v]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,y,this.frictionEquations,p),l&&(h.narrowphase=Ee.now()-u),l&&(u=Ee.now()),v=0;v<this.frictionEquations.length;v++)a.addEquation(this.frictionEquations[v]);const C=e.length;for(let L=0;L!==C;L++){const O=e[L],B=O.bi,D=O.bj,V=O.si,q=O.sj;let $;if(B.material&&D.material?$=this.getContactMaterial(B.material,D.material)||this.defaultContactMaterial:$=this.defaultContactMaterial,$.friction,B.material&&D.material&&(B.material.friction>=0&&D.material.friction>=0&&B.material.friction*D.material.friction,B.material.restitution>=0&&D.material.restitution>=0&&(O.restitution=B.material.restitution*D.material.restitution)),a.addEquation(O),B.allowSleep&&B.type===ot.DYNAMIC&&B.sleepState===ot.SLEEPING&&D.sleepState===ot.AWAKE&&D.type!==ot.STATIC){const nt=D.velocity.lengthSquared()+D.angularVelocity.lengthSquared(),st=D.sleepSpeedLimit**2;nt>=st*2&&(B.wakeUpAfterNarrowphase=!0)}if(D.allowSleep&&D.type===ot.DYNAMIC&&D.sleepState===ot.SLEEPING&&B.sleepState===ot.AWAKE&&B.type!==ot.STATIC){const nt=B.velocity.lengthSquared()+B.angularVelocity.lengthSquared(),st=B.sleepSpeedLimit**2;nt>=st*2&&(D.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(B,D,!0),this.collisionMatrixPrevious.get(B,D)||(os.body=D,os.contact=O,B.dispatchEvent(os),os.body=B,D.dispatchEvent(os)),this.bodyOverlapKeeper.set(B.id,D.id),this.shapeOverlapKeeper.set(V.id,q.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Ee.now()-u,u=Ee.now()),v=0;v!==s;v++){const L=o[v];L.wakeUpAfterNarrowphase&&(L.wakeUp(),L.wakeUpAfterNarrowphase=!1)}for(_=f.length,v=0;v!==_;v++){const L=f[v];L.update();for(let O=0,B=L.equations.length;O!==B;O++){const D=L.equations[O];a.addEquation(D)}}a.solve(t,this),l&&(h.solve=Ee.now()-u),a.removeAllEquations();const I=Math.pow;for(v=0;v!==s;v++){const L=o[v];if(L.type&d){const O=I(1-L.linearDamping,t),B=L.velocity;B.scale(O,B);const D=L.angularVelocity;if(D){const V=I(1-L.angularDamping,t);D.scale(V,D)}}}this.dispatchEvent(Nv),l&&(u=Ee.now());const w=this.stepnumber%(this.quatNormalizeSkip+1)===0,P=this.quatNormalizeFast;for(v=0;v!==s;v++)o[v].integrate(t,w,P);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Ee.now()-u),this.stepnumber+=1,this.dispatchEvent(Dv);let U=!0;if(this.allowSleep)for(U=!1,v=0;v!==s;v++){const L=o[v];L.sleepTick(this.time),L.sleepState!==ot.SLEEPING&&(U=!0)}this.hasActiveBodies=U}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(In,Dn),t){for(let s=0,o=In.length;s<o;s+=2)as.bodyA=this.getBodyById(In[s]),as.bodyB=this.getBodyById(In[s+1]),this.dispatchEvent(as);as.bodyA=as.bodyB=null}if(e){for(let s=0,o=Dn.length;s<o;s+=2)cs.bodyA=this.getBodyById(Dn[s]),cs.bodyB=this.getBodyById(Dn[s+1]),this.dispatchEvent(cs);cs.bodyA=cs.bodyB=null}In.length=Dn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(In,Dn),n){for(let s=0,o=In.length;s<o;s+=2){const a=this.getShapeById(In[s]),c=this.getShapeById(In[s+1]);Nn.shapeA=a,Nn.shapeB=c,a&&(Nn.bodyA=a.body),c&&(Nn.bodyB=c.body),this.dispatchEvent(Nn)}Nn.bodyA=Nn.bodyB=Nn.shapeA=Nn.shapeB=null}if(i){for(let s=0,o=Dn.length;s<o;s+=2){const a=this.getShapeById(Dn[s]),c=this.getShapeById(Dn[s+1]);Fn.shapeA=a,Fn.shapeB=c,a&&(Fn.bodyA=a.body),c&&(Fn.bodyB=c.body),this.dispatchEvent(Fn)}Fn.bodyA=Fn.bodyB=Fn.shapeA=Fn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new Ke;const fo=new we,Ee=globalThis.performance||{};if(!Ee.now){let r=Date.now();Ee.timing&&Ee.timing.navigationStart&&(r=Ee.timing.navigationStart),Ee.now=()=>Date.now()-r}new E;const Dv={type:"postStep"},Nv={type:"preStep"},os={type:ot.COLLIDE_EVENT_NAME,body:null,contact:null},Fv=[],Uv=[],Bv=[],Ov=[],In=[],Dn=[],as={type:"beginContact",bodyA:null,bodyB:null},cs={type:"endContact",bodyA:null,bodyB:null},Nn={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Fn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class zv{constructor(t,e){this.scene=t,this.world=e,this.radius=.5,this.mass=7,this.maxSpeed=15,this.accelerationRate=3,this.decelerationRate=4,this.currentSpeed=0,this.turnSensitivity=8,this.hasShield=!1,this.isBoosted=!1,this.isGiant=!1,this.createMesh(),this.createBody()}createMesh(){const t=new tn(this.radius,32,32),e=new ve({color:1710638,roughness:.3,metalness:.7});this.mesh=new mt(t,e),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.scene.add(this.mesh);const n=new Es(this.radius*.7,.03,8,32),i=new ve({color:15158332,roughness:.3});this.stripe=new mt(n,i),this.stripe.rotation.x=Math.PI/2,this.mesh.add(this.stripe)}createBody(){const t=new pr(this.radius);this.body=new ot({mass:this.mass,shape:t,material:new Sn({friction:.3,restitution:.5}),linearDamping:.1,angularDamping:.3}),this.world.addBody(this.body)}reset(){this.body.position.set(0,1,0),this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.body.quaternion.set(0,0,0,1),this.currentSpeed=0,this.hasShield=!1,this.isBoosted=!1,this.setGiant(!1),this.update()}applyTiltForce(t,e){Math.random()<.02&&console.log("Tilt:",t.beta.toFixed(1),t.gamma.toFixed(1),"Speed:",this.currentSpeed.toFixed(1));const n=Math.max(0,-t.beta)/45,i=Math.max(0,t.beta)/45;n>.05?(this.currentSpeed+=this.accelerationRate*n*e,this.currentSpeed=Math.min(this.currentSpeed,this.maxSpeed)):i>.1?(this.currentSpeed-=this.decelerationRate*i*e,this.currentSpeed=Math.max(this.currentSpeed,0)):this.currentSpeed*=.99;const s=this.currentSpeed*2;this.body.velocity.z=s;const o=-t.gamma/45*this.turnSensitivity,a=Math.max(.3,this.currentSpeed/this.maxSpeed);this.body.velocity.x=o*a;const c=this.body.velocity.z/this.radius,l=-this.body.velocity.x/this.radius;this.body.angularVelocity.set(c,0,l)}update(){this.mesh.position.copy(this.body.position),this.mesh.quaternion.copy(this.body.quaternion)}getPosition(){return this.body.position}getVelocity(){return this.body.velocity}getSpeedPercent(){return this.currentSpeed/this.maxSpeed*100}boost(t=1.5,e=3e3){this.isBoosted||(this.isBoosted=!0,this.currentSpeed=Math.min(this.currentSpeed*t,this.maxSpeed),setTimeout(()=>{this.isBoosted=!1},e))}activateShield(){this.hasShield=!0,this.mesh.material.emissive=new Ht(3447003),this.mesh.material.emissiveIntensity=.3}consumeShield(){return this.hasShield?(this.hasShield=!1,this.mesh.material.emissive=new Ht(0),!0):!1}setGiant(t){this.isGiant=t;const e=t?2:1;this.mesh.scale.set(e,e,e),this.body.shapes[0].radius=this.radius*e,this.body.updateBoundingRadius()}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class kv{constructor(t,e,n,i,s){this.scene=t,this.world=e,this.index=s,this.initialPosition={x:n,z:i},this.height=1.5,this.radiusTop=.08,this.radiusMiddle=.2,this.radiusBottom=.15,this.mass=1.5,this.knockedThreshold=.3,this.createMesh(),this.createBody(n,i)}createMesh(){const t=new Bn,e=new en(this.radiusTop,this.radiusMiddle,this.height*.6,16),n=new ve({color:16777215,roughness:.4,metalness:.1}),i=new mt(e,n);i.position.y=this.height*.3,i.castShadow=!0,t.add(i);const s=new en(this.radiusMiddle,this.radiusBottom,this.height*.4,16),o=new mt(s,n);o.position.y=-this.height*.1,o.castShadow=!0,t.add(o);const a=new en(this.radiusMiddle+.01,this.radiusMiddle+.01,.15,16),c=new ve({color:15158332,roughness:.4}),l=new mt(a,c);l.position.y=this.height*.1,t.add(l);const h=new mt(a,c);h.position.y=this.height*.25,t.add(h),this.mesh=t,this.scene.add(this.mesh)}createBody(t,e){const n=new ji(this.radiusTop,this.radiusMiddle,this.height,8);this.body=new ot({mass:this.mass,shape:n,material:new Sn({friction:.3,restitution:.3}),linearDamping:.1,angularDamping:.1});const i=new _e;i.setFromAxisAngle(new E(1,0,0),0),this.body.quaternion.copy(i),this.body.position.set(t,this.height/2,e),this.world.addBody(this.body)}update(){this.mesh.position.copy(this.body.position),this.mesh.quaternion.copy(this.body.quaternion)}isKnocked(){const t=new un().setFromQuaternion(new Yi(this.body.quaternion.x,this.body.quaternion.y,this.body.quaternion.z,this.body.quaternion.w)),e=Math.abs(t.x),n=Math.abs(t.z),i=this.body.position.y<this.height*.3;return e>this.knockedThreshold||n>this.knockedThreshold||i}reset(){this.body.position.set(this.initialPosition.x,this.height/2,this.initialPosition.z),this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.body.quaternion.set(0,0,0,1),this.update()}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Gv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.radius=s.radius||.8,this.height=s.height||.6,this.bounciness=s.bounciness||3.5,this.color=s.color||16739179,this.bounceForce=s.bounceForce||18,this.pulsePhase=Math.random()*Math.PI*2,this.isActive=!0,this.cooldown=0,this.onHit=s.onHit||null,this.createMesh(),this.createBody()}createMesh(){const t=new en(this.radius,this.radius*1.1,this.height,24),e=new ve({color:this.color,roughness:.3,metalness:.6,emissive:this.color,emissiveIntensity:.2});this.mesh=new mt(t,e),this.mesh.position.set(this.position.x,this.height/2,this.position.z),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0;const n=new Es(this.radius*.9,.05,8,24),i=new Jt({color:16777215,transparent:!0,opacity:.8});this.ring=new mt(n,i),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=this.height/2+.02,this.mesh.add(this.ring);const s=new xi(this.radius*.7,24),o=new Jt({color:16777215,transparent:!0,opacity:.4});this.glow=new mt(s,o),this.glow.rotation.x=-Math.PI/2,this.glow.position.y=this.height/2+.03,this.mesh.add(this.glow),this.scene.add(this.mesh)}createBody(){const t=new ji(this.radius,this.radius*1.1,this.height,12);this.body=new ot({mass:0,shape:t,material:new Sn({friction:.1,restitution:this.bounciness}),position:new E(this.position.x,this.height/2,this.position.z)}),this.body.addEventListener("collide",e=>{this.isActive&&this.cooldown<=0&&this.triggerBounce(e)}),this.world.addBody(this.body)}triggerBounce(t){this.cooldown=.25;const e=t.body;if(e&&e.mass>0){const n=e.position.x-this.position.x,i=e.position.z-this.position.z,s=Math.sqrt(n*n+i*i)||1,o=(Math.random()-.5)*Math.PI/3,a=Math.cos(o),c=Math.sin(o),l=n/s*a-i/s*c,h=n/s*c+i/s*a,d=new E(l*this.bounceForce,8+Math.random()*5,h*this.bounceForce);e.velocity.copy(d)}this.mesh.scale.set(1.5,.5,1.5),this.mesh.position.y=this.height/2-.1,this.mesh.material.emissiveIntensity=1.5,this.mesh.material.color.setHex(16777215),this.glow.material.opacity=1,this.ring.material.opacity=1,this.ring.scale.set(1.5,1.5,1),setTimeout(()=>{this.mesh.material.color.setHex(this.color)},80),this.onHit&&this.onHit(this)}update(t){this.cooldown>0&&(this.cooldown-=t),this.mesh.scale.x+=(1-this.mesh.scale.x)*.15,this.mesh.scale.y+=(1-this.mesh.scale.y)*.15,this.mesh.scale.z+=(1-this.mesh.scale.z)*.15,this.mesh.position.y+=(this.height/2-this.mesh.position.y)*.15,this.mesh.material.emissiveIntensity+=(.3-this.mesh.material.emissiveIntensity)*.1,this.glow.material.opacity+=(.5-this.glow.material.opacity)*.1,this.ring.material.opacity+=(.8-this.ring.material.opacity)*.1,this.pulsePhase+=t*4;const e=1+Math.sin(this.pulsePhase)*.08;this.ring.scale.x+=(e-this.ring.scale.x)*.2,this.ring.scale.y+=(e-this.ring.scale.y)*.2}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Vv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.initialPosition={x:n,z:i},this.position={x:n,z:i},this.speed=s.speed||8,this.detectionRadius=s.detectionRadius||10,this.attackRadius=s.attackRadius||1.5,this.state="idle",this.targetBall=null,this.onAttack=s.onAttack||null,this.hasCaughtBall=!1,this.animationTime=0,this.tailPhase=Math.random()*Math.PI*2,this.idleWanderAngle=0,this.idleWanderTarget=null,this.createMesh(),this.createBody()}createMesh(){this.mesh=new Bn;const t=new wa(.3,.6,8,16),e=new ve({color:16747520,roughness:.8}),n=new mt(t,e);n.rotation.x=Math.PI/2,n.position.y=.4,this.mesh.add(n);const i=new tn(.25,16,16),s=new mt(i,e);s.position.set(0,.5,.5),this.head=s,this.mesh.add(s);const o=new xr(.1,.2,4),a=new mt(o,e);a.position.set(-.15,.7,.45),a.rotation.z=-.2,this.mesh.add(a);const c=new mt(o,e);c.position.set(.15,.7,.45),c.rotation.z=.2,this.mesh.add(c);const l=new tn(.08,8,8),h=new Jt({color:65280}),d=new mt(l,h);d.position.set(-.1,.55,.7),this.leftEye=d,this.mesh.add(d);const u=new mt(l,h);u.position.set(.1,.55,.7),this.rightEye=u,this.mesh.add(u);const f=new tn(.04,8,8),p=new Jt({color:0}),x=new mt(f,p);x.position.set(0,0,.05),d.add(x);const g=new mt(f,p);g.position.set(0,0,.05),u.add(g);const m=new en(.05,.08,.6,8);this.tail=new mt(m,e),this.tail.position.set(0,.5,-.5),this.tail.rotation.x=-.5,this.mesh.add(this.tail);const v=new en(.06,.05,.3,8),_=[{x:-.2,z:.2},{x:.2,z:.2},{x:-.2,z:-.2},{x:.2,z:-.2}];this.legs=[],_.forEach(y=>{const b=new mt(v,e);b.position.set(y.x,.15,y.z),this.legs.push(b),this.mesh.add(b)}),this.mesh.position.set(this.position.x,0,this.position.z),this.mesh.castShadow=!0,this.scene.add(this.mesh)}createBody(){const t=new pr(.4);this.body=new ot({mass:0,shape:t,type:ot.KINEMATIC,position:new E(this.position.x,.4,this.position.z)}),this.world.addBody(this.body)}setTarget(t){this.targetBall=t}update(t,e,n){if(this.animationTime+=t,this.tailPhase+=t*5,this.tail.rotation.z=Math.sin(this.tailPhase)*.5,!e||this.hasCaughtBall){this.idleAnimation(t);return}const i=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2)),s=n?Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z):0,o=e.y>1,a=s>12&&i>5,c=o||a;switch(c&&(this.state==="stalking"||this.state==="pouncing")&&(this.state="returning",this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1)),this.state){case"idle":this.idleAnimation(t),i<this.detectionRadius&&e.z>this.position.z-5&&!c&&(this.state="stalking",this.leftEye.scale.set(1.3,1.3,1.3),this.rightEye.scale.set(1.3,1.3,1.3));break;case"stalking":const l=e.z+n.z*.5,d=e.x+n.x*.5-this.position.x,u=l-this.position.z,f=Math.sqrt(d*d+u*u);if(f>.1){const C=this.speed*t;this.position.x+=d/f*C,this.position.z+=u/f*C,this.mesh.rotation.y=Math.atan2(d,u)}this.mesh.position.y=0+Math.sin(this.animationTime*15)*.05,i<this.attackRadius&&(this.state="pouncing",this.pounceStartY=0,this.pounceTime=0);break;case"pouncing":this.pounceTime+=t;const x=this.pounceTime/.3,g=Math.sin(x*Math.PI)*1.5;this.mesh.position.y=g,this.mesh.rotation.x=-x*Math.PI*.5;const m=e.x-this.position.x,v=e.z-this.position.z,_=Math.sqrt(m*m+v*v);if(_>.1){const C=this.speed*2*t;this.position.x+=m/_*C,this.position.z+=v/_*C}(x>=1||i<.5)&&(i<1&&(this.hasCaughtBall=!0,this.onAttack&&this.onAttack(this)),this.state="returning",this.mesh.rotation.x=0);break;case"returning":const y=this.initialPosition.x-this.position.x,b=this.initialPosition.z-this.position.z,T=Math.sqrt(y*y+b*b);if(T>.5){const C=this.speed*.5*t;this.position.x+=y/T*C,this.position.z+=b/T*C,this.mesh.rotation.y=Math.atan2(y,b)}else this.state="idle",this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1);this.mesh.position.y=0;break}this.mesh.position.x=this.position.x,this.mesh.position.z=this.position.z,this.body.position.set(this.position.x,.4,this.position.z),(this.state==="stalking"||this.state==="returning")&&this.legs.forEach((l,h)=>{l.position.y=.15+Math.sin(this.animationTime*20+h*Math.PI)*.1})}idleAnimation(t){(!this.idleWanderTarget||Math.random()<.01)&&(this.idleWanderAngle=Math.random()*Math.PI*2,this.idleWanderTarget={x:this.initialPosition.x+Math.cos(this.idleWanderAngle)*2,z:this.initialPosition.z+Math.sin(this.idleWanderAngle)*2});const e=this.idleWanderTarget.x-this.position.x,n=this.idleWanderTarget.z-this.position.z,i=Math.sqrt(e*e+n*n);if(i>.3){const s=this.speed*.3*t;this.position.x+=e/i*s,this.position.z+=n/i*s,this.mesh.rotation.y=Math.atan2(e,n),this.legs.forEach((o,a)=>{o.position.y=.15+Math.sin(this.animationTime*10+a*Math.PI)*.05})}this.mesh.position.x=this.position.x,this.mesh.position.z=this.position.z,this.body.position.set(this.position.x,.4,this.position.z)}reset(){this.position={...this.initialPosition},this.state="idle",this.hasCaughtBall=!1,this.mesh.position.set(this.position.x,0,this.position.z),this.mesh.rotation.set(0,0,0),this.body.position.set(this.position.x,.4,this.position.z),this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1)}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Hv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.radius=s.radius||1.5,this.depth=s.depth||3,this.onFall=s.onFall||null,this.hasCaughtBall=!1,this.createMesh(),this.createTrigger()}createMesh(){this.mesh=new Bn;const t=new xi(this.radius,24),e=new Jt({color:0,side:de}),n=new mt(t,e);n.rotation.x=-Math.PI/2,n.position.y=-.1,this.mesh.add(n);const i=new ti(this.radius*.3,this.radius,24),s=new Jt({color:1710638,transparent:!0,opacity:.8,side:de}),o=new mt(i,s);o.rotation.x=-Math.PI/2,o.position.y=-.05,this.mesh.add(o);const a=new ti(this.radius,this.radius+.3,24),c=new Jt({color:16711680,transparent:!0,opacity:.6,side:de});this.warningRing=new mt(a,c),this.warningRing.rotation.x=-Math.PI/2,this.warningRing.position.y=.02,this.mesh.add(this.warningRing);const l=12;for(let x=0;x<l;x++){const g=x/l*Math.PI*2,m=new Ne(.2,.5),v=new Jt({color:x%2===0?16763904:0,side:de}),_=new mt(m,v);_.rotation.x=-Math.PI/2,_.rotation.z=g,_.position.x=Math.cos(g)*(this.radius+.4),_.position.z=Math.sin(g)*(this.radius+.4),_.position.y=.03,this.mesh.add(_)}const h=new Ne(.8,.8),d=document.createElement("canvas");d.width=64,d.height=64;const u=d.getContext("2d");u.fillStyle="#ff0000",u.beginPath(),u.arc(32,32,30,0,Math.PI*2),u.fill(),u.fillStyle="#ffffff",u.font="bold 40px Arial",u.textAlign="center",u.textBaseline="middle",u.fillText("!",32,32);const f=new kl(d),p=new Jt({map:f,transparent:!0,side:de});this.warningSign=new mt(h,p),this.warningSign.position.y=2,this.mesh.add(this.warningSign),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createTrigger(){const t=new ji(this.radius*.8,this.radius*.8,.5,12);this.body=new ot({mass:0,shape:t,collisionResponse:!1,position:new E(this.position.x,-.25,this.position.z)}),this.body.userData={type:"pit",pit:this},this.world.addBody(this.body)}update(t,e){if(!e||this.hasCaughtBall)return;const n=Math.sin(Date.now()*.005)*.3+.6;return this.warningRing.material.opacity=n,this.warningRing.scale.set(1+n*.1,1+n*.1,1),this.warningSign.position.y=2+Math.sin(Date.now()*.003)*.2,this.warningSign.rotation.y+=t*2,Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2))<this.radius*.7&&e.y<.5?(this.hasCaughtBall=!0,this.onFall&&this.onFall(this),{fallen:!0}):{fallen:!1}}reset(){this.hasCaughtBall=!1}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Wv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.radius=s.radius||1.2,this.launchForce=s.launchForce||25,this.launchAngle=s.launchAngle||Math.PI/4,this.onLaunch=s.onLaunch||null,this.cooldown=0,this.isCharged=!0,this.chargeTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new Bn;const t=new en(this.radius,this.radius*1.2,.3,24),e=new ve({color:3447003,roughness:.3,metalness:.7}),n=new mt(t,e);n.position.y=.15,this.mesh.add(n);const i=new Es(this.radius*.6,.08,8,24),s=new ve({color:15158332,roughness:.4,metalness:.8});for(let p=0;p<3;p++){const x=new mt(i,s);x.rotation.x=Math.PI/2,x.position.y=.35+p*.15,x.scale.set(1-p*.1,1-p*.1,1),this.mesh.add(x)}const o=new en(this.radius*.9,this.radius*.9,.15,24),a=new ve({color:15965202,roughness:.2,metalness:.9,emissive:15965202,emissiveIntensity:.3});this.plate=new mt(o,a),this.plate.position.y=.8,this.mesh.add(this.plate);const c=new _r;c.moveTo(0,.4),c.lineTo(-.2,0),c.lineTo(-.08,0),c.lineTo(-.08,-.4),c.lineTo(.08,-.4),c.lineTo(.08,0),c.lineTo(.2,0),c.closePath();const l=new ws(c),h=new Jt({color:65280,side:de});this.arrow=new mt(l,h),this.arrow.rotation.x=-Math.PI/2,this.arrow.position.y=.9,this.mesh.add(this.arrow);const d=new ti(this.radius*.8,this.radius*1,24),u=new Jt({color:65280,transparent:!0,opacity:.5,side:de});this.glow=new mt(d,u),this.glow.rotation.x=-Math.PI/2,this.glow.position.y=.02,this.mesh.add(this.glow),this.particles=[];const f=new Jt({color:65280,transparent:!0,opacity:.8});for(let p=0;p<8;p++){const x=new tn(.05,8,8),g=new mt(x,f.clone());g.userData={angle:p/8*Math.PI*2,speed:1+Math.random()*.5,height:Math.random()},this.particles.push(g),this.mesh.add(g)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new ji(this.radius*.9,this.radius*.9,.3,12);this.body=new ot({mass:0,shape:t,position:new E(this.position.x,.8,this.position.z)}),this.body.addEventListener("collide",e=>{this.isCharged&&this.cooldown<=0&&this.triggerLaunch(e.body)}),this.world.addBody(this.body)}triggerLaunch(t){this.isCharged=!1,this.cooldown=2;const e=new E(0,Math.sin(this.launchAngle)*this.launchForce,Math.cos(this.launchAngle)*this.launchForce);return t&&t.mass>0&&t.velocity.copy(e),this.plate.position.y=.4,this.plate.material.emissiveIntensity=1,this.arrow.material.color.setHex(16776960),this.onLaunch&&this.onLaunch(this,this.launchForce),e}update(t,e){if(this.cooldown>0&&(this.cooldown-=t,this.cooldown<=0&&(this.isCharged=!0)),this.plate.position.y+=(.8-this.plate.position.y)*.1,this.plate.material.emissiveIntensity+=(.3-this.plate.material.emissiveIntensity)*.1,this.isCharged){const n=Math.sin(Date.now()*.005)*.3+.5;this.glow.material.opacity=n,this.glow.material.color.setHex(65280),this.arrow.material.color.setHex(65280),this.particles.forEach(i=>{i.visible=!0,i.userData.angle+=t*i.userData.speed*3,i.userData.height+=t*2,i.userData.height>1.5&&(i.userData.height=0);const s=this.radius*.5*(1-i.userData.height/1.5);i.position.x=Math.cos(i.userData.angle)*s,i.position.z=Math.sin(i.userData.angle)*s,i.position.y=.3+i.userData.height,i.material.opacity=1-i.userData.height/1.5})}else this.glow.material.opacity=.2,this.glow.material.color.setHex(16737792),this.particles.forEach(n=>n.visible=!1);this.arrow.position.y=.9+Math.sin(Date.now()*.004)*.1}reset(){this.isCharged=!0,this.cooldown=0,this.plate.position.y=.8}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class qv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.radius=s.radius||2,this.pullStrength=s.pullStrength||8,this.spinSpeed=s.spinSpeed||5,this.onCapture=s.onCapture||null,this.onRelease=s.onRelease||null,this.state="idle",this.capturedBall=null,this.spinAngle=0,this.spinTime=0,this.releaseDirection={x:0,z:1},this.createMesh(),this.createTrigger()}createMesh(){this.mesh=new Bn,this.rings=[];const t=[10181046,9323693,7091331,5975151];for(let d=0;d<4;d++){const u=new ti(this.radius*(.3+d*.2),this.radius*(.4+d*.2),32),f=new Jt({color:t[d],transparent:!0,opacity:.6-d*.1,side:de}),p=new mt(u,f);p.rotation.x=-Math.PI/2,p.position.y=.05+d*.02,p.userData={rotationSpeed:(4-d)*.5},this.rings.push(p),this.mesh.add(p)}const e=new xi(this.radius*.3,24),n=new Jt({color:1706542,side:de}),i=new mt(e,n);i.rotation.x=-Math.PI/2,i.position.y=.01,this.mesh.add(i),this.spiralParticles=[];const s=new Jt({color:14702333,transparent:!0,opacity:.8});for(let d=0;d<20;d++){const u=new tn(.08,8,8),f=new mt(u,s.clone());f.userData={angle:d/20*Math.PI*2,radius:this.radius*.3+d/20*this.radius*.6,height:Math.random()*.5,speed:2+Math.random()},this.spiralParticles.push(f),this.mesh.add(f)}const o=new ti(this.radius,this.radius+.2,32),a=new Jt({color:10181046,transparent:!0,opacity:.4,side:de});this.outerGlow=new mt(o,a),this.outerGlow.rotation.x=-Math.PI/2,this.outerGlow.position.y=.02,this.mesh.add(this.outerGlow);const c=new _r;c.moveTo(0,.6),c.lineTo(-.3,.1),c.lineTo(-.1,.1),c.lineTo(-.1,-.3),c.lineTo(.1,-.3),c.lineTo(.1,.1),c.lineTo(.3,.1),c.closePath();const l=new ws(c),h=new Jt({color:65280,transparent:!0,opacity:0,side:de});this.directionArrow=new mt(l,h),this.directionArrow.rotation.x=-Math.PI/2,this.directionArrow.position.y=.15,this.directionArrow.position.z=this.radius+.5,this.mesh.add(this.directionArrow),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createTrigger(){const t=new ji(this.radius,this.radius,1,12);this.body=new ot({mass:0,shape:t,collisionResponse:!1,position:new E(this.position.x,.5,this.position.z)}),this.body.userData={type:"vortex",vortex:this},this.world.addBody(this.body)}update(t,e,n){this.rings.forEach((o,a)=>{o.rotation.z+=t*o.userData.rotationSpeed*(this.state==="spinning"?3:1)}),this.spiralParticles.forEach(o=>{o.userData.angle+=t*o.userData.speed*(this.state==="spinning"?2:1),o.userData.radius-=t*.5,o.userData.radius<this.radius*.2&&(o.userData.radius=this.radius*.9),o.position.x=Math.cos(o.userData.angle)*o.userData.radius,o.position.z=Math.sin(o.userData.angle)*o.userData.radius,o.position.y=.1+Math.sin(o.userData.angle*2)*.3});const i=Math.sin(Date.now()*.003)*.2+.4;if(this.outerGlow.material.opacity=i,!e||!n)return{captured:!1};const s=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));switch(this.state){case"idle":s<this.radius&&e.y<1&&(this.state="capturing",this.capturedBall=n,this.onCapture&&this.onCapture(this));break;case"capturing":if(this.capturedBall){const o=new E(this.position.x-e.x,.5-e.y,this.position.z-e.z);o.normalize(),o.scale(this.pullStrength*t*60,o),this.capturedBall.velocity.x+=o.x,this.capturedBall.velocity.y+=o.y,this.capturedBall.velocity.z+=o.z,this.capturedBall.velocity.scale(.95,this.capturedBall.velocity),s<.5&&(this.state="spinning",this.spinAngle=0,this.spinTime=0)}break;case"spinning":if(this.spinTime+=t,this.spinAngle+=t*this.spinSpeed,this.capturedBall){const a=this.position.x+Math.cos(this.spinAngle)*.8,c=this.position.z+Math.sin(this.spinAngle)*.8;this.capturedBall.position.x=a,this.capturedBall.position.z=c,this.capturedBall.position.y=.5+Math.sin(this.spinTime*10)*.1,this.capturedBall.velocity.set(0,0,0),this.releaseDirection={x:Math.cos(this.spinAngle+Math.PI/2),z:Math.sin(this.spinAngle+Math.PI/2)},this.directionArrow.material.opacity=.8,this.directionArrow.rotation.z=-this.spinAngle-Math.PI/2,this.directionArrow.position.x=Math.cos(this.spinAngle+Math.PI/2)*(this.radius+.5),this.directionArrow.position.z=Math.sin(this.spinAngle+Math.PI/2)*(this.radius+.5);const l=this.spinTime*.5%1;this.rings.forEach(h=>{h.material.color.setHSL(.75+l*.1,1,.5)})}return{captured:!0,canRelease:!0,direction:this.releaseDirection};case"releasing":this.directionArrow.material.opacity=0,this.spinTime+=t,this.spinTime>1&&(this.state="idle",this.capturedBall=null);break}return{captured:this.state==="spinning",canRelease:this.state==="spinning"}}release(){if(this.state!=="spinning"||!this.capturedBall)return null;const t=20,e=new E(this.releaseDirection.x*t,5,this.releaseDirection.z*t);return this.capturedBall.velocity.copy(e),this.capturedBall,this.state="releasing",this.spinTime=0,this.onRelease&&this.onRelease(this,this.releaseDirection),e}reset(){this.state="idle",this.capturedBall=null,this.spinAngle=0,this.spinTime=0,this.directionArrow.material.opacity=0,this.rings.forEach(t=>t.material.color.setHex(10181046))}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Xv{constructor(t,e,n={}){this.scene=t,this.world=e,this.obstacles=[],this.animatedObstacles=[],this.bonusItems=[],this.specialObstacles=[],this.terrainZones=[],this.width=16,this.length=240,this.pinAreaZ=235,this.groundMaterial=new Sn("ground"),this.obstacleMaterial=new Sn("obstacle"),this.onBumperHit=n.onBumperHit||null,this.onCatAttack=n.onCatAttack||null,this.onPitFall=n.onPitFall||null,this.onLaunch=n.onLaunch||null,this.onVortexCapture=n.onVortexCapture||null,this.onVortexRelease=n.onVortexRelease||null,this.onPachinkoHit=n.onPachinkoHit||null,this.onBonusCollect=n.onBonusCollect||null,this.themes=["grass","desert","ice","volcano","space","candy"],this.currentTheme="grass"}generate(t=1){this.dispose(),this.currentTheme=this.themes[(t-1)%this.themes.length],this.createGround(),this.createWalls(),this.generateRandomCourse(t),this.createPinArea()}getThemeColors(){const t={grass:{ground:4881497,accent:3066993,sky:8900331},desert:{ground:12759680,accent:15965202,sky:16767131},ice:{ground:8900331,accent:3447003,sky:13955577},volcano:{ground:4868682,accent:15158332,sky:2889744},space:{ground:1710638,accent:10181046,sky:657941},candy:{ground:16758465,accent:16738740,sky:16770281}};return t[this.currentTheme]||t.grass}createGround(){const t=this.getThemeColors(),e=new Ne(this.width,this.length,1,20),n=new ve({color:t.ground,roughness:.8});this.groundMesh=new mt(e,n),this.groundMesh.rotation.x=-Math.PI/2,this.groundMesh.position.set(0,0,this.length/2),this.groundMesh.receiveShadow=!0,this.scene.add(this.groundMesh),this.createLaneLines();const i=new jn(new E(this.width/2,.1,this.length/2)),s=new ot({mass:0,shape:i,material:this.groundMaterial});s.position.set(0,-.1,this.length/2),this.world.addBody(s),this.obstacles.push({body:s})}createLaneLines(){const t=new Jt({color:16777215,transparent:!0,opacity:.3});for(let e=0;e<this.length;e+=4){const n=new Ne(.1,2),i=new mt(n,t);i.rotation.x=-Math.PI/2,i.position.set(0,.02,e+1),this.scene.add(i),this.obstacles.push({mesh:i})}for(let e=20;e<this.length-20;e+=20){const n=new Ne(this.width*.8,.5),i=new mt(n,t);i.rotation.x=-Math.PI/2,i.position.set(0,.02,e),this.scene.add(i),this.obstacles.push({mesh:i})}}createWalls(){const e=new Jn(.3,1.5,this.length),n=new ve({color:4473924,roughness:.6}),i=new mt(e,n);i.position.set(-this.width/2-.15,1.5/2,this.length/2),i.castShadow=!0,this.scene.add(i),this.obstacles.push({mesh:i});const s=i.clone();s.position.x=this.width/2+.15,this.scene.add(s),this.obstacles.push({mesh:s});const o=new jn(new E(.15,1.5/2,this.length/2)),a=new ot({mass:0,shape:o,material:this.obstacleMaterial});a.position.set(-this.width/2-.15,1.5/2,this.length/2),this.world.addBody(a),this.obstacles.push({body:a});const c=new ot({mass:0,shape:o,material:this.obstacleMaterial});c.position.set(this.width/2+.15,1.5/2,this.length/2),this.world.addBody(c),this.obstacles.push({body:c})}generateRandomCourse(t){const e=t*12345,n=this.seededRandom(e);[{start:10,end:50,name:"warmup"},{start:50,end:100,name:"hazards"},{start:100,end:150,name:"chaos"},{start:150,end:190,name:"gauntlet"},{start:190,end:220,name:"approach"}].forEach(s=>{this.generateSection(s,n,t)}),this.addSpecialEvent(t,n)}generateSection(t,e,n){const{start:i,end:s,name:o}=t,a=this.width;switch(o){case"warmup":if(e()>.4){const c=e()>.5?"ice":"sand";this.createTerrainZone(0,i+5,15,c)}for(let c=0;c<5;c++)if(e()>.3){const l=(e()-.5)*(a-2),h=i+5+e()*20;this.createBumper(l,h)}e()>.5&&this.createLaunchPad((e()-.5)*4,i+30);break;case"hazards":e()>.3&&this.createPachinkoZone(0,i+5,12);for(let c=0;c<3;c++)if(e()>.3){const l=(e()-.5)*(a-4);this.createRotatingBar(l,i+15+c*10)}for(let c=0;c<6;c++)if(e()>.3){const l=(e()-.5)*(a-2),h=i+e()*(s-i);this.createRock(l,h)}if(n>=2){for(let c=0;c<2;c++)if(e()>.4){const l=(e()-.5)*(a-4),h=i+20+e()*20;this.createPit(l,h)}}break;case"chaos":for(let c=0;c<8;c++){const l=(e()-.5)*(a-2),h=i+5+c*5;this.createBumper(l,h)}if(n>=3&&e()>.3){const c=(e()-.5)*6,l=i+15+e()*15;this.createVortex(c,l)}if(n>=4&&e()>.3){const c=(e()-.5)*6,l=i+25+e()*10;this.createCat(c,l)}e()>.4&&this.createCliffPath(i+35,12);for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-4),h=i+10+e()*30;this.createLaunchPad(l,h)}break;case"gauntlet":for(let c=0;c<3;c++)this.createPiston(-a/2+1,i+5+c*12),this.createPiston(a/2-1,i+11+c*12);e()>.4&&this.createWindZone(0,i+20,15);for(let c=0;c<4;c++)if(e()>.3){const l=(e()-.5)*(a-4);this.createRotatingBar(l,i+5+c*8)}for(let c=0;c<3;c++)if(e()>.4){const l=(e()-.5)*(a-4),h=i+10+e()*25;this.createPit(l,h)}e()>.4&&this.createVortex((e()-.5)*6,i+30);break;case"approach":for(let c=0;c<4;c++)this.createBumper(-3+c*2,i+5),this.createBumper(-3+c*2,i+12);this.createBonus((e()-.5)*6,i+e()*10,"speed"),this.createBonus((e()-.5)*6,i+15+e()*5,"giant");break}for(let c=0;c<2;c++)if(e()>.4){const l=["speed","shield","giant"],h=l[Math.floor(e()*l.length)];this.createBonus((e()-.5)*(a-2),i+e()*(s-i),h)}}addSpecialEvent(t,e){t===1?this.createArrowGuide(0,15):t===5?this.createBossBumperFormation(60):t===10&&this.createChaosZone(50,30)}createArrowGuide(t,e){const n=new _r;n.moveTo(0,1),n.lineTo(-.5,0),n.lineTo(-.2,0),n.lineTo(-.2,-1),n.lineTo(.2,-1),n.lineTo(.2,0),n.lineTo(.5,0),n.closePath();const i=new ws(n),s=new Jt({color:65280,transparent:!0,opacity:.5,side:de}),o=new mt(i,s);o.rotation.x=-Math.PI/2,o.position.set(t,.05,e),this.scene.add(o),this.obstacles.push({mesh:o})}createBossBumperFormation(t){[{x:0,z:t},{x:-1.5,z:t+3},{x:1.5,z:t+3},{x:-3,z:t+6},{x:0,z:t+6},{x:3,z:t+6},{x:-1.5,z:t+9},{x:1.5,z:t+9},{x:0,z:t+12}].forEach(n=>{this.createBumper(n.x,n.z,{color:16711680})})}createChaosZone(t,e){for(let n=0;n<15;n++){const i=(Math.random()-.5)*6,s=t+Math.random()*e,o=Math.random();o<.3?this.createBumper(i,s):o<.5?this.createRock(i,s):o<.7&&this.createRotatingBar(i,s)}this.createCat(-2,t+10),this.createCat(2,t+20),this.createVortex(0,t+15),this.createPit(-3,t+25),this.createPit(3,t+25),this.createLaunchPad(-4,t+5),this.createLaunchPad(4,t+5)}createTerrainZone(t,e,n,i){let s,o;switch(i){case"ice":s=8900331,o=.05;break;case"sand":s=12759680,o=.8;break;case"mud":s=6636321,o=.9;break;default:s=4881497,o=.3}const a=new Ne(this.width,n),c=new ve({color:s,roughness:i==="ice"?.1:.9,transparent:!0,opacity:.8}),l=new mt(a,c);l.rotation.x=-Math.PI/2,l.position.set(t,.01,e+n/2),l.receiveShadow=!0,this.scene.add(l);const h={type:i,friction:o,startZ:e,endZ:e+n,x:t,width:this.width};this.terrainZones.push(h),this.obstacles.push({mesh:l,zoneData:h,isTerrainZone:!0})}createWindZone(t,e,n){const i=new Ne(this.width,n),s=new ve({color:11393254,transparent:!0,opacity:.3}),o=new mt(i,s);o.rotation.x=-Math.PI/2,o.position.set(t,.01,e+n/2),this.scene.add(o);const a=new Ae,c=50,l=new Float32Array(c*3);for(let p=0;p<c;p++)l[p*3]=(Math.random()-.5)*this.width,l[p*3+1]=Math.random()*2,l[p*3+2]=e+Math.random()*n;a.setAttribute("position",new hn(l,3));const h=new zl({color:16777215,size:.1,transparent:!0,opacity:.5}),d=new Cu(a,h);this.scene.add(d);const u=Math.random()>.5?1:-1,f={type:"wind",startZ:e,endZ:e+n,windForce:{x:u*5,z:0},particles:d};this.terrainZones.push(f),this.obstacles.push({mesh:o,particles:d,zoneData:f,isTerrainZone:!0})}createCliffPath(t,e){const i=new Ne((this.width-3)/2,e),s=new ve({color:1710638,roughness:1}),o=new mt(i,s);o.rotation.x=-Math.PI/2,o.position.set(-(this.width/4+3/4),-.5,t+e/2),this.scene.add(o),this.obstacles.push({mesh:o});const a=o.clone();a.position.x=this.width/4+3/4,this.scene.add(a),this.obstacles.push({mesh:a}),this.createDangerSign(-2.5,t),this.createDangerSign(2.5,t);const c=new jn(new E((this.width-3)/4,5,e/2)),l=new ot({mass:0,shape:c});l.position.set(-(this.width/4+3/4),-2.5,t+e/2),l.userData={type:"killzone"},this.world.addBody(l),this.obstacles.push({body:l});const h=new ot({mass:0,shape:c});h.position.set(this.width/4+3/4,-2.5,t+e/2),h.userData={type:"killzone"},this.world.addBody(h),this.obstacles.push({body:h}),this.terrainZones.push({type:"cliff",startZ:t,endZ:t+e,pathWidth:3})}createDangerSign(t,e){const n=new Ne(.6,.6),i=document.createElement("canvas");i.width=64,i.height=64;const s=i.getContext("2d");s.fillStyle="#ffcc00",s.beginPath(),s.moveTo(32,5),s.lineTo(59,55),s.lineTo(5,55),s.closePath(),s.fill(),s.fillStyle="#000",s.font="bold 30px Arial",s.fillText("!",25,48);const o=new kl(i),a=new Jt({map:o,transparent:!0,side:de}),c=new mt(n,a);c.position.set(t,1.5,e),c.rotation.y=Math.PI/4,this.scene.add(c),this.obstacles.push({mesh:c})}createRock(t,e){const n=.5+Math.random()*.3,i=new Ea(n,1),s=new ve({color:6710886,roughness:.9}),o=new mt(i,s);o.position.set(t,n,e),o.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),o.castShadow=!0,this.scene.add(o);const a=new pr(n),c=new ot({mass:0,shape:a,material:this.obstacleMaterial});c.position.set(t,n,e),this.world.addBody(c),this.obstacles.push({mesh:o,body:c})}createRotatingBar(t,e){const o=new Jn(4,.8,.3),a=new ve({color:15158332,roughness:.5}),c=new mt(o,a);c.position.set(t,.8/2+.1,e),c.castShadow=!0,this.scene.add(c);const l=new jn(new E(4/2,.8/2,.3/2)),h=new ot({mass:0,shape:l,type:ot.KINEMATIC});h.position.set(t,.8/2+.1,e),this.world.addBody(h),this.animatedObstacles.push({mesh:c,body:h,type:"rotating",speed:1.5+Math.random(),centerX:t,centerZ:e}),this.obstacles.push({mesh:c,body:h})}createPachinkoZone(t,e,n){const s=Math.floor(n/1.5),o=4,a=1.8;for(let d=0;d<s;d++){const u=d%2===0?0:a*.5,f=Math.floor(Math.random()*o);for(let p=0;p<o;p++){if(p===f)continue;const x=t-(o-1)*a/2+p*a+u,g=e+d*1.5,m=new en(.1,.1,.8,12),v=new ve({color:15965202,roughness:.2,metalness:.7,emissive:15965202,emissiveIntensity:.2}),_=new mt(m,v);_.position.set(x,.4,g),_.castShadow=!0,this.scene.add(_);const y=new ji(.1,.1,.8,8),b=new ot({mass:0,shape:y,material:new Sn({friction:.05,restitution:1.2})});b.position.set(x,.4,g),b.userData={type:"pachinko"},b.addEventListener("collide",()=>{this.onPachinkoHit&&this.onPachinkoHit({x,z:g}),_.material.emissiveIntensity=1,setTimeout(()=>{_.material.emissiveIntensity=.2},100)}),this.world.addBody(b),this.obstacles.push({mesh:_,body:b,isPachinko:!0})}}const c=new Ne(o*a+2,n),l=new ve({color:2899536,roughness:.9,transparent:!0,opacity:.5}),h=new mt(c,l);h.rotation.x=-Math.PI/2,h.position.set(t,.01,e+n/2),this.scene.add(h),this.obstacles.push({mesh:h})}createBumper(t,e,n={}){const i=new Gv(this.scene,this.world,t,e,{...n,onHit:s=>{this.onBumperHit&&this.onBumperHit(s)}});this.specialObstacles.push(i)}createPiston(t,e){const o=new Jn(1,.8,.5),a=new ve({color:3447003,roughness:.4,metalness:.6}),c=new mt(o,a),l=t>0?this.width/2+1/2:-this.width/2-1/2;c.position.set(l,.8/2,e),c.castShadow=!0,this.scene.add(c);const h=new jn(new E(1/2,.8/2,.5/2)),d=new ot({mass:0,shape:h,type:ot.KINEMATIC});d.position.set(l,.8/2,e),this.world.addBody(d),this.animatedObstacles.push({mesh:c,body:d,type:"piston",startX:l,targetX:t>0?1.5:-1.5,direction:t>0?-1:1,speed:3+Math.random()*2,timer:Math.random()*2}),this.obstacles.push({mesh:c,body:d})}createCat(t,e){const n=new Vv(this.scene,this.world,t,e,{onAttack:i=>{this.onCatAttack&&this.onCatAttack(i)}});this.specialObstacles.push(n)}createPit(t,e){const n=new Hv(this.scene,this.world,t,e,{onFall:i=>{this.onPitFall&&this.onPitFall(i)}});this.specialObstacles.push(n)}createLaunchPad(t,e){const n=new Wv(this.scene,this.world,t,e,{onLaunch:(i,s)=>{this.onLaunch&&this.onLaunch(i,s)}});this.specialObstacles.push(n)}createVortex(t,e){const n=new qv(this.scene,this.world,t,e,{onCapture:i=>{this.onVortexCapture&&this.onVortexCapture(i)},onRelease:(i,s)=>{this.onVortexRelease&&this.onVortexRelease(i,s)}});this.specialObstacles.push(n)}createBonus(t,e,n){let s;switch(n){case"speed":s=15965202;break;case"shield":s=3447003;break;case"giant":s=10181046;break;default:s=3066993}const o=new Aa(.4),a=new ve({color:s,emissive:s,emissiveIntensity:.5,roughness:.2,metalness:.8}),c=new mt(o,a);c.position.set(t,1,e),c.castShadow=!0,this.scene.add(c);const l=new pr(.4*1.5),h=new ot({mass:0,shape:l,collisionResponse:!1});h.position.set(t,1,e),h.userData={type:"bonus",bonusType:n},this.world.addBody(h),this.bonusItems.push({mesh:c,body:h,type:n,collected:!1})}createPinArea(){const t=new Ne(6,10),e=new ve({color:13935988,roughness:.6}),n=new mt(t,e);n.rotation.x=-Math.PI/2,n.position.set(0,.02,this.pinAreaZ),n.receiveShadow=!0,this.scene.add(n),this.obstacles.push({mesh:n})}update(t,e,n){return this.animatedObstacles.forEach(i=>{if(i.type==="rotating"){const s=i.speed*t;i.mesh.rotation.y+=s,i.body.quaternion.setFromAxisAngle(new E(0,1,0),i.mesh.rotation.y)}if(i.type==="piston"){i.timer+=t;const s=Math.sin(i.timer*i.speed),o=Math.abs(i.targetX-i.startX),a=i.startX+(s+1)*.5*o*i.direction;i.mesh.position.x=a,i.body.position.x=a}}),this.specialObstacles.forEach(i=>{i.update&&i.update(t,e,n)}),this.bonusItems.forEach(i=>{i.collected||(i.mesh.rotation.y+=t*2,i.mesh.position.y=1+Math.sin(Date.now()*.003)*.2)}),this.terrainZones.forEach(i=>{if(i.type==="wind"&&i.particles){const s=i.particles.geometry.attributes.position.array;for(let o=0;o<s.length;o+=3)s[o]+=i.windForce.x*t,s[o]>this.width/2&&(s[o]=-this.width/2),s[o]<-this.width/2&&(s[o]=this.width/2);i.particles.geometry.attributes.position.needsUpdate=!0}}),e?this.checkTerrainEffects(e):null}checkTerrainEffects(t){for(const e of this.terrainZones)if(t.z>=e.startZ&&t.z<=e.endZ){if(e.type==="ice")return{type:"friction",value:.1};if(e.type==="sand"||e.type==="mud")return{type:"friction",value:.8};if(e.type==="wind")return{type:"wind",force:e.windForce}}return null}collectBonus(t){const e=this.bonusItems.find(n=>n.type===t&&!n.collected);return e?(e.collected=!0,this.scene.remove(e.mesh),this.world.removeBody(e.body),this.onBonusCollect&&this.onBonusCollect(t),!0):!1}resetSpecialObstacles(){this.specialObstacles.forEach(t=>{t.reset&&t.reset()})}seededRandom(t){let e=t;return function(){return e=Math.sin(e)*1e4,e-Math.floor(e)}}getPinAreaZ(){return this.pinAreaZ}dispose(){this.obstacles.forEach(t=>{t.mesh&&this.scene.remove(t.mesh),t.body&&this.world.removeBody(t.body),t.particles&&this.scene.remove(t.particles)}),this.animatedObstacles.forEach(t=>{t.mesh&&this.scene.remove(t.mesh),t.body&&this.world.removeBody(t.body)}),this.specialObstacles.forEach(t=>{t.dispose&&t.dispose()}),this.bonusItems.forEach(t=>{this.scene.remove(t.mesh),this.world.removeBody(t.body)}),this.obstacles=[],this.animatedObstacles=[],this.specialObstacles=[],this.bonusItems=[],this.terrainZones=[]}}class Yv{constructor(){this.tilt={alpha:0,beta:0,gamma:0},this.calibration={beta:0,gamma:0},this.isEnabled=!1,this.isCalibrated=!1,this.hasGyroData=!1,this.smoothing=.3,this.smoothedTilt={beta:0,gamma:0},this.handleOrientation=this.handleOrientation.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.keyboardState={ArrowUp:!1,ArrowDown:!1,ArrowLeft:!1,ArrowRight:!1}}enable(){this.isEnabled||(this.isEnabled=!0,console.log("TiltControl enabled"),window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),setTimeout(()=>{this.hasGyroData&&(this.calibrate(),console.log("Gyro calibrated"))},1e3))}disable(){this.isEnabled=!1,window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp)}handleOrientation(t){this.isEnabled&&t.beta!==null&&t.gamma!==null&&(this.hasGyroData=!0,this.tilt.alpha=t.alpha||0,this.tilt.beta=t.beta||0,this.tilt.gamma=t.gamma||0,this.isCalibrated&&(this.tilt.beta-=this.calibration.beta,this.tilt.gamma-=this.calibration.gamma),this.tilt.beta=Math.max(-90,Math.min(90,this.tilt.beta)),this.tilt.gamma=Math.max(-90,Math.min(90,this.tilt.gamma)),this.smoothedTilt.beta+=(this.tilt.beta-this.smoothedTilt.beta)*this.smoothing,this.smoothedTilt.gamma+=(this.tilt.gamma-this.smoothedTilt.gamma)*this.smoothing)}handleKeyDown(t){this.keyboardState.hasOwnProperty(t.key)&&(this.keyboardState[t.key]=!0,t.preventDefault())}handleKeyUp(t){this.keyboardState.hasOwnProperty(t.key)&&(this.keyboardState[t.key]=!1,t.preventDefault())}calibrate(){this.calibration.beta=this.tilt.beta,this.calibration.gamma=this.tilt.gamma,this.isCalibrated=!0}getTilt(){const t={beta:0,gamma:0};return this.keyboardState.ArrowUp&&(t.beta+=30),this.keyboardState.ArrowDown&&(t.beta-=30),this.keyboardState.ArrowLeft&&(t.gamma-=30),this.keyboardState.ArrowRight&&(t.gamma+=30),t.beta!==0||t.gamma!==0?t:{beta:this.smoothedTilt.beta,gamma:this.smoothedTilt.gamma}}hasGyro(){return this.hasGyroData}}class Zv{constructor(){this.frames=[],this.reset()}reset(){this.frames=[];for(let t=0;t<10;t++)this.frames.push({throw1:null,throw2:null,throw3:null,score:null,cumulative:null,isStrike:!1,isSpare:!1})}recordThrow(t,e,n){const i=t-1,s=this.frames[i];t===10?e===1?(s.throw1=n,s.isStrike=n===10):e===2?(s.throw2=n,s.isStrike||(s.isSpare=s.throw1+n===10)):e===3&&(s.throw3=n):e===1?(s.throw1=n,s.isStrike=n===10):(s.throw2=n,s.isSpare=s.throw1+n===10),this.calculateScores()}calculateScores(){let t=0;for(let e=0;e<10;e++){const n=this.frames[e];if(n.throw1===null){n.score=null,n.cumulative=null;continue}if(e===9){if(n.throw1===null)continue;n.isStrike?n.throw2!==null&&n.throw3!==null&&(n.score=n.throw1+n.throw2+n.throw3):n.isSpare?n.throw3!==null&&(n.score=n.throw1+n.throw2+n.throw3):n.throw2!==null&&(n.score=n.throw1+n.throw2)}else if(n.isStrike){const i=this.getNextTwoThrows(e);i.length===2&&(n.score=10+i[0]+i[1])}else if(n.isSpare){const i=this.getNextThrow(e);i!==null&&(n.score=10+i)}else n.throw2!==null&&(n.score=n.throw1+n.throw2);n.score!==null&&(t+=n.score,n.cumulative=t)}}getNextThrow(t){const e=this.frames[t+1];return!e||e.throw1===null?null:e.throw1}getNextTwoThrows(t){const e=[];let n=t+1,i=0;for(;e.length<2&&n<10;){const s=this.frames[n];if(!s)break;if(i===0){if(s.throw1===null)break;if(e.push(s.throw1),i++,s.isStrike&&n<9){n++,i=0;continue}}if(i===1&&e.length<2){if(s.throw2===null)break;e.push(s.throw2)}break}if(n===9&&e.length<2){const s=this.frames[9];s.throw1!==null&&e.length===0&&e.push(s.throw1),s.throw2!==null&&e.length===1&&e.push(s.throw2)}return e}getTotalScore(){let t=0;for(const e of this.frames)e.score!==null?t+=e.score:e.throw1!==null&&(t+=e.throw1,e.throw2!==null&&(t+=e.throw2),e.throw3!==null&&(t+=e.throw3));return t}getFrameTotal(t){const e=this.frames[t-1];if(!e)return 0;let n=e.throw1||0;return e.throw2!==null&&(n+=e.throw2),n}isFrameComplete(t){const e=this.frames[t-1];return e?t===10?e.isStrike||e.isSpare?e.throw3!==null:e.throw2!==null:e.isStrike||e.throw2!==null:!1}getFrameData(){return this.frames}}class Kv{constructor(t){this.scene=t,this.particles=[],this.emitters=[]}createStrikeEffect(t){const e=[15965202,15158332,3066993,3447003,10181046,16777215],n=100;for(let i=0;i<n;i++){const s=new Ne(.15,.3),o=new Jt({color:e[Math.floor(Math.random()*e.length)],side:de,transparent:!0}),a=new mt(s,o);a.position.set(t.x+(Math.random()-.5)*2,t.y+Math.random()*3,t.z+(Math.random()-.5)*2),a.velocity=new F((Math.random()-.5)*15,Math.random()*20+10,(Math.random()-.5)*15),a.rotationSpeed=new F(Math.random()*10,Math.random()*10,Math.random()*10),a.life=3,a.maxLife=3,this.scene.add(a),this.particles.push(a)}}createSpareEffect(t){for(let n=0;n<50;n++){const i=new tn(.08,8,8),s=new Jt({color:3066993,transparent:!0}),o=new mt(i,s),a=n/50*Math.PI*2,c=2+Math.random()*2;o.position.set(t.x+Math.cos(a)*c,t.y+1,t.z+Math.sin(a)*c),o.velocity=new F(Math.cos(a)*5,Math.random()*10+5,Math.sin(a)*5),o.life=2,o.maxLife=2,this.scene.add(o),this.particles.push(o)}}createGutterEffect(t){for(let n=0;n<30;n++){const i=new tn(.05,6,6),s=new Jt({color:3447003,transparent:!0}),o=new mt(i,s);o.position.set(t.x+(Math.random()-.5)*4,t.y+8+Math.random()*2,t.z+(Math.random()-.5)*4),o.velocity=new F(0,-10,0),o.life=2,o.maxLife=2,this.scene.add(o),this.particles.push(o)}}createExplosionEffect(t,e=16737792){for(let i=0;i<40;i++){const s=new tn(.1+Math.random()*.1,8,8),o=new Jt({color:e,transparent:!0}),a=new mt(s,o);a.position.copy(t);const c=Math.random()*Math.PI*2,l=Math.random()*Math.PI,h=10+Math.random()*10;a.velocity=new F(Math.sin(l)*Math.cos(c)*h,Math.sin(l)*Math.sin(c)*h,Math.cos(l)*h),a.life=1.5,a.maxLife=1.5,this.scene.add(a),this.particles.push(a)}}createBounceEffect(t){for(let n=0;n<15;n++){const i=new ti(.1,.15,8),s=new Jt({color:16776960,side:de,transparent:!0}),o=new mt(i,s);o.position.copy(t),o.rotation.x=-Math.PI/2,o.scale.set(.1,.1,.1),o.targetScale=3+Math.random()*2,o.velocity=new F(0,.5,0),o.life=.5,o.maxLife=.5,o.isRing=!0,this.scene.add(o),this.particles.push(o)}}createLaunchEffect(t){for(let n=0;n<25;n++){const i=new xr(.1,.3,6),s=new Jt({color:n%2===0?3447003:65280,transparent:!0}),o=new mt(i,s),a=n/25*Math.PI*2,c=.5+Math.random()*.5;o.position.set(t.x+Math.cos(a)*c,t.y+.3,t.z+Math.sin(a)*c),o.rotation.x=Math.PI,o.velocity=new F(Math.cos(a)*3,Math.random()*8+12,Math.sin(a)*3),o.rotationSpeed=new F(Math.random()*5,Math.random()*5,Math.random()*5),o.life=1.5,o.maxLife=1.5,this.scene.add(o),this.particles.push(o)}}createVortexEffect(t){for(let n=0;n<30;n++){const i=new tn(.08,8,8),s=new Jt({color:10181046,transparent:!0}),o=new mt(i,s),a=n/30*Math.PI*4,c=.5+n/30*2;o.position.set(t.x+Math.cos(a)*c,t.y+.5+n/30*2,t.z+Math.sin(a)*c),o.velocity=new F(Math.cos(a+Math.PI/2)*8,5+Math.random()*3,Math.sin(a+Math.PI/2)*8),o.life=1.2,o.maxLife=1.2,this.scene.add(o),this.particles.push(o)}}createPawPrintEffect(t){const e=new xi(.15,16),n=new Jt({color:9127187,transparent:!0,opacity:.8}),i=new mt(e,n);i.position.set(t.x,.01,t.z),i.rotation.x=-Math.PI/2,i.life=3,i.maxLife=3,i.isStatic=!0,this.scene.add(i),this.particles.push(i);const s=new xi(.08,16);[{x:-.12,z:-.2},{x:.12,z:-.2},{x:-.18,z:-.08},{x:.18,z:-.08}].forEach(a=>{const c=new mt(s,n.clone());c.position.set(t.x+a.x,.01,t.z+a.z),c.rotation.x=-Math.PI/2,c.life=3,c.maxLife=3,c.isStatic=!0,this.scene.add(c),this.particles.push(c)})}update(t){for(let n=this.particles.length-1;n>=0;n--){const i=this.particles[n];if(i.life-=t,i.life<=0){this.scene.remove(i),this.particles.splice(n,1);continue}const s=i.life/i.maxLife;if(i.material&&(i.material.opacity=s),!i.isStatic)if(i.isRing){const o=i.targetScale*(1-s);i.scale.set(o,o,o),i.position.y+=i.velocity.y*t}else i.velocity.y+=-30*t,i.position.x+=i.velocity.x*t,i.position.y+=i.velocity.y*t,i.position.z+=i.velocity.z*t,i.rotationSpeed&&(i.rotation.x+=i.rotationSpeed.x*t,i.rotation.y+=i.rotationSpeed.y*t,i.rotation.z+=i.rotationSpeed.z*t)}}clear(){this.particles.forEach(t=>this.scene.remove(t)),this.particles=[]}}class jv{constructor(){this.audioContext=null,this.masterGain=null,this.enabled=!0,this.initialized=!1}async init(){if(!this.initialized)try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.masterGain=this.audioContext.createGain(),this.masterGain.connect(this.audioContext.destination),this.masterGain.gain.value=.5,this.initialized=!0}catch{console.warn("Web Audio API not supported"),this.enabled=!1}}resume(){this.audioContext&&this.audioContext.state==="suspended"&&this.audioContext.resume()}playTone(t,e,n="sine",i=.3){if(!this.enabled||!this.audioContext)return;const s=this.audioContext.createOscillator(),o=this.audioContext.createGain();s.connect(o),o.connect(this.masterGain),s.frequency.value=t,s.type=n,o.gain.setValueAtTime(i,this.audioContext.currentTime),o.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+e),s.start(),s.stop(this.audioContext.currentTime+e)}playStrike(){if(!this.enabled)return;[523.25,659.25,783.99,1046.5].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.3,"square",.2),this.playTone(e*1.5,.3,"triangle",.1)},n*100)}),setTimeout(()=>this.playNoise(.5,.3),300)}playSpare(){if(!this.enabled)return;[392,493.88,587.33].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.2,"triangle",.25)},n*80)})}playGutter(){if(!this.enabled)return;[392,349.23,311.13,277.18].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.4,"sawtooth",.15)},n*200)})}playPinHit(){this.enabled&&(this.playTone(800+Math.random()*400,.1,"square",.2),this.playTone(200+Math.random()*100,.15,"triangle",.3))}playRolling(t){if(!this.enabled||!this.audioContext)return;const e=Math.min(t/15,1)*.1;this.playTone(80+t*3,.1,"sine",e)}playBumper(){this.enabled&&(this.playTone(600,.05,"square",.3),this.playTone(900,.1,"sine",.2),setTimeout(()=>{this.playTone(1200,.05,"square",.2)},50))}playCatMeow(){if(!this.enabled)return;const t=700,e=400,n=.4,i=this.audioContext.createOscillator(),s=this.audioContext.createGain();i.connect(s),s.connect(this.masterGain),i.type="sine",i.frequency.setValueAtTime(t,this.audioContext.currentTime),i.frequency.exponentialRampToValueAtTime(e,this.audioContext.currentTime+n*.7),i.frequency.exponentialRampToValueAtTime(t*.8,this.audioContext.currentTime+n),s.gain.setValueAtTime(.3,this.audioContext.currentTime),s.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+n),i.start(),i.stop(this.audioContext.currentTime+n)}playPitFall(){if(!this.enabled)return;const t=400;for(let e=0;e<5;e++)setTimeout(()=>{this.playTone(t-e*60,.15,"sine",.25)},e*80);setTimeout(()=>{this.playNoise(.2,.3),this.playTone(60,.3,"sawtooth",.3)},400)}playLaunch(){this.enabled&&(this.playTone(200,.1,"square",.3),setTimeout(()=>{this.playTone(400,.1,"square",.25)},50),setTimeout(()=>{this.playTone(800,.1,"square",.2)},100),setTimeout(()=>{this.playNoise(.3,.2)},100))}playVortex(){if(!this.enabled||!this.audioContext)return;const t=this.audioContext.createOscillator(),e=this.audioContext.createGain();t.connect(e),e.connect(this.masterGain),t.type="sine",t.frequency.setValueAtTime(200,this.audioContext.currentTime),t.frequency.linearRampToValueAtTime(600,this.audioContext.currentTime+.5),e.gain.setValueAtTime(.3,this.audioContext.currentTime),e.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.5),t.start(),t.stop(this.audioContext.currentTime+.5)}playVortexRelease(){if(!this.enabled)return;[300,450,600,800].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.1,"sine",.25)},n*40)}),this.playNoise(.2,.25)}playPachinko(){if(!this.enabled)return;const t=1e3+Math.random()*500;this.playTone(t,.08,"sine",.15)}playExplosion(){this.enabled&&(this.playNoise(.3,.5),this.playTone(60,.4,"sawtooth",.4),this.playTone(40,.5,"sine",.3))}playBoost(){if(!this.enabled)return;[261.63,329.63,392,523.25].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.15,"square",.2)},n*50)})}playGameOver(t){this.enabled&&(t?[523.25,659.25,783.99,659.25,783.99,1046.5].forEach((n,i)=>{setTimeout(()=>{this.playTone(n,.25,"square",.2),this.playTone(n/2,.25,"triangle",.15)},i*150)}):[392,349.23,329.63,293.66].forEach((n,i)=>{setTimeout(()=>{this.playTone(n,.4,"sawtooth",.2)},i*250)}))}playNoise(t,e=.3){if(!this.enabled||!this.audioContext)return;const n=this.audioContext.sampleRate*t,i=this.audioContext.createBuffer(1,n,this.audioContext.sampleRate),s=i.getChannelData(0);for(let l=0;l<n;l++)s[l]=Math.random()*2-1;const o=this.audioContext.createBufferSource(),a=this.audioContext.createGain(),c=this.audioContext.createBiquadFilter();o.buffer=i,c.type="lowpass",c.frequency.value=1e3,o.connect(c),c.connect(a),a.connect(this.masterGain),a.gain.setValueAtTime(e,this.audioContext.currentTime),a.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+t),o.start(),o.stop(this.audioContext.currentTime+t)}setVolume(t){this.masterGain&&(this.masterGain.gain.value=t)}toggle(){return this.enabled=!this.enabled,this.enabled}}class $v{constructor(){this.container=null,this.init()}init(){this.container=document.createElement("div"),this.container.id="celebration-container",this.container.innerHTML=`
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
    `,document.head.appendChild(t)}showStrike(t=1){const e=document.getElementById("celebration-overlay"),n=e.querySelector(".celebration-icon"),i=e.querySelector(".celebration-text"),s=e.querySelector(".celebration-subtext");e.className="celebration",t>=3?(e.classList.add("turkey"),n.textContent="🦃",t===3?(i.textContent="TURKEY!",s.textContent="3 strikes in a row!"):t===4?(i.textContent="FOUR-BAGGER!",s.textContent="4 strikes in a row!"):t>=12?(e.classList.add("perfect"),n.textContent="👑",i.textContent="PERFECT GAME!",s.textContent="300 points!"):(i.textContent=`${t}X STRIKE!`,s.textContent=`${t} strikes in a row!`),this.startEmojiRain(["🎳","🔥","⭐","🏆","✨"],40)):(e.classList.add("strike"),n.textContent="🎳",i.textContent="STRIKE!",s.textContent=Jv(),this.startEmojiRain(["🎳","⭐","✨","🎉"],20)),e.classList.remove("hidden"),e.classList.add("show"),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.classList.add("hidden"),300)},2e3)}showSpare(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration spare",e.textContent="👍",n.textContent="SPARE!",i.textContent=Qv(),this.startEmojiRain(["✨","💚","👏"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showGutter(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="😿",n.textContent="GUTTER!",i.textContent=t_(),this.startEmojiRain(["💧","😢","🕳️"],10),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showCatAttack(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="🐱",n.textContent="MEOW!",i.textContent=e_(),this.startEmojiRain(["🐱","🐾","😸","🙀"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showPitFall(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="🕳️",n.textContent="PIT FALL!",i.textContent=n_(),this.startEmojiRain(["🕳️","💀","⬇️","😱"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}startEmojiRain(t,e){const n=document.getElementById("emoji-rain");n.innerHTML="";for(let i=0;i<e;i++)setTimeout(()=>{const s=document.createElement("div");s.className="falling-emoji",s.textContent=t[Math.floor(Math.random()*t.length)],s.style.left=`${Math.random()*100}%`,s.style.animationDuration=`${2+Math.random()*2}s`,s.style.fontSize=`${1.5+Math.random()*1.5}rem`,n.appendChild(s),setTimeout(()=>s.remove(),4e3)},i*100)}showGameEnd(t,e=!1){const n=document.getElementById("celebration-overlay"),i=n.querySelector(".celebration-icon"),s=n.querySelector(".celebration-text"),o=n.querySelector(".celebration-subtext");n.className="celebration",t>=300?(n.classList.add("perfect"),i.textContent="👑",s.textContent="PERFECT!",o.textContent="The impossible achieved!",this.startEmojiRain(["👑","🏆","⭐","🎉","💎"],50)):t>=250?(n.classList.add("turkey"),i.textContent="🏆",s.textContent="INCREDIBLE!",o.textContent=`${t} points! You're a legend!`,this.startEmojiRain(["🏆","⭐","🔥"],30)):t>=200?(n.classList.add("strike"),i.textContent="🎯",s.textContent="EXCELLENT!",o.textContent=`${t} points! Amazing game!`,this.startEmojiRain(["🎳","⭐","✨"],25)):t>=150?(n.classList.add("spare"),i.textContent="👏",s.textContent="GREAT JOB!",o.textContent=`${t} points! Well played!`,this.startEmojiRain(["👏","✨"],15)):t>=100?(i.textContent="😊",s.textContent="GOOD GAME!",o.textContent=`${t} points. Keep practicing!`):t>=50?(i.textContent="🤔",s.textContent="NICE TRY",o.textContent=`${t} points. You can do better!`):(n.classList.add("gutter"),i.textContent="😅",s.textContent="OOPS...",o.textContent=`${t} points. Maybe bowling isn't your thing?`,this.startEmojiRain(["💧","😢"],10)),n.classList.remove("hidden"),n.classList.add("show"),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>n.classList.add("hidden"),300)},3e3)}}function Jv(){const r=["Perfect hit!","Crushed it!","Bowling like a pro!","Nothing but pins!","Unstoppable!","On fire!","Textbook strike!","Clean sweep!"];return r[Math.floor(Math.random()*r.length)]}function Qv(){const r=["Nice recovery!","Clutch pickup!","Never give up!","Second chance success!","Way to adapt!","Saved it!"];return r[Math.floor(Math.random()*r.length)]}function t_(){const r=["The pins are laughing...","Did you close your eyes?","At least you tried!","The lane has sides, you know...","Ouch, that hurts to watch","Even the ball is embarrassed","Plot twist: the gutter wins"];return r[Math.floor(Math.random()*r.length)]}function e_(){const r=["Cat attack! Ball destroyed!","Kitty wanted to play too!","The cat has claimed your ball!","Feline interference!","Cat 1, Bowler 0"];return r[Math.floor(Math.random()*r.length)]}function n_(){const r=["Into the abyss!","Should've watched your step!","Gravity wins again!","Pit trap activated!","Down you go!","The void claims another..."];return r[Math.floor(Math.random()*r.length)]}class i_{constructor(t){this.canvas=t,this.isRunning=!1,this.gameState="ready",this.currentFrame=1,this.currentThrow=1,this.pinsKnocked=0,this.pinsStandingBeforeThrow=10,this.frameScores=[],this.consecutiveStrikes=0,this.ballDestroyed=!1,this.pinAreaZ=235,this.scene=new wu,this.scene.background=new Ht(8900331),this.scene.fog=new Ma(8900331,80,280),this.camera=new Qe(60,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new fg({canvas:this.canvas,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.world=new Iv,this.world.gravity.set(0,-9.82,0),this.world.broadphase=new ih,this.ball=null,this.pins=[],this.course=null,this.tiltControl=null,this.scoreSystem=null,this.particles=null,this.sounds=null,this.celebrations=null,this.clock=new gd,this.lastTime=0,this.init()}async init(){this.setupLighting(),this.setupCamera(),this.setupEffects(),this.createCourse(),this.createBall(),this.createPins(),this.setupControls(),this.setupScoreSystem(),window.addEventListener("resize",()=>this.onResize()),document.addEventListener("click",()=>this.sounds.init(),{once:!0}),document.addEventListener("touchstart",()=>this.sounds.init(),{once:!0})}setupEffects(){this.particles=new Kv(this.scene),this.sounds=new jv,this.celebrations=new $v}setupLighting(){const t=new pd(16777215,.6);this.scene.add(t);const e=new fd(16777215,.8);e.position.set(10,20,10),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,e.shadow.camera.near=.5,e.shadow.camera.far=100,e.shadow.camera.left=-30,e.shadow.camera.right=30,e.shadow.camera.top=30,e.shadow.camera.bottom=-30,this.scene.add(e)}setupCamera(){this.camera.position.set(0,8,-5),this.camera.lookAt(0,0,20)}createCourse(){this.course=new Xv(this.scene,this.world,{onBumperHit:t=>{this.sounds.playBumper(),this.particles.createBounceEffect(t.mesh.position)},onCatAttack:t=>{this.sounds.playCatMeow(),this.celebrations.showCatAttack(),this.destroyBall("cat")},onPitFall:t=>{this.sounds.playPitFall(),this.particles.createExplosionEffect(this.ball.getPosition()),this.celebrations.showPitFall(),this.destroyBall("pit")},onLaunch:(t,e)=>{this.sounds.playLaunch(),this.particles.createLaunchEffect(t.mesh.position),this.showMessage("LAUNCH!","#3498db")},onVortexCapture:t=>{this.sounds.playVortex(),this.showMessage("TAP TO RELEASE!","#9b59b6")},onVortexRelease:(t,e)=>{this.sounds.playVortexRelease(),this.particles.createVortexEffect(t.mesh.position)},onPachinkoHit:t=>{this.sounds.playPachinko()},onBonusCollect:t=>{this.sounds.playBoost(),this.applyBonus(t)}}),this.course.generate(this.currentFrame),this.pinAreaZ=this.course.getPinAreaZ()}createBall(){this.ball=new zv(this.scene,this.world),this.ball.reset()}createPins(){this.pins.forEach(n=>n.dispose()),this.pins=[];const t=this.pinAreaZ;[{x:0,z:t},{x:-.6,z:t+1},{x:.6,z:t+1},{x:-1.2,z:t+2},{x:0,z:t+2},{x:1.2,z:t+2},{x:-1.8,z:t+3},{x:-.6,z:t+3},{x:.6,z:t+3},{x:1.8,z:t+3}].forEach((n,i)=>{const s=new kv(this.scene,this.world,n.x,n.z,i);this.pins.push(s)})}setupControls(){this.tiltControl=new Yv,this.tiltControl.enable()}setupScoreSystem(){this.scoreSystem=new Zv}start(){this.isRunning=!0,this.gameState="playing",this.pinsStandingBeforeThrow=10,this.frameScores=[],this.ball.reset(),this.updateUI(),this.animate()}animate(){if(!this.isRunning)return;requestAnimationFrame(()=>this.animate());const t=this.clock.getDelta();this.clock.getElapsedTime(),this.world.step(1/60,t,3),this.gameState==="playing"&&!this.ballDestroyed&&(this.updateBall(t),this.updateCamera(),this.checkGameState()),this.ballDestroyed||this.ball.update(),this.pins.forEach(i=>i.update());const e=this.ballDestroyed?null:this.ball.getPosition(),n=this.ballDestroyed?null:this.ball.getVelocity();this.course.update(t,e,n),this.particles.update(t),this.renderer.render(this.scene,this.camera)}updateBall(t){const e=this.tiltControl.getTilt();this.ball.applyTiltForce(e,t);const n=this.ball.getPosition(),i=this.course.checkTerrainEffects(n);i&&i.type==="wind"&&(this.ball.body.velocity.x+=i.force.x*t);const s=this.ball.getSpeedPercent();this.updateSpeedGauge(s),n.z<this.pinAreaZ-5&&n.y<-5&&this.onBallFailed()}destroyBall(t){this.ballDestroyed=!0,this.ball.mesh.visible=!1,setTimeout(()=>{this.onBallFailed()},1500)}applyBonus(t){switch(t){case"speed":this.ball.boost(1.5,3e3),this.showMessage("SPEED BOOST!","#f39c12");break;case"shield":this.ball.activateShield(),this.showMessage("SHIELD!","#3498db");break;case"giant":this.ball.setGiant(!0),this.showMessage("GIANT MODE!","#9b59b6");break}}updateCamera(){const t=this.ball.getPosition(),e=t.x*.5,n=8,i=t.z-8;this.camera.position.x+=(e-this.camera.position.x)*.05,this.camera.position.y+=(n-this.camera.position.y)*.05,this.camera.position.z+=(i-this.camera.position.z)*.05,this.camera.lookAt(t.x,t.y,t.z+10)}checkGameState(){const t=this.ball.getPosition(),e=this.ball.getVelocity();if(t.z>this.pinAreaZ-5){if(t.y<-3){this.endThrow();return}Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)<.5&&this.endThrow()}}endThrow(){this.gameState="result";const t=this.pins.filter(s=>!s.isKnocked()).length,e=this.pinsStandingBeforeThrow-t;this.pinsKnocked=e,this.frameScores.push(e);const n=e===10&&this.currentThrow===1,i=this.currentThrow===2&&t===0;n?(this.consecutiveStrikes++,this.sounds.playStrike(),this.particles.createStrikeEffect(this.ball.getPosition()),this.celebrations.showStrike(this.consecutiveStrikes)):i?(this.consecutiveStrikes=0,this.sounds.playSpare(),this.particles.createSpareEffect(this.ball.getPosition()),this.celebrations.showSpare()):(this.consecutiveStrikes=0,e>0&&this.sounds.playPinHit()),this.scoreSystem.recordThrow(this.currentFrame,this.currentThrow,e),setTimeout(()=>this.showResult(),n||i?2e3:500)}onBallFailed(){this.gameState="result",this.pinsKnocked=0,this.consecutiveStrikes=0,this.frameScores.push(0),this.scoreSystem.recordThrow(this.currentFrame,this.currentThrow,0),this.ballDestroyed||(this.sounds.playGutter(),this.particles.createGutterEffect(this.ball.getPosition()),this.celebrations.showGutter()),setTimeout(()=>this.showResult(),2e3)}showResult(){const t=this.scoreSystem.frames[this.currentFrame-1],e=this.currentFrame===10;let n=`${this.pinsKnocked} pins`;if(this.pinsKnocked===10)(this.currentThrow===1||e&&this.pinsStandingBeforeThrow===10)&&(n="STRIKE!",this.showMessage("STRIKE!","#f1c40f"));else if(this.currentThrow===2&&!e)(t.throw1||0)+this.pinsKnocked===10&&(n="SPARE!",this.showMessage("SPARE!","#2ecc71"));else if(e&&this.currentThrow>=2){const a=this.pinsStandingBeforeThrow;this.pinsKnocked===a&&a===10?(n="STRIKE!",this.showMessage("STRIKE!","#f1c40f")):this.pinsKnocked===a&&a>0&&(n="SPARE!",this.showMessage("SPARE!","#2ecc71"))}document.getElementById("pins-knocked").textContent=n;let i="Next Frame";if(e){const a=t.throw1||0,c=t.throw2,l=a===10,h=!l&&c!==null&&a+c===10;this.currentThrow===1?i=l?"2nd Throw (Bonus)":"2nd Throw":this.currentThrow===2&&(l||h)?i="3rd Throw (Bonus)":i="Game Over"}else this.pinsKnocked===10&&this.currentThrow===1?i="Next Frame":this.currentThrow===1?i="2nd Throw":i="Next Frame";document.getElementById("next-frame-btn").textContent=i,this.updateScoreboard();const s=document.getElementById("scoreboard"),o=document.getElementById("result-scoreboard");o.innerHTML=s.outerHTML,document.getElementById("result-total").textContent=this.scoreSystem.getTotalScore(),window.app.showScreen("result-screen")}nextFrame(){const t=this.scoreSystem.frames[this.currentFrame-1];if(this.currentFrame===10)if(this.currentThrow===1)this.pinsKnocked===10?(this.currentThrow=2,this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.currentThrow=2,this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);else if(this.currentThrow===2){const n=t.throw1||0,i=t.throw2||0,s=n===10,o=!s&&n+i===10,a=s&&i===10;if(s||o)this.currentThrow=3,a||o?(this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);else{this.endGame();return}}else{this.endGame();return}else this.pinsKnocked===10&&this.currentThrow===1||this.currentThrow===2?(this.currentFrame++,this.currentThrow=1,this.frameScores=[],this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.currentThrow=2,this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);if(this.currentFrame>10){this.endGame();return}this.ballDestroyed=!1,this.ball.mesh.visible=!0,this.currentThrow===1?(this.course.generate(this.currentFrame),this.pinAreaZ=this.course.getPinAreaZ()):this.course.resetSpecialObstacles(),this.particles.clear(),window.app.showScreen("game-screen"),this.ball.reset(),this.gameState="playing",this.updateUI()}removeKnockedPins(){this.pins.filter(e=>e.isKnocked()).forEach(e=>e.dispose()),this.pins=this.pins.filter(e=>!e.isKnocked())}removeAllPins(){this.pins.forEach(t=>t.dispose()),this.pins=[]}endGame(){const t=this.scoreSystem.getTotalScore();this.sounds.playGameOver(t>=150),this.celebrations.showGameEnd(t),this.updateScoreboard();const e=document.getElementById("scoreboard"),n=document.getElementById("result-scoreboard");n.innerHTML=e.outerHTML,document.getElementById("pins-knocked").textContent="GAME OVER",document.getElementById("result-total").textContent=t,document.getElementById("next-frame-btn").textContent="Play Again",document.getElementById("next-frame-btn").onclick=()=>{this.resetGame()},setTimeout(()=>{window.app.showScreen("result-screen")},3500)}resetGame(){this.currentFrame=1,this.currentThrow=1,this.pinsKnocked=0,this.pinsStandingBeforeThrow=10,this.frameScores=[],this.consecutiveStrikes=0,this.ballDestroyed=!1,this.ball.mesh.visible=!0,this.scoreSystem.reset(),this.resetScoreboardDisplay(),this.course.generate(1),this.pinAreaZ=this.course.getPinAreaZ(),this.removeAllPins(),this.createPins(),this.ball.reset(),this.particles.clear(),window.app.showScreen("game-screen"),this.gameState="playing",this.updateUI(),document.getElementById("next-frame-btn").onclick=()=>{this.nextFrame()}}updateUI(){this.updateScoreboard()}updateScoreboard(){const t=this.scoreSystem.getFrameData();for(let e=0;e<10;e++){const n=document.querySelector(`.frame[data-frame="${e+1}"]`),i=t[e],s=e===9;n.classList.remove("current","completed"),e+1===this.currentFrame&&n.classList.add("current");const o=n.querySelector(".t1"),a=n.querySelector(".t2"),c=s?n.querySelector(".t3"):null,l=n.querySelector(".frame-score");if(o.classList.remove("strike","spare"),a.classList.remove("strike","spare"),c&&c.classList.remove("strike","spare"),s)if(i.throw1!==null?i.throw1===10?(o.textContent="X",o.classList.add("strike")):o.textContent=i.throw1===0?"-":i.throw1:o.textContent="-",i.throw2!==null?i.throw1===10?i.throw2===10?(a.textContent="X",a.classList.add("strike")):a.textContent=i.throw2===0?"-":i.throw2:i.throw1+i.throw2===10?(a.textContent="/",a.classList.add("spare")):a.textContent=i.throw2===0?"-":i.throw2:a.textContent="-",i.throw3!==null){const h=i.throw1===10&&i.throw2===10?0:i.throw1===10?i.throw2:i.throw1+i.throw2===10?0:null;i.throw3===10&&h===0?(c.textContent="X",c.classList.add("strike")):h!==null&&h+i.throw3===10?(c.textContent="/",c.classList.add("spare")):c.textContent=i.throw3===0?"-":i.throw3}else c&&(c.textContent="-");else i.throw1!==null?i.throw1===10?(o.textContent="",a.textContent="X",a.classList.add("strike")):(o.textContent=i.throw1===0?"-":i.throw1,i.throw2!==null?i.throw1+i.throw2===10?(a.textContent="/",a.classList.add("spare")):a.textContent=i.throw2===0?"-":i.throw2:a.textContent="-"):(o.textContent="-",a.textContent="-");if(i.cumulative!==null)l.textContent=i.cumulative,n.classList.add("completed");else if(i.throw1!==null){let h=i.throw1;i.throw2!==null&&(h+=i.throw2),i.throw3!==null&&(h+=i.throw3),l.textContent=""}else l.textContent="-"}}resetScoreboardDisplay(){for(let t=1;t<=10;t++){const e=document.querySelector(`.frame[data-frame="${t}"]`);e.classList.remove("current","completed");const n=e.querySelector(".t1"),i=e.querySelector(".t2"),s=e.querySelector(".t3"),o=e.querySelector(".frame-score");n.textContent="-",n.classList.remove("strike","spare"),i.textContent="-",i.classList.remove("strike","spare"),s&&(s.textContent="-",s.classList.remove("strike","spare")),o.textContent="-"}}updateSpeedGauge(t){document.getElementById("speed-bar").style.width=`${t}%`,document.getElementById("speed-text").textContent=`${Math.round(t)}%`}showMessage(t,e="#fff"){const n=document.getElementById("message-overlay");n.textContent=t,n.style.color=e,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},1500)}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}}class hl{constructor(){this.game=null,this.gyroEnabled=!1,this.permissionRequested=!1,this.init()}init(){const t=document.getElementById("gyro-status"),e=document.getElementById("gyro-btn"),n=document.getElementById("start-btn"),i=document.getElementById("next-frame-btn"),s=/iPad|iPhone|iPod/.test(navigator.userAgent),o=!!window.DeviceOrientationEvent,a=o&&typeof DeviceOrientationEvent.requestPermission=="function";console.log("Device check:",{isIOS:s,hasGyro:o,needsPermission:a,userAgent:navigator.userAgent}),o?a?(t.textContent="タップして傾きセンサーを許可",t.className="status info",e.textContent="傾きセンサーを許可"):(this.gyroEnabled=!0,t.textContent="傾きセンサー: 利用可能",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled")):(t.textContent="PCモード: 矢印キーで操作",t.className="status info",e.textContent="矢印キーで操作",e.disabled=!0,e.style.opacity="0.5"),e.onclick=c=>{if(c.preventDefault(),c.stopPropagation(),console.log("Gyro button clicked"),t.textContent="リクエスト中...",this.permissionRequested){t.textContent="既にリクエスト済みです";return}a?(this.permissionRequested=!0,DeviceOrientationEvent.requestPermission().then(l=>{console.log("Permission state:",l),l==="granted"?(this.gyroEnabled=!0,t.textContent="許可されました！",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled")):(t.textContent="拒否されました（矢印キーで操作可）",t.className="status error",this.permissionRequested=!1)}).catch(l=>{console.error("Permission error:",l),t.textContent="エラー: "+l.message,t.className="status error",this.permissionRequested=!1})):o&&(this.gyroEnabled=!0,t.textContent="傾きセンサー: 有効",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled"))},n.onclick=()=>{this.startGame()},i.onclick=()=>{this.game&&this.game.nextFrame()}}startGame(){if(this.showScreen("game-screen"),!this.game){const t=document.getElementById("game-canvas");this.game=new i_(t)}this.game.start()}showScreen(t){document.querySelectorAll(".screen").forEach(e=>{e.classList.add("hidden")}),document.getElementById(t).classList.remove("hidden")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.app=new hl}):window.app=new hl;
