import { useState, FormEvent } from 'react'
import User from '../../data/RandomUser'
import { useParams } from 'react-router-dom';
import { updateUserData } from '../../data/redux/usersApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../data/store';
import { selectUserById, UpdateUserPayload } from '../../data/redux/usersApiSlice';
import RandomUser from '../../data/RandomUser';
import { useAppDispatch } from '../../data/store';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EditContact = () => {

  const { userId = '' } = useParams<{ userId: string }>();
  const user = useSelector((state: RootState) => selectUserById(state.user, userId));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialUserState: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    avatar: ""
  };

  const [firstName, setFirstName] = useState(user?.firstName || initialUserState.firstName);
  const [lastName, setLastName] = useState(user?.lastName || initialUserState.lastName);
  const [email, setEmail] = useState(user?.email || initialUserState.email);
  const [phone, setPhone] = useState(user?.phone || initialUserState.phone);
  const [address, setAddress] = useState(user?.address || initialUserState.address);
  const [avatar] = useState(user?.avatar || initialUserState.avatar);
  const [id] = useState(user?.id || initialUserState.id);
  const [errors, setErrors] = useState<User>({ ...initialUserState });

  if (!user) {
    return <div>User not found</div>;
  }

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

    const editedUser: RandomUser = {
      id: id,
      address: address,
      avatar: avatar,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    }

    console.log(editedUser);

    dispatch(updateUserData({id: id, updatedUser: editedUser}));

    navigate(`/user/${user.id}`);
  };

  return (
    <motion.form className='mx-auto mb-auto mt-5 w-25' onSubmit={handleSubmit} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className='d-flex flex-column text-start justify-content-evenly'>
        <div className='d-flex'>
          <div className='w-50 my-auto'>
            <span>First name</span>
          </div>
          <input placeholder='Enter First Name' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='d-flex mt-2'>
          <div className='w-50 my-auto'>
            <span>Last name</span>
          </div>
          <input placeholder='Enter Last Name' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className='d-flex mt-2'>
          <div className='w-50 my-auto'>
            <span>Email</span>
          </div>
          <input placeholder='Enter E-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {errors.email && <p className='text-danger ms-5'>{errors.email}</p>}
        <div className='d-flex mt-2'>
          <div className='w-50 my-auto'>
            <span>Phone</span>
          </div>
          <input placeholder='Enter Phone' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className='d-flex mt-2'>
          <div className='w-50 my-auto'>
            <span>Address</span>
          </div>
          <input placeholder='Enter Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>
      <button type='submit' className='mt-5'>Save Contact</button>
    </motion.form>
  )
}

export default EditContact