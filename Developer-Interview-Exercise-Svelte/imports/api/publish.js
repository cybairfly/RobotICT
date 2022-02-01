import { Meteor } from 'meteor/meteor';
import { Batches } from '../db/batches';
import { Records } from '../db/records';

Meteor.publish('batches', ({filter = {}, options} = {}) => {
    return Batches.find(filter, options);
});

Meteor.publish('records', ({filter = {}, options} = {}) => {
    return Records.find(filter, options);
});
