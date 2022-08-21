import React from 'react';

const Spent = () => {
    return ( 
        <div className='flex flex-col w-full h-[45%] ml-14 mt-10 bg-slate-100 rounded-xl p-12' >
            <div className='w-full flex flex-row justify-between items-end '>
            <p className='text-xl text-slate-900 font-semibold' >Stream Transactions</p>
            </div>
            <hr className='mt-2 mb-2 border-slate-900' />
            <div className='flex  flex-row w-full h-fit p-3 bg-slate-200 rounded-xl justify-between items-center text-slate-900 mt-2' >
                <label className='text-lg font-medium' >1000 DAI</label>
                <label className='text-lg font-medium' >→</label>
                <label className='text-lg font-medium' >0X1QDEF...DWFEF</label>
                <label className='bg-green-800 text-white px-3 text-md py-1 rounded-xl' >Live</label>
            </div>
            <div className='flex  flex-row w-full h-fit p-3 bg-slate-200 rounded-xl justify-between items-center text-slate-900 mt-2' >
                <label className='text-lg font-medium' >1000 DAI</label>
                <label className='text-lg font-medium' >→</label>
                <label className='text-lg font-medium' >0X1QDEF...DWFEF</label>
                <label className='bg-green-800 text-white px-3 text-md py-1 rounded-xl' >Live</label>
            </div>
        </div>
     );
}
 
export default Spent;