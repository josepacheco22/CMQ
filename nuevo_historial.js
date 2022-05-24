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
function datos_creador(){
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
            if(response!="")
            {
                document.getElementById("input_creado_por_pp").value = response+": "+cookies_pagina["usuario"];
            } 
        }
    });
}

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
            if(response!="")
            {
                var division_respuesta = response.split("ids");
                $(".lista_personal_asignar").detach();
                $("#input_asignado_pp").append(division_respuesta[0]);   
                ids_personal_asignados = JSON.parse(division_respuesta[1]);
            } 
        }
    });
};
llenar_lista_personal();

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
llenar tabla pacientes
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



var ids_tabla = [];
var paciente_seleccionado = "";


function llenar_tabla_pp_pa() {
    $('td').css('background-color', '#1f2f98');
    document.getElementById("boton_aceptar_pp").hidden=true;
    ids_tabla = [];
    var parametros_rp = {
        "tipo": "btpa",
        "tipo_documento": document.getElementById("buscar_tipo_documento_pp").value,
        "numerodoc": document.getElementById("buscar_numerodoc_pp").value,
        "nombres": document.getElementById("buscar_nombres_pp").value,
        "apellidos": document.getElementById("buscar_apellidos_pp").value,
        "creado_por": document.getElementById("buscar_creado_por_pp").value,
        "fecha_creado": document.getElementById("buscar_fecha_creado_pp").value,
        "numero_filas": document.getElementById("cantidad_filas_tabla_pp").value
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
                $("#cuerpo_tabla").append(division_respuesta[0]);   
                ids_tabla = JSON.parse(division_respuesta[1]); 
            } 
        }
    });
};
llenar_tabla_pp_pa();

document.getElementById("actualizar_paciente_pp").onclick = function(){
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_tipo_documento_pp").addEventListener('change', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_tipo_documento_pp").onclick = function(){
    document.getElementById("buscar_tipo_documento_pp").options.item(0).selected = 'selected';
    llenar_tabla_pp_pa();
};

document.getElementById("buscar_numerodoc_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_numero_documento_pp").onclick = function(){
    document.getElementById("buscar_numerodoc_pp").value = "";
    llenar_tabla_pp_pa();
};

document.getElementById("buscar_nombres_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_nombres_pp").onclick = function(){
    document.getElementById("buscar_nombres_pp").value = "";
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_apellidos_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_apellidos_pp").onclick = function(){
    document.getElementById("buscar_apellidos_pp").value = "";
    llenar_tabla_pp_pa();
};

document.getElementById("buscar_creado_por_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_creado_por_pp").onclick = function(){
    document.getElementById("buscar_creado_por_pp").value = "";
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_tipo_documento_pp").addEventListener('change', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("buscar_fecha_creado_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_fecha_creado_pp").onclick = function(){
    document.getElementById("buscar_fecha_creado_pp").value = "";
    llenar_tabla_pp_pa();
};

document.getElementById("cantidad_filas_tabla_pp").addEventListener('change', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("borrar_borrar_todo_pp").onclick = function(){
    document.getElementById("buscar_tipo_documento_pp").options.item(0).selected = 'selected';
    document.getElementById("buscar_numerodoc_pp").value = "";
    document.getElementById("buscar_nombres_pp").value = "";
    document.getElementById("buscar_apellidos_pp").value = "";
    document.getElementById("buscar_creado_por_pp").value = "";
    document.getElementById("buscar_fecha_creado_pp").value = "";
    llenar_tabla_pp_pa();
};

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
nuevo paciente
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
document.getElementById("agregar_paciente_pp").onclick = function(){
    verificar_cookie();
    window.open("nuevo_paciente.html");
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
abrir buscar paciente
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
document.getElementById("boton_interaccion_paciente_pp").onclick = function(){
    llenar_tabla_pp_pa();
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_buscar_paciente_pp").style.display = "inline-block";
};
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
cerrar y borrar todo
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function borrar_tabla_pacientes(){
    $(".resultados_de_tablas").detach();
    ids_tabla = [];
    document.getElementById("buscar_tipo_documento_pp").options.item(0).selected = 'selected';
    document.getElementById("buscar_numerodoc_pp").value = "";
    document.getElementById("buscar_nombres_pp").value = "";
    document.getElementById("buscar_apellidos_pp").value = "";
    document.getElementById("buscar_creado_por_pp").value = "";
    document.getElementById("buscar_fecha_creado_pp").value = "";
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
    document.getElementById("boton_aceptar_pp").hidden=true;
};
document.getElementById("boton_cancelar_pp").onclick = function(){
    borrar_tabla_pacientes();
};
document.getElementById("cerrar_superior_pp").onclick = function(){
    borrar_tabla_pacientes();
};

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
seleccionar paciente
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function seleccionar_id_paciente(numero){
    if((ids_tabla.length)!=0){
        $('td').css('background-color', '#1f2f98');
        $('.fila_selecionada_'+numero).css('background-color', '#45c4c4');
        paciente_seleccionado = ids_tabla[numero];
        document.getElementById("boton_aceptar_pp").hidden=false;
    }else{
        document.getElementById("boton_aceptar_pp").hidden=true;
    }
};
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
baceptar al seleccionar paciente
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var edad_paciente = "";
function buscar_datos_paciente() {
    ids_tabla = [];
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
            if(response!="")
            {
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
            } 
        }
    });
};
if(sessionStorage.getItem("id_paciente")!=""){
    paciente_seleccionado = sessionStorage.getItem("id_paciente");
    buscar_datos_paciente();
}

document.getElementById("formulario_auto_edad_pp").onclick = function(){
    if(paciente_seleccionado != "")
    {
        document.getElementById("input_edad_pp").value = edad_paciente;
    }else{
        document.getElementById("input_edad_pp").value = "";
    }
};
document.getElementById("boton_aceptar_pp").onclick = function(){
    if(paciente_seleccionado != "")
    {
        buscar_datos_paciente();
        borrar_tabla_pacientes();

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
};
function dia_actual(){
    var hoy = new Date(); 
    document.getElementById("input_fecha_consulta_pp").value = hoy.getFullYear()+"-"+(((hoy.getMonth()+1)+"").padStart(2, "0"))+"-"+((hoy.getDate())+"").padStart(2, "0");
}
document.getElementById("formulario_auto_fecha_consulta_pp").onclick = function(){
    dia_actual();
};
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
guardar
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var id_historial = ""; 
var valor_id_personal_asignado = "";
var archivar_historial = 0;
var fallo_registro = 0;
function guardar_historial(archivo) {
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
    var parametros_rp = {
        "tipo": "rhis",
        "id_paciente": paciente_seleccionado,
        "archivado": archivo,
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
            if(response!="")
            {   
                document.getElementById("contenido_esperar_pp").style.display = "none";
                var resultado = response.split("/");
                document.getElementById("label_mensaje_alerta_pp").innerHTML = resultado[0];
                archivar_historial = archivo;
                sessionStorage.setItem('id_historial', resultado[1]);
                if(resultado[0]=="Registro con exito"){
                    fallo_registro = 0;
                }else{
                    fallo_registro = 1;
                }
                document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
            } 
        }
    });
};
document.getElementById("formulario_guardar_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    guardar_historial(0);
};
document.getElementById("formulario_guardar_1_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    guardar_historial(0);
};

document.getElementById("formulario_guardar_archivar_1_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_confirmar_pp").style.display = "inline-block";
};
document.getElementById("formulario_guardar_archivar_pp").onclick = function(){
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
    guardar_historial(1);
};



function limpiar_formulario(){
    document.getElementById("input_fecha_consulta_pp").value = "";
    document.getElementById("input_peso_pp").value = "";
    document.getElementById("input_talla_pp").value = "";
    document.getElementById("input_pulso_pp").value = "";
    document.getElementById("input_presion_arterial_1_pp").value = "";
    document.getElementById("input_presion_arterial_2_pp").value = "";
    document.getElementById("input_temperatura_pp").value = "";
    document.getElementById("input_frecuencia_respiratoria_pp").value = "";
    document.getElementById("input_primera_consulta_pp").value = "";
    document.getElementById("input_motivo_consulta_pp").value = "";
    document.getElementById("input_enfermedad_actual_pp").value = "";
    document.getElementById("input_revisin_sistemas_pp").value = "";
    document.getElementById("input_a_p_p_pp").value = "";
    document.getElementById("input_a_p_f_pp").value = "";
    document.getElementById("input_examen_fisico_pp").value = "";
    document.getElementById("input_impresión_diagnostica_pp").value = "";
    document.getElementById("input_examenes_pp").value = "";
    document.getElementById("input_diagnostico_definitivo_pp").value = "";
    document.getElementById("input_tratamiento_pp").value = "";
    document.getElementById("input_edad_pp").value = "";
    document.getElementById("input_tratamiento_pp").value = "";
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
    paciente_seleccionado = "";
    edad_paciente = "";
}


document.getElementById("boton_alerta_cofirmar_pp").onclick = function(){
    if(fallo_registro==0){
        llenar_lista_personal();
        if(archivar_historial==1){
            window.location.href = "panel_personal.html";
        }else{
            window.location.href = "editar_historial.html";
        }
    }
    document.getElementById("mensaje_alerta_pp").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
};
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
primera consulta
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function dia_actual_primera(){
    var hoy = new Date(); 
    document.getElementById("input_primera_consulta_pp").value = hoy.getFullYear()+"-"+(((hoy.getMonth()+1)+"").padStart(2, "0"))+"-"+((hoy.getDate())+"").padStart(2, "0");
}
function extraer_fecha_primera_consulta(){
    var parametros_rp = {
        "tipo": "fpc",
        "id": paciente_seleccionado,
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
                if(response=="0000-00-00"){
                    dia_actual_primera();
                }else{
                    document.getElementById("input_primera_consulta_pp").value = response;

                }
            } 
        }
    });
}
document.getElementById("formulario_auto_primera_consulta_pp").onclick = function(){
    if (paciente_seleccionado==""){
        dia_actual_primera();
    }else{
        extraer_fecha_primera_consulta();
    }
};
