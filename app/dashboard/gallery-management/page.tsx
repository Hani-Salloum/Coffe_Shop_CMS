import { getAllGalleryImages } from "@/requests/gallery";
import GalleryManagementView from "@/views/gallery-management/GalleryManagement";

const getData = async () => {
    const res = await getAllGalleryImages()
    return res.data || []
}

export default async function GalleryManagementPage() {
    const data = await getData()

 return <>
    <GalleryManagementView data={data} />
 </>
}
