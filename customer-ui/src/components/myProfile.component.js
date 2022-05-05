import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Profile() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [cookies] = useCookies(["colibrisID"]);
    const [avatar, setAvatar] = useState("");
    useEffect(() => {
        axios
          .get(`${window.ENV.USER_SERVICE_URI}/${cookies.colibrisID}`)
          .then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone1(res.data.phone1);
            setUsername(res.data.username);
            setAvatar(res.data.avatar);
            setPhone2(res.data.phone2);
            
          });
      }, [cookies.colibrisID]);
    
      const Submit = () => {
        axios
          .put(`${window.ENV.USER_SERVICE_URI}/${cookies.colibrisID}`, {
            name: name,
            email: email,
            phone1: phone1,
            phone2: phone2,
            avatar: avatar,
            username: username,
          })
          .then((res) => {
              console.log(res.data)
            if (res.data === "client updated successfully!!") {
              window.location.href = "/";
            }
          })
          .catch((err) => window.alert(err));
      };
    return(
        <div className="container-fluid mt-3 contact">
          <div className="row ">
            <div className="col-lg-12 mb-3 padding  contact-form">
              <div className="row container-fluid ">
                <div className="col-lg-12 mb-3">
                  <div className="row">
                    <div className="col-lg-1 mb-2 ml-5">
                      <Avatar
                        src={avatar}
                        sx={{ width: 56, height: 56 }}
                      />
                    </div>
                    <div className="col-lg-10">
                      {<input
                        placeholder="lien image"
                        className="form-control mt-2"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                      />}
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <input
                      placeholder="nom et prénom"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <input
                      placeholder="pseudo nom"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <input
                      placeholder="addresse email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-12 mb-3">
                    <input
                      placeholder="numero de téléphone"
                      className="form-control"
                      type="number"
                      value={phone1}
                      onChange={(e) => setPhone1(e.target.value)}
                    />
                  </div>
                    <div className="col-lg-12 mb-3">
                      <input
                        placeholder="deuxiéme numero de téléphone"
                        className="form-control mb-2"
                        value={phone2}
                        onChange={(e) => setPhone2(e.target.value)}
                      />
                      
                    </div>
                </div>
              </div>
              
                <div className="col-lg-2">
                  <button onClick={Submit} className="btn custom-btn ml-4">
                    Submit
                  </button>
                </div>
            </div>
          </div>
        </div>
    )
}