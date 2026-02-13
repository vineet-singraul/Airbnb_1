import React, { useState } from 'react'
import { FcManager } from "react-icons/fc";
import { FaSnapchat, FaSquareCaretLeft, FaSquareCaretRight, FaUser } from "react-icons/fa6";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import "../../styles/HostSidebar.css"

const HostHeader = ({ hostSidebarOpenClose, hostopensidebar }) => {
const [mobileNavOpen, setMobileNavOpen] = useState(false);

const hostEmail = localStorage.getItem('HostEmail')

  return (
    <nav className='navbar navbar-expand-lg bg-white border-bottom shadow-sm' style={{ position: 'sticky', top: '0', left: '0', right: '0', zIndex: '100'}}>

      <button title='toggle sidebar' className="btn btn-primary align-item-center" style={{ marginLeft: '10px' }} onClick={hostSidebarOpenClose}>
        {hostopensidebar ? <FaSquareCaretLeft /> : <FaSquareCaretRight />}
      </button>

      <span className='wlcmsgHost navbar-brand fw-semibold' style={{fontSize:'15PX',color:'#fff !'}}><FcManager className='me-2' /> Host Management System</span>

      {/* Mobile Toggle Button */}
      <button
        className="navbar-toggler border-0 ms-auto"
        type="button"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <AiOutlineAlignLeft style={{ color: '#ffffffff', fontSize: '1.5rem' }} />
      </button>

      <div className={`collapse navbar-collapse ${mobileNavOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button className="btn align-item-center" style={{ marginRight: '10px', background: 'linear-gradient(45deg, #5000a1ff, #940257ff)', border: 'none' }}>
              <FaUser style={{ color: '#fff' }} /> {hostEmail}
            </button>
          </li>
          <li className="nav-item">
            <button className="btn align-item-center" style={{ marginRight: '10px', background: 'linear-gradient(45deg, #210043ff, #00617bff)', border: 'none' }}>
              <FaSnapchat style={{ color: '#fff' }} />
            </button>
          </li>
          <li className="nav-item">
            <button title='logout' className="btn btn-danger align-item-center" style={{ marginRight: '10px' }}>
              <LuLogOut />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HostHeader
