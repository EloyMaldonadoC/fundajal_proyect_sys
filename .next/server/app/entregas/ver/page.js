(()=>{var e={};e.id=1398,e.ids=[1398],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},55315:e=>{"use strict";e.exports=require("path")},17360:e=>{"use strict";e.exports=require("url")},35295:(e,a,n)=>{"use strict";n.r(a),n.d(a,{GlobalError:()=>t.a,__next_app__:()=>u,originalPathname:()=>_,pages:()=>d,routeModule:()=>p,tree:()=>c}),n(5136),n(23658),n(10468),n(91837);var r=n(23191),s=n(88716),i=n(37922),t=n.n(i),o=n(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);n.d(a,l);let c=["",{children:["entregas",{children:["ver",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,5136)),"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\entregas\\ver\\page.jsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(n.bind(n,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(n.bind(n,23658)),"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\layout.jsx"],loading:[()=>Promise.resolve().then(n.bind(n,10468)),"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\loading.js"],"not-found":[()=>Promise.resolve().then(n.bind(n,91837)),"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\not-found.jsx"],metadata:{icon:[async e=>(await Promise.resolve().then(n.bind(n,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\entregas\\ver\\page.jsx"],_="/entregas/ver/page",u={require:n,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/entregas/ver/page",pathname:"/entregas/ver",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},82511:(e,a,n)=>{Promise.resolve().then(n.bind(n,75824))},75824:(e,a,n)=>{"use strict";n.r(a),n.d(a,{default:()=>v});var r=n(10326),s=n(96736),i=n.n(s),t=n(35298),o=n.n(t),l=n(90434),c=n(35047),d=n(17577),_=n(77109),u=n(80256),p=n(65764),m=n(91575),x=n(86015),h=n(65284),g=n(81608),j=n(72557);let v=function(){(0,c.useRouter)(),(0,c.useSearchParams)().get("id");let{data:e}=(0,_.useSession)(),[a,n]=(0,d.useState)(!0),[s,t]=(0,d.useState)(""),[v,N]=(0,d.useState)(!1),[b,f]=(0,d.useState)([]),[C,E]=(0,d.useState)([]),[P,V]=(0,d.useState)([]),[y,z]=(0,d.useState)([]),[S,D]=(0,d.useState)([]),[w,F]=(0,d.useState)([]),[I,G]=(0,d.useState)([]);return a?r.jsx("div",{className:i().loadingScreen,children:r.jsx(u.Z,{})}):s?r.jsx("div",{className:i().error,children:(0,r.jsxs)("div",{className:i().errorContent,children:[r.jsx(o(),{className:i().textIcon,name:"cloud-offline-outline"}),r.jsx("p",{className:i().textError,children:"Ocurrio un error"})]})}):(0,r.jsxs)("div",{children:[r.jsx("div",{className:i().navegacion,children:(0,r.jsxs)("h4",{children:[r.jsx(l.default,{href:"/inicio",className:i().link,children:"Inicio"})," ","\\ Entrega \\"," ",0!=b.length?`${C.cli_municipio}, ${C.cli_estado}.`:"Cargando..."]})}),r.jsx("div",{className:i().herramientas,children:0!=b.length&&(0,r.jsxs)("p",{children:["Entrega realizada el d\xeda"," ",r.jsx("b",{children:(0,g.ji)(b.en_dia_entrega)})," a las"," ",(0,r.jsxs)("b",{children:[(0,g.ln)(b.en_hora_entrega)," hrs"]})]})}),(0,r.jsxs)("div",{className:i().contenido,children:[r.jsx("div",{className:i().subContenedor1,children:r.jsx(h.Z,{paquetes:I,productos:w,totalAPagar:()=>{}})}),(0,r.jsxs)("div",{className:i().subContenedor2,children:[r.jsx("div",{className:i().herramientasInfo,children:r.jsx(j.zx,{text:v?(0,r.jsxs)(r.Fragment,{children:[r.jsx("p",{children:"Visualizar"}),r.jsx(o(),{className:i().icon,name:"eye-outline"})]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx("p",{children:"Ocultar"}),r.jsx(o(),{className:i().icon,name:"eye-off-outline"})]}),type:v?"contenido-light":"contenido-dark",onPress:()=>N(!v)})}),!v&&(0,r.jsxs)("div",{className:i().scrollable,children:[r.jsx(p.Z,{municipio:C}),r.jsx(m.Z,{empleados:y,encargado:P}),r.jsx(x.Z,{vehiculos:S})]})]})]})]})}},65764:(e,a,n)=>{"use strict";n.d(a,{Z:()=>t});var r=n(10326),s=n(49895),i=n.n(s);let t=function({municipio:e}){return(0,r.jsxs)("div",{children:[r.jsx("div",{className:i().header,children:r.jsx("h3",{children:"Municipio"})}),r.jsx("div",{className:i().container,children:e?(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{children:[r.jsx("span",{children:"Municipio: "}),e.cli_municipio,", ",e.cli_estado]}),(0,r.jsxs)("p",{children:[r.jsx("span",{children:"Enlace: "}),e.cli_nombre]}),(0,r.jsxs)("p",{children:[r.jsx("span",{children:"Contacto: "}),e.cli_numero_contac]})]}):r.jsx("div",{children:r.jsx("p",{children:"Cargando..."})})}),r.jsx("div",{className:i().fooder})]})}},65284:(e,a,n)=>{"use strict";n.d(a,{Z:()=>t});var r=n(10326),s=n(66524),i=n.n(s);let t=function({productos:e,paquetes:a,totalAPagar:n}){let s=0,t=(e,a)=>{let r=e*a;return n(s+=r),r},o=e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0});return(0,r.jsxs)("div",{children:[r.jsx("div",{className:i().header,children:r.jsx("h3",{children:"Contenido de la Entrega"})}),(0,r.jsxs)("div",{className:i().titulo,children:[r.jsx("h4",{className:i().nombre,children:"Producto"}),r.jsx("h4",{className:i().cantidad,children:"Cantidad"}),r.jsx("h4",{className:i().precio,children:"Precio"}),r.jsx("h4",{className:i().total,children:"Total"})]}),a&&r.jsx(r.Fragment,{children:a.map((e,a)=>"en entrega"==e.en_pa_estado&&(0,r.jsxs)("div",{className:i().container,children:[r.jsx("div",{className:i().nombre,children:e.pa_nombre}),r.jsx("div",{className:i().cantidad,children:e.en_pa_cantidad}),r.jsx("div",{className:i().precio,children:o(e.pa_precio+e.en_pa_desc)}),r.jsx("div",{className:i().total,children:o(t(Number(e.en_pa_cantidad),Number(e.pa_precio+e.en_pa_desc)))})]},a))}),e&&r.jsx(r.Fragment,{children:e.map((e,a)=>"en entrega"==e.en_produc_estado&&(0,r.jsxs)("div",{className:i().container,children:[r.jsx("div",{className:i().nombre,children:e.produc_nombre}),r.jsx("div",{className:i().cantidad,children:e.en_produc_cantidad}),r.jsx("div",{className:i().precio,children:o(e.produc_precio_venta+e.en_produc_oferta)}),r.jsx("div",{className:i().total,children:o(t(Number(e.en_produc_cantidad),Number(e.produc_precio_venta+e.en_produc_oferta)))})]},a))}),r.jsx("div",{className:i().fooder}),(0,r.jsxs)("div",{className:i().totalPrecio,children:[r.jsx("div",{className:i().totalTexto,children:r.jsx("b",{children:"Total:"})}),r.jsx("div",{className:i().totalCantidad,children:r.jsx("b",{children:o(s)})})]})]})}},91575:(e,a,n)=>{"use strict";n.d(a,{Z:()=>t});var r=n(10326),s=n(44556),i=n.n(s);let t=function({encargado:e,empleados:a}){return(0,r.jsxs)("div",{children:[r.jsx("div",{className:i().header,children:r.jsx("h3",{children:"Personal"})}),(0,r.jsxs)("div",{className:i().container,children:[(0,r.jsxs)("p",{className:i().nombre,children:[r.jsx("b",{children:"Encargado: "}),e.emp_nombre," ",e.emp_apellido]}),a&&r.jsx(r.Fragment,{children:a.map((e,a)=>(0,r.jsxs)("p",{className:i().nombre,children:[(0,r.jsxs)("b",{children:[e.emp_rol,": "]}),e.emp_nombre," ",e.emp_apellido]},a))})]}),r.jsx("div",{className:i().fooder})]})}},86015:(e,a,n)=>{"use strict";n.d(a,{Z:()=>t});var r=n(10326),s=n(3449),i=n.n(s);let t=function({vehiculos:e}){return(0,r.jsxs)("div",{children:[r.jsx("div",{className:i().header,children:r.jsx("h3",{children:"Vehiculos"})}),r.jsx("div",{className:i().container,children:0!=e.length?r.jsx(r.Fragment,{children:e.map((e,a)=>(0,r.jsxs)("p",{children:[e.ve_marca," ",e.ve_modelo," ",e.ve_ano]},a))}):r.jsx("p",{children:"A\xfan no se han asignado vehiculos"})}),r.jsx("div",{className:i().fooder})]})}},96736:e=>{e.exports={navegacion:"page_navegacion__esLpI",link:"page_link__NuTIC",herramientas:"page_herramientas__GWAJd",contenido:"page_contenido__48Y7t",herramientasInfo:"page_herramientasInfo__LuW_d",icon:"page_icon__8VUTv",herramientasContenido:"page_herramientasContenido__pru3s",select:"page_select__T3if5",option:"page_option__NPzj5",inputNumberContainer:"page_inputNumberContainer__bRTWZ",inputNumber:"page_inputNumber__iYGoI",subContenedor1:"page_subContenedor1__4eyyR",subContenedor2:"page_subContenedor2__cJV7W",scrollable:"page_scrollable__gN968",scrollablePagos:"page_scrollablePagos__nw2x6",loadingScreen:"page_loadingScreen__6j_OB",error:"page_error__Y1nt4",textIcon:"page_textIcon__j7T_x",textNoFound:"page_textNoFound__8GB5n",textError:"page_textError__tyX9e",errorContent:"page_errorContent__Zss3p",menuPagos:"page_menuPagos__0wwuf",formulario:"page_formulario__k4Siv",input:"page_input__66ubu",date:"page_date__CwM7w",sectionTextarea:"page_sectionTextarea__kO9BQ",textarea:"page_textarea__8i_K1"}},49895:e=>{e.exports={header:"InfoMunicipio_header__OrBp7",container:"InfoMunicipio_container__8_QG7",fooder:"InfoMunicipio_fooder__wbG4y"}},66524:e=>{e.exports={header:"VisualizarContenidoDeEntrega_header__ezsWP",container:"VisualizarContenidoDeEntrega_container__elA4m",fooder:"VisualizarContenidoDeEntrega_fooder__sh8OJ",totalPrecio:"VisualizarContenidoDeEntrega_totalPrecio__v9NKh",totalTexto:"VisualizarContenidoDeEntrega_totalTexto__aZAC1",totalCantidad:"VisualizarContenidoDeEntrega_totalCantidad__R8unx",titulo:"VisualizarContenidoDeEntrega_titulo___7_yG",texto:"VisualizarContenidoDeEntrega_texto__Zi8Kv",nombre:"VisualizarContenidoDeEntrega_nombre__gaSHe",cantidad:"VisualizarContenidoDeEntrega_cantidad__41pxo",precio:"VisualizarContenidoDeEntrega_precio__y3oIb",total:"VisualizarContenidoDeEntrega_total__UNeKV"}},44556:e=>{e.exports={header:"VisualizarEmpleadosEntrega_header___vimn",container:"VisualizarEmpleadosEntrega_container__2oQwr",fooder:"VisualizarEmpleadosEntrega_fooder__i3vSU",nombre:"VisualizarEmpleadosEntrega_nombre__l0wgl",wrapper:"VisualizarEmpleadosEntrega_wrapper__MBv5l"}},3449:e=>{e.exports={header:"VisualizarVehiculosEntrega_header__JGbGD",container:"VisualizarVehiculosEntrega_container__SFIJK",fooder:"VisualizarVehiculosEntrega_fooder____Ipl",texto:"VisualizarVehiculosEntrega_texto__7i9x_"}},5136:(e,a,n)=>{"use strict";n.r(a),n.d(a,{default:()=>r});let r=(0,n(68570).createProxy)(String.raw`C:\Users\eloym\Documents\Fundacion Jalisco\fj_sistema_gen\src\app\entregas\ver\page.jsx#default`)}};var a=require("../../../webpack-runtime.js");a.C(e);var n=e=>a(a.s=e),r=a.X(0,[8948,1404,434,4424],()=>n(35295));module.exports=r})();