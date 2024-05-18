import React, {FC, useState} from 'react'
import RandomUser from '../../data/RandomUser'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface userProps {
  user: RandomUser;
}

const ContactCard: FC<userProps> = ({user}) => {

  const navigate = useNavigate();

  return (
    <motion.div onClick={() => navigate(`/user/${user.id}`)} className='m-3 border p-2 rounded shadow' style={{width: '400px', cursor:'pointer'}} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className='d-flex flex-row'>
        <div>
          <img src={user.avatar} alt='avatar' className='me-2 rounded' style={{width: '100px'}}/>
        </div>
        <div className='d-flex flex-column text-start fw-medium fs-6'>
          <span className='fs-3'>{user.lastName}, {user.firstName}</span>
          <div className='d-flex flex-column justify-content-around h-100'>
            <span className='text-body-tertiary'>{user.email}</span>
            <span className='text-body-tertiary'>{user.phone}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactCard