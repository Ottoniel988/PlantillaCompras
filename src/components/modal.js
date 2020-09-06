import React, { Component, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './comp.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, NativeSelect, FormHelperText,TextareaAutosize } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import swal from 'sweetalert';




const Modals = () => {

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [dataBD, setData]=useState([]);
  const [catalogo, setCatalogo]= useState({
    Catalogo: ""
  })

  const [parte, setParte]=useState([]);
  const [producto, SetProducto] = useState({
    Codigo: "",
    NumeroReferencia: "",
    Rotacion: "",
    NombreEspanol: "",
    NombreIngles: "",
    Descripcion:"",
    Cparte: "",
    

  })


  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [dataBD1, setData1]=useState([]);


  const handleToggle = (value) => () => {

  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  if (currentIndex === -1) {
      newChecked.push(value['codigo']);
   } else {
      newChecked.splice(currentIndex, 1);
  }

  setChecked(newChecked);
  console.log(checked); 
  };

  const handleInputChange = (event) => {
    SetProducto({
        ...producto,
        [event.target.name] : event.target.value
    })
  }

  const enviarDatos = (event) => {
    event.preventDefault()
    console.log(producto)
    setShowModal(false)
    setShowModal1(false)
    setShowModal2(false)
    // {window.location.reload(true)}
  
    }
  
    const modelo = (event)=>{
      setShowModal2(true)
    }
  
    const ingresado = (event)=>{
      setShowModal2(false)
    }

  // Cargar catalogos
  useEffect(() => {
  async function Catalogo(){
  
    try {
        let res=await fetch('http://homestead.test/producto/catalogo')
        let data =await res.json()
        console.log(data)
        setData(data)
         
            
    } catch (error) {
        console.log('error');
    }
  }
  Catalogo()
  },[]);

  // Cargar parte de catalogo
  const handleInputChange1 = async event =>{
  let codigo = event.target.value 

  try{
    let config = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          catalogo:codigo
        })
    }
    let res = await fetch('http://homestead.test/catalogoRepuesto/parte/',config)
    let data= await res.json()
    console.log(data)
    setParte(data)
  } catch(error){
  console.log('error')
  }
  }

  // Peticion para cargar los modelos
  useEffect(() => {
  async function cargaData(){
  
    try {
        let res=await fetch('http://homestead.test/producto/modelo')
        let data =await res.json()
        console.log(data)
        setData1(data)
            
    } catch (error) {
        console.log('error');
    }
  }
  cargaData()
  },[]);

  //Guardar producto
  const SaveProduct = async e =>{
    try{
      let dataPos={
        producto: producto,
        Compatibilidad:checked
      }

      console.log( JSON.stringify(dataPos))
        let config = {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(dataPos)
            
        }
        let res = await fetch('http://homestead.test/catalogoRepuesto',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(dataPos)
          }
            )
        let json= await res.json()
        console.log(json)
      if(json['exito'] === true){
        setShowModal1(false)
        swal('Exito',json['message'],'success')
      }else{
        swal('Error',json['message'],'error')
      }
        
    } catch(error){
      console.log('error')
    }


  }



  return(
    <>
    <div className="principal">
    <Button onClick={() => setShowModal(true)} variant="secondary"><AddCircleIcon style={{fontSize: 20}}/></Button>
    </div>
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      dialogClassName="modal-90w"
      backdrop="static"
      keyboard={false}
      size='lg'
      aria-labelledby="example-custom-modal-styling-title"
      >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Productos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={0}>
          <Grid   item xs={12}>{/**GRID de Información */}
            <Container maxWidth="lg">
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Selección Catalogo
                </Typography>
                    <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                      <FormControl>
                        <InputLabel htmlFor="uncontrolled-native">Catalogo</InputLabel>
                        <NativeSelect
                          onChange={handleInputChange1}
                          defaultValue={ 0} 
                          inputProps={{
                          name: 'Catalogo',
                          id: 'catalogo',
                          }}
                         >
                           <option value={0}>Seleccione Catalogo</option>
                          {dataBD.map((value)=>{
                              return(
                              <option value={value['id']}>{value['nombre']}</option>                              
                              )})}  
                        </NativeSelect>
                        <FormHelperText></FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                      <FormControl>
                        <InputLabel htmlFor="uncontrolled-native">Parte Catalogo</InputLabel>
                        <NativeSelect
                          onChange={handleInputChange}
                          defaultValue={ 0 }
                          inputProps={{
                          name: 'Cparte',
                          id: 'cparte',
                          }}
                        >
                          <option value={0}>Seleccione Parte</option> 
                            {parte.map((value)=>{
                              return(
                              <option value={value['Codigo']}>{value['Nombre']}</option>                              
                              )})}              
                        </NativeSelect>
                        <FormHelperText></FormHelperText>
                      </FormControl>
                    </Grid>
              </React.Fragment>
            </Container>
          </Grid>
        </Grid>
      </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} variant = "secondary"> Cerrar </Button>
          <Button onClick={() => setShowModal1(true)} variant = "primary"> Mostrar </Button>
        </Modal.Footer>
    </Modal>





    <Modal
        show={showModal1}
        onHide={() => setShowModal1(false)}
        dialogClassName="modal-90w"
        size='xl'
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Detalles
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Grid container spacing={0}>
                <Grid   item xs={12} sm={6}>{/**GRID de Información */}
                    <Container maxWidth="xl">
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Nuevo Producto
                            </Typography>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField  
                                    label="Codigo" 
                                    name='Codigo'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField 
                                    onChange={handleInputChange} 
                                    label="Numero Referencia" 
                                    name='NumeroReferencia'
                                    type="number"
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
                                      onChange={handleInputChange}
                                        defaultValue={ 0}
                                        variant="outlined"
                                        size="small"
                                        inputProps={{
                                        name: 'Rotacion',
                                        id: 'rotacion',
                                        }}
                                    >
                                        <option value={0}>Rotacion</option>
                                        <option value={"A"}>A</option>
                                        <option value={"B"}>B</option>
                                        <option value={"C"}>C</option>                                       
                                    </NativeSelect>
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid><br></br>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                              <TextareaAutosize
                                aria-label="minimum height"
                                name="Descripcion"
                                rowsMin={3}
                                rowsMax={6}  
                                placeholder="Descripción"
                                onChange={handleInputChange}
                              />

                            </Grid>
                        </React.Fragment>
                    </Container>
                </Grid>
                <Grid item  xs={12} sm={6} >{/**grid Ingreso */}
                    <Container maxWidth="xl">
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Información General
                            </Typography>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField
                                    onChange={handleInputChange}  
                                    label="Nombre Espanol" 
                                    name='NombreEspanol'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"  
                                />
                            </Grid>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField
                                    onChange={handleInputChange}  
                                    label="Nombre Ingles" 
                                    name='NombreIngles'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            {/* <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField
                                    onChange={handleInputChange}  
                                    label="Numero Referencia" 
                                    type="number"
                                    name='NumeroReferencia'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                />
                          </Grid> */}
                          <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                            <br></br><Button onClick={modelo} variant="outline-secondary">Compatibilidad</Button>
                          </Grid>
                        </React.Fragment>
                    </Container>
                </Grid>
            </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal1(false)} variant = "secondary"> Regresar </Button>
          <Button onClick={SaveProduct} variant = "primary"> Guardar </Button>
        </Modal.Footer>
      </Modal>


      <Modal
      show={showModal2}
      onHide={() => setShowModal2(false)}
      dialogClassName="modal-90w"
      backdrop="static"
      keyboard={false}
      size='sm'
      aria-labelledby="example-custom-modal-styling-title"
      >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Modelos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="scroll">
      <List className={classes.root}>
      {dataBD1.map((value) => {
       const labelId = `checkbox-list-label-${value['nombre']}`;

        return (
          <ListItem key={value['codigo']} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                name="modelo"
                
                checked={checked.indexOf(value['codigo']) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              /> 
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value['nombre']}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
      
      </Modal.Body>
        <Modal.Footer>
          <Button onClick={ingresado} variant = "primary"> Asignar </Button>
        </Modal.Footer>
    </Modal>


    </>
  )
}

export  default Modals;
