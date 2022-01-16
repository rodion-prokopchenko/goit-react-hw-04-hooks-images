import React, { useState, useEffect } from 'react';
import axiosFetch from 'services/pixabayAPI';
import { toast } from 'react-toastify';
import propTypes from "prop-types"

import ImageGalleryIdleView from './statuses/ImageGalleryIdleView';
import ImageGalleryPendingView from './statuses/ImageGalleryPendingView';
import ImageGalleryErrorView from './statuses/ImageGalleryErrorView';
import ImageGalleryDataView from './statuses/ImageGalleryDataView';
import Button from 'components/Button/Button';

import 'react-toastify/dist/ReactToastify.css';

export default function ImageGallery({toggleModal, searchString}) {
  const [status, setStatus] = useState("idle")
    
  const [error, setError] = useState(null)
  const [imageArray, setImageArray] = useState([])
  const [page, setPage] = useState(1)

  useEffect(async () => {
    console.log(page.prevPage)
    if (searchString === "") {
      return
    }
    if (searchString !== "") {
      
      setPage(1)
      setStatus("pending")
      try {
        const fetchResult =  await axiosFetch(searchString, page);

        console.log(fetchResult)
        if (fetchResult.length === 0) {
          throw (setStatus('rejected')
            (new Error(`По запросу ${searchString} ничего нет`),
              toast.warn('Пусто'))
            
          );
        }
 
       setImageArray([...fetchResult])
       setStatus("resolved")
          
        toast.success('Нашли!');
      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    }
  }, [searchString])

  useEffect(async() => {
    if (page !== 1) {
      setStatus("pending")

      axiosFetch(searchString, page)
        .then(result => {

          if (result.length === 0) {
            return Promise.reject(             
              new Error(`По запросу ${searchString} ничего нет`),
              toast.warn('Пусто'),
              setStatus("resolved")
            );
          }


         setImageArray([...imageArray, ...result])
         setStatus("resolved")
        
          toast.success('Нашли!');
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }, [page])
  
 function incrPage  () {
    setPage(page + 1)
  };


    return (
      <>
        {status === 'idle' && <ImageGalleryIdleView />}
        {status === 'pending' && <ImageGalleryPendingView />}
        {status === 'rejected' && (
          <ImageGalleryErrorView message={error} />
        )}
        {status === 'resolved' && (
          <>
            <ImageGalleryDataView
              imageArray={imageArray}
              toggleModal={toggleModal}
            />
            <Button pageDown={incrPage} />;
          </>
        )}
      </>
    );
}
  
ImageGallery.propTypes = {
  error: propTypes.string,
  status: propTypes.string,
  page: propTypes.number
}


// export default class ImageGallery extends Component {
//   state = {
//     imageArray: [],
//     error: null,
//     status: 'idle',
//     page: 1,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevSearch = prevProps.searchString;
//     const nextSearch = this.props.searchString;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevSearch !== nextSearch) {
//       this.setState({ status: 'pending', page: 1 });

//       try {
//         const fetchResult = await axiosFetch(nextSearch, nextPage);

//         if (fetchResult.length === 0) {
//           throw (
//             (new Error(`По запросу ${nextSearch} ничего нет`),
//             toast.warn('Пусто'))
//           );
//         }

//         this.setState({
//           imageArray: [...fetchResult],
//           status: 'resolved',
//         });
//         toast.success('Нашли!');
//       } catch (error) {
//         console.log(error);
//         this.setState({ error, status: 'rejected' });
//       }
//     }

//     if (prevPage !== nextPage) {
//       this.setState({ status: 'pending' });

//       axiosFetch(nextSearch, nextPage)
//         .then(result => {
//           if (result.length === 0) {
//             return Promise.reject(
//               new Error(`По запросу ${nextSearch} ничего нет`),
//               toast.warn('Пусто'),
//             );
//           }

//           this.setState(prevState => ({
//             imageArray: [...prevState.imageArray, ...result],
//             status: 'resolved',
//           }));
//           toast.success('Нашли!');
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   incrPage = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { imageArray, error, status } = this.state;

//     return (
//       <>
//         {status === 'idle' && <ImageGalleryIdleView />}
//         {status === 'pending' && <ImageGalleryPendingView />}
//         {status === 'rejected' && (
//           <ImageGalleryErrorView message={error.message} />
//         )}
//         {status === 'resolved' && (
//           <>
//             <ImageGalleryDataView
//               imageArray={imageArray}
//               toggleModal={this.props.toggleModal}
//             />
//             <Button pageDown={this.incrPage} />;
//           </>
//         )}
//       </>
//     );
//   }
// }
// ImageGallery.propTypes = {
//   error: propTypes.string,
//   status: propTypes.string,
//   page: propTypes.number
// }