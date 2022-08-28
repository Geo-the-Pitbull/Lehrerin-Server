const mongoose = require('mongoose')

    var schema = mongoose.Schema(
        {
            id: String,

            att_date: {
                type: String,
                required: [true, 'You must specify a Date'],
            },
            student_name: {
                type: String,
                required: [true, 'You must specify the Student for this attendance record'],
            },
            student_group: {
                type: String,
                required: [true, 'You must provide the Group that this student is apart of'],
            },
            teacher_name: {
                type: String,
                required: [true, 'You must indicate the Teacher for this student'],
            },
            attendance_status: {
                type: Boolean,
                default: false,
            },
        },
        
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    module.exports =  mongoose.model("attendances", schema);