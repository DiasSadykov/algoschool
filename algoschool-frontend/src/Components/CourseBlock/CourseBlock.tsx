import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCourse } from '../../Actions/course'
import { BlockItem } from '../../Reducers/course'
import { getCompletedProblems, getIsAdmin } from '../../Selectors/user'
import { removeCourseBlock, removeCourseBlockItem } from '../../_api/backend'
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog'


type Props = {
    _id: string
    sectionTitle: string,
    blockItems: BlockItem[]
}


const renderProblems = (isAdmin: boolean, courseBlockId: string, blockItems: BlockItem[], setConfirmationDialog, dispatch) => {
    return (
        blockItems.map((blockItem) => 
                <div className="absolute right-6 mm-bullet dark:text-gray-200 text-gray-700 pt-2 pb-2 rounded-md pr-8 mr-2 pl-12 dark:hover:text-gray-900 hover:text-gray-900 md:text-lg hover:bg-blue-100 transition easy-in-out duration-100" >
                    <Link key={blockItem.itemSlug} to={`/${blockItem.itemType}/${blockItem.itemSlug}`}>{blockItem.itemTitle}</Link>
                    {isAdmin? <> 
                        <Link key={blockItem.itemSlug} className="inline-block cursor-pointer text-red-800 ml-4" to={`/admin/change-${blockItem.itemType}/${blockItem.itemSlug}`}>✏</Link>

                        <div onClick={()=>{setConfirmationDialog({opened: true, callback: () => {handleBlockItemRemove(courseBlockId, blockItem._id, dispatch)}})}} className="inline-block cursor-pointer text-red-800 ml-2 font-bold">
                        ×
                    </div>
                    </>: null}

                </div>
            )
    )
}

async function handleBlockRemove(_id: string, dispatch){
    await removeCourseBlock({_id: _id})
    dispatch(fetchCourse)
}

async function handleBlockItemRemove(courseBlockId: string, courseBlockItemId: string, dispatch){
    await removeCourseBlockItem({
        "course_block_item_id":
        {
            "_id": courseBlockItemId
        },
        "course_block_id":
        {
            "_id": courseBlockId
        }
    })
    dispatch(fetchCourse)
}



function CourseBlock(props: Props) {
    const [confirmationDialog, setConfirmationDialog] = useState({opened: false, callback: ()=>{}});
    const completedProblems = useSelector(getCompletedProblems)
    const dispatch = useDispatch()
    const isAdmin = useSelector(getIsAdmin)

    return (
        <>
            {confirmationDialog.opened ? <ConfirmationDialog onConfirm={confirmationDialog.callback} onClose={()=>{setConfirmationDialog({...confirmationDialog, opened: false})}}/> : null}
            <div className="flex flex-row w-screen">
                <div className="dark:text-gray-50 pr-10 pt-2 font-semibold text-xl w-1/2 text-right">
                    {isAdmin ?
                    
                    <div onClick={()=>{setConfirmationDialog({opened: true, callback: () => {handleBlockRemove(props._id, dispatch)}})}} className="inline-block cursor-pointer text-red-800 mx-2 font-bold text-xl">
                        ×
                    </div>
                    : null}
                {props.sectionTitle}
                </div>
                <div className="flex flex-col">
                <div className="w-1/2 sm:w-auto flex flex-col">
                    {renderProblems(isAdmin, props._id, props.blockItems, setConfirmationDialog, dispatch)}
                </div>
                <div className="flex flex-row">
                {isAdmin ? <><Link className="border-blue-500 border-dashed border-2 hover:bg-blue-700 text-white text-sm font-bold my-5 mx-3 py-2 px-4 rounded" to={{
                    pathname: "/admin/add-problem",
                    state: { courseBlockId: props._id }
                }}>
                    👨‍💻 Add Problem
                </Link>
                <Link className="border-blue-500 border-dashed border-2 hover:bg-blue-700 text-white text-sm font-bold my-5 mx-3 py-2 px-4 rounded" to={{
                    pathname: "/admin/add-article",
                    state: { courseBlockId: props._id }
                }}>
                    📝 Add Article
                </Link></> : null}
                
                </div>
                </div>
 
            </div>

        </>
    )
}

export default CourseBlock