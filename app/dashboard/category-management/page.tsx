import { getAllCategories } from "@/requests/category"
import CategoryManagementView from "@/views/category-management/CategoryManagementView"

const getData = async () => {
    const res = (await getAllCategories()).data ?? []
    return res || []
}

export default async function CategoryManagementPage() {
    const data = await getData()

 return <>
    <CategoryManagementView data={data} />
 </>
}
