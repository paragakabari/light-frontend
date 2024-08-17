import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function CartTable(props) {
  const { cartData, onRemoveItem } = props;

  const removeCart = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onRemoveItem(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your product is safe :)", "error");
      }
    });
  };

  function ccyFormat(num) {
    return `${(num || 0).toFixed(2)}`;
  }

  function subtotal(items) {
    return items
      .map(({ quantity, price, productId }) =>
        localStorage.getItem("role") === "dealer"
          ? quantity * productId.dealerPrice
          : quantity * price
      )
      .reduce((sum, i) => sum + (i || 0), 0);
  }

  const invoiceSubtotal = subtotal(cartData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No items in the cart.
              </TableCell>
            </TableRow>
          ) : (
            cartData.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <img
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                    src={row.productId.images[0]}
                    alt=""
                  />
                </TableCell>
                <TableCell>{row.productId.name}</TableCell>
                <TableCell style={{ width: "500px", overflow: "hidden" }}>
                  {row.productId.description}
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                {localStorage.getItem("role") === "dealer" ? (
                  <TableCell align="right">
                    {ccyFormat(row.productId.dealerPrice)}
                  </TableCell>
                ) : (
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                )}
                {localStorage.getItem("role") === "dealer" ? (
                  <TableCell align="right">
                    {ccyFormat(row.quantity * row.productId.dealerPrice)}
                  </TableCell>
                ) : (
                  <TableCell align="right">
                    {ccyFormat(row.quantity * row.price)}
                  </TableCell>
                )}
                <TableCell align="right">
                  <button
                    className="remove-btn"
                    onClick={() => removeCart(row.productId.id)}
                  >
                    Remove
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
          {cartData.length > 0 && (
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell align="right" colSpan={2} className="fontBold">
                Subtotal
              </TableCell>
              <TableCell align="right" colSpan={3} className="fontBold">
                {ccyFormat(invoiceSubtotal)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
