import { photo } from "./photo.model";

export interface searchByPhotoResponse 
{
    results: Array<photo>;
    total: number;
    total_pages: number;
}