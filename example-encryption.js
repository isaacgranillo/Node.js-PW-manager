var crypto = require('crypto-js');

var secretMessage = {
	name: 'Isaac',
	alias: 'coder'
};

var secretKey = '12345';

//encrypting
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);

console.log('Encrypted Message: ' + encryptedMessage);

//decrypting
 var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
 var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));

 console.log('Decrypt message: ' + decryptedMessage);
 console.log(decryptedMessage.alias)