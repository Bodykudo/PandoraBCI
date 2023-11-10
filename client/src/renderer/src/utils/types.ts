export interface FileType {
  name: string;
  size: number;
  filePath: string;
}

export interface AppState {
  id: number;
  files: FileType[];
  isUploaded: boolean;
  isUploading: boolean;
  isReset: boolean;
  data: Dataset | {};
  boundaries: Boundaries;
}

interface Boundaries {
  filtered: {
    max: number;
    min: number;
  };
  unfiltered: {
    max: number;
    min: number;
  };
}

export interface Dataset {
  unfiltered: {
    name: string;
    data: {
      x: number;
      y: number;
    }[];
  }[];
  filtered: {
    name: string;
    data: {
      x: number;
      y: number;
    }[];
  }[];
}
