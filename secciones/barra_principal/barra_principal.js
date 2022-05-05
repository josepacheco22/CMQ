

document.getElementById("cerrar_sesion_pp").onclick = function(){
    document.cookie = "usuario=";
    document.cookie = "contrasena=";
    document.cookie = "id_personal=";
    document.cookie = "permisos=";
    document.cookie = "max-age=";
    window.location.href = "principal.html";
}

document.getElementById("usuario_ingreso_pp").innerHTML = " "+cookies_pagina["usuario"];


document.getElementById("header_titulo_pp").onclick = function(){
    window.location.href = "panel_personal.html";
};