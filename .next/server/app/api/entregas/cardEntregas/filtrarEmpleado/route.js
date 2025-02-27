"use strict";(()=>{var e={};e.id=5942,e.ids=[5942],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},98216:e=>{e.exports=require("net")},76162:e=>{e.exports=require("stream")},95346:e=>{e.exports=require("timers")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},84384:(e,r,a)=>{a.r(r),a.d(r,{originalPathname:()=>E,patchFetch:()=>c,requestAsyncStorage:()=>m,routeModule:()=>_,serverHooks:()=>u,staticGenerationAsyncStorage:()=>l});var t={};a.r(t),a.d(t,{GET:()=>d});var i=a(49303),n=a(88716),o=a(60670),s=a(87070),p=a(95143);async function d(e){try{let r=new URL(e.url);r.searchParams.get("page"),r.searchParams.get("limit");let a=r.searchParams.get("access")||null,t=r.searchParams.get("user")||null;if("Admin"===a){let[e,r,a,t,i,n]=await p.ZI.query(`SELECT e.*
          FROM (SELECT DISTINCT en_id FROM empleado_entraga) ee
          JOIN entregas e ON ee.en_id = e.en_id
          ORDER BY e.en_dia_entrega DESC LIMIT 60 OFFSET 0;
          
          SELECT * FROM vehiculos;
    
          SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
          emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados;
    
          SELECT * FROM clientes;
    
          SELECT * FROM entrega_vehiculo;
    
          SELECT * FROM empleado_entraga;`),o=e.map(e=>({en_dia_entrega:e.en_dia_entrega,entrega:e,encargado:a.find(r=>r.emp_id===e.emp_id),vehiculos:r.filter(r=>i.some(a=>a.en_id===e.en_id&&a.ve_id===r.ve_id)),empleados:a.filter(r=>n.some(a=>a.en_id===e.en_id&&a.emp_id===r.emp_id)),cliente:t.find(r=>r.cli_id===e.cli_id)}));return s.NextResponse.json(o)}if("en"===a){let[e,r,a,i,n,o]=await p.ZI.query(`SELECT *
          FROM entregas
          WHERE emp_id = ${t}
          ORDER BY entregas.en_dia_entrega DESC LIMIT 60 OFFSET 0;
          
          SELECT * FROM vehiculos;
    
          SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
          emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados;
    
          SELECT * FROM clientes;
    
          SELECT * FROM entrega_vehiculo;
    
          SELECT * FROM empleado_entraga;`),d=e.map(e=>({en_dia_entrega:e.en_dia_entrega,entrega:e,encargado:a.find(r=>r.emp_id===e.emp_id),vehiculos:r.filter(r=>n.some(a=>a.en_id===e.en_id&&a.ve_id===r.ve_id)),empleados:a.filter(r=>o.some(a=>a.en_id===e.en_id&&a.emp_id===r.emp_id)),cliente:i.find(r=>r.cli_id===e.cli_id)}));return s.NextResponse.json(d)}if(null===a&&t){let[e,r,a,i,n,o]=await p.ZI.query(`SELECT e.*
          FROM (SELECT DISTINCT en_id FROM empleado_entraga) ee
          JOIN entregas e ON ee.en_id = e.en_id
          ${t?`WHERE emp_id = ${t}`:""}
          ORDER BY e.en_dia_entrega DESC LIMIT 60 OFFSET 0;
          
          SELECT * FROM vehiculos;
    
          SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, 
          emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados;
    
          SELECT * FROM clientes;
    
          SELECT * FROM entrega_vehiculo;
    
          SELECT * FROM empleado_entraga;`),d=e.map(e=>({en_dia_entrega:e.en_dia_entrega,entrega:e,encargado:a.find(r=>r.emp_id===e.emp_id),vehiculos:r.filter(r=>n.some(a=>a.en_id===e.en_id&&a.ve_id===r.ve_id)),empleados:a.filter(r=>o.some(a=>a.en_id===e.en_id&&a.emp_id===r.emp_id)),cliente:i.find(r=>r.cli_id===e.cli_id)}));return s.NextResponse.json(d)}}catch(e){return s.NextResponse.json({message:e.message},{status:500})}finally{p.ZI.quit()}}a(71159);let _=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/entregas/cardEntregas/filtrarEmpleado/route",pathname:"/api/entregas/cardEntregas/filtrarEmpleado",filename:"route",bundlePath:"app/api/entregas/cardEntregas/filtrarEmpleado/route"},resolvedPagePath:"C:\\Users\\eloym\\Documents\\Fundacion Jalisco\\fj_sistema_gen\\src\\app\\api\\entregas\\cardEntregas\\filtrarEmpleado\\route.js",nextConfigOutput:"",userland:t}),{requestAsyncStorage:m,staticGenerationAsyncStorage:l,serverHooks:u}=_,E="/api/entregas/cardEntregas/filtrarEmpleado/route";function c(){return(0,o.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:l})}},95143:(e,r,a)=>{a.d(r,{HG:()=>n,ZI:()=>i,vF:()=>o});var t=a(40346);let i=a.n(t)()({config:{host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,port:process.env.DB_PORT,database:process.env.DB_NAME,multipleStatements:!0},pool:{maxConnections:10,minConnections:2,idleTimeout:3e4}});async function n(e){try{return new Promise((r,a)=>{i.query("SELECT emp_contrase\xf1a FROM empleados WHERE emp_usuario = ?",[e],(e,t)=>e?a(e):0===t.length?a(Error("User not found")):void r(t[0].emp_contraseña))})}catch(e){console.error(e)}finally{i.quit()}}async function o(e){try{return new Promise((r,a)=>{i.query("SELECT emp_id, emp_nombre, emp_apellido, emp_num_tel, emp_rol, emp_estado, emp_hora_entrada, emp_hora_salida, emp_foto, emp_usuario FROM empleados WHERE emp_usuario = ?",[e],(e,t)=>e?a(e):0===t.length?a(Error("User not found")):void r(t[0]))})}catch(e){console.error(e)}finally{i.quit()}}}};var r=require("../../../../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),t=r.X(0,[8948,5711,7070],()=>a(84384));module.exports=t})();