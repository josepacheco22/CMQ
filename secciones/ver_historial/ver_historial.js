var id_historial_seleccionado_ver = "";
function buscar_datos_historial() {
    var parametros_rp = {
        "tipo": "dthiarch",
        "id": id_historial_seleccionado_ver
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
                if(response=="Fallo"){
                    $(".datos_volatiles_ver_pp").detach();
                    document.getElementById("contenido_esperar_pp").style.display = "none"; 
                    document.getElementById("modal_pp").style.display =  "none";
                }else{
                    $(".datos_volatiles_ver_pp").detach();
                    $("#contenedor_historial_completo_ver").append(response);
                    document.getElementById("contenido_esperar_pp").style.display = "none"; 
                    document.getElementById("contenido_ver_historial").style.display = "inline-block"; 
                }
            }
                
        }
    });
}

function accion_ver(id_historial){
    id_historial_seleccionado_ver = ids_tabla[id_historial];
    var id_historial_ver_0 = ids_tabla[id_historial].padStart(6, "0");
    document.getElementById("mensaje_formulario_ver_pp").innerHTML = "Historial N°: "+id_historial_ver_0[0]+id_historial_ver_0[1]+id_historial_ver_0[2]+" "+id_historial_ver_0[3]+id_historial_ver_0[4]+id_historial_ver_0[5];
    buscar_datos_historial();
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
}

document.getElementById("boton_confirmar_cerrar_ver_pp").onclick = function(){
    document.getElementById("contenido_ver_historial").style.display = "none"; 
    document.getElementById("modal_pp").style.display = "none";
    
};
document.getElementById("boton_confirmar_cerrar_superior_ver_pp").onclick = function(){
    document.getElementById("contenido_ver_historial").style.display = "none"; 
    document.getElementById("modal_pp").style.display = "none";
};