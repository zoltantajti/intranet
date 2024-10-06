import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = ({onSubmit,onChange,errors,user}) => {
    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container-xl px-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header justify-content-center">
                                        <h3 className="lw-light my-4">
                                            <i className="fa-solid fa-network-wired"></i>&nbsp;
                                            Intranet belépés
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={onSubmit}>
                                            {errors?.message && <div className="mb-3" style={{color: "red"}}>{errors.message}</div>}
                                            <div className="mb-3">
                                                <Form.Label className="small mb-1" htmlFor="username">Felhasználónév</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                                    id="username" 
                                                    name="username" 
                                                    onChange={onChange}
                                                />
                                                {errors?.username && <span style={{color: "red"}}>{errors.username}</span>}
                                            </div>
                                            <div className="mb-3">
                                                <Form.Label className="small mb-1" htmlFor="password">Jelszó</Form.Label>
                                                <Form.Control 
                                                    type="password" 
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    id="password" 
                                                    name="password" 
                                                    onChange={onChange} 
                                                />
                                                {errors?.password && <span style={{color: "red"}}>{errors.password}</span>}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Button variant="primary" type="submit">Belépés</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>            
        </div>
    );
};
export default LoginForm;