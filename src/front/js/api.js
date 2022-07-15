import { HOSTNAME } from "./component/config.js"

export const obtenerActividades = () => {
        return fetch(HOSTNAME + "/actividades", 
        {
            method: "GET",
            headers: {"Content-Type":"application/json"}
            
        }).then((resp) => {
            return resp.json()
        }). catch((error) => {
        console.log("error " +  error)
    })
    
}