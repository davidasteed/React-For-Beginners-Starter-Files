import React from "react";
import PropTypes from "prop-types";
import base from "../base";
import Fish from "./Fish";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";

class App extends React.Component {
  // create the state used by the application (initially empty)
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object
    })
  };

  componentDidMount() {
    const { params } = this.props.match;

    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });

      // console.log("order is now: ", this.state.order);
    }

    // potential bug:  the localStorage is updating *only* the order,
    // but the fish data has yet to be fetched from firebase (see below).
    // so the components that require fish data will error out when they
    // attempt to render because there won't be any fish data yet

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // take a copy of the existing state
    const fishes = { ...this.state.fishes };

    // add incoming object as a new fish in the temp state variable
    fishes[`fish${Date.now()}`] = fish; // uses current timestamp to build a unique key

    // overwrite the existing state property with the new value
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    // 1.  take a copy of state
    const order = { ...this.state.order };

    // 2.  either increment an existing order, or add a new order
    order[key] = order[key] + 1 || 1;

    // 3.  call setState() to update our state object
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  // another way to iterate over an object in JavaScript
  printFishes = () => {
    for (const fish in this.state.fishes) {
      console.log(fish);
    }
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => {
              // console.log("key.name: ", this.state.fishes[key].name);
              return (
                <Fish
                  addToOrder={this.addToOrder}
                  details={this.state.fishes[key]}
                  index={key}
                  key={key}
                >
                  {key}
                </Fish>
              );
            })}
          </ul>
        </div>
        <Order
          deleteFish={this.deleteFish}
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          fishes={this.state.fishes}
          loadSampleFishes={this.loadSampleFishes}
          removeFromOrder={this.removeFromOrder}
          updateFish={this.updateFish}
        />
      </div>
    );
  }
}

export default App;
