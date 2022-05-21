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
mascara para buscar fecha
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
$(document).ready(function(){
    $('#buscar_fecha_creado_pp').mask('####-##-##')
});
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
llenar tabla pacientes
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var ids_tabla = [];
function llenar_tabla_pp_pa() {
    var parametros_rp = {
        "tipo": "tpa",
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
                $("#cuerpo_tabla_pp").append(division_respuesta[0]);   
                ids_tabla = JSON.parse(division_respuesta[1]); 
            } 
        }
    });
};
function llenar_tabla_pp_pa_con_espera() {
    var parametros_rp = {
        "tipo": "tpa",
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
                $("#cuerpo_tabla_pp").append(division_respuesta[0]);   
                ids_tabla = JSON.parse(division_respuesta[1]); 
                document.getElementById("contenido_esperar_pp").style.display =  "none";
                document.getElementById("modal_pp").style.display =  "none";
            } 
        }
    });
};

document.getElementById("modal_pp").style.display =  "block";
document.getElementById("contenido_esperar_pp").style.display =  "inline-block";


llenar_tabla_pp_pa_con_espera();


function accion_editar(numero){
    sessionStorage.setItem('id_paciente', ids_tabla[numero]);
    window.open("editar_paciente.html");
}


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
llenar tabla pacientes
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

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

document.getElementById("boton_alerta_cofirmar_pp").onclick = function(){
    document.getElementById("mensaje_alerta_pp").style.display = "none";
    document.getElementById("modal_pp").style.display =  "none";
    llenar_tabla_pp_pa();
};
