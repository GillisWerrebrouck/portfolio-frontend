import React from 'react';

import { BlogpostPreview } from './blogpostPreview';
import data from '../services/data.module';

export class Blogposts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: true,
          blogposts: [],
        };
    }

    componentWillMount() {
      data.http.get(`${API_BASE_URL}/blogposts`).then((blogposts) => {
        this.setState({
          loading: false,
          blogposts: blogposts,
        });
      });
    }

    render() {
      let blogposts;
      if (this.state.loading) {
        blogposts = (<h2 className='loading'>Loading</h2>);
      } else {
        blogposts = this.state.blogposts.map((blogpost) => {
          return (
            <BlogpostPreview {...blogpost} key={blogpost._id} />
          )
        });
      }
  
      return (
        <div>
          <h1>Blog posts</h1>
          <section className="blogposts">
            { blogposts }
          </section>
        </div>
      )
    }
}