export default function Confirm(props){
    return(
        <div className="green-box-nohover">
            {props.chosenAddr.address.streetNumber} {props.chosenAddr.address.streetName}, {props.chosenAddr.address.city}, {props.chosenAddr.address.state}
                <br />
                {props.myDate}
                <br />
            {props.shift}
        </div>
    )
}