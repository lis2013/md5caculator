var colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'green',
    error: 'red'
});

var console_ = module.exports;

console_.info = function(){
    var args = Array.prototype.slice.call( arguments );
    args.unshift("[info]".info);
    console.log.apply(this, args);
};

console_.log = function(){
    var args = Array.prototype.slice.call( arguments );
    args.unshift("[MD5Calculator]".info);
    console.log.apply(this, args);
};

console_.debug = function(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[debug]'.debug);
    console.log.apply(this, args);
};

console_.warn = function(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[warn]'.warn);
    console.log.apply(this, args);
};

console_.error = function(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[error]'.error);
    console.log.apply(this, args);
};
