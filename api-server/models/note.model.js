const mongoose = require('mongoose')

    var schema = mongoose.Schema(
        {
            id: String,

            note_date: {
                type: String,
                required: [true, 'You must specify a Date'],
            },
            student_name: {
                type: String,
                required: [true, 'You must specify the Student for this note record'],
            },
            student_group: {
                type: String,
                required: [true, 'You must provide the Group that this student is apart of'],
            },
            teacher_name: {
                type: String,
                required: [true, 'You must indicate the Teacher that is making this note record'],
            },
            activity_type: {
                type: String,
                required: [true, 'You must specify the Type of Activity for this note record'],
            },
            mark_or_score: {
                type: String,
                required: [true, 'You must indicate a Mark or Score for the Activity on this note record'],
            },
            comments: {
                type: String,
                required: [true, 'You must provide your final comments'],
            },
        },
        
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

module.exports =  mongoose.model("notes", schema);