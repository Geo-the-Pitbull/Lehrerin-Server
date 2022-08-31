const mongoose = require('mongoose')

    var schema = mongoose.Schema(
        {
            id: String,

            name: {
                type: String,
                required: [true, 'You must specify a Name for the teacher'],
            },
            address: {
                type: String,
                required: [true, 'You must specify an Address for the teacher'],
            },
            gender: {
                type: String,
                required: [true, 'You must specify a Gender for the teacher'],
            },
            age: {
                type: Number,
                required: [true, 'You must specify an Age for the teacher'],
            },
            email_address: {
                type: String,
                required: [true, 'You must specify an Email Address for the teacher'],
            },
            image: {
                type: String,
                required: [true, 'You must upload an Image for the teacher'],
            },
            group_assigned: {
                type: String,
                required: [true, 'You must assign this teacher to a Group'],
            },
        },
        
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

module.exports =  mongoose.model("teachers", schema);

