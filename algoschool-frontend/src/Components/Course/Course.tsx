import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from 'antd'
import Logo from '../Logo/Logo';
import programming from "./images/programming.png"
import CourseBlock from '../CourseBlock/CourseBlock';
import Emoji from '../Emoji/Emoji';
import Navbar from '../Navbar/Navbar';
import { getCourse, isFetchingCourse } from '../../Selectors/course';
import Loading from '../Loading/Loading';

function Course() {
    const course = useSelector(getCourse)
    const isFetching = useSelector(isFetchingCourse)

    return (
        <>
            { isFetching ? <Loading /> :
                <div className="dark:bg-gray-800 h-full">
                    <Navbar />
                    <div className="flex flex-col justify-center pt-40">
                        <div className="text-4xl md:text-6xl font-extrabold">
                            <Logo />
                        </div>
                        <p className="text-gray-400 text-xl md:text-2xl mt-2 mb-14 text-center">Everything you need for coding interviews in one platform<Emoji symbol="🧑‍💻" /></p>
                    </div>
                    {course.map(courseBlock => <CourseBlock key={courseBlock.blockTitle} sectionTitle={courseBlock.blockTitle} blockItems={courseBlock.blockItems} />)}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <Image width="25rem" src={programming}></Image>
                    </div>
                </div>
            }
        </>
    )
}

export default Course