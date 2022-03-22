import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function ConfirmationDialogRaw(props) {
  const { onClose, open, location, setLocation,setOpen, refused, setRefused, setLat, setLng,  ...other } = props;
  const _map = useRef(null);
  const _marker = useRef(null);
  const _geocode = useRef(null);
  const _infowindow = useRef(null);
  const accept = ()=>{
    setOpen(false);
    
    setLat(location.lat);
    setLng(location.lng);
    setRefused(false);
  }
  const refuse = ()=>{
    setRefused(true); 
    setLocation({});
    try {
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=" +
          window.ENV.API_KEY +
          "&callback=initMap&v=weekly";
        script.async = true;
        document.body.appendChild(script);
      }
      setTimeout(()=>{
        _geocode.current = new window.google.maps.Geocoder();
        _map.current = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 11,
          center: { lat: 36.80278, lng: 10.17972 },
        });
        _map.current.addListener("click", async (e) => {
          _geocode.current.geocode({location: {lat: e.latLng.lat(), lng: e.latLng.lng()}}, (results, status)=>{
            _infowindow.current.setContent(results[0].formatted_address);
          })
          getInfo(e.latLng.lat(), e.latLng.lng());
          setLocation({lat:e.latLng.lat() , lng: e.latLng.lng()})
          _infowindow.current.open(_map.current, _marker.current);
   
        })
      }, 1000)
      _infowindow.current = new window.google.maps.InfoWindow();
      
     
   } catch (err) {
     console.error(err);
   }
  }

  const getInfo = (Lat, Lng) => {
    if (_marker.current) _marker.current.setMap(null);
    const latlng = {
      lat: Lat,
      lng: Lng,
    };
    try {
      _marker.current = new window.google.maps.Marker({
        position: latlng,
        map: _map.current,
      });
      _map.current.setCenter(latlng);
      _map.current.setZoom(17);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Dialog
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 600, maxWidth: 550 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogContent dividers>
        {refused?(
          <div>
           <h5>Pouvez-vous pointez votre localisation:</h5>
           <div
                        id="map"
                        className="mt-3 container-fluid"
                        style={{ width: "90%", height: "400px" }}
            ></div>
           <button onClick={accept} className="btn custom-btn" >confirmer addresse</button>

          </div>
        ):(
          <div>
             <h5>Confirmez votre localisation: </h5>
            <iframe src={`https://www.google.com/maps/embed/v1/view?key=${window.ENV.API_KEY}&center=${location.lat},${location.lng}&zoom=18`} width="500" height="400"></iframe>
            <button onClick={accept} className="btn custom-btn" >confirmer addresse</button>
            <button onClick={refuse} className="btn red-btn" >ce n'est pas ma localisation</button>
          </div>
        )}
        
    </DialogContent>
    </Dialog>
  );
}

export default function ConfirmationDialog(props) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [refused, setRefused] = useState(false);

  const handleOpen = () => {
    /*axios.get(`${window.ENV.USER_SERVICE_URI}/map?address=${props.address}`).then(res=>{
      if(res.data.location){
        setOpen(true);
        setLocation(res.data.location)
        
      }else{
        window.alert("une erreur s'est produite, svp reesayer plus tard")
      }
    })*/
    setOpen(true);
    setLocation({lat: 35.0, lng: 35.0})
  };

  const handleClose = () => {
    setOpen(false);
    setRefused(false);
  };

  return (
    <div>
       <button onClick={handleOpen} className="btn custom-btn" >confirmer addresse</button>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        location={location}
        setLocation={setLocation}
        setOpen={setOpen}
        refused={refused}
        setRefused={setRefused}
        setLng={props.setLng}
        setLat={props.setLat}
      />
    </div>
  );
}