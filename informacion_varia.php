<?php
$tipo = $_POST["tipo"];
if($tipo=="pr"){
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
}
?>