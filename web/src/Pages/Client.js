
import React, { useState } from 'react';
import Maps from "../components/googleMap";
import ClientForm from '../components/clientForm'
import { Row } from "reactstrap";

const Client = () => {
  const [address, setAddress] =useState('');
  const [submit, setSubmit] = useState(false);
  return (
    <>
      <Row className="d-flex justify-content-center mt-5">
        <h1 className="text-center">Cadastrar Cliente</h1>
      </Row>
      <Row className="d-flex justify-content-center">
        <p className="lead">
          ao preencher o campo CEP, automaticamente o endereço será preenchido
        </p>
      </Row>
      <ClientForm setAddress={setAddress} setSubmit={setSubmit}/>
      {submit ? <Maps address={address}></Maps> : null}
    </>
  )
}

export default Client;


