<?php

$conn = new mysqli("localhost","root","1311206104","cmq");

$tipo = $_POST["tipo"];
if($tipo=="vr")
{
    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];
    $queryusuario = mysqli_query($conn,"SELECT * FROM usuarios WHERE nombre_usuario = '$usuario'");
    $numero_filas = mysqli_num_rows($queryusuario); 
    $resultado = mysqli_fetch_array($queryusuario);
    if (($numero_filas==1) && (password_verify($contrasena,$resultado['contrasena_usuario'])) )
    { 
        $info = array(
        $resultado['id_personal'],
        $resultado['permisos'],
        $resultado['habilitado']);

        $json_info = json_encode($info);
        echo $json_info;
    }else
    {
        echo "N";
    }
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
    
}else if($tipo=="bndp"){
    $parametro = $_POST["parametro"];
    $queryusuario = mysqli_query($conn,"SELECT `numero_documento` FROM `pacientes` WHERE `numero_documento` = '$parametro'");
    $numero_filas = mysqli_num_rows($queryusuario);
    if ($numero_filas>=1){
        echo "3px solid #e24444/1";
    }else{
        echo "3px solid #787ff6/0";
    }
}else if($tipo=="pr"){
    $provincia = $_POST["provincia"];
    if($provincia == "Esmeraldas"){
        echo "<option value='Quinindé' class='limpiar_select'>Quinindé</option>
        <option value='Esmeraldas' class='limpiar_select'>Esmeraldas</option>
        <option value='Atacames' class='limpiar_select'>Atacames</option>
        <option value='Eloy Alfaro' class='limpiar_select'>Eloy Alfaro</option>
        <option value='Muisne' class='limpiar_select'>Muisne</option>
        <option value='Rioverde' class='limpiar_select'>Rioverde</option>
        <option value='San Lorenzo' class='limpiar_select'>San Lorenzo</option>";
    }else if($provincia == "Azuay"){
        echo "<option value='Cuenca' class='limpiar_select'>Cuenca</option>
        <option value='Camilo Ponce Enríquez' class='limpiar_select'>Camilo Ponce Enríquez</option>
        <option value='Chordeleg' class='limpiar_select'>Chordeleg</option>
        <option value='El Pan' class='limpiar_select'>El Pan</option>
        <option value='Girón' class='limpiar_select'>Girón</option>
        <option value='Guachapala' class='limpiar_select'>Guachapala</option>
        <option value='Gualaceo' class='limpiar_select'>Gualaceo</option>
        <option value='Nabón' class='limpiar_select'>Nabón</option>
        <option value='Oña' class='limpiar_select'>Oña</option>
        <option value='Paute' class='limpiar_select'>Paute</option>
        <option value='Pucará' class='limpiar_select'>Pucará</option>
        <option value='San Fernando' class='limpiar_select'>San Fernando</option>
        <option value='Santa Isabel' class='limpiar_select'>Santa Isabel</option>
        <option value='Sevilla de Oro' class='limpiar_select'>Sevilla de Oro</option>
        <option value='Sígsig' class='limpiar_select'>Sígsig</option>";
    }else if($provincia == "Bolívar"){ 
        echo "<option value='Guaranda' class='limpiar_select'>Guaranda</option>
        <option value='Caluma' class='limpiar_select'>Caluma</option>
        <option value='Chillanes' class='limpiar_select'>Chillanes</option>
        <option value='Chimbo' class='limpiar_select'>Chimbo</option>
        <option value='Echeandía' class='limpiar_select'>Echeandía</option>
        <option value='Las Naves' class='limpiar_select'>Las Naves</option>
        <option value='San Miguel' class='limpiar_select'>San Miguel</option>";
    }else if($provincia == "Cañar"){ 
        echo "<option value='Azogues' class='limpiar_select'>Azogues</option>
        <option value='Biblián' class='limpiar_select'>Biblián</option>
        <option value='Cañar' class='limpiar_select'>Cañar</option>
        <option value='Déleg' class='limpiar_select'>Déleg</option>
        <option value='El Tambo' class='limpiar_select'>El Tambo</option>
        <option value='La Troncal' class='limpiar_select'>La Troncal</option>
        <option value='Suscal' class='limpiar_select'>Suscal</option>";
    }else if($provincia == "Carchi"){ 
        echo "<option value='Tulcán' class='limpiar_select'>Tulcán</option>
        <option value='Bolívar' class='limpiar_select'>Bolívar</option>
        <option value='Espejo' class='limpiar_select'>Espejo</option>
        <option value='Mira' class='limpiar_select'>Mira</option>
        <option value='Montúfar' class='limpiar_select'>Montúfar</option>
        <option value='Huaca' class='limpiar_select'>Huaca</option>";
    }else if($provincia == "Chimborazo"){ 
        echo "<option value='Riobamba' class='limpiar_select'>Riobamba</option>
        <option value='Alausí' class='limpiar_select'>Alausí</option>
        <option value='Chambo' class='limpiar_select'>Chambo</option>
        <option value='Chunchi' class='limpiar_select'>Chunchi</option>
        <option value='Colta' class='limpiar_select'>Colta</option>
        <option value='Cumandá' class='limpiar_select'>Cumandá</option>
        <option value='Guamote' class='limpiar_select'>Guamote</option>
        <option value='Guano' class='limpiar_select'>Guano</option>
        <option value='Pallatanga' class='limpiar_select'>Pallatanga</option>
        <option value='Penipe' class='limpiar_select'>Penipe</option>";
    }else if($provincia == "Cotopaxi"){ 
        echo "<option value='Latacunga' class='limpiar_select'>Latacunga</option>
        <option value='La Maná' class='limpiar_select'>La Maná</option>
        <option value='Pangua' class='limpiar_select'>Pangua</option>
        <option value='Pujilí' class='limpiar_select'>Pujilí</option>
        <option value='Salcedo' class='limpiar_select'>Salcedo</option>
        <option value='Saquisilí' class='limpiar_select'>Saquisilí</option>
        <option value='Sigchos' class='limpiar_select'>Sigchos</option>";
    }else if($provincia == "El Oro"){ 
        echo "<option value='Machala' class='limpiar_select'>Machala</option>
        <option value='Arenillas' class='limpiar_select'>Arenillas</option>
        <option value='Atahualpa' class='limpiar_select'>Atahualpa</option>
        <option value='Balsas' class='limpiar_select'>Balsas</option>
        <option value='Chilla' class='limpiar_select'>Chilla</option>
        <option value='El Guabo' class='limpiar_select'>El Guabo</option>
        <option value='Huaquillas' class='limpiar_select'>Huaquillas</option>
        <option value='Las Lajas' class='limpiar_select'>Las Lajas</option>
        <option value='Marcabelí' class='limpiar_select'>Marcabelí</option>
        <option value='Pasaje' class='limpiar_select'>Pasaje</option>
        <option value='Piñas' class='limpiar_select'>Piñas</option>
        <option value='Portovelo' class='limpiar_select'>Portovelo</option>
        <option value='Santa Rosa' class='limpiar_select'>Santa Rosa</option>
        <option value='Zaruma' class='limpiar_select'>Zaruma</option>";
    }else if($provincia == "Galápagos"){ 
        echo "<option value='San Cristóbal' class='limpiar_select'>San Cristóbal</option>
        <option value='Isabela' class='limpiar_select'>Isabela</option>
        <option value='Santa Cruz' class='limpiar_select'>Santa Cruz</option>";
    }else if($provincia == "Guayas"){ 
        echo "<option value='Guayaquil' class='limpiar_select'>Guayaquil</option>
        <option value='Alfredo Baquerizo' class='limpiar_select'>Alfredo Baquerizo</option>
        <option value='Balao' class='limpiar_select'>Balao</option>
        <option value='Balzar' class='limpiar_select'>Balzar</option>
        <option value='Colimes' class='limpiar_select'>Colimes</option>
        <option value='Daule' class='limpiar_select'>Daule</option>
        <option value='Durán' class='limpiar_select'>Durán</option>
        <option value='El Empalme' class='limpiar_select'>El Empalme</option>
        <option value='El Triunfo' class='limpiar_select'>El Triunfo</option>
        <option value='General Antonio Elizalde' class='limpiar_select'>General Antonio Elizalde</option>
        <option value=' Isidro Ayora' class='limpiar_select'> Isidro Ayora</option>
        <option value='Lomas de Sargentillo' class='limpiar_select'>Lomas de Sargentillo</option>
        <option value='Marcelino Maridueña' class='limpiar_select'>Marcelino Maridueña</option>
        <option value='Milagro' class='limpiar_select'>Milagro</option>
        <option value='Naranjal' class='limpiar_select'>Naranjal</option>
        <option value='Naranjito' class='limpiar_select'>Naranjito</option>
        <option value='Nobol' class='limpiar_select'>Nobol</option>
        <option value='Palestina' class='limpiar_select'>Palestina</option>
        <option value='Pedro Carbo' class='limpiar_select'>Pedro Carbo</option>
        <option value='Playas' class='limpiar_select'>Playas</option>
        <option value='Salitre' class='limpiar_select'>Salitre</option>
        <option value='Samborondón' class='limpiar_select'>Samborondón</option>
        <option value='Santa Lucía' class='limpiar_select'>Santa Lucía</option>
        <option value='Simón Bolívar' class='limpiar_select'>Simón Bolívar</option>
        <option value='Yaguachi' class='limpiar_select'>Yaguachi</option>";
    }else if($provincia == "Imbabura"){ 
        echo "<option value='Ibarra' class='limpiar_select'>Ibarra</option>
        <option value='Antonio Ante' class='limpiar_select'>Antonio Ante</option>
        <option value='Cotacachi' class='limpiar_select'>Cotacachi</option>
        <option value='Otavalo' class='limpiar_select'>Otavalo</option>
        <option value='Pimampiro' class='limpiar_select'>Pimampiro</option>
        <option value='San Miguel de Urcuquí' class='limpiar_select'>San Miguel de Urcuquí</option>";
    }else if($provincia == "Loja"){ 
        echo "<option value='Loja' class='limpiar_select'>Loja</option>
        <option value='Calvas' class='limpiar_select'>Calvas</option>
        <option value='Catamayo' class='limpiar_select'>Catamayo</option>
        <option value='Celica' class='limpiar_select'>Celica</option>
        <option value='Chaguarpamba' class='limpiar_select'>Chaguarpamba</option>
        <option value='Espíndola' class='limpiar_select'>Espíndola</option>
        <option value='Gonzanamá' class='limpiar_select'>Gonzanamá</option>
        <option value='Macará' class='limpiar_select'>Macará</option>
        <option value='Olmedo' class='limpiar_select'>Olmedo</option>
        <option value='Paltas' class='limpiar_select'>Paltas</option>
        <option value='Pindal' class='limpiar_select'>Pindal</option>
        <option value='Puyango' class='limpiar_select'>Puyango</option>
        <option value='Quilanga' class='limpiar_select'>Quilanga</option>
        <option value='Saraguro' class='limpiar_select'>Saraguro</option>
        <option value='Sozoranga' class='limpiar_select'>Sozoranga</option>
        <option value='Zapotillo' class='limpiar_select'>Zapotillo</option>";
    }else if($provincia == "Los Rios"){ 
        echo "<option value='Babahoyo' class='limpiar_select'>Babahoyo</option>
        <option value='Baba' class='limpiar_select'>Baba</option>
        <option value='Buena Fe' class='limpiar_select'>Buena Fe</option>
        <option value='Mocache' class='limpiar_select'>Mocache</option>
        <option value='Montalvo' class='limpiar_select'>Montalvo</option>
        <option value='Palenque' class='limpiar_select'>Palenque</option>
        <option value='Puebloviejo' class='limpiar_select'>Puebloviejo</option>
        <option value='Quevedo' class='limpiar_select'>Quevedo</option>
        <option value='Quinsaloma' class='limpiar_select'>Quinsaloma</option>
        <option value='Urdaneta' class='limpiar_select'>Urdaneta</option>
        <option value='Valencia' class='limpiar_select'>Valencia</option>
        <option value='Ventanas' class='limpiar_select'>Ventanas</option>
        <option value='Vinces' class='limpiar_select'>Vinces</option>";
    }else if($provincia == "Manabí"){ 
        echo "<option value='Portoviejo' class='limpiar_select'>Portoviejo</option>
        <option value='4 de Mayo' class='limpiar_select'>4 de Mayo</option>
        <option value='Bolívar' class='limpiar_select'>Bolívar</option>
        <option value='Chone' class='limpiar_select'>Chone</option>
        <option value='El Carmen' class='limpiar_select'>El Carmen</option>
        <option value='Flavio Alfaro' class='limpiar_select'>Flavio Alfaro</option>
        <option value='Jama' class='limpiar_select'>Jama</option>
        <option value='Jaramijó' class='limpiar_select'>Jaramijó</option>
        <option value='Jipijapa' class='limpiar_select'>Jipijapa</option>
        <option value='Junín' class='limpiar_select'>Junín</option>
        <option value='Manta' class='limpiar_select'>Manta</option>
        <option value='Montecristi' class='limpiar_select'>Montecristi</option>
        <option value='Olmedo' class='limpiar_select'>Olmedo</option>
        <option value='Paján' class='limpiar_select'>Paján</option>
        <option value='Pedernales' class='limpiar_select'>Pedernales</option>
        <option value='Pichincha' class='limpiar_select'>Pichincha</option>
        <option value='Puerto López' class='limpiar_select'>Puerto López</option>
        <option value='Rocafuerte' class='limpiar_select'>Rocafuerte</option>
        <option value='San Vicente' class='limpiar_select'>San Vicente</option>
        <option value='Santa Ana' class='limpiar_select'>Santa Ana</option>
        <option value='Sucre' class='limpiar_select'>Sucre</option>
        <option value='Tosagua' class='limpiar_select'>Tosagua</option>";
    }else if($provincia == "Morona Santiago"){ 
        echo "<option value='Morona' class='limpiar_select'>Morona</option>
        <option value='Gualaquiza' class='limpiar_select'>Gualaquiza</option>
        <option value='Huamboya' class='limpiar_select'>Huamboya</option>
        <option value='Limón Indanza' class='limpiar_select'>Limón Indanza</option>
        <option value='Logroño' class='limpiar_select'>Logroño</option>
        <option value='Pablo Sexto' class='limpiar_select'>Pablo Sexto</option>
        <option value='Palora' class='limpiar_select'>Palora</option>
        <option value='San Juan Bosco' class='limpiar_select'>San Juan Bosco</option>
        <option value='Santiago de Méndez' class='limpiar_select'>Santiago de Méndez</option>
        <option value='Sucúa' class='limpiar_select'>Sucúa</option>
        <option value='Taisha' class='limpiar_select'>Taisha</option>
        <option value='Tiwintza' class='limpiar_select'>Tiwintza</option>";
    }else if($provincia == "Napo"){ 
        echo "<option value='Tena' class='limpiar_select'>Tena</option>
        <option value='Archidona' class='limpiar_select'>Archidona</option>
        <option value='Carlos Julio Arosemena Tola' class='limpiar_select'>Carlos Julio Arosemena Tola</option>
        <option value='El Chaco' class='limpiar_select'>El Chaco</option>
        <option value='Quijos' class='limpiar_select'>Quijos</option>";
    }else if($provincia == "Orellana"){ 
        echo "<option value='Francisco de Orellana' class='limpiar_select'>Francisco de Orellana</option>
        <option value='Aguarico' class='limpiar_select'>Aguarico</option>
        <option value='La Joya de los Sachas' class='limpiar_select'>La Joya de los Sachas</option>
        <option value='Loreto' class='limpiar_select'>Loreto</option>";
    }else if($provincia == "Pastaza"){ 
        echo "<option value='Pastaza' class='limpiar_select'>Pastaza</option>
        <option value='Arajuno' class='limpiar_select'>Arajuno</option>
        <option value='Mera' class='limpiar_select'>Mera</option>
        <option value='Santa Clara' class='limpiar_select'>Santa Clara</option>";
    }else if($provincia == "Pichincha"){ 
        echo "<option value='Quito' class='limpiar_select'>Quito</option>
        <option value='Cayambe' class='limpiar_select'>Cayambe</option>
        <option value='Mejía' class='limpiar_select'>Mejía</option>
        <option value='Pedro Moncayo' class='limpiar_select'>Pedro Moncayo</option>
        <option value='Pedro Vicente Maldonado' class='limpiar_select'>Pedro Vicente Maldonado</option>
        <option value='Puerto Quito' class='limpiar_select'>Puerto Quito</option>
        <option value='Rumiñahui' class='limpiar_select'>Rumiñahui</option>
        <option value='San Miguel de los Bancos' class='limpiar_select'>San Miguel de los Bancos</option>";
    }else if($provincia == "Santa Elena"){ 
        echo "<option value='Santa Elena' class='limpiar_select'>Santa Elena</option>
        <option value='La Libertad' class='limpiar_select'>La Libertad</option>
        <option value='Salinas' class='limpiar_select'>Salinas</option>";
    }else if($provincia == "Santo Domingo de los Tsáchilas"){ 
        echo "<option value='Santo Domingo' class='limpiar_select'>Santo Domingo</option>
        <option value='La Concordia' class='limpiar_select'>La Concordia</option>";
    }else if($provincia == "Sucumbíos"){ 
        echo "<option value='Lago Agrio' class='limpiar_select'>Lago Agrio</option>
        <option value='Cascales' class='limpiar_select'>Cascales</option>
        <option value='Cuyabeno' class='limpiar_select'>Cuyabeno</option>
        <option value='Gonzalo Pizarro' class='limpiar_select'>Gonzalo Pizarro</option>
        <option value='Putumayo' class='limpiar_select'>Putumayo</option>
        <option value='Shushufindi' class='limpiar_select'>Shushufindi</option>
        <option value='Sucumbíos' class='limpiar_select'>Sucumbíos</option>";
    }else if($provincia == "Tungurahua"){ 
        echo "<option value='Ambato' class='limpiar_select'>Ambato</option>
        <option value='Baños' class='limpiar_select'>Baños</option>
        <option value='Cevallos' class='limpiar_select'>Cevallos</option>
        <option value='Mocha' class='limpiar_select'>Mocha</option>
        <option value='Patate' class='limpiar_select'>Patate</option>
        <option value='Quero' class='limpiar_select'>Quero</option>
        <option value='San Pedro de Pelileo' class='limpiar_select'>San Pedro de Pelileo</option>
        <option value='Santiago de Píllaro' class='limpiar_select'>Santiago de Píllaro</option>
        <option value='Tisaleo' class='limpiar_select'>Tisaleo</option>";
    }else if($provincia == "Zamora Chinchipe"){ 
        echo "<option value='Zamora' class='limpiar_select'>Zamora</option>
        <option value='Centinela del Cóndor' class='limpiar_select'>Centinela del Cóndor</option>
        <option value='Chinchipe' class='limpiar_select'>Chinchipe</option>
        <option value='El Pangui' class='limpiar_select'>El Pangui</option>
        <option value='Nangaritza' class='limpiar_select'>Nangaritza</option>
        <option value='Palanda' class='limpiar_select'>Palanda</option>
        <option value='Paquisha' class='limpiar_select'>Paquisha</option>
        <option value='Yacuambi' class='limpiar_select'>Yacuambi</option>
        <option value='Yantzaza' class='limpiar_select'>Yantzaza</option>";
    }
}else if($tipo=="rpa"){
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
    $provincia = $_POST["provincia"];
    $canton = $_POST["canton"];
    $direccion = $_POST["direccion"];
    $ocupacion = $_POST["ocupacion"];
    $query_registro_usuario = mysqli_query($conn,"INSERT INTO `pacientes`(`id`, `tipo_documento`, `habilitado`, `id_personal_creado`, `fecha_creacion`, `numero_documento`, `nombre_1`, `nombre_2`, `apellido_1`, `apellido_2`, `sexo`, `correo`, `telefono_1`, `telefono_2`, `fecha_nacimiento`, `provincia`, `canton`, `direccion`, `ocupacion`) VALUES (uuid(), '$tipo_documento', 1, '$id_personal_creado', '$fecha_creacion', '$numero_documento', '$nombre_1', '$nombre_2', '$apellido_1', '$apellido_2', '$sexo', '$correo', '$telefono_1', '$telefono_2', '$fecha_nacimiento', '$provincia', '$canton', '$direccion', '$ocupacion')");
    if(($conn->affected_rows)==1){
        echo "Registro con exitó";
    }else{
        echo "Fallo Registro";
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
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, h.`fecha_consulta`,h.`primera_consulta`, pa.`numero_documento`, concat(pa.`nombre_1`,' ', pa.`apellido_1`) as nombre_1, uc.`nombre_usuario` as  `creado`, ua.`nombre_usuario` as `asignado` FROM (((`historia_clinica` h LEFT JOIN `pacientes` pa ON pa.`id` = h.`id_paciente`) LEFT JOIN `usuarios` uc ON uc.`id_personal` = h.`id_personal_creado`) LEFT JOIN `usuarios` ua ON ua.`id_personal` = h.`id_personal_asignado`) WHERE h.`habilitado`= b'1' AND h.`id` = '$id' LIMIT 1;");
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
    }
}else if($tipo=="elipa"){
    $id = $_POST["id"];
    $sql = "DELETE FROM `pacientes` WHERE `pacientes`.`id` = '$id';";
    if($conn->query($sql) === TRUE){
        echo "Registro eliminado con exitó";
    }else{
        echo "No se pudo completar la acción";
    }
}else if($tipo=="elihis"){
    $id = $_POST["id"];
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
    $query_consulta_tabla = mysqli_query($conn,"SELECT `tipo_documento`, `fecha_creacion`, `numero_documento`, concat(`nombre_1`,' ',`nombre_2`) AS `nombres`, concat(`apellido_1`,' ',`apellido_2`) AS `apellidos` , `sexo`, `correo`, `telefono_1`, `telefono_2`, `fecha_nacimiento`, `provincia`, `canton`, `direccion`, `ocupacion`, (SELECT u.`nombre_usuario` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE p.`id` = `pacientes`.`id_personal_creado`) as `nombre_usuario` FROM `pacientes` WHERE `habilitado` = 1 AND `id` = '$id'");
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
            $edad
        );
        echo json_encode($array_resultado);
    }   
}else if($tipo=="rhis"){
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
    $query_registro = mysqli_query($conn,"SET @variable_id=uuid();");
    if($id_paciente == ""){
        $texto_id_paciente = "";
        $id_paciente_2 = "";
    }else{
        $texto_id_paciente = "`id_paciente`,";
        $id_paciente_2  = "'".$id_paciente."',";
    }
    if($id_personal_asignado == ""){
        $texto_id_personal_asignado = "";
        $id_personal_asignado_2 = "";
    }else{
        $texto_id_personal_asignado = "`id_personal_asignado`,";
        $id_personal_asignado_2  = "'".$id_personal_asignado."',";
    }
    $query_registro = mysqli_query($conn,"SET @VALOR_MAXIMO = (SELECT MAX(`id`) FROM `historia_clinica` WHERE 1);");
    $query_registro = mysqli_query($conn,"SET @ID = IF(@VALOR_MAXIMO IS NULL, 1 , @VALOR_MAXIMO+1);");
    $query_registro = mysqli_query($conn,"INSERT INTO `historia_clinica`(`id`, `habilitado`, $texto_id_paciente `id_personal_creado`, $texto_id_personal_asignado `fecha_consulta`, `peso`, `talla`, `pulso`, `presion_arterial`, `temperatura`, `frecuencia_respiratoria`, `primera_consulta`, `motivo_consulta`, `enfermedad_actual`, `revisin_sistemas`, `a_p_p`, `a_p_f`, `examen_fisico`, `impresión_diagnostica`, `examenes`, `diagnostico_definitivo`, `tratamiento`, `archivado`, `edad`) VALUES (@ID, 1, $id_paciente_2 '$id_personal_creado', $id_personal_asignado_2 '$fecha_consulta', '$peso', '$talla', '$pulso', '$presion_arterial', '$temperatura', '$frecuencia_respiratoria', '$primera_consulta', '$motivo_consulta', '$enfermedad_actual', '$revisin_sistemas', '$a_p_p', '$a_p_f', '$examen_fisico', '$impresión_diagnostica', '$examenes', '$diagnostico_definitivo', '$tratamiento', $archivado, '$edad')");
    
    if(($conn->affected_rows)==1){
        $query_registro = mysqli_query($conn,"SELECT @ID");
        $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_registro); 
        if($numero_filas_consulta_tabla_personal_usuario == 1)
        {
            while($fila_tabla_personal_usuario = $query_registro ->fetch_array(MYSQLI_BOTH))
            {
                echo "Registro con exitó/".$fila_tabla_personal_usuario["@ID"];
            }
        }
    }else{
        echo "Fallo Registro/0";
    }
}else if($tipo=="npcr"){
    $id = $_POST["id"];

    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT `nombre_1`, `apellido_1` FROM `personal` WHERE `id`='$id'");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    if($numero_filas_consulta_tabla_personal_usuario == 1)
    {
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        { /*
            $nombre = explode(" ", $fila_tabla_personal_usuario["nombre_1"]);
            $apellido = explode(" ", $fila_tabla_personal_usuario["apellido_1"]);
            echo  $nombre[0]." ".$apellido[0];*/
            echo  $fila_tabla_personal_usuario["nombre_1"]." ".$fila_tabla_personal_usuario["apellido_1"];
        }
    }
}else if($tipo=="lp"){
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT p.`nombre_1`, p.`apellido_1`, u.`nombre_usuario`, p.`id` FROM `personal` p JOIN `usuarios` u ON p.`id` = u.`id_personal` WHERE U.`permisos`= 1 AND u.`habilitado`=1;");
    $numero_filas_consulta_tabla_personal_usuario = mysqli_num_rows($query_consulta_tabla_personal_usuario); 
    $i = 1;
    $ids = array();
    if($numero_filas_consulta_tabla_personal_usuario >= 1)
    {   
        echo "<option class='lista_personal_asignar' value='0'></option>";
        array_push($ids,"");
        while($fila_tabla_personal_usuario = $query_consulta_tabla_personal_usuario->fetch_array(MYSQLI_BOTH))
        {
            /*$nombre = explode(" ", $fila_tabla_personal_usuario["nombre_1"]);
            $apellido = explode(" ", $fila_tabla_personal_usuario["apellido_1"]);
            echo "<option class='lista_personal_asignar' value='".$i."'>".$nombre[0]." ".$apellido[0].": ".$fila_tabla_personal_usuario["nombre_usuario"]."</option>";
            */
            echo "<option class='lista_personal_asignar' value='".$i."'>".$fila_tabla_personal_usuario["nombre_1"]." ".$fila_tabla_personal_usuario["apellido_1"].": ".$fila_tabla_personal_usuario["nombre_usuario"]."</option>";
            
            array_push($ids,$fila_tabla_personal_usuario["id"]);
            $i++;
        }
    }
    echo "ids";
    echo json_encode($ids);
}else if($tipo=="thas"){
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

    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, h.`fecha_consulta`, h.`primera_consulta`, pa.`numero_documento`, CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) AS `nombre`, u.`nombre_usuario` FROM ((`historia_clinica` h LEFT JOIN `pacientes` pa ON h.`id_paciente` = pa.`id`) LEFT JOIN `usuarios` u ON h.`id_personal_creado` = u.`id_personal`) WHERE h.`habilitado`= b'1' AND h.`archivado`= b'0' AND h.`id_personal_asignado`= '$id_asignado' AND h.`id` LIKE '%$id%' AND h.`fecha_consulta` LIKE '%$fecha_consulta%' AND h.`primera_consulta` LIKE '%$primera_consulta%' AND u.`nombre_usuario` LIKE '%$usuario%' AND ( $isnullorlike1 ) AND ( $isnullorlike2 ) ORDER BY h.`id` DESC LIMIT $cantidad_filas;");
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
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["primera_consulta"]."</td>
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
            $i++;
        }

    }
    echo "ids";
    echo json_encode($ids);
    
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
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT hc.`id`, hc.`habilitado`, hc.`id_paciente`, hc.`id_personal_creado`, hc.`id_personal_asignado`, CONCAT(pec.`nombre_1`,' ',pec.`apellido_1`, ': ',uc.`nombre_usuario`) as `personal_creado`, CONCAT(pea.`nombre_1`,' ',pea.`apellido_1`, ': ',ua.`nombre_usuario`) as `personal_asignado`, hc.`fecha_consulta`, hc.`peso`, hc.`talla`, hc.`pulso`, hc.`presion_arterial`, hc.`temperatura`, hc.`frecuencia_respiratoria`, hc.`primera_consulta`, hc.`motivo_consulta`, hc.`enfermedad_actual`, hc.`revisin_sistemas`, hc.`a_p_p`, hc.`a_p_f`, hc.`examen_fisico`, hc.`impresión_diagnostica`, hc.`examenes`, hc.`diagnostico_definitivo`, hc.`tratamiento`, hc.`archivado`, hc.`edad`, pa.`id` AS `pa_id`, pa.`tipo_documento` AS `pa_tipo_documento`, pa.`id_personal_creado` AS `pa_id_personal_creado`, pa.`fecha_creacion` AS `pa_fecha_creacion`, pa.`numero_documento` AS `pa_numero_documento`, CONCAT(pa.`nombre_1`,' ',pa.`nombre_2`) AS `pa_nombres`, CONCAT(pa.`apellido_1`,' ',pa.`apellido_1`) AS `pa_apellidos`, pa.`sexo` AS `pa_sexo`, pa.`correo` AS `pa_correo`, pa.`telefono_1` AS `pa_telefono_1`, pa.`telefono_2` AS `pa_telefono_2`, pa.`fecha_nacimiento` AS `pa_fecha_nacimiento`, pa.`provincia` AS `pa_provincia`, pa.`canton` AS `pa_canton`, pa.`direccion` AS `pa_direccion`, pa.`ocupacion` AS `pa_ocupacion` FROM (((((`historia_clinica` hc LEFT JOIN `pacientes` pa ON hc.`id_paciente` = pa.`id`) LEFT JOIN `personal` pec ON hc.`id_personal_creado` = pec.`id`) LEFT JOIN `personal` pea ON hc.`id_personal_asignado` = pea.`id`) LEFT JOIN `usuarios` uc ON hc.`id_personal_creado` = uc.`id_personal`) LEFT JOIN `usuarios` ua ON hc.`id_personal_asignado` = ua.`id_personal`) WHERE hc.`id` = '$id';");
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
                "pa_id_personal_creado" => $fila_tabla_personal_usuario["pa_id_personal_creado"],
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


    $sql = "UPDATE `historia_clinica` SET `id_paciente`=$id_paciente, `id_personal_creado`='$id_personal_creado',`id_personal_asignado`=$id_personal_asignado,`fecha_consulta`='$fecha_consulta',`peso`='$peso',`talla`='$talla',`pulso`='$pulso',`presion_arterial`='$presion_arterial',`temperatura`='$temperatura',`frecuencia_respiratoria`='$frecuencia_respiratoria',`primera_consulta`='$primera_consulta',`motivo_consulta`='$motivo_consulta',`enfermedad_actual`='$enfermedad_actual',`revisin_sistemas`='$revisin_sistemas',`a_p_p`='$a_p_p',`a_p_f`='$a_p_f',`examen_fisico`='$examen_fisico',`impresión_diagnostica`='$impresión_diagnostica',`examenes`='$examenes',`diagnostico_definitivo`='$diagnostico_definitivo',`tratamiento`='$tratamiento',`archivado`= b'$archivado',`edad`='$edad' WHERE `historia_clinica`.`id` = '$id';";
    if(mysqli_query($conn,$sql)){
        echo "Registro con exitó/0";
    }else{
        echo "Fallo Registro/0";
    }
}else if($tipo=="archhis"){
    $id = $_POST["id"];
    $sql = "UPDATE `historia_clinica` SET `archivado`= b'1' WHERE `historia_clinica`.`id` = '$id';";
    if(mysqli_query($conn,$sql)){
        echo "Archivado con exitó";
    }else{
        echo "Fallo cambio";
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
}else if($tipo=="gedp"){
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
    $provincia = $_POST["provincia"];
    $canton = $_POST["canton"];
    $direccion = $_POST["direccion"];
    $ocupacion = $_POST["ocupacion"];
    $sql = "UPDATE `pacientes` SET `tipo_documento`='$tipo_documento',`numero_documento`='$numero_documento',`nombre_1`='$nombre_1',`nombre_2`='$nombre_2',`apellido_1`='$apellido_1',`apellido_2`='$apellido_2',`sexo`='$sexo',`correo`='$correo',`telefono_1`='$telefono_1',`telefono_2`='$telefono_2',`fecha_nacimiento`='$fecha_nacimiento',`provincia`='$provincia',`canton`='$canton',`direccion`='$direccion',`ocupacion`='$ocupacion' WHERE `id`='$id'";
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
    //$query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, h.`fecha_consulta`, h.`primera_consulta`, pa.`numero_documento`, CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) AS `nombre`, u.`nombre_usuario` FROM ((`historia_clinica` h LEFT JOIN `pacientes` pa ON h.`id_paciente` = pa.`id`) LEFT JOIN `usuarios` u ON h.`id_personal_creado` = u.`id_personal`) WHERE h.`habilitado`= b'1' AND h.`archivado`= b'1' AND h.`id_personal_asignado`= '$id_asignado' AND h.`id` LIKE '%$id%' AND h.`fecha_consulta` LIKE '%$fecha_consulta%' AND h.`primera_consulta` LIKE '%$primera_consulta%' AND u.`nombre_usuario` LIKE '%$usuario%' AND ( $isnullorlike1 ) AND ( $isnullorlike2 ) ORDER BY h.`id` DESC LIMIT $cantidad_filas;");
    $query_consulta_tabla_personal_usuario = mysqli_query($conn,"SELECT h.`id`, h.`fecha_consulta`, h.`primera_consulta`, pa.`numero_documento`, CONCAT(pa.`nombre_1`, ' ' ,pa.`apellido_1`) AS `nombre`, u.`nombre_usuario` FROM ((`historia_clinica` h LEFT JOIN `pacientes` pa ON h.`id_paciente` = pa.`id`) LEFT JOIN `usuarios` u ON h.`id_personal_creado` = u.`id_personal`) WHERE h.`habilitado`= b'1' AND h.`archivado`= b'1' AND h.`id` LIKE '%$id%' AND h.`fecha_consulta` LIKE '%$fecha_consulta%' AND h.`primera_consulta` LIKE '%$primera_consulta%' AND u.`nombre_usuario` LIKE '%$usuario%' AND ( $isnullorlike1 ) AND ( $isnullorlike2 ) ORDER BY h.`id` DESC LIMIT $cantidad_filas;");
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
            <td class='fila_selecionada_".($i-1)."'>".$fila_tabla_personal_usuario["primera_consulta"]."</td>
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
            <td class='fila_selecionada_".($i-1)." tabla_contenedores_accion_pp'> 
                <div onmouseout='desresaltar_asignar(".($i-1).")' onmouseover='resaltar_asignar(".($i-1).")' class='diseño_asignar_".($i-1)." iconos_tabla_accion diseno_asignar' onclick='accion_asignar(".($i-1).")'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='diseño_asignar_".($i-1)." bi bi-person-bounding-box' viewBox='0 0 16 16'>
                        <path d='M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z'/>
                        <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/>
                    </svg>
                    ASIGNAR
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
    
}else




$conn->close();

?>