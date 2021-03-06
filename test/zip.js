var zip = require('../src/utils/zip');
var path = require('path');
var console = require('../src/utils/console');
var test_zip = "testzip.zip";
var test_apk = "testapk.zip";
var test_ipa = "testipa.zip";

function onFinished(desDir) {
    if (typeof(desDir) == typeof("string")) {
        console.log("unzip success:" + desDir);
    } else {
        console.error("unzip error" + desDir.toString());
    }
}
zip.unzip(path.join(__dirname, test_zip), path.join(__dirname, test_zip.split(".")[0]), function(desDir){
    onFinished(desDir);
});

zip.unzip(path.join(__dirname, test_ipa), path.join(__dirname, test_ipa.split(".")[0]), function(desDir){
    onFinished(desDir);
});

zip.unzip(path.join(__dirname, test_apk), path.join(__dirname, test_apk.split(".")[0]), function(desDir){
    onFinished(desDir);
});

