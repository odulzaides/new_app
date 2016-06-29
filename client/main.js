Meteor.subscribe('Items');

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
//  Set Session to All Tasks
Session.set('priority', "Pending");


//  Format date for templates
Template.registerHelper('formatDate', function (date) {
    // var formattedDate = date.toLocaleString('en-us',{
    //         //"weekday":"short", //   TODO - set to show only weekday if it is THIS week.
    //         "day":"numeric",
    //         "month": "numeric"
    //     }
    var date, d, m;
    date = date;
    d = date.getDate();
    m = date.getMonth();
    return m+"/"+d;
    // );
    // return formattedDate;
});

Template.registerHelper('sorterPriority', function () {
    var priority= Session.get('priority');

    if(priority === 'Pending' || priority === 'Completed'){
        return Session.get('priority') + " tasks";
    } else if (priority === 'All Tasks') {
        return Session.get('priority');
    } else {
        return Session.get('priority') + " priority tasks ";
    }
});
Template.registerHelper('getUser', function () {
    Session.set('user', Meteor.user());
    var user = Session.get('user');
    return user.username;
});

Template.registerHelper('isSelected', function () {// Select dropdown priority on load
    if (this._id) {
        Session.set('id', this._id);
        var id = Session.get('id');
        var taskPriority = Items.findOne({_id: id}).priority;
        return (taskPriority === value) ? 'selected' : '';
    }
});
Template.registerHelper('sorterSelected', function (value) {
    var sorterSelection = Session.get('priority');
    return (sorterSelection === value) ? 'selected' : '';

});
//  Datepicker
Template.add_task.rendered = function () {
    $('#my-datepicker').datepicker();
};


/// ////
////        Template Helpers
/// ////
Template.item_list.helpers({
    items: function () {// Display only tasks wanted
        if (Meteor.user()) {
            var priority_val = Session.get('priority');
            var user = Meteor.user()._id;
            switch (priority_val) {// Mongo Filters
                case "All Tasks":
                    return Items.find();
                    break;

                case "Pending":
                    return Items.find({checked: false});
                    break;

                case "Low":
                    return Items.find({owner: user, "priority": "Low", checked: false}, {sort: {"created": -1}});
                    break;

                case "Medium":
                    return Items.find({owner: user, "priority": "Medium", checked: false}, {sort: {"created": -1}});
                    break;

                case "High":
                    return Items.find({owner: user, "priority": "High", checked: false}, {sort: {"created": -1}});
                    break;

                case "Completed":
                    return Items.find({owner: user, checked: true});
                    break;
            }
        }

    },
        today: function(){// Tasks due today
            var today = new Date();
            today.setHours(0,0,0,0);
            return Items.find(
                {due:today},
                {sort:{due:-1}}
            ).fetch();
    },
    pastDue: function(){// Tasks due today
        var today = new Date();
        today.setHours(0,0,0,0);
        var beforeToday = new Date();
        beforeToday.setHours(0,0,0,0);
        beforeToday.setDate(today.getDate()-1);
        return Items.find(
            {due:{$not:{$gt: beforeToday}}},
            {sort:{due:-1}}
        ).fetch();
    },
    dueSoon: function(){// Tasks due today
        var today = new Date();
        today.setHours(0,0,0,0);
        var tomorrow = new Date();
        tomorrow.setHours(0,0,0,0);
        tomorrow.setDate(today.getDate()+1);
        return Items.find(
            {due:{$gt: today}},
            {sort:{due:-1}}
        ).fetch();
    }
});
///
/// HighPriorityTasks
///
Template.highPriorityCount.helpers({
    highPriorityTasks: function() {
        console.log("I'm in highPriorityCount " + Session.get('user')._id);
        var user = Meteor.user()._id;
        return Items.find({owner: user, "priority": "High", checked:false}).count();
}
});
///
/// Item helper
///
Template.item.helpers({
    isComplete: function () {// Strike out text if item is complete
        return this.checked ? 'complete' : '';
    },
    isChecked: function () {
        return this.checked ? 'checked' : false;
    }
});
///
/// Add Task helper
///
Template.add_task.helpers({
    update: function () {// Get selected Task
        if (Session.get('id')) {
            var id = Session.get('id');
            var task = Items.find({_id: id});
            return task;
        }
    }
});

///
/// Layout events
///
Template.layout.events({ // These were the body events
    'click .js-add-task-form': function (event) {
        if (!Meteor.user()) {
            $("#join_or_login").modal('show');
        } else {
            $("#task_add_form").modal('show');
        }
    },
    'click .js-update-task-form': function (event) {
        if (!Meteor.user()) {
            $("#join_or_login").modal('show');
        } else {
            Session.set('id', this._id); // Set Session to clicked task _id
            $("#task_update_form").modal('show');// Show task to edit in modal
        }
    },
    'change #priority_sorter': function (event, template) {
        Session.setPersistent('priority', template.find('#priority_sorter').value);
    }
});
///
/// Add Task Events
///
Template.add_task.events({
    'submit .js-add-task': function (event) {
        event.preventDefault();
        var task = event.target.text.value;
        var due = $('#my-datepicker').val();
        var priority = event.target.priority.value;
        var notes = event.target.notes.value;
        var status = false;

        Meteor.call("addTask", task, due, priority, notes, status);
        $("#task_add_form").modal('hide');
    },
    'submit .js-update-task': function (event) {
        event.preventDefault();// Do not reload form
        var id = Session.get('id');// _id of Task being updated
        console.log(id);
        var task = event.target.task.value;
        var due = $('#update-datepicker').val();
        var priority = event.target.priorityList.value;
        //due = moment(due , "dd.mm.yy").toDate();
        var notes = event.target.notes.value;
        Meteor.call("updateTask", id, task, due, priority, notes); //  Update Task record
        $("#task_update_form").modal('hide'); //    Hide the modal
    },
    'focus #update-datepicker': function (event) {//  click inside date field to show 'datepicker'
        $('#update-datepicker').datepicker({
            format: "mm/dd/yyyy",
            autoclose: true
        });
    }
});

///
/// Item Events
///
// Todo Seperate helper and events into one file for each template.
// Todo Set up page if user is not logged in to display - ie "Log in or Create user to begin..."
Template.item.events({
    'click .js-delete-task': function () {// remove tasks from collection
        var id = this._id;
        Meteor.call("removeTask", id);
    },
    'change .js-checked': function (event) {// set status of task by checking box
        var id = this._id;
        Meteor.call('checkedTask', id);
    },
    'hover .js-update-task-form': function () {
        $('[data-toggle=tooltip]').tooltip();
    }
});

///
/// High Priority Count Events
///
Template.highPriorityCount.events({
   'click .js-go-to-high-priority': function(){// Show only high priority tasks in Task list
       Session.set('priority', "High");
   }
});