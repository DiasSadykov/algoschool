import React from 'react'
import Navbar from '../Navbar/Navbar';
import Emoji from '../Emoji/Emoji';
import programming from "./images/programming.png"

function About() {
    return (
        <>
            <Navbar />
            <div className="h-full w-full flex flex-col items-center dark:bg-gray-800 dark:text-gray-50 ">
            <div className="h-full flex flex-col pt-40 w-4/5 md:w-2/5">
                        <h2 className="font-bold text-4xl mb-2"> About <Emoji symbol="🗿" /></h2>
                        <p className="text-gray-600 dark:text-gray-200"> This page is an another attempt to make Tech companies application process
        less stressfull and more enjoyable. The website/app provides a number of the most popular
                        and skill intensive problems which <i>you may and may not</i> encounter during your interviews with text and video explanations.</p>
                        <h2 className="font-bold text-4xl mt-3 mb-2"> Contacts <Emoji symbol="🌚" /></h2>
                        <p className="text-gray-600 dark:text-gray-200"> You can write me at <a href={"mailto:dias.sadykov0@gmail.com"}>dias.sadykov0@gmail.com</a>.</p>
                    <img alt="" className="w-64 mt-14 place-self-center" src={programming}></img>
            </div>
            </div>
        </>
    )
}

export default About;