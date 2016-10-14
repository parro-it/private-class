import test from 'ava';
import privateClass from './main';

test('exports a function', t => {
	t.is(typeof privateClass, 'function');
});
