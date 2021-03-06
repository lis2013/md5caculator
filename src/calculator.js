
var path = require('path'),
    event = require('./event');

var fileType = {
    ipa : require('./ipa-calculator'),
    apk : require('./apk-calculator')
};

module.exports = function(p, cb){
    p = path.resolve(p);
    var ext = path.extname(p).substring(1);
    if(Object.keys.call( null, fileType).indexOf(ext) > -1){
        fileType[ext](p, cb);
    }else{
        event.emit('error', ext + " format not supported.");
    }
};

