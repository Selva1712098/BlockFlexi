import React, { useState } from "react";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

function JewellerSchemeTable() {
  const [jewels, setJewels] = useState([]);

  const handleAddJewel = () => {
    setJewels([...jewels, ""]);
  };

  const handleDeleteJewel = (index) => {
    const updatedJewels = jewels.filter((jewel, i) => i !== index);
    setJewels(updatedJewels);
  };

  return (
    <Box style={{backgroudImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)',borderRadius:'16px'}} sx={{ padding:"0px" }}>
      <Button
        style={{ margin:'0px 0px 30px 120px', fontWeight: "bold" }}
        variant="contained"
        color="success"
        onClick={handleAddJewel}
      >
        ADD SCHEMES
      </Button>
      <TableContainer component={Paper} variant="outlined" style={{backgroundImage:'linear-gradient(to bottom, #BF8F91, #CAA2A3, #D4B5B5, #DFC7C8)'}}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: "bold" }}>SCHEMES</TableCell>
              <TableCell style={{ fontWeight: "bold",margin:'0px 0px 0px 200px' }}>DELETE SCHEME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell style={{ fontSize: "16px" }}></TableCell>
                <TableCell>
                  {index > -1 && (
                    <Button
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        margin:'0px 0px 0px 100px',
                        
                      }}
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteJewel(index)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default JewellerSchemeTable;
