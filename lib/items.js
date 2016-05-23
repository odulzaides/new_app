Items = new Mongo.Collection('items');

///  Methods
Meteor.methods({
    'addTask': function(task, due, priority, notes, status) {
        if (!Meteor.user()) {
            alert('Login to add tasks');
        } else {

            console.log('Add Task method');
            Items.insert({
                owner: this.userId,
                created: new Date(),
                task: task,
                priority: priority,
                due: due,
                notes: notes,
                checked:status
            });
            console.log(task);
        }
    },
    'updateTask': function(id, task, due, priority, notes) {
        if (!this.userId) {
            //TODO: Insert a modal here instead of an alert()	
            alert("You must be logged in to update tasks");
        } else {
        	console.log(id);
            //id = Session.get('id');
            console.log('update task method of task with id: ' + id);
            console.log(Items.findOne({ _id: id }));
            // Update Task
            Items.update({ _id: id }, { $set: { task: task, priority: priority, due: due, notes: notes } });
        }

    },
    'removeTask': function(id) {
        Items.remove({
            _id: id
        });
        console.log(id);
    },
    'checkedTask':function(id){
        var doc = Items.findOne({_id:id});
        if(doc.checked === 'pending'){
            Items.update({_id:id}, {$set:{checked:'complete'}});

        }else{
            Items.update({_id:id}, {$set:{checked:'pending'}});
        }
    }
    /// TODO - need checked method to update checked.

});
