
//************FUNCION PARA EL QUERY-STRING.**********
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

//*************DETERMINANDO GENERALES POR SEDE*********************

var sedeGenerals=function(){
  var generationSelect=document.getElementById('generationFilter');//se manda a llamar el elemento select del html
  var selectedValue = generationSelect.options[generationSelect.selectedIndex].value;// Se rescata el valor de la opcion(2017-1) que se seleccione.
  var objContentGeneration= sede[selectedValue];// se Especifica que del objeto data tome todo lo que esta dentro de la key (2017-1 {...}) del periodo seleccionado.
  var arrayStudents= objContentGeneration['students'];//Se Extrae el Arreglo de todas las Estudiantes.
  var sumActiveStudents=0;
  var sumInactiveStudents=0;
  for(var i=0; i<arrayStudents.length; i++){ //Se utiliza para recorrer todo el arreglo de las estudiantes.
    var studentInfo=arrayStudents[i]; //Guarda todo el Objeto que se encuentra dentro de Students.
    if(studentInfo.active==true){
      sumActiveStudents+=1; //se suman estudiantes Activas.
    }else{
      sumInactiveStudents+=1;//Se suman estudiantes Inactivas.
    }
  }
  console.log('Activos'+sumActiveStudents);
  console.log('Inactivos'+sumInactiveStudents);
  console.log('Total'+arrayStudents.length);
}//cierra la Funcion SedeGenerals*/


/**************SE CREA EL FILTRO PRINCIPAL POR GENERACIONES**********************/
  var select=document.getElementById('generationFilter');
  propertiesArray= Object.keys(sede);// convierte los objetos dentro de cada una de las generaciones  en un arreglo
  for(var i=0; i<=propertiesArray.length-1;i++){ //recorre todas las generaciones de ese arreglo ojo:preguntar porque sale lo del proto
     var generation=propertiesArray[i];
     var options=document.createElement('option');
     options.setAttribute('id','optionGeneration');
     options.setAttribute('value',generation);
     var optionTitle=document.createTextNode(generation);
     options.appendChild(optionTitle);
     select.appendChild(options);
}//cierra for en i

//************ Funcion Tabs Empieza*************

function openTab(evt, sedeName) {
    // Declaran las variables
    var tabcontent, tablinks;

    //Obtiene todos los elementos con clase= "tabcontent" (los divs) y los esconde
    tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    //Obtiene todos los elementos con clase= "tablinks" (los botones) y remueve la clase "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    // Muestra el tab actual, y añade una clase "active"al boton que abre el tab
    document.getElementById(sedeName).style.display = "block";
    evt.currentTarget.className += " active";
}
//************ Funcion Tabs TERMINA *************
