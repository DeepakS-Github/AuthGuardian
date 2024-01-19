import React from 'react'

function TableColumnSkeleton({ rows = 10 }: { rows?: number }) {
    return (
        <>
            <div className="relative overflow-x-auto  w-11/12 mx-auto pb-12 rounded">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        {
                            Array(rows).fill(0).map((row, index) => (
                                <tr key={index} className="bg-white animate-pulse border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    </th>
                                    <td className="px-6 py-5">
                                    </td>
                                    <td className="px-6 py-5">
                                    </td>
                                    <td className="px-6 py-5">
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default TableColumnSkeleton