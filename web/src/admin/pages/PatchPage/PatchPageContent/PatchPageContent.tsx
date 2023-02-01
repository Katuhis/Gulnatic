import React, { FC, ReactNode } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import useStyles from './PatchPageContent.styles'
import { Switch, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { patchesSelector } from 'store/selectors/app'
import { LOCALE } from 'common/constants'
import { IPatchStatus } from 'interfaces/IPatch'
import routes from 'common/routes'

const { Text } = Typography

interface IProps {
  children?: ReactNode
}

const PatchPageContent: FC<IProps> = ({
  children
}) => {
  const patches = useSelector(patchesSelector)
  const { patchId } = useParams()
  const styles = useStyles()

  const onChange = (checked: boolean): void => {
    console.info(`switch to ${checked}`)
  }

  if (!patchId || !patches) {
    return (
      <>todo: redirect to a first patch in the list</>
    )
  }

  const currPatch = patches.find(({ number }) => number === patchId)

  if (!currPatch) {
    return (
      <Navigate replace to={routes.home} />
    )
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.switchContainer}>
          <Switch
            checkedChildren="Ready"
            unCheckedChildren="Not ready"
            onChange={onChange}
            defaultChecked={currPatch.status === IPatchStatus.Ready}
          />
        </div>
        <div className={styles.textContainer}>
          <Text>Loaded at:</Text>
          <Text>{currPatch?.dateUpload.toLocaleString(LOCALE, { timeZone: 'UTC' })}</Text>
        </div>
      </div>
      <main>
        patchId: {patchId}
        {children}
      </main>
    </div>
  )

}

export default PatchPageContent
