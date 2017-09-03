import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router';

import {Modal, Button} from 'react-materialize';


class ModalManager extends React.Component {


  render() {
    const { header, trigger, content, actions } = this.props;
    return (
      <div className="container">

       <Modal
	header={header}
	trigger={<Button>{trigger}</Button>}
  actions={
    <div>
    <Button className="modal-action modal-close">close</Button>
    {actions}
    </div>
  }
  >
	{content}
	</Modal>

</div>
    );
  }

}

ModalManager.propTypes = {
  header: PropTypes.string.isRequired,
  trigger: PropTypes.string.isRequired,
  actions: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
};

export default ModalManager;
