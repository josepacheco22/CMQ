<?php 

$conn = new mysqli("localhost","root","1311206104","cmq");

$tipo = $_POST["tipo"];

if($tipo=="tpa"){
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


    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT `id`, `tipo_documento`, `numero_documento`, `nombres`, `apellidos`, (SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) as `nombre_usuario`, `fecha_creacion`  FROM `pacientes` WHERE `habilitado` = 1 AND `tipo_documento` LIKE '%$tipo_documento%' AND `numero_documento` LIKE '%$numerodoc%' AND `nombres` LIKE '%$nombres%' AND `apellidos` LIKE '%$apellidos%' AND (SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) LIKE '%$creado_por%' AND `fecha_creacion` LIKE '%$fecha_creado%' LIMIT $numero_filas_consultar;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            echo "<tr class='resultados_de_tablas'>
            <td>".$i."</td>
            <td>".$fila_tabla_personal_usuario["tipo_documento"]."</td>
            <td>".$fila_tabla_personal_usuario["numero_documento"]."</td>
            <td>".$fila_tabla_personal_usuario["nombres"]."</td>
            <td>".$fila_tabla_personal_usuario["apellidos"]."</td>
            <td>".$fila_tabla_personal_usuario["nombre_usuario"]."</td>
            <td>".$fila_tabla_personal_usuario["fecha_creacion"]."</td>
            <td class='tabla_contenedores_accion_rp'>
                <svg xmlns='http://www.w3.org/2000/svg' onclick='accion_editar(".$i.")' class='iconos_tabla_accion bi bi-pencil' viewBox='0 0 16 16'>
                    <path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/>
                </svg>
            </td>
            <td class='tabla_contenedores_accion_rp'>
                <svg xmlns='http://www.w3.org/2000/svg' onclick='accion_deshabilitar(".$i.")' class='iconos_tabla_accion bi bi-trash-fill' viewBox='0 0 16 16'>
                    <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/>
                </svg>
            </td>
            </tr>";
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }
        echo "ids";
        echo json_encode($ids);

    }
    
}

?> 