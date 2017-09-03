import React from 'react';
import {Link} from 'react-router';

import {Button} from 'react-materialize';

import ModalManager from './ModalManager/ModalManager';


class Home extends React.Component {


  render() {
    const { children } = this.props;
    return (
      <div className="container">

       <ModalManager 
       	trigger="add1"
       	header="try modal"
       	actions={<Button onClick={()=>console.log('work')}>test</Button>}
       	content="11111111"
       />
 <ModalManager 
       	trigger="add2"
       	header="try modal"
       	actions={<Button onClick={()=>console.log('work')}>test</Button>}
       	content="2222222"
       />
        <ModalManager 
       	trigger="add3"
       	header="try modal"
       	actions={<Button onClick={()=>console.log('work')}>test</Button>}
       	content="33333333"
       />

	      </div>

    );
  }

}


export default Home;

