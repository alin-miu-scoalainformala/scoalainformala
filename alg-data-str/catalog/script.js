class Elev {
    constructor(nume, note) {
        this.nume = nume;
        this.note = note;
    }
    calculeazaMedie() {
        var medie = undefined;
        var sum = 0;
        for (var i = 0; i < this.note.length; i++) {
            sum += this.note[i];
        }
        medie = sum / this.note.length;
        if (isNaN(medie)) {
            medie = "";
        }
        return medie;
    }
}

var elevi = new Array();
var selectedIndexElev = undefined;

function adaugareElev() {
    let nume = document.getElementById("nume_elev").value;
    if (nume.trim().length > 0) {
        let elev = new Elev(nume, new Array());
        elevi.push(elev);
        document.getElementById("nume_elev").value = "";
    }
}

function adaugareNota() {
    var elev = elevi[selectedIndexElev];
    let nota = document.getElementById("nota_elev").value;
    if (nota.trim().length > 0) {
        nota = parseInt(nota);
        if (!isNaN(nota)) {
            elev.note.push(nota);
            document.getElementById("nota_elev").value = "";
        }
    }
    displayNote();
    displayElevi();
}

function displayElevi() {
    var eleviHtml = "";
    eleviHtml += "<table>";
    eleviHtml += "<tr><th>Nume</th><th>Medie note</th><th></th></tr>";
    for (var i = 0; i < elevi.length; i++) {
        eleviHtml += `<tr>
            <td>${elevi[i].nume}</td>
            <td>${elevi[i].calculeazaMedie()}</td>
            <td>
                <input type="button" value="Vezi notele" onclick="selectedIndexElev=${i}; displayNote();" />
            </td>
        </tr>`;
    }
    eleviHtml += "</table>";
    document.getElementById("lista_elevi").innerHTML = eleviHtml;
}

function hideNote() {
    document.getElementById("lista_elevi_wrapper").style.width="100%";
    document.getElementById("lista_note_wrapper").style.display="none";
}

function displayNote() {
    document.getElementById("lista_elevi_wrapper").style.width="50%";
    document.getElementById("lista_note_wrapper").style.display="initial";

    var elev = elevi[selectedIndexElev];
    var html = "";
    if (elev.note.length > 0) {        
        html += "<table>";
        html += "<tr><th>Nota</th></tr>";
        for (var i = 0; i < elev.note.length; i++) {
            html += "<tr><td>" + elev.note[i] + "</td></tr>";
        }
        html += "</table>";        
    } else {
        html = "Nici o nota adaugata";
    }
    document.getElementById("lista_note").innerHTML = html;
    document.getElementById("note_elev_nume").innerHTML = elev.nume;
}

function displaySortDescElevi() {
    arr = elevi.slice();
    var sortedList = new Array();
    var nrValuesInArray = arr.length;
    for(var i=0;i<nrValuesInArray;i++) {
        var max = getMaxElev(arr); //get max value
        var positionInArray = arr.indexOf(max); //get max value position in vecotr
        arr.splice(positionInArray, 1); //remove max value from the initial vector
        sortedList.push(max);
    }
    elevi = sortedList;
    displayElevi();
}

function displaySortAscElevi() {
    arr = elevi.slice();
    var sortedList = new Array();
    var nrValuesInArray = arr.length;
    for(var i=0;i<nrValuesInArray;i++) {
        var min = getMinElev(arr); //get max value
        var positionInArray = arr.indexOf(min); //get max value position in vecotr
        arr.splice(positionInArray, 1); //remove max value from the initial vector
        sortedList.push(min);
    }
    elevi = sortedList;
    displayElevi();
}

function displaySortAscNote() {
    var elev = elevi[selectedIndexElev];
    arr = elev.note;
    var sortedList = new Array();
    var nrValuesInArray = arr.length;
    for(var i=0;i<nrValuesInArray;i++) {
        var min = getMinNota(arr); 
        var positionInArray = arr.indexOf(min);
        arr.splice(positionInArray, 1); 
        sortedList.push(min);
    }
    elev.note = sortedList;
    displayNote();
}

function displaySortDescNote() {
    var elev = elevi[selectedIndexElev];
    arr = elev.note;
    var sortedList = new Array();
    var nrValuesInArray = arr.length;
    for(var i=0;i<nrValuesInArray;i++) {
        var max = getMaxNota(arr); //get max value
        var positionInArray = arr.indexOf(max); //get max value position in vecotr
        arr.splice(positionInArray, 1); //remove max value from the initial vector
        sortedList.push(max);
    }
    elev.note = sortedList;
    displayNote();
}

function getMaxElev(arr) {
    var max = arr[0];
    for(var i=0;i<arr.length;i++) {
        if(arr[i].calculeazaMedie()>max.calculeazaMedie()) {
            max = arr[i];
        }
    }
    return max;
}

function getMinElev(arr) {
    var min = arr[0];
    for(var i=0;i<arr.length;i++) {
        if(arr[i].calculeazaMedie()<min.calculeazaMedie()) {
            min = arr[i];
        }
    }
    return min;
}

function getMaxNota(arr) {
    var max = arr[0];
    for(var i=0;i<arr.length;i++) {
        if(arr[i]>max) {
            max = arr[i];
        }
    }
    return max;
}

function getMinNota(arr) {
    var min = arr[0];
    for(var i=0;i<arr.length;i++) {
        if(arr[i]<min) {
            min = arr[i];
        }
    }
    return min;
}