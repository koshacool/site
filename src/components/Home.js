import React from 'react';
// import Header from './Header';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch('/getdata') // or whatever URL you want
      .then((response) => response.json())
      .then((posts) => console.log(posts));

  }

  render() {
    const { children } = this.props;
    return (
      <div className="container">

        {children}
      </div>
    );
  }

}

export default Home;
