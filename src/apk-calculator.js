
var md5 = require('./utils/md5');
module.exports = function(path, callback){
    md5.md5file(path, callback);
};