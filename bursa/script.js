var yahoo_stocks = "https://query.yahooapis.com/v1/public/yql?format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=&q=select * from yahoo.finance.quotes where symbol in (\"GOOGL\",\"AAPL\")";

function getStockPrice() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);
            displayStock(json);
        }
    };
    xhttp.open("GET", yahoo_stocks, true);
    xhttp.send();
}

function displayStock(json) {
    console.log(json);
}

getStockPrice();