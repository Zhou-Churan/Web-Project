import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import cookie from 'react-cookies'

const Create = () => {
    const [circlename, setCirclename] = useState('')
    const [path, setPath] = useState('')
    let navigate = useNavigate();
    const username = cookie.load('username')
    
    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            axios.post('http://localhost:8080/circle/create', {
                username: username,
                circlename: circlename,
                path: path
            }).then(() => {
                console.log('创建成功')
                navigate('/home')
            })
        } catch (error) {
            console.log('创建失败')
        }
    }

    
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <form>

                    <div className="mb-6">
                        <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mb-2">兴趣圈名称:</label>
                        <textarea id="postContent" name="postContent" rows="4" className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
          sm:leading-5 resize-none focus:outline-none focus:border-blue-500" placeholder="请填写" value={circlename} onChange={(e) => setCirclename(e.target.value)}></textarea>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2">图片:</label>
                        <div className="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
                            <input type="file" id="fileAttachment" name="fileAttachment" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span className="ml-2 text-sm text-gray-600">选择一张兴趣圈背景图</span>
                            </div>
                            <span className="text-sm text-gray-500">图片大小上限: 5MB</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button type="submit" className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2" onClick={handleCreate}>
                            创建
                        </button>
                        <span className="text-gray-500 text-sm">名称上限10个字</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create