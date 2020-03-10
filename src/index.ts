import {observe, unobserve} from './observe'

export {observe, unobserve}

type Handler = (arg: {paths: string[]}, ...args: any[]) => unknown

export function deeplyObserve(object: object, handler: Handler, argumentArray: any[] = [], path = '') {
	if (typeof object !== 'object' || !object) {
		throw new Error('Cannot observe a non-object.')
	}

	// requires Object.observe
	;(Object as any).observe(object, function(changes: any) {
		var paths: any[] = []

		changes.forEach(function(change: any) {
			paths.push(path.length ? path + '.' + change.name : change.name)
		})

		handler({paths}, ...argumentArray)
	})

	for (var prop in object) {
		const value: object = (object as any)[prop]

		if (value && typeof value === 'object') {
			deeplyObserve(value, handler, argumentArray, path.length ? path + '.' + prop : prop)
		}
	}
}

export const version = '0.4.2'
