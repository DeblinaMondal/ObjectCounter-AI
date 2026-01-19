export interface CountResult {
  objectName: string;
  count: number;
  reasoning: string;
}

export interface ImageFile {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
