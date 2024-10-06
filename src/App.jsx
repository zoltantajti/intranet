import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Toast from "./Widgets/Toast";
import Modal from "./Widgets/Modal";
import TopNav from "./Widgets/TopNav";
import SideNav from "./Widgets/SideNav";
import Dashboard from "./components/Dashboard";
import BSProducts from "./components/BS_Products";
import { useEffect, useRef, useState } from "react";
import webSocketInstance from "./hooks/WebSocketService";
import MyStorage from "./utils/mystorage";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const toast = useRef(null);
  const handleOpenToast = () => { toast.current.openToast(); };
  const [toastCtx, setToastCtx] = useState({ title: 'Szerverüzenet', text: '', variant: 'success', pos: 'top-end' });

  const handleWebSocketMessage = (received) => {
    let msg = JSON.parse(received);
    if (msg.mt === "onConnect") { toastCtx['variant'] = "success"; }
    else if (msg.mt === "onMessage") { toastCtx['variant'] = 'success'; toastCtx['title'] = msg.title; }
    else if (msg.mt === "onDebug") { toastCtx['variant'] = "warning"; }
    else if (msg.mt === "onError") { toastCtx['varaint'] = "danger"; toastCtx['title'] = "Szerverhiba!"; };

    toastCtx['text'] = msg.msg;
    setToastCtx({ ...toastCtx, toastCtx })
    handleOpenToast();

    if (msg.playSound) {
      const audio = new Audio(`./sounds/${msg.soundEvent}.mp3`);
      audio.play();
    };
  };


  const [modal, setModal] = useState({
    show: false,
    title: '',
    text: '',
    variant: '',
    buttons: []
  });
  const handleWSModal = (received) => {
    modal['show'] = true;
    modal['title'] = received.status;
    modal['text'] = received.text;
    modal['variant'] = 'bg-danger';
    modal['buttons'] = [
      {variant: 'dark', clickHandler: logoutFromModal, text: 'Kilépés'},
      {variant: 'success', clickHandler: reconnectFromModal, text: 'Újracsatlakozás'}
    ];
    setModal({...modal, modal});
  };
  const reconnectFromModal = () => {
    modal['show'] = false;
    setModal({...modal, modal});
    if(webSocketInstance){
      webSocketInstance.reconnect();
    }
  }
  const logoutFromModal = () => {
    if(webSocketInstance){
      webSocketInstance.disconnect();
    };
    MyStorage.session.remove('user');
    MyStorage.session.remove('token');
    MyStorage.session.remove('isLoggedIn');
    navigate('/login');
  }
  useEffect(() => {
    if (webSocketInstance) {
      webSocketInstance.initialize(handleWebSocketMessage, handleWSModal);
      webSocketInstance.connect();
    }
  }, [location]);

  return (
    <>
      <Toast ref={toast} title={toastCtx.title} text={toastCtx.text} css={toastCtx.variant} pos={toastCtx.pos} />
      <Modal show={modal.show} title={modal.title} text={modal.text} variant={modal.variant} buttons={modal.buttons} />
      <TopNav />
      <div id="layoutSidenav">
        <SideNav />
        <div id="layoutSidenav_content">
          <main>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/bs_products' element={<BSProducts />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
