import React from 'react';
import Modal from 'react-modal';
import TradeFormContainer from './trade_form_container';

const customStyles = {
  content: {
   top                   : '50%',
   left                  : '50%',
   width                 : '350px',
   right                 : 'auto',
   bottom                : 'auto',
   marginRight           : '-50%',
   transform             : 'translate(-50%, -50%)'
  },

  overlay: {
    zIndex: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }
};

class TradeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.props.removeStockErrors();
  }

  handleClick(e) {
  }

  render() {

    return (
      <div>
        <button onClick={this.openModal}>Trade</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <button className='trade-close-button' onClick={this.closeModal}>✖</button>
        <TradeFormContainer className='trade-form-modal' />
        </Modal>
      </div>
    );
  }
}

export default TradeModal;
