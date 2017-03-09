import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';

import './task.js' // body template uses task template, so need to import
import './body.html';

Template.body.helpers({

    tasks(){
        return Tasks.find({}, { sort: { createdAt: -1} });
    }

    /*tasks: [
        { text: 'This is task 1' },
        { text: 'This is task 2' },
        { text: 'This is task 3' },
    ], */
});

Template.body.events({
    'submit .new-task'(event) {
        //prevent default browser form submit
        event.preventDefault();

        //Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), //current date
        });

        // Clear the form
        target.text.value = '';
    },
});