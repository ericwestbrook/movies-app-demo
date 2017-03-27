import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import 'whatwg-fetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {movies: []};
  }

  loadData() {
    fetch('/data/movies.json')
      .then(response => response.json())
      .then(json => {
        console.log(json.movies);
        this.setState({
          movies: json.movies
        })
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="movies__wrapper">
        <Search movies={this.state.movies} />
        <Header title="The Super Great Movie Theater" subtitle="1234 E. Entertainment Way. Santa Monica, CA 90212" />
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      movies: props.movies
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({searchValue: e.target.value});
  }

  render() {
    return (
      <div className="movies__search">
        <input type="text" id="search" placeholder="Search..." value={this.state.searchValue} onChange={this.handleChange} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="movies__header">
        <a href="javascript:void(0);"><img src="images/svg/arrow.svg" /></a>
        <div className="movies__header__content">
          <h1>{this.props.title}</h1>
          <h2>{this.props.subtitle}</h2>
        </div>
      </div>
    )
  }
}

class MovieList extends React.Component {
  render() {
    const date = new Date();
    const formattedDate = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
    const listItems = this.props.movies.map((movie) =>
      <li key={movie.slug}>
        <MoviePoster slug={movie.slug} />
      </li>
    )
    return (
      <div className="movies__list">
        <h3 className='movies__list__header movies__list__header--left'>Showings</h3>
        <h3 className='movies__list__header movies__list__header--right'>{formattedDate}</h3>
        <div className="clear-float" />
        <ul>{listItems}</ul>
      </div>
    );
  }
}

class MoviePoster extends React.Component {
  render() {
    const imgSrc = '/images/posters/' + this.props.slug + '.jpg';
    return (
      <img className="movies__poster" src={imgSrc} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
