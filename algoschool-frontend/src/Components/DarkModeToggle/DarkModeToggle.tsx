import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../Actions/user';
import { getDarkMode } from '../../Selectors/user';

function DarkModeToggle(props) {
    const darkMode = useSelector(getDarkMode)
    const dispatch = useDispatch()

    const toggleClass = classNames({
        "bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out": true,
        "translate-x-4": darkMode,
    });
    const bgClass = classNames({
        "w-11 h-7 flex items-center rounded-full bg-gray-200 p-1 duration-300 ease-in-out": true,
        "bg-purple-500": darkMode,
    })
    return (
        <div onClick={() => {
            dispatch(setDarkMode(!darkMode))
        }} className={bgClass}>
            <div className={toggleClass}></div>
        </div>
    );
}

export default DarkModeToggle;