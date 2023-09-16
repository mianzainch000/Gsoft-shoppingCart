import React, { useState } from "react";
import { addProduct } from "../../Redux/Slice/cartSlice";
import { useDispatch } from "react-redux";
import product from "./product.module.css";
import Products from "../Data/data";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
} from "@mui/material";
export const Product = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        message="Product Added Successfully"
        autoHideDuration={1000}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={product.Snackbar}
      />
      <Grid container lg={12} spacing={4}>
        {Products.map((item) => {
          return (
            <>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Card className={product.cardContainer} key={item.id}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    className={product.img}
                  />
                  <CardContent>
                    <Typography variant="h6" textAlign="center;">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      textAlign="center;"
                    >
                      $ {item.price}
                    </Typography>
                    <button
                      className={product.button}
                      onClick={() => {
                        setOpen(true);
                        dispatch(addProduct(item));
                      }}
                    >
                      Add to Card
                    </button>
                  </CardContent>
                </Card>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};
