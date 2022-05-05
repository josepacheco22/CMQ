var id_seleccionado = "";
function info_confirmar_eliminar(numero_id) {
    id_seleccionado = ids_tabla[numero_id];
    var parametros_rp = {
        "tipo": "dthisdes",
        "id": ids_tabla[numero_id]
    };
    console.log(ids_tabla[numero_id]);
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
                $("#informacion_de_historial_pp").append(response); 
            }
                
        }
    });
}
function accion_eliminar(numero){
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("mensaje_alerta_pp").style.display = "inline-block"; 
    info_confirmar_eliminar(numero);
    document.getElementById("mensaje_alerta_pp").style.display = "none"; 
    document.getElementById("contenido_confirmar_eliminar_historial_pp").style.display = "inline-block"; 
}
document.getElementById("boton_confirmar_cancelar_pp").onclick = function(){
    $(".datos_volatiles_pp").detach();
    document.getElementById("contenido_confirmar_eliminar_historial_pp").style.display = "none"; 
    document.getElementById("modal_pp").style.display =  "none";
};
function eliminar_historial(id_a_eliminar) {
    var parametros_rp = {
        "tipo": "elihis",
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
    document.getElementById("contenido_confirmar_eliminar_historial_pp").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    eliminar_historial(id_seleccionado);
    document.getElementById("contenido_esperar_pp").style.display = "none";
    document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
};