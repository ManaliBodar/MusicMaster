import React, { Component } from "react";
import Artist from "./Artist";


//for fetch data set url into const function variable
const API_ADDRESS='https://spotify-api-wrapper.appspot.com';

class App extends Component {
  state ={artistQuery:'' , artist: null ,tracks:[]};

updateArtistquery = event =>{
    this.setState({artistQuery:event.target.value});
}

//for onkeypress in search
handleKeyPress = event =>{
  if(event.key === 'Enter')
  {
    this.searchArtist();
  }
}

//for the search artist
searchArtist = () =>{
  fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
  .then(response => response.json())
  .then(json =>{
    //if artist serach is not valid
    if(json.artists.total > 0)
    {
      const artist = json.artists.items[0];
     
      this.setState({ artist });

      //for top tracks 
      fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
      .then(response => response.json())
      .then(json => this.setState({ tracks : json.tracks}))
      .catch(error => alert(error.message));

    }
    
  })
  .catch(error => alert(error.message));
}

  render() {
    console.log('this.state',this.state);
    return (
    <div style={{ backgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,height:400}}>
      <h2>Music Master</h2>
      
      <input onChange={this.updateArtistquery} onKeyPress={this.handleKeyPress} placeholder="Search for an artist" />
      <button type="" onClick={this.searchArtist}>Search</button>
      <Artist artist={this.state.artist}/>
    </div>
    
  );
}
}

export default App;
