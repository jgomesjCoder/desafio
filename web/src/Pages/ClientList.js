import React from 'react';
import Clients from '../components/clients';
import { Container } from 'reactstrap';

const ClientsList = (props) => {
    return (
        <Container>
        <h1> Clientes</h1>
        <Clients/>
        </Container>
            
    )
}

export default ClientsList