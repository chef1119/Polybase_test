import "./App.scss";
import 'react-notifications/lib/notifications.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Web3ModalProvider from "./contexts/Web3ModalProvider"; 
import Web3WrapperProvider from "contexts/Web3WrapperProvider";
import Sidenav from './components/SideNav/Sidenav';
import Submit from "./pages/Submit";
import History from "./pages/History";
import { Grid } from "@material-ui/core";

import { NotificationContainer } from 'react-notifications';

const App = () => (
  <Providers>
  <BrowserRouter>
        <Grid container className="layout-container" style={{display:'flex', justifyContent:'flex-end'}}>
          <Grid item xs={2} sm={2} className='left-side-bar'>
            <Sidenav />
          </Grid>
          <Grid item className="content-container" xs={10} sm={10} style={{ width: '100%', justifyContent: 'center' }}>
              <Switch>
                <Route exact path="/" component={Submit}/>
                <Route path="/history" component={History}/>
              </Switch>
          </Grid>
        </Grid>
    </BrowserRouter>
    <NotificationContainer />
  </Providers>
)

const Providers = (props) => {
  return (
    <Web3ModalProvider>
      <Web3WrapperProvider>
        {props.children}
      </Web3WrapperProvider>
    </Web3ModalProvider>
  )
}


export default App;
