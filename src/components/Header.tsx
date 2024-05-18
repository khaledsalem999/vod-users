import React from 'react'
import vodaLogo from '../../src/assets/imgs/vodafone_logo.svg'
import './mainframe-styles.css'
import Search from './Search'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface Props {
  onSearchChange: (value: string) => void;
}

const Header: React.FC<Props> = ({ onSearchChange }) => {

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange(searchValue);
  };

  return (
    <div className='d-flex flex-row justify-content-between my-3'>
      <div>
        <img alt='logo' onClick={() => navigate('/')} style={{cursor: 'pointer'}}  className='logo' src={vodaLogo}/>
      </div>
      <div className='w-25 my-auto'>
        <Search onSearchChange={handleSearchChange}/>
      </div>
    </div>
  )
}

export default Header