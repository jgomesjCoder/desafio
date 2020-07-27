# Desafio cadastro de clientes

## objetivos

- [X] Desenvolver uma página de login
- [X] Desenvolver uma página de Registro
- [X] Desenvolver uma página de Cadastrar cliente
- [X] Desenvolver uma página de Listar cliente
- [X] Desenvolver a função de remover cliente
- [X] Desenvolver a função de editar cliente
- [X] Desenvolver a função de sair
- [X] Desenvolver a função de buscar o cep e preencher o endereço automaticamente
- [X] Desenvolver a função de marcar no mapa o endereço do cliente apos o cadastro
- [ ] Desenvolver a função de registrar e entrar pelo facebook
- [ ] implantar no heroku


## tecnologias utilizadas

### Backend

1. Express
2. Cors
3. bcrypt
4. jwt
5. pg


### Frontend

1. ReactJS
2. Google maps
3. Formik
4. yup
5. axios

### observações
foram utilizadas as bibliotecas
- Reactstrap para bootstrap
- viacep para busca do endereço a partir do cep

## Instalação

### backend


$ yarn install 
$ nodemon


### frontend


$ yarn install
$ yarn start


para rodar o banco de dados precisa configurar o postgressql
e configurar as variaveis de ambiente do arquivo .env que deve estar na raiz tanto do front quanto do back

os comandos sql para criação das tabelas estao no diretorio do backend na pasta database/database.sql
