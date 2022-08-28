import React from 'react';
import { SBTabi } from './SBTABI';
import GetContract from '../hooks/GetContract';
import { ethers } from 'ethers';
import LoanVaultABI from '../ABIs/LoanVaultABI.json'

const MintDAO = () => {

    const[id,setId]=React.useState('');
    const[daoname,setDaoname]=React.useState('');   

    const SBT = GetContract('0x83843047A53edEc47A42e3BaC427FA01390C2c2f', SBTabi);
    const LoanVault = GetContract('0x212B73ca2774A2f271fE4DA4F2F25973ed2DC516',LoanVaultABI);

    const mintsbt = async(id)=>{
        console.log(id)
        var tx = await SBT.mint(id);
        setName();
        console.log(tx);
    }

    const setName = async()=>{
        const name = await LoanVault.registerDAO(daoname);
        setDaoname(name);
    }

    return ( 
        <div className='flex flex-col w-screen h-screen bg-hero items-center justify-center ' >
            <div className='flex flex-col w-fit h-fit p-6 items-center justify-center text-white rounded-2xl border-2 border-opacity-20' >
                <label className='text-3xl font-bold' >Onboard your Compay with SOUL BOUND TOKENS</label>
                <br/>
                <label className='text-2xl text-center' >Unique identity for Everyone</label>
                <hr/>
                <input  className='w-full h-fit mt-6 bg-transparent border-2 border-opacity-10 rounded-xl p-3  ' placeholder='Company Name' onChange={(e)=>setDaoname(e.target.value)} />
                <input  className='w-full h-fit mt-6 bg-transparent border-2 border-opacity-10 rounded-xl p-3  ' placeholder='Stream Admin' />
                <input className='w-full h-fit mt-6 bg-transparent border-2 border-opacity-10 rounded-xl p-3  ' placeholder='Add Token ID' onChange={(e)=>setId(e.target.value)} />
                <button className='w-full h-fit mt-6 bg-white text-slate-900 rounded-xl p-3' onClick={()=>mintsbt(id)} >Mint SBT</button>
            </div>
        </div>
     );
}
 
export default MintDAO;