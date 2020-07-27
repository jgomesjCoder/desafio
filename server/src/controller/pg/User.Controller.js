const pool = require('../../config/db');
const { hash, compare } = require('bcrypt');
const { createAccessToken, sendAccessToken } = require('./tokens');
const { isAuth } = require('./isAuth');

const getUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err.message);
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const userVerify = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userVerify.rowCount === 0) {
            throw new Error('Endereço de email errado');
        }
        const user = userVerify.rows[0];
        const valid = await compare(password, user.password);
        if (!valid) {
            throw new Error("Senha incorreta");
        }
        const accessToken = createAccessToken(user.id);
        sendAccessToken(req, res, accessToken);
    } catch (err) {
        console.log(err.message);
        res.status(403).send({ "Error": err.message });
    }
};

const logout = async(req, res) => {
    res.clearCookies('refreshToken');
    return (
        res.send({
            message: "voce saiu"
        })
    );
};

const ProtectedRoute = async(req, res) => {
    console.log(req)
    try {
        const userId = isAuth(req);

        if (userId !== null) {
            res.send({
                data: 'esse é um arquivo protegido'
            })
        }
    } catch (err) {
        res.send("voce precisa estar logado")
    }
}

const createUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const userVerify = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userVerify) {
            throw new Error('Usuario ja existe');
        }
        const hashedPassword = await hash(password, 10);
        const response = await pool.query('INSERT INTO users ( name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
        res.json({
            message: "cliente criado com sucesso",
            body: {
                user: { name, email }
            }
        });
        res.send("cliente criado com sucesso");
    } catch (err) {
        res.send({
            error: err.message
        });
        console.log(err.message);
    }
};

const updateUser = async(req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password } = req.body;
        const response = await pool.query('UPDATE users SET name= $1, email= $2, password= $3 WHERE ID= $4', [name, email, password, id]);
        res.json({
            message: "user atualizado com sucesso",
            body: {
                user: { name, email }
            }
        });
        res.send("cliente criado com sucesso");
    } catch (err) {
        console.log(err.message);
    }
};

const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.json('usuario com id ${id} removido com sucesso');
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout,
    ProtectedRoute
};