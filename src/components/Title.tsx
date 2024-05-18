import React, { FC } from 'react'

interface titleProps {
    title: string
}

const Title: FC<titleProps> = ({title}) => {
  return (
    <div>
        <h1 className='fw-semibold'>{title}</h1>
        <div className='border border-danger border-2 mx-auto' style={{width: '70px'}}></div>
    </div>
  )
}

export default Title