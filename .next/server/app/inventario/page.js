(()=>{var e={};e.id=7513,e.ids=[7513],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},55315:e=>{"use strict";e.exports=require("path")},17360:e=>{"use strict";e.exports=require("url")},55265:(e,s,n)=>{"use strict";n.r(s),n.d(s,{GlobalError:()=>r.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>u,routeModule:()=>m,tree:()=>c}),n(53549),n(23658),n(10468),n(91837);var a=n(23191),t=n(88716),o=n(37922),r=n.n(o),i=n(95231),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);n.d(s,l);let c=["",{children:["inventario",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,53549)),"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\inventario\\page.jsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(n.bind(n,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(n.bind(n,23658)),"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\layout.jsx"],loading:[()=>Promise.resolve().then(n.bind(n,10468)),"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\loading.js"],"not-found":[()=>Promise.resolve().then(n.bind(n,91837)),"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\not-found.jsx"],metadata:{icon:[async e=>(await Promise.resolve().then(n.bind(n,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\inventario\\page.jsx"],d="/inventario/page",p={require:n,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:t.x.APP_PAGE,page:"/inventario/page",pathname:"/inventario",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},71996:(e,s,n)=>{Promise.resolve().then(n.bind(n,74517))},74517:(e,s,n)=>{"use strict";n.r(s),n.d(s,{default:()=>p});var a=n(10326),t=n(17577),o=n(90434),r=n(35047),i=n(40707),l=n.n(i),c=n(80256),u=n(72557),d=n(77109);let p=function(){let{data:e,status:s}=(0,d.useSession)(),n=(0,r.useRouter)(),[i,p]=(0,t.useState)(null),[m,h]=(0,t.useState)(""),[x,_]=(0,t.useState)(!1),[g,v]=(0,t.useState)([]),[j,f]=(0,t.useState)(null),P=e=>{console.log(e),fetch(`/api/inventario/productos/${e}`).then(e=>{if(!e.ok)throw Error("Network response was not ok");return e.json()}).then(e=>{f(e[0]),p(!1),console.log(e[0])}).catch(e=>{h(e),p(!1)})},b=e=>{""!=e&&fetch(`/api/inventario/busqueda/${e}`).then(e=>{if(!e.ok)throw Error("Network response was not ok");return e.json()}).then(e=>{v(e),p(!1),console.log(e)}).catch(e=>{h(e),p(!1)})};return i?a.jsx(c.Z,{}):m?(0,a.jsxs)("p",{children:["Error: ",m.message]}):(0,a.jsxs)("div",{children:[a.jsx("div",{className:l().navegacion,children:(0,a.jsxs)("h4",{children:[a.jsx(o.default,{href:"/inventario",className:l().link,children:"Inventario"})," ","\\"," "]})}),(0,a.jsxs)("div",{className:l().busqueda,children:[a.jsx(u.ol,{placeholder:"Buscar Producto",onSearch:e=>{b(e)}}),a.jsx(u.zx,{text:"Laminas",type:"cancelar",onPress:()=>{console.log("laminas"),fetch("/api/inventario/busqueda/lamina").then(e=>{if(!e.ok)throw Error("Network response was not ok");return e.json()}).then(e=>{v(e),p(!1),console.log(e)}).catch(e=>{h(e),p(!1)})}}),a.jsx(u.zx,{text:"Todos los productos",type:"cancelar",onPress:()=>{_(!x)}}),a.jsx(u.zx,{text:"Nueva entrada",type:"cancelar",onPress:()=>{n.push("/inventario/nuevo")}})]}),(0,a.jsxs)("div",{className:l().container,children:[a.jsx("div",{className:l().tabla,children:a.jsx(u.iA,{productos:g,onClickRow:e=>{P(e)}})}),a.jsx("div",{className:l().info,children:a.jsx(u.kI,{proveedor:j})})]})]})}},40707:e=>{e.exports={navegacion:"page_navegacion__x6_hY",busqueda:"page_busqueda__Z9hng",container:"page_container__QXRyS",tabla:"page_tabla__YkcON",info:"page_info__LIKwi",link:"page_link___DoF4"}},53549:(e,s,n)=>{"use strict";n.r(s),n.d(s,{default:()=>a});let a=(0,n(68570).createProxy)(String.raw`C:\Users\eloym\Documents\Fundacion Jalisco\fj_sistema_gen\src\app\inventario\page.jsx#default`)}};var s=require("../../webpack-runtime.js");s.C(e);var n=e=>s(s.s=e),a=s.X(0,[8948,1404,434,4424],()=>n(55265));module.exports=a})();