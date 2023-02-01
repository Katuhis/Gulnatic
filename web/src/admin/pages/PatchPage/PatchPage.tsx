import React, { FC, ReactNode } from 'react'
import HomePage from 'pages/HomePage'
import PatchPageContent from './PatchPageContent'

interface IProps {
  children?: ReactNode
}

const PatchPage: FC<IProps> = ({
  children
}) => {
  return (
    <HomePage>
      <PatchPageContent>
        {children}
      </PatchPageContent>
    </HomePage>
  )
}

export default PatchPage
