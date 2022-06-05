var ids_tabla = [];
function llenar_tabla_admins_con_espera() {
    var parametros_rp = {
        "tipo": "tadm",
        "nombre_usuario": document.getElementById("buscar_nombre_usuario").value,
        "habilitado": document.getElementById("buscar_habilitado").value,
        "cantidad_filas": document.getElementById("input_cantidad_filas").value
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
llenar_tabla_admins_con_espera();

document.getElementById("input_cantidad_filas").addEventListener('change', (event) => {
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_admins_con_espera();
});
document.getElementById("boton_borrar_todo").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_nombre_usuario").value = "";
    document.getElementById("buscar_habilitado").options.item(0).selected = 'selected';
    llenar_tabla_admins_con_espera();
};

document.getElementById("boton_actualizar").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_admins_con_espera();
};
document.getElementById("buscar_habilitado").addEventListener('change', (event) => {
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block"; 
    llenar_tabla_admins_con_espera();
});
document.getElementById("boton_borrar_habilitado").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_habilitado").options.item(0).selected = 'selected';
    llenar_tabla_admins_con_espera();
};

document.getElementById("buscar_nombre_usuario").addEventListener('keyup', (event) => {
    llenar_tabla_admins_con_espera();
});

document.getElementById("boton_borrar_nombre_usuario").onclick = function(){
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("buscar_nombre_usuario").value = "";
    llenar_tabla_admins_con_espera();
};


















document.getElementById("boton_nuevo_administrador").onclick = function(){
    sessionStorage.setItem("nombre_usuarios", "");
    window.open("editar_admin.html");
};
function accion_editar(numero){
    sessionStorage.setItem("nombre_usuarios", ids_tabla[numero]);
    window.open("editar_admin.html");
}