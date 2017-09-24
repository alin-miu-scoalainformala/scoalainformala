var stock_signs = "\"GOOGL\",\"AAPL\",\"FB\",\"MSFT\"";
var yahoo_stocks = "https://query.yahooapis.com/v1/public/yql?format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=&q=select * from yahoo.finance.quotes where symbol in ("+stock_signs+")";
var curs_bnr = "http://www.bnr.ro/nbrfxrates.xml";


function getStockPrices() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);
            displayStocks(json);
        }
    };
    xhttp.open("GET", yahoo_stocks, true);
    xhttp.send();
}

function getGetCursBnr() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = xhttp.responseXML;
            console.log(xmlDoc);
        }
    };
    xhttp.open("GET", curs_bnr, true);
    xhttp.send();
}

function displayStocks(json) {
    var htmlStocks = '';
    var symbols = json.query.results.quote;
    var size = symbols.length;
    for(var i=0;i<size;i++) {
        htmlStocks += getHtmlStock(symbols[i]);
    }    
    document.getElementById("stocks_wrapper").innerHTML = htmlStocks;
}

function getHtmlStock(stock) {
    console.log(stock);
    var htmlStock = `
        <div class="stock-box">
            <p class="stock-symbol">Symbol: ${stock.symbol}</p>
            <hr/>
            <p>Bid: ${stock.Bid}</p>
            <p>Year High: ${stock.YearHigh}</p>
            <p>Year Low: ${stock.YearLow}</p>
            <p>Volume: ${stock.Volume}</p>
        </div>
    `;
    return htmlStock;
}

getStockPrices();
getGetCursBnr();