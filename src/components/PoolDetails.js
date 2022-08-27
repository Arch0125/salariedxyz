import React, { useEffect,useState } from 'react';
import AddLiquidity from './AddLiquidity';
import RemoveLiquidity from './RemoveLiquidity';
import GetContract from '../hooks/GetContract';
import LoanVaultABI from '../ABIs/LoanVaultABI.json';
import { ethers } from 'ethers';

const PoolDetails = () => {

    const LoanVault = GetContract('0xE5EF226f9b8Aebdd7678166c35BedF3F9ffcFc38',LoanVaultABI);
    const[poolbal,setPoolbal]=useState('');
    const[shares,setShares]=useState('');

    useEffect(()=>{
        getBalance();
    })

    const getBalance=async()=>{
        var bal = await LoanVault.getPoolBalance('0');
        bal = bal.toString();
        setPoolbal((bal/1e18).toFixed(5));
        console.log(poolbal)
    }
    
    return ( 
        <div className='flex flex-col w-[90%] h-fit p-6 bg-white rounded-2xl mb-14 ' >
            <p className='text-2xl font-bold text-slate-900' >Pool Details</p>
            <hr className='mt-2 mb-2 border-slate-900' />
            <div className='flex flex-row w-full h-fit' >
                <div className='flex flex-col w-[30%] h-full text-xl items-center justify-center' >
                    <label className='text-slate-900 font-bold' >Token : <label className='font-normal'>DAI</label> </label>
                    <label className='text-slate-900 font-bold' >Total Balance : <label className='font-normal'>{poolbal}</label> </label>
                    <label className='text-slate-900 font-bold' >Shares Owned : <label className='font-normal'>--</label> </label>
                </div>
                <AddLiquidity/>
                <RemoveLiquidity/>
            </div>
        </div>
     );
}
 
export default PoolDetails;