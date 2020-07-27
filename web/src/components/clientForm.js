import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import InputMask from "react-input-mask";
import axios from 'axios';

const ClientForm = (props) => {
    const client = props.client;
    const [initialValues, setInitialValues] = useState({
        name: "",
        phone: "",
        address: "",
        number: "",
        city: "",
        state: "",
        country: "",
        cep: "",
    })

    useEffect(() => {
        if (client) {
            setInitialValues(client)
        }
    }, []);

    const handleBlurCep = (ev, setFieldValue) => {
        const { value } = ev.target;
        const cep = value.replace(/[^0-9]/g, '');
        if (cep.length !== 8) {
            return;
        }
        fetch('https://viacep.com.br/ws/' + cep + '/json/')
            .then((res) => res.json())
            .then((data) => {
                setFieldValue('city', data.localidade);
                setFieldValue('address', data.logradouro);
                setFieldValue('state', data.uf);
                setFieldValue('country', data.pais);
            })
    }

    const handleUpdate = async (values, client) => {
        
        const id= client.id

        let cep = values.cep.replace(/[^0-9]/g, '');
        try {
            const data = await axios.put('http://localhost:3030/api/client/' + id, { name: values.name, phone: values.phone, address: values.address, number: values.number, city: values.city, state: values.state, country: values.country, cep: parseInt(cep) })
        }
        catch (erro) {
            console.log("erro", erro.message)
        }
    }

    const handleCreate = async (values) => {
        let cep = values.cep.replace(/[^0-9]/g, '');
        props.setAddress({ address: values.address, number: values.number, city: values.city, state: values.state, country: values.country, cep: parseInt(cep) })
        try {
            const data = await axios.post('http://localhost:3030/api/client/', { name: values.name, phone: values.phone, address: values.address, number: values.number, city: values.city, state: values.state, country: values.country, cep: parseInt(cep) })
            props.setSubmit(true)
        }
        catch (erro) {
            console.log("erro", erro.message)
        }
    }

    const handleSubmit = (client, values) => {

        !client ? handleCreate(values) : handleUpdate(values, client)
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(50, "Deve conter 50 caracteres ou menos")
            .required("Required"),
        phone: Yup.string()
            .max(16, "número de telefone inválido")
            .min(16, "número de telefone inválido")
            .required("Required"),
        address: Yup.string().required("Required"),
        number: Yup.string().max(5, "número inválido").required("Required"),
        city: Yup.string().max(50, "").required("Required"),
        state: Yup.string()
            .max(3, "Estado Inválido, digite apenas as iniciais")
            .required("Required"),
        country: Yup.string().max(50, "").required("Required"),
        cep: Yup.string()
            .max(10, "CEP inválido")
            .min(10, "CEP inválido")
            .required("Required"),
    })

    return (

        <Formik
            
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(client, values)}
            enableReinitialize
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
            }) => (
                    <Container>
                        <Row className='"row align-items-center"'>
                            <Col sm="12">
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
                                    <Row>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label htmlFor="phone">Telefone </Label>
                                                <InputMask
                                                    mask="(99) 9 9999-9999"
                                                    type="phone"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.phone}
                                                    placeholder="Telefone"
                                                    disableUnderline
                                                    maskChar=""
                                                >
                                                    {() => <Input id="phone" name="phone" size="lg" />}
                                                </InputMask>
                                                {touched.phone && errors.phone ? (
                                                    <div>{errors.phone}</div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label htmlFor="cep">CEP </Label>
                                                <InputMask
                                                    mask="99 999-999"
                                                    type="interger"
                                                    onChange={handleChange}
                                                    onBlur={(ev) => handleBlurCep(ev, setFieldValue)}
                                                    value={values.cep}
                                                    placeholder="CEP"
                                                    disableUnderline
                                                    maskChar=""
                                                >
                                                    {() => <Input id="cep" name="cep" size="lg" />}
                                                </InputMask>
                                                {touched.cep && errors.cep ? (
                                                    <div>{errors.cep}</div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="9">
                                            <FormGroup>
                                                <Label htmlFor="address">Endereço </Label>
                                                <Input
                                                    size="lg"
                                                    id="address"
                                                    name="address"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.address}
                                                    placeholder="Rua, AV. Travessa e etc"
                                                />
                                                {touched.address && errors.address ? (
                                                    <div>{errors.address}</div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label htmlFor="number">Número </Label>
                                                <Input
                                                    size="lg"
                                                    id="number"
                                                    name="number"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.number}
                                                    placeholder="número"
                                                />
                                                {touched.number && errors.number ? (
                                                    <div>{errors.number}</div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label htmlFor="city">Cidade </Label>
                                                <Input
                                                    size="lg"
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.city}
                                                    placeholder="Cidade"
                                                />
                                                {touched.city && errors.city ? (
                                                    <div>{errors.city}</div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="2">
                                            <FormGroup>
                                                <Label htmlFor="state">Estado </Label>
                                                <Input
                                                    size="lg"
                                                    id="state"
                                                    name="state"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.state}
                                                    placeholder="Estado"
                                                />
                                                {touched.state && errors.state ? (
                                                    <div>{errors.state}</div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup>
                                                <Label htmlFor="country">Pais </Label>
                                                <Input
                                                    size="lg"
                                                    id="country"
                                                    name="country"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.country}
                                                    placeholder="Pais"
                                                />
                                                {touched.country && errors.country ? (
                                                    <div>{errors.country}</div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Row >
                                            <Col sm="4">
                                                <Button color="outline-primary" size="lg" type="submit">
                                                    Salvar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                )}
        </Formik >
    )
}

export default ClientForm;