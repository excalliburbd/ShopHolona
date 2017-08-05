import React from 'react';

import Dialog from 'react-toolbox/lib/dialog/Dialog';

// import './ImageUploader.css';

const Confirm = ({
  active,
  handleClose,
  handleDone,
  actionTitle,
  actionStatement,
  action,
}) => {
  return (
    <Dialog className="Confirm"
            actions={[
              {
                label: 'No',
                onClick: handleClose,
                primary: true,
                raised: true,
              },
              {
                label: 'I\'m sure',
                onClick: () => handleDone(action),
                raised: true,
              },
            ]}
            active={ active }
            onEscKeyDown={ handleClose }
            onOverlayClick={ handleClose }
            title={ actionTitle }
          >
      <div className="Cofirm-content">
        <h3>Are you sure you want to { actionStatement }?</h3>
      </div>
    </Dialog>
  );
}

export default Confirm;
