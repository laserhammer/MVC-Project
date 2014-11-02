//import the controller folder (automatically calls the index.js file)
var controllers = require('./controllers'); 
var mid = require('./middleware');

var router = function(app)
{
	app.get('/login', controllers.Account.loginPage);
	app.post('/login', controllers.Account.login);
	app.get('/', contolllers.Account.loginPage);
};

module.exports = router;

