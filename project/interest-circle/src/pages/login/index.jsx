import React, { useState } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    const handleLogin = async (event) => {
        
        event.preventDefault();
        
        try {
            await axios.post('http://localhost:8080/user/login', {
                username: username,
                password: password
            }).then((response) => {
                if (response.data) {
                    console.log('登录成功:', response);
                    cookie.save('username', username, { path: '/' })
                    navigate('/home');
                }
                else {
                    alert('登录失败，用户名或密码不存在。');
                }
            }).catch((error) => {
                console.log(error);
            })
 
            
        } catch (error) {
            console.error('登录失败:', error);
        }
    };  

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            axios.post('http://localhost:8080/user/signup', {
                username: username,
                password: password
            }).then(() => {
                alert('注册成功')
            })
        } catch (error) {
            console.log('注册失败')
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3">
                <div className="py-8">
                    <img width="30" className="-mt-10" src="https://www.paypalobjects.com/images/shared/momgram@2x.png" />
                </div>
                <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
                <div className="flex flex-col space-y-1">
                    <input className="p-3 border-[1px] border-slate-500 rounded-sm w-80" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="font-bold text-[#0070ba]">忘记密码？</p>
                </div>
                <div className="flex flex-col space-y-5 w-full">
                    <button className="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]" onClick={handleLogin} >登录</button>
                    <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
                        <div className="-mt-1 font-bod bg-white px-5 absolute">或</div>
                    </div>
                    <button className="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200" onClick={handleSignup}>注册</button>
                </div>
                <div className="flex space-x-1 p-20 text-sm">
                    <p className="font-bold hover:underline cursor-pointer">中文</p>
                    <div className="border-r-[1px] border-r-slate-300"></div>
                    <p className="hover:underline cursor-pointer">English</p>
                </div>
            </div>

        </div>
    )
}

export default Login

