
document.getElementById("cambio_contrasena_rpa").onclick = function(){
    document.getElementById("input_contrasena_nueva_dp").value = "";
    document.getElementById("input_contrasena_confirmar_dp").value = "";
    document.getElementById("input_contrasena_actual_dp").value = "";
    document.getElementById("input_contrasena_confirmar_dp").style.border= "2px solid #787ff6"
    document.getElementById("input_contrasena_nueva_dp").style.border= "2px solid #787ff6";
    ocultar_contra_actual();
    ocultar_contra_nueva();
    ocultar_contra_confirmar();
    document.getElementById("modal_pp").style.display =  "block"; 
    document.getElementById("nueva_contrasena").style.display = "inline-block";
};

function ocultar_contra_actual(){
    document.getElementById("input_contrasena_actual_dp").setAttribute("type","password");
    document.getElementById("id_ocultar_contra_actual").style.display =  "none";
    document.getElementById("id_mostrar_contra_actual").style.display =  "block";
};
function mostrar_contra_actual(){
    document.getElementById("input_contrasena_actual_dp").setAttribute("type","text");
    document.getElementById("id_ocultar_contra_actual").style.display =  "block";
    document.getElementById("id_mostrar_contra_actual").style.display =  "none";
};
document.getElementById("boton_confirmar_cancelar_contrasena_actual_pp").onclick = function(){
    document.getElementById("nueva_contrasena").style.display = "none";
    document.getElementById("modal_pp").style.display = "none"; 
};
document.getElementById("boton_confirmar_confirmar_contrasena_actual_pp").onclick = function(){
    if(document.getElementById("input_contrasena_actual_dp").value == cookies_pagina["contrasena"]){
        document.getElementById("nueva_contrasena").style.display = "none";
        document.getElementById("nueva_contrasena_2").style.display = "inline-block";
        document.getElementById("boton_contrasena_nueva").style.justifyContent = "flex-end";
        document.getElementById("boton_confirmar_confirmar_contrasena_nueva_pp").style.display =  "none";
    }else{
        document.getElementById("nueva_contrasena").style.display = "none";
        document.getElementById("contrasena_actual_incorrecta").style.display = "inline-block";
    }
};

document.getElementById("boton_alerta_cofirmar_contrasena_erronea_pp").onclick = function(){
    document.getElementById("contrasena_actual_incorrecta").style.display = "none";
    document.getElementById("modal_pp").style.display =  "none"; 
};

function ocultar_contra_nueva(){
    document.getElementById("input_contrasena_nueva_dp").setAttribute("type","password");
    document.getElementById("id_ocultar_contra_nueva").style.display =  "none";
    document.getElementById("id_mostrar_contra_nueva").style.display =  "block";
}
function mostrar_contra_nueva(){
    document.getElementById("input_contrasena_nueva_dp").setAttribute("type","text");
    document.getElementById("id_ocultar_contra_nueva").style.display =  "block";
    document.getElementById("id_mostrar_contra_nueva").style.display =  "none";
}

function ocultar_contra_confirmar(){
    document.getElementById("input_contrasena_confirmar_dp").setAttribute("type","password");
    document.getElementById("id_ocultar_contra_confirmar").style.display =  "none";
    document.getElementById("id_mostrar_contra_confirmar").style.display =  "block";
}
function mostrar_contra_confirmar(){
    document.getElementById("input_contrasena_confirmar_dp").setAttribute("type","text");
    document.getElementById("id_ocultar_contra_confirmar").style.display =  "block";
    document.getElementById("id_mostrar_contra_confirmar").style.display =  "none";
}

document.getElementById("boton_confirmar_cancelar_contrasena_nueva_pp").onclick = function(){
    document.getElementById("nueva_contrasena_2").style.display = "none";
    document.getElementById("modal_pp").style.display =  "none"; 
};


function indicar_errores_nueva_contrasena(){
    if(document.getElementById("input_contrasena_nueva_dp").value.length>=8 ||document.getElementById("input_contrasena_nueva_dp").value == ""){
        document.getElementById("input_contrasena_nueva_dp").style.border= "2px solid #787ff6";
    }else{
        document.getElementById("input_contrasena_nueva_dp").style.border= "2px solid #e24444";
    }
    if(document.getElementById("input_contrasena_confirmar_dp").value == document.getElementById("input_contrasena_nueva_dp").value||document.getElementById("input_contrasena_confirmar_dp").value == ""){
        document.getElementById("input_contrasena_confirmar_dp").style.border= "2px solid #787ff6";
    }else{
        document.getElementById("input_contrasena_confirmar_dp").style.border= "2px solid #e24444";
    }
    if(document.getElementById("input_contrasena_confirmar_dp").value == document.getElementById("input_contrasena_nueva_dp").value &&document.getElementById("input_contrasena_nueva_dp").value.length>=8)
    {
        document.getElementById("boton_contrasena_nueva").style.justifyContent = "space-between";
        document.getElementById("boton_confirmar_confirmar_contrasena_nueva_pp").style.display =  "block";
    }else{
        document.getElementById("boton_contrasena_nueva").style.justifyContent = "flex-end";
        document.getElementById("boton_confirmar_confirmar_contrasena_nueva_pp").style.display =  "none";
    }
}
document.getElementById("boton_error_cambio_contrasena").onclick = function(){
    document.getElementById("error_cambio_contrasena").style.display = "none";
    document.getElementById("modal_pp").style.display =  "none"; 
}; 
document.getElementById("input_contrasena_nueva_dp").addEventListener('keyup', (event) => {
    indicar_errores_nueva_contrasena();
});
document.getElementById("input_contrasena_confirmar_dp").addEventListener('keyup', (event) => {
    indicar_errores_nueva_contrasena();
});

document.getElementById("boton_confirmar_confirmar_contrasena_nueva_pp").onclick = function(){
    document.getElementById("nueva_contrasena_2").style.display = "none";
    document.getElementById("contenido_esperar_pp").style.display = "inline-block";
    guardar_datos_personal_con_esperar();
};

function guardar_datos_personal_con_esperar() {
    var parametros_rp = {
        "tipo": "cpp",
        "id": cookies_pagina["id_personal"],
        "contrasena_usuario": document.getElementById("input_contrasena_nueva_dp").value
    };
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response=="Exito")
            {
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("contrasena_cambiada").style.display = "inline-block";
            }else{
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("error_cambio_contrasena").style.display = "inline-block";
            }
        }
    });
};

document.getElementById("boton_alerta_cofirmar_contrasena_cambiada_pp").onclick = function(){
    document.cookie = "usuario=";
    document.cookie = "contrasena=";
    document.cookie = "id_personal=";
    document.cookie = "permisos=";
    document.cookie = "max-age=";
    window.location.href = "principal.html";
};