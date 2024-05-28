import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getCaption, createCaption } from 'wasp/client/operations';

const CaptionPage = () => {
  const { data: caption, isLoading, error } = useQuery(getCaption, { captionId: 123 });
  const createCaptionFn = useAction(createCaption);
  const [editedCaption, setEditedCaption] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleEditCaption = () => {
    createCaptionFn({ id: caption.id, content: editedCaption, category: caption.category });
    setEditedCaption('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{caption.content}</h1>
      <p className='text-lg text-gray-500'>{caption.category}</p>
      <input
        type='text'
        placeholder='Edit Caption'
        className='px-1 py-2 border rounded text-lg'
        value={editedCaption}
        onChange={(e) => setEditedCaption(e.target.value)}
      />
      <button
        onClick={handleEditCaption}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded mt-4'
      >
        Save
      </button>
    </div>
  );
}

export default CaptionPage;