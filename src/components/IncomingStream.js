import React from 'react';

const IncomingStream = () => {
    return ( 
        <div className='flex flex-col w-[60%] h-[45%] ml-14 mt-10 bg-slate-100 rounded-xl p-12' >
            <div className='w-full flex flex-row justify-between items-end '>
            <p className='text-xl text-slate-900 font-semibold' >Incoming streams</p>
            </div>
            <hr className='mt-2 mb-2 border-slate-900' />
            <table className='w-full border-collapse border-slate-900'>
                <thead className='bg-slate-200  ' >
                    <tr className='p-3' >
                        <th className='text-lg font-normal' >Stream Admin</th>
                        <th className='text-lg font-normal' >Stream Status</th>
                        <th className='text-lg font-normal' >Stream Date</th>
                        <th className='text-lg font-normal' >Stream Amount</th>
                    </tr>
                </thead>
            </table>
        </div>
     );
}
 
export default IncomingStream;