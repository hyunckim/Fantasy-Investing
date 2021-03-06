import React from 'react';
import Modal from 'react-modal';
import PortfolioFormContainer from './portfolio_form_container';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    height                : '250px',
    width                 : '340px',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay: {
    zIndex: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }
};

class PortfolioModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.this = this;
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  openModal() {
    this.props.removeErrors();
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <button className='dropdown-modal' onClick={this.openModal}>Add Watchlist</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Portfolio Modal"
        >
        <button className='portfolio-close-button' onClick={this.closeModal}>✖</button>
        <PortfolioFormContainer modal={this.this}/>
        </Modal>
      </div>
    );
  }
}

export default PortfolioModal;
