/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
//console.log(data);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var sede = data[getParameterByName('sede')];

console.log(sede);



//************ Funcion Tabs Empieza*************

function openTab(evt, sedeName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    //Obtiene todos los elementos con clase= "tabcontent" (los divs) y los esconde
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //Obtiene todos los elementos con clase= "tablinks" (los botones) y remueve la clase "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Muestra el tab actual, y añade una clase "active"al boton que abre el tab
    document.getElementById(sedeName).style.display = "block";
    evt.currentTarget.className += " active";
}

//************ Funcion Tabs Empieza*************
