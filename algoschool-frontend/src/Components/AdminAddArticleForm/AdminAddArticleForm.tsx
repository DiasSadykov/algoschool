import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { fetchCourse } from '../../Actions/course';
import { addArticle } from '../../_api/backend';
import EditorJS from '@editorjs/editorjs';
import Navbar from '../Navbar/Navbar';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Quote from '@editorjs/quote'; 
import Embed from '@editorjs/embed'; 
import Link from '@editorjs/link'; 
import SimpleImage from '@editorjs/simple-image'; 
import Checklist from '@editorjs/checklist'; 
import Code from '@editorjs/code'

function AdminAddArticleForm() {
    const locationProps = useLocation();
    const [form, setForm] = useState({
    });
    const history = useHistory()
    const dispatch = useDispatch()
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
            hideToolbar: true
          });
    }, []) 
    const courseBlockId = locationProps.state.courseBlockId


    function handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setForm({
            ...form,
            [name]: value
        })
    }

    async function handleFormSubmit(){
        const request = {
            course_block_id: courseBlockId,
            article: {
                ...form,
                content: JSON.stringify(await editor.save())
            }
        }
        addArticle(request).then(()=>{
            history.push("/");
            dispatch(fetchCourse)
        })
    }

    return (
        <div className="dark:bg-gray-800 min-h-screen">
            <Navbar/>
            <div className="pt-20 mb-20">
                <form className="px-8 pb-8 mb-20 w-1/2 m-auto">
                    <div className="mb-4">
                        <input id="itemTitle" type="text" name="item_title" placeholder="Title" onChange={handleInputChange} className="focus:border-gray-50 w-full border-transparent border-b-2 bg-gray-800 my-2 appearance-none py-2 font-bold text-gray-50 text-5xl leading-tight focus:outline-none"/>
                        <input id="readingTime" type="text" name="reading_time" placeholder="Reading Time (in minutes)" onChange={handleInputChange} className="focus:border-gray-50 w-full border-transparent border-b-2 bg-gray-800 my-2 appearance-none py-2 text-gray-50 text-sm leading-tight focus:outline-none"/>
                        {/* <textarea id="content" name="content" placeholder="Content" onChange={handleInputChange} className="h-32 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/> */}
                        <div className="my-2 py-2 px-16 bg-gray-100 rounded" id="editorjs"></div>
                    </div>
                    <div className="flex items-center justify-between">
                    <button onClick={()=>{handleFormSubmit()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Add
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminAddArticleForm;