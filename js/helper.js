/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function updateArray(array, new_array) {
    if (array.length === new_array.length) {
        for (index in new_array) {
            if (!angular.equals(array[index], new_array[index])) {
                array[index] = new_array[index];
            }
        }
    } else {
        for (index in array) {
            if (!angular.equals(array[index], new_array[index])) {
                array[index] = new_array[index];
            }
        }
    }


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
    for (i in oldForm) {
        if (array_miss.indexOf(i) === -1) {
            newForm[i] = oldForm[i];
        }
    }
}


function setFile (element) {
    var _scope = angular.element("#formData_id").scope();
    _scope.$apply(function(){
        _scope.formData.data = element.files[0];
    });
    
};

