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

    console.log("dom element clicked", modalRef.current)

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

if(formData.username.length<4){
  alert("User name should be more than 4 characters")
  return false
}
if(!formData.email){
  alert("Invalid email. Please check your email address.")
  return false

}

if(formData.phone.length!==10 ){
  alert("Invalid phone number")
  return false
}

if(!formData.dob){
  alert("Invalid date of birth.")
return false
}

let currentDate = new Date().toISOString().split('T')[0]

let selectedDate = new Date(formData.dob).toISOString().split('T')[0]

if(selectedDate>currentDate){
  alert("Invalid date of birth.")
  return false

}
return true

  }


  const handleSubmit = (e)=>{
    e.preventDefault();

    let validate = FormValidate()

    console.log("validate state now",validate)

    if(validate){
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: ""
      })
    }

  }


  return (
    <div>
      <div className='non-modal'> 
      <h1 className={styles.title}> User Details Modal</h1>
  
   
      <button className={styles.buttonform} onClick={handleModal}>Open Form</button>
      </div>

      {isOpen && (
        <div className="modal" >
          <div className="modal-content" ref={modalRef}>
            {/* <span className={styles.close}>
              &times;
            </span> */}
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              {/* Your form elements go here */}
              <label>
                UserName:
                </label>
                  <div> 
                <input type="text" 
                id="username"
                value={formData.username}
                onChange={handleUsername} 
                />
                </div>
              <br />
                <label> 
                Email Address:
                </label>
                <div> 
                <input id="email" 
                type="email"
                 onChange={handleUsername} 
                 value={formData.email}
                />
                </div>
              <br />
              <label> 
                Phone Number:
                </label>
                <div> 
                <input type="text"
                 id="phone"
                 onChange={handleUsername} 
                 value={formData.phone}

                  />
                </div>
                <br/>
                <label> 
                Date of Birth:
                </label>
                <div> 
                <input type="date" 
                id="dob"
                onChange={handleUsername} 
                value={formData.dob}

                />
                </div>
                <br/>
              <button type="submit" className='submit-button' >Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default Modal