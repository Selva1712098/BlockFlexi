import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  
  DialogActions,Slide
} from "@mui/material";
import Header from "../components/Header";

function createData(Sno, name, Phone_No, Payment_Status, Months_paid, PANNo) {
  return { Sno, name, Phone_No, Payment_Status, Months_paid, PANNo };
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const rows = [
  createData(1, "John", 9191919159, "No", 3, "ALD0901W"),
  createData(2, "Bob", 8181818137, "No", 5, "LOK114P"),
  createData(3, "Alice", 7474747262, "No", 6, "SCS00124O"),
  createData(4, "Logan", 9090990305, "No", 4, "SAQ999I"),
  createData(5, "Mike", 8918918936, "No", 3, "KIL913O"),
];

export default function SimpleTable() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  function handleDialogOpen(user) {
    setOpen(true);
    setSelectedUser(user);
    
  }

  return (
    <>
      <Header />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth="xs"
        fullWidth
        TransitionComponent={Transition}
        scroll='paper'
        
      >
        <DialogTitle>
            <Typography variant='h4'>Customer Details</Typography></DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <Typography variant="h5"  gutterBottom>
                Name: {selectedUser.name}
              </Typography>
              <Typography variant="h5"  gutterBottom>
                Phone: {selectedUser.Phone_No}
              </Typography>
              <Typography variant="h5"  gutterBottom>
                PAN: {selectedUser.PANNo}
              </Typography>
              <Typography variant="h5"  gutterBottom>
                Months Paid: {selectedUser.Months_paid}
              </Typography>
              </>
          )}
        </DialogContent>
            <DialogActions>
          <Button variant='contained'  size='small'  onClick={() => setOpen(false)}>Ok</Button>
          </DialogActions>
      </Dialog>
      <div
        style={{
          height: "140px",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography align="center" variant="h3">
          Incoming Requests
        </Typography>
      </div>
      
      <TableContainer component={Paper} sx={{ maxHeight: "400px"}}>
       
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "22px" }}>
                S.No
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Name
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Phone No
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Payments
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "22px"}}
              >
                Approval
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "22px" }}
              >
                Payment Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left" sx={{ fontSize: "18px" }}>
                  {row.Sno}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "18px" }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "18px" }}>
                  {row.Phone_No}
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => handleDialogOpen(row)}
                  >
                    See Payments{" "}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Button variant="contained" color="success">
                      Approve{" "}
                    </Button>
                    <Button variant="contained" color="error">
                      Reject{" "}
                    </Button>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "18px" }}>
                  {row.Payment_Status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      
    </>
  );
}
