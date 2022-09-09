import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Settings extends Component {
  goToBack = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <section>
        <h1 data-testid="settings-title">Configurações</h1>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.goToBack }
        >
          Voltar
        </button>
      </section>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Settings;
