Template.highPriorityCount.helpers({
    highPriorityTasks: function() {

        if (Meteor.user()) {
            //console.log("I'm in highPriorityCount " + Session.get('user')._id);
            var user = Meteor.user()._id;
            return Items.find({owner: user, "priority": "High", checked:false}).count();
        }

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