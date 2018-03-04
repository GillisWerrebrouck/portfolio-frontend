import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class BlogpostPreview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.setBackgrounImage();
    }

    setBackgrounImage() {
      const elem = document.querySelector(`#${this.props.slug}`);
      elem.style.backgroundImage = `linear-gradient(
        rgba(68, 90, 245, 0.35), 
        rgba(68, 90, 245, 0.75)
      ),url(${IMAGES_BASE_URL}/blogposts/${this.props.slug}/${this.props.cover_image})`;
    }

    render() {
      return (
        <Link className='blogpost__preview' id={this.props.slug} to={`/blog/${this.props.slug}`}>
          <h2>{this.props.title}</h2>
          <p className="date">{moment(this.props.date).format('MMMM Do YYYY')}</p>
          <p className='short_post'>{this.props.short_post}</p>
        </Link>
      )
    }
}