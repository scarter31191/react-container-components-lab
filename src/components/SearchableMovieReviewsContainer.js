import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
export default class SearchableMovieReviewsContainer extends Component {
    state = {
        searchTerm: "",
        reviews: []
    }

    handleSearchInputChange = event => {
        this.setState({searchTerm: event.target.value});
    }

    handlesubmit = event => {
        event.preventDefault();

        fetch(URL.concat(this.state.searchTerm))
        .then(res => res.json())
        .then(respones => this.setState({ reviews: respones.results}))
    }

    render() {
        return (
            <div className='searchable-movie-review'>
                <form onSubmit={this.handlesubmit}>
                    <lable htmlFor='search-input'>Search Movie Reviews</lable>
                    <input id='search-input' type='text' style={{width: 300}} onChange={this.handleSearchInputChange}/>
                    <button type='submit'>Submit</button>
                </form>
                {typeof this.state.reviews === 'object' && this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
                <MovieReviews reviews={this.state.reviews}/>
            </div>
        )
    }
}
