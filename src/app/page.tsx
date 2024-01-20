"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { formatDate } from '@/helpers/formatDate';
import TableColumnSkeleton from '@/components/TableColumnSkeleton';
import TextSkeleton from '@/components/TextSkeleton';
import Spinner from '@/components/Spinner';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { notify } from '@/helpers/notify';
import { useDispatch } from 'react-redux';
import { openModal } from '@/lib/features/modal/modalSlice';

const ProfilePage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const verificationStatus = useSelector((state: any) => state.verificationStatus.isVerified);
    console.log(verificationStatus);

    const [users, setUsers] = useState([]);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        isVerified: false,
        createdAt: "",
    });
    const [isLoading, setIsLoading] = useState(true);
   


    const getProfileData = async () => {
        try {
            const response = await axios.get('/api/users/me');
            setProfileData(response.data.profile);
        } catch (error: any) {
            notify(error.response.data.error, error.response.status);
            console.log(error);
        }
    }


    const getUsersData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/users/show');
            console.log(response.data.users);
            setUsers(response.data.users);
        } catch (error: any) {
            console.log(error);
            notify(error.response.data.error, error.response.status);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getUsersData();
        getProfileData();
    }, []);


    return (
        <>
            <div className="flex items-center justify-between w-11/12 mx-auto mt-12 mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Profile</h1>
            </div>

            <div className="relative overflow-x-auto w-11/12 mx-auto text-base px-16 py-4 rounded shadow flex justify-between bg-white dark:bg-gray-800 dark:border-gray-700">
                <div className='flex flex-col justify-center items-start gap-2'>
                    <span className='text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white'>NAME</span>
                    {isLoading ? <TextSkeleton /> : <span>{profileData.name}</span>}
                </div>
                <div className='border-l-2 px-6 border-gray-300 dark:border-gray-500 flex flex-col justify-center items-start gap-2'>
                    <span className='text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white'>EMAIL</span>
                    {isLoading ? <TextSkeleton /> : <span>{profileData.email}</span>}
                </div>
                <div className='border-l-2 px-6 border-gray-300 dark:border-gray-500 flex flex-col justify-center items-start gap-2'>
                    <span className='text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white'>IS VERIFIED?</span>
                    {isLoading ? <TextSkeleton /> : <span>{profileData.isVerified ? "Yes" : "No"}</span>}

                </div>
                <div className='border-l-2 px-6 border-gray-300 dark:border-gray-500 flex flex-col justify-center items-start gap-2'>
                    <span className='text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white'>CREATED AT</span>
                    {isLoading ? <TextSkeleton /> : <span>{formatDate(profileData.createdAt)}</span>}
                </div>
            </div>
            <div className="relative mx-auto w-11/12 pt-4 flex justify-end">
                <button
                    type="submit"
                    className="text-white flex justify-center items-center flex-row bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                    onClick={() => {
                        if (isLoading) {
                            notify("Please wait while we are fetching your data.", "info");
                            return;
                        };
                        dispatch(openModal());
                    }}
                >
                    <span className='mr-2'><MdDelete className="text-xl" /></span>
                    Delete Account
                </button>
            </div>


            <div className="flex items-center justify-between w-11/12 mx-auto mt-12 mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Other Users</h1>
            </div>


            {isLoading ? <TableColumnSkeleton /> : verificationStatus ? <div className="relative overflow-x-auto  w-11/12 mx-auto pb-12 rounded">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Is Verified?
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className={`px-6 py-4 ${user.isVerified ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
                                    {user.isVerified ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDate(user.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : <div className='w-11/12 mx-auto text-gray-800 dark:text-gray-200'>
                Verify your account to see other users.
            </div>}

        </>
    );
};

export default ProfilePage;
