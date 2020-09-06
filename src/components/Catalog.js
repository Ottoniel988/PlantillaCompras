import React, {Fragment, useState} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import {FormGroup, Input, Label} from 'reactstrap';
import { makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import './comp.css'






const Catalogo = () => {


    const [datos, setDatos] = useState({
        CodigoAranc: "",
        CodigoAlter: "",
        Codigo1: "",
        Codigo2: "",
        Nombre1: "",
        Nombre2: "",
        Nombremex: "",
        Peso: "",
        habilitado: "",
        original: ""
    })

    const handleInputChange = (event) => {
        //console.log(event.target.name)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
    const enviarDatos = (event) => {
        event.preventDefault()
        console.log(datos)
    }

const SaveProduct = async e =>{
    e.preventDefault()
    try{
        let config = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify( datos)
        }
        let res = await fetch('http://homestead.test//producto/nuevo',config)
        let json= await res.json()
        console.log(json)
    } catch(error){

    }
}

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
    
  const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return(
        <div>
            <form onSubmit={SaveProduct}>
                <div className="row">
                    <div className="col-md-2">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>      
                <button type="submit"  className="btn btn-primary btn-block"> Guardar  <SaveIcon></SaveIcon></button>
            </form>
        </div>    
        
    )
}

export default Catalogo;


