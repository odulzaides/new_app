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
                    return Items.find({checked: false}, {sort:{due:1}});
                    break;

                case "Low":
                    return Items.find({owner: user, "priority": "Low", checked: false}, {sort: {"due": 1}});
                    break;

                case "Med":
                    return Items.find({owner: user, "priority": "Med", checked: false}, {sort: {"due": 1}});
                    break;

                case "High":
                    return Items.find({owner: user, "priority": "High", checked: false}, {sort: {"due": 1}});
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
            {due:today, checked:false},
            {sort:{due:1}}
        ).fetch();
    },
    pastDue: function(){// Tasks due today
        var today = new Date();
        today.setHours(0,0,0,0);
        var beforeToday = new Date();
        beforeToday.setHours(0,0,0,0);
        beforeToday.setDate(today.getDate()-1);
        return Items.find(
            {due:{$not:{$gt: beforeToday}}, checked:false},
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
            {due:{$gt: today}, checked:false},
            {sort:{due:1}}
        ).fetch();
    }
});
