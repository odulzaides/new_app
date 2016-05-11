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
Template.add_task.rendered = function() {
    $('#my-datepicker').datepicker({
        format: "mm/dd"
    });
};

/// //// //
////    Template Helpers
/// //// //
Template.item_list.helpers({
    items: function() {
        var priority = $("#priority_sorter").val();
        /// TODO find how to make a select event to show only by priority

        //return Items.find();
        var priority_val = Session.get('priority');
        var user = Meteor.user()._id    ;
        /// Filter by Priority
        if (priority_val === ""){
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
        var id = Session.get('id');
        // console.log(id);
        // console.log(Items.findOne({_id:id}));
        return Items.find({ _id: id });
    }
});

/// //// ////
////    events
/// //// ////
Template.layout.events({ // These wer the body events
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
            Session.set('id', this._id); // /Set Session to clicked task _id
            $("#task_update_form").modal('show');
        }
    },
    'change #priority_sorter':function(event, template){
        console.log("A change detected");
        Session.set('priority', template.find('#priority_sorter').value);
        //console.log("Event priority set to "+ Session.get("priority"));
    }

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
        event.preventDefault();
        var id = Session.get('id');
        console.log('This is the id from the client: ' + id);

        var task = event.target.text.value;
        var due = $('#my-datepicker').val();
        var priority = event.target.priority.value;
        var notes = event.target.notes.value;

        Meteor.call("updateTask", id, task, due, priority, notes);
        $("#task_update_form").modal('hide');
    }
});
Template.item.events({
    'click .js-delete-task': function() {
        //console.log('clicked');
        var id = this._id;
        Meteor.call("removeTask", id);
    }
});
