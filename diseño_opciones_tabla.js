function resaltar(numero){
    $('.fila_selecionada_'+numero).css('background-color', color_2_formulario);
}
function desresaltar(numero){
    $('.fila_selecionada_'+numero).css('background-color', '#1f2f98');
}

function resaltar_editar(numero){
    $('.diseño_editar_'+numero).css('color', color_1_editar);
    $('.diseño_editar_'+numero).css('fill', color_1_editar);
}
function desresaltar_editar(numero){
    $('.diseño_editar_'+numero).css('color', color_blanco);
    $('.diseño_editar_'+numero).css('fill', color_blanco);
}
function resaltar_archivar(numero){
    $('.diseño_archivar_'+numero).css('color', color_1_archivar);
    $('.diseño_archivar_'+numero).css('fill', color_1_archivar);
}
function desresaltar_archivar(numero){
    $('.diseño_archivar_'+numero).css('color', color_blanco);
    $('.diseño_archivar_'+numero).css('fill', color_blanco);
}
function resaltar_eliminar(numero){
    $('.diseño_eliminar_'+numero).css('color', color_1_error);
    $('.diseño_eliminar_'+numero).css('fill', color_1_error);
}
function desresaltar_eliminar(numero){
    $('.diseño_eliminar_'+numero).css('color', color_blanco);
    $('.diseño_eliminar_'+numero).css('fill', color_blanco);
}

function resaltar_abrir(numero){
    $('.diseño_abrir_'+numero).css('color', color_1_abrir);
    $('.diseño_abrir_'+numero).css('fill', color_1_abrir);
}
function desresaltar_abrir(numero){
    $('.diseño_abrir_'+numero).css('color', color_blanco);
    $('.diseño_abrir_'+numero).css('fill', color_blanco);
}