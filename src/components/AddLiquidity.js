import React from 'react';

const AddLiquidity = () => {
    return ( 
        <div className='flex flex-col w-[30%] bg-white p-6 rounded-2xl'  >
            <input className='p-2 bg-slate-100 w-[100%] rounded-xl px-2 ' placeholder={"Enter DAI Amount"} />
            <label className='text-slate-900 font-normal mt-2' >Shares to be minted : --</label>
            <button className='w-full h-fit p-2 mt-2 bg-slate-900 text-white rounded-xl' >Add Liquidity</button>
        </div>
     );
}
 
export default AddLiquidity;