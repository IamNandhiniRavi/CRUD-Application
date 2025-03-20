import { Container } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import TableComponent from './table';
import PopUpComponent from './popupComponent';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [tempData, setTempData] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    if(rowData){
      setTempData(rowData);
    }else{
      setTempData({name: null,
        emailId : null,
        location : null,
        phoneNo : null,
        qualification : null})
    }
     
    setShow(true);
  }

  return (
    <>
     <Container fluid className='p-5'>
      <PopUpComponent ref={status} setRef={setStatus} modalShow={show} modalClose={handleClose} changeData={tempData} setChangeData={setTempData}/>
      <TableComponent boxView={handleShow} update={status} setUpdate={setStatus}/>
     </Container>
    </>
  )
}

export default App
