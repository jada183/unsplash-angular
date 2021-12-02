import { profileImage } from "./profile-image.model";

export interface photoUser {
    accepted_tos: boolean;
    bio: string;
    first_name: string;
    instagram_username: string;
    last_name: string;
    links: any;
    location: string;
    name: string;
    profile_image: profileImage;
    social: any;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    twitter_username: string;
    updated_at: Date;
    username: string;
}