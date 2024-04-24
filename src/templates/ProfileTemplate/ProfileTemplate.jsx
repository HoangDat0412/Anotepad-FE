import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ProfileTemplate() {
  return (
    <div>
        Profile 
        <Outlet/>
    </div>
  )
}
