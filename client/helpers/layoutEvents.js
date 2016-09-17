/// Layout events
///
Template.layout.events({ // These were the body events

    // TODO: Change the way you enter tasks.
    /*       Try to setup so:
                1. When you hit enter it creates a new task and lists it.
                2. Once it is on task list change so you can enter #Datepicker right on item.
                3. Adjust priority as well
            ** One thing to check out is how to change field onblur.
                Need to change the way Due, Priority behave when clicked.
            *** Once done refresh README by adding changelog. 
                Add new parts to help modal. 
*/
    'keypress .js-add-task-form': function (event) {
        if (event.which === 13) {   
            if (!Meteor.user()) {
                $("#join_or_login").modal('show');
            } else {
                    $("#task_add_form").on('shown.bs.modal', function() {                        
                    $(this).find('input').focus();
            });
                let newTaskText = $('#add-task-text');
                $("#task_add_form").modal('show');
                $('#text').val(newTaskText.val());
                newTaskText.val('');           
            }
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
    },
    'click .js-show-help-modal': function (event) {
        $('#site_info_modal').modal('show');
    }
});
