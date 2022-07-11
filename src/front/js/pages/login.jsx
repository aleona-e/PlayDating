import React,{useState} from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const updateText = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const onSave = async () => {
    const body = JSON.stringify({
      email,
      password,
    });
    const resp = await fetch(
      "https://3001-4geeksacade-reactflaskh-bussn8ov9ql.ws-eu53.gitpod.io/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.token}`,
        },
        body
      }
    );
    const data = await resp.json();
    localStorage.setItem("token",data)
  
    
    
  };
  return (
    <>
      <div className="modal-wrapper" id="popup">
        <div className="popup-contenedor">
          <h2 >Login</h2>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input   onChange={(e) => updateText(e, setEmail)}
                value={email}  type="email" className="form-control"></input> 
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input  onChange={(e) => updateText(e, setPassword)}
                value={password} type="password" className="form-control"></input>
            </div>
          </div>
          <button onClick={onSave}type="button" className="btn btn-outline-info">Aceptar</button>
          <a className="popup-cerrar" href="#popup">
            X
          </a>
        </div>
      </div>
    </>
  );
};
