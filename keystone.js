// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone')/*,
i18n = require('i18n')*/;

// Require keystone-i18n
var i18n = require('i18n');
var handlebars = require('express-handlebars');


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Galtrailer',
	'brand': 'Galtrailer',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '630646b341581be0f8a3307760a70a857859d7b251777dd5c0446d6ae2a3a315f924e94bb26a7f2231a7141b27561d07d6d3c35cc0e3a94fcc859faa3934552e'

});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});


i18n.configure({
	locales:['en', 'pt'],
	cookie: 'language',
	directory: __dirname + '/locales'
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
});



// Start Keystone to connect to your database and initialise the web server
/*
keystonei18n.init({
    locales: ['en', 'pt'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    cookie: 'language'
});
*/

keystone.start();
