var _ = require('underscore');
var models = require('../models');

var Tasks = models.Tasks;

var makerPage = function(req, res) {
    if(!req.session.account) {
        return res.redirect('/');
    }
    
    Tasks.TaskModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        res.render('app', {tasks: docs});
    });
};

var makeTask = function(req, res) {
    if(!req.session.account) {
        return res.redirect('/');
    }

    if(!req.body.name || !req.body.dueDate) {
		console.log(req.body.name + " " + req.body.dueDate);
        return res.status(400).json({error: "Both title and due date are required"});
    }
    
    var taskData = {
        title: req.body.name,
        dueDate: req.body.dueDate,
        owner: req.session.account._id
    };
    
    var newTask = new Tasks.TaskModel(taskData);
    
    newTask.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/maker'});
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = makeTask;