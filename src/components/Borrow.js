import React from 'react';

const Borrow = () => {
    return ( 
        <div className='flex flex-col w-[40%] bg-white p-6 rounded-2xl' >
            <p className='text-2xl font-bold text-slate-900' >Borrow</p>
            <hr className='mt-2 mb-2 border-slate-900' />
            <input className='p-1 bg-slate-100 w-[100%] rounded-xl px-2 ' placeholder={"Borrow Amount"} />
        </div>

     );
}
 
export default Borrow;