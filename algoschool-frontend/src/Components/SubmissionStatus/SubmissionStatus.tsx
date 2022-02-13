import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getCurrentSubmissionStatus, getIsSubmissionFetching } from '../../Selectors/submission';
import { Skeleton } from 'antd';


function SubmissionStatus() {
    const { id } = useParams()
    const submissionStatus = useSelector(getCurrentSubmissionStatus(id))
    const isFetching = useSelector(getIsSubmissionFetching)
    return (
        <div className="mt-4">
        {isFetching? <Skeleton active />:
        <div className="mt-2">
            <p className={submissionStatus?.status==="Accepted" ? "text-md font-semibold text-green-600" : "text-md font-semibold text-red-600"}>{submissionStatus?.status}</p>
            {submissionStatus?.message ?
                 <div className="text-xs bg-red-300 p-2 mt-2">{submissionStatus?.message}</div> 
             : null }
            {submissionStatus?.input ? <div className="flex flex-row my-3">
                <div className="dark:text-gray-50 text-xs p-2 font-medium text-gray-800 mr-3 align-bottom w-1/6">Test Input:</div>
                <div className="dark:bg-gray-800 p-2 bg-gray-50 border-black border-solid border-opacity-70 w-1/2 font-mono text-xs">{submissionStatus?.input}</div>
            </div> : null}
            {submissionStatus?.expected ?
            <div className="flex flex-row my-3">
                <div className="dark:text-gray-50 text-xs p-2 font-medium text-gray-800 mr-3 align-bottom w-1/6">Expected:</div> 
                <div className="dark:bg-gray-800 p-2 bg-gray-50 border-black border-solid border-opacity-70 w-1/2 font-mono text-xs">{submissionStatus?.expected}</div>
            </div> : null }
            {submissionStatus?.result ?
            <div className="flex flex-row my-3">
                <div className="dark:text-gray-50 text-xs p-2 font-medium text-gray-800 mr-3 align-bottom w-1/6">Result:</div>
                <div className="dark:bg-gray-800 p-2 bg-gray-50 border-black border-solid border-opacity-70 w-1/2 font-mono text-xs">{submissionStatus?.result}</div>
            </div> : null }
        </div> }
        </div>

    )
}

export default SubmissionStatus;