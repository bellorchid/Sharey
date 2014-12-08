Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function(userId, doc, fieldNames) {
        return userId === doc.receiveUser && fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});

createNotification = function(notification) {
        Notifications.insert({
         title: notification.title,
         link: notification.link,
         sendUser: notification.sendUser,
         receiveUser: notification.receiveUser,
         read: false
        });
}
