import { createSlice } from '@reduxjs/toolkit'

// Safe localStorage parsing with fallback
const getInitialPaste = () => {
  try {
    const item = localStorage.getItem('paste')
    return item ? JSON.parse(item) : []
  } catch (e) {
    console.error("Error parsing paste from localStorage", e)
    return []
  }
}

const initialState = {
  paste: getInitialPaste()  // Always returns an array
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addPaste: (state, action) => {
      state.paste.push(action.payload)
      localStorage.setItem('paste', JSON.stringify(state.paste))
    },

    updatePaste: (state, action) => {
      const { id, newData } = action.payload
      const index = state.paste.findIndex(p => p.id === id)
      if (index !== -1) {
        state.paste[index] = newData  // ✅ Fixed: use newData
        localStorage.setItem('paste', JSON.stringify(state.paste))
      }
    },

    resetPaste: (state) => {
      state.paste = []
      localStorage.setItem('paste', JSON.stringify([]))
    },

    removePaste: (state, action) => {
      const id = action.payload
      state.paste = state.paste.filter(p => p.id !== id)
      localStorage.setItem('paste', JSON.stringify(state.paste))
    }
  }
})

export const { addPaste, updatePaste, resetPaste, removePaste } = pasteSlice.actions
export default pasteSlice.reducer
