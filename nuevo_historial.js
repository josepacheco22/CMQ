/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
ajustar tipo de cantidad y cuales caracteres utilizar
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
let fecha_actual = new Date();
$( function() {
    $( "#input_primera_consulta_pp" ).datepicker({
        showButtonPanel: true,
        closeText: "Cerrar",
        currentText: "Hoy",
        dateFormat: "yy-mm-dd",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        maxDate: new Date((fecha_actual.getFullYear()),(fecha_actual.getMonth()),(fecha_actual.getDate())),
        prevText: '<Ant'
    });
    $( "#input_primera_consulta_pp" ).datepicker( "option", "showAnim", "slideDown" );
    $( "#input_fecha_consulta_pp" ).datepicker({
        showButtonPanel: true,
        closeText: "Cerrar",
        currentText: "Hoy",
        dateFormat: "yy-mm-dd",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        maxDate: new Date((fecha_actual.getFullYear()),(fecha_actual.getMonth()),(fecha_actual.getDate())),
        prevText: '<Ant'
    });
    $( "#input_fecha_consulta_pp" ).datepicker( "option", "showAnim", "slideDown" );
  } );

$(document).ready(function(){
    $('#input_pulso_pp').mask('AAAAAA',{'translation': {
        A: {pattern: /[0-9.]/},
      }
    })
    $('#input_peso_pp').mask('AAAAAA',{'translation': {
        A: {pattern: /[0-9.]/},
    }
    })
    $('#input_talla_pp').mask('AAAAAA',{'translation': {
        A: {pattern: /[0-9.]/},
    }
    })
    $('#input_pulso_pp').mask('AAAAAA',{'translation': {
        A: {pattern: /[0-9.]/},
    }
    })
    $('#input_presion_arterial_1_pp').mask('AAA',{'translation': {
        A: {pattern: /[0-9]/},
    }
    })
    $('#input_presion_arterial_2_pp').mask('AAA',{'translation': {
        A: {pattern: /[0-9]/},
    }
    })
    $('#input_temperatura_pp').mask('AAAAAA',{'translation': {
        A: {pattern: /[0-9.]/},
    }
    })
    $('#input_frecuencia_respiratoria_pp').mask('AAAAAA',{'translation': {
        A: {pattern: /[0-9.]/},
    }
    })
    $('#buscar_fecha_creado_pp').mask('####-##-##')

    $('#input_fecha_consulta_pp').mask('####-##-##')
    $('#input_edad_pp').mask('AAAAAAAAA',{'translation': {
        A: {pattern: /[0-9añosmediAMD ]/},
    }
    })
    $('#input_primera_consulta_pp').mask('####-##-##')
});

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
indicar creador
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*function datos_creador(){
    var parametros_rp = {
        "tipo": "npcr",
        "id": cookies_pagina["id_personal"]
    };  
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            document.getElementById("input_creado_por_pp").value = response+" : "+cookies_pagina["usuario"];
            document.getElementById("input_asignado_pp").options.item(ids_personal_asignados.indexOf(cookies_pagina["id_personal"])).selected = 'selected';
            primera_consulta_paciente = sessionStorage.getItem('id_historial');
            if( primera_consulta_paciente == ""){
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("modal_pp").style.display = "none";
            }else{
                buscar_datos_paciente();
            }
        }
    });
}*/

var ids_personal_asignados = [];
function llenar_lista_personal(){
    var parametros_rp = {
        "tipo": "lp",
    };  
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response!="0")
            {
              console.log(response);
                var division_respuesta = response.split("ids");
                $(".lista_personal_asignar").detach();
                $("#input_asignado_pp").append(division_respuesta[0]);   
                ids_personal_asignados = JSON.parse(division_respuesta[1]);

                document.getElementById("input_asignado_pp").options.item(ids_personal_asignados.indexOf(cookies_pagina["id_personal"])).selected = 'selected';
                document.getElementById("input_creado_por_pp").value = document.getElementById("input_asignado_pp").options[document.getElementById("input_asignado_pp").value].text;


                paciente_seleccionado = sessionStorage.getItem('id_paciente');
                if( paciente_seleccionado == ""){
                    document.getElementById("contenido_esperar_pp").style.display = "none";
                    document.getElementById("modal_pp").style.display = "none";
                    document.getElementById("boton_abrir_paciente_pp").style.display = "none";
                }else{
                    buscar_datos_paciente();
                    document.getElementById("boton_abrir_paciente_pp").style.display = "inline-block";
                }
            } 
        }
    });
};
/*
document.getElementById("boton_abrir_pp").hidden=false;
*/
document.getElementById("modal_pp").style.display = "block";
document.getElementById("contenido_esperar_pp").style.display = "inline-block";
llenar_lista_personal();
 
document.getElementById("boton_interaccion_paciente_pp").onclick = function(){
    $(".resultados_de_tablas").detach();
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_pp_pa();
};

var edad_paciente = "";
var primera_consulta_paciente = "";
function buscar_datos_paciente() {
    ids_tabla = [];
    if(paciente_seleccionado!=""){
        var parametros_rp = {
            "tipo": "dpas",
            "id": paciente_seleccionado
        };
        $.ajax({ 
            data: parametros_rp,
            url: "consulta.php", 
            type: "POST",
            beforeSend: function (){
            },
            success:function (response){
                ids_tabla = JSON.parse(response);
                document.getElementById("datos_paciente_tipo_documento_pp").innerHTML = ids_tabla[0] ;
                document.getElementById("datos_paciente_fecha_creacion_pp").innerHTML = ids_tabla[1] ;
                document.getElementById("datos_paciente_numero_documento_pp").innerHTML = ids_tabla[2] ;
                document.getElementById("datos_paciente_nombres_pp").innerHTML = ids_tabla[3] ;
                document.getElementById("datos_paciente_apellidos_pp").innerHTML = ids_tabla[4] ;
                document.getElementById("datos_paciente_sexo_pp").innerHTML = ids_tabla[5] ;
                document.getElementById("datos_paciente_correo_pp").innerHTML = ids_tabla[6] ;
                document.getElementById("datos_paciente_telefono_1_pp").innerHTML = ids_tabla[7] ;
                document.getElementById("datos_paciente_telefono_2_pp").innerHTML = ids_tabla[8] ;
                document.getElementById("datos_paciente_fecha_nacimiento_pp").innerHTML = ids_tabla[9] ;
                document.getElementById("datos_paciente_provincia_pp").innerHTML = ids_tabla[10] ;
                document.getElementById("datos_paciente_canton_pp").innerHTML = ids_tabla[11] ;
                document.getElementById("datos_paciente_direccion_pp").innerHTML = ids_tabla[12] ;
                document.getElementById("datos_paciente_ocupacion_pp").innerHTML = ids_tabla[13] ;
                document.getElementById("datos_paciente_id_personal_creado_pp").innerHTML = ids_tabla[14] ;
                edad_paciente = ids_tabla[15];
                primera_consulta_paciente = ids_tabla[16];
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("modal_pp").style.display = "none";
                document.getElementById("boton_abrir_paciente_pp").style.display = "inline-block";
            }
        });
    }else{
        document.getElementById("boton_abrir_paciente_pp").style.display = "none";
    } 
};
/*
if(sessionStorage.getItem("id_paciente")!=""){
    paciente_seleccionado = sessionStorage.getItem("id_paciente");
    buscar_datos_paciente();
}
*/

document.getElementById("formulario_auto_edad_pp").onclick = function(){
    if(paciente_seleccionado != "")    {
        document.getElementById("input_edad_pp").value = edad_paciente;
    }else{
        document.getElementById("input_edad_pp").value = "";
    }
};

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
campos automaticos de fechas y edad
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

document.getElementById("boton_limpiar_pp").onclick = function(){
    paciente_seleccionado = "";
    document.getElementById("datos_paciente_tipo_documento_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_fecha_creacion_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_numero_documento_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_nombres_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_apellidos_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_sexo_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_correo_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_telefono_1_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_telefono_2_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_fecha_nacimiento_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_provincia_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_canton_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_direccion_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_ocupacion_pp").innerHTML = "" ;
    document.getElementById("datos_paciente_id_personal_creado_pp").innerHTML = "" ;
    edad_paciente = "";
    primera_consulta_paciente = "";
    document.getElementById("boton_abrir_paciente_pp").style.display = "none";
};




/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
guardar
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var id_historial = ""; 
var valor_id_personal_asignado = "";
var input_habilitado_guard= "0";
var archivar_historial = 0;
var fallo_registro = 0;
function guardar_historial() {
    var hoy = new Date(); 
    var fecha_actual_consulta_1 = document.getElementById("input_fecha_consulta_pp").value; 
    let fecha_actual_consulta_1_valido = Date.parse(fecha_actual_consulta_1);
    var fecha_actual_consulta_2 = document.getElementById("input_primera_consulta_pp").value;
    let fecha_actual_consulta_2_valido = Date.parse(fecha_actual_consulta_2);
    if(fecha_actual_consulta_1==""||isNaN(fecha_actual_consulta_1_valido)){
        fecha_actual_consulta_1 = hoy.getFullYear()+"-"+(((hoy.getMonth()+1)+"").padStart(2, "0"))+"-"+((hoy.getDate())+"").padStart(2, "0");
    }
    if(fecha_actual_consulta_2==""||isNaN(fecha_actual_consulta_2_valido)){
        fecha_actual_consulta_2 = hoy.getFullYear()+"-"+(((hoy.getMonth()+1)+"").padStart(2, "0"))+"-"+((hoy.getDate())+"").padStart(2, "0");
    }
    input_habilitado_guard= "0";
    if(document.getElementById("input_habilitado").checked){
        input_habilitado_guard= "1";
    }
    var parametros_rp = {
        "tipo": "rhis",
        "id_paciente": paciente_seleccionado,
        "id_creado_usuario": cookies_pagina["id_personal"],
        "creado_usuario":  cookies_pagina["usuario"],
        "archivado": input_habilitado_guard,
        "edad":document.getElementById("input_edad_pp").value,
        "id_personal_creado": cookies_pagina["id_personal"],
        "id_personal_asignado": ids_personal_asignados[parseInt(document.getElementById("input_asignado_pp").value)],
        "fecha_consulta": fecha_actual_consulta_1,
        "peso": document.getElementById("input_peso_pp").value,
        "talla": document.getElementById("input_talla_pp").value,
        "pulso": document.getElementById("input_pulso_pp").value,
        "presion_arterial": ((document.getElementById("input_presion_arterial_1_pp").value)+"/"+(document.getElementById("input_presion_arterial_2_pp").value)),
        "temperatura": document.getElementById("input_temperatura_pp").value,
        "frecuencia_respiratoria": document.getElementById("input_frecuencia_respiratoria_pp").value,
        "primera_consulta": fecha_actual_consulta_2,
        "motivo_consulta": document.getElementById("input_motivo_consulta_pp").value,
        "enfermedad_actual": document.getElementById("input_enfermedad_actual_pp").value,
        "revisin_sistemas": document.getElementById("input_revisin_sistemas_pp").value,
        "a_p_p": document.getElementById("input_a_p_p_pp").value,
        "a_p_f": document.getElementById("input_a_p_f_pp").value,
        "examen_fisico": document.getElementById("input_examen_fisico_pp").value,
        "impresión_diagnostica": document.getElementById("input_impresión_diagnostica_pp").value,
        "examenes": document.getElementById("input_examenes_pp").value,
        "diagnostico_definitivo": document.getElementById("input_diagnostico_definitivo_pp").value,
        "tratamiento": document.getElementById("input_tratamiento_pp").value,
    };
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response == "0"){
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
                document.getElementById("label_mensaje_alerta_pp").innerHTML = "FALLO REGISTRO";
            }else{
                if(input_habilitado_guard == "1"){
                    window.location.href = "panel_personal_arch.html";
                }else{
                    sessionStorage.setItem("id_historial", response);
                    window.location.href = "editar_historial.html";
                }
            }
        }
    });
};
document.getElementById("formulario_guardar_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_confirmar_pp").style.display = "inline-block";
};
document.getElementById("formulario_guardar_1_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_confirmar_pp").style.display = "inline-block";
};


document.getElementById("boton_confirmar_cancelar_pp").onclick = function(){
    document.getElementById("contenido_confirmar_pp").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
};

document.getElementById("boton_confirmar_aceptar_pp").onclick = function(){
    document.getElementById("contenido_confirmar_pp").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    guardar_historial();
};



document.getElementById("boton_alerta_cofirmar_pp").onclick = function(){
    if(fallo_registro==1){
        if(archivar_historial==1){
            window.location.href = "panel_personal.html";
        }else{
            window.location.href = "editar_historial.html";
        }
    }
    document.getElementById("mensaje_alerta_pp").style.display = "none";
    document.getElementById("modal_pp").style.display =  "none";
};
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
primera consulta
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var hoy = new Date(); 
var fecha_actual_general = hoy.getFullYear()+"-"+(((hoy.getMonth()+1)+"").padStart(2, "0"))+"-"+((hoy.getDate())+"").padStart(2, "0");


document.getElementById("formulario_auto_primera_consulta_pp").onclick = function(){
    document.getElementById("input_primera_consulta_pp").value = "";
    if(paciente_seleccionado != "")
    {
        document.getElementById("input_primera_consulta_pp").value = primera_consulta_paciente;
    }else{
        document.getElementById("input_primera_consulta_pp").value = fecha_actual_general;
    }
};
document.getElementById("formulario_auto_fecha_consulta_pp").onclick = function(){
    document.getElementById("input_fecha_consulta_pp").value = "";
    document.getElementById("input_fecha_consulta_pp").value = fecha_actual_general;
};
document.getElementById("boton_abrir_paciente_pp").onclick = function(){
    if(paciente_seleccionado!=""){
        sessionStorage.setItem('id_paciente', paciente_seleccionado);
        window.open("datos_paciente.html");
        document.getElementById("boton_abrir_paciente_pp").style.display = "block";
    }else{
        document.getElementById("boton_abrir_paciente_pp").style.display = "none";
    }
};
