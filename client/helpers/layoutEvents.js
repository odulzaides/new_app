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
