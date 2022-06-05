var ids_tabla = [];
function llenar_tabla_personal_con_espera() {
    var parametros_rp = {
        "tipo": "tppad",
        "habilitado": document.getElementById("buscar_habilitado").value,
        "tipo_documento": document.getElementById("buscar_tipo_documento").value,
        "numero_documento": document.getElementById("buscar_numero_documento").value,
        "nombres": document.getElementById("buscar_nombres").value,
        "cargo": document.getElementById("buscar_cargo").value,
        "nombre_usuario": document.getElementById("buscar_usuario").value,
        "cantidad_filas": document.getElementById("input_cantidad_filas").value
    };
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response!="")
            {
                var division_respuesta = response.split("ids");
                $(".resultados_de_tablas").detach();
                $("#cuerpo_tabla_pp").append(division_respuesta[0]);   
                ids_tabla = JSON.parse(division_respuesta[1]); 
                document.getElementById("contenido_esperar_pp").style.display = "none"; 
                document.getElementById("modal_pp").style.display =  "none";
            } 
        }
    });
};
document.getElementById("modal_pp").style.display = "block";
document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
llenar_tabla_personal_con_espera();


document.getElementById("buscar_habilitado").addEventListener('change', (event) => {
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_personal_con_espera();
});
document.getElementById("buscar_tipo_documento").addEventListener('change', (event) => {
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_personal_con_espera();
});
document.getElementById("buscar_numero_documento").addEventListener('keyup', (event) => {
    llenar_tabla_personal_con_espera();
});
document.getElementById("buscar_nombres").addEventListener('keyup', (event) => {
    llenar_tabla_personal_con_espera();
});
document.getElementById("buscar_cargo").addEventListener('keyup', (event) => {
    llenar_tabla_personal_con_espera();
});
document.getElementById("buscar_usuario").addEventListener('keyup', (event) => {
    llenar_tabla_personal_con_espera();
});

document.getElementById("boton_borrar_numero_documento").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    document.getElementById("buscar_numero_documento").value = "";
    llenar_tabla_personal_con_espera();
};
document.getElementById("boton_borrar_nombres").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    document.getElementById("buscar_nombres").value = "";
    llenar_tabla_personal_con_espera();
};
document.getElementById("boton_borrar_cargo").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    document.getElementById("buscar_cargo").value = "";
    llenar_tabla_personal_con_espera();
};
document.getElementById("boton_borrar_usuario").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    document.getElementById("buscar_usuario").value = "";
    llenar_tabla_personal_con_espera();
};

document.getElementById("boton_actualizar").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_personal_con_espera();
};

document.getElementById("boton_borrar_todo").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 

    document.getElementById("buscar_numero_documento").value = "";
    document.getElementById("buscar_nombres").value = "";
    document.getElementById("buscar_cargo").value = "";
    document.getElementById("buscar_usuario").value = "";
    
    document.getElementById("buscar_tipo_documento").options.item(0).selected = 'selected';
    document.getElementById("buscar_habilitado").options.item(0).selected = 'selected';

    llenar_tabla_personal_con_espera();
};

document.getElementById("input_cantidad_filas").addEventListener('change', (event) => {
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_personal_con_espera();
});






document.getElementById("boton_nuevo_personal").onclick = function(){
    window.open("nuevo_personal.html");
};
function accion_editar(numero){
    sessionStorage.setItem('id_personal', ids_tabla[numero]);
    window.open("editar_personal.html");
}


var id_seleccionado_borrar = "";
function accion_eliminar(numero){
    document.getElementById("modal_pp").style.display = "block"; 
    document.getElementById("confirmar_eliminar").style.display = "inline-block"; 
    console.log(ids_tabla[numero]);
    id_seleccionado_borrar = ids_tabla[numero];
}
document.getElementById("boton_eliminar_cancelar_pp").onclick = function(){
    document.getElementById("confirmar_eliminar").style.display = "none"; 
    document.getElementById("modal_pp").style.display = "none"; 
};
document.getElementById("boton_eliminar_aceptar_pp").onclick = function(){
    document.getElementById("confirmar_eliminar").style.display = "none"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    borrar_personal_con_espera();
};
function borrar_personal_con_espera() {
    var parametros_rp = {
        "tipo": "elpers",
        "id": id_seleccionado_borrar
    };
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response == "1"){
                document.getElementById("label_mensaje_alerta_superior_eliminar").innerHTML = "REGISTRO CON EXITO";
            }else{
                document.getElementById("label_mensaje_alerta_superior_eliminar").innerHTML = response;
            }
            document.getElementById("contenido_esperar_pp").style.display = "none";
            document.getElementById("mensaje_alerta_eliminar").style.display = "inline-block";
        }
    });
    id_seleccionado_borrar="";
};
document.getElementById("boton_alerta_eliminar_aceptar_pp").onclick = function(){
    document.getElementById("mensaje_alerta_eliminar").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_personal_con_espera();
};
var id_personal_cambio_pasw ="";
function accion_pass(numero){
    id_personal_cambio_pasw = ids_tabla[numero];
    
    document.getElementById("input_contrasena_1").value = "";
    document.getElementById("input_contrasena_2").value = "";
    document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_formulario;
    document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_contrasena_1").style.display = "none";
    document.getElementById("alerta_contrasena_2").style.display = "none";
    document.getElementById("alerta_general").style.display = "none";

    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("confirmar_cambio_contrasena").style.display = "inline-block";
}


document.getElementById("restablecer_contrasena_2").onclick = function(){
    document.getElementById("alerta_contrasena_2").style.display = "none";
    document.getElementById("input_contrasena_2").value = "";
    document.getElementById("alerta_general").style.display = "none";
    document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_formulario;
};
document.getElementById("restablecer_contrasena_1").onclick = function(){
    document.getElementById("alerta_contrasena_1").style.display = "none";
    document.getElementById("input_contrasena_1").value = "";
    document.getElementById("alerta_general").style.display = "none";
    document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_formulario;
};

document.getElementById("input_contrasena_1").addEventListener('keyup', (event) => {
    document.getElementById("alerta_general").style.display = "none";
    verificar_contrasena_1();
});
$( "#input_contrasena_1").blur(function() {
    verificar_contrasena_1();
});
function verificar_contrasena_1(){
    if((document.getElementById("input_contrasena_1").value).length < 8){
        document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_error;
        document.getElementById("alerta_contrasena_1").style.display = "block";
    }else{
        document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_formulario;
        document.getElementById("alerta_contrasena_1").style.display = "none";
    }
}

document.getElementById("input_contrasena_2").addEventListener('keyup', (event) => {
    
    document.getElementById("alerta_general").style.display = "none";
    verificar_contrasena_2();
});
$( "#input_contrasena_2").blur(function() {
    verificar_contrasena_2();
});
function verificar_contrasena_2(){
    if((document.getElementById("input_contrasena_2").value).length < 8 || (document.getElementById("input_contrasena_1").value)!=(document.getElementById("input_contrasena_2").value)){
        document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_error;
        document.getElementById("alerta_contrasena_2").style.display = "block";
    }else{
        document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_formulario;
        document.getElementById("alerta_contrasena_2").style.display = "none";
    }
}

document.getElementById("boton_contrasena_cancelar_pp").onclick = function(){
    document.getElementById("confirmar_cambio_contrasena").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
}

document.getElementById("boton_contrasena_aceptar_pp").onclick = function(){
    guardar_todo();
};
var bandera_campo_requerido = 0;
function guardar_todo()
{
    bandera_campo_requerido = 0;
    if( (document.getElementById("input_contrasena_1").value)=="" || (document.getElementById("input_contrasena_1").value).length < 8)
    {
        bandera_campo_requerido = 1;
        document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_error;
        document.getElementById("alerta_contrasena_1").style.display = "block";
    }
    if( (document.getElementById("input_contrasena_2").value)=="" || (document.getElementById("input_contrasena_2").value) != (document.getElementById("input_contrasena_1").value))
    {
        bandera_campo_requerido = 1;
        document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_error;
        document.getElementById("alerta_contrasena_2").style.display = "block";
    }
    if(bandera_campo_requerido == 1){
        document.getElementById("alerta_general").style.display = "block";
    }else{
    document.getElementById("confirmar_cambio_contrasena").style.display = "none";
        document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
        confirmado_guardar_contrasena();
    }
}
document.getElementById("ocultar_contrasena_1").onclick = function(){
    document.getElementById("ocultar_contrasena_1").style.display = "none";
    document.getElementById("mostrar_contrasena_1").style.display = "block";
    document.getElementById("input_contrasena_1").type = "text";  
};
document.getElementById("mostrar_contrasena_1").onclick = function(){
    document.getElementById("mostrar_contrasena_1").style.display = "none";
    document.getElementById("ocultar_contrasena_1").style.display = "block";   
    document.getElementById("input_contrasena_1").type = "password";    
};
document.getElementById("ocultar_contrasena_2").onclick = function(){
    document.getElementById("ocultar_contrasena_2").style.display = "none";   
    document.getElementById("mostrar_contrasena_2").style.display = "block"; 
    document.getElementById("input_contrasena_2").type = "text"; 
};
document.getElementById("mostrar_contrasena_2").onclick = function(){
    document.getElementById("mostrar_contrasena_2").style.display = "none";  
    document.getElementById("ocultar_contrasena_2").style.display = "block";   
    document.getElementById("input_contrasena_2").type = "password";      
};

function confirmado_guardar_contrasena(){
    var parametros_rp = {
        "tipo": "cpswpe",
        "id": id_personal_cambio_pasw,
        "contrasena_usuario": document.getElementById("input_contrasena_1").value
    };
    id_personal_cambio_pasw = "";
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response == "1"){
                document.getElementById("label_mensaje_alerta_superior_cambio_contrasena").innerHTML = "REGISTRO CON EXITO";
            }else{
                document.getElementById("label_mensaje_alerta_superior_cambio_contrasena").innerHTML = "FALLO REGISTRO";
            }                

            document.getElementById("contenido_esperar_pp").style.display = "none"; 
            document.getElementById("mensaje_alerta_cambio_contrasena").style.display = "inline-block"; 
            

            
        }
    });
}
document.getElementById("boton_alerta_cambio_contrasena_aceptar_pp").onclick = function(){
    document.getElementById("mensaje_alerta_cambio_contrasena").style.display = "none";  
    document.getElementById("modal_pp").style.display = "none";       
};
