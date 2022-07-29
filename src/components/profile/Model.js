import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const Success = ({ className, modal, toggle }) => {

    return (
        <div>
            <Modal isOpen={modal} modalTransition={{ timeout: 300 }} backdropTransition={{ timeout: 300 }}
                toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update</ModalHeader>
                <ModalBody>
                    Congradulations! Your profile has been successfully saved.
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

{/* <Button color="danger" onClick={toggle}>Click Me</Button> */ }
