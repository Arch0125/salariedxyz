import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
    return ( 
        <div className='flex flex-row w-screen h-fit p-2 justify-end' >
            <ConnectButton/>
        </div>
     );
}
 
export default Navbar;