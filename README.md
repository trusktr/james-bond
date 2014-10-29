
James Bond
==========

Hire James Bond to deeply observe your (object) targets.

## Summary

Use `james-bond` to observe changes in objects (including nested objects) recursively, then fire a handler with the specified arguments. `james-bond` uses Object.observe internally. Object.observe on it's own watches only the top-most level of an object for changes.

This works with **nodejs>=0.11.3** and browsers that have Object.observe.

## Usage

```javascript
var bond = require('james-bond');

var janus = {
    name: "Alec Trevelyan",
    stats: {
        kills: 8
    },
    kill: function(someone) {
        console.log('killed '+someone);
        this.stats.kills++;
    }
};

bond.observe(janus, function(intel) {
    console.log('Changes were made to these paths:', intel.paths);
});

setTimeout(function() {
    janus.kill('someone');
}, 1000);
```

If you need to update a view, or something, who knows, you can pass in the function responsible for it, plus arguments for the function. The intel parameter will be passed in as the last argument to the function, that way the function works without having to modify it's signature, but if you *do* want to modify the function then you can take advantage of the intel parameter.

```javascript
var bond = require('james-bond');

var janus = {
    name: "Alec Trevelyan",
    stats: {
        kills: 8
    },
    kill: function(someone) {
        console.log('killed '+someone);
        this.stats.kills++;
    }
};

// A function called updateView is defined and available in this scope, then:

bond.observe(janus, updateView, arg1, arg2, arg3, etc);

// updateView will be called as updateView(arg1, arg2, arg3, etc, intel)

setTimeout(function() {
    janus.kill('someone');
}, 1000);
```

## Roadmap

### v1.0.0

 * Provide more information through the intel parameter of the callback. Currently only the paths of things that have changed are available.
 * Observe new inner objects. Currently, if you replace an object inside a target with a new object, this new inner object is not observed.
 * Don't fire the callback for each inner object that is changed, but once for the whole object.

### v2.0.0

 * Add a way to specify that the handler function should be called with requestAnimationFrame so rendering isn't blocked.
 * Observe when functions are called. E.g. intel will show that Janus `kill`ed someone.
