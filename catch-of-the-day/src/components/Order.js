import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    deleteFish: PropTypes.func,
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";

    /* An alternative notation to having the attributes repeated three times 
     * is to use spread operator to populate the following attributes:
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{ enter: 500, exit: 500 }}
      >
    */

    const transitionOptions = {
      classNames: "order",
      key: key,
      timeout: { enter: 500, exit: 500 }
    };

    // this is a workaround.  during app component mounting, there is a short time
    // when the fetch to firebase is occuring and no fish data is available.
    // so we won't display any fish data until it is availabe
    if (!fish) {
      return null;
    }

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition {...transitionOptions}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0); // when using numbers with reduce() you must always furnish a starting value

    return (
      <div className="order-wrap">
        <h1>Order</h1>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
