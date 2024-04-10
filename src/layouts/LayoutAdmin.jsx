import {Outlet} from 'react-router-dom'
import Sidebar from '../components/AdminPanel/Sidebar'
import Header from '../components/AdminPanel/Header'


const LayoutAdmin = () => {
  return (
    <div className='xl:min-h-screen grid grid-cols-1 xl:grid-cols-6 bg-tertiary-900 text-black'>
        <Sidebar />
        <div className='xl:col-span-5 '>
            <Header/>
            <div className='h-[90vh] overflow-y-scroll p-8'>
              <Outlet />
            </div>
        </div>
    </div>
  )
}

export default LayoutAdmin