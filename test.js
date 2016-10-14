import test from 'ava';

const privates = new WeakMap();

function priv(Class) {
	function Privatized(...args) {
		const fields = new Class(...args);
		privates.set(this, fields);
	}

	const methods = Object.getOwnPropertyNames(Class.prototype)
		.filter(p => p !== 'constructor')
		.map(name => ({[name]: function (...methodArgs) {
			const fields = privates.get(this);
			return fields[name](...methodArgs);
		}}))
		.concat({constructor: Privatized});

	Privatized.prototype = Object.assign(...methods);

	return Privatized;
}

const Person = priv(class Person {
	constructor(name, age) {
		this._name = name;
		this._age = age;
	}

	age() {
		return this._age;
	}

	name() {
		return this._name;
	}

});

test('classes could be instantiated', t => {
	const p = new Person('Andrea', 40);
	t.is(p.name(), 'Andrea');
	t.is(p.age(), 40);
	t.is(p._age, undefined);
	t.is(p._name, undefined);
});
