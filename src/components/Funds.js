import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
  } from '@chakra-ui/react'
import { useState } from 'react';
import {tokens} from '../tokens.js'
import GetContract from '../hooks/GetContract.js';
import { daiABI } from './DAIABI.js';
import GetAccount from '../hooks/GetAccount.js';
import LoanVaultABI from '../ABIs/LoanVaultABI.json';
import { ethers } from 'ethers';

const Funds = () => {

    const account = GetAccount();

    var BigNumber = require('big-number');

    const[token,setToken]=useState('Choose Token');
    const[amount,setAmount]=useState('');
    const DAI = GetContract('0xE562db698CcE116169813d531e8C03A23276315c',daiABI);
    const LoanVault = GetContract('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9',LoanVaultABI);

    const approve = async () => {
        await DAI.approve('0x0b7Bc2Edb26059315d185cE9d23bf72d2ee13EA9',ethers.utils.parseEther(amount));
    }

    const addfunds = async () => {
        await LoanVault.addFund(amount);
    }

    return ( 
        <div className='flex flex-row justify-between w-full h-fit mt-14' >
            <div className='flex flex-col w-[65%] h-full bg-white p-5 rounded-2xl text-slate-900' >
                <p className='text-xl font-bold ' >Welcome to Add Funds Portal</p>
                <p className='text-lg font-medium' >Be careful while transfering funds to the vault. Keep these points in mind :</p>
                <hr  className='mt-2' />
                <p  className='text-xl font-semibold mt-3'>👉 Funds are locked in the contract and cannot be withdrawn </p>
                <p  className='text-xl font-semibold mt-3'>👉 Currently we support only USDC,DAI and MATIC on Polygon Testnet</p>
                <p  className='text-xl font-semibold mt-3'>👉 Contracts are unaudited, use at your own risk</p>

            </div>
            <div className='flex flex-col w-[30%] h-full bg-white text-slate-900 p-5 rounded-xl' >
                {/* <p className='text-xl font-bold ' >Add DAI to funds</p> */}
                <Menu>
                <MenuButton as={Button} >
                    <label>{token}</label>
                    
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>setToken('DAI')} ><img src='https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=023' className='w-5 mr-2 mt-1'  />DAI</MenuItem>
                    <MenuItem onClick={()=>setToken('USDC')}><img src='https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=023' className='w-5 mr-2 mt-1'  />USDC</MenuItem>
                    <MenuItem onClick={()=>setToken('MATIC')}><img src='https://cryptologos.cc/logos/polygon-matic-logo.svg?v=023' className='w-5 mr-2 mt-1' />MATIC</MenuItem>
                </MenuList>
                </Menu>
                <hr className='mt-2' />
                <input className='w-full p-2 border-slate-900 border-2 border-opacity-25 rounded-2xl' onChange={(e)=>setAmount(e.target.value)} />
                <button className='w-full h-fit p-2 bg-slate-900 text-white font-semibold mt-2 rounded-xl' onClick={()=>approve()} >Approve DAI spent</button>
                <button className='w-full h-fit p-2 bg-slate-900 text-white font-semibold mt-2 rounded-xl' onClick={()=>addfunds()}>Add Funds</button>
            </div>
        </div>
     );
}
 
export default Funds;