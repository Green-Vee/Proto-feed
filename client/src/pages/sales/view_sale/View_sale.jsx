import "./view_sale.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";

const View_sale = () => {
  const state = useLocation().state;
  console.log(state);
  const {
    _id,
    full_name,
    createdAt,
    district,
    email,
    cartItems,
    phone,
    phone_2,
    // total,
  } = state;

  // console.log(cartItems)

  return (
    <div>
      <h2>Sale details</h2>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell1">
                <h3>Products</h3>
              </TableCell>
              <TableCell className="tableCell1">
                <h3>Customer</h3>
              </TableCell>
              <TableCell className="tableCell1">
                <h3>Date</h3>
              </TableCell>
              <TableCell className="tableCell1">
                <h3>Phone Number(s)</h3>
              </TableCell>
              <TableCell className="tableCell1">
                <h3>Email</h3>
              </TableCell>
              <TableCell className="tableCell1">
                <h3>District</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="tableCell1">
                <TableHead>
                  <TableCell className="tableCell1">
                    <h3>Type</h3>
                  </TableCell>
                  <TableCell className="tableCell1">
                    <h3>Name</h3>
                  </TableCell>
                  <TableCell className="tableCell1">
                    <h3>Quantity</h3>
                  </TableCell>
                  <TableCell className="tableCell1">
                    <h3>Price</h3>
                  </TableCell>
                  <TableCell className="tableCell1">
                    <h3>KGs</h3>
                  </TableCell>
                </TableHead>
                {cartItems.map((row, index) => (
                  <TableRow key={row._id}>
                    <>
                      {" "}
                      <TableCell className="tableCell1">
                        {row.productType}
                      </TableCell>
                      <TableCell className="tableCell1">{row.name}</TableCell>
                      <TableCell className="tableCell1">
                        {row.quantity}
                      </TableCell>
                      <TableCell className="tableCell1">{row.price}</TableCell>
                      <TableCell className="tableCell1">{row.kgs}</TableCell>
                    </>
                  </TableRow>
                ))}
                {/* <h3>Total + Vat: ${total}</h3> */}
              </TableCell>

              <TableCell className="tableCell1">{full_name}</TableCell>

              <TableCell className="tableCell1">
                {new Date(createdAt).toLocaleDateString("en-US")}
              </TableCell>
              <TableCell className="tableCell1">
                {phone}
                <br />
                {phone_2}
              </TableCell>
              <TableCell className="tableCell1">{email}</TableCell>
              <TableCell className="tableCell1">{district}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default View_sale;
