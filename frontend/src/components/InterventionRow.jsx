export const InterventionRow = ({ item }) => {
  return (
    <tr className="hover:bg-gray-50/70 transition-colors">
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
  );
};