import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function PopUpComponent(edit){
  console.log(edit.changeData, "###")

  let update = ()=>{
    
fetch(`https://67d7ed1d9d5e3a10152c9b9e.mockapi.io/student/details/${edit.changeData.id}`, {
  method: 'PUT', // or PATCH
  headers: {'content-type':'application/json'},
  body: JSON.stringify(edit.changeData)
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(task => {
  alert("success...!")
  edit.setRef(!edit.ref)
}).catch(error => {
  console.log(error)
});
 edit.modalClose()
  }

  const createUser = () => {
    
    fetch('https://67d7ed1d9d5e3a10152c9b9e.mockapi.io/student/details', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      // Send your data in the request body as JSON
      body: JSON.stringify(edit.changeData)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      // handle error
    }).then(task => {
      // do something with the new task
      alert("Added Successfully..!")
      edit.setRef(!edit.ref)
    }).catch(error => {
      // handle error
      console.log(error)
    })
  
    edit.modalClose()
  }
    return(
        <>
        {/* the modalShow and modalClose methods has the SAME STATE. so, if the value of one method changes,
         the common state's value will changes it's state and 
          when the state gets its value the other connected method will also changed to the newly changed value of the state. 
          and same goes for the other way around */}

         {/* the show attribute shows the modal, when its value gets to the true as the boolean value (by triggering the modalShow method, which's value is set to true) and it doesn't relate to the close button.
         but when the value in the show attribute changes, the onhide's value also gets to changes to true.
         Now, for closing the modal, the state has to change to false. we can do this by the modalClose function which is in the onHide function 
         and the onHide function will trigger when the close button in the head gets triggered. 
         and the same modalClose button has been set to the save changes button too, to close the modal.
         Now the state's value gets false and the show attribute will also gets to false because the state is a common state for both modalShow and modalClose */}

         {/* instead of using not(!) operator, they used TWO SEPERATE METHODS as the open and close of the modal happens in two different buttons. it is the way that the bootstrap has set the values */}
      <Modal show={edit.modalShow} onHide={edit.modalClose}>
        <Modal.Header closeButton>
          {edit.changeData.id ? <Modal.Title>Edit Data</Modal.Title> : <Modal.Title>Add Data</Modal.Title>}
          
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nandhini RavindraKumar"
                defaultValue={edit.changeData.name}
                // here, the updating function will run, even the defaultValue is NOT used.
                //it is used just to see the existing valule when we click the edit button.
                onChange={(e)=>edit.setChangeData({...edit.changeData, name: e.target.value})}
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                defaultValue={edit.changeData.emailId}
                onChange={(e)=>edit.setChangeData({...edit.changeData, emailId: e.target.value})}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Chennai"
                defaultValue={edit.changeData.location}
                onChange={(e)=>edit.setChangeData({...edit.changeData, Location: e.target.value})}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone No:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="3894589389"
                defaultValue={edit.changeData.phoneNo}
                onChange={(e)=>edit.setChangeData({...edit.changeData, phoneNo: e.target.value})}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Qualification:</Form.Label>
              <Form.Control
                type="email"
                placeholder="B.com corporate secretaryship"
                defaultValue={edit.changeData.qualification}
                onChange={(e)=>edit.setChangeData({...edit.changeData, qualification: e.target.value})}
                autoFocus
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={edit.modalClose}>
            Close
          </Button>
          {edit.changeData.id ? <Button variant='primary' onClick={update}>Save Changes</Button> :
          <Button variant="success" onClick={createUser}>
            create
          </Button>}
        </Modal.Footer>
      </Modal>
        </>
    )
}