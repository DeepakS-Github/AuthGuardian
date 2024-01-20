"use client"

import React, {useEffect, useState} from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/lib/features/modal/modalSlice';
import axios from 'axios';
import Spinner from './Spinner';
import { notify } from '@/helpers/notify';
import { useRouter } from 'next/navigation';


function DeleteConfirmationModal() {

    const dispatch = useDispatch();
    const router = useRouter();
    const isModalOpen = useSelector((state: any) => state.modalStatus.isModalOpen);

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    useEffect(() => {
        return () => {
            console.log(isModalOpen);
        }
    }, [isModalOpen])

    
    const handleDeleteAccount = async () => {
        
        if (!isDeleteLoading) {
            try {
                setIsDeleteLoading(true);
                const response = await axios.delete('/api/users/me')
                console.log(response);
                notify(response.data.message, response.status);
                router.push('/login');
            } catch (error: any) {
                console.log(error);
                notify(error.response.data.error, error.response.status);
            } finally {
                dispatch(closeModal());
                setIsDeleteLoading(false);
            }
        }
    }

    return (
        <div className={`${isModalOpen?"block":"hidden"} overflow-y-auto bg-gray-800 bg-opacity-50 overflow-x-hidden fixed z-40 flex justify-center items-center w-full h-full`}>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto z-50">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <button type="button" className="text-gray-400 text-xl absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{
                        dispatch(closeModal());
                    }}>
                        <RxCross2 />
                    </button>
                    <div className='w-full flex justify-center items-center text-5xl my-6 text-gray-700 dark:text-gray-100'>
                        <FaRegTrashAlt />
                    </div>
                    <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete your account?</p>
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            className="text-white flex justify-center items-center flex-row bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            onClick={()=>{
                                dispatch(closeModal());
                            }}
                        >
                            No, cancel
                        </button>
                        <button
                            className="text-white flex justify-center items-center flex-row bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                            onClick={()=>{
                                handleDeleteAccount()
                            }}
                        >
                            {isDeleteLoading && <span className='mr-2'> <Spinner /></span>}Yes, I'm sure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal