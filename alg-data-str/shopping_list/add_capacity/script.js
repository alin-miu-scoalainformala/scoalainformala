var items = [];
var itemsCssClasses = [];
var itemsCapacity = [];

function addItem() {
    var itemDescription = document.getElementById('item_description').value;
    var itemCapacity = document.getElementById('item_capacity').value;
    items.push(itemDescription);
    itemsCssClasses[itemDescription]='';
    itemsCapacity[itemDescription]=itemCapacity;

    document.getElementById('item_description').value = "";
    document.getElementById('item_capacity').value = 1;
}

function displayItems() {
    var htmlItems = "";
    htmlItems += `
        <table>
            <tr>
                <th>Item description</th>
                <th>Item capacity</th>
                <th>Action</th>
            </tr>
    `;
    for (var i = 0; i < items.length; i++) {
        htmlItems += `
            <tr class="${itemsCssClasses[items[i]]}">
                <td>${items[i]}</td>
                <td>${itemsCapacity[items[i]]}</td>
                <td>
                    <button class="button button-delete ${isMarkedAsByed(items[i])?'hide':''}" onclick="markItemAsBuyed('${items[i]}'); displayItems();">Mark as buyed</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('lista_cumparaturi').innerHTML = htmlItems;
}

function isMarkedAsByed(itemDescription) {
    return itemsCssClasses[itemDescription] != '';
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