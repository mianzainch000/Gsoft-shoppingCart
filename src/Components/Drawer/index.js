import { useState, useEffect } from "react";
import drawerStyling from "./drawerStyling.module.css";
import { NavLink } from "react-router-dom";
import { Drawer, Box, IconButton, Button, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getCartTotal } from "../../Redux/Slice/cartSlice";
export const DrawerComp = () => {
  const [isDraweOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart, totalQuantity } = useSelector((state) => state.allCart);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);
  return (
    <div>
      <div onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </div>
      <Drawer
        anchor="left"
        open={isDraweOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <IconButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon className="closeIcon" />
        </IconButton>

        <Box p={2} width="250px" textAlign="center">
          <Stack direction="row" spacing={2} className={drawerStyling.drawer}>
            <Button color="inherit" className={drawerStyling.button}>
              <NavLink
                to="/"
                className={drawerStyling.button}
                onClick={() => setDrawerOpen(false)}
              >
                Home
              </NavLink>
            </Button>{" "}
            <Button color="inherit">
              <NavLink
                to="/cart"
                className={drawerStyling.button}
                onClick={() => setDrawerOpen(false)}
              >
                Cart
              </NavLink>
            </Button>{" "}
            <Button color="inherit">
              <AddShoppingCartIcon />
              <sup>{totalQuantity}</sup>
            </Button>{" "}
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};
