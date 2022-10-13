import { Result } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'
import { getCurrentItem, isFetchingCourse } from '../../Selectors/course'
import Loading from '../Loading/Loading'
import { Article } from '../../Reducers/course'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Quote from '@editorjs/quote'; 
import Embed from '@editorjs/embed'; 
import Link from '@editorjs/link'; 
import SimpleImage from '@editorjs/simple-image'; 
import Checklist from '@editorjs/checklist'; 
import Code from '@editorjs/code'

function Problem() {
    const { id } = useParams()
    const article = useSelector(getCurrentItem(id)) as Article
    const isFetching = useSelector(isFetchingCourse)
    const editor = React.useMemo(()=>{
        return new EditorJS({
            holder: 'editorjs',
            tools: {
                header: Header,
                list: List,
                quote: Quote,
                embed: Embed,
                link: Link,
                simpleImage: SimpleImage,
                checklist: Checklist,
                code: Code
            },
            inlineToolbar: true,
            hideToolbar: true,
            readOnly: true,
            data: article?.content ? JSON.parse(article.content) : {}
          });
    }, [article]); 
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
                                <div className="w-2/3 my-2 py-2" id="editorjs"></div>
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