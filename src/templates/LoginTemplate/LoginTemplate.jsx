import React from 'react'
import { Outlet } from 'react-router-dom'
import "./logintemplate.scss"
export default function LoginTemplate() {
  return (
    <div >
       <div className="">
        <Outlet/>
       </div>

  </div>
  )
}
