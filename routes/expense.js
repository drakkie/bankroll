module.exports = (() => {

    var express = require('express');
    var router = express.Router();
    const uuid = require('uuid/v4');

    //lowdb...
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    
    const expense_adapter = new FileSync('./database/expense.json')
    const expense_db = low(expense_adapter);
    expense_db.defaults({ expense: [] }).write();
    
    
    router.get('/api/expense', (req, res) => {
        res.set('Content-Type', 'application/json');
        res.send(expense_db.get('expense').value());
    });
    
    router.get('/api/expense/:id', (req, res) => {
        let expense_id = req.params.id;
        res.json(expense_db.get('expense').find({ id: expense_id }));
    });
    
    router.post('/api/expense', (req, res) => {
        let expenses = req.body;
        for (let expense of expenses) {
            expense_db.get('expense')
                .push({
                    id: uuid(),
                    name: expense.name,
                    amount: expense.amount,
                    frequency: expense.frequency
                })
                .write();
        }
    });
    
    router.delete('/api/expense/', (req, res) => {
        let expense_id = req.params.id;
        let expenses = req.body;
    
        for (let expense of expenses){
            expense_db.get('expense')
            .remove({id : expense.id})
            .write();
        }
    
        res.set('Content-Type', 'application/json');
        res.send([]);
    });
    
    router.put('/api/expense/:id', (req, res) => {
        let expense_id = req.params.id;
    
        expense_db('expense')
            .chain()
            .find({ id: expense_id })
            .assign({
                name: req.body.name,
                amount: req.body.amount,
                frequency: req.body.frequency
            })
            .value();
    
        expense_db.save();
    });

    return router;
})();
