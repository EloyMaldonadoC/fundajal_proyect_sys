"use strict";(()=>{var e={};e.id=6796,e.ids=[6796],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},9769:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>l,patchFetch:()=>g,requestAsyncStorage:()=>_,routeModule:()=>d,serverHooks:()=>m,staticGenerationAsyncStorage:()=>c});var o={};t.r(o),t.d(o,{GET:()=>u});var a=t(49303),n=t(88716),p=t(60670),s=t(87070),i=t(95143);async function u(e,{params:r}){try{let{en_id:e}=r,[t,o,a,n,p,u,d,_,c,m]=await i.ZI.query(`SELECT * FROM entregas WHERE en_id = ?;
        SELECT * FROM vehiculos;
        SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados;
        SELECT * FROM clientes;
        SELECT * FROM entrega_vehiculo WHERE en_id = ?;
        SELECT * FROM empleado_entraga WHERE en_id = ?;
        SELECT productos.*, entrega_producto.*
        FROM entrega_producto
        JOIN entregas ON entrega_producto.en_id = entregas.en_id 
        JOIN productos ON entrega_producto.produc_id = productos.produc_id
        WHERE entrega_producto.en_id = ?;
        SELECT paquetes.*, entrega_paquete.*
        FROM entrega_paquete
        JOIN entregas ON entrega_paquete.en_id = entregas.en_id 
        JOIN paquetes ON entrega_paquete.pa_id = paquetes.pa_id
        WHERE entrega_paquete.en_id = ?;
        SELECT entrega_paquete.*, producto_paquete.*, productos.*
        FROM entrega_paquete
        JOIN producto_paquete ON entrega_paquete.pa_id = producto_paquete.pa_id 
        JOIN productos ON producto_paquete.produc_id = productos.produc_id
        WHERE entrega_paquete.en_id = ?;
        SELECT entrega_estado_producto.*, productos.*
        FROM productos
        JOIN entrega_estado_producto ON productos.produc_id = entrega_estado_producto.produc_id
        WHERE entrega_estado_producto.en_id = ?;`,[e,e,e,e,e,e,e]),l=t.map(e=>({en_id:e.en_id,entrega:e,encargado:a.find(r=>r.emp_id===e.emp_id),vehiculos:o.filter(r=>p.some(t=>t.en_id===e.en_id&&t.ve_id===r.ve_id)),empleados:a.filter(r=>u.some(t=>t.en_id===e.en_id&&t.emp_id===r.emp_id)),cliente:n.find(r=>r.cli_id===e.cli_id),productos:d,paquetes:_,productos_paquete:c,producto_estado:m}));return s.NextResponse.json(l[0])}catch(e){return s.NextResponse.json({message:e.message},{status:500})}finally{i.ZI.quit()}}let d=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/entregas/obtener/entrega/[en_id]/route",pathname:"/api/entregas/obtener/entrega/[en_id]",filename:"route",bundlePath:"app/api/entregas/obtener/entrega/[en_id]/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\entregas\\obtener\\entrega\\[en_id]\\route.js",nextConfigOutput:"",userland:o}),{requestAsyncStorage:_,staticGenerationAsyncStorage:c,serverHooks:m}=d,l="/api/entregas/obtener/entrega/[en_id]/route";function g(){return(0,p.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:c})}},95143:(e,r,t)=>{t.d(r,{HG:()=>n,ZI:()=>a,vF:()=>p});var o=t(40346);let a=t.n(o)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function n(e){try{return new Promise((r,t)=>{a.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,o)=>e?t(e):0===o.length?t(Error("User not found")):void r(o[0].emp_contraseña))})}catch(e){console.error(e)}finally{a.quit()}}async function p(e){try{return new Promise((r,t)=>{a.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,o)=>e?t(e):0===o.length?t(Error("User not found")):void r(o[0]))})}catch(e){console.error(e)}finally{a.quit()}}}};var r=require("../../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[8948,5711,7070],()=>t(9769));module.exports=o})();