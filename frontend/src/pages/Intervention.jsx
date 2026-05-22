import { useEffect, useState } from 'react';
import { interventionService } from '../services/InterventionService';
import { useNavigate } from 'react-router-dom';

export const Intervention = () => {
  const navigate = useNavigate();
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInterventions = async () => {
      const result = await interventionService.getByTenant();
      
      if (result.success) {
          let dataArray = [];
          
          if (Array.isArray(result.data)) {
            dataArray = result.data;
          } else if (result.data && Array.isArray(result.data.interventions)) {
            dataArray = result.data.interventions;
          } else if (result.data && Array.isArray(result.data.data)) {
            dataArray = result.data.data; 
          }

        setInterventions(dataArray);
      } else {
        setError(result.message || 'No se pudieron cargar las intervenciones.');
      }
      setLoading(false);
    };

    fetchInterventions();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Intervenciones</h1>
          <p className="text-sm text-gray-500 mt-1">
            Historial de registros vinculados a tu organización.
          </p>
        </div>
        <button
          onClick={() => navigate('/intervention/new')}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-all shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
          <span className="mr-1.5 text-base font-normal">+</span> Nueva Intervención
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm shadow-sm flex items-center">
          <span className="mr-2 font-bold">Error:</span> {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-sm text-gray-500 font-medium">Sincronizando con el servidor...</p>
        </div>
      ) : interventions.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-16 text-center shadow-sm">
          <p className="text-gray-500 font-medium text-base">No hay ninguna intervención dada de alta.</p>
          <p className="text-sm text-gray-400 mt-1">Haz clic en el botón superior para registrar la primera.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Ref</th>
                  <th className="px-6 py-3.5">Afectado/a</th>
                  <th className="px-6 py-3.5">Ubicación / Lugar</th>
                  <th className="px-6 py-3.5">Tipo de Servicio</th>
                  <th className="px-6 py-3.5">Operador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                {interventions.map((item) => (
                  <tr key={item.idintervention} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                      #{item.idintervention}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.name} {item.surname}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                      {item.place}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {item.intervention_type_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                        {item.created_by}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};