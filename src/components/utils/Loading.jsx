import React, { Component } from 'react';
import { Vortex } from 'react-loader-spinner';

export default class Loading extends Component {
  render() {
    return (

      <main className="spinner-container">
        <Vortex
          visible
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={ {} }
          wrapperClass="vortex-wrapper"
          colors={ ['#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2'] }
        />
        <h1 className="loading-header">
          Carregando...

        </h1>
      </main>
    );
  }
}
