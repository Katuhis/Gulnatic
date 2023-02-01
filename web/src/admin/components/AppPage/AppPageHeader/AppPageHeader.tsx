import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from 'antd'
import { userSelector } from 'store/selectors/auth'
import useStyles from './AppPageHeader.styles'

const { Text, Link } = Typography

const AppPageHeader: FC = () => {
  const styles = useStyles()
  const user = useSelector(userSelector)

  return (
    <header>
      <div className={styles.root}>
        <div>
          <Link href='/'>
            Gulnatic admin
          </Link>
        </div>
        <div>
          <Text>
            {user.name || 'Guest'}
          </Text>
        </div>
      </div>
    </header>
  )
}

export default AppPageHeader
