# James Bond

Hire James Bond to observe your (object) targets.

## Summary

Use `james-bond` to observe changes to properties in objects.

## Usage

### `observe(obj)`/`unobserve(obj)`

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

## Roadmap

- Add deferral options, f.e. to have updates batched into a microtask or
  animation frame.
