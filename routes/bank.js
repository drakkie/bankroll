module.exports = (() => {
    
        var express = require('express');
        var router = express.Router();
        const uuid = require('uuid/v4');
    
        //lowdb...
        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync')
        
        const bank_adapter = new FileSync('./database/bank.json')
        const bank_db = low(bank_adapter);
        bank_db.defaults({ bank: [] }).write();
        
        
        router.get('/bank', (req, res) => {
            res.set('Content-Type', 'application/json');
            res.send(bank_db.get('bank').value());
        });
        
        router.get('/bank/:id', (req, res) => {
            let bank_id = req.params.id;
            res.json(bank_db.get('bank').find({ id: cc_id }));
        });
        
        router.post('/bank', (req, res) => {
            let banks = req.body;
            for (let bank of banks) {
                bank_db.get('bank')
                    .push({
                        id: uuid(),
                        Amount: bank.Amount,
                        Date: bank.Date,
                        Description: bank.Description,
                        Type: bank.Type
                    })
                    .write();
            }
        });
        
        router.delete('/bank/:id', (req, res) => {
            let bank_id = req.params.id;
        
            bank_db('bank').remove({ id: cc_id });
            bank_db.save();
        });

        router.put('/bank/UpdateByDescription', (req, res) => {
            let field_to_update = req.body.field_to_update;
            let value = req.body.value;
            let description = req.body.description.substring(0,15);
            
            let assignmentValueJSON = `{ "${field_to_update}": "${value}" }`;
            let assignmentValue = JSON.parse(assignmentValueJSON);

            let bank_with_same_descriptions = bank_db
            .get('bank')
            .filter((transactions) => transactions.Description.indexOf(description) > -1)
             .value()

            for (let bank of bank_with_same_descriptions) {
                bank_db
                .get('bank')
                .find({ id: bank.id })
                .assign(assignmentValue)
                .write();
            }

            res.set('Content-Type', 'application/json');
            res.send({});
        });
        
        // router.put('/bank/:id', (req, res) => {
        //     let bank_id = req.params.id;
        //     let field_to_update = req.body.field_to_update;
        //     let value = req.body.value;
        
        //     bank_db('bank')
        //         .chain()
        //         .find({ id: bank_id })
        //         .assign({
        //             field_to_update: value
        //         })
        //         .value();
        
        //     bank_db.save();
        // });
        
        return router;
    })();
    