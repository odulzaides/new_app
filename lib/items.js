Items  = new Mongo.Collection('items');

///  Methods
Meteor.methods({
	'addTask':function(task){
		Items.insert({
		created:new Date(),
		task:task
		});
		console.log(task);
	},
	'removeTask':function(id){
		Items.remove({
		_id:id
		});
		console.log(id);
	}
});