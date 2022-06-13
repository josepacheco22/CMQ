
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
llenar tabla pacientes
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var ids_tabla = [];
var ids_tabla_paciente = [];
function llenar_tabla_asignados() {
  
  $('th').css({"animation-name": "indicar_buscar"});
  $('th').css({"animationDuration": "600ms"});
  $('th').css({"animationIterationCount": "infinite"});
  /*$(".resultados_de_tablas").detach();*/
    var parametros_rp = {
        "tipo": "thasarch",
        "id_asignado": cookies_pagina["id_personal"],
        "id": document.getElementById("buscar_numero_historial_pp").value,
        "fecha_consulta": document.getElementById("buscar_fecha_consulta_pp").value,
        "primera_consulta": document.getElementById("buscar_primera_consulta_pp").value,
        "cedula": document.getElementById("buscar_numero_documento_pp").value,
        "nombre": document.getElementById("buscar_nombre_paciente_pp").value,
        "usuario": document.getElementById("buscar_creado_por_pp").value,
        "cantidad_filas": document.getElementById("cantidad_filas_tabla_pp").value
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
                var division_respuesta = response.split("ids");
                $(".resultados_de_tablas").detach();
                $("#cuerpo_tabla_pp").append(division_respuesta[0]);   
                ids_tabla = JSON.parse(division_respuesta[1]); 
                ids_tabla_paciente = JSON.parse(division_respuesta[2]);
                $('th').css({"animation-name": "none"});
            } 
        }
    });
};

function accion_paciente(numero){
  if(ids_tabla_paciente[numero] != null){
    sessionStorage.setItem('id_paciente', ids_tabla_paciente[numero]);
    window.open("datos_paciente.html");
  }  
}

function llenar_tabla_con_esperar() {
  $('th').css({"animation-name": "indicar_buscar"});
  $('th').css({"animationDuration": "600ms"});
  $('th').css({"animationIterationCount": "infinite"});
  
  /*$(".resultados_de_tablas").detach();*/
    var parametros_rp = {
        "tipo": "thasarch",
        "id_asignado": cookies_pagina["id_personal"],
        "id": document.getElementById("buscar_numero_historial_pp").value,
        "fecha_consulta": document.getElementById("buscar_fecha_consulta_pp").value,
        "primera_consulta": document.getElementById("buscar_primera_consulta_pp").value,
        "cedula": document.getElementById("buscar_numero_documento_pp").value,
        "nombre": document.getElementById("buscar_nombre_paciente_pp").value,
        "usuario": document.getElementById("buscar_creado_por_pp").value,
        "cantidad_filas": document.getElementById("cantidad_filas_tabla_pp").value
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
                ids_tabla_paciente = JSON.parse(division_respuesta[2]);
                document.getElementById("contenido_esperar_pp").style.display = "none"; 
                document.getElementById("modal_pp").style.display =  "none";
                $('th').css({"animation-name": "none"});
            } 
        }
    });
};

document.getElementById("modal_pp").style.display = "block";
document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
llenar_tabla_con_esperar();

document.getElementById("cantidad_filas_tabla_pp").addEventListener('change', (event) => {
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar();
});
document.getElementById("buscar_numero_historial_pp").addEventListener('keyup', (event) => {
    llenar_tabla_asignados();
});
document.getElementById("buscar_fecha_consulta_pp").addEventListener('keyup', (event) => {
    llenar_tabla_asignados();
});
document.getElementById("buscar_primera_consulta_pp").addEventListener('keyup', (event) => {
    llenar_tabla_asignados();
});
document.getElementById("buscar_numero_documento_pp").addEventListener('keyup', (event) => {
    llenar_tabla_asignados();
});
document.getElementById("buscar_nombre_paciente_pp").addEventListener('keyup', (event) => {
    llenar_tabla_asignados();
});
document.getElementById("buscar_creado_por_pp").addEventListener('keyup', (event) => {
    llenar_tabla_asignados();
});

document.getElementById("actualizar_pp").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar();
};

document.getElementById("borrar_borrar_todo_pp").onclick = function(){
    document.getElementById("buscar_creado_por_pp").value = "";
    document.getElementById("buscar_nombre_paciente_pp").value = "";
    document.getElementById("buscar_numero_documento_pp").value = "";
    document.getElementById("buscar_primera_consulta_pp").value = "";
    document.getElementById("buscar_fecha_consulta_pp").value = "";
    document.getElementById("buscar_numero_historial_pp").value = "";
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar();
};

document.getElementById("boton_borrar_creado_por_pp").onclick = function(){
document.getElementById("buscar_creado_por_pp").value = "";
document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar();
};
document.getElementById("boton_borrar_nombre_paciente_pp").onclick = function(){
document.getElementById("buscar_nombre_paciente_pp").value = "";
document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar();
};
document.getElementById("boton_borrar_numero_documento_pp").onclick = function(){
document.getElementById("buscar_numero_documento_pp").value = "";
document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar();
};
document.getElementById("boton_borrar_primera_consulta_pp").onclick = function(){
document.getElementById("buscar_primera_consulta_pp").value = "";
document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar();
};
document.getElementById("boton_borrar_fecha_consulta_pp").onclick = function(){
document.getElementById("buscar_fecha_consulta_pp").value = "";
document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar();
};
document.getElementById("boton_borrar_numero_historial_pp").onclick = function(){
document.getElementById("buscar_numero_historial_pp").value = "";
document.getElementById("modal_pp").style.display = "block";
document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
llenar_tabla_con_esperar();
};
$(document).ready(function(){
    $('#buscar_fecha_consulta_pp').mask('####-##-##')
    $('#buscar_primera_consulta_pp').mask('####-##-##')
    $('#buscar_numero_historial_pp').mask('######')
    $('#buscar_numero_documento_pp').mask('#############')
    $('#buscar_fecha_creado_pp').mask('####-##-##')
});
let fecha_actual = new Date();
$( function() {
    $( "#buscar_fecha_consulta_pp" ).datepicker({
        showButtonPanel: true,
        closeText: "Cerrar",
        currentText: "Hoy",
        dateFormat: "yy-mm-dd",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        maxDate: new Date((fecha_actual.getFullYear()),(fecha_actual.getMonth()),(fecha_actual.getDate())),
        prevText: '<Ant'
    });
    $( "#buscar_fecha_consulta_pp" ).datepicker( "option", "showAnim", "slideDown" );
    $( "#buscar_primera_consulta_pp" ).datepicker({
        showButtonPanel: true,
        closeText: "Cerrar",
        currentText: "Hoy",
        dateFormat: "yy-mm-dd",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        maxDate: new Date((fecha_actual.getFullYear()),(fecha_actual.getMonth()),(fecha_actual.getDate())),
        prevText: '<Ant'
    });
    $( "#buscar_primera_consulta_pp" ).datepicker( "option", "showAnim", "slideDown" );
  } );
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
acciones opciones de tabala
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function accion_editar(id_editar){
    sessionStorage.setItem('id_historial', ids_tabla[id_editar]);
    window.open("editar_historial.html");
}

document.getElementById("boton_alerta_cofirmar_pp").onclick = function(){
    document.getElementById("mensaje_alerta_pp").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_con_esperar();
};


function mostrar_tabla_1(){
    document.getElementById("navegador_datos_paciente_2").style.background = "var(--color-principal)";
    document.getElementById("navegador_datos_paciente_1").style.background = "var(--color-1-formulario)";
    document.getElementById("navegador_datos_paciente_1").onmouseenter =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_1").onmouseleave =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_2").onmouseenter =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_2").onmouseleave =function(){this.style.background="var(--color-principal)"};



    document.getElementById("seccion_2_1").style.display = "none";
    document.getElementById("seccion_2_2").style.display = "none";
    document.getElementById("seccion_2_3").style.display = "none";

    document.getElementById("seccion_1_1").style.display = "flex";
    document.getElementById("seccion_1_2").style.display = "flex";
    document.getElementById("seccion_1_3").style.display = "flex";
    $(".resultados_de_tablas").detach();
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_con_esperar(); 
}

function mostrar_tabla_2(){
    document.getElementById("navegador_datos_paciente_1").style.background = "var(--color-principal)";
    document.getElementById("navegador_datos_paciente_2").style.background = "var(--color-1-formulario)";
    document.getElementById("navegador_datos_paciente_2").onmouseenter =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_2").onmouseleave =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_1").onmouseenter =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_1").onmouseleave =function(){this.style.background="var(--color-principal)"};


    document.getElementById("seccion_1_1").style.display = "none";
    document.getElementById("seccion_1_2").style.display = "none";
    document.getElementById("seccion_1_3").style.display = "none";


    document.getElementById("seccion_2_1").style.display = "flex";
    document.getElementById("seccion_2_2").style.display = "flex";
    document.getElementById("seccion_2_3").style.display = "flex";
    $(".resultados_de_tablas").detach();
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
    
}






document.getElementById("cantidad_filas_desc").addEventListener('change', (event) => {
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
});
document.getElementById("borrar_borrar_todo_desc").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
document.getElementById("id_desc").value = "";
document.getElementById("fecha_creacion_desc").value = "";
document.getElementById("id_h_desc").value = "";
document.getElementById("fecha_consulta_h_desc").value = "";
document.getElementById("creado_usuario_desc").value = "";
document.getElementById("numero_documento_paci_desc").value = "";
document.getElementById("nombres_desc").value = "";
    llenar_tabla_desc_con_esperar();
};
document.getElementById("actualizar_desc").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
};



document.getElementById("boton_borrar_id_desc").onclick = function(){
document.getElementById("id_desc").value = "";
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
};
document.getElementById("boton_borrar_fecha_creacion_desc").onclick = function(){
document.getElementById("fecha_creacion_desc").value = "";
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
};
document.getElementById("boton_borrar_id_h_desc").onclick = function(){
document.getElementById("id_h_desc").value = "";
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
};
document.getElementById("boton_borrar_fecha_consulta_h_desc").onclick = function(){
document.getElementById("fecha_consulta_h_desc").value = "";
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
};
document.getElementById("boton_borrar_creado_usuario_desc").onclick = function(){
document.getElementById("creado_usuario_desc").value = "";
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
};
document.getElementById("boton_borrar_numero_documento_paci_desc").onclick = function(){
document.getElementById("numero_documento_paci_desc").value = "";
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
llenar_tabla_desc_con_esperar();

};
document.getElementById("boton_borrar_nombres_desc").onclick = function(){
document.getElementById("nombres_desc").value = "";
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_desc_con_esperar();
};


document.getElementById("id_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("fecha_creacion_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("id_h_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("fecha_consulta_h_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("creado_usuario_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("numero_documento_paci_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("nombres_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});


document.getElementById("id_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("fecha_creacion_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("id_h_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("fecha_consulta_h_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("creado_usuario_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("numero_documento_paci_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});
document.getElementById("nombres_desc").addEventListener('keyup', (event) => {
    llenar_tabla_desc_con_esperar();
});

function llenar_tabla_desc_con_esperar() {
  
  $('th').css({"animation-name": "indicar_buscar"});
  $('th').css({"animationDuration": "600ms"});
  $('th').css({"animationIterationCount": "infinite"});
  /*$(".resultados_de_tablas").detach();*/
    var parametros_rp = {
        "tipo": "tarchdesca",
        "id": document.getElementById("id_desc").value,
        "fecha_creacion": document.getElementById("fecha_creacion_desc").value,
        "id_h": document.getElementById("id_h_desc").value,
        "fecha_consulta_h": document.getElementById("fecha_consulta_h_desc").value,
        "creado_usuario": document.getElementById("creado_usuario_desc").value,
        "cantidad_filas": document.getElementById("cantidad_filas_desc").value,
        "numero_documento_paci": document.getElementById("numero_documento_paci_desc").value,
        "nombres": document.getElementById("nombres_desc").value
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
                $("#cuerpo_tabla_desc_pp").append(division_respuesta[0]);   
                ids_tabla = JSON.parse(division_respuesta[1]); 
                document.getElementById("contenido_esperar_pp").style.display = "none"; 
                document.getElementById("modal_pp").style.display =  "none";
                $('th').css({"animation-name": "none"});
            } 
        }
    });
};