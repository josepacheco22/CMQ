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
}else if($tipo=="budper"){
    $id_personal = $_POST["id_personal"];
    $parametro = $_POST["parametro"];
    $qy = mysqli_query($conn,"SELECT `numero_documento` FROM `personal` WHERE `numero_documento` = REPLACE(REPLACE('$parametro',' ',''),'-','') AND `id` <> '$id_personal'");
    if (mysqli_num_rows($qy)>=1){
        echo "1";
    }else{
        echo "0";
    }
}else if($tipo=="bnu"){
    $id_personal = $_POST["id_personal"];
    $parametro = $_POST["parametro"];
    if($id_personal=="")
    {
        $scripsql = "SELECT `nombre_usuario` FROM `usuarios` WHERE `nombre_usuario` = REPLACE('$parametro',' ','');";
    }else{
        $scripsql = "SELECT `nombre_usuario` FROM `usuarios` WHERE  `id_personal` <> '$id_personal' AND `nombre_usuario` = REPLACE('$parametro',' ','');";
    }
    $qy = mysqli_query($conn,$scripsql);
    if (mysqli_num_rows($qy)>=1){
        echo "1";
    }else{
        echo "0";
    }
}

$conn->close();
?>