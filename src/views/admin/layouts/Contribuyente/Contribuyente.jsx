import { useState, useEffect } from "react";
import useListContribuyente from "../../../hook/Contribuyente/useListContribuyente";
import {
  RiDownloadLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import HighlightedText from "../../../../utils/HighlightedText";
import useDownloadContribuyente from "../../../hook/Contribuyente/useDownloadContribuyente";
import Select, { components } from "react-select";
import PropTypes from "prop-types";

const Contribuyente = () => {
  const {
    contribuyentes,
    fetchContribuyentes,
    fetchFacturaById,
    fetchFacturaByNit,
    fetchFacturaByDepartamento,
    fetchFacturaByMunicipio,
    fetchFacturaByDireccion,
    fetchFacturaByCorreo,
    fetchFacturaByTelefono,
    factura,
    setFactura,
  } = useListContribuyente();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const { handleDownloadExcel } = useDownloadContribuyente();
  const [selectedNit, setSelectedNit] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState([]);
  const [selectedCorreo, setSelectedCorreo] = useState([]);
  const [selectedTelefono, setSelectedTelefono] = useState([]);
  const [isFacturaSelected, setIsFacturaSelected] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        
        <label >
          {props.label}
          </label>
      </components.Option>
    );
  };

  useEffect(() => {
    fetchContribuyentes("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contribuyentes.slice(indexOfFirstItem, indexOfLastItem);

 
  const handleSelectContribuyente = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedIdsArray = selectedOptions.map((option) => option.value);
      setSelectedIds(selectedIdsArray); 
  
      if (selectedIdsArray.length > 0) {
        fetchFacturaById(selectedIdsArray).then(() => {
          setIsFacturaSelected(true);
          resetAllSelectsExcept([setSelectedIds]); 
        });
      }

    } else {
      setSelectedIds([]); 
      setIsFacturaSelected(false); 
    }
  };
  
  

  const handleSelectNit = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedNitsArray = selectedOptions.map((option) => option.value);
      setSelectedNit(selectedNitsArray);
      resetAllSelectsExcept([setSelectedNit])
    } else {
      setSelectedNit([]);
    }
  };

  const handleSelectDepartamento = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedDepartamentosArray = selectedOptions.map(
        (option) => option.value
      );
      setSelectedDepartamento(selectedDepartamentosArray);
      resetAllSelectsExcept([setSelectedDepartamento]);
    } else {
      setSelectedDepartamento([]);
    }
  };

  const handleSelectMunicipio = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedMunicipiosArray = selectedOptions.map(
        (option) => option.value
      );
      setSelectedMunicipio(selectedMunicipiosArray); 
      resetAllSelectsExcept([setSelectedMunicipio]);
    } else {
      setSelectedMunicipio([]); 
    }
  };

  const handleSelectDireccion = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedDireccionesArray = selectedOptions.map(
        (option) => option.value
      );
      setSelectedDireccion(selectedDireccionesArray);
      resetAllSelectsExcept([setSelectedDireccion]);  
    } else {
      setSelectedDireccion([]); 
    }
  };

  const handleSelectCorreo = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedCorreosArray = selectedOptions.map(
        (option) => option.value
      );
      setSelectedCorreo(selectedCorreosArray);
      resetAllSelectsExcept([setSelectedCorreo]); 
    } else {
      setSelectedCorreo([]); 
    }
  };

  const handleSelectTelefono = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedTelefonosArray = selectedOptions.map(
        (option) => option.value
      );
      setSelectedTelefono(selectedTelefonosArray);
      resetAllSelectsExcept([setSelectedTelefono]);
    } else {
      setSelectedTelefono([]); 
    }
  };

  const resetAllSelectsExcept = (excludedSetters) => {
    const allSetters = [
      setSelectedNit,
      setSelectedIds,
      setSelectedDepartamento,
      setSelectedCorreo,
      setSelectedTelefono,
      setSelectedMunicipio,
      setSelectedDireccion,
    ];
  
 
    allSetters.forEach((setter) => {
      if (!excludedSetters.includes(setter)) {
        setter("");  
      }
    });
  };

  useEffect(() => {
    if (selectedNit.length > 0) {
      fetchFacturaByNit(selectedNit).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNit]);

  useEffect(() => {
    if (selectedDepartamento.length > 0) {
      fetchFacturaByDepartamento(selectedDepartamento).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartamento]);

  useEffect(() => {
    if (selectedMunicipio.length > 0) {
      fetchFacturaByMunicipio(selectedMunicipio).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMunicipio]);

  useEffect(() => {
    if (selectedDireccion.length > 0) {
      fetchFacturaByDireccion(selectedDireccion).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDireccion]);

  useEffect(() => {
    if (selectedCorreo.length > 0) {
      fetchFacturaByCorreo(selectedCorreo).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCorreo]);

  useEffect(() => {
    if (selectedTelefono.length > 0) {
      fetchFacturaByTelefono(selectedTelefono).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTelefono]);

  useEffect(() => {
    if (selectedIds.length > 0) {
      const facturasFiltradas = contribuyentes.filter((contribuyente) =>
        selectedIds.includes(contribuyente.id)
      );
      setFactura(facturasFiltradas);
      setIsFacturaSelected(true);
    } else {
      setIsFacturaSelected(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds, contribuyentes]);
  
  const handleDownload = () => {
    const filters = {
      id: selectedIds || undefined,
      nit: selectedNit.length > 0 ? selectedNit : undefined,
      departamento: selectedDepartamento.length > 0 ? selectedDepartamento : undefined,
      municipio: selectedMunicipio.length > 0 ? selectedMunicipio : undefined,
      direccion: selectedDireccion.length > 0 ? selectedDireccion : undefined,
      correo: selectedCorreo.length > 0 ? selectedCorreo : undefined,
      telefono: selectedTelefono.length > 0 ? selectedTelefono : undefined,
    };
  
    handleDownloadExcel(filters);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "38px",           
      fontSize: "14px",            
      minWidth: '200px',          
      width: '100%',              
      boxSizing: 'border-box',     
      border: '1px solid #ccc',    
      borderRadius: '4px',         
      '&:hover': {
        borderColor: '#888',        
      },
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? "#f0f0f0" : isSelected ? "#eaeaea" : null,
      color: "#333",
      fontWeight: isSelected ? "bold" : "normal",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,                 
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e0e0e0',  
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#000',                
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#ff0000',            
      ':hover': {
        backgroundColor: '#f00',    
        color: '#fff',               
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999',                
    }),
  };
  const nitOptions = contribuyentes.map((contribuyente) => ({
    value: contribuyente.nitContribuyente,
    label: contribuyente.nitContribuyente,
  }));
  const contribuyenteOptions = contribuyentes.map((contribuyente) => ({
    value: contribuyente.id,
    label: contribuyente.nombreContribuyente,
  }));
  const departamentoOptions = contribuyentes.map((contribuyente) => ({
    value: contribuyente.departamentoContribuyente,
    label: contribuyente.departamentoContribuyente,
  }));
  const municipioOptions = contribuyentes.map((contribuyente) => ({
    value: contribuyente.municipioContribuyente,
    label: contribuyente.municipioContribuyente,
  }));
  const direccionOptions = contribuyentes.map((contribuyente) => ({
    value: contribuyente.direccionContribuyente,
    label: contribuyente.direccionContribuyente,
  }));
  const correoOptions = contribuyentes.map((contribuyente) => ({
    value: contribuyente.correoContribuyente,
    label: contribuyente.correoContribuyente,
  }));
  const telefonoOptions = contribuyentes.map((contribuyente) => ({
    value: contribuyente.telefonoContribuyente,
    label: contribuyente.telefonoContribuyente,
  }));

  const uniqueOptions = (options) => {
    const seen = new Set();
    return options.filter(option => {
     
      if (typeof option.value === 'string') {
        const lowerCaseValue = option.value.toLowerCase(); 
        const duplicate = seen.has(lowerCaseValue);
        seen.add(lowerCaseValue); 
        return !duplicate; 
      }
      return false; 
    });
  };
  
  const filteredNitOptions = uniqueOptions(nitOptions);
  const filteredDepartamentoOptions = uniqueOptions(departamentoOptions);
  const filteredMunicipioOptions = uniqueOptions(municipioOptions);
  const filteredDireccionOptions = uniqueOptions(direccionOptions);
  const filteredCorreoOptions = uniqueOptions(correoOptions);
  const filteredTelefonoOptions = uniqueOptions(telefonoOptions);

  const tableRows = () => {
    if (isFacturaSelected && factura) {
      return factura.map((facturaItem, index) => (
        <tr
          key={facturaItem.id}
          className={
            index % 2 === 0
              ? "bg-gray-100 whitespace-nowrap"
              : "bg-white whitespace-nowrap"
          }
        >
          <td className="border px-4 py-2 text-center">{index + 1}</td>

          <td className="border px-4 text-center">
            {facturaItem.nombreContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            <HighlightedText
              text={facturaItem.nitContribuyente}
              highlight={""}
            />
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.departamentoContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.municipioContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.direccionContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.correoContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {facturaItem.telefonoContribuyente}
          </td>
        </tr>
      ));
    } else {
      return currentItems.map((contribuyente, index) => (
        <tr
          key={contribuyente.id}
          className={
            index % 2 === 0
              ? "bg-gray-100 whitespace-nowrap"
              : "bg-white whitespace-nowrap"
          }
        >
          <td className="border px-4 py-2 text-center">
            {indexOfFirstItem + index + 1}
          </td>
          <td className="border px-4 text-center">
            <HighlightedText
              text={contribuyente.nombreContribuyente}
              highlight={""}
            />
          </td>
          <td className="border px-4 py-2 text-center">
            <HighlightedText
              text={contribuyente.nitContribuyente}
              highlight={""}
            />
          </td>
          <td className="border px-4 py-2 text-center">
            {contribuyente.departamentoContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {contribuyente.municipioContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {contribuyente.direccionContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {contribuyente.correoContribuyente}
          </td>
          <td className="border px-4 py-2 text-center">
            {contribuyente.telefonoContribuyente}
          </td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-6">
      <h1 className="font-bold text-3xl text-secundary">
          Facturas Contribuyentes
        </h1>
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
      </div>
      
      <div className="flex mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
        >
          <RiArrowLeftSLine />
        </button>
        <span className="mt-2 mx-2">{`Página ${currentPage} de ${Math.ceil(
          contribuyentes.length / itemsPerPage
        )}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(contribuyentes.length / itemsPerPage)}
          className="p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
        >
          <RiArrowRightSLine />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secundary text-white">#</th>

              <th className="px-4 py-2 bg-secundary text-white">
                Nombre Contribuyente <br />
                <Select
                  isMulti
                  components={{ Option }}
                  value={contribuyenteOptions.filter((option) =>
                    selectedIds.includes(option.value)
                  )}
                  onChange={handleSelectContribuyente}
                  options={contribuyenteOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>

              <th className="px-4 py-2 bg-secundary text-white ">
                Nit Contribuyente <br />
                <Select
                  isMulti
                  value={filteredNitOptions.filter((option) =>
                    selectedNit.includes(option.value)
                  )}
                  onChange={handleSelectNit}
                  options={filteredNitOptions}
                  placeholder="Nit Contribuyente"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                  
                />
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Departamento Contribuyente
                <Select
                  isMulti
                  value={filteredDepartamentoOptions.filter((option) =>
                    selectedDepartamento.includes(option.value)
                  )}
                  onChange={handleSelectDepartamento}
                  options={filteredDepartamentoOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Municipio Contribuyente
                <Select
                  isMulti
                  value={filteredMunicipioOptions.filter((option) =>
                    selectedMunicipio.includes(option.value)
                  )}
                  onChange={handleSelectMunicipio}
                  options={filteredMunicipioOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Dirección Contribuyente
                <Select
                  isMulti
                  value={filteredDireccionOptions.filter((option) =>
                    selectedDireccion.includes(option.value)
                  )}
                  onChange={handleSelectDireccion}
                  options={filteredDireccionOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Correo Contribuyente
                <Select
                  isMulti
                  value={filteredCorreoOptions.filter((option) =>
                    selectedCorreo.includes(option.value)
                  )}
                  onChange={handleSelectCorreo}
                  options={filteredCorreoOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Teléfono Contribuyente
                <Select
                  isMulti
                  value={filteredTelefonoOptions.filter((option) =>
                    selectedTelefono.includes(option.value)
                  )}
                  onChange={handleSelectTelefono}
                  options={filteredTelefonoOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                />
              </th>
            </tr>
          </thead>
          <tbody>{tableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Contribuyente;
Contribuyente.propTypes = {
  label: PropTypes.string,  
  isSelected: PropTypes.bool
}