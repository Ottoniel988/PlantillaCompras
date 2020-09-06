import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Modelos() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [dataBD, setData]=useState([]);

  

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    async function cargaData(){
    
      try {
          let res=await fetch('http://homestead.test/producto/modelo')
          let data =await res.json()
          console.log(data)
          setData(data)
              
      } catch (error) {
          console.log('error');
      }
    }
    cargaData()
  },[]);

  return (
    <List className={classes.root}>
      {dataBD.map((value) => {
       const labelId = `checkbox-list-label-${value['nombre']}`;

        return (
          <ListItem role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                name="modelo"
                onChange={handleInputChange}
                checked={checked.indexOf(value) !== -1}
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
  );

}
