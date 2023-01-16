import React, { FC, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import AppPage from 'components/AppPage'

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
    <AppPage>
      patchId: {patchId}
      {children}
    </AppPage>
  )
}

export default PatchPage
