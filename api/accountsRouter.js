const express = require('express');

const knex = require("../data/dbConfig.js");

const router = express.Router();

router.use(express.json());


//find bank account
router.get('/', (req, res) => {
    knex('accounts')
    .then(account => {
        res.status(200).json(account)
    })
    .catch(error => {
        console.log(`GET / error`,  error);
        res.status(500).json(`We couldn't find your BANK account...whoops no money there!`)
    })
})
// account by id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    knex('accounts').where({id}).first()
    .then(account => {
        if(account){
            res.status(200).json(account)
        } else {
            res.status(404).json(`Sorry you're account is missing...maybe a different account?`)
        }
    })
    .catch(error => {
        console.log(`GET /:id error`,  error);
        res.status(500).json(`We couldn't find your BANK account...whoops no money there!`)
    })
})
create new account
router.post('/', (req, res) => {
    const body = req.body;
    knex('accounts').insert(body)
          .then(account => {
            res.status(201).json(account)
          })
          .catch(error => {
            console.log(`POST / error`,  error)
            res.status(500).json(`We couldn't create your BANK account...whoops no money there!`)
        });
    })
//update account
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    knex('accounts').where({id}).update(body)
    .then(account => {
        if(account){
            res.status(201).json({updated: `${account} accounts updated.`})
        } else {
            res.status(404).json(`Sorry we must have misplaced your account :/`)
        }
        
    })
    .catch(error => {
        console.log(`PUT /:id error`, error)
        res.status(500).json(`We couldn't update your BANK account...whoops no money there!`)
    })
})
// delete account
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    knex('accounts').where({id}).del()
    .then(account => {
        if(account > 0){
            res.status(200).json(`Success! We deleted it!!! No More Overdraft Fees!`)
        }
    })
    .catch(error => {
        console.log(`DEL /:id error`, error)
        res.status(500).json(`Uhhh...We couldn't delete that account...overdraft?`)
    })
})


module.exports = router