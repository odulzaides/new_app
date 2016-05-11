Router.configure({
	layoutTemplate: 'layout'
});
Router.route('/', function(){
	console.log("Setup Route");
	this.render('item_list');
});