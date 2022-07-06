import React from "react";

export const Card = () => {
  return (
    <>
      <div className="container d-flex">
        <div className="card">
          <img src="https://img.freepik.com/vector-gratis/parque-infantil-blanco-toboganes-escena_1308-53112.jpg?w=360"></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Info
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
