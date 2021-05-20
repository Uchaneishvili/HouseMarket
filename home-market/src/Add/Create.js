import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import "./Create.css";

function Create(props) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  useEffect(() => {
    setmodalIsOpen(props.openPopup);
  }, [props.openPopup]);

  return (
    <div>
      <Modal
        className="Modal add-modal"
        ariaHideApp={false}
        isOpen={modalIsOpen}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add advertisement
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => props.exitModalFnct()}
              />
            </div>

            <div class="modal-body">
              <div className="popup">
                <form className="popupForm">
                  <div className="form-group">
                    <div class="mb-3">
                      <input class="form-control" type="file" id="formFile" />
                    </div>
                    <input
                      type="text"
                      className="form-control name"
                      placeholder="Enter the name of advertisement"
                      aria-label="name"
                      name="name"
                    />

                    <input
                      type="number"
                      className="form-control room"
                      placeholder="Number of the rooms"
                      aria-label="name"
                      name="name"
                    />

                    <input
                      type="number"
                      className="form-control room"
                      placeholder="Floor"
                      aria-label="name"
                      name="name"
                    />

                    <input
                      type="number"
                      className="form-control room"
                      placeholder="Area"
                      aria-label="name"
                      name="name"
                    />

                    <input
                      type="text"
                      className="form-control room"
                      placeholder="Enter the address"
                      aria-label="name"
                      name="name"
                    />

                    <textarea
                      className="form-control desc"
                      placeholder="Enter the description for the advertisement"
                    />
                  </div>
                </form>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => props.exitModalFnct()}
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Create;
