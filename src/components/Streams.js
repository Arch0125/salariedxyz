import React, { useEffect } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
  } from '@chakra-ui/react'
  import GetAccount from '../hooks/GetAccount';
  import GetContract from '../hooks/GetContract';
  import LoanVaultABI from '../ABIs/LoanVaultABI.json';
import { Contract, ethers } from 'ethers';
  

const Streams = () => {

    const[duration,setDuration]=React.useState('');
    const[token,setToken]=React.useState('Choose Token');
    const[recipient,setRecipient]=React.useState('');
    const[amount,setAmount]=React.useState('');
    const[rate,setRate]=React.useState(0);
    const[streams,setStreams]=React.useState([]);
    const account = GetAccount();
    const LoanVault = GetContract('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9',LoanVaultABI);

    var time = (((new Date()).getTime()).toString().slice(0, -3));

    const addStream = async () => {
        const tx = await LoanVault.createStream(account.toString(),ethers.utils.getAddress(recipient),'0xE562db698CcE116169813d531e8C03A23276315c',amount,time,duration);
        console.log(tx);
    }

    var showStream = async () => {
        var listcount = await LoanVault.getCount();
        listcount = listcount.toString();
        setStreams([]);
        for(let i=1;i<=listcount;i++){
            var stream = await LoanVault.getStream(i);
            if(account.toString() == stream.sender){
                setStreams((streams)=>[...streams,stream])
            }
        }
        console.log(streams);
        showStream=function(){};
    }
    

    return ( 
        <div className='flex flex-row w-full h-fit justify-between ' >
            <div className='flex flex-col bg-white w-[48%] h-fit p-5 text-slate-900 rounded-xl' >
                <p className='text-xl font-bold' >Create new stream</p>
                <hr className='mt-2 mb-2' />
                <p className='text-lg font-medium'  >Recipient Address</p>
                <input className='text-black p-2 rounded-xl bg-slate-200' onChange={(e)=>setRecipient(e.target.value)} />
                <p className='text-lg font-medium' >Amount</p>
                <input className='text-black p-2 rounded-xl bg-slate-200' onChange={(e)=>{setAmount(e.target.value);setRate(e.target.value / (duration * 2629743))}}  />
                <div className='flex flex-row justify-between mt-4' >
                <Menu>
                <MenuButton as={Button} width={'33%'} paddingX={"50px"} >
                    {(duration)?<label>{duration} Months</label>:<label>Duration</label>}
                    
                </MenuButton>
                <MenuList onChange={(e)=>{setAmount(e.target.value);setRate(e.target.value / (duration * 2629743))}} >
                    <MenuItem onClick={(e)=>setDuration('1')} >1 Month</MenuItem>
                    <MenuItem onClick={(e)=>setDuration('2')} >2 Months</MenuItem>
                    <MenuItem onClick={(e)=>setDuration('3')} >3 Months</MenuItem>
                </MenuList>
                </Menu>
                <Menu>
                <MenuButton as={Button} width={'30%'} >
                    <label>{token}</label>
                    
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>setToken('DAI')} ><img src='https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=023' className='w-5 mr-2 mt-1'  />DAI</MenuItem>
                    <MenuItem onClick={()=>setToken('USDC')}><img src='https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=023' className='w-5 mr-2 mt-1'  />USDC</MenuItem>
                    <MenuItem onClick={()=>setToken('MATIC')}><img src='https://cryptologos.cc/logos/polygon-matic-logo.svg?v=023' className='w-5 mr-2 mt-1' />MATIC</MenuItem>
                </MenuList>
                </Menu>
                <div className='flex flex-row items-center justify-center bg-slate-200 text-md font-semibold rounded-md w-[30%]' >{
                    rate===0?<p>Stream Rate</p>:<p>{(rate).toFixed(8)} DAI/s</p>
                }</div>
                </div>
                <button className='flex w-full h-fit items-center justify-center bg-slate-900 text-white py-2 mt-3 rounded-xl' onClick={()=>addStream()} >Create Stream</button>
            </div>
            <div className='flex flex-col bg-white w-[45%] rounded-xl p-5 h-fit overflow-scroll' >
                <p className='text-xl text-slate-900 font-bold' >Current Streams</p>
                <button className='flex w-full h-fit items-center justify-center bg-slate-900 text-white py-2 mt-3 rounded-xl' onClick={()=>showStream()} >Show Streams</button>
                <hr className='mt-2 border-slate-900' />
                {Object.keys(streams).map((stream,index)=>(
                    <div className='flex flex-row w-full h-fit p-3 bg-slate-100 my-2 rounded-xl text-black justify-between items-center' >
                        <label>{(streams[index].recipient).toString().substring(0,8)}...{(streams[index].recipient).toString().substring(38)}</label>
                        <label>{(streams[index].amount).toString()} DAI</label>
                        <button className='h-fit w-fit p-2 bg-black text-white rounded-md' >Edit</button>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Streams;