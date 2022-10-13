import React from 'react'
import { useSelector } from 'react-redux'
import Logo from '../Logo/Logo';
import programming from "./images/programming.png"
import CourseBlock from '../CourseBlock/CourseBlock';
import Emoji from '../Emoji/Emoji';
import Navbar from '../Navbar/Navbar';
import { getCourse, isFetchingCourse } from '../../Selectors/course';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom'
import { getIsAdmin } from '../../Selectors/user';

function Course() {
    const course = useSelector(getCourse)
    const isFetching = useSelector(isFetchingCourse)
    const isAdmin = useSelector(getIsAdmin)
    return (
        <>
            { isFetching ? <Loading /> :
                <div className="dark:bg-gray-800 min-h-screen">
                    <Navbar />
                    <div className="flex flex-col justify-center pt-40">
                        <div className="text-4xl md:text-6xl font-extrabold">
                            <Logo />
                        </div>
                        <p className="text-gray-400 text-xl md:text-2xl mt-2 mb-14 text-center">Everything you need for coding interviews in one platform<Emoji symbol="🧑‍💻" /></p>
                    </div>
                    {course.map(courseBlock => <CourseBlock key={courseBlock.blockTitle} _id={courseBlock._id} sectionTitle={courseBlock.blockTitle} blockItems={courseBlock.blockItems} />)}
                    {
                        isAdmin ? <div className="flex flex-col justify-center pt-4">
                        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto" to={`/admin/add-course-block`}>
                            Add Block
                        </Link> 
                    </div> : null
                    }

                    <img alt="" className="w-1/4 mx-auto mb-4" src={programming}></img>
                </div>
            }
        </>
    )
}

export default Course