(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4784],{8903:function(e,a,c){Promise.resolve().then(c.bind(c,7516))},7516:function(e,a,c){"use strict";c.r(a),c.d(a,{default:function(){return g}});var s=c(7437),n=c(2265),o=c(895),i=c.n(o),r=c(7648),d=c(9376),t=c(8116),l=c(3569),_=c.n(l),u=function(){return(0,s.jsx)("div",{className:_().contenedor,children:(0,s.jsxs)("div",{className:_().fila,children:[(0,s.jsx)("h4",{className:_().celda,children:"Nombre"}),(0,s.jsx)("h4",{className:_().celda,children:"Descripci\xf3n"}),(0,s.jsx)("h4",{className:_().celda,children:"Precio"}),(0,s.jsx)("h4",{className:_().celda,children:"Comisi\xf3n"})]})})},p=c(6006),m=c.n(p),h=c(4868),x=c(6806),j=function(e){let{packet:a}=e,c=(0,d.useRouter)(),[o,i]=(0,n.useState)(!1),[r,t]=(0,n.useState)(null),l=e=>{i(!o),r&&""!=r||fetch("/api/paquetes/productos/".concat(e)).then(e=>{if(e.ok)return e.json()}).then(e=>{t(e),console.log(e)}).catch(e=>{setError(e),setLoading(!1)})},_=e=>{c.push("/paquetes/editar?id=".concat(e))};return(0,s.jsxs)("div",{className:"".concat(m().contenedor," ").concat(o&&m().levantado),children:[(0,s.jsxs)("div",{className:m().fila,onClick:()=>{l(a.pa_id)},children:[(0,s.jsx)("p",{className:m().celda,children:a.pa_nombre}),(0,s.jsx)("p",{className:m().celda,children:a.pa_descripcion}),(0,s.jsx)("p",{className:m().celda,children:(0,x.uf)(a.pa_precio)}),(0,s.jsx)("p",{className:m().celda,children:(0,x.uf)(a.pa_comision)})]}),o&&(0,s.jsxs)("div",{className:m().informacion,children:[(0,s.jsxs)("div",{className:m().productos,children:[(0,s.jsxs)("div",{className:m().encabezado,children:[(0,s.jsx)("h4",{className:m().item,children:"Nombre"}),(0,s.jsx)("h4",{className:m().item,children:"Cantidad"}),(0,s.jsx)("h4",{className:m().item,children:"Precio"})]}),r&&(0,s.jsx)(s.Fragment,{children:r.map(e=>(0,s.jsxs)("div",{className:m().contenido,children:[(0,s.jsx)("p",{className:m().item,children:e.produc_nombre}),(0,s.jsx)("p",{className:m().item,children:e.produc_pa_cantidad}),(0,s.jsxs)("p",{className:m().item,children:["$",e.produc_precio_venta]})]},e.produc_id))}),(0,s.jsx)("div",{className:m().piedepagina})]}),(0,s.jsx)("div",{className:m().opciones,children:(0,s.jsx)(h.zx,{text:"Editar",type:"aceptar",onPress:()=>{_(a.pa_id)}})})]})]})},f=c(4216),N=c.n(f),v=function(){return(0,s.jsx)("div",{className:N().contenedor})},k=function(e){let{buscar:a}=e,[c,o]=(0,n.useState)(null),[i,r]=(0,n.useState)(""),[d,l]=(0,n.useState)(null);return((0,n.useEffect)(()=>{fetch("/api/paquetes").then(e=>{if(e.ok)return e.json()}).then(e=>{l(e),console.log(e)}).catch(e=>{r(e),o(!1)})},[]),c)?(0,s.jsx)(t.Z,{}):i?(0,s.jsxs)("p",{children:["Error: ",i.message]}):(0,s.jsxs)("div",{children:[(0,s.jsx)(u,{}),d&&(0,s.jsx)(s.Fragment,{children:d.map((e,c)=>(0,s.jsx)("div",{children:e.pa_nombre.toLowerCase().includes(a.toLowerCase())&&(0,s.jsx)(j,{packet:e},e.pa_id)},c))}),(0,s.jsx)(v,{})]})},P=c(605),g=function(){let e=(0,d.useRouter)(),{data:a,status:c}=(0,P.useSession)(),[o,t]=(0,n.useState)("");return(0,n.useEffect)(()=>{"Administrador"!=a.user.role&&e.push("/")},[e]),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:i().navegacion,children:(0,s.jsxs)("h4",{children:[(0,s.jsx)(r.default,{href:"/paquetes",className:i().link,children:"Paquetes"})," ","\\"," "]})}),(0,s.jsxs)("div",{className:i().contenido,children:[(0,s.jsxs)("div",{className:i().herramientas,children:[(0,s.jsx)(h.ol,{placeholder:"Buscar paquete",onSearch:e=>{t(e)}}),(0,s.jsx)(h.zx,{text:"Nuevo",type:"cancelar",onPress:()=>{e.push("/paquetes/nuevo")}})]}),(0,s.jsx)(k,{buscar:o})]})]})}},8116:function(e,a,c){"use strict";c.d(a,{Z:function(){return i}});var s=c(7437);c(2265);var n=c(6065),o=c.n(n);function i(){return(0,s.jsxs)("div",{className:o().contenedor,children:[(0,s.jsx)("div",{className:o().cuadrado1}),(0,s.jsx)("div",{className:o().cuadrado2})]})}},895:function(e){e.exports={navegacion:"page_navegacion__Gve0_",link:"page_link__QavQS",contenido:"page_contenido__umHO9",herramientas:"page_herramientas__bWRdH"}},4216:function(e){e.exports={contenedor:"PacketFooter_contenedor__0WjsT"}},3569:function(e){e.exports={contenedor:"PacketHeader_contenedor__hG0Tk",fila:"PacketHeader_fila___Zjxj",celda:"PacketHeader_celda__V3fd4"}},6006:function(e){e.exports={contenedor:"PacketRow_contenedor__mHxpu",levantado:"PacketRow_levantado__18DYT",fila:"PacketRow_fila__K6His",celda:"PacketRow_celda__SoezQ",informacion:"PacketRow_informacion__sY6TV",encabezado:"PacketRow_encabezado__q3ni6",contenido:"PacketRow_contenido__eU_Bl",piedepagina:"PacketRow_piedepagina__NeWFU",item:"PacketRow_item__cKIw3",productos:"PacketRow_productos__fiUBq",opciones:"PacketRow_opciones__RxENs"}},6065:function(e){e.exports={cuadrado1:"LoadingScreen_cuadrado1__7A200",cuadrado2:"LoadingScreen_cuadrado2__NNxpH",moverCuadrado1:"LoadingScreen_moverCuadrado1__8i1jV",moverCuadrado2:"LoadingScreen_moverCuadrado2__pz35P"}}},function(e){e.O(0,[8675,1316,7123,8153,6307,7648,4868,2971,2117,1744],function(){return e(e.s=8903)}),_N_E=e.O()}]);