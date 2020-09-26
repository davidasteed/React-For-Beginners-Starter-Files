import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  myInput = React.createRef(); // "surface" the <input> on the React component so we can "grab" it

  // as an alternative to declaring functions as properties using arrow functions:
  // here is an annoying way to get a function to have access to the "this" of the class.
  // so that that function can access class properties/functions.
  // constructor() {
  //   super(); // have to call super() in order to gain access to the "this" object
  //   this.goToStore = this.goToStore.bind(this); // bind the "this" for this function to the "this" of the class
  // }

  goToStore = (event) => {
    // stop the form from submitting
    event.preventDefault();

    // get the text from the user input
    const inputString = this.myInput.current.value;

    // navigate to whatever they entered
    this.props.history.push(`/store/${inputString}`);
  };

  render() {
    // return <p> I am the Store Picker! </p>;

    // poor way of writing react html:
    // return React.createElement('p', { className: 'p-tag-with-span'}, React.createElement('span'));

    // returning sibling elements needs a special wrapper:
    // return (
    //   <React.Fragment>
    //     <p>sibling p1</p>
    //     <p>sibling p2</p>
    //   </React.Fragment>
    // )

    // or:
    // return (
    //   <>
    //     {/* this is a a comment in a jsx javascript block */}
    //     {/* below is commented out code in jsx: */}
    //     {/* <p>sibling p1</p> */}
    //     <p>sibling p1</p>
    //     <p>sibling p2</p>
    //   </>
    // );

    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store &#x2192;</button>
      </form>
    );
  }
}

export default StorePicker;
