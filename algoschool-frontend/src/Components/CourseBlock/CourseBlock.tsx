import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BlockItem } from '../../Reducers/course'
import { getCompletedProblems } from '../../Selectors/user'


type Props = {
    sectionTitle: string,
    blockItems: BlockItem[]
}


const renderProblems = (blockItems: BlockItem[], blockTitle: string, completedProblems: Set<string>) => {
    return (
        blockItems.map((blockItem) => 
                <Link key={blockItem.itemId} className="absolute right-6 mm-bullet dark:text-gray-200 text-gray-700 pt-2 pb-2 rounded-md pr-8 mr-2 pl-12 dark:hover:text-gray-900 hover:text-gray-900 md:text-lg hover:bg-blue-100 transition easy-in-out duration-100"  to={`/${blockItem.itemType}/${blockItem.itemId}`}>{blockItem.itemTitle}</Link>
            )
    )
}

function CourseBlock(props: Props) {
    const completedProblems = useSelector(getCompletedProblems)

    return (
        <div className="flex flex-row w-screen" >
            <p className="dark:text-gray-50 pr-10 pt-2 font-semibold text-xl w-1/2 text-right">{props.sectionTitle}</p>
            <div className="w-1/2 sm:w-auto flex flex-col">
                    {renderProblems(props.blockItems, props.sectionTitle, completedProblems)}
            </div>

        </div>
    )
}

export default CourseBlock