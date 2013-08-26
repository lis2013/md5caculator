var path = require('path');
var calc = require('../src/calculator');
var utils = require('../src/utils/utils');
var console = require('../src/utils/console');
var event = require('../src/event');
var testdata  = 'E:/xFace3x_Apollo__0826100537.ipa';///path.join(__dirname, "testipa.ipa");

event.on('log', console.log);
event.on('error', console.error);
event.on('warn', console.warn);
event.on('debug', console.debug);
event.on('info', console.info);

calc(testdata, function(e, r){
    if(utils.isString(r)){
        event.emit('log', testdata + " md5 is:" + r);
    }else{
        event.emit('error', "calc md5 " + testdata + " error");
    }
});