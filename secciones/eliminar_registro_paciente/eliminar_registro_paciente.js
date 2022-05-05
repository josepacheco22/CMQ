var id_seleccionado = "";
function info_confirmar_eliminar(numero_id) {
    id_seleccionado = ids_tabla[numero_id];
    var parametros_rp = {
        "tipo": "dtpades",
        "id": ids_tabla[numero_id]
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
                $(".datos_volatiles_pp").detach();
                $("#informacion_de_paciente_pp").append(response); 
            }
                
        }
    });
}
function accion_eliminar(numero){
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("mensaje_alerta_pp").style.display = "inline-block"; 
    info_confirmar_eliminar(numero);
    document.getElementById("mensaje_alerta_pp").style.display = "none"; 
    document.getElementById("contenido_confirmar_eliminar_paciente_pp").style.display = "inline-block"; 
}
document.getElementById("boton_confirmar_cancelar_pp").onclick = function(){
    $(".datos_volatiles_pp").detach();
    document.getElementById("contenido_confirmar_eliminar_paciente_pp").style.display = "none"; 
    document.getElementById("modal_pp").style.display =  "none";
};
function eliminar_paciente(id_a_eliminar) {
    var parametros_rp = {
        "tipo": "elipa",
        "id": id_a_eliminar
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
                document.getElementById("label_mensaje_alerta_pp").innerHTML=response;
            }
                
        }
    });
}
document.getElementById("boton_confirmar_cofirmar_pp").onclick = function(){
    document.getElementById("contenido_confirmar_eliminar_paciente_pp").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    eliminar_paciente(id_seleccionado);
    document.getElementById("contenido_esperar_pp").style.display = "none";
    document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
};