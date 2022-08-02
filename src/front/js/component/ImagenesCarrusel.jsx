import React from "react";

export const ImagenesCarrusel = () => {
  const imagenes = [
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658303042/Actividades/8_blsifn.png",
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658303039/Actividades/7_gpcjmy.png",
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658303029/Actividades/4_j1yemg.png",
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658303045/Actividades/9_kfvczv.png",
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658302989/Actividades/2_yrgzy6.png",
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658303032/Actividades/5_kq1tgf.png",
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658303026/Actividades/3_sb5ibo.png",
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658302986/Actividades/1_nanc3k.png",
    "https://res.cloudinary.com/daint2d1l/image/upload/v1658303036/Actividades/6_dcpkjw.png",
  
  ];
  const imagenesAMostrar = imagenes.map((imagen, index) => {
    const clase = index === 1 ? "carousel-item active" : "carousel-item";

    return (
        <div className={clase} key={index} data-bs-interval="2000">
          <img
            id="imgCarrusel"
            src={imagen}
            className="d-block w-100"
            alt="..."
          ></img>
        </div>
    );
  });
  return imagenesAMostrar;
};
