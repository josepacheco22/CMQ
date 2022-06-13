document.getElementById("cerrar_superior_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
    borrar_tabla_pacientes();
}; 
document.getElementById("cantidad_filas_tabla_pp").addEventListener('change', (event) => {
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
     $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_pp_pa();
});
var ids_tabla = [];
var paciente_seleccionado = "";
function llenar_tabla_pp_pa() {
  $('th').css({"animation-name": "indicar_buscar"});
  $('th').css({"animationDuration": "600ms"});
  $('th').css({"animationIterationCount": "infinite"});
  /*$(".resultados_de_tablas").detach();*/
    $('td').css('background-color', '#1f2f98');
    
    document.getElementById("boton_aceptar_pp").style.display = "none";
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
            var division_respuesta = response.split("ids");
            $(".resultados_de_tablas").detach();
            $("#cuerpo_tabla").append(division_respuesta[0]);   
            ids_tabla = JSON.parse(division_respuesta[1]); 
            document.getElementById("contenido_esperar_pp").style.display = "none";
            document.getElementById("contenido_buscar_paciente_pp").style.display = "inline-block";
            $('th').css({"animation-name": "none"});
        }
    });
};


document.getElementById("borrar_borrar_todo_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
     $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_tipo_documento_pp").options.item(0).selected = 'selected';
    document.getElementById("buscar_numerodoc_pp").value = "";
    document.getElementById("buscar_nombres_pp").value = "";
    document.getElementById("buscar_apellidos_pp").value = "";
    document.getElementById("buscar_creado_por_pp").value = "";
    document.getElementById("buscar_fecha_creado_pp").value = "";
    llenar_tabla_pp_pa();
};
document.getElementById("agregar_paciente_pp").onclick = function(){
    verificar_cookie();
    window.open("nuevo_paciente.html");
}
document.getElementById("actualizar_paciente_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
     $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_tipo_documento_pp").addEventListener('change', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_tipo_documento_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
     $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_tipo_documento_pp").options.item(0).selected = 'selected';
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_tipo_documento_pp").addEventListener('change', (event) => {
    llenar_tabla_pp_pa();
});
function borrar_tabla_pacientes(){
    $(".resultados_de_tablas").detach();
    ids_tabla = [];
    document.getElementById("buscar_tipo_documento_pp").options.item(0).selected = 'selected';
    document.getElementById("buscar_numerodoc_pp").value = "";
    document.getElementById("buscar_nombres_pp").value = "";
    document.getElementById("buscar_apellidos_pp").value = "";
    document.getElementById("buscar_creado_por_pp").value = "";
    document.getElementById("buscar_fecha_creado_pp").value = "";
    document.getElementById("boton_aceptar_pp").style.display = "none";
};
document.getElementById("buscar_numerodoc_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_numero_documento_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
     $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_numerodoc_pp").value = "";
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_nombres_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_nombres_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
     $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_nombres_pp").value = "";
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_apellidos_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_apellidos_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
     $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_apellidos_pp").value = "";
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_creado_por_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_creado_por_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
    $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_creado_por_pp").value = "";
    llenar_tabla_pp_pa();
};
document.getElementById("buscar_fecha_creado_pp").addEventListener('keyup', (event) => {
    llenar_tabla_pp_pa();
});
document.getElementById("boton_borrar_fecha_creado_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";   
     $(".resultados_de_tablas").detach();
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_fecha_creado_pp").value = "";
    llenar_tabla_pp_pa();
};
document.getElementById("boton_aceptar_pp").onclick = function(){
    if(paciente_seleccionado != "")  {
        document.getElementById("contenido_buscar_paciente_pp").style.display = "none"; 
        document.getElementById("contenido_esperar_pp").style.display = "inline-block";
        $(".resultados_de_tablas").detach();
        buscar_datos_paciente();
        borrar_tabla_pacientes();
    }
};
function seleccionar_id_paciente(numero){
    if((ids_tabla.length)!=0){
      $('td').css('background-color', '#1f2f98');
      $('.fila_selecionada_'+numero).css('background-color', '#45c4c4');
      paciente_seleccionado = ids_tabla[numero];
      document.getElementById("boton_aceptar_pp").style.display = "block";
    }else{
      document.getElementById("boton_aceptar_pp").style.display = "none";
    }
};
document.getElementById("boton_cancelar_pp").onclick = function(){
    document.getElementById("contenido_buscar_paciente_pp").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
    borrar_tabla_pacientes();
}; 
function accion_abrir(numero){
    sessionStorage.setItem('id_paciente', ids_tabla[numero]);
    window.open("datos_paciente.html");
}

