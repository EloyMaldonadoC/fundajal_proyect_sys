"use strict";(()=>{var e={};e.id=2994,e.ids=[2994],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},563:(e,s,t)=>{t.r(s),t.d(s,{originalPathname:()=>E,patchFetch:()=>h,requestAsyncStorage:()=>m,routeModule:()=>d,serverHooks:()=>_,staticGenerationAsyncStorage:()=>v});var r={};t.r(r),t.d(r,{DELETE:()=>l,GET:()=>p,PUT:()=>c});var o=t(49303),n=t(88716),i=t(60670),a=t(87070),u=t(95143);async function p(e,{params:s}){try{let e=await u.ZI.query("SELECT * FROM vehiculos WHERE ve_id = ?",[s.ve_id]);if(0==e.length)return a.NextResponse.json({message:"VEhiculo no encontrado"},{status:404});return a.NextResponse.json(e[0])}catch(e){return a.NextResponse.json({message:e.message},{status:500})}finally{u.ZI.quit()}}async function c(e,{params:s}){try{let t=await e.json();console.log(t);let r=await u.ZI.query("UPDATE vehiculos SET ? WHERE ve_id = ?",[t,s.ve_id]);if(0==r.affectedRows)return a.NextResponse.json({message:"Vehiculo no encontrado"},{status:404});let o=await u.ZI.query("SELECT * FROM vehiculos WHERE ve_id = ?",[s.ve_id]);return a.NextResponse.json(o)}catch(e){return a.NextResponse.json({message:e.message},{status:500})}finally{u.ZI.quit()}}async function l(e,{params:s}){try{let e=await u.ZI.query("DELETE FROM vehiculos WHERE ve_id = ?",[s.ve_id]);if(0==e.affectedRows)return a.NextResponse.json({message:"Vehiculo no encontrado"},{status:404});return new Response(null,{status:204})}catch(e){return a.NextResponse.json({message:e.message},{status:500})}finally{u.ZI.quit()}}let d=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/vehiculos/[ve_id]/route",pathname:"/api/vehiculos/[ve_id]",filename:"route",bundlePath:"app/api/vehiculos/[ve_id]/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\vehiculos\\[ve_id]\\route.js",nextConfigOutput:"",userland:r}),{requestAsyncStorage:m,staticGenerationAsyncStorage:v,serverHooks:_}=d,E="/api/vehiculos/[ve_id]/route";function h(){return(0,i.patchFetch)({serverHooks:_,staticGenerationAsyncStorage:v})}},95143:(e,s,t)=>{t.d(s,{HG:()=>n,ZI:()=>o,vF:()=>i});var r=t(40346);let o=t.n(r)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function n(e){try{return new Promise((s,t)=>{o.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,r)=>e?t(e):0===r.length?t(Error("User not found")):void s(r[0].emp_contraseña))})}catch(e){console.error(e)}finally{o.quit()}}async function i(e){try{return new Promise((s,t)=>{o.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,r)=>e?t(e):0===r.length?t(Error("User not found")):void s(r[0]))})}catch(e){console.error(e)}finally{o.quit()}}}};var s=require("../../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[8948,5711,7070],()=>t(563));module.exports=r})();