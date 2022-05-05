let listaCookies = document.cookie;
let todasLasCookies = listaCookies.split(";");
let reserva;
var cookies_pagina = new Object();
function verificar_cookie(){
    for(var i=0;i<todasLasCookies.length;i++){
        reserva = (todasLasCookies[i]).split("=");
        cookies_pagina[reserva[0].trim()]  = reserva[1];
    }
    if(cookies_pagina["permisos"]=="")
    {
        window.location.href = "principal.html";
    
    }else if(cookies_pagina["permisos"]=="2"){
        window.location.href = "panel_personal.html";
    }
};
verificar_cookie();
