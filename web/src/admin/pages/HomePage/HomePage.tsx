import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { patchesSelector } from 'store/selectors/app'
import AppPage from 'components/AppPage'

const HomePage: FC = () => {
  const patches = useSelector(patchesSelector)

  return (
    <AppPage>
      <h1>Admin HomePage</h1>
      <br />
      {patches?.map((patch) => (
        <div key={patch.id}>
          Patch {patch.id}
        </div>
      ))}
    </AppPage>
  )
}

export default HomePage
