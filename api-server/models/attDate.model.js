const mongoose = require('mongoose')

    var schema = mongoose.Schema(
        {
            id: String,

            date: {
                type: Date,
                required: [true, 'You must specify a Date here.'],
            },
        },
        
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

module.exports =  mongoose.model("attdates", schema);