export interface Face {
    faceId: string;
    faceRectangle: FaceRectangle;
    faceAttributes: FaceAttribute;
}
export interface FaceRectangle {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface FaceAttribute {
    smile: number;
    gender: string;
    age: number;
}