import Link from 'next/link'
import React from 'react';
import { FaEye } from "react-icons/fa";
import User from "./UserIterface";
import Image from 'next/image';

export default async function UsersPage() {
  const res = await fetch('http://localhost:3000/api/users');
  const data : User[] = await res.json();

  return (
    <div>      
      <Link href="/dashboard/users/new" className='underline'>New User</Link>

      <table className='table table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((user)=>{
                return (
                    <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Image src="/images/apple.jpg" alt='' width={100} height={100}/>
                    </td>
                    <td>
                      <Link href={`/dashboard/users/${user.id}`} className='btn btn-primary'>
                        <FaEye/>
                         View
                      </Link>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
      </table>
    </div>
  )
}