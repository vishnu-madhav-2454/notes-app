import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { removePaste } from '../redux/PasteSlice';


const Paste = () => {
  const pastes = useSelector((state) => state.pastes.paste);
  const [searchterm, setsearchitem] = useState('');
  const [filteredData, setFilteredData] = useState(pastes);
  const dispatch = useDispatch();

  // Run filter when searchterm changes or when pastes load
  useEffect(() => {
    const filtered = pastes.filter((paste) =>
      paste.title.toLowerCase().includes(searchterm.toLowerCase())

    );
    setFilteredData(filtered);
  }, [searchterm, pastes]);


  const handleCopy = (paste) => {
    navigator.clipboard.writeText(paste.content);

  };
  function handleRemove(pasteId) {
    dispatch(removePaste(pasteId));
  };


  return (
    <div>
      <h1 className="text-4xl font-mono bg-gradient-to-r from-purple-600 via-purple-100 to-purple-50 text-transparent bg-clip-text m-5 border-b-4 border-purple-600">
        List:
      </h1>

      <div className="flex justify-end mx-5">
        <input
          type="search"
          className="border-2 border-purple-500 font-sans bg-purple-100 rounded-l-[3px] px-2 py-1"
          value={searchterm}
          placeholder="Search here"
          onChange={(e) => setsearchitem(e.target.value)}
        />
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-r-md"
          onClick={() => {
            const filtered = pastes.filter((paste) =>
              paste.title.toLowerCase().includes(searchterm.toLowerCase())
            );
            setFilteredData(filtered);
          }}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-5 m-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste.id}
              className="p-4 bg-purple-100 border border-purple-300 rounded-md shadow"
            >
              <div className='flex place-content-between my-2'>
                <h2 className="text-xl font-semibold text-purple-800">
                  {paste.title}
                </h2>
                <h1 className='font-bold text-purple-500'>
                  Date-{paste.createdAt.split('T')[0]}
                </h1>
                <h1 className='font-bold text-purple-500'>
                  Time-{paste.createdAt.split('T')[1].split('.')[0]}
                </h1>
              </div>
              <h1 className='text-black font-sans'>
                {paste.content}
              </h1>
              <div className='flex place-content-between my-4'>
                <button className='bg-purple-400 text-white px-5 py-2 rounded'>
                  <a href={`/?pasteId=${paste?.id}`} className='bg-purple-400 text-white px-5 py-2 rounded'>
                  Edit
                  </a>
                </button>
                <button className='bg-purple-400 text-white px-5 py-2 rounded' onClick={() => handleRemove(paste.id)}>
                  Remove
                </button>
                <button className='bg-purple-400 text-white px-5 py-2 rounded' onClick={handleCopy(paste)}>
                  Copy

                </button>
                <button className='bg-purple-400 text-white px-5 py-2 rounded'>
                  <a href={`/paste/${paste?.id}`} className='font-mono text-white-700'>
                    View
                  </a>

                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-5">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;

