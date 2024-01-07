"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const LoginPage = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post('/api/users/login', user)
            console.log(response);
            router.push('/profile');
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex h-screen justify-center items-center w-full bg-gray-100'>
            <form className="max-w-sm mx-auto w-full shadow rounded p-6 bg-white" onSubmit={(e)=>handleLogin(e)}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                        placeholder="john@doe.com"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='•••••••'
                        onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                        required
                    />
                </div>
                <Link href="/signup">
                    <div className="flex items-start mb-5 cursor-pointer hover:underline text-sm font-medium text-blue-600 dark:text-blue-500">Go to signup page</div>
                </Link>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
