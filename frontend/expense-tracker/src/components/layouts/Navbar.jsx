// import React, { useState } from 'react';
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import SideMenu from './SideMenu';

// const Navbar = ({ activeMenu }) => {
//   const [openSideMenu, setOpenSideMenu] = useState(false);

//   return (
//     <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
   
//       <button 
//       className="block lg:hidden text-black"
//       onClick={() => {setOpenSideMenu(!openSideMenu)
//       }} 
//       >
//         {openSideMenu ? (
//         <HiOutlineX className='text-2xl' />
//         ): (<HiOutlineMenu className='text-2xl'/>
//          )}
//       </button>

//       <h2 className="text-lg font-medium text-black ">Expense Tracker</h2>

//       {/* Side Menu */}
//       {openSideMenu && (
//         <div className="fixed top-[61px] -ml-4 bg-white">
//           <SideMenu activeMe={activeMenu} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDarkMode } from '../../context/DarkModeContext'; // Import the custom hook

import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  
  // Use the dark mode context
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex justify-between items-center gap-5 bg-white dark:bg-gray-900 border border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 transition-colors duration-200">
      
      <div className="flex items-center gap-5">
        <button 
          className="block lg:hidden text-black dark:text-white"
          onClick={() => {setOpenSideMenu(!openSideMenu)}} 
        >
          {openSideMenu ? (
            <HiOutlineX className='text-2xl' />
          ) : (
            <HiOutlineMenu className='text-2xl'/>
          )}
        </button>

        <h2 className="text-lg font-medium text-black dark:text-white">Expense Tracker</h2>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <MdLightMode className="text-xl" />
        ) : (
          <MdDarkMode className="text-xl" />
        )}
      </button>

      {/* Side Menu */}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white dark:bg-gray-900">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
