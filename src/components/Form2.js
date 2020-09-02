import React, {Fragment, useState} from 'react';
import {getCurrentDate} from './date'
import SaveIcon from '@material-ui/icons/Save';
import {FormGroup, Input, Label} from 'reactstrap';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './comp.css'


const Formulario = () => {


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

    return(
        <div>
            <form onSubmit={SaveProduct}>
            <div id="princ">
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup>
                            <Label>
                                Codigo1
                            </Label>
                            <Input
                                name="Codigo1"
                                type="text" id='codigo1'
                                placeholder='Codigo1:'
                                onChange={handleInputChange}>
                            </Input>
                        </FormGroup>
                    </div>
                    <div className="col-md-7">
                        <FormGroup>
                            <Label>
                                Nombre1
                            </Label>
                            <Input
                                name="Nombre1"
                                type="text" id='name1'
                                placeholder='Español:'
                                onChange={handleInputChange}>
                            </Input>
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup>
                            <Label
                                for="FechaActual">
                                Fecha
                            </Label>
                            <Input
                                type="text"
                                id="fecha"
                                defaultValue={getCurrentDate()}
                                disabled
                                >
                            </Input>
                        </FormGroup>
                    </div>
                    {/* <div id="check1" className="col-md-1">
                    <FormGroup check>
                        <Input type="checkbox" name="original" id="orig"/>
                        <Label for="orig" onChange={handleInputChange} check>Original.</Label>
                    </FormGroup>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup>
                            <Label>
                                Codigo2
                            </Label>
                            <Input
                                name="Codigo2"
                                type="text"
                                id='codigo2'
                                placeholder='Codigo2:'
                                onChange={handleInputChange}>
                            </Input>
                        </FormGroup>
                    </div>
                    <div className="col-md-7">
                        <FormGroup>
                            <Label>
                                Nombre2
                            </Label>
                            <Input
                                name="Nombre2"
                                type="text"
                                id='name2'
                                placeholder='Ingles:'
                                onChange={handleInputChange}>
                            </Input>
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup>
                            <Label>
                                Peso/LB
                            </Label>
                            <Input
                                name="Peso"
                                type="number"
                                id="peso"
                                onChange={handleInputChange}>
                            </Input>
                            
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup>
                            <Label>
                                C-Alter
                            </Label>
                            <Input
                                name="CodigoAlter"
                                type="text" id='codAlter'
                                placeholder='Codigo Alterno:'
                                onChange={handleInputChange}>
                            </Input>
                        </FormGroup>
                    </div>
                    
                    <div className="col-md-7">
                        <FormGroup>
                            <Label>
                                Nombre-Mexico
                            </Label>
                            <Input
                                name="Nombremex"
                                type="text"
                                id='codAran'
                                placeholder='Mexico:'
                                onChange={handleInputChange}>
                            </Input>
                        </FormGroup>
                    </div>
                    
                    <div className="col-md-2">
                        <FormGroup>
                            <Label>
                                C-Aranc
                            </Label>
                            <Input
                                name="CodigoAranc"
                                type="text"
                                id='codAran'
                                placeholder='Codigo Aranc:'
                                onChange={handleInputChange}>
                            </Input>
                        </FormGroup>
                    </div>
                </div>
            </div><br></br>
            <button type="submit"  className="btn btn-primary btn-block"> Guardar  <SaveIcon></SaveIcon></button>
        </form>
        </div>    
        
    )
}

export default Formulario;


