import React, {useState} from 'react';
import {MutationApiFormData} from '../../types';
import './Card.css';
import Modal from '../Modal/Modal';


interface Props {
  contact: MutationApiFormData;
}

const Card: React.FC<Props> = ({contact}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickModal = (status: boolean) => {
    setIsOpen(status);
  };

  return (
    <>
      <Modal contact={contact} isOpen={isOpen} onClose={handleClickModal}/>
      <div className="card" onClick={() => handleClickModal(true)}>
        <div className="card-img-inner">
          <img className="card-img" src={contact.photo} alt={contact.name}/>
        </div>
        <h3 className="card-contact-name">{contact.name}</h3>
      </div>
    </>
  );
};

export default Card;