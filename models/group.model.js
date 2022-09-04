const mongoose = require('mongoose')

    var schema = mongoose.Schema(
        {
            id: String,

            name: {
                type: String,
                required: [true, 'You must specify a Name for the group'],
            },
        },
        
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

module.exports =  mongoose.model("groups", schema);