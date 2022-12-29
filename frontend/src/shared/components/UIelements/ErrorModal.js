import React from "react";

import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Greska!"
      show={!!props.error}
      footer={<button onClick={props.onClear}>Ok</button>}
    >
      <h2>{props.error}</h2>
    </Modal>
  );
};

export default ErrorModal;
