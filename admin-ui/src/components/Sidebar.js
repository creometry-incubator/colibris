import React, { Component } from 'react';
class Sidebar extends Component {
    render() { 
        return (
            
      <div id="sidebar-nav" className="sidebar">
      <div className="sidebar-scroll">
        <nav>
          <ul className="nav">
            <li>
              <a href="/#history" className="">
                <i className="fas fa-history"></i><span>History</span>
              </a>
            </li>
            <li>
              <a href="/#users" className="">
              <i className="fas fa-users"></i><span>Users</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
        );
    }
}
 
export default Sidebar;