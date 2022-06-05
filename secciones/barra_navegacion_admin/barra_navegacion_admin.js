var sPath = window.location.pathname;
if(sPath=="/panel_administrador.html"){
    $('#ir_personal').addClass('paguina_actual_pp');
}
if(sPath=="/panel_administrador_us.html"){
    $('#ir_us').addClass('paguina_actual_pp');
}

document.getElementById("ir_personal").onclick = function(){
    verificar_cookie();
    window.location.href = "panel_administrador.html";
}
document.getElementById("ir_us").onclick = function(){
    verificar_cookie();
    window.location.href = "panel_administrador_us.html";
}