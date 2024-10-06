import React from 'react';
import { Link } from 'react-router-dom';
import MyStorage from '../utils/mystorage';

const SideNav = () => {
    const user = MyStorage.session.get('user');
    
    return (       
        <div id="layoutSidenav_nav">
            <nav className="sidenav shadow-right sidenav-light">
                <div className="sidenav-menu">
                    <div className="nav accordion" id="accordionSidenav">
                        <div className="mb-3"></div>
                        <Link className="nav-link" to="/">
                            <div className="nav-link-icon"><i className="fa-solid fa-home"></i></div>
                            Kezdőlap
                        </Link>
                        <div className="sidenav-menu-heading">BetterStyle</div>
                        <Link className="nav-link" to="/bs_products">
                            <div className="nav-link-icon"><i className="fa-solid fa-shopping-cart"></i></div>
                            Publikált termékek
                        </Link>
                    </div>
                </div>
                <div className="sidenav-footer">
                    <div className="sidenav-footer-content">
                        <div className="sidenav-footer-subtitle">Bejelentkezve, mint</div>
                        <div className="sidenav-footer-title">{user.name}</div>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default SideNav;