import React, { useState } from 'react'
import './mainframe-styles.css'

interface Props {
  onSearchChange: (value: string) => void;
}


const Search: React.FC<Props> = ({ onSearchChange }) => {

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value)
  };

  return (
    <div className='d-none d-sm-block'>
      <input placeholder='Search for contact' className='border rounded p-2 w-100' value={searchText} onChange={handleSearchChange}/>
    </div>
  )
}

export default Search