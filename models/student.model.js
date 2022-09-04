const mongoose = require('mongoose')

    var schema = mongoose.Schema(
        {
            id: String,

            name: {
                type: String,
                required: [true, 'You must specify a Name for the student'],
            },
            address: {
                type: String,
                required: [true, 'You must specify an Address for the student'],
            },
            gender: {
                type: String,
                required: [true, 'You must specify a Gender for the student'],
            },
            age: {
                type: Number,
                required: [true, 'You must specify an Age for the student'],
            },
            email_address: {
                type: String,
                required: [true, 'You must specify an Email Address for the student'],
            },
            group_nm: {
                type: String,
                required: [true, 'You must specify an Group for the student'],
            },
        },
        
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

module.exports =  mongoose.model("students", schema);