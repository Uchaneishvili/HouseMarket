import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Create.css";

function Create(props) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [rooms, setRooms] = useState();
  const [floor, setFloor] = useState();
  const [area, setArea] = useState();
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState();

  const handleCard = () => {
    setIsDetailOpen(true);
  };

  useEffect(() => {
    setmodalIsOpen(props.openPopup);
  }, [props.openPopup]);

  const addAdvertisement = async () => {
    axios.post(`http://localhost:3001/addhome`, {
      image: "ss",
      name: name,
      room: rooms,
      floor: floor,
      area: area,
      address: address,
      desc: desc,
    });
    props.exitModalFnct();
  };

  return (
    <div>
      <Modal
        style={{ overlay: { zIndex: 1000 } }}
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
                  <div className="label-category-container">
                    <label className="label-category-buttons">კატეგორია:</label>
                  </div>

                  <div className="create-modal-category-buttons">
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
                </div>

                <div className="add-type-home">
                  <button
                    className="btn btn-outline-success type-button"
                    onClick={() => handleCard()}
                  >
                    კორპუსის ბინა
                  </button>

                  <button
                    className="btn btn-outline-success type-button"
                    onClick={() => handleCard()}
                  >
                    კორპუსის ბინა
                  </button>

                  <button
                    className="btn btn-outline-success type-button"
                    onClick={() => handleCard()}
                  >
                    კორპუსის ბინა
                  </button>

                  <button
                    className="btn btn-outline-success type-button"
                    onClick={() => handleCard()}
                  >
                    კორპუსის ბინა
                  </button>
                </div>

                {isDetailOpen && (
                  <form className="popupForm">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control add-home-info price"
                        placeholder="$"
                        name="name"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control add-home-info name"
                        placeholder="Enter the name of advertisement"
                        aria-label="name"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                      <div className="home-parameter">
                        <input
                          type="number"
                          className="form-control add-home-info room"
                          placeholder="Number of the rooms"
                          aria-label="name"
                          name="rooms"
                          value={rooms}
                          onChange={(event) => setRooms(event.target.value)}
                        />

                        <input
                          type="number"
                          className="form-control add-home-info floor"
                          placeholder="Floor"
                          aria-label="name"
                          name="floor"
                          value={floor}
                          onChange={(event) => setFloor(event.target.value)}
                        />

                        <input
                          type="number"
                          className="form-control add-home-info area"
                          placeholder="Area"
                          aria-label="name"
                          name="area"
                          value={area}
                          onChange={(event) => setArea(event.target.value)}
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control add-home-info room"
                        placeholder="Enter the address"
                        aria-label="name"
                        name="address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                      />

                      <textarea
                        name="desc"
                        className="form-control add-home-info desc"
                        placeholder="Enter the description for the advertisement"
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                      />

                      <input
                        className="form-control"
                        type="file"
                        name="image"
                        id="formFile"
                      />
                      <img
                        className="uploaded-image"
                        src="https://image.shutterstock.com/image-vector/vector-illustration-cool-detailed-red-260nw-94498447.jpg"
                      />
                    </div>
                  </form>
                )}
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addAdvertisement()}
              >
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
