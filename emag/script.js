class Televizor {
    constructor(nume, pret) {
        this.nume = nume;
        this.pret = pret;
    }
}

var tvs = new Array();
for(var i=0;i<10;i++) {
    tvs.push(new Televizor("Televizor "+(i+1), generateRandomNumberBetween0And100()));
}

function displayProducts(arr) {
    var productsHtml = "";
    var nrProduse = arr.length;
    for(var i=0;i<nrProduse;i++) {
        productsHtml += `
        <div class="produs-container">
            <div class="produs">${arr[i].nume}</div>
            <div class="pret">${arr[i].pret}</div>
            <div class="produs-footer"></div>
        </div>
        `;
    }
    document.getElementById("produse").innerHTML = productsHtml;
}

function sortAsc(arr) {
    console.log("sort asc");
    arr = arr.slice();
    var sortedList = new Array();
    var nrValuesInArray = arr.length;
    for(var i=0;i<nrValuesInArray;i++) {
        var max = getMax(arr); //get max value
        var positionInArray = getPositionInArray(arr, max); //get max value position in vecotr
        arr.splice(positionInArray, 1); //remove max value from the initial vector
        sortedList.push(max);
    }
    displayProducts(sortedList);    
}

function sortDesc(arr) {
    console.log("sort desc");
    arr = arr.slice();
    var sortedList = new Array();
    var nrValuesInArray = arr.length;
    for(var i=0;i<nrValuesInArray;i++) {
        var min = getMin(arr); //get min value
        var positionInArray = getPositionInArray(arr, min); //get min value position in vecotr
        arr.splice(positionInArray, 1); //remove min value from the initial vector
        sortedList.push(min);
    }
    displayProducts(sortedList); 
}

function getMax(arr) {
    var max = arr[0];
    for(var i=0;i<arr.length;i++) {
        if(arr[i].pret>max.pret) {
            max = arr[i];
        }
    }
    return max;
}

function getMin(arr) {
    var min = arr[0];
    for(var i=0;i<arr.length;i++) {
        if(arr[i].pret<min.pret) {
            min = arr[i];
        }
    }
    return min;
}

function getPositionInArray(arr, value) {
    for(var i=0;i<arr.length;i++) {
        if(arr[i] == value) {
            return i;
        }
    }
}

function generateRandomNumberBetween0And100() {
    return Math.floor(Math.random() * 100);
}


function generateRandomNumberBetween0And10() {
    return Math.floor(Math.random() * 10);
}

displayProducts(tvs);



function displayNote() {
    var noteHtml = "";
    for(var i=0;i<10;i++) {
        noteHtml += "<div>" + generateRandomNumberBetween0And10() + "</div>";
    }
    document.getElementById("note").innerHTML = noteHtml;
}

displayNote();