import * as React from 'react';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const FriendTable = ({ friends, handleDeleteAll, handleDelete, rowsPerPage, page }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Foto</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Sobrenombre</TableCell>
            <TableCell align="right">Es mejor amigo</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
  ? friends.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  : friends
  ).map((friend) => (
  <TableRow key={friend.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell align="left">
      <Avatar alt={friend.name} src={friend.image_url} />
    </TableCell>
    <TableCell align="right">{friend.name}</TableCell>
    <TableCell align="right">{friend.nickname}</TableCell>
    <TableCell align="right">{friend.is_best_friend ? 'Sí' : 'No'}</TableCell>
    <TableCell align="right">
      <Button variant="contained" color="secondary" onClick={() => handleDelete(friend.id)}>
        Eliminar
      </Button>
    </TableCell>
    
  </TableRow>
))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FriendTable;
