Meteor.subscribe('Items');

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
//  Set Session to All Tasks
Session.set('priority', "Pending");


//// Todo Set up page if user is not logged in to display - ie "Log in or Create user to begin..."


