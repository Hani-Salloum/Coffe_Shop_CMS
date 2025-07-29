//@ts-nocheck
import { getBaristaById } from "@/requests/barista";
import EditBaristaView from "@/views/barista-management/EditBaristaView";

interface Props { params: Promise<{ id: string }> }

const getData = async (id: string) => {
    const data = (await getBaristaById(id))?.data

    return { data }
}

export default async function EditbaristaPage({ params }: Props){
    const { data } = await getData((await params).id)

    return <>
        <EditBaristaView data={data} /> 
    </>
}