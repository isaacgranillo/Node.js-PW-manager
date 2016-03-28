console.log('starting pw manager');
var crypto = require('crypto-js');
var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
	.command('create', 'Create a new account', function (yargs){
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account Name',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Account username or email',
				type: 'string',
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			},
			master_password: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		}).help('help');
})
	.command('get', 'Get an account', function (yargs){
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account Name',
				type: 'string'
			},
			master_password: {
				demand: true,
				alias:'m',
				description: 'Master Password',
				type: 'string'
			}
		}).help('help')
	})
	.help('help')
	.argv;

var command = argv._[0];

function getAccounts (master_password){
	var encryptedAccount = storage.getItemSync('accounts');
	var accounts = [];
	if (typeof encryptedAccount !== 'undefined'){
		var bytes = crypto.AES.decrypt(encryptedAccount, master_password);
		accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
	}

	return accounts;
}

function saveAccounts (accounts, master_password){
	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), master_password);
	storage.setItemSync('accounts', encryptedAccounts.toString());
	return accounts;
}


function createAccount(account, master_password){
	var accounts = getAccounts(master_password)

	accounts.push(account);
	saveAccounts(accounts, master_password);
	return account;
}

function getAccount(accountName, master_password){
	var accounts = getAccounts(master_password);
	var matchedAccount;

	accounts.forEach(function(account){
		if (account.name === accountName){
			matchedAccount = account;
		}
	});

	return matchedAccount;
};


if(command === 'create'){
	try{
		var createdAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password,
	}, argv.master_password);
	console.log('Account Created');
	console.log(createdAccount);
	}
	catch(e){
		console.log('Unable to create account');
	}
}

else if (command === 'get'){
	try{
		var fetchedAccount = getAccount(argv.name, argv.master_password);

		if(typeof fetchedAccount === 'undefined'){
		console.log('Account does not exist')
		}
		else{
			console.log('Account found')
			console.log(fetchedAccount);
		}
	}
	catch(e){
		console.log('Cant get account');
	}
}















