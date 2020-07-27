import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container, Row, Col, Button } from 'reactstrap';
import EditClient from './editClient';


const Clients = (props) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetch =  async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:3030/api/clients')
      setClients(res.data)

    }
    useEffect(() => {   
       fetch()
    }, [])
    
    const handleRemove = async (ev, id) => {
      ev.preventDefault();
        let data = await axios.delete('http://localhost:3030/api/client/' + id)
        fetch();
        console.log(id, "removido")
      }


  return (
      <Container>
    <ListGroup>
      
      {clients.map(client => (
        <>
        <ListGroupItem >
        <ListGroupItemHeading key={client.id}>{client.name}</ListGroupItemHeading>
        <ListGroupItemText>
        <Row>
        <Row>
        <Col><b>Telefone:</b> {client.phone}</Col>
        <Col><b>Endereço:</b> {client.address}</Col>
        <Col><b>Número: </b>{client.number}</Col>
        <Col><b>Cidade:</b> {client.city}</Col>
        <Col><b>Estado:</b> {client.state}</Col>
        <Col><b>Pais: </b>{client.country}</Col>
        <Col><b>CEP: </b>{client.cep}</Col>
        <Row> 
        <Col sm="4"><EditClient client={client} buttonLabel="Editar"/></Col>
        <Col sm="4"><Button color="danger" type="submit" onClick={(ev) => handleRemove(ev, client.id)}>Remover</Button></Col>
        </Row>
        </Row>
        <Col sm="4">
        </Col>   
        </Row>
        </ListGroupItemText>
        </ListGroupItem>
        </>
        ))}
        </ListGroup>
        </Container>
);
}

export default Clients;