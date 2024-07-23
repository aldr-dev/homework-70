import Layout from '../../components/Layout/Layout';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {contactsGetData} from '../../store/contactsThunks';
import {selectContactsData, selectDeleteIsError, selectGetIsError, selectIsLoading} from '../../store/contactsSlice';
import {useEffect} from 'react';
import Card from '../../components/Card/Card';
import {MagnifyingGlass} from 'react-loader-spinner';
import {toast} from 'react-toastify';

const Home = () => {
  const dispatch = useAppDispatch();
  const contactsData = useAppSelector(selectContactsData);
  const getIsLoading = useAppSelector(selectIsLoading);
  const getIsError = useAppSelector(selectGetIsError);
  const deleteIsError = useAppSelector(selectDeleteIsError);

  useEffect(() => {
    if (getIsError || deleteIsError) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  }, [getIsError, deleteIsError]);


  useEffect(() => {
    dispatch(contactsGetData());
  }, [dispatch]);

  return (
    <Layout>
      {contactsData.length > 0 ? null: (<p>The contact list is empty.</p>)}
      {getIsLoading ? (
        <MagnifyingGlass
          visible={true}
          height="70"
          width="70"
          ariaLabel="magnifying-glass-loading"
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#fff"
          color="#4A90E2"
        />
      ) : (
        <>
          {contactsData && (
            <>
              {contactsData.map((item) => (
                <Card key={item.id} contact={item}/>
              ))}
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;