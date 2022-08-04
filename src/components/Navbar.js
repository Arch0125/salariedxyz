import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
    return ( 
        <div className='flex flex-row w-screen h-fit p-4 justify-between' >
            <p className='font-bold text-white text-2xl'>💸 Salaried.xyz</p>
            <ConnectButton/>
        </div>
     );
}
 
export default Navbar;