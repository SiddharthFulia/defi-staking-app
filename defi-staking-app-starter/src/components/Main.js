import { Button, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
// import { Box } from '@mui/system';
import React,{Component} from 'react'
import './Main.css';
import tetherimage from '../tether.png';
import Airdrop from './Airdrop';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
class Main extends Component {
  // console.log(this.props.tetherbalance);
  render(){
  return (
    <>
    <TableContainer sx={{opacity:'0.9'}}>
    <Table className='tablemain' style={{width:'50vw',height:'10vh'}}>
      <TableHead style={{color:'white'}}>
        <TableRow >
         <TableCell align='center'><Typography variant='h6' sx={{color:'white'}}>Staking Balance</Typography></TableCell>
         <TableCell align='center'><Typography variant='h6' sx={{color:'white'}}>Reward Balance</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody style={{color:'black'}}>
       <TableRow >
       {/* {window.web3.utils.fromWei(this.props.stakingbalance,'ether')}
       {window.web3.utils.fromWei(this.props.rwdbalance,'ether')} */}
        <TableCell align='center'><Typography sx={{color:'white'}}>{window.web3.utils.fromWei(this.props.stakingbalance,'Ether')} USDT</Typography></TableCell>
        <TableCell align='center'><Typography sx={{color:'white'}}>{window.web3.utils.fromWei(this.props.rwdbalance,'Ether')} RWD</Typography></TableCell>
       </TableRow>
      </TableBody>
    </Table>
    </TableContainer>
    <br />
    <Card className='cardclass' style={{opacity:'0.9'}}>
      <form onSubmit={(event)=>{
        event.preventDefault();
        let amount;
        amount=this.input.value.toString();
        amount=window.web3.utils.toWei(amount,'ether')
        console.log(amount);
        this.props.stakingtokens(amount);
      }}>
      <Grid container className='gridclass'>
        <Grid sx={{flex:1}}>
          <label>Staking Balance</label>
        </Grid>
      <Grid >
      <Typography>
      {/* {window.web3.utils.fromWei(this.props.tetherbalance,'ether')} */}
       <b>Balance: {window.web3.utils.fromWei(this.props.tetherbalance,'Ether')}</b>
      </Typography>
      </Grid>
      </Grid>
      <Grid container>
        <Grid>
        <input 
        ref={(input)=>{this.input=input}}
        type="text" placeholder='Enter number of staking tokens here' required 
        style={{width:'15vw',height:'30px'}}/>
        </Grid>
        <Grid>
        <img src={tetherimage} alt='No tether pic' style={{width:'60px',height:'40px'}}/>
        </Grid>
        <Grid sx={{marginTop:'10px',color:'red'}}>
           USDT
        </Grid>
      </Grid>
      <Button variant='contained' sx={{width:'50vw'}} type='submit'> 
       {/* type is submit to make sure form field is not empty */}
        DEPOSIT
      </Button>
      </form>
      <Button
      onClick={(event)=>{
        event.preventDefault(
          this.props.unstakingtokens()
        )
      }} 
      variant='contained' sx={{width:'50vw',marginTop:'10px'}} type='submit'>
        {/* type is submit to make sure form field is not empty */}
        WITHDRAW
      </Button>
      <Grid container sx={{justifyContent:'center'}}>
      <Typography sx={{color:'blue'}} >
        AIRDROP <AccessTimeIcon/> <Airdrop stakingbalance={this.props.stakingbalance}/>
      </Typography>
      </Grid>
      <Grid container sx={{justifyContent:'center'}}>
      <Typography color='#f4511e'>
        (Airdrop is only available if 50 or more tokens are staked)
      </Typography>
      </Grid>
    </Card>  
    </>
  )
}
}

export default Main;