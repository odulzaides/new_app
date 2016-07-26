//  Format date for templates
Template.registerHelper('formatDate', function (date) {// put date in mm/dd format
    var date, d, m;
    date = date;
    d = date.getDate();
    m = date.getMonth();
    return m+"/"+d;

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
    if (Meteor.user()){
        Session.set('user', Meteor.user());
        var user = Session.get('user');
        return user.username;
    }

});

Template.registerHelper('isSelected', function (value) {// Select dropdown priority on load
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
