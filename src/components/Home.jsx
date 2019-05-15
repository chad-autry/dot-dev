import React from "react";

const Home = class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="text-center">Hello World!</h1>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">User Creation and Terms of Service 5/14/2019</h3>
            </div>
            <div className="panel-body">
                Began continuing the user creation work for react-bp which I started awhile back.
                Created the Terms of Service page. Need to make it more generic. Need to import and hook up the FetchService.
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Reapply updates II 5/7/2019</h3>
            </div>
            <div className="panel-body">
                Applied the updates to my hexagonal.space client
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Reapply updates 5/6/2019</h3>
            </div>
            <div className="panel-body">
                Fixed the Travis-CI build by updating the nodejs version. Applied dependency updates to this site.
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">npm audit 5/5/2019</h3>
            </div>
            <div className="panel-body">
                Updated many of the dependencies on my react-bp frontend project based on npm audit. Included upgrading webpack to 4.X.
                <br/>
                <br/>
                Investigated upgrading bootstrap to 4.X, but decided to just take the latest 3.X.
                <br/>
                <br/>
                Still to come: webpack-cli which is needed for webpack-dev-server is breaking Travis-CI and my react-bp gh-pages deployment. I still need to cherry-pick the commits to this project.
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">First Post 5/4/2019</h3>
            </div>
            <div className="panel-body">
                First post. So my idea for this site is to act as something of a blog and testing ground.<br/>
                I'll try to devote ~20 minutes a day (less time than an episode of some show) and see how far I can get, 
                with a small blog bost at the end.<br/><br/>
                So far, I've forked my deployment automation boilerplate and react boilerplate, deployed 
                (working through some documentation issues with my automation boilerplate), and 
                trimmed the react boilerplate down and added in my name.
                <br/><br/>
                Next up I'll probablly look at upgrading react, webpack, and bootstrap.
                <br/><br/>
                Some ideas for the future include serverless login (Google Cloud Functions), and real blog functionallity including comments.
            </div>
        </div>
      </div>
    );
  }
};

export default Home;
