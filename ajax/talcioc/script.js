var emag_api = "https://emag-v1.firebaseio.com/.json";
var emag_get_product_api = "https://emag-v1.firebaseio.com/produse/"; //id.json
var emag_add_product_api = "https://emag-v1.firebaseio.com/produse.json";
var emag_update_product_api = "https://emag-v1.firebaseio.com/produse/"; //id.json
var emag_delete_product_api = "https://emag-v1.firebaseio.com/produse/"; //id.json
var localStorageTalciocKey = 'talciocStorage';

var produs;
var listaProduse = [];
class Produs {
    constructor(id, nume, descriere, pret, cantitate, imagine) {
        this.id = id;
        this.nume = nume;
        this.descriere = descriere;
        this.pret = pret;
        this.cantitate = cantitate;
        this.imagine = imagine;
    }
}
class ProdusCumparat {
    constructor(idProdusCumparat, numeProdusCumparat, pretProdusCumparat, cantitateProdusCumparat) {
        this.idProdusCumparat = idProdusCumparat;
        this.numeProdusCumparat = numeProdusCumparat;
        this.pretProdusCumparat = pretProdusCumparat;
        this.cantitateProdusCumparat = cantitateProdusCumparat;
    }
}

function getProductsJson(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);

            listaProduse = [];
            var productKeys = Object.keys(json.produse);
            for (var i = 0; i < productKeys.length; i++) {
                var key = productKeys[i];
                var prod = json.produse[key];
                listaProduse.unshift(new Produs(key, prod.nume, prod.descriere, prod.pret, prod.cantitate, prod.imagine));
            }

            if (callback) {
                callback();
            }

        }
    };
    xhttp.open("GET", emag_api, true);
    xhttp.send();
}

function displayProductsToUser() {
    var h = "";
    for (var i = 0; i < listaProduse.length; i++) {
        h = h + `
            <div class="produs_container fleft">
                <div class="produs box">
                    <div class="produs_img_container">
                        <img src="${listaProduse[i].imagine}" class="produs_img" />
                    </div>
                    <div class="produs_nume">${listaProduse[i].nume}</div>
                    <div class="produs_pret fleft">${listaProduse[i].pret} $</div>
                    <div class="produs_detalii fright">
                        <a href="./details.html?id=${listaProduse[i].id}" class="btn"">DETALII</a>
                    </div>
                    <div class="clr"></div>
                </div>
            </div>
        `;
    }
    document.getElementById("products").innerHTML = h;
}

function getProductsAndDisplayThemToAdmin() {
    getProductsJson(displayProductsToAdmin);
}

function displayProductsToAdmin() {
    showAdminProductsList();

    var h = "";
    for (var i = 0; i < listaProduse.length; i++) {
        h = h + `
            <tr>
                <td class="td_admin_produs_img"><img src="${listaProduse[i].imagine}" /></td>
                <td>
                    <a onclick="editProduct(${i})">${listaProduse[i].nume}</a>
                </td>
                <td class="taRight">${listaProduse[i].pret} $</td>
                <td class="taRight">${listaProduse[i].cantitate}</td>                
                <td> <a onclick="deleteProduct('${listaProduse[i].id}', getProductsAndDisplayThemToAdmin)">Remove</a> </td>
            </tr>
        `;
    }
    document.getElementById("tbody_products_admin").innerHTML = h;

    document.getElementsByClassName("loading")[0].style.display = "none";
    document.getElementById("tabelGestionareProduse").style.display = "inline-table";
}

function deleteProduct(id, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);

            if (callback) {
                callback();
            }

        }
    };
    xhttp.open("DELETE", emag_delete_product_api + id + ".json", true);
    xhttp.send();
}

function editProduct(productIndex) {
    var product;
    if (productIndex != undefined) {
        product = listaProduse[productIndex];
        document.getElementById("idTitleEditProduct").innerText = "Editare produs: " + product.nume;
    } else {
        document.getElementById("idTitleEditProduct").innerText = "Adaugare produs";
        product = new Produs("", "", "", "", "", "");
    }
    document.getElementById("admin_add_new_product").style.display = 'block';
    document.getElementById("admin_products_list").style.display = 'none';

    document.getElementById("prod_id").value = (product.id == undefined) ? "" : product.id;
    document.getElementById("new_prod_img_url").value = (product.imagine == undefined) ? "" : product.imagine;
    document.getElementById("new_prod_nume").value = (product.nume == undefined) ? "" : product.nume;
    document.getElementById("new_prod_descriere").value = (product.descriere == undefined) ? "" : product.descriere;
    document.getElementById("new_prod_pret").value = (product.pret == undefined) ? "" : product.pret;
    document.getElementById("new_prod_cantitate").value = (product.cantitate == undefined) ? "" : product.cantitate;
}

function showAdminProductsList() {
    document.getElementById("admin_add_new_product").style.display = 'none';
    document.getElementById("admin_products_list").style.display = 'block';
}

function saveProduct(callback) {
    document.getElementsByClassName("loading")[0].style.display = "inline-block";
    document.getElementById("tabelGestionareProduse").style.display = 'none';
    showAdminProductsList();

    var id = document.getElementById("prod_id").value;
    var imagine = document.getElementById("new_prod_img_url");
    var nume = document.getElementById("new_prod_nume");
    var descriere = document.getElementById("new_prod_descriere");
    var pret = document.getElementById("new_prod_pret");
    var cantitate = document.getElementById("new_prod_cantitate");
    var produsNou = new Produs(null, nume.value, descriere.value, pret.value, cantitate.value, imagine.value);



    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);

            if (callback) {
                callback();
            }

            imagine.value = "";
            nume.value = "";
            descriere.value = "";
            pret.value = "";
            cantitate.value = "";

        }
    };
    if (!id) {
        xhttp.open("POST", emag_add_product_api, true);
    } else {
        xhttp.open("PUT", emag_update_product_api + id + ".json", true);
    }
    xhttp.send(JSON.stringify(produsNou));

}

function displayProductDetails() {
    document.getElementById("idImgProductDetails").src = produs.imagine;
    document.getElementById("idNumeProductDetails").innerText = produs.nume;
    document.getElementById("idDescriereProductDetails").innerText = produs.descriere;
    document.getElementById("idPretProductDetails").innerText = produs.pret + " $";
    document.getElementById("idCantitateProductDetails").innerText = produs.cantitate;

    document.getElementsByClassName("loading")[0].style.display="none";
    document.getElementById("details_container").style.display="inline-block";

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getProductDetailsAsJson(callback) {
    var id = getParameterByName("id");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            produs = JSON.parse(res);
            produs.id = id;

            if (callback) {
                callback();
            }

        }
    };
    xhttp.open("GET", emag_get_product_api + id + ".json", true);
    xhttp.send();
}

function getProduseCumparateFromLocalstorage() {
    var itemsFromStorage = localStorage.getItem(localStorageTalciocKey);
    if (itemsFromStorage == undefined) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(itemsFromStorage);
    }
    return itemsFromStorage;
}

function saveProdusToLocalstorage(produs) {
    var existingStoredItems = getProduseCumparateFromLocalstorage();
    existingStoredItems.push(produs);
    saveProdusArrayToLocalstorage(existingStoredItems);
}

function cumparaProdus() {
    var itemsFromStorage = getProduseCumparateFromLocalstorage();

    var cantitateDeCumparat = document.getElementById("cantitateDeCumparat").value;
    var produsCumparat = new ProdusCumparat(produs.id, produs.nume, produs.pret, cantitateDeCumparat);

    saveProdusToLocalstorage(produsCumparat);

    showNotification(produs.nume + " a fost adaugat in cos!");
}

function showNotification(msg) {
    document.getElementById("notification").style.display = 'block';
    document.getElementById("notification_message").innerText = msg;
    setTimeout(() => {
        hideNotification();
    }, 2000);
}

function hideNotification() {
    document.getElementById("notification").style.display = 'none';
}

function afisazaProduseleCumparate() {
    var itemsFromStorage = getProduseCumparateFromLocalstorage();
    var h = "";
    var sumaPretProduse = 0;
    for (var i = 0; i < itemsFromStorage.length; i++) {
        var subtotal = itemsFromStorage[i].pretProdusCumparat * itemsFromStorage[i].cantitateProdusCumparat;
        sumaPretProduse += subtotal;
        h = h + `
            <tr>
                <td>
                    <a class="byedItem" href="./details.html?id=${itemsFromStorage[i].idProdusCumparat}">${itemsFromStorage[i].numeProdusCumparat}</a>
                </td>
                <td>${itemsFromStorage[i].pretProdusCumparat}</td>
                <td class="cCantiate">
                    <a class="byedItem desktopOnly" onclick="decreaseQuantity(${i}); afisazaProduseleCumparate();">-</a>
                    ${itemsFromStorage[i].cantitateProdusCumparat}
                    <a class="byedItem desktopOnly" onclick="increaseQuantity(${i}); afisazaProduseleCumparate();">+</a>
                </td>
                <td class="desktopOnly">${subtotal}</td>
                <td><a onclick="removeItemFromLocalstore(${i});">Remove</a></td>
            </tr>
        `;
    }
    document.getElementById("idTbodyProduseCumparate").innerHTML = h;
    document.getElementById("produse").innerHTML = itemsFromStorage.length;
    document.getElementById("tva").innerHTML = "0 %";
    document.getElementById("cost_transport").innerHTML = "0 $";
    document.getElementById("total").innerHTML = sumaPretProduse;
}

function decreaseQuantity(indexElementCumparat) {
    var itemsFromStorage = getProduseCumparateFromLocalstorage();
    var item = itemsFromStorage[indexElementCumparat];
    if (item.cantitateProdusCumparat > 1) {
        item.cantitateProdusCumparat--;
        saveProdusArrayToLocalstorage(itemsFromStorage);
    }
}

function increaseQuantity(indexElementCumparat) {
    var itemsFromStorage = getProduseCumparateFromLocalstorage();
    var item = itemsFromStorage[indexElementCumparat];
    item.cantitateProdusCumparat++;
    saveProdusArrayToLocalstorage(itemsFromStorage);
}

function saveProdusArrayToLocalstorage(arr) {
    localStorage.setItem(localStorageTalciocKey, JSON.stringify(arr));
}

function removeItemFromLocalstore(itemIndex) {
    var itemsFromStorage = getProduseCumparateFromLocalstorage();
    itemsFromStorage.splice(itemIndex, 1);
    saveProdusArrayToLocalstorage(itemsFromStorage);
    afisazaProduseleCumparate();
}