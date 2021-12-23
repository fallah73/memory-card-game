import './Modal.css'

const Modal = (props) => {
    return (
        <div className={`modal ${props.modalShow ? "modal-show" : ""}`}>
            <div className="modal-content">
                <h3>Completed  &#128525;</h3>
                <button onClick={props.click}>ok</button>
            </div>
        </div>
    )
}

export default Modal
