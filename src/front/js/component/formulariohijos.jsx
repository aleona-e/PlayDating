import React, { useState } from "react";
import "../../styles/miPerfil.css";

const FormularioHijos = () => {
	const [hijos, cambiarhijos] = useState([]);
	const [nombrehijos, cambiarNombrehijos] = useState({
		label: "",
		done: false,
	});

	const agregarhijos= (nombredelahijos) => {
		
		const auxhijos = [...hijos, nombredelahijos];
		cambiarhijos(auxhijos);
		cambiarNombrehijos({ label: "" });
	};

	const eliminarhijos = (index) => {
		const auxTarea = hijos.filter((nombrehijos, auxIndex) => {
			if (index !== auxIndex) return nombrehijos;
		});
		cambiarhijos(auxhijos);
	};

	const guardarNombre = (e) => {
		if (
			(nombrehijos && nombrehijos.label.length > 0)
		) {
			agregarhijos(nombrehijos);
		}
	};

	return (
		<>
			{" "}


			<div className="d-flex justify-content-center">
				<input
					type="text"
					onChange={(e) => {
						cambiarNombrehijos({
							label: e.target.value,
							done: false,
						});
					}}

					placeholder="Escribe el nombre de tu hij@"
					value={nombrehijos.label}
					className="form-control"
				/>
				<button
				id="buttonAñadirHijos"
					className="btn"
					onClick={guardarNombre}>
					Añadir
				</button>
			</div>
			<div className="row d-flex justify-content-center align-items-center">
				{hijos.map((nombrehijos, index) => (
					<div
						className="d-flex justify-content-between border-bottom w-75 mt-2"
						key={index}>
						{nombrehijos.label}

						<button
						id="buttonEliminarHijo"
							className="btn"
							onClick={() =>
								eliminarhijos(index)
							}>
							X
						</button>
					</div>
				))}
			</div>

		</>
	);
};

export default FormularioHijos;