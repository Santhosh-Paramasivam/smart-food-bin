import "../styles/dash.css";

function DonationCard(props) {
    const donationList = props.donationList;

    return <div className="info-section" style={{ padding: 20 }}>
              <div className="info-box">
                <p>{props.name}</p>
                <h4>Description : {props.description}</h4>
                <h4>Food Type : {props.foodType}</h4>
                <h4>Donation Type : {props.donationType}</h4>
                <h4>Time and Date Prepared : {props.timeOfPreparation}</h4>
                <h4>Time and Date of Expiry : {props.timeOfExpiry}</h4>
                <button id="pick-up" onClick={props.pickUp}>Pick Up</button>
              </div>
            </div>
}

export default DonationCard