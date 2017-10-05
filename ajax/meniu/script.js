var MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";
var MENU_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/";
var gJson = undefined;
var menu = [];

class SimpleMenuItem {
    constructor(nume, imagine) {
        this.nume = nume;
        this.imagine = imagine;
    }
}

class DetailedMenuItem {
    constructor(nume, imagine, reteta, ingrediente) {
        this.nume = nume;
        this.imagine = imagine;
        this.reteta = reteta;
        this.ingrediente = ingrediente;
    }
}

function getMenuAsJson() {
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
                menu.push(new SimpleMenuItem(item.nume, item.imagine));
            }

            displayMenu();
        }
    };
    xhttp.open("GET", MENU_SERVER_URL, true);
    xhttp.send();
}

function getMenuItemAsJson() {
    var itemId = getParameterByName("id");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);

            gJson = json;

            displayMenuItem(json);
            console.log(gJson);
        }
    };
    xhttp.open("GET", MENU_ITEM_SERVER_URL + itemId + ".json", true);
    xhttp.send();
}

function displayMenu() {
    var h = `
        <table>
    `;
    for (var i = 0; i < menu.length; i++) {
        h = h + `
            <tr class="menu_item">
                <td>                
                    <div class="menu_item_img_container">
                        <img src="${menu[i].imagine}" class="menu_item_img" />
                    </div>
                </td>
                <td>
                    <div class="menu_item_nume">${menu[i].nume}</div>
                </td>
                <td>
                    <div class="menu_item_detalii">
                        <a href="details.html?id=${i}" class="btn">DETALII</a>
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

function displayMenuItem(item) {
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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}