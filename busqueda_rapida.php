<?php
$conn = new mysqli("localhost","cmq-web","CmQu1n1nde","cmq");
$tipo = $_POST["tipo"];
if($tipo=="bndp"){
    $parametro = $_POST["parametro"];
    $id_paciente = $_POST["id_paciente"];
    $qy = mysqli_query($conn,"SELECT `numero_documento` FROM `pacientes` WHERE `numero_documento` = REPLACE(REPLACE('$parametro',' ',''),'-','') AND `id` <> '$id_paciente';");
    if (mysqli_num_rows($qy)>=1){
        echo "1";
    }else{
        echo "0";
    }
}
/*
if($tipo=="bndp"){
    $parametro = $_POST["parametro"];
    $queryusuario = mysqli_query($conn,"SELECT `numero_documento` FROM `pacientes` WHERE `numero_documento` = '$parametro'");
    $numero_filas = mysqli_num_rows($queryusuario);
    if ($numero_filas>=1){
        echo "3px solid #e24444/1";
    }else{
        echo "3px solid #787ff6/0";
    }
}else if($tipo=="bndpedp"){
    $parametro = $_POST["parametro"];
    $id_paciente = $_POST["id_paciente"];
    $queryusuario = mysqli_query($conn,"SELECT `numero_documento` FROM `pacientes` WHERE `numero_documento` = '$parametro' AND `id` <> '$id_paciente';");
    $numero_filas = mysqli_num_rows($queryusuario);
    if ($numero_filas>=1){
        echo "3px solid #e24444/1";
    }else{
        echo "3px solid #787ff6/0";
    }
}*/

$conn->close();
?>