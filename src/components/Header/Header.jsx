import React from 'react'
import {NavLink, Link} from 'react-router-dom' 
import Images from '../Images/Image'

const Header = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-bg-color">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={Images.Logo} alt={Images.Logo}/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/order">
                                Order
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header