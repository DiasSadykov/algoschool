import React, { useState } from 'react';
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import Emoji from '../Emoji/Emoji';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
import { getLoggedInAndUser } from '../../Selectors/user';
import firebase from '../../firebase';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';


function Navbar() {
    const [loginVisible, setLoginVisible] = useState(false)
    const [isLoggedIn, ] = useSelector(getLoggedInAndUser)
    return (
        <div className="dark:bg-gray-800 border-b dark:border-gray-700 flex text-gray-600 text-sm flex-row justify-start items-center shadow-sm fixed top-0 inset-x-0 z-20 bg-white h-16 ">
            <div className="ml-3 text-base font-bold"><Logo/></div>
            <nav className="invisible lg:visible ml-10 h-2/3 w-1/2">
                <input placeholder={`🔎 Search`} className="border-gray-50 pl-2 focus:border-gray-200 border-b-2 h-full w-full text-xl text-gray-500  rounded-lg focus:outline-none"></input>
            </nav>
            <nav className="ml-auto font-medium text-gray-500">
                <div>
                    <Link to="/about">About</Link>
                </div>

            </nav>
            <nav className="ml-3">
                <DarkModeToggle/>
            </nav>
            <nav className="ml-3 mr-5 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 rounded focus:outline-none">

                {isLoggedIn ?
                    <div onClick={() => {
                        firebase.auth().signOut().then(function () {
                        }, function (error) {
                        });
                    }} key="setting:2">Logout</div>
                    :
                    <>
                        <div onClick={() => {
                            setLoginVisible(!loginVisible)
                        }} > Login  <Emoji symbol="🚀"></Emoji>

                        </div>
                        <Login setLoginVisible={setLoginVisible} visible={loginVisible} />
                    </>
                }
            </nav>

        </div>

    )
}

export default Navbar;