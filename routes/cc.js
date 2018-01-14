module.exports = (() => {
    
        var express = require('express');
        var router = express.Router();
        const uuid = require('uuid/v4');
    
        //lowdb...
        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync')
        
        const cc_adapter = new FileSync('./database/cc.json')
        const cc_db = low(cc_adapter);
        cc_db.defaults({ cc: [] }).write();
        
        
        router.get('/cc', (req, res) => {
            res.set('Content-Type', 'application/json');
            res.send(cc_db.get('cc').value());
        });
        
        router.get('/cc/:id', (req, res) => {
            let cc_id = req.params.id;
            res.json(cc_db.get('cc').find({ id: cc_id }));
        });
        
        router.post('/cc', (req, res) => {
            let ccs = req.body;
            for (let cc of ccs) {
                cc_db.get('cc')
                    .push({
                        id: uuid(),
                        Amount: cc.Amount,
                        Date: cc.Date,
                        Description: cc.Description,
                        Type: cc.Type
                    })
                    .write();
            }
        
        
        });
        
        router.delete('/cc/:id', (req, res) => {
            let cc_id = req.params.id;
        
            cc_db('cc').remove({ id: cc_id });
            cc_db.save();
        });
        
        router.put('/person/:id', (req, res) => {
            let cc_id = req.params.id;
        
            cc_db('cc')
                .chain()
                .find({ id: cc_id })
                .assign({
                    Amount: req.body.Amount,
                    Date: req.body.Date,
                    Description: req.body.Description,
                    Type: req.body.Type
                })
                .value();
        
            cc_db.save();
        });

        return router;
    })();
    