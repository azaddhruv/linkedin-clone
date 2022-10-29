import React from 'react'
import './Widgets.css'
import InfoIcon from '@mui/icons-material/Info'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

function Widgets() {
  const newsArticle = (heading, subtitle) => {
    return (
      <div className='widgets__article'>
        <div className='widgets__articleLeft'>
          <FiberManualRecordIcon />
        </div>
        <div className='widgets__articleRight'>
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    )
  }
  return (
    <div className='widgets'>
      <div className='widgets__header'>
        <h2>Linkedin News</h2>
        <InfoIcon />
      </div>
      {newsArticle('Mars destroyed, Elon Musk shocked', 'In Shocking News')}
      {newsArticle(
        'Axe men really make girls go wild for you',
        'Scent of Success'
      )}
      {newsArticle(
        'Trump says he want to fight Putin like he is in a Rocky Movie',
        'World Leader Clashing'
      )}
      {newsArticle(
        'Dhruv is most wanted! In girls Chat Room',
        'Wanted Criminal'
      )}
      {newsArticle('Rust Language is the new future', 'Programmers')}
    </div>
  )
}

export default Widgets
