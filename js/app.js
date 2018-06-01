
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
//console.log(sede);

//*************DETERMINANDO GENERALES POR SEDE*********************

var sedeGenerals=function(){
    var generationSelect=document.getElementById('generationFilter');//se manda a llamar el elemento select del html
    var selectedValue = generationSelect.options[generationSelect.selectedIndex].value;// Se rescata el valor de la opcion(2017-1) que se seleccione.
    var objContentGeneration= sede[selectedValue];// se Especifica que del objeto data tome todo lo que esta dentro de la key (2017-1 {...}) del periodo seleccionado.
    var arrayStudents= objContentGeneration['students'];//Se Extrae el Arreglo de todas las Estudiantes.
  //CALCULADO TOTAL DE ALUMNAS ACTIVAS Y TOTAL DE ALUMNAS INACTIVAS.
    var sumActiveStudents=0;
    var sumInactiveStudents=0;
    var arrayStudentResults=[];// Se almacenara la suma de los puntos de cada estudiante.
    var sumTotalall=0;
    var newObjtInfo= new Object();
    
    for(var i=0; i<arrayStudents.length; i++){ //Se utiliza para recorrer todo el arreglo de las estudiantes.
    var studentInfo=arrayStudents[i]; //Guarda todo el Objeto que se encuentra dentro de Students.
    newObjtInfo.name=studentInfo['name'];
    var sumPointsAllSprints=0;
    var sumPointsXsprint=0;
    var goalPoints=0;
    if(studentInfo.active==true){ //Se corrobora que las alumnas esten activas
        sumActiveStudents+=1; //se suman estudiantes Activas.
        if(studentInfo.sprints) // Se especifica que cuando entre a la llave sprints del Objeto que se encuentra dentro de la variable studentInfo haga lo que sigue
            var arraySprints= studentInfo['sprints']; // Se guarda el contenido de la llave sprints en una variable
            goalPoints=2100*arraySprints.length;
            console.log("los puntos meta son:"+goalPoints);
            for(var f=0; f<arraySprints.length;f++){
                var obcjetSprintNumber=arraySprints[f];
                //console.log(obcjetSprintNumber);
                var obcjetsPoints=obcjetSprintNumber['score'];
                sumPointsXsprint=obcjetsPoints['tech']+obcjetsPoints['hse'];//saca la suma de puntos de hse y tech por sprint
                sumPointsAllSprints+=obcjetsPoints['tech']+obcjetsPoints['hse'];//Saca la Suma de puntos de hse y tech de todos los srinpts
                console.log(sumPointsXsprint);
                
            }//cierra el for en f 
            //Se recorrera el arreglo de todos los sprints
            // console.log(sumPointsXsprint)
            newObjtInfo.sumaTotalAllSprints=sumPointsXsprint; //se le Asigna al Objeto nuevo creado la key suma total all Sprint y se asigna el valor de esa key
            console.log( sumPointsAllSprints);
            //console.log(newObjtInfo);
            //arrayStudentResults.push(studentInfo['name']: sumPointsXsprint);
            arrayStudentResults.push([newObjtInfo.name,sumPointsAllSprints]);//Se agrega el nuevo objeto que fue creado al array Student Results
            var approveGoal=0;
            var notApprovedGoal=0;
            if(sumPointsAllSprints>=goalPoints){
                approveGoal++;
                console.log("aluma aprbada"+approveGoal);

            }else{
                notApprovedGoal++;
                console.log("aluma no aprobada"+notApprovedGoal);
            }
        }else{
            sumInactiveStudents+=1;//Se suman estudiantes Inactivas.
        }
        
    }//cierra for en i
    console.log(arrayStudentResults);
    console.log('Activos'+sumActiveStudents);
    console.log('Inactivos'+sumInactiveStudents);
    console.log('Total'+arrayStudents.length);
    //CALCULANDO LOS PORCENTAJES DE ALUMNAS ACTIVAS E INACTIVAS
    var percentActive=(sumActiveStudents/arrayStudents.length)*100;
    var percentInactive=(sumInactiveStudents/arrayStudents.length)*100;
    //console.log(percentActive);
    //console.log(percentInactive);
    var arrayRantings=objContentGeneration['ratings'];
    //console.log(arrayRantings);
    for(var m=0; m<arrayRantings.length;m++){
        var ratingInfo=arrayRantings[m];
        //console.log(ratingInfo);
        for(var i in ratingInfo){
            //console.log(i);
            if(i=='student'){
                var objtstundet=ratingInfo[i];
                //console.log(objtstundet);
                var contNoCumple=objtstundet['no-cumple'];
                var cumple=objtstundet['cumple'];
                var cumple=objtstundet['supera'];
        //console.log(contNoCumple);

        //console.log(entrandoRatingStudent);

            }//cierra el if

        }//cierra el for in
    }//cierra el for em m


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
