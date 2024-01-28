import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification(state) {
      return ''
    }
  }
})

export const setNotification = (content, timeSec) => {
  return dispatch => {
    dispatch(showNotification(content))
    setTimeout(()=> {  
      dispatch(removeNotification())
    }, timeSec*1000) 
  }
}

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer