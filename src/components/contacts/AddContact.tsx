import React, { FormEvent, useState } from 'react'
import RandomUser, { makeid } from '../../data/RandomUser';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch} from "../../data/store";
import { appendUserDataFromForm } from '../../data/redux/usersApiSlice'; 
import defaultAvatar from '../../assets/imgs/default.jpg'
import { motion } from 'framer-motion';

const AddContact = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<RandomUser>({
    id:"",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    avatar: ""
  })


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErrors({
      id:"",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      avatar: ""
    })

    if(!email.includes("@")){
      setErrors({...errors, email: "Email must include @ and not be empty"});
      return;
    }

    if(phone.length !== 11){
      setErrors({...errors, phone: "Phone number must be 11 digits"})
      return;
    }

    const newUser: RandomUser = {
      id: makeid(5),
      address: address,
      avatar: defaultAvatar,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    }

    console.log(newUser);

    dispatch(appendUserDataFromForm(newUser));

    navigate('/');
  };

  return (
    <motion.form onSubmit={handleSubmit} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className='w-100 text-start fw-medium'>
        <span>First name</span>
        <input className='mt-2' placeholder='Enter First Name' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      </div>
      <div className='w-100 text-start fw-medium mt-4'>
        <span>Last name</span>
        <input className='mt-2' placeholder='Enter Last Name' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      </div>
      <div className='w-100 text-start fw-medium mt-4'>
        <span>E-mail</span>
        <input className='mt-2' placeholder='Enter E-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        {errors.email && <p className='text-danger'>{errors.email}</p>}
      </div>
      <div className='w-100 text-start fw-medium mt-4'>
        <span>Phone</span>
        <input className='mt-2' placeholder='Enter Phone' type='text' value={phone} onChange={(e) => setPhone(e.target.value)}/>
        {errors.phone && <p className='text-danger'>{errors.phone}</p>}
      </div>
      <div className='w-100 text-start fw-medium mt-4'>
        <span>Address</span>
        <input className='mt-2' placeholder='Enter Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)}/>
      </div>
      <button type='submit' className='mt-5'>Add Contact</button>
    </motion.form>
  )
}

export default AddContact