var R=Object.create;var l=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var L=(r,o)=>{for(var e in o)l(r,e,{get:o[e],enumerable:!0})},c=(r,o,e,f)=>{if(o&&typeof o=="object"||typeof o=="function")for(let n of v(o))!D.call(r,n)&&n!==e&&l(r,n,{get:()=>o[n],enumerable:!(f=$(o,n))||f.enumerable});return r};var t=(r,o,e)=>(e=r!=null?R(y(r)):{},c(o||!r||!r.__esModule?l(e,"default",{value:r,enumerable:!0}):e,r)),N=r=>c(l({},"__esModule",{value:!0}),r);var U={};L(U,{findFile:()=>g,findNodePkgDir:()=>u,getModuleDir:()=>F,getProcessDir:()=>p,isNodePkg:()=>a,loadenv:()=>S});module.exports=N(U);var s=t(require("node:process"),1),i=t(require("node:path"),1),m=t(require("node:url"),1),d=t(require("node:fs"),1);function p(){return s.default.cwd()}function F(r){if(!r)return null;let o=m.default.fileURLToPath(r);return[i.default.dirname(o),o]}function u(r){return r?r=i.default.resolve(r):r=p(),function o(e){return e===i.default.sep?null:a(e)&&e||o(i.default.dirname(e))}(r)}function a(r){return g(r,"package.json")}function g(r,o){let e=new RegExp(o),f=d.default.readdirSync(r,{encoding:"utf8"});for(let n of f)if(e.test(n))return`${r}/${n}`;return null}var x=t(require("node:os"),1),P=t(require("node:path"),1),k=t(require("node:fs"),1),E=t(require("node:process"),1);function S(r,o){if(r)r=P.default.resolve(r);else if(r=u(E.default.cwd()),!r)throw new Error("loadenv() could not locate environment file.");/\/?env[^\/]*$/.test(r)||(r+="/.env");let e;try{e=k.readFileSync(r,{encoding:"utf8",flag:"r"})}catch(f){throw new Error(`loadenv() failed to read: ${r}`,{cause:f})}if(o){for(let[f,n]of w(e))o[f]=n;return o}else return w(e)}function w(r){return r.split(x.default.EOL).map(o=>o.split("=")).filter(([o,e])=>!!o)}0&&(module.exports={findFile,findNodePkgDir,getModuleDir,getProcessDir,isNodePkg,loadenv});