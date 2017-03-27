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
        <Toolbar />
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
        <a href="javascript:void(0);"><ArrowSvg /></a>
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
      <MovieListItem key={movie.slug} movie={movie} />
    )
    return (
      <div className="movies__list">
        <div className="movies__list__header__wrapper">
          <h3 className='movies__list__header movies__list__header--left'>Showings</h3>
          <h3 className='movies__list__header movies__list__header--right'>{formattedDate}</h3>
          <div className="clear-float" />
        </div>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

class MovieListItem extends React.Component {
  render() {
    const listItems = this.props.movie.showings.map((showing) =>
      <span key={showing}>{showing}</span>
    )
    return (
      <li className="movies__list__item">
        <MoviePoster slug={this.props.movie.slug} />
        <a className="movies__list__item__love" href="javascript:void(0);">
          <HeartSvg />
        </a>
        <div className="movies__list__item__details">
          <h4>{this.props.movie.title} <span className="rating">{this.props.movie.rating}</span></h4>
          <h5>{listItems}</h5>
        </div>
        <a className="movies__list__item__more-info" href="javascript:void(0);">
          <ArrowSvg />
        </a>
      </li>
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

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: 'All Ratings'
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
  }

  toggleMenu() {
    const isOpen = !this.state.isOpen;
    this.setState({isOpen: isOpen});
  }

  setSelectedOption(opt) {
    this.setState({selectedOption: opt});
    this.setState({isOpen: false});
  }

  render() {
    const classNames = 'dropdown__wrapper ' + this.state.isOpen.toString();
    return (
      <div className="movies__toolbar">
        <div className={classNames}>
          <a className="dropdown__button" onClick={this.toggleMenu}>{this.state.selectedOption}</a>
          <ul className="dropdown__options">
            <li onClick={() => {this.setSelectedOption('All Ratings')}}>All Ratings</li>
            <li onClick={() => {this.setSelectedOption('G')}}>G</li>
            <li onClick={() => {this.setSelectedOption('PG')}}>PG</li>
            <li onClick={() => {this.setSelectedOption('PG-13')}}>PG-13</li>
            <li onClick={() => {this.setSelectedOption('R')}}>R</li>
          </ul>
        </div>
      </div>
    );
  }
}

class HeartSvg extends React.Component {
  render() {
    return (
      <svg version="1.1" width="32" height="32" viewBox="0 0 32 32">
        <g id="icomoon-ignore">
        	<line className="line" strokeWidth="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""></line>
        </g>
      	<path className="path" d="M32 11.192c0 2.699-1.163 5.126-3.015 6.808h0.015l-10 10c-1 1-2 2-3 2s-2-1-3-2l-9.985-10c-1.852-1.682-3.015-4.109-3.015-6.808 0-5.077 4.116-9.192 9.192-9.192 2.699 0 5.126 1.163 6.808 3.015 1.682-1.852 4.109-3.015 6.808-3.015 5.077 0 9.192 4.116 9.192 9.192z"></path>
      </svg>
    );
  }
}

class ArrowSvg extends React.Component {
  render() {
    return (
      <svg version="1.1" id="Layer_1" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32">
      <g id="icomoon-ignore">
      	<line fill="none" x1="0" y1="0" x2="0" y2="0"/>
      </g>
      <g>
      	<g>
      		<polyline className="line" points="7.177,29.827 9.258,31.969 25.719,15.984 9.258,0 7.177,2.143 21.43,15.984 		"/>
      	</g>
      </g>
      </svg>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
