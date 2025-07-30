import React from "react";

const EditarModal = ({ showModal, cerrarModal, guardarCambios, titulo, children }) => {
  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-xl font-bold mb-4">{titulo}</h3>
            <form>
              {children}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={guardarCambios}
                  className="btn-actualizar"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditarModal;