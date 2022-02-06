import { Result } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools.js";
import SubmissionStatus from '../SubmissionStatus/SubmissionStatus'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentItem, isFetchingCourse } from '../../Selectors/course'
import { setCodeForProblem, submitCode  } from '../../Actions/course'
import Loading from '../Loading/Loading'
import Emoji from '../Emoji/Emoji'

function Problem() {
    const { id } = useParams()
    const currentProblem = useSelector(getCurrentItem(id))
    const isFetching = useSelector(isFetchingCourse)
    const dispatch = useDispatch()

    function onSubmit() {
        dispatch(submitCode(id))
    }

    function onChange(value) {
        dispatch(setCodeForProblem(id, value))
    }

    return (
        <>
            { isFetching ? <Loading /> :
                <div>
                    <Navbar />
                    {currentProblem ?
                        <>
                            <Sidebar />
                            <div className="dark:bg-gray-800 dark:text-gray-50 flex h-full overflow-auto flex-col md:w-full md:flex-row lg:w-4/5 w-full fixed top-0 right-0 pt-20">
                                <div className="dark:bg-gray-800 pl-5 pr-5 pb-5 w-full overflow-auto  md:h-full md:w-2/5">
                                    <div className="font-extrabold text-3xl mb-3">{currentProblem.itemTitle}</div>
                                    <div dangerouslySetInnerHTML={{ __html: currentProblem.description as string }} className="text-sm font-normal">
                                    </div>
                                </div>
                                <div className="dark:bg-gray-700 w-full md:w-3/5 h-full relative pr-5 pl-5 pt-5 bg-gray-100 rounded-tl-xl shadow-2xl">
                                    <AceEditor className="rounded-md shadow-lg" onChange={onChange} showPrintMargin={false} height="60%" width="100%" mode="python" theme="textmate" value={currentProblem.codeSnippet} enableBasicAutocompletion={true} showGutter={false} enableLiveAutocompletion={true} setOptions={{
                                        enableLiveAutocompletion: true,
                                        enableSnippets: false,
                                        showLineNumbers: false,
                                        tabSize: 2,
                                    }} />
                                    <SubmissionStatus />
                                    <button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700 absolute bottom-5 right-5 text-white text-sm font-medium py-2 px-4 border-b-4 border-blue-700 hover:border-blue-800 rounded focus:outline-none">Submit <Emoji symbol="🍪" /></button>
                                </div>
                            </div>
                        </>
                        : <Result
                            style={{ marginTop: "100px" }}
                            status="404"
                            title="403"
                            subTitle="Sorry, the page you visited does not exist."
                        />}
                </div>
            }
        </>

    )
}

export default Problem