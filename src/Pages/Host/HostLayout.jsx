import React, { useEffect, useState } from 'react'
import HostSidebar from './HostSidebar'
import HostHeader from './HostHeader'
import "../../styles/HostSidebar.css"
import "../../styles/comman.css"
const HostLayout = ({children}) => {
    const [hostopensidebar, setHostopensidebar] = useState(true)
    useEffect(()=>{
        const resizeNav = () => {
        if (window.innerWidth > 768) {
            setHostopensidebar(true)
        }
        else{
          setHostopensidebar(false)
        }
      }
      resizeNav()

      window.addEventListener('resize',resizeNav)
        return () => {
      window.removeEventListener('resize', resizeNav);
    };
    },[])


    // Ye Function Side bar Close Karne Ke liye hai
    const hostSidebarOpenClose = () => {setHostopensidebar(prev => !prev)}
    


  return (
    <div className='d-flex'>
      {hostopensidebar && <HostSidebar/>}

       <div id="page-content-wrapper" className={`w-100 ${hostopensidebar ? 'full-width' : 'sort-width'}`}>
           <HostHeader hostSidebarOpenClose={hostSidebarOpenClose} hostopensidebar={hostopensidebar}/>
           <div className="container-fluid mt-4" style={{background:'#121212c2'}}>
             {children}
           </div>
       </div>
    </div>
  )
}

export default HostLayout
