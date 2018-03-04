import React from 'react';
import { render } from 'react-dom';
import { Switch, Route, browserHistory, Redirect } from 'react-router';
import { BrowserRouter as Router, Link  } from 'react-router-dom';

import { Header } from './components/header';
import googleAnalyticsTracking from './components/GoogleAnalyticsTracking';
import { Projects } from './components/projects';
import { Project } from './components/project';
import { Blogposts } from './components/blogposts';
import { Blogpost } from './components/blogpost';
import { About } from './components/about';
import { NotFound } from './components/notFound';

export class App extends React.Component {
  constructor(props) {
      super(props);
  }

  // render the components for the selected route 
  render() {
    return (
      <div>
        <Router history={ browserHistory }>
          <div>
            <Header/>
            <main>
              <Switch>
                <Route exact path={ '/' }>
                  <Redirect to='/projects'/>
                </Route>
                <Route path={ '/projects/:slug' } component={ googleAnalyticsTracking(Project) }></Route>
                <Route path={ '/projects' } component={ googleAnalyticsTracking(Projects) }></Route>
                <Route path={ '/blog/:slug' } component={ googleAnalyticsTracking(Blogpost) }></Route>
                <Route path={ '/blog' } component={ googleAnalyticsTracking(Blogposts) }></Route>
                <Route path={ '/about' } component={ googleAnalyticsTracking(About) }></Route>
                <Route path={ '/404' } component={ googleAnalyticsTracking(NotFound) }></Route>
                <Route path={ '*' }>
                  <Redirect to='/404'/>
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

render(<App/>, window.document.getElementById('app'));

module.hot.accept();