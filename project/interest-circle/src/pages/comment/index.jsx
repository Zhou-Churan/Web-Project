/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { useParams } from 'react-router-dom'

const Comment = () => {

    const username = cookie.load('username');
    const { circle_id, post_id } = useParams();
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')

    useEffect(() => {
        const get_comments = async () => {
            try {
                const response = await axios.post('http://localhost:8080/comment/get_comments', { post_id: post_id });
                setComments(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        get_comments();
    }, [post_id]);

    const HandleSubit = (event) => {
        event.preventDefault();
        try {
            axios.post('http://localhost:8080/comment/send', {
                content: content,
                username: username,
                post_id: post_id
            }).then(() => {
                alert('评论成功')
            })
        } catch (error) {
            console.log('评论失败')
        }
    }

    return (
        <>
            <section className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden antialiased">
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />


                <div className="max-w-2xl mx-auto">

                    <form>
                        <label htmlFor="chat" className="sr-only">发表你的评论</label>
                        <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                            </button>
                            <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"></path></svg>
                            </button>
                            <textarea id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="发表你的评论..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600" onClick={HandleSubit}>
                                <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                            </button>
                        </div>
                    </form>
                    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
                </div>

                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                    <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">


                        <div className="w-full max-w-3xl mx-auto">


                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">


                                {comments.map(comment => (
                                    <div className="relative">
                                        <div className="md:flex items-center md:space-x-4 mb-3">
                                            <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">

                                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                                        <path className="fill-slate-300" d="M14.853 6.861C14.124 10.348 10.66 13 6.5 13c-.102 0-.201-.016-.302-.019C7.233 13.618 8.557 14 10 14c.51 0 1.003-.053 1.476-.143L14.2 15.9a.499.499 0 0 0 .8-.4v-3.515c.631-.712 1-1.566 1-2.485 0-.987-.429-1.897-1.147-2.639Z" />
                                                        <path className="fill-slate-500" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V11.5a.5.5 0 0 0 .8.4l1.915-1.436c.845.34 1.787.536 2.785.536 3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0Z" />
                                                    </svg>
                                                </div>

                                                <time className="text-sm font-medium text-indigo-500 md:w-28">{ comment.date.split('T')[0] }</time>
                                            </div>

                                            <div className="text-slate-500 ml-14"><span className="text-slate-900 font-bold">{ comment.creator }</span> 评论了帖子</div>
                                        </div>

                                        <div className="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">{ comment.content }</div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </section >
            
        </>
    )
}

export default Comment