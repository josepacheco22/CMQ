<?php

try{

$conn = new mysqli("192.168.100.8","root","CmQu1n1nde","cmq");
//$conn = new mysqli("localhost","root","CmQu1n1nde","cmq");

$tipo = $_POST["tipo"];
if($tipo=="vr")
{
    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];
    $sql = "SELECT * FROM usuarios WHERE nombre_usuario = '$usuario'";
    $queryusuario = mysqli_query($conn,$sql);
    $numero_filas = mysqli_num_rows($queryusuario);
    $resultado = mysqli_fetch_array($queryusuario);
    $info = [];
    if (($numero_filas>=1) && (password_verify($contrasena,$resultado['contrasena_usuario'])) )
    {
      $info = [
        "usuario" => $usuario,
        "contrasena" => $contrasena,
        "id_personal" => $resultado['id_personal'],
        "permisos" => $resultado['permisos']
      ];
        echo json_encode($info);
    }else
    {
        echo "0";
    }
    //$contrasena_usuario = password_hash("CmQu1n1nde", PASSWORD_BCRYPT);
    //echo $contrasena_usuario;
    //echo 'Error: '. $conn->error;
}else if($tipo=="rp"){
    $tipo_documento = $_POST["tipo_documento"];
    $numero_documento = $_POST["numero_documento"];
    $nombre_1 = $_POST["nombre_1"];
    $apellido_1 = $_POST["apellido_1"];
    $sexo = $_POST["sexo"];
    $correo = $_POST["correo"];
    $telefono_1 = $_POST["telefono_1"];
    $telefono_2 = $_POST["telefono_2"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    
    $cargo = $_POST["cargo"];
    $especialidad = $_POST["especialidad"];
    $miniatura = $_POST["miniatura"];
    $foto = $_POST["foto"];
    $nombre_usuario = $_POST["nombre_usuario"];
    $contrasena_usuario = password_hash($_POST["contrasena_usuario"], PASSWORD_BCRYPT);


    $query_extraer_id_personal = mysqli_query($conn,"SELECT `nombre_usuario` FROM `usuarios` WHERE `nombre_usuario` = '$nombre_usuario';");
    $numero_filas_extraer_id_personal = mysqli_num_rows($query_extraer_id_personal);

    if($numero_filas_extraer_id_personal==0)
    {
        $query_registro_usuario = mysqli_query($conn,"SET @variable_id=uuid()");
        $query_registro_usuario = mysqli_query($conn,"INSERT INTO `personal`(`id`, `habilitado`, `tipo_documento`, `numero_documento`, `nombre_1`, `apellido_1`, `sexo`, `correo`, `telefono_1`, `telefono_2`, `fecha_nacimiento`, `cargo`, `especialidad`, `miniatura`, `foto`) VALUES (@variable_id,1,'".$tipo_documento."','".$numero_documento."','".$nombre_1."','".$apellido_1."','".$sexo."','".$correo."','".$telefono_1."','".$telefono_2."','".$fecha_nacimiento."','".$cargo."','".$especialidad."','".$miniatura."','".$foto."')");
        $query_registro_usuario = mysqli_query($conn,"INSERT INTO `usuarios`(`nombre_usuario`, `contrasena_usuario`, `id_personal`, `permisos`, `habilitado`) VALUES ('".$nombre_usuario."','".$contrasena_usuario."',@variable_id,1,1)"); //realizar consulta
        if(($conn->affected_rows)==1){
            echo "Registro con exitó";
        }else{
            echo "Fallo Registro";
        }
    }else{
        echo "Usuario Existente";
    }

}else if($tipo=="tp"){
    $habilitado = "1";
    if($_POST["buscar_habilitado"]=="false")
    {
        $habilitado = "0";
    }
    $tipo_doc = $_POST["buscar_tipo_doc"];
    if($tipo_doc=="cp")
    {
        $tipo_doc = "";
    }
    $numerodoc = $_POST["buscar_numerodoc"];
    $nombre_1 = $_POST["buscar_nombres"];
    $apellido_1 = $_POST["buscar_apellido_1"];
    $cargo = $_POST["buscar_cargo"];
    $usuario = $_POST["buscar_usuario"];
    $numero_filas_consultar = $_POST["numero_filas"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT p.`id`, p.`habilitado`, p.`tipo_documento`, p.`numero_documento`, p.`nombre_1`, p.`apellido_1`, p.`sexo`, p.`correo`, p.`telefono_1`, p.`telefono_2`, p.`fecha_nacimiento`, p.`cargo`, p.`especialidad`, u.`nombre_usuario`, u.`permisos` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`habilitado` = $habilitado AND p.`tipo_documento` LIKE '%$tipo_doc%' AND p.`numero_documento`LIKE '%$numerodoc%' AND p.`nombre_1` LIKE '%$nombre_1%' AND p.`apellido_1`LIKE '%$apellido_1%' AND p.`cargo` LIKE '%$cargo%' AND u.`nombre_usuario` LIKE '%$usuario%' LIMIT $numero_filas_consultar");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            if($fila_tabla_personal_usuario["habilitado"]=="1")
            {
                $habilitado="Si";
            }else
            {
                $habilitado="No";
            }
            echo "<tr class='resultados_de_tablas'>
            <td>".$i."</td>
            <td>".$habilitado."</td>
            <td>".$fila_tabla_personal_usuario["tipo_documento"]."</td>
            <td>".$fila_tabla_personal_usuario["numero_documento"]."</td>
            <td>".$fila_tabla_personal_usuario["nombre_1"]."</td>
            <td>".$fila_tabla_personal_usuario["apellido_1"]."</td>
            <td>".$fila_tabla_personal_usuario["cargo"]."</td>
            <td>".$fila_tabla_personal_usuario["nombre_usuario"]."</td>
            <td class='tabla_contenedores_accion_rp'>
                <svg xmlns='http://www.w3.org/2000/svg' onclick='accion_deshabilitar(".$i.")' class='iconos_tabla_accion bi bi-trash-fill' viewBox='0 0 16 16'>
                    <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/>
                </svg>
            </td>
            <td class='tabla_contenedores_accion_rp'>
                <svg xmlns='http://www.w3.org/2000/svg' onclick='accion_habilitar(".$i.")' class='iconos_tabla_accion bi bi-pencil' viewBox='0 0 16 16'>
                    <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>
                </svg>
            </td>
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }
        echo "ids";
        echo json_encode($ids);

    }
    
}else if($tipo=="bc"){
    $parametro = $_POST["parametro"];
    $tipo_busqueda = $_POST["tipo_busqueda"];

    if($tipo_busqueda=="u"){
        $queryusuario = mysqli_query($conn,"SELECT `nombre_usuario` FROM `usuarios` WHERE `nombre_usuario`='$parametro';");
        $numero_filas = mysqli_num_rows($queryusuario);
        if ($numero_filas>=1){
            echo "2px solid #e24444-si";
        }else{
            echo "2px solid #787ff6-no";
        }
    }
    if($tipo_busqueda=="nd"){
        $queryusuario = mysqli_query($conn,"SELECT `numero_documento` FROM `personal` WHERE `numero_documento`='$parametro';");
        $numero_filas = mysqli_num_rows($queryusuario);
        if ($numero_filas>=1){
            echo "2px solid #e24444-si";
        }else{
            echo "2px solid #787ff6-no";
        }
    }
    
}else  if($tipo=="rpa"){
    $tipo_documento = $_POST["tipo_documento"];
    $id_personal_creado = $_POST["id_personal_creado"];
    $fecha_creacion = $_POST["fecha_creacion"];
    $numero_documento = $_POST["numero_documento"];
    $nombre_1 = $_POST["nombre_1"];
    $nombre_2 = $_POST["nombre_2"];
    $apellido_1 = $_POST["apellido_1"];
    $apellido_2 = $_POST["apellido_2"];
    $sexo = $_POST["sexo"];
    $correo = $_POST["correo"];
    $telefono_1 = $_POST["telefono_1"];
    $telefono_2 = $_POST["telefono_2"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    if($fecha_nacimiento == "")
    {
      $fecha_nacimiento = "null";
    }else{
      $fecha_nacimiento = "'$fecha_nacimiento'";
    }
    $provincia = $_POST["provincia"];
    $canton = $_POST["canton"];
    $direccion = $_POST["direccion"];
    $ocupacion = $_POST["ocupacion"];
    $query_registro_usuario = mysqli_query($conn,"INSERT INTO `pacientes`(`id`, `tipo_documento`, `habilitado`, `id_personal_creado`, `fecha_creacion`, `numero_documento`, `nombre_1`, `nombre_2`, `apellido_1`, `apellido_2`, `sexo`, `correo`, `telefono_1`, `telefono_2`, `fecha_nacimiento`, `provincia`, `canton`, `direccion`, `ocupacion`) VALUES (uuid(), '$tipo_documento', 1, '$id_personal_creado', '$fecha_creacion', '$numero_documento', '$nombre_1', '$nombre_2', '$apellido_1', '$apellido_2', '$sexo', '$correo', '$telefono_1', '$telefono_2', $fecha_nacimiento, '$provincia', '$canton', '$direccion', '$ocupacion')");
    if(($conn->affected_rows)==1){
        echo "REGISTRO CON EXITO";
    }else{
        echo "FALLO REGISTRO";
    }
}else if($tipo=="tpa"){
    $habilitado = "1";
    $tipo_documento = $_POST["tipo_documento"];
    if($tipo_documento=="cp")
    {
        $tipo_documento = "";
    }

    $numerodoc = $_POST["numerodoc"];
    $nombres = $_POST["nombres"];
    $apellidos = $_POST["apellidos"];
    $creado_por = $_POST["creado_por"];
    $fecha_creado = $_POST["fecha_creado"];
    $numero_filas_consultar = $_POST["numero_filas"];


    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT `id`, `tipo_documento`, `numero_documento`, CONCAT(`nombre_1`,' ',`nombre_2`) AS nombres, CONCAT(`apellido_1`,' ',`apellido_2`) AS apellidos, (SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) as `nombre_usuario`, `fecha_creacion`  FROM `pacientes` WHERE `habilitado` = 1 AND (`tipo_documento` LIKE '%".$tipo_documento."%' AND `numero_documento` LIKE '%".$numerodoc."%' AND CONCAT(`nombre_1`,' ',`nombre_2`) LIKE '%".$nombres."%' AND CONCAT(`apellido_1`,' ',`apellido_2`) LIKE '%".$apellidos."%' AND (SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) LIKE '%".$creado_por."%' AND `fecha_creacion` LIKE '%".$fecha_creado."%') ORDER BY `fecha_creacion` DESC LIMIT ".$numero_filas_consultar);
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<tr class='resultados_de_tablas' onmouseout='desresaltar(".($i-1).")' onmouseover='resaltar(".($i-1).")'>
            <td class='fila_selecionada_".($i-1)." mouseover numero_de_fila_pp'>".$i."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["tipo_documento"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["numero_documento"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombres"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["apellidos"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombre_usuario"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["fecha_creacion"]."</td>

            <td class='diseno_abrir fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_abrir(".($i-1).")' onmouseover='resaltar_abrir(".($i-1).")' class='diseño_abrir_".($i-1)." iconos_tabla_accion' onclick='accion_abrir(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='diseño_abrir_".($i-1)." bi bi-folder2-open' viewBox='0 0 16 16'>
                        <path d='M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z'/>
                    </svg>
                    ABRIR
                </div>
            </td>
            <td class='diseno_editar fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_editar(".($i-1).")' onmouseover='resaltar_editar(".($i-1).")' class='diseño_editar_".($i-1)." iconos_tabla_accion' onclick='accion_editar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'  width='16' height='16' class='diseño_editar_".($i-1)." bi bi-pencil' viewBox='0 0 16 16'>
                        <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>
                    </svg>
                    EDITAR
                </div>
            </td>
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'>
                <div onmouseout='desresaltar_eliminar(".($i-1).")' onmouseover='resaltar_eliminar(".($i-1).")'class='diseño_eliminar_".($i-1)." iconos_tabla_accion' onclick='accion_eliminar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'   width='16' height='16' class='diseño_eliminar_".($i-1)." n bi bi-trash-fill' viewBox='0 0 16 16'>
                        <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'/>
                    </svg>
                    ELIMINAR
                </div>
            </td>
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
    
}else if($tipo=="dtpades"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT `tipo_documento`,`numero_documento`, CONCAT(`nombre_1`,' ',`nombre_2`) AS `nombres`, CONCAT(`apellido_1`,' ',`apellido_2`) AS `apellidos`, `sexo`, `fecha_nacimiento`,(SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) as `nombre_usuario`, `fecha_creacion` FROM `pacientes` WHERE `id`= '$id' AND `habilitado`= 1 LIMIT 1;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["tipo_documento"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["numero_documento"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["nombres"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["apellidos"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["sexo"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["fecha_nacimiento"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["nombre_usuario"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["fecha_creacion"]."</label>";
        }
    }
}else if($tipo=="dthisdes"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, h.`fecha_consulta`,h.`primera_consulta`, pa.`numero_documento`, concat(pa.`nombre_1`,' ', pa.`apellido_1`) as nombre_1, uc.`nombre_usuario` as  `creado`, ua.`nombre_usuario` as `asignado` FROM (((`historia_clinica` h LEFT JOIN `pacientes` pa ON pa.`id` = h.`id_paciente`) LEFT JOIN `usuarios` uc ON uc.`id_personal` = h.`id_personal_creado`) LEFT JOIN `usuarios` ua ON ua.`id_personal` = h.`id_personal_asignado`) WHERE h.`habilitado`= 1 AND h.`id` = '$id' LIMIT 1;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {   $ids_tabla = str_pad((($fila_tabla_personal_usuario["id"])), 6, "0", STR_PAD_LEFT);
            $ids_tabla = $ids_tabla[0].$ids_tabla[1].$ids_tabla[2]." ".$ids_tabla[3].$ids_tabla[4].$ids_tabla[5];
            echo "<label class='label_formulario_pp datos_volatiles_pp'>".$ids_tabla."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["fecha_consulta"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["primera_consulta"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["numero_documento"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["nombre_1"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["creado"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["asignado"]."</label>";
        }
    }else{
        echo "Fallo";
    }
}else if($tipo=="elipa"){
    $id = $_POST["id"];
    $sql ="SET FOREIGN_KEY_CHECKS = 0;";
    $conn->query($sql);
    $sql = "DELETE FROM `pacientes` WHERE `pacientes`.`id` = '$id';";
    if($conn->query($sql) === TRUE){
        echo "Registro eliminado con exitó";
    }else{
        echo "No se pudo completar la acción";
    }
}else if($tipo=="elihis"){
    $id = $_POST["id"];
    $sql ="SET FOREIGN_KEY_CHECKS = 0;";
    $conn->query($sql);
    $sql = "DELETE FROM `historia_clinica` WHERE `historia_clinica`.`id` = '$id';";
    if($conn->query($sql) === TRUE){
        echo "Registro eliminado con exitó";
    }else{
        echo "No se pudo completar la acción";
    }
}else if($tipo=="btpa"){
    $habilitado = "1";
    $tipo_documento = $_POST["tipo_documento"];
    if($tipo_documento=="cp")
    {
        $tipo_documento = "";
    }

    $numerodoc = $_POST["numerodoc"];
    $nombres = $_POST["nombres"];
    $apellidos = $_POST["apellidos"];
    $creado_por = $_POST["creado_por"];
    $fecha_creado = $_POST["fecha_creado"];
    $numero_filas_consultar = $_POST["numero_filas"];


    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT `id`, `tipo_documento`, `numero_documento`, CONCAT(`nombre_1`,' ',`nombre_2`) AS 'nombres', CONCAT(`apellido_1`,' ',`apellido_2`) AS 'apellidos', (SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) as `nombre_usuario`, `fecha_creacion`  FROM `pacientes` WHERE `habilitado` = 1 AND (`tipo_documento` LIKE '%".$tipo_documento."%' AND `numero_documento` LIKE '%".$numerodoc."%' AND CONCAT(`nombre_1`,' ',`nombre_2`) LIKE '%".$nombres."%' AND CONCAT(`apellido_1`,' ',`apellido_2`) LIKE '%".$apellidos."%' AND (SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) LIKE '%".$creado_por."%' AND `fecha_creacion` LIKE '%".$fecha_creado."%') ORDER BY `fecha_creacion` DESC LIMIT ".$numero_filas_consultar);
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<tr class='resultados_de_tablas' onclick='seleccionar_id_paciente(".($i-1).")'>
            <td class='fila_selecionada_".($i-1)." numero_de_fila_pp'>".$i."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["tipo_documento"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["numero_documento"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombres"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["apellidos"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombre_usuario"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["fecha_creacion"]."</td>      
            <td class='diseno_abrir fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div class='diseño_abrir_".($i-1)." iconos_tabla_accion' onclick='accion_abrir(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='diseño_abrir_".($i-1)." bi bi-folder2-open' viewBox='0 0 16 16'>
                        <path d='M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z'/>
                    </svg>
                    ABRIR
                </div>
            </td>
            
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
    
}else if($tipo=="dpas"){
    $id = $_POST["id"];
    $array_resultado = array();
    $query_consulta_tabla = mysqli_query($conn,"SELECT p.`tipo_documento`, p.`fecha_creacion`, p.`numero_documento`, concat(p.`nombre_1`,' ',p.`nombre_2`) AS `nombres`, concat(p.`apellido_1`,' ',p.`apellido_2`) AS `apellidos` , p.`sexo`, p.`correo`, p.`telefono_1`, p.`telefono_2`, p.`fecha_nacimiento`, p.`provincia`, p.`canton`, p.`direccion`, p.`ocupacion`, u.`nombre_usuario`,IF((SELECT MIN(h.`primera_consulta`) FROM `historia_clinica` h WHERE h.`primera_consulta`<> '0000-00-00' AND h.`id_paciente` = p.`id`) IS NULL,(IF((SELECT MIN(h.`fecha_consulta`) FROM `historia_clinica` h WHERE h.`fecha_consulta`<> '0000-00-00' AND h.`id_paciente` = p.`id`) IS NULL ,CURDATE(),(SELECT MIN(h.`fecha_consulta`) FROM `historia_clinica` h WHERE h.`fecha_consulta`<> '0000-00-00' AND h.`id_paciente` = p.`id`)) ),(SELECT MIN(h.`primera_consulta`) FROM `historia_clinica`h WHERE h.`primera_consulta`<> '0000-00-00' AND h.`id_paciente` = p.`id`)) AS `primera_consulta` FROM `pacientes` p LEFT JOIN `usuarios` u ON u.`id_personal` = p.`id_personal_creado` WHERE p.`habilitado` = 1 AND p.`id` = '$id';");
    $numero_filas_consulta_tabla = mysqli_num_rows($query_consulta_tabla);
    $resultado = mysqli_fetch_array($query_consulta_tabla);
    if($numero_filas_consulta_tabla == 1)
    {
        $fecha_nacimiento = new DateTime($resultado["fecha_nacimiento"]);
        $hoy = new DateTime();
        $calculo_edad = $hoy->diff($fecha_nacimiento);
        if(($calculo_edad->y)==0){
            if(($calculo_edad->m==0)){
                $edad = $calculo_edad->d;
                if(($calculo_edad->m)==1){
                    $edad = $calculo_edad->d." Dia";
                }else{
                    $edad = $calculo_edad->d." Dias";
                }
            }else{
                if(($calculo_edad->m)==1){
                    $edad = $calculo_edad->m." Mes";
                }else{
                    $edad = $calculo_edad->m." Meses";
                }
            }
        }else{
            if(($calculo_edad->y)==1){
                $edad = $calculo_edad->y." Año";
            }else{
                $edad = $calculo_edad->y." Años";
            }
        }

        $array_resultado = array(
            $resultado["tipo_documento"],
            $resultado["fecha_creacion"],
            $resultado["numero_documento"],
            $resultado["nombres"],
            $resultado["apellidos"],
            $resultado["sexo"],
            $resultado["correo"],
            $resultado["telefono_1"],
            $resultado["telefono_2"],
            $resultado["fecha_nacimiento"],
            $resultado["provincia"],
            $resultado["canton"],
            $resultado["direccion"],
            $resultado["ocupacion"],
            $resultado["nombre_usuario"],
            $edad,
            $resultado["primera_consulta"]
        );
        echo json_encode($array_resultado);
    }   
}else if($tipo=="rhis"){
    $id_creado_usuario = $_POST["id_creado_usuario"];
    $creado_usuario = $_POST["creado_usuario"];
    $id_paciente = $_POST["id_paciente"];
    $archivado = intval($_POST["archivado"]);
    $edad = $_POST["edad"];
    $id_personal_creado = $_POST["id_personal_creado"];
    $id_personal_asignado = $_POST["id_personal_asignado"];
    $fecha_consulta = $_POST["fecha_consulta"];
    $peso = $_POST["peso"];
    $talla = $_POST["talla"];
    $pulso = $_POST["pulso"];
    $presion_arterial = $_POST["presion_arterial"];
    $temperatura = $_POST["temperatura"];
    $frecuencia_respiratoria = $_POST["frecuencia_respiratoria"];
    $primera_consulta = $_POST["primera_consulta"];
    $motivo_consulta = $_POST["motivo_consulta"];
    $enfermedad_actual = $_POST["enfermedad_actual"];
    $revisin_sistemas = $_POST["revisin_sistemas"];
    $a_p_p = $_POST["a_p_p"];
    $a_p_f = $_POST["a_p_f"];
    $examen_fisico = $_POST["examen_fisico"];
    $impresión_diagnostica = $_POST["impresión_diagnostica"];
    $examenes = $_POST["examenes"];
    $diagnostico_definitivo = $_POST["diagnostico_definitivo"];
    $tratamiento = $_POST["tratamiento"];

    /*
    $sql = "SET @VALOR_MAXIMO = (SELECT MAX(`id`) FROM `historia_clinica` WHERE 1);";
    mysqli_query($conn,$sql);
    $sql = "INSERT INTO `historia_clinica`(`id`,`habilitado`,`fecha_consulta`, `peso`, `talla`, `pulso`, `presion_arterial`, `temperatura`, `frecuencia_respiratoria`, `primera_consulta`, `motivo_consulta`, `enfermedad_actual`, `revisin_sistemas`, `a_p_p`, `a_p_f`, `examen_fisico`, `impresión_diagnostica`, `examenes`, `diagnostico_definitivo`, `tratamiento`, `archivado`, `edad`) VALUES (@ID, 1, '$fecha_consulta', '$peso', '$talla', '$pulso', '$presion_arterial', '$temperatura', '$frecuencia_respiratoria', '$primera_consulta', '$motivo_consulta', '$enfermedad_actual', '$revisin_sistemas', '$a_p_p', '$a_p_f', '$examen_fisico', '$impresión_diagnostica', '$examenes', '$diagnostico_definitivo', '$tratamiento', $archivado, '$edad');";
    echo $sql;
    */

    $sql = "ALTER TABLE `historia_clinica` AUTO_INCREMENT = 1;";
    mysqli_query($conn,$sql);
    $sql = "INSERT INTO `historia_clinica`(`habilitado`,`fecha_consulta`, `peso`, `talla`, `pulso`, `presion_arterial`, `temperatura`, `frecuencia_respiratoria`, `primera_consulta`, `motivo_consulta`, `enfermedad_actual`, `revisin_sistemas`, `a_p_p`, `a_p_f`, `examen_fisico`, `impresión_diagnostica`, `examenes`, `diagnostico_definitivo`, `tratamiento`, `archivado`, `edad`) VALUES ( 1, '$fecha_consulta', '$peso', '$talla', '$pulso', '$presion_arterial', '$temperatura', '$frecuencia_respiratoria', '$primera_consulta', '$motivo_consulta', '$enfermedad_actual', '$revisin_sistemas', '$a_p_p', '$a_p_f', '$examen_fisico', '$impresión_diagnostica', '$examenes', '$diagnostico_definitivo', '$tratamiento', $archivado, '$edad');";
    if(mysqli_query($conn,$sql)){
      $sql = "SELECT LAST_INSERT_ID() as id;";
      $sqlresult = mysqli_query($conn,$sql);
      $resultado = mysqli_fetch_array($sqlresult);
      $numero_filas = mysqli_num_rows($sqlresult); 
      if($numero_filas == 1){
        $id_insert = $resultado["id"];
        if($id_paciente != ""){
          $sql = "UPDATE `historia_clinica` SET `id_paciente`='$id_paciente' WHERE `id`= $id_insert;";
          mysqli_query($conn,$sql);
        }
        if($id_personal_asignado != ""){
            $sql = "UPDATE `historia_clinica` SET `id_personal_asignado`='$id_personal_asignado' WHERE `id`= $id_insert;";
            mysqli_query($conn,$sql);
        }
        if($id_personal_creado != ""){
            $sql = "UPDATE `historia_clinica` SET `id_personal_creado`='$id_personal_creado' WHERE `id`= $id_insert;";
            mysqli_query($conn,$sql);
        }  
        if($archivado=="1"){
          $sql = "ALTER TABLE `historia_archivado` AUTO_INCREMENT = 1;";
          mysqli_query($conn,$sql);
          $sql = "INSERT INTO `historia_archivado` (`fecha_creacion`,
            `id_h`,
            `fecha_consulta_h`,
            `id_creado_usuario`,
            `creado_usuario`,
            `peso_h`,
            `talla_h`,
            `pulso_h`,
            `presion_arterial_h`,
            `temperatura_h`,
            `frecuencia_respiratoria_h`,
            `primera_consulta_h`,
            `motivo_consulta_h`,
            `enfermedad_actual_h`,
            `revisin_sistemas_h`,
            `a_p_p_h`,
            `a_p_f_h`,
            `examen_fisico_h`,
            `impresión_diagnostica_h`,
            `examenes_h`,
            `diagnostico_definitivo_h`,
            `tratamiento_h`,
            `archivado_h`,
            `edad_h`,
            `id_paci`,
            `tipo_documento_paci`,
            `fecha_creacion_paci`,
            `numero_documento_paci`,
            `nombre_1_paci`,
            `nombre_2_paci`,
            `apellido_1_paci`,
            `apellido_2_paci`,
            `sexo_paci`,
            `correo_paci`,
            `telefono_1_paci`,
            `telefono_2_paci`,
            `fecha_nacimiento_paci`,
            `provincia_paci`,
            `canton_paci`,
            `direccion_paci`,
            `ocupacion_paci`,
            `id_pcpaci`,
            `tipo_documento_pcpaci`,
            `numero_documento_pcpaci`,
            `nombre_1_pcpaci`,
            `nombre_2_pcpaci`,
            `apellido_1_pcpaci`,
            `apellido_2_pcpaci`,
            `sexo_pcpaci`,
            `correo_pcpaci`,
            `telefono_1_pcpaci`,
            `telefono_2_pcpaci`,
            `fecha_nacimiento_pcpaci`,
            `cargo_pcpaci`,
            `especialidad_pcpaci`,
            `miniatura_pcpaci`,
            `foto_pcpaci`,
            `nombre_usuario_pcpaci`,
            `permisos_pcpaci`,
            `id_pc`,
            `tipo_documento_pc`,
            `numero_documento_pc`,
            `nombre_1_pc`,
            `nombre_2_pc`,
            `apellido_1_pc`,
            `apellido_2_pc`,
            `sexo_pc`,
            `correo_pc`,
            `telefono_1_pc`,
            `telefono_2_pc`,
            `fecha_nacimiento_pc`,
            `cargo_pc`,
            `especialidad_pc`,
            `miniatura_pc`,
            `foto_pc`,
            `nombre_usuario_upc`,
            `permisos_upc`,
            `id_pa`,
            `tipo_documento_pa`,
            `numero_documento_pa`,
            `nombre_1_pa`,
            `nombre_2_pa`,
            `apellido_1_pa`,
            `apellido_2_pa`,
            `sexo_pa`,
            `correo_pa`,
            `telefono_1_pa`,
            `telefono_2_pa`,
            `fecha_nacimiento_pa`,
            `cargo_pa`,
            `especialidad_pa`,
            `miniatura_pa`,
            `foto_pa`,
            `nombre_usuario_upa`,
            `permisos_upa`
            )
            
            SELECT 
            CURDATE() AS `fecha_creacion`,
            h.`id`,
            h.`fecha_consulta`,
            '$id_creado_usuario' as `id_creado_usuario`,
            '$creado_usuario' as `creado_usuario`,
            h.`peso`,
            h.`talla`,
            h.`pulso`,
            h.`presion_arterial`,
            h.`temperatura`,
            h.`frecuencia_respiratoria`,
            h.`primera_consulta`,
            h.`motivo_consulta`,
            h.`enfermedad_actual`,
            h.`revisin_sistemas`,
            h.`a_p_p`,
            h.`a_p_f`,
            h.`examen_fisico`,
            h.`impresión_diagnostica`,
            h.`examenes`,
            h.`diagnostico_definitivo`,
            h.`tratamiento`,
            h.`archivado`,
            h.`edad`, 
            paci.`id`,
            paci.`tipo_documento`,
            paci.`fecha_creacion`,
            paci.`numero_documento`,
            paci.`nombre_1`,
            paci.`nombre_2`,
            paci.`apellido_1`,
            paci.`apellido_2`,
            paci.`sexo`,
            paci.`correo`,
            paci.`telefono_1`,
            paci.`telefono_2`,
            paci.`fecha_nacimiento`,
            paci.`provincia`,
            paci.`canton`,
            paci.`direccion`,
            paci.`ocupacion`, 
            tpcpa.`id`,
            tpcpa.`tipo_documento`,
            tpcpa.`numero_documento`,
            tpcpa.`nombre_1`,
            tpcpa.`nombre_2`,
            tpcpa.`apellido_1`,
            tpcpa.`apellido_2`,
            tpcpa.`sexo`,
            tpcpa.`correo`,
            tpcpa.`telefono_1`,
            tpcpa.`telefono_2`,
            tpcpa.`fecha_nacimiento`,
            tpcpa.`cargo`,
            tpcpa.`especialidad`,
            tpcpa.`miniatura`,
            tpcpa.`foto`,
            tpcpa.`nombre_usuario`,
            tpcpa.`permisos`,
            pc.`id`,
            pc.`tipo_documento`,
            pc.`numero_documento`,
            pc.`nombre_1`,
            pc.`nombre_2`,
            pc.`apellido_1`,
            pc.`apellido_2`,
            pc.`sexo`,
            pc.`correo`,
            pc.`telefono_1`,
            pc.`telefono_2`,
            pc.`fecha_nacimiento`,
            pc.`cargo`,
            pc.`especialidad`,
            pc.`miniatura`,
            pc.`foto`,
            upc.`nombre_usuario`,
            upc.`permisos`,
            pa.`id`,
            pa.`tipo_documento`,
            pa.`numero_documento`,
            pa.`nombre_1`,
            pa.`nombre_2`,
            pa.`apellido_1`,
            pa.`apellido_2`,
            pa.`sexo`,
            pa.`correo`,
            pa.`telefono_1`,
            pa.`telefono_2`,
            pa.`fecha_nacimiento`,
            pa.`cargo`,
            pa.`especialidad`,
            pa.`miniatura`,
            pa.`foto`, 
            upa.`nombre_usuario`,
            upa.`permisos`
            FROM 
            `historia_clinica` h
            LEFT JOIN `pacientes` paci ON h.`id_paciente` = paci.`id`
            LEFT JOIN (SELECT
            p.`id`,
            p.`tipo_documento`,
            p.`numero_documento`,
            p.`nombre_1`,
            p.`nombre_2`,
            p.`apellido_1`,
            p.`apellido_2`,
            p.`sexo`,
            p.`correo`,
            p.`telefono_1`,
            p.`telefono_2`,
            p.`fecha_nacimiento`,
            p.`cargo`,
            p.`especialidad`,
            p.`miniatura`,
            p.`foto`,
            u.`nombre_usuario`,
            u.`permisos`
            FROM `personal` p
            LEFT JOIN `usuarios` u ON p.`id` = u.`id_personal`) tpcpa ON  h.`id_paciente` = tpcpa.`id`
            LEFT JOIN `personal`pc on h.`id_personal_creado` = pc.`id`
            LEFT JOIN `usuarios`upc ON h.`id_personal_creado` = upc.`id_personal`
            LEFT JOIN `personal`pa ON h.`id_personal_asignado` = pa.`id`
            LEFT JOIN `usuarios`upa ON h.`id_personal_asignado` = upa.`id_personal` WHERE h.`id` = $id_insert LIMIT 1;
            ";
            mysqli_query($conn,$sql);
        }
        echo $id_insert;
      }
    }else{
        echo "0";
    }
}else if($tipo=="npcr"){
    $id = $_POST["id"];

    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT CONCAT(`nombre_1`,' ',`nombre_2`,' ',`apellido_1`,' ',`apellido_2`) AS `nombres` FROM `personal` WHERE `id`='$id'");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        { 
            echo  $fila_tabla_personal_usuario["nombres"];
        }
    }
}else if($tipo=="lp"){
    $sql = "SELECT CONCAT(p.`nombre_1`,' ',p.`nombre_2`,' ',p.`apellido_1`,' ',p.`apellido_2`,' : ',u.`nombre_usuario`) AS `nombres`, p.`id` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE u.`permisos`= 1 AND u.`habilitado`=1 ORDER BY CONCAT(p.`nombre_1`,' ',p.`nombre_2`,' ',p.`apellido_1`,' ',p.`apellido_2`,' : ',u.`nombre_usuario`) ASC;";
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,$sql);
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)    {   
        echo "<option class='lista_personal_asignar' value='0'></option>";
        array_push($ids,"");
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH)){
            echo "<option class='lista_personal_asignar' value='".$i."'>".$fila_tabla_personal_usuario["nombres"]."</option>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }
        
        echo "ids";
        echo json_encode($ids);
    }else{
      echo 'Error: '. $conn->error, $sql;
      echo "0";
    }
    
}else if($tipo=="thas"){
    $id_asignado = $_POST["id_asignado"];
    $id = $_POST["id"];
    $fecha_consulta = $_POST["fecha_consulta"];
    $cedula = $_POST["cedula"];
    if($cedula==""){
        $isnullorlike1 = "pa.`numero_documento` IS NULL OR pa.`numero_documento` LIKE '%%'";
    }else{
        $isnullorlike1 = "pa.`numero_documento` LIKE '%$cedula%'";
    }
    $nombre = $_POST["nombre"];
    if($nombre==""){
        $isnullorlike2 = "CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) IS NULL OR CONCAT(pa.`nombre_1`, ' ' , pa.`apellido_1`) LIKE '%$nombre%'";
    }else{
        $isnullorlike2 = "CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) LIKE '%$nombre%'";
    }
    $usuario = $_POST["usuario"];
    $cantidad_filas = $_POST["cantidad_filas"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, h.`fecha_consulta`, pa.`id` AS `id_paciente` , pa.`numero_documento`, CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) AS `nombre`, u.`nombre_usuario` FROM ((`historia_clinica` h LEFT JOIN `pacientes` pa ON h.`id_paciente` = pa.`id`) LEFT JOIN `usuarios` u ON h.`id_personal_creado` = u.`id_personal`) WHERE h.`habilitado`= 1 AND h.`archivado`= b'0' AND h.`id_personal_asignado`= '$id_asignado' AND h.`id` LIKE '%$id%' AND h.`fecha_consulta` LIKE '%$fecha_consulta%' AND u.`nombre_usuario` LIKE '%$usuario%' AND ( $isnullorlike1 ) AND ( $isnullorlike2 ) ORDER BY h.`id` DESC LIMIT $cantidad_filas;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    $ids_paciente = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            $ids_tabla = str_pad((($fila_tabla_personal_usuario["id"])), 6, "0", STR_PAD_LEFT);
            $ids_tabla = $ids_tabla[0].$ids_tabla[1].$ids_tabla[2]." ".$ids_tabla[3].$ids_tabla[4].$ids_tabla[5];
            echo "<tr class='resultados_de_tablas' onmouseout='desresaltar(".($i-1).")' onmouseover='resaltar(".($i-1).")'>
            <td class='fila_selecionada_".($i-1)." mouseover numero_de_fila_pp'>".$i."</td>
            <td class='fila_selecionada_".($i-1)." id_historial_asignados'>".$ids_tabla."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["fecha_consulta"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["numero_documento"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombre"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombre_usuario"]."</td>
            <td class='diseno_editar fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_editar(".($i-1).")' onmouseover='resaltar_editar(".($i-1).")' class='diseño_editar_".($i-1)." iconos_tabla_accion' onclick='accion_editar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'  width='16' height='16' class='diseño_editar_".($i-1)." bi bi-pencil' viewBox='0 0 16 16'>
                        <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>
                    </svg>
                    EDITAR
                </div>
            </td>
            <td class='diseno_editar fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_paciente(".($i-1).")' onmouseover='resaltar_paciente(".($i-1).")' class='diseño_paciente_".($i-1)." iconos_tabla_accion' onclick='accion_paciente(".($i-1).")'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='diseño_paciente_".($i-1)." bi bi-person-fill' viewBox='0 0 16 16'>
                    <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/>
                  </svg>
                    PACIENTE
                </div>
            </td>
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_archivar(".($i-1).")' onmouseover='resaltar_archivar(".($i-1).")' class='diseño_archivar_".($i-1)." iconos_tabla_accion diseno_archivar' onclick='accion_archivar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'  width='16' height='16' fill='currentColor'class='diseño_archivar_".($i-1)." bi bi-archive' viewBox='0 0 16 16'>
                        <path d='M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z'/>
                    </svg>
                    ARCHIVAR
                </div>
            </td>
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'>
                <div onmouseout='desresaltar_eliminar(".($i-1).")' onmouseover='resaltar_eliminar(".($i-1).")'class='diseño_eliminar_".($i-1)." iconos_tabla_accion' onclick='accion_eliminar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'   width='16' height='16' class='diseño_eliminar_".($i-1)." n bi bi-trash-fill' viewBox='0 0 16 16'>
                        <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'/>
                    </svg>
                    ELIMINAR
                </div>
            </td>
                        
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            array_push($ids_paciente,$fila_tabla_personal_usuario["id_paciente"]);
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
    echo "ids";
    echo json_encode($ids_paciente);
    
}else if($tipo=="fpc"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SET @fecha_1 = (SELECT MIN(`fecha_consulta`) FROM `historia_clinica` WHERE `id_paciente` = '$id');");
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SET @fecha_2 = (SELECT MIN(`primera_consulta`) FROM `historia_clinica` WHERE `id_paciente` = '$id');");
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT (IF(@fecha_1<@fecha_2,@fecha_1,@fecha_2)) AS `fecha`;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            if($fila_tabla_personal_usuario["fecha"]==""){
                echo "0000-00-00";
            }else {
                echo $fila_tabla_personal_usuario["fecha"];
            }
            
        }

    }
    
}else if($tipo=="efhic"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT hc.`id`, hc.`habilitado`, hc.`id_paciente`, hc.`id_personal_creado`, hc.`id_personal_asignado`, CONCAT(pec.`nombre_1`,' ',pec.`nombre_2`,' ',pec.`apellido_1`,' ',pec.`apellido_2`,' : ',uc.`nombre_usuario`) as `personal_creado`, CONCAT(pea.`nombre_1`,' ',pea.`apellido_1`, ': ',ua.`nombre_usuario`) as `personal_asignado`, hc.`fecha_consulta`, hc.`peso`, hc.`talla`, hc.`pulso`, hc.`presion_arterial`, hc.`temperatura`, hc.`frecuencia_respiratoria`, hc.`primera_consulta`, hc.`motivo_consulta`, hc.`enfermedad_actual`, hc.`revisin_sistemas`, hc.`a_p_p`, hc.`a_p_f`, hc.`examen_fisico`, hc.`impresión_diagnostica`, hc.`examenes`, hc.`diagnostico_definitivo`, hc.`tratamiento`, hc.`archivado`, hc.`edad`, pa.`id` AS `pa_id`, pa.`tipo_documento` AS `pa_tipo_documento`, (SELECT ubp.`nombre_usuario` FROM `usuarios` ubp WHERE pa.`id_personal_creado` = ubp.`id_personal` LIMIT 1) AS `pa_personal_creado`, pa.`fecha_creacion` AS `pa_fecha_creacion`, pa.`numero_documento` AS `pa_numero_documento`, CONCAT(pa.`nombre_1`,' ',pa.`nombre_2`) AS `pa_nombres`, CONCAT(pa.`apellido_1`,' ',pa.`apellido_1`) AS `pa_apellidos`, pa.`sexo` AS `pa_sexo`, pa.`correo` AS `pa_correo`, pa.`telefono_1` AS `pa_telefono_1`, pa.`telefono_2` AS `pa_telefono_2`, pa.`fecha_nacimiento` AS `pa_fecha_nacimiento`, pa.`provincia` AS `pa_provincia`, pa.`canton` AS `pa_canton`, pa.`direccion` AS `pa_direccion`, pa.`ocupacion` AS `pa_ocupacion` FROM (((((`historia_clinica` hc LEFT JOIN `pacientes` pa ON hc.`id_paciente` = pa.`id`) LEFT JOIN `personal` pec ON hc.`id_personal_creado` = pec.`id`) LEFT JOIN `personal` pea ON hc.`id_personal_asignado` = pea.`id`) LEFT JOIN `usuarios` uc ON hc.`id_personal_creado` = uc.`id_personal`) LEFT JOIN `usuarios` ua ON hc.`id_personal_asignado` = ua.`id_personal`) WHERE hc.`id` = '$id';");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        $ids = array();
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            $fecha_nacimiento = new DateTime($fila_tabla_personal_usuario["pa_fecha_nacimiento"]);
            $hoy = new DateTime();
            $calculo_edad = $hoy->diff($fecha_nacimiento);
            if(($calculo_edad->y)==0){
                if(($calculo_edad->m==0)){
                    $edad = $calculo_edad->d;
                    if(($calculo_edad->m)==1){
                        $edad = $calculo_edad->d." Dia";
                    }else{
                        $edad = $calculo_edad->d." Dias";
                    }
                }else{
                    if(($calculo_edad->m)==1){
                        $edad = $calculo_edad->m." Mes";
                    }else{
                        $edad = $calculo_edad->m." Meses";
                    }
                }
            }else{
                if(($calculo_edad->y)==1){
                    $edad = $calculo_edad->y." Año";
                }else{
                    $edad = $calculo_edad->y." Años";
                }
            }
            $ids = [
                "id" => $fila_tabla_personal_usuario["id"],
                "habilitado" => $fila_tabla_personal_usuario["habilitado"],
                "id_paciente" => $fila_tabla_personal_usuario["id_paciente"],
                "id_personal_creado" => $fila_tabla_personal_usuario["id_personal_creado"],
                "archivado" => $fila_tabla_personal_usuario["archivado"],
                "personal_creado" => $fila_tabla_personal_usuario["personal_creado"],
                "id_personal_asignado" => $fila_tabla_personal_usuario["id_personal_asignado"],
                "personal_asignado" => $fila_tabla_personal_usuario["personal_asignado"],
                "fecha_consulta" => $fila_tabla_personal_usuario["fecha_consulta"],
                "peso" => $fila_tabla_personal_usuario["peso"],
                "talla" => $fila_tabla_personal_usuario["talla"],
                "pulso" => $fila_tabla_personal_usuario["pulso"],
                "presion_arterial" => $fila_tabla_personal_usuario["presion_arterial"],
                "temperatura" => $fila_tabla_personal_usuario["temperatura"],
                "frecuencia_respiratoria" => $fila_tabla_personal_usuario["frecuencia_respiratoria"],
                "primera_consulta" => $fila_tabla_personal_usuario["primera_consulta"],
                "motivo_consulta" => $fila_tabla_personal_usuario["motivo_consulta"],
                "enfermedad_actual" => $fila_tabla_personal_usuario["enfermedad_actual"],
                "revisin_sistemas" => $fila_tabla_personal_usuario["revisin_sistemas"],
                "a_p_p" => $fila_tabla_personal_usuario["a_p_p"],
                "a_p_f" => $fila_tabla_personal_usuario["a_p_f"],
                "examen_fisico" => $fila_tabla_personal_usuario["examen_fisico"],
                "impresión_diagnostica" => $fila_tabla_personal_usuario["impresión_diagnostica"],
                "examenes" => $fila_tabla_personal_usuario["examenes"],
                "diagnostico_definitivo" => $fila_tabla_personal_usuario["diagnostico_definitivo"],
                "tratamiento" => $fila_tabla_personal_usuario["tratamiento"],
                "archivado" => $fila_tabla_personal_usuario["archivado"],
                "edad" => $fila_tabla_personal_usuario["edad"],
                "pa_id" => $fila_tabla_personal_usuario["pa_id"],
                "pa_tipo_documento" => $fila_tabla_personal_usuario["pa_tipo_documento"],
                "pa_personal_creado" => $fila_tabla_personal_usuario["pa_personal_creado"],
                "pa_fecha_creacion" => $fila_tabla_personal_usuario["pa_fecha_creacion"],
                "pa_numero_documento" => $fila_tabla_personal_usuario["pa_numero_documento"],
                "pa_nombres" => $fila_tabla_personal_usuario["pa_nombres"],
                "pa_apellidos" => $fila_tabla_personal_usuario["pa_apellidos"],
                "pa_sexo" => $fila_tabla_personal_usuario["pa_sexo"],
                "pa_correo" => $fila_tabla_personal_usuario["pa_correo"],
                "pa_telefono_1" => $fila_tabla_personal_usuario["pa_telefono_1"],
                "pa_telefono_2" => $fila_tabla_personal_usuario["pa_telefono_2"],
                "pa_fecha_nacimiento" => $fila_tabla_personal_usuario["pa_fecha_nacimiento"],
                "pa_provincia" => $fila_tabla_personal_usuario["pa_provincia"],
                "pa_canton" => $fila_tabla_personal_usuario["pa_canton"],
                "pa_direccion" => $fila_tabla_personal_usuario["pa_direccion"],
                "pa_ocupacion" => $fila_tabla_personal_usuario["pa_ocupacion"],
                "pa_edad_calculada" => $edad,
            ];
            
        }
        echo json_encode($ids);
    }else{
        echo "fallo";
    }
    
}else if($tipo=="edthis"){
    $id = $_POST["id"];
    $id_paciente = $_POST["id_paciente"];
    if($id_paciente==""){
        $id_paciente = "NULL";
    }else{
        $id_paciente = "'".$id_paciente."'";
    }
    $archivado = $_POST["archivado"];
    $edad = $_POST["edad"];
    $id_personal_creado = $_POST["id_personal_creado"];
    $id_personal_asignado = $_POST["id_personal_asignado"];
    if($id_personal_asignado==""){
        $id_personal_asignado = "NULL";
    }else{
        $id_personal_asignado = "'".$id_personal_asignado."'";
    }
    $fecha_consulta = $_POST["fecha_consulta"];
    $peso = $_POST["peso"];
    $talla = $_POST["talla"];
    $pulso = $_POST["pulso"];
    $presion_arterial = $_POST["presion_arterial"];
    $temperatura = $_POST["temperatura"];
    $frecuencia_respiratoria = $_POST["frecuencia_respiratoria"];
    $primera_consulta = $_POST["primera_consulta"];
    $motivo_consulta = $_POST["motivo_consulta"];
    $enfermedad_actual = $_POST["enfermedad_actual"];
    $revisin_sistemas = $_POST["revisin_sistemas"];
    $a_p_p = $_POST["a_p_p"];
    $a_p_f = $_POST["a_p_f"];
    $examen_fisico = $_POST["examen_fisico"];
    $impresión_diagnostica = $_POST["impresión_diagnostica"];
    $examenes = $_POST["examenes"];
    $diagnostico_definitivo = $_POST["diagnostico_definitivo"];
    $tratamiento = $_POST["tratamiento"];
    $creado_usuario = $_POST["creado_usuario"];
    $id_creado_usuario = $_POST["id_creado_usuario"];

    $sql = "UPDATE `historia_clinica` SET `id_paciente`=$id_paciente, `id_personal_creado`='$id_personal_creado',`id_personal_asignado`=$id_personal_asignado,`fecha_consulta`='$fecha_consulta',`peso`='$peso',`talla`='$talla',`pulso`='$pulso',`presion_arterial`='$presion_arterial',`temperatura`='$temperatura',`frecuencia_respiratoria`='$frecuencia_respiratoria',`primera_consulta`='$primera_consulta',`motivo_consulta`='$motivo_consulta',`enfermedad_actual`='$enfermedad_actual',`revisin_sistemas`='$revisin_sistemas',`a_p_p`='$a_p_p',`a_p_f`='$a_p_f',`examen_fisico`='$examen_fisico',`impresión_diagnostica`='$impresión_diagnostica',`examenes`='$examenes',`diagnostico_definitivo`='$diagnostico_definitivo',`tratamiento`='$tratamiento',`archivado`= b'$archivado',`edad`='$edad' WHERE `historia_clinica`.`id` = '$id';";
    if(mysqli_query($conn,$sql)){
        
        if($archivado=="1"){
          $sql = "ALTER TABLE `historia_archivado` AUTO_INCREMENT = 1;";
          mysqli_query($conn,$sql);
          $sql = "INSERT INTO `historia_archivado` (`fecha_creacion`,
            `id_h`,
            `fecha_consulta_h`,
            `id_creado_usuario`,
            `creado_usuario`,
            `peso_h`,
            `talla_h`,
            `pulso_h`,
            `presion_arterial_h`,
            `temperatura_h`,
            `frecuencia_respiratoria_h`,
            `primera_consulta_h`,
            `motivo_consulta_h`,
            `enfermedad_actual_h`,
            `revisin_sistemas_h`,
            `a_p_p_h`,
            `a_p_f_h`,
            `examen_fisico_h`,
            `impresión_diagnostica_h`,
            `examenes_h`,
            `diagnostico_definitivo_h`,
            `tratamiento_h`,
            `archivado_h`,
            `edad_h`,
            `id_paci`,
            `tipo_documento_paci`,
            `fecha_creacion_paci`,
            `numero_documento_paci`,
            `nombre_1_paci`,
            `nombre_2_paci`,
            `apellido_1_paci`,
            `apellido_2_paci`,
            `sexo_paci`,
            `correo_paci`,
            `telefono_1_paci`,
            `telefono_2_paci`,
            `fecha_nacimiento_paci`,
            `provincia_paci`,
            `canton_paci`,
            `direccion_paci`,
            `ocupacion_paci`,
            `id_pcpaci`,
            `tipo_documento_pcpaci`,
            `numero_documento_pcpaci`,
            `nombre_1_pcpaci`,
            `nombre_2_pcpaci`,
            `apellido_1_pcpaci`,
            `apellido_2_pcpaci`,
            `sexo_pcpaci`,
            `correo_pcpaci`,
            `telefono_1_pcpaci`,
            `telefono_2_pcpaci`,
            `fecha_nacimiento_pcpaci`,
            `cargo_pcpaci`,
            `especialidad_pcpaci`,
            `miniatura_pcpaci`,
            `foto_pcpaci`,
            `nombre_usuario_pcpaci`,
            `permisos_pcpaci`,
            `id_pc`,
            `tipo_documento_pc`,
            `numero_documento_pc`,
            `nombre_1_pc`,
            `nombre_2_pc`,
            `apellido_1_pc`,
            `apellido_2_pc`,
            `sexo_pc`,
            `correo_pc`,
            `telefono_1_pc`,
            `telefono_2_pc`,
            `fecha_nacimiento_pc`,
            `cargo_pc`,
            `especialidad_pc`,
            `miniatura_pc`,
            `foto_pc`,
            `nombre_usuario_upc`,
            `permisos_upc`,
            `id_pa`,
            `tipo_documento_pa`,
            `numero_documento_pa`,
            `nombre_1_pa`,
            `nombre_2_pa`,
            `apellido_1_pa`,
            `apellido_2_pa`,
            `sexo_pa`,
            `correo_pa`,
            `telefono_1_pa`,
            `telefono_2_pa`,
            `fecha_nacimiento_pa`,
            `cargo_pa`,
            `especialidad_pa`,
            `miniatura_pa`,
            `foto_pa`,
            `nombre_usuario_upa`,
            `permisos_upa`
            )
            
            SELECT 
            CURDATE() AS `fecha_creacion`,
            h.`id`,
            h.`fecha_consulta`,
            '$id_creado_usuario' as `id_creado_usuario`,
            '$creado_usuario' as `creado_usuario`,
            h.`peso`,
            h.`talla`,
            h.`pulso`,
            h.`presion_arterial`,
            h.`temperatura`,
            h.`frecuencia_respiratoria`,
            h.`primera_consulta`,
            h.`motivo_consulta`,
            h.`enfermedad_actual`,
            h.`revisin_sistemas`,
            h.`a_p_p`,
            h.`a_p_f`,
            h.`examen_fisico`,
            h.`impresión_diagnostica`,
            h.`examenes`,
            h.`diagnostico_definitivo`,
            h.`tratamiento`,
            h.`archivado`,
            h.`edad`, 
            paci.`id`,
            paci.`tipo_documento`,
            paci.`fecha_creacion`,
            paci.`numero_documento`,
            paci.`nombre_1`,
            paci.`nombre_2`,
            paci.`apellido_1`,
            paci.`apellido_2`,
            paci.`sexo`,
            paci.`correo`,
            paci.`telefono_1`,
            paci.`telefono_2`,
            paci.`fecha_nacimiento`,
            paci.`provincia`,
            paci.`canton`,
            paci.`direccion`,
            paci.`ocupacion`, 
            tpcpa.`id`,
            tpcpa.`tipo_documento`,
            tpcpa.`numero_documento`,
            tpcpa.`nombre_1`,
            tpcpa.`nombre_2`,
            tpcpa.`apellido_1`,
            tpcpa.`apellido_2`,
            tpcpa.`sexo`,
            tpcpa.`correo`,
            tpcpa.`telefono_1`,
            tpcpa.`telefono_2`,
            tpcpa.`fecha_nacimiento`,
            tpcpa.`cargo`,
            tpcpa.`especialidad`,
            tpcpa.`miniatura`,
            tpcpa.`foto`,
            tpcpa.`nombre_usuario`,
            tpcpa.`permisos`,
            pc.`id`,
            pc.`tipo_documento`,
            pc.`numero_documento`,
            pc.`nombre_1`,
            pc.`nombre_2`,
            pc.`apellido_1`,
            pc.`apellido_2`,
            pc.`sexo`,
            pc.`correo`,
            pc.`telefono_1`,
            pc.`telefono_2`,
            pc.`fecha_nacimiento`,
            pc.`cargo`,
            pc.`especialidad`,
            pc.`miniatura`,
            pc.`foto`,
            upc.`nombre_usuario`,
            upc.`permisos`,
            pa.`id`,
            pa.`tipo_documento`,
            pa.`numero_documento`,
            pa.`nombre_1`,
            pa.`nombre_2`,
            pa.`apellido_1`,
            pa.`apellido_2`,
            pa.`sexo`,
            pa.`correo`,
            pa.`telefono_1`,
            pa.`telefono_2`,
            pa.`fecha_nacimiento`,
            pa.`cargo`,
            pa.`especialidad`,
            pa.`miniatura`,
            pa.`foto`, 
            upa.`nombre_usuario`,
            upa.`permisos`
            FROM 
            `historia_clinica` h
            LEFT JOIN `pacientes` paci ON h.`id_paciente` = paci.`id`
            LEFT JOIN (SELECT
            p.`id`,
            p.`tipo_documento`,
            p.`numero_documento`,
            p.`nombre_1`,
            p.`nombre_2`,
            p.`apellido_1`,
            p.`apellido_2`,
            p.`sexo`,
            p.`correo`,
            p.`telefono_1`,
            p.`telefono_2`,
            p.`fecha_nacimiento`,
            p.`cargo`,
            p.`especialidad`,
            p.`miniatura`,
            p.`foto`,
            u.`nombre_usuario`,
            u.`permisos`
            FROM `personal` p
            LEFT JOIN `usuarios` u ON p.`id` = u.`id_personal`) tpcpa ON  h.`id_paciente` = tpcpa.`id`
            LEFT JOIN `personal`pc on h.`id_personal_creado` = pc.`id`
            LEFT JOIN `usuarios`upc ON h.`id_personal_creado` = upc.`id_personal`
            LEFT JOIN `personal`pa ON h.`id_personal_asignado` = pa.`id`
            LEFT JOIN `usuarios`upa ON h.`id_personal_asignado` = upa.`id_personal` WHERE h.`id` = $id LIMIT 1;
            ";
            mysqli_query($conn,$sql);
        }
        echo "Registro con exitó/0";
    }else{
        echo "Fallo Registro/0";
    }
}else if($tipo=="archhis"){
    $id = $_POST["id"];
    $creado_usuario = $_POST["creado_usuario"];
    $id_creado_usuario = $_POST["id_creado_usuario"];
    $sql = "UPDATE `historia_clinica` SET `archivado`= 1 WHERE `historia_clinica`.`id` = '$id';";
    if(mysqli_query($conn,$sql)){
          $sql = "ALTER TABLE `historia_archivado` AUTO_INCREMENT = 1;";
          mysqli_query($conn,$sql);
          $sql = "INSERT INTO `historia_archivado` (`fecha_creacion`,
        `id_h`,
        `fecha_consulta_h`,
        `id_creado_usuario`,
        `creado_usuario`,
        `peso_h`,
        `talla_h`,
        `pulso_h`,
        `presion_arterial_h`,
        `temperatura_h`,
        `frecuencia_respiratoria_h`,
        `primera_consulta_h`,
        `motivo_consulta_h`,
        `enfermedad_actual_h`,
        `revisin_sistemas_h`,
        `a_p_p_h`,
        `a_p_f_h`,
        `examen_fisico_h`,
        `impresión_diagnostica_h`,
        `examenes_h`,
        `diagnostico_definitivo_h`,
        `tratamiento_h`,
        `archivado_h`,
        `edad_h`,
        `id_paci`,
        `tipo_documento_paci`,
        `fecha_creacion_paci`,
        `numero_documento_paci`,
        `nombre_1_paci`,
        `nombre_2_paci`,
        `apellido_1_paci`,
        `apellido_2_paci`,
        `sexo_paci`,
        `correo_paci`,
        `telefono_1_paci`,
        `telefono_2_paci`,
        `fecha_nacimiento_paci`,
        `provincia_paci`,
        `canton_paci`,
        `direccion_paci`,
        `ocupacion_paci`,
        `id_pcpaci`,
        `tipo_documento_pcpaci`,
        `numero_documento_pcpaci`,
        `nombre_1_pcpaci`,
        `nombre_2_pcpaci`,
        `apellido_1_pcpaci`,
        `apellido_2_pcpaci`,
        `sexo_pcpaci`,
        `correo_pcpaci`,
        `telefono_1_pcpaci`,
        `telefono_2_pcpaci`,
        `fecha_nacimiento_pcpaci`,
        `cargo_pcpaci`,
        `especialidad_pcpaci`,
        `miniatura_pcpaci`,
        `foto_pcpaci`,
        `nombre_usuario_pcpaci`,
        `permisos_pcpaci`,
        `id_pc`,
        `tipo_documento_pc`,
        `numero_documento_pc`,
        `nombre_1_pc`,
        `nombre_2_pc`,
        `apellido_1_pc`,
        `apellido_2_pc`,
        `sexo_pc`,
        `correo_pc`,
        `telefono_1_pc`,
        `telefono_2_pc`,
        `fecha_nacimiento_pc`,
        `cargo_pc`,
        `especialidad_pc`,
        `miniatura_pc`,
        `foto_pc`,
        `nombre_usuario_upc`,
        `permisos_upc`,
        `id_pa`,
        `tipo_documento_pa`,
        `numero_documento_pa`,
        `nombre_1_pa`,
        `nombre_2_pa`,
        `apellido_1_pa`,
        `apellido_2_pa`,
        `sexo_pa`,
        `correo_pa`,
        `telefono_1_pa`,
        `telefono_2_pa`,
        `fecha_nacimiento_pa`,
        `cargo_pa`,
        `especialidad_pa`,
        `miniatura_pa`,
        `foto_pa`,
        `nombre_usuario_upa`,
        `permisos_upa`
        )
        
        SELECT 
        CURDATE() AS `fecha_creacion`,
        h.`id`,
        h.`fecha_consulta`,
        '$id_creado_usuario' as `id_creado_usuario`,
        '$creado_usuario' as `creado_usuario`,
        h.`peso`,
        h.`talla`,
        h.`pulso`,
        h.`presion_arterial`,
        h.`temperatura`,
        h.`frecuencia_respiratoria`,
        h.`primera_consulta`,
        h.`motivo_consulta`,
        h.`enfermedad_actual`,
        h.`revisin_sistemas`,
        h.`a_p_p`,
        h.`a_p_f`,
        h.`examen_fisico`,
        h.`impresión_diagnostica`,
        h.`examenes`,
        h.`diagnostico_definitivo`,
        h.`tratamiento`,
        h.`archivado`,
        h.`edad`, 
        paci.`id`,
        paci.`tipo_documento`,
        paci.`fecha_creacion`,
        paci.`numero_documento`,
        paci.`nombre_1`,
        paci.`nombre_2`,
        paci.`apellido_1`,
        paci.`apellido_2`,
        paci.`sexo`,
        paci.`correo`,
        paci.`telefono_1`,
        paci.`telefono_2`,
        paci.`fecha_nacimiento`,
        paci.`provincia`,
        paci.`canton`,
        paci.`direccion`,
        paci.`ocupacion`, 
        tpcpa.`id`,
        tpcpa.`tipo_documento`,
        tpcpa.`numero_documento`,
        tpcpa.`nombre_1`,
        tpcpa.`nombre_2`,
        tpcpa.`apellido_1`,
        tpcpa.`apellido_2`,
        tpcpa.`sexo`,
        tpcpa.`correo`,
        tpcpa.`telefono_1`,
        tpcpa.`telefono_2`,
        tpcpa.`fecha_nacimiento`,
        tpcpa.`cargo`,
        tpcpa.`especialidad`,
        tpcpa.`miniatura`,
        tpcpa.`foto`,
        tpcpa.`nombre_usuario`,
        tpcpa.`permisos`,
        pc.`id`,
        pc.`tipo_documento`,
        pc.`numero_documento`,
        pc.`nombre_1`,
        pc.`nombre_2`,
        pc.`apellido_1`,
        pc.`apellido_2`,
        pc.`sexo`,
        pc.`correo`,
        pc.`telefono_1`,
        pc.`telefono_2`,
        pc.`fecha_nacimiento`,
        pc.`cargo`,
        pc.`especialidad`,
        pc.`miniatura`,
        pc.`foto`,
        upc.`nombre_usuario`,
        upc.`permisos`,
        pa.`id`,
        pa.`tipo_documento`,
        pa.`numero_documento`,
        pa.`nombre_1`,
        pa.`nombre_2`,
        pa.`apellido_1`,
        pa.`apellido_2`,
        pa.`sexo`,
        pa.`correo`,
        pa.`telefono_1`,
        pa.`telefono_2`,
        pa.`fecha_nacimiento`,
        pa.`cargo`,
        pa.`especialidad`,
        pa.`miniatura`,
        pa.`foto`, 
        upa.`nombre_usuario`,
        upa.`permisos`
        FROM 
        `historia_clinica` h
        LEFT JOIN `pacientes` paci ON h.`id_paciente` = paci.`id`
        LEFT JOIN (SELECT
        p.`id`,
        p.`tipo_documento`,
        p.`numero_documento`,
        p.`nombre_1`,
        p.`nombre_2`,
        p.`apellido_1`,
        p.`apellido_2`,
        p.`sexo`,
        p.`correo`,
        p.`telefono_1`,
        p.`telefono_2`,
        p.`fecha_nacimiento`,
        p.`cargo`,
        p.`especialidad`,
        p.`miniatura`,
        p.`foto`,
        u.`nombre_usuario`,
        u.`permisos`
        FROM `personal` p
        LEFT JOIN `usuarios` u ON p.`id` = u.`id_personal`) tpcpa ON  h.`id_paciente` = tpcpa.`id`
        LEFT JOIN `personal`pc on h.`id_personal_creado` = pc.`id`
        LEFT JOIN `usuarios`upc ON h.`id_personal_creado` = upc.`id_personal`
        LEFT JOIN `personal`pa ON h.`id_personal_asignado` = pa.`id`
            LEFT JOIN `usuarios`upa ON h.`id_personal_asignado` = upa.`id_personal` WHERE h.`id` = '$id' LIMIT 1;
            ";
            mysqli_query($conn,$sql);
        
        echo "Archivado con exitó";
    }else{
        echo "0";
    }
}else if($tipo=="exdpa"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT * FROM `pacientes` WHERE `id` ='".$id."' AND habilitado = 1 LIMIT 1;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        $ids = array();
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            $ids = [
                "tipo_documento" => $fila_tabla_personal_usuario["tipo_documento"],
                "numero_documento" => $fila_tabla_personal_usuario["numero_documento"],
                "nombre_1" => $fila_tabla_personal_usuario["nombre_1"],
                "nombre_2" => $fila_tabla_personal_usuario["nombre_2"],
                "apellido_1" => $fila_tabla_personal_usuario["apellido_1"],
                "apellido_2" => $fila_tabla_personal_usuario["apellido_2"],
                "sexo" => $fila_tabla_personal_usuario["sexo"],
                "correo" => $fila_tabla_personal_usuario["correo"],
                "telefono_1" => $fila_tabla_personal_usuario["telefono_1"],
                "telefono_2" => $fila_tabla_personal_usuario["telefono_2"],
                "fecha_nacimiento" => $fila_tabla_personal_usuario["fecha_nacimiento"],
                "provincia" => $fila_tabla_personal_usuario["provincia"],
                "canton" => $fila_tabla_personal_usuario["canton"],
                "direccion" => $fila_tabla_personal_usuario["direccion"],
                "ocupacion" => $fila_tabla_personal_usuario["ocupacion"]
            ];
        }
        echo json_encode($ids);
    }else{
        echo "fallo";
    }
    
}else  if($tipo=="gedp"){
    $id = $_POST["id_paciente"];
    $tipo_documento = $_POST["tipo_documento"];
    $numero_documento = $_POST["numero_documento"];
    $nombre_1 = $_POST["nombre_1"];
    $nombre_2 = $_POST["nombre_2"];
    $apellido_1 = $_POST["apellido_1"];
    $apellido_2 = $_POST["apellido_2"];
    $sexo = $_POST["sexo"];
    $correo = $_POST["correo"];
    $telefono_1 = $_POST["telefono_1"];
    $telefono_2 = $_POST["telefono_2"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    if($fecha_nacimiento == "")
    {
      $fecha_nacimiento = "null";
    }else{
      $fecha_nacimiento = "'$fecha_nacimiento'";
    }
    $provincia = $_POST["provincia"];
    $canton = $_POST["canton"];
    $direccion = $_POST["direccion"];
    $ocupacion = $_POST["ocupacion"];
    $sql = "UPDATE `pacientes` SET `tipo_documento`='$tipo_documento',`numero_documento`='$numero_documento',`nombre_1`='$nombre_1',`nombre_2`='$nombre_2',`apellido_1`='$apellido_1',`apellido_2`='$apellido_2',`sexo`='$sexo',`correo`='$correo',`telefono_1`='$telefono_1',`telefono_2`='$telefono_2',`fecha_nacimiento`=$fecha_nacimiento,`provincia`='$provincia',`canton`='$canton',`direccion`='$direccion',`ocupacion`='$ocupacion' WHERE `id`='$id'";
    if(mysqli_query($conn,$sql)){
        echo "Registro con exitó";
    }else{
        echo "Fallo Registro";
    }
}else if($tipo=="thasarch"){
    $id_asignado = $_POST["id_asignado"];
    $id = $_POST["id"];
    $fecha_consulta = $_POST["fecha_consulta"];
    $primera_consulta = $_POST["primera_consulta"];
    $cedula = $_POST["cedula"];
    if($cedula==""){
        $isnullorlike1 = "pa.`numero_documento` IS NULL OR pa.`numero_documento` LIKE '%%'";
    }else{
        $isnullorlike1 = "pa.`numero_documento` LIKE '%$cedula%'";
    }
    $nombre = $_POST["nombre"];
    if($nombre==""){
        $isnullorlike2 = "CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) IS NULL OR CONCAT(pa.`nombre_1`, ' ' , pa.`apellido_1`) LIKE '%$nombre%'";
    }else{
        $isnullorlike2 = "CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) LIKE '%$nombre%'";
    }
    $usuario = $_POST["usuario"];
    $cantidad_filas = $_POST["cantidad_filas"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, h.`fecha_consulta`, h.`primera_consulta`, pa.`numero_documento`, pa.`id` AS `id_paciente` , CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) AS `nombre`, u.`nombre_usuario` FROM ((`historia_clinica` h LEFT JOIN `pacientes` pa ON h.`id_paciente` = pa.`id`) LEFT JOIN `usuarios` u ON h.`id_personal_creado` = u.`id_personal`) WHERE h.`habilitado`= 1 AND h.`archivado`= 1 AND h.`id` LIKE '%$id%' AND h.`fecha_consulta` LIKE '%$fecha_consulta%' AND h.`primera_consulta` LIKE '%$primera_consulta%' AND u.`nombre_usuario` LIKE '%$usuario%' AND ( $isnullorlike1 ) AND ( $isnullorlike2 ) ORDER BY h.`id` DESC LIMIT $cantidad_filas;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    $ids_paciente = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            $ids_tabla = str_pad((($fila_tabla_personal_usuario["id"])), 6, "0", STR_PAD_LEFT);
            $ids_tabla = $ids_tabla[0].$ids_tabla[1].$ids_tabla[2]." ".$ids_tabla[3].$ids_tabla[4].$ids_tabla[5];
            echo "<tr class='resultados_de_tablas' onmouseout='desresaltar(".($i-1).")' onmouseover='resaltar(".($i-1).")'>
            <td class='fila_selecionada_".($i-1)." mouseover numero_de_fila_pp'>".$i."</td>
            <td class='fila_selecionada_".($i-1)." id_historial_asignados'>".$ids_tabla."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["fecha_consulta"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["primera_consulta"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["numero_documento"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombre"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombre_usuario"]."</td>
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_ver(".($i-1).")' onmouseover='resaltar_ver(".($i-1).")' class='diseño_ver_".($i-1)." iconos_tabla_accion' onclick='accion_ver(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='diseño_ver_".($i-1)." bi bi-eye' viewBox='0 0 16 16'>
                        <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z'/>
                        <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z'/>
                    </svg>
                    VER
                </div>
            </td>  
            <td class='diseno_editar fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_paciente(".($i-1).")' onmouseover='resaltar_paciente(".($i-1).")' class='diseño_paciente_".($i-1)." iconos_tabla_accion' onclick='accion_paciente(".($i-1).")'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='diseño_paciente_".($i-1)." bi bi-person-fill' viewBox='0 0 16 16'>
                    <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/>
                  </svg>
                    PACIENTE
                </div>
            </td> 
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_asignar(".($i-1).")' onmouseover='resaltar_asignar(".($i-1).")' class='diseño_asignar_".($i-1)." iconos_tabla_accion diseno_asignar' onclick='accion_asignar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='diseño_asignar_".($i-1)." bi bi-person-bounding-box' viewBox='0 0 16 16'>
                        <path d='M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z'/>
                        <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/>
                    </svg>
                    ASIGNAR
                </div>
            </td>
                        
            </tr>";
            
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            array_push($ids_paciente,$fila_tabla_personal_usuario["id_paciente"]);
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
    echo "ids";
    echo json_encode($ids_paciente);
    
}else if($tipo=="tbusasi"){
    $nombres = $_POST["nombres"];
    $usuario = $_POST["usuario"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT p.`id` AS `id`, CONCAT(`nombre_1`,' ',`nombre_2`,' ',`apellido_1`,' ',`apellido_2`) as `nombres`, u.`nombre_usuario` as `usuario` FROM `personal` p INNER JOIN `usuarios` u ON p.`id` = u.`id_personal`WHERE p.`habilitado` = 1 AND u.`habilitado`= 1 AND CONCAT(`nombre_1`,' ',`nombre_2`,' ',`apellido_1`,' ',`apellido_2`) LIKE '%$nombres%' AND u.`nombre_usuario` LIKE '%$usuario%';");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<tr class='resultados_de_tablas_user' onclick='seleccionar_id_personal(".($i-1).")'>
            <td class='fila_selecionada_user_".($i-1)." numero_de_fila_pp'>".$i."</td>
            <td class='fila_selecionada_user_".($i-1)."'>".$fila_tabla_personal_usuario["nombres"]."</td>
            <td class='fila_selecionada_user_".($i-1)."'>".$fila_tabla_personal_usuario["usuario"]."</td>     
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
    
}else if($tipo=="asus"){
    $id = $_POST["id_historial_seleccionado"];
    $id_personal_asignado = $_POST["id_usuario"];
    $sql = "UPDATE `historia_clinica` SET `id_personal_asignado`='$id_personal_asignado', `archivado`= b'0' WHERE `historia_clinica`.`id` = '$id';";
    if(mysqli_query($conn,$sql)){
        echo "exito";
    }else{
        echo "fallo";
    }
}else if($tipo=="dtshis"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT `tipo_documento`,`numero_documento`, CONCAT(`nombre_1`,' ',`nombre_2`) AS `nombres`, CONCAT(`apellido_1`,' ',`apellido_2`) AS `apellidos`, `sexo`, `fecha_nacimiento`,(SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) as `nombre_usuario`, `fecha_creacion` FROM `pacientes` WHERE `id`= '$id' AND `habilitado`= 1 LIMIT 1;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["tipo_documento"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["numero_documento"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["nombres"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["apellidos"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["sexo"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["fecha_nacimiento"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["nombre_usuario"]."</label>
            <label class='label_formulario_pp datos_volatiles_pp'>".$fila_tabla_personal_usuario["fecha_creacion"]."</label>";
        }
    }
}else if($tipo=="dthiarch"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT  h.`fecha_consulta`, h.`peso`, h.`talla`, h.`pulso`, h.`presion_arterial`, h.`temperatura`, h.`frecuencia_respiratoria`, h.`primera_consulta`, h.`motivo_consulta`, h.`enfermedad_actual`, h.`revisin_sistemas`, h.`a_p_p`, h.`a_p_f`, h.`examen_fisico`, h.`impresión_diagnostica`, h.`examenes`, h.`diagnostico_definitivo`, h.`tratamiento`, h.`archivado`, h.`edad`, paci.`tipo_documento`, paci.`fecha_creacion`, paci.`numero_documento`, concat(paci.`nombre_1`,' ', paci.`nombre_2`) AS `nombre_paciente`, concat(paci.`apellido_1`,' ', paci.`apellido_2`) AS `apellido_paciente`, paci.`sexo`, paci.`correo`, paci.`telefono_1`, paci.`telefono_2`, paci.`fecha_nacimiento`, paci.`provincia`, paci.`canton`, paci.`direccion`, paci.`ocupacion`, concat (pc.`nombre_1`,' ', pc.`nombre_2`,' ', pc.`apellido_1`,' ', pc.`apellido_2`) AS `nombres_creado`, uc.`nombre_usuario` AS `usuario_creado`, concat (pa.`nombre_1`,' ', pa.`nombre_2`,' ', pa.`apellido_1`,' ', pa.`apellido_2`) AS `nombres_asignado`, ua.`nombre_usuario` AS `usuario_asignado` FROM `historia_clinica` h LEFT JOIN `pacientes` paci ON h.`id_paciente` = paci.`id` LEFT JOIN `personal` pc ON h.`id_personal_creado` = pc.`id` LEFT JOIN `usuarios` uc ON h.`id_personal_creado` = uc.`id_personal` LEFT JOIN `personal` pa ON h.`id_personal_asignado` = pa.`id` LEFT JOIN `usuarios` ua ON h.`id_personal_asignado` = ua.`id_personal` WHERE h.`id` = '$id';");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<label class='datos_volatiles_ver_pp' >INFORMACION PACIENTE: </label>
                <div class='datos_volatiles_ver_pp division_contenedor_N4'> 
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>TIPO DOCUMENTO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["tipo_documento"]."</label> 
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>N° DOCUMENTO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["numero_documento"]."</label> 
                        </div>
                    </div>
                    
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>NOMBRES:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["nombre_paciente"]."</label> 
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>APELLIDOS:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["apellido_paciente"]."</label> 
                        </div>
                    </div>
                    
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>SEXO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["sexo"]."</label>
                        </div>
                        <div class='informacion_ver_historial_N2'> 
                            <label class='tipo_de_dato_ver'>CORREO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["correo"]."</label> 
                        </div>
                    </div>
                    
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>TELEFONO PRINCIPAL:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["telefono_1"]."</label> 
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>TELEFONO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["telefono_2"]."</label> 
                        </div>
                    </div>
                    
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>FECHA NACIMIENTO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["fecha_nacimiento"]."</label>
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>EDAD:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["edad"]."</label>
                        </div>
                    </div>     
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>PROVINCIA:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["provincia"]."</label> 
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>CANTON:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["canton"]."</label> 
                        </div>
                    </div>
                </div> 
                <label class='datos_volatiles_ver_pp' >INFORMACION CONSULTA: </label>
                <div class='datos_volatiles_ver_pp division_contenedor_N4'>  
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>FECHA CONSULTA:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["fecha_consulta"]."</label> 
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>PRIMERA CONSULTA:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["primera_consulta"]."</label>
                        </div>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>PESO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["peso"]."</label> 
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>TALLA:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["talla"]."</label> 
                        </div>
                    </div>
                    
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>PULSO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["pulso"]."</label> 
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>PRESION ARTERIAL:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["presion_arterial"]."</label>
                        </div>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>TEMPERATURA:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["temperatura"]."</label> 
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>FRECUENCIA RESPIRATORIA:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["frecuencia_respiratoria"]."</label> 
                        </div>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>MOTIVO CONSULTA:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["motivo_consulta"]."</label> 
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>ENFERMEDAD ACTUAL:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["enfermedad_actual"]."</label>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>REVISION SISTEMAS:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["revisin_sistemas"]."</label>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>A.P.P.:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["a_p_p"]."</label>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>A.P.F.:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["a_p_f"]."</label>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>EXAMEN FISICO:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["examen_fisico"]."</label> 
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>IMPRESIÓN DIAGNOSTICA:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["impresión_diagnostica"]."</label>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>EXAMENES:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["examenes"]."</label>
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>DIAGNOSTICO DEFINITIVO:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["diagnostico_definitivo"]."</label> 
                    </div>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N3'>
                        <label class='tipo_de_dato_ver'>TRATAMIENTO:</label>
                        <label class='dato_ver'>".$fila_tabla_personal_usuario["tratamiento"]."</label>
                    </div>
                </div> 
                <label class='datos_volatiles_ver_pp'>CREADO POR: </label>
                <div class=' datos_volatiles_ver_pp division_contenedor_N4'>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>NOMBRES:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["nombres_creado"]."</label>
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>USUARIO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["usuario_creado"]."</label>
                        </div>
                    </div>
                </div> 
                <label class='datos_volatiles_ver_pp' >ULTIMO ASIGNADO: </label>
                <div class=' datos_volatiles_ver_pp division_contenedor_N4'>
                    <div class='datos_volatiles_ver_pp informacion_ver_historial_N1'>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>NOMBRES:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["nombres_asignado"]."</label>
                        </div>
                        <div class='informacion_ver_historial_N2'>
                            <label class='tipo_de_dato_ver'>USUARIO:</label>
                            <label class='dato_ver'>".$fila_tabla_personal_usuario["usuario_asignado"]."</label>
                        </div>
                    </div>
                </div>";
        }
    }else{
        echo "Fallo";
    }
}else if($tipo=="dape"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT u.`nombre_usuario`, p.`tipo_documento`, p.`numero_documento`, p.`nombre_1`, p.`nombre_2`, p.`apellido_1`, p.`apellido_2`, p.`sexo`, p.`correo`, p.`telefono_1`, p.`telefono_2`, p.`fecha_nacimiento`, p.`cargo`, p.`especialidad`, p.`miniatura`, p.`foto` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`habilitado` = 1  AND  p.`id` = '$id';");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        $personal = array();
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            $personal = [
                "nombre_usuario" => $fila_tabla_personal_usuario["nombre_usuario"],
                "tipo_documento" => $fila_tabla_personal_usuario["tipo_documento"],
                "numero_documento" => $fila_tabla_personal_usuario["numero_documento"],
                "nombre_1" => $fila_tabla_personal_usuario["nombre_1"],
                "nombre_2" => $fila_tabla_personal_usuario["nombre_2"],
                "apellido_1" => $fila_tabla_personal_usuario["apellido_1"],
                "apellido_2" => $fila_tabla_personal_usuario["apellido_2"],
                "sexo" => $fila_tabla_personal_usuario["sexo"],
                "correo" => $fila_tabla_personal_usuario["correo"],
                "telefono_1" => $fila_tabla_personal_usuario["telefono_1"],
                "telefono_2" => $fila_tabla_personal_usuario["telefono_2"],
                "fecha_nacimiento" => $fila_tabla_personal_usuario["fecha_nacimiento"],
                "cargo" => $fila_tabla_personal_usuario["cargo"],
                "especialidad" => $fila_tabla_personal_usuario["especialidad"],
                "miniatura" => $fila_tabla_personal_usuario["miniatura"],
                "foto" => $fila_tabla_personal_usuario["foto"]
            ];
        }
        echo json_encode($personal);
    }else{
        echo "fallo";
    }
}else if($tipo=="gdpepp"){
    $id = $_POST["id"];
    $nombre_1 = $_POST["nombre_1"];
    $nombre_2 = $_POST["nombre_2"];
    $apellido_1 = $_POST["apellido_1"];
    $apellido_2 = $_POST["apellido_2"];
    $sexo = $_POST["sexo"];
    $correo = $_POST["correo"];
    $telefono_1 = $_POST["telefono_1"];
    $telefono_2 = $_POST["telefono_2"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    if($fecha_nacimiento == ""){
      $fecha_nacimiento = "null";
    }else{
      $fecha_nacimiento = "'$fecha_nacimiento'";
    }
    $miniatura = $_POST["miniatura"];
    $foto = $_POST["foto"];

    $sql = "UPDATE `personal` SET `nombre_1`='$nombre_1',`nombre_2`='$nombre_2',`apellido_1`='$apellido_1',`apellido_2`='$apellido_2',`sexo`='$sexo',`correo`='$correo',`telefono_1`='$telefono_1',`telefono_2`='$telefono_2', `fecha_nacimiento`=$fecha_nacimiento ,`miniatura`='$miniatura',`foto`='$foto' WHERE `id`='$id';";
    if(mysqli_query($conn,$sql)){
        echo "1";
    }else{
        echo "0";
    }
}else if($tipo=="cpp"){
    $id = $_POST["id"];
    $contrasena_usuario = password_hash($_POST["contrasena_usuario"], PASSWORD_BCRYPT);

    $sql = "UPDATE `usuarios` SET `contrasena_usuario`='$contrasena_usuario' WHERE `id_personal`='$id';";
    if(mysqli_query($conn,$sql)){
        echo "Exito";
    }else{
        echo "Fallo";
    }
}else if($tipo=="dpabt"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT p.`tipo_documento`, u.`nombre_usuario` as `usuario`, CONCAT(pe.`nombre_1`,' ',pe.`apellido_1`) as`creado_por`, p.`fecha_creacion`, p.`numero_documento`, p.`nombre_1`, p.`nombre_2`, p.`apellido_1`, p.`apellido_2`, p.`sexo`, p.`correo`, p.`telefono_1`, p.`telefono_2`, p.`fecha_nacimiento`, p.`provincia`, p.`canton`, p.`direccion`, p.`ocupacion` FROM `pacientes` p  INNER JOIN `usuarios` u ON u.`id_personal` = p.`id_personal_creado`INNER JOIN `personal` pe ON pe.`id` = p.`id_personal_creado`WHERE p.`id` = '$id';");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1){
        $personal = array();
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH)){
            $personal = [
                "tipo_documento" => $fila_tabla_personal_usuario["tipo_documento"],
                "numero_documento" => $fila_tabla_personal_usuario["numero_documento"],
                "nombre_1" => $fila_tabla_personal_usuario["nombre_1"],
                "nombre_2" => $fila_tabla_personal_usuario["nombre_2"],
                "apellido_1" => $fila_tabla_personal_usuario["apellido_1"],
                "apellido_2" => $fila_tabla_personal_usuario["apellido_2"],
                "sexo" => $fila_tabla_personal_usuario["sexo"],
                "correo" => $fila_tabla_personal_usuario["correo"],
                "telefono_1" => $fila_tabla_personal_usuario["telefono_1"],
                "telefono_2" => $fila_tabla_personal_usuario["telefono_2"],
                "fecha_nacimiento" => $fila_tabla_personal_usuario["fecha_nacimiento"],
                "provincia" => $fila_tabla_personal_usuario["provincia"],
                "canton" => $fila_tabla_personal_usuario["canton"],
                "direccion" => $fila_tabla_personal_usuario["direccion"],
                "ocupacion" => $fila_tabla_personal_usuario["ocupacion"],
                "fecha_creacion" => $fila_tabla_personal_usuario["fecha_creacion"],
                "creado_por" => $fila_tabla_personal_usuario["creado_por"],
                "usuario" => $fila_tabla_personal_usuario["usuario"]
            ];
        }
        echo json_encode($personal);
    }else{
        echo "fallo";
    }
}else if($tipo=="tphs"){

$id = $_POST["id"];
$id_historial = $_POST["id_historial"];
$fecha_consulta = $_POST["fecha_consulta"];
$usuario_creado = $_POST["usuario_creado"];
$usuario_asignado = $_POST["usuario_asignado"];
$archivado = $_POST["archivado"];
$cantidad_filas = $_POST["cantidad_filas"];
$query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT
        h.`id`,
        h.`fecha_consulta`,
        IF(
            h.`archivado` = 1,
            'SI',
            'NO'
        ) AS `archivado`,
        uc.`nombre_usuario` AS `usuario_creado`,
        ua.`nombre_usuario` AS `usuario_asignado`
    FROM
        `historia_clinica` h
        LEFT JOIN `usuarios` uc ON h.`id_personal_creado` = uc.`id_personal`
        LEFT JOIN `usuarios` ua ON h.`id_personal_asignado` = ua.`id_personal`
    WHERE
        h.`id_paciente` = '$id'
        AND h.`id` LIKE '%$id_historial%'
        AND h.`fecha_consulta` LIKE '%$fecha_consulta%'
        AND(IF('$usuario_creado'='',(uc.`nombre_usuario` IS NULL OR uc.`nombre_usuario` LIKE '%%'),(uc.`nombre_usuario` LIKE '%$usuario_creado%')))
        AND(IF('$usuario_asignado'='',(ua.`nombre_usuario` IS NULL OR ua.`nombre_usuario` LIKE '%%'),(ua.`nombre_usuario` LIKE '%$usuario_asignado%')))
        AND IF(
            h.`archivado` = 1,
            'SI',
            'NO'
        ) LIKE '%$archivado%'
        AND h.`habilitado` = 1
    ORDER BY
        h.`fecha_consulta` DESC LIMIT $cantidad_filas;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            $ids_tabla = str_pad((($fila_tabla_personal_usuario["id"])), 6, "0", STR_PAD_LEFT);
            $ids_tabla = $ids_tabla[0].$ids_tabla[1].$ids_tabla[2]." ".$ids_tabla[3].$ids_tabla[4].$ids_tabla[5];
            echo "<tr class='resultados_de_tablas' onmouseout='desresaltar(".($i-1).")' onmouseover='resaltar(".($i-1).")'>
            <td class='fila_selecionada_".($i-1)." mouseover numero_de_fila_pp'>".$i."</td>
            <td class='fila_selecionada_".($i-1)." id_historial_asignados'>".$ids_tabla."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["fecha_consulta"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["archivado"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["usuario_creado"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["usuario_asignado"]."</td>
            

            <td class='diseno_editar fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_editar(".($i-1).")' onmouseover='resaltar_editar(".($i-1).")' class='diseño_editar_".($i-1)." iconos_tabla_accion' onclick='accion_editar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'  width='16' height='16' class='diseño_editar_".($i-1)." bi bi-pencil' viewBox='0 0 16 16'>
                        <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>
                    </svg>
                    EDITAR
                </div>
            </td>

                        
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
}else if($tipo=="tppad"){
    $habilitado = $_POST["habilitado"];
    $tipo_documento = $_POST["tipo_documento"];
    $numero_documento = $_POST["numero_documento"];
    $nombres = $_POST["nombres"];
    $cargo = $_POST["cargo"];
    $cantidad_filas = $_POST["cantidad_filas"];
    $nombre_usuario = $_POST["nombre_usuario"];

    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, IF(h.`habilitado`=1,'SI','NO') AS `habilitado`,IF(h.`tipo_documento`='Pasaporte','P','C')  AS `tipo_documento`, h.`numero_documento`, CONCAT(h.`nombre_1`,' ',h.`nombre_2`,' ',h.`apellido_1`,' ',h.`apellido_2`) AS `nombres`, h.`cargo`, u.`nombre_usuario` FROM `personal` h INNER JOIN `usuarios` u ON u.`id_personal` = h.`id` WHERE
    IF(h.`habilitado`= 1,'SI','NO') LIKE '%$habilitado%' AND 
    h.`tipo_documento` LIKE '%$tipo_documento%' AND
    h.`numero_documento` LIKE '%$numero_documento%' AND 
    CONCAT(h.`nombre_1`,' ',h.`nombre_2`,' ',h.`apellido_1`,' ',h.`apellido_2`) LIKE '%$nombres%' AND
    u.`nombre_usuario` LIKE '%$nombre_usuario%' AND
    h.`cargo` LIKE '%$cargo%'  LIMIT $cantidad_filas ;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<tr class='resultados_de_tablas' onmouseout='desresaltar(".($i-1).")' onmouseover='resaltar(".($i-1).")'>
            <td class='fila_selecionada_".($i-1)." mouseover numero_de_fila_pp'>".$i."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["habilitado"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["tipo_documento"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["numero_documento"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombres"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["cargo"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombre_usuario"]."</td>
            
            
            <td class='diseno_editar fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_editar(".($i-1).")' onmouseover='resaltar_editar(".($i-1).")' class='diseño_editar_".($i-1)." iconos_tabla_accion' onclick='accion_editar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'  width='16' height='16' class='diseño_editar_".($i-1)." bi bi-pencil' viewBox='0 0 16 16'>
                        <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>
                    </svg>
                    EDITAR
                </div>
            </td>
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_pass(".($i-1).")' onmouseover='resaltar_pass(".($i-1).")' class='diseño_pass_".($i-1)." iconos_tabla_accion diseno_pass' onclick='accion_pass(".($i-1).")'>

                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='diseño_pass_".($i-1)." bi bi-lock-fill' viewBox='0 0 16 16'>
                        <path d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z'/>
                    </svg>

                    PASW
                </div>
            </td>
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'>
                <div onmouseout='desresaltar_eliminar(".($i-1).")' onmouseover='resaltar_eliminar(".($i-1).")'class='diseño_eliminar_".($i-1)." iconos_tabla_accion' onclick='accion_eliminar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'   width='16' height='16' class='diseño_eliminar_".($i-1)." n bi bi-trash-fill' viewBox='0 0 16 16'>
                        <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'/>
                    </svg>
                    ELIMINAR
                </div>
            </td>
                        
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
    
}else if($tipo=="tadm"){
    $nombre_usuario = $_POST["nombre_usuario"];
    $habilitado = $_POST["habilitado"];
    $cantidad_filas = $_POST["cantidad_filas"];

    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT `nombre_usuario`, IF(`habilitado`= 1,'SI','NO') AS `habilitado` FROM `usuarios` WHERE `permisos`= 2
    AND `nombre_usuario` like'%$nombre_usuario%'
    AND IF(`habilitado`= 1,'SI','NO') like'%$habilitado%'
    LIMIT $cantidad_filas;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<tr class='resultados_de_tablas' onmouseout='desresaltar(".($i-1).")' onmouseover='resaltar(".($i-1).")'>
            <td class='fila_selecionada_".($i-1)." mouseover numero_de_fila_pp'>".$i."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["habilitado"]."</td> 
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombre_usuario"]."</td>           
            
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_editar(".($i-1).")' onmouseover='resaltar_editar(".($i-1).")' class='diseño_editar_".($i-1)." iconos_tabla_accion' onclick='accion_editar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'  width='16' height='16' class='diseño_editar_".($i-1)." bi bi-pencil' viewBox='0 0 16 16'>
                        <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>
                    </svg>
                    EDITAR
                </div>
            </td>
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'>
                <div onmouseout='desresaltar_eliminar(".($i-1).")' onmouseover='resaltar_eliminar(".($i-1).")'class='diseño_eliminar_".($i-1)." iconos_tabla_accion' onclick='accion_eliminar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg'   width='16' height='16' class='diseño_eliminar_".($i-1)." n bi bi-trash-fill' viewBox='0 0 16 16'>
                        <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'/>
                    </svg>
                    ELIMINAR
                </div>
            </td>
                        
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["nombre_usuario"]);
            $i++;
        }
    }
    echo "ids";
    echo json_encode($ids);
    
}else if($tipo=="dpers"){
    $id = $_POST["id"];
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT u.`nombre_usuario`, p.`habilitado`, p.`tipo_documento`, p.`numero_documento`, p.`nombre_1`, p.`nombre_2`, p.`apellido_1`, p.`apellido_2`, p.`sexo`, p.`correo`, p.`telefono_1`, p.`telefono_2`, p.`fecha_nacimiento`, p.`cargo`, p.`especialidad`, p.`miniatura`, p.`foto` FROM `personal` p INNER JOIN `usuarios` u on u.`id_personal` = p.`id`  WHERE p.`id` = '$id';");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        $personal = array();
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            $personal = [
                "habilitado" => $fila_tabla_personal_usuario["habilitado"],
                "tipo_documento" => $fila_tabla_personal_usuario["tipo_documento"],
                "numero_documento" => $fila_tabla_personal_usuario["numero_documento"],
                "nombre_1" => $fila_tabla_personal_usuario["nombre_1"],
                "nombre_2" => $fila_tabla_personal_usuario["nombre_2"],
                "apellido_1" => $fila_tabla_personal_usuario["apellido_1"],
                "apellido_2" => $fila_tabla_personal_usuario["apellido_2"],
                "sexo" => $fila_tabla_personal_usuario["sexo"],
                "correo" => $fila_tabla_personal_usuario["correo"],
                "telefono_1" => $fila_tabla_personal_usuario["telefono_1"],
                "telefono_2" => $fila_tabla_personal_usuario["telefono_2"],
                "fecha_nacimiento" => $fila_tabla_personal_usuario["fecha_nacimiento"],
                "cargo" => $fila_tabla_personal_usuario["cargo"],
                "especialidad" => $fila_tabla_personal_usuario["especialidad"],
                "nombre_usuario" => $fila_tabla_personal_usuario["nombre_usuario"]
            ];
        }
        echo json_encode($personal);
    }else{
        echo "fallo";
    }
}else if($tipo=="gdaper"){
    $id_personal = $_POST["id_personal"];
    $habilitado = $_POST["habilitado"];
    $tipo_documento = $_POST["tipo_documento"];
    $numero_documento = $_POST["numero_documento"];
    $nombre_1 = $_POST["nombre_1"];
    $nombre_2 = $_POST["nombre_2"];
    $apellido_1 = $_POST["apellido_1"];
    $apellido_2 = $_POST["apellido_2"];
    $sexo = $_POST["sexo"];
    $correo = $_POST["correo"];
    $telefono_1 = $_POST["telefono_1"];
    $telefono_2 = $_POST["telefono_2"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    if($fecha_nacimiento == "")
    {
      $fecha_nacimiento = "null";
    }else{
      $fecha_nacimiento = "'$fecha_nacimiento'";
    }
    

    $cargo = $_POST["cargo"];
    $especialidad = $_POST["especialidad"];
    $usuario = $_POST["usuario"];

    $sql = "UPDATE `usuarios` SET `nombre_usuario`='$usuario', `habilitado`=$habilitado WHERE `id_personal`='$id_personal';";
    if(mysqli_query($conn,$sql)){
        $sql = "UPDATE `personal` SET `habilitado`=$habilitado,`tipo_documento`='$tipo_documento',`numero_documento`='$numero_documento',`nombre_1`='$nombre_1',`nombre_2`=' $nombre_2',`apellido_1`='$apellido_1',`apellido_2`='$apellido_2',`sexo`='$sexo',`correo`='$correo',`telefono_1`='$telefono_1',`telefono_2`='$telefono_2', `fecha_nacimiento`=$fecha_nacimiento,`cargo`='$cargo',`especialidad`='$especialidad',`miniatura`='',`foto`='' WHERE `id`='$id_personal';";
        if(mysqli_query($conn,$sql)){
            echo "1";
        }else{
            echo "0";
        }
    }else{
        echo "0";
    }
}else if($tipo=="gnuper"){
    $id_personal = $_POST["id_personal"];
    $habilitado = $_POST["habilitado"];
    $tipo_documento = $_POST["tipo_documento"];
    $numero_documento = $_POST["numero_documento"];
    $nombre_1 = $_POST["nombre_1"];
    $nombre_2 = $_POST["nombre_2"];
    $apellido_1 = $_POST["apellido_1"];
    $apellido_2 = $_POST["apellido_2"];
    $sexo = $_POST["sexo"];
    $correo = $_POST["correo"];
    $telefono_1 = $_POST["telefono_1"];
    $telefono_2 = $_POST["telefono_2"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    if($fecha_nacimiento == "")
    {
      $fecha_nacimiento = "null";
    }else{
      $fecha_nacimiento = "'$fecha_nacimiento'";
    }

    $cargo = $_POST["cargo"];
    $especialidad = $_POST["especialidad"];
    $usuario = $_POST["usuario"];
    $miniatura = "";
    $foto = "";
    $contrasena_usuario = password_hash($_POST["contrasena_usuario"], PASSWORD_BCRYPT);

    $scripsql = "SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = REPLACE('$usuario',' ','');";
    if (mysqli_num_rows(mysqli_query($conn,$scripsql))==0){
      $scripsql = "SET @variable_id=uuid();";
      mysqli_query($conn,$scripsql);
      $scripsql = "INSERT INTO personal (id, habilitado, tipo_documento, numero_documento, nombre_1, nombre_2, apellido_1, apellido_2, sexo, correo, telefono_1, telefono_2, fecha_nacimiento, cargo, especialidad, miniatura, foto) VALUES (@variable_id,$habilitado,'$tipo_documento','$numero_documento','$nombre_1','$nombre_2','$apellido_1','$apellido_2','$sexo','$correo','$telefono_1','$telefono_2',$fecha_nacimiento,'$cargo','$especialidad','$miniatura','$foto')";
      if(mysqli_query($conn,$scripsql)){
        $scripsql = "INSERT INTO usuarios (nombre_usuario, contrasena_usuario, id_personal, permisos, habilitado) VALUES ('$usuario','$contrasena_usuario',@variable_id,1,$habilitado);";
        //echo 'Error: '. $conn->error;
        //$resl = mysqli_query($conn,$scripsql);
        if(mysqli_query($conn,$scripsql)){
          echo "1";
        }else{
          echo "0";
        }
      }else{
        echo "0";
      }
    }else{
      echo "0";
    }
}else if($tipo=="elpers"){
    $id = $_POST["id"];
    $sql ="SET FOREIGN_KEY_CHECKS = 0;";
    $conn->query($sql);
    $sql = "DELETE FROM `usuarios` WHERE `id_personal`= '$id' ;";
    if($conn->query($sql) === TRUE){
        $sql = "DELETE FROM `personal` WHERE `id` = '$id';";
        if($conn->query($sql) === TRUE){
            echo "1";
        }else{
            echo "0";
        }
    }else{
        echo "0";
    }
}else if($tipo=="cpswpe"){
    $id = $_POST["id"];
    $contrasena_usuario = password_hash($_POST["contrasena_usuario"], PASSWORD_BCRYPT);

    $sql = "UPDATE `usuarios` SET `contrasena_usuario`='$contrasena_usuario' WHERE `id_personal`='$id';";
    if(mysqli_query($conn,$sql)){
        echo "1";
    }else{
        echo "0";
    }
}else if($tipo=="tarchdesca"){
    $id = $_POST["id"];
    $fecha_creacion = $_POST["fecha_creacion"];
    $id_h = $_POST["id_h"];
    $fecha_consulta_h = $_POST["fecha_consulta_h"];
    $creado_usuario = $_POST["creado_usuario"];
    $cantidad_filas = $_POST["cantidad_filas"];
    $numero_documento_paci = $_POST["numero_documento_paci"];
    $nombres = $_POST["nombres"];
    //$query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, h.`fecha_consulta`, h.`primera_consulta`, pa.`numero_documento`, CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) AS `nombre`, u.`nombre_usuario` FROM ((`historia_clinica` h LEFT JOIN `pacientes` pa ON h.`id_paciente` = pa.`id`) LEFT JOIN `usuarios` u ON h.`id_personal_creado` = u.`id_personal`) WHERE h.`habilitado`= b'1' AND h.`archivado`= b'1' AND h.`id_personal_asignado`= '$id_asignado' AND h.`id` LIKE '%$id%' AND h.`fecha_consulta` LIKE '%$fecha_consulta%' AND h.`primera_consulta` LIKE '%$primera_consulta%' AND u.`nombre_usuario` LIKE '%$usuario%' AND ( $isnullorlike1 ) AND ( $isnullorlike2 ) ORDER BY h.`id` DESC LIMIT $cantidad_filas;");
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT `id`, `fecha_creacion`, `id_h`, `fecha_consulta_h`, `creado_usuario`,`numero_documento_paci`,CONCAT(`nombre_1_paci`,' ',`apellido_1_paci`) AS `nombres` FROM `historia_archivado` WHERE 
    `id` LIKE '%$id%' AND
    `fecha_creacion` LIKE '%$fecha_creacion%' AND
    `id_h` LIKE '%$id_h%' AND
    IF('$fecha_consulta_h'='',`fecha_consulta_h` LIKE '%%' OR `fecha_consulta_h` IS NULL, `fecha_consulta_h` LIKE '%$fecha_consulta_h%') AND
    IF('$numero_documento_paci'='',`numero_documento_paci` LIKE '%%' OR `numero_documento_paci` IS NULL, `numero_documento_paci` LIKE '%$numero_documento_paci%') AND
IF('$nombres'='',CONCAT(`nombre_1_paci`,' ',`apellido_1_paci`) LIKE '%%' OR  CONCAT(`nombre_1_paci`,' ',`apellido_1_paci`) IS NULL, CONCAT(`nombre_1_paci`,' ',`apellido_1_paci`) LIKE '%$nombres%') AND
    IF('$creado_usuario'='',`creado_usuario` LIKE '%%' OR `creado_usuario` IS NULL, `creado_usuario` LIKE '%$creado_usuario%')
     ORDER BY `id` DESC , `fecha_consulta_h` DESC  LIMIT $cantidad_filas;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            $ids_tabla = str_pad((($fila_tabla_personal_usuario["id_h"])), 6, "0", STR_PAD_LEFT);
            $ids_tabla = $ids_tabla[0].$ids_tabla[1].$ids_tabla[2]." ".$ids_tabla[3].$ids_tabla[4].$ids_tabla[5];

            echo "<tr class='resultados_de_tablas' onmouseout='desresaltar(".($i-1).")' onmouseover='resaltar(".($i-1).")'>
            <td class='fila_selecionada_".($i-1)." mouseover numero_de_fila_pp'>".$fila_tabla_personal_usuario["id"]."</td>
            <td class='fila_selecionada_".($i-1)." id_historial_asignados'>".$fila_tabla_personal_usuario["fecha_creacion"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["creado_usuario"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$ids_tabla."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["numero_documento_paci"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["nombres"]."</td>
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["fecha_consulta_h"]."</td>
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_descargar(".($i-1).")' onmouseover='resaltar_descargar(".($i-1).")' class='diseño_descargar_".($i-1)." iconos_tabla_accion' onclick='accion_descargar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='diseño_descargar_".($i-1)." bi bi-clipboard2-heart-fill' viewBox='0 0 16 16'>
                        <path fill-rule='evenodd' d='M10.058.501a.501.501 0 0 0-.5-.501h-2.98c-.276 0-.5.225-.5.501A.499.499 0 0 1 5.582 1a.497.497 0 0 0-.497.497V2a.5.5 0 0 0 .5.5h4.968a.5.5 0 0 0 .5-.5v-.503A.497.497 0 0 0 10.555 1a.499.499 0 0 1-.497-.499Z'/>
                        <path fill-rule='evenodd' d='M4.174 1h-.57a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5h-.642c.055.156.085.325.085.5V2c0 .828-.668 1.5-1.492 1.5H5.581A1.496 1.496 0 0 1 4.09 2v-.5c0-.175.03-.344.085-.5Zm3.894 5.482c1.656-1.673 5.795 1.254 0 5.018-5.795-3.764-1.656-6.69 0-5.018Z'/>
                    </svg>
                    DESCARGAR
                </div>
            </td> 
                        
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
    
}

$conn->close();

} catch (Exception $e) {
    echo "0";
}


?>