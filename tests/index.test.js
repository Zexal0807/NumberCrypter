const assert = require('assert');

const NumberCrypter = require('../NumberCrypter');
const numberCrypter = new NumberCrypter();

it('Encrypt', async () => {
	const result = numberCrypter.crypt(2);
	assert.equal(result, "F82R7NTA76F");
});

it('Decrypt', async () => {
	const result = numberCrypter.decrypt("F82R7NTA76F");
	assert.equal(result, 2);
});
