//@ts-nocheck
"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBarista } from "@/requests/barista";
import { Barista } from "@/types/barista";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/providers";
import { Category } from "@/types/category";
import { useState } from "react";
import { HSelect } from "@/components/reusable/select";
import { Label } from "@/components/ui/label";
import ImageInput from "@/components/reusable/image-input";


const schema = z.object({
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


export default function AddBaristaView() {
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
        defaultValues: {
            name: '',
            position: '',
            age: 0,
            experience_years: 0,
            nationality: {
                code: '',
                name: '',
            },
            image:  '',
            description: '',
        }
      });

    
      const onSubmit = async (data: FormData) => {
        try {
            await addBarista(data as Barista)
            toast.success(t('barista.added'))
            router.push('/dashboard/barista-management')
          } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{t('barista.addBarista')}</h2>
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
