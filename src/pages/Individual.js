import React from 'react';
import IncomingStream from '../components/IncomingStream';
import Spent from '../components/Spent';

const Individual = () => {
    return ( 
        <div className='flex flex-row w-screen h-screen items-center bg-slate-900' >
            <div className='flex flex-col w-full' >
            <IncomingStream/>
            <Spent/>
            </div>
        </div>
     );
}
 
export default Individual;