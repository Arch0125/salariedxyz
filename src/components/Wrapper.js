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

const Wrapper = () => {

    const provider = UseProvider();
    const signer = GetSigner();
    const account = GetAccount();

    console.log(account);

    const[wrapamt, setWrapAmt] = React.useState('');
    
    const DAI = GetContract(DAIaddr, daiABI);

    console.log(DAI);

    const approveDAI = async () => {
      try{
        await DAI.approve('0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f', ethers.utils.parseEther(wrapamt));
      }catch(err){
        console.log(err);
      }
    }

    const wrapDAI = async () => {

      const sf = await Framework.create({
        chainId:80001,
        provider:provider,
      })

      console.log(sf)
      const DAIx = await sf.loadSuperToken("fDAIx");

      try {
        console.log(`upgrading $${wrapamt} DAI to DAIx`);
        const amtToUpgrade = ethers.utils.parseEther(wrapamt);
        const upgradeOperation = DAIx.upgrade({
          amount: amtToUpgrade
        });
        const upgradeTxn = await upgradeOperation.exec(signer);
        await upgradeTxn.wait().then(function (tx) {
          console.log(
            `
            Congrats - you've just upgraded DAI to DAIx!
          `
          );
        });
      } catch (error) {
        console.error(error);
      }

    }


    return ( 
                <div className='flex flex-col w-[25%] h-fit p-4 border-white border-2 border-opacity-20 rounded-2xl items-center mx-3' >
                    <p className='text-xl font-bold' >Wrap DAI Tokens</p>
                    <input className=' w-full mt-2 bg-opacity-30 bg-slate-600 p-2 rounded-full ' onChange={(e)=>setWrapAmt(e.target.value)} />
                    <button className='mt-5 p-2 bg-white text-slate-900 rounded-2xl w-full ' onClick={()=>approveDAI()} >Approve DAI spent</button>
                    <button className='mt-2 p-2 bg-white text-slate-900 rounded-2xl w-full ' onClick={()=>wrapDAI()} >Wrap DAI to DAIx and send to Contract</button>
                </div>
     );
}
 
export default Wrapper;