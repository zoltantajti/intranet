import React, { useState, useEffect } from 'react';

const SidebarToggle = () => {
    const [ isToggled, setIsToggled ] = useState(() => {
        return localStorage.getItem('sb|sidebar-toggle') === true;
    });
    useEffect(() => {
        if(isToggled){
            document.body.classList.add('sidenav-toggled');
        }else{
            document.body.classList.remove('sidenav-toggled');
        };

        const sidebarToggle = document.querySelector('#sidebarToggle');
        if(sidebarToggle){
            sidebarToggle.addEventListener('click', handleToggle);
        }

        return () => {
            if(sidebarToggle){
                sidebarToggle.removeEventListener('click', handleToggle);
            }
        };
    }, [isToggled]);

    const handleToggle = (event) => {
        event.preventDefault();
        setIsToggled(!isToggled);
        localStorage.setItem('sb|sidebar-toggle', !isToggled);
    }

    return (
        <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle">
            <i className="fa-solid fa-bars"></i>
        </button>
    )
};

export default SidebarToggle;