exports.id=7330,exports.ids=[7330],exports.modules={65764:(e,a,i)=>{"use strict";i.d(a,{Z:()=>d});var s=i(10326),r=i(49895),n=i.n(r);let d=function({municipio:e}){return(0,s.jsxs)("div",{children:[s.jsx("div",{className:n().header,children:s.jsx("h3",{children:"Municipio"})}),s.jsx("div",{className:n().container,children:e?(0,s.jsxs)("div",{children:[(0,s.jsxs)("p",{children:[s.jsx("span",{children:"Municipio: "}),e.cli_municipio,", ",e.cli_estado]}),(0,s.jsxs)("p",{children:[s.jsx("span",{children:"Enlace: "}),e.cli_nombre]}),(0,s.jsxs)("p",{children:[s.jsx("span",{children:"Contacto: "}),e.cli_numero_contac]})]}):s.jsx("div",{children:s.jsx("p",{children:"Cargando..."})})}),s.jsx("div",{className:n().fooder})]})}},30020:(e,a,i)=>{"use strict";i.d(a,{Z:()=>o});var s=i(10326),r=i(72557),n=i(96570),d=i.n(n);let o=function({titulo:e,listaProductos:a,onDelete:i,alterButton:n}){return(0,s.jsxs)("div",{children:[s.jsx("div",{className:d().header,children:s.jsx("h3",{children:e})}),(0,s.jsxs)("div",{className:d().titulo,children:[s.jsx("h4",{className:d().nombre,children:"Nombre"}),s.jsx("h4",{className:d().cantidad,children:"cantidad"}),s.jsx("h4",{className:d().option,children:n&&"opciones"})]}),a&&a.map((e,a)=>(0,s.jsxs)("div",{className:d().container,children:[s.jsx("div",{className:d().nombre,children:e.produc_nombre}),s.jsx("div",{className:d().cantidad,children:e.en_es_produc_cant}),s.jsx("div",{className:d().option,children:n&&s.jsx(r.zx,{text:n||"Eliminar",type:"cancelar",onPress:()=>i(e.produc_id)})})]},a)),s.jsx("div",{className:d().fooder})]})}},71367:(e,a,i)=>{"use strict";i.d(a,{Z:()=>o});var s=i(10326),r=i(81608),n=i(48774),d=i.n(n);let o=function({pago:e}){return(0,s.jsxs)("div",{className:d().container,children:[(0,s.jsxs)("p",{children:["Pago realizado el d\xeda ",s.jsx("b",{children:(0,r.ji)(e.pag_fecha_transac)})]}),(0,s.jsxs)("p",{children:["Monto: ",s.jsx("b",{children:(0,r.uf)(e.pag_monto)})]}),(0,s.jsxs)("p",{children:["M\xe9todo de pago: ",s.jsx("b",{children:e.pag_metodo})]}),(0,s.jsxs)("p",{children:["Descripci\xf3n del pago: ",e.pag_desc]})]})}},65284:(e,a,i)=>{"use strict";i.d(a,{Z:()=>d});var s=i(10326),r=i(66524),n=i.n(r);let d=function({productos:e,paquetes:a,totalAPagar:i}){let r=0,d=(e,a)=>{let s=e*a;return i(r+=s),s},o=e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0});return(0,s.jsxs)("div",{children:[s.jsx("div",{className:n().header,children:s.jsx("h3",{children:"Contenido de la Entrega"})}),(0,s.jsxs)("div",{className:n().titulo,children:[s.jsx("h4",{className:n().nombre,children:"Producto"}),s.jsx("h4",{className:n().cantidad,children:"Cantidad"}),s.jsx("h4",{className:n().precio,children:"Precio"}),s.jsx("h4",{className:n().total,children:"Total"})]}),a&&s.jsx(s.Fragment,{children:a.map((e,a)=>"en entrega"==e.en_pa_estado&&(0,s.jsxs)("div",{className:n().container,children:[s.jsx("div",{className:n().nombre,children:e.pa_nombre}),s.jsx("div",{className:n().cantidad,children:e.en_pa_cantidad}),s.jsx("div",{className:n().precio,children:o(e.pa_precio+e.en_pa_desc)}),s.jsx("div",{className:n().total,children:o(d(Number(e.en_pa_cantidad),Number(e.pa_precio+e.en_pa_desc)))})]},a))}),e&&s.jsx(s.Fragment,{children:e.map((e,a)=>"en entrega"==e.en_produc_estado&&(0,s.jsxs)("div",{className:n().container,children:[s.jsx("div",{className:n().nombre,children:e.produc_nombre}),s.jsx("div",{className:n().cantidad,children:e.en_produc_cantidad}),s.jsx("div",{className:n().precio,children:o(e.produc_precio_venta+e.en_produc_oferta)}),s.jsx("div",{className:n().total,children:o(d(Number(e.en_produc_cantidad),Number(e.produc_precio_venta+e.en_produc_oferta)))})]},a))}),s.jsx("div",{className:n().fooder}),(0,s.jsxs)("div",{className:n().totalPrecio,children:[s.jsx("div",{className:n().totalTexto,children:s.jsx("b",{children:"Total:"})}),s.jsx("div",{className:n().totalCantidad,children:s.jsx("b",{children:o(r)})})]})]})}},91575:(e,a,i)=>{"use strict";i.d(a,{Z:()=>d});var s=i(10326),r=i(44556),n=i.n(r);let d=function({encargado:e,empleados:a}){return(0,s.jsxs)("div",{children:[s.jsx("div",{className:n().header,children:s.jsx("h3",{children:"Personal"})}),(0,s.jsxs)("div",{className:n().container,children:[(0,s.jsxs)("p",{className:n().nombre,children:[s.jsx("b",{children:"Encargado: "}),e.emp_nombre," ",e.emp_apellido]}),a&&s.jsx(s.Fragment,{children:a.map((e,a)=>(0,s.jsxs)("p",{className:n().nombre,children:[(0,s.jsxs)("b",{children:[e.emp_rol,": "]}),e.emp_nombre," ",e.emp_apellido]},a))})]}),s.jsx("div",{className:n().fooder})]})}},84638:(e,a,i)=>{"use strict";i.d(a,{Z:()=>d});var s=i(10326),r=i(90079),n=i.n(r);let d=function({productos:e}){return(0,s.jsxs)("div",{children:[s.jsx("div",{className:n().header,children:s.jsx("h3",{children:"Todos los productos"})}),(0,s.jsxs)("div",{className:n().titulo,children:[s.jsx("h4",{className:n().nombre,children:"Producto"}),s.jsx("h4",{className:n().cantidad,children:"Cantidad"})]}),e&&s.jsx(s.Fragment,{children:e.map((e,a)=>(0,s.jsxs)("div",{className:n().container,children:[s.jsx("div",{className:n().nombre,children:e.produc_nombre}),s.jsx("div",{className:n().cantidad,children:e.en_es_produc_cant})]},a))}),s.jsx("div",{className:n().fooder})]})}},86015:(e,a,i)=>{"use strict";i.d(a,{Z:()=>d});var s=i(10326),r=i(3449),n=i.n(r);let d=function({vehiculos:e}){return(0,s.jsxs)("div",{children:[s.jsx("div",{className:n().header,children:s.jsx("h3",{children:"Vehiculos"})}),s.jsx("div",{className:n().container,children:0!=e.length?s.jsx(s.Fragment,{children:e.map((e,a)=>(0,s.jsxs)("p",{children:[e.ve_marca," ",e.ve_modelo," ",e.ve_ano]},a))}):s.jsx("p",{children:"A\xfan no se han asignado vehiculos"})}),s.jsx("div",{className:n().fooder})]})}},15169:(e,a,i)=>{"use strict";i.d(a,{Z:()=>o});var s=i(10326);i(17577);var r=i(88970),n=i.n(r),d=i(81608);let o=function({listaVentasIndividuales:e}){return(0,s.jsxs)("div",{children:[s.jsx("div",{className:n().header,children:s.jsx("h3",{children:"Vendidos"})}),(0,s.jsxs)("div",{className:n().titulo,children:[s.jsx("h4",{className:n().nombre,children:"Nombre"}),s.jsx("h4",{className:n().cantidad,children:"Cantidad"}),s.jsx("h4",{className:n().precio,children:"Precio"}),s.jsx("h4",{className:n().total,children:"Total"})]}),e.map((e,a)=>(0,s.jsxs)("div",{className:n().container,children:[s.jsx("div",{className:n().nombre,children:e.produc_nombre}),s.jsx("div",{className:n().cantidad,children:e.en_es_produc_cant}),s.jsx("div",{className:n().precio,children:e.produc_precio_venta}),s.jsx("div",{className:n().total,children:(0,d.uf)(e.en_es_produc_cant*e.produc_precio_venta)})]},a)),s.jsx("div",{className:n().fooder}),(0,s.jsxs)("div",{className:n().totalPrecio,children:[(0,s.jsxs)("h4",{className:n().totalTexto,children:["Total:"," "]}),s.jsx("h4",{className:n().totalCantidad,children:(0,d.uf)(e.reduce((e,a)=>e+a.en_es_produc_cant*a.produc_precio_venta,0))})]})]})}},49895:e=>{e.exports={header:"InfoMunicipio_header__OrBp7",container:"InfoMunicipio_container__8_QG7",fooder:"InfoMunicipio_fooder__wbG4y"}},96570:e=>{e.exports={header:"TablaEstadosEntrega_header__4Q2K3",container:"TablaEstadosEntrega_container__EEXBW",fooder:"TablaEstadosEntrega_fooder__o2nGh",titulo:"TablaEstadosEntrega_titulo__5OXhe",texto:"TablaEstadosEntrega_texto__y_P76",nombre:"TablaEstadosEntrega_nombre__9DUle",cantidad:"TablaEstadosEntrega_cantidad__aQLgF",option:"TablaEstadosEntrega_option__N6reG"}},48774:e=>{e.exports={container:"CardPago_container__SzKSh"}},66524:e=>{e.exports={header:"VisualizarContenidoDeEntrega_header__ezsWP",container:"VisualizarContenidoDeEntrega_container__elA4m",fooder:"VisualizarContenidoDeEntrega_fooder__sh8OJ",totalPrecio:"VisualizarContenidoDeEntrega_totalPrecio__v9NKh",totalTexto:"VisualizarContenidoDeEntrega_totalTexto__aZAC1",totalCantidad:"VisualizarContenidoDeEntrega_totalCantidad__R8unx",titulo:"VisualizarContenidoDeEntrega_titulo___7_yG",texto:"VisualizarContenidoDeEntrega_texto__Zi8Kv",nombre:"VisualizarContenidoDeEntrega_nombre__gaSHe",cantidad:"VisualizarContenidoDeEntrega_cantidad__41pxo",precio:"VisualizarContenidoDeEntrega_precio__y3oIb",total:"VisualizarContenidoDeEntrega_total__UNeKV"}},44556:e=>{e.exports={header:"VisualizarEmpleadosEntrega_header___vimn",container:"VisualizarEmpleadosEntrega_container__2oQwr",fooder:"VisualizarEmpleadosEntrega_fooder__i3vSU",nombre:"VisualizarEmpleadosEntrega_nombre__l0wgl",wrapper:"VisualizarEmpleadosEntrega_wrapper__MBv5l"}},90079:e=>{e.exports={header:"VisualizarTotalProductos_header__sBGZ6",container:"VisualizarTotalProductos_container__gJ9l_",fooder:"VisualizarTotalProductos_fooder__YtBRG",titulo:"VisualizarTotalProductos_titulo__sLbt5",texto:"VisualizarTotalProductos_texto__AG5aQ",nombre:"VisualizarTotalProductos_nombre__IygNH",cantidad:"VisualizarTotalProductos_cantidad__dt8Oi"}},3449:e=>{e.exports={header:"VisualizarVehiculosEntrega_header__JGbGD",container:"VisualizarVehiculosEntrega_container__SFIJK",fooder:"VisualizarVehiculosEntrega_fooder____Ipl",texto:"VisualizarVehiculosEntrega_texto__7i9x_"}},88970:e=>{e.exports={header:"VisualizarVentasIndividuales_header__d88Bc",container:"VisualizarVentasIndividuales_container__u26jQ",fooder:"VisualizarVentasIndividuales_fooder___MYsA",totalPrecio:"VisualizarVentasIndividuales_totalPrecio__A_Led",totalTexto:"VisualizarVentasIndividuales_totalTexto__Ea1rd",totalCantidad:"VisualizarVentasIndividuales_totalCantidad__4ANxc",titulo:"VisualizarVentasIndividuales_titulo__NShYj",texto:"VisualizarVentasIndividuales_texto__GkGvy",nombre:"VisualizarVentasIndividuales_nombre__HyIMm",cantidad:"VisualizarVentasIndividuales_cantidad__cXRMF",precio:"VisualizarVentasIndividuales_precio__20w3O",total:"VisualizarVentasIndividuales_total__LtWDn"}}};