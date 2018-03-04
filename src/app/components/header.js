import React from 'react';

import { Navigation } from './navigation';
import { SocialMedia } from './socialMedia';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <header>
          <div>
            <h1>Gillis Werrebrouck</h1>
            <div>
              <SocialMedia/>
              <Navigation/>
            </div>
          </div>
        </header>
      )
    }
}