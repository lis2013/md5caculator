
var obj = module.exports;

obj.typeName = function(val){
    return Object.prototype.toString.call(val).slice(8, -1);
};

obj.isArray = function(a){
    return obj.typeName(a) == 'Array';
};

obj.isDate = function(d) {
    return obj.typeName(d) == 'Date';
};

obj.isString = function(s){
    return obj.typeName(s) == 'String';
};

obj.isFunction = function(f){
    return obj.typeName(f) == 'Function';
};