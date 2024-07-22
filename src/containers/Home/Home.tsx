import Layout from '../../components/Layout/Layout';
import {useAppDispatch} from '../../app/hooks';
import {contactsGetData} from '../../store/contactsThunks';

const Home = () => {
  const  dispatch = useAppDispatch();


  dispatch(contactsGetData());
  return (
    <Layout>
      Home
    </Layout>
  );
};

export default Home;