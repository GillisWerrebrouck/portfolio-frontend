import React from 'react';

import { ProjectPreview } from './project_preview';
import data from '../services/data.module';

export class Projects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: true,
          projects: [],
        };
    }

    componentWillMount() {
      data.http.get(`${API_BASE_URL}/projects`).then((projects) => {
        this.setState({
          loading: false,
          projects: projects,
        });
      });
    }

    render() {
      let projects;
      if (this.state.loading) {
        projects = (<h2 className='loading'>Loading</h2>);
      } else {
        projects = this.state.projects.map((project) => {
          return (
            <ProjectPreview {...project} key={project._id} />
          )
        });
      }

      return (
        <div>
          <h1>Projects</h1>
          <section className="projects">
            { projects }
          </section>
        </div>
      )
    }
}