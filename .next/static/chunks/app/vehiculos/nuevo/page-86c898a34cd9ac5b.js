(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7301],{115:function(e,o,n){Promise.resolve().then(n.bind(n,7072))},7072:function(e,o,n){"use strict";n.r(o);var a=n(7437),i=n(2265),r=n(7648),d=n(9376),t=n(761),s=n.n(t),m=n(4868),l=n(605);o.default=function(){let{data:e}=(0,l.useSession)(),o=(0,d.useRouter)(),[n,t]=(0,i.useState)(""),[b,u]=(0,i.useState)(!1),[c,h]=(0,i.useState)(""),[v,p]=(0,i.useState)(!1),[g,x]=(0,i.useState)(!1),[S,_]=(0,i.useState)("ninguno"),[j,f]=(0,i.useState)(""),[C,I]=(0,i.useState)(!1),[N,y]=(0,i.useState)(0),[P,O]=(0,i.useState)(!1),[k,A]=(0,i.useState)("ninguno"),[E,M]=(0,i.useState)(!1),[Q,T]=(0,i.useState)(""),[R,w]=(0,i.useState)(!1),[G,J]=(0,i.useState)(""),[V,z]=(0,i.useState)(!1),[B,H]=(0,i.useState)(!1),[K,L]=(0,i.useState)("ninguno"),[U,Z]=(0,i.useState)("Sin Observaciones"),[D,F]=(0,i.useState)(0),[W,Y]=(0,i.useState)(!1),[q,X]=(0,i.useState)(""),[$,ee]=(0,i.useState)(!1),[eo,en]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{"Administrador"!==e.user.role&&o.push("/")},[o]),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:s().navegacion,children:(0,a.jsxs)("h4",{children:[(0,a.jsx)(r.default,{href:"/vehiculos",className:s().link,children:"Vehiculos"})," ","\\ Nuevo"]})}),(0,a.jsxs)("div",{className:s().formulario,children:[(0,a.jsx)(m.II,{placeholder:"Marca",value:n,onChange:e=>{t(e)},validation:b,type:"text"}),(0,a.jsx)(m.II,{placeholder:"Modelo",value:c,onChange:e=>{h(e)},validation:v,type:"text"}),(0,a.jsx)("div",{className:s().select,children:(0,a.jsx)(m.Ph,{data:[{id:1,nombre:2025},{id:2,nombre:2024},{id:3,nombre:2023},{id:4,nombre:2022},{id:5,nombre:2021},{id:6,nombre:2020},{id:7,nombre:2019},{id:8,nombre:2018},{id:9,nombre:2017},{id:10,nombre:2016},{id:11,nombre:2015},{id:12,nombre:2014},{id:13,nombre:2013},{id:14,nombre:2012},{id:15,nombre:2011},{id:16,nombre:2010},{id:17,nombre:2009},{id:18,nombre:2008},{id:19,nombre:2007},{id:20,nombre:2006},{id:21,nombre:2005},{id:22,nombre:2004},{id:23,nombre:2003},{id:24,nombre:2002},{id:25,nombre:2001},{id:26,nombre:2e3},{id:27,nombre:1999},{id:28,nombre:1998},{id:29,nombre:1997},{id:30,nombre:1996},{id:31,nombre:1995},{id:32,nombre:1994},{id:33,nombre:1993},{id:34,nombre:1992},{id:35,nombre:1991},{id:36,nombre:1990},{id:37,nombre:1989},{id:38,nombre:1988},{id:39,nombre:1987},{id:40,nombre:1986},{id:41,nombre:1985},{id:42,nombre:1984},{id:43,nombre:1983},{id:44,nombre:1982},{id:45,nombre:1981},{id:46,nombre:1980},{id:47,nombre:1979},{id:48,nombre:1978},{id:49,nombre:1977},{id:50,nombre:1976},{id:51,nombre:1975},{id:52,nombre:1974},{id:53,nombre:1973},{id:54,nombre:1972},{id:55,nombre:1971},{id:56,nombre:1970}],text:"A\xf1o: ",onSelect:e=>{_(e)},validar:g})}),(0,a.jsx)(m.II,{placeholder:"Agencia",value:j,onChange:e=>{f(e)},validation:C,type:"text"}),(0,a.jsx)(m.II,{placeholder:"Capacidad en Kg",value:N,onChange:e=>{y(e)},validation:P,type:"number"}),(0,a.jsx)("div",{className:s().select,children:(0,a.jsx)(m.Ph,{data:[{id:1,nombre:"Aguascalientes"},{id:2,nombre:"Baja California"},{id:3,nombre:"Baja California Sur"},{id:4,nombre:"Campeche"},{id:5,nombre:"Chiapas"},{id:6,nombre:"Chihuahua"},{id:7,nombre:"Ciudad de M\xe9xico"},{id:8,nombre:"Coahuila"},{id:9,nombre:"Colima"},{id:10,nombre:"Durango"},{id:11,nombre:"Guanajuato"},{id:12,nombre:"Guerrero"},{id:13,nombre:"Hidalgo"},{id:14,nombre:"Jalisco"},{id:15,nombre:"M\xe9xico"},{id:16,nombre:"Michoac\xe1n"},{id:17,nombre:"Morelos"},{id:18,nombre:"Nayarit"},{id:19,nombre:"Nuevo Le\xf3n"},{id:20,nombre:"Oaxaca"},{id:21,nombre:"Puebla"},{id:22,nombre:"Quer\xe9taro"},{id:23,nombre:"Quintana Roo"},{id:24,nombre:"San Luis Potos\xed"},{id:25,nombre:"Sinaloa"},{id:26,nombre:"Sonora"},{id:27,nombre:"Tabasco"},{id:28,nombre:"Tamaulipas"},{id:29,nombre:"Tlaxcala"},{id:30,nombre:"Veracruz"},{id:31,nombre:"Yucat\xe1n"},{id:32,nombre:"Zacatecas"}],text:"Entidad: ",onSelect:e=>{A(e)},validar:E})}),(0,a.jsx)(m.II,{placeholder:"N\xfamero de Placa",value:Q,onChange:e=>{T(e)},validation:R,type:"text"}),(0,a.jsx)(m.II,{placeholder:"Nombre del Propietario",value:G,onChange:e=>{J(e)},validation:V,type:"text"}),(0,a.jsx)("div",{className:s().select,children:(0,a.jsx)(m.Ph,{data:[{id:1,nombre:"Optimo"},{id:2,nombre:"Revisi\xf3n"},{id:3,nombre:"Fuera de Servicio"}],text:"Estado General: ",onSelect:e=>{L(e)},validar:B})}),(0,a.jsx)(m.II,{placeholder:"Referendo",value:D,onChange:e=>{F(e)},validation:W,type:"number"}),(0,a.jsx)(m.II,{placeholder:"Imagen",value:q,onChange:e=>{X(e)},validation:$,type:"text"}),(0,a.jsx)("div",{className:s().botones,children:(0,a.jsx)(m.zx,{text:"Aceptar",type:"aceptar",onPress:()=>{""==n&&u(!0),""==c&&p(!0),"ninguno"==S&&x(!0),""==j&&I(!0),N<=0&&O(!0),"ninguno"==k&&M(!0),""==Q&&w(!0),""==G&&z(!0),"ninguno"==K&&H(!0),D<=0&&Y(!0),""==q?ee(!0):!1==b&&!1==v&&!1==g&&!1==C&&!1==P&&!1==E&&!1==R&&!1==V&&!1==B&&!1==W&&!1==$&&(u(!1),p(!1),x(!1),I(!1),M(!1),O(!1),w(!1),z(!1),H(!1),Y(!1),ee(!1),en(!0))}})})]}),(0,a.jsx)(m.u_,{title:"Agregar Vehiculo",message:"\xbfQuieres agregar el nuevo vehiculo con los datos proporcionados?",show:eo,handleClose:()=>{en(!1)},handleAccept:()=>{let e={ve_marca:n,ve_modelo:c,ve_ano:S,ve_agencia:j,ve_capacidad:N,ve_entidad:k,ve_placas:Q,ve_propietario:G,ve_estatus_gen:K,ve_observaciones:U,ve_referendo:D,ve_imagen:q};console.log(e),fetch("/api/vehiculos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>e.json()).catch(e=>{console.log(e.message)}),o.push("/vehiculos")}})]})}},761:function(e){e.exports={navegacion:"page_navegacion__JmWsl",link:"page_link__K6fUI",formulario:"page_formulario__p7HZO",select:"page_select__gQ0bI",botones:"page_botones__7UNIQ"}}},function(e){e.O(0,[7190,7123,8153,6307,7648,4868,2971,2117,1744],function(){return e(e.s=115)}),_N_E=e.O()}]);