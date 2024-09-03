import React from 'react'
import User from "../UserIterface";
import { notFound } from 'next/navigation';

interface Params{
    params: {
        user_id: number
    }
}

export default async function UserDetailsPage({ params: { user_id}} : Params) {
    const res = await fetch(`http://localhost:3000/api/users/${user_id}`);
    const data : User = await res.json();

    if(user_id > 10) return notFound();

  return (
    <div>
        <table className='table table-bordered'>
            <tr>
                <th>ID</th>
                <td>{data.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{data.name}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{data.email}</td>
            </tr>
        </table>
    </div>
  )
}
