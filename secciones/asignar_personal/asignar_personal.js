var id_historial_seleccionado = "";
var id_personal_seleccionado = "";
var ids_tabla_user = [];
function llenar_tabla_de_usuarios() {
    document.getElementById("boton_confirmar_cofirmar_asignar_pp").hidden=true;
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
function llenar_tabla_de_usuarios_con_esperar() {
    document.getElementById("boton_confirmar_cofirmar_asignar_pp").hidden=true;
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
                document.getElementById("contenido_asignar_personal").style.display = "inline-block";
                document.getElementById("contenido_esperar_pp").style.display = "none";
            }
                
        }
    });
}
$(document).ready(function(){
    $('#buscar_nombres_pp').mask('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',{'translation': {
        A: {pattern: /[a-c0-9A-ZñÑ ]/},
    }
    })
    $('#buscar_usuario_pp').mask('AAAAAAAAAAAAAAAAAAAAA',{'translation': {
        A: {pattern: /[a-c0-9A-ZñÑ ]/},
    }
    })
});

document.getElementById("borrar_borrar_asignar_todo_pp").onclick = function(){
    document.getElementById("buscar_nombres_pp").value= "";
    document.getElementById("buscar_usuario_pp").value= "";
    llenar_tabla_de_usuarios();
}

document.getElementById("actualizar_asignar_pp").onclick = function(){
    llenar_tabla_de_usuarios();
}

document.getElementById("buscar_nombres_pp").addEventListener('keydown', (event) => {
    llenar_tabla_de_usuarios();
});
document.getElementById("buscar_nombres_pp").addEventListener('keyup', (event) => {
    llenar_tabla_de_usuarios();
});
document.getElementById("boton_borrar_nombres_pp").onclick = function(){
    document.getElementById("buscar_nombres_pp").value= "";
    llenar_tabla_de_usuarios();
}
document.getElementById("buscar_usuario_pp").addEventListener('keydown', (event) => {
    llenar_tabla_de_usuarios();
});
document.getElementById("buscar_usuario_pp").addEventListener('keyup', (event) => {
    llenar_tabla_de_usuarios();
});
document.getElementById("boton_borrar_usuario_pp").onclick = function(){
    document.getElementById("buscar_usuario_pp").value= "";
    llenar_tabla_de_usuarios();
}

document.getElementById("boton_confirmar_cofirmar_asignar_pp").onclick = function(){
    document.getElementById("boton_confirmar_cofirmar_asignar_pp").hidden=true;
    document.getElementById("contenido_asignar_personal").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    var parametros_rp = {
        "tipo": "asus",
        "id_historial_seleccionado": id_historial_seleccionado,
        "id_usuario": id_personal_seleccionado
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
                if(response == "exito"){
                    document.getElementById("label_mensaje_alerta_pp").innerHTML = "Cambio realizado con Éxito";
                }else{
                    document.getElementById("label_mensaje_alerta_pp").innerHTML = "Fallo Cambio";
                }
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("mensaje_alerta_pp").style.display = "inline-block";
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
    llenar_tabla_de_usuarios_con_esperar();
    document.getElementById("modal_pp").style.display =  "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
}


document.getElementById("boton_confirmar_cancelar_asignar_pp").onclick = function(){
    $(".datos_volatiles_pp").detach();
    document.getElementById("boton_confirmar_cofirmar_asignar_pp").hidden=true;
    document.getElementById("contenido_asignar_personal").style.display = "none"; 
    document.getElementById("modal_pp").style.display = "none";
};