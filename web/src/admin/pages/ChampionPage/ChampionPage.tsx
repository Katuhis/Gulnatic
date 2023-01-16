import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import PatchPage from 'components/AppPage'

const ChampionPage: FC = () => {
  const { championId } = useParams()

  if (!championId) {
    return (
      <>todo: redirect to a first champion in the list</>
    )
  }

  return (
    <PatchPage>
      championId: {championId}
    </PatchPage>
  )
}

export default ChampionPage
