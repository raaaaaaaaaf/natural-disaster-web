import React from 'react'
import { Helmet } from 'react-helmet-async'
import { HistoryView } from 'src/sections/history/view'

const HistoryPage = () => {
  return (
    <>
    <Helmet>
      <title> History </title>
    </Helmet>

    <HistoryView />
  </>
  )
}

export default HistoryPage