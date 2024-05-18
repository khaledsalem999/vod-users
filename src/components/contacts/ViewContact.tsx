import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../data/store';
import { selectUserById } from '../../data/redux/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../data/redux/usersApiSlice';
import { useAppDispatch } from '../../data/store';
import { motion } from 'framer-motion';


const ViewContact = () => {

  const { userId = '' } = useParams<{ userId: string }>();
  const user = useSelector((state: RootState) => selectUserById(state.user, userId));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!user) {
    return <div>User not found</div>;
  }

  const handleDeleteUser = () => {
    dispatch(deleteUser(userId));
    navigate('/')
  };
  
  return (
    <motion.div className='mx-auto mb-auto mt-5' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className='d-flex flex-row'>
        <div>
          <img src={user.avatar} className='me-2 rounded' style={{width: '150px'}} alt='avatar' />
        </div>
        <div className='d-flex flex-column text-start justify-content-between p-3 fw-medium fs-6'>
          <span>Email: <span className='text-danger'>{user.email}</span></span> 
          <span>Phone: {user.phone}</span>
          <span>Address: {user.address}</span>
        </div>
      </div>
      <div className='mt-5 d-flex flex-row justify-content-evenly px-5'>
        <button onClick={handleDeleteUser} className='border-danger text-danger bg-light'>Delete</button>
        <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
      </div>
    </motion.div>
  )
}

export default ViewContact