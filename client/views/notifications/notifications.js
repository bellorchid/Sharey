Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({receiveUser: Meteor.userId(), read: false});
  },
  notificationCount: function(){
      return Notifications.find({receiveUser: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
});

Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});
