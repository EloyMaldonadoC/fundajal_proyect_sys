(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1489],{2401:function(e,a,t){Promise.resolve().then(t.bind(t,9500))},9500:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return A}});var n=t(7437),r=t(2265),i=t(7648),s=t(9376),o=t(1839),c=t.n(o),d=t(8116),l=t(4868),_=t(3187),u=t(6812),p=t(9447),h=t.n(p),m=t(5754),x=t.n(m),j=function(e){let{onChange:a,inicialiced:t,id:i}=e,[s,o]=(0,r.useState)(0);return(0,r.useEffect)(()=>{if(t)for(let e=0;e<t.length;e++){if(t[e].produc_id==i||t[e].pa_id==i){o(t[e].produc_id==i?t[e].en_produc_cantidad:t[e].en_pa_cantidad);return}o(0)}},[t,i]),(0,n.jsx)("input",{className:x().input,type:"number",min:0,value:s,onChange:()=>{let e=event.target.value;o(e),a(e)}})},f=t(8156),g=t.n(f),b=function(e){let{onChange:a,inicialiced:t,id:i}=e,[s,o]=(0,r.useState)(0);return(0,r.useEffect)(()=>{if(t)for(let e=0;e<t.length;e++){if(t[e].produc_id==i||t[e].pa_id==i){o(t[e].produc_id==i?t[e].en_produc_oferta:t[e].en_pa_desc);return}o(0)}},[t,i]),(0,n.jsx)("input",{className:g().input,type:"number",value:s,onChange:()=>{let e=event.target.value;o(e),a(e)}})},v=t(6806),N=function(e){let{idEntrega:a,lista:t,seleccionados:i,update:s,incrementoPrede:o}=e,[c,d]=(0,r.useState)([]),[_,u]=(0,r.useState)([]),[p,m]=(0,r.useState)(!1),[x,f]=(0,r.useState)(!0),[g,N]=(0,r.useState)(""),[E,T]=(0,r.useState)(""),[S,C]=(0,r.useState)(1);(0,r.useEffect)(()=>{fetch("/api/productos").then(e=>{if(!e.ok)throw Error("Response is not ok");return e.json()}).then(e=>{d(e),f(!1)}).catch(e=>{N(e),f(!1)})},[]),(0,r.useEffect)(()=>{u(t)},[t]);let P=(e,t)=>{let n=_.find(a=>a.produc_id===e.produc_id);if(""===t||"0"===t){let a=_.filter(a=>a.produc_id!==e.produc_id);u(a),i(a)}else if(n){let n=_.map(n=>n.produc_id===e.produc_id?{...n,en_id:Number(a),produc_id:Number(e.produc_id),en_produc_cantidad:Number(t)}:n);u(n),i(n)}else{let n={...e,en_id:Number(a),en_produc_cantidad:Number(t),en_produc_estado:"en entrega",en_produc_oferta:o,en_produc_precio:e.produc_precio_venta};u([..._,n]),i([..._,n])}},k=(e,a)=>{let t=_.map(t=>t.produc_id===e.produc_id?{...t,en_produc_oferta:Number(a)}:t);u(t),i(t),s(0)},w=e=>{C(e)},y=5*S,F=c.filter(e=>e.produc_nombre.toLowerCase().includes(E.toLowerCase())).slice(y-5,y),q=Math.ceil(c.filter(e=>e.produc_nombre.toLowerCase().includes(E.toLowerCase())).length/5);return g?(0,n.jsxs)("p",{children:["Error: ",g.message]}):(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:h().header,children:[p?(0,n.jsx)("h3",{children:"Productos Totales"}):(0,n.jsx)("h3",{children:"Productos"}),!p&&(0,n.jsx)(l.ol,{type:"light",placeholder:"Buscar producto",onSearch:e=>T(e)}),(0,n.jsx)(l.zx,{text:"Lista",type:"aceptar",onPress:()=>{m(!p)}})]}),(0,n.jsx)("div",{className:h().titulo,children:p?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h4",{className:h().nombreTotal,children:"Producto"}),(0,n.jsx)("h4",{className:h().precioTotal,children:"precio"}),(0,n.jsx)("h4",{className:h().modificadorTotal,children:"modificador"}),(0,n.jsx)("h4",{className:h().cantidadTotal,children:"cantidad"})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h4",{className:h().nombre,children:"Producto"}),(0,n.jsx)("h4",{className:h().precio,children:"precio"}),(0,n.jsx)("h4",{className:h().cantidad,children:"cantidad"})]})}),x?(0,n.jsx)("div",{className:h().container,children:"Cargando..."}):(0,n.jsx)(n.Fragment,{children:0!=c.length?(0,n.jsx)(n.Fragment,{children:p?(0,n.jsx)("div",{children:_.map((e,a)=>(0,n.jsxs)("div",{className:h().container,children:[(0,n.jsx)("div",{className:h().nombreTotal,children:e.produc_nombre}),(0,n.jsxs)("div",{className:h().precioTotal,children:["$",Number(e.produc_precio_venta)+Number(e.en_produc_oferta)]}),(0,n.jsx)("div",{className:h().modificadorTotal,children:(0,n.jsx)(b,{inicialiced:_,id:e.produc_id,onChange:a=>{k(e,a)}})}),(0,n.jsx)("div",{className:h().cantidadTotal,children:e.en_produc_cantidad})]},a))}):(0,n.jsx)(n.Fragment,{children:F.map((e,a)=>(0,n.jsx)("div",{children:e.produc_nombre.toLowerCase().includes(E.toLowerCase())&&(0,n.jsxs)("div",{className:h().container,children:[(0,n.jsx)("div",{className:h().nombre,children:e.produc_nombre}),(0,n.jsx)("div",{className:h().precio,children:(0,v.uf)(e.produc_precio_venta)}),(0,n.jsx)("div",{className:h().cantidad,children:(0,n.jsx)(j,{inicialiced:_,id:e.produc_id,onChange:a=>P(e,a)})})]})},a))})}):(0,n.jsx)("div",{className:h().container,children:(0,n.jsx)("p",{children:"Aun no hay productos"})})}),(0,n.jsx)("div",{className:h().fooder}),!p&&(0,n.jsx)("div",{className:h().buttonsContainer,children:[...Array(q).keys()].map(e=>(0,n.jsx)("button",{className:"".concat(h().button," ").concat(e+1===S?h().disabled:h().enabled),onClick:()=>w(e+1),disabled:e+1===S,children:e+1},e))})]})},E=t(828),T=t.n(E),S=function(e){let{idEntrega:a,lista:t,seleccionados:i,update:s,incrementoPrede:o}=e,[c,d]=(0,r.useState)([]),[_,u]=(0,r.useState)([]),[p,h]=(0,r.useState)(!1),[m,x]=(0,r.useState)(!0),[f,g]=(0,r.useState)(""),[v,N]=(0,r.useState)(""),[E,S]=(0,r.useState)(1);(0,r.useEffect)(()=>{fetch("/api/paquetes").then(e=>{if(!e.ok)throw Error("Response is not ok");return e.json()}).then(e=>{d(e),x(!1)}).catch(e=>{g(e),x(!1)})},[]),(0,r.useEffect)(()=>{u(t)},[t]);let C=(e,a)=>{let t=_.map(t=>t.pa_id===e.pa_id?{...t,en_pa_desc:Number(a)}:t);u(t),i(t),s(0)},P=(e,t)=>{let n=_.find(a=>a.pa_id===e.pa_id);if(""===t||"0"===t){let a=_.filter(a=>a.pa_id!==e.pa_id);u(a),i(a)}else if(n){let n=_.map(n=>n.pa_id===e.pa_id?{...n,en_id:Number(a),pa_id:Number(e.pa_id),en_pa_cantidad:Number(t)}:n);u(n),i(n)}else{let n={...e,en_id:Number(a),en_pa_desc:o,en_pa_estado:"en entrega",en_pa_precio:e.pa_precio,en_pa_cantidad:Number(t)};u([..._,n]),i([..._,n])}},k=e=>{S(e)},w=5*E,y=c.filter(e=>e.pa_nombre.toLowerCase().includes(v.toLowerCase())).slice(w-5,w),F=Math.ceil(c.filter(e=>e.pa_nombre.toLowerCase().includes(v.toLowerCase())).length/5);return f?(0,n.jsxs)("p",{children:["Error: ",f.message]}):(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:T().header,children:[p?(0,n.jsx)("h3",{children:"Paquetes Totales"}):(0,n.jsx)("h3",{children:"Paquetes"}),!p&&(0,n.jsx)(l.ol,{type:"light",placeholder:"Buscar producto",onSearch:e=>N(e)}),(0,n.jsx)(l.zx,{text:"Lista",type:"aceptar",onPress:()=>h(!p)})]}),(0,n.jsx)("div",{className:T().titulo,children:p?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h4",{className:T().nombreTotal,children:"Producto"}),(0,n.jsx)("h4",{className:T().precioTotal,children:"precio"}),(0,n.jsx)("h4",{className:T().modificadorTotal,children:"modificador"}),(0,n.jsx)("h4",{className:T().cantidadTotal,children:"cantidad"})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h4",{className:T().nombre,children:"Producto"}),(0,n.jsx)("h4",{className:T().precio,children:"precio"}),(0,n.jsx)("h4",{className:T().cantidad,children:"cantidad"})]})}),m?(0,n.jsx)("div",{className:T().container,children:"Cargando..."}):(0,n.jsx)(n.Fragment,{children:0!=c.length?(0,n.jsx)(n.Fragment,{children:p?(0,n.jsx)("div",{children:_.map((e,a)=>(0,n.jsxs)("div",{className:T().container,children:[(0,n.jsx)("div",{className:T().nombreTotal,children:e.pa_nombre}),(0,n.jsxs)("div",{className:T().precioTotal,children:["$",Number(e.pa_precio)+Number(e.en_pa_desc)]}),(0,n.jsx)("div",{className:T().modificadorTotal,children:(0,n.jsx)(b,{inicialiced:_,id:e.pa_id,onChange:a=>{C(e,a)}})}),(0,n.jsx)("div",{className:T().cantidadTotal,children:e.en_pa_cantidad})]},a))}):(0,n.jsx)(n.Fragment,{children:y.map((e,a)=>(0,n.jsx)("div",{children:e.pa_nombre.toLowerCase().includes(v.toLowerCase())&&(0,n.jsxs)("div",{className:T().container,children:[(0,n.jsx)("div",{className:T().nombre,children:e.pa_nombre}),(0,n.jsxs)("div",{className:T().precio,children:["$",e.pa_precio]}),(0,n.jsx)("div",{className:T().cantidad,children:(0,n.jsx)(j,{inicialiced:_,id:e.pa_id,onChange:a=>P(e,a)})})]})},a))})}):(0,n.jsx)("div",{className:T().container,children:(0,n.jsx)("p",{children:"Aun no hay productos"})})}),(0,n.jsx)("div",{className:T().fooder}),!p&&(0,n.jsx)("div",{className:T().buttonsContainer,children:[...Array(F).keys()].map(e=>(0,n.jsx)("button",{className:"".concat(T().button," ").concat(e+1===E?T().disabled:T().enabled),onClick:()=>k(e+1),disabled:e+1===E,children:e+1},e))})]})},C=t(6832),P=t.n(C),k=t(4067),w=function(e){let{fechaEntrega:a,fechaSalida:t,onChangeDate:r,onChangeExit:i,horaSalida:s,onChangeHoraSalida:o,horaEntrega:c,onChangeHoraEntrega:d,validar:l}=e;return(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:P().header,children:(0,n.jsx)("h3",{children:"Horarios de entrega"})}),(0,n.jsxs)("div",{className:P().container,children:[(0,n.jsx)(k.F,{text:"Fecha de Entrega: ",value:a,onChange:e=>r(e),validation:!!l&&""==a}),(0,n.jsx)(k.a,{text:"Hora de Entrega: ",time:c,timeSelect:e=>d(e),validation:!!l&&""==c}),(0,n.jsx)(k.F,{text:"Fecha de Salida: ",value:t,onChange:e=>i(e),validation:!!l&&""==t}),(0,n.jsx)(k.a,{text:"Hora de Salida: ",time:s,timeSelect:e=>o(e),validation:!!l&&""==s})]}),(0,n.jsx)("div",{className:P().fooder})]})},y=t(8999),F=t.n(y);t(957);var q=t(244),L=t(605),z=t(9172),A=function(){let{data:e,status:a}=(0,L.useSession)(),t=(0,s.useSearchParams)(),o=(0,s.useRouter)(),p=t.get("id"),[h,m]=(0,r.useState)(!0),[x,j]=(0,r.useState)(""),[f,g]=(0,r.useState)(!1),[b,E]=(0,r.useState)(!1),[T,C]=(0,r.useState)(!1),[P,k]=(0,r.useState)(!0),[y,A]=(0,r.useState)(!1),[I,D]=(0,r.useState)(!1),[O,M]=(0,r.useState)(!1),[R,Z]=(0,r.useState)(!1),[J,G]=(0,r.useState)(!1),[H,Q]=(0,r.useState)(null),[U,V]=(0,r.useState)(0),[W,B]=(0,r.useState)(0),[X,Y]=(0,r.useState)(0),[K,$]=(0,r.useState)(""),[ee,ea]=(0,r.useState)(""),[et,en]=(0,r.useState)(""),[er,ei]=(0,r.useState)(""),[es,eo]=(0,r.useState)(!1),[ec,ed]=(0,r.useState)([]),[el,e_]=(0,r.useState)([]),[eu,ep]=(0,r.useState)(!1),[eh,em]=(0,r.useState)(0),[ex,ej]=(0,r.useState)(0),[ef,eg]=(0,r.useState)(!0),[eb,ev]=(0,r.useState)(!1),[eN,eE]=(0,r.useState)(0),[eT,eS]=(0,r.useState)(0),[eC,eP]=(0,r.useState)(0),[ek,ew]=(0,r.useState)(0);(0,r.useEffect)(()=>{fetch("/api/entregas/".concat(p)).then(e=>{if(!e.ok)throw Error("Entrega no encontrada");return e.json()}).then(a=>{"Administrador"===e.user.role||a.emp_id===e.user.id?(Q(a),Y(a.emp_id),em(a.en_incremento_producto),ej(a.en_incremento_paquete),$(a.en_dia_entrega?a.en_dia_entrega.split("T")[0]:""),ea(a.en_dia_salida?a.en_dia_salida.split("T")[0]:""),ei(a.en_hora_entrega?a.en_hora_entrega:""),en(a.en_hora_salida?a.en_hora_salida:""),"en edici\xf3n"==a.en_estado||"por confirmar"==a.en_estado?m(!1):o.push("/entregas")):o.push("/")}).catch(e=>{j(e),m(!1)}),fetch("/api/entregas/productos/".concat(p)).then(e=>{if(!e.ok)throw Error("Response is  not ok");return e.json()}).then(e=>{ed(e)}).catch(e=>{j(e)}),fetch("/api/entregas/paquetes/".concat(p)).then(e=>{if(!e.ok)throw Error("Error al encontrar los paquetes");return e.json()}).then(e=>{e_(e),0!=e.length&&null!=e[0].en_pa_desc&&ej(Number(e[0].en_pa_desc))}).catch(e=>{j(e)})},[p,o]),(0,r.useEffect)(()=>{fetch("/api/entregas/deudas/".concat(p)).then(e=>{if(!e.ok)throw Error("Response is not ok");return e.json()}).then(e=>{B(e.deu_abono),V(e.deu_deuda)}).catch(e=>{j(e)})},[p]),(0,r.useEffect)(()=>{if(0!=ec.length){let e=0;for(let a=0;a<ec.length;a++)e+=ec[a].en_produc_cantidad*(ec[a].produc_precio_venta+ec[a].en_produc_oferta);eE(e)}else eE(0)},[ec]),(0,r.useEffect)(()=>{if(0!=el.length){let e=0;for(let a=0;a<el.length;a++)e+=el[a].en_pa_cantidad*(el[a].pa_precio+el[a].en_pa_desc);eS(e)}else eS(0)},[el]),(0,r.useEffect)(()=>{if(0!=ec.length){let e=0,a=0;for(let t=0;t<ec.length;t++)e+=ec[t].produc_parti_fun*ec[t].en_produc_cantidad,a+=ec[t].produc_parti_enlace*ec[t].en_produc_cantidad;for(let t=0;t<el.length;t++)e+=el[t].pa_comision*el[t].en_pa_cantidad,a+=el[t].pa_comision*el[t].en_pa_cantidad;eP(e),ew(a)}},[eN,el,ec]),(0,r.useEffect)(()=>{V(eN+eT)},[eN,eT]);let ey=async()=>{if(!P){g(!0);try{if(I&&await fetch("/api/entregas/".concat(p),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({en_dia_entrega:new Date(K),en_hora_entrega:""!=er?er:null,en_dia_salida:new Date(ee),en_hora_salida:""!=et?et:null,en_incremento_producto:eh,en_incremento_paquete:ex,en_estado:""!=er?"en edici\xf3n":"por confirmar"})}),O){let e=await fetch("/api/entregas/productos/".concat(p),{method:"DELETE"});e.ok||console.log("No se borraron productos"),console.log(e.status),(200==e.status||404==e.status)&&(console.log("post"),await fetch("/api/entregas/productos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ec)}).then(e=>{if(!e.ok)throw Error("Response is not ok");return e.json()}))}if(R){let e=await fetch("/api/entregas/paquetes/".concat(p),{method:"DELETE"});e.ok||console.log("No se borraron paquetes"),(200==e.status||404==e.status)&&await fetch("/api/entregas/paquetes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(el)}).then(e=>{if(!e.ok)throw Error("Response is not ok");return e.json()})}if((O||R||J)&&!(await fetch("/api/entregas/deudas/".concat(p),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({deu_abono:W,deu_estado:"a procesar",deu_deuda:U,deu_deuda_pendiente:U-W,deu_comision_funjal:Number(eC),deu_comision_enlace:Number(ek)})})).ok)throw Error("Network response was not ok");g(!1)}catch(e){j(e.message)}k(!0)}},eF=()=>{""==K||""==ee||""==er||""==et?(eo(!0),console.log("Validado")):eo(!1),0==ec.length&&0==el.length?ep(!0):ep(!1),""!=K&&""!=ee&&""!=er&&""!=et&&(0!=ec.length||0!=el.length)?E(!0):console.log("No entro")},eq=()=>{fetch("/api/entregas/".concat(p),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({en_estado:"preparaci\xf3n"})}).then(e=>{if(!e.ok)throw Error("Response is not ok");return e.json()}).catch(e=>{j(e.message)}),o.push("/entregas")},eL=e=>{ed(ec.map(a=>({...a,en_produc_oferta:e})))},ez=e=>{e_(el.map(a=>({...a,en_pa_desc:e})))},eA=()=>{fetch("/api/entregas/".concat(p),{method:"DELETE"}).then(e=>{if(!e.ok)throw Error("Response is not ok");o.push("/entregas")})};return h?(0,n.jsx)("div",{className:c().loadingScreen,children:(0,n.jsx)(d.Z,{})}):x?(0,n.jsx)("div",{className:c().error,children:(0,n.jsxs)("div",{className:c().errorContent,children:[(0,n.jsx)(F(),{className:c().textIcon,name:"cloud-offline-outline"}),(0,n.jsx)("p",{className:c().textError,children:"No hay Conexi\xf3n"})]})}):(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:c().navegacion,children:(0,n.jsxs)("h4",{children:[(0,n.jsx)(i.default,{href:"/entregas",className:c().link,children:"Entregas"})," ","\\ Entrega \\"," ",H?"".concat(H.cli_municipio,", ").concat(H.cli_estado,"."):"Cargando..."]})}),(0,n.jsxs)("div",{className:c().herramientas,children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Incremento productos: "}),(0,n.jsx)("input",{type:"number",className:c().input,min:0,value:eh,onChange:e=>{em(e.target.value),k(!1),D(!0),eL(Number(e.target.value))}})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Incremento paquetes: "}),(0,n.jsx)("input",{type:"number",className:c().input,min:0,value:ex,onChange:e=>{ej(e.target.value),k(!1),D(!0),ez(Number(e.target.value))}})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Abono: "}),(0,n.jsx)("input",{type:"number",className:c().input,min:0,value:W,onChange:e=>{B(e.target.value),G(!0),k(!1)}})]}),(0,n.jsx)("div",{children:(0,n.jsxs)("p",{children:["Deuda: ",(0,n.jsx)("b",{children:(0,v.uf)(eN+eT-W)})]})}),(0,n.jsxs)("div",{children:[(0,n.jsx)(l.zx,{text:"Cancelar Entrega",type:"cancelar",onPress:()=>C(!0)}),(0,n.jsx)(l.zx,{text:"Finalizar Edici\xf3n",onPress:()=>{eF(),ey()}}),(0,n.jsx)(l.zx,{text:P?"Guardado":"Guardar",type:"cancelar",onPress:()=>ey()})]})]}),(0,n.jsxs)("div",{className:c().contenido,children:[(0,n.jsxs)("div",{className:c().subContenedor1,children:[(0,n.jsx)("div",{className:c().herramientasTabla,children:(0,n.jsx)(l.zx,{text:ef?"Listado":"Seleccionar",type:eb?"":"cancelar",onPress:()=>{ev(!eb),eg(!ef)}})}),eu&&(0,n.jsx)("div",{className:c().validarProductos,children:(0,n.jsx)("h4",{children:"No se han agregado productos"})}),ef&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(N,{idEntrega:p,lista:ec,seleccionados:e=>{ed(e),k(!1),M(!0)},update:e=>em(e),incrementoPrede:eh}),(0,n.jsx)(S,{idEntrega:p,lista:el,seleccionados:e=>{e_(e),k(!1),Z(!0)},update:e=>ej(e),incrementoPrede:ex})]}),eb&&(0,n.jsx)(q.Z,{paquetes:el,productos:ec,totalAPagar:()=>{}})]}),(0,n.jsxs)("div",{className:c().subContenedor2,children:[(0,n.jsx)("div",{className:c().herramientasInfo,children:(0,n.jsx)(l.zx,{text:y?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{children:"Visualizar"}),(0,n.jsx)(F(),{className:c().icon,name:"eye-outline"})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{children:"Ocultar"}),(0,n.jsx)(F(),{className:c().icon,name:"eye-off-outline"})]}),type:y?"contenido-light":"contenido-dark",onPress:()=>A(!y)})}),!y&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{municipio:H}),(0,n.jsx)(_.Z,{id:p,encargado:H}),(0,n.jsx)(w,{fechaEntrega:K,onChangeDate:e=>{D(!0),$(e),k(!1)},fechaSalida:ee,onChangeExit:e=>{D(!0),ea(e),k(!1)},horaSalida:et,onChangeHoraSalida:e=>{D(!0),en(e),k(!1)},horaEntrega:er,onChangeHoraEntrega:e=>{D(!0),ei(e),k(!1)},validar:es})]})]})]}),(0,n.jsx)(l.u_,{title:"Finalizar Edici\xf3n",message:'\n          El modo de edici\xf3n finalizara, se marcar\xe1 la entrega como "preparada" \n          y no se podran hacer m\xe1s modificaciones. \xbfDesea continuar?\n        ',show:b,handleAccept:()=>{eq(),g(!0)},handleClose:()=>E(!1)}),(0,n.jsx)(l.u_,{title:"Cancelar Entrega",message:"\n          Al cancelar la entrega se eliminar\xe1 de la base de datos y no podr\xe1 ser recuperada. \n          \xbfDesea continuar?\n        ",show:T,handleAccept:()=>eA(),handleClose:()=>C(!1)}),(0,n.jsx)(z.Z,{show:f})]})}},4067:function(e,a,t){"use strict";t.d(a,{F:function(){return d},a:function(){return s}});var n=t(7437);t(2265);var r=t(5338),i=t.n(r),s=function(e){let{text:a,timeSelect:t,time:r,validation:s}=e;return(0,n.jsxs)("div",{className:i()["time-picker-container"],children:[(0,n.jsx)("label",{htmlFor:"time",className:"".concat(i()["time-picker-label"]," ").concat(s?i().validation:""),children:a}),(0,n.jsx)("input",{id:"time",type:"time",value:r,onChange:e=>{t(e.target.value)},className:"".concat(i()["time-picker-input"]," ").concat(s?i().validation:""),step:"300"})]})},o=t(480),c=t.n(o),d=function(e){let{text:a,value:t,onChange:r,validation:i}=e;return(0,n.jsxs)("div",{className:"".concat(c().container," ").concat(i?c().validation:""),children:[(0,n.jsx)("label",{children:a}),(0,n.jsx)("input",{className:"".concat(c().date," ").concat(i?c().validation:""),type:"date",value:t,onChange:e=>{r(e.target.value)}})]})}},6812:function(e,a,t){"use strict";var n=t(7437),r=t(5550),i=t.n(r);a.Z=function(e){let{municipio:a}=e;return(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:i().header,children:(0,n.jsx)("h3",{children:"Municipio"})}),(0,n.jsx)("div",{className:i().container,children:a?(0,n.jsxs)("div",{children:[(0,n.jsxs)("p",{children:[(0,n.jsx)("span",{children:"Municipio: "}),a.cli_municipio,", ",a.cli_estado]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("span",{children:"Enlace: "}),a.cli_nombre]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("span",{children:"Contacto: "}),a.cli_numero_contac]})]}):(0,n.jsx)("div",{children:(0,n.jsx)("p",{children:"Cargando..."})})}),(0,n.jsx)("div",{className:i().fooder})]})}},3187:function(e,a,t){"use strict";var n=t(7437),r=t(2265),i=t(405),s=t.n(i),o=t(4868);a.Z=function(e){let{id:a,encargado:t,empleados:i,seleccionados:c}=e,[d,l]=(0,r.useState)([]),[_,u]=(0,r.useState)(""),[p,h]=(0,r.useState)(!0),[m,x]=(0,r.useState)([]),[j,f]=(0,r.useState)([]);(0,r.useEffect)(()=>{fetch("/api/empleados").then(e=>{if(!e.ok)throw Error("Respose is not ok");return e.json()}).then(e=>{l(e),f(e)}).catch(e=>{u(e)})},[]),(0,r.useEffect)(()=>{i&&0!=j.length&&(0!==i.length||i)&&(x(i),l(j.filter(e=>!i.some(a=>a.emp_id===e.emp_id))))},[i,j]);let g=e=>{if("ninguno"!=e){let a=d.find(a=>a.emp_id==e);x([...m,a]),l(d.filter(a=>a.emp_id!=e)),c([...m,a]),h(!0)}else h(!0)},b=e=>{l([...d,m.find(a=>a.emp_id==e)]);let a=m.filter(a=>a.emp_id!=e);x(a),c(a)};return(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:s().header,children:(0,n.jsx)("h3",{children:"Encargado / Empleados"})}),(0,n.jsxs)("div",{className:s().container,children:[(0,n.jsx)("span",{children:t?(0,n.jsxs)("p",{className:s().wrapper,children:[(0,n.jsx)("b",{children:"Encargado:"})," ",t.emp_nombre," ",t.emp_apellido]}):(0,n.jsx)("p",{children:"Cargando..."})}),i&&(0,n.jsxs)(n.Fragment,{children:[0!=m.length&&(0,n.jsx)("div",{className:s().wrapper,children:m.map((e,a)=>(0,n.jsxs)("div",{className:s().nombre,children:[(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:e.emp_rol}),": ",e.emp_nombre," ",e.emp_apellido]}),(0,n.jsx)(o.zx,{text:"x",type:"aceptar",onPress:()=>b(e.emp_id)})]},a))}),0!=d.length&&!p&&(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Empleado: "}),(0,n.jsxs)("select",{className:s().select,onChange:e=>g(e.target.value),children:[(0,n.jsx)("option",{value:"ninguno",children:"---ninguno-"}),d.map((e,a)=>(0,n.jsxs)("option",{value:e.emp_id,children:[e.emp_nombre," ",e.emp_apellido," (",e.emp_rol,")"]},a))]})]}),p&&0!=d.length&&(0,n.jsx)(o.zx,{text:"A\xf1adir",type:"aceptar",onPress:()=>h(!1)})]})]}),(0,n.jsx)("div",{className:s().fooder})]})}},1839:function(e){e.exports={navegacion:"page_navegacion__mEb_L",link:"page_link__MZm2n",herramientas:"page_herramientas__YLJDx",contenido:"page_contenido__rEkRT",herramientasTabla:"page_herramientasTabla__QLPm0",herramientasInfo:"page_herramientasInfo__fuPU4",icon:"page_icon__a_j33",subContenedor1:"page_subContenedor1__ywgRE",subContenedor2:"page_subContenedor2__pXog9",input:"page_input__BiChl",validarProductos:"page_validarProductos__j8mHj",loadingScreen:"page_loadingScreen__1r_SG",error:"page_error__mcMYJ",textIcon:"page_textIcon__J3EOf",textError:"page_textError__Yo3nQ",errorContent:"page_errorContent__Gft_a"}},480:function(e){e.exports={container:"DatePick_container__Iz8Yd",date:"DatePick_date__H2cuu",validation:"DatePick_validation__xtQCJ"}},5338:function(e){e.exports={"time-picker-container":"TimePick_time-picker-container__ypGNX","time-picker-label":"TimePick_time-picker-label__UzI3b","time-picker-input":"TimePick_time-picker-input__AxGwA",validation:"TimePick_validation__FDMTC"}},5550:function(e){e.exports={header:"InfoMunicipio_header__OrBp7",container:"InfoMunicipio_container__8_QG7",fooder:"InfoMunicipio_fooder__wbG4y"}},8156:function(e){e.exports={input:"InputAddCost_input__AWT_y"}},5754:function(e){e.exports={input:"InputNumber_input__trfse"}},405:function(e){e.exports={header:"SeleccionarEmpleados_header__Onyww",container:"SeleccionarEmpleados_container__azV0F",fooder:"SeleccionarEmpleados_fooder__2cdF1",select:"SeleccionarEmpleados_select__VWJ9_",nombre:"SeleccionarEmpleados_nombre__AXwT9",wrapper:"SeleccionarEmpleados_wrapper__HSreq"}},6832:function(e){e.exports={header:"SeleccionarFecha_header__bE_Tf",container:"SeleccionarFecha_container__msnVM",fooder:"SeleccionarFecha_fooder__ojCb4"}},828:function(e){e.exports={header:"TablaEditarPaquetes_header__Z_Al2",titulo:"TablaEditarPaquetes_titulo__xQ0c3",container:"TablaEditarPaquetes_container___V2_5",fooder:"TablaEditarPaquetes_fooder__gZLzp",nombre:"TablaEditarPaquetes_nombre__DezMz",precio:"TablaEditarPaquetes_precio__AWquz",cantidad:"TablaEditarPaquetes_cantidad__Ehv6H",nombreTotal:"TablaEditarPaquetes_nombreTotal__aLb2n",precioTotal:"TablaEditarPaquetes_precioTotal__mGtSd",modificadorTotal:"TablaEditarPaquetes_modificadorTotal__KZoAF",cantidadTotal:"TablaEditarPaquetes_cantidadTotal__QsNug",button:"TablaEditarPaquetes_button__bg5KX",disabled:"TablaEditarPaquetes_disabled___Wjtl",enabled:"TablaEditarPaquetes_enabled__c_OWw",buttonsContainer:"TablaEditarPaquetes_buttonsContainer__QaFJa"}},9447:function(e){e.exports={header:"TablaEditarProductos_header__85YWP",titulo:"TablaEditarProductos_titulo__p17mo",container:"TablaEditarProductos_container__HI960",fooder:"TablaEditarProductos_fooder__oD_Es",nombre:"TablaEditarProductos_nombre__1ZTb3",precio:"TablaEditarProductos_precio__xtU90",cantidad:"TablaEditarProductos_cantidad__posDo",nombreTotal:"TablaEditarProductos_nombreTotal__xQjm3",precioTotal:"TablaEditarProductos_precioTotal__TTrBt",modificadorTotal:"TablaEditarProductos_modificadorTotal__TUs2G",cantidadTotal:"TablaEditarProductos_cantidadTotal__2_XxI",button:"TablaEditarProductos_button__7tSb5",disabled:"TablaEditarProductos_disabled__EkLee",enabled:"TablaEditarProductos_enabled__nwQNI",buttonsContainer:"TablaEditarProductos_buttonsContainer__KICxy"}}},function(e){e.O(0,[1631,1316,7123,8153,6307,7648,4868,304,2971,2117,1744],function(){return e(e.s=2401)}),_N_E=e.O()}]);