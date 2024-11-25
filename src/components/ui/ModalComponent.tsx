import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type CustomModalProps = {
  show: boolean; // Indique si la modale est visible
  onClose: () => void; // Fonction pour fermer la modale
  title: string; // Titre de la modale
  submitId: string;
  footer?: boolean;
  buttons?: {
      cancel?: string;
      submit?: string;
    };
  children: React.ReactNode; // Contenu à afficher dans le corps
  onSave?: () => void; // Fonction appelée lors de "Save Changes"
};

const ModalComponent: React.FC<CustomModalProps> = ({ show, onClose,submitId, title, children, footer = true,buttons, onSave }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
     {footer && (<Modal.Footer>
        <Button 
         variant="secondary"
         onClick={onClose}>
          Cancel
         </Button>
          <Button 
            variant="primary"
            type="submit"
            form={submitId}
            onClick={onSave}
            >
            {buttons?.submit ? (
                <span>{buttons?.submit}</span>
              ) : (
                <span>Submit</span>
            )}
          </Button>
      </Modal.Footer>)}
    </Modal>
  );
};

export default ModalComponent;
