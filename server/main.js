// import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {
    // code to run on server at startup
    if (!Items.findOne()) {
        console.log("Creating records!")
        Items.insert({
            created: new Date().toLocaleDateString("en-US"),
            task: 'Get milk'
        });
        Items.insert({
            created: new Date().toLocaleDateString("en-US"),
            task: 'Order items'
        });
        Items.insert({
            created: new Date().toLocaleDateString("en-US"),
            task: 'Call Job'
        });
        Items.insert({
            created: new Date().toLocaleDateString("en-US"),
            task: 'Be On time'
        });

    }
});

Meteor.publish('Items', function() {
    return Items.find();
});

