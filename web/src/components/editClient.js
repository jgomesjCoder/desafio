import React, { Fragment, useState } from 'react';

import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
} from 'reactstrap';

import ClientForm from './clientForm';


const EditClient = ( props) => {
    const {
        client,
        buttonLabel,
        className
    } = props;
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Button color="warning" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Editar Cliente</ModalHeader>
                <ModalBody>
                    <ClientForm type='edit' client={client }/>
                </ModalBody>
            </Modal>
        </Fragment>
    );
}

export default EditClient;