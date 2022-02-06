import React from 'react'
import { Link } from 'react-router-dom'



function Logo(props) {
    return (
        <div className="dark:text-gray-50 text-center text-gray-700">
            <Link to="/">
                <p>Algorithms<span style={{ color: "#4299e1"}}>.school</span></p>
            </Link>
        </div>
    )
}

export default Logo;