import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../../Redux/Slice/cartSlice";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import navbarStyling from "./navbarStyling.module.css";
import { DrawerComp } from "../Drawer";
import { useTheme, useMediaQuery } from "@mui/material";
export const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.allCart);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-aria-label="logo"
        >
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cart
        </Typography>
        <Toolbar>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Stack direction="row" spacing={2}>
                <Button color="inherit"></Button>
                <Button color="inherit" className={navbarStyling.button}>
                  <NavLink to="/" className={navbarStyling.button}>
                    Home
                  </NavLink>
                </Button>{" "}
                <Button color="inherit">
                  <NavLink to="/cart" className={navbarStyling.button}>
                    Cart
                  </NavLink>
                </Button>{" "}
                <Button color="inherit">
                  <AddShoppingCartIcon />
                  <sup>{cart.length}</sup>
                </Button>{" "}
              </Stack>
            </>
          )}
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};
