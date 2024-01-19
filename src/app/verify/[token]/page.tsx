"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { ImSpinner2 } from "react-icons/im";
import { RiErrorWarningFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Verify({ params }: any) {
    const router = useRouter();

    const [verificationCode, setVerificationCode] = useState(-1);

    const [verificationText, setVerificationText] = useState('Verifying...');

    const [verificationIcon, setVerificationIcon] = useState(<ImSpinner2 className="w-full h-full text-teal-600 dark:text-teal-500 animate-spin" />);

    const [verificationTextColor, setVerificationTextColor] = useState('text-teal-600 dark:text-teal-500');


    const verify = async () => {
        try {
            const response = await axios.post("/api/users/verify", { token: params.token });
            console.log(response.data.isVerified);
            setVerificationCode(response.status);
            setVerificationText(response.data.message);

            if (response.status === 200) {
                router.push('/profile')
            }
        } catch (error: any) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (verificationCode === 200) {
            setVerificationTextColor('text-green-600 dark:text-green-500');
            setVerificationIcon(
                <TiTick className="w-full h-full text-green-600 dark:text-green-500" />
            )
        } else if (verificationCode === 201) {
            setVerificationTextColor('text-amber-600 dark:text-amber-500')
            setVerificationIcon(
                <RiErrorWarningFill className="w-full h-full text-amber-600 dark:text-amber-500" />
            )
        }
        else if (verificationCode === 203) {
            setVerificationTextColor('text-red-600 dark:text-red-500');
            setVerificationIcon(
                <ImCross className="w-full h-full p-2 text-red-600 dark:text-red-500" />
            )
        }
    }, [verificationCode]);



    useEffect(() => {
        verify();
    }, []);

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
            <div className='shadow bg-white dark:bg-gray-800 w-96 relative h-40 rounded mx-auto'>
                <div className={` relative ${verificationTextColor} flex justify-center items-center h-full font-medium text-2xl tracking-normal`}>
                    {verificationText}
                    <div className='absolute z-10 shadow-md bg-white dark:bg-gray-800 p-5 rounded-full w-1/4 aspect-square flex justify-center items-center top-0 left-[50%] -translate-y-[50%] -translate-x-[50%]'>
                        {verificationIcon}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verify