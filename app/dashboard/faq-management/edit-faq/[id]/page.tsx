//@ts-nocheck

import { getFaqById } from "@/requests/faq";
import EditFaqView from "@/views/faq-management/EditFaqManagement";

interface Props { params: Promise<{ id: string }> }

const getData = async (id: string) => {
    const data = (await getFaqById(id))?.data

    return { data }
}

export default async function EditFaqPage({ params }: Props){
    const { data } = await getData((await params).id)

    return <>
        <EditFaqView data={data} /> 
    </>
}