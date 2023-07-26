import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">
              <h3>ID</h3>
            </TableCell>
            <TableCell className="tableCell">
              <h3>Product</h3>
            </TableCell>
            <TableCell className="tableCell">
              <h3>Customer</h3>
            </TableCell>
            <TableCell className="tableCell">
              <h3>Date</h3>
            </TableCell>
            <TableCell className="tableCell">
              <h3>Amount</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              {/* <TableCell className="tableCell">{row.method}</TableCell>s */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    // <DataTable value={rows} >
    //   <Column field="id" header="ID" sortable />
    //   <Column field="product" header="Product" sortable />
    //   <Column field="customer" header="Customer" sortable />
    //   <Column field="date" header="Date" />
    //   <Column field="amount" header="Amount" sortable />
    //   <Column field="date" header="Date" sortable />
    // </DataTable>
  );
};

export default List;
