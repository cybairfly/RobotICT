import { Meteor } from 'meteor/meteor';
import { Records } from '../imports/api/records';
import { generateRecords } from '../imports/tools';
import config from '../imports/config';
import '../imports/api/methods';

Meteor.startup(() => {
    Records.remove({});
    // If the Links collection is empty, add some data.
    if (Records.find().count() === 0) {
        const batchId = new Date().getTime();
        const records = generateRecords(config.defaultInput);
        records.forEach(record => Records.insert({...record, batchId}));
    }
});
