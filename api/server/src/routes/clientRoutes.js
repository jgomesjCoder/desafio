const {Router} = require("express");
const router = Router();


// chamados do banco de dados postgres com pg
const {getClients, getClientById, createClient, updateClient, deleteClient } = require('../controller/pg/Client.Controller');

//get all clients
router.get('/api/clients', getClients);

//get a client
router.get('/api/client/:id', getClientById);

//create a client
router.post('/api/client', createClient)

//update a client
router.put('/api/client/:id', updateClient)

//delete a client
router.delete('/api/client/:id', deleteClient)


module.exports = router;    