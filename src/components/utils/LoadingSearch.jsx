import React, { Component } from 'react';
import { Vortex } from 'react-loader-spinner';

export default class LoadingSearch extends Component {
  render() {
    return (
      <section className="loading-search">
        <Vortex
          visible
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={ {} }
          wrapperClass="vortex-wrapper"
          colors={ ['#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2', '#00D5E2'] }
        />
        <h2>Carregando...</h2>
      </section>
    );
  }
}
