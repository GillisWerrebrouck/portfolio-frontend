import React from 'react';

export class SocialMedia extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <nav>
          <ul>
            <a href='https://www.linkedin.com/in/gilliswerrebrouck' target='_blank'><li><i className="fab fa-linkedin-in"></i></li></a>
            <a href='https://github.com/GillisWerrebrouck' target='_blank'><li><i className="fab fa-github"></i></li></a>
            <a href='https://www.instagram.com/gilliswerrebrouck/?hl=en' target='_blank'><li><i className="fab fa-instagram"></i></li></a>
            <a href='mailto:gillis-wer@hotmail.be'><li><i className="fas fa-envelope"></i></li></a>
          </ul>
        </nav>
      )
    }
}