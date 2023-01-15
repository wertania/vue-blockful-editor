
export interface UploadSettings {
    url?: string;
    formDataKey?: string;
    uploadFunction?: (data: any) => void;
}