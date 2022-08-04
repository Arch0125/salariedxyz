import React from 'react';
import { useState } from 'react';
import Funds from './Funds';
import Streams from './Streams';

const Dashboard = () => {

    const[choice,setChoice]=useState(3);

    return ( 
        <>
        <div className='flex flex-col w-[80%] bg-white rounded-xl h-fit p-5 text-slate-900 '  >
            <p className='text-xl font-bold ' >Organization & DAO Details</p>
            
        </div>
        <div className='flex flex-row w-[80%] h-fit justify-between mt-5' >
            <div className='flex flex-col w-[30%] bg-white rounded-xl h-full p-5 text-slate-900 '>
                <p className='text-xl font-semibold' >DAO/Organization Info</p>
                <hr className='mt-2' />
                <p className='font-medium mt-2'>Name : </p>
                <p className='font-medium'>Stream Admin : </p>
                <p className='font-medium'>Members Streamed : </p>
                <hr className='mt-2' />
                <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' onClick={()=>setChoice(1)} >Edit Details</button>
            </div>
            <div className='flex flex-col w-[30%] bg-white rounded-xl h-full p-5 text-slate-900 '>
                <p className='text-xl font-semibold' >Total Value Locked</p>
                <hr className='mt-2' />
                <p className='font-medium mt-2'>USDC : 10000</p>
                <p className='font-medium'>DAI : 5000</p>
                <p className='font-medium'>MATIC : 5000</p>
                <hr className='mt-2' />
                <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' onClick={()=>setChoice(2)} >Add Funds</button>
            </div>
            <div className='flex flex-col w-[30%] bg-white rounded-xl h-full p-5 text-slate-900 '>
                <p className='text-xl font-semibold' >Streams Info</p>
                <hr className='mt-2' />
                <p className='font-medium mt-2'>Total Streams : 12</p>
                <p className='font-medium'>Ongoing Streams : 8</p>
                <p className='font-medium'>Finished Streams : 8</p>
                <hr className='mt-2' />
                <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' onClick={()=>setChoice(3)} >History Book</button>
            </div>
        </div>
        <div className='flex flex-row w-[80%] h-fit justify-between mt-5' >
        {
            choice===0?<p className='mt-14 text-3xl font-bold'>Click on any button to get started</p>:choice===1?<p>DAO Info</p>:choice===2?<Funds/>:<Streams/>
        }
        </div>
        </>
     );
}
 
export default Dashboard;