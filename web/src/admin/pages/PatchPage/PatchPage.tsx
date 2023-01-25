import React, { FC, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import HomePage from 'pages/HomePage'

interface IProps {
  children?: ReactNode
}

const PatchPage: FC<IProps> = ({
  children
}) => {
  const { patchId } = useParams()

  if (!patchId) {
    return (
      <>todo: redirect to a first patch in the list</>
    )
  }

  return (
    <HomePage>
      patchId: {patchId}
      {children}
    </HomePage>
  )
}

export default PatchPage
