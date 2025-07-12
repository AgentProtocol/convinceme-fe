import{i as m,r as c,a as f}from"./index-BHsKPv69.js";import{x as d}from"./lit-html-DCUsG-AI.js";import{n as u,c as v,o as w}from"./if-defined-DgDGuuA_.js";import"./index-TVg2SMgn.js";const x=m`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var o=function(a,i,r,n){var s=arguments.length,e=s<3?i:n===null?n=Object.getOwnPropertyDescriptor(i,r):n,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(a,i,r,n);else for(var p=a.length-1;p>=0;p--)(l=a[p])&&(e=(s<3?l(e):s>3?l(i,r,e):l(i,r))||e);return s>3&&e&&Object.defineProperty(i,r,e),e};let t=class extends f{constructor(){super(...arguments),this.disabled=!1}render(){return d`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${w(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?d`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};t.styles=[c,x];o([u()],t.prototype,"errorMessage",void 0);o([u({type:Boolean})],t.prototype,"disabled",void 0);o([u()],t.prototype,"value",void 0);o([u()],t.prototype,"tabIdx",void 0);t=o([v("wui-email-input")],t);
