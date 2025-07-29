import { getAboutPageData } from "@/requests/about";
import AboutView from "@/views/about-management/AboutView";

const getData = async () => {
    const res = await getAboutPageData()
    return res.data || []
}

export default async function ViewClientPage() {
    const data = await getData()

 return <>
    <AboutView data={data} />
 </>
}
