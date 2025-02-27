"use strict";(()=>{var e={};e.id=5752,e.ids=[5752],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},78725:(e,r,o)=>{o.r(r),o.d(r,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>_,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>l});var t={};o.r(t),o.d(t,{GET:()=>i,POST:()=>d});var s=o(49303),n=o(88716),a=o(60670),u=o(87070),p=o(95143);async function i(e){let r=`SELECT entregas.en_id, productos.*, entrega_producto.en_produc_estado, entrega_producto.en_produc_cantidad, entrega_producto.en_produc_oferta
        FROM entrega_producto
        JOIN entregas ON entrega_producto.en_id = entregas.en_id 
        JOIN productos ON entrega_producto.produc_id = productos.produc_id`;try{let e=await p.ZI.query(r);return u.NextResponse.json(e)}catch(e){return u.NextResponse.json({message:e.message},{status:500})}finally{p.ZI.quit()}}async function d(e){try{let r=(await e.json()).map(e=>[e.en_id,e.produc_id,e.en_produc_precio,e.en_produc_estado,e.en_produc_cantidad,e.en_produc_oferta]),o=await p.ZI.query("INSERT INTO entrega_producto (en_id, produc_id, en_produc_precio, en_produc_estado, en_produc_cantidad, en_produc_oferta) VALUES ?",[r]);return console.log(o),u.NextResponse.json("Productos agregados")}catch(e){return u.NextResponse.json({message:e.message},{status:500})}finally{p.ZI.quit()}}let c=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/entregas/productos/route",pathname:"/api/entregas/productos",filename:"route",bundlePath:"app/api/entregas/productos/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\entregas\\productos\\route.js",nextConfigOutput:"",userland:t}),{requestAsyncStorage:_,staticGenerationAsyncStorage:l,serverHooks:m}=c,g="/api/entregas/productos/route";function x(){return(0,a.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:l})}},95143:(e,r,o)=>{o.d(r,{HG:()=>n,ZI:()=>s,vF:()=>a});var t=o(40346);let s=o.n(t)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function n(e){try{return new Promise((r,o)=>{s.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,t)=>e?o(e):0===t.length?o(Error("User not found")):void r(t[0].emp_contraseña))})}catch(e){console.error(e)}finally{s.quit()}}async function a(e){try{return new Promise((r,o)=>{s.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,t)=>e?o(e):0===t.length?o(Error("User not found")):void r(t[0]))})}catch(e){console.error(e)}finally{s.quit()}}}};var r=require("../../../../webpack-runtime.js");r.C(e);var o=e=>r(r.s=e),t=r.X(0,[8948,5711,7070],()=>o(78725));module.exports=t})();