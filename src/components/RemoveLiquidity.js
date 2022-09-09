import React from 'react';
import LoanVaultABI from '../ABIs/LoanVaultABI.json';
import { useState } from 'react';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import GetContract from '../hooks/GetContract';
import GetAccount from '../hooks/GetAccount';
import { daiABI } from './DAIABI.js';

const RemoveLiquidity = () => {

    const[withdrawamt,setWithdrawamt]=useState('');
    const[share,setShare]=useState('');

    const LoanVault = GetContract('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9', LoanVaultABI);

    const removeLiquidity = async()=>{
        var shares = await LoanVault.getShare('0');
        var tx = await LoanVault.removeLiquidity('0',shares);
        console.log(tx);
    }

    const getShare=async()=>{
        var share = await LoanVault.getShare('0');
        share = share.toString();
        console.log(share)
        setShare(share);
    }

    return ( 
        <div className='flex flex-col w-[30%] bg-white p-6 rounded-2xl'  >
            <div className='flex flex-row' >
                <input className=' bg-slate-100 w-[100%] rounded-l-xl px-2 ' placeholder={"Enter Shares"} onChange={(e)=>setShare(e.target.value)} />
                <button className='h-fit p-2 bg-slate-900 text-white rounded-r-xl' >MAX</button>
            </div>
            <label className='text-slate-900 font-normal mt-2' >Estimated amount in DAI : {withdrawamt}</label>
            <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' onChange={()=>removeLiquidity(share)} >Remove Liquidity</button>
        </div>
     );
}
 
export default RemoveLiquidity;