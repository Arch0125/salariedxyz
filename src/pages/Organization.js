import React from 'react';
import { Framework } from '@superfluid-finance/sdk-core';
import UseProvider from '../hooks/GetProvider';
import GetSigner from '../hooks/GetSigner';
import GetAccount from '../hooks/GetAccount';
import { useState } from 'react';
import GetContract from '../hooks/GetContract';
import { DAIaddr } from '../common';
import { ethers } from 'ethers';
import Dashboard from '../components/Dashboard';

const Organization = () => {

    const provider = UseProvider();
    const signer = GetSigner();
    const account = GetAccount();


    return ( 
        <div className='flex flex-col w-screen h-screen bg-hero items-center justify-center text-white' >
            <Dashboard/>
        </div>
     );
}
 
export default Organization;