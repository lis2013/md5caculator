var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

module.exports.md5str = function(data, callback){
   var result = crypto.createHash('md5').update(data).digest("hex");
   if( callback ) callback( result );
   return result;
};

module.exports.md5fileSync = function(fileName, callback){
    callback = callback || function(){};
    if(!fs.existsSync(fileName)){
        callback(new Error(fileName + ' not exsit'));
    }
    var buffer = fs.readFileSync(fileName);
     callback(null, module.exports.md5str(buffer));
};

module.exports.md5file = function(filename, callback){
    callback = callback || function(){};
    var md5sum = crypto.createHash('md5');
    var s = fs.ReadStream(filename);
    s.on('data', function(d){
       md5sum.update(d);
    });

    s.on('end', function(){
       var d = md5sum.digest('hex');
       if(callback){
           callback(null, d);
       }
    });

    s.on('error', function(e){
        if(callback)
            callback(e);
    });
};