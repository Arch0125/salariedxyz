import React from "react";

const Onboarding = () => {
  return (
    <div className="bg-hero flex flex-col w-screen h-screen items-center justify-around">
      <div className="h-1/4 mt-80 flex flex-col items-center">
        <label className="text-white font-semibold text-6xl italic ">join the community,</label>
        <label className="text-white font-semibold text-6xl italic ">change the future</label>
      <p className="text-white text-xl mt-6"> Get your salaries  Sala3ied    </p>
      </div>
      <div className="w-full text-white flex-1 items-center justify-center ">
      <div className='flex flex-col flex-wrap  mx-auto sm:w-[40%]  bg-white rounded-xl py-10 p-5 text-slate-900 '>
      <div className="flex flex-row flex-wrap justify-between">
      <div className="flex flex-col border-0 border-r-2 px-10 items-center ">
    <h1 className="text-black font-semibold"> 
    ORGs Onboarded
    </h1>
    <h1 className="text-black ">
  8735672

    </h1>



</div>
<div className="flex flex-col border-0 border-r-2 px-10">
    <h1 className="text-black font-semibold"> 
    Total Value Locked
    </h1>
    <h1>
$41,885,192.06

    </h1>



</div>

<div className="flex flex-col px-10">
    <h1 className="text-black font-semibold"> 
    Members
    </h1>
    <h1>
123

    </h1>
</div>
 </div>
 
      </div>
      <div className="flex mt-4  text-white flex-col  ">

<button className="bg-transparent w-1/6 mx-auto hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
  <a href="/mintdao" >Mint NFTs</a>
</button>
</div>
      
      
      </div>
     

    </div>
  );
};
export default Onboarding;
