import React from 'react';

export class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div id='notFound'>
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
      )
    }
}