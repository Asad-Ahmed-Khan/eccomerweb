import React, { useContext } from 'react'
import logo from '../images/orignal'

import { auth } from '../Config/config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { Link, NavLink } from "react-router-dom";
import "../index.css"


import { Menu, Dropdown, Button, Space } from 'antd';

const Navbar = ({ user }) => {

  const history = useHistory();
  const { totalQty } = useContext(CartContext);

  // handle logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push('/login');
    })

  }
  const menu = (
    <Menu
      items={[

        // {
        //   label: (
        //     <a  rel="noopener noreferrer" href="../AddProducts">
        //       Add Product
        //     </a>
        //   ),
        // },
        {
          label: (
            <a onClick={handleLogout}>Logout</a>
          ),
        },

      ]}
    />

  );

  return (

    <div className='navbox' style={{ backgroundColor: ' #333333' }}>
      <ul className="navbar-nave ">
        <div className='leftside'>
          <img src={logo} alt="" />

        </div>
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/posts" className="nav-link">
            Posts
          </NavLink>
        </li>
      </ul>



      {/* {!user && <div className='rightside'>
                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>} */}
      {/* {user &&  */}
      <div className='rightside'>

        <span><Link to="/cartproducts" className='navlink'>
          <Icon icon={cart} style={{ color: 'white' }} />
        </Link>
        </span>
        <span className='no-of-products'>{totalQty}</span>
        {/* <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span> */}

        <Space direction="vertical">
          <Space wrap>
            <Dropdown overlay={menu} placement="bottom">
              <Button className='logout-btn' style={{ Color: "black" }}><span><Link to="/" style={{ color: "white" }} className='navlink'>{user}</Link></span></Button>
            </Dropdown>
          </Space>
        </Space></div>
      {/* } */}

    </div>
  )
}


// // export const Navbar = ({ user }) => {

// //     const history = useHistory();
// //     const { totalQty } = useContext(CartContext);

// //     // handle logout
// //     const handleLogout = () => {
// //         auth.signOut().then(() => {
// //             history.push('/login');
// //         })
// //     }

// // const menu = (
// //     <Menu
// //       items={[
// //         {
// //           label: (
// //             <a target="_blank" rel="noopener noreferrer" href="login">
// //              Login
// //             </a>
// //           ),
// //         },
// //         {
// //           label: (
// //             <a target="_blank" rel="noopener noreferrer" href="signup">
// //               SingUp
// //             </a>
// //           ),
// //         },

// //       ]}
// //     />
// //   );
// //   return (
// //     <Space direction="vertical">
// //       <Space wrap>
// //       <Dropdown  overlay={menu} placement="bottom">
// //       <span><Link to="/" className='navlink'>{user}</Link></span>
// //       </Dropdown>
// //     </Space>
// //   </Space>
// // );
// //   }

export default Navbar;



// import React from "react";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar shadow navbar-expand-lg py-3 navbar-dark bg-dark">
//       <Link to="/" className="navbar-brand ml-5">
//         React + Redux + Firebase Simple Blog
//       </Link>
//       <ul className="navbar-nav ml-auto mr-5">
//         <li className="nav-item">
//           <NavLink exact to="/" className="nav-link">
//             Home
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink exact to="/posts" className="nav-link">
//             Posts
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
