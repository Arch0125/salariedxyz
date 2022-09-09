import React, { useEffect } from 'react';
import { useState } from 'react';
import Funds from './Funds';
import Streams from './Streams';
import Details from './Details';
import GetAccount from '../hooks/GetAccount';
import GetContract from '../hooks/GetContract';
import { daiABI } from './DAIABI';
import LoanVaultABI from '../ABIs/LoanVaultABI.json';

const Dashboard = () => {

    const[choice,setChoice]=useState(3);
    const[bal,setBal]=useState('');
    const[daoname,setDaoName]=useState('');
    const[streamCount,setStreamCount]=useState('');
    const[admin,setAdmin]=useState('');
    const account = GetAccount();
    const DAI = GetContract('0xE562db698CcE116169813d531e8C03A23276315c',daiABI);
    const LoanVault = GetContract('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9',LoanVaultABI);


    const checkBalance = async () => {
        const balance = await LoanVault.getFund(account);
        setBal(balance.toString());
        console.log(balance);
    }

    const getName = async()=>{
        const orgname = await LoanVault.getName();
        console.log(orgname);
        setDaoName(orgname);
    }

    const getAdmin = async()=>{
        const orgadmin = await LoanVault.getAdmin();
        console.log(orgadmin);
        setAdmin(orgadmin);
    }

    const getstreamCount=async()=>{
        const count = await LoanVault.getOrgCount(account);
        setStreamCount(count.toString());
        console.log(count);
    }

    checkBalance();
    getName();
    getstreamCount();
    getAdmin();


    return ( 
        <div className='flex flex-col w-screen h-screen justify-center items-center' >
        <div className='flex flex-col w-[80%] bg-white rounded-xl h-fit p-4 text-slate-900 '  >
            <p className='text-xl font-bold ' >Organization & DAO Details</p>
            
        </div>
        <div className='flex flex-row w-[80%] h-fit justify-between mt-5' >
            <div className='flex flex-col w-[30%] bg-white rounded-xl h-full p-5 text-slate-900 '>
                <p className='text-xl font-semibold' >DAO/Organization Info</p>
                <hr className='mt-2' />
                <p className='font-medium mt-2'>Name : {daoname}</p>
                <p className='font-medium'>Stream Admin : {((admin).toString()).slice(0,7)}...{((admin).toString()).slice(38)}</p>
                <p className='font-medium'>Members Streamed : </p>
                <hr className='mt-2' />
                <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' onClick={()=>setChoice(1)} >Edit Details</button>
            </div>
            <div className='flex flex-col w-[30%] bg-white rounded-xl h-full p-5 text-slate-900 '>
                <p className='text-xl font-semibold' >Treasury</p>
                <hr className='mt-2' />
                <p className='font-medium mt-2'>USDC : --</p>
                <p className='font-medium'>DAI : {bal.slice(0,-18)}</p>
                <p className='font-medium'>MATIC : --</p>
                <hr className='mt-2' />
                <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' onClick={()=>setChoice(2)} >Add Funds</button>
            </div>
            <div className='flex flex-col w-[30%] bg-white rounded-xl h-full p-5 text-slate-900 '>
                <p className='text-xl font-semibold' >Streams Info</p>
                <hr className='mt-2' />
                <p className='font-medium mt-2'>Total Streams : {streamCount}</p>
                <p className='font-medium'>Ongoing Streams : --</p>
                <p className='font-medium'>Finished Streams : --</p>
                <hr className='mt-2' />
                <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' onClick={()=>setChoice(3)} >History Book</button>
            </div>
        </div>
        <div className='flex flex-row w-[80%] h-fit justify-between mt-5' >
        {
            choice===0?<p className='mt-14 text-3xl font-bold'>Click on any button to get started</p>:choice===1?<Details/>:choice===2?<Funds/>:<Streams/>
        }
        </div>
        </div>
     );
}
 
export default Dashboard;