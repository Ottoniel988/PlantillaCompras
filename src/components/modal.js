import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './comp.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Label,Spinner} from 'reactstrap';
import Formulario from './Form2'

class Modals extends React.Component{
    state={
        abierto:false,
        fields: {}
    };

    onChange = updatedValue =>{
      this.setState ({
        fields: {
          ...this.state.fields,
          ...updatedValue
        }
      });
    };

    Result = () => {
      alert(this.state.fields);
      }

    abrirModal=()=>{
        this.setState({abierto: !this.state.abierto});
    }

    render(){
        return(
            <>
            <div className="principal">
            <Button onClick={this.abrirModal} color="secondary"><AddCircleIcon style={{fontSize: 20}}/></Button>
            </div>
              <Modal isOpen={this.state.abierto} size='lg'>
              <div className="mHeader">
                  <ModalHeader className="text-uppercase text-white">
                    <strong>Nuevo Producto </strong> <Spinner color="secondary" />
                  </ModalHeader>
               </div>
               <div className="body">   
                  <Label className="text-black text-center"><h5><strong> Información General</strong></h5></Label>
                  <ModalBody>
                   {/* <Form onChange={fields =>this.onChange(fields)} /> */}
                   {<Formulario/>}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.abrirModal}>Cerrar <CancelPresentationIcon/></Button>                          
                  </ModalFooter>  
                </div>
              </Modal>
            </>

        )
    }
}


export default Modals;