const pool = require('../../config/db');

const getClients = async(req, res) => {
    try {
        const response = await pool.query('SELECT * FROM clients');
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err.message);
    }
};

const getClientById = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err.message);
    }
};

const createClient = async(req, res) => {
    try {
        const { name, phone, address, number, city, state, country, cep } = req.body;
        const response = await pool.query('INSERT INTO clients ( name, phone, address, number, city, state, country, cep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [name, phone, address, number, city, state, country, cep]);
        console.log(response);
        res.json({
            message: "cliente criado com sucesso",
            body: {
                client: { name, phone, address, number, city, state, country, cep }
            }
        });
        res.send("cliente criado com sucesso");
    } catch (err) {
        console.log(err.message);
    }
};

const updateClient = async(req, res) => {
    try {
        const id = req.params.id;
        const { name, phone, address, number, city, state, country, cep } = req.body;
        const response = await pool.query('UPDATE clients SET name= $1, phone= $2, address= $3, number= $4, city= $5, state= $6, country= $7, cep= $8 WHERE ID= $9', [name, phone, address, number, city, state, country, cep, id]);
        console.log(response);
        res.json({
            message: "cliente atualizado com sucesso",
            body: {
                client: { name, phone, address, number, city, state, country, cep }
            }
        });
        res.send("cliente criado com sucesso");
    } catch (err) {
        console.log(err.message);
    }
};

const deleteClient = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM clients WHERE id = $1', [id]);
        res.json('cliente com id ${id} removido com sucesso');
    } catch (err) {
        console.log(err.message);
    }
};
module.exports = {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};