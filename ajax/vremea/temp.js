var a = [1,2,3];
function prod(arr) {
    var p = 1;
    for(var i=0;i<arr.length;i++) {
        p = p * arr[i];
    }
    return p;
}

var produs = prod(a);

console.log(produs);