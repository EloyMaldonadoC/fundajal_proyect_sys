"use strict";(()=>{var e={};e.id=4107,e.ids=[4107],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},98261:(e,r,s)=>{s.r(r),s.d(r,{originalPathname:()=>v,patchFetch:()=>_,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>d});var t={};s.r(t),s.d(t,{GET:()=>u});var o=s(49303),i=s(88716),n=s(60670),a=s(87070),p=s(95143);async function u(e,{params:r}){try{let e=await p.ZI.query("SELECT * FROM servicios WHERE ve_id = ? AND ser_estado = 'pendiente';",[r.ve_id]);if(0==e.length)return a.NextResponse.json({message:"servicio no encontrado"},{status:404});return a.NextResponse.json(e)}catch(e){return a.NextResponse.json({message:e.message},{status:500})}finally{p.ZI.quit()}}let c=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/vehiculos/servicios/filtro/pendientes/[ve_id]/route",pathname:"/api/vehiculos/servicios/filtro/pendientes/[ve_id]",filename:"route",bundlePath:"app/api/vehiculos/servicios/filtro/pendientes/[ve_id]/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\vehiculos\\servicios\\filtro\\pendientes\\[ve_id]\\route.js",nextConfigOutput:"",userland:t}),{requestAsyncStorage:l,staticGenerationAsyncStorage:d,serverHooks:m}=c,v="/api/vehiculos/servicios/filtro/pendientes/[ve_id]/route";function _(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:d})}},95143:(e,r,s)=>{s.d(r,{HG:()=>i,ZI:()=>o,vF:()=>n});var t=s(40346);let o=s.n(t)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function i(e){try{return new Promise((r,s)=>{o.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,t)=>e?s(e):0===t.length?s(Error("User not found")):void r(t[0].emp_contraseña))})}catch(e){console.error(e)}finally{o.quit()}}async function n(e){try{return new Promise((r,s)=>{o.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,t)=>e?s(e):0===t.length?s(Error("User not found")):void r(t[0]))})}catch(e){console.error(e)}finally{o.quit()}}}};var r=require("../../../../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[8948,5711,7070],()=>s(98261));module.exports=t})();