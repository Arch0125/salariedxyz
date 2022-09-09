import React from 'react';
import GetAccount from '../hooks/GetAccount';
import GetContract from '../hooks/GetContract';
import LoanVaultABI from '../ABIs/LoanVaultABI.json';
import { useState } from 'react';
import { useEffect } from 'react';
import { ethers } from 'ethers';
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

const Borrow = () => {

    const LoanVault = GetContract('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9',LoanVaultABI);
    const[streamid,setStreamid]=useState([]);
    const[streamCount,setStreamCount]=useState('');
    const[prevAccount,setPrevAccount]=useState('');
    const[amount,setAmount]=useState('');
    const[withdrawamt,setWithdrawamt]=useState('0');
    const[date,setDate]=useState('');
    const[sid,setSid]=useState('');
    const account = GetAccount();
    const[lprate,setLprate]=useState('');

    var showStream = async () => {
        setPrevAccount(account);
        var listcount = await LoanVault.getCount();
        listcount = listcount.toString();
        setStreamCount(listcount);
        setStreamid([])
        for(let i=1;i<=listcount;i++){
            var stream = await LoanVault.getStream(i);
            if(account.toString() == stream.recipient){
                setStreamid((ids)=>[...ids,i]);
            }
        }        
    }

    const getLP=async()=>{
        var lp = await LoanVault.getLpstream();
        var lrate = lp[0].toString();
        setLprate(lrate);
    }

    // const getAmount=async(id)=>{
    //     console.log(id);
    //     var amount = await LoanVault.getStreamBalance(id);
    //     amount = amount.toString();
    //     console.log(amount.toString());
    //     setAmount((amount/1e18).toFixed(5));
    //     setDate(Date().toLocaleString())
    // }

    getLP();

    const getTotalAmount=async(id)=>{
        var stream = await LoanVault.getStream(id);
        var total = stream.amount;
        var duration = stream.months;
        duration = duration.toString();
        total = total.toString();
        setDate(Date().toLocaleString())
        setAmount(total/duration);
    }

    const getLoan=async(sid,withdrawamt)=>{
        const tx = await LoanVault.getAdvance(sid,withdrawamt.toString());
        console.log(tx);
    }

    return ( 
        <div className='flex flex-col w-[90%] h-fit ml-[80px] bg-slate-100 text-slate-900 roundede-xl p-5 rounded-xl ' >
            <p className='text-xl font-bold ' >Borrow against Future Stream</p>
            <hr className='mt-2'/>

            <Menu>
                <MenuButton as={Button} onClick={showStream} >
                   {sid?<label>Stream ID {sid}</label> :<label>Select Stream</label>}
                    
                </MenuButton>
                <MenuList>
                {
                streamid.map(id =>
                        <MenuItem onClick={()=>getTotalAmount(id)} onClickCapture={()=>setSid(id)} >{id}</MenuItem>
                )
            }
                    
                </MenuList>
            </Menu>
            
            <p className='text-lg' >Max Loan Amount : {amount}</p>
            <p className='text-lg' > At Date & Time : {date}</p>
            <div className='flex flex-row w-full h-fit items-center justify-center mt-6' >
            <input className='w-full h-fit p-2 rounded-l-xl' type={"number"}  onChange={(e)=>setWithdrawamt(e.target.value)} placeholder={withdrawamt} value={withdrawamt} />
            <button className='flex h-full p-2 items-center justify-center bg-slate-900 text-white rounded-r-xl' onClick={()=>setWithdrawamt(amount)} >MAX</button>
            </div>
            <button className='w-full bg-slate-900 rounded-xl text-white p-2 mt-2' onClick={()=>getLoan(sid,withdrawamt)} >Approve Loan</button>  
            <hr className='' />      
        </div>

     );
}
 
export default Borrow;