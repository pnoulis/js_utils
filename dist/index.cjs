var $=Object.create;var b=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var F=Object.getPrototypeOf,Q=Object.prototype.hasOwnProperty;var J=(e,t)=>{for(var n in t)b(e,n,{get:t[n],enumerable:!0})},k=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of D(t))!Q.call(e,i)&&i!==n&&b(e,i,{get:()=>t[i],enumerable:!(r=B(t,i))||r.enumerable});return e};var A=(e,t,n)=>(n=e!=null?$(F(e)):{},k(t||!e||!e.__esModule?b(n,"default",{value:e,enumerable:!0}):n,e)),_=e=>k(b({},"__esModule",{value:!0}),e);var ve={};J(ve,{ConsoleLogger:()=>c,Pipeline:()=>a,TaskRunner:()=>f,areMembersDuplicate:()=>V,areMembersUnique:()=>L,areMembersUniqueCb:()=>K,capitalize:()=>w,delay:()=>X,detectMode:()=>z,detectRuntime:()=>M,eventful:()=>U,extractEvens:()=>x,extractOdds:()=>v,filterObject:()=>te,flattenObj:()=>j,generateRandomName:()=>R,getEnvar:()=>P,isArray:()=>E,isFunction:()=>q,isMode:()=>oe,isNumber:()=>y.default,isObject:()=>h,isObjectEmpty:()=>Y,isRuntime:()=>ie,isString:()=>S,randomInteger:()=>H,randomReal:()=>W,removeIndex:()=>ee,smallid:()=>ye,stateful:()=>T,unique:()=>Z,uuid:()=>be,uuidv4:()=>be});module.exports=_(ve);function c({logLevel:e="trace"}={}){this.logLevel=this.levels[e]}c.prototype.levels={trace:5,debug:4,info:3,warn:2,error:1,fatal:0,silent:-1};c.prototype.trace=function(...t){this.logLevel<this.levels.trace};c.prototype.debug=function(...t){this.logLevel<this.levels.debug};c.prototype.info=function(...t){this.logLevel<this.levels.info};c.prototype.warn=function(...t){this.logLevel<this.levels.warn};c.prototype.error=function(...t){this.logLevel<this.levels.error};c.prototype.fatal=function(...t){this.logLevel<this.levels.fatal};function O(e,t){return Math.floor(Math.random()*(t-e)+e)}function R(){let e=["admiring","adoring","affectionate","agitated","amazing","angry","awesome","beautiful","blissful","bold","boring","brave","busy","charming","clever","cool","compassionate","competent","condescending","confident","cranky","crazy","dazzling","determined","distracted","dreamy","eager","ecstatic","elastic","elated","elegant","eloquent","epic","exciting","fervent","festive","flamboyant","focused","friendly","frosty","funny","gallant","gifted","goofy","gracious","great","happy","hardcore","heuristic","hopeful","hungry","infallible","inspiring","intelligent","interesting","jolly","jovial","keen","kind","laughing","loving","lucid","magical","mystifying","modest","musing","naughty","nervous","nice","nifty","nostalgic","objective","optimistic","peaceful","pedantic","pensive","practical","priceless","quirky","quizzical","recursing","relaxed","reverent","romantic","sad","serene","sharp","silly","sleepy","stoic","strange","stupefied","suspicious","sweet","tender","thirsty","trusting","unruffled","upbeat","vibrant","vigilant","vigorous","wizardly","wonderful","xenodochial","youthful","zealous","zen"],t=["Aragorn","Arwen","Balin","Bard","Beorn","Beren","Baggins","Bilbo","Boromor","Celeborn","Celebrimbor","Denethor","Earendil","Elwing","Elendil","Elrond","Eomer","Eowyn","Faramir","Feanor","Fingolfin","Finrod","Finwe","Frodo","Galadriel","Gandalf","Gilgalad","Glorfindel","Gimli","Goldberry","Gollum","Grima","Wormtongue","Hurin","Isildur","Kili","Legolas","Luthien","Maedhros","Melian","Merry","Morgoth","Pippin","Radagast","Samwise","Saruman","Sauron","Shelob","Smaug","Smeagol","Theoden","Thingol","Thranduil","Thorin","Tom","Treebeard","Tuor","Idril","Turin","Ungoliant"];return`${e[O(0,e.length)]}_${t[O(0,t.length)]}`}var y=A(require("is-number"),1);function j(e){let t={};for(let n in e)if(typeof e[n]=="object"&&!Array.isArray(e[n])){let r=j(e[n]);for(let i in r)t[n+"."+i]=r[i]}else t[n]=e[n];return t}function w(...e){return e.length>1?e.map(t=>t.charAt(0).toUpperCase()+t.slice(1)):e[0].charAt(0).toUpperCase()+e[0].slice(1)}function H(e=0,t=25e3){return Math.floor(Math.random()*(t-e+1))+e}function W(e,t){return Math.random()*(t-e+1)+e}function L(e){for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++)if(e[t]===e[n])return!1;return!0}function K(e,t){for(let n=0;n<e.length;n++)for(let r=n+1;r<e.length;r++)if(t(e[n],e[r]))return!1;return!0}function V(e){return!L(e)}function Z(e,t){let n=[],r=0,i=0;for(;r<e.length;r++){for(;i<r&&!(q(t)?t(n[i],e[r]):n[i]===e[r]);)i++;i===r&&n.push(e[r]),i=0}return n}function X(e=1e3,t=!1){return new Promise((n,r)=>setTimeout(t?r:n,e))}function v(e){let t=[];for(let n=1;n<e.length;n+=2)t.push(e[n]);return t}function x(e){let t=[];for(let n=0;n<e.length;n+=2)t.push(e[n]);return t}function q(e){return typeof e=="function"}function h(e){return e!==null&&typeof e=="object"&&Array.isArray(e)===!1}function E(e){return Array.isArray(e)}function S(e){return typeof e=="string"||e instanceof String}function Y(e){if(!h(e))throw new Error("isObjectEmpty: input not an object");return Object.getOwnPropertyNames(e)>0}function ee(e,t){if(t===0)return e.slice(1);if(t<e.length-1)return e.slice(0,t).concat(e.slice(t+1));if(t===e.length-1)return e.slice(0,-1);throw new Error(`Invalid index: ${t}`)}function te(e,{include:t=[],exclude:n=[],asArray:r=!1,deepClone:i=!1,transform:u}={}){let s;if(t?.length>=1){s={};for(let o=0;o<t.length;o++){if(!Object.hasOwn(e,t[o]))throw new Error(`Unrecognized include key: ${t[o]}`);s[t[o]]=e[t[o]]}}else if(n?.length>=1){s={...e};for(let o=0;o<n.length;o++){if(!Object.hasOwn(e,n[o]))throw new Error(`Unrecognized exclude key: ${n[o]}`);delete s[n[o]]}}else s={...e};return(()=>{if(!r)return s;let o=Object.keys(s),p=o.length,I=new Array(p);for(let d=0;d<p;d++)I[d]={key:o[d],value:s[o[d]]};return I})()}var C=globalThis.window,ne=!C&&globalThis.self,re=globalThis.process;function M(){return C&&"browser"||ne&&"webWorker"||re&&"node"}function ie(e){return e===M()}function z(){return P("MODE",!0)}function oe(e){return e===z()}function N(e,t){if(E(e))for(let n=e.length-1;n>=0;n--){let r=N(e[n],t);if(r)return r}return h(e)?e[t]:(S(e)||(0,y.default)(e))&&e}function P(e,t,n="",{required:r=!1,defaultValue:i,staticValue:u,ignoreTarget:s,rename:o}={}){let p=N(e,n)||u||i||"";if(r&&!p)throw new Error(`Missing environment variable:${n}`);return s?p:Object.assign(t??{},{[o??n]:p})}function U(e,t=[]){let r=e.prototype;Object.defineProperties(r,{events:{value:[...t,"error"],enumerable:!0,writable:!0},packageListener:{value:se,enumerable:!0,writable:!1},ensureEvent:{value:ue,enumerable:!0,writable:!1},on:{value:le,enumerable:!0,writable:!1},once:{value:ae,enumerable:!0,writable:!1},hasEvent:{value:ce,enumerable:!0,writable:!1},flush:{value:fe,enumerable:!0,writable:!1},emit:{value:he,enumerable:!0,writable:!1}})}function se(e,t={}){return{listener:e,persistent:t.persist??!0}}function ue(e){if(!Object.hasOwn(this.events,e)){let t=new Error(`Unrecognized event: ${e}`);throw this.emit("error",t),t}}function le(e,t){return this.ensureEvent(e),this.events[e].push(this.packageListener(t,{persist:!0})),()=>this.flush(e,t)}function ae(e,t){return this.ensureEvent(e),this.events[e].push(this.packageListener(t,{persist:!1})),()=>this.flush(e,t)}function ce(e){return Object.hasOwn(this.events,e)}function fe(e,t,n){return/^\*$/.test(e)?Object.keys(this.events).forEach(r=>this.flush(r,t,n)):(this.ensureEvent(e),typeof t=="function"?this.events[e]=this.events[e].filter(r=>r.listener!==t):typeof t=="string"?this.events[e]=this.events[e].filter(r=>r.id!==t):typeof n=="function"?this.events[e]=this.events[e].reduce((r,i)=>n(i)?r:[...r,i],[]):this.events[e]=[],this)}function he(e,...t){return this.ensureEvent(e),[...this.events[e]].forEach(n=>n.listener&&n.listener(...t)),this.events[e]=this.events[e].filter(({listener:n,persistent:r})=>r),this}U.construct=function(){let e={};for(let t=0;t<this.events.length;t++)e[this.events[t]]=[];this.events=e};function T(e,t=[]){let n=e,r=e.prototype,i=v(t),u=x(t);u.forEach((s,o)=>{Object.defineProperty(s.prototype,"name",{enumerable:!0,configurable:!0,get:function(){return i[o]}}),Object.defineProperty(s.prototype,"index",{enumerable:!0,configurable:!0,get:function(){return o}}),Object.defineProperty(r,`get${w(i[o])}State`,{enumerable:!0,configurable:!0,get:function(){return this.states[o]}})}),Object.defineProperty(n,"states",{value:i,enumerable:!0,writable:!0,configurable:!0}),Object.defineProperties(r,{states:{value:u,enumerable:!0,writable:!0,configurable:!0},state:{value:null,enumerable:!0,configurable:!0,writable:!0},getState:{value:ge,enumerable:!0,writable:!0,configurable:!0},setState:{value:pe,enumerable:!0,writable:!0,configurable:!0},inState:{value:de,enumerable:!0,writable:!0,configurable:!0},compareStates:{value:me,enumerable:!0,writable:!0,configurable:!0}})}function ge(e){if(e){let t=this.states.length;if(typeof e=="string"){for(let n=0;n<t;n++)if(this.states[n].name===e)return this.states[n]}else if(h(e)){for(let n=0;n<t;n++)if(this.states[n].name===e.name)return e}throw new Error(`Unrecognized state: ${e}`)}return this.state}function pe(e){let t=this.state?.name;return typeof e=="string"&&(e=this.getState(e)),this.state=e,typeof this.emit=="function"&&h(this.events)&&this.emit("stateChange",this.state.name,t,this),"init"in this.state&&this.state.init(),this}function de(e){return e===this.state.name||e===this.state.index}function me(e){let t={},n=this.constructor.states.length;for(let r=0;r<n;r++)t[this.constructor.states[r]]=r;return e(t,this.state.index)}T.construct=function(){this.states=this.states.map(e=>new e(this)),this.state=this.states[0]};var G=A(require("uuid"),1);function be(){return G.v4()}function ye(){return Math.random().toString(34).substring(2)}var we={debug:(...e)=>{},trace:(...e)=>{}},m=class extends Error{constructor(t,n){super(t,{cause:n}),this.name=this.constructor.name}};var l={};l.Idle=function(t){this.name="idle",this.taskRunner=t,this.getState=()=>this};l.Idle.prototype.run=function(t){return t(()=>this.taskRunner.setState(this.taskRunner.isConnected()?"connected":"pending"))};l.Pending=function(t){this.name="pending",this.taskRunner=t,this.getState=()=>this};l.Pending.prototype.init=function(){this.poll()};l.Pending.prototype.poll=function(){let t=setInterval(()=>{if(this.taskRunner.isConnected())return clearInterval(t),this.taskRunner.setState("connected");this.taskRunner.flush(),this.taskRunner.jobQueue.length===0&&(clearInterval(t),this.taskRunner.setState("idle"))},this.taskRunner.pollFrequency)};l.Pending.prototype.run=function(t){return t()};l.Connected=function(t){this.name="connected",this.taskRunner=t,this.getState=()=>this};l.Connected.prototype.init=function(){this.taskRunner.flush(),this.runJobs()};l.Connected.prototype.runJobs=function(){this.taskRunner.jobQueue.length===0?this.taskRunner.setState("idle"):this.taskRunner.isConnected()?(this.taskRunner.jobQueue.shift().exec(),this.runJobs()):this.taskRunner.setState("pending")};l.Connected.prototype.run=function(t){return t(()=>this.runJobs())};function f(e={}){let t=this.parseConf(e);this.timeout=t.timeout,this.logger=t.logger,this.isConnected=t.isConnected,this.pollFrequency=t.pollFrequency,this.jobQueue=[],this.state=null,this.states={idle:new l.Idle(this),pending:new l.Pending(this),connected:new l.Connected(this)},this.setState("idle")}f.prototype.parseConf=function(t){let n={};return n.logger=t.logger||we,n.timeout=t.timeout||3e4,n.pollFrequency=t.pollFrequency||1e3,n.isConnected=t.isConnected?t.isConnected:()=>!1,n};f.prototype.setState=function(e){let t=`[TRANSITION]:taskRunner ${this.state?.name}`;if(this.state=this.states[e],!this.state)throw new m(`Unrecognized state: ${e}`);"init"in this.state&&this.state.init()};f.prototype.queue=function(e){return this.jobQueue.push(e)};f.prototype.flush=function(){let e=Date.now();this.jobQueue=this.jobQueue.filter(t=>(e>=t.timeout&&t.exec(!0),e<t.timeout))};f.prototype.newJob=function(e,t){return n=>new Promise((r,i)=>{t.cb?this.queue({timeout:Date.now()+(t.timeout||this.timeout),exec:u=>{if(u)e(new Error("task timeout"));else try{e()}catch(s){e(new m("Synchronous error",s))}}}):this.queue({timeout:Date.now()+(t.timeout||this.timeout),exec:u=>{if(u)i(new Error("task timeout"));else try{e().then(r,i)}catch(s){i(new m("Synchronous error",s))}}}),n&&n()})};f.prototype.inState=function(e){return e===this.state.name};f.prototype.run=function(e,t){return typeof e=="function"&&(t=e,e={}),this.state.run(this.newJob(t,e))};function g(e,t,...n){this.route=t,this.middleware=n,this.queue=null,this.nextIndex=0;let r=function(i,u){return new g(e,t,...n).exec([e.beforeAll,n.map(o=>[e.beforeEach,o,e.afterEach]),e.afterAll,e.globalLast],i,u)};return r.skipAll=function(i,u){return new g(e,t,...n).exec([this.middleware],i,u)},r.exec=this.exec.bind(this),r}g.prototype.findNextErrHandlerIndex=function(e){let t=this.queue.length;for(;e<t;e++)if(this.queue.at(e).length>2)return e;return-1};g.prototype.runner=async function(e,t,n){this.nextIndex=t;let r=this.queue.at(this.nextIndex);r&&await r(e,this.runner.bind(this,e,t+1),n)};g.prototype.exec=async function(e,t,n){this.queue=e.flat(3),this.nextIndex=0;let r=this.queue.length,i={route:this.route,args:{...t},options:{onlyData:!0,...n},req:{},res:{}},u=null;for(;this.nextIndex<r;)try{await this.runner(i,this.nextIndex,u)}catch(s){if(u=s,this.nextIndex=this.findNextErrHandlerIndex(this.nextIndex+1),this.nextIndex===-1)throw s}return this.queue=null,i?.options?.onlyData?i.res.data:(delete i.args,delete i.options,i)};var a=class{constructor(){this.beforeAll=[],this.beforeEach=[],this.afterAll=[],this.afterEach=[]}};a.prototype.globalLast=async function(t,n,r){if(r)throw r;n()};a.prototype.flush=function(){this.globalLast=null,this.beforeAll.splice(0,this.beforeAll.length),this.beforeEach.splice(0,this.beforeEach.length),this.afterAll.splice(0,this.afterAll.length),this.afterEach.splice(0,this.afterEach.length)};a.prototype.setGlobalLast=function(t){this.globalLast=t};a.prototype.setBeforeAll=function(...t){this.beforeAll.push(...t)};a.prototype.setBeforeEach=function(...t){this.beforeEach.push(...t)};a.prototype.setAfterAll=function(...t){this.afterAll.push(...t)};a.prototype.setAfterEach=function(...t){this.afterEach.push(...t)};a.prototype.route=function(e,...t){return new g(this,e,...t)};