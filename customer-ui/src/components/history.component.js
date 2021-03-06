import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DialogApp from "./dialogAppointment.component"
import './css/table.css'
export default function History(props) {
  const [cookies] = useCookies(["colibrisID"]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
   getApp()
  }, [cookies.colibrisID]);

  const getApp = ()=>{
    fetch('config/APPOINT_SERVICE_URI')
    .then((r) => r.text())
    .then(APPOINT_SERVICE_URI  => {
      axios
    .get(`${APPOINT_SERVICE_URI}/user/` + cookies.colibrisID)
    .then((res) => {
      console.log(res.data)
      setAppointments(res.data);
    }).catch(err=>{
      console.log(err)
    });
    })
  }

  const deleteApp = (id, index) => {
    //delete from list 
    let array = [... appointments];
    array.splice(index, 1);
    setAppointments(array)
    //delete from database
    fetch('config/APPOINT_SERVICE_URI')
    .then((r) => r.text())
    .then(APPOINT_SERVICE_URI  => {
      axios.delete(`${APPOINT_SERVICE_URI}`, {
        data: { id: id },
      }).catch(err=>{console.log(err)});    })
    
  };

  
  return (
    <div>
      
      <div className="container-fluid">
      
        <div>
          <table className="table white table-style">
            <thead className="thead">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Address</th>
                <th scope="col">shift</th>
                <th scope="col">Status</th>
                <th scope="col">Reason</th>
                <th scope="col">Cancel</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody className="tbody">
            {appointments.map((element, index) => (
              <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{element.dueDate.substring(0,10)}</td>
              <td>{element.location.address.streetNumber} {element.location.address.streetName},{element.location.address.city},{element.location.address.state}</td>
              <td>{element.shift}</td>
              <td>{element.status}</td>
              <td>{element.reason}</td>
              <td>
                <a onClick={() => deleteApp(element._id, index)}><i class="fa-solid fa-trash"></i></a>
              </td>
              <td>
                {element.status == "pending"? <DialogApp  refresh={getApp} id={element._id} />: <div></div> }
              </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
