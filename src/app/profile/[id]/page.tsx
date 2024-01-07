"use client";

import React from 'react'

function UserProfilePage({params}: any) {
    return (
        <div className='flex h-screen justify-center items-center w-full bg-gray-100'>
            Profile {params.id}
        </div>
    );
}

export default UserProfilePage