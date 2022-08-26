import React from 'react';
import AddLiquidity from './AddLiquidity';
import RemoveLiquidity from './RemoveLiquidity';

const PoolDetails = () => {
    return ( 
        <div className='flex flex-col w-[90%] h-fit p-6 bg-white rounded-2xl mb-14 ' >
            <p className='text-2xl font-bold text-slate-900' >Pool Details</p>
            <hr className='mt-2 mb-2 border-slate-900' />
            <div className='flex flex-row w-full h-fit' >
                <div className='flex flex-col w-[30%] h-full items-center justify-center' >
                    <label className='text-slate-900 font-bold' >Token : DAI</label>
                    <label className='text-slate-900 font-bold' >Total Supply : 1000</label>
                    <label className='text-slate-900 font-bold' >Shares Owned : --</label>
                </div>
                <AddLiquidity/>
                <RemoveLiquidity/>
            </div>
        </div>
     );
}
 
export default PoolDetails;