import { photoLinks } from "./photo-links.model";
import { photoUrls } from "./photo-urls.model";
import { photoUser } from "./photo-user.model";
import { tags } from "./tags.model";

export interface photo {
    alt_description: string;
    blur_hash: string;
    category: Array<any>;
    color: string;
    created_at: Date;
    current_user_collections: Array<any>;
    description: string;
    height: number;
    id: string;
    liked_by_user: boolean;
    likes: number;
    links: photoLinks;
    promoted_at: Date;
    tags: Array<tags>;
    topic_submissions: any;
    sponsorship: string;
    urls: photoUrls;
    user: photoUser;
}