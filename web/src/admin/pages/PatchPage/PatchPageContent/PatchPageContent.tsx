import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { patchesSelector } from 'store/selectors/app'
import useStyles from './PatchPageContent.styles'
import { LOCALE } from 'common/constants'
import { IPatchStatus } from 'interfaces/IPatch'
import { Switch, Typography } from 'antd'

const { Text } = Typography

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

  const onChange = (checked: boolean): void => {
    console.info(`switch to ${checked}`)
  }

  if (!patch) {
    return (
      <div>Patch not found</div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.switchContainer}>
        <Switch
          checkedChildren="Ready"
          unCheckedChildren="Not ready"
          onChange={onChange}
          defaultChecked={patch.status === IPatchStatus.Ready}
        />
      </div>
      <div className={styles.textContainer}>
        <Text>Loaded at:</Text>
        <Text>{patch?.dateUpload.toLocaleString(LOCALE, { timeZone: 'UTC' })}</Text>
      </div>
      <main>
        patchId: {patchId}
        {children}
      </main>
    </div>
  )
}

export default PatchPageContent
