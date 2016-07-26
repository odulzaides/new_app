Template.add_task.helpers({
    update: function () {// Get selected Task
        if (Session.get('id')) {
            console.log(Session.get('id'));
            var id = Session.get('id');
            var task = Items.find({_id: id});
            return task;
        }
    },
    info: function () {// Get selected Task
        if (Session.get('id')) {
            console.log("getting task");
            var id = Session.get('id');
            var task = Items.find({_id: id});
            return task;
        }
    }
});


/// addTask Events
//

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
        //console.log(id);
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
