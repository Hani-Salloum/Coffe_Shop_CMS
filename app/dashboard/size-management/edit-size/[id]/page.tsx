//@ts-nocheck

import { getSizeById } from "@/requests/size";
import EditSizeView from "@/views/size-management/EditSizeView";

interface Props { params: Promise<{ id: string }> }

const getData = async (id: string) => {
    const data = (await getSizeById(id))?.data

    return { data }
}

export default async function EditSizePage({ params }: Props){
    const { data } = await getData((await params).id)

    return <>
        <EditSizeView data={data} /> 
    </>
}