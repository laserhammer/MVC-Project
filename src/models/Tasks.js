var mongoose = require('mongoose');
var _ = require('underscore');

var TaskModel;

var setName = function(name) {
    return _.escape(name).trim();
};

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    
    dueDate: {
        type: Date,
        required: true
    },
    
    owner: 	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
    
    createdData: {
        type: Date,
        default: Date.now
    }

});

TaskSchema.methods.toAPI = function() {
    return {
        title: this.title,
        dueDate: this.dueDate
    };
};

TaskSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return TaskModel.find(search).select("title dueDate").exec(callback);
};


TaskModel = mongoose.model('Task', TaskSchema);


module.exports.TaskModel = TaskModel;
module.exports.TaskSchema = TaskSchema;