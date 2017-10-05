var emag_api = "https://emag-v1.firebaseio.com/.json";
var listaProduse = [];
class Produs {
    constructor(nume, pret, cantitate, imagine) {
        this.nume = nume;
        this.pret = pret;
        this.cantitate = cantitate;
        this.imagine = imagine;
    }
}

function getProductsJson() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);
            
            var productKeys = Object.keys(json.produse);
            for(var i=0;i<productKeys.length;i++) {
                var key = productKeys[i];
                var prod = json.produse[key];
                listaProduse.push(new Produs(key, prod.pret, prod.cantiate, prod.imagine));
            }

            displayProducts();

        }
    };
    xhttp.open("GET", emag_api, true);
    xhttp.send();
}

function displayProducts() {    
    var h = "";
    for(var i=0;i<listaProduse.length;i++) {
        h = h + `
            <div class="produs_container">
                <div class="produs">
                    <div class="produs_img_container">
                        <img src="${listaProduse[i].imagine}" class="produs_img" />
                    </div>
                    <div class="produs_nume">${listaProduse[i].nume}</div>
                    <div class="produs_pret">${listaProduse[i].pret} $</div>
                    <div class="produs_detalii">
                        <button class="btn">DETALII</button>
                    </div>
                    <div class="clr"></div>
                </div>
            </div>
        `;
    }
    document.getElementById("products").innerHTML = h;
    console.log(listaProduse);
}