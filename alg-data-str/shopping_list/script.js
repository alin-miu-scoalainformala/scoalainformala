var items = [];
var itemsCssClasses = [];

function addItem() {
    var itemDescription = document.getElementById('item_description').value;
    items.push(itemDescription);
    itemsCssClasses[itemDescription]='';
    document.getElementById('item_description').value = "";
}

function displayItems() {
    var htmlItems = "";
    htmlItems += `
        <table>
            <tr>
                <th>Item description</th>
                <th>Action</th>
            </tr>
    `;
    for (var i = 0; i < items.length; i++) {
        htmlItems += `
            <tr class="${itemsCssClasses[items[i]]}">
                <td>${items[i]}</td>
                <td>
                    <button class="button button-delete" onclick="markItemAsBuyed('${items[i]}'); displayItems();">Mark as buyed</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('lista_cumparaturi').innerHTML = htmlItems;
}

function markItemAsBuyed(itemDescription) {
    itemsCssClasses[itemDescription] = 'buyed';
}

function sortAsc() {
    items.sort(function (a, b) {
        return a.localeCompare(b);
    });
}

function sortDesc() {
    items.sort(function (a, b) {
        return b.localeCompare(a);
    });
}