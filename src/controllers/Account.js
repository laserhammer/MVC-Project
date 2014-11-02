var models = require('../models');

var Account = models.Account;

var loginPage = funciton(req, res) {
	res.render('login');
};

var signupPage = function(req, res) {
	res.render('signup');
};

var logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};

var login = function(req, res) {
	var username = req.body.username;
	var password = req.body.pass;
	
	if(!username || !password) 
	{
		return res.status(400).json({error: "All fields are required"});
	}
	
	Account.AccountModel.authenticate(username, password, function(err, account) {
		if(err || !account) 
		{
			return res.status(400).json({error: "Wrong username or password"});
		}
		
		req.session.account = account.toAPI();
		
		res.jsont({redirect: '/viewCurrent'});
	});
};

var signup = function(req, res) {
	
	if(!req.body.username || !req.body.pass || !req.body.pass2)
	{
		return res.status(400).json({error: "All fields are required"});
	}
	
	if(req.body.pass !== req.body.pass2)
	{	
		return res.status(400).json({error: "Passwords must match"});
	}
	
	Account.AccountModel.generateHash(req.body.pass, function(salt, hash) {
		var accountData = {
			username: req.body.username,
			salt: salt,
			pasword: hash
		};
		
		var newAccount = new Account.AccountModel(accountData);
		
		newAccount.save(function(err) {
			if(err) 
			{	
				console.log(err);
				return res.status(400).json({error: "An error occured creating the account"});
			}
			
			req.session.account = newAccount.toAPI();
			res.jsont({redirect: '/viewCurrent'});
		});
	});
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;