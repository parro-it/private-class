const privates = new WeakMap();

const isFunction = p => typeof p.value === 'function';
const isGetter = p => typeof p.get === 'function';
const isSetter = p => typeof p.set === 'function';
const or = (...fns) => p => fns.some(fn => fn(p));
const isNotConstructor = p => p.name !== 'constructor';

const makeProxyFunction = (fn, name) => {
	const proxiedFn = function (...methodArgs) {
		const fields = privates.get(this);
		return fn.apply(fields, methodArgs);
	};

	Object.defineProperty(proxiedFn, 'name', {
		value: name,
		configurable: true
	});

	return proxiedFn;
};

const makeProxyPropertyDescriptor = p => {
	if (isFunction(p)) {
		p.value = makeProxyFunction(p.value, p.name);
	}

	if (isGetter(p)) {
		p.get = makeProxyFunction(p.get, p.name);
	}

	if (isSetter(p)) {
		p.set = makeProxyFunction(p.set, p.name);
	}

	return p;
};

const fieldProp = p => ({[p.name]: makeProxyPropertyDescriptor(p)});

const enhanceWithName = obj => name => Object.assign(
	{name},
	Object.getOwnPropertyDescriptor(obj, name)
);

export default function priv(Class) {
	function Privatized(...args) {
		const fields = new Class(...args);
		privates.set(this, fields);
	}

	const propertyDescriptors = Object.getOwnPropertyNames(Class.prototype)
		.map(enhanceWithName(Class.prototype))
		.filter(or(isFunction, isSetter, isGetter))
		.filter(isNotConstructor)
		.map(fieldProp);

	Object.defineProperties(
		Privatized.prototype,
		Object.assign(...propertyDescriptors)
	);

	Object.defineProperty(Privatized, 'name', {
		value: Class.name,
		configurable: true
	});

	return Privatized;
}
