export interface Forecast {
    currently: Currently;
}
export interface Currently {
    summary: string;
    temperature: number;
}