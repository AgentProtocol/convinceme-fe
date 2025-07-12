import{i as m,a as s}from"./index-BHsKPv69.js";import{x as a}from"./lit-html-DCUsG-AI.js";import{c as p}from"./if-defined-DgDGuuA_.js";import"./index-JbMalUzc.js";import"./index-CZQ8xOSW.js";import"./index-Cu2Wsnf2.js";import"./index-DKAW_Isb.js";import"./index-CXvswYCf.js";import"./index-Cl1SDap-.js";import"./index-d8Njr0yM.js";const d=m`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;var u=function(o,e,i,r){var n=arguments.length,t=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,i,r);else for(var c=o.length-1;c>=0;c--)(l=o[c])&&(t=(n<3?l(t):n>3?l(e,i,t):l(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let f=class extends s{render(){return a`
      <wui-flex flexDirection="column" .padding=${["0","m","m","m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};f.styles=d;f=u([p("w3m-transactions-view")],f);export{f as W3mTransactionsView};
