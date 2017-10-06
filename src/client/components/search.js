import React from 'React';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  onInputChange(e) {
    this.setState({value: e.target.value});
    this.props.onClick(e.target.value);
  }
  render() {
    return (
      <div>
        <input className="input"
               placeholder="Enter a Zipcode to Search!"
               type="text" />
        <input onClick={this.onInputChange.bind(this)} className="button" type="button" value="search"></input>
        </div>
      )

  }
}

export default Search;
