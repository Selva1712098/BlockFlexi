import React, { useState } from 'react';
import Header from '../components/Header';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  Typography
} from "@mui/material";

const rows = [
  { id: 1, name: "SELVA KUMAR" ,Bankpayment:"45000"},
  { id: 2, name: "ASHWATH KUMAR", Bankpayment:"35000"},
  { id: 3, name: "SHREE",Bankpayment:"25000"},
  { id: 4, name: "DIWAKAR",Bankpayment:"55000"},
  { id: 5, name: "VAITHEES",Bankpayment:"65000"},
];

function Settle() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSettleClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [hoveredRow, setHoveredRow] = useState(null);

  const handleRowHover = (row) => {
    setHoveredRow(row);
  };

  const handleRowHoverLeave = () => {
    setHoveredRow(null);
  };

  return (
    <div>
      <Header title="Settle Accounts" />

      <Typography 
        variant="h4" 
        align="center" 
        style={{ 
          marginTop: '2rem', 
          marginBottom: '2rem',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'black',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          padding: '1rem'
        }}
      >
        Approved Customers
      </Typography>

      <TableContainer component={Paper} style={{ maxWidth: '90%', margin: 'auto', borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem' }}>S.NO</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem' }}>CUSTOMER NAME</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem'}}>LOAN APPROVED</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem' }} align='left'>BANK PAYMENT</TableCell>
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#9a1b56', color: 'white', fontSize: '1.5rem' }}>SETTLE GOLD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                style={{ boxShadow: hoveredRow === row ? '0px 0px 10px 5px rgba(0, 0, 0, 0.1)' : 'none' }}
                onMouseEnter={() => handleRowHover(row)}
                onMouseLeave={() => handleRowHoverLeave()}
          >
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>YES</TableCell>
            <TableCell>{row.Bankpayment}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                fontWeight="bold"
                backgroundColor="#9a1b56"
                
                disabled={!hoveredRow || hoveredRow.id !== row.id}
                onClick={() => handleSettleClick(row)}
              >
                SETTLE GOLD
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  {selectedRow && (
    <Dialog  open={openDialog} onClose={handleCloseDialog} maxWidth='40px'>
    <DialogTitle style={{ textAlign: 'center' }}>
      <strong>SETTLE GOLD FOR {selectedRow.name}</strong>
    </DialogTitle>
    <DialogContent>
      <DialogContentText style={{ textAlign: 'center' }}>
        Are you sure you want to settle gold for {selectedRow.name}?
      </DialogContentText>
    </DialogContent>
    <DialogActions style={{ justifyContent: 'center' }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCloseDialog}
        style={{
          backgroundColor: '#f44336',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '4px',
          padding: '8px 16px',
          marginRight: '16px',
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCloseDialog}
        style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '4px',
          padding: '8px 16px',
        }}
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
  
  
  )}
</div>
);
}

export default Settle;