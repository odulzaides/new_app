Meteor.subscribe('Items');

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
//  Set Session to All Tasks
Session.set('priority', "All Tasks");

//  Format date for templates
Template.registerHelper('formatDate', function(date) {
    return date.toLocaleDateString("en-US", {
        "day": "numeric",
        "month": "numeric"
    });

});
//  Datepicker
Template.add_task.rendered = function() {
    $('#my-datepicker').datepicker({
        format: "mm/dd/yyyy"
    });
};


/// //// //
////    Template Helpers
/// //// //
Template.item_list.helpers({
    items: function() {
        var priority = $("#priority_sorter").val();

        /// TODO find how to make a select event to show only by priority

        var priority_val = Session.get('priority');
        var user = Meteor.user()._id;
        console.log('after id ' + user,  priority_val);
        /// Filter by Priority
        if (priority_val === "All Tasks"){
            console.log("First IF priority set to ", priority_val);
            return Items.find();

        }else {
            console.log("Else statement priority value is "+ priority_val+ ". With User ID "+ user);

            return Items.find({owner:user,"priority":priority_val});

        }

    },
    getUser: function() {
        return Meteor.user();
    }
});
Template.add_task.helpers({
    update: function() {
        if(Session.get('id')) {
            var id = Session.get('id');
            var task = Items.find({_id: id});
            console.log(task);
            return task;
        }
    }
    //  TODO - Make a helper that sets priority to what the priority is.
});

/// ////
////    events
/// ////
Template.layout.events({ // These were the body events
    'click .js-add-task-form': function(event) {
        if (!Meteor.user()) {
            $("#join_or_login").modal('show');
        } else {
            console.log('clicked');
            $("#task_add_form").modal('show');
        }
    },
    'click .js-update-task-form': function(event) {
        if (!Meteor.user()) {
            $("#join_or_login").modal('show');
        } else {
            Session.set('id', this._id); // Set Session to clicked task _id
            $("#task_update_form").modal('show');// Show task to edit in modal

        }
    },
    'change #priority_sorter':function(event, template){
        console.log("A change detected");
        Session.set('priority', template.find('#priority_sorter').value);
        //console.log("Event priority set to "+ Session.get("priority"));
    }
//     TODO - Set sorting for "All tasks", "Pending (Not Completed)", and "Completed"
//     TODO - Set Session to whatever the sorter was before.
});

Template.add_task.events({
    'submit .js-add-task': function(event) {
        console.log('clicked');
        event.preventDefault();
        var task = event.target.text.value;
        var due = $('#my-datepicker').val();
        var priority = event.target.priority.value;
        var notes = event.target.notes.value;

        Meteor.call("addTask", task, due, priority, notes);
        $("#task_add_form").modal('hide');
    },
    'submit .js-update-task': function(event) {
        event.preventDefault();// Do not reload form
        var id = Session.get('id');// _id of Task being updated
        var task = event.target.task.value;
        var due = $('#update-datepicker').val();
        var priority = event.target.priorityList.value;
        var notes = event.target.notes.value;
        Meteor.call("updateTask", id, task, due, priority, notes); //  Update Task record
        $("#task_update_form").modal('hide'); //    Hide the modal
    },
    //  click inside date field to show 'datepicker'
    'focus #update-datepicker':function(event){
        $('#update-datepicker').datepicker({
            format: "mm/dd/yyyy",
            autoclose:true
        });
    }
});
Template.item.events({
    'click .js-delete-task': function() {
        //console.log('clicked');
        var id = this._id;
        Meteor.call("removeTask", id);
    }
});
