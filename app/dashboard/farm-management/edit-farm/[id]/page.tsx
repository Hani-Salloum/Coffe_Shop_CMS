//@ts-nocheck
import { getFarmById } from "@/requests/farm";
import EditFarmView from "@/views/farm-management/EditFarmView";

interface Props { params: Promise<{ id: string }> }

const getData = async (id: string) => {
    const data = (await getFarmById(id))?.data

    return { data }
}

export default async function EditFarmPage({ params }: Props){
    const { data } = await getData((await params).id)

    return <>
        <EditFarmView data={data} /> 
    </>
}