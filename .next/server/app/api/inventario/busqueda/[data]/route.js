"use strict";(()=>{var e={};e.id=2259,e.ids=[2259],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},43011:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>_,patchFetch:()=>q,requestAsyncStorage:()=>c,routeModule:()=>d,serverHooks:()=>m,staticGenerationAsyncStorage:()=>l});var o={};t.r(o),t.d(o,{GET:()=>p});var s=t(49303),a=t(88716),n=t(60670),i=t(87070),u=t(95143);async function p(e,{params:r}){let t=`%${r.data}%`;console.log(t);let o=`SELECT * FROM productos
        WHERE produc_nombre LIKE ? ;`;try{let e=await u.ZI.query(o,t);return i.NextResponse.json(e)}catch(e){return i.NextResponse.json({message:e.message},{status:500})}finally{u.ZI.quit()}}let d=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/inventario/busqueda/[data]/route",pathname:"/api/inventario/busqueda/[data]",filename:"route",bundlePath:"app/api/inventario/busqueda/[data]/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\inventario\\busqueda\\[data]\\route.js",nextConfigOutput:"",userland:o}),{requestAsyncStorage:c,staticGenerationAsyncStorage:l,serverHooks:m}=d,_="/api/inventario/busqueda/[data]/route";function q(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:l})}},95143:(e,r,t)=>{t.d(r,{HG:()=>a,ZI:()=>s,vF:()=>n});var o=t(40346);let s=t.n(o)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function a(e){try{return new Promise((r,t)=>{s.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,o)=>e?t(e):0===o.length?t(Error("User not found")):void r(o[0].emp_contraseña))})}catch(e){console.error(e)}finally{s.quit()}}async function n(e){try{return new Promise((r,t)=>{s.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,o)=>e?t(e):0===o.length?t(Error("User not found")):void r(o[0]))})}catch(e){console.error(e)}finally{s.quit()}}}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[8948,5711,7070],()=>t(43011));module.exports=o})();