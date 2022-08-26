import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar';
import Tether from '../contracts/Tether.json';
import RWD from '../contracts/RWD.json';
import Decentralizedbank from '../contracts/Decentralizedbank.json';
import Main from './Main';
import { Typography } from '@mui/material';
import ParticleAnimation from './ParticleAnimation';
class App extends Component {
  async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockchaindata()
  }
  constructor(props){
    super(props)
      this.state={
        account:'0x0',
        //empty objects to get contracts as .json files (check build\contracts section)
        tether:{},
        rwd:{},
        decentralizedbank:{},
        tetherbalance:'0',
        rwdbalance:'0',
        stakingbalance:'0',
        loading:true
      }
  }
  async loadWeb3(){
    if(window.ethereum){
      window.web3=new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3){
      window.web3=new Web3(window.web3.currentProvider);
    }
    else{
      window.alert('No ethereum browser detected checkout metamask');
    }
  }
  async loadBlockchaindata(){
    const web3=window.web3;
    const accounts=await web3.eth.getAccounts();
    this.setState({account:accounts[0]});
    console.log(accounts[0]);
    const networkid=await web3.eth.net.getId();
    //Check network id
    // console.log(networkid,'Network ID'); 
    //Load Tether contract
    const tetherdata=Tether.networks[networkid];
    if(tetherdata){
      const tether=new web3.eth.Contract(Tether.abi,tetherdata.address);
      this.setState({tether});
      let tetherbalance=await tether.methods.balanceof(this.state.account).call();
      this.setState({tetherbalance:tetherbalance.toString()});
      // console.log({balance:tetherbalance}); 
    }
    else{
      window.alert('Error! Tether contract cannot be deployed-no detected network');
    }
    //Load RWD contract
    const rwddata=RWD.networks[networkid];
    if(rwddata){
      const rwd=new web3.eth.Contract(RWD.abi,rwddata.address);
      this.setState({rwd});
      let rwdbalance=await rwd.methods.balanceof(this.state.account).call();
      this.setState({rwdbalance:rwdbalance.toString()});
      // console.log({balance:rwdbalance}); 
    }
    else{
      window.alert('Error! Reward token cannot be deployed-no detected network');
    }
    //Load Decentralizedbank contract
    const decentralizedbankdata=Decentralizedbank.networks[networkid];
    if(decentralizedbankdata){
      const decentralizedbank=new web3.eth.Contract(Decentralizedbank.abi,decentralizedbankdata.address);
      this.setState({decentralizedbank});
      let stakingbalance=await decentralizedbank.methods.stakingbalance(this.state.account).call();
      this.setState({stakingbalance:stakingbalance.toString()});
      // console.log({stakingbalance:stakingbalance}); 
    }
    else{
      window.alert('Error! Decentralized Bank contract cannot be deployed-no detected network');
    }
    // Loading is set to false as everything is loaded
    this.setState({loading:false})
  }
   //staking tokens function
  stakingtokens=(amount)=>{
    this.setState({loading:true})
    console.log(this.state.tether);
    this.state.tether.methods.approve(this.state.decentralizedbank._address,amount).send({from:this.state.account}).on('transactionHash',(hash)=>{
      this.state.decentralizedbank.methods.deposittokens(amount).send({from:this.state.account}).on('transactionHash',(hash)=>{
        this.setState({loading:false})
      })
    })
  }
  // stakingtokens = (amount) => {
  //   this.setState({loading: true })
  //   this.state.tether.methods.approve(this.state.decentralizedbank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
  //     this.state.decentralizedbank.methods.deposittokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
  //       this.setState({loading:false})
  //     })
  //   }) 
  // }
  //unstaking tokens function
  unstakingtokens=()=>{
    this.setState({loading:true})
    this.state.decentralizedbank.methods.unstaketokens().send({from:this.state.account}).on('transactionHash',(hash)=>{
      this.setState({loading:false})
    })
  }
  render(){
    //This is done to assure that all the contracts are loaded and the application doesnt break 
    let content;
    this.state.loading ? content= <Typography variant='h6' sx={{opacity:'0.9',textAlign:'center',color:'white'}}>
      Loading the contracts please wait.....
    </Typography>
    : content=<Main 
    tetherbalance={this.state.tetherbalance} 
    rwdbalance={this.state.rwdbalance} 
    stakingbalance={this.state.stakingbalance}
    stakingtokens={this.stakingtokens}
    unstakingtokens={this.unstakingtokens}
    />
    
  return (
    <>
    {/* <div className="class1" style={{color:'green',textAlign:'center',fontSize:'30px'}}>
    Hello world
    </div> */}
    <div  className="App" style={{ position: 'relative',height:'1000px' ,width:'100%'}}>
        <div style={{ position: 'absolute'}}>
        <ParticleAnimation/>
        </div>
    <Navbar account={this.state.account}/>
    {/* <Main 
    tetherbalance={this.state.tetherbalance} 
    rwdbalance={this.state.rwdbalance} 
    stakingbalance={this.state.stakingbalance}
    stakingtokens={this.stakingtokens}
    unstakingtokens={this.unstakingtokens}
    /> */}
    {content}
    </div>
    </>
  );
  }
}

export default App;
