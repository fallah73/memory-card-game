import './Card.css'

const Card = (props) => {

    return (
        <div className={`card ${props.flipped ? "flipped" : ''}`}
            onClick={props.click}
            style={{ order: props.order }}
        >
            <img src={props.src} alt="cardFront" />
            <div className="card-back"></div>
        </div>
    )
}

export default Card