/*
document.getElementById("input_habilitado").onChange = function(){
    console.log("hola como estas");
};

document.getElementById("input_habilitado").addEventListener('Change', (event) => {
    console.log("hola como estas");
});

*/


document.getElementById("restablecer_habilitado").onclick = function(){
    document.getElementById("input_habilitado").checked = true;
};

/*
var id_personal = sessionStorage.getItem('id_personal');
var datos_paciente = [];
function extraer_datos_paciente_espera(){
    var parametros_rp = {
        "tipo": "dpers",
        "id": id_personal
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
                if(response =="fallo"){
                    window.close();
                }else{
                    datos_paciente = JSON.parse(response); 

                    if(datos_paciente["habilitado"]=="1"){
                        document.getElementById("input_habilitado").checked = true;
                    }else{
                        document.getElementById("input_habilitado").checked = false;
                    }
                    document.getElementById("input_tipo_documento").value = datos_paciente["tipo_documento"];
                    document.getElementById("input_numero_documento").value = datos_paciente["numero_documento"];
                    document.getElementById("input_nombre_1").value = datos_paciente["nombre_1"];
                    document.getElementById("input_nombre_2").value = datos_paciente["nombre_2"];
                    document.getElementById("input_apellido_1").value = datos_paciente["apellido_1"];
                    document.getElementById("input_apellido_2").value = datos_paciente["apellido_2"];
                    document.getElementById("input_sexo").value = datos_paciente["sexo"];
                    document.getElementById("input_correo").value = datos_paciente["correo"];
                    document.getElementById("input_telefono_1").value = datos_paciente["telefono_1"];
                    document.getElementById("input_telefono_2").value = datos_paciente["telefono_2"];
                    document.getElementById("input_fecha_nacimiento").value = datos_paciente["fecha_nacimiento"];
                    document.getElementById("input_cargo").value = datos_paciente["cargo"];
                    document.getElementById("input_especialidad").value = datos_paciente["especialidad"];
                    document.getElementById("input_usuario").value = datos_paciente["nombre_usuario"];
                    formato_varios();
                    document.getElementById("modal_pp").style.display = "none";
                    document.getElementById("contenido_esperar").style.display = "none";
                }
            }
        }
    });
}
document.getElementById("modal_pp").style.display = "block";
document.getElementById("contenido_esperar").style.display = "inline-block";
extraer_datos_paciente_espera();
*/
formato_varios();

document.getElementById("ejecutar_restablecer").onclick = function(){
    formato_varios();
    document.getElementById("input_tipo_documento").value = "";
    document.getElementById("input_numero_documento").value = "";
    document.getElementById("input_nombre_1").value = "";
    document.getElementById("input_nombre_2").value = "";
    document.getElementById("input_apellido_1").value = "";
    document.getElementById("input_apellido_2").value = "";
    document.getElementById("input_sexo").value = "";
    document.getElementById("input_correo").value = "";
    document.getElementById("input_telefono_1").value = "";
    document.getElementById("input_telefono_2").value = "";
    document.getElementById("input_contrasena_1").value = "";
    document.getElementById("input_contrasena_2").value = "";
    document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_formulario;
    document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_contrasena_1").style.display = "none";
    document.getElementById("alerta_contrasena_2").style.display = "none";

    document.getElementById("input_fecha_nacimiento").value = "";
    document.getElementById("input_fecha_nacimiento").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_fecha_nacimiento").style.display = "none";

    document.getElementById("input_cargo").value = "";
    document.getElementById("input_especialidad").value = "";
    document.getElementById("input_usuario").value = "";

    document.getElementById("input_especialidad").style.border= "3px solid "+color_1_formulario;
    
    document.getElementById("input_usuario").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_usuario").style.display = "none";
    document.getElementById("alerta_usuario_2").style.display = "none";

    document.getElementById("input_habilitado").checked = true;
    

    document.getElementById("input_cargo").style.border= "3px solid "+color_1_formulario;
    
    document.getElementById("input_numero_documento").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_numero_documento").style.display = "none";
    document.getElementById("alerta_numero_documento_2").style.display = "none";

    document.getElementById("alerta_general").style.display = "none";
    
};

document.getElementById("restablecer_tipo_documento").onclick = function(){
    document.getElementById("input_tipo_documento").value = "Cédula";
};
document.getElementById("restablecer_numero_documento").onclick = function(){
    document.getElementById("input_numero_documento").value = "";
    document.getElementById("input_numero_documento").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_numero_documento").style.display = "none";
    document.getElementById("alerta_numero_documento_2").style.display = "none";
    document.getElementById("alerta_general").style.display = "none";
    formato_tipo_documento();
};
document.getElementById("restablecer_nombre_1").onclick = function(){
    document.getElementById("input_nombre_1").value = "";
};
document.getElementById("restablecer_nombre_2").onclick = function(){
    document.getElementById("input_nombre_2").value = "";
};
document.getElementById("restablecer_apellido_1").onclick = function(){
    document.getElementById("input_apellido_1").value = "";
};
document.getElementById("restablecer_apellido_2").onclick = function(){
    document.getElementById("input_apellido_2").value = "";
};
document.getElementById("restablecer_sexo").onclick = function(){
    document.getElementById("input_sexo").value = "";
};
document.getElementById("restablecer_correo").onclick = function(){
    document.getElementById("input_correo").value = "";
};
document.getElementById("restablecer_telefono_1").onclick = function(){
    document.getElementById("input_telefono_1").value = "";
    formato_varios();
};
document.getElementById("restablecer_telefono_2").onclick = function(){
    document.getElementById("input_telefono_2").value = "";
    formato_varios();
};
document.getElementById("restablecer_fecha_nacimiento").onclick = function(){
    document.getElementById("input_fecha_nacimiento").value = "";
    document.getElementById("input_fecha_nacimiento").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_fecha_nacimiento").style.display = "none";
    document.getElementById("alerta_general").style.display = "none";
    formato_varios();
};
document.getElementById("input_fecha_nacimiento").addEventListener('keydown', (event) => {
    document.getElementById("input_fecha_nacimiento").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_fecha_nacimiento").style.display = "none";
    document.getElementById("alerta_general").style.display = "none";
    formato_varios();
});
document.getElementById("restablecer_cargo").onclick = function(){
    document.getElementById("input_cargo").value = "";
    document.getElementById("input_cargo").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_general").style.display = "none";
    formato_varios();
};
document.getElementById("restablecer_especialidad").onclick = function(){
    document.getElementById("input_especialidad").value = "";
    document.getElementById("input_especialidad").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_general").style.display = "none";
    formato_varios();
};
document.getElementById("restablecer_usuario").onclick = function(){
    document.getElementById("input_usuario").value = "";
    document.getElementById("input_usuario").style.border= "3px solid "+color_1_formulario;
    document.getElementById("alerta_usuario").style.display = "none";
    document.getElementById("alerta_usuario_2").style.display = "none";
    document.getElementById("alerta_general").style.display = "none";
    formato_varios();
};
document.getElementById("restablecer_contrasena_2").onclick = function(){
    document.getElementById("alerta_contrasena_2").style.display = "none";
    document.getElementById("input_contrasena_2").value = "";
    document.getElementById("alerta_general").style.display = "none";
    document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_formulario;
};
document.getElementById("restablecer_contrasena_1").onclick = function(){
    document.getElementById("alerta_contrasena_1").style.display = "none";
    document.getElementById("input_contrasena_1").value = "";
    document.getElementById("alerta_general").style.display = "none";
    document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_formulario;
};




document.getElementById("input_cargo").onclick = function(){
    document.getElementById("input_cargo").style.border= "3px solid "+color_1_formulario ;
};
document.getElementById("input_especialidad").onclick = function(){
    document.getElementById("input_especialidad").style.border= "3px solid "+color_1_formulario;
};
document.getElementById("input_cargo").addEventListener('change', (event) => {
    document.getElementById("input_cargo").style.border= "3px solid "+color_1_formulario ;
});
document.getElementById("input_especialidad").addEventListener('change', (event) => {
    document.getElementById("input_especialidad").style.border= "3px solid "+color_1_formulario;
});

document.getElementById("input_contrasena_1").addEventListener('keyup', (event) => {
    verificar_contrasena_1();
});
$( "#input_contrasena_1").blur(function() {
    verificar_contrasena_1();
});
function verificar_contrasena_1(){
    if((document.getElementById("input_contrasena_1").value).length < 8){
        document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_error;
        document.getElementById("alerta_contrasena_1").style.display = "block";
    }else{
        document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_formulario;
        document.getElementById("alerta_contrasena_1").style.display = "none";
    }
}

document.getElementById("input_contrasena_2").addEventListener('keyup', (event) => {
    verificar_contrasena_2();
});
$( "#input_contrasena_2").blur(function() {
    verificar_contrasena_2();
});
function verificar_contrasena_2(){
    if((document.getElementById("input_contrasena_2").value).length < 8 || (document.getElementById("input_contrasena_1").value)!=(document.getElementById("input_contrasena_2").value)){
        document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_error;
        document.getElementById("alerta_contrasena_2").style.display = "block";
    }else{
        document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_formulario;
        document.getElementById("alerta_contrasena_2").style.display = "none";
    }
}

let fecha_actual = new Date();
$( function() {
    $( "#input_fecha_nacimiento" ).datepicker({
        showButtonPanel: true,
        closeText: "Cerrar",
        currentText: "Hoy",
        dateFormat: "yy-mm-dd",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        maxDate: new Date((fecha_actual.getFullYear()),(fecha_actual.getMonth()),(fecha_actual.getDate())),
        prevText: '<Ant'
    });
    $( "#input_fecha_nacimiento" ).datepicker( "option", "showAnim", "slideDown" );
  } );
function formato_varios(){
    $(document).ready(function(){
        $('#input_fecha_nacimiento').mask('##################')
        $('#input_fecha_nacimiento').mask('####-##-##')
    });
    $(document).ready(function(){
        $('#input_telefono_2').mask('##################')
        $('#input_telefono_2').mask('###-###-####')
    });
    $(document).ready(function(){
        $('#input_telefono_1').mask('######################')
        $('#input_telefono_1').mask('###-###-#### #####')
    });
    formato_tipo_documento();
};
function formato_tipo_documento(){
    if((document.getElementById("input_tipo_documento").value)=="Cédula")
    {
        $(document).ready(function(){
            $('#input_numero_documento').mask('################')
            $('#input_numero_documento').mask('#########-#')
        });
    }
    if((document.getElementById("input_tipo_documento").value)=="Pasaporte")
    {
        $(document).ready(function(){
            $('#input_numero_documento').mask('AAAAAAAAAAAAAAAAAAAA')
            $('#input_numero_documento').mask('AAAA AAAA AAA')
        });
    }
}
document.getElementById("input_tipo_documento").onclick = function(){
    formato_tipo_documento();
};
document.getElementById("input_tipo_documento").addEventListener('change', (event) => {
    formato_tipo_documento();
});




function funcion_verificar_numero_documento(){
    
    var parametros_rp = {
        "tipo": "budper",
        "id_personal": "",
        "parametro":  document.getElementById("input_numero_documento").value
    };
    $.ajax({ 
        data: parametros_rp,
        url: "busqueda_rapida.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response=="1" || ((document.getElementById("input_numero_documento").value).replaceAll(" ","").replaceAll("-","")).length < 9 ){
                document.getElementById("input_numero_documento").style.animationName = "none";
                document.getElementById("input_numero_documento").style.border= "3px solid "+color_1_error;
                //existe_numero_documento ="1";
                if(((document.getElementById("input_numero_documento").value).replaceAll(" ","").replaceAll("-","")).length < 9)
                {
                    document.getElementById("alerta_numero_documento_2").style.display = "block";
                    document.getElementById("alerta_numero_documento").style.display = "none";
                }else{
                    document.getElementById("alerta_numero_documento").style.display = "block";
                    document.getElementById("alerta_numero_documento_2").style.display = "none";
                }
            }else{
                document.getElementById("input_numero_documento").style.animationName = "none";
                document.getElementById("alerta_numero_documento").style.display = "none";
                document.getElementById("alerta_numero_documento_2").style.display = "none";
                document.getElementById("input_numero_documento").style.border= "3px solid "+color_1_formulario;
            } 

        }
    });
};



$( "#input_numero_documento").blur(function() {
    formato_varios();
    document.getElementById("input_numero_documento").style.animationName = "anim";
    document.getElementById("input_numero_documento").style.animationDuration = "300ms";
    document.getElementById("input_numero_documento").style.animationIterationCount = "infinite";
    document.getElementById("alerta_numero_documento_2").style.display = "none";
    document.getElementById("alerta_numero_documento").style.display = "none";
    funcion_verificar_numero_documento();
});



function funcion_verificar_nombre_usuario(){
    
    var parametros_rp = {
        "tipo": "bnu",
        "id_personal": "",
        "parametro":  document.getElementById("input_usuario").value
    };
    $.ajax({ 
        data: parametros_rp,
        url: "busqueda_rapida.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response=="1" || ((document.getElementById("input_usuario").value).replaceAll(" ","")).length < 4 ){
                document.getElementById("input_usuario").style.animationName = "none";
                document.getElementById("input_usuario").style.border= "3px solid "+color_1_error;
                //existe_numero_documento ="1";
                if(((document.getElementById("input_usuario").value).replaceAll(" ","").replaceAll("-","")).length < 4)
                {
                    document.getElementById("alerta_usuario_2").style.display = "block";
                    document.getElementById("alerta_usuario").style.display = "none";
                }else{
                    document.getElementById("alerta_usuario").style.display = "block";
                    document.getElementById("alerta_usuario_2").style.display = "none";
                }
            }else{
                document.getElementById("input_usuario").style.animationName = "none";
                document.getElementById("alerta_usuario").style.display = "none";
                document.getElementById("alerta_usuario_2").style.display = "none";
                document.getElementById("input_usuario").style.border= "3px solid "+color_1_formulario;
            }         
            document.getElementById("contenido_esperar").style.display = "none";     
            document.getElementById("modal_pp").style.display = "none";   
        }
    });
};



$( "#input_usuario").blur(function() {
    document.getElementById("input_usuario").style.animationName = "anim";
    document.getElementById("input_usuario").style.animationDuration = "300ms";
    document.getElementById("input_usuario").style.animationIterationCount = "infinite";
    document.getElementById("alerta_usuario").style.display = "none";
    document.getElementById("alerta_usuario").style.display = "none";
    funcion_verificar_nombre_usuario();
});









document.getElementById("ejecutar_guardar_inferior").onclick = function(){
    guardar_todo();
};
document.getElementById("ejecutar_guardar").onclick = function(){
    guardar_todo();
};
var bandera_campo_requerido = 0;
function guardar_todo(){
    bandera_campo_requerido = 0;
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar").style.display = "inline-block";

    var var_fecha_nacimiento = (document.getElementById("input_fecha_nacimiento").value).replaceAll(" ","");
    let validar_fecha = Date.parse(var_fecha_nacimiento);

    if( var_fecha_nacimiento != "")
    {
        if((var_fecha_nacimiento.length)<10){
            bandera_campo_requerido = 1;
            document.getElementById("input_fecha_nacimiento").style.border= "3px solid "+color_1_error;
            document.getElementById("alerta_fecha_nacimiento").style.display = "block";
        }else{
            if(isNaN(validar_fecha)){
                bandera_campo_requerido = 1;
                document.getElementById("input_fecha_nacimiento").style.border= "3px solid "+color_1_error;
                document.getElementById("alerta_fecha_nacimiento").style.display = "block";
            }
        }
    }
    
    
    if((document.getElementById("input_contrasena_1").value).length < 8)
    {
        bandera_campo_requerido = 1;
        document.getElementById("input_contrasena_1").style.border= "3px solid "+color_1_error;
        document.getElementById("alerta_contrasena_1").style.display = "block";
    }
    if((document.getElementById("input_contrasena_2").value) != (document.getElementById("input_contrasena_1").value))
    {
        bandera_campo_requerido = 1;
        document.getElementById("input_contrasena_2").style.border= "3px solid "+color_1_error;
        document.getElementById("alerta_contrasena_2").style.display = "block";
    }

    if(bandera_campo_requerido==0){
        funcion_verificar_numero_documento_guardar();
    }else{
        document.getElementById("contenido_esperar").style.display = "none";        
        document.getElementById("modal_pp").style.display = "none";
        document.getElementById("alerta_general").style.display = "block";
    }
}




function funcion_verificar_numero_documento_guardar(){
    
    var parametros_rp = {
        "tipo": "budper",
        "parametro":  document.getElementById("input_numero_documento").value,
        "id_personal": ""
    };
    $.ajax({ 
        data: parametros_rp,
        url: "busqueda_rapida.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response=="1" || ((document.getElementById("input_numero_documento").value).replaceAll(" ","").replaceAll("-","")).length < 9 ){
                document.getElementById("input_numero_documento").style.animationName = "none";
                document.getElementById("input_numero_documento").style.border= "3px solid "+color_1_error;
                //existe_numero_documento ="1";
                if(((document.getElementById("input_numero_documento").value).replaceAll(" ","").replaceAll("-","")).length < 9)
                {
                    document.getElementById("alerta_numero_documento_2").style.display = "block";
                }else{
                    document.getElementById("alerta_numero_documento").style.display = "block";
                }
                document.getElementById("contenido_esperar").style.display = "none";        
                document.getElementById("modal_pp").style.display = "none";
                document.getElementById("alerta_general").style.display = "block";
            }else{
                document.getElementById("input_numero_documento").style.animationName = "none";
                document.getElementById("alerta_numero_documento").style.display = "none";
                document.getElementById("alerta_numero_documento_2").style.display = "none";
                document.getElementById("input_numero_documento").style.border= "3px solid "+color_1_formulario;
                funcion_verificar_nombre_usuario_guardar();
            }            
        }
    });
};

function funcion_verificar_nombre_usuario_guardar(){
    
    var parametros_rp = {
        "tipo": "bnu",
        "id_personal": "",
        "parametro":  document.getElementById("input_usuario").value,
        "permisos": 1
    };
    $.ajax({ 
        data: parametros_rp,
        url: "busqueda_rapida.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response=="1" || ((document.getElementById("input_usuario").value).replaceAll(" ","")).length < 4 ){
                document.getElementById("input_usuario").style.animationName = "none";
                document.getElementById("input_usuario").style.border= "3px solid "+color_1_error;
                //existe_numero_documento ="1";
                if(((document.getElementById("input_usuario").value).replaceAll(" ","").replaceAll("-","")).length < 4)
                {
                    document.getElementById("alerta_usuario_2").style.display = "block";
                }else{
                    document.getElementById("alerta_usuario").style.display = "block";
                }
                document.getElementById("contenido_esperar").style.display = "none";        
                document.getElementById("modal_pp").style.display = "none";
                document.getElementById("alerta_general").style.display = "block";
            }else{
                document.getElementById("input_usuario").style.animationName = "none";
                document.getElementById("alerta_usuario").style.display = "none";
                document.getElementById("alerta_usuario_2").style.display = "none";
                document.getElementById("input_usuario").style.border= "3px solid "+color_1_formulario;
                document.getElementById("contenido_esperar").style.display = "none";
                document.getElementById("confirmar_guardado").style.display = "inline-block";
            }            
        }
    });
};
document.getElementById("boton_confirmar_cancelar_pp").onclick = function(){
    document.getElementById("confirmar_guardado").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
};

document.getElementById("boton_confirmar_aceptar_pp").onclick = function(){
    document.getElementById("confirmar_guardado").style.display = "none";
    document.getElementById("contenido_esperar").style.display = "inline-block";
    guardar_datos_personal();
};
function guardar_datos_personal(){
    var input_habilitado_guard= "1";
    if(document.getElementById("input_habilitado").checked == false){
        input_habilitado_guard= "0";
    }
    var parametros_rp = {
        "tipo": "gnuper",
        "id_personal": "",
        "habilitado": input_habilitado_guard,
        "tipo_documento": document.getElementById("input_tipo_documento").value,
        "numero_documento": (document.getElementById("input_numero_documento").value).replaceAll(" ","").replaceAll("-",""),
        "nombre_1": document.getElementById("input_nombre_1").value,
        "nombre_2": document.getElementById("input_nombre_2").value,
        "apellido_1": document.getElementById("input_apellido_1").value,
        "apellido_2": document.getElementById("input_apellido_2").value,
        "sexo": document.getElementById("input_sexo").value,
        "correo": document.getElementById("input_correo").value,
        "contrasena_usuario": document.getElementById("input_contrasena_1").value,
        "telefono_1": document.getElementById("input_telefono_1").value,
        "telefono_2": document.getElementById("input_telefono_2").value,
        "fecha_nacimiento": document.getElementById("input_fecha_nacimiento").value,
        "cargo": document.getElementById("input_cargo").value,
        "especialidad": document.getElementById("input_especialidad").value,
        "usuario": document.getElementById("input_usuario").value
    };
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){ 
            if(response == "1"){
                document.getElementById("label_mensaje_alerta_superior_rpa").innerHTML = "REGISTRO CON EXITO";
            }else{
                document.getElementById("label_mensaje_alerta_superior_rpa").innerHTML = "FALLO REGISTRO";
            }

                

                
                document.getElementById("mensaje_alerta").style.display = "inline-block";  
                
     
        }
    });
};
document.getElementById("boton_alerta_aceptar_pp").onclick = function(){
    document.getElementById("mensaje_alerta").style.display = "none"; 
    formato_varios();
    funcion_verificar_numero_documento();
    funcion_verificar_nombre_usuario();
    document.getElementById("contenido_esperar").style.display = "inline-block"; 
    document.getElementById("alerta_general").style.display = "none";
};


document.getElementById("ocultar_contrasena_1").onclick = function(){
    document.getElementById("ocultar_contrasena_1").style.display = "none";
    document.getElementById("mostrar_contrasena_1").style.display = "block";
    document.getElementById("input_contrasena_1").type = "text";  
};
document.getElementById("mostrar_contrasena_1").onclick = function(){
    document.getElementById("mostrar_contrasena_1").style.display = "none";
    document.getElementById("ocultar_contrasena_1").style.display = "block";   
    document.getElementById("input_contrasena_1").type = "password";    
};
document.getElementById("ocultar_contrasena_2").onclick = function(){
    document.getElementById("ocultar_contrasena_2").style.display = "none";   
    document.getElementById("mostrar_contrasena_2").style.display = "block"; 
    document.getElementById("input_contrasena_2").type = "text"; 
};
document.getElementById("mostrar_contrasena_2").onclick = function(){
    document.getElementById("mostrar_contrasena_2").style.display = "none";  
    document.getElementById("ocultar_contrasena_2").style.display = "block";   
    document.getElementById("input_contrasena_2").type = "password";      
};

