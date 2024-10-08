import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import cookie from 'react-cookies'

const Me = () => {
    let navigate = useNavigate()
    const username = cookie.load('username');
    const [circles, setCircles] = useState([]);
    useEffect(() => {
        const get_circles = async () => {
            try {
                const response = await axios.post('http://localhost:8080/circle/get_my_circles', {username});
                setCircles(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        get_circles();
    }, [username]);
    return (
        <><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css"></link>
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="flex-1 w-full max-w-full px-3 mb-6  mx-auto">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">

                            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                    <span className="mr-3 font-semibold text-dark">我的圈子</span>
                                    <span className="mt-1 font-medium text-secondary-dark text-lg/normal">创建的兴趣圈</span>
                                </h3>
                                <div className="relative flex flex-wrap items-center my-2">
                                    <a href="#" className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light" onClick={() => navigate('/home')}> 看看其他圈子 </a>
                                </div>
                            </div>


                            <div className="flex-auto block py-8 pt-6 px-9">
                                <div className="overflow-x-auto">
                                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                        <thead className="align-bottom">
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="pb-3 text-start min-w-[175px]">名称</th>
                                                <th className="pb-3 text-end min-w-[100px]">创建者</th>
                                                <th className="pb-3 pr-12 text-end min-w-[175px]">状态</th>
                                                <th className="pb-3 pr-12 text-end min-w-[100px]">创建时间</th>
                                                <th className="pb-3 text-end min-w-[50px]">进入</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {circles.map(circle => (
                                                // eslint-disable-next-line react/jsx-key
                                                <tr className="border-b border-dashed last:border-b-0">
                                                    <td className="p-3 pl-0">
                                                        <div className="flex items-center">
                                                            <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                                                <img src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg" className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                                                            </div>
                                                            <div className="flex flex-col justify-start">
                                                                <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"> {circle.circlename} </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 pr-0 text-end">
                                                        <span className="font-semibold text-light-inverse text-md/normal">{circle.creator}</span>
                                                    </td>
                                                    <td className="p-3 pr-12 text-end">
                                                        <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"> {circle.status} </span>
                                                    </td>
                                                    <td className="pr-0 text-start">
                                                        <span className="font-semibold text-light-inverse text-md/normal">{circle.date.split('T')[0]}</span>
                                                    </td>
                                                    <td className="p-3 pr-0 text-end">
                                                        <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center" onClick={() => navigate(`/circle/${circle.circle_id}`)}>
                                                            <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Me

