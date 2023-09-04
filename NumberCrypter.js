module.exports = class NumberCrypter {
	mask = 2817863836;

	constructor (data) {
		if(data != undefined){
			this.mask = data.mask ? data.mask : this.mask;
		}
	}
	
	crypt = (plain) => {
		let tmp = plain;
		for(let i = 0; i < 31; i++){
			tmp = tmp ^ this.mask
			tmp = this._rotateLeft(tmp);
		}

		tmp = this._fromIntegerTo32Bin(tmp);
		tmp = [
			tmp.slice(0, 3),
			tmp.slice(3, 6),
			tmp.slice(6, 9),
			tmp.slice(9, 12),
			tmp.slice(12, 15),
			tmp.slice(15, 17),
			tmp.slice(17, 20),
			tmp.slice(20, 23),
			tmp.slice(23, 26),
			tmp.slice(26, 29),
			tmp.slice(29, 32)
		]
		tmp = [
			this._from3BinToLetter(tmp[0]),
			this._from3BinToNumber(tmp[1]),
			this._from3BinToNumber(tmp[2]),
			this._from3BinToLetter(tmp[3]),
			this._from3BinToNumber(tmp[4]),
			this._from2BinToLetter(tmp[5]),
			this._from3BinToLetter(tmp[6]),
			this._from3BinToLetter(tmp[7]),
			this._from3BinToNumber(tmp[8]),
			this._from3BinToNumber(tmp[9]),
			this._from3BinToLetter(tmp[10])
		]
		tmp = tmp.join("");
		return tmp;
	}

	decrypt = (chyper) => {
		let tmp = chyper;
		tmp = tmp.split("");
		tmp = [
			this._fromLetterTo3Bin(tmp[0]),
			this._fromNumberTo3Bin(tmp[1]),
			this._fromNumberTo3Bin(tmp[2]),
			this._fromLetterTo3Bin(tmp[3]),
			this._fromNumberTo3Bin(tmp[4]),
			this._fromLetterTo2Bin(tmp[5]),
			this._fromLetterTo3Bin(tmp[6]),
			this._fromLetterTo3Bin(tmp[7]),
			this._fromNumberTo3Bin(tmp[8]),
			this._fromNumberTo3Bin(tmp[9]),
			this._fromLetterTo3Bin(tmp[10])
		]
		
		tmp = tmp.join("");
		tmp = this._from32BinToInteger(tmp);
		
		for(let i = 0; i < 31; i++){
			tmp = this._rotateRight(tmp);
			tmp = tmp ^ this.mask
		}
		return tmp;
	}
	
	_rotateRight = (number) => {
		let str = this._fromIntegerTo32Bin(number);
		str =  str.slice(str.length - 1, str.length) + str.slice(0, str.length - 1);
		return this._from32BinToInteger(str);
	}

	_rotateLeft = (number) => {
		let str = this._fromIntegerTo32Bin(number);
		str = str.slice(1, str.length) +  str.slice(0, 1);
		return this._from32BinToInteger(str);
	}

	// Integer => 32bit
	_fromIntegerTo32Bin = (number) => {
		number = (number >>> 0).toString(2);
		if(number.length > 32){
			throw Error("Too long number")
		}
		return number.padStart(32, '0');
	}
	
	// Integer <= 32bit
	_from32BinToInteger = (str) => {
		return parseInt(str, 2)
	}

	
	_from3BinToNumber = (num) => {
		switch(num){
			case '000': return '2';
			case '001': return '3';
			case '010': return '4';
			case '011': return '5';
			case '100': return '6';
			case '101': return '7';
			case '110': return '8';
			case '111': return '9';
		}
	}
	
	_fromNumberTo3Bin = (num) => {
		switch(num){
			case '2': return '000';
			case '3': return '001';
			case '4': return '010';
			case '5': return '011';
			case '6': return '100';
			case '7': return '101';
			case '8': return '110';
			case '9': return '111';
		}
	}

	
	_from3BinToLetter = (num) => {
		switch(num){
			case '000': return 'R';
			case '001': return 'L';
			case '010': return 'F';
			case '011': return 'X';
			case '100': return 'T';
			case '101': return 'U';
			case '110': return 'M';
			case '111': return 'A';
		}
	}
	
	_fromLetterTo3Bin = (num) => {
		switch(num){
			case 'R': return '000';
			case 'L': return '001';
			case 'F': return '010';
			case 'X': return '011';
			case 'T': return '100';
			case 'U': return '101';
			case 'M': return '110';
			case 'A': return '111';
		}
	}

	
	_from2BinToLetter = (num) => {
		switch(num){
			case '00': return 'P';
			case '01': return 'N';
			case '10': return 'S';
			case '11': return 'Z';
		}
	}
	
	_fromLetterTo2Bin = (num) => {
		switch(num){
			case 'P': return '00';
			case 'N': return '01';
			case 'S': return '10';
			case 'Z': return '11';
		}
	}
	
}
