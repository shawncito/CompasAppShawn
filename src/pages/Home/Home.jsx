import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Alert, Typography , TablePagination } from '@mui/material';
import NavBar from '../../components/NavBar/NavBar';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import FriendDataForm from '../../components/FriendDataForm/FriendDataForm';
import FriendTable from '../../components/FriendTable/FriendTable';

import './styles.css';

const Home = () => {
  const [incompleteForm, setIncompleteForm] = useState(false);
  const [completeForm, setCompleteForm] = useState(false);
  const [noData, setNoData] = useState(false);
  const [completeDelete, setCompleteDelete] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [picture, setPicture] = useState('');
  const [isBestFriend, setIsBestFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [page, setPage] = useState(0); 

  useEffect(() => {
    axios.get('http://localhost:3001/friends')
      .then(response => {
        setFriends(response.data);
      })
      .catch(error => {
        console.error('Error fetching friends:', error);
      });
  }, []);
  
  const handleSave = () => {
    if (name === '' || nickname === '' || picture === '') {
      setIncompleteForm(true);
      setCompleteForm(false);
      setNoData(false);
      setCompleteDelete(false);
      setTimeout(() => {
        setIncompleteForm(false);
      }, 5000);
      return;
    }
    
    setIncompleteForm(false);
    setCompleteForm(true);
    setNoData(false);
    setCompleteDelete(false);
    
    const newFriend = { name, nickname, image_url: picture, is_best_friend: isBestFriend };
    axios.post('http://localhost:3001/friends', newFriend)
      .then(response => {
        setFriends([...friends, response.data]);
        setName('');
        setNickname('');
        setPicture('');
        setIsBestFriend(false);
      })
      .catch(error => {
        console.error('Error saving friend:', error);
      });
    setTimeout(() => {
      setCompleteForm(false);
    }, 5000);
  };

  const handleDeleteAll = () => {
    if (friends.length === 0) {
      setNoData(true);
      setCompleteForm(false);
      setIncompleteForm(false);
      setCompleteDelete(false);
      setTimeout(() => {
        setNoData(false);
      }, 5000);
      return;
    }
    setCompleteDelete(true);
    setNoData(false);
    setCompleteForm(false);
    setIncompleteForm(false);

    friends.forEach(friend => {
      axios.delete(`http://localhost:3001/friends/${friend.id}`)
        .then(() => {
          setFriends([]);
        })
        .catch(error => {
          console.error('Error deleting all friends:', error);
        });
    });
    setTimeout(() => {
      setCompleteDelete(false);
    }, 5000);
  };

  const handleDelete = (id) => {
    setCompleteDelete(true);
    setNoData(false);
    setCompleteForm(false);
    setIncompleteForm(false);
    
    axios.delete(`http://localhost:3001/friends/${id}`)
      .then(() => {
        setFriends(friends.filter(friend => friend.id !== id));
      })
      .catch(error => {
        console.error('Error deleting friend:', error);
      });
    setTimeout(() => {
      setCompleteDelete(false);
    }, 5000);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <NavBar />
      <PageWrapper>
        
        <Paper>
          <div className="home_wrapper">
            <Typography variant='h4'>Agregar Nuevo</Typography>
            <FriendDataForm
              name={name}
              setName={setName}
              nickname={nickname}
              setNickname={setNickname}
              picture={picture}
              setPicture={setPicture}
              isBestFriend={isBestFriend}
              setIsBestFriend={setIsBestFriend}
              handleSave={handleSave}
              handleDeleteAll={handleDeleteAll}
            />
            <FriendTable friends={friends} handleDeleteAll={handleDeleteAll} handleDelete={handleDelete} rowsPerPage={rowsPerPage} page={page} />
            {friends.length > 0 && ( 
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={friends.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </div>
        </Paper>
        {incompleteForm && <Alert severity="warning">Todos los campos son requeridos para guardar un nuevo amigo</Alert>}
        {completeForm && <Alert severity="success">Amigo guardado correctamente</Alert>}
        {noData && <Alert severity="info">No hay amigos que eliminar</Alert>}
        {completeDelete && <Alert severity="info">Se eliminó correctamente</Alert>}
      </PageWrapper>
    </div>
  );
}

export default Home;


