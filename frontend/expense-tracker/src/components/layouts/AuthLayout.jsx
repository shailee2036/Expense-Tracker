import React from 'react'

const AuthLayout = ({children,image}) => {
  return <>
    <div className="flex w-screen h-screen">
    <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 flex flex-col">
        <h2 className="text-lg font-medium text-black"> Expense Tracker</h2>
        {children}
    </div>

    <div className="hidden md:flex md:w-1/2 h-full overflow-hidden">
        {image}
    </div>

    </div>




  </>;
};

export default AuthLayout