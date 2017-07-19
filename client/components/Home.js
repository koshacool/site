import React from 'react';
import {Link} from 'react-router';

class Home extends React.Component {


  render() {
    const { children } = this.props;
    return (
      <div className="container">

        testing...
        <Link to="/admin" ><button>test</button></Link>
      </div>
    );
  }

}

export default Home;
