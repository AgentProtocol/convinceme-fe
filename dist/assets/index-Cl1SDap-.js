import{i as u,r as b,j as p,a as f}from"./index-BHsKPv69.js";import{x as m}from"./lit-html-DCUsG-AI.js";import{n as d,c as v,o as x}from"./if-defined-DgDGuuA_.js";const g=u`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var l=function(n,t,r,i){var s=arguments.length,o=s<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,r):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,t,r,i);else for(var c=n.length-1;c>=0;c--)(a=n[c])&&(o=(s<3?a(o):s>3?a(t,r,o):a(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let e=class extends f{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return m`
      <button ?disabled=${this.disabled} tabindex=${x(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};e.styles=[b,p,g];l([d()],e.prototype,"tabIdx",void 0);l([d({type:Boolean})],e.prototype,"disabled",void 0);l([d()],e.prototype,"color",void 0);e=l([v("wui-link")],e);
