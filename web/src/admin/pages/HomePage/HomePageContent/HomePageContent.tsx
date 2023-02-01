import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Tabs } from 'antd'
import { patchesSelector } from 'store/selectors/app'
import { getPatchLink } from 'common/routes'
import useStyles from './HomePageContent.styles'

interface IProps {
  children?: ReactNode
}

const HomePageContent: FC<IProps> = ({
  children
}) => {
  const styles = useStyles()
  const patches = useSelector(patchesSelector)
  const navigate = useNavigate()
  const { patchId } = useParams()

  const onChange = (key: string): void => {
    const redirectLink = getPatchLink(key)

    navigate(redirectLink)
  }

  let patch

  if (patchId) {
    patch = patches?.find((patch) => patch.number === patchId)
  }

  if (!patch) {
    const patchLink = getPatchLink(patches?.[0].number)

    return (
      <Navigate replace to={patchLink} />
    )
  }

  return (
    <div className={styles.root}>
      <Tabs
        defaultActiveKey={patch.number}
        onChange={onChange}
        type="card"
        items={patches?.map((patch) => ({
          label: patch.number,
          key: patch.number,
          children: children
        }))}
      />
    </div>
  )
}

export default HomePageContent
