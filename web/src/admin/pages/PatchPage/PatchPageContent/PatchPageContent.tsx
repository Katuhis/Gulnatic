import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { patchesSelector } from 'store/selectors/app'
import useStyles from './PatchPageContent.styles'

interface IProps {
  children?: ReactNode
}

const PatchPageContent: FC<IProps> = ({
  children
}) => {
  const styles = useStyles()
  const patches = useSelector(patchesSelector)
  const { patchId } = useParams()

  const patch = patches?.find((patch) => patch.number === patchId)

  if (!patch) {
    return (
      <div>Patch not found</div>
    )
  }

  return (
    <div className={styles.root}>
      patchId: {patch.number}
      {children}
    </div>
  )
}

export default PatchPageContent
