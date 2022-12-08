import "./style.scss";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WalletConnect from "components/WalletConnect";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src="./logo.png" alt="BNBLogo" height={70}></img>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoinStreamer
          </Typography>
          <WalletConnect/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header;
