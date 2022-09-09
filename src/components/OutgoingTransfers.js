import React, { useEffect } from 'react';
import GetAccount from '../hooks/GetAccount';
  import GetContract from '../hooks/GetContract';
  import { useState } from 'react';
  import LoanVaultABI from '../ABIs/LoanVaultABI.json';

const OutgoingTransfers = () => {

    const account = GetAccount();
    const LoanVault = GetContract('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9',LoanVaultABI);
    const[streams,setStreams]=useState([]);
    const[streamCount1,setStreamCount1]=useState('');
    const[prevAccount,setPrevAccount]=useState('');

    console.log(streams.length);

    var showStream1 = async () => {
        var listcount = await LoanVault.getOutgoingCount();
        listcount = listcount.toString();
        setStreamCount1(listcount);
        setStreams([])
        for(let i=1;i<=listcount;i++){
            var stream = await LoanVault.getOutgoing(i);
            if(account.toString() == stream.sender){
                setStreams((streams)=>[...streams,stream])
            }
        }        
    }

    return ( 
        <div className='flex flex-col w-full h-[45%] ml-14 mt-10 bg-slate-100 rounded-xl p-12' >
            <div className='w-full flex flex-row justify-between items-end '>
            <p className='text-xl text-slate-900 font-semibold' >Outgoing Transfers</p>
            <button className='bg-slate-900 text-white px-3 text-md py-1 rounded-xl' onClick={showStream1} >Refresh</button>
            </div>
            <hr className='mt-2 mb-2 border-slate-900' />
            {streams.length ?
                (Object.keys(streams).map((key)=>{
                    return(
                        <div className='flex  flex-row w-full h-fit p-3 bg-slate-200 rounded-xl justify-between items-center text-slate-900 mt-2 ' >
                            <p className='text-lg text-slate-900 font-semibold'>{((streams[key].amount/1e18)).toFixed(8).toString()} DAI</p>
                            <label className='text-lg font-medium' >→</label>
                        <p className='text-lg text-slate-900 font-semibold'>{(streams[key].recipient).toString().substring(0,8)}...{(streams[key].sender).toString().substring(38)}</p>
                            <label className='bg-green-800 text-white px-3 text-md py-1 rounded-xl' >Completed</label>
                        </div>
                    )
                })
                ):<label>No Outgoing Transfers</label>
            }
        </div>
     );
}
 
export default OutgoingTransfers;