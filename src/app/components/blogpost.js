import React from 'react';
import moment from 'moment';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import Lightbox from 'react-images';

import data from '../services/data.module';

export class Blogpost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          slug: this.props.match.params.slug,
          loading: true,
          blogpost: {},
          width: -1,
          currentImage: 0,
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    componentWillMount() {
      data.http.get(`${API_BASE_URL}/blogposts/${this.state.slug}`).then((blogpost) => {
        if (Object.keys(blogpost).length === 0) {
          return this.props.history.push('/404');
        }
        
        blogpost.images.map((image) => {
          image.src = `${IMAGES_BASE_URL}/blogposts/${blogpost.slug}/${image.src}`;
        });

        this.setState({
          loading: false,
          blogpost: blogpost,
        });
      });
    }

    openLightbox(event, obj) {
      this.setState({
        currentImage: obj.index,
        lightboxIsOpen: true,
      });
    }

    closeLightbox() {
      this.setState({
        currentImage: 0,
        lightboxIsOpen: false,
      });
    }

    gotoPrevious() {
      this.setState({
        currentImage: this.state.currentImage - 1,
      });
    }

    gotoNext() {
      this.setState({
        currentImage: this.state.currentImage + 1,
      });
    }

    render() {
      const width = this.state.width;

      if (this.state.loading) {
        return (
          <div>
            <h2 className='loading'>Loading</h2>
          </div>
        )
      } else {
        return (
          <div id='blogpost'>
            <div id='blogpost__images'>
              <div id='images'>
                <img src={`${IMAGES_BASE_URL}/blogposts/${this.state.blogpost.slug}/${this.state.blogpost.cover_image}`} />
              </div>
            </div>
            <section id='blogpost__details'>
              <span>{moment(this.state.blogpost.date).format('MMMM Do YYYY')}</span>
              <h1>{this.state.blogpost.title}</h1>
              <p dangerouslySetInnerHTML={{__html: this.state.blogpost.long_post}}></p>
              <div id='blogpost__gallery'>
                <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
                {
                  ({measureRef}) => {
                    if (width < 1 ){
                      return <div ref={measureRef}></div>;
                    }
                    let columns = 1;
                    if (width >= 480){
                      columns = 2;
                    }
                    if (width >= 800){
                      columns = 3;
                    }
                    if (width >= 1200){
                      columns = 4;
                    }
                    return <div ref={measureRef}><Gallery photos= {this.state.blogpost.images} columns={columns} onClick={this.openLightbox} /></div>
                  }
                }
                </Measure>
                <Lightbox images={this.state.blogpost.images}
                  onClose={this.closeLightbox}
                  onClickPrev={this.gotoPrevious}
                  onClickNext={this.gotoNext}
                  currentImage={this.state.currentImage}
                  isOpen={this.state.lightboxIsOpen}
                />
              </div>
            </section>
          </div>
        )
      }
    }
}