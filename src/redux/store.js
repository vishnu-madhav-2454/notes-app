import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './PasteSlice'
export default configureStore({
  reducer: {
    pastes : pasteReducer
  }
})