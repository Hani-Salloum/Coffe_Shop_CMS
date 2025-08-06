import { getAllIngredients } from "@/requests/ingredient";
import IngredientManagementView from "@/views/ingredient-management/IngredientManagementView";

const getData = async () => {
    const res = await getAllIngredients()
    return res.data || []
}

export default async function IngredientManagementPage() {
    const data = await getData()

 return <>
    <IngredientManagementView data={data} />
 </>
}
