import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies'

const Edit = () => {
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [job, setJob] = useState('');
    const [school, setSchool] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const username = cookie.load('username');

    const HandleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:8080/user/edit', {
                username: username,
                province: province,
                city: city,
                job: job,
                school: school,
                description: description
            }).then((response) => {
                console.log('提交成功:', response);
                navigate('/info');
            }).catch((error) => {
                console.log(error);
            })

        } catch (error) {
            console.error('提交失败:', error);
        }
    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                        省份
                    </label>
                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-province" type="text" placeholder="江苏" value={province} onChange={(e) => setProvince(e.target.value)} />
                    <p className="text-red text-xs italic">填写地址，如：江苏 南京（如果是直辖市则不填写省份）</p>
                </div>
                <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                        城市
                    </label>
                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city" type="text" placeholder="南京" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                        职业
                    </label>
                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-job" type="text" placeholder="" value={job} onChange={(e) => setJob(e.target.value)} />
                    <p className="text-grey-dark text-xs italic">填写具体职业，如： xx公司职员 </p>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                        学校
                    </label>
                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-school" type="text" placeholder="" value={school} onChange={(e) => setSchool(e.target.value)} />
                    <p className="text-grey-dark text-xs italic">填写毕业学校，如： 南京大学</p>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                        个人简介
                    </label>
                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-description" type="text" placeholder="这个人很懒，什么都没有写。" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <p className="text-grey-dark text-xs italic">填写个人简介，尽可能丰富</p>
                </div>
            </div>
            <button type="submit" className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2" onClick={HandleSubmit}>
                完成
            </button>
        </div>
    )
}

export default Edit