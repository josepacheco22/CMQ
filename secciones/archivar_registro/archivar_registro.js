var id_seleccionado = "";
function accion_archivar(numero){
    document.getElementById("modal_pp").style.display =  "block";
    id_seleccionado = ids_tabla[numero];
    var id_con_0  = id_seleccionado.padStart(6, "0");
    document.getElementById("mensaje_furmulario_archivar").innerHTML = "Desea archivar el Historial N°: " +id_con_0[0]+id_con_0[1]+id_con_0[2]+" "+id_con_0[3]+id_con_0[4]+id_con_0[5]+" ?";
    document.getElementById("contenido_archivar_historial_pp").style.display = "inline-block"; 
}
document.getElementById("boton_confirmar_cancelar_archivar_pp").onclick = function(){
    document.getElementById("contenido_archivar_historial_pp").style.display = "none";
    document.getElementById("modal_pp").style.display = "none"; 

};
function archivar_paciente(id_a_archivar) {
    var parametros_rp = {
        "tipo": "archhis",
        "id": id_a_archivar
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
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
            }
                
        }
    });
}
document.getElementById("boton_confirmar_confirmar_archivar_pp").onclick = function(){
    document.getElementById("contenido_archivar_historial_pp").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    archivar_paciente(id_seleccionado);
};