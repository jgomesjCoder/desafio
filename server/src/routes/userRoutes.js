const { Router } = require("express");
const router = Router();

// chamados do banco de dados postgres com pg
const { getUserById, createUser, updateUser, deleteUser, login, logout, ProtectedRoute } = require('../controller/pg/User.Controller');

//get a user
router.get('/api/user/:id', getUserById);

//create a user
router.post('/api/register', createUser);

//login
router.post('/api/login', login);

//logout
router.post('/api/logout', logout);

//teste de rota protegida
router.post('/api/protected', ProtectedRoute);

//update a user
router.put('/api/user/:id', updateUser);

//delete a user
router.delete('/api/user/:id', deleteUser);


module.exports = router;