var id_paciente = sessionStorage.getItem('id_paciente');


var ids_tabla = [];
function llenar_tabla_con_esperar() {
    var parametros_rp = {
        "tipo": "tphs",
        "id": id_paciente,
        "id_historial": document.getElementById("input_id_historial").value,
        "fecha_consulta": document.getElementById("input_fecha_consulta").value,
        "usuario_creado": document.getElementById("input_usuario_creado").value,
        "usuario_asignado": document.getElementById("input_usuario_asignado").value,
        "archivado": document.getElementById("input_archivado").value,
        "cantidad_filas": document.getElementById("cantidad_filas_tabla_pp").value
        //"cantidad_filas": document.getElementById("input_cantidad_filas").value
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


function accion_editar(numero){
    datos_paciente[numero];
}
var datos_paciente = [];
function datos_paciente_tabla_con_espera() {
    var parametros_rp = {
        "tipo": "dpabt",
        "id": id_paciente,
    };
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response!="fallo")
            {
                datos_paciente = JSON.parse(response); 

                document.getElementById("label_tipo_documento").innerHTML = datos_paciente["tipo_documento"];
                document.getElementById("label_numero_documento").innerHTML = datos_paciente["numero_documento"];
                document.getElementById("label_nombre").innerHTML = datos_paciente["nombre_1"] +" "+ datos_paciente["nombre_2"];
                document.getElementById("label_apellido").innerHTML = datos_paciente["apellido_1"] +" "+datos_paciente["apellido_2"];
                document.getElementById("label_sexo").innerHTML = datos_paciente["sexo"];
                document.getElementById("label_correo").innerHTML = datos_paciente["correo"];
                document.getElementById("label_telefono_1").innerHTML = datos_paciente["telefono_1"];
                document.getElementById("label_telefono_2").innerHTML = datos_paciente["telefono_2"];
                document.getElementById("label_fecha_nacimiento").innerHTML = datos_paciente["fecha_nacimiento"];
                document.getElementById("label_provincia").innerHTML = datos_paciente["provincia"];
                document.getElementById("label_canton").innerHTML = datos_paciente["canton"];
                document.getElementById("label_direccion").innerHTML = datos_paciente["direccion"];
                document.getElementById("label_ocupacion").innerHTML = datos_paciente["ocupacion"];


                document.getElementById("label_creado_por").innerHTML = datos_paciente["creado_por"];
                document.getElementById("label_usuario").innerHTML = datos_paciente["usuario"];
                document.getElementById("label_fecha_creacion").innerHTML = datos_paciente["fecha_creacion"];


                llenar_tabla_con_esperar();
            } 
        }
    });
};
document.getElementById("modal_pp").style.display =  "block"; 
document.getElementById("contenido_esperar_pp").style.display = "inline-block";
datos_paciente_tabla_con_espera();

document.getElementById("editar_paciente").onclick = function(){
    sessionStorage.setItem('id_paciente', id_paciente);
    window.location.href = "editar_paciente.html";
};


function accion_editar(id_editar){
    sessionStorage.setItem('id_historial', ids_tabla[id_editar]);
    window.open("editar_historial.html");
}

function mostrar_historia_clinica(){
    document.getElementById("navegador_datos_paciente_2").style.background = "var(--color-principal)";
    document.getElementById("navegador_datos_paciente_1").style.background = "var(--color-1-formulario)";

    document.getElementById("navegador_datos_paciente_1").onmouseenter =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_1").onmouseleave =function(){this.style.background="var(--color-1-formulario)"};


    document.getElementById("navegador_datos_paciente_2").onmouseenter =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_2").onmouseleave =function(){this.style.background="var(--color-principal)"};



    document.getElementById("contenido_informacion_creacion").style.display = "none";
    document.getElementById("contenido_informacion_personal").style.display = "none";
    document.getElementById("opciones_tabla_pacientes").style.display = "flex";
    document.getElementById("tabla_pacientes").style.display = "block";
}

function mostrar_informacion_personal(){
    document.getElementById("navegador_datos_paciente_1").style.background = "var(--color-principal)";
    document.getElementById("navegador_datos_paciente_2").style.background = "var(--color-1-formulario)";

    document.getElementById("navegador_datos_paciente_2").onmouseenter =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_2").onmouseleave =function(){this.style.background="var(--color-1-formulario)"};

    document.getElementById("navegador_datos_paciente_1").onmouseenter =function(){this.style.background="var(--color-1-formulario)"};
    document.getElementById("navegador_datos_paciente_1").onmouseleave =function(){this.style.background="var(--color-principal)"};

    document.getElementById("opciones_tabla_pacientes").style.display = "none";
    document.getElementById("tabla_pacientes").style.display = "none";
    document.getElementById("contenido_informacion_creacion").style.display = "block";
    document.getElementById("contenido_informacion_personal").style.display = "block";
}


function ocultar_informacion_personal(){
    document.getElementById("contenido_informacion_personal").style.display = "none";
    document.getElementById("svg_ocultar_informacion_personal").style.display = "none";
    document.getElementById("svg_mostrar_informacion_personal").style.display = "block";
    document.getElementById("opcion_expandir_informacion_personal").style.borderBottomLeftRadius = "15px";
    document.getElementById("opcion_expandir_informacion_personal").style.borderBottomRightRadius = "15px";
    document.getElementById("opcion_expandir_informacion_personal").style.marginBottom = "15px";
    document.getElementById("contenido_informacion_personal").style.marginBottom = "0";


}
function ocultar_informacion_creacion(){
    document.getElementById("contenido_informacion_creacion").style.display = "none";
    document.getElementById("svg_ocultar_informacion_creacion").style.display = "none";
    document.getElementById("svg_mostrar_informacion_creacion").style.display = "block";
    document.getElementById("opcion_expandir_informacion_creado").style.borderBottomLeftRadius = "15px";
    document.getElementById("opcion_expandir_informacion_creado").style.borderBottomRightRadius = "15px";
}







document.getElementById("boton_borrar_numero_historial_pp").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("input_id_historial").value = "";
    llenar_tabla_con_esperar();
};

document.getElementById("boton_borrar_fecha_consulta_pp").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("input_fecha_consulta").value = "";
    llenar_tabla_con_esperar();
};
document.getElementById("boton_borrar_archivado_pp").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("input_archivado").value = "";
    llenar_tabla_con_esperar();
};
document.getElementById("boton_borrar_creado_por_pp").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("input_usuario_creado").value = "";
    llenar_tabla_con_esperar();
};
document.getElementById("boton_borrar_usuario_asignado_pp").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("input_usuario_asignado").value = "";
    llenar_tabla_con_esperar();
};


document.getElementById("borrar_borrar_todo_pp").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    document.getElementById("input_id_historial").value = "";
    document.getElementById("input_fecha_consulta").value = "";
    document.getElementById("input_archivado").value = "";
    document.getElementById("input_usuario_creado").value = "";
    document.getElementById("input_usuario_asignado").value = "";
    llenar_tabla_con_esperar();
};

document.getElementById("actualizar_pp").onclick = function(){
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_con_esperar();
};


document.getElementById("cantidad_filas_tabla_pp").addEventListener('change', (event) => {
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    llenar_tabla_con_esperar();
});


document.getElementById("input_id_historial").addEventListener('keyup', (event) => {
    llenar_tabla_con_esperar();
});
document.getElementById("input_fecha_consulta").addEventListener('keyup', (event) => {
    llenar_tabla_con_esperar();
});
document.getElementById("input_archivado").addEventListener('change', (event) => {
    llenar_tabla_con_esperar();
});
document.getElementById("input_usuario_creado").addEventListener('keyup', (event) => {
    llenar_tabla_con_esperar();
});
document.getElementById("input_usuario_asignado").addEventListener('keyup', (event) => {
    llenar_tabla_con_esperar();
});


document.getElementById("agregar_historial_paciente_pp").onclick = function(){
    sessionStorage.setItem("id_paciente", id_paciente);
    window.open("nuevo_historial.html");
};