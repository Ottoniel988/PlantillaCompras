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
    
    { name: 'idArticulo', field: 'idArticulo', options:{filter:false, display:false}},
    { name: 'Parte', field: 'Parte' , options:{filter:true}},
    { name: 'Clasificacion', field: 'Clasificacion', options:{filter:true} },
    { name: 'ClasificacionParte', field: 'ClasificacionParte', options:{filter:true} },
    { name: 'Codigo', field: 'Codigo', options:{filter:false}},
    { name: 'NombreEsp', field: 'NombreEsp', options:{filter:false} },
    { name: 'NombreIng', field: 'NombreIng', options:{filter:false} },
    { name: 'Rotacion', field: 'Rotacion', options:{filter:true} },
    {name:'Modelos',options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {
          if(value!=''){return <span className="badge" style={{backgroundColor: "#00FFFF"}} >Ver Modelos</span>;}
  }
}
}     

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
      <Modals persona="cargaData()" />
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
