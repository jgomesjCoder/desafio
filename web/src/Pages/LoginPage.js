import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import axios from 'axios';

const Login = ({history}) => {
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}

        validationSchema={Yup.object({
          email: Yup.string().email()
            .max(50, "Deve conter 50 caracteres ou menos")
            .required("Required"),
          password: Yup.string()
            .max(16, "Número de caracteres invalido")
            .min(6, "Número de caracteres invalido")
            .required("Required"),
        })}

        onSubmit={async (values, actions ) => {
          
          try {
            const data = await axios.post('http://localhost:3030/api/login/', { email: values.email, password: values.password })
            .then(resp => {
              console.log(resp)
              const {data} = resp;
              console.log(data)
              if(data){
                localStorage.setItem('app-token', data);
                history.push("/clients");
              }
                
            })
            .catch(error => {
              actions.setFieldError('general', error.message);
            });

          }
          catch (erro) {
            console.log("erro", erro.message)
          }
        }}
      >
        {({
          actions,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
            <Container>
              <Row className="d-flex justify-content-center mt-5">
                <h1 className="text-center">Login</h1>
              </Row>
              <Row className="d-flex justify-content-center">
                <p className="lead">
                  Preencha os campos abaxo para acessar o sistema
          </p>
              </Row>
              <Row className='d-flex justify-content-center mt-5'>
                <Col sm="6">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="email">Email </Label>
                      <Input
                        size="lg"
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        placeholder="exemplo@exemplo.com"
                      />
                      {touched.email && errors.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="password">Senha </Label>
                      <Input
                        size="lg"
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        placeholder="senha"
                      />
                      {touched.password && errors.password ? (
                        <div>{errors.password}</div>
                      ) : null}
                    </FormGroup>
                    <Row className='d-flex justify-content-center mt-5'>
                      <Col sm="4"><Button color="primary" type="submit">Entrar</Button></Col>
                      <Col sm="4"><Button href="/register" color="success" type="submit">Registrar-se</Button></Col>
                      </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          )
        }
      </Formik>
    </Container>
  )
}




export default Login;