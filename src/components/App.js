import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import SongRepo from '../songrepo';

// Converts from "Test Title (example)" to "test-title-example"
function convertToDashedLowercase(str) {
  return str.split(' ').join('-').split(/[?()'.]/).join('').toLowerCase();
}

class App extends Component {

  self;

  constructor(props) {
    super(props);
    console.log("Initialized app");
    this.songRepo = new SongRepo();
    self = this;
    this.state = {
      lyrics: 'No song chosen.',
      suggestions: [],
      chosenSong: '',
      songs: []
    };
  }

  componentDidMount() {
    this.songRepo.getSongList(res => {
      var songs = res.data || res;
      this.setState({
        songs: songs,
        suggestions: songs
      });
    }, err => {
      this.setState({ songs: err });
    });
  }

  getSuggestions(value) {
    const inputValue = convertToDashedLowercase(value);
    const inputLength = inputValue.length;

    return inputLength === 0 ? self.state.songs : self.state.songs.filter(song =>
      convertToDashedLowercase(song).slice(0, inputLength) === inputValue
    );
  }

  onChange(event, { newValue, method }) {
    self.setState({
      chosenSong: newValue
    });
  };

  onSuggestionSelected(event, { suggestion }) {
    // Fetch new song's lyrics
    self.songRepo.getSongLyrics(convertToDashedLowercase(suggestion), res => {
      self.setState({ lyrics: res });
    }, err => {
      self.setState({ lyrics: err });
    });
  }

  renderSuggestion(suggestion) {
    return (
      <div>{suggestion}</div>
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion;
  }

  onSuggestionsFetchRequested({ value }) {
    self.setState({ suggestions: self.getSuggestions(value) });
  }

  onSuggestionsClearRequested() {
    self.setState({ suggestions: [] });
  }

  shouldRenderSuggestions(value) {
    return true; // always try rendering suggestions
  }

  render() {
    const chosenSong = this.state.chosenSong;
    const suggestions = this.state.suggestions;
    const inputProps = {
      value: chosenSong,
      placeholder: 'Choose a song',
      onChange: this.onChange
    };

    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to JRTST</h1>
          <h2>Just Random Taylor Swift Things</h2>
        </div>
        <div className="App-intro">
          <Autosuggest
            suggestions={suggestions}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
            getSuggestionValue={this.getSuggestionValue}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            renderSuggestion={this.renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={inputProps}
          />
          <pre>
          {this.state.lyrics}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
