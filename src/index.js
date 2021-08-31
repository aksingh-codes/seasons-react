import React from "react";
import ReactDOM from "react-dom";
import SeasonsDisplay from "./SeasonsDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  // Its not react's own method we created as a helper function
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonsDisplay lat={this.state.lat} />
    }
    else {
      return <Spinner message="Please allow acccess to location" />
    }
  }
  
  render() {
    return (
      <div className="App">
        {this.renderContent()}
      </div>
    );
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // we called setstate
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
