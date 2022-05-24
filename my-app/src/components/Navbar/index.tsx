import React from 'react'
import { Link } from 'react-router-dom'
import { logout} from '../../api/student';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    let navigate = useNavigate();
   const logoutSubmit = async (e:any) =>{
       e.preventDefault();
        const res = await logout();
        if(res.data.status === 200){
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            navigate('/login')
        }
   }


  var AuthButtons:any
  if(!localStorage.getItem('auth_token')){
      AuthButtons = (
          <ul className="navbar-nav">
              <li className="nav-item">
                  <Link className="nav-link" to='/login'>Login</Link>
              </li>
              <li className="nav-item">
                  <Link className='nav-link' to='/register'>Register</Link>
              </li>
          </ul>
      )
  }else{
      AuthButtons = (
        <button onClick={logoutSubmit} className="btn btn-outline-success" type="button">Logout</button>
      )
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active"  to="/">Home</Link>
                </li>
                
               
                </ul>
                <div className="d-flex">
                    {AuthButtons}
                </div>
            </div>
            </div>
        </nav>
  </div>
  )
}

export default Navbar