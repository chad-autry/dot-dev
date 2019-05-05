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
