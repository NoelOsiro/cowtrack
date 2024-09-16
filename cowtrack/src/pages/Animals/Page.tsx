import { useParams } from 'react-router';
import './Page.css';
import MainPage from '../../components/AnimalPage';
import Layout from '../../Layout/PageLayout';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();

  return (
    <Layout name={name} >
      <MainPage/>
    </Layout>
  );
};

export default Page;
