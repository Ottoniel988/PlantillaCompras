import React, { Component, useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './comp.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Autocomplete from '@material-ui/lab/Autocomplete';


import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, NativeSelect, FormHelperText,TextareaAutosize } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import _ from "lodash/fp";
import MultiSelect from "@kenshooui/react-multi-select";







const Modals = () => {


  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [dataBD, setData]=useState([]);
  const [dataBD2, setData2]=useState([]);
  const [responsive, setResponsive] = useState("vertical");
  const [show, setShow]= useState(false);
  const [idCatalogo, setidCatalogo]=useState({
    Codigo: ''
  })

  const [parte, setParte]=useState([]);
  const [producto, SetProducto] = useState({
    Codigo: "",
    NumeroReferencia: "",
    Rotacion: "",
    NombreEspanol: "",
    NombreIngles: "",
    Descripcion:"",
    Cparte: ""
    
  });
  const [Catalogo, setCatalogo]= useState({
    Catalogo: ''
  })

  const [showModalP, setShowModalP] = useState(false);
  const [Clasificacion, setClasificacion]=useState([]);
  const [Partec, setParteC]=useState([]);
  const [NParte, SetNParte] = useState({
    
    NombreParte: "",
    NombreHoja: "",
    Numeropagina: "",
    ClasificacionP: "",
    Catalogo: ""
  })

  const { register, handleSubmit, watch, errors } = useForm();
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));


  const columns = [
    
    { name: 'noReferencia', field: 'noReferencia', options:{filter:true}},
    { name: 'codigoFabricante', field: 'codigoFabricante' , options:{filter:true}},
    { name: 'nombreIngles', field: 'nombreIngles', options:{filter:true} },  

];

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [dataBD1, setData1]=useState([]);


  const handleToggle = (value) => () => {

    const currentIndex = checked.indexOf(value['codigo']);
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


  // const InputChange = (event) => {
    
  //   setCatalogo({
  //       ...Catalogo,
  //       [event.target.name] : event.target.value

  //   })
  //   LabelChange(Catalogo.Catalogo)
  // }




  const handleInputChangeP = (event) => {
    
    SetNParte({
        ...NParte,
        [event.target.name] : event.target.value
    })
  }

  const LimpiarState = (e) =>{
    NParte.NombreParte = ""
    NParte.NombreHoja = ""
    NParte.Numeropagina = ""
    NParte.ClasificacionP = ""

    setShowModalP(false)
  }


  const validar = (e) =>{
    if(producto.Cparte == '' || producto.Cparte == 0){
      swal("error","seleciona un catalogo y su parte","error")
      
    }else{
      setShowModal1(true)
      
    }
  }

  const cerrar = (e) =>{
    if(producto.Cparte !== '' || producto.Cparte == 0){
        SetProducto('')
        setShowModal(false)
        window.location.reload();
       
    }else{
       setShowModal(true)
       
    }
  }
  

  const abrirModalPArte = (event) =>{
    if(NParte.Catalogo == '' || NParte.Catalogo == 0){
      swal("error","Selecciona un catalogo ","error")
    }else{
      setShowModalP(true);
    }

  }
      
  const modelo = (event)=>{
      setShowModal2(true)
  }

  const pruebas = (event)=>{
  console.log(NParte.Catalogo)
  }

  const ingresado = (event)=>{
    console.log(checked)
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
  async function handleChangeCatalogo(event){
    let codigo = event.target.value
    InputChange(codigo)
  }
  const InputChange = async (codigo) =>{ 
    debugger
    
      try{        
        NParte.Catalogo = codigo
        idCatalogo.Codigo = codigo
        let data2={
          id:idCatalogo.Codigo
        }
        
      let res = await fetch('http://homestead.test/catalogoRepuesto/parte/',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data2)
    })
      let data= await res.json()
      console.log(data)
      setParte(data)
    } catch(error){
    console.log(error)
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

// mostrar productos que pertenecen a la parte del catalogo
  const parteCatalogo = async event =>{

    let parte = producto.Cparte 
    if(producto.Cparte == '' || producto.Cparte == 0){

      swal("error","Selecciona una parte del catalogo","error")
    }else{

      setShow(true)
    try{
      let config = {
          method: 'POST',
          headers:{
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            Cparte:parte
          })
      }
      let res = await fetch('http://homestead.test/parteCatalogo/',config)
      let data= await res.json()
      console.log(data)
      setData2(data)
    } catch(error){
    console.log('error')
    }
    }
  }


  //Cargar Clasificacion
  useEffect(() => {
    async function Clasificacion(){

      try{
        let res=await fetch('http://homestead.test/producto/clasificacion')
        let data = await res.json()
        console.log(data)
        setClasificacion(data)
      } catch(error){
        console.log('error');
      }
    }
    Clasificacion()
  },[]);

  // Cargar clasificacion de parte
const handleInputChange2 = async event =>{
  let codigo = event.target.value 

  try{
    let config = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          clasificacion:codigo
        })
    }
    let res = await fetch('http://homestead.test/catalogo/clasificacionParte/',config)
    let data= await res.json()
    console.log(data)
    setParteC(data)
  } catch(error){
  console.log('error')
  }
  }

  //Guardar Parte
  const SaveParte = async e =>{


    if(NParte.ClasificacionP == '' || NParte.ClasificacionP == 0){
      swal("error","selecciona la Clasificacion de la parte","error")
      
    }else{
      
    try{
      let dataPos={
        parte: NParte, 
      }

      console.log( JSON.stringify(dataPos))
        let config = {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(dataPos)
            
        }
        let res = await fetch('http://homestead.test/catalogo/partenuevo',{
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
        
        swal('Exito',json['message'],'success')
        LimpiarState()
        InputChange(idCatalogo.Codigo)
        setShowModal(true)
        

      }else{
        swal('Error',json['message'],'error')
      }
        
    } catch(error){
      console.log('error')
    }
  }

  }

  
  //Guardar producto
  const onSubmit = async e =>{

    if(checked == ""){
      swal("Error !!", "No has seleccionado ninguna compatibilidad","error")
    }else{
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
         producto.Codigo = ""
         producto.NumeroReferencia = ""
         producto.NombreEspanol = ""
         producto.NombreIngles = ""
         producto.Codigo = ""
         producto.Descripcion= ""
         setChecked('')
         parteCatalogo()

      }else{
        swal('Error',json['message'],'error')
      }
        
    } catch(error){
      console.log('error')
    }

  }
  }



  return(
    <>
    {/* Formulario para seleccionar  el catalogo y su parte */}
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
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title">
          Productos
        </Modal.Title>
        <div id="NewProd">
          <Button onClick={validar} variant = "secondary"> Nuevo <AddCircleIcon style={{fontSize: 20}}></AddCircleIcon> </Button>
          <Button onClick={abrirModalPArte} variant="primary"> Parte <AddCircleIcon style={{fontSize: 20}}/></Button>
        </div>
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
                          onChange={handleChangeCatalogo}

                          inputProps={{
                          name: 'Catalogo',
                          id: 'catalogo',
                          }}
                         >
                           <option value={0}>Seleccione Catalogo</option>
                          {dataBD.map((value)=>{
                              return(
                              <option key={value['id']} value={value['id']}>{value['nombre']}</option>                              
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
                    </Grid><br></br>
                    <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                      {
                       show?
                      <MUIDataTable
                      
                        title={"Productos contenidos"}
                        columns={columns}
                        data={dataBD2}
                        />
                        :null
                      }
                    </Grid>
              </React.Fragment>
            </Container>
          </Grid>
        </Grid>      
      </Modal.Body>
        <Modal.Footer>
          <Button onClick={cerrar} variant = "secondary"> Cerrar </Button>
          <Button onClick={parteCatalogo} variant = "primary"> Mostrar </Button>        
        </Modal.Footer>
    </Modal>

  {/* Formulario para crear el producto */}

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                                    required={true}
                                    ref={register({
                                      required: true,
                                      maxLength: 2,
                                      pattern: /^[A-Za-z]+$/i
                                    })}
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleInputChange}
                                />
                                {_.get("Codigo.type", errors) === "maxLength" && (
                                <p>This field is required</p>)} 
                            </Grid>
                            <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                                <TextField 
                                    onChange={handleInputChange} 
                                    label="Numero Referencia" 
                                    name='NumeroReferencia'
                                    required={true}
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
                                        <option value={'Sin Rotacion'}>Sin Rotacion</option>
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
                                    required={true}
                                    name='NombreIngles'
                                    autoFocus={true} 
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                          <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                            <br></br><Button onClick={modelo} variant="outline-secondary">Compatibilidad</Button>
                          </Grid>
                        </React.Fragment>
                    </Container>
                </Grid>
            </Grid><hr></hr>
              <div id="button">
                <Button  type="submit" variant = "primary" > Guardar </Button>
                <Button onClick={() => setShowModal1(false)} variant = "secondary"> Regresar </Button>
              </div>
            </form>
        </Modal.Body>
      </Modal>

    {/* Modal para seleccionar las compatibilidades */}
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
        <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
        <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={dataBD1.map((value) => value['nombre'])}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
      </Grid>
      </Modal.Header>
      <Modal.Body id="scroll">
      
      <List className={classes.root}>
      {dataBD1.map((value) => {
       const labelId = `checkbox-list-label-${value['nombre']}`;

        return (
          <ListItem key={value['codigo']} role={undefined} dense={true} divider={true} button onClick={handleToggle(value)}>
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


{/*Modal para poder ingresar una nueva parte*/}
<Modal
  show={showModalP}
  onHide={() => setShowModalP(false)}
  dialogClassName="modal-90w"
  backdrop="static"
  keyboard={false}
  size='xl'
  aria-labelledby="example-custom-modal-styling-title"
  >
  <Modal.Header closeButton>
    <Modal.Title id="example-custom-modal-styling-title">
      Parte de Catalogo
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>

    <form onSubmit={handleSubmit(SaveParte)}>
    <Grid container spacing={0}>
      <Grid   item xs={12}>{/**GRID de Información */}
        <Container maxWidth="lg">
          <React.Fragment>
            
          <Grid container spacing={0}>
            <Grid   item xs={12} sm={6}>{/**GRID de Información */}
                <Container maxWidth="xl">
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                          Nueva Parte                                          
                        </Typography>
                        <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="uncontrolled-native">Clasificacion</InputLabel>
                    <NativeSelect
                      onChange={handleInputChange2}
                      defaultValue={ 0} 
                      inputProps={{
                      name: 'Clasificacion',
                      id: 'clasificacion',
                      }}
                     >
                       <option value={0}>Seleccione Clasificacion</option>
                      {Clasificacion.map((value)=>{
                          return(
                          <option value={value['id']}>{value['nombre']}</option>                              
                          )})}  
                    </NativeSelect>
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Grid>
                <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="uncontrolled-native">Clasificacion Parte</InputLabel>
                    <NativeSelect
                      onChange={handleInputChangeP}
                      defaultValue={ 0 }
                      inputProps={{
                      name: 'ClasificacionP',
                      id: 'clasificacionp',
                      }}
                    >
                      <option value={0}>Seleccione Parte</option> 
                        {Partec.map((value)=>{
                          return(
                          <option value={value['Clasificacion']}>{value['Nombre']}</option>                              
                          )})}              
                    </NativeSelect>
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Grid>
              </React.Fragment>
            </Container>
          </Grid>

            <Grid item  xs={12} sm={6} >
                <Container maxWidth="xl">
                    <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                          Informacion Fotografía
                        </Typography>
                        <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                            <TextField
                                onChange={handleInputChangeP}  
                                label="Nombre Hoja"
                                required={true}
                                name='NombreHoja'
                                autoFocus={true} 
                                margin="dense"
                                variant="outlined"
                                size="small"  
                            />
                        </Grid>
                        <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                            <TextField 
                                onChange={handleInputChangeP} 
                                label="Numero Pagina" 
                                required={true}
                                name='Numeropagina'
                                type="number"
                                autoFocus={true} 
                                margin="dense"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                      <Grid container direction="column" justify="flex-end" alignItems="stretch" item xs={12} sm={12}>
                        <TextField  
                            label="Nombre Parte" 
                            name='NombreParte'
                            required={true} 
                            autoFocus={true} 
                            margin="dense"
                            variant="outlined"
                            size="small"
                            onChange={handleInputChangeP}
                        />
                      </Grid>
                    </React.Fragment>
                </Container>
            </Grid>
        </Grid>
          </React.Fragment>
        </Container>
      </Grid>
    </Grid><br></br>
    <div id="button">
      <Button onClick={() => setShowModalP(false)} variant = "secondary"> Cerrar </Button>
      <Button type='submit' variant = "primary"> Guardar </Button>
    </div>
    </form>
  </Modal.Body>
</Modal>
  

    </>
  )
}

export  default Modals;
