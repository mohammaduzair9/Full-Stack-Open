import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'test notification',
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})

export const { filterChange } = notificationSlice.actions
export default notificationSlice.reducer