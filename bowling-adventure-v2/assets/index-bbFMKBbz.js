(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const fa="182",yh=0,Va=1,Mh=2,lr=1,wh=2,ds=3,ni=0,Xe=1,Xt=2,Vn=0,zi=1,Ha=2,Wa=3,qa=4,Sh=5,pi=100,bh=101,Eh=102,Th=103,Ah=104,Ch=200,Rh=201,Ph=202,Ih=203,go=204,xo=205,Lh=206,Dh=207,Nh=208,Fh=209,Uh=210,Bh=211,Oh=212,zh=213,kh=214,vo=0,_o=1,yo=2,Vi=3,Mo=4,wo=5,So=6,bo=7,fl=0,Gh=1,Vh=2,wn=0,pl=1,ml=2,gl=3,xl=4,vl=5,_l=6,yl=7,Ml=300,_i=301,Hi=302,Eo=303,To=304,_r=306,Ao=1e3,Gn=1001,Co=1002,Ne=1003,Hh=1004,Ds=1005,Oe=1006,Cr=1007,xi=1008,$e=1009,wl=1010,Sl=1011,vs=1012,pa=1013,Tn=1014,yn=1015,Wn=1016,ma=1017,ga=1018,_s=1020,bl=35902,El=35899,Tl=1021,Al=1022,hn=1023,qn=1026,vi=1027,Cl=1028,xa=1029,Wi=1030,va=1031,_a=1033,hr=33776,ur=33777,dr=33778,fr=33779,Ro=35840,Po=35841,Io=35842,Lo=35843,Do=36196,No=37492,Fo=37496,Uo=37488,Bo=37489,Oo=37490,zo=37491,ko=37808,Go=37809,Vo=37810,Ho=37811,Wo=37812,qo=37813,Xo=37814,Yo=37815,Zo=37816,Ko=37817,jo=37818,$o=37819,Jo=37820,Qo=37821,ta=36492,ea=36494,na=36495,ia=36283,sa=36284,ra=36285,oa=36286,Wh=3200,Rl=0,qh=1,Qn="",en="srgb",qi="srgb-linear",mr="linear",oe="srgb",Si=7680,Xa=519,Xh=512,Yh=513,Zh=514,ya=515,Kh=516,jh=517,Ma=518,$h=519,Ya=35044,Za="300 es",Mn=2e3,gr=2001;function Pl(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function xr(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Jh(){const o=xr("canvas");return o.style.display="block",o}const Ka={};function ja(...o){const t="THREE."+o.shift();console.log(t,...o)}function Ft(...o){const t="THREE."+o.shift();console.warn(t,...o)}function Qt(...o){const t="THREE."+o.shift();console.error(t,...o)}function ys(...o){const t=o.join(" ");t in Ka||(Ka[t]=!0,Ft(...o))}function Qh(o,t,e){return new Promise(function(n,i){function s(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:i();break;case o.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}class Zi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rr=Math.PI/180,aa=180/Math.PI;function Ki(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[o&255]+Ue[o>>8&255]+Ue[o>>16&255]+Ue[o>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function qt(o,t,e){return Math.max(t,Math.min(e,o))}function tu(o,t){return(o%t+t)%t}function Pr(o,t,e){return(1-e)*o+e*t}function es(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function We(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class yt{constructor(t=0,e=0){yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}let ji=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,r,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[r+0],f=s[r+1],m=s[r+2],x=s[r+3];if(a<=0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a>=1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=x;return}if(u!==x||c!==d||l!==f||h!==m){let g=c*d+l*f+h*m+u*x;g<0&&(d=-d,f=-f,m=-m,x=-x,g=-g);let p=1-a;if(g<.9995){const v=Math.acos(g),y=Math.sin(v);p=Math.sin(p*v)/y,a=Math.sin(a*v)/y,c=c*p+d*a,l=l*p+f*a,h=h*p+m*a,u=u*p+x*a}else{c=c*p+d*a,l=l*p+f*a,h=h*p+m*a,u=u*p+x*a;const v=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=v,l*=v,h*=v,u*=v}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,r){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[r],d=s[r+1],f=s[r+2],m=s[r+3];return t[e]=a*m+h*u+c*f-l*d,t[e+1]=c*m+h*d+l*u-a*f,t[e+2]=l*m+h*f+a*d-c*u,t[e+3]=h*m-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),f=c(i/2),m=c(s/2);switch(r){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:Ft("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(r-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(r-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+i*l-s*c,this._y=i*h+r*c+s*a-n*l,this._z=s*h+r*l+n*c-i*a,this._w=r*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let n=t._x,i=t._y,s=t._z,r=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,s=-s,r=-r,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+s*e,this._w=this._w*c+r*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+s*e,this._w=this._w*c+r*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($a.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($a.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*i-a*n),h=2*(a*e-s*i),u=2*(s*n-r*e);return this.x=e+c*l+r*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,r=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*r-n*c,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ir.copy(this).projectOnVector(t),this.sub(Ir)}reflect(t){return this.sub(Ir.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ir=new N,$a=new ji;class zt{constructor(t,e,n,i,s,r,a,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,a,c,l)}set(t,e,n,i,s,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],x=i[0],g=i[3],p=i[6],v=i[1],y=i[4],_=i[7],E=i[2],T=i[5],C=i[8];return s[0]=r*x+a*v+c*E,s[3]=r*g+a*y+c*T,s[6]=r*p+a*_+c*C,s[1]=l*x+h*v+u*E,s[4]=l*g+h*y+u*T,s[7]=l*p+h*_+u*C,s[2]=d*x+f*v+m*E,s[5]=d*g+f*y+m*T,s[8]=d*p+f*_+m*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*s*h+n*a*c+i*s*l-i*r*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*r-a*l,d=a*c-h*s,f=l*s-r*c,m=e*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=u*x,t[1]=(i*l-h*n)*x,t[2]=(a*n-i*r)*x,t[3]=d*x,t[4]=(h*e-i*c)*x,t[5]=(i*s-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(r*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-i*l,i*c,-i*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Lr.makeScale(t,e)),this}rotate(t){return this.premultiply(Lr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Lr=new zt,Ja=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qa=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function eu(){const o={enabled:!0,workingColorSpace:qi,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===oe&&(i.r=Hn(i.r),i.g=Hn(i.g),i.b=Hn(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===oe&&(i.r=ki(i.r),i.g=ki(i.g),i.b=ki(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Qn?mr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return ys("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return ys("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return o.define({[qi]:{primaries:t,whitePoint:n,transfer:mr,toXYZ:Ja,fromXYZ:Qa,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:t,whitePoint:n,transfer:oe,toXYZ:Ja,fromXYZ:Qa,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),o}const Kt=eu();function Hn(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function ki(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let bi;class nu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{bi===void 0&&(bi=xr("canvas")),bi.width=t.width,bi.height=t.height;const i=bi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=bi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=xr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Hn(s[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Hn(e[n]/255)*255):e[n]=Hn(e[n]);return{data:e,width:t.width,height:t.height}}else return Ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let iu=0;class wa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=Ki(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(Dr(i[r].image)):s.push(Dr(i[r]))}else s=Dr(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Dr(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?nu.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(Ft("Texture: Unable to serialize Texture."),{})}let su=0;const Nr=new N;class ze extends Zi{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=Gn,i=Gn,s=Oe,r=xi,a=hn,c=$e,l=ze.DEFAULT_ANISOTROPY,h=Qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=Ki(),this.name="",this.source=new wa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Nr).x}get height(){return this.source.getSize(Nr).y}get depth(){return this.source.getSize(Nr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ft(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ft(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ml)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ao:t.x=t.x-Math.floor(t.x);break;case Gn:t.x=t.x<0?0:1;break;case Co:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ao:t.y=t.y-Math.floor(t.y);break;case Gn:t.y=t.y<0?0:1;break;case Co:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=Ml;ze.DEFAULT_ANISOTROPY=1;class ye{constructor(t=0,e=0,n=0,i=1){ye.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(f+1)/2,E=(p+1)/2,T=(h+d)/4,C=(u+x)/4,L=(m+g)/4;return y>_&&y>E?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=T/n,s=C/n):_>E?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=T/i,s=L/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=C/s,i=L/s),this.set(n,i,s,e),this}let v=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(u-x)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ru extends Zi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ye(0,0,t,e),this.scissorTest=!1,this.viewport=new ye(0,0,t,e);const i={width:t,height:e,depth:n.depth},s=new ze(i);this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Oe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new wa(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sn extends ru{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Il extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ou extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ts{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,rn):rn.fromBufferAttribute(s,r),rn.applyMatrix4(t.matrixWorld),this.expandByPoint(rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ns.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ns.copy(n.boundingBox)),Ns.applyMatrix4(t.matrixWorld),this.union(Ns)}const i=t.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,rn),rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ns),Fs.subVectors(this.max,ns),Ei.subVectors(t.a,ns),Ti.subVectors(t.b,ns),Ai.subVectors(t.c,ns),Xn.subVectors(Ti,Ei),Yn.subVectors(Ai,Ti),oi.subVectors(Ei,Ai);let e=[0,-Xn.z,Xn.y,0,-Yn.z,Yn.y,0,-oi.z,oi.y,Xn.z,0,-Xn.x,Yn.z,0,-Yn.x,oi.z,0,-oi.x,-Xn.y,Xn.x,0,-Yn.y,Yn.x,0,-oi.y,oi.x,0];return!Fr(e,Ei,Ti,Ai,Fs)||(e=[1,0,0,0,1,0,0,0,1],!Fr(e,Ei,Ti,Ai,Fs))?!1:(Us.crossVectors(Xn,Yn),e=[Us.x,Us.y,Us.z],Fr(e,Ei,Ti,Ai,Fs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const In=[new N,new N,new N,new N,new N,new N,new N,new N],rn=new N,Ns=new Ts,Ei=new N,Ti=new N,Ai=new N,Xn=new N,Yn=new N,oi=new N,ns=new N,Fs=new N,Us=new N,ai=new N;function Fr(o,t,e,n,i){for(let s=0,r=o.length-3;s<=r;s+=3){ai.fromArray(o,s);const a=i.x*Math.abs(ai.x)+i.y*Math.abs(ai.y)+i.z*Math.abs(ai.z),c=t.dot(ai),l=e.dot(ai),h=n.dot(ai);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const au=new Ts,is=new N,Ur=new N;let yr=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):au.setFromPoints(t).getCenter(n);let i=0;for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;is.subVectors(t,this.center);const e=is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(is,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ur.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(is.copy(t.center).add(Ur)),this.expandByPoint(is.copy(t.center).sub(Ur))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}};const Ln=new N,Br=new N,Bs=new N,Zn=new N,Or=new N,Os=new N,zr=new N;let Ll=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Br.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(Br);const s=t.distanceTo(e)*.5,r=-this.direction.dot(Bs),a=Zn.dot(this.direction),c=-Zn.dot(Bs),l=Zn.lengthSq(),h=Math.abs(1-r*r);let u,d,f,m;if(h>0)if(u=r*c-a,d=r*a-c,m=s*h,u>=0)if(d>=-m)if(d<=m){const x=1/h;u*=x,d*=x,f=u*(u+r*d+2*a)+d*(r*u+d+2*c)+l}else d=s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-r*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(r*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=r>0?-s:s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Br).addScaledVector(Bs,d),f}intersectSphere(t,e){Ln.subVectors(t.center,this.origin);const n=Ln.dot(this.direction),i=Ln.dot(Ln)-n*n,s=t.radius*t.radius;if(i>s)return null;const r=Math.sqrt(s-i),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,n,i,s){Or.subVectors(e,t),Os.subVectors(n,t),zr.crossVectors(Or,Os);let r=this.direction.dot(zr),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Zn.subVectors(this.origin,t);const c=a*this.direction.dot(Os.crossVectors(Zn,Os));if(c<0)return null;const l=a*this.direction.dot(Or.cross(Zn));if(l<0||c+l>r)return null;const h=-a*Zn.dot(zr);return h<0?null:this.at(h/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class me{constructor(t,e,n,i,s,r,a,c,l,h,u,d,f,m,x,g){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,a,c,l,h,u,d,f,m,x,g)}set(t,e,n,i,s,r,a,c,l,h,u,d,f,m,x,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=r,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,n=t.elements,i=1/Ci.setFromMatrixColumn(t,0).length(),s=1/Ci.setFromMatrixColumn(t,1).length(),r=1/Ci.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=r*h,f=r*u,m=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+m*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=m+f*l,e[10]=r*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,m=l*h,x=l*u;e[0]=d+x*a,e[4]=m*a-f,e[8]=r*l,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=f*a-m,e[6]=x+d*a,e[10]=r*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,m=l*h,x=l*u;e[0]=d-x*a,e[4]=-r*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=r*h,e[9]=x-d*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const d=r*h,f=r*u,m=a*h,x=a*u;e[0]=c*h,e[4]=m*l-f,e[8]=d*l+x,e[1]=c*u,e[5]=x*l+d,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const d=r*c,f=r*l,m=a*c,x=a*l;e[0]=c*h,e[4]=x-d*u,e[8]=m*u+f,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+m,e[10]=d-x*u}else if(t.order==="XZY"){const d=r*c,f=r*l,m=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+x,e[5]=r*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cu,t,lu)}lookAt(t,e,n){const i=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),Kn.crossVectors(n,Ke),Kn.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),Kn.crossVectors(n,Ke)),Kn.normalize(),zs.crossVectors(Ke,Kn),i[0]=Kn.x,i[4]=zs.x,i[8]=Ke.x,i[1]=Kn.y,i[5]=zs.y,i[9]=Ke.y,i[2]=Kn.z,i[6]=zs.z,i[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],v=n[3],y=n[7],_=n[11],E=n[15],T=i[0],C=i[4],L=i[8],M=i[12],S=i[1],P=i[5],U=i[9],I=i[13],O=i[2],B=i[6],D=i[10],V=i[14],q=i[3],J=i[7],it=i[11],ot=i[15];return s[0]=r*T+a*S+c*O+l*q,s[4]=r*C+a*P+c*B+l*J,s[8]=r*L+a*U+c*D+l*it,s[12]=r*M+a*I+c*V+l*ot,s[1]=h*T+u*S+d*O+f*q,s[5]=h*C+u*P+d*B+f*J,s[9]=h*L+u*U+d*D+f*it,s[13]=h*M+u*I+d*V+f*ot,s[2]=m*T+x*S+g*O+p*q,s[6]=m*C+x*P+g*B+p*J,s[10]=m*L+x*U+g*D+p*it,s[14]=m*M+x*I+g*V+p*ot,s[3]=v*T+y*S+_*O+E*q,s[7]=v*C+y*P+_*B+E*J,s[11]=v*L+y*U+_*D+E*it,s[15]=v*M+y*I+_*V+E*ot,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],x=t[7],g=t[11],p=t[15],v=c*f-l*d,y=a*f-l*u,_=a*d-c*u,E=r*f-l*h,T=r*d-c*h,C=r*u-a*h;return e*(x*v-g*y+p*_)-n*(m*v-g*E+p*T)+i*(m*y-x*E+p*C)-s*(m*_-x*T+g*C)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],x=t[13],g=t[14],p=t[15],v=u*g*l-x*d*l+x*c*f-a*g*f-u*c*p+a*d*p,y=m*d*l-h*g*l-m*c*f+r*g*f+h*c*p-r*d*p,_=h*x*l-m*u*l+m*a*f-r*x*f-h*a*p+r*u*p,E=m*u*c-h*x*c-m*a*d+r*x*d+h*a*g-r*u*g,T=e*v+n*y+i*_+s*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return t[0]=v*C,t[1]=(x*d*s-u*g*s-x*i*f+n*g*f+u*i*p-n*d*p)*C,t[2]=(a*g*s-x*c*s+x*i*l-n*g*l-a*i*p+n*c*p)*C,t[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*f-n*c*f)*C,t[4]=y*C,t[5]=(h*g*s-m*d*s+m*i*f-e*g*f-h*i*p+e*d*p)*C,t[6]=(m*c*s-r*g*s-m*i*l+e*g*l+r*i*p-e*c*p)*C,t[7]=(r*d*s-h*c*s+h*i*l-e*d*l-r*i*f+e*c*f)*C,t[8]=_*C,t[9]=(m*u*s-h*x*s-m*n*f+e*x*f+h*n*p-e*u*p)*C,t[10]=(r*x*s-m*a*s+m*n*l-e*x*l-r*n*p+e*a*p)*C,t[11]=(h*a*s-r*u*s-h*n*l+e*u*l+r*n*f-e*a*f)*C,t[12]=E*C,t[13]=(h*x*i-m*u*i+m*n*d-e*x*d-h*n*g+e*u*g)*C,t[14]=(m*a*i-r*x*i-m*n*c+e*x*c+r*n*g-e*a*g)*C,t[15]=(r*u*i-h*a*i+h*n*c-e*u*c-r*n*d+e*a*d)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,r=t.x,a=t.y,c=t.z,l=s*r,h=s*a;return this.set(l*r+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*r,0,l*c-i*a,h*c+i*r,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,r=e._y,a=e._z,c=e._w,l=s+s,h=r+r,u=a+a,d=s*l,f=s*h,m=s*u,x=r*h,g=r*u,p=a*u,v=c*l,y=c*h,_=c*u,E=n.x,T=n.y,C=n.z;return i[0]=(1-(x+p))*E,i[1]=(f+_)*E,i[2]=(m-y)*E,i[3]=0,i[4]=(f-_)*T,i[5]=(1-(d+p))*T,i[6]=(g+v)*T,i[7]=0,i[8]=(m+y)*C,i[9]=(g-v)*C,i[10]=(1-(d+x))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;if(t.x=i[12],t.y=i[13],t.z=i[14],this.determinant()===0)return n.set(1,1,1),e.identity(),this;let s=Ci.set(i[0],i[1],i[2]).length();const r=Ci.set(i[4],i[5],i[6]).length(),a=Ci.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),on.copy(this);const l=1/s,h=1/r,u=1/a;return on.elements[0]*=l,on.elements[1]*=l,on.elements[2]*=l,on.elements[4]*=h,on.elements[5]*=h,on.elements[6]*=h,on.elements[8]*=u,on.elements[9]*=u,on.elements[10]*=u,e.setFromRotationMatrix(on),n.x=s,n.y=r,n.z=a,this}makePerspective(t,e,n,i,s,r,a=Mn,c=!1){const l=this.elements,h=2*s/(e-t),u=2*s/(n-i),d=(e+t)/(e-t),f=(n+i)/(n-i);let m,x;if(c)m=s/(r-s),x=r*s/(r-s);else if(a===Mn)m=-(r+s)/(r-s),x=-2*r*s/(r-s);else if(a===gr)m=-r/(r-s),x=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,r,a=Mn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),f=-(n+i)/(n-i);let m,x;if(c)m=1/(r-s),x=r/(r-s);else if(a===Mn)m=-2/(r-s),x=-(r+s)/(r-s);else if(a===gr)m=-1/(r-s),x=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ci=new N,on=new me,cu=new N(0,0,0),lu=new N(1,1,1),Kn=new N,zs=new N,Ke=new N,tc=new me,ec=new ji;class fn{constructor(t=0,e=0,n=0,i=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],r=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-qt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ec.setFromEuler(this),this.setFromQuaternion(ec,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class Dl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hu=0;const nc=new N,Ri=new ji,Dn=new me,ks=new N,ss=new N,uu=new N,du=new ji,ic=new N(1,0,0),sc=new N(0,1,0),rc=new N(0,0,1),oc={type:"added"},fu={type:"removed"},Pi={type:"childadded",child:null},kr={type:"childremoved",child:null};class Fe extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DEFAULT_UP.clone();const t=new N,e=new fn,n=new ji,i=new N(1,1,1);function s(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new me},normalMatrix:{value:new zt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.premultiply(Ri),this}rotateX(t){return this.rotateOnAxis(ic,t)}rotateY(t){return this.rotateOnAxis(sc,t)}rotateZ(t){return this.rotateOnAxis(rc,t)}translateOnAxis(t,e){return nc.copy(t).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ic,t)}translateY(t){return this.translateOnAxis(sc,t)}translateZ(t){return this.translateOnAxis(rc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ks.copy(t):ks.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(ss,ks,this.up):Dn.lookAt(ks,ss,this.up),this.quaternion.setFromRotationMatrix(Dn),i&&(Dn.extractRotation(i.matrixWorld),Ri.setFromRotationMatrix(Dn),this.quaternion.premultiply(Ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(oc),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(fu),kr.child=t,this.dispatchEvent(kr),kr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(oc),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,t,uu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,du,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),u=r(t.shapes),d=r(t.skeletons),f=r(t.animations),m=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Fe.DEFAULT_UP=new N(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const an=new N,Nn=new N,Gr=new N,Fn=new N,Ii=new N,Li=new N,ac=new N,Vr=new N,Hr=new N,Wr=new N,qr=new ye,Xr=new ye,Yr=new ye;class ln{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),an.subVectors(t,e),i.cross(an);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){an.subVectors(i,e),Nn.subVectors(n,e),Gr.subVectors(t,e);const r=an.dot(an),a=an.dot(Nn),c=an.dot(Gr),l=Nn.dot(Nn),h=Nn.dot(Gr),u=r*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,m=(r*h-a*c)*d;return s.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(t,e,n,i,s,r,a,c){return this.getBarycoord(t,e,n,i,Fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Fn.x),c.addScaledVector(r,Fn.y),c.addScaledVector(a,Fn.z),c)}static getInterpolatedAttribute(t,e,n,i,s,r){return qr.setScalar(0),Xr.setScalar(0),Yr.setScalar(0),qr.fromBufferAttribute(t,e),Xr.fromBufferAttribute(t,n),Yr.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(qr,s.x),r.addScaledVector(Xr,s.y),r.addScaledVector(Yr,s.z),r}static isFrontFacing(t,e,n,i){return an.subVectors(n,e),Nn.subVectors(t,e),an.cross(Nn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),an.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return ln.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let r,a;Ii.subVectors(i,n),Li.subVectors(s,n),Vr.subVectors(t,n);const c=Ii.dot(Vr),l=Li.dot(Vr);if(c<=0&&l<=0)return e.copy(n);Hr.subVectors(t,i);const h=Ii.dot(Hr),u=Li.dot(Hr);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector(Ii,r);Wr.subVectors(t,s);const f=Ii.dot(Wr),m=Li.dot(Wr);if(m>=0&&f<=m)return e.copy(s);const x=f*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(Li,a);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return ac.subVectors(s,i),a=(u-h)/(u-h+(f-m)),e.copy(i).addScaledVector(ac,a);const p=1/(g+x+d);return r=x*p,a=d*p,e.copy(n).addScaledVector(Ii,r).addScaledVector(Li,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function Zr(o,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?o+(t-o)*6*e:e<1/2?t:e<2/3?o+(t-o)*6*(2/3-e):o}class Bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=en){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Kt.workingColorSpace){if(t=tu(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,r=2*n-s;this.r=Zr(r,s,t+1/3),this.g=Zr(r,s,t),this.b=Zr(r,s,t-1/3)}return Kt.colorSpaceToWorking(this,i),this}setStyle(t,e=en){function n(s){s!==void 0&&parseFloat(s)<1&&Ft("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Ft("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);Ft("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=en){const n=Nl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ft("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}copyLinearToSRGB(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=en){return Kt.workingToColorSpace(Be.copy(this),t),Math.round(qt(Be.r*255,0,255))*65536+Math.round(qt(Be.g*255,0,255))*256+Math.round(qt(Be.b*255,0,255))}getHexString(t=en){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Be.copy(this),e);const n=Be.r,i=Be.g,s=Be.b,r=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const u=r-a;switch(l=h<=.5?u/(r+a):u/(2-r-a),r){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=en){Kt.workingToColorSpace(Be.copy(this),t);const e=Be.r,n=Be.g,i=Be.b;return t!==en?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(Gs);const n=Pr(jn.h,Gs.h,e),i=Pr(jn.s,Gs.s,e),s=Pr(jn.l,Gs.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Bt;Bt.NAMES=Nl;let pu=0,$i=class extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=Ki(),this.name="",this.type="Material",this.blending=zi,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=go,this.blendDst=xo,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ft(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ft(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zi&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==go&&(n.blendSrc=this.blendSrc),this.blendDst!==xo&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const a in s){const c=s[a];delete c.metadata,r.push(c)}return r}if(e){const s=i(t.textures),r=i(t.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class _t extends $i{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new N,Vs=new yt;let mu=0;class dn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ya,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Vs.fromBufferAttribute(this,e),Vs.applyMatrix3(t),this.setXY(e,Vs.x,Vs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=We(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=es(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=es(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=es(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ya&&(t.usage=this.usage),t}}class Fl extends dn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ul extends dn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class jt extends dn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let gu=0;const tn=new me,Kr=new Fe,Di=new N,je=new Ts,rs=new Ts,Le=new N;class Pe extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=Ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pl(t)?Ul:Fl)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new zt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return Kr.lookAt(t),Kr.updateMatrix(),this.applyMatrix4(Kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new jt(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&Ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ts);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];je.setFromBufferAttribute(s),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){const a=e[s];rs.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(je.min,rs.min),je.expandByPoint(Le),Le.addVectors(je.max,rs.max),je.expandByPoint(Le)):(je.expandByPoint(rs.min),je.expandByPoint(rs.max))}je.getCenter(n);let i=0;for(let s=0,r=t.count;s<r;s++)Le.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Le));if(e)for(let s=0,r=e.length;s<r;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Le.fromBufferAttribute(a,l),c&&(Di.fromBufferAttribute(t,l),Le.add(Di)),i=Math.max(i,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dn(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new N,c[L]=new N;const l=new N,h=new N,u=new N,d=new yt,f=new yt,m=new yt,x=new N,g=new N;function p(L,M,S){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,S),d.fromBufferAttribute(s,L),f.fromBufferAttribute(s,M),m.fromBufferAttribute(s,S),h.sub(l),u.sub(l),f.sub(d),m.sub(d);const P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[L].add(x),a[M].add(x),a[S].add(x),c[L].add(g),c[M].add(g),c[S].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let L=0,M=v.length;L<M;++L){const S=v[L],P=S.start,U=S.count;for(let I=P,O=P+U;I<O;I+=3)p(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const y=new N,_=new N,E=new N,T=new N;function C(L){E.fromBufferAttribute(i,L),T.copy(E);const M=a[L];y.copy(M),y.sub(E.multiplyScalar(E.dot(M))).normalize(),_.crossVectors(T,M);const P=_.dot(c[L])<0?-1:1;r.setXYZW(L,y.x,y.y,y.z,P)}for(let L=0,M=v.length;L<M;++L){const S=v[L],P=S.start,U=S.count;for(let I=P,O=P+U;I<O;I+=3)C(t.getX(I+0)),C(t.getX(I+1)),C(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new dn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new N,s=new N,r=new N,a=new N,c=new N,l=new N,h=new N,u=new N;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),x=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,m),s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,g),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,m=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new dn(d,h,u)}if(this.index===null)return Ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Pe,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cc=new me,ci=new Ll,Hs=new yr,lc=new N,Ws=new N,qs=new N,Xs=new N,jr=new N,Ys=new N,hc=new N,Zs=new N;class Z extends Fe{constructor(t=new Pe,e=new _t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Ys.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(jr.fromBufferAttribute(u,t),r?Ys.addScaledVector(jr,h):Ys.addScaledVector(jr.sub(e),h))}e.add(Ys)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(s),ci.copy(t.ray).recast(t.near),!(Hs.containsPoint(ci.origin)===!1&&(ci.intersectSphere(Hs,lc)===null||ci.origin.distanceToSquared(lc)>(t.far-t.near)**2))&&(cc.copy(s).invert(),ci.copy(t.ray).applyMatrix4(cc),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ci)))}_computeIntersections(t,e,n){let i;const s=this.geometry,r=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(r))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=r[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,E=y;_<E;_+=3){const T=a.getX(_),C=a.getX(_+1),L=a.getX(_+2);i=Ks(this,p,t,n,l,h,u,T,C,L),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const v=a.getX(g),y=a.getX(g+1),_=a.getX(g+2);i=Ks(this,r,t,n,l,h,u,v,y,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=r[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=v,E=y;_<E;_+=3){const T=_,C=_+1,L=_+2;i=Ks(this,p,t,n,l,h,u,T,C,L),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const v=g,y=g+1,_=g+2;i=Ks(this,r,t,n,l,h,u,v,y,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function xu(o,t,e,n,i,s,r,a){let c;if(t.side===Xe?c=n.intersectTriangle(r,s,i,!0,a):c=n.intersectTriangle(i,s,r,t.side===ni,a),c===null)return null;Zs.copy(a),Zs.applyMatrix4(o.matrixWorld);const l=e.ray.origin.distanceTo(Zs);return l<e.near||l>e.far?null:{distance:l,point:Zs.clone(),object:o}}function Ks(o,t,e,n,i,s,r,a,c,l){o.getVertexPosition(a,Ws),o.getVertexPosition(c,qs),o.getVertexPosition(l,Xs);const h=xu(o,t,e,n,Ws,qs,Xs,hc);if(h){const u=new N;ln.getBarycoord(hc,Ws,qs,Xs,u),i&&(h.uv=ln.getInterpolatedAttribute(i,a,c,l,u,new yt)),s&&(h.uv1=ln.getInterpolatedAttribute(s,a,c,l,u,new yt)),r&&(h.normal=ln.getInterpolatedAttribute(r,a,c,l,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new N,materialIndex:0};ln.getNormal(Ws,qs,Xs,d.normal),h.face=d,h.barycoord=u}return h}class sn extends Pe{constructor(t=1,e=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const c=[],l=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,r,s,0),m("z","y","x",1,-1,n,e,-t,r,s,1),m("x","z","y",1,1,t,n,e,i,r,2),m("x","z","y",1,-1,t,n,-e,i,r,3),m("x","y","z",1,-1,t,e,n,i,s,4),m("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(u,2));function m(x,g,p,v,y,_,E,T,C,L,M){const S=_/C,P=E/L,U=_/2,I=E/2,O=T/2,B=C+1,D=L+1;let V=0,q=0;const J=new N;for(let it=0;it<D;it++){const ot=it*P-I;for(let at=0;at<B;at++){const Nt=at*S-U;J[x]=Nt*v,J[g]=ot*y,J[p]=O,l.push(J.x,J.y,J.z),J[x]=0,J[g]=0,J[p]=T>0?1:-1,h.push(J.x,J.y,J.z),u.push(at/C),u.push(1-it/L),V+=1}}for(let it=0;it<L;it++)for(let ot=0;ot<C;ot++){const at=d+ot+B*it,Nt=d+ot+B*(it+1),ae=d+(ot+1)+B*(it+1),ne=d+(ot+1)+B*it;c.push(at,Nt,ne),c.push(Nt,ae,ne),q+=6}a.addGroup(f,q,M),f+=q,d+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xi(o){const t={};for(const e in o){t[e]={};for(const n in o[e]){const i=o[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ge(o){const t={};for(let e=0;e<o.length;e++){const n=Xi(o[e]);for(const i in n)t[i]=n[i]}return t}function vu(o){const t=[];for(let e=0;e<o.length;e++)t.push(o[e].clone());return t}function Bl(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const _u={clone:Xi,merge:Ge};var yu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends $i{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yu,this.fragmentShader=Mu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xi(t.uniforms),this.uniformsGroups=vu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ol extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $n=new N,uc=new yt,dc=new yt;class nn extends Ol{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=aa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Rr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return aa*2*Math.atan(Math.tan(Rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,uc,dc),e.subVectors(dc,uc)}setViewOffset(t,e,n,i,s,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Rr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;s+=r.offsetX*i/c,e-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ni=-90,Fi=1;class wu extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new nn(Ni,Fi,t,e);i.layers=this.layers,this.add(i);const s=new nn(Ni,Fi,t,e);s.layers=this.layers,this.add(s);const r=new nn(Ni,Fi,t,e);r.layers=this.layers,this.add(r);const a=new nn(Ni,Fi,t,e);a.layers=this.layers,this.add(a);const c=new nn(Ni,Fi,t,e);c.layers=this.layers,this.add(c);const l=new nn(Ni,Fi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,r,a,c]=e;for(const l of e)this.remove(l);if(t===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,r,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class zl extends ze{constructor(t=[],e=_i,n,i,s,r,a,c,l,h){super(t,e,n,i,s,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class kl extends Sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new zl(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new sn(5,5,5),s=new An({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:Vn});s.uniforms.tEquirect.value=e;const r=new Z(i,s),a=e.minFilter;return e.minFilter===xi&&(e.minFilter=Oe),new wu(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(s)}}class De extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Su={type:"move"};class $r{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new De,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new De,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new De,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),p=this._getHandJoint(l,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Su)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new De;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Sa{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=n}clone(){return new Sa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bu extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Eu extends ze{constructor(t=null,e=1,n=1,i,s,r,a,c,l=Ne,h=Ne,u,d){super(null,r,a,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jr=new N,Tu=new N,Au=new zt;class fi{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Jr.subVectors(n,e).cross(Tu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Jr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Au.getNormalMatrix(t),i=this.coplanarPoint(Jr).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const li=new yr,Cu=new yt(.5,.5),js=new N;class ba{constructor(t=new fi,e=new fi,n=new fi,i=new fi,s=new fi,r=new fi){this.planes=[t,e,n,i,s,r]}set(t,e,n,i,s,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Mn,n=!1){const i=this.planes,s=t.elements,r=s[0],a=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],m=s[8],x=s[9],g=s[10],p=s[11],v=s[12],y=s[13],_=s[14],E=s[15];if(i[0].setComponents(l-r,f-h,p-m,E-v).normalize(),i[1].setComponents(l+r,f+h,p+m,E+v).normalize(),i[2].setComponents(l+a,f+u,p+x,E+y).normalize(),i[3].setComponents(l-a,f-u,p-x,E-y).normalize(),n)i[4].setComponents(c,d,g,_).normalize(),i[5].setComponents(l-c,f-d,p-g,E-_).normalize();else if(i[4].setComponents(l-c,f-d,p-g,E-_).normalize(),e===Mn)i[5].setComponents(l+c,f+d,p+g,E+_).normalize();else if(e===gr)i[5].setComponents(c,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){li.center.set(0,0,0);const e=Cu.distanceTo(t.center);return li.radius=.7071067811865476+e,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(js.x=i.normal.x>0?t.max.x:t.min.x,js.y=i.normal.y>0?t.max.y:t.min.y,js.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(js)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Gl extends $i{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const fc=new me,ca=new Ll,$s=new yr,Js=new N;class Ru extends Fe{constructor(t=new Pe,e=new Gl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(i),$s.radius+=s,t.ray.intersectsSphere($s)===!1)return;fc.copy(i).invert(),ca.copy(t.ray).applyMatrix4(fc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,r.start),f=Math.min(l.count,r.start+r.count);for(let m=d,x=f;m<x;m++){const g=l.getX(m);Js.fromBufferAttribute(u,g),pc(Js,g,c,i,t,e,this)}}else{const d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let m=d,x=f;m<x;m++)Js.fromBufferAttribute(u,m),pc(Js,m,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function pc(o,t,e,n,i,s,r){const a=ca.distanceSqToPoint(o);if(a<e){const c=new N;ca.closestPointToPoint(o,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class bn extends ze{constructor(t,e,n,i,s,r,a,c,l){super(t,e,n,i,s,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ms extends ze{constructor(t,e,n=Tn,i,s,r,a=Ne,c=Ne,l,h=qn,u=1){if(h!==qn&&h!==vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,i,s,r,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new wa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Pu extends Ms{constructor(t,e=Tn,n=_i,i,s,r=Ne,a=Ne,c,l=qn){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,i,s,r,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Vl extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ea extends Pe{constructor(t=1,e=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:s},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const r=[],a=[],c=[],l=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,m=n*2+s,x=i+1,g=new N,p=new N;for(let v=0;v<=m;v++){let y=0,_=0,E=0,T=0;if(v<=n){const M=v/n,S=M*Math.PI/2;_=-h-t*Math.cos(S),E=t*Math.sin(S),T=-t*Math.cos(S),y=M*u}else if(v<=n+s){const M=(v-n)/s;_=-h+M*e,E=t,T=0,y=u+M*d}else{const M=(v-n-s)/n,S=M*Math.PI/2;_=h+t*Math.sin(S),E=t*Math.cos(S),T=t*Math.sin(S),y=u+d+M*u}const C=Math.max(0,Math.min(1,y/f));let L=0;v===0?L=.5/i:v===m&&(L=-.5/i);for(let M=0;M<=i;M++){const S=M/i,P=S*Math.PI*2,U=Math.sin(P),I=Math.cos(P);p.x=-E*I,p.y=_,p.z=E*U,a.push(p.x,p.y,p.z),g.set(-E*I,T,E*U),g.normalize(),c.push(g.x,g.y,g.z),l.push(S+L,C)}if(v>0){const M=(v-1)*x;for(let S=0;S<i;S++){const P=M+S,U=M+S+1,I=v*x+S,O=v*x+S+1;r.push(P,U,I),r.push(U,O,I)}}}this.setIndex(r),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class ei extends Pe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],r=[],a=[],c=[],l=new N,h=new yt;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[d]/t+1)/2,h.y=(r[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(a,3)),this.setAttribute("uv",new jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ei(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class we extends Pe{constructor(t=1,e=1,n=1,i=32,s=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const x=[],g=n/2;let p=0;v(),r===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(d,3)),this.setAttribute("uv",new jt(f,2));function v(){const _=new N,E=new N;let T=0;const C=(e-t)/n;for(let L=0;L<=s;L++){const M=[],S=L/s,P=S*(e-t)+t;for(let U=0;U<=i;U++){const I=U/i,O=I*c+a,B=Math.sin(O),D=Math.cos(O);E.x=P*B,E.y=-S*n+g,E.z=P*D,u.push(E.x,E.y,E.z),_.set(B,C,D).normalize(),d.push(_.x,_.y,_.z),f.push(I,1-S),M.push(m++)}x.push(M)}for(let L=0;L<i;L++)for(let M=0;M<s;M++){const S=x[M][L],P=x[M+1][L],U=x[M+1][L+1],I=x[M][L+1];(t>0||M!==0)&&(h.push(S,P,I),T+=3),(e>0||M!==s-1)&&(h.push(P,U,I),T+=3)}l.addGroup(p,T,0),p+=T}function y(_){const E=m,T=new yt,C=new N;let L=0;const M=_===!0?t:e,S=_===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,g*S,0),d.push(0,S,0),f.push(.5,.5),m++;const P=m;for(let U=0;U<=i;U++){const O=U/i*c+a,B=Math.cos(O),D=Math.sin(O);C.x=M*D,C.y=g*S,C.z=M*B,u.push(C.x,C.y,C.z),d.push(0,S,0),T.x=B*.5+.5,T.y=D*.5*S+.5,f.push(T.x,T.y),m++}for(let U=0;U<i;U++){const I=E+U,O=P+U;_===!0?h.push(O,O+1,I):h.push(O+1,O,I),L+=3}l.addGroup(p,L,_===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new we(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yi extends we{constructor(t=1,e=1,n=32,i=1,s=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,s,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(t){return new yi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class As extends Pe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],r=[];a(i),l(n),h(),this.setAttribute("position",new jt(s,3)),this.setAttribute("normal",new jt(s.slice(),3)),this.setAttribute("uv",new jt(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new N,_=new N,E=new N;for(let T=0;T<e.length;T+=3)f(e[T+0],y),f(e[T+1],_),f(e[T+2],E),c(y,_,E,v)}function c(v,y,_,E){const T=E+1,C=[];for(let L=0;L<=T;L++){C[L]=[];const M=v.clone().lerp(_,L/T),S=y.clone().lerp(_,L/T),P=T-L;for(let U=0;U<=P;U++)U===0&&L===T?C[L][U]=M:C[L][U]=M.clone().lerp(S,U/P)}for(let L=0;L<T;L++)for(let M=0;M<2*(T-L)-1;M++){const S=Math.floor(M/2);M%2===0?(d(C[L][S+1]),d(C[L+1][S]),d(C[L][S])):(d(C[L][S+1]),d(C[L+1][S+1]),d(C[L+1][S]))}}function l(v){const y=new N;for(let _=0;_<s.length;_+=3)y.x=s[_+0],y.y=s[_+1],y.z=s[_+2],y.normalize().multiplyScalar(v),s[_+0]=y.x,s[_+1]=y.y,s[_+2]=y.z}function h(){const v=new N;for(let y=0;y<s.length;y+=3){v.x=s[y+0],v.y=s[y+1],v.z=s[y+2];const _=g(v)/2/Math.PI+.5,E=p(v)/Math.PI+.5;r.push(_,1-E)}m(),u()}function u(){for(let v=0;v<r.length;v+=6){const y=r[v+0],_=r[v+2],E=r[v+4],T=Math.max(y,_,E),C=Math.min(y,_,E);T>.9&&C<.1&&(y<.2&&(r[v+0]+=1),_<.2&&(r[v+2]+=1),E<.2&&(r[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function f(v,y){const _=v*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function m(){const v=new N,y=new N,_=new N,E=new N,T=new yt,C=new yt,L=new yt;for(let M=0,S=0;M<s.length;M+=9,S+=6){v.set(s[M+0],s[M+1],s[M+2]),y.set(s[M+3],s[M+4],s[M+5]),_.set(s[M+6],s[M+7],s[M+8]),T.set(r[S+0],r[S+1]),C.set(r[S+2],r[S+3]),L.set(r[S+4],r[S+5]),E.copy(v).add(y).add(_).divideScalar(3);const P=g(E);x(T,S+0,v,P),x(C,S+2,y,P),x(L,S+4,_,P)}}function x(v,y,_,E){E<0&&v.x===1&&(r[y]=v.x-1),_.x===0&&_.z===0&&(r[y]=E/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.vertices,t.indices,t.radius,t.detail)}}class Ta extends As{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ta(t.radius,t.detail)}}class Rn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ft("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const s=n.length;let r;e?r=e:r=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(r-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const r=this.getPoint(i),a=this.getPoint(s),c=e||(r.isVector2?new yt:new N);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new N,i=[],s=[],r=[],a=new N,c=new me;for(let f=0;f<=t;f++){const m=f/t;i[f]=this.getTangentAt(m,new N)}s[0]=new N,r[0]=new N;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),r[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(qt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,m))}r[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(qt(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(c.makeRotationAxis(i[m],f*m)),r[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Aa extends Rn{constructor(t=0,e=0,n=1,i=1,s=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new yt){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(r?s=0:s=i),this.aClockwise===!0&&!r&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Iu extends Aa{constructor(t,e,n,i,s,r){super(t,e,n,n,i,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Ca(){let o=0,t=0,e=0,n=0;function i(s,r,a,c){o=s,t=a,e=-3*s+3*r-2*a-c,n=2*s-2*r+a+c}return{initCatmullRom:function(s,r,a,c,l){i(r,a,l*(a-s),l*(c-r))},initNonuniformCatmullRom:function(s,r,a,c,l,h,u){let d=(r-s)/l-(a-s)/(l+h)+(a-r)/h,f=(a-r)/h-(c-r)/(h+u)+(c-a)/u;d*=h,f*=h,i(r,a,d,f)},calc:function(s){const r=s*s,a=r*s;return o+t*s+e*r+n*a}}}const Qs=new N,Qr=new Ca,to=new Ca,eo=new Ca;class Lu extends Rn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new N){const n=e,i=this.points,s=i.length,r=(s-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%s]:(Qs.subVectors(i[0],i[1]).add(i[0]),l=Qs);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Qs.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Qs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Qr.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,x,g),to.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,x,g),eo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(Qr.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),to.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),eo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Qr.calc(c),to.calc(c),eo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new N().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function mc(o,t,e,n,i){const s=(n-t)*.5,r=(i-e)*.5,a=o*o,c=o*a;return(2*e-2*n+s+r)*c+(-3*e+3*n-2*s-r)*a+s*o+e}function Du(o,t){const e=1-o;return e*e*t}function Nu(o,t){return 2*(1-o)*o*t}function Fu(o,t){return o*o*t}function ms(o,t,e,n){return Du(o,t)+Nu(o,e)+Fu(o,n)}function Uu(o,t){const e=1-o;return e*e*e*t}function Bu(o,t){const e=1-o;return 3*e*e*o*t}function Ou(o,t){return 3*(1-o)*o*o*t}function zu(o,t){return o*o*o*t}function gs(o,t,e,n,i){return Uu(o,t)+Bu(o,e)+Ou(o,n)+zu(o,i)}class Hl extends Rn{constructor(t=new yt,e=new yt,n=new yt,i=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new yt){const n=e,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(gs(t,i.x,s.x,r.x,a.x),gs(t,i.y,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ku extends Rn{constructor(t=new N,e=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new N){const n=e,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(gs(t,i.x,s.x,r.x,a.x),gs(t,i.y,s.y,r.y,a.y),gs(t,i.z,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wl extends Rn{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gu extends Rn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ql extends Rn{constructor(t=new yt,e=new yt,n=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new yt){const n=e,i=this.v0,s=this.v1,r=this.v2;return n.set(ms(t,i.x,s.x,r.x),ms(t,i.y,s.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vu extends Rn{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){const n=e,i=this.v0,s=this.v1,r=this.v2;return n.set(ms(t,i.x,s.x,r.x),ms(t,i.y,s.y,r.y),ms(t,i.z,s.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xl extends Rn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){const n=e,i=this.points,s=(i.length-1)*t,r=Math.floor(s),a=s-r,c=i[r===0?r:r-1],l=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(mc(a,c.x,l.x,h.x,u.x),mc(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new yt().fromArray(i))}return this}}var gc=Object.freeze({__proto__:null,ArcCurve:Iu,CatmullRomCurve3:Lu,CubicBezierCurve:Hl,CubicBezierCurve3:ku,EllipseCurve:Aa,LineCurve:Wl,LineCurve3:Gu,QuadraticBezierCurve:ql,QuadraticBezierCurve3:Vu,SplineCurve:Xl});class Hu extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new gc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const r=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const r=s[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new gc[i.type]().fromJSON(i))}return this}}class xc extends Hu{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Wl(this.currentPoint.clone(),new yt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new ql(this.currentPoint.clone(),new yt(t,e),new yt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,r){const a=new Hl(this.currentPoint.clone(),new yt(t,e),new yt(n,i),new yt(s,r));return this.curves.push(a),this.currentPoint.set(s,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Xl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,s,r),this}absarc(t,e,n,i,s,r){return this.absellipse(t,e,n,n,i,s,r),this}ellipse(t,e,n,i,s,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,s,r,a,c),this}absellipse(t,e,n,i,s,r,a,c){const l=new Aa(t,e,n,i,s,r,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}let Cs=class extends xc{constructor(t){super(t),this.uuid=Ki(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new xc().fromJSON(i))}return this}};function Wu(o,t,e=2){const n=t&&t.length,i=n?t[0]*e:o.length;let s=Yl(o,0,i,e,!0);const r=[];if(!s||s.next===s.prev)return r;let a,c,l;if(n&&(s=Ku(o,t,s,e)),o.length>80*e){a=o[0],c=o[1];let h=a,u=c;for(let d=e;d<i;d+=e){const f=o[d],m=o[d+1];f<a&&(a=f),m<c&&(c=m),f>h&&(h=f),m>u&&(u=m)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return ws(s,r,e,a,c,l,0),r}function Yl(o,t,e,n,i){let s;if(i===od(o,t,e,n)>0)for(let r=t;r<e;r+=n)s=vc(r/n|0,o[r],o[r+1],s);else for(let r=e-n;r>=t;r-=n)s=vc(r/n|0,o[r],o[r+1],s);return s&&Yi(s,s.next)&&(bs(s),s=s.next),s}function Mi(o,t){if(!o)return o;t||(t=o);let e=o,n;do if(n=!1,!e.steiner&&(Yi(e,e.next)||ge(e.prev,e,e.next)===0)){if(bs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ws(o,t,e,n,i,s,r){if(!o)return;!r&&s&&td(o,n,i,s);let a=o;for(;o.prev!==o.next;){const c=o.prev,l=o.next;if(s?Xu(o,n,i,s):qu(o)){t.push(c.i,o.i,l.i),bs(o),o=l.next,a=l.next;continue}if(o=l,o===a){r?r===1?(o=Yu(Mi(o),t),ws(o,t,e,n,i,s,2)):r===2&&Zu(o,t,e,n,i,s):ws(Mi(o),t,e,n,i,s,1);break}}}function qu(o){const t=o.prev,e=o,n=o.next;if(ge(t,e,n)>=0)return!1;const i=t.x,s=e.x,r=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(i,s,r),u=Math.min(a,c,l),d=Math.max(i,s,r),f=Math.max(a,c,l);let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&fs(i,a,s,c,r,l,m.x,m.y)&&ge(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Xu(o,t,e,n){const i=o.prev,s=o,r=o.next;if(ge(i,s,r)>=0)return!1;const a=i.x,c=s.x,l=r.x,h=i.y,u=s.y,d=r.y,f=Math.min(a,c,l),m=Math.min(h,u,d),x=Math.max(a,c,l),g=Math.max(h,u,d),p=la(f,m,t,e,n),v=la(x,g,t,e,n);let y=o.prevZ,_=o.nextZ;for(;y&&y.z>=p&&_&&_.z<=v;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==r&&fs(a,h,c,u,l,d,y.x,y.y)&&ge(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==r&&fs(a,h,c,u,l,d,_.x,_.y)&&ge(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==r&&fs(a,h,c,u,l,d,y.x,y.y)&&ge(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=v;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==r&&fs(a,h,c,u,l,d,_.x,_.y)&&ge(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Yu(o,t){let e=o;do{const n=e.prev,i=e.next.next;!Yi(n,i)&&Kl(n,e,e.next,i)&&Ss(n,i)&&Ss(i,n)&&(t.push(n.i,e.i,i.i),bs(e),bs(e.next),e=o=i),e=e.next}while(e!==o);return Mi(e)}function Zu(o,t,e,n,i,s){let r=o;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&id(r,a)){let c=jl(r,a);r=Mi(r,r.next),c=Mi(c,c.next),ws(r,t,e,n,i,s,0),ws(c,t,e,n,i,s,0);return}a=a.next}r=r.next}while(r!==o)}function Ku(o,t,e,n){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s]*n,c=s<r-1?t[s+1]*n:o.length,l=Yl(o,a,c,n,!1);l===l.next&&(l.steiner=!0),i.push(nd(l))}i.sort(ju);for(let s=0;s<i.length;s++)e=$u(i[s],e);return e}function ju(o,t){let e=o.x-t.x;if(e===0&&(e=o.y-t.y,e===0)){const n=(o.next.y-o.y)/(o.next.x-o.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function $u(o,t){const e=Ju(o,t);if(!e)return t;const n=jl(e,o);return Mi(n,n.next),Mi(e,e.next)}function Ju(o,t){let e=t;const n=o.x,i=o.y;let s=-1/0,r;if(Yi(o,e))return e;do{if(Yi(o,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>s&&(s=u,r=e.x<e.next.x?e:e.next,u===n))return r}e=e.next}while(e!==t);if(!r)return null;const a=r,c=r.x,l=r.y;let h=1/0;e=r;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Zl(i<l?n:s,i,c,l,i<l?s:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);Ss(e,o)&&(u<h||u===h&&(e.x>r.x||e.x===r.x&&Qu(r,e)))&&(r=e,h=u)}e=e.next}while(e!==a);return r}function Qu(o,t){return ge(o.prev,o,t.prev)<0&&ge(t.next,o,o.next)<0}function td(o,t,e,n){let i=o;do i.z===0&&(i.z=la(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==o);i.prevZ.nextZ=null,i.prevZ=null,ed(i)}function ed(o){let t,e=1;do{let n=o,i;o=null;let s=null;for(t=0;n;){t++;let r=n,a=0;for(let l=0;l<e&&(a++,r=r.nextZ,!!r);l++);let c=e;for(;a>0||c>0&&r;)a!==0&&(c===0||!r||n.z<=r.z)?(i=n,n=n.nextZ,a--):(i=r,r=r.nextZ,c--),s?s.nextZ=i:o=i,i.prevZ=s,s=i;n=r}s.nextZ=null,e*=2}while(t>1);return o}function la(o,t,e,n,i){return o=(o-e)*i|0,t=(t-n)*i|0,o=(o|o<<8)&16711935,o=(o|o<<4)&252645135,o=(o|o<<2)&858993459,o=(o|o<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,o|t<<1}function nd(o){let t=o,e=o;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==o);return e}function Zl(o,t,e,n,i,s,r,a){return(i-r)*(t-a)>=(o-r)*(s-a)&&(o-r)*(n-a)>=(e-r)*(t-a)&&(e-r)*(s-a)>=(i-r)*(n-a)}function fs(o,t,e,n,i,s,r,a){return!(o===r&&t===a)&&Zl(o,t,e,n,i,s,r,a)}function id(o,t){return o.next.i!==t.i&&o.prev.i!==t.i&&!sd(o,t)&&(Ss(o,t)&&Ss(t,o)&&rd(o,t)&&(ge(o.prev,o,t.prev)||ge(o,t.prev,t))||Yi(o,t)&&ge(o.prev,o,o.next)>0&&ge(t.prev,t,t.next)>0)}function ge(o,t,e){return(t.y-o.y)*(e.x-t.x)-(t.x-o.x)*(e.y-t.y)}function Yi(o,t){return o.x===t.x&&o.y===t.y}function Kl(o,t,e,n){const i=er(ge(o,t,e)),s=er(ge(o,t,n)),r=er(ge(e,n,o)),a=er(ge(e,n,t));return!!(i!==s&&r!==a||i===0&&tr(o,e,t)||s===0&&tr(o,n,t)||r===0&&tr(e,o,n)||a===0&&tr(e,t,n))}function tr(o,t,e){return t.x<=Math.max(o.x,e.x)&&t.x>=Math.min(o.x,e.x)&&t.y<=Math.max(o.y,e.y)&&t.y>=Math.min(o.y,e.y)}function er(o){return o>0?1:o<0?-1:0}function sd(o,t){let e=o;do{if(e.i!==o.i&&e.next.i!==o.i&&e.i!==t.i&&e.next.i!==t.i&&Kl(e,e.next,o,t))return!0;e=e.next}while(e!==o);return!1}function Ss(o,t){return ge(o.prev,o,o.next)<0?ge(o,t,o.next)>=0&&ge(o,o.prev,t)>=0:ge(o,t,o.prev)<0||ge(o,o.next,t)<0}function rd(o,t){let e=o,n=!1;const i=(o.x+t.x)/2,s=(o.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==o);return n}function jl(o,t){const e=ha(o.i,o.x,o.y),n=ha(t.i,t.x,t.y),i=o.next,s=t.prev;return o.next=t,t.prev=o,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function vc(o,t,e,n){const i=ha(o,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function bs(o){o.next.prev=o.prev,o.prev.next=o.next,o.prevZ&&(o.prevZ.nextZ=o.nextZ),o.nextZ&&(o.nextZ.prevZ=o.prevZ)}function ha(o,t,e){return{i:o,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function od(o,t,e,n){let i=0;for(let s=t,r=e-n;s<e;s+=n)i+=(o[r]-o[s])*(o[s+1]+o[r+1]),r=s;return i}class ad{static triangulate(t,e,n=2){return Wu(t,e,n)}}class xs{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return xs.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];_c(t),yc(n,t);let r=t.length;e.forEach(_c);for(let c=0;c<e.length;c++)i.push(r),r+=e[c].length,yc(n,e[c]);const a=ad.triangulate(n,i);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function _c(o){const t=o.length;t>2&&o[t-1].equals(o[0])&&o.pop()}function yc(o,t){for(let e=0;e<t.length;e++)o.push(t[e].x),o.push(t[e].y)}class Mr extends As{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Mr(t.radius,t.detail)}}class Yt extends Pe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,r=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],m=[],x=[],g=[];for(let p=0;p<h;p++){const v=p*d-r;for(let y=0;y<l;y++){const _=y*u-s;m.push(_,-v,0),x.push(0,0,1),g.push(y/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const y=v+l*p,_=v+l*(p+1),E=v+1+l*(p+1),T=v+1+l*p;f.push(y,_,T),f.push(_,E,T)}this.setIndex(f),this.setAttribute("position",new jt(m,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yt(t.width,t.height,t.widthSegments,t.heightSegments)}}class Cn extends Pe{constructor(t=.5,e=1,n=32,i=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/i,f=new N,m=new yt;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){const p=s+g/n*r;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let x=0;x<i;x++){const g=x*(n+1);for(let p=0;p<n;p++){const v=p+g,y=v,_=v+n+1,E=v+n+2,T=v+1;a.push(y,_,T),a.push(_,E,T)}}this.setIndex(a),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(l,3)),this.setAttribute("uv",new jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cn(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ji extends Pe{constructor(t=new Cs([new yt(0,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],s=[],r=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new jt(i,3)),this.setAttribute("normal",new jt(s,3)),this.setAttribute("uv",new jt(r,2));function l(h){const u=i.length/3,d=h.extractPoints(e);let f=d.shape;const m=d.holes;xs.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const v=m[g];xs.isClockWise(v)===!0&&(m[g]=v.reverse())}const x=xs.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const v=m[g];f=f.concat(v)}for(let g=0,p=f.length;g<p;g++){const v=f[g];i.push(v.x,v.y,0),s.push(0,0,1),r.push(v.x,v.y)}for(let g=0,p=x.length;g<p;g++){const v=x[g],y=v[0]+u,_=v[1]+u,E=v[2]+u;n.push(y,_,E),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return cd(e,t)}static fromJSON(t,e){const n=[];for(let i=0,s=t.shapes.length;i<s;i++){const r=e[t.shapes[i]];n.push(r)}return new Ji(n,t.curveSegments)}}function cd(o,t){if(t.shapes=[],Array.isArray(o))for(let e=0,n=o.length;e<n;e++){const i=o[e];t.shapes.push(i.uuid)}else t.shapes.push(o.uuid);return t}class xe extends Pe{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],u=new N,d=new N,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let _=0;p===0&&r===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let E=0;E<=e;E++){const T=E/e;u.x=-t*Math.cos(i+T*s)*Math.sin(r+y*a),u.y=t*Math.cos(r+y*a),u.z=t*Math.sin(i+T*s)*Math.sin(r+y*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(T+_,1-y),v.push(l++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const y=h[p][v+1],_=h[p][v],E=h[p+1][v],T=h[p+1][v+1];(p!==0||r>0)&&f.push(y,_,T),(p!==n-1||c<Math.PI)&&f.push(_,E,T)}this.setIndex(f),this.setAttribute("position",new jt(m,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ra extends As{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ra(t.radius,t.detail)}}class Rs extends Pe{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],c=[],l=[],h=new N,u=new N,d=new N;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const x=m/i*s,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(x),u.y=(t+e*Math.cos(g))*Math.sin(x),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const x=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,v=(i+1)*f+m;r.push(x,g,v),r.push(g,p,v)}this.setIndex(r),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ld extends An{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Wt extends $i{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rl,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class hd extends $i{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ud extends $i{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class $l extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const no=new me,Mc=new N,wc=new N;class dd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.mapType=$e,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ba,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Mc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Mc),wc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(wc),e.updateMatrixWorld(),no.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(no,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(no)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Pa extends Ol{constructor(t=-1,e=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,r=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class fd extends dd{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pd extends $l{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new fd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class md extends $l{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class gd extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class xd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Sc(o,t,e,n){const i=vd(n);switch(e){case Tl:return o*t;case Cl:return o*t/i.components*i.byteLength;case xa:return o*t/i.components*i.byteLength;case Wi:return o*t*2/i.components*i.byteLength;case va:return o*t*2/i.components*i.byteLength;case Al:return o*t*3/i.components*i.byteLength;case hn:return o*t*4/i.components*i.byteLength;case _a:return o*t*4/i.components*i.byteLength;case hr:case ur:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case dr:case fr:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Po:case Lo:return Math.max(o,16)*Math.max(t,8)/4;case Ro:case Io:return Math.max(o,8)*Math.max(t,8)/2;case Do:case No:case Uo:case Bo:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Fo:case Oo:case zo:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case ko:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Go:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case Ho:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case qo:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case Zo:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case Ko:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case jo:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case $o:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case Jo:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case ta:case ea:case na:return Math.ceil(o/4)*Math.ceil(t/4)*16;case ia:case sa:return Math.ceil(o/4)*Math.ceil(t/4)*8;case ra:case oa:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vd(o){switch(o){case $e:case wl:return{byteLength:1,components:1};case vs:case Sl:case Wn:return{byteLength:2,components:1};case ma:case ga:return{byteLength:2,components:4};case Tn:case pa:case yn:return{byteLength:4,components:1};case bl:case El:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fa}}));typeof window<"u"&&(window.__THREE__?Ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fa);function Jl(){let o=null,t=!1,e=null,n=null;function i(s,r){e(s,r),n=o.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=o.requestAnimationFrame(i),t=!0)},stop:function(){o.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){o=s}}}function _d(o){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=o.createBuffer();o.bindBuffer(c,d),o.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=o.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=o.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=o.HALF_FLOAT:f=o.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=o.SHORT;else if(l instanceof Uint32Array)f=o.UNSIGNED_INT;else if(l instanceof Int32Array)f=o.INT;else if(l instanceof Int8Array)f=o.BYTE;else if(l instanceof Uint8Array)f=o.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(o.bindBuffer(l,a),u.length===0)o.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],x=u[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const x=u[f];o.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(o.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:r}}var yd=`#ifdef USE_ALPHAHASH
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
#endif`,np=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
}`,kt={alphahash_fragment:yd,alphahash_pars_fragment:Md,alphamap_fragment:wd,alphamap_pars_fragment:Sd,alphatest_fragment:bd,alphatest_pars_fragment:Ed,aomap_fragment:Td,aomap_pars_fragment:Ad,batching_pars_vertex:Cd,batching_vertex:Rd,begin_vertex:Pd,beginnormal_vertex:Id,bsdfs:Ld,iridescence_fragment:Dd,bumpmap_pars_fragment:Nd,clipping_planes_fragment:Fd,clipping_planes_pars_fragment:Ud,clipping_planes_pars_vertex:Bd,clipping_planes_vertex:Od,color_fragment:zd,color_pars_fragment:kd,color_pars_vertex:Gd,color_vertex:Vd,common:Hd,cube_uv_reflection_fragment:Wd,defaultnormal_vertex:qd,displacementmap_pars_vertex:Xd,displacementmap_vertex:Yd,emissivemap_fragment:Zd,emissivemap_pars_fragment:Kd,colorspace_fragment:jd,colorspace_pars_fragment:$d,envmap_fragment:Jd,envmap_common_pars_fragment:Qd,envmap_pars_fragment:tf,envmap_pars_vertex:ef,envmap_physical_pars_fragment:ff,envmap_vertex:nf,fog_vertex:sf,fog_pars_vertex:rf,fog_fragment:of,fog_pars_fragment:af,gradientmap_pars_fragment:cf,lightmap_pars_fragment:lf,lights_lambert_fragment:hf,lights_lambert_pars_fragment:uf,lights_pars_begin:df,lights_toon_fragment:pf,lights_toon_pars_fragment:mf,lights_phong_fragment:gf,lights_phong_pars_fragment:xf,lights_physical_fragment:vf,lights_physical_pars_fragment:_f,lights_fragment_begin:yf,lights_fragment_maps:Mf,lights_fragment_end:wf,logdepthbuf_fragment:Sf,logdepthbuf_pars_fragment:bf,logdepthbuf_pars_vertex:Ef,logdepthbuf_vertex:Tf,map_fragment:Af,map_pars_fragment:Cf,map_particle_fragment:Rf,map_particle_pars_fragment:Pf,metalnessmap_fragment:If,metalnessmap_pars_fragment:Lf,morphinstance_vertex:Df,morphcolor_vertex:Nf,morphnormal_vertex:Ff,morphtarget_pars_vertex:Uf,morphtarget_vertex:Bf,normal_fragment_begin:Of,normal_fragment_maps:zf,normal_pars_fragment:kf,normal_pars_vertex:Gf,normal_vertex:Vf,normalmap_pars_fragment:Hf,clearcoat_normal_fragment_begin:Wf,clearcoat_normal_fragment_maps:qf,clearcoat_pars_fragment:Xf,iridescence_pars_fragment:Yf,opaque_fragment:Zf,packing:Kf,premultiplied_alpha_fragment:jf,project_vertex:$f,dithering_fragment:Jf,dithering_pars_fragment:Qf,roughnessmap_fragment:tp,roughnessmap_pars_fragment:ep,shadowmap_pars_fragment:np,shadowmap_pars_vertex:ip,shadowmap_vertex:sp,shadowmask_pars_fragment:rp,skinbase_vertex:op,skinning_pars_vertex:ap,skinning_vertex:cp,skinnormal_vertex:lp,specularmap_fragment:hp,specularmap_pars_fragment:up,tonemapping_fragment:dp,tonemapping_pars_fragment:fp,transmission_fragment:pp,transmission_pars_fragment:mp,uv_pars_fragment:gp,uv_pars_vertex:xp,uv_vertex:vp,worldpos_vertex:_p,background_vert:yp,background_frag:Mp,backgroundCube_vert:wp,backgroundCube_frag:Sp,cube_vert:bp,cube_frag:Ep,depth_vert:Tp,depth_frag:Ap,distance_vert:Cp,distance_frag:Rp,equirect_vert:Pp,equirect_frag:Ip,linedashed_vert:Lp,linedashed_frag:Dp,meshbasic_vert:Np,meshbasic_frag:Fp,meshlambert_vert:Up,meshlambert_frag:Bp,meshmatcap_vert:Op,meshmatcap_frag:zp,meshnormal_vert:kp,meshnormal_frag:Gp,meshphong_vert:Vp,meshphong_frag:Hp,meshphysical_vert:Wp,meshphysical_frag:qp,meshtoon_vert:Xp,meshtoon_frag:Yp,points_vert:Zp,points_frag:Kp,shadow_vert:jp,shadow_frag:$p,sprite_vert:Jp,sprite_frag:Qp},ft={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},_n={basic:{uniforms:Ge([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ge([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Bt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ge([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ge([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ge([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Bt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ge([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ge([ft.points,ft.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ge([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ge([ft.common,ft.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ge([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ge([ft.sprite,ft.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distance:{uniforms:Ge([ft.common,ft.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distance_vert,fragmentShader:kt.distance_frag},shadow:{uniforms:Ge([ft.lights,ft.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};_n.physical={uniforms:Ge([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const nr={r:0,b:0,g:0},hi=new fn,tm=new me;function em(o,t,e,n,i,s,r){const a=new Bt(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function x(y){let _=!1;const E=m(y);E===null?p(a,c):E&&E.isColor&&(p(E,1),_=!0);const T=o.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(o.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function g(y,_){const E=m(_);E&&(E.isCubeTexture||E.mapping===_r)?(h===void 0&&(h=new Z(new sn(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:Xi(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),hi.copy(_.backgroundRotation),hi.x*=-1,hi.y*=-1,hi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(hi)),h.material.toneMapped=Kt.getTransfer(E.colorSpace)!==oe,(u!==E||d!==E.version||f!==o.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=o.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new Z(new Yt(2,2),new An({name:"BackgroundMaterial",uniforms:Xi(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(E.colorSpace)!==oe,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==o.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=o.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,_){y.getRGB(nr,Bl(o)),n.buffers.color.setClear(nr.r,nr.g,nr.b,_,r)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:x,addToRenderList:g,dispose:v}}function nm(o,t){const e=o.getParameter(o.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,r=!1;function a(S,P,U,I,O){let B=!1;const D=u(I,U,P);s!==D&&(s=D,l(s.object)),B=f(S,I,U,O),B&&m(S,I,U,O),O!==null&&t.update(O,o.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,_(S,P,U,I),O!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return o.createVertexArray()}function l(S){return o.bindVertexArray(S)}function h(S){return o.deleteVertexArray(S)}function u(S,P,U){const I=U.wireframe===!0;let O=n[S.id];O===void 0&&(O={},n[S.id]=O);let B=O[P.id];B===void 0&&(B={},O[P.id]=B);let D=B[I];return D===void 0&&(D=d(c()),B[I]=D),D}function d(S){const P=[],U=[],I=[];for(let O=0;O<e;O++)P[O]=0,U[O]=0,I[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:I,object:S,attributes:{},index:null}}function f(S,P,U,I){const O=s.attributes,B=P.attributes;let D=0;const V=U.getAttributes();for(const q in V)if(V[q].location>=0){const it=O[q];let ot=B[q];if(ot===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(ot=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(ot=S.instanceColor)),it===void 0||it.attribute!==ot||ot&&it.data!==ot.data)return!0;D++}return s.attributesNum!==D||s.index!==I}function m(S,P,U,I){const O={},B=P.attributes;let D=0;const V=U.getAttributes();for(const q in V)if(V[q].location>=0){let it=B[q];it===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(it=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(it=S.instanceColor));const ot={};ot.attribute=it,it&&it.data&&(ot.data=it.data),O[q]=ot,D++}s.attributes=O,s.attributesNum=D,s.index=I}function x(){const S=s.newAttributes;for(let P=0,U=S.length;P<U;P++)S[P]=0}function g(S){p(S,0)}function p(S,P){const U=s.newAttributes,I=s.enabledAttributes,O=s.attributeDivisors;U[S]=1,I[S]===0&&(o.enableVertexAttribArray(S),I[S]=1),O[S]!==P&&(o.vertexAttribDivisor(S,P),O[S]=P)}function v(){const S=s.newAttributes,P=s.enabledAttributes;for(let U=0,I=P.length;U<I;U++)P[U]!==S[U]&&(o.disableVertexAttribArray(U),P[U]=0)}function y(S,P,U,I,O,B,D){D===!0?o.vertexAttribIPointer(S,P,U,O,B):o.vertexAttribPointer(S,P,U,I,O,B)}function _(S,P,U,I){x();const O=I.attributes,B=U.getAttributes(),D=P.defaultAttributeValues;for(const V in B){const q=B[V];if(q.location>=0){let J=O[V];if(J===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(J=S.instanceColor)),J!==void 0){const it=J.normalized,ot=J.itemSize,at=t.get(J);if(at===void 0)continue;const Nt=at.buffer,ae=at.type,ne=at.bytesPerElement,j=ae===o.INT||ae===o.UNSIGNED_INT||J.gpuType===pa;if(J.isInterleavedBufferAttribute){const tt=J.data,Mt=tt.stride,Ot=J.offset;if(tt.isInstancedInterleavedBuffer){for(let bt=0;bt<q.locationSize;bt++)p(q.location+bt,tt.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let bt=0;bt<q.locationSize;bt++)g(q.location+bt);o.bindBuffer(o.ARRAY_BUFFER,Nt);for(let bt=0;bt<q.locationSize;bt++)y(q.location+bt,ot/q.locationSize,ae,it,Mt*ne,(Ot+ot/q.locationSize*bt)*ne,j)}else{if(J.isInstancedBufferAttribute){for(let tt=0;tt<q.locationSize;tt++)p(q.location+tt,J.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let tt=0;tt<q.locationSize;tt++)g(q.location+tt);o.bindBuffer(o.ARRAY_BUFFER,Nt);for(let tt=0;tt<q.locationSize;tt++)y(q.location+tt,ot/q.locationSize,ae,it,ot*ne,ot/q.locationSize*tt*ne,j)}}else if(D!==void 0){const it=D[V];if(it!==void 0)switch(it.length){case 2:o.vertexAttrib2fv(q.location,it);break;case 3:o.vertexAttrib3fv(q.location,it);break;case 4:o.vertexAttrib4fv(q.location,it);break;default:o.vertexAttrib1fv(q.location,it)}}}}v()}function E(){L();for(const S in n){const P=n[S];for(const U in P){const I=P[U];for(const O in I)h(I[O].object),delete I[O];delete P[U]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const U in P){const I=P[U];for(const O in I)h(I[O].object),delete I[O];delete P[U]}delete n[S.id]}function C(S){for(const P in n){const U=n[P];if(U[S.id]===void 0)continue;const I=U[S.id];for(const O in I)h(I[O].object),delete I[O];delete U[S.id]}}function L(){M(),r=!0,s!==i&&(s=i,l(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function im(o,t,e){let n;function i(l){n=l}function s(l,h){o.drawArrays(n,l,h),e.update(h,n,1)}function r(l,h,u){u!==0&&(o.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)r(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*d[x];e.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function sm(o,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=o.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(C){return!(C!==hn&&n.convert(C)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const L=C===Wn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==$e&&n.convert(C)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==yn&&!L)}function c(C){if(C==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Ft("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),m=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=o.getParameter(o.MAX_TEXTURE_SIZE),g=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),p=o.getParameter(o.MAX_VERTEX_ATTRIBS),v=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),y=o.getParameter(o.MAX_VARYING_VECTORS),_=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),E=o.getParameter(o.MAX_SAMPLES),T=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,maxSamples:E,samples:T}}function rm(o){const t=this;let e=null,n=0,i=!1,s=!1;const r=new fi,a=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=o.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):l();else{const v=s?0:n,y=v*4;let _=p.clippingState||null;c.value=_,_=h(m,d,y,f);for(let E=0;E!==y;++E)_[E]=e[E];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=c.value,m!==!0||g===null){const p=f+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,_=f;y!==x;++y,_+=4)r.copy(u[y]).applyMatrix4(v,a),r.normal.toArray(g,_),g[_+3]=r.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function om(o){let t=new WeakMap;function e(r,a){return a===Eo?r.mapping=_i:a===To&&(r.mapping=Hi),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Eo||a===To)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new kl(c.height);return l.fromEquirectangularTexture(o,r),t.set(r,l),r.addEventListener("dispose",i),e(l.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const ti=4,bc=[.125,.215,.35,.446,.526,.582],mi=20,am=256,os=new Pa,Ec=new Bt;let io=null,so=0,ro=0,oo=!1;const cm=new N;class Tc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,s={}){const{size:r=256,position:a=cm}=s;io=this._renderer.getRenderTarget(),so=this._renderer.getActiveCubeFace(),ro=this._renderer.getActiveMipmapLevel(),oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(io,so,ro),this._renderer.xr.enabled=oo,t.scissorTest=!1,Ui(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===_i||t.mapping===Hi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),io=this._renderer.getRenderTarget(),so=this._renderer.getActiveCubeFace(),ro=this._renderer.getActiveMipmapLevel(),oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Oe,minFilter:Oe,generateMipmaps:!1,type:Wn,format:hn,colorSpace:qi,depthBuffer:!1},i=Ac(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ac(t,e,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=lm(s)),this._blurMaterial=um(s,t,e),this._ggxMaterial=hm(s,t,e)}return i}_compileMaterial(t){const e=new Z(new Pe,t);this._renderer.compile(e,os)}_sceneToCubeUV(t,e,n,i,s){const c=new nn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ec),u.toneMapping=wn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Z(new sn,new _t({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let p=!1;const v=t.background;v?v.isColor&&(g.color.copy(v),t.background=null,p=!0):(g.color.copy(Ec),p=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[y],s.y,s.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[y]));const E=this._cubeSize;Ui(i,_*E,y>2?E:0,E,E),u.setRenderTarget(i),p&&u.render(x,c),u.render(t,c)}u.toneMapping=f,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===_i||t.mapping===Hi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cc());const s=i?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Ui(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,os)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){const i=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,a=this._lodMeshes[n];a.material=r;const c=r.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=0+l*1.25,f=u*d,{_lodMax:m}=this,x=this._sizeLods[n],g=3*x*(n>m-ti?n-m+ti:0),p=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=m-e,Ui(s,g,p,3*x,2*x),i.setRenderTarget(s),i.render(a,os),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-n,Ui(t,g,p,3*x,2*x),i.setRenderTarget(t),i.render(a,os)}_blur(t,e,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",s),this._halfBlur(r,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Qt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=l;const d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*mi-1),x=s/m,g=isFinite(s)?1+Math.floor(h*x):mi;g>mi&&Ft(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${mi}`);const p=[];let v=0;for(let C=0;C<mi;++C){const L=C/x,M=Math.exp(-L*L/2);p.push(M),C===0?v+=M:C<g&&(v+=2*M)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-n;const _=this._sizeLods[i],E=3*_*(i>y-ti?i-y+ti:0),T=4*(this._cubeSize-_);Ui(e,E,T,3*_,2*_),c.setRenderTarget(e),c.render(u,os)}}function lm(o){const t=[],e=[],n=[];let i=o;const s=o-ti+1+bc.length;for(let r=0;r<s;r++){const a=Math.pow(2,i);t.push(a);let c=1/a;r>o-ti?c=bc[r-o+ti-1]:r===0&&(c=0),e.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,x=3,g=2,p=1,v=new Float32Array(x*m*f),y=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let T=0;T<f;T++){const C=T%3*2/3-1,L=T>2?0:-1,M=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];v.set(M,x*m*T),y.set(d,g*m*T);const S=[T,T,T,T,T,T];_.set(S,p*m*T)}const E=new Pe;E.setAttribute("position",new dn(v,x)),E.setAttribute("uv",new dn(y,g)),E.setAttribute("faceIndex",new dn(_,p)),n.push(new Z(E,null)),i>ti&&i--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Ac(o,t,e){const n=new Sn(o,t,e);return n.texture.mapping=_r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ui(o,t,e,n,i){o.viewport.set(t,e,n,i),o.scissor.set(t,e,n,i)}function hm(o,t,e){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:am,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wr(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function um(o,t,e){const n=new Float32Array(mi),i=new N(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wr(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Cc(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wr(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Rc(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function wr(){return`

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
	`}function dm(o){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Eo||c===To,h=c===_i||c===Hi;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Tc(o)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Tc(o)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function fm(o){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=o.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ys("WebGLRenderer: "+n+" extension not supported."),i}}}function pm(o,t,e,n){const i={},s=new WeakMap;function r(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",r),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",r),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)t.update(d[f],o.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,m=u.attributes.position;let x=0;if(f!==null){const v=f.array;x=f.version;for(let y=0,_=v.length;y<_;y+=3){const E=v[y+0],T=v[y+1],C=v[y+2];d.push(E,T,T,C,C,E)}}else if(m!==void 0){const v=m.array;x=m.version;for(let y=0,_=v.length/3-1;y<_;y+=3){const E=y+0,T=y+1,C=y+2;d.push(E,T,T,C,C,E)}}else return;const g=new(Pl(d)?Ul:Fl)(d,1);g.version=x;const p=s.get(u);p&&t.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function mm(o,t,e){let n;function i(d){n=d}let s,r;function a(d){s=d.type,r=d.bytesPerElement}function c(d,f){o.drawElements(n,f,s,d*r),e.update(f,n,1)}function l(d,f,m){m!==0&&(o.drawElementsInstanced(n,f,s,d*r,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,x){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/r,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,x,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*x[v];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function gm(o){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,a){switch(e.calls++,r){case o.TRIANGLES:e.triangles+=a*(s/3);break;case o.LINES:e.lines+=a*(s/2);break;case o.LINE_STRIP:e.lines+=a*(s-1);break;case o.LINE_LOOP:e.lines+=a*s;break;case o.POINTS:e.points+=a*s;break;default:Qt("WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function xm(o,t,e){const n=new WeakMap,i=new ye;function s(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let S=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var f=S;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),x===!0&&(_=2),g===!0&&(_=3);let E=a.attributes.position.count*_,T=1;E>t.maxTextureSize&&(T=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const C=new Float32Array(E*T*4*u),L=new Il(C,E,T,u);L.type=yn,L.needsUpdate=!0;const M=_*4;for(let P=0;P<u;P++){const U=p[P],I=v[P],O=y[P],B=E*T*4*P;for(let D=0;D<U.count;D++){const V=D*M;m===!0&&(i.fromBufferAttribute(U,D),C[B+V+0]=i.x,C[B+V+1]=i.y,C[B+V+2]=i.z,C[B+V+3]=0),x===!0&&(i.fromBufferAttribute(I,D),C[B+V+4]=i.x,C[B+V+5]=i.y,C[B+V+6]=i.z,C[B+V+7]=0),g===!0&&(i.fromBufferAttribute(O,D),C[B+V+8]=i.x,C[B+V+9]=i.y,C[B+V+10]=i.z,C[B+V+11]=O.itemSize===4?i.w:1)}}d={count:u,texture:L,size:new yt(E,T)},n.set(a,d),a.addEventListener("dispose",S)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(o,"morphTexture",r.morphTexture,e);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const x=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(o,"morphTargetBaseInfluence",x),c.getUniforms().setValue(o,"morphTargetInfluences",l)}c.getUniforms().setValue(o,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(o,"morphTargetsTextureSize",d.size)}return{update:s}}function vm(o,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,o.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,o.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function r(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:r}}const _m={[pl]:"LINEAR_TONE_MAPPING",[ml]:"REINHARD_TONE_MAPPING",[gl]:"CINEON_TONE_MAPPING",[xl]:"ACES_FILMIC_TONE_MAPPING",[_l]:"AGX_TONE_MAPPING",[yl]:"NEUTRAL_TONE_MAPPING",[vl]:"CUSTOM_TONE_MAPPING"};function ym(o,t,e,n,i){const s=new Sn(t,e,{type:o,depthBuffer:n,stencilBuffer:i}),r=new Sn(t,e,{type:Wn,depthBuffer:!1,stencilBuffer:!1}),a=new Pe;a.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new jt([0,2,0,0,2,0],2));const c=new ld({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Z(a,c),h=new Pa(-1,1,1,-1,0,1);let u=null,d=null,f=!1,m,x=null,g=[],p=!1;this.setSize=function(v,y){s.setSize(v,y),r.setSize(v,y);for(let _=0;_<g.length;_++){const E=g[_];E.setSize&&E.setSize(v,y)}},this.setEffects=function(v){g=v,p=g.length>0&&g[0].isRenderPass===!0;const y=s.width,_=s.height;for(let E=0;E<g.length;E++){const T=g[E];T.setSize&&T.setSize(y,_)}},this.begin=function(v,y){if(f||v.toneMapping===wn&&g.length===0)return!1;if(x=y,y!==null){const _=y.width,E=y.height;(s.width!==_||s.height!==E)&&this.setSize(_,E)}return p===!1&&v.setRenderTarget(s),m=v.toneMapping,v.toneMapping=wn,!0},this.hasRenderPass=function(){return p},this.end=function(v,y){v.toneMapping=m,f=!0;let _=s,E=r;for(let T=0;T<g.length;T++){const C=g[T];if(C.enabled!==!1&&(C.render(v,E,_,y),C.needsSwap!==!1)){const L=_;_=E,E=L}}if(u!==v.outputColorSpace||d!==v.toneMapping){u=v.outputColorSpace,d=v.toneMapping,c.defines={},Kt.getTransfer(u)===oe&&(c.defines.SRGB_TRANSFER="");const T=_m[d];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=_.texture,v.setRenderTarget(x),v.render(l,h),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),r.dispose(),a.dispose(),c.dispose()}}const Ql=new ze,ua=new Ms(1,1),th=new Il,eh=new ou,nh=new zl,Pc=[],Ic=[],Lc=new Float32Array(16),Dc=new Float32Array(9),Nc=new Float32Array(4);function Qi(o,t,e){const n=o[0];if(n<=0||n>0)return o;const i=t*e;let s=Pc[i];if(s===void 0&&(s=new Float32Array(i),Pc[i]=s),t!==0){n.toArray(s,0);for(let r=1,a=0;r!==t;++r)a+=e,o[r].toArray(s,a)}return s}function Ce(o,t){if(o.length!==t.length)return!1;for(let e=0,n=o.length;e<n;e++)if(o[e]!==t[e])return!1;return!0}function Re(o,t){for(let e=0,n=t.length;e<n;e++)o[e]=t[e]}function Sr(o,t){let e=Ic[t];e===void 0&&(e=new Int32Array(t),Ic[t]=e);for(let n=0;n!==t;++n)e[n]=o.allocateTextureUnit();return e}function Mm(o,t){const e=this.cache;e[0]!==t&&(o.uniform1f(this.addr,t),e[0]=t)}function wm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2fv(this.addr,t),Re(e,t)}}function Sm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;o.uniform3fv(this.addr,t),Re(e,t)}}function bm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4fv(this.addr,t),Re(e,t)}}function Em(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;o.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Nc.set(n),o.uniformMatrix2fv(this.addr,!1,Nc),Re(e,n)}}function Tm(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;o.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Dc.set(n),o.uniformMatrix3fv(this.addr,!1,Dc),Re(e,n)}}function Am(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;o.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Lc.set(n),o.uniformMatrix4fv(this.addr,!1,Lc),Re(e,n)}}function Cm(o,t){const e=this.cache;e[0]!==t&&(o.uniform1i(this.addr,t),e[0]=t)}function Rm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2iv(this.addr,t),Re(e,t)}}function Pm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;o.uniform3iv(this.addr,t),Re(e,t)}}function Im(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4iv(this.addr,t),Re(e,t)}}function Lm(o,t){const e=this.cache;e[0]!==t&&(o.uniform1ui(this.addr,t),e[0]=t)}function Dm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2uiv(this.addr,t),Re(e,t)}}function Nm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;o.uniform3uiv(this.addr,t),Re(e,t)}}function Fm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4uiv(this.addr,t),Re(e,t)}}function Um(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i);let s;this.type===o.SAMPLER_2D_SHADOW?(ua.compareFunction=e.isReversedDepthBuffer()?Ma:ya,s=ua):s=Ql,e.setTexture2D(t||s,i)}function Bm(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||eh,i)}function Om(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||nh,i)}function zm(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||th,i)}function km(o){switch(o){case 5126:return Mm;case 35664:return wm;case 35665:return Sm;case 35666:return bm;case 35674:return Em;case 35675:return Tm;case 35676:return Am;case 5124:case 35670:return Cm;case 35667:case 35671:return Rm;case 35668:case 35672:return Pm;case 35669:case 35673:return Im;case 5125:return Lm;case 36294:return Dm;case 36295:return Nm;case 36296:return Fm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Bm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return zm}}function Gm(o,t){o.uniform1fv(this.addr,t)}function Vm(o,t){const e=Qi(t,this.size,2);o.uniform2fv(this.addr,e)}function Hm(o,t){const e=Qi(t,this.size,3);o.uniform3fv(this.addr,e)}function Wm(o,t){const e=Qi(t,this.size,4);o.uniform4fv(this.addr,e)}function qm(o,t){const e=Qi(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,e)}function Xm(o,t){const e=Qi(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,e)}function Ym(o,t){const e=Qi(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,e)}function Zm(o,t){o.uniform1iv(this.addr,t)}function Km(o,t){o.uniform2iv(this.addr,t)}function jm(o,t){o.uniform3iv(this.addr,t)}function $m(o,t){o.uniform4iv(this.addr,t)}function Jm(o,t){o.uniform1uiv(this.addr,t)}function Qm(o,t){o.uniform2uiv(this.addr,t)}function t0(o,t){o.uniform3uiv(this.addr,t)}function e0(o,t){o.uniform4uiv(this.addr,t)}function n0(o,t,e){const n=this.cache,i=t.length,s=Sr(e,i);Ce(n,s)||(o.uniform1iv(this.addr,s),Re(n,s));let r;this.type===o.SAMPLER_2D_SHADOW?r=ua:r=Ql;for(let a=0;a!==i;++a)e.setTexture2D(t[a]||r,s[a])}function i0(o,t,e){const n=this.cache,i=t.length,s=Sr(e,i);Ce(n,s)||(o.uniform1iv(this.addr,s),Re(n,s));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||eh,s[r])}function s0(o,t,e){const n=this.cache,i=t.length,s=Sr(e,i);Ce(n,s)||(o.uniform1iv(this.addr,s),Re(n,s));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||nh,s[r])}function r0(o,t,e){const n=this.cache,i=t.length,s=Sr(e,i);Ce(n,s)||(o.uniform1iv(this.addr,s),Re(n,s));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||th,s[r])}function o0(o){switch(o){case 5126:return Gm;case 35664:return Vm;case 35665:return Hm;case 35666:return Wm;case 35674:return qm;case 35675:return Xm;case 35676:return Ym;case 5124:case 35670:return Zm;case 35667:case 35671:return Km;case 35668:case 35672:return jm;case 35669:case 35673:return $m;case 5125:return Jm;case 36294:return Qm;case 36295:return t0;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return n0;case 35679:case 36299:case 36307:return i0;case 35680:case 36300:case 36308:case 36293:return s0;case 36289:case 36303:case 36311:case 36292:return r0}}class a0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=km(e.type)}}class c0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=o0(e.type)}}class l0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const ao=/(\w+)(\])?(\[|\.)?/g;function Fc(o,t){o.seq.push(t),o.map[t.id]=t}function h0(o,t,e){const n=o.name,i=n.length;for(ao.lastIndex=0;;){const s=ao.exec(n),r=ao.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===i){Fc(e,l===void 0?new a0(a,o,t):new c0(a,o,t));break}else{let u=e.map[a];u===void 0&&(u=new l0(a),Fc(e,u)),e=u}}}class pr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=t.getActiveUniform(e,r),c=t.getUniformLocation(e,a.name);h0(a,c,this)}const i=[],s=[];for(const r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(r):s.push(r);i.length>0&&(this.seq=i.concat(s))}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,r=e.length;s!==r;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function Uc(o,t,e){const n=o.createShader(t);return o.shaderSource(n,e),o.compileShader(n),n}const u0=37297;let d0=0;function f0(o,t){const e=o.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let r=i;r<s;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}const Bc=new zt;function p0(o){Kt._getMatrix(Bc,Kt.workingColorSpace,o);const t=`mat3( ${Bc.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(o)){case mr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Ft("WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function Oc(o,t,e){const n=o.getShaderParameter(t,o.COMPILE_STATUS),s=(o.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+f0(o.getShaderSource(t),a)}else return s}function m0(o,t){const e=p0(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const g0={[pl]:"Linear",[ml]:"Reinhard",[gl]:"Cineon",[xl]:"ACESFilmic",[_l]:"AgX",[yl]:"Neutral",[vl]:"Custom"};function x0(o,t){const e=g0[t];return e===void 0?(Ft("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ir=new N;function v0(){Kt.getLuminanceCoefficients(ir);const o=ir.x.toFixed(4),t=ir.y.toFixed(4),e=ir.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _0(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function y0(o){const t=[];for(const e in o){const n=o[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function M0(o,t){const e={},n=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=o.getActiveAttrib(t,i),r=s.name;let a=1;s.type===o.FLOAT_MAT2&&(a=2),s.type===o.FLOAT_MAT3&&(a=3),s.type===o.FLOAT_MAT4&&(a=4),e[r]={type:s.type,location:o.getAttribLocation(t,r),locationSize:a}}return e}function ps(o){return o!==""}function zc(o,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kc(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const w0=/^[ \t]*#include +<([\w\d./]+)>/gm;function da(o){return o.replace(w0,b0)}const S0=new Map;function b0(o,t){let e=kt[t];if(e===void 0){const n=S0.get(t);if(n!==void 0)e=kt[n],Ft('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return da(e)}const E0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gc(o){return o.replace(E0,T0)}function T0(o,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Vc(o){let t=`precision ${o.precision} float;
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
#define LOW_PRECISION`),t}const A0={[lr]:"SHADOWMAP_TYPE_PCF",[ds]:"SHADOWMAP_TYPE_VSM"};function C0(o){return A0[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const R0={[_i]:"ENVMAP_TYPE_CUBE",[Hi]:"ENVMAP_TYPE_CUBE",[_r]:"ENVMAP_TYPE_CUBE_UV"};function P0(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":R0[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const I0={[Hi]:"ENVMAP_MODE_REFRACTION"};function L0(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":I0[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const D0={[fl]:"ENVMAP_BLENDING_MULTIPLY",[Gh]:"ENVMAP_BLENDING_MIX",[Vh]:"ENVMAP_BLENDING_ADD"};function N0(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":D0[o.combine]||"ENVMAP_BLENDING_NONE"}function F0(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function U0(o,t,e,n){const i=o.getContext(),s=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=C0(e),l=P0(e),h=L0(e),u=N0(e),d=F0(e),f=_0(e),m=y0(s),x=i.createProgram();let g,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ps).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ps).join(`
`),p.length>0&&(p+=`
`)):(g=[Vc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),p=[Vc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==wn?"#define TONE_MAPPING":"",e.toneMapping!==wn?kt.tonemapping_pars_fragment:"",e.toneMapping!==wn?x0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,m0("linearToOutputTexel",e.outputColorSpace),v0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),r=da(r),r=zc(r,e),r=kc(r,e),a=da(a),a=zc(a,e),a=kc(a,e),r=Gc(r),a=Gc(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Za?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Za?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+g+r,_=v+p+a,E=Uc(i,i.VERTEX_SHADER,y),T=Uc(i,i.FRAGMENT_SHADER,_);i.attachShader(x,E),i.attachShader(x,T),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function C(P){if(o.debug.checkShaderErrors){const U=i.getProgramInfoLog(x)||"",I=i.getShaderInfoLog(E)||"",O=i.getShaderInfoLog(T)||"",B=U.trim(),D=I.trim(),V=O.trim();let q=!0,J=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(q=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,x,E,T);else{const it=Oc(i,E,"vertex"),ot=Oc(i,T,"fragment");Qt("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+it+`
`+ot)}else B!==""?Ft("WebGLProgram: Program Info Log:",B):(D===""||V==="")&&(J=!1);J&&(P.diagnostics={runnable:q,programLog:B,vertexShader:{log:D,prefix:g},fragmentShader:{log:V,prefix:p}})}i.deleteShader(E),i.deleteShader(T),L=new pr(i,x),M=M0(i,x)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(x,u0)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=d0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=T,this}let B0=0;class O0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new z0(t),e.set(t,n)),n}}class z0{constructor(t){this.id=B0++,this.code=t,this.usedTimes=0}}function k0(o,t,e,n,i,s,r){const a=new Dl,c=new O0,l=new Set,h=[],u=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return l.add(M),M===0?"uv":`uv${M}`}function g(M,S,P,U,I){const O=U.fog,B=I.geometry,D=M.isMeshStandardMaterial?U.environment:null,V=(M.isMeshStandardMaterial?e:t).get(M.envMap||D),q=V&&V.mapping===_r?V.image.height:null,J=m[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&Ft("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const it=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ot=it!==void 0?it.length:0;let at=0;B.morphAttributes.position!==void 0&&(at=1),B.morphAttributes.normal!==void 0&&(at=2),B.morphAttributes.color!==void 0&&(at=3);let Nt,ae,ne,j;if(J){const se=_n[J];Nt=se.vertexShader,ae=se.fragmentShader}else Nt=M.vertexShader,ae=M.fragmentShader,c.update(M),ne=c.getVertexShaderID(M),j=c.getFragmentShaderID(M);const tt=o.getRenderTarget(),Mt=o.state.buffers.depth.getReversed(),Ot=I.isInstancedMesh===!0,bt=I.isBatchedMesh===!0,$t=!!M.map,Ie=!!M.matcap,Zt=!!V,ie=!!M.aoMap,le=!!M.lightMap,Gt=!!M.bumpMap,Se=!!M.normalMap,F=!!M.displacementMap,be=!!M.emissiveMap,ee=!!M.metalnessMap,ue=!!M.roughnessMap,Tt=M.anisotropy>0,R=M.clearcoat>0,w=M.dispersion>0,k=M.iridescence>0,K=M.sheen>0,Q=M.transmission>0,Y=Tt&&!!M.anisotropyMap,Ct=R&&!!M.clearcoatMap,lt=R&&!!M.clearcoatNormalMap,Et=R&&!!M.clearcoatRoughnessMap,Dt=k&&!!M.iridescenceMap,nt=k&&!!M.iridescenceThicknessMap,ut=K&&!!M.sheenColorMap,St=K&&!!M.sheenRoughnessMap,At=!!M.specularMap,ht=!!M.specularColorMap,Vt=!!M.specularIntensityMap,z=Q&&!!M.transmissionMap,mt=Q&&!!M.thicknessMap,rt=!!M.gradientMap,gt=!!M.alphaMap,et=M.alphaTest>0,$=!!M.alphaHash,ct=!!M.extensions;let Ut=wn;M.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Ut=o.toneMapping);const de={shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:Nt,fragmentShader:ae,defines:M.defines,customVertexShaderID:ne,customFragmentShaderID:j,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:bt,batchingColor:bt&&I._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&I.instanceColor!==null,instancingMorph:Ot&&I.morphTexture!==null,outputColorSpace:tt===null?o.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:qi,alphaToCoverage:!!M.alphaToCoverage,map:$t,matcap:Ie,envMap:Zt,envMapMode:Zt&&V.mapping,envMapCubeUVHeight:q,aoMap:ie,lightMap:le,bumpMap:Gt,normalMap:Se,displacementMap:F,emissiveMap:be,normalMapObjectSpace:Se&&M.normalMapType===qh,normalMapTangentSpace:Se&&M.normalMapType===Rl,metalnessMap:ee,roughnessMap:ue,anisotropy:Tt,anisotropyMap:Y,clearcoat:R,clearcoatMap:Ct,clearcoatNormalMap:lt,clearcoatRoughnessMap:Et,dispersion:w,iridescence:k,iridescenceMap:Dt,iridescenceThicknessMap:nt,sheen:K,sheenColorMap:ut,sheenRoughnessMap:St,specularMap:At,specularColorMap:ht,specularIntensityMap:Vt,transmission:Q,transmissionMap:z,thicknessMap:mt,gradientMap:rt,opaque:M.transparent===!1&&M.blending===zi&&M.alphaToCoverage===!1,alphaMap:gt,alphaTest:et,alphaHash:$,combine:M.combine,mapUv:$t&&x(M.map.channel),aoMapUv:ie&&x(M.aoMap.channel),lightMapUv:le&&x(M.lightMap.channel),bumpMapUv:Gt&&x(M.bumpMap.channel),normalMapUv:Se&&x(M.normalMap.channel),displacementMapUv:F&&x(M.displacementMap.channel),emissiveMapUv:be&&x(M.emissiveMap.channel),metalnessMapUv:ee&&x(M.metalnessMap.channel),roughnessMapUv:ue&&x(M.roughnessMap.channel),anisotropyMapUv:Y&&x(M.anisotropyMap.channel),clearcoatMapUv:Ct&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:lt&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:St&&x(M.sheenRoughnessMap.channel),specularMapUv:At&&x(M.specularMap.channel),specularColorMapUv:ht&&x(M.specularColorMap.channel),specularIntensityMapUv:Vt&&x(M.specularIntensityMap.channel),transmissionMapUv:z&&x(M.transmissionMap.channel),thicknessMapUv:mt&&x(M.thicknessMap.channel),alphaMapUv:gt&&x(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Se||Tt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!B.attributes.uv&&($t||gt),fog:!!O,useFog:M.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Mt,skinning:I.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:at,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:o.shadowMap.enabled&&P.length>0,shadowMapType:o.shadowMap.type,toneMapping:Ut,decodeVideoTexture:$t&&M.map.isVideoTexture===!0&&Kt.getTransfer(M.map.colorSpace)===oe,decodeVideoTextureEmissive:be&&M.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(M.emissiveMap.colorSpace)===oe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Xt,flipSided:M.side===Xe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ct&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&M.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return de.vertexUv1s=l.has(1),de.vertexUv2s=l.has(2),de.vertexUv3s=l.has(3),l.clear(),de}function p(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)S.push(P),S.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(v(S,M),y(S,M),S.push(o.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function v(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){const S=m[M.type];let P;if(S){const U=_n[S];P=_u.clone(U.uniforms)}else P=M.uniforms;return P}function E(M,S){let P=u.get(S);return P!==void 0?++P.usedTimes:(P=new U0(o,S,M,s),h.push(P),u.set(S,P)),P}function T(M){if(--M.usedTimes===0){const S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),u.delete(M.cacheKey),M.destroy()}}function C(M){c.remove(M)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:E,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:L}}function G0(){let o=new WeakMap;function t(r){return o.has(r)}function e(r){let a=o.get(r);return a===void 0&&(a={},o.set(r,a)),a}function n(r){o.delete(r)}function i(r,a,c){o.get(r)[a]=c}function s(){o=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function V0(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function Hc(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function Wc(){const o=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function r(u,d,f,m,x,g){let p=o[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},o[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),t++,p}function a(u,d,f,m,x,g){const p=r(u,d,f,m,x,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(u,d,f,m,x,g){const p=r(u,d,f,m,x,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||V0),n.length>1&&n.sort(d||Hc),i.length>1&&i.sort(d||Hc)}function h(){for(let u=t,d=o.length;u<d;u++){const f=o[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function H0(){let o=new WeakMap;function t(n,i){const s=o.get(n);let r;return s===void 0?(r=new Wc,o.set(n,[r])):i>=s.length?(r=new Wc,s.push(r)):r=s[i],r}function e(){o=new WeakMap}return{get:t,dispose:e}}function W0(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Bt};break;case"SpotLight":e={position:new N,direction:new N,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new N,halfWidth:new N,halfHeight:new N};break}return o[t.id]=e,e}}}function q0(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=e,e}}}let X0=0;function Y0(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function Z0(o){const t=new W0,e=q0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const i=new N,s=new me,r=new me;function a(l){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,v=0,y=0,_=0,E=0,T=0,C=0;l.sort(Y0);for(let M=0,S=l.length;M<S;M++){const P=l[M],U=P.color,I=P.intensity,O=P.distance;let B=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Wi?B=P.shadow.map.texture:B=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=U.r*I,u+=U.g*I,d+=U.b*I;else if(P.isLightProbe){for(let D=0;D<9;D++)n.probe[D].addScaledVector(P.sh.coefficients[D],I);C++}else if(P.isDirectionalLight){const D=t.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const V=P.shadow,q=e.get(P);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=D,f++}else if(P.isSpotLight){const D=t.get(P);D.position.setFromMatrixPosition(P.matrixWorld),D.color.copy(U).multiplyScalar(I),D.distance=O,D.coneCos=Math.cos(P.angle),D.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),D.decay=P.decay,n.spot[x]=D;const V=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,V.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[x]=V.matrix,P.castShadow){const q=e.get(P);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,n.spotShadow[x]=q,n.spotShadowMap[x]=B,_++}x++}else if(P.isRectAreaLight){const D=t.get(P);D.color.copy(U).multiplyScalar(I),D.halfWidth.set(P.width*.5,0,0),D.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=D,g++}else if(P.isPointLight){const D=t.get(P);if(D.color.copy(P.color).multiplyScalar(P.intensity),D.distance=P.distance,D.decay=P.decay,P.castShadow){const V=P.shadow,q=e.get(P);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,q.shadowCameraNear=V.camera.near,q.shadowCameraFar=V.camera.far,n.pointShadow[m]=q,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=P.shadow.matrix,y++}n.point[m]=D,m++}else if(P.isHemisphereLight){const D=t.get(P);D.skyColor.copy(P.color).multiplyScalar(I),D.groundColor.copy(P.groundColor).multiplyScalar(I),n.hemi[p]=D,p++}}g>0&&(o.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==f||L.pointLength!==m||L.spotLength!==x||L.rectAreaLength!==g||L.hemiLength!==p||L.numDirectionalShadows!==v||L.numPointShadows!==y||L.numSpotShadows!==_||L.numSpotMaps!==E||L.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,L.directionalLength=f,L.pointLength=m,L.spotLength=x,L.rectAreaLength=g,L.hemiLength=p,L.numDirectionalShadows=v,L.numPointShadows=y,L.numSpotShadows=_,L.numSpotMaps=E,L.numLightProbes=C,n.version=X0++)}function c(l,h){let u=0,d=0,f=0,m=0,x=0;const g=h.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const y=l[p];if(y.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),u++}else if(y.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),r.identity(),s.copy(y.matrixWorld),s.premultiply(g),r.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(r),_.halfHeight.applyMatrix4(r),m++}else if(y.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:n}}function qc(o){const t=new Z0(o),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function r(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:r}}function K0(o){let t=new WeakMap;function e(i,s=0){const r=t.get(i);let a;return r===void 0?(a=new qc(o),t.set(i,[a])):s>=r.length?(a=new qc(o),r.push(a)):a=r[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const j0=`void main() {
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
}`,J0=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],Q0=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Xc=new me,as=new N,co=new N;function tg(o,t,e){let n=new ba;const i=new yt,s=new yt,r=new ye,a=new hd,c=new ud,l={},h=e.maxTextureSize,u={[ni]:Xe,[Xe]:ni,[Xt]:Xt},d=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:j0,fragmentShader:$0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Pe;m.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Z(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lr;let p=this.type;this.render=function(T,C,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;T.type===wh&&(Ft("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),T.type=lr);const M=o.getRenderTarget(),S=o.getActiveCubeFace(),P=o.getActiveMipmapLevel(),U=o.state;U.setBlending(Vn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const I=p!==this.type;I&&C.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(B=>B.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,B=T.length;O<B;O++){const D=T[O],V=D.shadow;if(V===void 0){Ft("WebGLShadowMap:",D,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const q=V.getFrameExtents();if(i.multiply(q),s.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/q.x),i.x=s.x*q.x,V.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/q.y),i.y=s.y*q.y,V.mapSize.y=s.y)),V.map===null||I===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===ds){if(D.isPointLight){Ft("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Sn(i.x,i.y,{format:Wi,type:Wn,minFilter:Oe,magFilter:Oe,generateMipmaps:!1}),V.map.texture.name=D.name+".shadowMap",V.map.depthTexture=new Ms(i.x,i.y,yn),V.map.depthTexture.name=D.name+".shadowMapDepth",V.map.depthTexture.format=qn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ne,V.map.depthTexture.magFilter=Ne}else{D.isPointLight?(V.map=new kl(i.x),V.map.depthTexture=new Pu(i.x,Tn)):(V.map=new Sn(i.x,i.y),V.map.depthTexture=new Ms(i.x,i.y,Tn)),V.map.depthTexture.name=D.name+".shadowMap",V.map.depthTexture.format=qn;const it=o.state.buffers.depth.getReversed();this.type===lr?(V.map.depthTexture.compareFunction=it?Ma:ya,V.map.depthTexture.minFilter=Oe,V.map.depthTexture.magFilter=Oe):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ne,V.map.depthTexture.magFilter=Ne)}V.camera.updateProjectionMatrix()}const J=V.map.isWebGLCubeRenderTarget?6:1;for(let it=0;it<J;it++){if(V.map.isWebGLCubeRenderTarget)o.setRenderTarget(V.map,it),o.clear();else{it===0&&(o.setRenderTarget(V.map),o.clear());const ot=V.getViewport(it);r.set(s.x*ot.x,s.y*ot.y,s.x*ot.z,s.y*ot.w),U.viewport(r)}if(D.isPointLight){const ot=V.camera,at=V.matrix,Nt=D.distance||ot.far;Nt!==ot.far&&(ot.far=Nt,ot.updateProjectionMatrix()),as.setFromMatrixPosition(D.matrixWorld),ot.position.copy(as),co.copy(ot.position),co.add(J0[it]),ot.up.copy(Q0[it]),ot.lookAt(co),ot.updateMatrixWorld(),at.makeTranslation(-as.x,-as.y,-as.z),Xc.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Xc,ot.coordinateSystem,ot.reversedDepth)}else V.updateMatrices(D);n=V.getFrustum(),_(C,L,V.camera,D,this.type)}V.isPointLightShadow!==!0&&this.type===ds&&v(V,L),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,o.setRenderTarget(M,S,P)};function v(T,C){const L=t.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Sn(i.x,i.y,{format:Wi,type:Wn})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,o.setRenderTarget(T.mapPass),o.clear(),o.renderBufferDirect(C,null,L,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,o.setRenderTarget(T.map),o.clear(),o.renderBufferDirect(C,null,L,f,x,null)}function y(T,C,L,M){let S=null;const P=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)S=P;else if(S=L.isPointLight===!0?c:a,o.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const U=S.uuid,I=C.uuid;let O=l[U];O===void 0&&(O={},l[U]=O);let B=O[I];B===void 0&&(B=S.clone(),O[I]=B,C.addEventListener("dispose",E)),S=B}if(S.visible=C.visible,S.wireframe=C.wireframe,M===ds?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=o.properties.get(S);U.light=L}return S}function _(T,C,L,M,S){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===ds)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const I=t.update(T),O=T.material;if(Array.isArray(O)){const B=I.groups;for(let D=0,V=B.length;D<V;D++){const q=B[D],J=O[q.materialIndex];if(J&&J.visible){const it=y(T,J,M,S);T.onBeforeShadow(o,T,C,L,I,it,q),o.renderBufferDirect(L,null,I,it,T,q),T.onAfterShadow(o,T,C,L,I,it,q)}}}else if(O.visible){const B=y(T,O,M,S);T.onBeforeShadow(o,T,C,L,I,B,null),o.renderBufferDirect(L,null,I,B,T,null),T.onAfterShadow(o,T,C,L,I,B,null)}}const U=T.children;for(let I=0,O=U.length;I<O;I++)_(U[I],C,L,M,S)}function E(T){T.target.removeEventListener("dispose",E);for(const L in l){const M=l[L],S=T.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const eg={[vo]:_o,[yo]:So,[Mo]:bo,[Vi]:wo,[_o]:vo,[So]:yo,[bo]:Mo,[wo]:Vi};function ng(o,t){function e(){let z=!1;const mt=new ye;let rt=null;const gt=new ye(0,0,0,0);return{setMask:function(et){rt!==et&&!z&&(o.colorMask(et,et,et,et),rt=et)},setLocked:function(et){z=et},setClear:function(et,$,ct,Ut,de){de===!0&&(et*=Ut,$*=Ut,ct*=Ut),mt.set(et,$,ct,Ut),gt.equals(mt)===!1&&(o.clearColor(et,$,ct,Ut),gt.copy(mt))},reset:function(){z=!1,rt=null,gt.set(-1,0,0,0)}}}function n(){let z=!1,mt=!1,rt=null,gt=null,et=null;return{setReversed:function($){if(mt!==$){const ct=t.get("EXT_clip_control");$?ct.clipControlEXT(ct.LOWER_LEFT_EXT,ct.ZERO_TO_ONE_EXT):ct.clipControlEXT(ct.LOWER_LEFT_EXT,ct.NEGATIVE_ONE_TO_ONE_EXT),mt=$;const Ut=et;et=null,this.setClear(Ut)}},getReversed:function(){return mt},setTest:function($){$?tt(o.DEPTH_TEST):Mt(o.DEPTH_TEST)},setMask:function($){rt!==$&&!z&&(o.depthMask($),rt=$)},setFunc:function($){if(mt&&($=eg[$]),gt!==$){switch($){case vo:o.depthFunc(o.NEVER);break;case _o:o.depthFunc(o.ALWAYS);break;case yo:o.depthFunc(o.LESS);break;case Vi:o.depthFunc(o.LEQUAL);break;case Mo:o.depthFunc(o.EQUAL);break;case wo:o.depthFunc(o.GEQUAL);break;case So:o.depthFunc(o.GREATER);break;case bo:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}gt=$}},setLocked:function($){z=$},setClear:function($){et!==$&&(mt&&($=1-$),o.clearDepth($),et=$)},reset:function(){z=!1,rt=null,gt=null,et=null,mt=!1}}}function i(){let z=!1,mt=null,rt=null,gt=null,et=null,$=null,ct=null,Ut=null,de=null;return{setTest:function(se){z||(se?tt(o.STENCIL_TEST):Mt(o.STENCIL_TEST))},setMask:function(se){mt!==se&&!z&&(o.stencilMask(se),mt=se)},setFunc:function(se,pn,Pn){(rt!==se||gt!==pn||et!==Pn)&&(o.stencilFunc(se,pn,Pn),rt=se,gt=pn,et=Pn)},setOp:function(se,pn,Pn){($!==se||ct!==pn||Ut!==Pn)&&(o.stencilOp(se,pn,Pn),$=se,ct=pn,Ut=Pn)},setLocked:function(se){z=se},setClear:function(se){de!==se&&(o.clearStencil(se),de=se)},reset:function(){z=!1,mt=null,rt=null,gt=null,et=null,$=null,ct=null,Ut=null,de=null}}}const s=new e,r=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,v=null,y=null,_=null,E=null,T=null,C=new Bt(0,0,0),L=0,M=!1,S=null,P=null,U=null,I=null,O=null;const B=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,V=0;const q=o.getParameter(o.VERSION);q.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(q)[1]),D=V>=1):q.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),D=V>=2);let J=null,it={};const ot=o.getParameter(o.SCISSOR_BOX),at=o.getParameter(o.VIEWPORT),Nt=new ye().fromArray(ot),ae=new ye().fromArray(at);function ne(z,mt,rt,gt){const et=new Uint8Array(4),$=o.createTexture();o.bindTexture(z,$),o.texParameteri(z,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(z,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let ct=0;ct<rt;ct++)z===o.TEXTURE_3D||z===o.TEXTURE_2D_ARRAY?o.texImage3D(mt,0,o.RGBA,1,1,gt,0,o.RGBA,o.UNSIGNED_BYTE,et):o.texImage2D(mt+ct,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,et);return $}const j={};j[o.TEXTURE_2D]=ne(o.TEXTURE_2D,o.TEXTURE_2D,1),j[o.TEXTURE_CUBE_MAP]=ne(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[o.TEXTURE_2D_ARRAY]=ne(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),j[o.TEXTURE_3D]=ne(o.TEXTURE_3D,o.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),tt(o.DEPTH_TEST),r.setFunc(Vi),Gt(!1),Se(Va),tt(o.CULL_FACE),ie(Vn);function tt(z){h[z]!==!0&&(o.enable(z),h[z]=!0)}function Mt(z){h[z]!==!1&&(o.disable(z),h[z]=!1)}function Ot(z,mt){return u[z]!==mt?(o.bindFramebuffer(z,mt),u[z]=mt,z===o.DRAW_FRAMEBUFFER&&(u[o.FRAMEBUFFER]=mt),z===o.FRAMEBUFFER&&(u[o.DRAW_FRAMEBUFFER]=mt),!0):!1}function bt(z,mt){let rt=f,gt=!1;if(z){rt=d.get(mt),rt===void 0&&(rt=[],d.set(mt,rt));const et=z.textures;if(rt.length!==et.length||rt[0]!==o.COLOR_ATTACHMENT0){for(let $=0,ct=et.length;$<ct;$++)rt[$]=o.COLOR_ATTACHMENT0+$;rt.length=et.length,gt=!0}}else rt[0]!==o.BACK&&(rt[0]=o.BACK,gt=!0);gt&&o.drawBuffers(rt)}function $t(z){return m!==z?(o.useProgram(z),m=z,!0):!1}const Ie={[pi]:o.FUNC_ADD,[bh]:o.FUNC_SUBTRACT,[Eh]:o.FUNC_REVERSE_SUBTRACT};Ie[Th]=o.MIN,Ie[Ah]=o.MAX;const Zt={[Ch]:o.ZERO,[Rh]:o.ONE,[Ph]:o.SRC_COLOR,[go]:o.SRC_ALPHA,[Uh]:o.SRC_ALPHA_SATURATE,[Nh]:o.DST_COLOR,[Lh]:o.DST_ALPHA,[Ih]:o.ONE_MINUS_SRC_COLOR,[xo]:o.ONE_MINUS_SRC_ALPHA,[Fh]:o.ONE_MINUS_DST_COLOR,[Dh]:o.ONE_MINUS_DST_ALPHA,[Bh]:o.CONSTANT_COLOR,[Oh]:o.ONE_MINUS_CONSTANT_COLOR,[zh]:o.CONSTANT_ALPHA,[kh]:o.ONE_MINUS_CONSTANT_ALPHA};function ie(z,mt,rt,gt,et,$,ct,Ut,de,se){if(z===Vn){x===!0&&(Mt(o.BLEND),x=!1);return}if(x===!1&&(tt(o.BLEND),x=!0),z!==Sh){if(z!==g||se!==M){if((p!==pi||_!==pi)&&(o.blendEquation(o.FUNC_ADD),p=pi,_=pi),se)switch(z){case zi:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Ha:o.blendFunc(o.ONE,o.ONE);break;case Wa:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case qa:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:Qt("WebGLState: Invalid blending: ",z);break}else switch(z){case zi:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Ha:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case Wa:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qa:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",z);break}v=null,y=null,E=null,T=null,C.set(0,0,0),L=0,g=z,M=se}return}et=et||mt,$=$||rt,ct=ct||gt,(mt!==p||et!==_)&&(o.blendEquationSeparate(Ie[mt],Ie[et]),p=mt,_=et),(rt!==v||gt!==y||$!==E||ct!==T)&&(o.blendFuncSeparate(Zt[rt],Zt[gt],Zt[$],Zt[ct]),v=rt,y=gt,E=$,T=ct),(Ut.equals(C)===!1||de!==L)&&(o.blendColor(Ut.r,Ut.g,Ut.b,de),C.copy(Ut),L=de),g=z,M=!1}function le(z,mt){z.side===Xt?Mt(o.CULL_FACE):tt(o.CULL_FACE);let rt=z.side===Xe;mt&&(rt=!rt),Gt(rt),z.blending===zi&&z.transparent===!1?ie(Vn):ie(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),r.setFunc(z.depthFunc),r.setTest(z.depthTest),r.setMask(z.depthWrite),s.setMask(z.colorWrite);const gt=z.stencilWrite;a.setTest(gt),gt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),be(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?tt(o.SAMPLE_ALPHA_TO_COVERAGE):Mt(o.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(z){S!==z&&(z?o.frontFace(o.CW):o.frontFace(o.CCW),S=z)}function Se(z){z!==yh?(tt(o.CULL_FACE),z!==P&&(z===Va?o.cullFace(o.BACK):z===Mh?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Mt(o.CULL_FACE),P=z}function F(z){z!==U&&(D&&o.lineWidth(z),U=z)}function be(z,mt,rt){z?(tt(o.POLYGON_OFFSET_FILL),(I!==mt||O!==rt)&&(o.polygonOffset(mt,rt),I=mt,O=rt)):Mt(o.POLYGON_OFFSET_FILL)}function ee(z){z?tt(o.SCISSOR_TEST):Mt(o.SCISSOR_TEST)}function ue(z){z===void 0&&(z=o.TEXTURE0+B-1),J!==z&&(o.activeTexture(z),J=z)}function Tt(z,mt,rt){rt===void 0&&(J===null?rt=o.TEXTURE0+B-1:rt=J);let gt=it[rt];gt===void 0&&(gt={type:void 0,texture:void 0},it[rt]=gt),(gt.type!==z||gt.texture!==mt)&&(J!==rt&&(o.activeTexture(rt),J=rt),o.bindTexture(z,mt||j[z]),gt.type=z,gt.texture=mt)}function R(){const z=it[J];z!==void 0&&z.type!==void 0&&(o.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function w(){try{o.compressedTexImage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function k(){try{o.compressedTexImage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function K(){try{o.texSubImage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Q(){try{o.texSubImage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Y(){try{o.compressedTexSubImage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Ct(){try{o.compressedTexSubImage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function lt(){try{o.texStorage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Et(){try{o.texStorage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function Dt(){try{o.texImage2D(...arguments)}catch(z){Qt("WebGLState:",z)}}function nt(){try{o.texImage3D(...arguments)}catch(z){Qt("WebGLState:",z)}}function ut(z){Nt.equals(z)===!1&&(o.scissor(z.x,z.y,z.z,z.w),Nt.copy(z))}function St(z){ae.equals(z)===!1&&(o.viewport(z.x,z.y,z.z,z.w),ae.copy(z))}function At(z,mt){let rt=l.get(mt);rt===void 0&&(rt=new WeakMap,l.set(mt,rt));let gt=rt.get(z);gt===void 0&&(gt=o.getUniformBlockIndex(mt,z.name),rt.set(z,gt))}function ht(z,mt){const gt=l.get(mt).get(z);c.get(mt)!==gt&&(o.uniformBlockBinding(mt,gt,z.__bindingPointIndex),c.set(mt,gt))}function Vt(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),r.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),h={},J=null,it={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,v=null,y=null,_=null,E=null,T=null,C=new Bt(0,0,0),L=0,M=!1,S=null,P=null,U=null,I=null,O=null,Nt.set(0,0,o.canvas.width,o.canvas.height),ae.set(0,0,o.canvas.width,o.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:tt,disable:Mt,bindFramebuffer:Ot,drawBuffers:bt,useProgram:$t,setBlending:ie,setMaterial:le,setFlipSided:Gt,setCullFace:Se,setLineWidth:F,setPolygonOffset:be,setScissorTest:ee,activeTexture:ue,bindTexture:Tt,unbindTexture:R,compressedTexImage2D:w,compressedTexImage3D:k,texImage2D:Dt,texImage3D:nt,updateUBOMapping:At,uniformBlockBinding:ht,texStorage2D:lt,texStorage3D:Et,texSubImage2D:K,texSubImage3D:Q,compressedTexSubImage2D:Y,compressedTexSubImage3D:Ct,scissor:ut,viewport:St,reset:Vt}}function ig(o,t,e,n,i,s,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new yt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,w){return f?new OffscreenCanvas(R,w):xr("canvas")}function x(R,w,k){let K=1;const Q=Tt(R);if((Q.width>k||Q.height>k)&&(K=k/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(K*Q.width),Ct=Math.floor(K*Q.height);u===void 0&&(u=m(Y,Ct));const lt=w?m(Y,Ct):u;return lt.width=Y,lt.height=Ct,lt.getContext("2d").drawImage(R,0,0,Y,Ct),Ft("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+Ct+")."),lt}else return"data"in R&&Ft("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function g(R){return R.generateMipmaps}function p(R){o.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?o.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function y(R,w,k,K,Q=!1){if(R!==null){if(o[R]!==void 0)return o[R];Ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=w;if(w===o.RED&&(k===o.FLOAT&&(Y=o.R32F),k===o.HALF_FLOAT&&(Y=o.R16F),k===o.UNSIGNED_BYTE&&(Y=o.R8)),w===o.RED_INTEGER&&(k===o.UNSIGNED_BYTE&&(Y=o.R8UI),k===o.UNSIGNED_SHORT&&(Y=o.R16UI),k===o.UNSIGNED_INT&&(Y=o.R32UI),k===o.BYTE&&(Y=o.R8I),k===o.SHORT&&(Y=o.R16I),k===o.INT&&(Y=o.R32I)),w===o.RG&&(k===o.FLOAT&&(Y=o.RG32F),k===o.HALF_FLOAT&&(Y=o.RG16F),k===o.UNSIGNED_BYTE&&(Y=o.RG8)),w===o.RG_INTEGER&&(k===o.UNSIGNED_BYTE&&(Y=o.RG8UI),k===o.UNSIGNED_SHORT&&(Y=o.RG16UI),k===o.UNSIGNED_INT&&(Y=o.RG32UI),k===o.BYTE&&(Y=o.RG8I),k===o.SHORT&&(Y=o.RG16I),k===o.INT&&(Y=o.RG32I)),w===o.RGB_INTEGER&&(k===o.UNSIGNED_BYTE&&(Y=o.RGB8UI),k===o.UNSIGNED_SHORT&&(Y=o.RGB16UI),k===o.UNSIGNED_INT&&(Y=o.RGB32UI),k===o.BYTE&&(Y=o.RGB8I),k===o.SHORT&&(Y=o.RGB16I),k===o.INT&&(Y=o.RGB32I)),w===o.RGBA_INTEGER&&(k===o.UNSIGNED_BYTE&&(Y=o.RGBA8UI),k===o.UNSIGNED_SHORT&&(Y=o.RGBA16UI),k===o.UNSIGNED_INT&&(Y=o.RGBA32UI),k===o.BYTE&&(Y=o.RGBA8I),k===o.SHORT&&(Y=o.RGBA16I),k===o.INT&&(Y=o.RGBA32I)),w===o.RGB&&(k===o.UNSIGNED_INT_5_9_9_9_REV&&(Y=o.RGB9_E5),k===o.UNSIGNED_INT_10F_11F_11F_REV&&(Y=o.R11F_G11F_B10F)),w===o.RGBA){const Ct=Q?mr:Kt.getTransfer(K);k===o.FLOAT&&(Y=o.RGBA32F),k===o.HALF_FLOAT&&(Y=o.RGBA16F),k===o.UNSIGNED_BYTE&&(Y=Ct===oe?o.SRGB8_ALPHA8:o.RGBA8),k===o.UNSIGNED_SHORT_4_4_4_4&&(Y=o.RGBA4),k===o.UNSIGNED_SHORT_5_5_5_1&&(Y=o.RGB5_A1)}return(Y===o.R16F||Y===o.R32F||Y===o.RG16F||Y===o.RG32F||Y===o.RGBA16F||Y===o.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function _(R,w){let k;return R?w===null||w===Tn||w===_s?k=o.DEPTH24_STENCIL8:w===yn?k=o.DEPTH32F_STENCIL8:w===vs&&(k=o.DEPTH24_STENCIL8,Ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Tn||w===_s?k=o.DEPTH_COMPONENT24:w===yn?k=o.DEPTH_COMPONENT32F:w===vs&&(k=o.DEPTH_COMPONENT16),k}function E(R,w){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ne&&R.minFilter!==Oe?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function T(R){const w=R.target;w.removeEventListener("dispose",T),L(w),w.isVideoTexture&&h.delete(w)}function C(R){const w=R.target;w.removeEventListener("dispose",C),S(w)}function L(R){const w=n.get(R);if(w.__webglInit===void 0)return;const k=R.source,K=d.get(k);if(K){const Q=K[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(R),Object.keys(K).length===0&&d.delete(k)}n.remove(R)}function M(R){const w=n.get(R);o.deleteTexture(w.__webglTexture);const k=R.source,K=d.get(k);delete K[w.__cacheKey],r.memory.textures--}function S(R){const w=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(w.__webglFramebuffer[K]))for(let Q=0;Q<w.__webglFramebuffer[K].length;Q++)o.deleteFramebuffer(w.__webglFramebuffer[K][Q]);else o.deleteFramebuffer(w.__webglFramebuffer[K]);w.__webglDepthbuffer&&o.deleteRenderbuffer(w.__webglDepthbuffer[K])}else{if(Array.isArray(w.__webglFramebuffer))for(let K=0;K<w.__webglFramebuffer.length;K++)o.deleteFramebuffer(w.__webglFramebuffer[K]);else o.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&o.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&o.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let K=0;K<w.__webglColorRenderbuffer.length;K++)w.__webglColorRenderbuffer[K]&&o.deleteRenderbuffer(w.__webglColorRenderbuffer[K]);w.__webglDepthRenderbuffer&&o.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const k=R.textures;for(let K=0,Q=k.length;K<Q;K++){const Y=n.get(k[K]);Y.__webglTexture&&(o.deleteTexture(Y.__webglTexture),r.memory.textures--),n.remove(k[K])}n.remove(R)}let P=0;function U(){P=0}function I(){const R=P;return R>=i.maxTextures&&Ft("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),P+=1,R}function O(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function B(R,w){const k=n.get(R);if(R.isVideoTexture&&ee(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const K=R.image;if(K===null)Ft("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ft("WebGLRenderer: Texture marked for update but image is incomplete");else{j(k,R,w);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(o.TEXTURE_2D,k.__webglTexture,o.TEXTURE0+w)}function D(R,w){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){j(k,R,w);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(o.TEXTURE_2D_ARRAY,k.__webglTexture,o.TEXTURE0+w)}function V(R,w){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){j(k,R,w);return}e.bindTexture(o.TEXTURE_3D,k.__webglTexture,o.TEXTURE0+w)}function q(R,w){const k=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){tt(k,R,w);return}e.bindTexture(o.TEXTURE_CUBE_MAP,k.__webglTexture,o.TEXTURE0+w)}const J={[Ao]:o.REPEAT,[Gn]:o.CLAMP_TO_EDGE,[Co]:o.MIRRORED_REPEAT},it={[Ne]:o.NEAREST,[Hh]:o.NEAREST_MIPMAP_NEAREST,[Ds]:o.NEAREST_MIPMAP_LINEAR,[Oe]:o.LINEAR,[Cr]:o.LINEAR_MIPMAP_NEAREST,[xi]:o.LINEAR_MIPMAP_LINEAR},ot={[Xh]:o.NEVER,[$h]:o.ALWAYS,[Yh]:o.LESS,[ya]:o.LEQUAL,[Zh]:o.EQUAL,[Ma]:o.GEQUAL,[Kh]:o.GREATER,[jh]:o.NOTEQUAL};function at(R,w){if(w.type===yn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Oe||w.magFilter===Cr||w.magFilter===Ds||w.magFilter===xi||w.minFilter===Oe||w.minFilter===Cr||w.minFilter===Ds||w.minFilter===xi)&&Ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(R,o.TEXTURE_WRAP_S,J[w.wrapS]),o.texParameteri(R,o.TEXTURE_WRAP_T,J[w.wrapT]),(R===o.TEXTURE_3D||R===o.TEXTURE_2D_ARRAY)&&o.texParameteri(R,o.TEXTURE_WRAP_R,J[w.wrapR]),o.texParameteri(R,o.TEXTURE_MAG_FILTER,it[w.magFilter]),o.texParameteri(R,o.TEXTURE_MIN_FILTER,it[w.minFilter]),w.compareFunction&&(o.texParameteri(R,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(R,o.TEXTURE_COMPARE_FUNC,ot[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ne||w.minFilter!==Ds&&w.minFilter!==xi||w.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");o.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Nt(R,w){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",T));const K=w.source;let Q=d.get(K);Q===void 0&&(Q={},d.set(K,Q));const Y=O(w);if(Y!==R.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:o.createTexture(),usedTimes:0},r.memory.textures++,k=!0),Q[Y].usedTimes++;const Ct=Q[R.__cacheKey];Ct!==void 0&&(Q[R.__cacheKey].usedTimes--,Ct.usedTimes===0&&M(w)),R.__cacheKey=Y,R.__webglTexture=Q[Y].texture}return k}function ae(R,w,k){return Math.floor(Math.floor(R/k)/w)}function ne(R,w,k,K){const Y=R.updateRanges;if(Y.length===0)e.texSubImage2D(o.TEXTURE_2D,0,0,0,w.width,w.height,k,K,w.data);else{Y.sort((nt,ut)=>nt.start-ut.start);let Ct=0;for(let nt=1;nt<Y.length;nt++){const ut=Y[Ct],St=Y[nt],At=ut.start+ut.count,ht=ae(St.start,w.width,4),Vt=ae(ut.start,w.width,4);St.start<=At+1&&ht===Vt&&ae(St.start+St.count-1,w.width,4)===ht?ut.count=Math.max(ut.count,St.start+St.count-ut.start):(++Ct,Y[Ct]=St)}Y.length=Ct+1;const lt=o.getParameter(o.UNPACK_ROW_LENGTH),Et=o.getParameter(o.UNPACK_SKIP_PIXELS),Dt=o.getParameter(o.UNPACK_SKIP_ROWS);o.pixelStorei(o.UNPACK_ROW_LENGTH,w.width);for(let nt=0,ut=Y.length;nt<ut;nt++){const St=Y[nt],At=Math.floor(St.start/4),ht=Math.ceil(St.count/4),Vt=At%w.width,z=Math.floor(At/w.width),mt=ht,rt=1;o.pixelStorei(o.UNPACK_SKIP_PIXELS,Vt),o.pixelStorei(o.UNPACK_SKIP_ROWS,z),e.texSubImage2D(o.TEXTURE_2D,0,Vt,z,mt,rt,k,K,w.data)}R.clearUpdateRanges(),o.pixelStorei(o.UNPACK_ROW_LENGTH,lt),o.pixelStorei(o.UNPACK_SKIP_PIXELS,Et),o.pixelStorei(o.UNPACK_SKIP_ROWS,Dt)}}function j(R,w,k){let K=o.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(K=o.TEXTURE_2D_ARRAY),w.isData3DTexture&&(K=o.TEXTURE_3D);const Q=Nt(R,w),Y=w.source;e.bindTexture(K,R.__webglTexture,o.TEXTURE0+k);const Ct=n.get(Y);if(Y.version!==Ct.__version||Q===!0){e.activeTexture(o.TEXTURE0+k);const lt=Kt.getPrimaries(Kt.workingColorSpace),Et=w.colorSpace===Qn?null:Kt.getPrimaries(w.colorSpace),Dt=w.colorSpace===Qn||lt===Et?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,w.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,w.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let nt=x(w.image,!1,i.maxTextureSize);nt=ue(w,nt);const ut=s.convert(w.format,w.colorSpace),St=s.convert(w.type);let At=y(w.internalFormat,ut,St,w.colorSpace,w.isVideoTexture);at(K,w);let ht;const Vt=w.mipmaps,z=w.isVideoTexture!==!0,mt=Ct.__version===void 0||Q===!0,rt=Y.dataReady,gt=E(w,nt);if(w.isDepthTexture)At=_(w.format===vi,w.type),mt&&(z?e.texStorage2D(o.TEXTURE_2D,1,At,nt.width,nt.height):e.texImage2D(o.TEXTURE_2D,0,At,nt.width,nt.height,0,ut,St,null));else if(w.isDataTexture)if(Vt.length>0){z&&mt&&e.texStorage2D(o.TEXTURE_2D,gt,At,Vt[0].width,Vt[0].height);for(let et=0,$=Vt.length;et<$;et++)ht=Vt[et],z?rt&&e.texSubImage2D(o.TEXTURE_2D,et,0,0,ht.width,ht.height,ut,St,ht.data):e.texImage2D(o.TEXTURE_2D,et,At,ht.width,ht.height,0,ut,St,ht.data);w.generateMipmaps=!1}else z?(mt&&e.texStorage2D(o.TEXTURE_2D,gt,At,nt.width,nt.height),rt&&ne(w,nt,ut,St)):e.texImage2D(o.TEXTURE_2D,0,At,nt.width,nt.height,0,ut,St,nt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){z&&mt&&e.texStorage3D(o.TEXTURE_2D_ARRAY,gt,At,Vt[0].width,Vt[0].height,nt.depth);for(let et=0,$=Vt.length;et<$;et++)if(ht=Vt[et],w.format!==hn)if(ut!==null)if(z){if(rt)if(w.layerUpdates.size>0){const ct=Sc(ht.width,ht.height,w.format,w.type);for(const Ut of w.layerUpdates){const de=ht.data.subarray(Ut*ct/ht.data.BYTES_PER_ELEMENT,(Ut+1)*ct/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,et,0,0,Ut,ht.width,ht.height,1,ut,de)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,nt.depth,ut,ht.data)}else e.compressedTexImage3D(o.TEXTURE_2D_ARRAY,et,At,ht.width,ht.height,nt.depth,0,ht.data,0,0);else Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?rt&&e.texSubImage3D(o.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,nt.depth,ut,St,ht.data):e.texImage3D(o.TEXTURE_2D_ARRAY,et,At,ht.width,ht.height,nt.depth,0,ut,St,ht.data)}else{z&&mt&&e.texStorage2D(o.TEXTURE_2D,gt,At,Vt[0].width,Vt[0].height);for(let et=0,$=Vt.length;et<$;et++)ht=Vt[et],w.format!==hn?ut!==null?z?rt&&e.compressedTexSubImage2D(o.TEXTURE_2D,et,0,0,ht.width,ht.height,ut,ht.data):e.compressedTexImage2D(o.TEXTURE_2D,et,At,ht.width,ht.height,0,ht.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?rt&&e.texSubImage2D(o.TEXTURE_2D,et,0,0,ht.width,ht.height,ut,St,ht.data):e.texImage2D(o.TEXTURE_2D,et,At,ht.width,ht.height,0,ut,St,ht.data)}else if(w.isDataArrayTexture)if(z){if(mt&&e.texStorage3D(o.TEXTURE_2D_ARRAY,gt,At,nt.width,nt.height,nt.depth),rt)if(w.layerUpdates.size>0){const et=Sc(nt.width,nt.height,w.format,w.type);for(const $ of w.layerUpdates){const ct=nt.data.subarray($*et/nt.data.BYTES_PER_ELEMENT,($+1)*et/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,$,nt.width,nt.height,1,ut,St,ct)}w.clearLayerUpdates()}else e.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ut,St,nt.data)}else e.texImage3D(o.TEXTURE_2D_ARRAY,0,At,nt.width,nt.height,nt.depth,0,ut,St,nt.data);else if(w.isData3DTexture)z?(mt&&e.texStorage3D(o.TEXTURE_3D,gt,At,nt.width,nt.height,nt.depth),rt&&e.texSubImage3D(o.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ut,St,nt.data)):e.texImage3D(o.TEXTURE_3D,0,At,nt.width,nt.height,nt.depth,0,ut,St,nt.data);else if(w.isFramebufferTexture){if(mt)if(z)e.texStorage2D(o.TEXTURE_2D,gt,At,nt.width,nt.height);else{let et=nt.width,$=nt.height;for(let ct=0;ct<gt;ct++)e.texImage2D(o.TEXTURE_2D,ct,At,et,$,0,ut,St,null),et>>=1,$>>=1}}else if(Vt.length>0){if(z&&mt){const et=Tt(Vt[0]);e.texStorage2D(o.TEXTURE_2D,gt,At,et.width,et.height)}for(let et=0,$=Vt.length;et<$;et++)ht=Vt[et],z?rt&&e.texSubImage2D(o.TEXTURE_2D,et,0,0,ut,St,ht):e.texImage2D(o.TEXTURE_2D,et,At,ut,St,ht);w.generateMipmaps=!1}else if(z){if(mt){const et=Tt(nt);e.texStorage2D(o.TEXTURE_2D,gt,At,et.width,et.height)}rt&&e.texSubImage2D(o.TEXTURE_2D,0,0,0,ut,St,nt)}else e.texImage2D(o.TEXTURE_2D,0,At,ut,St,nt);g(w)&&p(K),Ct.__version=Y.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function tt(R,w,k){if(w.image.length!==6)return;const K=Nt(R,w),Q=w.source;e.bindTexture(o.TEXTURE_CUBE_MAP,R.__webglTexture,o.TEXTURE0+k);const Y=n.get(Q);if(Q.version!==Y.__version||K===!0){e.activeTexture(o.TEXTURE0+k);const Ct=Kt.getPrimaries(Kt.workingColorSpace),lt=w.colorSpace===Qn?null:Kt.getPrimaries(w.colorSpace),Et=w.colorSpace===Qn||Ct===lt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,w.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,w.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const Dt=w.isCompressedTexture||w.image[0].isCompressedTexture,nt=w.image[0]&&w.image[0].isDataTexture,ut=[];for(let $=0;$<6;$++)!Dt&&!nt?ut[$]=x(w.image[$],!0,i.maxCubemapSize):ut[$]=nt?w.image[$].image:w.image[$],ut[$]=ue(w,ut[$]);const St=ut[0],At=s.convert(w.format,w.colorSpace),ht=s.convert(w.type),Vt=y(w.internalFormat,At,ht,w.colorSpace),z=w.isVideoTexture!==!0,mt=Y.__version===void 0||K===!0,rt=Q.dataReady;let gt=E(w,St);at(o.TEXTURE_CUBE_MAP,w);let et;if(Dt){z&&mt&&e.texStorage2D(o.TEXTURE_CUBE_MAP,gt,Vt,St.width,St.height);for(let $=0;$<6;$++){et=ut[$].mipmaps;for(let ct=0;ct<et.length;ct++){const Ut=et[ct];w.format!==hn?At!==null?z?rt&&e.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,0,0,Ut.width,Ut.height,At,Ut.data):e.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,Vt,Ut.width,Ut.height,0,Ut.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,0,0,Ut.width,Ut.height,At,ht,Ut.data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,Vt,Ut.width,Ut.height,0,At,ht,Ut.data)}}}else{if(et=w.mipmaps,z&&mt){et.length>0&&gt++;const $=Tt(ut[0]);e.texStorage2D(o.TEXTURE_CUBE_MAP,gt,Vt,$.width,$.height)}for(let $=0;$<6;$++)if(nt){z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ut[$].width,ut[$].height,At,ht,ut[$].data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Vt,ut[$].width,ut[$].height,0,At,ht,ut[$].data);for(let ct=0;ct<et.length;ct++){const de=et[ct].image[$].image;z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,0,0,de.width,de.height,At,ht,de.data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,Vt,de.width,de.height,0,At,ht,de.data)}}else{z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,At,ht,ut[$]):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Vt,At,ht,ut[$]);for(let ct=0;ct<et.length;ct++){const Ut=et[ct];z?rt&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,0,0,At,ht,Ut.image[$]):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,Vt,At,ht,Ut.image[$])}}}g(w)&&p(o.TEXTURE_CUBE_MAP),Y.__version=Q.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function Mt(R,w,k,K,Q,Y){const Ct=s.convert(k.format,k.colorSpace),lt=s.convert(k.type),Et=y(k.internalFormat,Ct,lt,k.colorSpace),Dt=n.get(w),nt=n.get(k);if(nt.__renderTarget=w,!Dt.__hasExternalTextures){const ut=Math.max(1,w.width>>Y),St=Math.max(1,w.height>>Y);Q===o.TEXTURE_3D||Q===o.TEXTURE_2D_ARRAY?e.texImage3D(Q,Y,Et,ut,St,w.depth,0,Ct,lt,null):e.texImage2D(Q,Y,Et,ut,St,0,Ct,lt,null)}e.bindFramebuffer(o.FRAMEBUFFER,R),be(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,K,Q,nt.__webglTexture,0,F(w)):(Q===o.TEXTURE_2D||Q>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,K,Q,nt.__webglTexture,Y),e.bindFramebuffer(o.FRAMEBUFFER,null)}function Ot(R,w,k){if(o.bindRenderbuffer(o.RENDERBUFFER,R),w.depthBuffer){const K=w.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Y=_(w.stencilBuffer,Q),Ct=w.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;be(w)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,F(w),Y,w.width,w.height):k?o.renderbufferStorageMultisample(o.RENDERBUFFER,F(w),Y,w.width,w.height):o.renderbufferStorage(o.RENDERBUFFER,Y,w.width,w.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Ct,o.RENDERBUFFER,R)}else{const K=w.textures;for(let Q=0;Q<K.length;Q++){const Y=K[Q],Ct=s.convert(Y.format,Y.colorSpace),lt=s.convert(Y.type),Et=y(Y.internalFormat,Ct,lt,Y.colorSpace);be(w)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,F(w),Et,w.width,w.height):k?o.renderbufferStorageMultisample(o.RENDERBUFFER,F(w),Et,w.width,w.height):o.renderbufferStorage(o.RENDERBUFFER,Et,w.width,w.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function bt(R,w,k){const K=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(o.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(w.depthTexture);if(Q.__renderTarget=w,(!Q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),K){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,w.depthTexture.addEventListener("dispose",T)),Q.__webglTexture===void 0){Q.__webglTexture=o.createTexture(),e.bindTexture(o.TEXTURE_CUBE_MAP,Q.__webglTexture),at(o.TEXTURE_CUBE_MAP,w.depthTexture);const Dt=s.convert(w.depthTexture.format),nt=s.convert(w.depthTexture.type);let ut;w.depthTexture.format===qn?ut=o.DEPTH_COMPONENT24:w.depthTexture.format===vi&&(ut=o.DEPTH24_STENCIL8);for(let St=0;St<6;St++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ut,w.width,w.height,0,Dt,nt,null)}}else B(w.depthTexture,0);const Y=Q.__webglTexture,Ct=F(w),lt=K?o.TEXTURE_CUBE_MAP_POSITIVE_X+k:o.TEXTURE_2D,Et=w.depthTexture.format===vi?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(w.depthTexture.format===qn)be(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Et,lt,Y,0,Ct):o.framebufferTexture2D(o.FRAMEBUFFER,Et,lt,Y,0);else if(w.depthTexture.format===vi)be(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Et,lt,Y,0,Ct):o.framebufferTexture2D(o.FRAMEBUFFER,Et,lt,Y,0);else throw new Error("Unknown depthTexture format")}function $t(R){const w=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),K){const Q=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),w.__depthDisposeCallback=Q}w.__boundDepthTexture=K}if(R.depthTexture&&!w.__autoAllocateDepthBuffer)if(k)for(let K=0;K<6;K++)bt(w.__webglFramebuffer[K],R,K);else{const K=R.texture.mipmaps;K&&K.length>0?bt(w.__webglFramebuffer[0],R,0):bt(w.__webglFramebuffer,R,0)}else if(k){w.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer[K]),w.__webglDepthbuffer[K]===void 0)w.__webglDepthbuffer[K]=o.createRenderbuffer(),Ot(w.__webglDepthbuffer[K],R,!1);else{const Q=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer[K];o.bindRenderbuffer(o.RENDERBUFFER,Y),o.framebufferRenderbuffer(o.FRAMEBUFFER,Q,o.RENDERBUFFER,Y)}}else{const K=R.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=o.createRenderbuffer(),Ot(w.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Y),o.framebufferRenderbuffer(o.FRAMEBUFFER,Q,o.RENDERBUFFER,Y)}}e.bindFramebuffer(o.FRAMEBUFFER,null)}function Ie(R,w,k){const K=n.get(R);w!==void 0&&Mt(K.__webglFramebuffer,R,R.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),k!==void 0&&$t(R)}function Zt(R){const w=R.texture,k=n.get(R),K=n.get(w);R.addEventListener("dispose",C);const Q=R.textures,Y=R.isWebGLCubeRenderTarget===!0,Ct=Q.length>1;if(Ct||(K.__webglTexture===void 0&&(K.__webglTexture=o.createTexture()),K.__version=w.version,r.memory.textures++),Y){k.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer[lt]=[];for(let Et=0;Et<w.mipmaps.length;Et++)k.__webglFramebuffer[lt][Et]=o.createFramebuffer()}else k.__webglFramebuffer[lt]=o.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer=[];for(let lt=0;lt<w.mipmaps.length;lt++)k.__webglFramebuffer[lt]=o.createFramebuffer()}else k.__webglFramebuffer=o.createFramebuffer();if(Ct)for(let lt=0,Et=Q.length;lt<Et;lt++){const Dt=n.get(Q[lt]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=o.createTexture(),r.memory.textures++)}if(R.samples>0&&be(R)===!1){k.__webglMultisampledFramebuffer=o.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(o.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let lt=0;lt<Q.length;lt++){const Et=Q[lt];k.__webglColorRenderbuffer[lt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,k.__webglColorRenderbuffer[lt]);const Dt=s.convert(Et.format,Et.colorSpace),nt=s.convert(Et.type),ut=y(Et.internalFormat,Dt,nt,Et.colorSpace,R.isXRRenderTarget===!0),St=F(R);o.renderbufferStorageMultisample(o.RENDERBUFFER,St,ut,R.width,R.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+lt,o.RENDERBUFFER,k.__webglColorRenderbuffer[lt])}o.bindRenderbuffer(o.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=o.createRenderbuffer(),Ot(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Y){e.bindTexture(o.TEXTURE_CUBE_MAP,K.__webglTexture),at(o.TEXTURE_CUBE_MAP,w);for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0)for(let Et=0;Et<w.mipmaps.length;Et++)Mt(k.__webglFramebuffer[lt][Et],R,w,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Et);else Mt(k.__webglFramebuffer[lt],R,w,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(w)&&p(o.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let lt=0,Et=Q.length;lt<Et;lt++){const Dt=Q[lt],nt=n.get(Dt);let ut=o.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ut=R.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),e.bindTexture(ut,nt.__webglTexture),at(ut,Dt),Mt(k.__webglFramebuffer,R,Dt,o.COLOR_ATTACHMENT0+lt,ut,0),g(Dt)&&p(ut)}e.unbindTexture()}else{let lt=o.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(lt=R.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),e.bindTexture(lt,K.__webglTexture),at(lt,w),w.mipmaps&&w.mipmaps.length>0)for(let Et=0;Et<w.mipmaps.length;Et++)Mt(k.__webglFramebuffer[Et],R,w,o.COLOR_ATTACHMENT0,lt,Et);else Mt(k.__webglFramebuffer,R,w,o.COLOR_ATTACHMENT0,lt,0);g(w)&&p(lt),e.unbindTexture()}R.depthBuffer&&$t(R)}function ie(R){const w=R.textures;for(let k=0,K=w.length;k<K;k++){const Q=w[k];if(g(Q)){const Y=v(R),Ct=n.get(Q).__webglTexture;e.bindTexture(Y,Ct),p(Y),e.unbindTexture()}}}const le=[],Gt=[];function Se(R){if(R.samples>0){if(be(R)===!1){const w=R.textures,k=R.width,K=R.height;let Q=o.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ct=n.get(R),lt=w.length>1;if(lt)for(let Dt=0;Dt<w.length;Dt++)e.bindFramebuffer(o.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Dt,o.RENDERBUFFER,null),e.bindFramebuffer(o.FRAMEBUFFER,Ct.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Dt,o.TEXTURE_2D,null,0);e.bindFramebuffer(o.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const Et=R.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let Dt=0;Dt<w.length;Dt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=o.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=o.STENCIL_BUFFER_BIT)),lt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Ct.__webglColorRenderbuffer[Dt]);const nt=n.get(w[Dt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,nt,0)}o.blitFramebuffer(0,0,k,K,0,0,k,K,Q,o.NEAREST),c===!0&&(le.length=0,Gt.length=0,le.push(o.COLOR_ATTACHMENT0+Dt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(le.push(Y),Gt.push(Y),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Gt)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,le))}if(e.bindFramebuffer(o.READ_FRAMEBUFFER,null),e.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),lt)for(let Dt=0;Dt<w.length;Dt++){e.bindFramebuffer(o.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Dt,o.RENDERBUFFER,Ct.__webglColorRenderbuffer[Dt]);const nt=n.get(w[Dt]).__webglTexture;e.bindFramebuffer(o.FRAMEBUFFER,Ct.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Dt,o.TEXTURE_2D,nt,0)}e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const w=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[w])}}}function F(R){return Math.min(i.maxSamples,R.samples)}function be(R){const w=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ee(R){const w=r.render.frame;h.get(R)!==w&&(h.set(R,w),R.update())}function ue(R,w){const k=R.colorSpace,K=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==qi&&k!==Qn&&(Kt.getTransfer(k)===oe?(K!==hn||Q!==$e)&&Ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",k)),w}function Tt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=D,this.setTexture3D=V,this.setTextureCube=q,this.rebindTextures=Ie,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=$t,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=be,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function sg(o,t){function e(n,i=Qn){let s;const r=Kt.getTransfer(i);if(n===$e)return o.UNSIGNED_BYTE;if(n===ma)return o.UNSIGNED_SHORT_4_4_4_4;if(n===ga)return o.UNSIGNED_SHORT_5_5_5_1;if(n===bl)return o.UNSIGNED_INT_5_9_9_9_REV;if(n===El)return o.UNSIGNED_INT_10F_11F_11F_REV;if(n===wl)return o.BYTE;if(n===Sl)return o.SHORT;if(n===vs)return o.UNSIGNED_SHORT;if(n===pa)return o.INT;if(n===Tn)return o.UNSIGNED_INT;if(n===yn)return o.FLOAT;if(n===Wn)return o.HALF_FLOAT;if(n===Tl)return o.ALPHA;if(n===Al)return o.RGB;if(n===hn)return o.RGBA;if(n===qn)return o.DEPTH_COMPONENT;if(n===vi)return o.DEPTH_STENCIL;if(n===Cl)return o.RED;if(n===xa)return o.RED_INTEGER;if(n===Wi)return o.RG;if(n===va)return o.RG_INTEGER;if(n===_a)return o.RGBA_INTEGER;if(n===hr||n===ur||n===dr||n===fr)if(r===oe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===hr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===hr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ro||n===Po||n===Io||n===Lo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ro)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Po)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Io)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Lo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Do||n===No||n===Fo||n===Uo||n===Bo||n===Oo||n===zo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Do||n===No)return r===oe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Fo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Uo)return s.COMPRESSED_R11_EAC;if(n===Bo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Oo)return s.COMPRESSED_RG11_EAC;if(n===zo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ko||n===Go||n===Vo||n===Ho||n===Wo||n===qo||n===Xo||n===Yo||n===Zo||n===Ko||n===jo||n===$o||n===Jo||n===Qo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ko)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Go)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ho)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ko)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$o)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qo)return r===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ta||n===ea||n===na)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===ta)return r===oe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ea)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===na)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ia||n===sa||n===ra||n===oa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===ia)return s.COMPRESSED_RED_RGTC1_EXT;if(n===sa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ra)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===oa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_s?o.UNSIGNED_INT_24_8:o[n]!==void 0?o[n]:null}return{convert:e}}const rg=`
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

}`;class ag{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Vl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new An({vertexShader:rg,fragmentShader:og,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Z(new Yt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cg extends Zi{constructor(t,e){super();const n=this;let i=null,s=1,r=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null;const x=typeof XRWebGLBinding<"u",g=new ag,p={},v=e.getContextAttributes();let y=null,_=null;const E=[],T=[],C=new yt;let L=null;const M=new nn;M.viewport=new ye;const S=new nn;S.viewport=new ye;const P=[M,S],U=new gd;let I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let tt=E[j];return tt===void 0&&(tt=new $r,E[j]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(j){let tt=E[j];return tt===void 0&&(tt=new $r,E[j]=tt),tt.getGripSpace()},this.getHand=function(j){let tt=E[j];return tt===void 0&&(tt=new $r,E[j]=tt),tt.getHandSpace()};function B(j){const tt=T.indexOf(j.inputSource);if(tt===-1)return;const Mt=E[tt];Mt!==void 0&&(Mt.update(j.inputSource,j.frame,l||r),Mt.dispatchEvent({type:j.type,data:j.inputSource}))}function D(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",V);for(let j=0;j<E.length;j++){const tt=T[j];tt!==null&&(T[j]=null,E[j].disconnect(tt))}I=null,O=null,g.reset();for(const j in p)delete p[j];t.setRenderTarget(y),f=null,d=null,u=null,i=null,_=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&Ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&Ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(y=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",D),i.addEventListener("inputsourceschange",V),v.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Ot=null,bt=null;v.depth&&(bt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=v.stencil?vi:qn,Ot=v.stencil?_s:Tn);const $t={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer($t),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new Sn(d.textureWidth,d.textureHeight,{format:hn,type:$e,depthTexture:new Ms(d.textureWidth,d.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Mt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,Mt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Sn(f.framebufferWidth,f.framebufferHeight,{format:hn,type:$e,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function V(j){for(let tt=0;tt<j.removed.length;tt++){const Mt=j.removed[tt],Ot=T.indexOf(Mt);Ot>=0&&(T[Ot]=null,E[Ot].disconnect(Mt))}for(let tt=0;tt<j.added.length;tt++){const Mt=j.added[tt];let Ot=T.indexOf(Mt);if(Ot===-1){for(let $t=0;$t<E.length;$t++)if($t>=T.length){T.push(Mt),Ot=$t;break}else if(T[$t]===null){T[$t]=Mt,Ot=$t;break}if(Ot===-1)break}const bt=E[Ot];bt&&bt.connect(Mt)}}const q=new N,J=new N;function it(j,tt,Mt){q.setFromMatrixPosition(tt.matrixWorld),J.setFromMatrixPosition(Mt.matrixWorld);const Ot=q.distanceTo(J),bt=tt.projectionMatrix.elements,$t=Mt.projectionMatrix.elements,Ie=bt[14]/(bt[10]-1),Zt=bt[14]/(bt[10]+1),ie=(bt[9]+1)/bt[5],le=(bt[9]-1)/bt[5],Gt=(bt[8]-1)/bt[0],Se=($t[8]+1)/$t[0],F=Ie*Gt,be=Ie*Se,ee=Ot/(-Gt+Se),ue=ee*-Gt;if(tt.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ue),j.translateZ(ee),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),bt[10]===-1)j.projectionMatrix.copy(tt.projectionMatrix),j.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Tt=Ie+ee,R=Zt+ee,w=F-ue,k=be+(Ot-ue),K=ie*Zt/R*Tt,Q=le*Zt/R*Tt;j.projectionMatrix.makePerspective(w,k,K,Q,Tt,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ot(j,tt){tt===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(tt.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let tt=j.near,Mt=j.far;g.texture!==null&&(g.depthNear>0&&(tt=g.depthNear),g.depthFar>0&&(Mt=g.depthFar)),U.near=S.near=M.near=tt,U.far=S.far=M.far=Mt,(I!==U.near||O!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),I=U.near,O=U.far),U.layers.mask=j.layers.mask|6,M.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;const Ot=j.parent,bt=U.cameras;ot(U,Ot);for(let $t=0;$t<bt.length;$t++)ot(bt[$t],Ot);bt.length===2?it(U,M,S):U.projectionMatrix.copy(M.projectionMatrix),at(j,U,Ot)};function at(j,tt,Mt){Mt===null?j.matrix.copy(tt.matrixWorld):(j.matrix.copy(Mt.matrixWorld),j.matrix.invert(),j.matrix.multiply(tt.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(tt.projectionMatrix),j.projectionMatrixInverse.copy(tt.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=aa*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(j){return p[j]};let Nt=null;function ae(j,tt){if(h=tt.getViewerPose(l||r),m=tt,h!==null){const Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Ot=!1;Mt.length!==U.cameras.length&&(U.cameras.length=0,Ot=!0);for(let Zt=0;Zt<Mt.length;Zt++){const ie=Mt[Zt];let le=null;if(f!==null)le=f.getViewport(ie);else{const Se=u.getViewSubImage(d,ie);le=Se.viewport,Zt===0&&(t.setRenderTargetTextures(_,Se.colorTexture,Se.depthStencilTexture),t.setRenderTarget(_))}let Gt=P[Zt];Gt===void 0&&(Gt=new nn,Gt.layers.enable(Zt),Gt.viewport=new ye,P[Zt]=Gt),Gt.matrix.fromArray(ie.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(ie.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(le.x,le.y,le.width,le.height),Zt===0&&(U.matrix.copy(Gt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ot===!0&&U.cameras.push(Gt)}const bt=i.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const Zt=u.getDepthInformation(Mt[0]);Zt&&Zt.isValid&&Zt.texture&&g.init(Zt,i.renderState)}if(bt&&bt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let Zt=0;Zt<Mt.length;Zt++){const ie=Mt[Zt].camera;if(ie){let le=p[ie];le||(le=new Vl,p[ie]=le);const Gt=u.getCameraImage(ie);le.sourceTexture=Gt}}}}for(let Mt=0;Mt<E.length;Mt++){const Ot=T[Mt],bt=E[Mt];Ot!==null&&bt!==void 0&&bt.update(Ot,tt,l||r)}Nt&&Nt(j,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),m=null}const ne=new Jl;ne.setAnimationLoop(ae),this.setAnimationLoop=function(j){Nt=j},this.dispose=function(){}}}const ui=new fn,lg=new me;function hg(o,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Bl(o)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,v,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(r(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,v,y):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=t.get(p),y=v.envMap,_=v.envMapRotation;y&&(g.envMap.value=y,ui.copy(_),ui.x*=-1,ui.y*=-1,ui.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),g.envMapRotation.value.setFromMatrix4(lg.makeRotationFromEuler(ui)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function r(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,v,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=y*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const v=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ug(o,t,e,n){let i={},s={},r=[];const a=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const _=y.program;n.uniformBlockBinding(v,_)}function l(v,y){let _=i[v.id];_===void 0&&(m(v),_=h(v),i[v.id]=_,v.addEventListener("dispose",g));const E=y.program;n.updateUBOMapping(v,E);const T=t.render.frame;s[v.id]!==T&&(d(v),s[v.id]=T)}function h(v){const y=u();v.__bindingPointIndex=y;const _=o.createBuffer(),E=v.__size,T=v.usage;return o.bindBuffer(o.UNIFORM_BUFFER,_),o.bufferData(o.UNIFORM_BUFFER,E,T),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,y,_),_}function u(){for(let v=0;v<a;v++)if(r.indexOf(v)===-1)return r.push(v),v;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=i[v.id],_=v.uniforms,E=v.__cache;o.bindBuffer(o.UNIFORM_BUFFER,y);for(let T=0,C=_.length;T<C;T++){const L=Array.isArray(_[T])?_[T]:[_[T]];for(let M=0,S=L.length;M<S;M++){const P=L[M];if(f(P,T,M,E)===!0){const U=P.__offset,I=Array.isArray(P.value)?P.value:[P.value];let O=0;for(let B=0;B<I.length;B++){const D=I[B],V=x(D);typeof D=="number"||typeof D=="boolean"?(P.__data[0]=D,o.bufferSubData(o.UNIFORM_BUFFER,U+O,P.__data)):D.isMatrix3?(P.__data[0]=D.elements[0],P.__data[1]=D.elements[1],P.__data[2]=D.elements[2],P.__data[3]=0,P.__data[4]=D.elements[3],P.__data[5]=D.elements[4],P.__data[6]=D.elements[5],P.__data[7]=0,P.__data[8]=D.elements[6],P.__data[9]=D.elements[7],P.__data[10]=D.elements[8],P.__data[11]=0):(D.toArray(P.__data,O),O+=V.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,U,P.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function f(v,y,_,E){const T=v.value,C=y+"_"+_;if(E[C]===void 0)return typeof T=="number"||typeof T=="boolean"?E[C]=T:E[C]=T.clone(),!0;{const L=E[C];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return E[C]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function m(v){const y=v.uniforms;let _=0;const E=16;for(let C=0,L=y.length;C<L;C++){const M=Array.isArray(y[C])?y[C]:[y[C]];for(let S=0,P=M.length;S<P;S++){const U=M[S],I=Array.isArray(U.value)?U.value:[U.value];for(let O=0,B=I.length;O<B;O++){const D=I[O],V=x(D),q=_%E,J=q%V.boundary,it=q+J;_+=J,it!==0&&E-it<V.storage&&(_+=E-it),U.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=_,_+=V.storage}}}const T=_%E;return T>0&&(_+=E-T),v.__size=_,v.__cache={},this}function x(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?Ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ft("WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const _=r.indexOf(y.__bindingPointIndex);r.splice(_,1),o.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(const v in i)o.deleteBuffer(i[v]);r=[],i={},s={}}return{bind:c,update:l,dispose:p}}const dg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let mn=null;function fg(){return mn===null&&(mn=new Eu(dg,16,16,Wi,Wn),mn.name="DFG_LUT",mn.minFilter=Oe,mn.magFilter=Oe,mn.wrapS=Gn,mn.wrapT=Gn,mn.generateMipmaps=!1,mn.needsUpdate=!0),mn}class pg{constructor(t={}){const{canvas:e=Jh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=$e}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=r;const x=f,g=new Set([_a,va,xa]),p=new Set([$e,Tn,vs,_s,ma,ga]),v=new Uint32Array(4),y=new Int32Array(4);let _=null,E=null;const T=[],C=[];let L=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let S=!1;this._outputColorSpace=en;let P=0,U=0,I=null,O=-1,B=null;const D=new ye,V=new ye;let q=null;const J=new Bt(0);let it=0,ot=e.width,at=e.height,Nt=1,ae=null,ne=null;const j=new ye(0,0,ot,at),tt=new ye(0,0,ot,at);let Mt=!1;const Ot=new ba;let bt=!1,$t=!1;const Ie=new me,Zt=new N,ie=new ye,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Se(){return I===null?Nt:1}let F=n;function be(A,G){return e.getContext(A,G)}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${fa}`),e.addEventListener("webglcontextlost",Ut,!1),e.addEventListener("webglcontextrestored",de,!1),e.addEventListener("webglcontextcreationerror",se,!1),F===null){const G="webgl2";if(F=be(G,A),F===null)throw be(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw Qt("WebGLRenderer: "+A.message),A}let ee,ue,Tt,R,w,k,K,Q,Y,Ct,lt,Et,Dt,nt,ut,St,At,ht,Vt,z,mt,rt,gt,et;function $(){ee=new fm(F),ee.init(),rt=new sg(F,ee),ue=new sm(F,ee,t,rt),Tt=new ng(F,ee),ue.reversedDepthBuffer&&d&&Tt.buffers.depth.setReversed(!0),R=new gm(F),w=new G0,k=new ig(F,ee,Tt,w,ue,rt,R),K=new om(M),Q=new dm(M),Y=new _d(F),gt=new nm(F,Y),Ct=new pm(F,Y,R,gt),lt=new vm(F,Ct,Y,R),Vt=new xm(F,ue,k),St=new rm(w),Et=new k0(M,K,Q,ee,ue,gt,St),Dt=new hg(M,w),nt=new H0,ut=new K0(ee),ht=new em(M,K,Q,Tt,lt,m,c),At=new tg(M,lt,ue),et=new ug(F,R,ue,Tt),z=new im(F,ee,R),mt=new mm(F,ee,R),R.programs=Et.programs,M.capabilities=ue,M.extensions=ee,M.properties=w,M.renderLists=nt,M.shadowMap=At,M.state=Tt,M.info=R}$(),x!==$e&&(L=new ym(x,e.width,e.height,i,s));const ct=new cg(M,F);this.xr=ct,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=ee.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ee.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Nt},this.setPixelRatio=function(A){A!==void 0&&(Nt=A,this.setSize(ot,at,!1))},this.getSize=function(A){return A.set(ot,at)},this.setSize=function(A,G,X=!0){if(ct.isPresenting){Ft("WebGLRenderer: Can't change size while VR device is presenting.");return}ot=A,at=G,e.width=Math.floor(A*Nt),e.height=Math.floor(G*Nt),X===!0&&(e.style.width=A+"px",e.style.height=G+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(ot*Nt,at*Nt).floor()},this.setDrawingBufferSize=function(A,G,X){ot=A,at=G,Nt=X,e.width=Math.floor(A*X),e.height=Math.floor(G*X),this.setViewport(0,0,A,G)},this.setEffects=function(A){if(x===$e){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let G=0;G<A.length;G++)if(A[G].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(D)},this.getViewport=function(A){return A.copy(j)},this.setViewport=function(A,G,X,W){A.isVector4?j.set(A.x,A.y,A.z,A.w):j.set(A,G,X,W),Tt.viewport(D.copy(j).multiplyScalar(Nt).round())},this.getScissor=function(A){return A.copy(tt)},this.setScissor=function(A,G,X,W){A.isVector4?tt.set(A.x,A.y,A.z,A.w):tt.set(A,G,X,W),Tt.scissor(V.copy(tt).multiplyScalar(Nt).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(A){Tt.setScissorTest(Mt=A)},this.setOpaqueSort=function(A){ae=A},this.setTransparentSort=function(A){ne=A},this.getClearColor=function(A){return A.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,X=!0){let W=0;if(A){let H=!1;if(I!==null){const dt=I.texture.format;H=g.has(dt)}if(H){const dt=I.texture.type,xt=p.has(dt),pt=ht.getClearColor(),wt=ht.getClearAlpha(),Rt=pt.r,Lt=pt.g,Pt=pt.b;xt?(v[0]=Rt,v[1]=Lt,v[2]=Pt,v[3]=wt,F.clearBufferuiv(F.COLOR,0,v)):(y[0]=Rt,y[1]=Lt,y[2]=Pt,y[3]=wt,F.clearBufferiv(F.COLOR,0,y))}else W|=F.COLOR_BUFFER_BIT}G&&(W|=F.DEPTH_BUFFER_BIT),X&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ut,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",se,!1),ht.dispose(),nt.dispose(),ut.dispose(),w.dispose(),K.dispose(),Q.dispose(),lt.dispose(),gt.dispose(),et.dispose(),Et.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Fa),ct.removeEventListener("sessionend",Ua),si.stop()};function Ut(A){A.preventDefault(),ja("WebGLRenderer: Context Lost."),S=!0}function de(){ja("WebGLRenderer: Context Restored."),S=!1;const A=R.autoReset,G=At.enabled,X=At.autoUpdate,W=At.needsUpdate,H=At.type;$(),R.autoReset=A,At.enabled=G,At.autoUpdate=X,At.needsUpdate=W,At.type=H}function se(A){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function pn(A){const G=A.target;G.removeEventListener("dispose",pn),Pn(G)}function Pn(A){dh(A),w.remove(A)}function dh(A){const G=w.get(A).programs;G!==void 0&&(G.forEach(function(X){Et.releaseProgram(X)}),A.isShaderMaterial&&Et.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,X,W,H,dt){G===null&&(G=le);const xt=H.isMesh&&H.matrixWorld.determinant()<0,pt=ph(A,G,X,W,H);Tt.setMaterial(W,xt);let wt=X.index,Rt=1;if(W.wireframe===!0){if(wt=Ct.getWireframeAttribute(X),wt===void 0)return;Rt=2}const Lt=X.drawRange,Pt=X.attributes.position;let Ht=Lt.start*Rt,ce=(Lt.start+Lt.count)*Rt;dt!==null&&(Ht=Math.max(Ht,dt.start*Rt),ce=Math.min(ce,(dt.start+dt.count)*Rt)),wt!==null?(Ht=Math.max(Ht,0),ce=Math.min(ce,wt.count)):Pt!=null&&(Ht=Math.max(Ht,0),ce=Math.min(ce,Pt.count));const ve=ce-Ht;if(ve<0||ve===1/0)return;gt.setup(H,W,pt,X,wt);let _e,he=z;if(wt!==null&&(_e=Y.get(wt),he=mt,he.setIndex(_e)),H.isMesh)W.wireframe===!0?(Tt.setLineWidth(W.wireframeLinewidth*Se()),he.setMode(F.LINES)):he.setMode(F.TRIANGLES);else if(H.isLine){let It=W.linewidth;It===void 0&&(It=1),Tt.setLineWidth(It*Se()),H.isLineSegments?he.setMode(F.LINES):H.isLineLoop?he.setMode(F.LINE_LOOP):he.setMode(F.LINE_STRIP)}else H.isPoints?he.setMode(F.POINTS):H.isSprite&&he.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ys("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),he.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))he.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const It=H._multiDrawStarts,re=H._multiDrawCounts,Jt=H._multiDrawCount,Ye=wt?Y.get(wt).bytesPerElement:1,wi=w.get(W).currentProgram.getUniforms();for(let Ze=0;Ze<Jt;Ze++)wi.setValue(F,"_gl_DrawID",Ze),he.render(It[Ze]/Ye,re[Ze])}else if(H.isInstancedMesh)he.renderInstances(Ht,ve,H.count);else if(X.isInstancedBufferGeometry){const It=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,re=Math.min(X.instanceCount,It);he.renderInstances(Ht,ve,re)}else he.render(Ht,ve)};function Na(A,G,X){A.transparent===!0&&A.side===Xt&&A.forceSinglePass===!1?(A.side=Xe,A.needsUpdate=!0,Ls(A,G,X),A.side=ni,A.needsUpdate=!0,Ls(A,G,X),A.side=Xt):Ls(A,G,X)}this.compile=function(A,G,X=null){X===null&&(X=A),E=ut.get(X),E.init(G),C.push(E),X.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),A!==X&&A.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights();const W=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const dt=H.material;if(dt)if(Array.isArray(dt))for(let xt=0;xt<dt.length;xt++){const pt=dt[xt];Na(pt,X,H),W.add(pt)}else Na(dt,X,H),W.add(dt)}),E=C.pop(),W},this.compileAsync=function(A,G,X=null){const W=this.compile(A,G,X);return new Promise(H=>{function dt(){if(W.forEach(function(xt){w.get(xt).currentProgram.isReady()&&W.delete(xt)}),W.size===0){H(A);return}setTimeout(dt,10)}ee.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Er=null;function fh(A){Er&&Er(A)}function Fa(){si.stop()}function Ua(){si.start()}const si=new Jl;si.setAnimationLoop(fh),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(A){Er=A,ct.setAnimationLoop(A),A===null?si.stop():si.start()},ct.addEventListener("sessionstart",Fa),ct.addEventListener("sessionend",Ua),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;const X=ct.enabled===!0&&ct.isPresenting===!0,W=L!==null&&(I===null||X)&&L.begin(M,I);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(G),G=ct.getCamera()),A.isScene===!0&&A.onBeforeRender(M,A,G,I),E=ut.get(A,C.length),E.init(G),C.push(E),Ie.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Ot.setFromProjectionMatrix(Ie,Mn,G.reversedDepth),$t=this.localClippingEnabled,bt=St.init(this.clippingPlanes,$t),_=nt.get(A,T.length),_.init(),T.push(_),ct.enabled===!0&&ct.isPresenting===!0){const xt=M.xr.getDepthSensingMesh();xt!==null&&Tr(xt,G,-1/0,M.sortObjects)}Tr(A,G,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(ae,ne),Gt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Gt&&ht.addToRenderList(_,A),this.info.render.frame++,bt===!0&&St.beginShadows();const H=E.state.shadowsArray;if(At.render(H,A,G),bt===!0&&St.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&L.hasRenderPass())===!1){const xt=_.opaque,pt=_.transmissive;if(E.setupLights(),G.isArrayCamera){const wt=G.cameras;if(pt.length>0)for(let Rt=0,Lt=wt.length;Rt<Lt;Rt++){const Pt=wt[Rt];Oa(xt,pt,A,Pt)}Gt&&ht.render(A);for(let Rt=0,Lt=wt.length;Rt<Lt;Rt++){const Pt=wt[Rt];Ba(_,A,Pt,Pt.viewport)}}else pt.length>0&&Oa(xt,pt,A,G),Gt&&ht.render(A),Ba(_,A,G)}I!==null&&U===0&&(k.updateMultisampleRenderTarget(I),k.updateRenderTargetMipmap(I)),W&&L.end(M),A.isScene===!0&&A.onAfterRender(M,A,G),gt.resetDefaultState(),O=-1,B=null,C.pop(),C.length>0?(E=C[C.length-1],bt===!0&&St.setGlobalState(M.clippingPlanes,E.state.camera)):E=null,T.pop(),T.length>0?_=T[T.length-1]:_=null};function Tr(A,G,X,W){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)E.pushLight(A),A.castShadow&&E.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Ot.intersectsSprite(A)){W&&ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ie);const xt=lt.update(A),pt=A.material;pt.visible&&_.push(A,xt,pt,X,ie.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Ot.intersectsObject(A))){const xt=lt.update(A),pt=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ie.copy(A.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),ie.copy(xt.boundingSphere.center)),ie.applyMatrix4(A.matrixWorld).applyMatrix4(Ie)),Array.isArray(pt)){const wt=xt.groups;for(let Rt=0,Lt=wt.length;Rt<Lt;Rt++){const Pt=wt[Rt],Ht=pt[Pt.materialIndex];Ht&&Ht.visible&&_.push(A,xt,Ht,X,ie.z,Pt)}}else pt.visible&&_.push(A,xt,pt,X,ie.z,null)}}const dt=A.children;for(let xt=0,pt=dt.length;xt<pt;xt++)Tr(dt[xt],G,X,W)}function Ba(A,G,X,W){const{opaque:H,transmissive:dt,transparent:xt}=A;E.setupLightsView(X),bt===!0&&St.setGlobalState(M.clippingPlanes,X),W&&Tt.viewport(D.copy(W)),H.length>0&&Is(H,G,X),dt.length>0&&Is(dt,G,X),xt.length>0&&Is(xt,G,X),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Oa(A,G,X,W){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[W.id]===void 0){const Ht=ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[W.id]=new Sn(1,1,{generateMipmaps:!0,type:Ht?Wn:$e,minFilter:xi,samples:ue.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const dt=E.state.transmissionRenderTarget[W.id],xt=W.viewport||D;dt.setSize(xt.z*M.transmissionResolutionScale,xt.w*M.transmissionResolutionScale);const pt=M.getRenderTarget(),wt=M.getActiveCubeFace(),Rt=M.getActiveMipmapLevel();M.setRenderTarget(dt),M.getClearColor(J),it=M.getClearAlpha(),it<1&&M.setClearColor(16777215,.5),M.clear(),Gt&&ht.render(X);const Lt=M.toneMapping;M.toneMapping=wn;const Pt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),E.setupLightsView(W),bt===!0&&St.setGlobalState(M.clippingPlanes,W),Is(A,X,W),k.updateMultisampleRenderTarget(dt),k.updateRenderTargetMipmap(dt),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let ce=0,ve=G.length;ce<ve;ce++){const _e=G[ce],{object:he,geometry:It,material:re,group:Jt}=_e;if(re.side===Xt&&he.layers.test(W.layers)){const Ye=re.side;re.side=Xe,re.needsUpdate=!0,za(he,X,W,It,re,Jt),re.side=Ye,re.needsUpdate=!0,Ht=!0}}Ht===!0&&(k.updateMultisampleRenderTarget(dt),k.updateRenderTargetMipmap(dt))}M.setRenderTarget(pt,wt,Rt),M.setClearColor(J,it),Pt!==void 0&&(W.viewport=Pt),M.toneMapping=Lt}function Is(A,G,X){const W=G.isScene===!0?G.overrideMaterial:null;for(let H=0,dt=A.length;H<dt;H++){const xt=A[H],{object:pt,geometry:wt,group:Rt}=xt;let Lt=xt.material;Lt.allowOverride===!0&&W!==null&&(Lt=W),pt.layers.test(X.layers)&&za(pt,G,X,wt,Lt,Rt)}}function za(A,G,X,W,H,dt){A.onBeforeRender(M,G,X,W,H,dt),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(M,G,X,W,A,dt),H.transparent===!0&&H.side===Xt&&H.forceSinglePass===!1?(H.side=Xe,H.needsUpdate=!0,M.renderBufferDirect(X,G,W,H,A,dt),H.side=ni,H.needsUpdate=!0,M.renderBufferDirect(X,G,W,H,A,dt),H.side=Xt):M.renderBufferDirect(X,G,W,H,A,dt),A.onAfterRender(M,G,X,W,H,dt)}function Ls(A,G,X){G.isScene!==!0&&(G=le);const W=w.get(A),H=E.state.lights,dt=E.state.shadowsArray,xt=H.state.version,pt=Et.getParameters(A,H.state,dt,G,X),wt=Et.getProgramCacheKey(pt);let Rt=W.programs;W.environment=A.isMeshStandardMaterial?G.environment:null,W.fog=G.fog,W.envMap=(A.isMeshStandardMaterial?Q:K).get(A.envMap||W.environment),W.envMapRotation=W.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Rt===void 0&&(A.addEventListener("dispose",pn),Rt=new Map,W.programs=Rt);let Lt=Rt.get(wt);if(Lt!==void 0){if(W.currentProgram===Lt&&W.lightsStateVersion===xt)return Ga(A,pt),Lt}else pt.uniforms=Et.getUniforms(A),A.onBeforeCompile(pt,M),Lt=Et.acquireProgram(pt,wt),Rt.set(wt,Lt),W.uniforms=pt.uniforms;const Pt=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Pt.clippingPlanes=St.uniform),Ga(A,pt),W.needsLights=gh(A),W.lightsStateVersion=xt,W.needsLights&&(Pt.ambientLightColor.value=H.state.ambient,Pt.lightProbe.value=H.state.probe,Pt.directionalLights.value=H.state.directional,Pt.directionalLightShadows.value=H.state.directionalShadow,Pt.spotLights.value=H.state.spot,Pt.spotLightShadows.value=H.state.spotShadow,Pt.rectAreaLights.value=H.state.rectArea,Pt.ltc_1.value=H.state.rectAreaLTC1,Pt.ltc_2.value=H.state.rectAreaLTC2,Pt.pointLights.value=H.state.point,Pt.pointLightShadows.value=H.state.pointShadow,Pt.hemisphereLights.value=H.state.hemi,Pt.directionalShadowMap.value=H.state.directionalShadowMap,Pt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Pt.spotShadowMap.value=H.state.spotShadowMap,Pt.spotLightMatrix.value=H.state.spotLightMatrix,Pt.spotLightMap.value=H.state.spotLightMap,Pt.pointShadowMap.value=H.state.pointShadowMap,Pt.pointShadowMatrix.value=H.state.pointShadowMatrix),W.currentProgram=Lt,W.uniformsList=null,Lt}function ka(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=pr.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function Ga(A,G){const X=w.get(A);X.outputColorSpace=G.outputColorSpace,X.batching=G.batching,X.batchingColor=G.batchingColor,X.instancing=G.instancing,X.instancingColor=G.instancingColor,X.instancingMorph=G.instancingMorph,X.skinning=G.skinning,X.morphTargets=G.morphTargets,X.morphNormals=G.morphNormals,X.morphColors=G.morphColors,X.morphTargetsCount=G.morphTargetsCount,X.numClippingPlanes=G.numClippingPlanes,X.numIntersection=G.numClipIntersection,X.vertexAlphas=G.vertexAlphas,X.vertexTangents=G.vertexTangents,X.toneMapping=G.toneMapping}function ph(A,G,X,W,H){G.isScene!==!0&&(G=le),k.resetTextureUnits();const dt=G.fog,xt=W.isMeshStandardMaterial?G.environment:null,pt=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:qi,wt=(W.isMeshStandardMaterial?Q:K).get(W.envMap||xt),Rt=W.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Lt=!!X.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pt=!!X.morphAttributes.position,Ht=!!X.morphAttributes.normal,ce=!!X.morphAttributes.color;let ve=wn;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ve=M.toneMapping);const _e=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,he=_e!==void 0?_e.length:0,It=w.get(W),re=E.state.lights;if(bt===!0&&($t===!0||A!==B)){const ke=A===B&&W.id===O;St.setState(W,A,ke)}let Jt=!1;W.version===It.__version?(It.needsLights&&It.lightsStateVersion!==re.state.version||It.outputColorSpace!==pt||H.isBatchedMesh&&It.batching===!1||!H.isBatchedMesh&&It.batching===!0||H.isBatchedMesh&&It.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&It.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&It.instancing===!1||!H.isInstancedMesh&&It.instancing===!0||H.isSkinnedMesh&&It.skinning===!1||!H.isSkinnedMesh&&It.skinning===!0||H.isInstancedMesh&&It.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&It.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&It.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&It.instancingMorph===!1&&H.morphTexture!==null||It.envMap!==wt||W.fog===!0&&It.fog!==dt||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==St.numPlanes||It.numIntersection!==St.numIntersection)||It.vertexAlphas!==Rt||It.vertexTangents!==Lt||It.morphTargets!==Pt||It.morphNormals!==Ht||It.morphColors!==ce||It.toneMapping!==ve||It.morphTargetsCount!==he)&&(Jt=!0):(Jt=!0,It.__version=W.version);let Ye=It.currentProgram;Jt===!0&&(Ye=Ls(W,G,H));let wi=!1,Ze=!1,ts=!1;const fe=Ye.getUniforms(),Ve=It.uniforms;if(Tt.useProgram(Ye.program)&&(wi=!0,Ze=!0,ts=!0),W.id!==O&&(O=W.id,Ze=!0),wi||B!==A){Tt.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),fe.setValue(F,"projectionMatrix",A.projectionMatrix),fe.setValue(F,"viewMatrix",A.matrixWorldInverse);const He=fe.map.cameraPosition;He!==void 0&&He.setValue(F,Zt.setFromMatrixPosition(A.matrixWorld)),ue.logarithmicDepthBuffer&&fe.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&fe.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),B!==A&&(B=A,Ze=!0,ts=!0)}if(It.needsLights&&(re.state.directionalShadowMap.length>0&&fe.setValue(F,"directionalShadowMap",re.state.directionalShadowMap,k),re.state.spotShadowMap.length>0&&fe.setValue(F,"spotShadowMap",re.state.spotShadowMap,k),re.state.pointShadowMap.length>0&&fe.setValue(F,"pointShadowMap",re.state.pointShadowMap,k)),H.isSkinnedMesh){fe.setOptional(F,H,"bindMatrix"),fe.setOptional(F,H,"bindMatrixInverse");const ke=H.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),fe.setValue(F,"boneTexture",ke.boneTexture,k))}H.isBatchedMesh&&(fe.setOptional(F,H,"batchingTexture"),fe.setValue(F,"batchingTexture",H._matricesTexture,k),fe.setOptional(F,H,"batchingIdTexture"),fe.setValue(F,"batchingIdTexture",H._indirectTexture,k),fe.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&fe.setValue(F,"batchingColorTexture",H._colorsTexture,k));const Qe=X.morphAttributes;if((Qe.position!==void 0||Qe.normal!==void 0||Qe.color!==void 0)&&Vt.update(H,X,Ye),(Ze||It.receiveShadow!==H.receiveShadow)&&(It.receiveShadow=H.receiveShadow,fe.setValue(F,"receiveShadow",H.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ve.envMap.value=wt,Ve.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&G.environment!==null&&(Ve.envMapIntensity.value=G.environmentIntensity),Ve.dfgLUT!==void 0&&(Ve.dfgLUT.value=fg()),Ze&&(fe.setValue(F,"toneMappingExposure",M.toneMappingExposure),It.needsLights&&mh(Ve,ts),dt&&W.fog===!0&&Dt.refreshFogUniforms(Ve,dt),Dt.refreshMaterialUniforms(Ve,W,Nt,at,E.state.transmissionRenderTarget[A.id]),pr.upload(F,ka(It),Ve,k)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(pr.upload(F,ka(It),Ve,k),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&fe.setValue(F,"center",H.center),fe.setValue(F,"modelViewMatrix",H.modelViewMatrix),fe.setValue(F,"normalMatrix",H.normalMatrix),fe.setValue(F,"modelMatrix",H.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const ke=W.uniformsGroups;for(let He=0,Ar=ke.length;He<Ar;He++){const ri=ke[He];et.update(ri,Ye),et.bind(ri,Ye)}}return Ye}function mh(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function gh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,G,X){const W=w.get(A);W.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),w.get(A.texture).__webglTexture=G,w.get(A.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:X,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){const X=w.get(A);X.__webglFramebuffer=G,X.__useDefaultFramebuffer=G===void 0};const xh=F.createFramebuffer();this.setRenderTarget=function(A,G=0,X=0){I=A,P=G,U=X;let W=null,H=!1,dt=!1;if(A){const pt=w.get(A);if(pt.__useDefaultFramebuffer!==void 0){Tt.bindFramebuffer(F.FRAMEBUFFER,pt.__webglFramebuffer),D.copy(A.viewport),V.copy(A.scissor),q=A.scissorTest,Tt.viewport(D),Tt.scissor(V),Tt.setScissorTest(q),O=-1;return}else if(pt.__webglFramebuffer===void 0)k.setupRenderTarget(A);else if(pt.__hasExternalTextures)k.rebindTextures(A,w.get(A.texture).__webglTexture,w.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Lt=A.depthTexture;if(pt.__boundDepthTexture!==Lt){if(Lt!==null&&w.has(Lt)&&(A.width!==Lt.image.width||A.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(A)}}const wt=A.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(dt=!0);const Rt=w.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Rt[G])?W=Rt[G][X]:W=Rt[G],H=!0):A.samples>0&&k.useMultisampledRTT(A)===!1?W=w.get(A).__webglMultisampledFramebuffer:Array.isArray(Rt)?W=Rt[X]:W=Rt,D.copy(A.viewport),V.copy(A.scissor),q=A.scissorTest}else D.copy(j).multiplyScalar(Nt).floor(),V.copy(tt).multiplyScalar(Nt).floor(),q=Mt;if(X!==0&&(W=xh),Tt.bindFramebuffer(F.FRAMEBUFFER,W)&&Tt.drawBuffers(A,W),Tt.viewport(D),Tt.scissor(V),Tt.setScissorTest(q),H){const pt=w.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+G,pt.__webglTexture,X)}else if(dt){const pt=G;for(let wt=0;wt<A.textures.length;wt++){const Rt=w.get(A.textures[wt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+wt,Rt.__webglTexture,X,pt)}}else if(A!==null&&X!==0){const pt=w.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pt.__webglTexture,X)}O=-1},this.readRenderTargetPixels=function(A,G,X,W,H,dt,xt,pt=0){if(!(A&&A.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=w.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&xt!==void 0&&(wt=wt[xt]),wt){Tt.bindFramebuffer(F.FRAMEBUFFER,wt);try{const Rt=A.textures[pt],Lt=Rt.format,Pt=Rt.type;if(!ue.textureFormatReadable(Lt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ue.textureTypeReadable(Pt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-W&&X>=0&&X<=A.height-H&&(A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+pt),F.readPixels(G,X,W,H,rt.convert(Lt),rt.convert(Pt),dt))}finally{const Rt=I!==null?w.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(A,G,X,W,H,dt,xt,pt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=w.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&xt!==void 0&&(wt=wt[xt]),wt)if(G>=0&&G<=A.width-W&&X>=0&&X<=A.height-H){Tt.bindFramebuffer(F.FRAMEBUFFER,wt);const Rt=A.textures[pt],Lt=Rt.format,Pt=Rt.type;if(!ue.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ht=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ht),F.bufferData(F.PIXEL_PACK_BUFFER,dt.byteLength,F.STREAM_READ),A.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+pt),F.readPixels(G,X,W,H,rt.convert(Lt),rt.convert(Pt),0);const ce=I!==null?w.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,ce);const ve=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Qh(F,ve,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ht),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,dt),F.deleteBuffer(Ht),F.deleteSync(ve),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,X=0){const W=Math.pow(2,-X),H=Math.floor(A.image.width*W),dt=Math.floor(A.image.height*W),xt=G!==null?G.x:0,pt=G!==null?G.y:0;k.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,xt,pt,H,dt),Tt.unbindTexture()};const vh=F.createFramebuffer(),_h=F.createFramebuffer();this.copyTextureToTexture=function(A,G,X=null,W=null,H=0,dt=null){dt===null&&(H!==0?(ys("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),dt=H,H=0):dt=0);let xt,pt,wt,Rt,Lt,Pt,Ht,ce,ve;const _e=A.isCompressedTexture?A.mipmaps[dt]:A.image;if(X!==null)xt=X.max.x-X.min.x,pt=X.max.y-X.min.y,wt=X.isBox3?X.max.z-X.min.z:1,Rt=X.min.x,Lt=X.min.y,Pt=X.isBox3?X.min.z:0;else{const Qe=Math.pow(2,-H);xt=Math.floor(_e.width*Qe),pt=Math.floor(_e.height*Qe),A.isDataArrayTexture?wt=_e.depth:A.isData3DTexture?wt=Math.floor(_e.depth*Qe):wt=1,Rt=0,Lt=0,Pt=0}W!==null?(Ht=W.x,ce=W.y,ve=W.z):(Ht=0,ce=0,ve=0);const he=rt.convert(G.format),It=rt.convert(G.type);let re;G.isData3DTexture?(k.setTexture3D(G,0),re=F.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(k.setTexture2DArray(G,0),re=F.TEXTURE_2D_ARRAY):(k.setTexture2D(G,0),re=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,G.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,G.unpackAlignment);const Jt=F.getParameter(F.UNPACK_ROW_LENGTH),Ye=F.getParameter(F.UNPACK_IMAGE_HEIGHT),wi=F.getParameter(F.UNPACK_SKIP_PIXELS),Ze=F.getParameter(F.UNPACK_SKIP_ROWS),ts=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,_e.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_e.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Rt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Lt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Pt);const fe=A.isDataArrayTexture||A.isData3DTexture,Ve=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){const Qe=w.get(A),ke=w.get(G),He=w.get(Qe.__renderTarget),Ar=w.get(ke.__renderTarget);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,He.__webglFramebuffer),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ar.__webglFramebuffer);for(let ri=0;ri<wt;ri++)fe&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,w.get(A).__webglTexture,H,Pt+ri),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,w.get(G).__webglTexture,dt,ve+ri)),F.blitFramebuffer(Rt,Lt,xt,pt,Ht,ce,xt,pt,F.DEPTH_BUFFER_BIT,F.NEAREST);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||A.isRenderTargetTexture||w.has(A)){const Qe=w.get(A),ke=w.get(G);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,vh),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,_h);for(let He=0;He<wt;He++)fe?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Qe.__webglTexture,H,Pt+He):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Qe.__webglTexture,H),Ve?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.__webglTexture,dt,ve+He):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ke.__webglTexture,dt),H!==0?F.blitFramebuffer(Rt,Lt,xt,pt,Ht,ce,xt,pt,F.COLOR_BUFFER_BIT,F.NEAREST):Ve?F.copyTexSubImage3D(re,dt,Ht,ce,ve+He,Rt,Lt,xt,pt):F.copyTexSubImage2D(re,dt,Ht,ce,Rt,Lt,xt,pt);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Ve?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(re,dt,Ht,ce,ve,xt,pt,wt,he,It,_e.data):G.isCompressedArrayTexture?F.compressedTexSubImage3D(re,dt,Ht,ce,ve,xt,pt,wt,he,_e.data):F.texSubImage3D(re,dt,Ht,ce,ve,xt,pt,wt,he,It,_e):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,dt,Ht,ce,xt,pt,he,It,_e.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,dt,Ht,ce,_e.width,_e.height,he,_e.data):F.texSubImage2D(F.TEXTURE_2D,dt,Ht,ce,xt,pt,he,It,_e);F.pixelStorei(F.UNPACK_ROW_LENGTH,Jt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ye),F.pixelStorei(F.UNPACK_SKIP_PIXELS,wi),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ze),F.pixelStorei(F.UNPACK_SKIP_IMAGES,ts),dt===0&&G.generateMipmaps&&F.generateMipmap(re),Tt.unbindTexture()},this.initRenderTarget=function(A){w.get(A).__webglFramebuffer===void 0&&k.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?k.setTextureCube(A,0):A.isData3DTexture?k.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?k.setTexture2DArray(A,0):k.setTexture2D(A,0),Tt.unbindTexture()},this.resetState=function(){P=0,U=0,I=null,Tt.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class un{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new b);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new b);const n=this.elements,i=t.x,s=t.y,r=t.z;return e.x=n[0]*i+n[1]*s+n[2]*r,e.y=n[3]*i+n[4]*s+n[5]*r,e.z=n[6]*i+n[7]*s+n[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new un);const n=this.elements,i=t.elements,s=e.elements,r=n[0],a=n[1],c=n[2],l=n[3],h=n[4],u=n[5],d=n[6],f=n[7],m=n[8],x=i[0],g=i[1],p=i[2],v=i[3],y=i[4],_=i[5],E=i[6],T=i[7],C=i[8];return s[0]=r*x+a*v+c*E,s[1]=r*g+a*y+c*T,s[2]=r*p+a*_+c*C,s[3]=l*x+h*v+u*E,s[4]=l*g+h*y+u*T,s[5]=l*p+h*_+u*C,s[6]=d*x+f*v+m*E,s[7]=d*g+f*y+m*T,s[8]=d*p+f*_+m*C,e}scale(t,e){e===void 0&&(e=new un);const n=this.elements,i=e.elements;for(let s=0;s!==3;s++)i[3*s+0]=t.x*n[3*s+0],i[3*s+1]=t.y*n[3*s+1],i[3*s+2]=t.z*n[3*s+2];return e}solve(t,e){e===void 0&&(e=new b);const n=3,i=4,s=[];let r,a;for(r=0;r<n*i;r++)s.push(0);for(r=0;r<3;r++)for(a=0;a<3;a++)s[r+i*a]=this.elements[r+3*a];s[3]=t.x,s[7]=t.y,s[11]=t.z;let c=3;const l=c;let h;const u=4;let d;do{if(r=l-c,s[r+i*r]===0){for(a=r+1;a<l;a++)if(s[r+i*a]!==0){h=u;do d=u-h,s[d+i*r]+=s[d+i*a];while(--h);break}}if(s[r+i*r]!==0)for(a=r+1;a<l;a++){const f=s[r+i*a]/s[r+i*r];h=u;do d=u-h,s[d+i*a]=d<=r?0:s[d+i*a]-s[d+i*r]*f;while(--h)}}while(--c);if(e.z=s[2*i+3]/s[2*i+2],e.y=(s[1*i+3]-s[1*i+2]*e.z)/s[1*i+1],e.x=(s[0*i+3]-s[0*i+2]*e.z-s[0*i+1]*e.y)/s[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";for(let n=0;n<9;n++)t+=this.elements[n]+",";return t}reverse(t){t===void 0&&(t=new un);const e=3,n=6,i=mg;let s,r;for(s=0;s<3;s++)for(r=0;r<3;r++)i[s+n*r]=this.elements[s+3*r];i[3]=1,i[9]=0,i[15]=0,i[4]=0,i[10]=1,i[16]=0,i[5]=0,i[11]=0,i[17]=1;let a=3;const c=a;let l;const h=n;let u;do{if(s=c-a,i[s+n*s]===0){for(r=s+1;r<c;r++)if(i[s+n*r]!==0){l=h;do u=h-l,i[u+n*s]+=i[u+n*r];while(--l);break}}if(i[s+n*s]!==0)for(r=s+1;r<c;r++){const d=i[s+n*r]/i[s+n*s];l=h;do u=h-l,i[u+n*r]=u<=s?0:i[u+n*r]-i[u+n*s]*d;while(--l)}}while(--a);s=2;do{r=s-1;do{const d=i[s+n*r]/i[s+n*s];l=n;do u=n-l,i[u+n*r]=i[u+n*r]-i[u+n*s]*d;while(--l)}while(r--)}while(--s);s=2;do{const d=1/i[s+n*s];l=n;do u=n-l,i[u+n*s]=i[u+n*s]*d;while(--l)}while(s--);s=2;do{r=2;do{if(u=i[e+r+n*s],isNaN(u)||u===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,r,u)}while(r--)}while(s--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,s=t.w,r=e+e,a=n+n,c=i+i,l=e*r,h=e*a,u=e*c,d=n*a,f=n*c,m=i*c,x=s*r,g=s*a,p=s*c,v=this.elements;return v[0]=1-(d+m),v[1]=h-p,v[2]=u+g,v[3]=h+p,v[4]=1-(l+m),v[5]=f-x,v[6]=u-g,v[7]=f+x,v[8]=1-(l+d),this}transpose(t){t===void 0&&(t=new un);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const mg=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class b{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new b);const n=t.x,i=t.y,s=t.z,r=this.x,a=this.y,c=this.z;return e.x=a*s-c*i,e.y=c*n-r*s,e.z=r*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new b(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new b(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new un([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new b);const e=this.x,n=this.y,i=this.z;let s=Math.sqrt(e*e+n*n+i*i);return s>0?(s=1/s,t.x=e*s,t.y=n*s,t.z=i*s):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z;return Math.sqrt((s-e)*(s-e)+(r-n)*(r-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z;return(s-e)*(s-e)+(r-n)*(r-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new b);const n=this.x,i=this.y,s=this.z;return e.x=t*n,e.y=t*i,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new b),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new b),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new b),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=gg,s=1/n;i.set(this.x*s,this.y*s,this.z*s);const r=xg;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,t)):(r.set(0,1,0),i.cross(r,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,s=this.y,r=this.z;n.x=i+(t.x-i)*e,n.y=s+(t.y-s)*e,n.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(Yc),Yc.almostEquals(t,e)}clone(){return new b(this.x,this.y,this.z)}}b.ZERO=new b(0,0,0);b.UNIT_X=new b(1,0,0);b.UNIT_Y=new b(0,1,0);b.UNIT_Z=new b(0,0,1);const gg=new b,xg=new b,Yc=new b;class Je{constructor(t){t===void 0&&(t={}),this.lowerBound=new b,this.upperBound=new b,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const s=this.lowerBound,r=this.upperBound,a=n;s.copy(t[0]),a&&a.vmult(s,s),r.copy(s);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,Zc),l=Zc),l.x>r.x&&(r.x=l.x),l.x<s.x&&(s.x=l.x),l.y>r.y&&(r.y=l.y),l.y<s.y&&(s.y=l.y),l.z>r.z&&(r.z=l.z),l.z<s.z&&(s.z=l.z)}return e&&(e.vadd(s,s),e.vadd(r,r)),i&&(s.x-=i,s.y-=i,s.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new Je().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound,r=i.x<=n.x&&n.x<=s.x||e.x<=s.x&&s.x<=n.x,a=i.y<=n.y&&n.y<=s.y||e.y<=s.y&&s.y<=n.y,c=i.z<=n.z&&n.z<=s.z||e.z<=s.z&&s.z<=n.z;return r&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound;return e.x<=i.x&&n.x>=s.x&&e.y<=i.y&&n.y>=s.y&&e.z<=i.z&&n.z>=s.z}getCorners(t,e,n,i,s,r,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),s.set(h.x,l.y,h.z),r.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const n=Kc,i=n[0],s=n[1],r=n[2],a=n[3],c=n[4],l=n[5],h=n[6],u=n[7];this.getCorners(i,s,r,a,c,l,h,u);for(let d=0;d!==8;d++){const f=n[d];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=Kc,i=n[0],s=n[1],r=n[2],a=n[3],c=n[4],l=n[5],h=n[6],u=n[7];this.getCorners(i,s,r,a,c,l,h,u);for(let d=0;d!==8;d++){const f=n[d];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,s=1/e.y,r=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*s,h=(this.upperBound.y-n.y)*s,u=(this.lowerBound.z-n.z)*r,d=(this.upperBound.z-n.z)*r,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(u,d)),m=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(u,d));return!(m<0||f>m)}}const Zc=new b,Kc=[new b,new b,new b,new b,new b,new b,new b,new b];class jc{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:s}=e;if(s>i){const r=s;s=i,i=r}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class ih{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,t)}return this}}class Me{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new b),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=vg,i=_g;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new Me);const n=this.x,i=this.y,s=this.z,r=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+r*a+i*l-s*c,e.y=i*h+r*c+s*a-n*l,e.z=s*h+r*l+n*c-i*a,e.w=r*h-n*a-i*c-s*l,e}inverse(t){t===void 0&&(t=new Me);const e=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(t);const r=1/(e*e+n*n+i*i+s*s);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new Me),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new b);const n=t.x,i=t.y,s=t.z,r=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*s-c*i,u=l*i+c*n-r*s,d=l*s+r*i-a*n,f=-r*n-a*i-c*s;return e.x=h*l+f*-r+u*-c-d*-a,e.y=u*l+f*-a+d*-r-h*-c,e.z=d*l+f*-c+h*-a-u*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,s;const r=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=r*a+c*l;if(h>.499&&(n=2*Math.atan2(r,l),i=Math.PI/2,s=0),h<-.499&&(n=-2*Math.atan2(r,l),i=-Math.PI/2,s=0),n===void 0){const u=r*r,d=a*a,f=c*c;n=Math.atan2(2*a*l-2*r*c,1-2*d-2*f),i=Math.asin(2*h),s=Math.atan2(2*r*l-2*a*c,1-2*u-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=s}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const s=Math.cos(t/2),r=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*r*a+s*l*h,this.y=s*l*a-c*r*h,this.z=s*r*h+c*l*a,this.w=s*r*a-c*l*h):i==="YXZ"?(this.x=c*r*a+s*l*h,this.y=s*l*a-c*r*h,this.z=s*r*h-c*l*a,this.w=s*r*a+c*l*h):i==="ZXY"?(this.x=c*r*a-s*l*h,this.y=s*l*a+c*r*h,this.z=s*r*h+c*l*a,this.w=s*r*a-c*l*h):i==="ZYX"?(this.x=c*r*a-s*l*h,this.y=s*l*a+c*r*h,this.z=s*r*h-c*l*a,this.w=s*r*a+c*l*h):i==="YZX"?(this.x=c*r*a+s*l*h,this.y=s*l*a+c*r*h,this.z=s*r*h-c*l*a,this.w=s*r*a-c*l*h):i==="XZY"&&(this.x=c*r*a-s*l*h,this.y=s*l*a-c*r*h,this.z=s*r*h+c*l*a,this.w=s*r*a+c*l*h),this}clone(){return new Me(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new Me);const i=this.x,s=this.y,r=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,u=t.w,d,f,m,x,g;return f=i*c+s*l+r*h+a*u,f<0&&(f=-f,c=-c,l=-l,h=-h,u=-u),1-f>1e-6?(d=Math.acos(f),m=Math.sin(d),x=Math.sin((1-e)*d)/m,g=Math.sin(e*d)/m):(x=1-e,g=e),n.x=x*i+g*c,n.y=x*s+g*l,n.z=x*r+g*h,n.w=x*a+g*u,n}integrate(t,e,n,i){i===void 0&&(i=new Me);const s=t.x*n.x,r=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,u=this.w,d=e*.5;return i.x+=d*(s*u+r*h-a*l),i.y+=d*(r*u+a*c-s*h),i.z+=d*(a*u+s*l-r*c),i.w+=d*(-s*c-r*l-a*h),i}}const vg=new b,_g=new b,yg={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class vt{constructor(t){t===void 0&&(t={}),this.id=vt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}vt.idCounter=0;vt.types=yg;class te{constructor(t){t===void 0&&(t={}),this.position=new b,this.quaternion=new Me,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return te.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return te.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new b),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new b),n.vsub(t,i),e.conjugate($c),$c.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new b),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new b),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new b),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const $c=new Me;class Gi extends vt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:r}=t;super({type:vt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new b;for(let s=0;s!==t.length;s++){const r=t[s],a=r.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[r[c]].vsub(e[r[l]],i),i.normalize();let h=!1;for(let u=0;u!==n.length;u++)if(n[u].almostEquals(i)||n[u].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new b;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],s=this.vertices[n[1]],r=this.vertices[n[2]];Gi.computeNormal(i,s,r,e)}static computeNormal(t,e,n,i){const s=new b,r=new b;e.vsub(t,r),n.vsub(e,s),s.cross(r,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,s,r,a,c,l){const h=new b;let u=-1,d=-Number.MAX_VALUE;for(let m=0;m<n.faces.length;m++){h.copy(n.faceNormals[m]),s.vmult(h,h);const x=h.dot(r);x>d&&(d=x,u=m)}const f=[];for(let m=0;m<n.faces[u].length;m++){const x=n.vertices[n.faces[u][m]],g=new b;g.copy(x),s.vmult(g,g),i.vadd(g,g),f.push(g)}u>=0&&this.clipFaceAgainstHull(r,t,e,f,a,c,l)}findSeparatingAxis(t,e,n,i,s,r,a,c){const l=new b,h=new b,u=new b,d=new b,f=new b,m=new b;let x=Number.MAX_VALUE;const g=this;if(g.uniqueAxes)for(let p=0;p!==g.uniqueAxes.length;p++){n.vmult(g.uniqueAxes[p],l);const v=g.testSepAxis(l,t,e,n,i,s);if(v===!1)return!1;v<x&&(x=v,r.copy(l))}else{const p=a?a.length:g.faces.length;for(let v=0;v<p;v++){const y=a?a[v]:v;l.copy(g.faceNormals[y]),n.vmult(l,l);const _=g.testSepAxis(l,t,e,n,i,s);if(_===!1)return!1;_<x&&(x=_,r.copy(l))}}if(t.uniqueAxes)for(let p=0;p!==t.uniqueAxes.length;p++){s.vmult(t.uniqueAxes[p],h);const v=g.testSepAxis(h,t,e,n,i,s);if(v===!1)return!1;v<x&&(x=v,r.copy(h))}else{const p=c?c.length:t.faces.length;for(let v=0;v<p;v++){const y=c?c[v]:v;h.copy(t.faceNormals[y]),s.vmult(h,h);const _=g.testSepAxis(h,t,e,n,i,s);if(_===!1)return!1;_<x&&(x=_,r.copy(h))}}for(let p=0;p!==g.uniqueEdges.length;p++){n.vmult(g.uniqueEdges[p],d);for(let v=0;v!==t.uniqueEdges.length;v++)if(s.vmult(t.uniqueEdges[v],f),d.cross(f,m),!m.almostZero()){m.normalize();const y=g.testSepAxis(m,t,e,n,i,s);if(y===!1)return!1;y<x&&(x=y,r.copy(m))}}return i.vsub(e,u),u.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,n,i,s,r){const a=this;Gi.project(a,t,n,i,lo),Gi.project(e,t,s,r,ho);const c=lo[0],l=lo[1],h=ho[0],u=ho[1];if(c<u||h<l)return!1;const d=c-u,f=h-l;return d<f?d:f}calculateLocalInertia(t,e){const n=new b,i=new b;this.computeLocalAABB(i,n);const s=n.x-i.x,r=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*r*2*r+2*a*2*a),e.y=1/12*t*(2*s*2*s+2*a*2*a),e.z=1/12*t*(2*r*2*r+2*s*2*s)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,s,r,a){const c=new b,l=new b,h=new b,u=new b,d=new b,f=new b,m=new b,x=new b,g=this,p=[],v=i,y=p;let _=-1,E=Number.MAX_VALUE;for(let S=0;S<g.faces.length;S++){c.copy(g.faceNormals[S]),n.vmult(c,c);const P=c.dot(t);P<E&&(E=P,_=S)}if(_<0)return;const T=g.faces[_];T.connectedFaces=[];for(let S=0;S<g.faces.length;S++)for(let P=0;P<g.faces[S].length;P++)T.indexOf(g.faces[S][P])!==-1&&S!==_&&T.connectedFaces.indexOf(S)===-1&&T.connectedFaces.push(S);const C=T.length;for(let S=0;S<C;S++){const P=g.vertices[T[S]],U=g.vertices[T[(S+1)%C]];P.vsub(U,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),u.copy(this.faceNormals[_]),n.vmult(u,u),e.vadd(u,u),h.cross(u,d),d.negate(d),f.copy(P),n.vmult(f,f),e.vadd(f,f);const I=T.connectedFaces[S];m.copy(this.faceNormals[I]);const O=this.getPlaneConstantOfFace(I);x.copy(m),n.vmult(x,x);const B=O-x.dot(e);for(this.clipFaceAgainstPlane(v,y,x,B);v.length;)v.shift();for(;y.length;)v.push(y.shift())}m.copy(this.faceNormals[_]);const L=this.getPlaneConstantOfFace(_);x.copy(m),n.vmult(x,x);const M=L-x.dot(e);for(let S=0;S<v.length;S++){let P=x.dot(v[S])+M;if(P<=s&&(console.log(`clamped: depth=${P} to minDist=${s}`),P=s),P<=r){const U=v[S];if(P<=1e-6){const I={point:U,normal:x,depth:P};a.push(I)}}}}clipFaceAgainstPlane(t,e,n,i){let s,r;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];s=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],r=n.dot(l)+i,s<0)if(r<0){const u=new b;u.copy(l),e.push(u)}else{const u=new b;c.lerp(l,s/(s-r),u),e.push(u)}else if(r<0){const u=new b;c.lerp(l,s/(s-r),u),e.push(u),e.push(l)}c=l,s=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new b);const n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(n[s],i[s]),t.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const s=n[i];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new b);const n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const s=this.vertices;let r,a,c,l,h,u,d=new b;for(let f=0;f<s.length;f++){d.copy(s[f]),e.vmult(d,d),t.vadd(d,d);const m=d;(r===void 0||m.x<r)&&(r=m.x),(l===void 0||m.x>l)&&(l=m.x),(a===void 0||m.y<a)&&(a=m.y),(h===void 0||m.y>h)&&(h=m.y),(c===void 0||m.z<c)&&(c=m.z),(u===void 0||m.z>u)&&(u=m.z)}n.set(r,a,c),i.set(l,h,u)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new b);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let s=0;s<n;s++){const r=i[s];e.vmult(r,r)}for(let s=0;s<this.faceNormals.length;s++){const r=this.faceNormals[s];e.vmult(r,r)}}if(t)for(let s=0;s<n;s++){const r=i[s];r.vadd(t,r)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,s=new b;this.getAveragePointLocal(s);for(let r=0;r<this.faces.length;r++){let a=i[r];const c=e[n[r][0]],l=new b;t.vsub(c,l);const h=a.dot(l),u=new b;s.vsub(c,u);const d=a.dot(u);if(h<0&&d>0||h>0&&d<0)return!1}return-1}static project(t,e,n,i,s){const r=t.vertices.length,a=Mg;let c=0,l=0;const h=wg,u=t.vertices;h.setZero(),te.vectorToLocalFrame(n,i,e,a),te.pointToLocalFrame(n,i,h,h);const d=h.dot(a);l=c=u[0].dot(a);for(let f=1;f<r;f++){const m=u[f].dot(a);m>c&&(c=m),m<l&&(l=m)}if(l-=d,c-=d,l>c){const f=l;l=c,c=f}s[0]=c,s[1]=l}}const lo=[],ho=[];new b;const Mg=new b,wg=new b;class kn extends vt{constructor(t){super({type:vt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=b,s=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new Gi({vertices:s,faces:r,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new b),kn.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let s=0;s!==n.length;s++)e.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let r=0;r<s.length;r++)Jn.set(s[r][0],s[r][1],s[r][2]),e.vmult(Jn,Jn),t.vadd(Jn,Jn),n(Jn.x,Jn.y,Jn.z)}calculateWorldAABB(t,e,n,i){const s=this.halfExtents;gn[0].set(s.x,s.y,s.z),gn[1].set(-s.x,s.y,s.z),gn[2].set(-s.x,-s.y,s.z),gn[3].set(-s.x,-s.y,-s.z),gn[4].set(s.x,-s.y,-s.z),gn[5].set(s.x,s.y,-s.z),gn[6].set(-s.x,s.y,-s.z),gn[7].set(s.x,-s.y,s.z);const r=gn[0];e.vmult(r,r),t.vadd(r,r),i.copy(r),n.copy(r);for(let a=1;a<8;a++){const c=gn[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,u=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),u>i.z&&(i.z=u),l<n.x&&(n.x=l),h<n.y&&(n.y=h),u<n.z&&(n.z=u)}}}const Jn=new b,gn=[new b,new b,new b,new b,new b,new b,new b,new b],Ia={DYNAMIC:1,STATIC:2,KINEMATIC:4},La={AWAKE:0,SLEEPY:1,SLEEPING:2};class st extends ih{constructor(t){t===void 0&&(t={}),super(),this.id=st.idCounter++,this.index=-1,this.world=null,this.vlambda=new b,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new b,this.previousPosition=new b,this.interpolatedPosition=new b,this.initPosition=new b,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new b,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new b,this.force=new b;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?st.STATIC:st.DYNAMIC,typeof t.type==typeof st.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=st.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new b,this.quaternion=new Me,this.initQuaternion=new Me,this.previousQuaternion=new Me,this.interpolatedQuaternion=new Me,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new b,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new b,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new b,this.invInertia=new b,this.invInertiaWorld=new un,this.invMassSolve=0,this.invInertiaSolve=new b,this.invInertiaWorldSolve=new un,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new b(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new b(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Je,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new b,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=st.AWAKE,this.wakeUpAfterNarrowphase=!1,t===st.SLEEPING&&this.dispatchEvent(st.wakeupEvent)}sleep(){this.sleepState=st.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===st.AWAKE&&n<i?(this.sleepState=st.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(st.sleepyEvent)):e===st.SLEEPY&&n>i?this.wakeUp():e===st.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(st.sleepEvent))}}updateSolveMassProperties(){this.sleepState===st.SLEEPING||this.type===st.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new b),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new b),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new b),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new b),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new b,s=new Me;return e&&i.copy(e),n&&s.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let s=0;s!==n;s++){const r=t[s];r.updateBoundingSphereRadius();const a=e[s].length(),c=r.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,s=Sg,r=bg,a=this.quaternion,c=this.aabb,l=Eg;for(let h=0;h!==i;h++){const u=t[h];a.vmult(e[h],s),s.vadd(this.position,s),a.mult(n[h],r),u.calculateWorldAABB(s,r,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=Tg,i=Ag;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new b),this.type!==st.DYNAMIC)return;this.sleepState===st.SLEEPING&&this.wakeUp();const n=Cg;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new b),this.type!==st.DYNAMIC)return;const n=Rg,i=Pg;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===st.DYNAMIC&&(this.sleepState===st.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new b),this.type!==st.DYNAMIC)return;this.sleepState===st.SLEEPING&&this.wakeUp();const n=e,i=Ig;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const s=Lg;n.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new b),this.type!==st.DYNAMIC)return;const n=Dg,i=Ng;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=Fg;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),kn.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new b;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===st.DYNAMIC||this.type===st.KINEMATIC)||this.sleepState===st.SLEEPING)return;const i=this.velocity,s=this.angularVelocity,r=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,u=this.invInertiaWorld,d=this.linearFactor,f=h*t;i.x+=a.x*f*d.x,i.y+=a.y*f*d.y,i.z+=a.z*f*d.z;const m=u.elements,x=this.angularFactor,g=c.x*x.x,p=c.y*x.y,v=c.z*x.z;s.x+=t*(m[0]*g+m[1]*p+m[2]*v),s.y+=t*(m[3]*g+m[4]*p+m[5]*v),s.z+=t*(m[6]*g+m[7]*p+m[8]*v),r.x+=i.x*t,r.y+=i.y*t,r.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}st.idCounter=0;st.COLLIDE_EVENT_NAME="collide";st.DYNAMIC=Ia.DYNAMIC;st.STATIC=Ia.STATIC;st.KINEMATIC=Ia.KINEMATIC;st.AWAKE=La.AWAKE;st.SLEEPY=La.SLEEPY;st.SLEEPING=La.SLEEPING;st.wakeupEvent={type:"wakeup"};st.sleepyEvent={type:"sleepy"};st.sleepEvent={type:"sleep"};const Sg=new b,bg=new Me,Eg=new Je,Tg=new un,Ag=new un;new un;const Cg=new b,Rg=new b,Pg=new b,Ig=new b,Lg=new b,Dg=new b,Ng=new b,Fg=new b;class Ug{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!((t.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&t.collisionFilterMask)===0||((t.type&st.STATIC)!==0||t.sleepState===st.SLEEPING)&&((e.type&st.STATIC)!==0||e.sleepState===st.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const s=Bg;e.position.vsub(t.position,s);const r=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<r&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=Og,i=zg,s=kg,r=t.length;for(let a=0;a!==r;a++)i[a]=t[a],s[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==r;a++){const c=i[a].id,l=s[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(s[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new b;t.position.vsub(e.position,n);const i=t.shapes[0],s=e.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const Bg=new b;new b;new Me;new b;const Og={keys:[]},zg=[],kg=[];new b;new b;new b;class sh extends Ug{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,s=i.length;let r,a;for(let c=0;c!==s;c++)for(let l=0;l!==c;l++)r=i[c],a=i[l],this.needBroadphaseCollision(r,a)&&this.intersectionTest(r,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const s=t.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&n.push(s)}return n}}class vr{constructor(){this.rayFromWorld=new b,this.rayToWorld=new b,this.hitNormalWorld=new b,this.hitPointWorld=new b,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,s,r,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=r,this.distance=a}}let rh,oh,ah,ch,lh,hh,uh;const Da={CLOSEST:1,ANY:2,ALL:4};rh=vt.types.SPHERE;oh=vt.types.PLANE;ah=vt.types.BOX;ch=vt.types.CYLINDER;lh=vt.types.CONVEXPOLYHEDRON;hh=vt.types.HEIGHTFIELD;uh=vt.types.TRIMESH;class Te{get[rh](){return this._intersectSphere}get[oh](){return this._intersectPlane}get[ah](){return this._intersectBox}get[ch](){return this._intersectConvex}get[lh](){return this._intersectConvex}get[hh](){return this._intersectHeightfield}get[uh](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new b),e===void 0&&(e=new b),this.from=t.clone(),this.to=e.clone(),this.direction=new b,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Te.ANY,this.result=new vr,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||Te.ANY,this.result=e.result||new vr,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Jc),uo.length=0,t.broadphase.aabbQuery(t,Jc,uo),this.intersectBodies(uo),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||(this.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&this.collisionFilterMask)===0)return;const i=Gg,s=Vg;for(let r=0,a=t.shapes.length;r<a;r++){const c=t.shapes[r];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],s),t.quaternion.vmult(t.shapeOffsets[r],i),i.vadd(t.position,i),this.intersectShape(c,s,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const s=this.from;if(nx(s,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,s)}_intersectPlane(t,e,n,i,s){const r=this.from,a=this.to,c=this.direction,l=new b(0,0,1);e.vmult(l,l);const h=new b;r.vsub(n,h);const u=h.dot(l);a.vsub(n,h);const d=h.dot(l);if(u*d>0||r.distanceTo(a)<u)return;const f=l.dot(c);if(Math.abs(f)<this.precision)return;const m=new b,x=new b,g=new b;r.vsub(n,m);const p=-l.dot(m)/f;c.scale(p,x),r.vadd(x,g),this.reportIntersection(l,g,s,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,s=this.from;e.x=Math.min(i.x,s.x),e.y=Math.min(i.y,s.y),e.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(t,e,n,i,s){t.data,t.elementSize;const r=Hg;r.from.copy(this.from),r.to.copy(this.to),te.pointToLocalFrame(n,e,r.from,r.from),te.pointToLocalFrame(n,e,r.to,r.to),r.updateDirection();const a=Wg;let c,l,h,u;c=l=0,h=u=t.data.length-1;const d=new Je;r.getAABB(d),t.getIndexOfPosition(d.lowerBound.x,d.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(d.upperBound.x,d.upperBound.y,a,!0),h=Math.min(h,a[0]+1),u=Math.min(u,a[1]+1);for(let f=c;f<h;f++)for(let m=l;m<u;m++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,m,d),!!d.overlapsRay(r)){if(t.getConvexTrianglePillar(f,m,!1),te.pointToWorldFrame(n,e,t.pillarOffset,sr),this._intersectConvex(t.pillarConvex,e,sr,i,s,Qc),this.result.shouldStop)return;t.getConvexTrianglePillar(f,m,!0),te.pointToWorldFrame(n,e,t.pillarOffset,sr),this._intersectConvex(t.pillarConvex,e,sr,i,s,Qc)}}}_intersectSphere(t,e,n,i,s){const r=this.from,a=this.to,c=t.radius,l=(a.x-r.x)**2+(a.y-r.y)**2+(a.z-r.z)**2,h=2*((a.x-r.x)*(r.x-n.x)+(a.y-r.y)*(r.y-n.y)+(a.z-r.z)*(r.z-n.z)),u=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-c**2,d=h**2-4*l*u,f=qg,m=Xg;if(!(d<0))if(d===0)r.lerp(a,d,f),f.vsub(n,m),m.normalize(),this.reportIntersection(m,f,s,i,-1);else{const x=(-h-Math.sqrt(d))/(2*l),g=(-h+Math.sqrt(d))/(2*l);if(x>=0&&x<=1&&(r.lerp(a,x,f),f.vsub(n,m),m.normalize(),this.reportIntersection(m,f,s,i,-1)),this.result.shouldStop)return;g>=0&&g<=1&&(r.lerp(a,g,f),f.vsub(n,m),m.normalize(),this.reportIntersection(m,f,s,i,-1))}}_intersectConvex(t,e,n,i,s,r){const a=Yg,c=tl,l=r&&r.faceList||null,h=t.faces,u=t.vertices,d=t.faceNormals,f=this.direction,m=this.from,x=this.to,g=m.distanceTo(x),p=l?l.length:h.length,v=this.result;for(let y=0;!v.shouldStop&&y<p;y++){const _=l?l[y]:y,E=h[_],T=d[_],C=e,L=n;c.copy(u[E[0]]),C.vmult(c,c),c.vadd(L,c),c.vsub(m,c),C.vmult(T,a);const M=f.dot(a);if(Math.abs(M)<this.precision)continue;const S=a.dot(c)/M;if(!(S<0)){f.scale(S,qe),qe.vadd(m,qe),cn.copy(u[E[0]]),C.vmult(cn,cn),L.vadd(cn,cn);for(let P=1;!v.shouldStop&&P<E.length-1;P++){xn.copy(u[E[P]]),vn.copy(u[E[P+1]]),C.vmult(xn,xn),C.vmult(vn,vn),L.vadd(xn,xn),L.vadd(vn,vn);const U=qe.distanceTo(m);!(Te.pointInTriangle(qe,cn,xn,vn)||Te.pointInTriangle(qe,xn,cn,vn))||U>g||this.reportIntersection(a,qe,s,i,_)}}}}_intersectTrimesh(t,e,n,i,s,r){const a=Zg,c=tx,l=ex,h=tl,u=Kg,d=jg,f=$g,m=Qg,x=Jg,g=t.indices;t.vertices;const p=this.from,v=this.to,y=this.direction;l.position.copy(n),l.quaternion.copy(e),te.vectorToLocalFrame(n,e,y,u),te.pointToLocalFrame(n,e,p,d),te.pointToLocalFrame(n,e,v,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,d.x*=t.scale.x,d.y*=t.scale.y,d.z*=t.scale.z,f.vsub(d,u),u.normalize();const _=d.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let E=0,T=c.length;!this.result.shouldStop&&E!==T;E++){const C=c[E];t.getNormal(C,a),t.getVertex(g[C*3],cn),cn.vsub(d,h);const L=u.dot(a),M=a.dot(h)/L;if(M<0)continue;u.scale(M,qe),qe.vadd(d,qe),t.getVertex(g[C*3+1],xn),t.getVertex(g[C*3+2],vn);const S=qe.distanceSquared(d);!(Te.pointInTriangle(qe,xn,cn,vn)||Te.pointInTriangle(qe,cn,xn,vn))||S>_||(te.vectorToWorldFrame(e,a,x),te.pointToWorldFrame(n,e,qe,m),this.reportIntersection(x,m,s,i,C))}c.length=0}reportIntersection(t,e,n,i,s){const r=this.from,a=this.to,c=r.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case Te.ALL:this.hasHit=!0,l.set(r,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case Te.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,c));break;case Te.ANY:this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,gi),n.vsub(e,cs),t.vsub(e,fo);const s=gi.dot(gi),r=gi.dot(cs),a=gi.dot(fo),c=cs.dot(cs),l=cs.dot(fo);let h,u;return(h=c*a-r*l)>=0&&(u=s*l-r*a)>=0&&h+u<s*c-r*r}}Te.CLOSEST=Da.CLOSEST;Te.ANY=Da.ANY;Te.ALL=Da.ALL;const Jc=new Je,uo=[],cs=new b,fo=new b,Gg=new b,Vg=new Me,qe=new b,cn=new b,xn=new b,vn=new b;new b;new vr;const Qc={faceList:[0]},sr=new b,Hg=new Te,Wg=[],qg=new b,Xg=new b,Yg=new b;new b;new b;const tl=new b,Zg=new b,Kg=new b,jg=new b,$g=new b,Jg=new b,Qg=new b;new Je;const tx=[],ex=new te,gi=new b,rr=new b;function nx(o,t,e){e.vsub(o,gi);const n=gi.dot(t);return t.scale(n,rr),rr.vadd(o,rr),e.distanceTo(rr)}class ix{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class el{constructor(){this.spatial=new b,this.rotational=new b}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Ps{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Ps.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new el,this.jacobianElementB=new el,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,s=t,r=n;this.a=4/(r*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(r*r*s*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),s=this.computeGq(),r=this.computeGiMf();return-s*t-i*e-r*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,r=i.position;return t.spatial.dot(s)+e.spatial.dot(r)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,r=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(s,a)+e.multiplyVectors(r,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,r=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(s,a)+e.multiplyVectors(r,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,r=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return s.scale(l,nl),a.scale(h,il),n.invInertiaWorldSolve.vmult(r,sl),i.invInertiaWorldSolve.vmult(c,rl),t.multiplyVectors(nl,sl)+e.multiplyVectors(il,rl)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,r=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=s+r;return a.vmult(t.rotational,or),l+=or.dot(t.rotational),c.vmult(e.rotational,or),l+=or.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,r=sx;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,r),i.wlambda.addScaledVector(t,r,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,r),s.wlambda.addScaledVector(t,r,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Ps.idCounter=0;const nl=new b,il=new b,sl=new b,rl=new b,or=new b,sx=new b;class rx extends Ps{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new b,this.rj=new b,this.ni=new b}computeB(t){const e=this.a,n=this.b,i=this.bi,s=this.bj,r=this.ri,a=this.rj,c=ox,l=ax,h=i.velocity,u=i.angularVelocity;i.force,i.torque;const d=s.velocity,f=s.angularVelocity;s.force,s.torque;const m=cx,x=this.jacobianElementA,g=this.jacobianElementB,p=this.ni;r.cross(p,c),a.cross(p,l),p.negate(x.spatial),c.negate(x.rotational),g.spatial.copy(p),g.rotational.copy(l),m.copy(s.position),m.vadd(a,m),m.vsub(i.position,m),m.vsub(r,m);const v=p.dot(m),y=this.restitution+1,_=y*d.dot(p)-y*h.dot(p)+f.dot(l)-u.dot(c),E=this.computeGiMf();return-v*e-_*n-t*E}getImpactVelocityAlongNormal(){const t=lx,e=hx,n=ux,i=dx,s=fx;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,s),this.ni.dot(s)}}const ox=new b,ax=new b,cx=new b,lx=new b,hx=new b,ux=new b,dx=new b,fx=new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;class ol extends Ps{constructor(t,e,n){super(t,e,-n,n),this.ri=new b,this.rj=new b,this.t=new b}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,s=px,r=mx,a=this.t;n.cross(a,s),i.cross(a,r);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),s.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(r);const h=this.computeGW(),u=this.computeGiMf();return-h*e-t*u}}const px=new b,mx=new b;class br{constructor(t,e,n){n=ix.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=br.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}br.idCounter=0;class En{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=En.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}En.idCounter=0;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new Te;new b;new b;new b;new b(1,0,0),new b(0,1,0),new b(0,0,1);new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;class Es extends vt{constructor(t){if(super({type:vt.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new b);const n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){const s=this.radius,r=["x","y","z"];for(let a=0;a<r.length;a++){const c=r[a];n[c]=t[c]-s,i[c]=t[c]+s}}}new b;new b;new b;new b;new b;new b;new b;new b;new b;class ii extends Gi{constructor(t,e,n,i){if(t===void 0&&(t=1),e===void 0&&(e=1),n===void 0&&(n=1),i===void 0&&(i=8),t<0)throw new Error("The cylinder radiusTop cannot be negative.");if(e<0)throw new Error("The cylinder radiusBottom cannot be negative.");const s=i,r=[],a=[],c=[],l=[],h=[],u=Math.cos,d=Math.sin;r.push(new b(-e*d(0),-n*.5,e*u(0))),l.push(0),r.push(new b(-t*d(0),n*.5,t*u(0))),h.push(1);for(let m=0;m<s;m++){const x=2*Math.PI/s*(m+1),g=2*Math.PI/s*(m+.5);m<s-1?(r.push(new b(-e*d(x),-n*.5,e*u(x))),l.push(2*m+2),r.push(new b(-t*d(x),n*.5,t*u(x))),h.push(2*m+3),c.push([2*m,2*m+1,2*m+3,2*m+2])):c.push([2*m,2*m+1,1,0]),(s%2===1||m<s/2)&&a.push(new b(-d(g),0,u(g)))}c.push(l),a.push(new b(0,1,0));const f=[];for(let m=0;m<h.length;m++)f.push(h[h.length-m-1]);c.push(f),super({vertices:r,faces:c,axes:a}),this.type=vt.types.CYLINDER,this.radiusTop=t,this.radiusBottom=e,this.height=n,this.numSegments=i}}new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new b;new Je;new b;new Je;new b;new b;new b;new b;new b;new b;new b;new Je;new b;new te;new Je;class gx{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class xx extends gx{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,s=this.tolerance*this.tolerance,r=this.equations,a=r.length,c=e.bodies,l=c.length,h=t;let u,d,f,m,x,g;if(a!==0)for(let _=0;_!==l;_++)c[_].updateSolveMassProperties();const p=_x,v=yx,y=vx;p.length=a,v.length=a,y.length=a;for(let _=0;_!==a;_++){const E=r[_];y[_]=0,v[_]=E.computeB(h),p[_]=1/E.computeC()}if(a!==0){for(let T=0;T!==l;T++){const C=c[T],L=C.vlambda,M=C.wlambda;L.set(0,0,0),M.set(0,0,0)}for(n=0;n!==i;n++){m=0;for(let T=0;T!==a;T++){const C=r[T];u=v[T],d=p[T],g=y[T],x=C.computeGWlambda(),f=d*(u-x-C.eps*g),g+f<C.minForce?f=C.minForce-g:g+f>C.maxForce&&(f=C.maxForce-g),y[T]+=f,m+=f>0?f:-f,C.addToWlambda(f)}if(m*m<s)break}for(let T=0;T!==l;T++){const C=c[T],L=C.velocity,M=C.angularVelocity;C.vlambda.vmul(C.linearFactor,C.vlambda),L.vadd(C.vlambda,L),C.wlambda.vmul(C.angularFactor,C.wlambda),M.vadd(C.wlambda,M)}let _=r.length;const E=1/h;for(;_--;)r[_].multiplier=y[_]*E}return n}}const vx=[],_x=[],yx=[];class Mx{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class wx extends Mx{constructor(){super(...arguments),this.type=b}constructObject(){return new b}}const pe={sphereSphere:vt.types.SPHERE,spherePlane:vt.types.SPHERE|vt.types.PLANE,boxBox:vt.types.BOX|vt.types.BOX,sphereBox:vt.types.SPHERE|vt.types.BOX,planeBox:vt.types.PLANE|vt.types.BOX,convexConvex:vt.types.CONVEXPOLYHEDRON,sphereConvex:vt.types.SPHERE|vt.types.CONVEXPOLYHEDRON,planeConvex:vt.types.PLANE|vt.types.CONVEXPOLYHEDRON,boxConvex:vt.types.BOX|vt.types.CONVEXPOLYHEDRON,sphereHeightfield:vt.types.SPHERE|vt.types.HEIGHTFIELD,boxHeightfield:vt.types.BOX|vt.types.HEIGHTFIELD,convexHeightfield:vt.types.CONVEXPOLYHEDRON|vt.types.HEIGHTFIELD,sphereParticle:vt.types.PARTICLE|vt.types.SPHERE,planeParticle:vt.types.PLANE|vt.types.PARTICLE,boxParticle:vt.types.BOX|vt.types.PARTICLE,convexParticle:vt.types.PARTICLE|vt.types.CONVEXPOLYHEDRON,cylinderCylinder:vt.types.CYLINDER,sphereCylinder:vt.types.SPHERE|vt.types.CYLINDER,planeCylinder:vt.types.PLANE|vt.types.CYLINDER,boxCylinder:vt.types.BOX|vt.types.CYLINDER,convexCylinder:vt.types.CONVEXPOLYHEDRON|vt.types.CYLINDER,heightfieldCylinder:vt.types.HEIGHTFIELD|vt.types.CYLINDER,particleCylinder:vt.types.PARTICLE|vt.types.CYLINDER,sphereTrimesh:vt.types.SPHERE|vt.types.TRIMESH,planeTrimesh:vt.types.PLANE|vt.types.TRIMESH};class Sx{get[pe.sphereSphere](){return this.sphereSphere}get[pe.spherePlane](){return this.spherePlane}get[pe.boxBox](){return this.boxBox}get[pe.sphereBox](){return this.sphereBox}get[pe.planeBox](){return this.planeBox}get[pe.convexConvex](){return this.convexConvex}get[pe.sphereConvex](){return this.sphereConvex}get[pe.planeConvex](){return this.planeConvex}get[pe.boxConvex](){return this.boxConvex}get[pe.sphereHeightfield](){return this.sphereHeightfield}get[pe.boxHeightfield](){return this.boxHeightfield}get[pe.convexHeightfield](){return this.convexHeightfield}get[pe.sphereParticle](){return this.sphereParticle}get[pe.planeParticle](){return this.planeParticle}get[pe.boxParticle](){return this.boxParticle}get[pe.convexParticle](){return this.convexParticle}get[pe.cylinderCylinder](){return this.convexConvex}get[pe.sphereCylinder](){return this.sphereConvex}get[pe.planeCylinder](){return this.planeConvex}get[pe.boxCylinder](){return this.boxConvex}get[pe.convexCylinder](){return this.convexConvex}get[pe.heightfieldCylinder](){return this.heightfieldCylinder}get[pe.particleCylinder](){return this.particleCylinder}get[pe.sphereTrimesh](){return this.sphereTrimesh}get[pe.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new wx,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,s,r){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new rx(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=s||n,a.sj=r||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,s=t.si,r=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=s.material||n.material,u=r.material||i.material;if(h&&u&&h.friction>=0&&u.friction>=0&&(l=h.friction*u.friction),l>0){const d=l*(a.frictionGravity||a.gravity).length();let f=n.invMass+i.invMass;f>0&&(f=1/f);const m=this.frictionEquationPool,x=m.length?m.pop():new ol(n,i,d*f),g=m.length?m.pop():new ol(n,i,d*f);return x.bi=g.bi=n,x.bj=g.bj=i,x.minForce=g.minForce=-d*f,x.maxForce=g.maxForce=d*f,x.ri.copy(t.ri),x.rj.copy(t.rj),g.ri.copy(t.ri),g.rj.copy(t.rj),t.ni.tangents(x.t,g.t),x.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),g.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),x.enabled=g.enabled=t.enabled,e.push(x,g),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];di.setZero(),Bi.setZero(),Oi.setZero();const s=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==s?(di.vadd(e.ni,di),Bi.vadd(e.ri,Bi),Oi.vadd(e.rj,Oi)):(di.vsub(e.ni,di),Bi.vadd(e.rj,Bi),Oi.vadd(e.ri,Oi));const r=1/t;Bi.scale(r,n.ri),Oi.scale(r,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),di.normalize(),di.tangents(n.t,i.t)}getContacts(t,e,n,i,s,r,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=i,this.frictionResult=r;const c=Tx,l=Ax,h=bx,u=Ex;for(let d=0,f=t.length;d!==f;d++){const m=t[d],x=e[d];let g=null;m.material&&x.material&&(g=n.getContactMaterial(m.material,x.material)||null);const p=m.type&st.KINEMATIC&&x.type&st.STATIC||m.type&st.STATIC&&x.type&st.KINEMATIC||m.type&st.KINEMATIC&&x.type&st.KINEMATIC;for(let v=0;v<m.shapes.length;v++){m.quaternion.mult(m.shapeOrientations[v],c),m.quaternion.vmult(m.shapeOffsets[v],h),h.vadd(m.position,h);const y=m.shapes[v];for(let _=0;_<x.shapes.length;_++){x.quaternion.mult(x.shapeOrientations[_],l),x.quaternion.vmult(x.shapeOffsets[_],u),u.vadd(x.position,u);const E=x.shapes[_];if(!(y.collisionFilterMask&E.collisionFilterGroup&&E.collisionFilterMask&y.collisionFilterGroup)||h.distanceTo(u)>y.boundingSphereRadius+E.boundingSphereRadius)continue;let T=null;y.material&&E.material&&(T=n.getContactMaterial(y.material,E.material)||null),this.currentContactMaterial=T||g||n.defaultContactMaterial;const C=y.type|E.type,L=this[C];if(L){let M=!1;y.type<E.type?M=L.call(this,y,E,h,u,c,l,m,x,y,E,p):M=L.call(this,E,y,u,h,l,c,x,m,y,E,p),M&&p&&(n.shapeOverlapKeeper.set(y.id,E.id),n.bodyOverlapKeeper.set(m.id,x.id))}}}}}sphereSphere(t,e,n,i,s,r,a,c,l,h,u){if(u)return n.distanceSquared(i)<(t.radius+e.radius)**2;const d=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,d.ni),d.ni.normalize(),d.ri.copy(d.ni),d.rj.copy(d.ni),d.ri.scale(t.radius,d.ri),d.rj.scale(-e.radius,d.rj),d.ri.vadd(n,d.ri),d.ri.vsub(a.position,d.ri),d.rj.vadd(i,d.rj),d.rj.vsub(c.position,d.rj),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}spherePlane(t,e,n,i,s,r,a,c,l,h,u){const d=this.createContactEquation(a,c,t,e,l,h);if(d.ni.set(0,0,1),r.vmult(d.ni,d.ni),d.ni.negate(d.ni),d.ni.normalize(),d.ni.scale(t.radius,d.ri),n.vsub(i,ar),d.ni.scale(d.ni.dot(ar),al),ar.vsub(al,d.rj),-ar.dot(d.ni)<=t.radius){if(u)return!0;const f=d.ri,m=d.rj;f.vadd(n,f),f.vsub(a.position,f),m.vadd(i,m),m.vsub(c.position,m),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}}boxBox(t,e,n,i,s,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,s,r,a,c,t,e,u)}sphereBox(t,e,n,i,s,r,a,c,l,h,u){const d=this.v3pool,f=Qx;n.vsub(i,cr),e.getSideNormals(f,r);const m=t.radius;let x=!1;const g=ev,p=nv,v=iv;let y=null,_=0,E=0,T=0,C=null;for(let D=0,V=f.length;D!==V&&x===!1;D++){const q=jx;q.copy(f[D]);const J=q.length();q.normalize();const it=cr.dot(q);if(it<J+m&&it>0){const ot=$x,at=Jx;ot.copy(f[(D+1)%3]),at.copy(f[(D+2)%3]);const Nt=ot.length(),ae=at.length();ot.normalize(),at.normalize();const ne=cr.dot(ot),j=cr.dot(at);if(ne<Nt&&ne>-Nt&&j<ae&&j>-ae){const tt=Math.abs(it-J-m);if((C===null||tt<C)&&(C=tt,E=ne,T=j,y=J,g.copy(q),p.copy(ot),v.copy(at),_++,u))return!0}}}if(_){x=!0;const D=this.createContactEquation(a,c,t,e,l,h);g.scale(-m,D.ri),D.ni.copy(g),D.ni.negate(D.ni),g.scale(y,g),p.scale(E,p),g.vadd(p,g),v.scale(T,v),g.vadd(v,D.rj),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),D.rj.vadd(i,D.rj),D.rj.vsub(c.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}let L=d.get();const M=tv;for(let D=0;D!==2&&!x;D++)for(let V=0;V!==2&&!x;V++)for(let q=0;q!==2&&!x;q++)if(L.set(0,0,0),D?L.vadd(f[0],L):L.vsub(f[0],L),V?L.vadd(f[1],L):L.vsub(f[1],L),q?L.vadd(f[2],L):L.vsub(f[2],L),i.vadd(L,M),M.vsub(n,M),M.lengthSquared()<m*m){if(u)return!0;x=!0;const J=this.createContactEquation(a,c,t,e,l,h);J.ri.copy(M),J.ri.normalize(),J.ni.copy(J.ri),J.ri.scale(m,J.ri),J.rj.copy(L),J.ri.vadd(n,J.ri),J.ri.vsub(a.position,J.ri),J.rj.vadd(i,J.rj),J.rj.vsub(c.position,J.rj),this.result.push(J),this.createFrictionEquationsFromContact(J,this.frictionResult)}d.release(L),L=null;const S=d.get(),P=d.get(),U=d.get(),I=d.get(),O=d.get(),B=f.length;for(let D=0;D!==B&&!x;D++)for(let V=0;V!==B&&!x;V++)if(D%3!==V%3){f[V].cross(f[D],S),S.normalize(),f[D].vadd(f[V],P),U.copy(n),U.vsub(P,U),U.vsub(i,U);const q=U.dot(S);S.scale(q,I);let J=0;for(;J===D%3||J===V%3;)J++;O.copy(n),O.vsub(I,O),O.vsub(P,O),O.vsub(i,O);const it=Math.abs(q),ot=O.length();if(it<f[J].length()&&ot<m){if(u)return!0;x=!0;const at=this.createContactEquation(a,c,t,e,l,h);P.vadd(I,at.rj),at.rj.copy(at.rj),O.negate(at.ni),at.ni.normalize(),at.ri.copy(at.rj),at.ri.vadd(i,at.ri),at.ri.vsub(n,at.ri),at.ri.normalize(),at.ri.scale(m,at.ri),at.ri.vadd(n,at.ri),at.ri.vsub(a.position,at.ri),at.rj.vadd(i,at.rj),at.rj.vsub(c.position,at.rj),this.result.push(at),this.createFrictionEquationsFromContact(at,this.frictionResult)}}d.release(S,P,U,I,O)}planeBox(t,e,n,i,s,r,a,c,l,h,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,s,r,a,c,t,e,u)}convexConvex(t,e,n,i,s,r,a,c,l,h,u,d,f){const m=vv;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,s,i,r,m,d,f)){const x=[],g=_v;t.clipAgainstHull(n,s,e,i,r,m,-100,100,x);let p=0;for(let v=0;v!==x.length;v++){if(u)return!0;const y=this.createContactEquation(a,c,t,e,l,h),_=y.ri,E=y.rj;m.negate(y.ni),x[v].normal.negate(g),g.scale(x[v].depth,g),x[v].point.vadd(g,_),E.copy(x[v].point),_.vsub(n,_),E.vsub(i,E),_.vadd(n,_),_.vsub(a.position,_),E.vadd(i,E),E.vsub(c.position,E),this.result.push(y),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(y,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}}sphereConvex(t,e,n,i,s,r,a,c,l,h,u){const d=this.v3pool;n.vsub(i,sv);const f=e.faceNormals,m=e.faces,x=e.vertices,g=t.radius;let p=!1;for(let v=0;v!==x.length;v++){const y=x[v],_=cv;r.vmult(y,_),i.vadd(_,_);const E=av;if(_.vsub(n,E),E.lengthSquared()<g*g){if(u)return!0;p=!0;const T=this.createContactEquation(a,c,t,e,l,h);T.ri.copy(E),T.ri.normalize(),T.ni.copy(T.ri),T.ri.scale(g,T.ri),_.vsub(i,T.rj),T.ri.vadd(n,T.ri),T.ri.vsub(a.position,T.ri),T.rj.vadd(i,T.rj),T.rj.vsub(c.position,T.rj),this.result.push(T),this.createFrictionEquationsFromContact(T,this.frictionResult);return}}for(let v=0,y=m.length;v!==y&&p===!1;v++){const _=f[v],E=m[v],T=lv;r.vmult(_,T);const C=hv;r.vmult(x[E[0]],C),C.vadd(i,C);const L=uv;T.scale(-g,L),n.vadd(L,L);const M=dv;L.vsub(C,M);const S=M.dot(T),P=fv;if(n.vsub(C,P),S<0&&P.dot(T)>0){const U=[];for(let I=0,O=E.length;I!==O;I++){const B=d.get();r.vmult(x[E[I]],B),i.vadd(B,B),U.push(B)}if(Kx(U,T,n)){if(u)return!0;p=!0;const I=this.createContactEquation(a,c,t,e,l,h);T.scale(-g,I.ri),T.negate(I.ni);const O=d.get();T.scale(-S,O);const B=d.get();T.scale(-g,B),n.vsub(i,I.rj),I.rj.vadd(B,I.rj),I.rj.vadd(O,I.rj),I.rj.vadd(i,I.rj),I.rj.vsub(c.position,I.rj),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),d.release(O),d.release(B),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult);for(let D=0,V=U.length;D!==V;D++)d.release(U[D]);return}else for(let I=0;I!==E.length;I++){const O=d.get(),B=d.get();r.vmult(x[E[(I+1)%E.length]],O),r.vmult(x[E[(I+2)%E.length]],B),i.vadd(O,O),i.vadd(B,B);const D=rv;B.vsub(O,D);const V=ov;D.unit(V);const q=d.get(),J=d.get();n.vsub(O,J);const it=J.dot(V);V.scale(it,q),q.vadd(O,q);const ot=d.get();if(q.vsub(n,ot),it>0&&it*it<D.lengthSquared()&&ot.lengthSquared()<g*g){if(u)return!0;const at=this.createContactEquation(a,c,t,e,l,h);q.vsub(i,at.rj),q.vsub(n,at.ni),at.ni.normalize(),at.ni.scale(g,at.ri),at.rj.vadd(i,at.rj),at.rj.vsub(c.position,at.rj),at.ri.vadd(n,at.ri),at.ri.vsub(a.position,at.ri),this.result.push(at),this.createFrictionEquationsFromContact(at,this.frictionResult);for(let Nt=0,ae=U.length;Nt!==ae;Nt++)d.release(U[Nt]);d.release(O),d.release(B),d.release(q),d.release(ot),d.release(J);return}d.release(O),d.release(B),d.release(q),d.release(ot),d.release(J)}for(let I=0,O=U.length;I!==O;I++)d.release(U[I])}}}planeConvex(t,e,n,i,s,r,a,c,l,h,u){const d=pv,f=mv;f.set(0,0,1),s.vmult(f,f);let m=0;const x=gv;for(let g=0;g!==e.vertices.length;g++)if(d.copy(e.vertices[g]),r.vmult(d,d),i.vadd(d,d),d.vsub(n,x),f.dot(x)<=0){if(u)return!0;const v=this.createContactEquation(a,c,t,e,l,h),y=xv;f.scale(f.dot(x),y),d.vsub(y,y),y.vsub(n,v.ri),v.ni.copy(f),d.vsub(i,v.rj),v.ri.vadd(n,v.ri),v.ri.vsub(a.position,v.ri),v.rj.vadd(i,v.rj),v.rj.vsub(c.position,v.rj),this.result.push(v),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(v,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}boxConvex(t,e,n,i,s,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,s,r,a,c,t,e,u)}sphereHeightfield(t,e,n,i,s,r,a,c,l,h,u){const d=e.data,f=t.radius,m=e.elementSize,x=Iv,g=Pv;te.pointToLocalFrame(i,r,n,g);let p=Math.floor((g.x-f)/m)-1,v=Math.ceil((g.x+f)/m)+1,y=Math.floor((g.y-f)/m)-1,_=Math.ceil((g.y+f)/m)+1;if(v<0||_<0||p>d.length||y>d[0].length)return;p<0&&(p=0),v<0&&(v=0),y<0&&(y=0),_<0&&(_=0),p>=d.length&&(p=d.length-1),v>=d.length&&(v=d.length-1),_>=d[0].length&&(_=d[0].length-1),y>=d[0].length&&(y=d[0].length-1);const E=[];e.getRectMinMax(p,y,v,_,E);const T=E[0],C=E[1];if(g.z-f>C||g.z+f<T)return;const L=this.result;for(let M=p;M<v;M++)for(let S=y;S<_;S++){const P=L.length;let U=!1;if(e.getConvexTrianglePillar(M,S,!1),te.pointToWorldFrame(i,r,e.pillarOffset,x),n.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.sphereConvex(t,e.pillarConvex,n,x,s,r,a,c,t,e,u)),u&&U||(e.getConvexTrianglePillar(M,S,!0),te.pointToWorldFrame(i,r,e.pillarOffset,x),n.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.sphereConvex(t,e.pillarConvex,n,x,s,r,a,c,t,e,u)),u&&U))return!0;if(L.length-P>2)return}}boxHeightfield(t,e,n,i,s,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,s,r,a,c,t,e,u)}convexHeightfield(t,e,n,i,s,r,a,c,l,h,u){const d=e.data,f=e.elementSize,m=t.boundingSphereRadius,x=Cv,g=Rv,p=Av;te.pointToLocalFrame(i,r,n,p);let v=Math.floor((p.x-m)/f)-1,y=Math.ceil((p.x+m)/f)+1,_=Math.floor((p.y-m)/f)-1,E=Math.ceil((p.y+m)/f)+1;if(y<0||E<0||v>d.length||_>d[0].length)return;v<0&&(v=0),y<0&&(y=0),_<0&&(_=0),E<0&&(E=0),v>=d.length&&(v=d.length-1),y>=d.length&&(y=d.length-1),E>=d[0].length&&(E=d[0].length-1),_>=d[0].length&&(_=d[0].length-1);const T=[];e.getRectMinMax(v,_,y,E,T);const C=T[0],L=T[1];if(!(p.z-m>L||p.z+m<C))for(let M=v;M<y;M++)for(let S=_;S<E;S++){let P=!1;if(e.getConvexTrianglePillar(M,S,!1),te.pointToWorldFrame(i,r,e.pillarOffset,x),n.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.convexConvex(t,e.pillarConvex,n,x,s,r,a,c,null,null,u,g,null)),u&&P||(e.getConvexTrianglePillar(M,S,!0),te.pointToWorldFrame(i,r,e.pillarOffset,x),n.distanceTo(x)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.convexConvex(t,e.pillarConvex,n,x,s,r,a,c,null,null,u,g,null)),u&&P))return!0}}sphereParticle(t,e,n,i,s,r,a,c,l,h,u){const d=Sv;if(d.set(0,0,1),i.vsub(n,d),d.lengthSquared()<=t.radius*t.radius){if(u)return!0;const m=this.createContactEquation(c,a,e,t,l,h);d.normalize(),m.rj.copy(d),m.rj.scale(t.radius,m.rj),m.ni.copy(d),m.ni.negate(m.ni),m.ri.set(0,0,0),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}}planeParticle(t,e,n,i,s,r,a,c,l,h,u){const d=yv;d.set(0,0,1),a.quaternion.vmult(d,d);const f=Mv;if(i.vsub(a.position,f),d.dot(f)<=0){if(u)return!0;const x=this.createContactEquation(c,a,e,t,l,h);x.ni.copy(d),x.ni.negate(x.ni),x.ri.set(0,0,0);const g=wv;d.scale(d.dot(i),g),i.vsub(g,g),x.rj.copy(g),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}boxParticle(t,e,n,i,s,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,s,r,a,c,t,e,u)}convexParticle(t,e,n,i,s,r,a,c,l,h,u){let d=-1;const f=Ev,m=Tv;let x=null;const g=bv;if(g.copy(i),g.vsub(n,g),s.conjugate(cl),cl.vmult(g,g),t.pointIsInside(g)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let p=0,v=t.faces.length;p!==v;p++){const y=[t.worldVertices[t.faces[p][0]]],_=t.worldFaceNormals[p];i.vsub(y[0],ll);const E=-_.dot(ll);if(x===null||Math.abs(E)<Math.abs(x)){if(u)return!0;x=E,d=p,f.copy(_)}}if(d!==-1){const p=this.createContactEquation(c,a,e,t,l,h);f.scale(x,m),m.vadd(i,m),m.vsub(n,m),p.rj.copy(m),f.negate(p.ni),p.ri.set(0,0,0);const v=p.ri,y=p.rj;v.vadd(i,v),v.vsub(c.position,v),y.vadd(n,y),y.vsub(a.position,y),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,s,r,a,c,l,h,u){return this.convexHeightfield(e,t,i,n,r,s,c,a,l,h,u)}particleCylinder(t,e,n,i,s,r,a,c,l,h,u){return this.convexParticle(e,t,i,n,r,s,c,a,l,h,u)}sphereTrimesh(t,e,n,i,s,r,a,c,l,h,u){const d=Fx,f=Ux,m=Bx,x=Ox,g=zx,p=kx,v=Wx,y=Nx,_=Lx,E=qx;te.pointToLocalFrame(i,r,n,g);const T=t.radius;v.lowerBound.set(g.x-T,g.y-T,g.z-T),v.upperBound.set(g.x+T,g.y+T,g.z+T),e.getTrianglesInAABB(v,E);const C=Dx,L=t.radius*t.radius;for(let I=0;I<E.length;I++)for(let O=0;O<3;O++)if(e.getVertex(e.indices[E[I]*3+O],C),C.vsub(g,_),_.lengthSquared()<=L){if(y.copy(C),te.pointToWorldFrame(i,r,y,C),C.vsub(n,_),u)return!0;let B=this.createContactEquation(a,c,t,e,l,h);B.ni.copy(_),B.ni.normalize(),B.ri.copy(B.ni),B.ri.scale(t.radius,B.ri),B.ri.vadd(n,B.ri),B.ri.vsub(a.position,B.ri),B.rj.copy(C),B.rj.vsub(c.position,B.rj),this.result.push(B),this.createFrictionEquationsFromContact(B,this.frictionResult)}for(let I=0;I<E.length;I++)for(let O=0;O<3;O++){e.getVertex(e.indices[E[I]*3+O],d),e.getVertex(e.indices[E[I]*3+(O+1)%3],f),f.vsub(d,m),g.vsub(f,p);const B=p.dot(m);g.vsub(d,p);let D=p.dot(m);if(D>0&&B<0&&(g.vsub(d,p),x.copy(m),x.normalize(),D=p.dot(x),x.scale(D,p),p.vadd(d,p),p.distanceTo(g)<t.radius)){if(u)return!0;const q=this.createContactEquation(a,c,t,e,l,h);p.vsub(g,q.ni),q.ni.normalize(),q.ni.scale(t.radius,q.ri),q.ri.vadd(n,q.ri),q.ri.vsub(a.position,q.ri),te.pointToWorldFrame(i,r,p,p),p.vsub(c.position,q.rj),te.vectorToWorldFrame(r,q.ni,q.ni),te.vectorToWorldFrame(r,q.ri,q.ri),this.result.push(q),this.createFrictionEquationsFromContact(q,this.frictionResult)}}const M=Gx,S=Vx,P=Hx,U=Ix;for(let I=0,O=E.length;I!==O;I++){e.getTriangleVertices(E[I],M,S,P),e.getNormal(E[I],U),g.vsub(M,p);let B=p.dot(U);if(U.scale(B,p),g.vsub(p,p),B=p.distanceTo(g),Te.pointInTriangle(p,M,S,P)&&B<t.radius){if(u)return!0;let D=this.createContactEquation(a,c,t,e,l,h);p.vsub(g,D.ni),D.ni.normalize(),D.ni.scale(t.radius,D.ri),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),te.pointToWorldFrame(i,r,p,p),p.vsub(c.position,D.rj),te.vectorToWorldFrame(r,D.ni,D.ni),te.vectorToWorldFrame(r,D.ri,D.ri),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}}E.length=0}planeTrimesh(t,e,n,i,s,r,a,c,l,h,u){const d=new b,f=Cx;f.set(0,0,1),s.vmult(f,f);for(let m=0;m<e.vertices.length/3;m++){e.getVertex(m,d);const x=new b;x.copy(d),te.pointToWorldFrame(i,r,x,d);const g=Rx;if(d.vsub(n,g),f.dot(g)<=0){if(u)return!0;const v=this.createContactEquation(a,c,t,e,l,h);v.ni.copy(f);const y=Px;f.scale(g.dot(f),y),d.vsub(y,y),v.ri.copy(y),v.ri.vsub(a.position,v.ri),v.rj.copy(d),v.rj.vsub(c.position,v.rj),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}}}const di=new b,Bi=new b,Oi=new b,bx=new b,Ex=new b,Tx=new Me,Ax=new Me,Cx=new b,Rx=new b,Px=new b,Ix=new b,Lx=new b;new b;const Dx=new b,Nx=new b,Fx=new b,Ux=new b,Bx=new b,Ox=new b,zx=new b,kx=new b,Gx=new b,Vx=new b,Hx=new b,Wx=new Je,qx=[],ar=new b,al=new b,Xx=new b,Yx=new b,Zx=new b;function Kx(o,t,e){let n=null;const i=o.length;for(let s=0;s!==i;s++){const r=o[s],a=Xx;o[(s+1)%i].vsub(r,a);const c=Yx;a.cross(t,c);const l=Zx;e.vsub(r,l);const h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const cr=new b,jx=new b,$x=new b,Jx=new b,Qx=[new b,new b,new b,new b,new b,new b],tv=new b,ev=new b,nv=new b,iv=new b,sv=new b,rv=new b,ov=new b,av=new b,cv=new b,lv=new b,hv=new b,uv=new b,dv=new b,fv=new b;new b;new b;const pv=new b,mv=new b,gv=new b,xv=new b,vv=new b,_v=new b,yv=new b,Mv=new b,wv=new b,Sv=new b,cl=new Me,bv=new b;new b;const Ev=new b,ll=new b,Tv=new b,Av=new b,Cv=new b,Rv=[0],Pv=new b,Iv=new b;class hl{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let r=i.length-1;r>=s;r--)i[r+1]=i[r];i[s]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,s=n.length,r=i.length;let a=0;for(let c=0;c<s;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=h===i[a],l||ul(t,h)}a=0;for(let c=0;c<r;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||ul(e,h)}}}function ul(o,t){o.push((t&4294901760)>>16,t&65535)}const po=(o,t)=>o<t?`${o}-${t}`:`${t}-${o}`;class Lv{constructor(){this.data={keys:[]}}get(t,e){const n=po(t,e);return this.data[n]}set(t,e,n){const i=po(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=po(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class Dv extends ih{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new b,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new b,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new sh,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new xx,this.constraints=[],this.narrowphase=new Sx(this),this.collisionMatrix=new jc,this.collisionMatrixPrevious=new jc,this.bodyOverlapKeeper=new hl,this.shapeOverlapKeeper=new hl,this.contactmaterials=[],this.contactMaterialTable=new Lv,this.defaultMaterial=new En("default"),this.defaultContactMaterial=new br(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof vr?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Te.ALL,n.from=t,n.to=e,n.callback=i,mo.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Te.ANY,n.from=t,n.to=e,n.result=i,mo.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Te.CLOSEST,n.from=t,n.to=e,n.result=i,mo.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof st&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let s=0;s<i.length;s++){const r=i[s];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Ae.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Ae.now();let s=0;for(;this.accumulator>=t&&s<n&&(this.internalStep(t),this.accumulator-=t,s++,!(Ae.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const r=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,r,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,r,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=Ov,i=zv,s=this.bodies.length,r=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,u=st.DYNAMIC;let d=-1/0;const f=this.constraints,m=Bv;c.length();const x=c.x,g=c.y,p=c.z;let v=0;for(l&&(d=Ae.now()),v=0;v!==s;v++){const I=r[v];if(I.type===u){const O=I.force,B=I.mass;O.x+=B*x,O.y+=B*g,O.z+=B*p}}for(let I=0,O=this.subsystems.length;I!==O;I++)this.subsystems[I].update();l&&(d=Ae.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=Ae.now()-d);let y=f.length;for(v=0;v!==y;v++){const I=f[v];if(!I.collideConnected)for(let O=n.length-1;O>=0;O-=1)(I.bodyA===n[O]&&I.bodyB===i[O]||I.bodyB===n[O]&&I.bodyA===i[O])&&(n.splice(O,1),i.splice(O,1))}this.collisionMatrixTick(),l&&(d=Ae.now());const _=Uv,E=e.length;for(v=0;v!==E;v++)_.push(e[v]);e.length=0;const T=this.frictionEquations.length;for(v=0;v!==T;v++)m.push(this.frictionEquations[v]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,_,this.frictionEquations,m),l&&(h.narrowphase=Ae.now()-d),l&&(d=Ae.now()),v=0;v<this.frictionEquations.length;v++)a.addEquation(this.frictionEquations[v]);const C=e.length;for(let I=0;I!==C;I++){const O=e[I],B=O.bi,D=O.bj,V=O.si,q=O.sj;let J;if(B.material&&D.material?J=this.getContactMaterial(B.material,D.material)||this.defaultContactMaterial:J=this.defaultContactMaterial,J.friction,B.material&&D.material&&(B.material.friction>=0&&D.material.friction>=0&&B.material.friction*D.material.friction,B.material.restitution>=0&&D.material.restitution>=0&&(O.restitution=B.material.restitution*D.material.restitution)),a.addEquation(O),B.allowSleep&&B.type===st.DYNAMIC&&B.sleepState===st.SLEEPING&&D.sleepState===st.AWAKE&&D.type!==st.STATIC){const it=D.velocity.lengthSquared()+D.angularVelocity.lengthSquared(),ot=D.sleepSpeedLimit**2;it>=ot*2&&(B.wakeUpAfterNarrowphase=!0)}if(D.allowSleep&&D.type===st.DYNAMIC&&D.sleepState===st.SLEEPING&&B.sleepState===st.AWAKE&&B.type!==st.STATIC){const it=B.velocity.lengthSquared()+B.angularVelocity.lengthSquared(),ot=B.sleepSpeedLimit**2;it>=ot*2&&(D.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(B,D,!0),this.collisionMatrixPrevious.get(B,D)||(ls.body=D,ls.contact=O,B.dispatchEvent(ls),ls.body=B,D.dispatchEvent(ls)),this.bodyOverlapKeeper.set(B.id,D.id),this.shapeOverlapKeeper.set(V.id,q.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Ae.now()-d,d=Ae.now()),v=0;v!==s;v++){const I=r[v];I.wakeUpAfterNarrowphase&&(I.wakeUp(),I.wakeUpAfterNarrowphase=!1)}for(y=f.length,v=0;v!==y;v++){const I=f[v];I.update();for(let O=0,B=I.equations.length;O!==B;O++){const D=I.equations[O];a.addEquation(D)}}a.solve(t,this),l&&(h.solve=Ae.now()-d),a.removeAllEquations();const L=Math.pow;for(v=0;v!==s;v++){const I=r[v];if(I.type&u){const O=L(1-I.linearDamping,t),B=I.velocity;B.scale(O,B);const D=I.angularVelocity;if(D){const V=L(1-I.angularDamping,t);D.scale(V,D)}}}this.dispatchEvent(Fv),l&&(d=Ae.now());const S=this.stepnumber%(this.quatNormalizeSkip+1)===0,P=this.quatNormalizeFast;for(v=0;v!==s;v++)r[v].integrate(t,S,P);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Ae.now()-d),this.stepnumber+=1,this.dispatchEvent(Nv);let U=!0;if(this.allowSleep)for(U=!1,v=0;v!==s;v++){const I=r[v];I.sleepTick(this.time),I.sleepState!==st.SLEEPING&&(U=!0)}this.hasActiveBodies=U}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Un,Bn),t){for(let s=0,r=Un.length;s<r;s+=2)hs.bodyA=this.getBodyById(Un[s]),hs.bodyB=this.getBodyById(Un[s+1]),this.dispatchEvent(hs);hs.bodyA=hs.bodyB=null}if(e){for(let s=0,r=Bn.length;s<r;s+=2)us.bodyA=this.getBodyById(Bn[s]),us.bodyB=this.getBodyById(Bn[s+1]),this.dispatchEvent(us);us.bodyA=us.bodyB=null}Un.length=Bn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(Un,Bn),n){for(let s=0,r=Un.length;s<r;s+=2){const a=this.getShapeById(Un[s]),c=this.getShapeById(Un[s+1]);On.shapeA=a,On.shapeB=c,a&&(On.bodyA=a.body),c&&(On.bodyB=c.body),this.dispatchEvent(On)}On.bodyA=On.bodyB=On.shapeA=On.shapeB=null}if(i){for(let s=0,r=Bn.length;s<r;s+=2){const a=this.getShapeById(Bn[s]),c=this.getShapeById(Bn[s+1]);zn.shapeA=a,zn.shapeB=c,a&&(zn.bodyA=a.body),c&&(zn.bodyB=c.body),this.dispatchEvent(zn)}zn.bodyA=zn.bodyB=zn.shapeA=zn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new Je;const mo=new Te,Ae=globalThis.performance||{};if(!Ae.now){let o=Date.now();Ae.timing&&Ae.timing.navigationStart&&(o=Ae.timing.navigationStart),Ae.now=()=>Date.now()-o}new b;const Nv={type:"postStep"},Fv={type:"preStep"},ls={type:st.COLLIDE_EVENT_NAME,body:null,contact:null},Uv=[],Bv=[],Ov=[],zv=[],Un=[],Bn=[],hs={type:"beginContact",bodyA:null,bodyB:null},us={type:"endContact",bodyA:null,bodyB:null},On={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},zn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class kv{constructor(t,e){this.scene=t,this.world=e,this.radius=.5,this.mass=7,this.maxSpeed=15,this.accelerationRate=3,this.decelerationRate=4,this.currentSpeed=0,this.turnSensitivity=8,this.hasShield=!1,this.isBoosted=!1,this.isGiant=!1,this.createMesh(),this.createBody()}createMesh(){const t=new xe(this.radius,32,32),e=new Wt({color:1710638,roughness:.3,metalness:.7});this.mesh=new Z(t,e),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.scene.add(this.mesh);const n=new Rs(this.radius*.7,.03,8,32),i=new Wt({color:15158332,roughness:.3});this.stripe=new Z(n,i),this.stripe.rotation.x=Math.PI/2,this.mesh.add(this.stripe)}createBody(){const t=new Es(this.radius);this.body=new st({mass:this.mass,shape:t,material:new En({friction:.3,restitution:.5}),linearDamping:.1,angularDamping:.3}),this.world.addBody(this.body)}reset(){this.body.position.set(0,1,0),this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.body.quaternion.set(0,0,0,1),this.currentSpeed=0,this.hasShield=!1,this.isBoosted=!1,this.setGiant(!1),this.update()}applyTiltForce(t,e){Math.random()<.02&&console.log("Tilt:",t.beta.toFixed(1),t.gamma.toFixed(1),"Speed:",this.currentSpeed.toFixed(1));const n=Math.max(0,-t.beta)/45,i=Math.max(0,t.beta)/45;n>.05?(this.currentSpeed+=this.accelerationRate*n*e,this.currentSpeed=Math.min(this.currentSpeed,this.maxSpeed)):i>.1?(this.currentSpeed-=this.decelerationRate*i*e,this.currentSpeed=Math.max(this.currentSpeed,0)):this.currentSpeed*=.99;const s=this.currentSpeed*2;this.body.velocity.z=s;const r=-t.gamma/45*this.turnSensitivity,a=Math.max(.3,this.currentSpeed/this.maxSpeed);this.body.velocity.x=r*a;const c=this.body.velocity.z/this.radius,l=-this.body.velocity.x/this.radius;this.body.angularVelocity.set(c,0,l)}update(){this.mesh.position.copy(this.body.position),this.mesh.quaternion.copy(this.body.quaternion)}getPosition(){return this.body.position}getVelocity(){return this.body.velocity}getSpeedPercent(){return this.currentSpeed/this.maxSpeed*100}boost(t=1.5,e=3e3){this.isBoosted||(this.isBoosted=!0,this.currentSpeed=Math.min(this.currentSpeed*t,this.maxSpeed),setTimeout(()=>{this.isBoosted=!1},e))}activateShield(){this.hasShield=!0,this.mesh.material.emissive=new Bt(3447003),this.mesh.material.emissiveIntensity=.3}consumeShield(){return this.hasShield?(this.hasShield=!1,this.mesh.material.emissive=new Bt(0),!0):!1}setGiant(t){this.isGiant=t;const e=t?2:1;this.mesh.scale.set(e,e,e),this.body.shapes[0].radius=this.radius*e,this.body.updateBoundingRadius()}setShrunk(t){this.isShrunk=t;const e=t?.5:1;this.mesh.scale.set(e,e,e),this.body.shapes[0].radius=this.radius*e,this.body.updateBoundingRadius(),t?(this.mesh.material.color.setHex(16738740),this.mesh.material.emissive=new Bt(16711935),this.mesh.material.emissiveIntensity=.3):(this.mesh.material.color.setHex(1710638),this.mesh.material.emissive=new Bt(0),this.mesh.material.emissiveIntensity=0)}setSlip(t){this.isSlipping=t,t?(this.body.linearDamping=.01,this.turnSensitivity=3,this.mesh.material.emissive=new Bt(240116),this.mesh.material.emissiveIntensity=.3):(this.body.linearDamping=.1,this.turnSensitivity=8,!this.hasShield&&!this.isShrunk&&!this.isSlowed&&(this.mesh.material.emissive=new Bt(0),this.mesh.material.emissiveIntensity=0))}slowDown(t=.3,e=6e3){if(this.isSlowed)return;this.isSlowed=!0;const n=this.maxSpeed,i=this.accelerationRate;this.maxSpeed*=t,this.accelerationRate*=t,this.currentSpeed=Math.min(this.currentSpeed,this.maxSpeed),this.mesh.material.emissive=new Bt(65535),this.mesh.material.emissiveIntensity=.4,setTimeout(()=>{this.isSlowed=!1,this.maxSpeed=n,this.accelerationRate=i,!this.hasShield&&!this.isShrunk&&(this.mesh.material.emissive=new Bt(0),this.mesh.material.emissiveIntensity=0)},e)}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Gv{constructor(t,e,n,i,s){this.scene=t,this.world=e,this.index=s,this.initialPosition={x:n,z:i},this.height=1.5,this.radiusTop=.08,this.radiusMiddle=.2,this.radiusBottom=.15,this.mass=1.5,this.knockedThreshold=.3,this.createMesh(),this.createBody(n,i)}createMesh(){const t=new De,e=new we(this.radiusTop,this.radiusMiddle,this.height*.6,16),n=new Wt({color:16777215,roughness:.4,metalness:.1}),i=new Z(e,n);i.position.y=this.height*.3,i.castShadow=!0,t.add(i);const s=new we(this.radiusMiddle,this.radiusBottom,this.height*.4,16),r=new Z(s,n);r.position.y=-this.height*.1,r.castShadow=!0,t.add(r);const a=new we(this.radiusMiddle+.01,this.radiusMiddle+.01,.15,16),c=new Wt({color:15158332,roughness:.4}),l=new Z(a,c);l.position.y=this.height*.1,t.add(l);const h=new Z(a,c);h.position.y=this.height*.25,t.add(h),this.mesh=t,this.scene.add(this.mesh)}createBody(t,e){const n=new ii(this.radiusTop,this.radiusMiddle,this.height,8);this.body=new st({mass:this.mass,shape:n,material:new En({friction:.3,restitution:.3}),linearDamping:.1,angularDamping:.1});const i=new Me;i.setFromAxisAngle(new b(1,0,0),0),this.body.quaternion.copy(i),this.body.position.set(t,this.height/2,e),this.world.addBody(this.body)}update(){this.mesh.position.copy(this.body.position),this.mesh.quaternion.copy(this.body.quaternion)}isKnocked(){const t=new fn().setFromQuaternion(new ji(this.body.quaternion.x,this.body.quaternion.y,this.body.quaternion.z,this.body.quaternion.w)),e=Math.abs(t.x),n=Math.abs(t.z),i=this.body.position.y<this.height*.3;return e>this.knockedThreshold||n>this.knockedThreshold||i}reset(){this.body.position.set(this.initialPosition.x,this.height/2,this.initialPosition.z),this.body.velocity.set(0,0,0),this.body.angularVelocity.set(0,0,0),this.body.quaternion.set(0,0,0,1),this.update()}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Vv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.radius=s.radius||.8,this.height=s.height||.6,this.bounciness=s.bounciness||3.5,this.color=s.color||16739179,this.bounceForce=s.bounceForce||18,this.pulsePhase=Math.random()*Math.PI*2,this.isActive=!0,this.cooldown=0,this.onHit=s.onHit||null,this.createMesh(),this.createBody()}createMesh(){const t=new we(this.radius,this.radius*1.1,this.height,24),e=new Wt({color:this.color,roughness:.3,metalness:.6,emissive:this.color,emissiveIntensity:.2});this.mesh=new Z(t,e),this.mesh.position.set(this.position.x,this.height/2,this.position.z),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0;const n=new Rs(this.radius*.9,.05,8,24),i=new _t({color:16777215,transparent:!0,opacity:.8});this.ring=new Z(n,i),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=this.height/2+.02,this.mesh.add(this.ring);const s=new ei(this.radius*.7,24),r=new _t({color:16777215,transparent:!0,opacity:.4});this.glow=new Z(s,r),this.glow.rotation.x=-Math.PI/2,this.glow.position.y=this.height/2+.03,this.mesh.add(this.glow),this.scene.add(this.mesh)}createBody(){const t=new ii(this.radius,this.radius*1.1,this.height,12);this.body=new st({mass:0,shape:t,material:new En({friction:.1,restitution:this.bounciness}),position:new b(this.position.x,this.height/2,this.position.z)}),this.body.addEventListener("collide",e=>{this.isActive&&this.cooldown<=0&&this.triggerBounce(e)}),this.world.addBody(this.body)}triggerBounce(t){this.cooldown=.25;const e=t.body;if(e&&e.mass>0){const n=e.position.x-this.position.x,i=e.position.z-this.position.z,s=Math.sqrt(n*n+i*i)||1,r=(Math.random()-.5)*Math.PI/3,a=Math.cos(r),c=Math.sin(r),l=n/s*a-i/s*c,h=n/s*c+i/s*a,u=new b(l*this.bounceForce,8+Math.random()*5,h*this.bounceForce);e.velocity.copy(u)}this.mesh.scale.set(1.5,.5,1.5),this.mesh.position.y=this.height/2-.1,this.mesh.material.emissiveIntensity=1.5,this.mesh.material.color.setHex(16777215),this.glow.material.opacity=1,this.ring.material.opacity=1,this.ring.scale.set(1.5,1.5,1),setTimeout(()=>{this.mesh.material.color.setHex(this.color)},80),this.onHit&&this.onHit(this)}update(t){this.cooldown>0&&(this.cooldown-=t),this.mesh.scale.x+=(1-this.mesh.scale.x)*.15,this.mesh.scale.y+=(1-this.mesh.scale.y)*.15,this.mesh.scale.z+=(1-this.mesh.scale.z)*.15,this.mesh.position.y+=(this.height/2-this.mesh.position.y)*.15,this.mesh.material.emissiveIntensity+=(.3-this.mesh.material.emissiveIntensity)*.1,this.glow.material.opacity+=(.5-this.glow.material.opacity)*.1,this.ring.material.opacity+=(.8-this.ring.material.opacity)*.1,this.pulsePhase+=t*4;const e=1+Math.sin(this.pulsePhase)*.08;this.ring.scale.x+=(e-this.ring.scale.x)*.2,this.ring.scale.y+=(e-this.ring.scale.y)*.2}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Hv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.initialPosition={x:n,z:i},this.position={x:n,z:i},this.speed=s.speed||8,this.detectionRadius=s.detectionRadius||10,this.attackRadius=s.attackRadius||1.5,this.state="idle",this.targetBall=null,this.onAttack=s.onAttack||null,this.hasCaughtBall=!1,this.animationTime=0,this.tailPhase=Math.random()*Math.PI*2,this.idleWanderAngle=0,this.idleWanderTarget=null,this.createMesh(),this.createBody()}createMesh(){this.mesh=new De;const t=new Ea(.3,.6,8,16),e=new Wt({color:16747520,roughness:.8}),n=new Z(t,e);n.rotation.x=Math.PI/2,n.position.y=.4,this.mesh.add(n);const i=new xe(.25,16,16),s=new Z(i,e);s.position.set(0,.5,.5),this.head=s,this.mesh.add(s);const r=new yi(.1,.2,4),a=new Z(r,e);a.position.set(-.15,.7,.45),a.rotation.z=-.2,this.mesh.add(a);const c=new Z(r,e);c.position.set(.15,.7,.45),c.rotation.z=.2,this.mesh.add(c);const l=new xe(.08,8,8),h=new _t({color:65280}),u=new Z(l,h);u.position.set(-.1,.55,.7),this.leftEye=u,this.mesh.add(u);const d=new Z(l,h);d.position.set(.1,.55,.7),this.rightEye=d,this.mesh.add(d);const f=new xe(.04,8,8),m=new _t({color:0}),x=new Z(f,m);x.position.set(0,0,.05),u.add(x);const g=new Z(f,m);g.position.set(0,0,.05),d.add(g);const p=new we(.05,.08,.6,8);this.tail=new Z(p,e),this.tail.position.set(0,.5,-.5),this.tail.rotation.x=-.5,this.mesh.add(this.tail);const v=new we(.06,.05,.3,8),y=[{x:-.2,z:.2},{x:.2,z:.2},{x:-.2,z:-.2},{x:.2,z:-.2}];this.legs=[],y.forEach(_=>{const E=new Z(v,e);E.position.set(_.x,.15,_.z),this.legs.push(E),this.mesh.add(E)}),this.mesh.position.set(this.position.x,0,this.position.z),this.mesh.castShadow=!0,this.scene.add(this.mesh)}createBody(){const t=new Es(.4);this.body=new st({mass:0,shape:t,type:st.KINEMATIC,position:new b(this.position.x,.4,this.position.z)}),this.world.addBody(this.body)}setTarget(t){this.targetBall=t}update(t,e,n){if(this.animationTime+=t,this.tailPhase+=t*5,this.tail.rotation.z=Math.sin(this.tailPhase)*.5,!e||this.hasCaughtBall){this.idleAnimation(t);return}const i=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2)),s=n?Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z):0,r=e.y>1,a=s>12&&i>5,c=r||a;switch(c&&(this.state==="stalking"||this.state==="pouncing")&&(this.state="returning",this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1)),this.state){case"idle":this.idleAnimation(t),i<this.detectionRadius&&e.z>this.position.z-5&&!c&&(this.state="stalking",this.leftEye.scale.set(1.3,1.3,1.3),this.rightEye.scale.set(1.3,1.3,1.3));break;case"stalking":const l=e.z+n.z*.5,u=e.x+n.x*.5-this.position.x,d=l-this.position.z,f=Math.sqrt(u*u+d*d);if(f>.1){const C=this.speed*t;this.position.x+=u/f*C,this.position.z+=d/f*C,this.mesh.rotation.y=Math.atan2(u,d)}this.mesh.position.y=0+Math.sin(this.animationTime*15)*.05,i<this.attackRadius&&(this.state="pouncing",this.pounceStartY=0,this.pounceTime=0);break;case"pouncing":this.pounceTime+=t;const x=this.pounceTime/.3,g=Math.sin(x*Math.PI)*1.5;this.mesh.position.y=g,this.mesh.rotation.x=-x*Math.PI*.5;const p=e.x-this.position.x,v=e.z-this.position.z,y=Math.sqrt(p*p+v*v);if(y>.1){const C=this.speed*2*t;this.position.x+=p/y*C,this.position.z+=v/y*C}(x>=1||i<.5)&&(i<1&&(this.hasCaughtBall=!0,this.onAttack&&this.onAttack(this)),this.state="returning",this.mesh.rotation.x=0);break;case"returning":const _=this.initialPosition.x-this.position.x,E=this.initialPosition.z-this.position.z,T=Math.sqrt(_*_+E*E);if(T>.5){const C=this.speed*.5*t;this.position.x+=_/T*C,this.position.z+=E/T*C,this.mesh.rotation.y=Math.atan2(_,E)}else this.state="idle",this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1);this.mesh.position.y=0;break}this.mesh.position.x=this.position.x,this.mesh.position.z=this.position.z,this.body.position.set(this.position.x,.4,this.position.z),(this.state==="stalking"||this.state==="returning")&&this.legs.forEach((l,h)=>{l.position.y=.15+Math.sin(this.animationTime*20+h*Math.PI)*.1})}idleAnimation(t){(!this.idleWanderTarget||Math.random()<.01)&&(this.idleWanderAngle=Math.random()*Math.PI*2,this.idleWanderTarget={x:this.initialPosition.x+Math.cos(this.idleWanderAngle)*2,z:this.initialPosition.z+Math.sin(this.idleWanderAngle)*2});const e=this.idleWanderTarget.x-this.position.x,n=this.idleWanderTarget.z-this.position.z,i=Math.sqrt(e*e+n*n);if(i>.3){const s=this.speed*.3*t;this.position.x+=e/i*s,this.position.z+=n/i*s,this.mesh.rotation.y=Math.atan2(e,n),this.legs.forEach((r,a)=>{r.position.y=.15+Math.sin(this.animationTime*10+a*Math.PI)*.05})}this.mesh.position.x=this.position.x,this.mesh.position.z=this.position.z,this.body.position.set(this.position.x,.4,this.position.z)}reset(){this.position={...this.initialPosition},this.state="idle",this.hasCaughtBall=!1,this.mesh.position.set(this.position.x,0,this.position.z),this.mesh.rotation.set(0,0,0),this.body.position.set(this.position.x,.4,this.position.z),this.leftEye.scale.set(1,1,1),this.rightEye.scale.set(1,1,1)}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Wv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.radius=s.radius||1.5,this.depth=s.depth||3,this.onFall=s.onFall||null,this.hasCaughtBall=!1,this.animTime=0,this.createMesh(),this.createTrigger(),this.createSmokeParticles()}createMesh(){this.mesh=new De;const t=new ei(this.radius,32),e=new _t({color:0,side:Xt}),n=new Z(t,e);n.rotation.x=-Math.PI/2,n.position.y=-.1,this.mesh.add(n);const i=new Cn(this.radius*.5,this.radius*.8,32),s=new _t({color:16711680,transparent:!0,opacity:.6,side:Xt});this.glowRing=new Z(i,s),this.glowRing.rotation.x=-Math.PI/2,this.glowRing.position.y=-.05,this.mesh.add(this.glowRing);const r=new Cn(this.radius,this.radius+.5,32),a=new _t({color:16724736,transparent:!0,opacity:.8,side:Xt});this.dangerRing=new Z(r,a),this.dangerRing.rotation.x=-Math.PI/2,this.dangerRing.position.y=.02,this.mesh.add(this.dangerRing),this.stripes=[];const c=16;for(let m=0;m<c;m++){const x=m/c*Math.PI*2,g=new Yt(.3,.6),p=new _t({color:m%2===0?16763904:0,side:Xt,transparent:!0,opacity:.9}),v=new Z(g,p);v.rotation.x=-Math.PI/2,v.rotation.z=x,v.position.x=Math.cos(x)*(this.radius+.5),v.position.z=Math.sin(x)*(this.radius+.5),v.position.y=.03,this.stripes.push(v),this.mesh.add(v)}this.createSkullDecorations();const l=new Yt(1.2,1.2),h=document.createElement("canvas");h.width=128,h.height=128;const u=h.getContext("2d");u.fillStyle="#ff0000",u.beginPath(),u.moveTo(64,10),u.lineTo(118,110),u.lineTo(10,110),u.closePath(),u.fill(),u.strokeStyle="#ffffff",u.lineWidth=4,u.stroke(),u.fillStyle="#ffffff",u.font="bold 50px Arial",u.textAlign="center",u.textBaseline="middle",u.fillText("💀",64,70);const d=new bn(h),f=new _t({map:d,transparent:!0,side:Xt});this.warningSign=new Z(l,f),this.warningSign.position.y=2.5,this.mesh.add(this.warningSign),this.warningSign2=this.warningSign.clone(),this.warningSign2.rotation.y=Math.PI,this.mesh.add(this.warningSign2),this.createDangerText(),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createSkullDecorations(){for(let e=0;e<4;e++){const n=e/4*Math.PI*2+Math.PI/4,i=new Yt(.4,.4),s=document.createElement("canvas");s.width=32,s.height=32;const r=s.getContext("2d");r.font="28px Arial",r.textAlign="center",r.textBaseline="middle",r.fillText("💀",16,16);const a=new bn(s),c=new _t({map:a,transparent:!0,side:Xt}),l=new Z(i,c);l.position.x=Math.cos(n)*(this.radius+.8),l.position.z=Math.sin(n)*(this.radius+.8),l.position.y=.5,l.rotation.y=-n+Math.PI/2,this.mesh.add(l)}}createDangerText(){const t=document.createElement("canvas");t.width=256,t.height=64;const e=t.getContext("2d");e.fillStyle="#ff0000",e.font="bold 40px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText("⚠ DANGER ⚠",128,32);const n=new bn(t),i=new _t({map:n,transparent:!0,side:Xt}),s=new Yt(2,.5);this.dangerText=new Z(s,i),this.dangerText.position.y=1.5,this.mesh.add(this.dangerText)}createSmokeParticles(){this.smokeParticles=[];const t=12;for(let e=0;e<t;e++){const n=new xe(.2+Math.random()*.2,8,8),i=new _t({color:3342336,transparent:!0,opacity:.4}),s=new Z(n,i);s.userData={angle:e/t*Math.PI*2,radius:this.radius*.5+Math.random()*this.radius*.3,speed:.5+Math.random()*.5,offset:Math.random()*Math.PI*2},s.position.y=-.5,this.smokeParticles.push(s),this.mesh.add(s)}}createTrigger(){const t=new ii(this.radius*.8,this.radius*.8,.5,12);this.body=new st({mass:0,shape:t,collisionResponse:!1,position:new b(this.position.x,-.25,this.position.z)}),this.body.userData={type:"pit",pit:this},this.world.addBody(this.body)}update(t,e){this.animTime+=t;const n=Math.sin(this.animTime*8)*.4+.6;this.dangerRing.material.opacity=n,this.dangerRing.scale.set(1+n*.15,1+n*.15,1);const i=Math.sin(this.animTime*6+Math.PI)*.3+.5;if(this.glowRing.material.opacity=i,this.stripes.forEach((r,a)=>{const c=a/this.stripes.length*Math.PI*2+this.animTime*2;r.position.x=Math.cos(c)*(this.radius+.5),r.position.z=Math.sin(c)*(this.radius+.5),r.rotation.z=c}),this.warningSign.position.y=2.5+Math.sin(this.animTime*3)*.3,this.warningSign.rotation.y=this.animTime*1.5,this.warningSign2.position.y=2.5+Math.sin(this.animTime*3+Math.PI)*.3,this.warningSign2.rotation.y=-this.animTime*1.5,this.dangerText.position.y=1.5+Math.sin(this.animTime*4)*.15,this.dangerText.rotation.y=Math.sin(this.animTime*2)*.3,this.dangerText.material.opacity=Math.sin(this.animTime*10)>0?1:.3,this.smokeParticles.forEach(r=>{r.userData.offset+=t*r.userData.speed;const a=r.userData.offset%2;r.position.y=a*1.5-.3,r.position.x=Math.cos(r.userData.angle+this.animTime)*r.userData.radius,r.position.z=Math.sin(r.userData.angle+this.animTime)*r.userData.radius,r.material.opacity=.4*(1-a/2),r.scale.setScalar(1+a*.5)}),!e||this.hasCaughtBall)return{fallen:!1};const s=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));if(s<this.radius*2){const r=1-s/(this.radius*2);this.dangerRing.material.color.setHex(16711680),this.dangerRing.scale.setScalar(1+r*.5)}return s<this.radius*.7&&e.y<.5?(this.hasCaughtBall=!0,this.onFall&&this.onFall(this),{fallen:!0}):{fallen:!1}}reset(){this.hasCaughtBall=!1}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class qv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.radius=s.radius||1.2,this.launchForce=s.launchForce||25,this.launchAngle=s.launchAngle||Math.PI/4,this.onLaunch=s.onLaunch||null,this.cooldown=0,this.isCharged=!0,this.chargeTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new De;const t=new we(this.radius,this.radius*1.2,.3,24),e=new Wt({color:3447003,roughness:.3,metalness:.7}),n=new Z(t,e);n.position.y=.15,this.mesh.add(n);const i=new Rs(this.radius*.6,.08,8,24),s=new Wt({color:15158332,roughness:.4,metalness:.8});for(let m=0;m<3;m++){const x=new Z(i,s);x.rotation.x=Math.PI/2,x.position.y=.35+m*.15,x.scale.set(1-m*.1,1-m*.1,1),this.mesh.add(x)}const r=new we(this.radius*.9,this.radius*.9,.15,24),a=new Wt({color:15965202,roughness:.2,metalness:.9,emissive:15965202,emissiveIntensity:.3});this.plate=new Z(r,a),this.plate.position.y=.8,this.mesh.add(this.plate);const c=new Cs;c.moveTo(0,.4),c.lineTo(-.2,0),c.lineTo(-.08,0),c.lineTo(-.08,-.4),c.lineTo(.08,-.4),c.lineTo(.08,0),c.lineTo(.2,0),c.closePath();const l=new Ji(c),h=new _t({color:65280,side:Xt});this.arrow=new Z(l,h),this.arrow.rotation.x=-Math.PI/2,this.arrow.position.y=.9,this.mesh.add(this.arrow);const u=new Cn(this.radius*.8,this.radius*1,24),d=new _t({color:65280,transparent:!0,opacity:.5,side:Xt});this.glow=new Z(u,d),this.glow.rotation.x=-Math.PI/2,this.glow.position.y=.02,this.mesh.add(this.glow),this.particles=[];const f=new _t({color:65280,transparent:!0,opacity:.8});for(let m=0;m<8;m++){const x=new xe(.05,8,8),g=new Z(x,f.clone());g.userData={angle:m/8*Math.PI*2,speed:1+Math.random()*.5,height:Math.random()},this.particles.push(g),this.mesh.add(g)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new ii(this.radius*.9,this.radius*.9,.3,12);this.body=new st({mass:0,shape:t,position:new b(this.position.x,.8,this.position.z)}),this.body.addEventListener("collide",e=>{this.isCharged&&this.cooldown<=0&&this.triggerLaunch(e.body)}),this.world.addBody(this.body)}triggerLaunch(t){this.isCharged=!1,this.cooldown=2;const e=new b(0,Math.sin(this.launchAngle)*this.launchForce,Math.cos(this.launchAngle)*this.launchForce);return t&&t.mass>0&&t.velocity.copy(e),this.plate.position.y=.4,this.plate.material.emissiveIntensity=1,this.arrow.material.color.setHex(16776960),this.onLaunch&&this.onLaunch(this,this.launchForce),e}update(t,e){if(this.cooldown>0&&(this.cooldown-=t,this.cooldown<=0&&(this.isCharged=!0)),this.plate.position.y+=(.8-this.plate.position.y)*.1,this.plate.material.emissiveIntensity+=(.3-this.plate.material.emissiveIntensity)*.1,this.isCharged){const n=Math.sin(Date.now()*.005)*.3+.5;this.glow.material.opacity=n,this.glow.material.color.setHex(65280),this.arrow.material.color.setHex(65280),this.particles.forEach(i=>{i.visible=!0,i.userData.angle+=t*i.userData.speed*3,i.userData.height+=t*2,i.userData.height>1.5&&(i.userData.height=0);const s=this.radius*.5*(1-i.userData.height/1.5);i.position.x=Math.cos(i.userData.angle)*s,i.position.z=Math.sin(i.userData.angle)*s,i.position.y=.3+i.userData.height,i.material.opacity=1-i.userData.height/1.5})}else this.glow.material.opacity=.2,this.glow.material.color.setHex(16737792),this.particles.forEach(n=>n.visible=!1);this.arrow.position.y=.9+Math.sin(Date.now()*.004)*.1}reset(){this.isCharged=!0,this.cooldown=0,this.plate.position.y=.8}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Xv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.radius=s.radius||2,this.pullStrength=s.pullStrength||8,this.spinSpeed=s.spinSpeed||5,this.onCapture=s.onCapture||null,this.onRelease=s.onRelease||null,this.state="idle",this.capturedBall=null,this.spinAngle=0,this.spinTime=0,this.releaseDirection={x:0,z:1},this.createMesh(),this.createTrigger()}createMesh(){this.mesh=new De,this.rings=[];const t=[10181046,9323693,7091331,5975151];for(let u=0;u<4;u++){const d=new Cn(this.radius*(.3+u*.2),this.radius*(.4+u*.2),32),f=new _t({color:t[u],transparent:!0,opacity:.6-u*.1,side:Xt}),m=new Z(d,f);m.rotation.x=-Math.PI/2,m.position.y=.05+u*.02,m.userData={rotationSpeed:(4-u)*.5},this.rings.push(m),this.mesh.add(m)}const e=new ei(this.radius*.3,24),n=new _t({color:1706542,side:Xt}),i=new Z(e,n);i.rotation.x=-Math.PI/2,i.position.y=.01,this.mesh.add(i),this.spiralParticles=[];const s=new _t({color:14702333,transparent:!0,opacity:.8});for(let u=0;u<20;u++){const d=new xe(.08,8,8),f=new Z(d,s.clone());f.userData={angle:u/20*Math.PI*2,radius:this.radius*.3+u/20*this.radius*.6,height:Math.random()*.5,speed:2+Math.random()},this.spiralParticles.push(f),this.mesh.add(f)}const r=new Cn(this.radius,this.radius+.2,32),a=new _t({color:10181046,transparent:!0,opacity:.4,side:Xt});this.outerGlow=new Z(r,a),this.outerGlow.rotation.x=-Math.PI/2,this.outerGlow.position.y=.02,this.mesh.add(this.outerGlow);const c=new Cs;c.moveTo(0,.6),c.lineTo(-.3,.1),c.lineTo(-.1,.1),c.lineTo(-.1,-.3),c.lineTo(.1,-.3),c.lineTo(.1,.1),c.lineTo(.3,.1),c.closePath();const l=new Ji(c),h=new _t({color:65280,transparent:!0,opacity:0,side:Xt});this.directionArrow=new Z(l,h),this.directionArrow.rotation.x=-Math.PI/2,this.directionArrow.position.y=.15,this.directionArrow.position.z=this.radius+.5,this.mesh.add(this.directionArrow),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createTrigger(){const t=new ii(this.radius,this.radius,1,12);this.body=new st({mass:0,shape:t,collisionResponse:!1,position:new b(this.position.x,.5,this.position.z)}),this.body.userData={type:"vortex",vortex:this},this.world.addBody(this.body)}update(t,e,n){this.rings.forEach((r,a)=>{r.rotation.z+=t*r.userData.rotationSpeed*(this.state==="spinning"?3:1)}),this.spiralParticles.forEach(r=>{r.userData.angle+=t*r.userData.speed*(this.state==="spinning"?2:1),r.userData.radius-=t*.5,r.userData.radius<this.radius*.2&&(r.userData.radius=this.radius*.9),r.position.x=Math.cos(r.userData.angle)*r.userData.radius,r.position.z=Math.sin(r.userData.angle)*r.userData.radius,r.position.y=.1+Math.sin(r.userData.angle*2)*.3});const i=Math.sin(Date.now()*.003)*.2+.4;if(this.outerGlow.material.opacity=i,!e||!n)return{captured:!1};const s=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));switch(this.state){case"idle":s<this.radius&&e.y<1&&(this.state="capturing",this.capturedBall=n,this.onCapture&&this.onCapture(this));break;case"capturing":if(this.capturedBall){const r=new b(this.position.x-e.x,.5-e.y,this.position.z-e.z);r.normalize(),r.scale(this.pullStrength*t*60,r),this.capturedBall.velocity.x+=r.x,this.capturedBall.velocity.y+=r.y,this.capturedBall.velocity.z+=r.z,this.capturedBall.velocity.scale(.95,this.capturedBall.velocity),s<.5&&(this.state="spinning",this.spinAngle=0,this.spinTime=0)}break;case"spinning":if(this.spinTime+=t,this.spinAngle+=t*this.spinSpeed,this.capturedBall){const a=this.position.x+Math.cos(this.spinAngle)*.8,c=this.position.z+Math.sin(this.spinAngle)*.8;this.capturedBall.position.x=a,this.capturedBall.position.z=c,this.capturedBall.position.y=.5+Math.sin(this.spinTime*10)*.1,this.capturedBall.velocity.set(0,0,0),this.releaseDirection={x:Math.cos(this.spinAngle+Math.PI/2),z:Math.sin(this.spinAngle+Math.PI/2)},this.directionArrow.material.opacity=.8,this.directionArrow.rotation.z=-this.spinAngle-Math.PI/2,this.directionArrow.position.x=Math.cos(this.spinAngle+Math.PI/2)*(this.radius+.5),this.directionArrow.position.z=Math.sin(this.spinAngle+Math.PI/2)*(this.radius+.5);const l=this.spinTime*.5%1;this.rings.forEach(h=>{h.material.color.setHSL(.75+l*.1,1,.5)})}return{captured:!0,canRelease:!0,direction:this.releaseDirection};case"releasing":this.directionArrow.material.opacity=0,this.spinTime+=t,this.spinTime>1&&(this.state="idle",this.capturedBall=null);break}return{captured:this.state==="spinning",canRelease:this.state==="spinning"}}release(){if(this.state!=="spinning"||!this.capturedBall)return null;const t=20,e=new b(this.releaseDirection.x*t,5,this.releaseDirection.z*t);return this.capturedBall.velocity.copy(e),this.capturedBall,this.state="releasing",this.spinTime=0,this.onRelease&&this.onRelease(this,this.releaseDirection),e}reset(){this.state="idle",this.capturedBall=null,this.spinAngle=0,this.spinTime=0,this.directionArrow.material.opacity=0,this.rings.forEach(t=>t.material.color.setHex(10181046))}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Yv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.trapType=s.trapType||["reverse","shrink","slow","blind"][Math.floor(Math.random()*4)],this.onTrigger=s.onTrigger||null,this.collected=!1,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new De;const t=new Mr(.5);let e;switch(this.trapType){case"reverse":e=15965202;break;case"shrink":e=10181046;break;case"slow":e=3447003;break;case"blind":e=3066993;break;default:e=15965202}const n=new Wt({color:e,emissive:e,emissiveIntensity:.5,roughness:.2,metalness:.8});this.gem=new Z(t,n),this.mesh.add(this.gem);const i=new Yt(.2,.2),s=document.createElement("canvas");s.width=32,s.height=32;const r=s.getContext("2d");r.fillStyle="rgba(0,0,0,0.3)",r.font="24px Arial",r.textAlign="center",r.textBaseline="middle",r.fillText("💀",16,16);const a=new bn(s),c=new _t({map:a,transparent:!0,side:Xt});this.skull=new Z(i,c),this.skull.position.y=.6,this.mesh.add(this.skull),this.sparkles=[];for(let l=0;l<6;l++){const h=new Z(new xe(.05,8,8),new _t({color:16777215,transparent:!0,opacity:.8}));h.userData={angle:l/6*Math.PI*2,speed:1+Math.random()},this.sparkles.push(h),this.mesh.add(h)}this.mesh.position.set(this.position.x,1,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new Es(.6);this.body=new st({mass:0,shape:t,collisionResponse:!1,position:new b(this.position.x,1,this.position.z)}),this.body.userData={type:"fakeBonus",bonus:this},this.world.addBody(this.body)}update(t,e){return this.collected?{triggered:!1}:(this.animTime+=t,this.gem.rotation.y+=t*2,this.mesh.position.y=1+Math.sin(this.animTime*3)*.2,this.sparkles.forEach(n=>{n.userData.angle+=t*n.userData.speed*3,n.position.x=Math.cos(n.userData.angle)*.6,n.position.z=Math.sin(n.userData.angle)*.6,n.position.y=Math.sin(n.userData.angle*2)*.3,n.material.opacity=.5+Math.sin(this.animTime*10)*.3}),this.skull.material.opacity=.15+Math.sin(this.animTime*2)*.1,this.skull.rotation.y=this.animTime,e&&Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2))<1&&Math.abs(e.y-1)<1?this.trigger():{triggered:!1})}trigger(){return this.collected=!0,this.mesh.visible=!1,this.onTrigger&&this.onTrigger(this,this.trapType),{triggered:!0,trapType:this.trapType}}reset(){this.collected=!1,this.mesh.visible=!0}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Zv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.explosionForce=s.explosionForce||25,this.onExplode=s.onExplode||null,this.hasExploded=!1,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new De;const t=new we(.5,.6,1.2,16),e=new Wt({color:9127187,roughness:.8});this.barrel=new Z(t,e),this.barrel.position.y=.6,this.mesh.add(this.barrel);const n=new we(.52,.62,.2,16),i=new Wt({color:16711680,emissive:16711680,emissiveIntensity:.3}),s=new Z(n,i);s.position.y=.3,this.mesh.add(s);const r=new Z(n,i);r.position.y=.9,this.mesh.add(r);const a=new Yt(.6,.6),c=document.createElement("canvas");c.width=64,c.height=64;const l=c.getContext("2d");l.fillStyle="#ffcc00",l.fillRect(0,0,64,64),l.fillStyle="#000000",l.font="40px Arial",l.textAlign="center",l.textBaseline="middle",l.fillText("💣",32,32);const h=new bn(c),u=new _t({map:h,transparent:!0}),d=new Z(a,u);d.position.set(0,.6,.55),this.mesh.add(d);const f=d.clone();f.position.set(0,.6,-.55),f.rotation.y=Math.PI,this.mesh.add(f);const m=new we(.03,.03,.3,8),x=new _t({color:3355443});this.fuse=new Z(m,x),this.fuse.position.set(.2,1.3,0),this.fuse.rotation.z=.3,this.mesh.add(this.fuse);const g=new xe(.08,8,8),p=new _t({color:16737792,transparent:!0});this.spark=new Z(g,p),this.spark.position.set(.35,1.45,0),this.mesh.add(this.spark),this.smokeParticles=[];for(let v=0;v<5;v++){const y=new Z(new xe(.05,6,6),new _t({color:6710886,transparent:!0,opacity:.5}));y.userData={offset:Math.random()*Math.PI*2},this.smokeParticles.push(y),this.mesh.add(y)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new ii(.5,.6,1.2,12);this.body=new st({mass:0,shape:t,position:new b(this.position.x,.6,this.position.z)}),this.body.addEventListener("collide",e=>{!this.hasExploded&&e.body.mass>0&&this.explode(e.body)}),this.world.addBody(this.body)}explode(t){this.hasExploded=!0;const e=Math.random()*Math.PI*2,n=10+Math.random()*10,i=new b(Math.cos(e)*this.explosionForce,n,Math.sin(e)*this.explosionForce);t&&t.velocity.copy(i),this.barrel.visible=!1,this.fuse.visible=!1,this.spark.visible=!1,this.createExplosionEffect(),this.onExplode&&this.onExplode(this,i)}createExplosionEffect(){const t=new xe(.5,16,16),e=new _t({color:16737792,transparent:!0,opacity:1});this.explosion=new Z(t,e),this.explosion.position.y=.6,this.mesh.add(this.explosion);let n=1;const i=setInterval(()=>{n+=.5,this.explosion.scale.setScalar(n),this.explosion.material.opacity-=.1,this.explosion.material.opacity<=0&&(clearInterval(i),this.mesh.remove(this.explosion))},50)}update(t,e){if(this.hasExploded)return;this.animTime+=t,this.spark.material.opacity=.5+Math.sin(this.animTime*20)*.5,this.spark.scale.setScalar(.8+Math.sin(this.animTime*15)*.3);const n=Math.sin(this.animTime*10)>0?16737792:16763904;if(this.spark.material.color.setHex(n),this.smokeParticles.forEach((i,s)=>{i.userData.offset+=t*2;const r=i.userData.offset%1.5;i.position.set(.35+Math.sin(i.userData.offset*3+s)*.1,1.45+r,Math.cos(i.userData.offset*2+s)*.1),i.material.opacity=.5*(1-r/1.5)}),e){const i=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));i<3&&(this.barrel.rotation.z=Math.sin(this.animTime*30)*.1*(1-i/3),this.spark.scale.setScalar(1+(1-i/3)*.5))}}reset(){this.hasExploded=!1,this.barrel.visible=!0,this.fuse.visible=!0,this.spark.visible=!0,this.explosion&&this.mesh.remove(this.explosion)}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class Kv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.triggerRadius=s.triggerRadius||3,this.popupSpeed=s.popupSpeed||15,this.bounceForce=s.bounceForce||20,this.onPopup=s.onPopup||null,this.state="hidden",this.height=0,this.maxHeight=1.5,this.hasHitBall=!1,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new De;const t=new we(.8,.8,.1,16),e=new Wt({color:5592405,roughness:.9});this.plate=new Z(t,e),this.plate.position.y=.05,this.mesh.add(this.plate);const n=new _t({color:3355443,transparent:!0,opacity:.5});for(let l=0;l<4;l++){const h=new Z(new Yt(.05,.7),n);h.rotation.x=-Math.PI/2,h.rotation.z=l/4*Math.PI*2,h.position.y=.06,this.mesh.add(h)}this.spikeGroup=new De;const i=new yi(.3,1.2,8),s=new Wt({color:11184810,roughness:.3,metalness:.8}),r=new Z(i,s);r.position.y=.6,this.spikeGroup.add(r);for(let l=0;l<4;l++){const h=l/4*Math.PI*2,u=new Z(new yi(.15,.6,6),s);u.position.set(Math.cos(h)*.4,.3,Math.sin(h)*.4),this.spikeGroup.add(u)}const a=new we(.7,.7,.2,16),c=new Wt({color:16711680,emissive:16711680,emissiveIntensity:.3});this.spikeBase=new Z(a,c),this.spikeBase.position.y=.1,this.spikeGroup.add(this.spikeBase),this.spikeGroup.position.y=-this.maxHeight,this.mesh.add(this.spikeGroup),this.dustParticles=[];for(let l=0;l<8;l++){const h=new Z(new xe(.1,6,6),new _t({color:9139029,transparent:!0,opacity:0}));h.userData={angle:l/8*Math.PI*2},this.dustParticles.push(h),this.mesh.add(h)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new ii(.5,.5,1.2,8);this.body=new st({mass:0,shape:t,type:st.KINEMATIC,collisionResponse:!1}),this.body.position.set(this.position.x,-1,this.position.z),this.body.addEventListener("collide",e=>{!this.hasHitBall&&this.state==="up"&&e.body.mass>0&&this.hitBall(e.body)}),this.world.addBody(this.body)}hitBall(t){this.hasHitBall=!0;const e=new b((Math.random()-.5)*10,this.bounceForce,-this.bounceForce*.5);t.velocity.copy(e),this.onPopup&&this.onPopup(this,e)}update(t,e){switch(this.animTime+=t,this.state){case"hidden":if(e){const i=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));i<this.triggerRadius&&e.z>this.position.z-2&&(this.state="popping",this.triggerDustEffect()),i<this.triggerRadius*1.5&&(this.plate.position.y=.05+Math.sin(this.animTime*30)*.02*(1-i/(this.triggerRadius*1.5)))}break;case"popping":this.height+=this.popupSpeed*t,this.height>=this.maxHeight&&(this.height=this.maxHeight,this.state="up",this.body.collisionResponse=!0),this.spikeGroup.position.y=-this.maxHeight+this.height,this.body.position.y=this.height*.5;break;case"up":this.spikeGroup.rotation.x=Math.sin(this.animTime*5)*.05,this.spikeGroup.rotation.z=Math.cos(this.animTime*5)*.05;const n=Math.sin(this.animTime*8)*.2+.5;this.spikeBase.material.emissiveIntensity=n,this.animTime>3&&this.hasHitBall&&(this.state="retracting");break;case"retracting":this.height-=this.popupSpeed*.5*t,this.height<=0&&(this.height=0,this.state="hidden",this.hasHitBall=!1,this.animTime=0,this.body.collisionResponse=!1),this.spikeGroup.position.y=-this.maxHeight+this.height,this.body.position.y=this.height*.5-1;break}this.dustParticles.forEach((n,i)=>{if(this.state==="popping"){const s=this.height/this.maxHeight;n.position.x=Math.cos(n.userData.angle)*(.8+s*2),n.position.z=Math.sin(n.userData.angle)*(.8+s*2),n.position.y=.2+s*.5,n.material.opacity=.6*(1-s),n.scale.setScalar(1+s)}else n.material.opacity=0})}triggerDustEffect(){this.dustParticles.forEach(t=>{t.material.opacity=.6,t.scale.setScalar(1)})}reset(){this.state="hidden",this.height=0,this.hasHitBall=!1,this.animTime=0,this.spikeGroup.position.y=-this.maxHeight,this.body.position.y=-1,this.body.collisionResponse=!1}dispose(){this.scene.remove(this.mesh),this.world.removeBody(this.body)}}class jv{constructor(t,e,n,i={}){this.scene=t,this.position={x:e,z:n},this.radius=i.radius||3,this.strength=i.strength||15,this.type=i.type||"pull",this.targetX=i.targetX||e,this.targetZ=i.targetZ||n,this.animTime=0,this.createMesh()}createMesh(){this.mesh=new De;const t=new Cn(.5,this.radius,32),e=new _t({color:this.type==="pull"?16711782:65382,transparent:!0,opacity:.4,side:Xt});this.base=new Z(t,e),this.base.rotation.x=-Math.PI/2,this.base.position.y=.02,this.mesh.add(this.base),this.fieldRings=[];for(let h=0;h<4;h++){const u=new Cn(this.radius*(.2+h*.2),this.radius*(.25+h*.2),32),d=new _t({color:this.type==="pull"?16711782:65382,transparent:!0,opacity:.6-h*.1,side:Xt}),f=new Z(u,d);f.rotation.x=-Math.PI/2,f.position.y=.03+h*.02,f.userData={baseRadius:.2+h*.2},this.fieldRings.push(f),this.mesh.add(f)}const n=new we(.4,.4,.3,16),i=new Wt({color:3355443,roughness:.3,metalness:.9});this.magnet=new Z(n,i),this.magnet.position.y=.15,this.mesh.add(this.magnet);const s=new sn(.4,.35,.2),r=new Wt({color:16711680,emissive:16711680,emissiveIntensity:.3}),a=new Wt({color:255,emissive:255,emissiveIntensity:.3}),c=new Z(s,r);c.position.set(0,.2,.25),this.mesh.add(c);const l=new Z(s,a);l.position.set(0,.2,-.25),this.mesh.add(l),this.createLabel("N",0,.4,.3,16711680),this.createLabel("S",0,.4,-.3,255),this.particles=[];for(let h=0;h<16;h++){const u=new Z(new xe(.06,6,6),new _t({color:this.type==="pull"?16711782:65382,transparent:!0,opacity:.7}));u.userData={angle:h/16*Math.PI*2,radius:this.radius*.3+h%4*this.radius*.2,speed:1+Math.random()*.5},this.particles.push(u),this.mesh.add(u)}this.createWarningSign(),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createLabel(t,e,n,i,s){const r=document.createElement("canvas");r.width=32,r.height=32;const a=r.getContext("2d");a.fillStyle="#ffffff",a.font="bold 24px Arial",a.textAlign="center",a.textBaseline="middle",a.fillText(t,16,16);const c=new bn(r),l=new _t({map:c,transparent:!0,side:Xt}),h=new Z(new Yt(.3,.3),l);h.position.set(e,n,i),this.mesh.add(h)}createWarningSign(){const t=document.createElement("canvas");t.width=128,t.height=64;const e=t.getContext("2d");e.fillStyle=this.type==="pull"?"#ff0066":"#00ff66",e.font="bold 20px Arial",e.textAlign="center",e.fillText(this.type==="pull"?"⚡ MAGNET ⚡":"⚡ REPEL ⚡",64,35);const n=new bn(t),i=new _t({map:n,transparent:!0,side:Xt});this.warning=new Z(new Yt(1.5,.75),i),this.warning.position.y=1.5,this.mesh.add(this.warning)}update(t,e,n){if(this.animTime+=t,this.fieldRings.forEach((i,s)=>{if(this.type==="pull"){const r=1-(this.animTime*2+s*.5)%1*.3;i.scale.setScalar(r),i.material.opacity=(1-(this.animTime*2+s*.5)%1)*.5}else{const r=.7+(this.animTime*2+s*.5)%1*.5;i.scale.setScalar(r),i.material.opacity=(1-(this.animTime*2+s*.5)%1)*.5}}),this.particles.forEach(i=>{if(i.userData.angle+=t*i.userData.speed*(this.type==="pull"?1:-1),this.type==="pull"){const s=(this.animTime*.5+i.userData.radius)%1,r=i.userData.radius*(1-s*.7);i.position.x=Math.cos(i.userData.angle)*r,i.position.z=Math.sin(i.userData.angle)*r,i.position.y=.2+s*.5,i.material.opacity=.7*(1-s)}else{const s=(this.animTime*.5+i.userData.radius)%1,r=i.userData.radius*(.3+s*.7);i.position.x=Math.cos(i.userData.angle)*r,i.position.z=Math.sin(i.userData.angle)*r,i.position.y=.2+(1-s)*.5,i.material.opacity=.7*s}}),this.magnet.rotation.y+=t*2,this.warning.position.y=1.5+Math.sin(this.animTime*3)*.1,this.warning.rotation.y=Math.sin(this.animTime*2)*.2,e&&n){const i=Math.sqrt(Math.pow(this.position.x-e.x,2)+Math.pow(this.position.z-e.z,2));if(i<this.radius&&e.y<2){const s=this.targetX-e.x,r=this.targetZ-e.z,a=this.strength*(1-i/this.radius),c=this.type==="pull"?1:-1;return n.velocity.x+=s*a*t*c*.5,n.velocity.z+=r*a*t*c*.5,this.base.material.opacity=.4+(1-i/this.radius)*.4,{affected:!0,type:this.type}}}return{affected:!1}}reset(){}dispose(){this.scene.remove(this.mesh)}}class $v{constructor(t,e,n,i={}){this.scene=t,this.position={x:e,z:n},this.width=i.width||3,this.length=i.length||6,this.speed=i.speed||8,this.direction=i.direction||1,this.animTime=0,this.createMesh()}createMesh(){this.mesh=new De;const t=new Yt(this.width,this.length),e=new Wt({color:3355443,roughness:.8}),n=new Z(t,e);n.rotation.x=-Math.PI/2,n.position.y=.01,this.mesh.add(n),this.chevrons=[];const i=Math.floor(this.length/.8);for(let x=0;x<i;x++){const g=new De,p=new Cs,v=this.width*.4,y=.3;p.moveTo(0,y),p.lineTo(-v,0),p.lineTo(-v+.1,0),p.lineTo(0,y-.15),p.lineTo(v-.1,0),p.lineTo(v,0),p.closePath();const _=new Ji(p),E=new _t({color:16763904,side:Xt,transparent:!0,opacity:.8}),T=new Z(_,E);T.rotation.x=-Math.PI/2,T.rotation.z=this.direction>0?-Math.PI/2:Math.PI/2,g.add(T),g.position.z=-this.length/2+x*.8,g.userData={baseZ:g.position.z},this.chevrons.push(g),this.mesh.add(g)}const s=new sn(.2,.3,this.length),r=new Wt({color:6710886,roughness:.5,metalness:.5}),a=new Z(s,r);a.position.set(-this.width/2-.1,.15,0),this.mesh.add(a);const c=new Z(s,r);c.position.set(this.width/2+.1,.15,0),this.mesh.add(c);const l=new we(.2,.2,this.width+.4,16),h=new Wt({color:8947848,roughness:.3,metalness:.7});this.frontRoller=new Z(l,h),this.frontRoller.rotation.z=Math.PI/2,this.frontRoller.position.set(0,.2,this.length/2),this.mesh.add(this.frontRoller),this.backRoller=new Z(l,h),this.backRoller.rotation.z=Math.PI/2,this.backRoller.position.set(0,.2,-this.length/2),this.mesh.add(this.backRoller),this.createDirectionArrow(-this.width/2-.3,.5,0),this.createDirectionArrow(this.width/2+.3,.5,0);const u=new Yt(.3,this.length),d=new _t({color:16763904,transparent:!0,opacity:.7}),f=new Z(u,d);f.rotation.x=-Math.PI/2,f.position.set(-this.width/2+.15,.02,0),this.mesh.add(f);const m=new Z(u,d);m.rotation.x=-Math.PI/2,m.position.set(this.width/2-.15,.02,0),this.mesh.add(m),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createDirectionArrow(t,e,n){const i=document.createElement("canvas");i.width=64,i.height=64;const s=i.getContext("2d");s.fillStyle="#ffcc00",s.font="50px Arial",s.textAlign="center",s.textBaseline="middle",s.fillText(this.direction>0?"→":"←",32,32);const r=new bn(i),a=new _t({map:r,transparent:!0,side:Xt}),c=new Z(new Yt(.6,.6),a);c.position.set(t,e,n),c.rotation.y=t>0?-Math.PI/2:Math.PI/2,this.mesh.add(c)}update(t,e,n){if(this.animTime+=t,this.chevrons.forEach(i=>{i.position.x=Math.sin(this.animTime*this.speed*.5)*.1*this.direction,i.children[0].material.opacity=.6+Math.sin(this.animTime*8)*.2}),this.frontRoller.rotation.x+=t*this.speed*this.direction,this.backRoller.rotation.x+=t*this.speed*this.direction,e&&n){const i=this.width/2,s=this.length/2,r=e.x>=this.position.x-i&&e.x<=this.position.x+i,a=e.z>=this.position.z-s&&e.z<=this.position.z+s,c=e.y<1;if(r&&a&&c)return n.velocity.x+=this.speed*this.direction*t*3,{onBelt:!0,direction:this.direction}}return{onBelt:!1}}reset(){}dispose(){this.scene.remove(this.mesh)}}class Jv{constructor(t,e,n,i,s={}){this.scene=t,this.world=e,this.position={x:n,z:i},this.width=s.width||3,this.length=s.length||3,this.collapseDelay=s.collapseDelay||.5,this.onCollapse=s.onCollapse||null,this.state="solid",this.triggerTime=0,this.collapseProgress=0,this.animTime=0,this.createMesh(),this.createBody()}createMesh(){this.mesh=new De,this.tiles=[];const t=3,e=3,n=this.width/t,i=this.length/e;for(let l=0;l<t;l++)for(let h=0;h<e;h++){const u=new sn(n-.05,.15,i-.05),d=new Wt({color:9139029,roughness:.9}),f=new Z(u,d);f.position.set(-this.width/2+n/2+l*n,.075,-this.length/2+i/2+h*i),f.userData={fallDelay:Math.random()*.3,fallSpeed:0,rotationSpeed:new N((Math.random()-.5)*5,(Math.random()-.5)*5,(Math.random()-.5)*5)},f.castShadow=!0,this.tiles.push(f),this.mesh.add(f)}this.cracks=[];const s=new _t({color:0,transparent:!0,opacity:0});for(let l=1;l<t;l++){const h=new Z(new Yt(.05,this.length),s.clone());h.rotation.x=-Math.PI/2,h.position.set(-this.width/2+l*n,.16,0),this.cracks.push(h),this.mesh.add(h)}for(let l=1;l<e;l++){const h=new Z(new Yt(this.width,.05),s.clone());h.rotation.x=-Math.PI/2,h.position.set(0,.16,-this.length/2+l*i),this.cracks.push(h),this.mesh.add(h)}const r=new Yt(this.width+.2,this.length+.2),a=new _t({color:6636321,transparent:!0,opacity:.3}),c=new Z(r,a);c.rotation.x=-Math.PI/2,c.position.y=.005,this.mesh.add(c),this.dustParticles=[];for(let l=0;l<20;l++){const h=new Z(new xe(.1,6,6),new _t({color:9139029,transparent:!0,opacity:0}));h.userData={vx:(Math.random()-.5)*3,vy:Math.random()*2,vz:(Math.random()-.5)*3},this.dustParticles.push(h),this.mesh.add(h)}this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createBody(){const t=new kn(new b(this.width/2,.1,this.length/2));this.body=new st({mass:0,shape:t,position:new b(this.position.x,.05,this.position.z)}),this.world.addBody(this.body)}update(t,e){switch(this.animTime+=t,this.state){case"solid":if(e){const s=Math.abs(e.x-this.position.x)<this.width/2,r=Math.abs(e.z-this.position.z)<this.length/2,a=e.y<1;s&&r&&a&&(this.state="cracking",this.triggerTime=0,this.tiles.forEach(c=>{c.material.color.setHex(7690821)}))}break;case"cracking":this.triggerTime+=t;const n=Math.min(this.triggerTime/this.collapseDelay,1);this.cracks.forEach((s,r)=>{s.material.opacity=n*.8});const i=n*.1;this.tiles.forEach(s=>{s.position.x+=(Math.random()-.5)*i,s.position.z+=(Math.random()-.5)*i,s.rotation.x=(Math.random()-.5)*i*.5,s.rotation.z=(Math.random()-.5)*i*.5}),this.triggerTime>=this.collapseDelay&&(this.state="collapsing",this.collapseProgress=0,this.world.removeBody(this.body),this.dustParticles.forEach(s=>{s.position.set((Math.random()-.5)*this.width,.2,(Math.random()-.5)*this.length),s.material.opacity=.7}),this.onCollapse&&this.onCollapse(this));break;case"collapsing":this.collapseProgress+=t,this.tiles.forEach(s=>{const r=s.userData.fallDelay;this.collapseProgress>r&&(this.collapseProgress-r,s.userData.fallSpeed+=20*t,s.position.y-=s.userData.fallSpeed*t,s.rotation.x+=s.userData.rotationSpeed.x*t,s.rotation.y+=s.userData.rotationSpeed.y*t,s.rotation.z+=s.userData.rotationSpeed.z*t,s.position.y<-3&&(s.material.opacity=Math.max(0,1-(-s.position.y-3)/2),s.material.transparent=!0))}),this.dustParticles.forEach(s=>{s.position.x+=s.userData.vx*t,s.position.y+=s.userData.vy*t,s.position.z+=s.userData.vz*t,s.material.opacity-=t*.5}),this.cracks.forEach(s=>{s.material.opacity-=t}),this.collapseProgress>3&&(this.state="collapsed");break}}reset(){this.state="solid",this.triggerTime=0,this.collapseProgress=0;const t=3,e=3,n=this.width/t,i=this.length/e;let s=0;for(let r=0;r<t;r++)for(let a=0;a<e;a++){const c=this.tiles[s];c.position.set(-this.width/2+n/2+r*n,.075,-this.length/2+i/2+a*i),c.rotation.set(0,0,0),c.material.color.setHex(9139029),c.material.opacity=1,c.material.transparent=!1,c.userData.fallSpeed=0,s++}this.cracks.forEach(r=>{r.material.opacity=0}),this.dustParticles.forEach(r=>{r.material.opacity=0}),this.world.bodies.includes(this.body)||(this.body.position.set(this.position.x,.05,this.position.z),this.world.addBody(this.body))}dispose(){this.scene.remove(this.mesh),this.world.bodies.includes(this.body)&&this.world.removeBody(this.body)}}class Qv{constructor(t,e,n,i={}){this.scene=t,this.position={x:e,z:n},this.width=i.width||6,this.length=i.length||8,this.type=i.type||"speed",this.onEnter=i.onEnter||null,this.onExit=i.onExit||null,this.isActive=!1,this.animTime=0,this.createMesh()}getZoneConfig(){const t={shrink:{color:16738740,secondaryColor:16716947,icon:"🔬",label:"SHRINK ZONE",particleColor:16738740},giant:{color:10181046,secondaryColor:9323693,icon:"🔮",label:"GIANT ZONE",particleColor:10181046},speed:{color:16750592,secondaryColor:16088064,icon:"⚡",label:"SPEED ZONE",particleColor:16771899},slip:{color:240116,secondaryColor:166097,icon:"🧊",label:"SLIP ZONE",particleColor:8508666},chaos:{color:15277667,secondaryColor:12720219,icon:"🌀",label:"CHAOS ZONE",particleColor:16728193},bomb:{color:16733986,secondaryColor:15092249,icon:"💣",label:"DANGER ZONE",particleColor:16740419}};return t[this.type]||t.speed}createMesh(){this.mesh=new De;const t=this.getZoneConfig(),e=new Yt(this.width,this.length),n=new Wt({color:t.color,transparent:!0,opacity:.5,side:Xt}),i=new Z(e,n);i.rotation.x=-Math.PI/2,i.position.y=.02,this.mesh.add(i),this.stripes=[];const s=Math.floor(this.length/1.5);for(let r=0;r<s;r++){const a=new Yt(this.width,.3),c=new _t({color:t.secondaryColor,transparent:!0,opacity:.6}),l=new Z(a,c);l.rotation.x=-Math.PI/2,l.position.y=.03,l.position.z=-this.length/2+r*1.5,l.userData={baseZ:l.position.z},this.stripes.push(l),this.mesh.add(l)}this.createEdgeGlow(t.color),this.createCornerMarkers(t),this.createFloatingLabel(t),this.particles=[],this.createParticles(t.particleColor),this.createWarningPillars(t),this.mesh.position.set(this.position.x,0,this.position.z),this.scene.add(this.mesh)}createEdgeGlow(t){const e=new Yt(this.width+.4,this.length+.4),n=new _t({color:t,transparent:!0,opacity:.3,side:Xt}),i=new Z(e,n);i.rotation.x=-Math.PI/2,i.position.y=.01,this.mesh.add(i);const s=new _t({color:16777215,transparent:!0,opacity:.8});[{x:-this.width/2,z:0,w:.1,l:this.length},{x:this.width/2,z:0,w:.1,l:this.length},{x:0,z:-this.length/2,w:this.width,l:.1},{x:0,z:this.length/2,w:this.width,l:.1}].forEach(a=>{const c=new Yt(a.w,a.l),l=new Z(c,s.clone());l.rotation.x=-Math.PI/2,l.position.set(a.x,.04,a.z),this.mesh.add(l)})}createCornerMarkers(t){[{x:-this.width/2,z:-this.length/2},{x:this.width/2,z:-this.length/2},{x:-this.width/2,z:this.length/2},{x:this.width/2,z:this.length/2}].forEach(n=>{const i=new we(.2,.2,.5,8),s=new Wt({color:t.secondaryColor,emissive:t.secondaryColor,emissiveIntensity:.5}),r=new Z(i,s);r.position.set(n.x,.25,n.z),this.mesh.add(r)})}createFloatingLabel(t){const e=document.createElement("canvas");e.width=256,e.height=128;const n=e.getContext("2d");n.fillStyle="rgba(0, 0, 0, 0.7)",n.roundRect(10,10,236,108,15),n.fill(),n.font="40px Arial",n.textAlign="center",n.fillText(t.icon,128,55),n.font="bold 18px Arial",n.fillStyle="#ffffff",n.fillText(t.label,128,90);const i=new bn(e),s=new _t({map:i,transparent:!0,side:Xt});this.label=new Z(new Yt(3,1.5),s),this.label.position.y=2.5,this.mesh.add(this.label)}createParticles(t){for(let e=0;e<20;e++){const n=new xe(.08,6,6),i=new _t({color:t,transparent:!0,opacity:.7}),s=new Z(n,i);s.userData={baseX:(Math.random()-.5)*this.width,baseZ:(Math.random()-.5)*this.length,phase:Math.random()*Math.PI*2,speed:1+Math.random()},s.position.set(s.userData.baseX,.5+Math.random()*1.5,s.userData.baseZ),this.particles.push(s),this.mesh.add(s)}}createWarningPillars(t){(this.type==="bomb"||this.type==="chaos")&&[{x:-this.width/2-.3,z:0},{x:this.width/2+.3,z:0}].forEach(n=>{const i=new we(.15,.15,2,8),s=new Wt({color:t.secondaryColor,emissive:t.color,emissiveIntensity:.3}),r=new Z(i,s);r.position.set(n.x,1,n.z),this.mesh.add(r);const a=new xe(.2,8,8),c=new _t({color:16711680}),l=new Z(a,c);l.position.set(n.x,2.1,n.z),l.userData={isWarningLight:!0},this.mesh.add(l)})}update(t,e,n){this.animTime+=t;const i=this.type==="speed"?8:this.type==="chaos"?12:4;if(this.stripes.forEach((s,r)=>{s.position.z=s.userData.baseZ+Math.sin(this.animTime*i+r*.5)*.3,s.material.opacity=.4+Math.sin(this.animTime*3+r*.3)*.2}),this.particles.forEach(s=>{const{phase:r,speed:a}=s.userData;s.position.y=.5+Math.sin(this.animTime*a+r)*.8+(this.animTime*.5+r)%2,s.position.x=s.userData.baseX+Math.sin(this.animTime*.5+r)*.3,s.material.opacity=.7-(s.position.y-.5)*.2,s.position.y>2.5&&(s.position.y=.5)}),this.label.position.y=2.5+Math.sin(this.animTime*2)*.2,this.label.rotation.y=Math.sin(this.animTime*.5)*.1,this.mesh.children.forEach(s=>{if(s.userData&&s.userData.isWarningLight){const r=Math.sin(this.animTime*5)>0?1:.3;s.material.opacity=r}}),e&&n){const s=this.isInZone(e);return s&&!this.isActive?(this.isActive=!0,this.onEnter&&this.onEnter(this,n)):!s&&this.isActive&&(this.isActive=!1,this.onExit&&this.onExit(this,n)),{inZone:s,type:this.type}}return{inZone:!1}}isInZone(t){const e=this.width/2,n=this.length/2;return t.x>=this.position.x-e&&t.x<=this.position.x+e&&t.z>=this.position.z-n&&t.z<=this.position.z+n&&t.y<3}reset(){this.isActive=!1}dispose(){this.scene.remove(this.mesh)}}class t_{constructor(t,e,n={}){this.scene=t,this.world=e,this.obstacles=[],this.animatedObstacles=[],this.bonusItems=[],this.specialObstacles=[],this.terrainZones=[],this.width=16,this.length=240,this.pinAreaZ=235,this.groundMaterial=new En("ground"),this.obstacleMaterial=new En("obstacle"),this.onBumperHit=n.onBumperHit||null,this.onCatAttack=n.onCatAttack||null,this.onPitFall=n.onPitFall||null,this.onLaunch=n.onLaunch||null,this.onVortexCapture=n.onVortexCapture||null,this.onVortexRelease=n.onVortexRelease||null,this.onPachinkoHit=n.onPachinkoHit||null,this.onBonusCollect=n.onBonusCollect||null,this.onFakeBonusTrigger=n.onFakeBonusTrigger||null,this.onExplosion=n.onExplosion||null,this.onPopupSpike=n.onPopupSpike||null,this.onCollapsingFloor=n.onCollapsingFloor||null,this.onZoneEnter=n.onZoneEnter||null,this.onZoneExit=n.onZoneExit||null,this.themes=["grass","desert","ice","volcano","space","candy"],this.currentTheme="grass"}generate(t=1){this.dispose(),this.currentTheme=this.themes[(t-1)%this.themes.length],this.createGround(),this.createWalls(),this.generateRandomCourse(t),this.createPinArea()}getThemeColors(){const t={grass:{ground:4881497,accent:3066993,sky:8900331},desert:{ground:12759680,accent:15965202,sky:16767131},ice:{ground:8900331,accent:3447003,sky:13955577},volcano:{ground:4868682,accent:15158332,sky:2889744},space:{ground:1710638,accent:10181046,sky:657941},candy:{ground:16758465,accent:16738740,sky:16770281}};return t[this.currentTheme]||t.grass}createGround(){const t=this.getThemeColors(),e=new Yt(this.width,this.length,1,20),n=new Wt({color:t.ground,roughness:.8});this.groundMesh=new Z(e,n),this.groundMesh.rotation.x=-Math.PI/2,this.groundMesh.position.set(0,0,this.length/2),this.groundMesh.receiveShadow=!0,this.scene.add(this.groundMesh),this.createLaneLines();const i=new kn(new b(this.width/2,.1,this.length/2)),s=new st({mass:0,shape:i,material:this.groundMaterial});s.position.set(0,-.1,this.length/2),this.world.addBody(s),this.obstacles.push({body:s})}createLaneLines(){const t=new _t({color:16777215,transparent:!0,opacity:.3});for(let e=0;e<this.length;e+=4){const n=new Yt(.1,2),i=new Z(n,t);i.rotation.x=-Math.PI/2,i.position.set(0,.02,e+1),this.scene.add(i),this.obstacles.push({mesh:i})}for(let e=20;e<this.length-20;e+=20){const n=new Yt(this.width*.8,.5),i=new Z(n,t);i.rotation.x=-Math.PI/2,i.position.set(0,.02,e),this.scene.add(i),this.obstacles.push({mesh:i})}}createWalls(){const e=new sn(.3,1.5,this.length),n=new Wt({color:4473924,roughness:.6}),i=new Z(e,n);i.position.set(-this.width/2-.15,1.5/2,this.length/2),i.castShadow=!0,this.scene.add(i),this.obstacles.push({mesh:i});const s=i.clone();s.position.x=this.width/2+.15,this.scene.add(s),this.obstacles.push({mesh:s});const r=new kn(new b(.15,1.5/2,this.length/2)),a=new st({mass:0,shape:r,material:this.obstacleMaterial});a.position.set(-this.width/2-.15,1.5/2,this.length/2),this.world.addBody(a),this.obstacles.push({body:a});const c=new st({mass:0,shape:r,material:this.obstacleMaterial});c.position.set(this.width/2+.15,1.5/2,this.length/2),this.world.addBody(c),this.obstacles.push({body:c})}generateRandomCourse(t){const e=t*12345,n=this.seededRandom(e);[{start:10,end:50,name:"warmup"},{start:50,end:100,name:"hazards"},{start:100,end:150,name:"chaos"},{start:150,end:190,name:"gauntlet"},{start:190,end:220,name:"approach"}].forEach(s=>{this.generateSection(s,n,t)}),this.addSpecialEvent(t,n)}generateSection(t,e,n){const{start:i,end:s,name:r}=t,a=this.width;switch(r){case"warmup":if(e()>.4){const c=e()>.5?"ice":"sand";this.createTerrainZone(0,i+5,15,c)}for(let c=0;c<5;c++)if(e()>.3){const l=(e()-.5)*(a-2),h=i+5+e()*20;this.createBumper(l,h)}if(e()>.5&&this.createLaunchPad((e()-.5)*4,i+30),e()>.5&&this.createEffectZone(0,i+20,"speed"),n>=2&&e()>.5){const c=e()>.5?1:-1;this.createConveyorBelt((e()-.5)*4,i+35,c)}n>=2&&e()>.6&&this.createEffectZone((e()-.5)*4,i+38,"giant");break;case"hazards":e()>.3&&this.createPachinkoZone(0,i+5,12);for(let c=0;c<3;c++)if(e()>.3){const l=(e()-.5)*(a-4);this.createRotatingBar(l,i+15+c*10)}for(let c=0;c<6;c++)if(e()>.3){const l=(e()-.5)*(a-2),h=i+e()*(s-i);this.createRock(l,h)}if(n>=2){for(let c=0;c<2;c++)if(e()>.4){const l=(e()-.5)*(a-4),h=i+20+e()*20;if(this.createPit(l,h),n>=3&&e()>.5){const u=l+(e()-.5)*4;this.createMagnetZone(u,h-5,"pull",l,h)}}}if(n>=2){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-3),h=i+10+e()*30;this.createExplosiveBarrel(l,h)}}if(n>=3){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-4),h=i+25+e()*15;this.createPopupSpike(l,h)}}n>=2&&e()>.5&&this.createEffectZone((e()-.5)*4,i+35,"slip"),n>=3&&e()>.5&&this.createEffectZone((e()-.5)*4,i+42,"shrink");break;case"chaos":for(let c=0;c<8;c++){const l=(e()-.5)*(a-2),h=i+5+c*5;this.createBumper(l,h)}if(n>=3&&e()>.3){const c=(e()-.5)*6,l=i+15+e()*15;this.createVortex(c,l)}if(n>=4&&e()>.3){const c=(e()-.5)*6,l=i+25+e()*10;this.createCat(c,l)}e()>.4&&this.createCliffPath(i+35,12);for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-4),h=i+10+e()*30;this.createLaunchPad(l,h)}if(n>=4){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-5),h=i+20+e()*20;this.createCollapsingFloor(l,h)}}if(n>=3){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*4,h=i+15+e()*25,u=e()>.5?1:-1;this.createConveyorBelt(l,h,u)}}if(n>=5&&e()>.4){const c=e()>.5?1:-1;this.createMagnetZone(0,i+30,"push",c*8,i+30)}n>=4&&e()>.4&&this.createEffectZone(0,i+40,"chaos"),e()>.5&&this.createEffectZone((e()-.5)*4,i+8,"speed");break;case"gauntlet":for(let c=0;c<3;c++)this.createPiston(-a/2+1,i+5+c*12),this.createPiston(a/2-1,i+11+c*12);e()>.4&&this.createWindZone(0,i+20,15);for(let c=0;c<4;c++)if(e()>.3){const l=(e()-.5)*(a-4);this.createRotatingBar(l,i+5+c*8)}for(let c=0;c<3;c++)if(e()>.4){const l=(e()-.5)*(a-4),h=i+10+e()*25;this.createPit(l,h),n>=4&&e()>.4&&this.createMagnetZone(l,h-6,"pull",l,h)}e()>.4&&this.createVortex((e()-.5)*6,i+30);for(let c=0;c<3;c++)if(e()>.4){const l=(e()-.5)*(a-4),h=i+8+e()*25;this.createExplosiveBarrel(l,h)}for(let c=0;c<3;c++)if(e()>.5){const l=(e()-.5)*(a-3),h=i+15+e()*20;this.createPopupSpike(l,h)}if(n>=5){for(let c=0;c<2;c++)if(e()>.5){const l=(e()-.5)*(a-5),h=i+12+e()*20;this.createCollapsingFloor(l,h)}}n>=5&&e()>.4&&this.createEffectZone((e()-.5)*4,i+28,"bomb"),n>=3&&e()>.5&&this.createEffectZone((e()-.5)*4,i+35,"slip");break;case"approach":for(let c=0;c<4;c++)this.createBumper(-3+c*2,i+5),this.createBumper(-3+c*2,i+12);if(this.createBonus((e()-.5)*6,i+e()*10,"speed"),this.createBonus((e()-.5)*6,i+15+e()*5,"giant"),n>=3&&e()>.4){const c=e()>.5?1:-1;this.createConveyorBelt(0,i+18,c)}n>=6&&e()>.5&&this.createPopupSpike((e()-.5)*4,i+22);break}for(let c=0;c<2;c++)if(e()>.4){const l=["speed","shield","giant"],h=l[Math.floor(e()*l.length)];this.createBonus((e()-.5)*(a-2),i+e()*(s-i),h)}if(n>=3)for(let c=0;c<2;c++)e()>.5&&this.createFakeBonus((e()-.5)*(a-2),i+e()*(s-i))}addSpecialEvent(t,e){t===1?this.createArrowGuide(0,15):t===5?this.createBossBumperFormation(60):t===10&&this.createChaosZone(50,30)}createArrowGuide(t,e){const n=new Cs;n.moveTo(0,1),n.lineTo(-.5,0),n.lineTo(-.2,0),n.lineTo(-.2,-1),n.lineTo(.2,-1),n.lineTo(.2,0),n.lineTo(.5,0),n.closePath();const i=new Ji(n),s=new _t({color:65280,transparent:!0,opacity:.5,side:Xt}),r=new Z(i,s);r.rotation.x=-Math.PI/2,r.position.set(t,.05,e),this.scene.add(r),this.obstacles.push({mesh:r})}createBossBumperFormation(t){[{x:0,z:t},{x:-1.5,z:t+3},{x:1.5,z:t+3},{x:-3,z:t+6},{x:0,z:t+6},{x:3,z:t+6},{x:-1.5,z:t+9},{x:1.5,z:t+9},{x:0,z:t+12}].forEach(n=>{this.createBumper(n.x,n.z,{color:16711680})})}createChaosZone(t,e){for(let n=0;n<15;n++){const i=(Math.random()-.5)*6,s=t+Math.random()*e,r=Math.random();r<.3?this.createBumper(i,s):r<.5?this.createRock(i,s):r<.7&&this.createRotatingBar(i,s)}this.createCat(-2,t+10),this.createCat(2,t+20),this.createVortex(0,t+15),this.createPit(-3,t+25),this.createPit(3,t+25),this.createLaunchPad(-4,t+5),this.createLaunchPad(4,t+5),this.createExplosiveBarrel(-5,t+8),this.createExplosiveBarrel(5,t+12),this.createExplosiveBarrel(0,t+22),this.createPopupSpike(-2,t+18),this.createPopupSpike(2,t+28),this.createPopupSpike(0,t+5),this.createMagnetZone(-3,t+20,"pull",-3,t+25),this.createMagnetZone(3,t+20,"pull",3,t+25),this.createConveyorBelt(-4,t+15,-1),this.createConveyorBelt(4,t+15,1),this.createCollapsingFloor(-2,t+12),this.createCollapsingFloor(2,t+8),this.createFakeBonus(-1,t+7),this.createFakeBonus(1,t+17),this.createBonus(0,t+3,"speed"),this.createBonus(-3,t+27,"giant")}createTerrainZone(t,e,n,i){let s,r;switch(i){case"ice":s=8900331,r=.05;break;case"sand":s=12759680,r=.8;break;case"mud":s=6636321,r=.9;break;default:s=4881497,r=.3}const a=new Yt(this.width,n),c=new Wt({color:s,roughness:i==="ice"?.1:.9,transparent:!0,opacity:.8}),l=new Z(a,c);l.rotation.x=-Math.PI/2,l.position.set(t,.01,e+n/2),l.receiveShadow=!0,this.scene.add(l);const h={type:i,friction:r,startZ:e,endZ:e+n,x:t,width:this.width};this.terrainZones.push(h),this.obstacles.push({mesh:l,zoneData:h,isTerrainZone:!0})}createWindZone(t,e,n){const i=new Yt(this.width,n),s=new Wt({color:11393254,transparent:!0,opacity:.3}),r=new Z(i,s);r.rotation.x=-Math.PI/2,r.position.set(t,.01,e+n/2),this.scene.add(r);const a=new Pe,c=50,l=new Float32Array(c*3);for(let m=0;m<c;m++)l[m*3]=(Math.random()-.5)*this.width,l[m*3+1]=Math.random()*2,l[m*3+2]=e+Math.random()*n;a.setAttribute("position",new dn(l,3));const h=new Gl({color:16777215,size:.1,transparent:!0,opacity:.5}),u=new Ru(a,h);this.scene.add(u);const d=Math.random()>.5?1:-1,f={type:"wind",startZ:e,endZ:e+n,windForce:{x:d*5,z:0},particles:u};this.terrainZones.push(f),this.obstacles.push({mesh:r,particles:u,zoneData:f,isTerrainZone:!0})}createCliffPath(t,e){const i=new Yt((this.width-3)/2,e),s=new Wt({color:1710638,roughness:1}),r=new Z(i,s);r.rotation.x=-Math.PI/2,r.position.set(-(this.width/4+3/4),-.5,t+e/2),this.scene.add(r),this.obstacles.push({mesh:r});const a=r.clone();a.position.x=this.width/4+3/4,this.scene.add(a),this.obstacles.push({mesh:a}),this.createDangerSign(-2.5,t),this.createDangerSign(2.5,t);const c=new kn(new b((this.width-3)/4,5,e/2)),l=new st({mass:0,shape:c});l.position.set(-(this.width/4+3/4),-2.5,t+e/2),l.userData={type:"killzone"},this.world.addBody(l),this.obstacles.push({body:l});const h=new st({mass:0,shape:c});h.position.set(this.width/4+3/4,-2.5,t+e/2),h.userData={type:"killzone"},this.world.addBody(h),this.obstacles.push({body:h}),this.terrainZones.push({type:"cliff",startZ:t,endZ:t+e,pathWidth:3})}createDangerSign(t,e){const n=new Yt(.6,.6),i=document.createElement("canvas");i.width=64,i.height=64;const s=i.getContext("2d");s.fillStyle="#ffcc00",s.beginPath(),s.moveTo(32,5),s.lineTo(59,55),s.lineTo(5,55),s.closePath(),s.fill(),s.fillStyle="#000",s.font="bold 30px Arial",s.fillText("!",25,48);const r=new bn(i),a=new _t({map:r,transparent:!0,side:Xt}),c=new Z(n,a);c.position.set(t,1.5,e),c.rotation.y=Math.PI/4,this.scene.add(c),this.obstacles.push({mesh:c})}createRock(t,e){const n=.5+Math.random()*.3,i=new Ta(n,1),s=new Wt({color:6710886,roughness:.9}),r=new Z(i,s);r.position.set(t,n,e),r.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),r.castShadow=!0,this.scene.add(r);const a=new Es(n),c=new st({mass:0,shape:a,material:this.obstacleMaterial});c.position.set(t,n,e),this.world.addBody(c),this.obstacles.push({mesh:r,body:c})}createRotatingBar(t,e){const r=new sn(4,.8,.3),a=new Wt({color:15158332,roughness:.5}),c=new Z(r,a);c.position.set(t,.8/2+.1,e),c.castShadow=!0,this.scene.add(c);const l=new kn(new b(4/2,.8/2,.3/2)),h=new st({mass:0,shape:l,type:st.KINEMATIC});h.position.set(t,.8/2+.1,e),this.world.addBody(h),this.animatedObstacles.push({mesh:c,body:h,type:"rotating",speed:1.5+Math.random(),centerX:t,centerZ:e}),this.obstacles.push({mesh:c,body:h})}createPachinkoZone(t,e,n){const s=Math.floor(n/1.5),r=4,a=1.8;for(let u=0;u<s;u++){const d=u%2===0?0:a*.5,f=Math.floor(Math.random()*r);for(let m=0;m<r;m++){if(m===f)continue;const x=t-(r-1)*a/2+m*a+d,g=e+u*1.5,p=new we(.1,.1,.8,12),v=new Wt({color:15965202,roughness:.2,metalness:.7,emissive:15965202,emissiveIntensity:.2}),y=new Z(p,v);y.position.set(x,.4,g),y.castShadow=!0,this.scene.add(y);const _=new ii(.1,.1,.8,8),E=new st({mass:0,shape:_,material:new En({friction:.05,restitution:1.2})});E.position.set(x,.4,g),E.userData={type:"pachinko"},E.addEventListener("collide",()=>{this.onPachinkoHit&&this.onPachinkoHit({x,z:g}),y.material.emissiveIntensity=1,setTimeout(()=>{y.material.emissiveIntensity=.2},100)}),this.world.addBody(E),this.obstacles.push({mesh:y,body:E,isPachinko:!0})}}const c=new Yt(r*a+2,n),l=new Wt({color:2899536,roughness:.9,transparent:!0,opacity:.5}),h=new Z(c,l);h.rotation.x=-Math.PI/2,h.position.set(t,.01,e+n/2),this.scene.add(h),this.obstacles.push({mesh:h})}createBumper(t,e,n={}){const i=new Vv(this.scene,this.world,t,e,{...n,onHit:s=>{this.onBumperHit&&this.onBumperHit(s)}});this.specialObstacles.push(i)}createPiston(t,e){const r=new sn(1,.8,.5),a=new Wt({color:3447003,roughness:.4,metalness:.6}),c=new Z(r,a),l=t>0?this.width/2+1/2:-this.width/2-1/2;c.position.set(l,.8/2,e),c.castShadow=!0,this.scene.add(c);const h=new kn(new b(1/2,.8/2,.5/2)),u=new st({mass:0,shape:h,type:st.KINEMATIC});u.position.set(l,.8/2,e),this.world.addBody(u),this.animatedObstacles.push({mesh:c,body:u,type:"piston",startX:l,targetX:t>0?1.5:-1.5,direction:t>0?-1:1,speed:3+Math.random()*2,timer:Math.random()*2}),this.obstacles.push({mesh:c,body:u})}createCat(t,e){const n=new Hv(this.scene,this.world,t,e,{onAttack:i=>{this.onCatAttack&&this.onCatAttack(i)}});this.specialObstacles.push(n)}createPit(t,e){const n=new Wv(this.scene,this.world,t,e,{onFall:i=>{this.onPitFall&&this.onPitFall(i)}});this.specialObstacles.push(n)}createLaunchPad(t,e){const n=new qv(this.scene,this.world,t,e,{onLaunch:(i,s)=>{this.onLaunch&&this.onLaunch(i,s)}});this.specialObstacles.push(n)}createVortex(t,e){const n=new Xv(this.scene,this.world,t,e,{onCapture:i=>{this.onVortexCapture&&this.onVortexCapture(i)},onRelease:(i,s)=>{this.onVortexRelease&&this.onVortexRelease(i,s)}});this.specialObstacles.push(n)}createFakeBonus(t,e){const n=new Yv(this.scene,this.world,t,e,{onTrigger:(i,s)=>{this.onFakeBonusTrigger&&this.onFakeBonusTrigger(i,s)}});this.specialObstacles.push(n)}createExplosiveBarrel(t,e){const n=new Zv(this.scene,this.world,t,e,{onExplode:(i,s)=>{this.onExplosion&&this.onExplosion(i,s)}});this.specialObstacles.push(n)}createPopupSpike(t,e){const n=new Kv(this.scene,this.world,t,e,{onPopup:(i,s)=>{this.onPopupSpike&&this.onPopupSpike(i,s)}});this.specialObstacles.push(n)}createMagnetZone(t,e,n="pull",i=null,s=null){const r=new jv(this.scene,t,e,{type:n,targetX:i||t,targetZ:s||e});this.specialObstacles.push(r)}createConveyorBelt(t,e,n=1){const i=new $v(this.scene,t,e,{direction:n});this.specialObstacles.push(i)}createCollapsingFloor(t,e){const n=new Jv(this.scene,this.world,t,e,{onCollapse:i=>{this.onCollapsingFloor&&this.onCollapsingFloor(i)}});this.specialObstacles.push(n)}createEffectZone(t,e,n){const i=new Qv(this.scene,t,e,{type:n,onEnter:(s,r)=>{this.onZoneEnter&&this.onZoneEnter(s,n,r)},onExit:(s,r)=>{this.onZoneExit&&this.onZoneExit(s,n,r)}});this.specialObstacles.push(i)}createBonus(t,e,n){let s;switch(n){case"speed":s=15965202;break;case"shield":s=3447003;break;case"giant":s=10181046;break;default:s=3066993}const r=new Mr(.4),a=new Wt({color:s,emissive:s,emissiveIntensity:.5,roughness:.2,metalness:.8}),c=new Z(r,a);c.position.set(t,1,e),c.castShadow=!0,this.scene.add(c);const l=new Es(.4*1.5),h=new st({mass:0,shape:l,collisionResponse:!1});h.position.set(t,1,e),h.userData={type:"bonus",bonusType:n},this.world.addBody(h),this.bonusItems.push({mesh:c,body:h,type:n,collected:!1})}createPinArea(){const t=new Yt(6,10),e=new Wt({color:13935988,roughness:.6}),n=new Z(t,e);n.rotation.x=-Math.PI/2,n.position.set(0,.02,this.pinAreaZ),n.receiveShadow=!0,this.scene.add(n),this.obstacles.push({mesh:n})}update(t,e,n){return this.animatedObstacles.forEach(i=>{if(i.type==="rotating"){const s=i.speed*t;i.mesh.rotation.y+=s,i.body.quaternion.setFromAxisAngle(new b(0,1,0),i.mesh.rotation.y)}if(i.type==="piston"){i.timer+=t;const s=Math.sin(i.timer*i.speed),r=Math.abs(i.targetX-i.startX),a=i.startX+(s+1)*.5*r*i.direction;i.mesh.position.x=a,i.body.position.x=a}}),this.specialObstacles.forEach(i=>{i.update&&i.update(t,e,n)}),this.bonusItems.forEach(i=>{i.collected||(i.mesh.rotation.y+=t*2,i.mesh.position.y=1+Math.sin(Date.now()*.003)*.2)}),this.terrainZones.forEach(i=>{if(i.type==="wind"&&i.particles){const s=i.particles.geometry.attributes.position.array;for(let r=0;r<s.length;r+=3)s[r]+=i.windForce.x*t,s[r]>this.width/2&&(s[r]=-this.width/2),s[r]<-this.width/2&&(s[r]=this.width/2);i.particles.geometry.attributes.position.needsUpdate=!0}}),e?this.checkTerrainEffects(e):null}checkTerrainEffects(t){for(const e of this.terrainZones)if(t.z>=e.startZ&&t.z<=e.endZ){if(e.type==="ice")return{type:"friction",value:.1};if(e.type==="sand"||e.type==="mud")return{type:"friction",value:.8};if(e.type==="wind")return{type:"wind",force:e.windForce}}return null}collectBonus(t){const e=this.bonusItems.find(n=>n.type===t&&!n.collected);return e?(e.collected=!0,this.scene.remove(e.mesh),this.world.removeBody(e.body),this.onBonusCollect&&this.onBonusCollect(t),!0):!1}resetSpecialObstacles(){this.specialObstacles.forEach(t=>{t.reset&&t.reset()})}seededRandom(t){let e=t;return function(){return e=Math.sin(e)*1e4,e-Math.floor(e)}}getPinAreaZ(){return this.pinAreaZ}dispose(){this.obstacles.forEach(t=>{t.mesh&&this.scene.remove(t.mesh),t.body&&this.world.removeBody(t.body),t.particles&&this.scene.remove(t.particles)}),this.animatedObstacles.forEach(t=>{t.mesh&&this.scene.remove(t.mesh),t.body&&this.world.removeBody(t.body)}),this.specialObstacles.forEach(t=>{t.dispose&&t.dispose()}),this.bonusItems.forEach(t=>{this.scene.remove(t.mesh),this.world.removeBody(t.body)}),this.obstacles=[],this.animatedObstacles=[],this.specialObstacles=[],this.bonusItems=[],this.terrainZones=[]}}class e_{constructor(){this.tilt={alpha:0,beta:0,gamma:0},this.calibration={beta:0,gamma:0},this.isEnabled=!1,this.isCalibrated=!1,this.hasGyroData=!1,this.isReversed=!1,this.isChaos=!1,this.chaosOffset={beta:0,gamma:0},this.chaosTimer=null,this.smoothing=.3,this.smoothedTilt={beta:0,gamma:0},this.handleOrientation=this.handleOrientation.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.keyboardState={ArrowUp:!1,ArrowDown:!1,ArrowLeft:!1,ArrowRight:!1}}enable(){this.isEnabled||(this.isEnabled=!0,console.log("TiltControl enabled"),window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),setTimeout(()=>{this.hasGyroData&&(this.calibrate(),console.log("Gyro calibrated"))},1e3))}disable(){this.isEnabled=!1,window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp)}handleOrientation(t){this.isEnabled&&t.beta!==null&&t.gamma!==null&&(this.hasGyroData=!0,this.tilt.alpha=t.alpha||0,this.tilt.beta=t.beta||0,this.tilt.gamma=t.gamma||0,this.isCalibrated&&(this.tilt.beta-=this.calibration.beta,this.tilt.gamma-=this.calibration.gamma),this.tilt.beta=Math.max(-90,Math.min(90,this.tilt.beta)),this.tilt.gamma=Math.max(-90,Math.min(90,this.tilt.gamma)),this.smoothedTilt.beta+=(this.tilt.beta-this.smoothedTilt.beta)*this.smoothing,this.smoothedTilt.gamma+=(this.tilt.gamma-this.smoothedTilt.gamma)*this.smoothing)}handleKeyDown(t){this.keyboardState.hasOwnProperty(t.key)&&(this.keyboardState[t.key]=!0,t.preventDefault())}handleKeyUp(t){this.keyboardState.hasOwnProperty(t.key)&&(this.keyboardState[t.key]=!1,t.preventDefault())}calibrate(){this.calibration.beta=this.tilt.beta,this.calibration.gamma=this.tilt.gamma,this.isCalibrated=!0}getTilt(){const t={beta:0,gamma:0};this.keyboardState.ArrowUp&&(t.beta+=30),this.keyboardState.ArrowDown&&(t.beta-=30),this.keyboardState.ArrowLeft&&(t.gamma-=30),this.keyboardState.ArrowRight&&(t.gamma+=30);let e;return t.beta!==0||t.gamma!==0?e=t:e={beta:this.smoothedTilt.beta,gamma:this.smoothedTilt.gamma},this.isReversed&&(e.gamma=-e.gamma),this.isChaos&&(e.beta+=this.chaosOffset.beta,e.gamma+=this.chaosOffset.gamma),e}setReversed(t){this.isReversed=t}setChaos(t){this.isChaos=t,t?(this.updateChaosOffset(),this.chaosTimer=setInterval(()=>{this.updateChaosOffset()},200)):(this.chaosTimer&&(clearInterval(this.chaosTimer),this.chaosTimer=null),this.chaosOffset={beta:0,gamma:0})}updateChaosOffset(){this.chaosOffset={beta:(Math.random()-.5)*40,gamma:(Math.random()-.5)*50}}hasGyro(){return this.hasGyroData}}class n_{constructor(){this.frames=[],this.reset()}reset(){this.frames=[];for(let t=0;t<10;t++)this.frames.push({throw1:null,throw2:null,throw3:null,score:null,cumulative:null,isStrike:!1,isSpare:!1})}recordThrow(t,e,n){const i=t-1,s=this.frames[i];t===10?e===1?(s.throw1=n,s.isStrike=n===10):e===2?(s.throw2=n,s.isStrike||(s.isSpare=s.throw1+n===10)):e===3&&(s.throw3=n):e===1?(s.throw1=n,s.isStrike=n===10):(s.throw2=n,s.isSpare=s.throw1+n===10),this.calculateScores()}calculateScores(){let t=0;for(let e=0;e<10;e++){const n=this.frames[e];if(n.throw1===null){n.score=null,n.cumulative=null;continue}if(e===9){if(n.throw1===null)continue;n.isStrike?n.throw2!==null&&n.throw3!==null&&(n.score=n.throw1+n.throw2+n.throw3):n.isSpare?n.throw3!==null&&(n.score=n.throw1+n.throw2+n.throw3):n.throw2!==null&&(n.score=n.throw1+n.throw2)}else if(n.isStrike){const i=this.getNextTwoThrows(e);i.length===2&&(n.score=10+i[0]+i[1])}else if(n.isSpare){const i=this.getNextThrow(e);i!==null&&(n.score=10+i)}else n.throw2!==null&&(n.score=n.throw1+n.throw2);n.score!==null&&(t+=n.score,n.cumulative=t)}}getNextThrow(t){const e=this.frames[t+1];return!e||e.throw1===null?null:e.throw1}getNextTwoThrows(t){const e=[];let n=t+1,i=0;for(;e.length<2&&n<10;){const s=this.frames[n];if(!s)break;if(i===0){if(s.throw1===null)break;if(e.push(s.throw1),i++,s.isStrike&&n<9){n++,i=0;continue}}if(i===1&&e.length<2){if(s.throw2===null)break;e.push(s.throw2)}break}if(n===9&&e.length<2){const s=this.frames[9];s.throw1!==null&&e.length===0&&e.push(s.throw1),s.throw2!==null&&e.length===1&&e.push(s.throw2)}return e}getTotalScore(){let t=0;for(const e of this.frames)e.score!==null?t+=e.score:e.throw1!==null&&(t+=e.throw1,e.throw2!==null&&(t+=e.throw2),e.throw3!==null&&(t+=e.throw3));return t}getFrameTotal(t){const e=this.frames[t-1];if(!e)return 0;let n=e.throw1||0;return e.throw2!==null&&(n+=e.throw2),n}isFrameComplete(t){const e=this.frames[t-1];return e?t===10?e.isStrike||e.isSpare?e.throw3!==null:e.throw2!==null:e.isStrike||e.throw2!==null:!1}getFrameData(){return this.frames}}class i_{constructor(t){this.scene=t,this.particles=[],this.emitters=[]}createStrikeEffect(t){const e=[15965202,15158332,3066993,3447003,10181046,16777215],n=100;for(let i=0;i<n;i++){const s=new Yt(.15,.3),r=new _t({color:e[Math.floor(Math.random()*e.length)],side:Xt,transparent:!0}),a=new Z(s,r);a.position.set(t.x+(Math.random()-.5)*2,t.y+Math.random()*3,t.z+(Math.random()-.5)*2),a.velocity=new N((Math.random()-.5)*15,Math.random()*20+10,(Math.random()-.5)*15),a.rotationSpeed=new N(Math.random()*10,Math.random()*10,Math.random()*10),a.life=3,a.maxLife=3,this.scene.add(a),this.particles.push(a)}}createSpareEffect(t){for(let n=0;n<50;n++){const i=new xe(.08,8,8),s=new _t({color:3066993,transparent:!0}),r=new Z(i,s),a=n/50*Math.PI*2,c=2+Math.random()*2;r.position.set(t.x+Math.cos(a)*c,t.y+1,t.z+Math.sin(a)*c),r.velocity=new N(Math.cos(a)*5,Math.random()*10+5,Math.sin(a)*5),r.life=2,r.maxLife=2,this.scene.add(r),this.particles.push(r)}}createGutterEffect(t){for(let n=0;n<30;n++){const i=new xe(.05,6,6),s=new _t({color:3447003,transparent:!0}),r=new Z(i,s);r.position.set(t.x+(Math.random()-.5)*4,t.y+8+Math.random()*2,t.z+(Math.random()-.5)*4),r.velocity=new N(0,-10,0),r.life=2,r.maxLife=2,this.scene.add(r),this.particles.push(r)}}createExplosionEffect(t,e=16737792){for(let i=0;i<40;i++){const s=new xe(.1+Math.random()*.1,8,8),r=new _t({color:e,transparent:!0}),a=new Z(s,r);a.position.copy(t);const c=Math.random()*Math.PI*2,l=Math.random()*Math.PI,h=10+Math.random()*10;a.velocity=new N(Math.sin(l)*Math.cos(c)*h,Math.sin(l)*Math.sin(c)*h,Math.cos(l)*h),a.life=1.5,a.maxLife=1.5,this.scene.add(a),this.particles.push(a)}}createBounceEffect(t){for(let n=0;n<15;n++){const i=new Cn(.1,.15,8),s=new _t({color:16776960,side:Xt,transparent:!0}),r=new Z(i,s);r.position.copy(t),r.rotation.x=-Math.PI/2,r.scale.set(.1,.1,.1),r.targetScale=3+Math.random()*2,r.velocity=new N(0,.5,0),r.life=.5,r.maxLife=.5,r.isRing=!0,this.scene.add(r),this.particles.push(r)}}createLaunchEffect(t){for(let n=0;n<25;n++){const i=new yi(.1,.3,6),s=new _t({color:n%2===0?3447003:65280,transparent:!0}),r=new Z(i,s),a=n/25*Math.PI*2,c=.5+Math.random()*.5;r.position.set(t.x+Math.cos(a)*c,t.y+.3,t.z+Math.sin(a)*c),r.rotation.x=Math.PI,r.velocity=new N(Math.cos(a)*3,Math.random()*8+12,Math.sin(a)*3),r.rotationSpeed=new N(Math.random()*5,Math.random()*5,Math.random()*5),r.life=1.5,r.maxLife=1.5,this.scene.add(r),this.particles.push(r)}}createVortexEffect(t){for(let n=0;n<30;n++){const i=new xe(.08,8,8),s=new _t({color:10181046,transparent:!0}),r=new Z(i,s),a=n/30*Math.PI*4,c=.5+n/30*2;r.position.set(t.x+Math.cos(a)*c,t.y+.5+n/30*2,t.z+Math.sin(a)*c),r.velocity=new N(Math.cos(a+Math.PI/2)*8,5+Math.random()*3,Math.sin(a+Math.PI/2)*8),r.life=1.2,r.maxLife=1.2,this.scene.add(r),this.particles.push(r)}}createTrapEffect(t){const n=[16711782,16711935,0];for(let i=0;i<25;i++){const s=new Ra(.15),r=new _t({color:n[Math.floor(Math.random()*n.length)],transparent:!0}),a=new Z(s,r);a.position.copy(t);const c=i/25*Math.PI*2,l=8+Math.random()*5;a.velocity=new N(Math.cos(c)*l,Math.random()*8+3,Math.sin(c)*l),a.rotationSpeed=new N(Math.random()*10,Math.random()*10,Math.random()*10),a.life=1.5,a.maxLife=1.5,this.scene.add(a),this.particles.push(a)}}createSpikeEffect(t){for(let n=0;n<20;n++){const i=new yi(.08,.2,4),s=new _t({color:11184810,transparent:!0}),r=new Z(i,s);r.position.set(t.x+(Math.random()-.5)*2,t.y+.5,t.z+(Math.random()-.5)*2),r.velocity=new N((Math.random()-.5)*8,Math.random()*15+8,(Math.random()-.5)*8),r.rotationSpeed=new N(Math.random()*15,Math.random()*15,Math.random()*15),r.life=1.2,r.maxLife=1.2,this.scene.add(r),this.particles.push(r)}for(let n=0;n<8;n++){const i=new ei(.3,8),s=new _t({color:9139029,transparent:!0,side:Xt}),r=new Z(i,s);r.position.set(t.x,.1,t.z),r.rotation.x=-Math.PI/2,r.scale.set(.1,.1,.1),r.targetScale=3+Math.random()*2,r.velocity=new N(0,.2,0),r.life=.8,r.maxLife=.8,r.isRing=!0,this.scene.add(r),this.particles.push(r)}}createCollapseEffect(t){for(let n=0;n<35;n++){const i=new xe(.1+Math.random()*.15,6,6),s=new _t({color:9139029,transparent:!0}),r=new Z(i,s);r.position.set(t.x+(Math.random()-.5)*3,t.y+Math.random()*.5,t.z+(Math.random()-.5)*3),r.velocity=new N((Math.random()-.5)*5,Math.random()*6+2,(Math.random()-.5)*5),r.life=2,r.maxLife=2,this.scene.add(r),this.particles.push(r)}for(let n=0;n<15;n++){const i=new sn(.2,.2,.2),s=new _t({color:6636321,transparent:!0}),r=new Z(i,s);r.position.set(t.x+(Math.random()-.5)*2,t.y+.3,t.z+(Math.random()-.5)*2),r.velocity=new N((Math.random()-.5)*4,-Math.random()*5-5,(Math.random()-.5)*4),r.rotationSpeed=new N(Math.random()*8,Math.random()*8,Math.random()*8),r.life=2,r.maxLife=2,this.scene.add(r),this.particles.push(r)}}createPawPrintEffect(t){const e=new ei(.15,16),n=new _t({color:9127187,transparent:!0,opacity:.8}),i=new Z(e,n);i.position.set(t.x,.01,t.z),i.rotation.x=-Math.PI/2,i.life=3,i.maxLife=3,i.isStatic=!0,this.scene.add(i),this.particles.push(i);const s=new ei(.08,16);[{x:-.12,z:-.2},{x:.12,z:-.2},{x:-.18,z:-.08},{x:.18,z:-.08}].forEach(a=>{const c=new Z(s,n.clone());c.position.set(t.x+a.x,.01,t.z+a.z),c.rotation.x=-Math.PI/2,c.life=3,c.maxLife=3,c.isStatic=!0,this.scene.add(c),this.particles.push(c)})}update(t){for(let n=this.particles.length-1;n>=0;n--){const i=this.particles[n];if(i.life-=t,i.life<=0){this.scene.remove(i),this.particles.splice(n,1);continue}const s=i.life/i.maxLife;if(i.material&&(i.material.opacity=s),!i.isStatic)if(i.isRing){const r=i.targetScale*(1-s);i.scale.set(r,r,r),i.position.y+=i.velocity.y*t}else i.velocity.y+=-30*t,i.position.x+=i.velocity.x*t,i.position.y+=i.velocity.y*t,i.position.z+=i.velocity.z*t,i.rotationSpeed&&(i.rotation.x+=i.rotationSpeed.x*t,i.rotation.y+=i.rotationSpeed.y*t,i.rotation.z+=i.rotationSpeed.z*t)}}clear(){this.particles.forEach(t=>this.scene.remove(t)),this.particles=[]}}class s_{constructor(){this.audioContext=null,this.masterGain=null,this.enabled=!0,this.initialized=!1}async init(){if(!this.initialized)try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.masterGain=this.audioContext.createGain(),this.masterGain.connect(this.audioContext.destination),this.masterGain.gain.value=.5,this.initialized=!0}catch{console.warn("Web Audio API not supported"),this.enabled=!1}}resume(){this.audioContext&&this.audioContext.state==="suspended"&&this.audioContext.resume()}playTone(t,e,n="sine",i=.3){if(!this.enabled||!this.audioContext)return;const s=this.audioContext.createOscillator(),r=this.audioContext.createGain();s.connect(r),r.connect(this.masterGain),s.frequency.value=t,s.type=n,r.gain.setValueAtTime(i,this.audioContext.currentTime),r.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+e),s.start(),s.stop(this.audioContext.currentTime+e)}playStrike(){if(!this.enabled)return;[523.25,659.25,783.99,1046.5].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.3,"square",.2),this.playTone(e*1.5,.3,"triangle",.1)},n*100)}),setTimeout(()=>this.playNoise(.5,.3),300)}playSpare(){if(!this.enabled)return;[392,493.88,587.33].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.2,"triangle",.25)},n*80)})}playGutter(){if(!this.enabled)return;[392,349.23,311.13,277.18].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.4,"sawtooth",.15)},n*200)})}playPinHit(){this.enabled&&(this.playTone(800+Math.random()*400,.1,"square",.2),this.playTone(200+Math.random()*100,.15,"triangle",.3))}playRolling(t){if(!this.enabled||!this.audioContext)return;const e=Math.min(t/15,1)*.1;this.playTone(80+t*3,.1,"sine",e)}playBumper(){this.enabled&&(this.playTone(600,.05,"square",.3),this.playTone(900,.1,"sine",.2),setTimeout(()=>{this.playTone(1200,.05,"square",.2)},50))}playCatMeow(){if(!this.enabled)return;const t=700,e=400,n=.4,i=this.audioContext.createOscillator(),s=this.audioContext.createGain();i.connect(s),s.connect(this.masterGain),i.type="sine",i.frequency.setValueAtTime(t,this.audioContext.currentTime),i.frequency.exponentialRampToValueAtTime(e,this.audioContext.currentTime+n*.7),i.frequency.exponentialRampToValueAtTime(t*.8,this.audioContext.currentTime+n),s.gain.setValueAtTime(.3,this.audioContext.currentTime),s.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+n),i.start(),i.stop(this.audioContext.currentTime+n)}playPitFall(){if(!this.enabled)return;const t=400;for(let e=0;e<5;e++)setTimeout(()=>{this.playTone(t-e*60,.15,"sine",.25)},e*80);setTimeout(()=>{this.playNoise(.2,.3),this.playTone(60,.3,"sawtooth",.3)},400)}playLaunch(){this.enabled&&(this.playTone(200,.1,"square",.3),setTimeout(()=>{this.playTone(400,.1,"square",.25)},50),setTimeout(()=>{this.playTone(800,.1,"square",.2)},100),setTimeout(()=>{this.playNoise(.3,.2)},100))}playVortex(){if(!this.enabled||!this.audioContext)return;const t=this.audioContext.createOscillator(),e=this.audioContext.createGain();t.connect(e),e.connect(this.masterGain),t.type="sine",t.frequency.setValueAtTime(200,this.audioContext.currentTime),t.frequency.linearRampToValueAtTime(600,this.audioContext.currentTime+.5),e.gain.setValueAtTime(.3,this.audioContext.currentTime),e.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.5),t.start(),t.stop(this.audioContext.currentTime+.5)}playVortexRelease(){if(!this.enabled)return;[300,450,600,800].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.1,"sine",.25)},n*40)}),this.playNoise(.2,.25)}playPachinko(){if(!this.enabled)return;const t=1e3+Math.random()*500;this.playTone(t,.08,"sine",.15)}playExplosion(){this.enabled&&(this.playNoise(.3,.5),this.playTone(60,.4,"sawtooth",.4),this.playTone(40,.5,"sine",.3))}playTrapActivate(){if(!this.enabled)return;[800,600,400,200].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.2,"sawtooth",.25)},n*100)}),setTimeout(()=>{this.playTone(100,.3,"square",.3)},300)}playSpikePopup(){this.enabled&&(this.playTone(1500,.05,"square",.3),this.playTone(200,.1,"sawtooth",.4),setTimeout(()=>{this.playTone(100,.15,"square",.25)},50))}playFloorCollapse(){this.enabled&&(this.playNoise(.5,.3),this.playTone(80,.4,"sawtooth",.3),setTimeout(()=>{this.playTone(60,.3,"sine",.25),this.playNoise(.3,.2)},200),setTimeout(()=>{this.playTone(40,.4,"sine",.2)},400))}playBoost(){if(!this.enabled)return;[261.63,329.63,392,523.25].forEach((e,n)=>{setTimeout(()=>{this.playTone(e,.15,"square",.2)},n*50)})}playGameOver(t){this.enabled&&(t?[523.25,659.25,783.99,659.25,783.99,1046.5].forEach((n,i)=>{setTimeout(()=>{this.playTone(n,.25,"square",.2),this.playTone(n/2,.25,"triangle",.15)},i*150)}):[392,349.23,329.63,293.66].forEach((n,i)=>{setTimeout(()=>{this.playTone(n,.4,"sawtooth",.2)},i*250)}))}playNoise(t,e=.3){if(!this.enabled||!this.audioContext)return;const n=this.audioContext.sampleRate*t,i=this.audioContext.createBuffer(1,n,this.audioContext.sampleRate),s=i.getChannelData(0);for(let l=0;l<n;l++)s[l]=Math.random()*2-1;const r=this.audioContext.createBufferSource(),a=this.audioContext.createGain(),c=this.audioContext.createBiquadFilter();r.buffer=i,c.type="lowpass",c.frequency.value=1e3,r.connect(c),c.connect(a),a.connect(this.masterGain),a.gain.setValueAtTime(e,this.audioContext.currentTime),a.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+t),r.start(),r.stop(this.audioContext.currentTime+t)}setVolume(t){this.masterGain&&(this.masterGain.gain.value=t)}toggle(){return this.enabled=!this.enabled,this.enabled}}class r_{constructor(){this.container=null,this.init()}init(){this.container=document.createElement("div"),this.container.id="celebration-container",this.container.innerHTML=`
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
    `,document.head.appendChild(t)}showStrike(t=1){const e=document.getElementById("celebration-overlay"),n=e.querySelector(".celebration-icon"),i=e.querySelector(".celebration-text"),s=e.querySelector(".celebration-subtext");e.className="celebration",t>=3?(e.classList.add("turkey"),n.textContent="🦃",t===3?(i.textContent="TURKEY!",s.textContent="3 strikes in a row!"):t===4?(i.textContent="FOUR-BAGGER!",s.textContent="4 strikes in a row!"):t>=12?(e.classList.add("perfect"),n.textContent="👑",i.textContent="PERFECT GAME!",s.textContent="300 points!"):(i.textContent=`${t}X STRIKE!`,s.textContent=`${t} strikes in a row!`),this.startEmojiRain(["🎳","🔥","⭐","🏆","✨"],40)):(e.classList.add("strike"),n.textContent="🎳",i.textContent="STRIKE!",s.textContent=o_(),this.startEmojiRain(["🎳","⭐","✨","🎉"],20)),e.classList.remove("hidden"),e.classList.add("show"),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.classList.add("hidden"),300)},2e3)}showSpare(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration spare",e.textContent="👍",n.textContent="SPARE!",i.textContent=a_(),this.startEmojiRain(["✨","💚","👏"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showGutter(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="😿",n.textContent="GUTTER!",i.textContent=c_(),this.startEmojiRain(["💧","😢","🕳️"],10),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showCatAttack(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="🐱",n.textContent="MEOW!",i.textContent=l_(),this.startEmojiRain(["🐱","🐾","😸","🙀"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showPitFall(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="🕳️",n.textContent="PIT FALL!",i.textContent=h_(),this.startEmojiRain(["🕳️","💀","⬇️","😱"],15),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showExplosion(){const t=document.getElementById("celebration-overlay"),e=t.querySelector(".celebration-icon"),n=t.querySelector(".celebration-text"),i=t.querySelector(".celebration-subtext");t.className="celebration gutter",e.textContent="💥",n.textContent="BOOM!",i.textContent=u_(),this.startEmojiRain(["💥","🔥","💣","🎆"],20),t.classList.remove("hidden"),t.classList.add("show"),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.classList.add("hidden"),300)},1500)}showTrap(t){const e=document.getElementById("celebration-overlay"),n=e.querySelector(".celebration-icon"),i=e.querySelector(".celebration-text"),s=e.querySelector(".celebration-subtext");e.className="celebration gutter";const r={reverse:{icon:"🔄",text:"REVERSED!",emojis:["🔄","↩️","🌀","😵"]},shrink:{icon:"🔬",text:"SHRUNK!",emojis:["🔬","🐜","📍","😰"]},slow:{icon:"🐌",text:"SLOWED!",emojis:["🐌","🐢","⏰","😫"]},blind:{icon:"😵",text:"BLINDED!",emojis:["😵","💫","👀","🔆"]}},a=r[t]||r.reverse;n.textContent=a.icon,i.textContent=a.text,s.textContent=d_(t),this.startEmojiRain(a.emojis,15),e.classList.remove("hidden"),e.classList.add("show"),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.classList.add("hidden"),300)},1500)}startEmojiRain(t,e){const n=document.getElementById("emoji-rain");n.innerHTML="";for(let i=0;i<e;i++)setTimeout(()=>{const s=document.createElement("div");s.className="falling-emoji",s.textContent=t[Math.floor(Math.random()*t.length)],s.style.left=`${Math.random()*100}%`,s.style.animationDuration=`${2+Math.random()*2}s`,s.style.fontSize=`${1.5+Math.random()*1.5}rem`,n.appendChild(s),setTimeout(()=>s.remove(),4e3)},i*100)}showGameEnd(t,e=!1){const n=document.getElementById("celebration-overlay"),i=n.querySelector(".celebration-icon"),s=n.querySelector(".celebration-text"),r=n.querySelector(".celebration-subtext");n.className="celebration",t>=300?(n.classList.add("perfect"),i.textContent="👑",s.textContent="PERFECT!",r.textContent="The impossible achieved!",this.startEmojiRain(["👑","🏆","⭐","🎉","💎"],50)):t>=250?(n.classList.add("turkey"),i.textContent="🏆",s.textContent="INCREDIBLE!",r.textContent=`${t} points! You're a legend!`,this.startEmojiRain(["🏆","⭐","🔥"],30)):t>=200?(n.classList.add("strike"),i.textContent="🎯",s.textContent="EXCELLENT!",r.textContent=`${t} points! Amazing game!`,this.startEmojiRain(["🎳","⭐","✨"],25)):t>=150?(n.classList.add("spare"),i.textContent="👏",s.textContent="GREAT JOB!",r.textContent=`${t} points! Well played!`,this.startEmojiRain(["👏","✨"],15)):t>=100?(i.textContent="😊",s.textContent="GOOD GAME!",r.textContent=`${t} points. Keep practicing!`):t>=50?(i.textContent="🤔",s.textContent="NICE TRY",r.textContent=`${t} points. You can do better!`):(n.classList.add("gutter"),i.textContent="😅",s.textContent="OOPS...",r.textContent=`${t} points. Maybe bowling isn't your thing?`,this.startEmojiRain(["💧","😢"],10)),n.classList.remove("hidden"),n.classList.add("show"),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>n.classList.add("hidden"),300)},3e3)}}function o_(){const o=["Perfect hit!","Crushed it!","Bowling like a pro!","Nothing but pins!","Unstoppable!","On fire!","Textbook strike!","Clean sweep!"];return o[Math.floor(Math.random()*o.length)]}function a_(){const o=["Nice recovery!","Clutch pickup!","Never give up!","Second chance success!","Way to adapt!","Saved it!"];return o[Math.floor(Math.random()*o.length)]}function c_(){const o=["The pins are laughing...","Did you close your eyes?","At least you tried!","The lane has sides, you know...","Ouch, that hurts to watch","Even the ball is embarrassed","Plot twist: the gutter wins"];return o[Math.floor(Math.random()*o.length)]}function l_(){const o=["Cat attack! Ball destroyed!","Kitty wanted to play too!","The cat has claimed your ball!","Feline interference!","Cat 1, Bowler 0"];return o[Math.floor(Math.random()*o.length)]}function h_(){const o=["Into the abyss!","Should've watched your step!","Gravity wins again!","Pit trap activated!","Down you go!","The void claims another..."];return o[Math.floor(Math.random()*o.length)]}function u_(){const o=["Barrel goes BOOM!","Explosive surprise!","Watch out for red barrels!","Kaboom!","That was loud!","Danger: explosives!"];return o[Math.floor(Math.random()*o.length)]}function d_(o){const t={reverse:["Left is right, right is left!","Controls are backwards!","Mind the mirror!","Everything is opposite!"],shrink:["Tiny ball, tiny power!","Honey, I shrunk the ball!","So small...","Mini mode activated!"],slow:["Moving like molasses!","Speed reduced!","Slow motion mode!","Turtle speed!"],blind:["Can't see anything!","Flash bang!","Bright light!","Temporary blindness!"]},e=t[o]||t.reverse;return e[Math.floor(Math.random()*e.length)]}class f_{constructor(){this.audioContext=null,this.masterGain=null,this.isPlaying=!1,this.tempo=120,this.currentBeat=0,this.scheduledTime=0,this.scheduleAheadTime=.1,this.lookahead=25,this.timerID=null,this.intensity=.5,this.pattern=0}async init(){if(!this.audioContext)try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.masterGain=this.audioContext.createGain(),this.masterGain.connect(this.audioContext.destination),this.masterGain.gain.value=.3,this.filter=this.audioContext.createBiquadFilter(),this.filter.type="lowpass",this.filter.frequency.value=2e3,this.filter.connect(this.masterGain)}catch(t){console.warn("Music not supported:",t)}}start(){this.isPlaying||!this.audioContext||(this.audioContext.state==="suspended"&&this.audioContext.resume(),this.isPlaying=!0,this.scheduledTime=this.audioContext.currentTime,this.currentBeat=0,this.scheduler())}stop(){this.isPlaying=!1,this.timerID&&(clearTimeout(this.timerID),this.timerID=null)}scheduler(){if(!this.isPlaying)return;const t=60/this.tempo;for(;this.scheduledTime<this.audioContext.currentTime+this.scheduleAheadTime;)this.playBeat(this.scheduledTime,this.currentBeat),this.scheduledTime+=t/4,this.currentBeat=(this.currentBeat+1)%16;this.timerID=setTimeout(()=>this.scheduler(),this.lookahead)}playBeat(t,e){if(e%4===0&&this.playKick(t),(e===4||e===12)&&this.playSnare(t),this.intensity>.3&&(e%2===0?this.playHiHat(t,!1):this.intensity>.6&&this.playHiHat(t,!0)),e%4===0||this.intensity>.5&&e===6||this.intensity>.7&&e===14){const n=[55,65.41,73.42,82.41],i=Math.floor(e/4)%n.length;this.playBass(t,n[i])}if(this.intensity>.4&&(e===0||e===6||e===10)){const n=[220,261.63,293.66,329.63,392,440],i=n[Math.floor(Math.random()*n.length)];this.playSynth(t,i)}this.intensity>.7&&e===14&&this.playAccent(t)}playKick(t){const e=this.audioContext.createOscillator(),n=this.audioContext.createGain();e.connect(n),n.connect(this.filter),e.frequency.setValueAtTime(150,t),e.frequency.exponentialRampToValueAtTime(40,t+.1),n.gain.setValueAtTime(.8,t),n.gain.exponentialRampToValueAtTime(.01,t+.15),e.start(t),e.stop(t+.15)}playSnare(t){const e=this.audioContext.sampleRate*.1,n=this.audioContext.createBuffer(1,e,this.audioContext.sampleRate),i=n.getChannelData(0);for(let h=0;h<e;h++)i[h]=Math.random()*2-1;const s=this.audioContext.createBufferSource(),r=this.audioContext.createGain(),a=this.audioContext.createBiquadFilter();s.buffer=n,a.type="highpass",a.frequency.value=1e3,s.connect(a),a.connect(r),r.connect(this.filter),r.gain.setValueAtTime(.5,t),r.gain.exponentialRampToValueAtTime(.01,t+.1),s.start(t),s.stop(t+.1);const c=this.audioContext.createOscillator(),l=this.audioContext.createGain();c.connect(l),l.connect(this.filter),c.type="triangle",c.frequency.setValueAtTime(200,t),c.frequency.exponentialRampToValueAtTime(100,t+.05),l.gain.setValueAtTime(.3,t),l.gain.exponentialRampToValueAtTime(.01,t+.08),c.start(t),c.stop(t+.08)}playHiHat(t,e=!1){const n=this.audioContext.sampleRate*(e?.15:.05),i=this.audioContext.createBuffer(1,n,this.audioContext.sampleRate),s=i.getChannelData(0);for(let h=0;h<n;h++)s[h]=Math.random()*2-1;const r=this.audioContext.createBufferSource(),a=this.audioContext.createGain(),c=this.audioContext.createBiquadFilter();r.buffer=i,c.type="highpass",c.frequency.value=7e3,r.connect(c),c.connect(a),a.connect(this.filter);const l=e?.15:.05;a.gain.setValueAtTime(.2,t),a.gain.exponentialRampToValueAtTime(.01,t+l),r.start(t),r.stop(t+l)}playBass(t,e){const n=this.audioContext.createOscillator(),i=this.audioContext.createGain();n.connect(i),i.connect(this.filter),n.type="sawtooth",n.frequency.setValueAtTime(e,t),i.gain.setValueAtTime(.4,t),i.gain.exponentialRampToValueAtTime(.01,t+.2),n.start(t),n.stop(t+.2)}playSynth(t,e){const n=this.audioContext.createOscillator(),i=this.audioContext.createOscillator(),s=this.audioContext.createGain();n.connect(s),i.connect(s),s.connect(this.filter),n.type="square",i.type="sawtooth",n.frequency.setValueAtTime(e,t),i.frequency.setValueAtTime(e*1.01,t),s.gain.setValueAtTime(.15,t),s.gain.exponentialRampToValueAtTime(.01,t+.3),n.start(t),i.start(t),n.stop(t+.3),i.stop(t+.3)}playAccent(t){const e=this.audioContext.createOscillator(),n=this.audioContext.createGain();e.connect(n),n.connect(this.filter),e.type="sine",e.frequency.setValueAtTime(880,t),e.frequency.exponentialRampToValueAtTime(440,t+.1),n.gain.setValueAtTime(.3,t),n.gain.exponentialRampToValueAtTime(.01,t+.15),e.start(t),e.stop(t+.15)}setIntensity(t){this.intensity=Math.max(0,Math.min(1,t)),this.tempo=100+this.intensity*40,this.filter&&(this.filter.frequency.value=1e3+this.intensity*3e3)}setVolume(t){this.masterGain&&(this.masterGain.gain.value=t*.3)}onSpeedBoost(){this.setIntensity(Math.min(1,this.intensity+.2)),setTimeout(()=>this.setIntensity(Math.max(.3,this.intensity-.2)),3e3)}onCollision(){const t=this.intensity;this.setIntensity(Math.min(1,this.intensity+.1)),setTimeout(()=>this.setIntensity(t),500)}onZoneEnter(t){switch(t){case"speed":this.setIntensity(.9);break;case"chaos":this.setIntensity(1),this.tempo=150;break;case"slip":this.setIntensity(.4);break;default:this.setIntensity(.6)}}onZoneExit(){this.setIntensity(.5),this.tempo=120}}class p_{constructor(t){this.canvas=t,this.isRunning=!1,this.gameState="ready",this.currentFrame=1,this.currentThrow=1,this.pinsKnocked=0,this.pinsStandingBeforeThrow=10,this.frameScores=[],this.consecutiveStrikes=0,this.ballDestroyed=!1,this.pinAreaZ=235,this.scene=new bu,this.scene.background=new Bt(8900331),this.scene.fog=new Sa(8900331,80,280),this.camera=new nn(60,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new pg({canvas:this.canvas,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.world=new Dv,this.world.gravity.set(0,-9.82,0),this.world.broadphase=new sh,this.ball=null,this.pins=[],this.course=null,this.tiltControl=null,this.scoreSystem=null,this.particles=null,this.sounds=null,this.celebrations=null,this.music=null,this.activeEffects={reverse:!1,shrink:!1,giant:!1,slow:!1,speed:!1,slip:!1,chaos:!1,shield:!1},this.currentZone=null,this.clock=new xd,this.lastTime=0,this.init()}async init(){this.setupLighting(),this.setupCamera(),this.setupEffects(),this.createCourse(),this.createBall(),this.createPins(),this.setupControls(),this.setupScoreSystem(),window.addEventListener("resize",()=>this.onResize()),document.addEventListener("click",()=>this.sounds.init(),{once:!0}),document.addEventListener("touchstart",()=>this.sounds.init(),{once:!0})}setupEffects(){this.particles=new i_(this.scene),this.sounds=new s_,this.celebrations=new r_,this.music=new f_}setupLighting(){const t=new md(16777215,.6);this.scene.add(t);const e=new pd(16777215,.8);e.position.set(10,20,10),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,e.shadow.camera.near=.5,e.shadow.camera.far=100,e.shadow.camera.left=-30,e.shadow.camera.right=30,e.shadow.camera.top=30,e.shadow.camera.bottom=-30,this.scene.add(e)}setupCamera(){this.camera.position.set(0,8,-5),this.camera.lookAt(0,0,20)}createCourse(){this.course=new t_(this.scene,this.world,{onBumperHit:t=>{this.sounds.playBumper(),this.particles.createBounceEffect(t.mesh.position)},onCatAttack:t=>{this.sounds.playCatMeow(),this.celebrations.showCatAttack(),this.destroyBall("cat")},onPitFall:t=>{this.sounds.playPitFall(),this.particles.createExplosionEffect(this.ball.getPosition()),this.celebrations.showPitFall(),this.destroyBall("pit")},onLaunch:(t,e)=>{this.sounds.playLaunch(),this.particles.createLaunchEffect(t.mesh.position),this.showMessage("LAUNCH!","#3498db")},onVortexCapture:t=>{this.sounds.playVortex(),this.showMessage("TAP TO RELEASE!","#9b59b6")},onVortexRelease:(t,e)=>{this.sounds.playVortexRelease(),this.particles.createVortexEffect(t.mesh.position)},onPachinkoHit:t=>{this.sounds.playPachinko()},onBonusCollect:t=>{this.sounds.playBoost(),this.applyBonus(t)},onFakeBonusTrigger:(t,e)=>{this.sounds.playTrapActivate(),this.particles.createTrapEffect(t.mesh.position),this.applyTrapEffect(e)},onExplosion:(t,e)=>{this.sounds.playExplosion(),this.particles.createExplosionEffect(t.mesh.position),this.celebrations.showExplosion(),this.showMessage("BOOM!","#ff6600")},onPopupSpike:(t,e)=>{this.sounds.playSpikePopup(),this.particles.createSpikeEffect(t.mesh.position),this.showMessage("SURPRISE!","#ff0000")},onCollapsingFloor:t=>{this.sounds.playFloorCollapse(),this.particles.createCollapseEffect(t.mesh.position),this.showMessage("FLOOR COLLAPSE!","#8b4513")},onZoneEnter:(t,e,n)=>{this.handleZoneEnter(e,n)},onZoneExit:(t,e,n)=>{this.handleZoneExit(e,n)}}),this.course.generate(this.currentFrame),this.pinAreaZ=this.course.getPinAreaZ()}createBall(){this.ball=new kv(this.scene,this.world),this.ball.reset()}createPins(){this.pins.forEach(n=>n.dispose()),this.pins=[];const t=this.pinAreaZ;[{x:0,z:t},{x:-.6,z:t+1},{x:.6,z:t+1},{x:-1.2,z:t+2},{x:0,z:t+2},{x:1.2,z:t+2},{x:-1.8,z:t+3},{x:-.6,z:t+3},{x:.6,z:t+3},{x:1.8,z:t+3}].forEach((n,i)=>{const s=new Gv(this.scene,this.world,n.x,n.z,i);this.pins.push(s)})}setupControls(){this.tiltControl=new e_,this.tiltControl.enable()}setupScoreSystem(){this.scoreSystem=new n_}async start(){this.isRunning=!0,this.gameState="playing",this.pinsStandingBeforeThrow=10,this.frameScores=[],this.ball.reset(),this.updateUI(),await this.music.init(),this.music.start(),this.animate()}animate(){if(!this.isRunning)return;requestAnimationFrame(()=>this.animate());const t=this.clock.getDelta();this.clock.getElapsedTime(),this.world.step(1/60,t,3),this.gameState==="playing"&&!this.ballDestroyed&&(this.updateBall(t),this.updateCamera(),this.checkGameState()),this.ballDestroyed||this.ball.update(),this.pins.forEach(i=>i.update());const e=this.ballDestroyed?null:this.ball.getPosition(),n=this.ballDestroyed?null:this.ball.getVelocity();this.course.update(t,e,n),this.particles.update(t),this.renderer.render(this.scene,this.camera)}updateBall(t){const e=this.tiltControl.getTilt();this.ball.applyTiltForce(e,t);const n=this.ball.getPosition(),i=this.course.checkTerrainEffects(n);i&&i.type==="wind"&&(this.ball.body.velocity.x+=i.force.x*t);const s=this.ball.getSpeedPercent();this.updateSpeedGauge(s),n.z<this.pinAreaZ-5&&n.y<-5&&this.onBallFailed()}destroyBall(t){this.ballDestroyed=!0,this.ball.mesh.visible=!1,setTimeout(()=>{this.onBallFailed()},1500)}applyBonus(t){switch(t){case"speed":this.ball.boost(1.5,3e3),this.showMessage("SPEED BOOST!","#f39c12");break;case"shield":this.ball.activateShield(),this.showMessage("SHIELD!","#3498db");break;case"giant":this.ball.setGiant(!0),this.showMessage("GIANT MODE!","#9b59b6");break}}applyTrapEffect(t){switch(t){case"reverse":this.tiltControl.setReversed(!0),this.setActiveEffect("reverse",!0),this.showMessage("CONTROLS REVERSED!","#ff0066"),this.celebrations.showTrap("reverse"),setTimeout(()=>{this.tiltControl.setReversed(!1),this.setActiveEffect("reverse",!1)},5e3);break;case"shrink":this.ball.setShrunk(!0),this.setActiveEffect("shrink",!0),this.showMessage("SHRUNK!","#ff00ff"),this.celebrations.showTrap("shrink"),setTimeout(()=>{this.ball.setShrunk(!1),this.setActiveEffect("shrink",!1)},8e3);break;case"slow":this.ball.slowDown(.3,6e3),this.setActiveEffect("slow",!0),this.showMessage("SLOWED!","#00ffff"),this.celebrations.showTrap("slow"),setTimeout(()=>{this.setActiveEffect("slow",!1)},6e3);break;case"blind":this.triggerBlindEffect(),this.showMessage("BLINDED!","#ffffff"),this.celebrations.showTrap("blind");break}}triggerBlindEffect(){const t=document.createElement("div");t.style.cssText=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0"},100),setTimeout(()=>{t.remove()},3100)}handleZoneEnter(t,e){this.currentZone=t,this.sounds.playBoost(),this.music.onZoneEnter(t);const n=document.getElementById("zone-warning");n.className=`${t}-zone`,n.classList.remove("hidden");const i={shrink:"🔬 SHRINK ZONE!",giant:"🔮 GIANT ZONE!",speed:"⚡ SPEED ZONE!",slip:"🧊 SLIP ZONE!",chaos:"🌀 CHAOS ZONE!",bomb:"💣 DANGER ZONE!"};switch(n.textContent=i[t]||"SPECIAL ZONE!",t){case"shrink":this.ball.setShrunk(!0),this.setActiveEffect("shrink",!0),this.showMessage("SHRINKING!","#ff69b4");break;case"giant":this.ball.setGiant(!0),this.setActiveEffect("giant",!0),this.showMessage("GROWING!","#9b59b6");break;case"speed":this.ball.boost(2,0),this.setActiveEffect("speed",!0),this.showMessage("SPEED UP!","#ff9800");break;case"slip":this.ball.setSlip(!0),this.setActiveEffect("slip",!0),this.showMessage("SLIPPERY!","#03a9f4");break;case"chaos":this.tiltControl.setChaos(!0),this.setActiveEffect("chaos",!0),this.showMessage("CHAOS!","#e91e63");break;case"bomb":this.setActiveEffect("bomb",!0),this.showMessage("DANGER!","#ff5722"),this.bombZoneInterval=setInterval(()=>{if(this.currentZone==="bomb"&&Math.random()>.7){const s=this.ball.getPosition();this.particles.createExplosionEffect({x:s.x+(Math.random()-.5)*4,y:s.y,z:s.z+(Math.random()-.5)*4},16733986),this.sounds.playExplosion(),this.ball.body.velocity.x+=(Math.random()-.5)*10,this.ball.body.velocity.z+=(Math.random()-.5)*5}},500);break}setTimeout(()=>{n.classList.add("hidden")},1500)}handleZoneExit(t,e){switch(this.currentZone=null,this.music.onZoneExit(),t){case"shrink":this.ball.setShrunk(!1),this.setActiveEffect("shrink",!1);break;case"giant":this.ball.setGiant(!1),this.setActiveEffect("giant",!1);break;case"speed":this.setActiveEffect("speed",!1);break;case"slip":this.ball.setSlip(!1),this.setActiveEffect("slip",!1);break;case"chaos":this.tiltControl.setChaos(!1),this.setActiveEffect("chaos",!1);break;case"bomb":this.setActiveEffect("bomb",!1),this.bombZoneInterval&&(clearInterval(this.bombZoneInterval),this.bombZoneInterval=null);break}}setActiveEffect(t,e){this.activeEffects[t]=e,this.updateStatusEffectUI()}updateStatusEffectUI(){["reverse","shrink","giant","slow","speed","slip","chaos","shield"].forEach(e=>{const n=document.getElementById(`effect-${e}`);n&&(this.activeEffects[e]?n.classList.remove("hidden"):n.classList.add("hidden"))})}updateCamera(){const t=this.ball.getPosition(),e=t.x*.5,n=8,i=t.z-8;this.camera.position.x+=(e-this.camera.position.x)*.05,this.camera.position.y+=(n-this.camera.position.y)*.05,this.camera.position.z+=(i-this.camera.position.z)*.05,this.camera.lookAt(t.x,t.y,t.z+10)}checkGameState(){const t=this.ball.getPosition(),e=this.ball.getVelocity();if(t.z>this.pinAreaZ-5){if(t.y<-3){this.endThrow();return}Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)<.5&&this.endThrow()}}endThrow(){this.gameState="result";const t=this.pins.filter(s=>!s.isKnocked()).length,e=this.pinsStandingBeforeThrow-t;this.pinsKnocked=e,this.frameScores.push(e);const n=e===10&&this.currentThrow===1,i=this.currentThrow===2&&t===0;n?(this.consecutiveStrikes++,this.sounds.playStrike(),this.particles.createStrikeEffect(this.ball.getPosition()),this.celebrations.showStrike(this.consecutiveStrikes)):i?(this.consecutiveStrikes=0,this.sounds.playSpare(),this.particles.createSpareEffect(this.ball.getPosition()),this.celebrations.showSpare()):(this.consecutiveStrikes=0,e>0&&this.sounds.playPinHit()),this.scoreSystem.recordThrow(this.currentFrame,this.currentThrow,e),setTimeout(()=>this.showResult(),n||i?2e3:500)}onBallFailed(){this.gameState="result",this.pinsKnocked=0,this.consecutiveStrikes=0,this.frameScores.push(0),this.scoreSystem.recordThrow(this.currentFrame,this.currentThrow,0),this.ballDestroyed||(this.sounds.playGutter(),this.particles.createGutterEffect(this.ball.getPosition()),this.celebrations.showGutter()),setTimeout(()=>this.showResult(),2e3)}showResult(){const t=this.scoreSystem.frames[this.currentFrame-1],e=this.currentFrame===10;let n=`${this.pinsKnocked} pins`;if(this.pinsKnocked===10)(this.currentThrow===1||e&&this.pinsStandingBeforeThrow===10)&&(n="STRIKE!",this.showMessage("STRIKE!","#f1c40f"));else if(this.currentThrow===2&&!e)(t.throw1||0)+this.pinsKnocked===10&&(n="SPARE!",this.showMessage("SPARE!","#2ecc71"));else if(e&&this.currentThrow>=2){const a=this.pinsStandingBeforeThrow;this.pinsKnocked===a&&a===10?(n="STRIKE!",this.showMessage("STRIKE!","#f1c40f")):this.pinsKnocked===a&&a>0&&(n="SPARE!",this.showMessage("SPARE!","#2ecc71"))}document.getElementById("pins-knocked").textContent=n;let i="Next Frame";if(e){const a=t.throw1||0,c=t.throw2,l=a===10,h=!l&&c!==null&&a+c===10;this.currentThrow===1?i=l?"2nd Throw (Bonus)":"2nd Throw":this.currentThrow===2&&(l||h)?i="3rd Throw (Bonus)":i="Game Over"}else this.pinsKnocked===10&&this.currentThrow===1?i="Next Frame":this.currentThrow===1?i="2nd Throw":i="Next Frame";document.getElementById("next-frame-btn").textContent=i,this.updateScoreboard();const s=document.getElementById("scoreboard"),r=document.getElementById("result-scoreboard");r.innerHTML=s.outerHTML,document.getElementById("result-total").textContent=this.scoreSystem.getTotalScore(),window.app.showScreen("result-screen")}nextFrame(){const t=this.scoreSystem.frames[this.currentFrame-1];if(this.currentFrame===10)if(this.currentThrow===1)this.pinsKnocked===10?(this.currentThrow=2,this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.currentThrow=2,this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);else if(this.currentThrow===2){const n=t.throw1||0,i=t.throw2||0,s=n===10,r=!s&&n+i===10,a=s&&i===10;if(s||r)this.currentThrow=3,a||r?(this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);else{this.endGame();return}}else{this.endGame();return}else this.pinsKnocked===10&&this.currentThrow===1||this.currentThrow===2?(this.currentFrame++,this.currentThrow=1,this.frameScores=[],this.removeAllPins(),this.createPins(),this.pinsStandingBeforeThrow=10):(this.currentThrow=2,this.removeKnockedPins(),this.pinsStandingBeforeThrow=this.pins.length);if(this.currentFrame>10){this.endGame();return}this.ballDestroyed=!1,this.ball.mesh.visible=!0,this.currentThrow===1?(this.course.generate(this.currentFrame),this.pinAreaZ=this.course.getPinAreaZ()):this.course.resetSpecialObstacles(),this.particles.clear(),window.app.showScreen("game-screen"),this.ball.reset(),this.gameState="playing",this.updateUI()}removeKnockedPins(){this.pins.filter(e=>e.isKnocked()).forEach(e=>e.dispose()),this.pins=this.pins.filter(e=>!e.isKnocked())}removeAllPins(){this.pins.forEach(t=>t.dispose()),this.pins=[]}endGame(){const t=this.scoreSystem.getTotalScore();this.sounds.playGameOver(t>=150),this.celebrations.showGameEnd(t),this.updateScoreboard();const e=document.getElementById("scoreboard"),n=document.getElementById("result-scoreboard");n.innerHTML=e.outerHTML,document.getElementById("pins-knocked").textContent="GAME OVER",document.getElementById("result-total").textContent=t,document.getElementById("next-frame-btn").textContent="Play Again",document.getElementById("next-frame-btn").onclick=()=>{this.resetGame()},setTimeout(()=>{window.app.showScreen("result-screen")},3500)}resetGame(){this.currentFrame=1,this.currentThrow=1,this.pinsKnocked=0,this.pinsStandingBeforeThrow=10,this.frameScores=[],this.consecutiveStrikes=0,this.ballDestroyed=!1,this.ball.mesh.visible=!0,this.scoreSystem.reset(),this.resetScoreboardDisplay(),this.course.generate(1),this.pinAreaZ=this.course.getPinAreaZ(),this.removeAllPins(),this.createPins(),this.ball.reset(),this.particles.clear(),window.app.showScreen("game-screen"),this.gameState="playing",this.updateUI(),document.getElementById("next-frame-btn").onclick=()=>{this.nextFrame()}}updateUI(){this.updateScoreboard()}updateScoreboard(){const t=this.scoreSystem.getFrameData();for(let e=0;e<10;e++){const n=document.querySelector(`.frame[data-frame="${e+1}"]`),i=t[e],s=e===9;n.classList.remove("current","completed"),e+1===this.currentFrame&&n.classList.add("current");const r=n.querySelector(".t1"),a=n.querySelector(".t2"),c=s?n.querySelector(".t3"):null,l=n.querySelector(".frame-score");if(r.classList.remove("strike","spare"),a.classList.remove("strike","spare"),c&&c.classList.remove("strike","spare"),s)if(i.throw1!==null?i.throw1===10?(r.textContent="X",r.classList.add("strike")):r.textContent=i.throw1===0?"-":i.throw1:r.textContent="-",i.throw2!==null?i.throw1===10?i.throw2===10?(a.textContent="X",a.classList.add("strike")):a.textContent=i.throw2===0?"-":i.throw2:i.throw1+i.throw2===10?(a.textContent="/",a.classList.add("spare")):a.textContent=i.throw2===0?"-":i.throw2:a.textContent="-",i.throw3!==null){const h=i.throw1===10&&i.throw2===10?0:i.throw1===10?i.throw2:i.throw1+i.throw2===10?0:null;i.throw3===10&&h===0?(c.textContent="X",c.classList.add("strike")):h!==null&&h+i.throw3===10?(c.textContent="/",c.classList.add("spare")):c.textContent=i.throw3===0?"-":i.throw3}else c&&(c.textContent="-");else i.throw1!==null?i.throw1===10?(r.textContent="",a.textContent="X",a.classList.add("strike")):(r.textContent=i.throw1===0?"-":i.throw1,i.throw2!==null?i.throw1+i.throw2===10?(a.textContent="/",a.classList.add("spare")):a.textContent=i.throw2===0?"-":i.throw2:a.textContent="-"):(r.textContent="-",a.textContent="-");if(i.cumulative!==null)l.textContent=i.cumulative,n.classList.add("completed");else if(i.throw1!==null){let h=i.throw1;i.throw2!==null&&(h+=i.throw2),i.throw3!==null&&(h+=i.throw3),l.textContent=""}else l.textContent="-"}}resetScoreboardDisplay(){for(let t=1;t<=10;t++){const e=document.querySelector(`.frame[data-frame="${t}"]`);e.classList.remove("current","completed");const n=e.querySelector(".t1"),i=e.querySelector(".t2"),s=e.querySelector(".t3"),r=e.querySelector(".frame-score");n.textContent="-",n.classList.remove("strike","spare"),i.textContent="-",i.classList.remove("strike","spare"),s&&(s.textContent="-",s.classList.remove("strike","spare")),r.textContent="-"}}updateSpeedGauge(t){document.getElementById("speed-bar").style.width=`${t}%`,document.getElementById("speed-text").textContent=`${Math.round(t)}%`}showMessage(t,e="#fff"){const n=document.getElementById("message-overlay");n.textContent=t,n.style.color=e,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},1500)}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}}class dl{constructor(){this.game=null,this.gyroEnabled=!1,this.permissionRequested=!1,this.init()}init(){const t=document.getElementById("gyro-status"),e=document.getElementById("gyro-btn"),n=document.getElementById("start-btn"),i=document.getElementById("next-frame-btn"),s=/iPad|iPhone|iPod/.test(navigator.userAgent),r=!!window.DeviceOrientationEvent,a=r&&typeof DeviceOrientationEvent.requestPermission=="function";console.log("Device check:",{isIOS:s,hasGyro:r,needsPermission:a,userAgent:navigator.userAgent}),r?a?(t.textContent="タップして傾きセンサーを許可",t.className="status info",e.textContent="傾きセンサーを許可"):(this.gyroEnabled=!0,t.textContent="傾きセンサー: 利用可能",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled")):(t.textContent="PCモード: 矢印キーで操作",t.className="status info",e.textContent="矢印キーで操作",e.disabled=!0,e.style.opacity="0.5"),e.onclick=c=>{if(c.preventDefault(),c.stopPropagation(),console.log("Gyro button clicked"),t.textContent="リクエスト中...",this.permissionRequested){t.textContent="既にリクエスト済みです";return}a?(this.permissionRequested=!0,DeviceOrientationEvent.requestPermission().then(l=>{console.log("Permission state:",l),l==="granted"?(this.gyroEnabled=!0,t.textContent="許可されました！",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled")):(t.textContent="拒否されました（矢印キーで操作可）",t.className="status error",this.permissionRequested=!1)}).catch(l=>{console.error("Permission error:",l),t.textContent="エラー: "+l.message,t.className="status error",this.permissionRequested=!1})):r&&(this.gyroEnabled=!0,t.textContent="傾きセンサー: 有効",t.className="status success",e.textContent="傾きセンサー: ON",e.classList.add("enabled"))},n.onclick=()=>{this.startGame()},i.onclick=()=>{this.game&&this.game.nextFrame()}}startGame(){if(this.showScreen("game-screen"),this.lockOrientation(),!this.game){const t=document.getElementById("game-canvas");this.game=new p_(t)}this.game.start()}async lockOrientation(){try{screen.orientation&&screen.orientation.lock&&(await screen.orientation.lock("portrait"),console.log("Screen orientation locked to portrait"))}catch(t){console.log("Could not lock orientation:",t.message);try{const e=document.documentElement;e.requestFullscreen?(await e.requestFullscreen(),screen.orientation&&screen.orientation.lock&&await screen.orientation.lock("portrait")):e.webkitRequestFullscreen&&await e.webkitRequestFullscreen()}catch(e){console.log("Fullscreen fallback failed:",e.message)}}}showScreen(t){document.querySelectorAll(".screen").forEach(e=>{e.classList.add("hidden")}),document.getElementById(t).classList.remove("hidden")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.app=new dl}):window.app=new dl;
