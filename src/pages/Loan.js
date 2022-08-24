import React from 'react';
import Borrow from '../components/Borrow';

const Loan = () => {
    return ( 
        <div className='flex flex-col bg-slate-900 h-screen w-screen  items-center justify-center' >
            <div className='flex flex-row w-[90%] h-fit justify-between' >
                <Borrow/>
                <div className='flex flex-col w-[40%] bg-white p-6' >
                </div>
            </div>
        </div>
     );
}
 
export default Loan;