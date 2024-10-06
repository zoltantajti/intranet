import React from 'react';
import SidebarToggle from './SidebarToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MyStorage from '../utils/mystorage';
import webSocketInstance from '../hooks/WebSocketService';

const TopNav = () => {
    const navigate = useNavigate();
    const user = MyStorage.session.get('user');

    const logoutHandler = () => {
        if(webSocketInstance){
            webSocketInstance.disconnect();
        }
        MyStorage.session.remove('user');
        MyStorage.session.remove('token');
        MyStorage.session.remove('isLoggedIn');
        navigate('/login');
    }

    return (
        <Navbar className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white">
            <SidebarToggle />
            <Navbar.Brand className="navbar-brand pe-3 ps-4 ps-lg-2">
                <Link to="/" className="navbar-brand">
                    <i className="fa-solid fa-network-wired"></i>&nbsp;Intranet
                </Link>
            </Navbar.Brand>
            <Navbar.Collapse className="topnav navbar navbar-expand justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
                <Nav className="navbar-nav align-items-center ms-auto">
                    <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="user-dropdown">
                        <h6 className="dropdown-header d-flex align-items-center">
                            <i className="fa-solid fa-fw fa-user"></i>
                            <div className="dropdown-user-details">
                                <div className="dropdown-user-details-name">&nbsp; {user.name}</div>
                            </div>
                        </h6>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logoutHandler} style={{cursor:"pointer"}}>
                            <FontAwesomeIcon icon={faSignOut} />&nbsp;Kilépés
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopNav;