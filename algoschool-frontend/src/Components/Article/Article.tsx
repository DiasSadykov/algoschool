import { Result } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'
import { getCurrentItem, isFetchingCourse } from '../../Selectors/course'
import Loading from '../Loading/Loading'
import { Article } from '../../Reducers/course'

function Problem() {
    const { id } = useParams()
    const article = useSelector(getCurrentItem(id)) as Article
    const isFetching = useSelector(isFetchingCourse)

    return (
        <>
            { isFetching ? <Loading /> :
                <div>
                    <Navbar />
                    {article ?
                        <>
                            <Sidebar />
                            <div className="dark:bg-gray-800 dark:text-gray-50 flex h-full overflow-auto flex-col lg:w-4/5 w-full fixed top-0 right-0 pt-32 items-center">
                                <div className="dark:bg-gray-800 overflow-auto w-2/3 pb-12">
                                    <div className="font-extrabold text-5xl mb-2">{article.itemTitle}</div>
                                    <div className="font-light text-gray-400 text-xs">Reading time: {article.readingTime}</div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: article.html as string }} className="text-lg  w-2/3"></div>
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