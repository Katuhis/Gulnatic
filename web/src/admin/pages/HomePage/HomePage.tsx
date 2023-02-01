import React, { FC, ReactNode } from 'react'
import AppPage from 'components/AppPage'
import HomePageContent from './HomePageContent'

interface IProps {
  children?: ReactNode
}

const HomePage: FC<IProps> = ({
  children
}) => {
  return (
    <AppPage>
      <HomePageContent>
        {children}
      </HomePageContent>
    </AppPage>
  )
}

export default HomePage
