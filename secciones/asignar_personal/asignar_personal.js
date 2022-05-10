var id_historial_seleccionado = "";
var id_personal_seleccionado = "";
var ids_tabla_user = [];
function llenar_tabla_de_usuarios() {
    var parametros_rp = {
        "tipo": "tbusasi",
        "nombres": document.getElementById("buscar_nombres_pp").value,
        "usuario": document.getElementById("buscar_usuario_pp").value,
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
                $(".resultados_de_tablas_user").detach();
                $("#cuerpo_tabla_users_pp").append(division_respuesta[0]);   
                ids_tabla_user = JSON.parse(division_respuesta[1]); 


                $(".datos_volatiles_pp").detach();
                $("#informacion_de_historial_pp").append(response); 
            }
                
        }
    });
}
document.getElementById("boton_confirmar_cofirmar_asignar_pp").hidden=true;
function seleccionar_id_personal(numero){
    if((ids_tabla_user.length)!=0){
        $('td').css('background-color', '#1f2f98');
        $('.fila_selecionada_user_'+numero).css('background-color', '#45c4c4');
        id_personal_seleccionado = ids_tabla_user[numero];
        document.getElementById("boton_confirmar_cofirmar_asignar_pp").hidden=false;
    }else{
        document.getElementById("boton_confirmar_cofirmar_asignar_pp").hidden=true;
    }
    
}
function accion_asignar(id_historial){
    id_historial_seleccionado = ids_tabla[id_historial];
    var id_historial_0 = id_historial_seleccionado.padStart(6, "0");
    document.getElementById("mensaje_formulario_pp").innerHTML = "Asignar Historial N°: "+id_historial_0[0]+id_historial_0[1]+id_historial_0[2]+" "+id_historial_0[3]+id_historial_0[4]+id_historial_0[5];
    llenar_tabla_de_usuarios();
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_asignar_personal").style.display = "inline-block"; 
    //sessionStorage.setItem('id_historial', ids_tabla[id_historial]);
    //window.open("editar_historial.html");
}


document.getElementById("boton_confirmar_cancelar_asignar_pp").onclick = function(){
    $(".datos_volatiles_pp").detach();
    document.getElementById("contenido_confirmar_eliminar_historial_pp").style.display = "none"; 
    document.getElementById("modal_pp").style.display =  "none";
    document.getElementById("boton_confirmar_cofirmar_asignar_pp").hidden=true;
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
document.getElementById("boton_confirmar_cofirmar_asignar_pp").onclick = function(){
    document.getElementById("contenido_confirmar_eliminar_historial_pp").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    eliminar_historial(id_seleccionado);
    document.getElementById("contenido_esperar_pp").style.display = "none";
    document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
};