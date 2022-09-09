import React, { useEffect,useState } from 'react';
import AddLiquidity from './AddLiquidity';
import RemoveLiquidity from './RemoveLiquidity';
import GetContract from '../hooks/GetContract';
import LoanVaultABI from '../ABIs/LoanVaultABI.json';
import { ethers } from 'ethers';

const PoolDetails = () => {

    const LoanVault = GetContract('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9',LoanVaultABI);
    const[poolbal,setPoolbal]=useState('');
    const[shares,setShares]=useState('');
    const[lprate,setLprate]=useState('');

    useEffect(()=>{
        getBalance();
    })

    const getBalance=async()=>{
        var bal = await LoanVault.getPoolBalance('0');
        bal = bal.toString();
        setPoolbal((bal/1e18).toFixed(5));
        console.log(poolbal)
    }

    const getLP=async()=>{
        var lp = await LoanVault.getLpstream();
        var lrate = lp[0].toString();
        setLprate(lrate);
    }

    getLP();
    
    return ( 
        <div className='flex flex-col w-[90%] h-fit p-6 bg-white rounded-2xl mb-14 ' >
            <p className='text-2xl font-bold text-slate-900' >Pool Details</p>
            <hr className='mt-2 mb-2 border-slate-900' />
            <div className='flex flex-row w-full h-fit' >
                <div className='flex flex-col w-[30%] h-full text-xl items-center justify-center' >
                    <label className='text-slate-900 font-bold' >Token : <label className='font-normal'>DAI</label> </label>
                    <label className='text-slate-900 font-bold' >Total Balance : <label className='font-normal'>{poolbal}</label> </label>
                    <label className='text-slate-900 font-bold' >Incoming Repayments : <label className='font-normal'>{lprate}</label> </label>
                    <label className='text-slate-900 font-bold' >Shares Owned : <label className='font-normal'>--</label> </label>
                </div>
                <AddLiquidity/>
                <RemoveLiquidity/>
            </div>
        </div>
     );
}
 
export default PoolDetails;