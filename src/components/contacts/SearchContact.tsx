import React, { FC, useCallback, useEffect, useState } from 'react'
import RandomUser from '../../data/RandomUser'
import ContactCard from './ContactCard'
import { motion } from 'framer-motion'

//This is basically the main page that pops once the app starts
//The document didn't mention which name that we would pick the letters from so I picked from both first and last names (they don't repeat in both cases)
//While search is working fine, it kinda screws with the letters and sadly I ran out of my own time before I figure why
//Trid to optimize the code a but with useCallback but I think it can be done in a better way
//becuase I know resolving the letters with issue would be with using useCallback properly

interface usersProps {
  users: RandomUser[]
}

const SearchContact: FC<usersProps> = ({ users }) => {

  const [localFilteredUsers, setLocalFilteredUsers] = useState<RandomUser[]>(users);


  const getUniqueFirstLetters = useCallback((usersToPick: RandomUser[]): string[] => {
    const firstLetters = new Set<string>();

    usersToPick.forEach(user => {
      firstLetters.add(user.firstName.charAt(0));
      firstLetters.add(user.lastName.charAt(0));
    });

    return Array.from(firstLetters);
  }, [])

  const filterUsersByFirstLetters = useCallback((userToSeach: RandomUser[], letter: string): void => {

    let filteredList = userToSeach.filter(user =>
      user.firstName.charAt(0) === letter || user.lastName.charAt(0) === letter
    );

    setLocalFilteredUsers(filteredList);
  }, [])

  useEffect(() => {
    setLocalFilteredUsers(users);
  }, [users])

  return (
    <motion.div className='d-flex flex-column h-100' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className='d-flex flex-row justify-content-center fs-2 mt-5'>
        {getUniqueFirstLetters(users).map((letter: string) => <span className='mx-3' style={{ cursor: 'pointer' }} onClick={() => filterUsersByFirstLetters(users, letter)}>{letter}</span>)}
      </div>
      <div className='container mt-5'>
        <div className='row row-cols-3 justify-content-center'>
          {localFilteredUsers.slice(0, 9).map((user: RandomUser) => <ContactCard user={user} key={user.id} />)}
        </div>
      </div>
    </motion.div>
  )
}

export default SearchContact