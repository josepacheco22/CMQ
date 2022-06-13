var id_historial_clinica = sessionStorage.getItem('id_historial');
function verificar_id_historial(){
    if(id_historial_clinica==""){
        window.location.href = "panel_personal.html";
        sessionStorage.setItem('id_historial', "");
    }
};
verificar_id_historial();




document.getElementById("formulario_restablecer_asignado_pp").onclick = function(){
    document.getElementById("input_asignado_pp").options.item(ids_personal_asignados.indexOf(datos_historial["id_personal_asignado"])).selected = 'selected';
};
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
llenar formulario
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var datos_historial = [];
var paciente_seleccionado = "";
var paciente_seleccionado_original = "";
/*var personal_creado = "";
var personal_asignado = "";
var edad_paciente = "";*/
function llenar_formulario_completo() {
    var parametros_rp = {
        "tipo": "efhic",
        "id": id_historial_clinica
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
                if(response =="fallo"){
                    window.close();
                }else{
                    
                 datos_historial = JSON.parse(response); 
                    paciente_seleccionado = datos_historial["id_paciente"];
                    paciente_seleccionado_original = datos_historial["id_paciente"];
                    personal_creado = datos_historial["id_personal_creado"];
                    personal_asignado = datos_historial["id_personal_asignado"];
                    edad_paciente = datos_historial["pa_edad_calculada"];
                    var id_agregado_formato = id_historial_clinica.padStart(6,"0")
                    id_agregado_formato = (id_agregado_formato).slice(0, 3) + "" + (id_agregado_formato).slice(3);
                    document.getElementById("id_historial").innerHTML = id_agregado_formato;
                    document.getElementById("input_creado_por_pp").value = datos_historial["personal_creado"];
                    

                    var division_presion_arterial = (datos_historial["presion_arterial"]).split("/");
                    document.getElementById("input_presion_arterial_1_pp").value = division_presion_arterial[0];
                    document.getElementById("input_presion_arterial_2_pp").value = division_presion_arterial[1];

                    document.getElementById("boton_abrir_paciente_pp").style.display = "none";
                    if(paciente_seleccionado != ""){
                      document.getElementById("boton_abrir_paciente_pp").style.display = "block";
                    }       


                    document.getElementById("input_asignado_pp").value = datos_historial["personal_asignado"];
                    document.getElementById("input_fecha_consulta_pp").value = datos_historial["fecha_consulta"];
                    document.getElementById("input_peso_pp").value = datos_historial["peso"];
                    document.getElementById("input_talla_pp").value = datos_historial["talla"];
                    document.getElementById("input_pulso_pp").value = datos_historial["pulso"];
                    if(datos_historial["archivado"]=="1"){
                     document.getElementById("input_habilitado").checked = true;
                    }else
                    {
                     document.getElementById("input_habilitado").checked = false;
                    }
                    document.getElementById("input_temperatura_pp").value = datos_historial["temperatura"];
                    document.getElementById("input_frecuencia_respiratoria_pp").value = datos_historial["frecuencia_respiratoria"];
                    document.getElementById("input_primera_consulta_pp").value = datos_historial["primera_consulta"];
                    document.getElementById("input_motivo_consulta_pp").value = datos_historial["motivo_consulta"];
                    document.getElementById("input_enfermedad_actual_pp").value = datos_historial["enfermedad_actual"];
                    document.getElementById("input_revisin_sistemas_pp").value = datos_historial["revisin_sistemas"];
                    document.getElementById("input_a_p_p_pp").value = datos_historial["a_p_p"];
                    document.getElementById("input_a_p_f_pp").value = datos_historial["a_p_f"];
                    document.getElementById("input_examen_fisico_pp").value = datos_historial["examen_fisico"];
                    document.getElementById("input_impresión_diagnostica_pp").value = datos_historial["impresión_diagnostica"];
                    document.getElementById("input_examenes_pp").value = datos_historial["examenes"];
                    document.getElementById("input_diagnostico_definitivo_pp").value = datos_historial["diagnostico_definitivo"];
                    document.getElementById("input_tratamiento_pp").value = datos_historial["tratamiento"];
                    document.getElementById("input_edad_pp").value = datos_historial["edad"];
                    

                    document.getElementById("datos_paciente_tipo_documento_pp").innerHTML = datos_historial["pa_tipo_documento"];
                    document.getElementById("datos_paciente_id_personal_creado_pp").innerHTML  = datos_historial["pa_personal_creado"];
                    document.getElementById("datos_paciente_fecha_creacion_pp").innerHTML = datos_historial["pa_fecha_creacion"];
                    document.getElementById("datos_paciente_numero_documento_pp").innerHTML = datos_historial["pa_numero_documento"];
                    document.getElementById("datos_paciente_nombres_pp").innerHTML = datos_historial["pa_nombres"];
                    document.getElementById("datos_paciente_apellidos_pp").innerHTML = datos_historial["pa_apellidos"];
                    document.getElementById("datos_paciente_sexo_pp").innerHTML = datos_historial["pa_sexo"];
                    document.getElementById("datos_paciente_correo_pp").innerHTML = datos_historial["pa_correo"];
                    document.getElementById("datos_paciente_telefono_1_pp").innerHTML = datos_historial["pa_telefono_1"];
                    document.getElementById("datos_paciente_telefono_2_pp").innerHTML = datos_historial["pa_telefono_2"];
                    document.getElementById("datos_paciente_fecha_nacimiento_pp").innerHTML = datos_historial["pa_fecha_nacimiento"];
                    document.getElementById("datos_paciente_provincia_pp").innerHTML = datos_historial["pa_provincia"];
                    document.getElementById("datos_paciente_canton_pp").innerHTML = datos_historial["pa_canton"];
                    document.getElementById("datos_paciente_direccion_pp").innerHTML = datos_historial["pa_direccion"];
                    document.getElementById("datos_paciente_ocupacion_pp").innerHTML = datos_historial["pa_ocupacion"];
                    
                    llenar_lista_personal()
                    
                }
            } 
        }
    });
};
document.getElementById("modal_pp").style.display = "block";
document.getElementById("contenido_esperar_pp").style.display = "inline-block";
llenar_formulario_completo();                 





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

                document.getElementById("input_asignado_pp").options.item(ids_personal_asignados.indexOf(datos_historial["id_personal_asignado"])).selected = 'selected';
                /*document.getElementById("input_creado_por_pp").value = document.getElementById("input_asignado_pp").options[document.getElementById("input_asignado_pp").value].text;

                
                paciente_seleccionado = sessionStorage.getItem('id_paciente');
                if( paciente_seleccionado == ""){
                    document.getElementById("contenido_esperar_pp").style.display = "none";
                    document.getElementById("modal_pp").style.display = "none";
                    document.getElementById("boton_abrir_paciente_pp").style.display = "none";
                }else{
                    document.getElementById("boton_abrir_paciente_pp").style.display = "inline-block";
                }*/
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("modal_pp").style.display = "none";
            } 
        }
    });
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
seleccionar paciente
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*function seleccionar_id_paciente(numero){
    if((ids_tabla.length)!=0){
        $('td').css('background-color', '#1f2f98');
        $('.fila_selecionada_'+numero).css('background-color', '#45c4c4');
        paciente_seleccionado = ids_tabla[numero];
        document.getElementById("boton_aceptar_pp").hidden=false;
    }else{
        document.getElementById("boton_aceptar_pp").hidden=true;
    }
};*/
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
baceptar al seleccionar paciente
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
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





document.getElementById("formulario_auto_edad_pp").onclick = function(){
    if(paciente_seleccionado != "")
    {
        document.getElementById("input_edad_pp").value = edad_paciente;
    }else{
        document.getElementById("input_edad_pp").value = "";
    }
};
document.getElementById("formulario_restablecer_fecha_consulta_pp").onclick = function(){
    if(datos_historial["fecha_consulta"]!="0000-00-00"){
        document.getElementById("input_fecha_consulta_pp").value = datos_historial["fecha_consulta"];
    }
};
document.getElementById("formulario_restablecer_edad_pp").onclick = function(){

    document.getElementById("input_edad_pp").value = datos_historial["edad"];
};
document.getElementById("formulario_restablecer_primera_consulta_pp").onclick = function(){
    if(datos_historial["primera_consulta"]!="0000-00-00"){
        document.getElementById("input_primera_consulta_pp").value = datos_historial["primera_consulta"];
    }
};

document.getElementById("boton_restablecer_pp").onclick = function(){
    paciente_seleccionado = paciente_seleccionado_original;
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    buscar_datos_paciente();
}
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
var archivar_historial = 0;
var fallo_registro = 0;
var input_habilitado_guard= "0";
function guardar_historial_editado() {
    var hoy = new Date(); 
    var fecha_actual_consulta_1 = document.getElementById("input_fecha_consulta_pp").value; 
    let fecha_actual_consulta_1_valido = Date.parse(fecha_actual_consulta_1);
    var fecha_actual_consulta_2 = document.getElementById("input_primera_consulta_pp").value;
    let fecha_actual_consulta_2_valido = Date.parse(fecha_actual_consulta_2);
    if(fecha_actual_consulta_1==""||isNaN(fecha_actual_consulta_1_valido)){
        fecha_actual_consulta_1 =  datos_historial["fecha_consulta"];;
    }
    if(fecha_actual_consulta_2==""||isNaN(fecha_actual_consulta_2_valido)){
        fecha_actual_consulta_2 = datos_historial["primera_consulta"];
    }
    input_habilitado_guard= "0";
    if(document.getElementById("input_habilitado").checked){
        input_habilitado_guard= "1";
    }
    var parametros_rp = {
        "tipo": "edthis",
        "id": id_historial_clinica,
        "id_paciente": paciente_seleccionado,
        "id_creado_usuario": cookies_pagina["id_personal"],
        "creado_usuario":  cookies_pagina["usuario"],
        "archivado": input_habilitado_guard,
        "edad":document.getElementById("input_edad_pp").value,
        "id_personal_creado": personal_creado,
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
            /*if(response!="")
            {   
                document.getElementById("contenido_esperar_pp").style.display = "none";
                var resultado = response.split("/");
                document.getElementById("label_mensaje_alerta_pp").innerHTML = resultado[0];
                archivar_historial = archivo_si_no;
                sessionStorage.setItem('id_historial', resultado[1]);
                if(resultado[0]=="Registro con exito"){
                    fallo_registro = 0;

                }else{
                    fallo_registro = 1;
                }
                document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
            } */

          if(response == "0"){
            document.getElementById("contenido_esperar_pp").style.display = "none";
            document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
            document.getElementById("label_mensaje_alerta_pp").innerHTML = "FALLO REGISTRO";
          }else{
            if(input_habilitado_guard == "1"){
              window.location.href = "panel_personal_arch.html";
            }else{
              sessionStorage.setItem("id_historial", id_historial_clinica);
              window.location.href = "editar_historial.html";
            }
          }
        }
    });
};
document.getElementById("formulario_guardar_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    guardar_historial_editado(0);
};
document.getElementById("formulario_guardar_1_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    guardar_historial_editado(0);
};/*
document.getElementById("formulario_guardar_archivar_1_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_confirmar_pp").style.display = "inline-block";
};
document.getElementById("formulario_guardar_archivar_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_confirmar_pp").style.display = "inline-block";
};*/
document.getElementById("boton_confirmar_cancelar_pp").onclick = function(){
    document.getElementById("contenido_confirmar_pp").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
};
document.getElementById("boton_confirmar_aceptar_pp").onclick = function(){
    document.getElementById("contenido_confirmar_pp").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    guardar_historial_editado(1);
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

document.getElementById("boton_interaccion_paciente_pp").onclick = function(){
  $(".resultados_de_tablas").detach();
  document.getElementById("modal_pp").style.display = "block";
  document.getElementById("contenido_esperar_pp").style.display = "inline-block";
  llenar_tabla_pp_pa();
};
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
primera consulta
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function dia_actual_primera(){
    var hoy = new Date(); 
    document.getElementById("input_primera_consulta_pp").value = hoy.getFullYear()+"-"+(((hoy.getMonth()+1)+"").padStart(2, "0"))+"-"+((hoy.getDate())+"").padStart(2, "0");
};

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

document.getElementById("formulario_restablecer_peso_pp").onclick = function(){
    document.getElementById("input_peso_pp").value = datos_historial["peso"];
};
document.getElementById("formulario_restablecer_talla_pp").onclick = function(){
    document.getElementById("input_talla_pp").value = datos_historial["talla"];
};
document.getElementById("formulario_restablecer_pulso_pp").onclick = function(){
    document.getElementById("input_pulso_pp").value = datos_historial["pulso"];
};
document.getElementById("formulario_restablecer_presion_arterial_pp").onclick = function(){
    var division_presion_arterial = (datos_historial["presion_arterial"]).split("/");
    document.getElementById("input_presion_arterial_1_pp").value = division_presion_arterial[0];
    document.getElementById("input_presion_arterial_2_pp").value = division_presion_arterial[1];
};
document.getElementById("formulario_restablecer_temperatura_pp").onclick = function(){
    document.getElementById("input_temperatura_pp").value = datos_historial["temperatura"];
};
document.getElementById("formulario_restablecer_frecuancia_respiratoria_pp").onclick = function(){
    document.getElementById("input_frecuencia_respiratoria_pp").value = datos_historial["frecuencia_respiratoria"];
};
document.getElementById("formulario_restablecer_motivo_consulta_pp").onclick = function(){
    document.getElementById("input_motivo_consulta_pp").value = datos_historial["motivo_consulta"];
};
document.getElementById("formulario_restablecer_enfermedad_actual_pp").onclick = function(){
    document.getElementById("input_enfermedad_actual_pp").value = datos_historial["enfermedad_actual"];
};
document.getElementById("formulario_restablecer_revision_sistemas_pp").onclick = function(){
    document.getElementById("input_revisin_sistemas_pp").value = datos_historial["revisin_sistemas"];
};
document.getElementById("formulario_restablecer_a_p_p_pp").onclick = function(){
    document.getElementById("input_a_p_p_pp").value = datos_historial["a_p_p"];
};
document.getElementById("formulario_restablecer_a_p_f_pp").onclick = function(){
    document.getElementById("input_a_p_f_pp").value = datos_historial["a_p_f"];
};
document.getElementById("formulario_restablecer_examen_fisico_pp").onclick = function(){
    document.getElementById("input_examen_fisico_pp").value = datos_historial["examen_fisico"];
};
document.getElementById("formulario_restablecer_impresion_diagnostica_pp").onclick = function(){
    document.getElementById("input_impresión_diagnostica_pp").value = datos_historial["impresión_diagnostica"];
};
document.getElementById("formulario_restablecer_examenes_pp").onclick = function(){
    document.getElementById("input_examenes_pp").value = datos_historial["examenes"];
};
document.getElementById("formulario_restablecer_diagnostico_definitivo_pp").onclick = function(){
    document.getElementById("input_diagnostico_definitivo_pp").value = datos_historial["diagnostico_definitivo"];
};
document.getElementById("formulario_restablecer_tratamiento_pp").onclick = function(){
    document.getElementById("input_tratamiento_pp").value = datos_historial["tratamiento"];
};



