
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
    var nameSede=getParameterByName('sede');
    var sede = data[nameSede];
    if(nameSede=='AQP'){
        nameSede='AREQUIPA';
    }else if(nameSede=="CDMX"){
        nameSede='CIUDAD DE MEXICO';
        }else if(nameSede=='SCL'){
            nameSede='SANTIAGO DE CHILE';
            }else{
                nameSede='LIMA';
            }

    //************IMPRIMIENDO EL NOMBRE DE LA SEDE EN EL HTML */
    var principalTitle=document.getElementById('sede-name');
    var contentTitle=document.createTextNode(nameSede);
    principalTitle.appendChild(contentTitle);


//*************DETERMINANDO GENERALES POR SEDE*********************

var sedeGenerals=function(){
    var generationSelect=document.getElementById('generationFilter');//se manda a llamar el elemento select del html
    var selectedValue = generationSelect.options[generationSelect.selectedIndex].value;// Se rescata el valor de la opcion(2017-1) que se seleccione.
    var objContentGeneration= sede[selectedValue];// se Especifica que del objeto data tome todo lo que esta dentro de la key (2017-1 {...}) del periodo seleccionado.
    var arrayStudents= objContentGeneration['students'];//Se Extrae el Arreglo de todas las Estudiantes.

    //**************CALCULADO TOTAL DE ALUMNAS ACTIVAS Y TOTAL DE ALUMNAS INACTIVAS*************.
    //Declarando Variables 
    var sumActiveStudents=0;
    var sumInactiveStudents=0;
    var arrayStudentResults=[];// Se almacenara la suma de los puntos de cada estudiante.
    var sumTotalall=0;
    var newObjtInfo= new Object();
    var approveGoal=0;//contador para alumnas que aprueban meta
    var notApprovedGoal=0;// contador para alumnas que no apruban meta
    var studentsApprovedGoal=[];//para guardar nombre de alumnas que aprueban 
    var studentsNotApprovedGoal=[];//para guardar nombre de alumnas que no aprueban
    var sumPointsAllSprints=0;
    var sumPointsXsprint=0;
    var goalPoints=0;
    var goalPointsHse=0;
    var goalPointsTech=0;
    var arrayStudentsInactives=[];
    var numberStudentsApprovedHse=0;
    var numberStudentsApprovedTech=0;
    var arrayAllSprintsTechAndHse = [];//arreglo 2d para guardar lo puntos x sprint de HSE y TECH 
    for(var i=0; i<arrayStudents.length; i++){ //Se utiliza para recorrer todo el arreglo de las estudiantes.
        var sumPointsAllSprints=0;
        var sumPointsXsprint=0;
        var sumPointsAllSprintsHse=0;
        var sumPointsAllSprintsTech=0;
        var studentInfo=arrayStudents[i]; //Guarda todo el Objeto que se encuentra dentro de Students.
        newObjtInfo.name=studentInfo['name'];
        newObjtInfo.photo=studentInfo['photo'];
        //console.log(newObjtInfo);
        //console.log(studentInfo);
        if(studentInfo.active==true){ //Se corrobora que las alumnas esten activas
            sumActiveStudents+=1; //se suman estudiantes Activas.
            if(studentInfo.sprints){ // Se especifica que cuando entre a la llave sprints del Objeto que se encuentra dentro de la variable studentInfo haga lo que sigue
                var arraySprints= studentInfo['sprints']; // Se guarda el contenido de la llave sprints en una variable
                goalPoints=2100*arraySprints.length;//se obtiene el valor de puntos requeridos para superar el 70% de todos los sprints
                goalPointsHse=840*arraySprints.length;
                goalPointsTech=1260*arraySprints.length;
                for(var f=0; f<arraySprints.length;f++){
                    var obcjetSprintNumber=arraySprints[f];
                    //console.log(obcjetSprintNumber);
                    var obcjetsPoints=obcjetSprintNumber['score'];
                    var pointsTech=obcjetsPoints['tech'];
                    var pointsHse=obcjetsPoints['hse'];
                    sumPointsXsprint=obcjetsPoints['tech']+obcjetsPoints['hse'];//saca la suma de puntos de hse y tech por sprint
                    sumPointsAllSprints+=obcjetsPoints['tech']+obcjetsPoints['hse'];//Saca la Suma de puntos de hse y tech de todos los srinpts
                    sumPointsAllSprintsHse+=pointsHse;
                    sumPointsAllSprintsTech+=pointsTech;
                    arrayAllSprintsTechAndHse.push([pointsTech,pointsHse]);
                }//cierra el for en f
                
            }//el if de los sprints
            newObjtInfo.sumaTotalAllSprints=sumPointsAllSprints; //se le Asigna al Objeto nuevo creado la key suma total all Sprint y se asigna el valor de esa key
            //console.log( sumPointsAllSprints);
            //console.log(newObjtInfo);
            arrayStudentResults.push([newObjtInfo.name,sumPointsAllSprints]);//Se agrega el nuevo objeto que fue creado al array Student Results
            
            if(sumPointsAllSprints>=goalPoints){ //determinando la cantidad de alumnas que superan la meta del 70 %
                approveGoal++;
                studentsApprovedGoal.push(newObjtInfo.name);//agregando los nombres de las alumnas que superan la meta un arreglo 
            }else{ // determinando cantidad de alumnas que no superan la meta del 70% y sus nombres
                notApprovedGoal++;
                studentsNotApprovedGoal.push(newObjtInfo.name); // agregando los nombres de las alumnas que no cumplieron con la meta del 70%


            }// cierra el else que determina la cantidad la cantidad de alumnas que no cumplen la meta 
            if(sumPointsAllSprintsHse>=goalPointsHse){
                numberStudentsApprovedHse++;
            }//cierra if de points HSE 
            if(sumPointsAllSprintsTech>=goalPointsTech){
                numberStudentsApprovedTech++;
                
            }
            var percentAllSprintXstudent= Math.round((sumPointsAllSprints*100)/(3000*arraySprints.length));
            printProfileStudents(newObjtInfo.name,newObjtInfo.photo,sumPointsAllSprints,percentAllSprintXstudent,arrayAllSprintsTechAndHse);
            arrayAllSprintsTechAndHse = [];// se limpia el array 2D porque ya se imprimio en el html y solo considerar las activas

        }else{//Se obtiene el Nombre y la Cantidad de Alumnas Inactivas 
            arrayStudentsInactives.push(newObjtInfo.name);
            var nameListInactive=newObjtInfo.name;
            var containerListNameInactive=document.getElementById('listado-name-inactive');
            var nameList=document.createElement('div');
            var valueNameList=document.createTextNode(nameListInactive);
            nameList.appendChild(valueNameList);
            containerListNameInactive.appendChild(nameList);
            sumInactiveStudents+=1;//Se suman estudiantes Inactivas.
        }//cierra el else de incativas
        
    }//cierra for en i
    //console.log(arrayStudentResults[0][1]);

    var totalStudentSede=(arrayStudents.length);
    var percentajeSuccesStudents=(approveGoal/ sumActiveStudents)*100;
    percentajeSuccesStudents=Math.round(percentajeSuccesStudents);
    var percentajeStudentsApprovedTech=Math.round((numberStudentsApprovedTech/sumActiveStudents)*100);
    var percentajeStudentsApproveHse=Math.round((numberStudentsApprovedHse/sumActiveStudents)*100);
    var totalStudentSede=arrayStudents.length;

    //************************IMPRIMIENTO EN HATML LOS RESULTADOS DE ALUMAS QUE SUPERAN LA META EN HSE Y TECH************************************** */
    var containerResultTech =document.getElementById('title-numberTech');
    var containernumberStudentsTech=document.getElementById('title-numberTech');
    var containerResultHse=document.getElementById('AlumnasApproved-Hse');
    var containernumberStudentsHse=document.getElementById('title-numberHse');
    var containerPercentStudentsTech=document.getElementById('title-percentTech');
    var containerPercentStudentsHse=document.getElementById('title-percentHse');
    var containervaluePointsTech=document.createElement('p');
    var continerpercentPointsTech=document.createElement('p');
    var containervaluePointsHse=document.createElement('p');
    var containerPercentPointsHse=document.createElement('p');
    var valuePointsTech=document.createTextNode(numberStudentsApprovedTech);
    var valuePorcentTech=document.createTextNode(percentajeStudentsApprovedTech);
    var valuePointsHse=document.createTextNode(numberStudentsApprovedHse);
    var valuePorcentHse=document.createTextNode(percentajeStudentsApproveHse);
    containervaluePointsTech.appendChild( valuePointsTech);
    containernumberStudentsTech.appendChild(containervaluePointsTech);
    containervaluePointsHse.appendChild(valuePointsHse);
    containernumberStudentsHse.appendChild( containervaluePointsHse);
    continerpercentPointsTech.appendChild(valuePorcentTech);
    containerPercentPointsHse.appendChild( valuePorcentHse);
    containerPercentStudentsTech.appendChild(continerpercentPointsTech);
    containerPercentStudentsHse.appendChild(containerPercentPointsHse);


    //***********************************IMPRIMIENDO EN HTML LOS RESULTADOS DE ALUMNAS QUE SUPERAN META DE TODOS LOS PUNTOS */
    var numSuccesStudents=document.getElementById('AlumnasApproved-NotApproved');
    var titleContainerSucces=document.getElementById('title-numberSucces');
    var titleContainerPercentSucces=document.getElementById('title-percentSucces')
    var containerSuccesStudensCant=document.createElement('h3');
    var containerPercentStudensCant=document.createElement('h3');
    var valueNumberStudentsSucces=document.createTextNode(approveGoal);
    var valuePercentajeStudentSuces=document.createTextNode(percentajeSuccesStudents);
    containerSuccesStudensCant.appendChild(valueNumberStudentsSucces);
    containerPercentStudensCant.appendChild(valuePercentajeStudentSuces);
    titleContainerSucces.appendChild(containerSuccesStudensCant);
    titleContainerPercentSucces.appendChild(containerPercentStudensCant);
    numSuccesStudents.appendChild(titleContainerSucces);
    numSuccesStudents.appendChild(titleContainerPercentSucces);



    //*****************************AÑADIENDO ALUMNAS ACTIVAS E INACTIVAS********** */
    var containerTableActivesInactives=document.getElementById('containerTable');
    var containerTotalStudents=document.getElementById('container-venue-Sede');
    var containerNumberStudents=document.createElement('h3');
    var containerRow=document.createElement('tr');
    var containerActivesStudents=document.createElement('td');
    var containerInactivesStudents=document.createElement('td');
    var valueTotalStudentsSede=document.createTextNode(totalStudentSede);
    var valueActivesStudents=document.createTextNode(sumActiveStudents);
    var valueIctivesStudents=document.createTextNode(sumInactiveStudents);
    containerNumberStudents.appendChild(valueTotalStudentsSede);
    containerTotalStudents.appendChild(containerNumberStudents);
    containerActivesStudents.appendChild(valueActivesStudents);
    containerInactivesStudents.appendChild(valueIctivesStudents);
    containerRow.appendChild(containerActivesStudents);
    containerRow.appendChild(containerInactivesStudents);
    containerTableActivesInactives.appendChild(containerRow);

    //***************************IMPRIMIENDO EN HTML EN LA TABS ESTUDIANTES LAS ALUMNAS ACTIVAS********* */
    var containerActiveTabsStudents=document.getElementById('active-studens');
    var containerTabStudentsActive=document.createElement('p');
    var valueTabsStudentsActive=document.createTextNode(sumActiveStudents);
    containerTabStudentsActive.appendChild(valueTabsStudentsActive);
    containerActiveTabsStudents.appendChild(containerTabStudentsActive);
    //containerStudentsActivesInactives.replaceChild(containerInactivesStudents);


    //******************* PORCENTAJES DE ALUMNAS ACTIVAS E INACTIVAS GRAFICACION*******************
    // Load the Visualization API and the corechart packages

    google.charts.load('current', {'packages':['corechart']});

        //Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'ActiveInactive');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Activas', sumActiveStudents ],
            ['Inactivas', sumInactiveStudents],
        ]);

        // Set chart options
        var options = {'title':'Porcentaje de estudiantes Activas e Inactivas',
                        'is3D':true,
                        'width':450,
                        'height':300,
                        'colors': ['#56F89A', '#FFE521']
                    };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        }

    /*****************************SE GRAFICAN PORCENTAJES HSE Y TECNICO ********************/
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawStuff);

    function drawStuff() {
        var data = new google.visualization.arrayToDataTable([
            ['Asignatura', 'Porcentaje'],
            ["TECNICO", numberStudentsApprovedTech],
            ["HSE", numberStudentsApprovedHse],
        ]);

        var options = {
            title: 'Comparacion de Alumnas que superan la meta en nivel Tecnico y HSE',
            legend: { position: 'relative' },
            chart: { title: '',
                    subtitle: 'Porcentaje comparativo' },
            bars: 'horizontal', // Required for Material Bar Charts.
            axes: {
            x: {
                0: { side: 'top', label: 'Percentage'} // Top x-axis.
            }
            },
            bar: { groupWidth: "90%" }
        };

        var chart = new google.charts.Bar(document.getElementById('top_x_div'));
        chart.draw(data, options);
    }; //se cierra funcion de chart barras
    //*****************CALCULANDO CANTIDAD Y % DE ACEPTACION */ y DETERMINANDO LOS PUNTOS DE TEACHERS Y JEDIS
    var arrayRantings=objContentGeneration['ratings'];
    //console.log(arrayRantings);
    var totalSatisfactionxSpring=0;//Se utilizara para determinar la cantidad de alumnas satisfechas x sprint
    var sumaSatisfactionAllSede=0;//Se utilziara para determinar el total de alumas satisfechas de toda la sede
    var contRatingSprints=0;//para determinar la cantidad de Sprints
    var sumAllRatingTeacher=0;//determinar la suma de todos los puntos de todos los sprints de Teacher 
    var sumAllRatingJedi=0;////determinar la suma de todos los puntos de todos los sprints de Jedi
    var resultadoSatisfactionXsede=0;//para determinar el porcentaje de Satisfaccion de toda la sede 
    var percentAllPointsTeacher=0;
    var percentAllPointsJedi=0;
    var arrayPointsXsprintsTeachers=[];
    var arrayPointsXsprintsJedi=[];
    for(var m=0; m<arrayRantings.length;m++){
        var ratingInfo=arrayRantings[m];
        //console.log(ratingInfo);
        for(var i in ratingInfo){
            //console.log(i);
            if(i=='sprint'){
                contRatingSprints++;
            }
            if(i=='student'){
                var objtstundet=ratingInfo[i];
                //console.log(objtstundet);
                var contNoCumple=objtstundet['no-cumple'];
                var cumple=objtstundet['cumple'];
                var supera=objtstundet['supera'];
                totalSatisfactionxSpring=supera+cumple;//determinando el % de satisfaccion por Spring
                //console.log("hola"+totalSatisfactionxSpring);
        //console.log(contNoCumple);

        //console.log(entrandoRatingStudent);
                sumaSatisfactionAllSede+=totalSatisfactionxSpring; //Se hace la Suma de todos los satisfechos de todos los  Sprint 
            }//cierra el if
            
            var pointsTeacherXsprint=0;//se vuelvan a hacer 0 para contabilizar desde cero cuando pase a la siguiente Estudiante
            if(i=='teacher'){//se determinan los puntos de los teacher y Jedai x Sprint y en total de toda la sede
                pointsTeacherXsprint=ratingInfo['teacher'];
                //console.log(pointsTeacherXsprint);
                sumAllRatingTeacher+=pointsTeacherXsprint;
                arrayPointsXsprintsTeachers.push([pointsTeacherXsprint]);
                

            }//cierra el if de teacher
            var pointsJediXsprint=0;
            if(i=='jedi'){
                pointsJediXsprint=ratingInfo['jedi'];
                //console.log(pointsJediXsprint);
                sumAllRatingJedi+=pointsJediXsprint;
                arrayPointsXsprintsJedi.push([pointsJediXsprint]);
            }
        }//cierra el for in
        //console.log(contRatingSprints);

    }//cierra el for em m
    profileLaboratoriansTeachers(arrayPointsXsprintsTeachers);
    profileLaboratoriansJedi(arrayPointsXsprintsJedi);
    arrayPointsXsprintsTeachers=[];
    arrayPointsXsprintsJedi=[];
    resultadoSatisfactionXsede=sumaSatisfactionAllSede/contRatingSprints;
    //console.log("promedio de satisfaccion"+resultadoSatisfactionXsede);
    percentAllPointsTeacher=Math.round(sumAllRatingTeacher/contRatingSprints);
    //console.log("%Promedio de Teacher"+percentAllPointsTeacher);
    percentAllPointsJedi=Math.round(sumAllRatingJedi/contRatingSprints);
    //console.log("%Promedio de Jedi"+percentAllPointsJedi);


      //*****************IMPRIMIENDO EN HTML EL % DE SATISFACCION POR SEDE  ********************
    var containerSatisfactionPercent=document.getElementById('containerPercetSatisfaction');
    var valuePorcentSatisfaction=document.createTextNode(resultadoSatisfactionXsede);
    containerSatisfactionPercent.appendChild(valuePorcentSatisfaction);

    //********************IMPRIMIENDO EN HTML EL % PROMEDIO DE TEACHERS */
    var containerTeacher=document.getElementById('pointsPromTeachers');
    var valuePointsTeacher=document.createTextNode(percentAllPointsTeacher);
    containerTeacher.appendChild(valuePointsTeacher);

    //********************IMPRIMIENDO EN HTML EL % PROMEDIO JEDI */
    var containerJedi=document.getElementById('pointsPromJedi');
    var valuePointsJedi=document.createTextNode(percentAllPointsJedi);
    containerJedi.appendChild(valuePointsJedi);

}//cierra la Funcion SedeGenerals*/


 //*************************IMPRIMIENDO LOS PERFILES DE LAS ALUMNAS EN HTML (TAB ESTUDIANTES) */


    var printProfileStudents=function(name,img,totalPoints,percentAllSprints,arregloSprints){

    var containerAllProfileStudent=document.getElementById('containerAllprofileStudents');
    var containerProfileStudent=document.createElement('div');
    containerProfileStudent.setAttribute('class','formatProfileStudents');
    var containerProfileSuperiorStudents=document.createElement('div');
    var containerProfileInferiorStudents=document.createElement('div');
    var createDivProfileStudent=document.createElement('div');
    var parrafoName=document.createElement('p');
    var imageProfile=document.createElement('img');
    imageProfile.setAttribute('href',img);
    imageProfile.setAttribute('src',img);
    var divContianerPointsTotals=document.createElement('div');
    var parrafPointsTotals=document.createElement('p');
    var parrafPercentTotalPoints=document.createElement('p');
    parrafPointsTotals.textContent="PUNTOS TOTALES:      ";
    parrafPercentTotalPoints.textContent="PORCENTAJE TOTAL:   " + "<br>";
    var tableContainerSprints=document.createElement('table');
    var continerLineTitle=document.createElement('tr');
    var sprintNumber=document.createElement('th');
    var nameTech=document.createElement('th');
    var nameHse=document.createElement('th');
    nameHse.textContent="PUNTOS HSE";
    nameTech.textContent="PUNTOS TECH";
    sprintNumber.textContent="SPRINT"
    var valueParrafoName=document.createTextNode(name);
    var valueTotalAllPoints=document.createTextNode(totalPoints);
    var valuePercentTotalPoints=document.createTextNode(percentAllSprints+'%');
    parrafoName.appendChild(valueParrafoName);
    containerProfileSuperiorStudents.appendChild(parrafoName);
    containerProfileSuperiorStudents.appendChild(imageProfile);
    containerProfileStudent.appendChild(containerProfileSuperiorStudents);
    parrafPointsTotals.appendChild(valueTotalAllPoints);
    parrafPercentTotalPoints.appendChild(valuePercentTotalPoints);
    divContianerPointsTotals.appendChild(parrafPointsTotals);
    divContianerPointsTotals.appendChild(parrafPercentTotalPoints);
    containerProfileInferiorStudents.appendChild(divContianerPointsTotals);
    containerProfileStudent.appendChild(containerProfileInferiorStudents);
    containerAllProfileStudent.appendChild(containerProfileStudent);
    continerLineTitle.appendChild(sprintNumber);
    continerLineTitle.appendChild(nameTech);
    continerLineTitle.appendChild(nameHse);
    tableContainerSprints.appendChild(continerLineTitle);

    for(var i=0; i<arregloSprints.length; i++){
        var containerLineTitle2=document.createElement('tr');
        var sprintNumber2=document.createElement('td');
        var nameTech2=document.createElement('td');
        var nameHse2=document.createElement('td');
        var sprintNumberValue=document.createTextNode(i+1);
        var sprintValueTech=document.createTextNode(arregloSprints[i][0]);
        var sprintValueHse=document.createTextNode(arregloSprints[i][1]);
        sprintNumber2.appendChild(sprintNumberValue);
        nameTech2.appendChild(sprintValueTech);
        nameHse2.appendChild(sprintValueHse);
        containerLineTitle2.appendChild(sprintNumber2);
        containerLineTitle2.appendChild(nameTech2);
        containerLineTitle2.appendChild(nameHse2);
        tableContainerSprints.appendChild(containerLineTitle2);
    }
    containerProfileInferiorStudents.appendChild(tableContainerSprints);
    containerProfileStudent.appendChild(containerProfileInferiorStudents);
    containerAllProfileStudent.appendChild(containerProfileStudent);

}//Cierra la Funcion PrintProfileStudents

/**************IMPRIMIENDO LOS RESULTADOS DE LOS JEDI AND TEACHER EN TABS LABORATORIANS************************ */

var profileLaboratoriansTeachers =function(arrayPointsTeachers){

    var containerTeachers=document.getElementById('containerTeachers');
    var tableTeachers=document.createElement('table');
    var trTableTeachers=document.createElement('tr');
    var nameSprint=document.createElement('th');
    var nameScore=document.createElement('th');
    nameSprint.textContent="SPRINT";
    nameScore.textContent="POINTS";
    trTableTeachers.appendChild(nameSprint);
    trTableTeachers.appendChild(nameScore);
    tableTeachers.appendChild(trTableTeachers);
    for(var i=0; i<arrayPointsTeachers.length; i++){
        var containerLineTeacher=document.createElement('tr');
        var nameSprintNumber=document.createElement('td');
        var nameScoreLine=document.createElement('td');
        var sprintNumberValueTeacher=document.createTextNode(i+1);
        var sprintValueScore=document.createTextNode(arrayPointsTeachers[i]);
        nameSprintNumber.appendChild(sprintNumberValueTeacher);
        nameScoreLine.appendChild(sprintValueScore);
        containerLineTeacher.appendChild(nameSprintNumber);
        containerLineTeacher.appendChild(nameScoreLine);
        tableTeachers.appendChild(containerLineTeacher);
    }
        containerTeachers.appendChild(tableTeachers);
}//SE CIERRA LA FUNCION DE PROFILELABORATORIANS


var profileLaboratoriansJedi =function(arrayPointsJedi){
    var containerJedis=document.getElementById('containerJedi');
    var tableJedi=document.createElement('table');
    var trTableJedi=document.createElement('tr');
    var nameSprintJedi=document.createElement('th');
    var nameScoreJedi=document.createElement('th');
    nameSprintJedi.textContent="SPRINT";
    nameScoreJedi.textContent="POINTS";
    trTableJedi.appendChild(nameSprintJedi);
    trTableJedi.appendChild(nameScoreJedi);
    tableJedi.appendChild(trTableJedi);
    containerJedis.appendChild(tableJedi);
    for(var i=0; i<arrayPointsJedi.length; i++){
        var containerLineJedi=document.createElement('tr');
        var nameSprintNumberJedi=document.createElement('td');
        var nameScoreLineJedi=document.createElement('td');
        var sprintNumberValueJedi=document.createTextNode(i+1);
        var sprintValueScoreJedi=document.createTextNode(arrayPointsJedi[i]);
        nameSprintNumberJedi.appendChild(sprintNumberValueJedi);
        nameScoreLineJedi.appendChild(sprintValueScoreJedi);
        containerLineJedi.appendChild(nameSprintNumberJedi);
        containerLineJedi.appendChild(nameScoreLineJedi);
        tableJedi.appendChild(containerLineJedi);
        }
        containerJedis.appendChild(tableJedi);

}//Cierra funcion profileLaboratoriansJedi



/**************SE CREA EL FILTRO PRINCIPAL POR GENERACIONES**********************/
var select=document.getElementById('generationFilter');
propertiesArray= Object.keys(sede);// convierte los objetos dentro de cada una de las generaciones  en un arreglo
for(var i=0; i<propertiesArray.length;i++){ //recorre todas las generaciones de ese arreglo 
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
    evt.currentTarget.className += "active";
}

//************ Funcion Tabs TERMINA *************

/******************************GRAFICANDO********************* */