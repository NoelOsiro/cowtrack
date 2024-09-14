import React from 'react'
import './home.css';
import Banner from './Banner';
import Chart from './Chart';


type Props = {}

const MainPage = (props: Props) => {
  return (
    <div id='container'>
        <Banner/>
        <Chart/>
    </div>
  )
}

export default MainPage