import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Create.css";
import { app } from "../base";
import "firebase/firestore";

const db = app.firestore();

function Create(props) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [rooms, setRooms] = useState();
  const [floor, setFloor] = useState();
  const [area, setArea] = useState();
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [homes, setHomes] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const [isSelectedCategory, setIsSelectedCategory] = useState();
  const [categoryName, setCategoryName] = useState();
  const [cardName, setCardName] = useState();

  const handleCard = (title) => {
    setIsSelected(title);
    setCardName(title); // 1 - კორპ.ბინა 2 - კერძო სახლი 3 - კომ.ფართი 4 - სხვა
  };

  useEffect(() => {
    setmodalIsOpen(props.openPopup);
  }, [props.openPopup]);

  const onChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const addAdvertisement = async (e) => {
    axios.post(`http://localhost:3001/addhome`, {
      category: categoryName,
      typeCard: cardName,
      image:
        fileUrl ||
        "https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png",
      name: name,
      room: rooms,
      floor: floor,
      area: area,
      address: address,
      desc: desc,
      price: price,
    });

    props.exitModalFnct();
    const imgName = e.target.name.value;
    if (!imgName) {
      return;
    }

    db.collection("home-market-98990-default-rtdb").doc(imgName).set({
      name: imgName,
      image: fileUrl,
    });
  };

  useEffect(() => {
    const fetchHomes = async () => {
      const homesCollection = await db
        .collection("home-market-98990-default-rtdb")
        .get();
      setHomes(
        homesCollection.docs.map((doc) => {
          return doc.data;
        })
      );
    };
    fetchHomes();
  }, []);

  const handleCategory = (title) => {
    setCategoryName(title);
    setIsSelectedCategory(title);
  };

  return (
    <div>
      <Modal
        style={{ overlay: { zIndex: 1000 } }}
        className="Modal add-modal"
        id="modal-form"
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
                    <button
                      className={
                        isSelectedCategory === "For Sale"
                          ? "btn btn-outline-success category-buttons for-sale is-selected"
                          : "btn btn-outline-success category-buttons for-sale"
                      }
                      onClick={() => handleCategory("For Sale")}
                    >
                      For Sale
                    </button>
                    <button
                      className={
                        isSelectedCategory === "For Rent"
                          ? "btn btn-outline-success category-buttons for-sale is-selected"
                          : "btn btn-outline-success category-buttons for-sale"
                      }
                      onClick={() => handleCategory("For Rent")}
                    >
                      For Rent
                    </button>
                    <button
                      className={
                        isSelectedCategory === "For Daily Rent"
                          ? "btn btn-outline-success category-buttons for-sale is-selected"
                          : "btn btn-outline-success category-buttons for-sale"
                      }
                      onClick={() => handleCategory("For Daily Rent")}
                    >
                      For Daily Rent
                    </button>
                  </div>
                </div>
                {isSelectedCategory && (
                  <div className="add-type-home">
                    <button
                      className={
                        isSelected === "კორპუსის ბინა"
                          ? "btn btn-outline-success type-button is-selected"
                          : "btn btn-outline-success type-button"
                      }
                      onClick={() => handleCard("კორპუსის ბინა")}
                    >
                      კორპუსის ბინა
                    </button>

                    <button
                      className={
                        isSelected === "კერძო სახლი"
                          ? "btn btn-outline-success type-button is-selected"
                          : "btn btn-outline-success type-button  "
                      }
                      onClick={() => handleCard("კერძო სახლი")}
                    >
                      კერძო სახლი
                    </button>

                    <button
                      className={
                        isSelected === "კომერციული ფართი"
                          ? "btn btn-outline-success type-button is-selected"
                          : "btn btn-outline-success type-button  "
                      }
                      onClick={() => handleCard("კომერციული ფართი")}
                    >
                      კომერციული ფართი
                    </button>

                    <button
                      className={
                        isSelected === "სხვა"
                          ? "btn btn-outline-success type-button is-selected"
                          : "btn btn-outline-success type-button  "
                      }
                      onClick={() => handleCard("სხვა")}
                    >
                      სხვა
                    </button>
                  </div>
                )}

                {isSelected && (
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
                        onChange={onChange}
                      />
                      {fileUrl && (
                        <img
                          className="uploaded-image"
                          alt="uploaded"
                          src={fileUrl}
                        />
                      )}
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
                onClick={addAdvertisement}
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
