import React from 'react'
import { Link } from 'react-router-dom'



function Logo(props) {
    return (
        <div className="dark:text-gray-50 text-center text-gray-700">
            <Link to="/">
                <p><span style={{ fontWeight: 900}}>Bitcode</span><span style={{ color: "#3AB0FF"}}>Academy</span></p>
            </Link>
        </div>
    )
}

export default Logo;