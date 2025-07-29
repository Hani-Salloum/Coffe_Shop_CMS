import { getAllFarms } from "@/requests/farm";
import FarmManagementView from "@/views/farm-management/FarmManagementView";

const getData = async () => {
    const res = await getAllFarms()
    return res.data || []
}

export default async function ViewClientPage() {
    const data = await getData()

 return <>
    <FarmManagementView data={data} />
 </>
}
