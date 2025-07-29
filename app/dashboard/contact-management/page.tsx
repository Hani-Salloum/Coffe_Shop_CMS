import { getContactUsPageData } from "@/requests/contact-us";
import ContactUsView from "@/views/contact-management/ContactUsView";

const getData = async () => {
    const res = await getContactUsPageData()
    return res.data || []
}

export default async function ViewClientPage() {
    const data = await getData()

 return <>
    <ContactUsView data={data} />
 </>
}
