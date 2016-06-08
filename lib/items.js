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
                due: moment(new Date(due)).toDate(),
                notes: notes,
                checked:status
            });
            console.log(task);
        }
    },
    'updateTask': function(id, task, due, priority, notes) {
        if (!this.userId) {
            alert("You must be logged in to update tasks");
        } else {
            // Update Task
            Items.update({ _id: id }, { $set: { task: task, priority: priority, due:moment(new Date(due)).toDate(), notes: notes } });
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
        if(doc.checked === false) {
            console.log(doc.checked);
            Items.update({_id: id}, {$set: {checked: true}});
        }else{
            Items.update({_id:id}, {$set:{checked: false}});
        }
    }

});
