
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
llenar tabla pacientes
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var ids_tabla = [];
function llenar_tabla_asignados() {
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
            } 
        }
    });
};
function llenar_tabla_con_esperar() {
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
                document.getElementById("contenido_esperar_pp").style.display = "none"; 
                document.getElementById("modal_pp").style.display =  "none";
            } 
        }
    });
};

document.getElementById("modal_pp").style.display = "block";
document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
llenar_tabla_con_esperar();

document.getElementById("cantidad_filas_tabla_pp").addEventListener('change', (event) => {
    llenar_tabla_asignados();
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
    llenar_tabla_asignados();
};

document.getElementById("borrar_borrar_todo_pp").onclick = function(){
    document.getElementById("buscar_creado_por_pp").value = "";
    document.getElementById("buscar_nombre_paciente_pp").value = "";
    document.getElementById("buscar_numero_documento_pp").value = "";
    document.getElementById("buscar_primera_consulta_pp").value = "";
    document.getElementById("buscar_fecha_consulta_pp").value = "";
    document.getElementById("buscar_numero_historial_pp").value = "";
    llenar_tabla_asignados();
};

document.getElementById("boton_borrar_creado_por_pp").onclick = function(){
document.getElementById("buscar_creado_por_pp").value = "";
llenar_tabla_asignados();
};
document.getElementById("boton_borrar_nombre_paciente_pp").onclick = function(){
document.getElementById("buscar_nombre_paciente_pp").value = "";
llenar_tabla_asignados();
};
document.getElementById("boton_borrar_numero_documento_pp").onclick = function(){
document.getElementById("buscar_numero_documento_pp").value = "";
llenar_tabla_asignados();
};
document.getElementById("boton_borrar_primera_consulta_pp").onclick = function(){
document.getElementById("buscar_primera_consulta_pp").value = "";
llenar_tabla_asignados();
};
document.getElementById("boton_borrar_fecha_consulta_pp").onclick = function(){
document.getElementById("buscar_fecha_consulta_pp").value = "";
llenar_tabla_asignados();
};
document.getElementById("boton_borrar_numero_historial_pp").onclick = function(){
document.getElementById("buscar_numero_historial_pp").value = "";
llenar_tabla_asignados();
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