export interface Users {
    user_id: string;
    user_name: string;
    user_image: string;
    user_description: string | null;
    preferred_tags: string[] | [];
    type: string;
    user_tag: string;
}