import React, {useEffect} from 'react';
import './ContactForm.css';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  dataForm,
  resetDataForm,
  selectFormData,
  selectGetIsError,
  selectGetIsLoading,
  selectGetUpdateIsError,
  selectGetUpdateIsLoading,
  selectPostIsError,
  selectPostIsLoading,
} from '../../store/contactsFormSlice';
import {getFormData, postFormData, updateFormData} from '../../store/contactsFormThunks';
import {Hourglass, ThreeDots} from 'react-loader-spinner';
import {ApiFormData} from '../../types';
import {toast} from 'react-toastify';

const ContactForm = () => {
  const location = useLocation();
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectFormData);
  const postIsLoading = useAppSelector(selectPostIsLoading);
  const postIsError = useAppSelector(selectPostIsError);
  const getIsLoading = useAppSelector(selectGetIsLoading);
  const getIsError = useAppSelector(selectGetIsError);
  const getUpdateIsLoading = useAppSelector(selectGetUpdateIsLoading);
  const getUpdateIsError = useAppSelector(selectGetUpdateIsError);
  const userDefaultPhoto = 'https://j36949281.myjino.ru/userDefaultPhoto.jpg';

  useEffect(() => {
    if (postIsError || getIsError || getUpdateIsError) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
    if (id) {
      dispatch(getFormData(id));
    }
    if (location.pathname === '/new-contact') {
      dispatch(resetDataForm());
    }
  }, [postIsError, getIsError, getUpdateIsError, dispatch, id, location.pathname]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    dispatch(dataForm({name: name as keyof ApiFormData, value}));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.values(data).every(value => value.trim().length > 0)) {
      if (id) {
        dispatch(updateFormData({id, data}));
      } else {
        dispatch(postFormData(data));
      }
      dispatch(resetDataForm());
    }
  };

  return (
    <>
      {getIsLoading ? (
        <Hourglass
          visible={true}
          height="50"
          width="50"
          ariaLabel="hourglass-loading"
          colors={['#4A90E2', '#4A90E2']}
        />
      ) : (
        <form onSubmit={onFormSubmit} className="contact-form">
          <h2 className="contact-form-title">{id ? 'Edit contact' : 'Add new contact'}</h2>
          <div className="contact-form-row">
            <label htmlFor="name" className="contact-form-label">Name:</label>
            <input
              id="name"
              onChange={onFieldChange}
              value={data.name}
              type="text"
              className="contact-form-field"
              name="name"
              placeholder="Name*"
              required/>
          </div>
          <div className="contact-form-row">
            <label htmlFor="phone" className="contact-form-label">Phone:</label>
            <input
              id="phone"
              onChange={onFieldChange}
              value={data.phone}
              type="tel"
              className="contact-form-field"
              name="phone"
              placeholder="Phone*"
              required/>
          </div>
          <div className="contact-form-row">
            <label htmlFor="email" className="contact-form-label">Email:</label>
            <input
              id="email"
              onChange={onFieldChange}
              value={data.email}
              type="email"
              className="contact-form-field"
              name="email"
              placeholder="Email*"
              required/>
          </div>
          <div className="contact-form-row">
            <label htmlFor="photo" className="contact-form-label">Photo:</label>
            <input
              id="photo"
              onChange={onFieldChange}
              value={data.photo}
              type="url"
              className="contact-form-field"
              name="photo"
              placeholder="Photo*"
              required/>
          </div>
          <div className="contact-form-row photo-row-field">
            <label className="contact-form-label photo-form-label">Photo preview:</label>
            <div className="contact-form-photo-inner">
              <img className="contact-form-photo-preview" src={data.photo || userDefaultPhoto} alt="User photo"/>
            </div>
          </div>
          <div className="contact-form-row">
            <button type="submit" disabled={postIsLoading || getUpdateIsLoading} className="contact-form-button save">
              {(postIsLoading || getUpdateIsLoading ? (
                <ThreeDots
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperClass="dots-loading"
                />
              ) : 'Save')}
            </button>
            <Link to="/" className="contact-form-button back">Back to contacts</Link>
          </div>
        </form>
      )}
    </>
  );
};

export default ContactForm;