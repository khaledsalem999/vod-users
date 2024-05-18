import { useEffect, useState, useRef } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Title from './components/Title';
import { useSelector } from 'react-redux';
import { fetchFromUsersApi } from './data/redux/usersApiSlice';
import { RootState } from './data/store';
import { useAppDispatch } from "./data/store";
import SearchContact from './components/contacts/SearchContact';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddContact from './components/contacts/AddContact';
import ViewContact from './components/contacts/ViewContact';
import EditContact from './components/contacts/EditContact';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

//Main skeleton of the app, used the default one that the usual react app starts with
//I mainly fetch the data here and keep it entact until the user reloads the webpage
//I use useNavigate for routing so the data used stay prisisted in case we add/edit or delete
//titles are dynamically changed according the location, but it's a single seperate component (this is why it's uneffected by the fade animations, and to be honest didn't think that through when did it like that initially but it makes for a cleaner code)
//I used bootstrap as my css framework since tailwind would seem like a bit of an overkill here (and I kinda like less presisted HTML to be written because it's already ugly enough)
//I used frame motion to transition between pages
//Was planning to implement mobile view for the contacts page as shown in one of the images but I ran out of my persona time, but I was going to use combinations of bootstrap display options (already did for the seach)
//and some combination for bootstrap sizing options, and handle other more complicated stuff with @media on plain css

function App() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usrData = useSelector((state: RootState) => state.user)
  const initialized = useRef(false)
  const [searchValue, setSearchValue] = useState('');
  const [title, setTitle] = useState('');
  let location = useLocation();

  useEffect(() => {
    if (!initialized.current) {
      dispatch(fetchFromUsersApi());
    }

    if (location.pathname === '/addcontact') {
      setTitle('Add Contact')
    } else if (location.pathname.includes('/user/') || location.pathname.includes('/edit/')) {
      const getUserId = location.pathname.slice(-5);
      const currentUser = usrData.data.filter(user => user.id.includes(getUserId))
      setTitle(`${currentUser[0].firstName} ${currentUser[0].lastName}'s Profile`)
    } else {
      setTitle('Contacts')
    }

    return () => {
      initialized.current = true
    }
  }, [location]);

  const handleNavigation = (route: string) => {
    navigate(route)
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const normalizedSearchQuery = searchValue.toLowerCase();

  return (
    <div className="App d-flex flex-column justify-content-between h-100">
      <div>
        <Header onSearchChange={handleSearchChange} />
        <div className='mt-5'>
          <Title title={title} />
        </div>
      </div>
      <AnimatePresence>
        <Routes>
          <Route path='/' element={usrData.loading === 'loading' ? <div className="loader mx-auto"></div> : <SearchContact users={usrData.data.filter(user =>
            user.firstName.toLowerCase().includes(normalizedSearchQuery) ||
            user.lastName.toLowerCase().includes(normalizedSearchQuery)
          )} />} />
          <Route path='/addcontact' element={<AddContact />} />
          <Route path='/user/:userId' element={<ViewContact />} />
          <Route path='/edit/:userId' element={<EditContact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      {location.pathname === '/addcontact' ? '' : <div className="Floater-container">
        <div className="plus-icon">
          <div onClick={() => handleNavigation('/addcontact')} className='no-decoration' style={{ marginTop: '7px' }}>+</div>
        </div>
      </div>}
    </div>
  );
}

export default App;
