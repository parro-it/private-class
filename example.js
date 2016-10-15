const priv = require('private-class');

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

const p = new Person('Andrea', 40);
// public function are visible
console.log(typeof p.name);
// <-- function

// public getter & setter are visible
p.age = 41;
console.log(p.age);
// <-- 41

// public function can read private fields
console.log(p.name());
// <-- Andrea

// extern code can not read private fields
console.log(p._name);
// <-- undefined
console.log(p._age);
// <-- undefined

