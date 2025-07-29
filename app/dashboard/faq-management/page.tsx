import { getAllFaqs } from "@/requests/faq";
import FaqManagementView from "@/views/faq-management/FaqManagementView";

const getData = async () => {
    const res = await getAllFaqs()
    return res.data || []
}

export default async function FaqManagementPage() {
    const data = await getData()

 return <>
    <FaqManagementView data={data} />
 </>
}
