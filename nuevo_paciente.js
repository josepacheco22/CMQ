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
    verificar_cookie();
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
            url: "consulta.php", 
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
    if((input_numero_documento_rpa.value)!=""){
        var parametros_rp = {
            "tipo": "bndp",
            "parametro": input_numero_documento_rpa.value.replace("-", '')
        };
        $.ajax({ 
            data: parametros_rp,
            url: "consulta.php", 
            type: "POST",
            beforeSend: function (){
            },
            success:function (response){
                var division_respuesta = response.split("/");
                input_numero_documento_rpa.style.border= division_respuesta[0];
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
        input_numero_documento_rpa.style.border= "3px solid #787ff6";
        document.getElementById("alerta_numero_documento_rpa").style.display = "none";
        existe_numero_documento ="0";
    }
};
input_numero_documento_rpa.addEventListener('keyup', (event) => {
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
var input_numero_documento_rpa = document.getElementById("input_numero_documento_rpa");
var input_nombre_1_rpa = document.getElementById("input_nombre_1_rpa");
var input_nombre_2_rpa = document.getElementById("input_nombre_2_rpa");
var input_apellido_1_rpa = document.getElementById("input_apellido_1_rpa");
var input_apellido_2_rpa = document.getElementById("input_apellido_2_rpa");
var input_sexo_rpa = document.getElementById("input_sexo_rpa");
var input_telefono_1_rpa = document.getElementById("input_telefono_1_rpa");
var input_fecha_nacimiento_rpa = document.getElementById("input_fecha_nacimiento_rpa");
var contenedor_alerta_general = document.getElementById("contenedor_alerta_general");
var input_tipo_documento_rpa = document.getElementById("input_tipo_documento_rpa");
var input_correo_rpa = document.getElementById("input_correo_rpa");
var input_telefono_2_rpa = document.getElementById("input_telefono_2_rpa");
var input_ocupacion_rpa = document.getElementById("input_ocupacion_rpa");
var input_direccion_rpa = document.getElementById("input_direccion_rpa");
var alerta_fecha_nacimiento_rpa = document.getElementById("alerta_fecha_nacimiento_rpa");
var alerta_telefono_1_rpa = document.getElementById("alerta_telefono_1_rpa");



var bandera = "no";
function guardar_nuevo_paciente(){ 
    funcion_verificar_numero_documento();
    bandera = "no";
    var length_numero_documento = document.getElementById("input_numero_documento_rpa").value;
    console.log(length_numero_documento.length);
    if( length_numero_documento.length < 11){        
        bandera = "si";
        document.getElementById("input_numero_documento_rpa").style.border= "3px solid #e24444";
        document.getElementById("alerta_numero_documento_2_rpa").style.display = "block";
    }else {
        document.getElementById("input_numero_documento_rpa").style.border= "3px solid #787ff6";
    }
    if((input_nombre_1_rpa.value)=="")  {
        bandera = "si";
        input_nombre_1_rpa.style.border= "3px solid #e24444";
    }else {
        input_nombre_1_rpa.style.border= "3px solid #787ff6";
    }
    if((input_apellido_1_rpa.value)=="")    {
        bandera = "si";
        input_apellido_1_rpa.style.border= "3px solid #e24444";
    }else    {
        input_apellido_1_rpa.style.border= "3px solid #787ff6";
    }
    if((input_sexo_rpa.value)=="")    {
        bandera = "si";
        input_sexo_rpa.style.border= "3px solid #e24444";
    }else    {
        input_sexo_rpa.style.border= "3px solid #787ff6";
    }
    if((input_telefono_1_rpa.value)==""||((input_telefono_1_rpa.value).length)<12) {
        bandera = "si";
        input_telefono_1_rpa.style.border= "3px solid #e24444";
        alerta_telefono_1_rpa.style.display = "block";
    }else {
        input_telefono_1_rpa.style.border= "3px solid #787ff6";
    }
    let validar_fecha = Date.parse(input_fecha_nacimiento_rpa.value);
    if (isNaN(validar_fecha)) {
        bandera = "si";
        input_fecha_nacimiento_rpa.style.border= "3px solid #e24444";
        alerta_fecha_nacimiento_rpa.style.display = "block";
    }else{
        input_fecha_nacimiento_rpa.style.border= "3px solid #787ff6";
    }
    var fecha_separada = input_fecha_nacimiento_rpa.value.split("-");
    /*
    if((input_fecha_nacimiento_rpa.value)==""||((input_fecha_nacimiento_rpa.value).length)<10) {
        bandera = "si";
        input_fecha_nacimiento_rpa.style.border= "3px solid #e24444";
        alerta_fecha_nacimiento_rpa.style.display = "block";
    }else{
        var fecha_separada = input_fecha_nacimiento_rpa.value.split("-");
        if(1980 < parseInt(fecha_separada[0]) && (parseInt(fecha_separada[2]))<=(fecha_actual.getFullYear())){
            var numero_mes=12;
            if( (parseInt(fecha_separada[0])) ==(fecha_actual.getFullYear())){
                numero_mes = fecha_actual.getMonth()+1;
            }
            if((parseInt(fecha_separada[1]))<=numero_mes){
                if((parseInt(fecha_separada[0]))==(fecha_actual.getFullYear())&&(parseInt(fecha_separada[1])) == numero_mes){
                    if((parseInt(fecha_separada[2]))>fecha_actual.getDate())
                    {
                        bandera = "si";
                        input_fecha_nacimiento_rpa.style.border= "3px solid #e24444";
                        alerta_fecha_nacimiento_rpa.style.display = "block";
                    }
                }
                else{
                    var diasMes = new Date((parseInt(fecha_separada[0])), (parseInt(fecha_separada[1])), 0).getDate();
                    if((parseInt(fecha_separada[2]))>diasMes){
                        bandera = "si";
                        input_fecha_nacimiento_rpa.style.border= "3px solid #e24444";
                        alerta_fecha_nacimiento_rpa.style.display = "block";
                    }
                }
            }else{
                bandera = "si";
                input_fecha_nacimiento_rpa.style.border= "3px solid #e24444";
                alerta_fecha_nacimiento_rpa.style.display = "block";
            }
        }else{
            bandera = "si";
            input_fecha_nacimiento_rpa.style.border= "3px solid #e24444";
            alerta_fecha_nacimiento_rpa.style.display = "block";
        }
    }
    */
    if(bandera =="no"&&existe_numero_documento=="0") {
        document.getElementById("label_confirmar_registro_tipo_documento").innerHTML=input_tipo_documento_rpa.value;
        document.getElementById("label_confirmar_registro_numero_documento").innerHTML= input_numero_documento_rpa.value;
        document.getElementById("label_confirmar_registro_nombres").innerHTML= input_nombre_1_rpa.value+" "+input_nombre_2_rpa.value;
        document.getElementById("label_confirmar_registro_apellidos").innerHTML = input_apellido_1_rpa.value+" "+input_apellido_2_rpa.value;
        document.getElementById("label_confirmar_registro_sexo").innerHTML=input_sexo_rpa.value;
        document.getElementById("label_confirmar_registro_correo").innerHTML=input_correo_rpa.value;
        document.getElementById("label_confirmar_registro_telefono").innerHTML=input_telefono_1_rpa.value;
        document.getElementById("label_confirmar_registro_convencional").innerHTML=input_telefono_2_rpa.value;
        document.getElementById("label_confirmar_registro_fecha_nacimiento").innerHTML = (fecha_separada[2]+"-"+fecha_separada[1]+"-"+fecha_separada[0]);
        document.getElementById("label_confirmar_registro_ocupacion").innerHTML=input_ocupacion_rpa.value;
        document.getElementById("label_confirmar_registro_provincia").innerHTML=input_provincia_rpa.value;
        document.getElementById("label_confirmar_registro_canton").innerHTML=input_canton_rpa.value;
        document.getElementById("label_confirmar_registro_direccion").innerHTML=input_direccion_rpa.value;
        document.getElementById("modal").style.display = "block";
        document.getElementById("contenido_confirmar_rpa").style.display = "inline-block";
    }else{
        contenedor_alerta_general.style.display = "block";
    }
};

document.getElementById("ejecutar_guardar_inferior_rpa").onclick = function(){
    guardar_nuevo_paciente();
};
document.getElementById("ejecutar_guardar_rpa").onclick = function(){
    guardar_nuevo_paciente();
};


input_tipo_documento_rpa.addEventListener('change', (event) => {
    if((input_tipo_documento_rpa.value)=="Cedula")
    {
        $(document).ready(function(){
            $('#input_numero_documento_rpa').mask('#########-#')
        });
    }
    if((input_tipo_documento_rpa.value)=="Pasaporte")
    {
        $(document).ready(function(){
            $('#input_numero_documento_rpa').mask('AAAA AAAA AAA')
        });
    }
});
input_numero_documento_rpa.addEventListener('keydown', (event) => {
    
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
    if((input_tipo_documento_rpa.value)=="Cedula")
    {
        $(document).ready(function(){
            $('#input_numero_documento_rpa').mask('#########-#')
        });
    }
    if((input_tipo_documento_rpa.value)=="Pasaporte")
    {
        $(document).ready(function(){
            $('#input_numero_documento_rpa').mask('AAAA AAAA AAA')
        });
    }
});
input_numero_documento_rpa.addEventListener('keyup', (event) => {
    input_numero_documento_rpa.style.border= "3px solid #787ff6";
    contenedor_alerta_general.style.display = "none";
    document.getElementById("alerta_numero_documento_2_rpa").style.display = "none";
});
input_nombre_1_rpa.addEventListener('keyup', (event) => {
    input_nombre_1_rpa.style.border= "3px solid #787ff6";
    contenedor_alerta_general.style.display = "none";
});
input_apellido_1_rpa.addEventListener('keyup', (event) => {
    input_apellido_1_rpa.style.border= "3px solid #787ff6";
    contenedor_alerta_general.style.display = "none";
});
input_sexo_rpa.addEventListener('change', (event) => {
    input_sexo_rpa.style.border= "3px solid #787ff6";
    contenedor_alerta_general.style.display = "none";
});
input_telefono_1_rpa.addEventListener('keyup', (event) => {
    input_telefono_1_rpa.style.border= "3px solid #787ff6";
    contenedor_alerta_general.style.display = "none";
    alerta_telefono_1_rpa.style.display = "none";
});
input_fecha_nacimiento_rpa.onclick = function(){
    input_fecha_nacimiento_rpa.style.border= "3px solid #787ff6";
    contenedor_alerta_general.style.display = "none";
    alerta_fecha_nacimiento_rpa.style.display = "none";
};
input_fecha_nacimiento_rpa.addEventListener('keyup', (event) => {
    input_fecha_nacimiento_rpa.style.border= "3px solid #787ff6";
    contenedor_alerta_general.style.display = "none";
    alerta_fecha_nacimiento_rpa.style.display = "none";
});
document.getElementById("boton_confirmar_cancelar_rpa").onclick = function(){
    document.getElementById("contenido_confirmar_rpa").style.display = "none";
    document.getElementById("modal").style.display = "none";
};
document.getElementById("boton_alerta_cofirmar_rpa").onclick = function(){
    document.getElementById("mensaje_alerta_rpa").style.display = "none";
    document.getElementById("modal").style.display = "none";
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
    input_provincia_rpa.item(0).selected = 'selected';
    input_sexo_rpa.item(0).selected = 'selected';
    input_tipo_documento_rpa.item(0).selected = 'selected';
    $(document).ready(function(){
        $('#input_numero_documento_rpa').mask('#########-#')
    });
    input_canton_rpa.disabled = true;
    $(".limpiar_select").detach();
}

document.getElementById("boton_confirmar_cofirmar_rpa").onclick = function(){
    verificar_cookie();
    document.getElementById("contenido_confirmar_rpa").style.display = "none";
    document.getElementById("contenido_esperar").style.display = "inline-block";
    fecha_actual = new Date();
    var parametros_rp = {
        "tipo": "rpa",
        "id_personal_creado": cookies_pagina["id_personal"],
        "fecha_creacion": fecha_actual.getFullYear()+"-"+(fecha_actual.getMonth()+1)+"-"+fecha_actual.getDate(),
        "tipo_documento": input_tipo_documento_rpa.value,
        "numero_documento": input_numero_documento_rpa.value.replace("-", ''),
        "nombre_1": input_nombre_1_rpa.value,
        "nombre_2": input_nombre_2_rpa.value,
        "apellido_1": input_apellido_1_rpa.value,
        "apellido_2": input_apellido_2_rpa.value,
        "sexo": input_sexo_rpa.value,
        "correo": input_correo_rpa.value,
        "telefono_1": input_telefono_1_rpa.value,
        "telefono_2": input_telefono_2_rpa.value,
        "fecha_nacimiento": input_fecha_nacimiento_rpa.value,
        "provincia": input_provincia_rpa.value,
        "canton": input_canton_rpa.value,
        "direccion": input_direccion_rpa.value,
        "ocupacion": input_ocupacion_rpa.value 
    };
    $.ajax({ 
        data: parametros_rp,
        url: "consulta.php", 
        type: "POST",
        beforeSend: function (){
            document.getElementById("contenido_esperar").style.display =  "none";
        },
        success:function (response){
            document.getElementById("contenido_esperar").style.display =  "none";
            document.getElementById("label_mensaje_alerta_superior_rpa").innerHTML=response;
            if(response == "Registro con exitó")
            {
                regresar_inputs_normalidad_rp();
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
