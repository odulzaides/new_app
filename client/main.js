Meteor.subscribe('Items');

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
Template.registerHelper('formatDate', function(date) {
    return date.toLocaleDateString("en-US", {
        "day": "numeric",
        "month": "numeric"
    });

});
Template.item_list.helpers({
    items: function() {
        return Items.find();

    }
});

/// //// ////
////	events
/// //// ////
Template.body.events({
    'click .js-add-task-form': function(event) {
    	console.log('clicked');
        $("#task_add_form").modal('show');
    }
});

Template.add_task.events({
    'submit .js-emoticon': function(event) {
        event.preventDefault();
        // console.log('clicked');
        // var text = event.target.text.value;	
        // $('#text_display').html(text);
        // $('#text_display').emoticonize();
        var task = event.target.text.value;
        Meteor.call("addTask", task);
        $("#task_add_form").modal('hide');
    }
});
Template.item.events({
    'click .js-delete-task': function() {
        console.log('clicked');
        var id = this._id;
        Meteor.call("removeTask", id);
    }
});
