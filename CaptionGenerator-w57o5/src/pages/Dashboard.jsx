import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getCaptionsByCategory, deleteCaption } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: captions, isLoading, error } = useQuery(getCaptionsByCategory, { category: 'AI Generated' });
  const deleteCaptionFn = useAction(deleteCaption);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {captions.map((caption) => (
        <div
          key={caption.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{caption.content}</div>
          <div>{caption.category}</div>
          <div>
            <button
              onClick={() => deleteCaptionFn({ id: caption.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
            <Link
              to={`/caption/${caption.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;