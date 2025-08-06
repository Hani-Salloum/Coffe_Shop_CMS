//@ts-nocheck
"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { updateItemById } from "@/requests/item";
import { Item } from "@/types/item";
import { LoaderIcon, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/providers";
import { Category } from "@/types/category";
import { Label } from "@/components/ui/label";
import ImageInput from "@/components/reusable/image-input";
import { HSelect } from "@/components/reusable/select";
import { Size } from "@/types/size";
import { Ingredient } from "@/types/ingredient";

interface EditItemProps {
  data: Item;
  categories: Array<Category>
  sizes: Array<Size>
  ingredients: Array<Ingredient>
  items: Array<Item>
}

const schema = z.object({
    id: z.number(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    price: z.any(),
    image:  z.instanceof(File, { message: "Image is required" }),
    description: z.string().min(40, "Dscription must be at least 40 characters"),
    origin_story: z.string().min(80, "Origin story must be at least 80 characters")
  });


type FormData = z.infer<typeof schema>;


export default function EditItemView({ data, categories, items, ingredients, sizes }: EditItemProps) {
    const { t } = useLanguage()
    const router = useRouter()
    const [ itemIds, setItemIds ] = useState(data.related_items?.map(item => item.id))
    const [ categoryIds, setCategoriesIds ] = useState(data.categories.map(item => item.id))
    const [ sizesIds, setSizesIds ] = useState(data.sizes.map(item => item.id) ?? [])
    const [ ingredientsIds, setIngredientsIds ] = useState(data.ingredients.map(item => item.id))

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
      } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: data
      });

    
      const onSubmit = async (data: FormData) => {
        const payload = {
          ...data,
          related_items: itemIds,
          categories: categoryIds,
          sizes: sizesIds,
          ingredients: ingredientsIds,
        };
        try {
            await updateItemById(data.id.toString(), {...data} as Item)
            toast.success(t('item.updated'))
            router.push('/dashboard/item-management')
          } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{ t('item.editItem') }</h2>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>

<Row gutter={0}>
<Col span={6} sm={6}>
        <HInput
            label={t("name")}
            {...register("name")}
            error={errors.name ? errors.name.message : ''}
        />
    </Col>
<Col span={6} sm={6}>
        <HInput
            label={t("price")}
            {...register("price")}
            type="number"
            error={errors.price ? errors.price.message : ''}
        />
    </Col>
    <Col span={6} sm={6}>
            <HSelect
              options={categories}
              value={categoryIds}
              multiple
              onChange={setCategoriesIds}
              valueProperty="id"
              labelProperty="name"
              label={t("category")}
              placeholder={t("selectCategory")}
            />
                </Col>
                <Col span={6} sm={6}>
            <HSelect
              options={sizes}
              value={sizesIds}
              onChange={setSizesIds}
              valueProperty="id"
              labelProperty="name"
              label={t("size")}
              placeholder={t("selectSize")}
              multiple
            />
          </Col>
          <Col span={6} sm={6}>
            <HSelect
              options={ingredients}
              value={ingredientsIds}
              onChange={setIngredientsIds}
              valueProperty="id"
              labelProperty="name"
              label={t("ingredients")}
              placeholder={t("selectIngredient")}
              multiple
            />
          </Col>
            <Col span={6} sm={6}>
            <HSelect
              options={items}
              value={itemIds}
              onChange={setItemIds}
              valueProperty="id"
              labelProperty="name"
              label={t("relatedItems")}
              placeholder={t("selectRelatedItems")}
              multiple
            />
            {/* <HSelect
                        options={items}
                        valueProperty="id"
                        labelProperty="name"
                        label={t("relatedItems")}
                        placeholder={t("selectRelatedItems")}
                        onChange={(value) => setItemIds(value)}
                    /> */}
                </Col>
    <Col span={6} sm={6}>
        <Label className="text-primary mt-4">{t('image')}</Label>
        <ImageInput
            name="image"
            register={register}
            setValue={setValue}
            watch={watch}
            error={errors.image ? errors.image.message : ''}
        />
    </Col>
    <Col span={12}>
      <Label className="text-primary mt-4 mb-3">{ t('description') }</Label>
      <textarea {...register('description')} className="border-2 rounded-2xl border-primary w-full p-3" rows={8} />
    </Col>
    <Col span={12}>
      <Label className="text-primary mt-4 mb-3">{ t('originStory') }</Label>
      <textarea {...register('origin_story')} className="border-2 rounded-2xl border-primary w-full p-3" rows={8} />
    </Col>
</Row>
<Row>
    <Col span={12} className="flex justify-end">
        <Button type="submit">
            {isSubmitting ? <LoaderIcon className="size-4" /> : t("submit")}
        </Button>
    </Col>
</Row>
</form>
    </>
  );
}
