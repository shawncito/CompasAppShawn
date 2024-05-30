import React from 'react';
import { Button, FormGroup, FormControlLabel, TextField, Switch ,} from '@mui/material';


import './styles.css';

const FriendDataForm = ({ name, setName, nickname, setNickname, picture, setPicture, isBestFriend, setIsBestFriend, handleSave, handleDeleteAll }) => {
  return (
    <div className="friend-data-form-wrapper">
      <div className='friend-data-form-text-fields'>
        <TextField 
          id="name"
          label="Nombre"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField 
          id="nickname"
          label="Sobrenombre"
          variant="outlined"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <TextField 
          id="picture"
          label="Foto"
          variant="outlined"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
          required
        />
      </div>
      <FormGroup>
        <FormControlLabel 
          control={<Switch checked={isBestFriend} onChange={(e) => setIsBestFriend(e.target.checked)} />} 
          label="Es mejor amigo" 
        />
      </FormGroup>
      <div className='Buttons'>
        <Button variant="contained" fullWidth={false} onClick={handleSave}>Guardar</Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteAll}>Eliminar Todos</Button>
      </div>
    </div>
  );
}

export default FriendDataForm;

