import React from 'react';

export class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div id='about'>
          <div id='about__statement'>
            <h1>Hi, </h1>
            <p>
              My name is Gillis Werrebrouck and I'm a full-stack developer with a focus on backend development.
            </p>
            <br />
            <p>
              I study New Media and Communication Technology at Howest University of Aplied Sciences in Belgium.
            </p>
            <br />
            <p>
              Currently, I'm interning at UrbanStems in Washington D.C. as a full-stack developer.
            </p>
            <br />
            <a href={`${FILES_BASE_URL}/pdf/Resume_Gillis.Werrebrouck_EN.pdf`} target='_blank'>Read my resume</a>
          </div>
          <div id='about__images'>
            <img src={`${IMAGES_BASE_URL}/about/shot1.jpg`} alt='Gillis Werrebrouck' title='Gillis Werrebrouck' />
          </div>
        </div>
      )
    }
}