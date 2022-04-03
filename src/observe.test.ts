import {observe, unobserve} from './observe.js'

describe('observe and unobserve', () => {
	it('observes and unobserves objects synchronously', async () => {
		const person = {
			name: 'Roy',
			age: '20',
		}

		const changes: PropertyKey[] = []

		const onPropChange = (prop: PropertyKey, value: string) => {
			changes.push(prop, value)
		}

		observe(person, ['name', 'age'], onPropChange)

		person.name = 'Erika'
		person.age = '30'

		expect(changes).toEqual(['name', 'Erika', 'age', '30'])

		person.name = 'Lars'
		person.age = '40'

		expect(changes).toEqual(['name', 'Erika', 'age', '30', 'name', 'Lars', 'age', '40'])

		unobserve(person, ['name'], onPropChange)

		person.name = 'Hansen'
		person.age = '33'

		expect(changes).toEqual(['name', 'Erika', 'age', '30', 'name', 'Lars', 'age', '40', 'age', '33'])

		unobserve(person, onPropChange)

		person.name = 'Amadar'
		person.age = '28'

		expect(changes).toEqual(['name', 'Erika', 'age', '30', 'name', 'Lars', 'age', '40', 'age', '33'])
	})
})
