import { useState, useEffect } from "react";
import useListContribuyente from "../../../hook/Contribuyente/useListContribuyente";
import {
  RiSearchLine,
  RiDownloadLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import HighlightedText from "../../../../utils/HighlightedText";
import useDownloadContribuyente from "../../../hook/Contribuyente/useDownloadContribuyente";
import Select from "react-select";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedNit, setSelectedNit] = useState("");
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedDireccion, setSelectedDireccion] = useState("");
  const [selectedCorreo, setSelectedCorreo] = useState("");
  const [selectedTelefono, setSelectedTelefono] = useState("");
  const [isFacturaSelected, setIsFacturaSelected] = useState(false);
  const [selectedNombreContribuyente, setSelectedNombreContribuyente] = useState(null);

  

  useEffect(() => {
    fetchContribuyentes(searchQuery);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contribuyentes.slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectContribuyente = (selectedOption) => {
    if (selectedOption) {
      const contribuyenteSeleccionado = contribuyentes.find(
        (contribuyente) => contribuyente.id === selectedOption.value
      );
      
     
      setSelectedId(contribuyenteSeleccionado.id);
      setSelectedNombreContribuyente(contribuyenteSeleccionado.nombreContribuyente);
    
      setSelectedNit("");
      setSelectedDepartamento("");
      setSelectedMunicipio("");
      setSelectedDireccion("");
      setSelectedCorreo("");
      setSelectedTelefono("");
    } else {
  
      setSelectedId("");
      setSelectedNombreContribuyente("");
      setSelectedNit("");
      setSelectedDepartamento("");
      setSelectedMunicipio("");
      setSelectedDireccion("");
      setSelectedCorreo("");
      setSelectedTelefono("");
    }
  };
  
  
  const handleSelectNit = (selectedOption) => {
    setSelectedNit(selectedOption ? selectedOption.value : "");
    resetAllSelectsExcept([setSelectedNit]);
  };

  const handleSelectDepartamento = (selectedOption) => {
    setSelectedDepartamento(selectedOption ? selectedOption.value : "");
    resetAllSelectsExcept([setSelectedDepartamento]);
  };

  const handleSelectMunicipio = (selectedOption) => {
    setSelectedMunicipio(selectedOption ? selectedOption.value : "");
    resetAllSelectsExcept([setSelectedMunicipio]);
  };

  const handleSelectDireccion = (selectedOption) => {
    setSelectedDireccion(selectedOption ? selectedOption.value : "");
    resetAllSelectsExcept([setSelectedDireccion]);
  };

  const handleSelectCorreo = (selectedOption) => {
    setSelectedCorreo(selectedOption ? selectedOption.value : "");
    resetAllSelectsExcept([setSelectedCorreo]);
  };

  const handleSelectTelefono = (selectedOption) => {
    setSelectedTelefono(selectedOption ? selectedOption.value : "");
    resetAllSelectsExcept([setSelectedTelefono]);
  };

  useEffect(() => {
    if (selectedNit) {
      fetchFacturaByNit(selectedNit).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNit]);

  useEffect(() => {
    if (selectedDepartamento) {
      fetchFacturaByDepartamento(selectedDepartamento).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartamento]);

  useEffect(() => {
    if (selectedMunicipio) {
      fetchFacturaByMunicipio(selectedMunicipio).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMunicipio]);

  useEffect(() => {
    if (selectedDireccion) {
      fetchFacturaByDireccion(selectedDireccion).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDireccion]);

  useEffect(() => {
    if (selectedCorreo) {
      fetchFacturaByCorreo(selectedCorreo).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCorreo]);

  useEffect(() => {
    if (selectedTelefono) {
      fetchFacturaByTelefono(selectedTelefono).then(() => {
        setIsFacturaSelected(true);
      });
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTelefono]);

  useEffect(() => {
    if (selectedId) {
      fetchFacturaById(selectedId).then(() => {
        if (factura && factura.length > 1) {
          const facturaFiltrada = factura.filter(
            (item) => item.id === parseInt(selectedId)
          );
          setFactura(facturaFiltrada);
        }
      });
      setIsFacturaSelected(true);
    } else {
      setIsFacturaSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, setFactura]);

  const handleDownload = () => {
    
    const filters = {
      nombre: selectedNombreContribuyente || undefined, 
      nit: selectedNit || undefined,
      departamento: selectedDepartamento || undefined,
      municipio: selectedMunicipio || undefined,
      direccion: selectedDireccion || undefined,
      correo: selectedCorreo || undefined,
      telefono: selectedTelefono || undefined,
      filtro: searchQuery || undefined,
    };
  
 
    const activeFilters = Object.keys(filters).filter(
      key => filters[key] !== undefined && filters[key] !== ""
    );
  
    const filterToSend = activeFilters.includes("nombre") && activeFilters.length > 1 
      ? activeFilters.filter(key => key !== "nombre")[0]
      : activeFilters[0];
  
    const finalFilters = filterToSend ? { [filterToSend]: filters[filterToSend] } : {};
    handleDownloadExcel(finalFilters);
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "34px",
      fontSize: "14px",
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    
    fetchContribuyentes(query);
  
    
    resetAllSelectsExcept([setSearchQuery]);
  };
  
  const resetAllSelectsExcept = (excludedSetters) => {
    const allSetters = [
      setSelectedNit,
      setSelectedId,
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
    console.log(contribuyentes)

  

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
              highlight={searchQuery}
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
              highlight={searchQuery}
            />
          
          </td>
          <td className="border px-4 py-2 text-center">
            <HighlightedText
              text={contribuyente.nitContribuyente}
              highlight={searchQuery}
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
      <div className="flex justify-end items-center px-4 py-6">
        <div className="xl:relative mr-4">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 xl:gap-2 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
          >
            <span className="hidden md:inline">Descargar facturas</span>
            <RiDownloadLine className="mr-0 xl:mr-2" />
          </button>
        </div>
        <div className="relative xl:right-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100 placeholder-black placeholder-opacity-70 xl:mr-6"
            placeholder="Search"
            required
            
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-secundary">
            <RiSearchLine className="h-8 w-8 p-1 rounded-md shadow-2xl text-secundary font-semibold" />
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-4 xl:mt-0">
        Lista de Contribuyentes
      </h1>
      <div className="flex mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="  p-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] disabled:opacity-50"
        >
          <RiArrowLeftSLine />
        </button>
        <span className="mt-2 mx-2">{`Página ${currentPage} de ${Math.ceil(
          contribuyentes.length / itemsPerPage
        )}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(contribuyentes.length / itemsPerPage)
          }
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

              <th  className="px-4 py-2 bg-secundary text-white">
                Nombre Contribuyente <br />
                <div hidden={searchQuery}>
                <Select
              
                  value={
                    contribuyenteOptions.find(
                      (option) => option.value === selectedId
                    ) || null
                  }
                  onChange={handleSelectContribuyente}
                  options={contribuyenteOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                  
                />
                </div>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Nit Contribuyente <br />
                <div hidden={searchQuery}>
                <Select
                  value={
                    nitOptions.find((option) => option.value === selectedNit) ||
                    null
                  }
                  onChange={handleSelectNit}
                  options={nitOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                /></div>
              </th>

              <th className="px-4 py-2 bg-secundary text-white">
                Departamento Contribuyente
                <div hidden={searchQuery}>
                <Select
                  value={
                    departamentoOptions.find(
                      (option) => option.value === selectedDepartamento
                    ) || null
                  }
                  onChange={handleSelectDepartamento}
                  options={departamentoOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                /></div>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Municipio Contribuyente
                <div hidden={searchQuery}>
                <Select
                  value={
                    municipioOptions.find(
                      (option) => option.value === selectedMunicipio
                    ) || null
                  }
                  onChange={handleSelectMunicipio}
                  options={municipioOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                /></div>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Dirección Contribuyente
                <div hidden={searchQuery}>
                <Select
                  value={
                    direccionOptions.find(
                      (option) => option.value === selectedDireccion
                    ) || null
                  }
                  onChange={handleSelectDireccion}
                  options={direccionOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                /></div>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Correo Contribuyente
                <div hidden={searchQuery}>
                <Select
                  value={
                    correoOptions.find(
                      (option) => option.value === selectedCorreo
                    ) || null
                  }
                  onChange={handleSelectCorreo}
                  options={correoOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                /></div>
              </th>
              <th className="px-4 py-2 bg-secundary text-white">
                Teléfono Contribuyente<div hidden={searchQuery}>
                <Select
                  value={
                    telefonoOptions.find(
                      (option) => option.value === selectedTelefono
                    ) || null
                  }
                  onChange={handleSelectTelefono}
                  options={telefonoOptions}
                  placeholder="Todos"
                  isClearable
                  styles={customStyles}
                  menuPlacement="auto"
                  menuPosition="fixed"
                /></div>
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
