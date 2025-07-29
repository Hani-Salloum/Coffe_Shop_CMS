//@ts-nocheck
"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { updateFarmById } from "@/requests/farm";
import { Farm } from "@/types/farm";
import { LoaderIcon, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

interface EditfarmProps {
  data: Farm;
}

const infoSchema = z.object({
    text: z.string(),
    image:  z.instanceof(File, { message: "Image is required" }),
})

const schema = z.object({
    id: z.number(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    region: z.string().min(2, "Name must be at least 2 characters"),
    info_arr: z.array(infoSchema).min(2, "At least 2 info farms are required"),
    height: z.any(),
    area: z.any(),
    temperature: z.any(),
    map_url: z.string().min(20, "Map Url must be at least 20 characters"),
    ground_info_img:  z.instanceof(File, { message: "Ground Info Image is required" }),
    image:  z.instanceof(File, { message: "Image is required" }),
    description: z.string().min(40, "Dscription must be at least 40 characters"),
  });

type FormData = z.infer<typeof schema>;


export default function EditFarmView({ data }: EditfarmProps) {
    const { t } = useLanguage()
    const router = useRouter()

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

      const { fields: infoFields, append: appendInfo, remove: removeInfo } = useFieldArray({
        control: control,
        name: 'info_arr'
      })

    
      const onSubmit = async (data: FormData) => {
        try {
            await updateFarmById(data.id.toString(), {...data} as Farm)
            toast.success(t('farm.updated'))
            router.push('/dashboard/farm-management')
          } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{ t('farm.editFarm') }</h2>
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
                        label={t("region")}
                        {...register("region")}
                        error={errors.region ? errors.region.message : ''}
                    />
                </Col>

            <Col span={6} sm={6}>
                    <HInput
                        label={t("mapUrl")}
                        {...register("map_url")}
                        error={errors.map_url ? errors.map_url.message : ''}
                    />
                </Col>
            <Col span={6} sm={6}>
                    <HInput
                        label={t("height")}
                        {...register("height")}
                        type="number"
                        error={errors.height ? errors.height.message : ''}
                    />
                </Col>
            <Col span={6} sm={6}>
                    <HInput
                        label={t("area")}
                        {...register("area")}
                        type="area"
                        error={errors.area ? errors.area.message : ''}
                    />
                </Col>
            <Col span={6} sm={6}>
                    <HInput
                        label={t("temperature")}
                        {...register("temperature")}
                        type="number"
                        error={errors.temperature ? errors.temperature.message : ''}
                    />
                </Col>
                <Col span={12}>
                  <Label className="text-primary mt-4 mb-3">{ t('description') }</Label>
                  <textarea {...register('description')} className="border-2 rounded-2xl border-primary w-full p-3" rows={8} />
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
                <Col span={6} sm={6}>
                    <Label className="text-primary mt-4">{t('ground_info_img')}</Label>
                    <ImageInput
                        name="ground_info_img"
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        error={errors.ground_info_img ? errors.ground_info_img.message : ''}
                    />
                </Col>
                
            </Row>


                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-primary text-3xl mt-8 mb-3">{ t('progressInfo') }</h3>
                    <Button
                            // variant="ghost"
                            type="button"
                            size="icon"
                            onClick={() => {appendInfo({ text: '', image: '' })}}
                            className="flex px-3 py-2 justify-between bg-secondary text-primary hover:bg-secondary/60 farms-center w-[150px]"
                            // onClick={() => console.log((trader?.id))}
                          >
                            { t('addProgressInfo') }
                            <Plus className="size-5 fill-secondary" />
                          </Button>
                </div>
                <Row>
                { infoFields.map((info, index) => (
                    <div key={index} className="w-full">
                        <div className="flex justify-start items-end gap-2 mb-3">
                            <h4 className="text-primary text-2xl mt-6 ">{t('progressInfo')} #{index + 1}</h4>
                            <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeInfo(index)}
                                >
                                    <Trash className="size-6 text-red-500" />
                                </Button>
                        </div>
                        <Row className="w-full">
                            <Col span={4} sm={4}>
                                <Label className="text-primary mt-4">{t('image')}</Label>
                                <ImageInput
                                    name={`info_arr.${index}.image`}
                                    register={register}
                                    setValue={setValue}
                                    watch={watch}
                                    error={errors.info_arr?.[index]?.image ? errors.info_arr?.[index]?.image.message : ''}
                                />
                            </Col>
                            <Col span={8} sm={8}>
                            <Label className="text-primary mt-4 mb-3">{ t('description') }</Label>
                            <textarea {...register(`info_arr.${index}.text`)} className="mb-2 border-2 rounded-2xl border-primary w-full p-3" rows={6} />
                            {errors.info_arr?.[index]?.text && <p className="text-xs text-red-500 dark:text-red-400">{errors.info_arr?.[index]?.text.message}</p>}
                            </Col>
                        </Row>
                    </div>
                    )) }
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
