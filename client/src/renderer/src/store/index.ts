import { AppState } from '@renderer/utils/types';
import { proxy } from 'valtio';

const state: AppState = proxy({
  id: 0,
  files: [],
  isUploaded: false,
  isUploading: false,
  data: {},
  boundaries: {
    filtered: { max: 0, min: 0 },
    unfiltered: { max: 0, min: 0 }
  }
});

export default state;
