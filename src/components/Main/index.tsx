import './style.scss';
import { useState, useContext } from "react";
import { Web3WrapperContext } from 'contexts/Web3WrapperProvider';
import { Typography, TextField, Button, FormControl, FormLabel } from '@mui/material';
import { Box } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Main = () => {

    const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);

    const [tokenState, setTokenState] = useState("bnb");
    const [durationState, setDurationState] = useState("hour");

    const[recipent, setRecipent] = useState("");
    const[tokenAddr, setTokenAddr] = useState("");
    const[amount, setAmount] = useState(0);
    const[duration, setDuration] = useState(0);
    const[streams, setStreams] = useState(0);

    const tokenStateChanged = (event, value) => {
        setTokenState(value);
    }

    const durationStateChanged = (event, value) => {
        setDurationState(value);
    }

    const handleRecipent = (event) => {
        setRecipent(event.target.value);
    }

    const handleTokenAddr = (event) => {
        setTokenAddr(event.target.value);
    }

    const handleAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleDuration = (event) => {
        setDuration(event.target.value);
    }

    const handleStreams = (event) => {
        setStreams(event.target.value);
    }

    const send = async () => {
        if(tokenState === "bnb"){
            let _duration_unit = 3600;
            if(durationState === "hour") _duration_unit = 3600;
            else if(durationState === "day") _duration_unit = 86400;
            else _duration_unit = 2592000;
            await wrapper?.sendBNB(recipent, amount, _duration_unit * duration, streams);
        }
        else {
            let _duration_unit = 3600;
            if(durationState === "hour") _duration_unit = 3600;
            else if(durationState === "day") _duration_unit = 86400;
            else _duration_unit = 2592000;
            await wrapper?.sendToken(recipent, tokenAddr, amount, _duration_unit * duration, streams);
        }
    }

    return (
        <Box sx={{ marginTop:'10%', display:'block', padding:'5%'}}>
            <Typography fontSize={{lg:60, md:50, sm:45, xs:35}} style={{color:'black'}}>
                Coin Streamer
            </Typography>

            <Box sx={{display:'block',alignItems:'center' , marginTop:'20px'}}>
                <FormControl style={{borderWidth:1, borderColor:"black"}}>
                    <FormLabel>Select Token</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={tokenStateChanged}
                    >
                        <FormControlLabel value="bnb" control={<Radio />} style={{color:'black'}} label="BNB" />
                        <FormControlLabel value="other" control={<Radio />} style={{color:'black'}} label="Other" />
                    </RadioGroup>
                    {tokenState==="other"? (
                        <>
                            <Box sx={{display:'flex', justifyContent:"space-between",alignItems:'flex-end' , marginTop:'20px'}}>
                                <Typography fontSize={{lg:20, md:19, sm:18, xs:17}} style={{color:'grey', marginRight:'15px'}}>
                                    Token Address:
                                </Typography>
                                <TextField id="outlined-basic" label="Input Token Address" variant="standard" onChange={handleTokenAddr}/>
                            </Box>
                        </>
                    ):(<></>)}
                </FormControl>
            </Box>

            <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'flex-end' , marginTop:'30px'}}>
                <Typography fontSize={{lg:20, md:19, sm:18, xs:17}} style={{color:'grey', marginRight:'5%'}}>
                    Recipent Address:
                </Typography>
                <TextField id="outlined-basic" label="Input Address" style={{width:"60%"}} variant="standard" onChange={handleRecipent} />
            </Box>
            <br></br>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Box sx={{display:'inline-flex',alignItems:'center' , marginTop:'20px'}}>
                    <Typography fontSize={{lg:20, md:19, sm:18, xs:17}} style={{color:'grey', marginRight:'5%'}}>
                        Total amount:
                    </Typography>
                    <TextField id="outlined-basic" style={{width:"30%"}} type="number" inputProps={{ min: 0, step:0.1 }} variant="standard" onChange={handleAmount}/>
                </Box>
                <Box sx={{display:'inline-flex',alignItems:'center' , marginTop:'20px'}}>
                    <Typography fontSize={{lg:20, md:19, sm:18, xs:17}} style={{color:'grey', marginRight:'7%'}}>
                        Streams:
                    </Typography>
                    <TextField id="outlined-basic" type="number" style={{width:'100%'}} inputProps={{ min: 0, max: 999}} variant="standard" onChange={handleStreams}/>
                </Box>
            </Box>
            <br></br>

            <Box sx={{display:'inline-flex',alignItems:'center' , marginTop:'20px'}}>
                <Typography fontSize={{lg:20, md:20, sm:20, xs:20}} style={{color:'grey', marginRight:'15px'}}>
                    Duration:
                </Typography>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={durationStateChanged}
                >
                    <FormControlLabel value="hour" control={<Radio />} style={{color:'black'}} label="Hour"/>
                    <FormControlLabel value="day" control={<Radio />} style={{color:'black'}} label="Day" />
                    <FormControlLabel value="week" control={<Radio />} style={{color:'black'}} label="Week" />
                </RadioGroup>
                <TextField id="outlined-basic" style={{width:'20%'}} variant="standard" onChange={handleDuration}/>
                {durationState==="hour"? (
                            <Typography variant="h6" style={{color:'grey', marginLeft:'15px'}}>
                                Hour
                            </Typography>
                ):(
                    durationState==="day"? (
                                <Typography variant="h6" style={{color:'grey', marginLeft:'15px'}}>
                                    Day
                                </Typography>
                    ):(
                        <Typography variant="h6" style={{color:'grey', marginLeft:'15px'}}>
                                    Week
                        </Typography>
                    )
                )}
            </Box>
            <br></br>
            <Box sx={{display:'inline-flex',alignItems:'center' , marginTop:'40px', marginLeft:'35%'}}>
            <Button variant="outlined" size="large" onClick={send}>Submit</Button>
            </Box>
        </Box>
    );
}

export default Main;