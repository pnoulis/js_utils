var a=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var p=(t,e)=>{for(var o in e)a(t,o,{get:e[o],enumerable:!0})},b=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of f(e))!x.call(t,n)&&n!==o&&a(t,n,{get:()=>e[n],enumerable:!(s=c(e,n))||s.enumerable});return t};var d=t=>b(a({},"__esModule",{value:!0}),t);var y={};p(y,{Pipeline:()=>r});module.exports=d(y);function h(t,e,...o){this.route=e,this.middleware=o,this.queue=null,this.nextIndex=0;let s=function(n,l){return new h(t,e,...o).exec([t.beforeAll,o.map(u=>[t.beforeEach,u,t.afterEach]),t.afterAll,t.globalLast],n,l)};return s.skipAll=function(n,l){return new h(t,e,...o).exec([this.middleware],n,l)},s.exec=this.exec.bind(this),s}h.prototype.findNextErrHandlerIndex=function(t){let e=this.queue.length;for(;t<e;t++)if(this.queue.at(t).length>2)return t;return-1};h.prototype.runner=async function(t,e,o){this.nextIndex=e;let s=this.queue.at(this.nextIndex);s&&await s(t,this.runner.bind(this,t,e+1),o)};h.prototype.exec=async function(t,e,o){this.queue=t.flat(3),this.nextIndex=0;let s=this.queue.length,n={route:this.route,args:{...e},options:{onlyData:!0,...o},req:{},res:{}},l=null;for(;this.nextIndex<s;)try{await this.runner(n,this.nextIndex,l)}catch(i){if(l=i,this.nextIndex=this.findNextErrHandlerIndex(this.nextIndex+1),this.nextIndex===-1)throw i}return this.queue=null,n?.options?.onlyData?n.res.data:(delete n.args,delete n.options,n)};var r=class{constructor(){this.beforeAll=[],this.beforeEach=[],this.afterAll=[],this.afterEach=[]}};r.prototype.globalLast=async function(e,o,s){if(s)throw s;o()};r.prototype.flush=function(){this.globalLast=null,this.beforeAll.splice(0,this.beforeAll.length),this.beforeEach.splice(0,this.beforeEach.length),this.afterAll.splice(0,this.afterAll.length),this.afterEach.splice(0,this.afterEach.length)};r.prototype.setGlobalLast=function(e){this.globalLast=e};r.prototype.setBeforeAll=function(...e){this.beforeAll.push(...e)};r.prototype.setBeforeEach=function(...e){this.beforeEach.push(...e)};r.prototype.setAfterAll=function(...e){this.afterAll.push(...e)};r.prototype.setAfterEach=function(...e){this.afterEach.push(...e)};r.prototype.route=function(t,...e){return new h(this,t,...e)};
