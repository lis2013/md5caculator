var md5 = require('../src/utils/md5');
var p = require('path');
var d = p.join(__dirname, 'zip.js');

var a =["6a81490f81c293c021105d28a9d137c9", "345130646c5c30f9f1a5593be8b3f55c", "2ed27e490288abfc00732bc2f0cdbfaa", "26567c0e378766f38baf34bbc73cf0dd"];
a.sort(function(a, b){
    return a > b;
});

console.log(a.toString());

var r = md5.md5fileSync(d);
console.log("syc:" + r);

md5.md5file(d, function(r){
   console.log("async:" + r);
});