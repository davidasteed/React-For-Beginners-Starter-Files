import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  // handleClick = () => this.props.addToOrder(this.props.index);

  // declared static because this variable is the same for all class instances
  static propTypes = {
    details: PropTypes.shape({
      // availability,
      desc: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired,
    addToOrder: PropTypes.func.isRequired
  };

  render() {
    // example of creating a lot of variables at once
    const {
      // availability,
      desc,
      image,
      name,
      price,
      status
    } = this.props.details;

    const isAvailable = status === "available";

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)} // create call a function returning another function
        >
          {isAvailable ? "Add To Cart" : "Sold Out"}
        </button>
      </li>
    );
  }
}

export default Fish;
