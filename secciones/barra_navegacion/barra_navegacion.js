var sPath = window.location.pathname;
if(sPath=="/panel_personal.html"){
    $('#ir_asignados_pp').addClass('paguina_actual_pp');
}
if(sPath=="/panel_personal_pa.html"){
    $('#ir_pacientes_pp').addClass('paguina_actual_pp');
}
if(sPath=="/panel_personal_arch.html"){
    $('#ir_archivo_pp').addClass('paguina_actual_pp');
}
if(sPath=="/panel_personal_his.html"){
    $('#ir_historial_pp').addClass('paguina_actual_pp');
}

document.getElementById("ir_asignados_pp").onclick = function(){
    verificar_cookie();
    window.location.href = "panel_personal.html";
}
document.getElementById("ir_pacientes_pp").onclick = function(){
    verificar_cookie();
    window.location.href = "panel_personal_pa.html";
}
document.getElementById("ir_archivo_pp").onclick = function(){
    verificar_cookie();
    window.location.href = "panel_personal_arch.html";
}
document.getElementById("ir_historial_pp").onclick = function(){
    verificar_cookie();
    window.location.href = "panel_personal_his.html";
}