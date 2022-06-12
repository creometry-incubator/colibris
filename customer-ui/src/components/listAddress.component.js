import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function List(props){
    const [address, setAddress] = useState([])
    const [cookies] = useCookies(["colibrisID"]);
    let {handleNext ,setChosenAddr, ...others } = props
    useEffect(() => {
        fetch('config/USER_SERVICE_URI')
        .then((r) => r.text())
        .then(USER_SERVICE_URI  => {
            axios
          .get(`${USER_SERVICE_URI}/location?userID=` + cookies.colibrisID)
          .then((res) => {
            let final = []
            for(let addr of res.data){
                final.push(addr)
            }
            setAddress(final);
          }).catch(err=>{
              console.log(err)
          });
        })
        
      }, [cookies.colibrisID]);

      const chooseAddr = (address)=>{
        setChosenAddr(address)
        handleNext()
      }
    return(
        <div className="col-l">
          <select className="green-box">
          {address.map((element, index)=>(
              <option key={index} onClick={()=>chooseAddr(element)}>
                {element.address.streetNumber} {element.address.streetName}, {element.address.city}, {element.address.state}

              </option>
            ))}
          </select>

            {/*address.map((element, index)=>(
                <div className="green-box mb-3" key={index} onClick={()=>chooseAddr(element)}>
                    {element.address.streetNumber} {element.address.streetName}, {element.address.city}, {element.address.state}
                </div>
            ))*/}
        </div>
        
    )
}