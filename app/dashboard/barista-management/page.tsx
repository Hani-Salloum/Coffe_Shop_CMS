import { getAllBaristas } from "@/requests/barista";
import BaristaManagementView from "@/views/barista-management/BaristaManagementView";

const getData = async () => {
    const res = await getAllBaristas()
    return res.data || []
}

export default async function BaristaManagementPage() {
    const data = await getData()

 return <>
    <BaristaManagementView data={data} />
 </>
}
