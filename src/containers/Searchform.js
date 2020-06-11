import React from "react";
import {
  Jumbotron,
  Table,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import timediff from "timediff";
import { getAllnews } from "../actions/index";
import Showchart from './Showchart';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class Searchform extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS FOR PAGE========>",this.props.match.params);
    this.state = {
      pageno:(this.props.match.params && this.props.match.params.pageno)?(this.props.match.params.pageno):1,
      checkremoved:false
    };
  }

  componentDidMount(){
    console.log("componentDidMount=====>",this.state.pageno);
    this.props.getAllnews(this.state.pageno);
  }


  handlePageChanged(event,type,pagenoclicked){
    (type === "nextpage")?this.setState(currentState => ({ pageno: parseInt(currentState.pageno) + 1 }), () => {
      
      this.props.getAllnews(this.state.pageno);
      this.props.history.push({
        pathname:'/page/'+this.state.pageno
      });
  }):this.setState(currentState => ({ pageno: (parseInt(currentState.pageno)>1)?(parseInt(currentState.pageno) - 1):1 }), () => {
   
    this.props.getAllnews(this.state.pageno);
     this.props.history.push({
      pathname:'/page/'+parseInt(this.state.pageno)
    });
    localStorage.clear();
})

}

handleHide(e,removeobjectid){
   console.log("removeobjectid====>",removeobjectid);
   var ObjectIDsData = localStorage.getItem("ObjectIDs");
   console.log("ObjectIDsData====>",ObjectIDsData);
   if(ObjectIDsData !== null){
    var revedIds = JSON.parse(ObjectIDsData);
    revedIds.push(removeobjectid);
    localStorage.setItem("ObjectIDs", JSON.stringify(revedIds));
   }else{
    localStorage.setItem("ObjectIDs", JSON.stringify([removeobjectid]));
   }
  this.setState({checkremoved:true});
   //IF we will have API instead of managing the storage we will call API.
   
}

  createRow = (props) => {
    let i = 0;
    console.log("this.props row========>",this.props.getAllnewsdata);
    let newsdataperpage = (this.props.getAllnewsdata !== null && this.props.getAllnewsdata.newslist)?this.props.getAllnewsdata.newslist.newslist.hits:[];
    console.log("newsdataperpage==============>",newsdataperpage);
    return newsdataperpage.map((news, index) => {
      let timeago = timediff(news.created_at, new Date().toISOString(), 'YMDHms');
      let timediffstring = timeago.years+" Year, "+timeago.months+" months, "+timeago.days+" days, "+timeago.hours+" hors ago.";
      let id = news.objectID;
      var ObjectIDsSkip = (localStorage.getItem("ObjectIDs") !== null)?JSON.parse(localStorage.getItem("ObjectIDs")).includes(id):false;
      if(ObjectIDsSkip == true){
          return null;
      }else{
        i++;
        return (
          <tr key={Math.random()}>
            <td>{i}</td>
            <td>
            {news.num_comments}
            </td>
            <td>{news.points}</td>
            <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIV21HsHa8xsXSf67C9LJ3Z8b5F6_IXmRqoq8AoPlfzQa-phNO&usqp=CAU" height="20px" width="20px"></img></td>
            <td>{news.title}<span className="urllink"> ({news.url}) by  </span><span className="authername">{news.author} </span> 
            <span className="createdtimeago">{timediffstring}</span>[<span className="removenewsid"><a className="hidelink"  onClick={(e)=>this.handleHide(e,id)}>Hide</a></span>]</td>
          </tr>
        );
      }
    
    });
  };
  createTable = (props) => {
    console.log("createTable state===>", this.props);
      return (
        <div className="">
        <Table striped bordered hover>
          <thead className="tblheadercolor">
            <tr>
              <th>No</th>
              <th>Comments</th>
              <th>Vote count</th>
              <th>Upvotes</th>
              <th>News Details</th>
            </tr>
          </thead>
          <tbody>{this.createRow(props)}</tbody>
        </Table>
        <nav aria-label="Page navigation example" className="paginationbtnn">
            <ul class="pagination">
              <li class="page-item"><Button className="page-link" type="prevpage" pageno={this.state.pageno} onClick={(event)=>this.handlePageChanged(event,'prevpage',this.state.pageno)}>Previous</Button></li>
              <li class="page-item"><Button className="page-link" type="nextpage" pageno={this.state.pageno} onClick={(event)=>this.handlePageChanged(event,'nextpage',this.state.pageno)}>Next</Button></li>
            </ul>
          </nav>
        <Showchart />

        </div>
      );
  };

  render() {
    return (
      <Jumbotron>
        {this.createTable(this.props)}
      </Jumbotron>
    );
  }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
  return {
    getAllnewsdata: state.getAllnewsdata,
  };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getAllnews: getAllnews }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Searchform);
