const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/add-CAqOgjPT.js","assets/index-BHsKPv69.js","assets/index-CZQ8xOSW.js","assets/index-CbCp6H1W.css","assets/lit-html-DCUsG-AI.js","assets/all-wallets-C7CKUGmQ.js","assets/arrow-bottom-circle-B414BKSY.js","assets/app-store-B5y6Ayuk.js","assets/apple-DN3XzCKR.js","assets/arrow-bottom-5rFl09nm.js","assets/arrow-left-CNjCNz1d.js","assets/arrow-right-COtziG9E.js","assets/arrow-top-Cj6xnq4F.js","assets/bank-CBCoEMDk.js","assets/browser-KRAqEcK-.js","assets/bin-BA9qBKMh.js","assets/bitcoin-kJkh7lAb.js","assets/card-BWVGAXkS.js","assets/checkmark-Bd8mp-e1.js","assets/checkmark-bold-BAiWosQq.js","assets/chevron-bottom-e8qO_5-v.js","assets/chevron-left-C59Yy3lD.js","assets/chevron-right-bVImXRIn.js","assets/chevron-top-EhtZZQd2.js","assets/chrome-store-lv0TdIcr.js","assets/clock-J_MNEA1K.js","assets/close-C0SAs1kK.js","assets/compass-DEYKDYfI.js","assets/coinPlaceholder-BML27Sun.js","assets/copy-Cjk2N1ou.js","assets/cursor-Ck4isCyQ.js","assets/cursor-transparent-BPocEGk9.js","assets/circle-2kPIdAcf.js","assets/desktop-DNDM3oAZ.js","assets/disconnect-BEHEeZ_u.js","assets/discord-CnqgLhkV.js","assets/ethereum-B9FB1wDj.js","assets/etherscan-Dut_puaM.js","assets/extension-BG8PvAqA.js","assets/external-link-C4ke3lnp.js","assets/facebook-tYHQ8AE2.js","assets/farcaster-B_sWONgI.js","assets/filters-9kGjH84B.js","assets/github-DJKP-JDB.js","assets/google-Bj1x8yV7.js","assets/help-circle-BuncNXwX.js","assets/image-kZuOXx2v.js","assets/id-BkRMTi-o.js","assets/info-circle-CT_bB_mp.js","assets/lightbulb-BkQpvWl1.js","assets/mail-C8u-2J5Z.js","assets/mobile-BAVOXN_w.js","assets/more-C-wHiyx6.js","assets/network-placeholder-Cyguracj.js","assets/nftPlaceholder-Cf4s2VXZ.js","assets/off-sItS4g09.js","assets/play-store-BFp7jrPR.js","assets/plus-B3epEoSB.js","assets/qr-code-B6vHO4VL.js","assets/recycle-horizontal-CGe55ocd.js","assets/refresh-mFxpWcBf.js","assets/search-DZNMwgpK.js","assets/send-pTMX3Ulb.js","assets/swapHorizontal-DKAhtGCd.js","assets/swapHorizontalMedium-GBWHQJH9.js","assets/swapHorizontalBold-DlL92Y-0.js","assets/swapHorizontalRoundedBold-CrCgvUDa.js","assets/swapVertical-CMLyIjRH.js","assets/solana-quil0DH8.js","assets/telegram-CStqz_Ly.js","assets/three-dots-aosWMNXP.js","assets/twitch-SpycZjcM.js","assets/x-C07028FM.js","assets/twitterIcon-h_ecT1O4.js","assets/verify-BJcfjWaN.js","assets/verify-filled-BnISTV20.js","assets/wallet-nzm6O7W7.js","assets/walletconnect-CCpF7We_.js","assets/wallet-placeholder-CmtdKSA-.js","assets/warning-circle-BZ6XPRWb.js","assets/info-ZLxQswsW.js","assets/exclamation-triangle-BwMRQx91.js","assets/reown-logo-BjHjJJwS.js","assets/x-mark-CsaxQX2M.js"])))=>i.map(i=>d[i]);
import{_ as r}from"./index-CZQ8xOSW.js";import{a1 as z,a2 as B,i as P,r as R,X as M,a as L}from"./index-BHsKPv69.js";import{T,x as S,E as j}from"./lit-html-DCUsG-AI.js";const v={getSpacingStyles(t,e){if(Array.isArray(t))return t[e]?`var(--wui-spacing-${t[e]})`:void 0;if(typeof t=="string")return`var(--wui-spacing-${t})`},getFormattedDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t)},getHostName(t){try{return new URL(t).hostname}catch{return""}},getTruncateString({string:t,charsStart:e,charsEnd:i,truncate:n}){return t.length<=e+i?t:n==="end"?`${t.substring(0,e)}...`:n==="start"?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`},generateAvatarColors(t){const i=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),n=this.hexToRgb(i),o=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(o==null?void 0:o.replace("px","")),c=`${s}% ${s}% at 65% 40%`,u=[];for(let h=0;h<5;h+=1){const g=this.tintColor(n,.15*h);u.push(`rgb(${g[0]}, ${g[1]}, ${g[2]})`)}return`
    --local-color-1: ${u[0]};
    --local-color-2: ${u[1]};
    --local-color-3: ${u[2]};
    --local-color-4: ${u[3]};
    --local-color-5: ${u[4]};
    --local-radial-circle: ${c}
   `},hexToRgb(t){const e=parseInt(t,16),i=e>>16&255,n=e>>8&255,o=e&255;return[i,n,o]},tintColor(t,e){const[i,n,o]=t,a=Math.round(i+(255-i)*e),s=Math.round(n+(255-n)*e),c=Math.round(o+(255-o)*e);return[a,s,c]},isNumber(t){return{number:/^[0-9]+$/u}.number.test(t)},getColorTheme(t){var e;return t||(typeof window<"u"&&window.matchMedia&&typeof window.matchMedia=="function"?(e=window.matchMedia("(prefers-color-scheme: dark)"))!=null&&e.matches?"dark":"light":"dark")},splitBalance(t){const e=t.split(".");return e.length===2?[e[0],e[1]]:["0","00"]},roundNumber(t,e,i){return t.toString().length>=e?Number(t).toFixed(i):t},formatNumberToLocalString(t,e=2){return t===void 0?"0.00":typeof t=="number"?t.toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e}):parseFloat(t).toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e})}};function H(t,e){const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(o){customElements.get(t)||customElements.define(t,o)}}}function U(t,e){return customElements.get(t)||customElements.define(t,e),e}function I(t){return function(i){return typeof i=="function"?U(t,i):H(t,i)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:z},G=(t=F,e,i)=>{const{kind:n,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),n==="accessor"){const{name:s}=i;return{set(c){const u=e.get.call(this);e.set.call(this,c),this.requestUpdate(s,u,t)},init(c){return c!==void 0&&this.C(s,void 0,t,c),c}}}if(n==="setter"){const{name:s}=i;return function(c){const u=this[s];e.call(this,c),this.requestUpdate(s,u,t)}}throw Error("Unsupported decorator location: "+n)};function l(t){return(e,i)=>typeof i=="object"?G(t,e,i):((n,o,a)=>{const s=o.hasOwnProperty(a);return o.constructor.createProperty(a,n),s?Object.getOwnPropertyDescriptor(o,a):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=t=>t===null||typeof t!="object"&&typeof t!="function",W=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V={ATTRIBUTE:1,CHILD:2},C=t=>(...e)=>({_$litDirective$:t,values:e});let x=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,n){this._$Ct=e,this._$AM=i,this._$Ci=n}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=(t,e)=>{var n;const i=t._$AN;if(i===void 0)return!1;for(const o of i)(n=o._$AO)==null||n.call(o,e,!1),f(o,e);return!0},E=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e}while((i==null?void 0:i.size)===0)},k=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),K(e)}};function q(t){this._$AN!==void 0?(E(this),this._$AM=t,k(this)):this._$AM=t}function X(t,e=!1,i=0){const n=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(n))for(let a=i;a<n.length;a++)f(n[a],!1),E(n[a]);else n!=null&&(f(n,!1),E(n));else f(this,t)}const K=t=>{t.type==V.CHILD&&(t._$AP??(t._$AP=X),t._$AQ??(t._$AQ=q))};class Y extends x{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,i,n){super._$AT(e,i,n),k(this),this.isConnected=e._$AU}_$AO(e,i=!0){var n,o;e!==this.isConnected&&(this.isConnected=e,e?(n=this.reconnected)==null||n.call(this):(o=this.disconnected)==null||o.call(this)),i&&(f(this,e),E(this))}setValue(e){if(W(this._$Ct))this._$Ct._$AI(e,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=e,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Z{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class Q{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??(this.Y=new Promise(e=>this.Z=e))}resume(){var e;(e=this.Z)==null||e.call(this),this.Y=this.Z=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=t=>!N(t)&&typeof t.then=="function",O=1073741823;class J extends Y{constructor(){super(...arguments),this._$Cwt=O,this._$Cbt=[],this._$CK=new Z(this),this._$CX=new Q}render(...e){return e.find(i=>!D(i))??T}update(e,i){const n=this._$Cbt;let o=n.length;this._$Cbt=i;const a=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let c=0;c<i.length&&!(c>this._$Cwt);c++){const u=i[c];if(!D(u))return this._$Cwt=c,u;c<o&&u===n[c]||(this._$Cwt=O,o=0,Promise.resolve(u).then(async h=>{for(;s.get();)await s.get();const g=a.deref();if(g!==void 0){const $=g._$Cbt.indexOf(u);$>-1&&$<g._$Cwt&&(g._$Cwt=$,g.setValue(h))}}))}return T}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const tt=C(J);class et{constructor(){this.cache=new Map}set(e,i){this.cache.set(e,i)}get(e){return this.cache.get(e)}has(e){return this.cache.has(e)}delete(e){this.cache.delete(e)}clear(){this.cache.clear()}}const A=new et,it=P`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var m=function(t,e,i,n){var o=arguments.length,a=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(t,e,i,n);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(a=(o<3?s(a):o>3?s(e,i,a):s(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};const b={add:async()=>(await r(async()=>{const{addSvg:t}=await import("./add-CAqOgjPT.js");return{addSvg:t}},__vite__mapDeps([0,1,2,3,4]))).addSvg,allWallets:async()=>(await r(async()=>{const{allWalletsSvg:t}=await import("./all-wallets-C7CKUGmQ.js");return{allWalletsSvg:t}},__vite__mapDeps([5,1,2,3,4]))).allWalletsSvg,arrowBottomCircle:async()=>(await r(async()=>{const{arrowBottomCircleSvg:t}=await import("./arrow-bottom-circle-B414BKSY.js");return{arrowBottomCircleSvg:t}},__vite__mapDeps([6,1,2,3,4]))).arrowBottomCircleSvg,appStore:async()=>(await r(async()=>{const{appStoreSvg:t}=await import("./app-store-B5y6Ayuk.js");return{appStoreSvg:t}},__vite__mapDeps([7,1,2,3,4]))).appStoreSvg,apple:async()=>(await r(async()=>{const{appleSvg:t}=await import("./apple-DN3XzCKR.js");return{appleSvg:t}},__vite__mapDeps([8,1,2,3,4]))).appleSvg,arrowBottom:async()=>(await r(async()=>{const{arrowBottomSvg:t}=await import("./arrow-bottom-5rFl09nm.js");return{arrowBottomSvg:t}},__vite__mapDeps([9,1,2,3,4]))).arrowBottomSvg,arrowLeft:async()=>(await r(async()=>{const{arrowLeftSvg:t}=await import("./arrow-left-CNjCNz1d.js");return{arrowLeftSvg:t}},__vite__mapDeps([10,1,2,3,4]))).arrowLeftSvg,arrowRight:async()=>(await r(async()=>{const{arrowRightSvg:t}=await import("./arrow-right-COtziG9E.js");return{arrowRightSvg:t}},__vite__mapDeps([11,1,2,3,4]))).arrowRightSvg,arrowTop:async()=>(await r(async()=>{const{arrowTopSvg:t}=await import("./arrow-top-Cj6xnq4F.js");return{arrowTopSvg:t}},__vite__mapDeps([12,1,2,3,4]))).arrowTopSvg,bank:async()=>(await r(async()=>{const{bankSvg:t}=await import("./bank-CBCoEMDk.js");return{bankSvg:t}},__vite__mapDeps([13,1,2,3,4]))).bankSvg,browser:async()=>(await r(async()=>{const{browserSvg:t}=await import("./browser-KRAqEcK-.js");return{browserSvg:t}},__vite__mapDeps([14,1,2,3,4]))).browserSvg,bin:async()=>(await r(async()=>{const{binSvg:t}=await import("./bin-BA9qBKMh.js");return{binSvg:t}},__vite__mapDeps([15,1,2,3,4]))).binSvg,bitcoin:async()=>(await r(async()=>{const{bitcoinSvg:t}=await import("./bitcoin-kJkh7lAb.js");return{bitcoinSvg:t}},__vite__mapDeps([16,1,2,3,4]))).bitcoinSvg,card:async()=>(await r(async()=>{const{cardSvg:t}=await import("./card-BWVGAXkS.js");return{cardSvg:t}},__vite__mapDeps([17,1,2,3,4]))).cardSvg,checkmark:async()=>(await r(async()=>{const{checkmarkSvg:t}=await import("./checkmark-Bd8mp-e1.js");return{checkmarkSvg:t}},__vite__mapDeps([18,1,2,3,4]))).checkmarkSvg,checkmarkBold:async()=>(await r(async()=>{const{checkmarkBoldSvg:t}=await import("./checkmark-bold-BAiWosQq.js");return{checkmarkBoldSvg:t}},__vite__mapDeps([19,1,2,3,4]))).checkmarkBoldSvg,chevronBottom:async()=>(await r(async()=>{const{chevronBottomSvg:t}=await import("./chevron-bottom-e8qO_5-v.js");return{chevronBottomSvg:t}},__vite__mapDeps([20,1,2,3,4]))).chevronBottomSvg,chevronLeft:async()=>(await r(async()=>{const{chevronLeftSvg:t}=await import("./chevron-left-C59Yy3lD.js");return{chevronLeftSvg:t}},__vite__mapDeps([21,1,2,3,4]))).chevronLeftSvg,chevronRight:async()=>(await r(async()=>{const{chevronRightSvg:t}=await import("./chevron-right-bVImXRIn.js");return{chevronRightSvg:t}},__vite__mapDeps([22,1,2,3,4]))).chevronRightSvg,chevronTop:async()=>(await r(async()=>{const{chevronTopSvg:t}=await import("./chevron-top-EhtZZQd2.js");return{chevronTopSvg:t}},__vite__mapDeps([23,1,2,3,4]))).chevronTopSvg,chromeStore:async()=>(await r(async()=>{const{chromeStoreSvg:t}=await import("./chrome-store-lv0TdIcr.js");return{chromeStoreSvg:t}},__vite__mapDeps([24,1,2,3,4]))).chromeStoreSvg,clock:async()=>(await r(async()=>{const{clockSvg:t}=await import("./clock-J_MNEA1K.js");return{clockSvg:t}},__vite__mapDeps([25,1,2,3,4]))).clockSvg,close:async()=>(await r(async()=>{const{closeSvg:t}=await import("./close-C0SAs1kK.js");return{closeSvg:t}},__vite__mapDeps([26,1,2,3,4]))).closeSvg,compass:async()=>(await r(async()=>{const{compassSvg:t}=await import("./compass-DEYKDYfI.js");return{compassSvg:t}},__vite__mapDeps([27,1,2,3,4]))).compassSvg,coinPlaceholder:async()=>(await r(async()=>{const{coinPlaceholderSvg:t}=await import("./coinPlaceholder-BML27Sun.js");return{coinPlaceholderSvg:t}},__vite__mapDeps([28,1,2,3,4]))).coinPlaceholderSvg,copy:async()=>(await r(async()=>{const{copySvg:t}=await import("./copy-Cjk2N1ou.js");return{copySvg:t}},__vite__mapDeps([29,1,2,3,4]))).copySvg,cursor:async()=>(await r(async()=>{const{cursorSvg:t}=await import("./cursor-Ck4isCyQ.js");return{cursorSvg:t}},__vite__mapDeps([30,1,2,3,4]))).cursorSvg,cursorTransparent:async()=>(await r(async()=>{const{cursorTransparentSvg:t}=await import("./cursor-transparent-BPocEGk9.js");return{cursorTransparentSvg:t}},__vite__mapDeps([31,1,2,3,4]))).cursorTransparentSvg,circle:async()=>(await r(async()=>{const{circleSvg:t}=await import("./circle-2kPIdAcf.js");return{circleSvg:t}},__vite__mapDeps([32,1,2,3,4]))).circleSvg,desktop:async()=>(await r(async()=>{const{desktopSvg:t}=await import("./desktop-DNDM3oAZ.js");return{desktopSvg:t}},__vite__mapDeps([33,1,2,3,4]))).desktopSvg,disconnect:async()=>(await r(async()=>{const{disconnectSvg:t}=await import("./disconnect-BEHEeZ_u.js");return{disconnectSvg:t}},__vite__mapDeps([34,1,2,3,4]))).disconnectSvg,discord:async()=>(await r(async()=>{const{discordSvg:t}=await import("./discord-CnqgLhkV.js");return{discordSvg:t}},__vite__mapDeps([35,1,2,3,4]))).discordSvg,ethereum:async()=>(await r(async()=>{const{ethereumSvg:t}=await import("./ethereum-B9FB1wDj.js");return{ethereumSvg:t}},__vite__mapDeps([36,1,2,3,4]))).ethereumSvg,etherscan:async()=>(await r(async()=>{const{etherscanSvg:t}=await import("./etherscan-Dut_puaM.js");return{etherscanSvg:t}},__vite__mapDeps([37,1,2,3,4]))).etherscanSvg,extension:async()=>(await r(async()=>{const{extensionSvg:t}=await import("./extension-BG8PvAqA.js");return{extensionSvg:t}},__vite__mapDeps([38,1,2,3,4]))).extensionSvg,externalLink:async()=>(await r(async()=>{const{externalLinkSvg:t}=await import("./external-link-C4ke3lnp.js");return{externalLinkSvg:t}},__vite__mapDeps([39,1,2,3,4]))).externalLinkSvg,facebook:async()=>(await r(async()=>{const{facebookSvg:t}=await import("./facebook-tYHQ8AE2.js");return{facebookSvg:t}},__vite__mapDeps([40,1,2,3,4]))).facebookSvg,farcaster:async()=>(await r(async()=>{const{farcasterSvg:t}=await import("./farcaster-B_sWONgI.js");return{farcasterSvg:t}},__vite__mapDeps([41,1,2,3,4]))).farcasterSvg,filters:async()=>(await r(async()=>{const{filtersSvg:t}=await import("./filters-9kGjH84B.js");return{filtersSvg:t}},__vite__mapDeps([42,1,2,3,4]))).filtersSvg,github:async()=>(await r(async()=>{const{githubSvg:t}=await import("./github-DJKP-JDB.js");return{githubSvg:t}},__vite__mapDeps([43,1,2,3,4]))).githubSvg,google:async()=>(await r(async()=>{const{googleSvg:t}=await import("./google-Bj1x8yV7.js");return{googleSvg:t}},__vite__mapDeps([44,1,2,3,4]))).googleSvg,helpCircle:async()=>(await r(async()=>{const{helpCircleSvg:t}=await import("./help-circle-BuncNXwX.js");return{helpCircleSvg:t}},__vite__mapDeps([45,1,2,3,4]))).helpCircleSvg,image:async()=>(await r(async()=>{const{imageSvg:t}=await import("./image-kZuOXx2v.js");return{imageSvg:t}},__vite__mapDeps([46,1,2,3,4]))).imageSvg,id:async()=>(await r(async()=>{const{idSvg:t}=await import("./id-BkRMTi-o.js");return{idSvg:t}},__vite__mapDeps([47,1,2,3,4]))).idSvg,infoCircle:async()=>(await r(async()=>{const{infoCircleSvg:t}=await import("./info-circle-CT_bB_mp.js");return{infoCircleSvg:t}},__vite__mapDeps([48,1,2,3,4]))).infoCircleSvg,lightbulb:async()=>(await r(async()=>{const{lightbulbSvg:t}=await import("./lightbulb-BkQpvWl1.js");return{lightbulbSvg:t}},__vite__mapDeps([49,1,2,3,4]))).lightbulbSvg,mail:async()=>(await r(async()=>{const{mailSvg:t}=await import("./mail-C8u-2J5Z.js");return{mailSvg:t}},__vite__mapDeps([50,1,2,3,4]))).mailSvg,mobile:async()=>(await r(async()=>{const{mobileSvg:t}=await import("./mobile-BAVOXN_w.js");return{mobileSvg:t}},__vite__mapDeps([51,1,2,3,4]))).mobileSvg,more:async()=>(await r(async()=>{const{moreSvg:t}=await import("./more-C-wHiyx6.js");return{moreSvg:t}},__vite__mapDeps([52,1,2,3,4]))).moreSvg,networkPlaceholder:async()=>(await r(async()=>{const{networkPlaceholderSvg:t}=await import("./network-placeholder-Cyguracj.js");return{networkPlaceholderSvg:t}},__vite__mapDeps([53,1,2,3,4]))).networkPlaceholderSvg,nftPlaceholder:async()=>(await r(async()=>{const{nftPlaceholderSvg:t}=await import("./nftPlaceholder-Cf4s2VXZ.js");return{nftPlaceholderSvg:t}},__vite__mapDeps([54,1,2,3,4]))).nftPlaceholderSvg,off:async()=>(await r(async()=>{const{offSvg:t}=await import("./off-sItS4g09.js");return{offSvg:t}},__vite__mapDeps([55,1,2,3,4]))).offSvg,playStore:async()=>(await r(async()=>{const{playStoreSvg:t}=await import("./play-store-BFp7jrPR.js");return{playStoreSvg:t}},__vite__mapDeps([56,1,2,3,4]))).playStoreSvg,plus:async()=>(await r(async()=>{const{plusSvg:t}=await import("./plus-B3epEoSB.js");return{plusSvg:t}},__vite__mapDeps([57,1,2,3,4]))).plusSvg,qrCode:async()=>(await r(async()=>{const{qrCodeIcon:t}=await import("./qr-code-B6vHO4VL.js");return{qrCodeIcon:t}},__vite__mapDeps([58,1,2,3,4]))).qrCodeIcon,recycleHorizontal:async()=>(await r(async()=>{const{recycleHorizontalSvg:t}=await import("./recycle-horizontal-CGe55ocd.js");return{recycleHorizontalSvg:t}},__vite__mapDeps([59,1,2,3,4]))).recycleHorizontalSvg,refresh:async()=>(await r(async()=>{const{refreshSvg:t}=await import("./refresh-mFxpWcBf.js");return{refreshSvg:t}},__vite__mapDeps([60,1,2,3,4]))).refreshSvg,search:async()=>(await r(async()=>{const{searchSvg:t}=await import("./search-DZNMwgpK.js");return{searchSvg:t}},__vite__mapDeps([61,1,2,3,4]))).searchSvg,send:async()=>(await r(async()=>{const{sendSvg:t}=await import("./send-pTMX3Ulb.js");return{sendSvg:t}},__vite__mapDeps([62,1,2,3,4]))).sendSvg,swapHorizontal:async()=>(await r(async()=>{const{swapHorizontalSvg:t}=await import("./swapHorizontal-DKAhtGCd.js");return{swapHorizontalSvg:t}},__vite__mapDeps([63,1,2,3,4]))).swapHorizontalSvg,swapHorizontalMedium:async()=>(await r(async()=>{const{swapHorizontalMediumSvg:t}=await import("./swapHorizontalMedium-GBWHQJH9.js");return{swapHorizontalMediumSvg:t}},__vite__mapDeps([64,1,2,3,4]))).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await r(async()=>{const{swapHorizontalBoldSvg:t}=await import("./swapHorizontalBold-DlL92Y-0.js");return{swapHorizontalBoldSvg:t}},__vite__mapDeps([65,1,2,3,4]))).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await r(async()=>{const{swapHorizontalRoundedBoldSvg:t}=await import("./swapHorizontalRoundedBold-CrCgvUDa.js");return{swapHorizontalRoundedBoldSvg:t}},__vite__mapDeps([66,1,2,3,4]))).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await r(async()=>{const{swapVerticalSvg:t}=await import("./swapVertical-CMLyIjRH.js");return{swapVerticalSvg:t}},__vite__mapDeps([67,1,2,3,4]))).swapVerticalSvg,solana:async()=>(await r(async()=>{const{solanaSvg:t}=await import("./solana-quil0DH8.js");return{solanaSvg:t}},__vite__mapDeps([68,1,2,3,4]))).solanaSvg,telegram:async()=>(await r(async()=>{const{telegramSvg:t}=await import("./telegram-CStqz_Ly.js");return{telegramSvg:t}},__vite__mapDeps([69,1,2,3,4]))).telegramSvg,threeDots:async()=>(await r(async()=>{const{threeDotsSvg:t}=await import("./three-dots-aosWMNXP.js");return{threeDotsSvg:t}},__vite__mapDeps([70,1,2,3,4]))).threeDotsSvg,twitch:async()=>(await r(async()=>{const{twitchSvg:t}=await import("./twitch-SpycZjcM.js");return{twitchSvg:t}},__vite__mapDeps([71,1,2,3,4]))).twitchSvg,twitter:async()=>(await r(async()=>{const{xSvg:t}=await import("./x-C07028FM.js");return{xSvg:t}},__vite__mapDeps([72,1,2,3,4]))).xSvg,twitterIcon:async()=>(await r(async()=>{const{twitterIconSvg:t}=await import("./twitterIcon-h_ecT1O4.js");return{twitterIconSvg:t}},__vite__mapDeps([73,1,2,3,4]))).twitterIconSvg,verify:async()=>(await r(async()=>{const{verifySvg:t}=await import("./verify-BJcfjWaN.js");return{verifySvg:t}},__vite__mapDeps([74,1,2,3,4]))).verifySvg,verifyFilled:async()=>(await r(async()=>{const{verifyFilledSvg:t}=await import("./verify-filled-BnISTV20.js");return{verifyFilledSvg:t}},__vite__mapDeps([75,1,2,3,4]))).verifyFilledSvg,wallet:async()=>(await r(async()=>{const{walletSvg:t}=await import("./wallet-nzm6O7W7.js");return{walletSvg:t}},__vite__mapDeps([76,1,2,3,4]))).walletSvg,walletConnect:async()=>(await r(async()=>{const{walletConnectSvg:t}=await import("./walletconnect-CCpF7We_.js");return{walletConnectSvg:t}},__vite__mapDeps([77,1,2,3,4]))).walletConnectSvg,walletConnectLightBrown:async()=>(await r(async()=>{const{walletConnectLightBrownSvg:t}=await import("./walletconnect-CCpF7We_.js");return{walletConnectLightBrownSvg:t}},__vite__mapDeps([77,1,2,3,4]))).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await r(async()=>{const{walletConnectBrownSvg:t}=await import("./walletconnect-CCpF7We_.js");return{walletConnectBrownSvg:t}},__vite__mapDeps([77,1,2,3,4]))).walletConnectBrownSvg,walletPlaceholder:async()=>(await r(async()=>{const{walletPlaceholderSvg:t}=await import("./wallet-placeholder-CmtdKSA-.js");return{walletPlaceholderSvg:t}},__vite__mapDeps([78,1,2,3,4]))).walletPlaceholderSvg,warningCircle:async()=>(await r(async()=>{const{warningCircleSvg:t}=await import("./warning-circle-BZ6XPRWb.js");return{warningCircleSvg:t}},__vite__mapDeps([79,1,2,3,4]))).warningCircleSvg,x:async()=>(await r(async()=>{const{xSvg:t}=await import("./x-C07028FM.js");return{xSvg:t}},__vite__mapDeps([72,1,2,3,4]))).xSvg,info:async()=>(await r(async()=>{const{infoSvg:t}=await import("./info-ZLxQswsW.js");return{infoSvg:t}},__vite__mapDeps([80,1,2,3,4]))).infoSvg,exclamationTriangle:async()=>(await r(async()=>{const{exclamationTriangleSvg:t}=await import("./exclamation-triangle-BwMRQx91.js");return{exclamationTriangleSvg:t}},__vite__mapDeps([81,1,2,3,4]))).exclamationTriangleSvg,reown:async()=>(await r(async()=>{const{reownSvg:t}=await import("./reown-logo-BjHjJJwS.js");return{reownSvg:t}},__vite__mapDeps([82,1,2,3,4]))).reownSvg,"x-mark":async()=>(await r(async()=>{const{xMarkSvg:t}=await import("./x-mark-CsaxQX2M.js");return{xMarkSvg:t}},__vite__mapDeps([83,1,2,3,4]))).xMarkSvg};async function rt(t){if(A.has(t))return A.get(t);const i=(b[t]??b.copy)();return A.set(t,i),i}let d=class extends L{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `,S`${tt(rt(this.name),S`<div class="fallback"></div>`)}`}};d.styles=[R,M,it];m([l()],d.prototype,"size",void 0);m([l()],d.prototype,"name",void 0);m([l()],d.prototype,"color",void 0);m([l()],d.prototype,"aspectRatio",void 0);d=m([I("wui-icon")],d);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=C(class extends x{constructor(t){var e;if(super(t),t.type!==V.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var n,o;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(const a in e)e[a]&&!((n=this.nt)!=null&&n.has(a))&&this.st.add(a);return this.render(e)}const i=t.element.classList;for(const a of this.st)a in e||(i.remove(a),this.st.delete(a));for(const a in e){const s=!!e[a];s===this.st.has(a)||(o=this.nt)!=null&&o.has(a)||(s?(i.add(a),this.st.add(a)):(i.remove(a),this.st.delete(a)))}return T}}),nt=P`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600,
  .wui-font-micro-500 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var y=function(t,e,i,n){var o=arguments.length,a=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(t,e,i,n);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(a=(o<3?s(a):o>3?s(e,i,a):s(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let p=class extends L{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const e={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,S`<slot class=${at(e)}></slot>`}};p.styles=[R,nt];y([l()],p.prototype,"variant",void 0);y([l()],p.prototype,"color",void 0);y([l()],p.prototype,"align",void 0);y([l()],p.prototype,"lineClamp",void 0);p=y([I("wui-text")],p);const ot=P`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var w=function(t,e,i,n){var o=arguments.length,a=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(t,e,i,n);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(a=(o<3?s(a):o>3?s(e,i,a):s(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let _=class extends L{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&v.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&v.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&v.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&v.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&v.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&v.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&v.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&v.getSpacingStyles(this.margin,3)};
    `,S`<slot></slot>`}};_.styles=[R,ot];w([l()],_.prototype,"flexDirection",void 0);w([l()],_.prototype,"flexWrap",void 0);w([l()],_.prototype,"flexBasis",void 0);w([l()],_.prototype,"flexGrow",void 0);w([l()],_.prototype,"flexShrink",void 0);w([l()],_.prototype,"alignItems",void 0);w([l()],_.prototype,"justifyContent",void 0);w([l()],_.prototype,"columnGap",void 0);w([l()],_.prototype,"rowGap",void 0);w([l()],_.prototype,"gap",void 0);w([l()],_.prototype,"padding",void 0);w([l()],_.prototype,"margin",void 0);_=w([I("wui-flex")],_);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=t=>t??j;export{v as U,C as a,I as c,at as e,Y as f,l as n,dt as o,ut as r};
