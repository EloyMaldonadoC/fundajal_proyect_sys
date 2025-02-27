"use strict";(()=>{var e={};e.id=6089,e.ids=[6089],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},36778:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>_,staticGenerationAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{GET:()=>u,POST:()=>c});var n=t(49303),o=t(88716),a=t(60670),i=t(87070),p=t(95143);async function u(){try{let e=await p.ZI.query(`
      SELECT entregas.*, clientes.*, empleados.*
      FROM entregas
      JOIN clientes ON entregas.cli_id = clientes.cli_id
      JOIN empleados ON entregas.emp_id = empleados.emp_id
      ORDER BY en_dia_pedido DESC;
    `);return i.NextResponse.json(e)}catch(e){return i.NextResponse.json({message:e.message},{status:500})}finally{p.ZI.quit()}}async function c(e){try{let{en_id:r,emp_id:t,cli_id:s,en_dia_pedido:n,en_dia_entrega:o,en_hora_salida:a,en_hora_entrega:u,en_incremento_producto:c,en_incremento_paquete:d,en_estado:l}=await e.json(),m=await p.ZI.query("INSERT INTO entregas (en_id, emp_id, cli_id, en_dia_pedido, en_dia_entrega, en_hora_salida, en_hora_entrega, en_incremento_producto, en_incremento_paquete, en_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[r,t,s,n,o,a,u,c,d,l]);return console.log(m),i.NextResponse.json({en_id:r,emp_id:t,cli_id:s,en_dia_pedido:n,en_dia_entrega:o,en_hora_salida:a,en_hora_entrega:u,en_incremento_producto:c,en_incremento_paquete:d,en_estado:l})}catch(e){return i.NextResponse.json({message:e.message},{status:500})}finally{p.ZI.quit()}}let d=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/entregas/route",pathname:"/api/entregas",filename:"route",bundlePath:"app/api/entregas/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\entregas\\route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:_}=d,g="/api/entregas/route";function x(){return(0,a.patchFetch)({serverHooks:_,staticGenerationAsyncStorage:m})}},95143:(e,r,t)=>{t.d(r,{HG:()=>o,ZI:()=>n,vF:()=>a});var s=t(40346);let n=t.n(s)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function o(e){try{return new Promise((r,t)=>{n.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,s)=>e?t(e):0===s.length?t(Error("User not found")):void r(s[0].emp_contraseña))})}catch(e){console.error(e)}finally{n.quit()}}async function a(e){try{return new Promise((r,t)=>{n.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,s)=>e?t(e):0===s.length?t(Error("User not found")):void r(s[0]))})}catch(e){console.error(e)}finally{n.quit()}}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[8948,5711,7070],()=>t(36778));module.exports=s})();