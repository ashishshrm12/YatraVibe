import React from 'react'
import "./serviceCard.css"



const ServiceCard = ({item}) => {

    const {imgUrl, title, desc} = item

  return (
    <div className='service__item'>
      <div className='service__img'> 
        <img src={imgUrl} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

export default ServiceCard
