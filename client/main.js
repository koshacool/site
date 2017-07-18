import React from 'react';
import { render } from 'react-dom';

import renderRoutes from './Routes';

render(
  renderRoutes(),
  document.getElementById('mount-point')
);
