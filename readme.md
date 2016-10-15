# private-class

> Private fields in js classes

This module allow to protected private fields of youtr classes.


## Usage

```js
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
```

[![Travis Build Status](https://img.shields.io/travis/parro-it/private-class/master.svg)](http://travis-ci.org/parro-it/private-class)
[![Code Climate](https://img.shields.io/codeclimate/github/parro-it/private-class.svg)](https://codeclimate.com/github/parro-it/private-class)
[![Coverage Status](https://coveralls.io/repos/github/parro-it/private-class/badge.svg?branch=master)](https://coveralls.io/github/parro-it/private-class?branch=master)
[![NPM downloads](https://img.shields.io/npm/dt/private-class.svg)](https://npmjs.org/package/private-class)


## API

```js
const privateClass = (Class: function): function
```

Given a class, return a new class that doesn't allow to access private properties.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install private-class
```

## See Also

- [`noffle/common-readme`](https://github.com/noffle/common-readme)

## License

MIT

