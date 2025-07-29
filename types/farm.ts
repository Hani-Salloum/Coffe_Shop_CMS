interface FarmInfo {
    text: string;
    image: string;
}

export interface Farm {
    id?: number;
    name: string;
    image: string;
    height?: number;
    area?: number;
    temperature?: number; 
    region: string;
    map_url?: string;
    ground_info_img?: string;
    description?: string;
    info_arr?: Array<FarmInfo>;
}