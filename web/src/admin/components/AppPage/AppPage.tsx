import React, { FC, ReactNode } from 'react'
import AppPageHeader from './AppPageHeader'
import AppPageContent from './AppPageContent'
import useStyles from './AppPage.styles'

interface IProps {
  children: ReactNode
  className?: string
}

const AppPage: FC<IProps> = ({
  children,
  className
}) => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <AppPageHeader />
      <AppPageContent>
        {children}
      </AppPageContent>
    </div>
  )
}

export default AppPage
