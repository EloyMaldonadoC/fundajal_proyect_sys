"use strict";(()=>{var e={};e.id=9557,e.ids=[9557],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},16944:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>g,patchFetch:()=>E,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>c,staticGenerationAsyncStorage:()=>_});var s={};t.r(s),t.d(s,{DELETE:()=>m,GET:()=>u});var o=t(49303),a=t(88716),n=t(60670),p=t(87070),i=t(95143);async function u(e,{params:r}){let t=`
    SELECT empleado_entraga.* , empleados.emp_nombre, empleados.emp_apellido, empleados.emp_rol, empleados.emp_foto
  	FROM empleado_entraga
  	JOIN entregas ON empleado_entraga.en_id = entregas.en_id 
  	JOIN empleados ON empleado_entraga.emp_id = empleados.emp_id
    WHERE empleado_entraga.en_id = ?`;try{let e=await i.ZI.query(t,[r.en_id]);return p.NextResponse.json(e)}catch(e){return p.NextResponse.json({message:e.message},{status:500})}finally{i.ZI.quit()}}async function m(e,{params:r}){try{let e=await i.ZI.query("DELETE FROM empleado_entraga WHERE en_id = ?",[r.en_id]);if(0==e.affectedRows)return p.NextResponse.json({message:"Empleado no encontrados"},{status:404});return new Response(null,{status:204})}catch(e){return p.NextResponse.json({message:e.message},{status:500})}finally{i.ZI.quit()}}let d=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/entregas/empleados/[en_id]/route",pathname:"/api/entregas/empleados/[en_id]",filename:"route",bundlePath:"app/api/entregas/empleados/[en_id]/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\entregas\\empleados\\[en_id]\\route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:_,serverHooks:c}=d,g="/api/entregas/empleados/[en_id]/route";function E(){return(0,n.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:_})}},95143:(e,r,t)=>{t.d(r,{HG:()=>a,ZI:()=>o,vF:()=>n});var s=t(40346);let o=t.n(s)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function a(e){try{return new Promise((r,t)=>{o.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,s)=>e?t(e):0===s.length?t(Error("User not found")):void r(s[0].emp_contraseña))})}catch(e){console.error(e)}finally{o.quit()}}async function n(e){try{return new Promise((r,t)=>{o.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,s)=>e?t(e):0===s.length?t(Error("User not found")):void r(s[0]))})}catch(e){console.error(e)}finally{o.quit()}}}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[8948,5711,7070],()=>t(16944));module.exports=s})();