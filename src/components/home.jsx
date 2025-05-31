import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addPaste, updatePaste } from '../redux/PasteSlice';
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  const [searchParams, setsearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();

  const pastes = useSelector((state) => state.pastes.paste);

  // 🧠 Prefill form if editing an existing paste
  useEffect(() => {
    if (pasteId) {
      const pasteToEdit = pastes.find(p => p.id === pasteId);
      if (pasteToEdit) {
        settitle(pasteToEdit.title);
        setcontent(pasteToEdit.content);
      }
    }
  }, [pasteId]);

  const addtext = () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    const paste = {
      id: pasteId || Date.now().toString(36),
      title,
      content,
      createdAt: new Date().toISOString()
    };

    if (pasteId) {
      dispatch(updatePaste({ id: pasteId, newData: paste })); // ✅ correct payload
    } else {
      dispatch(addPaste(paste));
    }

    settitle('');
    setcontent('');
    setsearchParams({}); // ✅ clear params properly
  };

  return (
    <div>
      <h1 className="text-4xl font-mono bg-gradient-to-r from-purple-600 via-purple-100 to-purple-50 text-transparent bg-clip-text m-5 border-b-4 border-purple-600">
        Notes app
      </h1>
      <input
        type="text"
        className="h-[40px] w-[600px] border-4 border-purple-400 rounded-[5px] mx-10 my-5"
        placeholder='Enter the title'
        value={title}
        onChange={(e) => settitle(e.target.value)}
      />
      <textarea
        className="h-[200px] w-[600px] border-4 border-purple-300 rounded-[5px] mx-10 my-5"
        placeholder='Enter the text'
        value={content}
        onChange={(e) => setcontent(e.target.value)}
      />
      <button
        className='bg-purple-800 h-[60px] w-[100px] font-sans text-white rounded-3xl mx-[40px] my-5'
        onClick={addtext}
      >
        {pasteId ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default Home;


