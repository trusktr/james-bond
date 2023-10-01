# James Bond

Hire James Bond to observe your (object) targets.

## Summary

Use `james-bond` to observe changes to properties in objects.

## Usage

### `observe`/`unobserve`

Observe particular properties of an object (non-deeply).

```js
import * as bond from 'james-bond'

const janus = {
	name: 'Alec Trevelyan',
	stats: {
		kills: 8,
	},
	kill(someone) {
		console.log('killed ' + someone)
		this.stats.kills++
	},
}

const callback = (key, value) => {
	console.log(key, value)
}

bond.observe(janus, ['name'], callback)
bond.observe(janus.stats, ['kills'], callback)

setTimeout(() => {
	janus.name = 'Janus' // logs "name Janus"
	janus.kill('someone') // logs "kills 9"
}, 1000)
```

Later, unobserve when done:

```js
// Unobserve all props for the given callback (in this case, just "kills")
bond.unobserve(janus.stats, callback)
// Alternatively, unobserve specific props for the given callback.
bond.unobserve(janus, ['name'], callback)
```

### `deeplyObserve`

Observe all changes to an object, deeply.

<!-- prettier-ignore -->
> [!Warning]
> `deeplyObserve` currently uses Object.observe internally. Object.observe on it's own
> watches only the top-most level of an object for changes. For now you'll need to
> [install Object.observe globally](https://github.com/MaxArt2501/object-observe).
> (TODO switch to our own `bond.observe` instead)

```javascript
import * as bond from 'james-bond'

var janus = {
	name: 'Alec Trevelyan',
	stats: {
		kills: 8,
	},
	kill: function (someone) {
		console.log('killed ' + someone)
		this.stats.kills++
	},
}

bond.deeplyObserve(janus, function (intel) {
	console.log('Changes were made to these paths:', intel.paths)
})

setTimeout(function () {
	janus.kill('someone')
}, 1000)
```

If you need to update a view, or something, who knows, you can pass in the
function responsible for it, plus arguments for the function. The intel
parameter will be passed in as the last argument to the function, that way the
function works without having to modify it's signature, but if you _do_ want to
modify the function then you can take advantage of the intel parameter.

```javascript
import * as bond from 'james-bond'

var janus = {
	name: 'Alec Trevelyan',
	stats: {
		kills: 8,
	},
	kill: function (someone) {
		console.log('killed ' + someone)
		this.stats.kills++
	},
}

// A function called updateView is defined and available in this scope, then:

bond.deeplyObserve(janus, updateView, arg1, arg2, arg3, etc)

// updateView will be called as updateView(arg1, arg2, arg3, etc, intel)

setTimeout(function () {
	janus.kill('someone')
}, 1000)
```

## Roadmap

- Provide more information through the intel parameter of the callback. Currently only the paths of things that have changed are available.
- Observe new inner objects. Currently, if you replace an object inside a target with a new object, this new inner object is not observed.
- Don't fire the callback for each inner object that is changed, but once for the whole object.
- Add update deferral options, f.e. to have updates batched into a microtask or animation frame.
- Observe when functions are called. E.g. intel will show that Janus `kill`ed someone.
