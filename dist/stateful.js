import S from"is-number";function u(...e){return e.length>1?e.map(n=>n.charAt(0).toUpperCase()+n.slice(1)):e[0].charAt(0).toUpperCase()+e[0].slice(1)}function c(e){let n=[];for(let t=1;t<e.length;t+=2)n.push(e[t]);return n}function f(e){let n=[];for(let t=0;t<e.length;t+=2)n.push(e[t]);return n}function a(e){return e!==null&&typeof e=="object"&&Array.isArray(e)===!1}function g(e,n=[]){let t=e,r=e.prototype,o=c(n),s=f(n);s.forEach((l,i)=>{Object.defineProperty(l.prototype,"name",{enumerable:!0,configurable:!0,get:function(){return o[i]}}),Object.defineProperty(l.prototype,"index",{enumerable:!0,configurable:!0,get:function(){return i}}),Object.defineProperty(r,`get${u(o[i])}State`,{enumerable:!0,configurable:!0,get:function(){return this.states[i]}})}),Object.defineProperty(t,"states",{value:o,enumerable:!0,writable:!0,configurable:!0}),Object.defineProperties(r,{states:{value:s,enumerable:!0,writable:!0,configurable:!0},state:{value:null,enumerable:!0,configurable:!0,writable:!0},getState:{value:h,enumerable:!0,writable:!0,configurable:!0},setState:{value:m,enumerable:!0,writable:!0,configurable:!0},inState:{value:d,enumerable:!0,writable:!0,configurable:!0},compareStates:{value:p,enumerable:!0,writable:!0,configurable:!0}})}function h(e){if(e){let n=this.states.length;if(typeof e=="string"){for(let t=0;t<n;t++)if(this.states[t].name===e)return this.states[t]}else if(a(e)){for(let t=0;t<n;t++)if(this.states[t].name===e.name)return e}throw new Error(`Unrecognized state: ${e}`)}return this.state}function m(e){let n=this.state?.name;return typeof e=="string"&&(e=this.getState(e)),this.state=e,typeof this.emit=="function"&&a(this.events)&&this.emit("stateChange",this.state.name,n,this),"init"in this.state&&this.state.init(),this}function d(e){return e===this.state.name||e===this.state.index}function p(e){let n={},t=this.constructor.states.length;for(let r=0;r<t;r++)n[this.constructor.states[r]]=r;return e(n,this.state.index)}g.construct=function(){this.states=this.states.map(e=>new e(this)),this.state=this.states[0]};export{g as stateful};
