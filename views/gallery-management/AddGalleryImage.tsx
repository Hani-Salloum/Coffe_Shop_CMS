//@ts-nocheck
"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addGalleryImage } from "@/requests/gallery";
import { GalleryImage } from "@/types/gallery";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/providers";
import ImageInput from "@/components/reusable/image-input";
import { Label } from "@/components/ui/label";


const schema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    image:  z.instanceof(File, { message: "Image is required" })
});

type FormData = z.infer<typeof schema>;


export default function AddGalleryImageView() {
  const { t } = useLanguage()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue, 
        watch,
        formState: { errors, isSubmitting },
      } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            image: '',
        }
      });
    
      const onSubmit = async (data: FormData) => {
        try {
            await addGalleryImage({...data} as GalleryImage)
            toast.success(t('gallery.added'))
            router.push('/dashboard/gallery-management')
        } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{ t('gallery.addGalleryImage') }</h2>
        </Col>
      </Row>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Row gutter={0}>
                <Col span={6} sm={6}>
                    <HInput
                        label={t('title')}
                        {...register("title")}
                        error={errors.title ? errors.title.message : ''}
                    />
                </Col>
                <Col span={4} sm={4}>
                                <Label className="text-primary mt-4">{t('image')}</Label>
                                <ImageInput
                                    name={`image`}
                                    register={register}
                                    setValue={setValue}
                                    watch={watch}
                                    error={errors.image ? errors.image.message : ''}
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
