import React from 'react';

const Borrow = () => {
    return ( 
        <div className='flex flex-col w-[80%] h-fit ml-14 bg-slate-100 text-slate-900 roundede-xl p-5 rounded-xl mt-10' >
            <p className='text-xl font-bold ' >Borrow</p>
            <hr className='mt-2'/>
            <p className='text-center mt-2 text-xl' >Congrats! You're eligible for undercollateral loans</p>
            <div className='flex flex-row w-full justify-between px-10 mt-7'>
                <p className='text-lg font-bold text-center ' >Amount Eligible <br/><p className='text-lg font-normal' >520 DAI</p></p>
                <p className='text-lg font-bold text-center ' >Time Period <br/><p className='text-lg font-normal' >2 months</p></p>
            </div>            
            <button className='w-full bg-slate-900 rounded-xl text-white p-2 mt-6' >Claim loan</button>
        </div>

     );
}
 
export default Borrow;