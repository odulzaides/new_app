Router.configure({
	layoutTemplate: 'layout'
});
Router.route('/', function(){
	this.render('item_list');
});