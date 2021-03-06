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
        
        
        router.get('/api/cc', (req, res) => {
            res.set('Content-Type', 'application/json');
            res.send(cc_db.get('cc').value());
        });
        
        router.post('/api/cc', (req, res) => {
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
        
        router.delete('/api/cc/:id', (req, res) => {
            let cc_id = req.params.id;
        
            cc_db('cc').remove({ id: cc_id });
            cc_db.save();
        });
        
        // router.put('/cc/:id', (req, res) => {
            
        //     let cc_id = req.params.id;
        //     let field_to_update = req.body.field_to_update;
        //     let value = req.body.value;
            
        //     let assignmentValueJSON = `{ "${field_to_update}": "${value}" }`;
        //     let assignmentValue = JSON.parse(assignmentValueJSON);

        //     cc_db
        //         .get('cc')
        //         .find({ id: cc_id })
        //         .assign(assignmentValue)
        //         .write();
        // });

        // RPC! auto propagate values to same descriptions
        router.put('/api/cc/UpdateByDescription', (req, res) => {
            let field_to_update = req.body.field_to_update;
            let value = req.body.value;
            let description = req.body.description.substring(0,15);
            
            let assignmentValueJSON = `{ "${field_to_update}": "${value}" }`;
            let assignmentValue = JSON.parse(assignmentValueJSON);

            let cc_with_same_descriptions = cc_db
            .get('cc')
             .filter((transactions) => transactions.Description.indexOf(description) > -1)
             .value();
             
            for (let cc of cc_with_same_descriptions) {
                cc_db
                .get('cc')
                .find({ id: cc.id })
                .assign(assignmentValue)
                .write();
            }

            res.set('Content-Type', 'application/json');
            res.send({});
        });

        return router;
    })();
    