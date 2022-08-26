import React from 'react';

const RemoveLiquidity = () => {
    return ( 
        <div className='flex flex-col w-[30%] bg-white p-6 rounded-2xl'  >
            <div className='flex flex-row' >
                <input className=' bg-slate-100 w-[100%] rounded-l-xl px-2 ' placeholder={"Enter Shares"} />
                <button className='h-fit p-2 bg-slate-900 text-white rounded-r-xl' >MAX</button>
            </div>
            <label className='text-slate-900 font-normal mt-2' >Estimated amount in DAI : --</label>
            <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' >Remove Liquidity</button>
        </div>
     );
}
 
export default RemoveLiquidity;