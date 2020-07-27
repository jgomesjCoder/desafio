import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import axios from 'axios';


const Register = ({ history }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}

      validationSchema={
        Yup.object({
          name: Yup.string()
            .max(50, 'Deve conter 50 caracteres ou menos')
            .required('Required'),
          password: Yup.string()
            .max(20, 'deve possuir no maximo 20 caracteres')
            .min(6, 'deve possuir pelo menos 6 caracteres')
            .required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais')
            .required('Required'),
          email: Yup.string()
            .email('Endereço de email invalido')
            .required('Required'),
        })
      }

      onSubmit={ async (values) => {
        try {
          const data = await axios.post('http://localhost:3030/api/register/', {name: values.name, email: values.email, password: values.password })
          .then(resp => {
            const {data} = resp;
              history.push("/login"); 
          });

        }
        catch (erro) {
          console.log("erro", erro.message)
        }
      }}
      >
      {
        ({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
            <Container>
              <Row className='d-flex justify-content-center mt-5'>
                <h1 className="text-center">Registre-se</h1>
              </Row>
              <Row className='d-flex justify-content-center'>
                <p className="lead">Registe-se em nossa página para ter acesso ao nosso conteúdo</p>
              </Row>
              <Row className='"row align-items-center"'>
                <Col sm="6" md={{ size: 6, offset: 3 }}>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        size="lg"
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Nome"
                      />
                      {touched.name && errors.name ? (
                        <div>{errors.name}</div>
                      ) : null}

                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        size="lg"
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Email"
                      />
                      {touched.email && errors.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        size="lg"
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Senha"
                      />
                      {touched.password && errors.password ? (
                        <div>{errors.password}</div>
                      ) : null}

                    </FormGroup>
                    <FormGroup> <Label htmlFor="confirmPassword">Confirme a Senha</Label>
                      <Input
                        size="lg"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        placeholder="Confirme a senha"
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <div>{errors.confirmPassword}</div>
                      ) : null}</FormGroup>
                    <FormGroup>
                      <Row className="row justify-content-center">
                        <Col>
                          <Button size="lg" color="secondary" type="submit">Registrar</Button>

                        </Col>
                        <Col >
                          <Button size="lg" color="primary" type="button">Entrar com o Facebook</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Container>
          )}
          </Formik>
  );
};

export default Register