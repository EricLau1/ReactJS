import PubSub from 'pubsub-js';

export default class HandlerErrors {
    publishErrors = (json) => {
        for(var i = 0; i < json.errors.length; i++) {
            PubSub.publish('validation-error', json.errors[i]);
        }
    }
}