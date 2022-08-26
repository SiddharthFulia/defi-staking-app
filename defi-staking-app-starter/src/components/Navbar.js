import React from 'react'
import bank from '../bank.png'
// import './Navbar.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
function Navbar(props) {
  return (
    <>
    {/* <div className="container">
    <a href="/" target="main">
        <p>DAPP yeilding application</p>
        <div style={{backgroundColor:'yellow',width:'120px',height:'120px'}}>
        <img src={bank} alt="Not Loaded" style={{width:'100px',height:'100px'}} />
        </div>
    </a>
    </div> */}
    {/* hi */}
    <Box sx={{ flexGrow: 1,opacity:'0.9'}}>
      <AppBar position="static" sx={{backgroundColor:'red'}}>
        <Toolbar>
          {/* <IconButton
            // size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}
            {/* <MenuIcon /> */}
            <img src={bank} alt="Not Loaded" style={{width:'70px',height:'45px'}} />
          {/* </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          &nbsp;DAPP yeilding application(Decentralized Banking) {/* &nbsp; gives small white space after it  */}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Typography >
            Account Number:{props.account}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}
export default Navbar;
