
function observe(object, handler, argumentArray) {
    var path = arguments[3];

    if (!(object instanceof Object)) {
        throw new Error("Cannot observe a non-object.");
    }

    if (typeof path == 'undefined') {
        path = "";
    }

    Object.observe(object, function(changes) {
        var paths = [];
        changes.forEach(function(change) {
            paths.push(path.length? path+'.'+change.name: change.name);
        });
        if (typeof argumentArray != 'undefined') {
            handler.apply([{ paths: paths }].concat(Array.splice.call(arguments, 2)));
        }
        else {
            handler({ paths: paths });
        }
    });

    for (var prop in object) {
        if (object[prop] instanceof Object) {
            observe(object[prop], handler, argumentArray, (path.length? path+'.'+prop: prop) );
        }
    }
}

module.exports.observe = observe;
