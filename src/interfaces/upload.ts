
export interface UploadSettings {
    uploadFunction?: (file: Blob) => Promise<string>;
}