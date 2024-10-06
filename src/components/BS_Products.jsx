import React, {useState, useRef} from 'react';
import HeaderBig from '../Widgets/Headers/HeaderBig';
import Toast from '../Widgets/Toast';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Alert, Button } from 'react-bootstrap';
import { apiClient } from '../interactions/apiClient';
import TimeLineItem from '../Widgets/TimeLineItem';
import MyStorage from '../utils/mystorage';
import webSocketInstance from '../hooks/WebSocketService';

const BSProducts = () => {
    const toast = useRef(null);
    const handleOpenToast = () => { toast.current.openToast(); };
    const [toastCtx, setToastCtx] = useState({title: "", text: "", time: "", variant: "success", pos: "top-end"});

    const client = new apiClient("http://intranet/_api_provider");
    const [cssClass, setCssClass] = useState("");
    const [bigImg, setBigImg] = useState("");
    const [product, setProduct] = useState({found: false,productCode: '',productName: '',lastPost: '',username: '',postHistory: {},imageList: ''});
    const [pdata, setPData] = useState({lastPost: ''});

    const searchProduct = (code) => {
        client.post('/ProductsProvider/checkProductExists', { code: code}, (res) => {
            if(res.found){
                setCssClass("is-invalid");
                product['found'] = true;
                product['productName'] = res.item.name;
                product['lastPost'] = res.item.posted_date;
                product['username'] = res.item.username;
                product['postHistory'] = JSON.parse(res.item.post_history);
                product['imageList'] = res.images;
                pdata['lastPost'] = res.item.posted_date;
                setPData({...pdata, pdata});
                setBigImg(`data:image/jpeg;base64,${res.images[0]}`);
                setProduct({ ...product, product});
            }else{
                setCssClass("is-valid");
                product['found'] = false;
                product['username'] = '';
                product['postHistory'] = {};
                product['imageList'] = '';
                setProduct({...product,product});
            }
        })
    }

    const handleProductCode = () => {
        setCssClass('');
        if(product['productCode'].length >= 4){
            searchProduct(product['productCode']);
        }else{
            if(product.found){
                product['found'] = false;
                product['productName'] = '';
                product['lastPost'] = '';
            };
            setProduct({...product, product});
        }
    }

    const onChangeHandle = (event) => {
        const field = event.target.name;
        product[field] = event.target.value;
        setProduct({ ...product, product});
        if(field === "productCode") { handleProductCode(); };
    }

    const handleChangeImage = (event) => {
        setBigImg(event.target.src);

    }

    /*Form submit*/
    const handleOnSubmit = (event) => {
        event.preventDefault();
        let user = MyStorage.session.get('user');
        let params = {
            code: product.productCode,
            name: product.productName,
            lastPost: product.lastPost,
            username: user.username
        };
        client.post('ProductsProvider/insertOrUpdate', params, (res) => { 
            let send = false;
            let msg = {};
            if(res.state === "success" && res.method === "update"){
                setToastCtx({title: "Sikeres művelet", text: "A poszt sikeresen újraütemezve!", pos: "top-start", variant: "success"});
                msg = {
                    type: 'postupdate',
                    code: product.productCode,
                    date: product.lastPost,
                    msg: 'Újraidőzítve',
                    user: user.username
                };
                send = true;
                handleProductCode();
            }else if(res.state === "success" && res.method === "insert"){
                setToastCtx({title: "Sikeres művelet", text: "A poszt sikeresen rögzítve!", pos: "top-start", variant: "success"});
                msg = {
                    type: 'postinsert',
                    code: product.productCode,
                    date: product.lastPost,
                    msg: 'Új poszt időzítve',
                    user: user.username
                };
                send = true;
                handleProductCode();
            }else{
                setToastCtx({title: "Sikertelen művelet", text: res.msg, pos: "top-start", variant: "danger"});
            };
            handleOpenToast();

            if(send && webSocketInstance){
                webSocketInstance.sendMessage(JSON.stringify(msg));
                msg = {};
                send = false;
            }
        }, "");
    }

    return (
        <>
            <Toast ref={toast} title={toastCtx.title} text={toastCtx.text} css={toastCtx.variant} pos={toastCtx.pos}/>
            <HeaderBig icon="fa-solid fa-shopping-cart" title="BetterStyle: Publikált termékek" />
            <div className="container-x1 px-4 mt-n10">
                <div className="row">
                    <div className="col-xxl-12 col-xl-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body h-100 p-5">
                                <div className="row align-items-center">
                                    <div className="col-xl-12 col-xxl-12">
                                        <div className="text-center text-xl-start text-xxl-center mb-xl-0 mb-xxl-4">
                                            <form onSubmit={handleOnSubmit}>
                                                <div className="row">
                                                    <div className="col-md-2 col-sm-12 mb-3">
                                                        <FloatingLabel controlId="productCode" label="Termékkód">
                                                            <Form.Control className={cssClass} type="text" name="productCode" onChange={onChangeHandle} value={product?.productCode} />
                                                        </FloatingLabel>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12 mb-3">
                                                        <FloatingLabel controlId="productName" label="Termék neve">
                                                            <Form.Control type="text" name="productName" onChange={onChangeHandle} value={product?.productName} />
                                                        </FloatingLabel>
                                                    </div>
                                                    <div className="col-md-3 col-sm-12 mb-3">
                                                        <FloatingLabel controlId="lastPost" label="Termék neve">
                                                            <Form.Control type="datetime-local" name="lastPost" onChange={onChangeHandle} value={product?.lastPost} />
                                                        </FloatingLabel>
                                                    </div>
                                                    <div className="col-md-3 col-sm-12 mb-3">
                                                        <Button variant="primary" type="submit" className="btn-lg">
                                                            Rögzítés
                                                        </Button>
                                                    </div>
                                                </div>
                                                {product?.found && <Alert key="alert" variant="danger">Ez a termék már posztolásra került <b>{pdata?.lastPost}</b>-kor!</Alert>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {product?.found &&
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                    <h3 className="text-center mb-3">Előzmények</h3>
                                        <div className="timeline timeline-xs">
                                            <TimeLineItem key="current" id={`post_current`} haveMarker={true} date={pdata.lastPost} user={product.username} text="Posztolva" />
                                            {product?.postHistory?.slice(0,20).map((item,index) => <TimeLineItem key={index} id={`post_${index}`} haveMarker={true} date={item.date} user={item.username} text="Posztolva" /> ) }
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <h3 className="text-center mb-3">Termékfotók</h3>
                                        {product?.imageList &&
                                            <>
                                                <img src={`${bigImg}`} id="bigImage" className="mb-3" alt={`${product?.productName}`} style={{maxWidth: "365px", width: '100%', maxHeight: "365px", height: "100%"}}/>
                                                <p>
                                                    {product?.imageList.map((item,index) => <img key={`img_${index}`} onClick={handleChangeImage} src={`data:image/jpeg;base64,${item}`} alt={`${product?.productName}_${index}`} style={{Width: '64px', height: '64px'}} /> )}
                                                </p>
                                            </>
                                        }
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BSProducts;