/**
 * External dependencies
 */
import { Link, Route, Routes } from "react-router-dom";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * Internal dependencies
 */
import useToggle from "@/hooks/use-toggle.js";
import ProductsIndexPage from "@/domain/products/pages/products-index-page.jsx";

const App = () => {
    const {on: mobileOpen, toggle: toggleMobile} = useToggle();

    return (
      <Box sx={{display: 'flex'}}>
          <CssBaseline/>

          <AppBar component="nav">
              <Toolbar>
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={toggleMobile}
                    sx={{mr: 2, display: {sm: 'none'}}}
                  >
                      <MenuIcon/>
                  </IconButton>

                  <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, textAlign: 'left', display: {xs: 'none', sm: 'block'}}}
                  >
                      V3NDY
                  </Typography>

                  <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                      <Button component={Link} to="/products" sx={{color: '#fff'}}>
                          Products
                      </Button>
                  </Box>
              </Toolbar>
          </AppBar>

          <Box component="nav">
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={toggleMobile}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 240},
                }}
              >
                  <Box onClick={toggleMobile} sx={{textAlign: 'center'}}>
                      <Typography variant="h6" sx={{my: 2}}>
                          V3NDY
                      </Typography>

                      <Divider/>

                      <List>
                          <ListItem disablePadding>
                              <ListItemButton selected sx={{textAlign: 'center'}}>
                                  <ListItemText component={Link} primary="Products" to="/products"/>
                              </ListItemButton>
                          </ListItem>
                      </List>
                  </Box>
              </Drawer>
          </Box>

          <Box component="main" sx={{p: 3}}>
              <Toolbar/>

              <Routes>
                  <Route path="/products" Component={ProductsIndexPage}/>
              </Routes>
          </Box>
      </Box>
    );
}

export default App;