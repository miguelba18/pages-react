import PropTypes from 'prop-types'

const Modaledit = ({
    selectedRecordatorio,
    setSelectedRecordatorio,
    handleFechaHoraChange,
    editRecordatorio,
    setShowEditForm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-xl w-80">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
                        placeholder="Título"
                        value={selectedRecordatorio.titulo}
                        onChange={(e) =>
                          setSelectedRecordatorio({
                            ...selectedRecordatorio,
                            titulo: e.target.value,
                          })
                        }
                      />
                      <textarea
                        className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
                        placeholder="Descripción"
                        value={selectedRecordatorio.descripcion}
                        onChange={(e) =>
                          setSelectedRecordatorio({
                            ...selectedRecordatorio,
                            descripcion: e.target.value,
                          })
                        }
                      />
                      <input
                        type="datetime-local"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md mb-2"
                        value={selectedRecordatorio.fechaHora}
                        onChange={handleFechaHoraChange}
                      />

                      <button
                        className="px-2 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-900 block mx-auto mb-2"
                        onClick={async () => {
                          await editRecordatorio(selectedRecordatorio.id, {
                            titulo: selectedRecordatorio.titulo,
                            descripcion: selectedRecordatorio.descripcion,
                            fechaHora: selectedRecordatorio.fechaHora,
                          });
                          setShowEditForm(false);
                        }}
                      >
                        Guardar cambios
                      </button>

                      
                    </div>
                  </div>
  )
}

Modaledit.propTypes = {
    selectedRecordatorio: PropTypes.object.isRequired,
    setSelectedRecordatorio: PropTypes.func.isRequired,
    setShowEditForm: PropTypes.func.isRequired,
    showEditForm: PropTypes.func.isRequired,
    
      
    handleFechaHoraChange: PropTypes.func.isRequired,
    editRecordatorio: PropTypes.func.isRequired,
    
}

export default Modaledit
