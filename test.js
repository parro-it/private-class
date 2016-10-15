import test from 'ava';
import priv from './main';

const Person = priv(class Person {
	constructor(name, age) {
		this._name = name;
		this._age = age;
	}

	get age() {
		return this._age;
	}

	set age(value) {
		this._age = value;
	}

	name() {
		return this._name;
	}
});

test('classes could be instantiated', t => {
	const p = new Person('Andrea', 40);
	t.is(typeof p, 'object');
	t.false(p === null);
});

test('public function are visible', t => {
	const p = new Person('Andrea', 40);
	t.is(typeof p.name, 'function');
});

test('public getter are visible', t => {
	const p = new Person('Andrea', 40);
	t.is(p.age, 40);
});

test('public setter are visible', t => {
	const p = new Person('Andrea', 40);
	p.age = 41;
	t.is(p.age, 41);
});

test('public function can read private fields', t => {
	const p = new Person('Andrea', 40);
	t.is(p.name(), 'Andrea');
});

test('extern code can not read private fields', t => {
	const p = new Person('Andrea', 40);
	t.is(p._name, undefined);
});

test('public function names are preserved', t => {
	const p = new Person('Andrea', 40);
	t.is(p.name.name, 'name');
});

test('Class name is preserved', t => {
	t.is(Person.name, 'Person');
});

test('constructor is preserved', t => {
	t.is(Person.prototype.constructor, Person);
});
