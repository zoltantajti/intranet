import React, { useState, useEffect } from 'react';
import { apiClient } from '../interactions/apiClient';
import { useNavigate } from 'react-router-dom';
import MyStorage from '../utils/mystorage';
import HeaderBig from '../Widgets/Headers/HeaderBig';
import TimeLineItem from '../Widgets/TimeLineItem';

const Dashboard = () => {
    const navigate = useNavigate();
    if (MyStorage.session.get('isLoggedIn') !== true) { navigate('/login'); };

    const apiURL = 'http://intranet/_api_provider';
    const api = new apiClient(apiURL);
    const [productData, setProductData] = useState({ wait: 0, all: 0 });
    const [advData, setAdvData] = useState({ pub: 0, wait: 0, reject: 0 });
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getAction();
    }, []);

    const getAction = async () => {
        api.get('/ProductsProvider/getAll', (res) => { setProductData({ wait: res.wait, all: res.all }) }, null);
        api.get('/AdvProvider/getAll', (res) => { setAdvData({ pub: res.pub, wait: res.wait, reject: res.reject }) }, null);
        api.get('/EventProvider/listAll', (res) => { setEvents(res) }, null);
    };

    return (
        <>
            <HeaderBig icon="fa-solid fa-home" title="Intranet Kezdőlap" />
            <div className='container-xl px-4 mt-n10'>
                <div className="row">
                    <div className="col-lg-6 col-xl-4 mb-4">
                        <div className="card bg-success text-white h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="me-3">
                                        <div className="text-white-75 small">Marketing</div>
                                        <div className="fw-bold">
                                            {productData.wait} db várakozik<br />
                                            {productData.all} db összesen
                                        </div>
                                    </div>
                                    <i className="feather-xl text-black-50" data-feather="calendar"></i>
                                </div>
                            </div>
                            <div className="card-footer d-flex align-items-center justify-content-between small">
                                <a className="text-white stretched-link" href="/">Részletek</a>
                                <div className="text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-4 mb-4">
                        <div className="card bg-warning text-black h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="me-3">
                                        <div className="text-black-75 small">Hirdetések</div>
                                        <div className="fw-bold">
                                            {advData.pub} db posztolva<br />
                                            {advData.wait} db várakozik<br />
                                            {advData.reject} db elutasítva<br />
                                        </div>
                                    </div>
                                    <i className="feather-xl black-black-50" data-feather="calendar"></i>
                                </div>
                            </div>
                            <div className="card-footer d-flex align-items-center justify-content-between small">
                                <a className="text-black stretched-link" href="/">Részletek</a>
                                <div className="text-black"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-6 mb-4">
                        <div className="card card-header-actions h-100">
                            <div className="card-header">
                                Aktivitásnapló
                            </div>
                            <div id="timeline_frame" className="card-body">
                                <div className="timeline timeline-xs">
                                    {events.map((event, index) => (
                                        <TimeLineItem key={index} id={index} date={event.time} user={event.username} text={event.text} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;