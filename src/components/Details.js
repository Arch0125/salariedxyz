import React, { useEffect } from 'react';
import GetAccount from '../hooks/GetAccount';
import LoanVaultABI from '../ABIs/LoanVaultABI.json';
import GetContract from '../hooks/GetContract';
import { useState } from 'react';


const Details = () => {
    
    const[daoname,setDaoname]=useState('');
    const LoanVault = GetContract('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9',LoanVaultABI);
    const account = GetAccount();

    const setName = async()=>{
        const name = await LoanVault.registerDAO(daoname);
        setDaoname(name);
    }

    return ( 
        <div className='flex flex-row w-full h-fit justify-between mt-14' >
            <div className='flex flex-col bg-white w-[48%] h-fit p-5 text-slate-900 rounded-xl' >
                <p className='text-xl font-bold ' >Edit Details</p>
                <hr className='mt-2 mb-2 border-slate-900' />
                <p className='font-medium mt-2  '>Name : <input className='p-1 bg-slate-100 w-[90%] rounded-xl px-2 ' onChange={(e)=>setDaoname(e.target.value)} /></p>
                <p className='font-medium mt-2  '>Stream Admin : <input className='p-1 bg-slate-100 w-[80%] rounded-xl px-2 ' /></p>
                <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' onClick={()=>setName()} >Save</button>
            </div>
            <div className='flex flex-col bg-white w-[45%] rounded-xl p-5 h-fit overflow-scroll' >
                <div className='flex flex-row w-full justify-between' >
                <p className='text-xl text-slate-900 font-bold' >Address Book</p>
                <button className='h-fit w-fit px-2 py-1 text-sm bg-black text-white rounded-md' >+ Add Member</button>
                </div>
                <hr className='mt-2 border-slate-900' />
                <div className='flex flex-row w-full h-fit p-3 bg-slate-100 my-2 rounded-xl text-black justify-between items-center' >
                    <label>0xA45DF...3ER4D</label>
                    <label>DevRel</label>
                    <button className='h-fit w-fit px-2 py-1 text-sm bg-black text-white rounded-md' >Stream</button>
                </div>
                <div className='flex flex-row w-full h-fit p-3 bg-slate-100 my-2 rounded-xl text-black justify-between items-center' >
                    <label>0xC5D3Q...81TRV</label>
                    <label>Community Mgnr.</label>
                    <button className='h-fit w-fit px-2 py-1 text-sm bg-black text-white rounded-md' >Stream</button>
                </div>
            </div>
        </div>
     );
}
 
export default Details;