Template.item.helpers({
    isComplete: function () {// Set class according to status
        return this.checked ? 'complete' : '';
    },
    isChecked: function () {
        return this.checked ? 'checked' : false;
    },
    isPriority: function(){
        return this.priority;
    }
});

/// item Events
//
Template.item.events({
    'click .js-delete-task': function () {// remove tasks from collection
        var id = this._id;
        Meteor.call("removeTask", id);
    },
    'change .js-checked': function (event) {// set status of task by checking box
        var id = this._id;
        Meteor.call('checkedTask', id);
    },
    'click .js-show-info': function (event) {
        var id = this._id;
        Session.set('id', id);
        //console.log(id);
        $("#task_info_form").modal('show');// Show task to edit in modal
    },
});
