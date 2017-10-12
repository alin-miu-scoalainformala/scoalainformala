var MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";
var MENU_GET_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/";
var MENU_ADD_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu.json";
var MENU_DELETE_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/"; //id.json
var MENU_EDIT_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/"; //id.json
var gJson = undefined;
var menu = [];

class SimpleMenuItem {
    constructor(id, nume, imagine, ingrediente) {
        this.id = id;
        this.nume = nume;
        this.imagine = imagine;
        this.ingrediente = ingrediente;
    }
}

class DetailedMenuItem {
    constructor(id, nume, imagine, ingrediente, reteta) {
        this.id = id;
        this.nume = nume;
        this.imagine = imagine;
        this.ingrediente = ingrediente;
        this.reteta = reteta;
    }
}

function getMenuAsJson(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);

            gJson = json;

            var keys = Object.keys(json.menu);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var item = json.menu[key];
                menu.push(new SimpleMenuItem(key, item.nume, item.imagine, item.ingrediente));
            }

            if (callback) {
                callback();
            }
        }
    };
    xhttp.open("GET", MENU_SERVER_URL, true);
    xhttp.send();
}

function getMenuItemAsJson(callback) {
    var itemId = getParameterByName("id");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);

            gJson = json;

            if (callback) {
                callback();
            }
        }
    };
    xhttp.open("GET", MENU_GET_ITEM_SERVER_URL + itemId + ".json", true);
    xhttp.send();
}

function displayMenu() {
    var h = `
        <table>
    `;
    for (var i = 0; i < menu.length; i++) {
        h = h + `
            <tr class="menu_item">
                <td class="left-td">                
                    <div class="menu_item_img_container">
                        <img src="${menu[i].imagine}" class="menu_item_img" />
                    </div>
                </td>
                <td class="center-td">
                    <div class="menu_item_nume">${menu[i].nume}</div>
                    <div class="menu_item_ingrediente desktopOnly">${menu[i].ingrediente}</div>
                </td>
                <td class="right-td">
                    <div class="menu_item_detalii">
                        <a href="details.html?id=${menu[i].id}" class="btn">DETALII</a>
                    </div>
                </td>
            </tr>
        `;
    }
    h = h + `
        </table>
    `;
    document.getElementById("menu").innerHTML = h;
}

function displayMenuForAdmin() {
    var h = `
    <table>
`;
    for (var i = 0; i < menu.length; i++) {
        h = h + `
        <tr class="menu_item">
            <td class="left-td">                
                <div class="menu_item_img_container">
                    <img src="${menu[i].imagine}" class="menu_item_img" />
                </div>
            </td>
            <td class="center-td">
                <div class="menu_item_nume">${menu[i].nume}</div>
                <div class="menu_item_ingrediente desktopOnly">${menu[i].ingrediente}</div>
            </td>
            <td class="right-td">
                <div class="menu_item_detalii">
                    <a href="edit.html?id=${menu[i].id}" class="btn-blue small-btn">MODIFICA</a>   
                    <a href="delete.html?id=${menu[i].id}" class="btn small-btn">STERGE</a>
                </div>
            </td>
        </tr>
    `;
    }
    h = h + `
    </table>
`;
    document.getElementById("retete").innerHTML = h;
}

function displayMenuItem() {
    var item = gJson;
    var h = `
        <table>
            <tr>
                <td>                
                    <div class="menu_item_img_container">
                        <img src="${item.imagine}" class="menu_item_img" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="menu_item_nume">${item.nume}</div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="menu_item_ingrediente">
                        ${item.ingrediente}
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="menu_item_reteta">
                        ${item.reteta}
                    </div>
                </td>
            </tr>
        </table>
    `;
    document.getElementById("menu_item").innerHTML = h;
}

function displayDeleteItem() {
    var item = gJson;
    document.getElementById("numePreparat").innerText = item.nume;
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

function searchIngrediente() {
    var s = document.getElementById("search_ingredient").value;
    var listaPreparateCeContinIngredientulCautat = [];
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].ingrediente.indexOf(s) > -1) {
            listaPreparateCeContinIngredientulCautat.push(menu[i]);
        }
    }
    displayMenu(listaPreparateCeContinIngredientulCautat);
}

function addReteta(callback) {
    let menu = document.getElementById("inputNume").value;
    let urlImagine = document.getElementById("inputUrlImagine").value;
    let ingrediente = document.getElementById("inputIngrediente").value;
    let reteta = document.getElementById("inputReteta").value;
    
    let produs = new DetailedMenuItem(undefined, menu, urlImagine, ingrediente, reteta);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            if (callback) {
                callback();
            }
        }
    };
    xhttp.open("POST", MENU_ADD_ITEM_SERVER_URL, true);
    xhttp.send(JSON.stringify(produs));
}

function stergePreparat(callback) {
    var itemId = getParameterByName("id");
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            if (callback) {
                callback();
            }
        }
    };
    xhttp.open("DELETE", MENU_DELETE_ITEM_SERVER_URL + itemId + ".json", true);
    xhttp.send();
}

function displayMenuItemForEdit() {
    var item = gJson;
    document.getElementById("inputNume").value = item.nume;
    document.getElementById("inputUrlImagine").value = item.imagine;
    document.getElementById("inputIngrediente").value = item.ingrediente;
    document.getElementById("inputReteta").value = item.reteta;
}

function saveReteta(callback) {
    var itemId = getParameterByName("id");
    
    let menu = document.getElementById("inputNume").value;
    let urlImagine = document.getElementById("inputUrlImagine").value;
    let ingrediente = document.getElementById("inputIngrediente").value;
    let reteta = document.getElementById("inputReteta").value;
    
    let produs = new DetailedMenuItem(itemId, menu, urlImagine, ingrediente, reteta);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            if (callback) {
                callback();
            }
        }
    };
    xhttp.open("PUT", MENU_EDIT_ITEM_SERVER_URL + itemId + ".json", true);
    xhttp.send(JSON.stringify(produs));
}

function redirectToIndex() {
    window.location = "./index.html"
}

function redirectToAdmin() {
    window.location = "./admin.html"
}