import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { patchesSelector } from 'store/selectors/app'
import AppPage from 'components/AppPage'
import { Tabs } from 'antd'
import { getPatchLink } from 'common/routes'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const HomePage: FC<IProps> = ({
  children
}) => {
  const patches = useSelector(patchesSelector)
  const navigate = useNavigate()

  const onChange = (key: string): void => {
    const redirectLink = getPatchLink(key)

    navigate(redirectLink)
  }

  return (
    <AppPage>
      <Tabs
        onChange={onChange}
        type="card"
        items={patches?.map((patch) => ({
          label: patch.number,
          key: patch.number,
          children: children
        }))}
      />
    </AppPage>
  )
}

export default HomePage
