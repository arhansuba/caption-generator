import React, { useState } from 'react';
import { useAction, createCaption } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const CaptionCreationPage = () => {
  const createCaptionFn = useAction(createCaption);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateCaption = async () => {
    try {
      await createCaptionFn({ content, category });
      setSuccessMessage('Caption created successfully!');
      setContent('');
      setCategory('');
    } catch (error) {
      setErrorMessage('Error creating caption: ' + error.message);
    }
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Caption Content'
        className='px-1 py-2 border rounded text-lg'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type='text'
        placeholder='Category'
        className='px-1 py-2 border rounded text-lg'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button
        onClick={handleCreateCaption}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Create Caption
      </button>
      {successMessage && <p className='text-green-600'>{successMessage}</p>}
      {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
    </div>
  );
};

export default CaptionCreationPage;