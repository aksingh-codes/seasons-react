import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    // THIS IS THE ONLY TIME we do direct assignment
    // to this.state
    this.state = { lat: null, errorMessage: "" };

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

  render() {
    return (
      <div>
        {this.state.errorMessage
          ? null
          : this.state.lat
          ? `Latitude: ${this.state.lat}`
          : `Latitude: loading...`}
        {this.state.errorMessage && `Error: ${this.state.errorMessage}`}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
