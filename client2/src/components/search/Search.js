import React from 'react'
import PropTypes from 'prop-types'
import Searchbar from './Searchbar'
import Footer from '../Header/Footer'
import SearchDefaults from './SearchDefaults'

const Search = props => {
    return (
        <div>
           {/* search bar  */}
            <Searchbar />

            <SearchDefaults/>
           {/* search results */}
           <Footer />
        </div>
    )
}

Search.propTypes = {

}

export default Search
