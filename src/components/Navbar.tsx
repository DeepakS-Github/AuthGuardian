"use client"

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ThemeSwitch from './ThemeSwitch';
import Spinner from './Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { setVerificationStatus } from '@/lib/features/verification/verificationSlice';
import { notify } from '@/helpers/notify';


function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const path = usePathname();




    const [isLoading, setIsLoading] = useState(false);
    const [isVerificationLoading, setIsVerificationLoading] = useState(true);
    const [isVerifyBtnLoading, setIsVerifyBtnLoading] = useState(false);
    const isVerified = useSelector((state: any) => state.verificationStatus.isVerified);


    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.get('/api/users/logout');
            console.log(response);
            router.push('/login');
        } catch (error: any) {
            console.log(error);
            notify(error.response.data.error, error.response.status);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAccountVerification = async () => {
        if (isVerified) {
            alert("Your account is already verified.");
            return;
        }
        setIsVerifyBtnLoading(true);
        try {
            const response = await axios.get('/api/users/verify_account');
            console.log(response);
            notify(response.data.message, response.status);
        } catch (error: any) {
            notify(error.response.data.error, error.response.status);
            console.log(error);
        } finally {
            setIsVerifyBtnLoading(false);
        }
    }


    const getUserVerificationStatus = async () => {
        setIsVerificationLoading(true);
        try {
            const response = await axios.get('/api/users/verify');
            console.log(response.data.isVerified);
            dispatch(setVerificationStatus(response.data.isVerified));
        } catch (error: any) {
            console.log(error);
            notify(error.response.data.error, error.response.status);
        } finally {
            setIsVerificationLoading(false);
        }
    }


    useEffect(() => {
        if (path === '/') {
            getUserVerificationStatus();
        }
    }, [path]);


    return (
        <div className='bg-gray-200 h-14 dark:bg-gray-800 drop-shadow-sm shadow flex flex-row justify-between w-full py-2 px-4 gap-3'>
            <ThemeSwitch />
            {path !== '/login' && path !== '/signup' && !path.startsWith('/verify') &&
                <div className='flex flex-row gap-3'>
                    {isVerificationLoading ? <div
                        className={`animate-pulse bg-gray-6700 w-36 bg-gray-300 dark:bg-gray-700 cursor-default font-medium rounded text-sm px-5 py-2.5 text-center `}
                    >
                    </div> : <button
                        className={`text-white flex justify-center items-center ${isVerified ? "bg-green-800 dark:bg-green-700 cursor-default" : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-4 focus:outline-none "} font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center `}
                        onClick={() => {
                            handleAccountVerification();
                        }}
                    >
                        {isVerified ? "Verified Account" : <span className='flex'> {isVerifyBtnLoading && <span className='mr-2'><Spinner /></span>}Verify Account</span>}
                    </button>}


                    <button
                        className="text-white flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            handleLogout(e);
                        }}
                    >
                        {isLoading && <span className='mr-2'><Spinner /></span>}Logout
                    </button>
                </div>
            }
        </div>
    )
}



export default Navbar