//@ts-nocheck
"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { updateBaristaById } from "@/requests/barista";
import { Barista } from "@/types/barista";
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

interface EditBaristaProps {
  data: Barista;
}

const schema = z.object({
    id: z.number(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    position: z.string().min(2, "Position must be at least 2 characters"),
    age: z.any(),
    experience_years: z.any(),
    nationality: z.object({
        code: z.string().min(2, "Nationality code must be at least 2 characters"),
        name: z.string().min(2, "Nationality name must be at least 2 characters"),
    }),
    image:  z.instanceof(File, { message: "Image is required" }),
    description: z.string().min(40, "Dscription must be at least 40 characters"),
  });


type FormData = z.infer<typeof schema>;


export default function EditBaristaView({ data }: EditBaristaProps) {
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

    
      const onSubmit = async (data: FormData) => {
        try {
            await updateBaristaById(data.id.toString(), {...data} as Barista)
            toast.success(t('barista.updated'))
            router.push('/dashboard/barista-management')
          } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{ t('barista.editBarista') }</h2>
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
                        label={t("position")}
                        {...register("position")}
                        error={errors.position ? errors.position.message : ''}
                    />
                </Col>

            <Col span={6} sm={6}>
                    <HInput
                        label={t("age")}
                        {...register("age")}
                        type="number"
                        error={errors.age ? errors.age.message : ''}
                    />
                </Col>
            <Col span={6} sm={6}>
                    <HInput
                        label={t("experienceYears")}
                        {...register("experience_years")}
                        type="area"
                        error={errors.experience_years ? errors.experience_years.message : ''}
                    />
                </Col>
                <Col span={6} sm={6}>
                    <HInput
                        label={t("nationalityCode")}
                        {...register("nationality.code")}
                        error={errors.nationality?.code ? errors.nationality.code.message : ''}
                    />
                </Col>
                <Col span={6} sm={6}>
                    <HInput
                        label={t("nationalityName")}
                        {...register("nationality.name")}
                        error={errors.nationality?.name ? errors.nationality.name.message : ''}
                    />
                </Col>

                <Col span={4} sm={4}>
                    <Label className="text-primary mt-4">{t('image')}</Label>
                    <ImageInput
                        name="image"
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        error={errors.image ? errors.image.message : ''}
                    />
                </Col>
                <Col span={8}>
                  <Label className="text-primary mt-4 mb-3">{ t('description') }</Label>
                  <textarea {...register('description')} className="border-2 rounded-2xl border-primary w-full p-3" rows={8} />
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
