import React, { Component, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './comp.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Button, ModalHeader, ModalBody, ModalFooter,Label,Spinner} from 'reactstrap';
import Modal from 'react-bootstrap/Modal';


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, InputLabel, NativeSelect, FormHelperText, Radio, FormLabel, RadioGroup, makeStyles, Switch } from '@material-ui/core';


const Modal2 = () => {

  const [showModal, setShowModal] = useState(false);

//   const abrirModal=()=>{
//     setAbierto(!Abierto);
// }


  return(
    <>
    <div className="principal">
    <Button onClick={() => setShowModal(true)} color="secondary"><AddCircleIcon style={{fontSize: 20}}/></Button>
    </div>
    <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-90w"
        size='xl'
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Ingreso del Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Grid container spacing={0}>
                <Grid   item xs={12} sm={6}>{/**GRID de Información */}
                    <Container maxWidth="xl">
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Selección Catalogo
                            </Typography>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField  
                                    label="Codigo" 
                                    name='Codigo'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField  
                                    label="Parte" 
                                    name='parte'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <FormControl>
                                    <InputLabel id="demo-controlled-open-select-label">Rotación</InputLabel>
                                    <NativeSelect
                                        defaultValue={ "A"}
                                        variant="outlined"
                                        size="small"
                                        inputProps={{
                                        name: 'Pagina',
                                        id: 'pagina',
                                        }}
                                    >
                                        <option value={1}>{ 2+2 }</option>
                                        <option value={2}>{3+2 }</option>                                       
                                    </NativeSelect>
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                        </React.Fragment>
                    </Container>
                </Grid>
                <Grid item  xs={12} sm={6} >{/**grid Ingreso */}
                    <Container maxWidth="x1">
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Pagina
                            </Typography>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField  
                                    label="Nombre Español" 
                                    name='NombreEspañol'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"  
                                />
                            </Grid>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField  
                                    label="Nombre Ingles" 
                                    name='NombreIngles'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </React.Fragment>
                    </Container>
                </Grid>
            </Grid>
        </Modal.Body>
      </Modal>
    </>

)
}

export  default Modal2;
