import React, { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
  className?: string
}

const AppPage: FC<IProps> = ({
  children,
  className
}) => {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  )
}

export default AppPage
