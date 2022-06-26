var id_paciente = sessionStorage.getItem('id_paciente');


var datos_paciente = [];
function listado_de_provincia_espera(){
    if(document.getElementById("input_provincia_rpa").value == ""){
        document.getElementById("input_canton_rpa").disabled = true;
        $(".limpiar_select").detach();
        document.getElementById("contenido_esperar").style.display = "none";
        document.getElementById("modal_pp").style.display = "none";
    }else
    {
        document.getElementById("input_canton_rpa").disabled = false;
        var parametros_rp = {
            "tipo": "pr",
            "provincia": document.getElementById("input_provincia_rpa").value
        };
        $.ajax({ 
            data: parametros_rp,
            url: "informacion_varia.php", 
            type: "POST",
            beforeSend: function (){
            },
            success:function (response){
                $(".limpiar_select").detach();
                $("#input_canton_rpa").append(response);

                if(datos_paciente["provincia"]!=""){
                    document.getElementById("input_canton_rpa").value = datos_paciente["canton"];
                }
                document.getElementById("contenido_esperar").style.display = "none";
                document.getElementById("modal_pp").style.display = "none";

            }
        });
    }
  }


function extraer_datos_paciente_espera(){
    var parametros_rp = {
        "tipo": "exdpa",
        "id": id_paciente
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
                    document.getElementById("input_tipo_documento_rpa").value = datos_paciente["tipo_documento"];
                    if(datos_paciente["tipo_documento"]=="Cédula"&&datos_paciente["numero_documento"].length >= 10){
                        datos_paciente["numero_documento"] = (datos_paciente["numero_documento"].substr(0, 9))+"-"+(datos_paciente["numero_documento"].substr(9, 1)); 
                        document.getElementById("input_numero_documento_rpa").value = datos_paciente["numero_documento"];
                    }
                    else{
                        document.getElementById("input_numero_documento_rpa").value = datos_paciente["numero_documento"];
                    }
                    document.getElementById("input_provincia_rpa").value = datos_paciente["provincia"];
                    document.getElementById("input_nombre_1_rpa").value = datos_paciente["nombre_1"];
                    document.getElementById("input_nombre_2_rpa").value = datos_paciente["nombre_2"];
                    document.getElementById("input_apellido_1_rpa").value = datos_paciente["apellido_1"];
                    document.getElementById("input_apellido_2_rpa").value = datos_paciente["apellido_2"];
                    document.getElementById("input_sexo_rpa").value = datos_paciente["sexo"];
                    document.getElementById("input_correo_rpa").value = datos_paciente["correo"];
                    document.getElementById("input_telefono_1_rpa").value = datos_paciente["telefono_1"];
                    document.getElementById("input_telefono_2_rpa").value = datos_paciente["telefono_2"];
                    document.getElementById("input_fecha_nacimiento_rpa").value = datos_paciente["fecha_nacimiento"];
                    document.getElementById("input_direccion_rpa").value = datos_paciente["direccion"];
                    document.getElementById("input_ocupacion_rpa").value = datos_paciente["ocupacion"];
                    listado_de_provincia_espera();
                }
            }
        }
    });
}
document.getElementById("modal_pp").style.display = "block";
document.getElementById("contenido_esperar").style.display = "inline-block";
extraer_datos_paciente_espera();



/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
automatico formulario
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
let fecha_actual = new Date();
$( function() {
    $( "#input_fecha_nacimiento_rpa" ).datepicker({
        showButtonPanel: true,
        closeText: "Cerrar",
        currentText: "Hoy",
        dateFormat: "yy-mm-dd",
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        maxDate: new Date((fecha_actual.getFullYear()),(fecha_actual.getMonth()),(fecha_actual.getDate())),
        prevText: '<Ant'
    });
    $( "#input_fecha_nacimiento_rpa" ).datepicker( "option", "showAnim", "slideDown" );
  } );


  var input_canton_rpa = document.getElementById("input_canton_rpa");
  var input_provincia_rpa = document.getElementById("input_provincia_rpa");


  input_provincia_rpa.addEventListener('change', (event) => {
    if(input_provincia_rpa.value == ""){
        input_canton_rpa.disabled = true;
        $(".limpiar_select").detach();
    }else
    {
        input_canton_rpa.disabled = false;
        var parametros_rp = {
            "tipo": "pr",
            "provincia": input_provincia_rpa.value
        };
        $.ajax({ 
            data: parametros_rp,
            url: "informacion_varia.php", 
            type: "POST",
            beforeSend: function (){
            },
            success:function (response){
                $(".limpiar_select").detach();
                $("#input_canton_rpa").append(response);
            }
        });
    }
});

var input_numero_documento_rpa = document.getElementById("input_numero_documento_rpa");
var existe_numero_documento ="0";
function funcion_verificar_numero_documento(){
    
    var parametros_rp = {
        "tipo": "bndp",
        "parametro":  document.getElementById("input_numero_documento_rpa").value,
        "id_paciente": id_paciente
    };
    $.ajax({ 
        data: parametros_rp,
        url: "busqueda_rapida.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response=="1" || ((document.getElementById("input_numero_documento_rpa").value).replaceAll(" ","").replaceAll("-","")).length < 9 ){
                document.getElementById("input_numero_documento_rpa").style.animationName = "none";
                document.getElementById("input_numero_documento_rpa").style.border= "3px solid "+color_1_error;
                existe_numero_documento ="1";
                if(((document.getElementById("input_numero_documento_rpa").value).replaceAll(" ","").replaceAll("-","")).length < 9)
                {
                    document.getElementById("alerta_numero_documento_2_rpa").style.display = "block";
                }else{
                    document.getElementById("alerta_numero_documento_rpa").style.display = "block";

                }
                
            }else{
                document.getElementById("input_numero_documento_rpa").style.animationName = "none";
                document.getElementById("alerta_numero_documento_rpa").style.display = "none";
                document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
                document.getElementById("input_numero_documento_rpa").style.border= "3px solid "+color_1_formulario;
                existe_numero_documento ="0";
            }            
        }
    });
};



$( "#input_numero_documento_rpa").blur(function() {
    document.getElementById("input_numero_documento_rpa").style.animationName = "anim";
    document.getElementById("input_numero_documento_rpa").style.animationDuration = "300ms";
    document.getElementById("input_numero_documento_rpa").style.animationIterationCount = "infinite";
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
    document.getElementById("alerta_numero_documento_rpa").style.display = "none";
    funcion_verificar_numero_documento();
});
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
ajusatar fecha en input
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
$(document).ready(function(){
    $('#input_fecha_nacimiento_rpa').mask('####-##-##')
});
$(document).ready(function(){
    $('#input_telefono_1_rpa').mask('###-###-#### #####')
});
$(document).ready(function(){
    $('#input_numero_documento_rpa').mask('#########-#')
});
$(document).ready(function(){
    $('#input_telefono_2_rpa').mask('###-###-####')
});
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
verificar formulario
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*var input_numero_documento_rpa = document.getElementById("input_numero_documento_rpa");
var input_nombre_1_rpa = document.getElementById("input_nombre_1_rpa");
var input_nombre_2_rpa = document.getElementById("input_nombre_2_rpa");
var input_apellido_1_rpa = document.getElementById("input_apellido_1_rpa");
var input_apellido_2_rpa = document.getElementById("input_apellido_2_rpa");
var input_sexo_rpa = document.getElementById("input_sexo_rpa");
var input_telefono_1_rpa = document.getElementById("input_telefono_1_rpa");
var input_fecha_nacimiento_rpa = document.getElementById("input_fecha_nacimiento_rpa");
var input_tipo_documento_rpa = document.getElementById("input_tipo_documento_rpa");
var input_correo_rpa = document.getElementById("input_correo_rpa");
var input_telefono_2_rpa = document.getElementById("input_telefono_2_rpa");
var input_ocupacion_rpa = document.getElementById("input_ocupacion_rpa");
var input_direccion_rpa = document.getElementById("input_direccion_rpa");
var alerta_fecha_nacimiento_rpa = document.getElementById("alerta_fecha_nacimiento_rpa");
var alerta_telefono_1_rpa = document.getElementById("alerta_telefono_1_rpa");
*/
function funcion_verificar_numero_documento_guardar(){
    var parametros_rp = {
        "tipo": "bndp",
        "parametro":  document.getElementById("input_numero_documento_rpa").value,
        "id_paciente": id_paciente
    };
    $.ajax({ 
        data: parametros_rp,
        url: "busqueda_rapida.php", 
        type: "POST",
        beforeSend: function (){
        },
        success:function (response){
            if(response=="1" || ((document.getElementById("input_numero_documento_rpa").value).replaceAll(" ","").replaceAll("-","")).length < 9 ){
                document.getElementById("input_numero_documento_rpa").style.animationName = "none";
                document.getElementById("input_numero_documento_rpa").style.border= "3px solid "+color_1_error;
                existe_numero_documento ="1";
                document.getElementById("alerta_general_rpa").style.display = "flex";
                if(((document.getElementById("input_numero_documento_rpa").value).replaceAll(" ","").replaceAll("-","")).length < 9)
                {
                    document.getElementById("alerta_numero_documento_2_rpa").style.display = "block";
                }else{
                    document.getElementById("alerta_numero_documento_rpa").style.display = "block";
    
                }
                
                document.getElementById("contenido_esperar").style.display = "none";
                document.getElementById("modal_pp").style.display = "none";
                document.getElementById("alerta_general_rpa").style.display = "flex";
            }else{
                
                document.getElementById("alerta_general_rpa").style.display = "none";
                document.getElementById("input_numero_documento_rpa").style.animationName = "none";
                document.getElementById("alerta_numero_documento_rpa").style.display = "none";
                document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
                document.getElementById("input_numero_documento_rpa").style.border= "3px solid "+color_1_formulario;
                existe_numero_documento ="0";
                document.getElementById("contenido_esperar").style.display = "none";
                document.getElementById("contenido_confirmar_rpa").style.display = "inline-block";

                

            }            
        }
    });
}

var bandera = "no";
function guardar_nuevo_paciente(){ 
    /*document.getElementById("input_numero_documento_rpa").style.animationName = "anim";
    document.getElementById("input_numero_documento_rpa").style.animationDuration = "300ms";
    document.getElementById("input_numero_documento_rpa").style.animationIterationCount = "infinite";
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
    document.getElementById("alerta_numero_documento_rpa").style.display = "none";*/
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar").style.display = "inline-block";

    bandera = "no";
    if( (document.getElementById("input_numero_documento_rpa").value).length < 11){        
        bandera = "si";
        document.getElementById("input_numero_documento_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_numero_documento_2_rpa").style.display = "flex";
    }else {
        document.getElementById("input_numero_documento_rpa").style.border= "3px solid #787ff6";
        document.getElementById("alerta_numero_documento_rpa").style.display = "none";
        document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
    }
    if((document.getElementById("input_nombre_1_rpa").value)=="")  {
        bandera = "si";
        document.getElementById("input_nombre_1_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_nombre_1_rpa").style.display = "flex";
    }else {
        document.getElementById("input_nombre_1_rpa").style.border= "3px solid #787ff6";
        document.getElementById("alerta_nombre_1_rpa").style.display = "none";
    }
    if((document.getElementById("input_apellido_1_rpa").value)=="")    {
        bandera = "si";
        document.getElementById("input_apellido_1_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_apellido_1_rpa").style.display = "flex";
    }else    {
        document.getElementById("input_apellido_1_rpa").style.border= "3px solid #787ff6";
        document.getElementById("alerta_apellido_1_rpa").style.display = "none";
    }
    if((document.getElementById("input_sexo_rpa").value)=="")    {
        bandera = "si";
        document.getElementById("input_sexo_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_sexo_rpa").style.display = "flex";
    }else    {
        document.getElementById("input_sexo_rpa").style.border= "3px solid #787ff6";
        document.getElementById("alerta_sexo_rpa").style.display = "none";
    }
    if(((document.getElementById("input_telefono_1_rpa").value).replaceAll("-","").replaceAll(" ",""))==""||(((document.getElementById("input_telefono_1_rpa").value).replaceAll("-","").replaceAll(" ","")).length)<9) {
        bandera = "si";
        document.getElementById("input_telefono_1_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_telefono_1_rpa").style.display = "flex";
    }else {
        document.getElementById("input_telefono_1_rpa").style.border= "3px solid #787ff6";
        document.getElementById("alerta_telefono_1_rpa").style.display = "none";
    }
    let validar_fecha = Date.parse(document.getElementById("input_fecha_nacimiento_rpa").value);
    if (isNaN(validar_fecha) || (document.getElementById("input_fecha_nacimiento_rpa").value).length < 10) {
        bandera = "si";
        document.getElementById("input_fecha_nacimiento_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_fecha_nacimiento_rpa").style.display = "flex";
    }else{
        document.getElementById("input_fecha_nacimiento_rpa").style.border= "3px solid #787ff6";
        document.getElementById("alerta_fecha_nacimiento_rpa").style.display = "none";
    }

    if(bandera =="no") {
      funcion_verificar_numero_documento_guardar();

    }else{
      document.getElementById("contenido_esperar").style.display = "none";
      document.getElementById("modal_pp").style.display = "none";
    }
};

document.getElementById("ejecutar_guardar_inferior_rpa").onclick = function(){
    guardar_nuevo_paciente();
};
document.getElementById("ejecutar_guardar_rpa").onclick = function(){
    guardar_nuevo_paciente();
};



function formato_tipo_documento(){
    if((document.getElementById("input_tipo_documento_rpa").value)=="Cédula")
    {
        $(document).ready(function(){
            $('#input_numero_documento_rpa').mask('#########-#')
        });
    }
    if((document.getElementById("input_tipo_documento_rpa").value)=="Pasaporte")
    {
        $(document).ready(function(){
            $('#input_numero_documento_rpa').mask('AAAA AAAA AAA')
        });
    }
}
document.getElementById("input_tipo_documento_rpa").addEventListener('change', (event) => {
    formato_tipo_documento();
});

document.getElementById("input_numero_documento_rpa").onclick = function(){
    document.getElementById("input_numero_documento_rpa").style.border= "3px solid #787ff6";
    document.getElementById("alerta_general_rpa").style.display = "none";
    document.getElementById("alerta_numero_documento_rpa").style.display = "none";
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
    formato_tipo_documento();
};
document.getElementById("input_numero_documento_rpa").addEventListener('keydown', (event) => {
    formato_tipo_documento();
});
document.getElementById("input_numero_documento_rpa").addEventListener('keyup', (event) => {
    formato_tipo_documento();
});

function restablecer_input_nombre_1_rpa(){
    document.getElementById("input_nombre_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("alerta_general_rpa").style.display = "none";
    document.getElementById("alerta_nombre_1_rpa").style.display = "none";
}
document.getElementById("input_nombre_1_rpa").onclick = function(){
    restablecer_input_nombre_1_rpa();
};
document.getElementById("input_nombre_1_rpa").addEventListener('keyup', (event) => {
    restablecer_input_nombre_1_rpa();
});
document.getElementById("input_nombre_1_rpa").addEventListener('keydown', (event) => {
    restablecer_input_nombre_1_rpa();
});


function restablecer_input_apellido_1_rpa(){
    document.getElementById("input_apellido_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("alerta_general_rpa").style.display = "none";
    document.getElementById("alerta_apellido_1_rpa").style.display = "none";
}
document.getElementById("input_apellido_1_rpa").onclick = function(){
    restablecer_input_apellido_1_rpa();
};
document.getElementById("input_apellido_1_rpa").addEventListener('keyup', (event) => {
    restablecer_input_apellido_1_rpa();
});
document.getElementById("input_apellido_1_rpa").addEventListener('keydown', (event) => {
    restablecer_input_apellido_1_rpa();
});





function restablecer_input_telefono_1_rpa(){
    document.getElementById("input_telefono_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("alerta_general_rpa").style.display = "none";
    document.getElementById("alerta_telefono_1_rpa").style.display = "none";
}
document.getElementById("input_telefono_1_rpa").onclick = function(){
    restablecer_input_telefono_1_rpa();
};
document.getElementById("input_telefono_1_rpa").addEventListener('keyup', (event) => {
    restablecer_input_telefono_1_rpa();
});
document.getElementById("input_telefono_1_rpa").addEventListener('keydown', (event) => {
    restablecer_input_telefono_1_rpa();
});




function restablecer_input_sexo_rpa(){
    document.getElementById("input_sexo_rpa").style.border= "3px solid #787ff6";
    document.getElementById("alerta_general_rpa").style.display = "none";
    document.getElementById("alerta_sexo_rpa").style.display = "none";
}
document.getElementById("input_sexo_rpa").onclick = function(){
    restablecer_input_sexo_rpa();
};
document.getElementById("input_sexo_rpa").addEventListener('keyup', (event) => {
    restablecer_input_sexo_rpa();
});
document.getElementById("input_sexo_rpa").addEventListener('keydown', (event) => {
    restablecer_input_sexo_rpa();
});


function restablecer_input_fecha_nacimiento_rpa(){
    document.getElementById("input_fecha_nacimiento_rpa").style.border= "3px solid #787ff6";
    document.getElementById("alerta_general_rpa").style.display = "none";
    document.getElementById("alerta_fecha_nacimiento_rpa").style.display = "none";
}
document.getElementById("input_fecha_nacimiento_rpa").onclick = function(){
    restablecer_input_fecha_nacimiento_rpa();
};
document.getElementById("input_fecha_nacimiento_rpa").addEventListener('keyup', (event) => {
    restablecer_input_fecha_nacimiento_rpa();
});
document.getElementById("input_fecha_nacimiento_rpa").addEventListener('keydown', (event) => {
    restablecer_input_fecha_nacimiento_rpa();
});







document.getElementById("boton_confirmar_cancelar_rpa").onclick = function(){
    document.getElementById("contenido_confirmar_rpa").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";
};
document.getElementById("boton_alerta_cofirmar_rpa").onclick = function(){
    document.getElementById("mensaje_alerta_rpa").style.display = "none";
    document.getElementById("modal_pp").style.display = "none";

    document.getElementById("input_numero_documento_rpa").style.animationName = "anim";
    document.getElementById("input_numero_documento_rpa").style.animationDuration = "300ms";
    document.getElementById("input_numero_documento_rpa").style.animationIterationCount = "infinite";
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
    document.getElementById("alerta_numero_documento_rpa").style.display = "none";
    funcion_verificar_numero_documento();
}; 
function regresar_inputs_normalidad_rp(){

    document.getElementById("input_numero_documento_rpa").style.border= "3px solid #787ff6";
    document.getElementById("input_nombre_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("input_apellido_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("input_sexo_rpa").style.border= "3px solid #787ff6";
    document.getElementById("input_telefono_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("input_fecha_nacimiento_rpa").style.border= "3px solid #787ff6";


    document.getElementById("alerta_numero_documento_rpa").style.display = "none";
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
    document.getElementById("alerta_nombre_1_rpa").style.display= "none";
    document.getElementById("alerta_apellido_1_rpa").style.display= "none";
    document.getElementById("alerta_sexo_rpa").style.display= "none";
    document.getElementById("alerta_telefono_1_rpa").style.display = "none";
    document.getElementById("alerta_fecha_nacimiento_rpa").style.display = "none";


    document.getElementById("alerta_general_rpa").style.display = "none";
    document.getElementById("input_numero_documento_rpa").value = "";
    document.getElementById("input_nombre_1_rpa").value = "";
    document.getElementById("input_nombre_2_rpa").value = "";
    document.getElementById("input_apellido_1_rpa").value = "";
    document.getElementById("input_apellido_2_rpa").value = "";
    document.getElementById("input_correo_rpa").value = "";
    document.getElementById("input_telefono_1_rpa").value = "";
    document.getElementById("input_telefono_2_rpa").value = "";
    document.getElementById("input_fecha_nacimiento_rpa").value = "";
    document.getElementById("input_ocupacion_rpa").value = "";
    document.getElementById("input_direccion_rpa").value = "";
    document.getElementById("input_provincia_rpa").item(0).selected = 'selected';
    document.getElementById("input_sexo_rpa").item(0).selected = 'selected';
    document.getElementById("input_tipo_documento_rpa").item(0).selected = 'selected';
    $(document).ready(function(){
        $('#input_numero_documento_rpa').mask('#########-#')
    });
    document.getElementById("input_canton_rpa").disabled = true;
    $(".limpiar_select").detach();
}

document.getElementById("boton_confirmar_cofirmar_rpa").onclick = function(){
    document.getElementById("contenido_confirmar_rpa").style.display = "none";
    document.getElementById("contenido_esperar").style.display = "inline-block";

    var parametros_rp = {
        "tipo": "gedp", //"tipo": "rpa",
        "id_paciente": id_paciente,
        "tipo_documento": document.getElementById("input_tipo_documento_rpa").value,
        "numero_documento": document.getElementById("input_numero_documento_rpa").value.replace("-", ""),
        "nombre_1": document.getElementById("input_nombre_1_rpa").value,
        "nombre_2": document.getElementById("input_nombre_2_rpa").value,
        "apellido_1": document.getElementById("input_apellido_1_rpa").value,
        "apellido_2": document.getElementById("input_apellido_2_rpa").value,
        "sexo": document.getElementById("input_sexo_rpa").value,
        "correo": document.getElementById("input_correo_rpa").value,
        "telefono_1": document.getElementById("input_telefono_1_rpa").value,
        "telefono_2": document.getElementById("input_telefono_2_rpa").value,
        "fecha_nacimiento": document.getElementById("input_fecha_nacimiento_rpa").value,
        "provincia": document.getElementById("input_provincia_rpa").value,
        "canton": document.getElementById("input_canton_rpa").value,
        "direccion": document.getElementById("input_direccion_rpa").value,
        "ocupacion": document.getElementById("input_ocupacion_rpa").value 
    };
    
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
            
        },
        success:function (response){
            document.getElementById("contenido_esperar").style.display =  "none";
            document.getElementById("label_mensaje_alerta_superior_rpa").innerHTML=response;
            if(response == "Registro con exitó")
            {
                registro = "exito";
            }else{
                registro = "";
            }
            document.getElementById("mensaje_alerta_rpa").style.display = "inline-block"; 
        },
        error : function(xhr, status) {
            document.getElementById("contenido_esperar").style.display =  "none";
            document.getElementById("label_mensaje_alerta_superior_rpa").innerHTML="Error, No fue posible conectarse a la base de datos.";
            document.getElementById("mensaje_alerta_rpa").style.display = "inline-block";
        }
    });
};

document.getElementById("ejecutar_borrar_todo_rpa").onclick = function(){
    regresar_inputs_normalidad_rp();
};

document.getElementById("restablecer_tipo_documento").onclick = function(){
    document.getElementById("input_tipo_documento_rpa").value = datos_paciente["tipo_documento"];
};
document.getElementById("restablecer_numero_documento").onclick = function(){
    document.getElementById("input_numero_documento_rpa").value = datos_paciente["numero_documento"];
};
document.getElementById("restablecer_nombre_1").onclick = function(){
    document.getElementById("input_nombre_1_rpa").value = datos_paciente["nombre_1"];
};
document.getElementById("restablecer_nombre_2").onclick = function(){
    document.getElementById("input_nombre_2_rpa").value = datos_paciente["nombre_2"];
};
document.getElementById("restablecer_apellido_1").onclick = function(){
    document.getElementById("input_apellido_1_rpa").value = datos_paciente["apellido_1"];
};
document.getElementById("restablecer_apellido_2").onclick = function(){
    document.getElementById("input_apellido_2_rpa").value = datos_paciente["apellido_2"];
};
document.getElementById("restablecer_sexo").onclick = function(){
    document.getElementById("input_sexo_rpa").value = datos_paciente["sexo"];
};
document.getElementById("restablecer_correo").onclick = function(){
    document.getElementById("input_correo_rpa").value = datos_paciente["correo"];
};
document.getElementById("restablecer_telefono_1").onclick = function(){
    document.getElementById("input_telefono_1_rpa").value = datos_paciente["telefono_1"];
};
document.getElementById("restablecer_telefono_2").onclick = function(){
    document.getElementById("input_telefono_2_rpa").value = datos_paciente["telefono_2"];
};
document.getElementById("restablecer_fecha_nacimiento").onclick = function(){
    document.getElementById("input_fecha_nacimiento_rpa").value = datos_paciente["fecha_nacimiento"];
};
document.getElementById("restablecer_ocupacion").onclick = function(){
    document.getElementById("input_ocupacion_rpa").value = datos_paciente["ocupacion"];
};
document.getElementById("restablecer_direccion").onclick = function(){
    document.getElementById("input_direccion_rpa").value = datos_paciente["direccion"];
};


document.getElementById("restablecer_provincia").onclick = function(){
    document.getElementById("input_provincia_rpa").value = datos_paciente["provincia"];
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar").style.display = "inline-block";
    listado_de_provincia_espera();
};
document.getElementById("restablecer_canton").onclick = function(){
    document.getElementById("input_provincia_rpa").value = datos_paciente["provincia"];
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar").style.display = "inline-block";
    listado_de_provincia_espera();
};

document.getElementById("ejecutar_restablecer_rpa").onclick = function(){
    regresar_inputs_normalidad_rp();
    document.getElementById("modal_pp").style.display = "block";
    document.getElementById("contenido_esperar").style.display = "inline-block";

    document.getElementById("input_tipo_documento_rpa").value = datos_paciente["tipo_documento"];
    document.getElementById("input_numero_documento_rpa").value = datos_paciente["numero_documento"];
    document.getElementById("input_nombre_1_rpa").value = datos_paciente["nombre_1"];
    document.getElementById("input_nombre_2_rpa").value = datos_paciente["nombre_2"];
    document.getElementById("input_apellido_1_rpa").value = datos_paciente["apellido_1"];
    document.getElementById("input_apellido_2_rpa").value = datos_paciente["apellido_2"];
    document.getElementById("input_sexo_rpa").value = datos_paciente["sexo"];
    document.getElementById("input_correo_rpa").value = datos_paciente["correo"];
    document.getElementById("input_telefono_1_rpa").value = datos_paciente["telefono_1"];
    document.getElementById("input_telefono_2_rpa").value = datos_paciente["telefono_2"];
    document.getElementById("input_fecha_nacimiento_rpa").value = datos_paciente["fecha_nacimiento"];
    document.getElementById("input_direccion_rpa").value = datos_paciente["direccion"];
    document.getElementById("input_ocupacion_rpa").value = datos_paciente["ocupacion"];

    
    document.getElementById("input_provincia_rpa").value = datos_paciente["provincia"];
    listado_de_provincia_espera();
};