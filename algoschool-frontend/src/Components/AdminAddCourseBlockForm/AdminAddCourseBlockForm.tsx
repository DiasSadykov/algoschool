import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCourse } from '../../Actions/course';
import { addCourseBlock } from '../../_api/backend';
import Navbar from '../Navbar/Navbar';


function AdminAddCourseBlockForm() {
    const [form, setForm] = useState({
    });
    const history = useHistory()
    const dispatch = useDispatch()


    function handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setForm({
            [name]: value
        })
    }
    function handleFormSubmit(){
        addCourseBlock(form).then(()=>{
            history.push("/");
            dispatch(fetchCourse)
        })
    }
    return (
        <div className="dark:bg-gray-800 min-h-screen">
            <Navbar />
            <div className="pt-52">
                <form className="shadow-md bg-gray-50 dark:bg-gray-900 rounded pt-6 px-8 pb-8 mb-4 w-1/4 m-auto">
                    <div className="mb-4">
                        <label className="dark:text-gray-50 block text-gray-700 text-sm font-bold mb-2" htmlFor="courseBlock">
                            Course Block
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="blockTitle" type="text" name="blockTitle" placeholder="Block title" onChange={handleInputChange}/>
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

export default AdminAddCourseBlockForm;