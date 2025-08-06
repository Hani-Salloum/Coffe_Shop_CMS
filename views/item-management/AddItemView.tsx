//@ts-nocheck
"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addItem } from "@/requests/item";
import { Item } from "@/types/item";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/providers";
import { Category } from "@/types/category";
import { useState } from "react";
import { HSelect } from "@/components/reusable/select";
import { Label } from "@/components/ui/label";
import ImageInput from "@/components/reusable/image-input";
import { Ingredient } from "@/types/ingredient";
import { Size } from "@/types/size";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.any(),
  image: z.instanceof(File, { message: "Image is required" }),
  description: z.string().min(40, "Dscription must be at least 40 characters"),
  origin_story: z
    .string()
    .min(80, "Origin story must be at least 80 characters"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  categories: Array<Category>;
  ingredients: Array<Ingredient>;
  sizes: Array<Size>;
  items: Array<Item>;
}

export default function AddItemView({
  categories,
  items,
  sizes,
  ingredients,
}: Props) {
  const { t } = useLanguage();
  const router = useRouter();
  const [categoryIds, setCategoryIds] = useState([]);
  const [sizesIds, setSizesIds] = useState([]);
  const [ingredientsIds, setIngredientsIds] = useState([]);
  const [itemIds, setItemIds] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      origin_story: "",
    },
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
      await addItem(payload as Item);
      toast.success(t("item.added"));
      router.push("/dashboard/item-management");
    } catch (error) {
      toast.error(t("wrong"));
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{t("item.addItem")}</h2>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={0}>
          <Col span={6} sm={6}>
            <HInput
              label={t("Name")}
              {...register("name")}
              error={errors.name ? errors.name.message : ""}
            />
          </Col>
          <Col span={6} sm={6}>
            <HInput
              label={t("Price")}
              {...register("price")}
              type="number"
              error={errors.price ? errors.price.message : ""}
            />
          </Col>
          <Col span={6} sm={6}>
            <HSelect
              options={categories}
              value={categoryIds}
              onChange={setCategoryIds}
              valueProperty="id"
              labelProperty="name"
              label={t("category")}
              placeholder={t("selectCategory")}
              multiple
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
            <Label className="text-primary mt-4">{t("image")}</Label>
            <ImageInput
              name="image"
              register={register}
              setValue={setValue}
              watch={watch}
              error={errors.image ? errors.image.message : ""}
            />
          </Col>

          {/* <Col span={12}>
            <h3 className="text-primary text-3xl mt-8 mb-3">
              {t("ingredients")}
            </h3>
            <Row>
              {ingredientFields.map((ingredient, index) => (
                <Col
                  span={4}
                  sm={4}
                  key={index}
                  className="flex items-end justify-between gap-1"
                >
                  <HInput
                    label={t("ingredient") + ` #${index + 1}`}
                    {...register(`ingredients.${index}`)}
                    error={
                      errors.ingredients?.[index]
                        ? errors.ingredients[index]?.message ??
                          "Fill this field"
                        : ""
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                  >
                    <Trash className="size-5 text-red-500" />
                  </Button>
                </Col>
              ))}
              <Col span={4} sm={4} className="flex items-end">
                <Button
                  // variant="ghost"
                  type="button"
                  size="icon"
                  onClick={() => {
                    appendIngredient("");
                  }}
                  className="flex px-3 py-2 justify-between bg-secondary text-primary hover:bg-secondary/60 items-center w-[150px]"
                  // onClick={() => console.log((trader?.id))}
                >
                  {t("addIngredient")}
                  <Plus className="size-5 fill-secondary" />
                </Button>
              </Col>
            </Row>
          </Col> */}
          {/* <Col span={12}>
            <h3 className="text-primary text-3xl mt-8 mb-3">{t("sizes")}</h3>
            <Row>
              {sizeFields.map((size, index) => (
                <Col
                  span={4}
                  sm={4}
                  key={index}
                  className="flex items-end justify-between gap-1"
                >
                  <HInput
                    label={t("size") + ` #${index + 1}`}
                    {...register(`sizes.${index}`)}
                    error={
                      errors.sizes?.[index]
                        ? errors.sizes[index]?.message ?? "Fill this field"
                        : ""
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSize(index)}
                  >
                    <Trash className="size-5 text-red-500" />
                  </Button>
                </Col>
              ))}
              <Col span={4} sm={4} className="flex items-end">
                <Button
                  // variant="ghost"
                  type="button"
                  size="icon"
                  onClick={() => {
                    appendSize("");
                  }}
                  className="flex px-3 py-2 justify-between bg-secondary text-primary hover:bg-secondary/60 items-center w-[150px]"
                  // onClick={() => console.log((trader?.id))}
                >
                  {t("addSize")}
                  <Plus className="size-5" />
                </Button>
              </Col>
            </Row>
          </Col> */}
          <Col span={12}>
            <Label className="text-primary mt-4 mb-3">{t("description")}</Label>
            <textarea
              {...register("description")}
              className="border-2 rounded-2xl border-primary w-full p-3"
              rows={8}
            />
          </Col>
          <Col span={12}>
            <Label className="text-primary mt-4 mb-3">{t("originStory")}</Label>
            <textarea
              {...register("origin_story")}
              className="border-2 rounded-2xl border-primary w-full p-3"
              rows={8}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Button type="submit">
              {isSubmitting ? <LoaderIcon className="size-4" /> : t("submit")}
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}
