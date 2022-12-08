import React, { useState, useEffect } from 'react'
import { Box, Container } from "@mui/material";
import WalletConnect from "../components/WalletConnect";
import { Polybase } from '@polybase/client';
import HistoryTable from "../components/HistoryTable/CustomizedTable";
import './style.scss'

export default function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const createData = (txHash, firstName, lastName, emailAddr, address, city, state, zip, country, payment) => {
    return { txHash, firstName, lastName, emailAddr, address, city, state, zip, country, payment };
  }

  const getData = async() => {
    const db = new Polybase({ defaultNamespace: "submit_test" })
    const collectionReference = db.collection("Submissions")
    const records = await collectionReference.get()
    const updateData = [];

    for(let index = 0; index < records["data"].length; index++) {
      let temp = createData(
        records["data"][index].block.hash, 
        records["data"][index].data.firstname,
        records["data"][index].data.lastname,
        records["data"][index].data.email,
        records["data"][index].data.address,
        records["data"][index].data.city,
        records["data"][index].data.state,
        records["data"][index].data.zip,
        records["data"][index].data.country,
        records["data"][index].data.payment,
      );
      updateData.push(temp);
    }
    setHistory(updateData);
  }

  return (
      <Box sx={{margin:'10px'}}>
        <Box sx={{display:'block', width:'100%', justifyContent:"end", textAlign:'end', marginTop:"30px"}}>
          <WalletConnect/>
        </Box>
        <Container sx={{marginTop:'100px'}}>
          <HistoryTable data={history}/>
        </Container>
      </Box>
    )
}
