import React from 'react';
import {getCurrentDate} from './date'
import {FormGroup, Input, Label} from 'reactstrap';

class Form extends  React.Component{

    state = {
        Habilitado: "",
        Original: "",
        Codigo: "",
        CodigoAranc: "",
        CodigoAlter: "",
        Codigo1: "",
        Codigo2: "",
        Nombre1: "",
        Nombre2: "",
        Nombremex: "",
        Unidades: "",
        checked: true,
        
    };

    change = e => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        //thisprops.onSubmit(this.state)
        this.setState({
            Habilitado: "",
            Original: "",
            Codigo: "",
            CodigoAlter: "",
            CodigoAranc: "",
            Codigo1: "",
            Codigo2: "",
            Nombre1: "",
            Nombre2: "",
            Nombremex: "",
            Unidades: "",
            checked: true
        });
    this.props.onChange({
            Habilitado: "",
            Original: "",
            Codigo: "",
            CodigoAlter: "",
            CodigoAranc: "",
            Codigo1: "",
            Codigo2: "",
            Nombre1: "",
            Nombre2: "",
            Nombremex: "",
            Unidades: "",
            checked: true
    });
};

    render(){
        return ( 
        <>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup>
                        <Label>
                            Codigo-Alter
                        </Label>
                        <Input
                            name="CodigoAlter"
                            type="text" id='codAlter'
                            placeholder='Codigo Alterno:'
                            value={this.state.CodigoAlterno}
                            onChange={e => this.change(e)}>
                        </Input>
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup>
                        <Label>
                            Codigo-Aranc
                        </Label>
                        <Input
                            name="CodigoAranc"
                            type="text"
                            id='codAran'
                            placeholder='Codigo Aranc:'
                            value={this.state.CodigoAran}
                            onChange={e => this.change(e)}>
                        </Input>
                    </FormGroup>
                </div>
                <div className="col-md-3">
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
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup>
                        <Label>
                            Nombre_Esp
                        </Label>
                        <Input
                            name="Nombre1"
                            type="text" id='name1'
                            placeholder='Español:'
                            value={this.state.Nombre1}
                            onChange={e => this.change(e)}>
                        </Input>
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup>
                        <Label>
                            Nombre_USA
                        </Label>
                        <Input
                            name="Nombre2"
                            type="text"
                            id='name2'
                            placeholder='Ingles:'
                            value={this.state.Nombre2}
                            onChange={e => this.change(e)}>
                        </Input>
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup>
                        <Label>
                            Nombre_Mex
                        </Label>
                        <Input
                            name="Nombremex"
                            type="text"
                            id='name3'
                            placeholder='Mexico:'
                            value={this.state.NombreMex}
                            onChange={e => this.change(e)}>
                        </Input>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup>
                        <Label>
                            Codigo1
                        </Label>
                        <Input
                            name="Codigo1"
                            type="text" id='coidgo1'
                            placeholder='Codigo1:'
                            value={this.state.Codigo1}
                            onChange={e => this.change(e)}>
                        </Input>
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup>
                        <Label>
                            Codigo2
                        </Label>
                        <Input
                            name="Codigo2"
                            type="text"
                            id='codigo2'
                            placeholder='Codigo2:'
                            value={this.state.Codigo2}
                            onChange={e => this.change(e)}>
                        </Input>
                    </FormGroup>
                </div>
                <div className="col-md-2">
                    <FormGroup>
                        <Label>
                            Peso/LB
                        </Label>
                        <Input
                            name="Unidades"
                            type="number"
                            id="unidades"
                            value={this.state.Unidades}
                            onChange={e => this.change(e)}>
                        </Input>
                    </FormGroup>
                </div>
                        
            </div>
        </>
        )
    }
}

export default Form;