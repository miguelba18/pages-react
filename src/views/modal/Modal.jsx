import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showConfirmButton = true,
}) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    onClose(); 
    toast.info("Cancelacion Exitosa", {autoClose:1200}); 
  };
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  showConfirmButton: PropTypes.bool,
}
  return (
    <div className="fixed z-10 inset-0 ">
  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
      &#8203;
    </span>

  
    <div className="inline-block align-bottom xl:ml-60 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-5xl w-full mx-auto">
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {children}
      </div>
      <div className="bg-tertiary-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        {showConfirmButton && (
          <button
            onClick={onConfirm}
            type="button"
            className="flex mr-2 justify-center items-center gap-2 px-3 ml-2 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]"
          >
            {confirmText}
          </button>
        )}
        <div>
          <button
            onClick={handleCancel}
            type="button"
            className="flex justify-center items-center gap-2 px-3 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Modal;
