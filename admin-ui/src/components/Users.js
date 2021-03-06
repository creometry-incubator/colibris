import axios from "axios";
import React, { Component } from "react";
import Search from "./search.component";
let filters = [
  {id: "", key: "----"},
  {id: "username", key: "username", type: "input"},
  {id: "email", key: "email", type: "input"},
  {id: "phone", key: "phone", type: "input"},
]
class Users extends Component {
  constructor(){
    super();
    this.state = {
      users:[]
    }
    this.getUsers = this.getUsers.bind(this);
    this.Submit = this.Submit.bind(this);
  }
  componentDidMount(){
    this.getUsers()

  }
  getUsers(){
    fetch('config/USER_SERVICE_URI')
      .then((r) => r.text())
      .then( USER_SERVICE_URI  => {
        axios.get(USER_SERVICE_URI).then(res=>{
          this.setState({
            users: res.data,
          })
        })       
      })
    
  }
  Submit(filter , search){
    fetch('config/USER_SERVICE_URI')
      .then((r) => r.text())
      .then( USER_SERVICE_URI  => {
        axios.get(`${USER_SERVICE_URI}?${filter}=${search}`).then(res=>{
          this.setState({
            users: res.data,
          })
        })         
      })
    
  }
  render() {
    return (
      <div>
        <h3 className="page-title">Colibris' users</h3>
        <Search filters={filters} Submit={this.Submit} />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map((user, index)=>(
                <tr key={index}>
                  <td>{index}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone1}, {user.phone2}</td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;