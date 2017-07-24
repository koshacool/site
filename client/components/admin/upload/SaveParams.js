import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Input } from 'react-materialize';


const SaveParams = ({ onSave, onChangeInput, type }) => {
  return (
    <div>
      <Button onClick={onSave}>Save</Button>

      <Row>
        <Input s={6} type="text" label="Description" id="description" onChange={onChangeInput('description')}
               validate/>
      </Row>
      <Row>
        <Input
          name='type'
          type='checkbox'
          value='wedding'
          label='Wedding'
          checked={type == 'wedding' ? true : false}
          onChange={onChangeInput('type')}
        />
        <Input name='type'
               type='checkbox'
               value='lovestory'
               label='Lovestory'
               checked={type == 'lovestory' ? true : false}
               onChange={onChangeInput('type')}
        />
        <Input
          name='type'
          type='checkbox'
          value='children'
          label='Children'
          checked={type == 'children' ? true : false}
          onChange={onChangeInput('type')}
        />
      </Row>
    </div>
  )
};

SaveParams.propTypes = {
  onSave: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default SaveParams;
