import React from 'react'
import styles from "./Modal.module.css"

import { useState,useEffect , useRef} from 'react'

function Modal() {

  const [isOpen,setIsOpen] = useState(false)
  const [formData,setFormData] = useState({
     username:"",
     email:"",
     phone:"",
     dob:""
  })

  console.log("formdata",formData)
  const modalRef = useRef(null);



  const handleModal = () =>{
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false);
  };


  const handleClickOutside = (event) => {

    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };



  useEffect(() => {

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  const handleUsername = (e)=>{
    const {id,value}=e.target
    setFormData({...formData,[id]:value})
  }
  const FormValidate = () =>{



  }
  const handleSubmit = (e)=>{
    e.preventDefault();

    let validate = FormValidate()

  }


  return (
    <div>
      <div className='non-modal'> 
      <h1 className={styles.title}> User Details Modal</h1>
  
   
      <button className={styles.button} onClick={handleModal}>Open Form</button>
      </div>

      {isOpen && (
        <div className="modal" >
          <div className="modal-content" ref={modalRef}>
            {/* <span className={styles.close}>
              &times;
            </span> */}
            <h2>Fill Details</h2>
            <form>
              {/* Your form elements go here */}
              <label>
                UserName:
                </label>
                  <div> 
                <input type="text" 
                id="username"
                value={formData.username}
                onChange={handleUsername} 
                required/>
                </div>
              <br />
                <label> 
                Email Address:
                </label>
                <div> 
                <input id="email" 
                type="email"
                 onChange={handleUsername} 
                required/>
                </div>
              <br />
              <label> 
                Phone Number:
                </label>
                <div> 
                <input type="number"
                 id="phone"
                 onChange={handleUsername} 
                  required/>
                </div>
                <br/>
                <label> 
                Date of Birth:
                </label>
                <div> 
                <input type="date" 
                id="dob"
                onChange={handleUsername} 
                required/>
                </div>
                <br/>
              <button type="submit" className='submit-button' onSubmit={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default Modal