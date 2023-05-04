
import {Table, TableBody,
    TableContainer, Paper,
    tableCellClasses
     } from '@mui/material';


const TableData=({children})=> {
   

  return (
      <Paper sx={{ width: '100%' }}>
            <TableContainer component={Paper} sx={{
                maxWidth: "800",
                [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
                }
                
            }}  >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                {children}
                </TableBody>
            </Table>
            </TableContainer>
     </Paper>
  );
}

export default TableData;