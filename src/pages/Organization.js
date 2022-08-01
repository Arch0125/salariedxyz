import React from 'react';
import { Framework } from '@superfluid-finance/sdk-core';
import UseProvider from '../hooks/GetProvider';
import GetSigner from '../hooks/GetSigner';

const Organization = () => {

    const provider = UseProvider();
    const signer = GetSigner();

    console.log(signer);

    const ApproveDAI = async () => {
        const sf = await Framework.create({
            chainId : 80001,
            provider : provider
        })
    }

    return ( 
        <div className='flex flex-col w-screen h-screen bg-slate-900 items-center justify-center text-white' >
            <div className='flex flex-row w-screen h-fit items-center justify-center' >
                <div className='flex flex-col w-[25%] h-fit p-4 border-white border-2 border-opacity-20 rounded-2xl items-center' >
                    <p className='text-xl font-bold' >Wrap USDC Tokens</p>
                    <input className=' w-full mt-2 bg-opacity-30 bg-slate-600 p-2 rounded-full ' />
                    <button className='mt-5 p-2 bg-white text-slate-900 rounded-2xl w-full ' >Approve USDC spent</button>
                    <button className='mt-2 p-2 bg-white text-slate-900 rounded-2xl w-full ' >Wrap USDC to USDCx and send to Contract</button>
                </div>
            </div>
        </div>
     );
}
 
export default Organization;