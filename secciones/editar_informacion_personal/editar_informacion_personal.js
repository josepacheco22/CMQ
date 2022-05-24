
function llenar_informacion_editar_personal(){
    document.getElementById("input_nombre_1_dp").value = datos_personal["nombre_1"];
    document.getElementById("input_nombre_2_dp").value = datos_personal["nombre_2"];
    document.getElementById("input_apellido_1_dp").value = datos_personal["apellido_1"];
    document.getElementById("input_apellido_2_dp").value = datos_personal["apellido_2"];
    document.getElementById("input_sexo_dp").value = datos_personal["sexo"];
    document.getElementById("input_correo_dp").value = datos_personal["correo"];
    document.getElementById("input_telefono_1_dp").value = datos_personal["telefono_1"];
    document.getElementById("input_telefono_2_dp").value = datos_personal["telefono_2"];
    document.getElementById("input_fecha_nacimiento_dp").value = datos_personal["fecha_nacimiento"];
}

document.getElementById("editar_informacion_rpa").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_editar_infromacion_personal").style.display = "inline-block";
    llenar_informacion_editar_personal();
    document.getElementById("input_fecha_nacimiento_dp").style.border = "3px solid #787ff6";
};

document.getElementById("boton_confirmar_cancelar_editar_info_personal_pp").onclick = function(){
    llenar_informacion_editar_personal();
    document.getElementById("contenido_editar_infromacion_personal").style.display = "none";
    document.getElementById("modal_pp").style.display =  "none"; 
};
document.getElementById("restablecer_todo_rpa").onclick = function(){
    llenar_informacion_editar_personal();
    document.getElementById("input_fecha_nacimiento_dp").style.border= "3px solid #787ff6";
};
document.getElementById("restablecer_nombre_1_rpa").onclick = function(){
document.getElementById("input_nombre_1_dp").value = datos_personal["nombre_1"];
};

document.getElementById("restablecer_nombre_2_rpa").onclick = function(){
document.getElementById("input_nombre_2_dp").value = datos_personal["nombre_2"];
};

document.getElementById("restablecer_apellido_1_rpa").onclick = function(){
document.getElementById("input_apellido_1_dp").value = datos_personal["apellido_1"];
};

document.getElementById("restablecer_apellido_2_rpa").onclick = function(){
document.getElementById("input_apellido_2_dp").value = datos_personal["apellido_2"];
};

document.getElementById("restablecer_sexo_rpa").onclick = function(){
document.getElementById("input_sexo_dp").value = datos_personal["sexo"];
};

document.getElementById("restablecer_correo_rpa").onclick = function(){
document.getElementById("input_correo_dp").value = datos_personal["correo"];
};

document.getElementById("restablecer_telefono_1_rpa").onclick = function(){
    document.getElementById("input_telefono_1_dp").value = datos_personal["telefono_1"];
//document.getElementById("input_telefono_1_dp").value = datos_personal["telefono_1"];
};

document.getElementById("restablecer_telefono_2_rpa").onclick = function(){
    document.getElementById("input_telefono_2_dp").value = datos_personal["telefono_2"];
};

document.getElementById("restablecer_fecha_nacimiento_rpa").onclick = function(){
    document.getElementById("input_fecha_nacimiento_dp").value = datos_personal["fecha_nacimiento"];
    document.getElementById("input_fecha_nacimiento_dp").style.border= "3px solid #787ff6";
};
document.getElementById("boton_confirmar_cofirmar_editar_info_personal_pp").onclick = function(){
    let validar_fecha = Date.parse(document.getElementById("input_fecha_nacimiento_dp").value);
    if (document.getElementById("input_fecha_nacimiento_dp").value != "" && (isNaN(validar_fecha) || (document.getElementById("input_fecha_nacimiento_dp").value).length < 10)) 
    {
        document.getElementById("input_fecha_nacimiento_dp").style.border= "3px solid #e24444";
    }else{
        console.log("ddwsda");
        document.getElementById("input_fecha_nacimiento_dp").style.border= "3px solid #787ff6";
        document.getElementById("contenido_editar_infromacion_personal").style.display = "none";
        document.getElementById("contenido_confirmar_pp").style.display = "inline-block";
        //guardar_datos_personal_con_esperar();
    }
}
document.getElementById("boton_confirmar_cancelar_cambios_pp").onclick = function(){
    document.getElementById("contenido_confirmar_pp").style.display = "none";
    document.getElementById("contenido_editar_infromacion_personal").style.display = "inline-block";
};

document.getElementById("boton_confirmar_aceptar_cambios_pp").onclick = function(){
    document.getElementById("contenido_confirmar_pp").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    guardar_datos_personal_con_esperar();
};

var bandera_guardado = 0;
function guardar_datos_personal_con_esperar() {
    var parametros_rp = {
        "tipo": "gdpepp",
        "id": cookies_pagina["id_personal"],
        "nombre_1": document.getElementById("input_nombre_1_dp").value,
        "nombre_2": document.getElementById("input_nombre_2_dp").value,
        "apellido_1": document.getElementById("input_apellido_1_dp").value.replaceAll(" ",""),
        "apellido_2": document.getElementById("input_apellido_2_dp").value.replaceAll(" ",""),
        "sexo": document.getElementById("input_sexo_dp").value,
        "correo": document.getElementById("input_correo_dp").value,
        "telefono_1": document.getElementById("input_telefono_1_dp").value,
        "telefono_2": document.getElementById("input_telefono_2_dp").value,
        "fecha_nacimiento": document.getElementById("input_fecha_nacimiento_dp").value,
        "miniatura" : "",
        "foto" : ""
    };
    
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response=="Exito")
            {
                document.getElementById("label_mensaje_alerta_pp").innerHTML = "DATOS GUARDADOS CON EXITO";
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
                bandera_guardado = 1;
            }else{
                document.getElementById("label_mensaje_alerta_pp").innerHTML = "ERROR AL GUARDAR";
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
                bandera_guardado = 0;
            }


        }
    });
};
document.getElementById("boton_alerta_cofirmar_pp").onclick = function(){
    if(bandera_guardado == 1)
    {
        location.reload();
    }else{
        document.getElementById("mensaje_alerta_pp").style.display = "none";
        document.getElementById("contenido_editar_infromacion_personal").style.display = "inline-block";
    }
};




$(document).ready(function(){
    $('#input_fecha_nacimiento_dp').mask('####-##-##')
    $('#input_telefono_2_dp').mask('### ### ####')
    $('#input_telefono_1_dp').mask('### ### ####')
});

let fecha_actual = new Date();
$( function() {
    $( "#input_fecha_nacimiento_dp" ).datepicker({
        showButtonPanel: true,
        closeText: "Cerrar",
        currentText: "Hoy",
        dateFormat: "yy-mm-dd",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        maxDate: new Date((fecha_actual.getFullYear()),(fecha_actual.getMonth()),(fecha_actual.getDate())),
        prevText: '<Ant'
    });
    $( "#input_fecha_nacimiento_dp" ).datepicker( "option", "showAnim", "slideDown" );
  } );
