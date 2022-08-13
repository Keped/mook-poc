import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface MixDownState {
  downloadedFiles: Blob[],
  completeRecordingsByStartTime: string[],
  isPlaying: boolean,
  isDownloading: boolean,
}

// Define the initial state using that type
const initialState: MixDownState = {
  downloadedFiles: [],
  completeRecordingsByStartTime: [],
  isPlaying: false,
  isDownloading: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    startPlaying: (state: MixDownState) => { 
      state.isPlaying = true;
    },
    stopPlaying: (state: MixDownState) => { 
      state.isPlaying = false;
    },
    setFiles: (state: MixDownState, action: PayloadAction<{files: Blob[], startTime: string}>) =>{
      const {files, startTime} = action.payload;
      
      state.downloadedFiles = files;
      state.completeRecordingsByStartTime = [...state.completeRecordingsByStartTime, startTime]
    }
  },
});

export const { startPlaying, stopPlaying, setFiles } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectFiles = (state: RootState) => state.mixer.downloadedFiles

export default counterSlice.reducer