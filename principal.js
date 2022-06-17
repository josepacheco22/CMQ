'use strict'

let listaCookies = document.cookie;
let todasLasCookies = listaCookies.split(";");
let reserva;
var cookies_pagina = new Object();
for(var i=0;i<todasLasCookies.length;i++){
    reserva = (todasLasCookies[i]).split("=");
    cookies_pagina[reserva[0].trim()]  = reserva[1];
}
if(cookies_pagina["permisos"]=="2")
{
    window.location.href = "panel_administrador.html";

}else if(cookies_pagina["permisos"]=="1"){
    window.location.href = "panel_personal.html";
}

var color_1_formulario = "#787ff6";
var color_1_error= "rgb(226, 68, 68)";


var modal_ids = document.getElementById("modal_ids");


var inicio_sesion_pgpr = document.getElementById("inicio_sesion_pgpr"); 
var modal_boton_cerrar_superior_ids = document.getElementById("modal_boton_cerrar_superior_ids");
var modal_ejecutar_cancelar_ids = document.getElementById("modal_ejecutar_cancelar_ids");


var visualizar_contrasena_ids = document.getElementById("visualizar_contrasena_ids");
var bandera_ocultar_contrasena_ids = document.getElementById("bandera_ocultar_contrasena_ids");

///////////////////////////////solicitar verificacaon de contraseña</////////////////////////////////////////
var modal_ejecutar_aceptar_ids  = document.getElementById("modal_ejecutar_aceptar_ids");

var usuario_ids = document.getElementById("usuario_ids");
var contrasena_ids = document.getElementById("contrasena_ids");
//var recordar_sesion_ids = document.getElementById("recordar_sesion_ids");

var mensaje_error_usuario_ids = document.getElementById("mensaje_error_usuario_ids");
var mensaje_error_contrasena_ids = document.getElementById("mensaje_error_contrasena_ids");
var modal_interior_mensaje_error_ids = document.getElementById("modal_interior_mensaje_error_ids");

visualizar_contrasena_ids.onclick = function(){
    verificar_visualizador_contraseña_ids();
}

function verificar_visualizador_contraseña_ids(){
    var bandera_mostrar_contrasena_ids = document.getElementById("bandera_mostrar_contrasena_ids");
    if(bandera_mostrar_contrasena_ids.getAttribute("display") == "none")
    {
        contrasena_ids.setAttribute("type","password");
        bandera_mostrar_contrasena_ids.setAttribute("display","block");
        bandera_ocultar_contrasena_ids.setAttribute("display","none");
    }else{
        contrasena_ids.setAttribute("type","text");
        bandera_mostrar_contrasena_ids.setAttribute("display","none");
        bandera_ocultar_contrasena_ids.setAttribute("display","block");
    }
}
// When the user clicks the button, open the modal 
inicio_sesion_pgpr.onclick = function() {
    modal_ids.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
function regresar_labels_normalidad() {
    modal_ids.style.display = "none";
    document.getElementById("usuario_ids").value = "";
    document.getElementById("contrasena_ids").value = "";
    /*recordar_sesion_ids.checked = false;*/
    bandera_mostrar_contrasena_ids.setAttribute("display","none");
    verificar_visualizador_contraseña_ids();
    campos_normalidad_ids();
}
modal_boton_cerrar_superior_ids.onclick = function() {
    regresar_labels_normalidad();
}
modal_ejecutar_cancelar_ids.onclick = function() {
    regresar_labels_normalidad();
}

///////////////////////////////accion input</////////////////////////////////////////
function campos_normalidad_ids(){
    document.getElementById("mensaje_error_usuario_ids").value = "";
        usuario_ids.style.borderColor= color_1_formulario;
        mensaje_error_usuario_ids.style.display = "none";
    document.getElementById("mensaje_error_contrasena_ids").value = "";
        contrasena_ids.style.borderColor= color_1_formulario;
        mensaje_error_contrasena_ids.style.display = "none";
        modal_interior_mensaje_error_ids.style.display = "none";
}
usuario_ids.addEventListener('keyup', (event) => {
    campos_normalidad_ids();
});
contrasena_ids.addEventListener('keyup', (event) => {
    campos_normalidad_ids();
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("modal_ejecutar_aceptar_ids").click();
    }
});



///////////////////////////////solicitar verificacaon de contraseña</////////////////////////////////////////
function alerta_usaurio_no_encontrado(){
    mensaje_error_usuario_ids.innerHTML = "Usuario o Contraseña que has introducido no son correctas.";
    usuario_ids.style.borderColor= color_1_error;
    mensaje_error_usuario_ids.style.display = "block";   
    document.getElementById("mensaje_error_contrasena_ids").value = "";
    contrasena_ids.style.borderColor= color_1_error;
    mensaje_error_contrasena_ids.style.display = "none";  
    modal_interior_mensaje_error_ids.style.display = "block";
    
    document.getElementById("modal_contenido_ids").style.display = "inline-block";
    document.getElementById("contenido_esperar_pp").style.display = "none";
}

modal_ejecutar_aceptar_ids.onclick = function(){
    if(usuario_ids.value == ""||(usuario_ids.value).length <= 2)
    {
        mensaje_error_usuario_ids.innerHTML = "Minimo 3 caracteres en usuario.";
        usuario_ids.style.borderColor= color_1_error;
        mensaje_error_usuario_ids.style.display = "block";
    }else
    {
        document.getElementById("mensaje_error_usuario_ids").value = "";
        usuario_ids.style.borderColor= color_1_formulario;
        mensaje_error_usuario_ids.style.display = "none";
    }
    if(contrasena_ids.value == ""||(contrasena_ids.value).length < 8)
    {
        mensaje_error_contrasena_ids.innerHTML = "Minimo 8 caracteres en contraseña.";
        contrasena_ids.style.borderColor= color_1_error;
        mensaje_error_contrasena_ids.style.display = "block";
        
    }else
    {
        document.getElementById("mensaje_error_contrasena_ids").value = "";
        contrasena_ids.style.borderColor= color_1_formulario;
        mensaje_error_contrasena_ids.style.display = "none";
    }
    if(mensaje_error_usuario_ids.style.display == "block"||mensaje_error_contrasena_ids.style.display == "block" )
    {
        modal_interior_mensaje_error_ids.style.display = "block";
    }else{
        var var_usuario_ids = usuario_ids.value;
        var var_contrasena_ids =contrasena_ids.value;
        document.getElementById("modal_contenido_ids").style.display = "none";
        document.getElementById("contenido_esperar_pp").style.display = "inline-block";
        var parametros_ids = {
          "tipo": "vr",
          "usuario": usuario_ids.value,
          "contrasena": contrasena_ids.value
        };
        $.ajax({ 
            data: parametros_ids,
            url: "consulta.php", 
            type: "POST",
            beforeSend: function (){
            },
            success:function (response){
                //if(response != "0")
                if(response == "0")
                {
                  console.log(response);
                    alerta_usaurio_no_encontrado();
                }else {
                  
                    const resultado_consulta = JSON.parse(response);
                    if(resultado_consulta["habilitado"]=="0")
                    {
                        alerta_usaurio_no_encontrado();
                    }else{
                        document.cookie = "usuario="+resultado_consulta["usuario"];
                        document.cookie = "contrasena="+resultado_consulta["contrasena"];
                        document.cookie = "id_personal="+resultado_consulta["id_personal"];
                        document.cookie = "permisos="+resultado_consulta["permisos"];
                        document.cookie = "max-age=";

                        /*if(document.getElementById('recordar_sesion_ids').checked)
                        {
                            document.cookie = "max-age="+(30*24*60*60);
                        }*/
                        if(resultado_consulta["permisos"]=="2")
                        {
                            window.location.href = "panel_administrador.html";
                        }else
                        {
                          if(resultado_consulta["permisos"]=="1"){
                            /*console.log(resultado_consulta["id_personal"]);*/
                            window.location.href = "panel_personal.html";
                          }
                        }
                    }
                    
                }
            }
        });
    }
}



