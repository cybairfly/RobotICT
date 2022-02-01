import { Meteor } from 'meteor/meteor';
import { Batches } from '../imports/db/batches';
import { Records } from '../imports/db/records';
import { generateRecords } from '../imports/tools';
import config from '../imports/config';

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Records.find().count() === 0) {
      const input = config.input.default;
      const batchId = new Date().getTime();
      const records = generateRecords(input);
      records.forEach(record => Records.insert({...record, batchId}));
      Batches.insert({id: batchId, input});
  }
});
