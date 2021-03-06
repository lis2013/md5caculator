var fs = require('fs');
var path = require('path');
var unzip = require('unzip');
var utils = require('./utils');

module.exports.unzip = function(srcZip, desDir, cb){
    var desDir_ = desDir || '.';
    var callback = cb;
    if(utils.isFunction()){
        callback = desDir;
        desDir_ = '.';
    }
    if( !fs.existsSync( srcZip )){
        if(callback) callback(new Error("srczip not exsit!"));
        return;
    }
    fs.createReadStream( srcZip )
        .pipe(unzip.Extract({path:desDir_}))
        .on("error", function(e){
            callback(e);
        })
        .on("close", function(){
            callback(desDir);
        })
};

