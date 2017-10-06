import React from 'React';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  onInputChange(query) {
    this.setState({query});
    this.props.onChange(query);
  }

  render() {
    return (
      <div>
        <input className="searchBar"
               placeholder="Enter a Zipcode to Get Started!"
               type="text"
               onChange={event => this.onInputChange(event.target.value)} />
        </div>
      )
  }
}

export default Search;
