/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getFirstNameAndLastName(_text){
    var result = null;
    var tempo = _text.toLowerCase();
    if(tempo.indexOf(' ') !== -1){
       var tabName = tempo.split(" "); 
       result.prenom = capitalize(tabName[0]);
       if(tabName[1] !== ""){
           result.nom = capitalize(tabName[0]).charAt(0);
       }
    }else{
        result.prenom = capitalize(_text);
    }
    return result;    
}

function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function merge(obj1, obj2, array_miss) { // Our merge function
    var result = {}; // return result
    for (var i in obj1) {      // for every property in obj1 
        if ((i in obj2) && (typeof obj1[i] === "object") && (i !== null)) {
            result[i] = merge(obj1[i], obj2[i]); // if it's an object, merge   
        } else {
            result[i] = obj1[i]; // add it to result
        }
    }
    for (i in obj2) { // add the remaining properties from object 2
        if (i in result) { //conflict
            continue;
        }
        result[i] = obj2[i];
    }

    delete result.$$hashKey;
    for (i in array_miss) {
        delete result[array_miss[i]];
    }
    return result;
}

function formulaire_merge(newForm, oldForm, array_miss) {
    debugger;
    for (i in oldForm) {
        if (array_miss.indexOf(i) === -1) {
            newForm[i] = oldForm[i];
        }
    }
}

function getMonthArray() {
		return months = [{
			label: 'Janvier',
			value: 0
		}, {
			label: 'Février',
			value: 1
		}, {
			label: 'Mars',
			value: 2
		}, {
			label: 'Avril',
			value: 3
		}, {
			label: 'Mai',
			value: 4
		}, {
			label: 'Juin',
			value: 5
		}, {
			label: 'Juillet',
			value: 6
		}, {
			label: 'Août',
			value: 7
		}, {
			label: 'Septembre',
			value: 8
		}, {
			label: 'Octobre',
			value: 9
		}, {
			label: 'Novembre',
			value: 10
		}, {
			label: 'Décembre',
			value: 11
		}];
	}
