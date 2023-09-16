import { useEffect, useState } from "react";
import style from "./style.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  CardMedia,
  Card,
  Grid,
  Box,
  CardContent,
  AppBar,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import {
  deleteProduct,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCartTotal,
} from "../../Redux/Slice/cartSlice";

export const Cart = () => {
  // States

  const dispatch = useDispatch();
  const { cart, totalPrice, totalQuantity } = useSelector(
    (state) => state.allCart
  );
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Functions

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* Snackbar */}

      <Snackbar
        message="Product Deleted Successfully"
        autoHideDuration={1000}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />

      {/* DialogBox */}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogContentText>
            Are you sure wnat to delete this product ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
              setDialogOpen(false);
              dispatch(deleteProduct(deleteId));
            }}
            sx={{ color: "red;" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Card  */}

      <AppBar position="sticky">
        <Card>
          <CardContent className={style.cardContentTotalProductAndQuantity}>
            <Typography variant="h6">Total Price : ${totalPrice}</Typography>
            <Typography variant="h6">Total Items : {totalQuantity}</Typography>
          </CardContent>
        </Card>
      </AppBar>

      {/* Product Card */}

      <Grid container lg={12} spacing={1}>
        {cart.map((item) => {
          return (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card className={style.ProductcardContainer} key={item.id}>
                <CardMedia
                  component="img"
                  image={item.image}
                  className={style.img}
                />

                <Typography
                  variant="h6"
                  color="text.secondary"
                  textAlign="center;"
                  sx={{ margin: "auto;" }}
                >
                  $ {item.price}
                </Typography>

                <Box className={style.input}>
                  <Typography
                    onClick={() => dispatch(decreaseItemQuantity(item.id))}
                  >
                    <RemoveCircleOutlineIcon className={style.icons} />
                  </Typography>
                  <Typography>{item.quantity}</Typography>

                  <Typography
                    onClick={() => dispatch(increaseItemQuantity(item.id))}
                  >
                    <AddCircleOutlineIcon className={style.icons} />
                  </Typography>
                </Box>

                <IconButton
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                >
                  <DeleteIcon
                    onClick={() => {
                      setDeleteId(item.id);
                    }}
                    sx={{ color: "red;", fontSize: "40px;" }}
                  />
                </IconButton>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
