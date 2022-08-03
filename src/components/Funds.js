import React from 'react';

const Funds = () => {
    return ( 
        <div className='flex flex-row justify-between w-full h-fit mt-14' >
            <div className='flex flex-col w-[65%] h-full bg-white p-5 rounded-2xl text-slate-900' >
                <p className='text-xl font-bold ' >Welcome to Add Funds Portal</p>
                <p className='text-lg font-medium' >Be careful while transfering funds to the vault. Keep these points in mind :</p>
                <hr  className='mt-2' />
                <p  className='text-xl font-semibold mt-3'>👉 Funds are locked in the contract and cannot be withdrawn </p>
                <p  className='text-xl font-semibold mt-3'>👉 Currently we support only USDC,DAI and MATIC on Polygon Testnet</p>
                <p  className='text-xl font-semibold mt-3'>👉 Contracts are unaudited, use at your own risk</p>

            </div>
            <div className='flex flex-col w-[30%] h-full bg-white text-slate-900 p-5 rounded-xl' >
                <p className='text-xl font-bold ' >Add DAI to funds</p>
                <hr className='mt-2' />
                <input className='w-full p-2 border-slate-900 border-2 border-opacity-25 rounded-2xl' />
                <button className='w-full h-fit p-2 bg-slate-900 text-white font-semibold mt-2 rounded-xl' >Approve DAI spent</button>
                <button className='w-full h-fit p-2 bg-slate-900 text-white font-semibold mt-2 rounded-xl' >Add Funds</button>
            </div>
        </div>
     );
}
 
export default Funds;