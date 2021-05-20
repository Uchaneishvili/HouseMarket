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
        <div className="modal-dialog create-modal">
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

            <div className="modal-body">
              <div className="popup">
                <div className="category-buttons-add-container">
                  <button className="btn btn-outline-success category-buttons for-sale">
                    For Sale
                  </button>
                  <button className="btn btn-outline-success category-buttons for-rent">
                    For Rent
                  </button>
                  <button className="btn btn-outline-success category-buttons for-daily-rent">
                    For Daily Rent
                  </button>
                </div>

                <div className="type-card">
                  <div className="card house-card">
                    <img
                      src="https://assets.architecturaldigest.in/photos/600845b5eebcfd50ede87936/16:9/w_2560%2Cc_limit/Bengaluru-home-Bodhi-Design-Studio-17-1366x768.jpg"
                      className="card-img-top cart-image"
                      alt="..."
                    />
                    <div className="card-body">
                      <p className="card-title">House for sale</p>
                      <p className="card-text desc">
                        47.7 sq.m. apartment for sale on the 5th floor (10
                        floors in total) Green frame Price: 47 700 $.
                      </p>
                      <div className="dollar-price">
                        <p className="card-text price">47 700</p>
                        <img
                          className="dollar-sign"
                          alt="dollar"
                          src="./icons/fi_dollar-sign.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <form className="popupForm">
                  <div className="form-group">
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
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

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => props.exitModalFnct()}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
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
