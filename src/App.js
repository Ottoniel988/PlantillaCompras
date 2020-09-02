import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import Modals from './components/modal';

function App() {
  const [responsive, setResponsive] = useState("vertical");
  //const [tableBodyHeight, setTableBodyHeight] = useState("100px");
  //const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [dataBD, setData]=useState([]);

  const columns = [
      { name: 'idArticulo', field: 'idArticulo', options:{filter:false}},
      { name: 'Codigo', field: 'Codigo' , options:{filter:false}},
      { name: 'CodigoProveedor', field: 'CodigoProveedor', options:{filter:false} },
      { name: 'CodigoAlterno', field: 'CodigoAlterno', options:{filter:false} },
      { name: 'NombreEspañol', field: 'NombreEspañol', options:{filter:false}},
      { name: 'NombreMexico', field: 'NombreMexico', options:{filter:false} },
      { name: 'NombreIngles', field: 'NombreIngles', options:{filter:false} },
      { name: 'CodigoArancelario', field: 'CodigoArancelario', options:{filter:false} },
      { name: 'Observacion', field: 'Observacion', options:{filter:false} },
      { name: 'PesoLB', field: 'PesoLB', options:{filter:false}},
      { name: 'Linea', field: 'Linea',options:{filter:true}},
      { name: 'Modelo', field: 'Modelo', options:{filter:true}},
      { name: 'Marca', field: 'Marca'},
      { name: 'UBICACION', field: 'UBICACION', options:{filter:false}}
  ];

  

  useEffect(() => {
    async function cargaData(){
    
      try {
          let res=await fetch('http://homestead.test/producto/articulos')
          let data =await res.json()
          console.log(data)
          setData(data)
           
              
      } catch (error) {
          console.log('error');
      }
    }
    cargaData()
  },[]);


  const options = {
    filter: true,
    filterType: "multiselect",
    responsive,
    selectableRowsOnClick: true,
    //rowsPerPageOptions:[35,70,150],
    selectableRows: "multiple",
    // jumpToPage: true

  };



  return (
    <React.Fragment>
      <InputLabel id="demo-simple-select-label"><strong>Plantilla BD Compras</strong></InputLabel>
      <Modals/>
      <MUIDataTable
      
        title={"Listado de Productos"}
        columns={columns}
        data={dataBD}
        options={options}
      />
     
    </React.Fragment>
  );
}

export default App;
