import './home.css';
import Banner from './Banner';
import Chart from './Chart';
import DataCard from './DataCard';


type Props = {}

const MainPage = (props: Props) => {
  return (
    <div id='container'>
        <Banner/>
        <Chart 
        labels={['Goats', 'Cows', 'Sheep']}
        datasetData={[12, 19, 3]}
        />
        <DataCard />
    </div>
  )
}

export default MainPage