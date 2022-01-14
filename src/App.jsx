import { Component, useReducer, useState } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import propTypes from "prop-types"

import { ToastContainer } from 'react-toastify';
import { Zoom } from 'react-toastify';

import s from './App.module.scss';

export default function App() {
  const [searchString, setSearchString] = useState("")

  const [showModal, setShowModal] = useState(false)
 const [modalImage, setModalImage] = useState("")
 const [modalAlt, setModalAlt] = useState("")

  const handleFormSubmit =  data=> {
    setSearchString(data)
  };

  function toggleModal  (largeImageURL, alt)  {
    
    setShowModal(!showModal)
      setModalImage(largeImageURL)
      setModalAlt(alt)
  };

    return (
      <div className={s.app}>
        {showModal && (
          <Modal src={modalImage} alt={modalAlt} onClose={toggleModal} />
        )}
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          searchString={searchString}
          toggleModal={toggleModal}
        />
        <ToastContainer autoClose={4000} theme="colored" transition={Zoom} />
      </div>
    );
  
}


App.propTypes = {
  showModal: propTypes.bool,
  modalImage: propTypes.string,
  modalAlt: propTypes.string
}

// class App extends Component {
  
//   state = {
//     searchString: '',
//     showModal: false,
//     modalImage: '',
//     modalAlt: '',
//   };

//   handleFormSubmit = data => {
//     this.setState({ searchString: data });
//   };

//   toggleModal = (largeImageURL, alt) => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       modalImage: largeImageURL,
//       modalAlt: alt,
//     }));
//   };

//   render() {
//     const { searchString, showModal, modalImage, modalAlt } = this.state;

//     return (
//       <div className={s.app}>
//         {showModal && (
//           <Modal src={modalImage} alt={modalAlt} onClose={this.toggleModal} />
//         )}
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery
//           searchString={searchString}
//           toggleModal={this.toggleModal}
//         />
//         <ToastContainer autoClose={4000} theme="colored" transition={Zoom} />
//       </div>
//     );
//   }
// }

// export default App;

