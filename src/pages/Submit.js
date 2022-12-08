import React, { useRef, useContext } from 'react'
import { Box, Typography, TextField, Button, Grid, Container, Paper } from "@mui/material";
import WalletConnect from "../components/WalletConnect";
import { Web3ModalContext } from 'contexts/Web3ModalProvider';
import { NotificationManager } from 'react-notifications';
import { Polybase } from '@polybase/client'

export default function Submit() {
  const { account } = useContext(Web3ModalContext);
  const firstName = useRef();
  const lastName = useRef();
  const emailAddr = useRef();
  const address = useRef();
  const city = useRef();
  const state = useRef();
  const zipCode = useRef();
  const country = useRef();

  const onSubmit = async () => {
    if(!firstName.current.value || !lastName.current.value || !emailAddr.current.value || !address.current.value || !city.current.value || !state.current.value || !zipCode.current.value || !country.current.value)
      NotificationManager.error('Please fill out all requirements', 'Invalid Input')
    else{
      const db = new Polybase({ defaultNamespace: "submit_test" })
      const collectionReference = db.collection("Submissions")
      console.log(collectionReference);
      await collectionReference.create([account, firstName.current.value, lastName.current.value, emailAddr.current.value, address.current.value, city.current.value, state.current.value, zipCode.current.value, country.current.value, account]);
      NotificationManager.success('Successfully submitted', 'Success')
    }
  }

  return (
    <Box sx={{margin:'10px'}}>
      <Box sx={{display:'block', width:'100%', justifyContent:"end", textAlign:'end', marginTop:"30px"}}>
        <WalletConnect/>
      </Box>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor:'#334155', borderRadius:'1rem' }}>
          <Typography component="h1" variant="h4" align="center" fontStyle={{color:'white'}} sx={{marginBottom:'25px'}}>
            Submit Form
          </Typography>
          {!account?(
            <Typography align="center" fontStyle={{color:'#94a3b8'}} sx={{marginBottom:'15px'}}>
              Please Connect Wallet
            </Typography>
          ):(
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    className='textfield'
                    name="firstName"
                    label="First name"
                    autoComplete="given-name"
                    inputRef={firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    className='textfield'
                    name="lastName"
                    label="Last name"
                    inputRef={lastName}
                    fullWidth
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    className='textfield'
                    name="email"
                    label="Email Address"
                    type="email"
                    inputRef={emailAddr}
                    fullWidth
                    autoComplete="shipping email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    className='textfield'
                    name="address1"
                    label="Address line 1"
                    inputRef={address}
                    fullWidth
                    autoComplete="shipping address-line1"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    className='textfield'
                    label="City"
                    inputRef={city}
                    fullWidth
                    autoComplete="shipping address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    className='textfield'
                    label="State/Province/Region"
                    inputRef={state}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    className='textfield'
                    label="Zip / Postal code"
                    inputRef={zipCode}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    className='textfield'
                    label="Country"
                    inputRef={country}
                    fullWidth
                    autoComplete="shipping country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="wallet"
                    className='textfieldwallet'
                    name="wallet"
                    color='success'
                    label="Payment Address"
                    value={account}
                    fullWidth
                    autoComplete="shipping address-line2"
                    InputProps={{
                      readOnly: true,
                    }}
                    required
                  />
                  <Typography align="center" fontStyle={{color:'#94a3b8'}} sx={{ marginTop:'10px', marginBottom:'15px'}}>
                    The wallet address can be used for only one submission
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sx={{textAlign:'center'}}>
                  <Button onClick={onSubmit} sx={{backgroundColor:'#3b82f6', color:'white', borderRadius:'1rem', width:'100%', height:'60px'}}>Submit</Button>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
