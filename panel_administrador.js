'use strict'

let listaCookies = document.cookie;
let todasLasCookies = listaCookies.split(";");
let reserva;
var cookies_pagina = new Object();
for(var i=0;i<todasLasCookies.length;i++){
    reserva = (todasLasCookies[i]).split("=");
    cookies_pagina[reserva[0].trim()]  = reserva[1];
}
if(cookies_pagina["permisos"]=="")
{
    window.location.href = "principal.html";

}else if(cookies_pagina["permisos"]=="1"){
    window.location.href = "panel_personal.html";
}

var color_1_formulario = "#787ff6";
var color_1_error= "rgb(226, 68, 68)";
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
variales
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var agregar_personal_rp = document.getElementById("agregar_personal_rp"); 
var modal_boton_cerrar_superior_rp = document.getElementById("modal_boton_cerrar_superior_rp");
var modal_ejecutar_cancelar_rp = document.getElementById("modal_ejecutar_cancelar_rp");

var visualizar_contrasena_rp = document.getElementById("visualizar_contrasena_rp");
var visualizar_confirmar_contrasena_ep = document.getElementById("visualizar_confirmar_contrasena_rp");
var bandera_ocultar_contrasena_ep = document.getElementById("bandera_ocultar_contrasena_rp");

let fecha_actual = new Date();
$( function() {
    $( "#fecha_nacimiento_rp" ).datepicker({
        showButtonPanel: true,
        closeText: "Cerrar",
        
        currentText: "Hoy",
        dateFormat: "yy-mm-dd",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        maxDate: new Date((fecha_actual.getFullYear()),(fecha_actual.getMonth()),(fecha_actual.getDate())),
        prevText: '<Ant'
    });
    $( "#fecha_nacimiento_rp" ).datepicker( "option", "showAnim", "slideDown" );
  } );
  /*++++++++++++++++++++++++++++++++++++++++++++++mostrar nombre usuario+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  document.getElementById("usuario_ingreso_pa").innerHTML = " "+cookies_pagina["usuario"];

/*++++++++++++++++++++++++++++++++++++++++++++++ modal alerta+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


var modal_contenido_esperar = document.getElementById("modal_contenido_esperar");
var modal_rp = document.getElementById("modal_rp");

modal_rp.style.display = "block";
modal_contenido_esperar.style.display = "inline-block";

/*++++++++++++++++++++++++++++++++++++++++++++++ cerrar sesion +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var cerrar_sesion_rp = document.getElementById("cerrar_sesion_rp");

/*++++++++++++++++++++++++++++++++++++++++++++++ modal confirmar registro+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var tipo_documento_rp = document.getElementById("tipo_documento_rp");
var numero_documento_rp = document.getElementById("numero_documento_rp");
var nombres_rp = document.getElementById("nombres_rp");
var apellidos_rp = document.getElementById("apellidos_rp");
var usuario_rp = document.getElementById("usuario_rp");
var confirmar_contrasena_rp = document.getElementById("confirmar_contrasena_rp");

var sexo_rp = document.getElementById("sexo_rp");
var correo_rp = document.getElementById("correo_rp");
var telefono_1_rp = document.getElementById("telefono_1_rp");
var telefono_2_rp = document.getElementById("telefono_2_rp");

var fecha_nacimiento_rp = document.getElementById("fecha_nacimiento_rp");
var cargo_rp = document.getElementById("cargo_rp");
var especialidad_rp = document.getElementById("especialidad_rp");
var foto_rp = document.getElementById("foto_rp");

var modal_confirmar_registro_rp = document.getElementById("modal_confirmar_registro_rp");
var modal_confirmar_perder_rp =  document.getElementById("modal_confirmar_perder_rp");
var modal_boton_perder_cofirmar_rp =  document.getElementById("modal_boton_perder_cofirmar_rp");
var modal_boton_perder_cancelar_rp =  document.getElementById("modal_boton_perder_cancelar_rp");

var modal_boton_confirmar_cofirmar_rp = document.getElementById("modal_boton_confirmar_cofirmar_rp");
var modal_boton_confirmar_cancelar_rp = document.getElementById("modal_boton_confirmar_cancelar_rp");
/*++++++++++++++++++++++++++++++++++++++++++++++ parametros busqueda tabla+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var buscar_numerodoc_rp = document.getElementById("buscar_numerodoc_rp");
var borrar_numerodoc_rp = document.getElementById("borrar_numerodoc_rp");
var buscar_nombres_rp = document.getElementById("buscar_nombres_rp");
var borrar_nombres_rp = document.getElementById("borrar_nombres_rp");
var buscar_apellidos_rp = document.getElementById("buscar_apellidos_rp");
var borrar_apellidos_rp = document.getElementById("borrar_apellidos_rp");
var buscar_cargo_rp = document.getElementById("buscar_cargo_rp");
var borrar_cargo_rp = document.getElementById("borrar_cargo_rp");
var buscar_usuario_rp = document.getElementById("buscar_usuario_rp");
var borrar_usuario_rp = document.getElementById("borrar_usuario_rp");
var buscar_habilitado_rp = document.getElementById("buscar_habilitado_rp");
var borrar_borrartodo_rp= document.getElementById("borrar_borrartodo_rp");
var cantidad_filas_tabla_pa= document.getElementById("cantidad_filas_tabla_pa");
var buscar_tipo_doc_rp = document.getElementById("buscar_tipo_doc_rp");
var ids_tabla = [];
/*++++++++++++++++++++++++++++++++++++++++++++++ modales +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var modal_contenido_rp = document.getElementById("modal_contenido_rp");
var modal_contenido_confirmar_perder_rp = document.getElementById("modal_contenido_confirmar_perder_rp");
var modal_contenido_confirmar_rp = document.getElementById("modal_contenido_confirmar_rp");
var modal_mensaje_alerta_rp = document.getElementById("modal_mensaje_alerta_rp");

/*++++++++++++++++++++++++++++++++++++++++++++++ funciones formulario rp +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var mensaje_error_usuario_rp = document.getElementById("mensaje_error_usuario_rp");
var mensaje_error_contrasena_rp = document.getElementById("mensaje_error_contrasena_rp");
var modal_interior_mensaje_error_rp = document.getElementById("modal_interior_mensaje_error_rp");
/*++++++++++++++++++++++++++++++++++++++++++++++ modal esperar+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var modal_esperar = document.getElementById("modal_esperar");
/*++++++++++++++++++++++++++++++++++++++++++++++ modal boton alertar+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var modal_boton_alerta_cofirmar_rp = document.getElementById("modal_boton_alerta_cofirmar_rp");
/*++++++++++++++++++++++++++++++++++++++++++++++ modal alertar+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*++++++++++++++++++++++++++++++++++++++++++++++ verificar contraseña+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var contrasena_rp = document.getElementById("contrasena_rp");
var alerta_contrasena_minimo_rp =  document.getElementById("alerta_contrasena_minimo_rp");
var confirmar_contrasena_rp = document.getElementById("confirmar_contrasena_rp");
var alerta_confirmar_contrasena_no_coinciden_rp = document.getElementById("alerta_confirmar_contrasena_no_coinciden_rp");

var alerta_numero_documento_requerido_rp = document.getElementById("alerta_numero_documento_requerido_rp");
var alerta_nombres_rp = document.getElementById("alerta_nombres_rp");
var alerta_apellidos_rp = document.getElementById("alerta_apellidos_rp");
var alerta_usuario_requerido_rp = document.getElementById("alerta_usuario_requerido_rp");
var alerta_contrasena_requerido_rp = document.getElementById("alerta_contrasena_requerido_rp");
var alerta_confirmar_contrasena_requerido_rp = document.getElementById("alerta_confirmar_contrasena_requerido_rp");
var alerta_cargo_rp = document.getElementById("alerta_cargo_rp");

/*++++++++++++++++++++++++++++++++++++++++++++++ verificar formulario+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var modal_ejecutar_aceptar_rp = document.getElementById("modal_ejecutar_aceptar_rp");
var existe_usuario_rp = "no";
var existe_numero_documento = "no";
var contrasena_min_8 = "no";
var contrasena_no_coinciden_rp = "no";
/*++++++++++++++++++++++++++++++++++++++++++++++ verificar el cargo++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var cargo_rp = document.getElementById("cargo_rp");
var especialidad_rp = document.getElementById("especialidad_rp");
var alerta_general_rp = document.getElementById("alerta_general_rp");
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
funciones
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*++++++++++++++++++++++++++++++++++++++++++++++ verificar el cargo++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
cargo_rp.addEventListener('change', (event) => {
    if(cargo_rp.value == "Doctor"){
        especialidad_rp.disabled = false;
    }else{
        especialidad_rp.disabled = true;
        especialidad_rp.options.item(0).selected = 'selected';
    }
    alerta_general_rp.style.display = "none";
});

/*++++++++++++++++++++++++++++++++++++++++++++++ limpiar input++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

nombres_rp.addEventListener('keyup', (event) => {
    nombres_rp.style.border= "2px solid #787ff6";
    alerta_nombres_rp.style.display = "none";
    alerta_general_rp.style.display = "none";
});

apellidos_rp.addEventListener('keyup', (event) => {
    apellidos_rp.style.border= "2px solid #787ff6";
    alerta_apellidos_rp.style.display = "none";
    alerta_general_rp.style.display = "none";
});
cargo_rp.addEventListener('change', (event) => {
    cargo_rp.style.border= "2px solid #787ff6";
    alerta_cargo_rp.style.display = "none";
    alerta_general_rp.style.display = "none";
});
/*++++++++++++++++++++++++++++++++++++++++++++++ verificar contraseña+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function verificar_contrasena() {
    if(contrasena_rp.value == ""||(contrasena_rp.value).length>=8){
        contrasena_rp.style.border= "2px solid #787ff6";
        alerta_contrasena_minimo_rp.style.display = "none";
        contrasena_min_8 = "no";
    }else{
        contrasena_rp.style.border= "2px solid #e24444";
        alerta_contrasena_minimo_rp.style.display = "flex";
        contrasena_min_8 = "si";
    }
    if(confirmar_contrasena_rp.value == "" || (confirmar_contrasena_rp.value)==(contrasena_rp.value)){
        confirmar_contrasena_rp.style.border= "2px solid #787ff6";
        alerta_confirmar_contrasena_no_coinciden_rp.style.display = "none";
        contrasena_no_coinciden_rp = "no";
    }else{
        confirmar_contrasena_rp.style.border= "2px solid #e24444";
        alerta_confirmar_contrasena_no_coinciden_rp.style.display = "flex";
        contrasena_no_coinciden_rp = "si";
    }
};
confirmar_contrasena_rp.addEventListener('keyup', (event) => {
    alerta_confirmar_contrasena_requerido_rp.style.display = "none";
    alerta_contrasena_requerido_rp.style.display = "none";
    alerta_general_rp.style.display = "none";
    verificar_contrasena();
});
contrasena_rp.addEventListener('keyup', (event) => {
    alerta_contrasena_requerido_rp.style.display = "none";
    alerta_confirmar_contrasena_requerido_rp.style.display = "none";
    alerta_general_rp.style.display = "none";
    verificar_contrasena();
});
/*++++++++++++++++++++++++++++++++++++++++++++++ verificar formulario++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function funcion_verificar_numero_documento(){
    alerta_numero_documento_requerido_rp.style.display = "none";
    if((numero_documento_rp.value)!=""){
        var parametros_rp = {
            "tipo": "bc",
            "parametro": numero_documento_rp.value,
            "tipo_busqueda": "nd"
        };
        $.ajax({ 
            data: parametros_rp,
            url: "consulta.php", 
            type: "POST",
            beforeSend: function (){
            },
            success:function (response){
                var division_respuesta = response.split("-");
                numero_documento_rp.style.border= division_respuesta[0];
                existe_numero_documento = division_respuesta[1];
                if(division_respuesta[1]=="si")
                {
                    alerta_numero_documento_existe_rp.style.display = "flex";

                }else{
                    alerta_numero_documento_existe_rp.style.display = "none";
                }
                
            }
        });
    }else{
        numero_documento_rp.style.border= "2px solid #787ff6";
        alerta_numero_documento_existe_rp.style.display = "none";
        existe_numero_documento ="no";
    }
};
numero_documento_rp.addEventListener('keyup', (event) => {
    alerta_general_rp.style.display = "none";
    funcion_verificar_numero_documento();  
});
function funcion_verificar_usaurio_existe(){
    alerta_usuario_requerido_rp.style.display = "none";
    if((usuario_rp.value)!=""){
        var parametros_rp = {
            "tipo": "bc",
            "parametro": usuario_rp.value,
            "tipo_busqueda": "u"
        };
        $.ajax({ 
            data: parametros_rp,
            url: "consulta.php", 
            type: "POST",
            beforeSend: function (){
            },
            success:function (response){
                var division_respuesta = response.split("-");
                usuario_rp.style.border= division_respuesta[0];
                existe_usuario_rp = division_respuesta[1];
                if(division_respuesta[1]=="si")
                {
                    alerta_usuario_existe_rp.style.display = "flex";

                }else{
                    alerta_usuario_existe_rp.style.display = "none";
                }
            }
        });
    }else{
        usuario_rp.style.border= "2px solid #787ff6";
        existe_usuario_rp = "no";
        alerta_usuario_existe_rp.style.display = "none";
    }
};

usuario_rp.addEventListener('keyup', (event) => {
    alerta_general_rp.style.display = "none";
    funcion_verificar_usaurio_existe();
});

/*++++++++++++++++++++++++++++++++++++++++++++++ verificar campos vacios+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
modal_ejecutar_aceptar_rp.onclick = function(){
    var bandera = "no";
    funcion_verificar_numero_documento();
    funcion_verificar_usaurio_existe();
    if((numero_documento_rp.value)=="")
    {
        bandera = "si";
        numero_documento_rp.style.border= "2px solid #e24444";
        alerta_numero_documento_requerido_rp.style.display = "flex";
    }else
    {
        numero_documento_rp.style.border= "2px solid #787ff6";
        alerta_numero_documento_requerido_rp.style.display = "none";
    }
    if((nombres_rp.value)=="")
    {
        bandera = "si";
        nombres_rp.style.border= "2px solid #e24444";
        alerta_nombres_rp.style.display = "flex";
    }else
    {
        nombres_rp.style.border= "2px solid #787ff6";
        alerta_nombres_rp.style.display = "none";
    }
    if((apellidos_rp.value)=="")
    {
        bandera = "si";
        apellidos_rp.style.border= "2px solid #e24444";
        alerta_apellidos_rp.style.display = "flex";
    }else
    {
        apellidos_rp.style.border= "2px solid #787ff6";
        alerta_apellidos_rp.style.display = "none";
    }
    if((usuario_rp.value)=="")
    {
        bandera = "si";
        usuario_rp.style.border= "2px solid #e24444";
        alerta_usuario_requerido_rp.style.display = "flex";
    }else
    {
        usuario_rp.style.border= "2px solid #787ff6";
        alerta_usuario_requerido_rp.style.display = "none";
    }
    if((contrasena_rp.value)=="")
    {
        bandera = "si";
        contrasena_rp.style.border= "2px solid #e24444";
        alerta_contrasena_requerido_rp.style.display = "flex";
    }else
    {
        verificar_contrasena();
    }
    if((confirmar_contrasena_rp.value)=="")
    {
        bandera = "si";
        confirmar_contrasena_rp.style.border= "2px solid #e24444";
        alerta_confirmar_contrasena_requerido_rp.style.display = "flex";
    }else
    {
        verificar_contrasena();
    }
    if((cargo_rp.value)=="")
    {
        bandera = "si";
        cargo_rp.style.border= "2px solid #e24444";
        alerta_cargo_rp.style.display = "flex";
    }else
    {
        cargo_rp.style.border= "2px solid #787ff6";
        alerta_cargo_rp.style.display = "none";
    }
    if(bandera =="no" && existe_usuario_rp == "no" &&existe_numero_documento == "no"&& contrasena_min_8 == "no"&& contrasena_no_coinciden_rp == "no")
    {
        modal_contenido_rp.style.display = "none";
        document.getElementById("label_confirmar_registro_tipo_documento").innerHTML=tipo_documento_rp.value;
        document.getElementById("label_confirmar_registro_documento").innerHTML=numero_documento_rp.value;
        document.getElementById("label_confirmar_registro_nombres").innerHTML=nombres_rp.value;
        document.getElementById("label_confirmar_registro_apellidos").innerHTML=apellidos_rp.value;;
        document.getElementById("label_confirmar_registro_usuario").innerHTML=usuario_rp.value;
        document.getElementById("label_confirmar_registro_contrasena").innerHTML="----------";
        document.getElementById("label_confirmar_registro_sexo").innerHTML=sexo_rp.value;
        document.getElementById("label_confirmar_registro_correo").innerHTML=correo_rp.value;
        document.getElementById("label_confirmar_registro_telefono").innerHTML=telefono_1_rp.value;
        document.getElementById("label_confirmar_registro_convencional").innerHTML=telefono_2_rp.value;
        document.getElementById("label_confirmar_registro_nacimiento").innerHTML=fecha_nacimiento_rp.value;
        document.getElementById("label_confirmar_registro_cargo").innerHTML=cargo_rp.value;
        document.getElementById("label_confirmar_registro_especialidad").innerHTML=especialidad_rp.value;
        modal_contenido_confirmar_rp.style.display = "inline-block";   
    }else{
        alerta_general_rp.style.display = "flex";
    }
};

/*++++++++++++++++++++++++++++++++++++++++++++++ cerrar alerta ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

modal_boton_alerta_cofirmar_rp.onclick = function(){
    modal_mensaje_alerta_rp.style.display = "none";
    modal_rp.style.display = "none";
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
}

/*++++++++++++++++++++++++++++++++++++++++++++++ cerrar sesion administrador++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

cerrar_sesion_rp.onclick = function(){
    document.cookie = "usuario=";
    document.cookie = "contrasena=";
    document.cookie = "id_personal=";
    document.cookie = "permisos=";
    document.cookie = "max-age=";
    window.location.href = "principal.html";
}

/*++++++++++++++++++++++++++++++++++++++++++++++ llenar tabla p +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function llenar_tabla_p(numero_filas) {
    var parametros_rp = {
        "tipo": "tp",
        "buscar_habilitado": buscar_habilitado_rp.checked,
        "buscar_tipo_doc": buscar_tipo_doc_rp.value,
        "buscar_numerodoc": buscar_numerodoc_rp.value,
        "buscar_nombres": buscar_nombres_rp.value,
        "buscar_apellidos": buscar_apellidos_rp.value,
        "buscar_cargo": buscar_cargo_rp.value,
        "buscar_usuario": buscar_usuario_rp.value,
        "numero_filas": numero_filas
    };
    var bandera = true;
    
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
            $(".resultados_de_tablas").detach();
        },
        success:function (response){
            if(response!="")
            {
                var division_respuesta = response.split("ids");
                $("#cuerpo_tabla").append(division_respuesta[0]);   
                ids_tabla = JSON.parse(division_respuesta[1]); 
            }
                
        }
    });
}
llenar_tabla_p(cantidad_filas_tabla_pa.value);

buscar_habilitado_rp.addEventListener('change', (event) => {
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
});
buscar_tipo_doc_rp.addEventListener('change', (event) => {
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
});
cantidad_filas_tabla_pa.addEventListener('change', (event) => {
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
});
buscar_numerodoc_rp.addEventListener('keyup', (event) => {
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
});
buscar_nombres_rp.addEventListener('keyup', (event) => {
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
});
buscar_apellidos_rp.addEventListener('keyup', (event) => {
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
});
buscar_cargo_rp.addEventListener('keyup', (event) => {
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
});
buscar_usuario_rp.addEventListener('keyup', (event) => {
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
});
borrar_numerodoc_rp.onclick = function(){
    document.getElementById("buscar_numerodoc_rp").value = "";
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
}
borrar_nombres_rp.onclick = function(){
    document.getElementById("buscar_nombres_rp").value = "";
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
}
borrar_apellidos_rp.onclick = function(){
    document.getElementById("buscar_apellidos_rp").value = "";
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
}
borrar_cargo_rp.onclick = function(){
    document.getElementById("buscar_cargo_rp").value = "";
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
}
borrar_usuario_rp.onclick = function(){
    document.getElementById("buscar_usuario_rp").value = "";
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
}
borrar_borrartodo_rp.onclick = function(){
    document.getElementById("buscar_numerodoc_rp").value = "";
    document.getElementById("buscar_nombres_rp").value = "";
    document.getElementById("buscar_apellidos_rp").value = "";
    document.getElementById("buscar_cargo_rp").value = "";
    document.getElementById("buscar_usuario_rp").value = "";
    buscar_habilitado_rp.checked = true;
    buscar_tipo_doc_rp.options.item(0).selected = 'selected';
    cantidad_filas_tabla_pa.item(0).selected = 'selected';
    llenar_tabla_p(cantidad_filas_tabla_pa.value);
}

function accion_habilitar(valor)
{
    if(ids_tabla!="")
    {
        console.log(ids_tabla[valor-1]);
    }
    
}
function accion_deshabilitar(valor)
{
    if(ids_tabla!="")
    {
        console.log(ids_tabla[valor-1]);
    }
}

/*++++++++++++++++++++++++++++++++++++++++++++++ funciones formulario rp +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

visualizar_contrasena_rp.onclick = function(){
    verificar_visualizador_contraseña_rp();
}
visualizar_confirmar_contrasena_rp.onclick = function(){
    verificar_visualizador_contrasena_contraseña_rp();
}
function verificar_visualizador_contraseña_rp(){
    var bandera_mostrar_contrasena_rp = document.getElementById("bandera_mostrar_contrasena_rp");
    if(bandera_mostrar_contrasena_rp.getAttribute("display") == "none")
    {
        contrasena_rp.setAttribute("type","password");
        bandera_mostrar_contrasena_rp.setAttribute("display","block");
        bandera_ocultar_contrasena_rp.setAttribute("display","none");
    }else{
        contrasena_rp.setAttribute("type","text");
        bandera_mostrar_contrasena_rp.setAttribute("display","none");
        bandera_ocultar_contrasena_rp.setAttribute("display","block");
    }
}
function verificar_visualizador_contrasena_contraseña_rp(){
    var bandera_mostrar_confirmar_contrasena_rp = document.getElementById("bandera_mostrar_confirmar_contrasena_rp");
    if(bandera_mostrar_confirmar_contrasena_rp.getAttribute("display") == "none")
    {
        confirmar_contrasena_rp.setAttribute("type","password");
        bandera_mostrar_confirmar_contrasena_rp.setAttribute("display","block");
        bandera_ocultar_confirmar_contrasena_rp.setAttribute("display","none");
    }else{
        confirmar_contrasena_rp.setAttribute("type","text");
        bandera_mostrar_confirmar_contrasena_rp.setAttribute("display","none");
        bandera_ocultar_confirmar_contrasena_rp.setAttribute("display","block");
    }
}
// When the user clicks the button, open the modal 
agregar_personal_rp.onclick = function() {
    modal_rp.style.display = "block";
    modal_contenido_rp.style.display = "inline-block";
    funcion_verificar_usaurio_existe();
    funcion_verificar_numero_documento(); 
    verificar_contrasena(); 
};
// When the user clicks on <span> (x), close the modal

/*++++++++++++++++++++++++++++++++++++++++++++++ confirmar registro personal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function regresar_labels_normalidad_rp() {
    tipo_documento_rp.item(0).selected = 'selected';
    document.getElementById("numero_documento_rp").value = "";
    document.getElementById("nombres_rp").value = "";
    document.getElementById("apellidos_rp").value = "";
    document.getElementById("usuario_rp").value = "";
    document.getElementById("contrasena_rp").value = "";
    document.getElementById("confirmar_contrasena_rp").value = "";
    sexo_rp.options.item(0).selected = 'selected';
    document.getElementById("correo_rp").value = "";
    document.getElementById("telefono_1_rp").value = "";
    document.getElementById("telefono_2_rp").value = "";
    document.getElementById("fecha_nacimiento_rp").value = "";
    cargo_rp.options.item(0).selected = 'selected';
    especialidad_rp.item(0).selected = 'selected';
    especialidad_rp.disabled = true;
    document.getElementById("foto_rp").value = "";
    bandera_mostrar_contrasena_rp.setAttribute("display","none");

    existe_usuario_rp = "no";
    existe_numero_documento = "no";
    contrasena_min_8 = "no";
    contrasena_no_coinciden_rp = "no";
    alerta_general_rp.style.display = "none";

    contrasena_rp.style.border= "2px solid #787ff6";
    alerta_contrasena_minimo_rp.style.display = "none";
    confirmar_contrasena_rp.style.border= "2px solid #787ff6";
    alerta_confirmar_contrasena_no_coinciden_rp.style.display = "none";
    alerta_confirmar_contrasena_requerido_rp.style.display = "none";
    alerta_contrasena_requerido_rp.style.display = "none";
    alerta_general_rp.style.display = "none";
    alerta_contrasena_requerido_rp.style.display = "none";
    alerta_confirmar_contrasena_requerido_rp.style.display = "none";
    alerta_general_rp.style.display = "none";
    numero_documento_rp.style.border= "2px solid #787ff6";
    alerta_numero_documento_existe_rp.style.display = "none";
    usuario_rp.style.border= "2px solid #787ff6";
    alerta_usuario_existe_rp.style.display = "none";
    numero_documento_rp.style.border= "2px solid #787ff6";
    alerta_numero_documento_requerido_rp.style.display = "none";
    nombres_rp.style.border= "2px solid #787ff6";
    alerta_nombres_rp.style.display = "none";
    apellidos_rp.style.border= "2px solid #787ff6";
    alerta_apellidos_rp.style.display = "none";
    usuario_rp.style.border= "2px solid #787ff6";
    alerta_usuario_requerido_rp.style.display = "none";
    cargo_rp.style.border= "2px solid #787ff6";
    alerta_cargo_rp.style.display = "none";





    verificar_visualizador_contraseña_rp();
}
modal_boton_cerrar_superior_rp.onclick = function() {
    modal_contenido_rp.style.display = "none";
    modal_contenido_confirmar_perder_rp.style.display = "inline-block";
}
modal_ejecutar_cancelar_rp.onclick = function() {
    modal_contenido_rp.style.display = "none";
    modal_contenido_confirmar_perder_rp.style.display = "inline-block";
}

var alerta_input_general_rp = document.getElementsByClassName("alerta_input_general_rp");
modal_boton_perder_cofirmar_rp.onclick = function() {
    modal_contenido_confirmar_perder_rp.style.display = "none";
    modal_rp.style.display = "none";
    regresar_labels_normalidad_rp();
};
modal_boton_perder_cancelar_rp.onclick = function() {
    modal_contenido_confirmar_perder_rp.style.display = "none";
    modal_contenido_rp.style.display = "inline-block";
};

modal_boton_confirmar_cancelar_rp.onclick = function(){
    modal_contenido_confirmar_rp.style.display = "none";
    modal_contenido_rp.style.display = "inline-block";
}

modal_boton_confirmar_cofirmar_rp.onclick = function(){
    modal_contenido_confirmar_rp.style.display = "none";
    modal_contenido_esperar.style.display = "inline-block";

    document.getElementById("label_confirmar_registro_tipo_documento").innerHTML="";
    document.getElementById("label_confirmar_registro_documento").innerHTML="";
    document.getElementById("label_confirmar_registro_nombres").innerHTML="";
    document.getElementById("label_confirmar_registro_apellidos").innerHTML="";
    document.getElementById("label_confirmar_registro_usuario").innerHTML="";
    document.getElementById("label_confirmar_registro_contrasena").innerHTML="";
    document.getElementById("label_confirmar_registro_sexo").innerHTML="";
    document.getElementById("label_confirmar_registro_correo").innerHTML="";
    document.getElementById("label_confirmar_registro_telefono").innerHTML="";
    document.getElementById("label_confirmar_registro_convencional").innerHTML="";
    document.getElementById("label_confirmar_registro_nacimiento").innerHTML="";
    document.getElementById("label_confirmar_registro_cargo").innerHTML="";
    document.getElementById("label_confirmar_registro_especialidad").innerHTML="";
    
    var var_tipo_documento_rp = tipo_documento_rp.value;
    var var_numero_documento_rp = numero_documento_rp.value;
    var var_nombres_rp = nombres_rp.value;
    var var_apellidos_rp = apellidos_rp.value;
    var var_usuario_rp = usuario_rp.value;
    var var_confirmar_contrasena_rp = confirmar_contrasena_rp.value;

    var var_sexo_rp = sexo_rp.value;
    var var_correo_rp = correo_rp.value;
    var var_telefono_1_rp = telefono_1_rp.value;
    var var_telefono_2_rp = telefono_2_rp.value;

    var var_fecha_nacimiento_rp = fecha_nacimiento_rp.value;
    var var_cargo_rp = cargo_rp.value;
    var var_especialidad_rp = especialidad_rp.value;
    var var_foto_rp = foto_rp.value;

    if(var_confirmar_contrasena_rp!=""&&var_usuario_rp!=""){
        var parametros_rp = {
            "tipo": "rp",
            "tipo_documento": var_tipo_documento_rp,
            "numero_documento": var_numero_documento_rp,
            "nombres": var_nombres_rp,
            "apellidos": var_apellidos_rp,
            "sexo": var_sexo_rp,
            "correo": var_correo_rp,
            "telefono_1": var_telefono_1_rp,
            "telefono_2": var_telefono_2_rp,
            "fecha_nacimiento": var_fecha_nacimiento_rp,
            "cargo": var_cargo_rp,
            "especialidad": var_especialidad_rp,
            "miniatura": "",
            "foto": var_foto_rp,
            "nombre_usuario": var_usuario_rp,
            "contrasena_usuario": var_confirmar_contrasena_rp,
        };
        $.ajax({ 
            data: parametros_rp,
            url: "consulta.php", 
            type: "POST",
            beforeSend: function (){
                modal_contenido_esperar.style.display = "none";
            },
            success:function (response){
                modal_contenido_esperar.style.display = "none";
                document.getElementById("label_mensaje_alerta_superior_rp").innerHTML=response;
                regresar_labels_normalidad_rp();
                modal_mensaje_alerta_rp.style.display = "inline-block"; 
                
            },
            error : function(xhr, status) {
                modal_contenido_esperar.style.display = "none";
                document.getElementById("label_mensaje_alerta_superior_rp").innerHTML="Error, No fue posible conectarse a la base de datos.";
                regresar_labels_normalidad_rp();
                modal_mensaje_alerta_rp.style.display = "inline-block";
            }

        });
    }
}

modal_contenido_esperar.style.display = "none";
modal_rp.style.display = "none";

/*
function cerrar_sesion(){
    sessionStorage.clear();
    window.location.href = "principal.html";
}

var modal_cambio_contrasena_administrador = document.getElementById("modal_cambio_contrasena_administrador"); // obtener el modal cmpleto
var boton_cambio_contrasena_administrador = document.getElementById("boton_cambio_contrasena_administrador"); // obtener elemento boton
//obtener las opciones de cerrarerrar el modal
var cerrar_modal_superior = document.getElementById("cerrar_modal_superior");
var cerrar_modar_cancelar = document.getElementById("cerrar_modal_cancelar");

// When the user clicks the button, open the modal 
boton_cambio_contrasena_administrador.onclick = function() {
    modal_cambio_contrasena_administrador.style.display = "block";
    document.getElementById("submit").disabled = true;
    document.getElementById("confirmar_contrasena").disabled = true;
    

}

// When the user clicks on <span> (x), close the modal
function regresar_labels_normalidad() {
    modal_cambio_contrasena_administrador.style.display = "none";
    document.getElementById("nueva_contrasena").value = "";
    document.getElementById("confirmar_contrasena").value = "";


    document.getElementById("icono_nueva_contrasena_correcto").hidden = true;
    document.getElementById("icono_confirmar_contrasena_incorecto").hidden = true;
    document.getElementById("icono_confirmar_contrasena_correcto").hidden = true;

    document.getElementsByClassName("clase_nueva_contrasena")[0].style.color = normal;
    document.getElementsByClassName("clase_nueva_contrasena")[1].style.borderColor = normal;
    document.getElementsByClassName("clase_confirmar_contrasena")[0].style.color = normal;
    document.getElementsByClassName("clase_confirmar_contrasena")[1].style.borderColor = normal;
    window.location.href = "panel_administrador.html";
}
cerrar_modal_superior.onclick = function() {
    regresar_labels_normalidad();
}
cerrar_modar_cancelar.onclick = function() {
    regresar_labels_normalidad();
}


function verificar_nueva_contrasena(){
    var contar_caracteres_nueva_contrasena = document.querySelector("#nueva_contrasena").value;
    if ((contar_caracteres_nueva_contrasena.length)>= 8)
    { 
        document.getElementById("confirmar_contrasena").disabled = false;
        document.getElementById("icono_nueva_contrasena_correcto").hidden = false;
        verificar_confirmar_contrasena();
    }else{
        document.getElementById("confirmar_contrasena").disabled = true;
        document.getElementById("confirmar_contrasena").value = "";
        document.getElementById("icono_nueva_contrasena_correcto").hidden = true;
        document.getElementById("icono_confirmar_contrasena_correcto").hidden = true;
        document.getElementById("icono_confirmar_contrasena_incorecto").hidden = true;
        document.getElementById("submit").disabled = true;
        


    }
}
function verificar_confirmar_contrasena(){
    if (document.querySelector("#nueva_contrasena").value == document.querySelector("#confirmar_contrasena").value)
    {
        document.getElementById("submit").disabled = false;
        document.getElementById("icono_confirmar_contrasena_incorecto").hidden = true;
        document.getElementById("icono_confirmar_contrasena_correcto").hidden = false;

    }else{
        document.getElementById("submit").disabled = true;
        document.getElementById("icono_confirmar_contrasena_incorecto").hidden = false;
        document.getElementById("icono_confirmar_contrasena_correcto").hidden = true;
        if(document.querySelector("#confirmar_contrasena").value == "")
        {
            document.getElementById("icono_confirmar_contrasena_incorecto").hidden = true;
        }
    }
}


window.addEventListener('load',function(){
    var formulario  = document.querySelector("#cambio_contrasena_administrador");
    formulario.addEventListener('submit',function(){

        var datos_cambio_contrasena_db_administrador = new FormData(); //creacion variable con inforacion
        //insertar informacion 
        datos_cambio_contrasena_db_administrador.append("usuario", sessionStorage.getItem("usuario"));
        datos_cambio_contrasena_db_administrador.append("contrasena", document.querySelector("#nueva_contrasena").value);
        datos_cambio_contrasena_db_administrador.append("tipo", "cambio_contrasena");
        
        var cambio_contrasena_db_administrador = new XMLHttpRequest(); //crear variable de conexion
        cambio_contrasena_db_administrador.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) 
            { 
                if(cambio_contrasena_db_administrador.responseText == "exito")
                {
                    alert("Cambio realizado con exito.\nEs necesario iniciar sesion");
                    sessionStorage.clear();
                    window.location.href = "principal.html";
                }else{
                    alert("Cambio fallido.\nComnicarse con el administrador");
                    window.location.href = "panel_administrador.html";
                }
            }    
        }
        cambio_contrasena_db_administrador.open("POST", "panel_administrador.php"); //abrir la conexion
        cambio_contrasena_db_administrador.send(datos_cambio_contrasena_db_administrador); //enviar consulta
        alert("CREAR MODAL DE ESPERA");
    });
});


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
DISEÑO MODAL REGISTRO PERSONAL
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*
var modal_registro_nuevo_personal = document.getElementById("modal_registro_nuevo_personal"); // obtener el modal cmpleto
var boton_registro_nuevo_personal = document.getElementById("boton_registro_nuevo_personal"); // obtener elemento boton
//obtener las opciones de cerrarerrar el modal
var cerrar_modal_superior_registro_nuevo_personal = document.getElementById("cerrar_modal_superior_registro_nuevo_personal");
var cerrar_modal_cancelar_registro_nuevo_personal = document.getElementById("cerrar_modal_cancelar_registro_nuevo_personal");

// When the user clicks the button, open the modal 
boton_registro_nuevo_personal.onclick = function() {
    modal_registro_nuevo_personal.style.display = "block";
}
cerrar_modal_superior_registro_nuevo_personal.onclick = function() {
    modal_registro_nuevo_personal.style.display = "none";
}
cerrar_modal_cancelar_registro_nuevo_personal.onclick = function() {
    modal_registro_nuevo_personal.style.display = "none";
}

window.addEventListener('load',function(){
    var formulario  = document.querySelector("#cambio_contrasena_administrador");
    formulario.addEventListener('submit',function(){

    });
});
*/