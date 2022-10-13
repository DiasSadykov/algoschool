import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BlockItem } from '../../Reducers/course'
import { getCurrentItem } from '../../Selectors/course'
import { useParams } from 'react-router-dom'
import { getCompletedProblems } from '../../Selectors/user'

type Props = {
    problems: BlockItem[]
    sectionTitle: string
}

const renderProblems = (problems: BlockItem[], blockTitle: string, currentProblemId: string, completedProblems: Set<string>) => {
    return (
        problems.map(problem => {
            return <Link key={problem.itemSlug} className="bullet dark:text-gray-200 dark:hover:text-gray-900 text-gray-700 pt-2 pb-2 rounded-md pr-8 mr-2 pl-8 transition easy-in-out duration-100 hover:bg-gray-100" to={`/${problem.itemType}/${problem.itemSlug}`}>{problem.itemTitle}</Link>
        }
        )
    )
}

function CourseBlock(props: Props) {
    const { id } = useParams()
    const currentProblem = useSelector(getCurrentItem(id))
    const completedProblems = useSelector(getCompletedProblems)
    return (
        <div className="pl-4" >
            <h2 className="dark:text-gray-50 ont-semibold text-gray-800 mt-6 mb-4">{props.sectionTitle}</h2>
            <div className="flex flex-col">
                    {renderProblems(props.problems, props.sectionTitle, currentProblem?.itemSlug, completedProblems)}
            </div>

        </div>
    )
}

export default CourseBlock