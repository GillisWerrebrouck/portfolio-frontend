import React from 'react';
import moment from 'moment';

import data from '../services/data.module';

export class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          slug: this.props.match.params.slug,
          loading: true,
          project: {},
        };

        this.currentImageIndex = 0;
        this.updateArrows = this.updateArrows.bind(this);
    }

    componentWillMount() {
      data.http.get(`${API_BASE_URL}/projects/${this.state.slug}`).then((project) => {
        if (Object.keys(project).length === 0) {
          return this.props.history.push('/404');
        }
        
        this.setState({
          loading: false,
          project: project,
        });
        this.updateArrows();
      });
    }

    previousImg() {
      this.currentImageIndex--;
      this.updateArrows();
      const images = document.querySelectorAll('.image__container');
      for (let i = 0, l = images.length; i < l; i++) {
        let translate3dValue = this.getTranslate3dValue(images[i]);
        images[i].style.transform = "translate3d(" + (parseInt(translate3dValue) + 100) + "%, 0px, 0px)";
      }
    }

    nextImg() {
      this.currentImageIndex++;
      this.updateArrows();
      const images = document.querySelectorAll('.image__container');
      for (let i = 0, l = images.length; i < l; i++) {
        let translate3dValue = this.getTranslate3dValue(images[i]);
        images[i].style.transform = "translate3d(" + (parseInt(translate3dValue) - 100) + "%, 0px, 0px)";
      }
    }

    updateArrows() {
      const arrows = document.querySelectorAll('.arrow');
      const imageCount = this.state.project.images.length + 1;

      if (imageCount === 0) {
        return;
      }

      if (this.currentImageIndex === 0) {
        arrows[0].classList.remove('active');
        arrows[1].classList.add('active');
        return;
      }

      if (this.currentImageIndex === (imageCount -1)) {
        arrows[0].classList.add('active');
        arrows[1].classList.remove('active');
        return;
      }
      
      arrows[0].classList.add('active');
      arrows[1].classList.add('active');
    }

    getTranslate3dValue(content) {
      const translate3dRegex = /\.*translate3d\((.*)%, 0px, 0px\)/i;
      return translate3dRegex.exec(content.getAttribute('style'))[1];
    }

    render() {
      if (this.state.loading) {
        return (
          <div>
            <h2 className='loading'>Loading</h2>
          </div>
        )
      } else {
        const images = this.state.project.images.map((image, index) => {
          const translation = `translate3d(${(index + 1) * 100}%, 0px, 0px)`;
          return (
            <div className='image__container' key={image} style={{transform: translation}}>
              <img src={`${IMAGES_BASE_URL}/projects/${this.state.project.slug}/${image}`} />
            </div>
          )
        });

        return (
          <div id='project'>
            <div id='project__images'>
              <div id='images'>
                <div className='image__container' style={{transform: 'translate3d(0%, 0px, 0px)'}}>
                  <img src={`${IMAGES_BASE_URL}/projects/${this.state.project.slug}/${this.state.project.cover_image}`} />
                </div>
                { images }
              </div>
              <div id='images__controls'>
                <i className="arrow fas fa-angle-left" onClick={this.previousImg.bind(this)}></i>
                <i className="arrow fas fa-angle-right" onClick={this.nextImg.bind(this)}></i>
              </div>
            </div>
            <section id='project__details'>
              <span>{moment(this.state.project.date).format('MMMM Do YYYY')}</span>
              <h1>{this.state.project.title}</h1>
              <p dangerouslySetInnerHTML={{__html: this.state.project.long_description}}></p>
              {
                (this.state.project.hosted_link) ?
                  <a className='project__link' href={this.state.project.hosted_link} target='_blank'><i class="fas fa-link"></i></a> :
                  ''
              }
              {
                (this.state.project.github_link) ?
                  <a className='project__link' href={this.state.project.github_link} target='_blank'><i class="fab fa-github"></i></a> :
                  ''
              }
            </section>
          </div>
        )
      }
    }
}