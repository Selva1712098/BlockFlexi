import React, { useState } from "react";
import Header from "../components/Header";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import "./Settle.css";

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
  Typography,
} from "@mui/material";

const rows = [
  { id: 1, name: "SELVA KUMAR", Bankpayment: "45000" },
  { id: 2, name: "ASHWATH KUMAR", Bankpayment: "35000" },
  { id: 3, name: "SHREE", Bankpayment: "25000" },
  { id: 4, name: "DIWAKAR", Bankpayment: "55000" },
  { id: 5, name: "VAITHEES", Bankpayment: "65000" },
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
          marginTop: "5rem",
          marginBottom: "2rem",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "black",
          textTransform: "uppercase",
          letterSpacing: "2px",
          padding: "1rem",
        }}
      >
        Approved Customers
      </Typography>

      <TableContainer
        component={Paper}
        style={{ maxWidth: "80%", borderRadius: "10px", margin: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow className="settlefont">
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#9a1b56",
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                S.NO
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#9a1b56",
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                CUSTOMER NAME
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#9a1b56",
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                LOAN APPROVED
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#9a1b56",
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
                align="left"
              >
                BANK PAYMENT
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#9a1b56",
                  color: "white",
                  fontSize: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                SETTLE GOLD
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                style={{
                  boxShadow:
                    hoveredRow === row
                      ? "0px 0px 10px 5px rgba(0, 0, 0, 0.1)"
                      : "none",
                }}
                onMouseEnter={() => handleRowHover(row)}
                onMouseLeave={() => handleRowHoverLeave()}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>YES</TableCell>
                <TableCell>{row.Bankpayment}</TableCell>
                <TableCell>
                  <Button
                    style={{ fontWeight: "bold" }}
                    variant="contained"
                    disabled={!hoveredRow || hoveredRow.id !== row.id}
                    onClick={() => handleSettleClick(row)}
                  >
                    <MonetizationOnRoundedIcon />
                    SETTLE GOLD
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRow && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="40px"
          PaperProps={{
            style: {
              borderRadius: "10px",
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h5" align="center">
              <strong>Settle Gold for {selectedRow.name}</strong>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText align="center">
              Are you sure you want to settle gold for {selectedRow.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseDialog}
              style={{
                backgroundColor: "#f34642",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "7px",
                padding: "8px 16px",
                marginRight: "16px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseDialog}
              style={{
                backgroundColor: "#38ba7c",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "4px",
                padding: "8px 16px",
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
