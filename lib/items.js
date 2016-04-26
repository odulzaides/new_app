Items  = new Mongo.Collection('items');

///  Methods
Meteor.methods({
	'addTask':function(task,due, priority){
		if(!Meteor.user()){
			alert('Login to add tasks')
		}else{


		Items.insert({
		owner:this.userId,
		created:new Date(),
		task:task,
		priority:priority,
		due:due
		});
		console.log(task);
			}
	},
	'removeTask':function(id){
		Items.remove({
		_id:id
		});
		console.log(id);
	}
});