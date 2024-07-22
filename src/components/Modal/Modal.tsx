import React from 'react';
import {MutationApiFormData} from '../../types';
import './Modal.css';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {contactsDeleteData} from '../../store/contactsThunks';
import {updateStateContactData} from '../../store/contactsSlice';

interface Props {
  isOpen: boolean;
  onClose: (status: boolean) => void;
  contact: MutationApiFormData;
}

const Modal: React.FC<Props> = ({isOpen, onClose, contact}) => {
  const dispatch = useAppDispatch();

  const handleDeleteContact = () => {
    dispatch(contactsDeleteData(contact.id));
    dispatch(updateStateContactData(contact.id));
    onClose(false);
  };

  return (
    <>
      {isOpen ? (
        <div className="modal-backdrop">
          <div className="modal">
            <button onClick={() => onClose(false)} type="button" className="modal-close">&#10006;</button>
            <div className="modal-body">
              <div className="modal-body-col img">
                <img className="modal-body-img" src={contact.photo} alt={contact.name}/>
              </div>
              <div className="modal-body-col info">
                <h3 className="modal-body-title">{contact.name}</h3>
                <a href="#" className="modal-body-phone">{contact.phone}</a>
                <a href="#" className="modal-body-email">{contact.email}</a>
              </div>
            </div>
            <div className="modal-button">
              <Link className="modal-button-edit" to={`/contact/edit/${contact.id}`}>Edit</Link>
              <button onClick={() => handleDeleteContact()} className="modal-buttons-delete" type="button">
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;