//@ts-nocheck
import { getAllItems } from "@/requests/item";
import ItemManagementView from "@/views/item-management/ItemManagementView";

const getData = async () => {
    const res = await getAllItems()
    return res.data || []
}

export default async function ViewClientPage() {
    const data = await getData()

 return <>
    <ItemManagementView data={data} />
 </>
}
