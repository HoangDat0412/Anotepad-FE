import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import loadingSlice from './features/loading/loadingSlice'
import  taskListSlice  from './features/TaskList/TaskList'
import noteSlice from './features/note/noteSlice'
import folderSlice from './features/folder/folderSlice'
import commentSlice from './features/comment/commentSlice'

export const store = configureStore({
  reducer: {
    loadingSlice,
    userSlice,
    taskListSlice,
    noteSlice,
    folderSlice,
    commentSlice
  },
})