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

const Streams = () => {

    const[duration,setDuration]=React.useState('');
    const[token,setToken]=React.useState('Choose Token');

    return ( 
        <div className='flex flex-row w-full h-fit justify-between mt-14' >
            <div className='flex flex-col bg-white w-[48%] h-fit p-5 text-slate-900 rounded-xl' >
                <p className='text-xl font-bold' >Create new stream</p>
                <hr className='mt-2 mb-2' />
                <p className='text-lg font-medium'>Recipient Address</p>
                <input className='text-black p-2 rounded-xl bg-slate-200' />
                <div className='flex flex-row justify-between mt-4' >
                <Menu>
                <MenuButton as={Button} width={'33%'} paddingX={"50px"} >
                    <label>{duration} Duration</label>
                    
                </MenuButton>
                <MenuList>
                    <MenuItem onChange={()=>setDuration(1)} >1 Month</MenuItem>
                    <MenuItem onChange={()=>setDuration(2)} >2 Months</MenuItem>
                    <MenuItem onChange={()=>setDuration(2)} >3 Months</MenuItem>
                </MenuList>
                </Menu>
                <Menu>
                <MenuButton as={Button} width={'30%'} >
                    <label>{token}</label>
                    
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>setToken('DAI')} ><img src='https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=023' className='w-5 mr-2 mt-1'  />DAI</MenuItem>
                    <MenuItem onClick={()=>setToken('USDC')}><img src='https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=023' className='w-5 mr-2 mt-1'  />USDC</MenuItem>
                    <MenuItem onClick={()=>setToken('MATIC')}><img src='https://cryptologos.cc/logos/polygon-matic-logo.svg?v=023' className='w-5 mr-2 mt-1' />MATIC</MenuItem>
                </MenuList>
                </Menu>
                <div className='flex flex-row items-center justify-center bg-slate-200 text-md font-semibold rounded-md w-[30%]' >Stream Rate</div>
                </div>
                <button className='flex w-full h-fit items-center justify-center bg-slate-900 text-white py-2 mt-3 rounded-xl' >Approve ERC20 Spend</button>
                <button className='flex w-full h-fit items-center justify-center bg-slate-900 text-white py-2 mt-3 rounded-xl' >Create Stream</button>
            </div>
            <div className='flex flex-col bg-white w-[45%] rounded-xl p-5 h-fit overflow-scroll' >
                <p className='text-xl text-slate-900 font-bold' >Current Streams</p>
                <hr className='mt-2 border-slate-900' />
                <div className='flex flex-row w-full h-fit p-3 bg-slate-100 my-2 rounded-xl text-black justify-between items-center' >
                    <label>0xA45DF...3ER4D</label>
                    <label>1000DAI</label>
                    <button className='h-fit w-fit p-2 bg-black text-white rounded-md' >Edit</button>
                </div>
            </div>
        </div>
     );
}
 
export default Streams;