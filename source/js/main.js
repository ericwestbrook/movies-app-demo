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
        <SearchSvg />
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
  constructor(props) {
    super(props);
    this.state = {
      love: false,
      moreInfo: false
    };

    this.toggleLove = this.toggleLove.bind(this);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
  }

  toggleLove(e) {
    const love = !this.state.love;
    this.setState({love: love});
  }

  toggleMoreInfo(e) {
    const moreInfo = !this.state.moreInfo;
    this.setState({moreInfo: moreInfo});
  }

  render() {
    const listItems = this.props.movie.showings.map((showing) =>
      <span key={showing}>{showing}</span>
    )
    const classNames = 'movies__more-info ' + this.state.moreInfo.toString();
    const backgroundString = 'url("/images/posters/' + this.props.movie.slug + '.jpg")';
    return (
      <li className="movies__list__item">
        <MoviePoster slug={this.props.movie.slug} />
        <a className="movies__list__item__love" onClick={this.toggleLove}>
          <HeartSvg love={this.state.love} />
        </a>
        <div className="movies__list__item__details" onClick={this.toggleMoreInfo}>
          <h4>{this.props.movie.title} <span className="rating">{this.props.movie.rating}</span></h4>
          <h5>{listItems}</h5>
        </div>
        <a className="movies__list__item__more-info" onClick={this.toggleMoreInfo}>
          <ArrowSvg />
        </a>
        <div className={classNames}>
          <div className="wallpaper-bg" style={{backgroundImage: backgroundString}}></div>
          <div className="movies__more-info__content">
            <h1>{this.props.movie.title}</h1>
            <MoviePoster slug={this.props.movie.slug} />
            <h5>Rated: <span className="rating">{this.props.movie.rating}</span></h5>
            <p>{this.props.movie.description}</p>

            <div className="movies__more-info__footer">
              <a href="javascript:void(0);">Watch Trailer</a>
              <a href="javascript:void(0);">Buy Tickets</a>
            </div>
          </div>
          <a className="close-button" onClick={this.toggleMoreInfo}>
            Close <CloseSvg />
          </a>
        </div>
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
        <div className="movies__toolbar__share">
          <span>Share</span>
          <a href="javascript:void(0);">
            <TwitterSvg />
          </a>
          <a href="javascript:void(0);">
            <FacebookSvg />
          </a>
        </div>
      </div>
    );
  }
}

class SearchSvg extends React.Component {
  render() {
    return (
      <svg version="1.1" width="23" height="23" viewBox="0 0 32 32">
        <g id="icomoon-ignore">
        	<line strokeWidth="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""></line>
        </g>
      	<path className="path" d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12c0 6.627 5.373 12 12 12 2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
      </svg>
    );
  }
}

class HeartSvg extends React.Component {
  render() {
    const classNames = this.props.love.toString();
    return (
      <svg className={classNames} version="1.1" width="23" height="23" viewBox="0 0 32 32">
        <g id="icomoon-ignore">
        	<line strokeWidth="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""></line>
        </g>
      	<path className="path" strokeWidth="3" d="M32 11.192c0 2.699-1.163 5.126-3.015 6.808h0.015l-10 10c-1 1-2 2-3 2s-2-1-3-2l-9.985-10c-1.852-1.682-3.015-4.109-3.015-6.808 0-5.077 4.116-9.192 9.192-9.192 2.699 0 5.126 1.163 6.808 3.015 1.682-1.852 4.109-3.015 6.808-3.015 5.077 0 9.192 4.116 9.192 9.192z"></path>
      </svg>
    );
  }
}

class ArrowSvg extends React.Component {
  render() {
    return (
      <svg version="1.1" id="Layer_1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32">
        <g id="icomoon-ignore">
        	<line fill="none" x1="0" y1="0" x2="0" y2="0"/>
        </g>
        <g>
        	<g>
        		<polyline className="line" points="7.177,29.827 9.258,31.969 25.719,15.984 9.258,0 7.177,2.143 21.43,15.984 		"/>
        	</g>
        </g>
      </svg>
    );
  }
}

class CloseSvg extends React.Component {
  render() {
    return (
      <svg className="svg close" version="1.1" width="16" height="16" viewBox="0 0 32 32">
      <g id="icomoon-ignore">
      	<line strokeWidth="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""></line>
      </g>
      	<path className="path" d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
      </svg>
    );
  }
}

class TwitterSvg extends React.Component {
  render() {
    return (
      <svg version="1.1" width="23" height="23" viewBox="0 0 32 32">
        <g id="icomoon-ignore">
        	<line strokeWidth="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""></line>
        </g>
      	<path className="twitter" d="M32 6.076c-1.177 0.522-2.443 0.875-3.771 1.034 1.355-0.813 2.396-2.099 2.887-3.632-1.269 0.752-2.674 1.299-4.169 1.593-1.198-1.276-2.904-2.073-4.792-2.073-3.626 0-6.565 2.939-6.565 6.565 0 0.515 0.058 1.016 0.17 1.496-5.456-0.274-10.294-2.888-13.532-6.86-0.565 0.97-0.889 2.097-0.889 3.301 0 2.278 1.159 4.287 2.921 5.465-1.076-0.034-2.088-0.329-2.974-0.821-0.001 0.027-0.001 0.055-0.001 0.083 0 3.181 2.263 5.834 5.266 6.437-0.551 0.15-1.131 0.23-1.73 0.23-0.423 0-0.834-0.041-1.235-0.118 0.835 2.608 3.26 4.506 6.133 4.559-2.247 1.761-5.078 2.81-8.154 2.81-0.53 0-1.052-0.031-1.566-0.092 2.905 1.863 6.356 2.95 10.064 2.95 12.076 0 18.679-10.004 18.679-18.68 0-0.285-0.006-0.568-0.019-0.849 1.283-0.926 2.396-2.082 3.276-3.398z"></path>
      </svg>
    );
  }
}

class FacebookSvg extends React.Component {
  render() {
    return (
      <svg version="1.1" width="23" height="23" viewBox="0 0 32 32">
        <g id="icomoon-ignore">
        	<line strokeWidth="1" x1="" y1="" x2="" y2="" stroke="#449FDB" opacity=""></line>
        </g>
      	<path className="facebook" d="M17.996 32h-5.996v-16h-4v-5.514l4-0.002-0.007-3.248c0-4.498 1.22-7.236 6.519-7.236h4.412v5.515h-2.757c-2.064 0-2.163 0.771-2.163 2.209l-0.008 2.76h4.959l-0.584 5.514-4.37 0.002-0.004 16z"></path>
      </svg>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
