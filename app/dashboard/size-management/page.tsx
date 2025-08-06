import { getAllSizes } from "@/requests/size";
import SizeManagementView from "@/views/size-management/SizeManagementView";

const getData = async () => {
    const res = await getAllSizes()
    return res.data || []
}

export default async function SizeManagementPage() {
    const data = await getData()

 return <>
    <SizeManagementView data={data} />
 </>
}
