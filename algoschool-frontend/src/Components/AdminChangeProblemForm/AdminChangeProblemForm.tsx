import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { fetchCourse } from '../../Actions/course';
import { changeProblem } from '../../_api/backend';
import { getCurrentItem } from '../../Selectors/course';
import { Problem } from '../../Reducers/course';
import Navbar from '../Navbar/Navbar';

function AdminAddArticleForm() {
    const { id } = useParams()
    const problem = useSelector(getCurrentItem(id)) as Problem
    const [form, setForm] = useState({
        itemTitle: problem?.itemTitle,
        description: problem?.description,
        codeSnippet: problem?.codeSnippet
    });
    const history = useHistory()
    const dispatch = useDispatch()


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
            courseBlockItemId: problem._id,
            problem: form
        }
        changeProblem(request).then(()=>{
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
                    <input defaultValue={problem?.itemTitle} id="itemTitle" type="text" name="itemTitle" placeholder="Title" onChange={handleInputChange} className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <textarea defaultValue={problem?.codeSnippet} id="codeSnippet" name="codeSnippet" placeholder="Code Snippet" onChange={handleInputChange} className="h-32 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        <textarea defaultValue={problem?.description} id="description" name="description" placeholder="Description" onChange={handleInputChange} className="h-72 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={()=>{handleFormSubmit()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminAddArticleForm;
