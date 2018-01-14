module.exports = (() => {
    
        var express = require('express');
        var router = express.Router();
        const uuid = require('uuid/v4');
    
        //lowdb...
        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync')
        
        const goal_adapter = new FileSync('./database/goal.json')
        const goal_db = low(goal_adapter);
        goal_db.defaults({ goal: [] }).write();
        
        
        router.get('/goal', (req, res) => {
            res.set('Content-Type', 'application/json');
            res.send(goal_db.get('goal').value());
        });
        
        router.get('/goal/:id', (req, res) => {
            let goal_id = req.params.id;
            res.json(goal_db.get('goal').find({ id: goal_id }));
        });
        
        router.post('/goal', (req, res) => {
            let goals = req.body;

            for (let goal of goals) {
                goal_db.get('goal')
                    .push({
                        id: uuid(),
                        name: goal.name,
                        amount: goal.amount,
                        frequency: goal.frequency
                    })
                    .write();
            }
        });
        
        router.delete('/goal/', (req, res) => {
            let goal_id = req.params.id;
            let goals = req.body;
        
            for (let goal of goals){
                goal_db.get('goal')
                .remove({id : goal.id})
                .write();
            }
        
            res.set('Content-Type', 'application/json');
            res.send([]);
        });
        
        router.put('/goal/:id', (req, res) => {
            let goal_id = req.params.id;
        
            goal_db('goal')
                .chain()
                .find({ id: goal_id })
                .assign({
                    name: req.body.name,
                    amount: req.body.amount,
                    frequency: req.body.frequency
                })
                .value();
        
            goal_db.save();
        });
    
        return router;
    })();
    