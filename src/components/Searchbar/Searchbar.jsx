import React, { PureComponent, useState } from 'react';
import propTypes from "prop-types"

import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

import s from './Searchbar.module.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({onSubmit}) {
  const [searchString, setSearchString] = useState('')
 
  function handleInputChange  (e)  {
    setSearchString( e.currentTarget.value.toLowerCase() );
  };

 function handleSubmit ( e) {
    e.preventDefault();

    if (searchString.trim() === '') {
          toast.error('Введите что-то');
      return;
    }

    onSubmit(searchString.trim()); 
    setSearchString("")
  };

  
  return (
      <header className={s.searchBar}>
        <form className={s.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
           
            <ImSearch />
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            value={searchString} 
            onChange={handleInputChange}
          />
        </form>
      </header>
    );  
  
}
Searchbar.propTypes = {
  searchString: propTypes.string
}

// export default class Searchbar extends PureComponent {
//   state = {
//     searchString: '',
//   };

//   handleInputChange = e => {
//     this.setState({ searchString: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.searchString.trim() === '') {
//           toast.error('Введите что-то');
//       return;
//     }

//     this.props.onSubmit(this.state.searchString.trim()); 
//     this.setState({ searchString: '' });
//   };

//   render() {
//     return (
//       <header className={s.searchBar}>
//         <form className={s.searchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s.searchFormButton}>
           
//             <ImSearch />
//           </button>

//           <input
//             className={s.searchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="search"
//             value={this.state.searchString} 
//             onChange={this.handleInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
// Searchbar.propTypes = {
//   searchString: propTypes.string
// }