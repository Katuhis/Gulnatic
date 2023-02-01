import React, { FC, ReactNode } from 'react'
import useStyles from './AppPageLoader.styles'

interface IProps {
  children: ReactNode
  className?: string
}

const AppPageLoader: FC<IProps> = ({
  children,
  className
}) => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}

export default AppPageLoader
