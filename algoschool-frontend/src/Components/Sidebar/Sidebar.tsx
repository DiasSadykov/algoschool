import React from 'react'
import { useSelector } from 'react-redux'
import { getCourse } from '../../Selectors/course'
import SidebarCourseBlock from '../SidebarCourseBlock/SidebarCourseBlock'

function Sidebar() {
    const problems = useSelector(getCourse)
    return (
        <div className="dark:bg-gray-800 dark:border-gray-700 w-1/5 fixed inset-0 top-0 h-screen hidden lg:block bg-white z-10 overflow-auto pt-16 pr-5 md:border-r md:border-gray-200">
            {problems.map(problemSet => <SidebarCourseBlock key={problemSet.blockTitle} problems={problemSet.blockItems} sectionTitle={problemSet.blockTitle}/>)}
        </div>
    )
}

export default Sidebar