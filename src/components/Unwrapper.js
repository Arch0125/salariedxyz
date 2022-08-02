import React from 'react';
import { Framework } from '@superfluid-finance/sdk-core';
import UseProvider from '../hooks/GetProvider';
import GetSigner from '../hooks/GetSigner';
import GetAccount from '../hooks/GetAccount';
import { useState } from 'react';
import GetContract from '../hooks/GetContract';
import { DAIaddr } from '../common';
import { daiABI } from '../contracts/artifacts/contracts/DAI.sol/DAI';
import { ethers } from 'ethers';

const Unwrapper = () => {

    const provider = UseProvider();
    const signer = GetSigner();
    const account = GetAccount();

    console.log(account);

    const[wrapamt, setWrapAmt] = React.useState('');
    
    const DAI = GetContract(DAIaddr, daiABI);

    console.log(DAI);

    const wrapDAI = async () => {

      const sf = await Framework.create({
        chainId:80001,
        provider:provider,
      })

      console.log(sf)
      const DAIx = await sf.loadSuperToken("0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f");

      try {
        console.log(`Downgrading ${wrapamt} fDAIx...`);
        const amtToDowngrade = ethers.utils.parseEther(wrapamt);
        const downgradeOperation = DAIx.downgrade({
          amount: amtToDowngrade
        });
        const downgradeTxn = await downgradeOperation.exec(signer);
        await downgradeTxn.wait().then(function (tx) {
          console.log(
            `
            Congrats - you've just downgraded DAIx to DAI!
          `
          );
        });
      } catch (error) {
        console.error(error);
      }

    }


    return ( 
                <div className='flex flex-col w-[25%] h-full p-4 border-white border-2 border-opacity-20 rounded-2xl items-center mx-3' >
                    <p className='text-xl font-bold' >Unwrap DAI Tokens</p>
                    <input className=' w-full mt-2 bg-opacity-30 bg-slate-600 p-2 rounded-full ' onChange={(e)=>setWrapAmt(e.target.value)} />
                    <button className='mt-5 p-2 bg-white text-slate-900 rounded-2xl w-full ' onClick={()=>wrapDAI()} >Wrap DAI to DAIx and send to Contract</button>
                </div>
     );
}
 
export default Unwrapper;