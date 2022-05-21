var datos_personal = [];
function llenar_tabla_con_esperar() {
    var parametros_rp = {
        "tipo": "dape",
        "id": cookies_pagina["id_personal"],
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
                datos_personal = JSON.parse(response); 

                document.getElementById("nombre_usuario_dp").innerHTML = datos_personal["nombre_usuario"];

                document.getElementById("tipo_documento_dp").innerHTML = datos_personal["tipo_documento"];
                document.getElementById("numero_documento_dp").innerHTML = datos_personal["numero_documento"];
                document.getElementById("cargo_dp").innerHTML = datos_personal["cargo"];
                document.getElementById("especialidad_dp").innerHTML = datos_personal["especialidad"];
                document.getElementById("nombre_1_dp").innerHTML = datos_personal["nombre_1"];
                document.getElementById("nombre_2_dp").innerHTML = datos_personal["nombre_2"];
                document.getElementById("apellido_1_dp").innerHTML = datos_personal["apellido_1"];
                document.getElementById("apellido_2_dp").innerHTML = datos_personal["apellido_2"];
                document.getElementById("sexo_dp").innerHTML = datos_personal["sexo"];
                document.getElementById("correo_dp").innerHTML = datos_personal["correo"];
                document.getElementById("telefono_1_dp").innerHTML = datos_personal["telefono_1"];
                document.getElementById("telefono_2_dp").innerHTML = datos_personal["telefono_2"];
                document.getElementById("fecha_nacimiento_dp").innerHTML = datos_personal["fecha_nacimiento"];
                /*document.getElementById("miniatura_dp").value = datos_personal["miniatura"];
                document.getElementById("foto_dp").value = datos_personal["foto"];*/
                document.getElementById("contenido_esperar_pp").style.display = "none";
                document.getElementById("modal_pp").style.display =  "none"; 
            } 
        }
    });
};
document.getElementById("modal_pp").style.display =  "block"; 
document.getElementById("contenido_esperar_pp").style.display = "inline-block";
llenar_tabla_con_esperar();

