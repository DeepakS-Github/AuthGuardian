"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const ProfilePage = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/users/logout');
            console.log(response);
            router.push('/login');
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const getProfileData = async () => {
        try {
            const response = await axios.get('/api/users/me');
            console.log(response);
        } catch (error: any) {
            console.log(error);
        }
    }


    const handleAccountVerification = async () => {
        try {
            const response = await axios.get('/api/users/verify_account');
            console.log(response);
        } catch (error: any) {
            console.log(error);
        }
    }


    useEffect(() => {
        getProfileData();
    },[]);


    return (
        <div className='w-full min-h-screen flex justify-end bg-gray-100 dark:bg-gray-900'>
            <div>
                <button
                    className="m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                        handleAccountVerification();
                    }}
                >
                    Verify your account
                </button>
            </div>
            <div>
                <button
                    className="m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
