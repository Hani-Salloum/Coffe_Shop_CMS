import { getAllUserMessages } from "@/requests/mail-collector";
import MailCollectorView from "@/views/mail-collector/MailCollectorView";

const getData = async () => {
    const res = await getAllUserMessages()
    return res.data || []
}

export default async function MailCollectorPage() {
    const data = await getData()

 return <>
    <MailCollectorView data={data} />
 </>
}
