//Puedes hacer 
console.log(data);

var obtenerSedes= function(dataObj){
    var select =document.getElementById("sedes");
    var dataKeys = Object.keys(dataObj)
    console.log(dataKeys,dataKeys.length)
    for(var i=0; i<dataKeys.length; i++){
        var option = document.createElement('option');
        option.setAttribute('value', dataKeys[i]);
        option.innerHTML = dataKeys[i];
        select.appendChild(option);
        console.log(dataKeys[i])
    }
}

var getGeneration = function (e){
    var sede = e.target.value;
    var generationSede = data[sede];
    console.log(generationSede);
    var select2 = document.getElementById('generations');
    var gettingSede= Object.keys(generationSede);
        for(var s=0; s<gettingSede.length; s++){
            var option2 = document.createElement('option');
            option2.setAttribute('value', gettingSede[s]);
            option2.innerHTML = gettingSede[s];
            select2.appendChild(option2);
            console.log(gettingSede[s]);
        }
        
    }

var getStudents = function(e){
    var generation = e.target.value;
    var sede = document.getElementById("sedes").value;
    // console.log(students)
    var students = data[sede][generation]["students"];
    var numberStudents = students.length;
    var contStudents = document.getElementById("container");
    var text= document.createElement("p");
    text.innerHTML = numberStudents;
    contStudents.appendChild(text);
    console.log(students);
    var activeStudent = 0;
    var inactiveStudent = 0;
    
    for(var s=0; s<numberStudents; s++){
            if(students[s].active === true){
                activeStudent++;
                console.log("activas" + activeStudent);
            }else{
                inactiveStudent++;
                console.log("inactivas" + inactiveStudent);
            }
    var percent = Math.round(inactiveStudent/numberStudents *100);
    
    var nameStd= students[s].name;
    var pic = students[s].photo;
    console.log(nameStd);
    console.log(pic);
    console.log("Porcentaje desercion: " + percent + "%");
    }

    
}
    

document.getElementById("sedes").addEventListener('change', getGeneration);
document.getElementById("generations").addEventListener('change', getStudents);

obtenerSedes(data);
