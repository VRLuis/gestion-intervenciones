import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { interventionService } from '../services/InterventionService';
import { useNavigate } from 'react-router-dom';

export const NewIntervention = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    place: '',
    idInterventionType: ''
  });

  const [types, setTypes] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadTypes = async () => {
      const result = await interventionService.getTypes();
      
      if (result.success) {
        let typesArray = [];
        if (Array.isArray(result.data)) {
          typesArray = result.data;
        } else if (result.data && Array.isArray(result.data.types)) {
          typesArray = result.data.types;
        } else if (result.data && Array.isArray(result.data.data)) {
          typesArray = result.data.data;
        }
        setTypes(typesArray);
      } else {
        setError('Error al sincronizar los tipos de intervenciones.');
      }
    };
    loadTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setError('');
    if (!formData.name.trim() || !formData.surname.trim()) {
      setError('Por favor, completa el nombre y los apellidos antes de continuar.');
      return;
    }
    setStep(2);
  };

  const handlePrevStep = () => {
    setError('');
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, surname, place, idInterventionType } = formData;

    if (!name.trim() || !surname.trim() || !place.trim() || !idInterventionType) {
      setError('Por favor, completa todos los campos del formulario.');
      return;
    }

    setSubmitting(true);

    const payload = {
      name: name.trim(),
      surname: surname.trim(),
      place: place.trim(),
      idInterventionType: Number(idInterventionType),
      idTenant: user?.idtenant,
      idUser: user?.iduser
    };

    const result = await interventionService.create(payload);

    if (result.success) {
      navigate('/intervention');
    } else {
      setError(result.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Nueva Intervención — Paso {step} de 2
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {step === 1 
            ? 'Introduce los datos de identificación del solicitante o afectado.' 
            : 'Especifica la ubicación y la tipología del trabajo de campo.'}
        </p>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
          style={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm shadow-sm flex items-center">
          {error}
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5"
      >
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Apellidos</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Apellidos"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lugar o Ubicación</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="Ej: Base Central / Dirección de la incidencia"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tipo de Intervención</label>
              <select
                name="idInterventionType"
                value={formData.idInterventionType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800"
              >
                <option value="">Selecciona la categoría correspondiente...</option>
                {types.map((type) => (
                  <option key={type.idinterventiontype} value={type.idinterventiontype}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-end items-center space-x-3 pt-5 border-t border-gray-100">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={() => navigate('/intervention')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                Siguiente paso
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-300 cursor-pointer"
              >
                Atrás
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
              >
                {submitting ? 'Guardando intervención...' : 'Finalizar y Guardar'}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};