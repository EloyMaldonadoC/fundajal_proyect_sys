"use strict";(()=>{var e={};e.id=6318,e.ids=[6318],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},22941:(e,r,s)=>{s.r(r),s.d(r,{originalPathname:()=>_,patchFetch:()=>x,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>g,staticGenerationAsyncStorage:()=>m});var t={};s.r(t),s.d(t,{GET:()=>i,POST:()=>c});var o=s(49303),a=s(88716),n=s(60670),p=s(87070),u=s(95143);async function i(e){try{let e=await u.ZI.query("SELECT pagos.* FROM pagos");return p.NextResponse.json(e)}catch(e){return p.NextResponse.json({message:e.message},{status:500})}finally{u.ZI.quit()}}async function c(e){try{let{deu_id:r,pag_monto:s,pag_desc:t,pag_metodo:o,pag_fecha_transac:a}=await e.json();console.log(r,s,t,o,a);let n=await u.ZI.query("INSERT INTO pagos (deu_id, pag_monto, pag_desc, pag_metodo, pag_fecha_transac) VALUES (?, ?, ?, ?, ?)",[r,s,t,o,a]);return console.log("resultado",n),p.NextResponse.json({deu_id:r,pag_monto:s,pag_desc:t,pag_metodo:o,pag_desc:t,pag_fecha_transac:a})}catch(e){return p.NextResponse.json({message:e.message},{status:500})}finally{u.ZI.quit()}}let d=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/entregas/deudas/pagos/route",pathname:"/api/entregas/deudas/pagos",filename:"route",bundlePath:"app/api/entregas/deudas/pagos/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\entregas\\deudas\\pagos\\route.js",nextConfigOutput:"",userland:t}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:g}=d,_="/api/entregas/deudas/pagos/route";function x(){return(0,n.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:m})}},95143:(e,r,s)=>{s.d(r,{HG:()=>a,ZI:()=>o,vF:()=>n});var t=s(40346);let o=s.n(t)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function a(e){try{return new Promise((r,s)=>{o.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,t)=>e?s(e):0===t.length?s(Error("User not found")):void r(t[0].emp_contraseña))})}catch(e){console.error(e)}finally{o.quit()}}async function n(e){try{return new Promise((r,s)=>{o.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,t)=>e?s(e):0===t.length?s(Error("User not found")):void r(t[0]))})}catch(e){console.error(e)}finally{o.quit()}}}};var r=require("../../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[8948,5711,7070],()=>s(22941));module.exports=t})();