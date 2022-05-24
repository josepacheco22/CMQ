/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
automatico formulario
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var id_paciente = sessionStorage.getItem('id_paciente');


function cargar_lista_canton(){

    if(document.getElementById("input_provincia_rpa").value == ""){
        document.getElementById("input_canton_rpa").disabled = true;
        $(".limpiar_select").detach();
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
                if (document.getElementById("input_provincia_rpa").value==datos_paciente["provincia"]){
                    document.getElementById("input_canton_rpa").value = datos_paciente["canton"];
                }
            }
        });
    }
  }

var datos_paciente = [];
function extraer_datos_paciente(id_pacient){
    document.getElementById("modal").style.display = "block";
    document.getElementById("contenido_esperar").style.display = "inline-block";
    var parametros_rp = {
        "tipo": "exdpa",
        "id": id_pacient
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
                    document.getElementById("input_nombre_1_rpa").value = datos_paciente["nombre_1"];
                    document.getElementById("input_nombre_2_rpa").value = datos_paciente["nombre_2"];
                    document.getElementById("input_apellido_1_rpa").value = datos_paciente["apellido_1"];
                    document.getElementById("input_apellido_2_rpa").value = datos_paciente["apellido_2"];
                    document.getElementById("input_sexo_rpa").value = datos_paciente["sexo"];
                    document.getElementById("input_correo_rpa").value = datos_paciente["correo"];
                    document.getElementById("input_telefono_1_rpa").value = datos_paciente["telefono_1"];
                    document.getElementById("input_telefono_2_rpa").value = datos_paciente["telefono_2"];
                    document.getElementById("input_fecha_nacimiento_rpa").value = datos_paciente["fecha_nacimiento"];
                    if(datos_paciente["provincia"]!=""){
                        document.getElementById("input_provincia_rpa").value = datos_paciente["provincia"];
                        cargar_lista_canton();
                    }
                    document.getElementById("input_direccion_rpa").value = datos_paciente["direccion"];
                    document.getElementById("input_ocupacion_rpa").value = datos_paciente["ocupacion"];
                    document.getElementById("contenido_esperar").style.display = "none";
                    document.getElementById("modal").style.display = "none";
                }
            }
        }
    });
}
extraer_datos_paciente(id_paciente);


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

  document.getElementById("input_provincia_rpa").addEventListener('change', (event) => {
    cargar_lista_canton();
});


var existe_numero_documento ="0";
function funcion_verificar_numero_documento(){
    if((document.getElementById("input_numero_documento_rpa").value.replaceAll("-", '')).replaceAll(" ","") != datos_paciente["numero_documento"]){
        if(((document.getElementById("input_numero_documento_rpa").value.replaceAll("-", '')).replaceAll(" ",""))!=""){
            var parametros_rp = {
                "tipo": "bndpedp",
                "parametro": (document.getElementById("input_numero_documento_rpa").value.replaceAll("-", '')).replaceAll(" ",""),
                "id_paciente": id_paciente
            };
            $.ajax({ 
                data: parametros_rp,
                url: "busqueda_rapida.php",
                type: "POST",
                beforeSend: function (){
                },
                success:function (response){
                    var division_respuesta = response.split("/");
                    document.getElementById("input_numero_documento_rpa").style.border= division_respuesta[0];
                    existe_numero_documento = division_respuesta[1];
                    if(existe_numero_documento=="1")
                    {
                        document.getElementById("alerta_numero_documento_rpa").style.display = "block";
    
                    }else{
                        document.getElementById("alerta_numero_documento_rpa").style.display = "none";
                    }
                    
                }
            });
        }else{
            document.getElementById("input_numero_documento_rpa").style.border= "3px solid #787ff6";
            document.getElementById("alerta_numero_documento_rpa").style.display = "none";
            existe_numero_documento ="0";
        }
    }
};
document.getElementById("input_numero_documento_rpa").addEventListener('keyup', (event) => {
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
    $('#input_telefono_2_rpa').mask('###-###-###')
});
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
verificar formulario
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/





var bandera = "no";
function guardar_nuevo_paciente(){ 
    funcion_verificar_numero_documento();
    bandera = "no";
    var length_numero_documento = document.getElementById("input_numero_documento_rpa").value;
    if( length_numero_documento.length < 11){        
        bandera = "si";
        document.getElementById("input_numero_documento_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_numero_documento_2_rpa").style.display = "block";
    }else {
        document.getElementById("input_numero_documento_rpa").style.border= "3px solid #787ff6";
    }
    if((document.getElementById("input_nombre_1_rpa").value)=="")  {
        bandera = "si";
        document.getElementById("input_nombre_1_rpa").style.border= "3px solid #e24444";
    }else {
        document.getElementById("input_nombre_1_rpa").style.border= "3px solid #787ff6";
    }
    if((document.getElementById("input_apellido_1_rpa").value)=="")    {
        bandera = "si";
        document.getElementById("input_apellido_1_rpa").style.border= "3px solid #e24444";
    }else    {
        document.getElementById("input_apellido_1_rpa").style.border= "3px solid #787ff6";
    }
    if((document.getElementById("input_sexo_rpa").value)=="")    {
        bandera = "si";
        document.getElementById("input_sexo_rpa").style.border= "3px solid #e24444";
    }else    {
        document.getElementById("input_sexo_rpa").style.border= "3px solid #787ff6";
    }
    if((document.getElementById("input_telefono_1_rpa").value)==""||((document.getElementById("input_telefono_1_rpa").value).length)<12) {
        bandera = "si";
        document.getElementById("input_telefono_1_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_telefono_1_rpa").style.display = "block";
    }else {
        document.getElementById("input_telefono_1_rpa").style.border= "3px solid #787ff6";
    }
    let validar_fecha = Date.parse(document.getElementById("input_fecha_nacimiento_rpa").value);
    if (isNaN(validar_fecha)) {
        bandera = "si";
        document.getElementById("input_fecha_nacimiento_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_fecha_nacimiento_rpa").style.display = "block";
    }else{
        document.getElementById("input_fecha_nacimiento_rpa").style.border= "3px solid #787ff6";
    }
    var fecha_separada = document.getElementById("input_fecha_nacimiento_rpa").value.split("-");
    if(bandera =="no"&&existe_numero_documento=="0") {
        document.getElementById("label_confirmar_registro_tipo_documento").innerHTML=document.getElementById("input_tipo_documento_rpa").value;
        document.getElementById("label_confirmar_registro_numero_documento").innerHTML= document.getElementById("input_numero_documento_rpa").value;
        document.getElementById("label_confirmar_registro_nombres").innerHTML= document.getElementById("input_nombre_1_rpa").value+" "+document.getElementById("input_nombre_2_rpa").value;
        document.getElementById("label_confirmar_registro_apellidos").innerHTML = document.getElementById("input_apellido_1_rpa").value+" "+document.getElementById("input_apellido_2_rpa").value;
        document.getElementById("label_confirmar_registro_sexo").innerHTML=document.getElementById("input_sexo_rpa").value;
        document.getElementById("label_confirmar_registro_correo").innerHTML=document.getElementById("input_correo_rpa").value;
        document.getElementById("label_confirmar_registro_telefono").innerHTML=document.getElementById("input_telefono_1_rpa").value;
        document.getElementById("label_confirmar_registro_convencional").innerHTML=document.getElementById("input_telefono_2_rpa").value;
        document.getElementById("label_confirmar_registro_fecha_nacimiento").innerHTML = (fecha_separada[2]+"-"+fecha_separada[1]+"-"+fecha_separada[0]);
        document.getElementById("label_confirmar_registro_ocupacion").innerHTML=document.getElementById("input_ocupacion_rpa").value;
        document.getElementById("label_confirmar_registro_provincia").innerHTML=document.getElementById("input_provincia_rpa").value;
        document.getElementById("label_confirmar_registro_canton").innerHTML=document.getElementById("input_canton_rpa").value;
        document.getElementById("label_confirmar_registro_direccion").innerHTML=document.getElementById("input_direccion_rpa").value;
        document.getElementById("modal").style.display = "block";
        document.getElementById("contenido_confirmar_rpa").style.display = "inline-block";
    }else{
        document.getElementById("contenedor_alerta_general").style.display = "block";
    }
};

document.getElementById("ejecutar_guardar_inferior_rpa").onclick = function(){
    guardar_nuevo_paciente();
};
document.getElementById("ejecutar_guardar_rpa").onclick = function(){
    guardar_nuevo_paciente();
};


document.getElementById("input_tipo_documento_rpa").addEventListener('change', (event) => {
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
});
document.getElementById("input_numero_documento_rpa").addEventListener('keydown', (event) => {
    
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
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
});
document.getElementById("input_numero_documento_rpa").addEventListener('keyup', (event) => {
    document.getElementById("input_numero_documento_rpa").style.border= "3px solid #787ff6";
    document.getElementById("contenedor_alerta_general").style.display = "none";
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
});
document.getElementById("input_nombre_1_rpa").addEventListener('keyup', (event) => {
    document.getElementById("input_nombre_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("contenedor_alerta_general").style.display = "none";
});
document.getElementById("input_apellido_1_rpa").addEventListener('keyup', (event) => {
    document.getElementById("input_apellido_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("contenedor_alerta_general").style.display = "none";
});
document.getElementById("input_sexo_rpa").addEventListener('change', (event) => {
    document.getElementById("input_sexo_rpa").style.border= "3px solid #787ff6";
    document.getElementById("contenedor_alerta_general").style.display = "none";
});
input_telefono_1_rpa.addEventListener('keyup', (event) => {
    document.getElementById("input_telefono_1_rpa").style.border= "3px solid #787ff6";
    document.getElementById("contenedor_alerta_general").style.display = "none";
    document.getElementById("alerta_telefono_1_rpa").style.display = "none";
});
input_fecha_nacimiento_rpa.onclick = function(){
    document.getElementById("input_fecha_nacimiento_rpa").style.border= "3px solid #787ff6";
    document.getElementById("contenedor_alerta_general").style.display = "none";
    document.getElementById("alerta_fecha_nacimiento_rpa").style.display = "none";
};
input_fecha_nacimiento_rpa.addEventListener('keyup', (event) => {
    document.getElementById("input_fecha_nacimiento_rpa").style.border= "3px solid #787ff6";
    document.getElementById("contenedor_alerta_general").style.display = "none";
    document.getElementById("alerta_fecha_nacimiento_rpa").style.display = "none";
});
document.getElementById("boton_confirmar_cancelar_rpa").onclick = function(){
    document.getElementById("contenido_confirmar_rpa").style.display = "none";
    document.getElementById("modal").style.display = "none";
};
var registro = "";
document.getElementById("boton_alerta_cofirmar_rpa").onclick = function(){
    document.getElementById("mensaje_alerta_rpa").style.display = "none";
    document.getElementById("modal").style.display = "none";
    if(registro == "exito")
    {
        regresar_inputs_normalidad_rp();
        extraer_datos_paciente(id_paciente);
        registro = "";
    }
    funcion_verificar_numero_documento();
};

function regresar_inputs_normalidad_rp(){
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
    verificar_cookie();
    document.getElementById("contenido_confirmar_rpa").style.display = "none";
    document.getElementById("contenido_esperar").style.display = "inline-block";
    
    fecha_actual = new Date();
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
