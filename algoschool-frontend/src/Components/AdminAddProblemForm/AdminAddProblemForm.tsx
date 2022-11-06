import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { fetchCourse } from '../../Actions/course';
import { addProblem } from '../../_api/backend';
import Navbar from '../Navbar/Navbar';


function AdminAddProblemForm() {
    const locationProps = useLocation();
    const [form, setForm] = useState({
    });
    const history = useHistory()
    const dispatch = useDispatch()

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

    function handleFormSubmit(){
        const request = {
            course_block_id: courseBlockId,
            problem: form
        }
        addProblem(request).then(()=>{
            history.push("/");
            dispatch(fetchCourse)
        })
    }

    return (
        <div className="dark:bg-gray-800 min-h-screen">
            <Navbar/>
            <div className="pt-52 mb-20">
                <form className="shadow-md bg-gray-50 dark:bg-gray-900 rounded pt-6 px-8 pb-8 mb-20 w-1/2 m-auto">
                    <div className="mb-4">
                        <label className="dark:text-gray-50 block text-gray-700 text-sm font-bold mb-2" htmlFor="courseBlock">
                            Problem
                        </label>
                        <input id="itemTitle" type="text" name="item_title" placeholder="Title" onChange={handleInputChange} className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <textarea id="codeSnippet" name="code_snippet" placeholder="Code Snippet" onChange={handleInputChange} className="h-32 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <textarea id="description" name="description" placeholder="Description" onChange={handleInputChange} className="h-32 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
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

export default AdminAddProblemForm;