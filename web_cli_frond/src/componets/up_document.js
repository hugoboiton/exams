import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';

class UpDocu extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(          
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                   Aviso
                </ModalHeader>
                <ModalBody>
                    <p> 
                       {this.props.mensaje}
                    </p>
                        <input type="file" id="idarchivo" onClick={this.props.abrirArchivo}/> 
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" size="sm"  onClick={this.props.toggle}>
                        Ok
                    </Button>
                   
                </ModalFooter>
            </Modal>
        );
    }
}
export default UpDocu;