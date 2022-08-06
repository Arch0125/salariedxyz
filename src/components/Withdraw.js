import React from 'react';

const Withdraw = () => {
    return ( 
        <div className='flex flex-col w-[80%] h-fit ml-14 bg-slate-100 text-slate-900 roundede-xl p-5 rounded-xl ' >
            <p className='text-xl font-bold ' >Withdraw Funds</p>
            <hr className='mt-2'/>
            <button className='w-full bg-slate-900 rounded-xl text-white p-2 mt-6' >Withdraw Full</button>      
            <hr className='' />      
        </div>

     );
}
 
export default Withdraw;