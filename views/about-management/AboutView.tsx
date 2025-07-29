//@ts-nocheck
"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/providers";
import { Label } from "@/components/ui/label";
import ImageInput from "@/components/reusable/image-input";
import { createOrUpdateAboutPageData } from "@/requests/about";

interface Props {
  data: unknown;
}

const coffeeJourney = z.object({
    title: z.string().min(4, 'Title must be at least 4 characters'),
    description: z.string().min(20, 'Title must be at least 20 characters')
})

const schema = z.object({
    our_story: z.string().min(80, "Story must be at least 80 characters"),
    coffee_journey: z.array(coffeeJourney),
    image:  z.instanceof(File, { message: "Image is required" }),
  });


type FormData = z.infer<typeof schema>;


export default function AboutView({ data }: Props) {
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

      const { fields: steps, append: appendStep, remove: removeStep } = useFieldArray({
        control: control,
        name: 'coffee_journey'
      })
    
      const onSubmit = async (data: FormData) => {
        try {
            await createOrUpdateAboutPageData(data)
            toast.success(t('about.updated'))
            router.push('/dashboard/about-management')
          } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{ t('aboutManagement') }</h2>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={0}>
            <Col span={4}>
            <Label className="text-primary mt-4">{t('image')}</Label>
                    <ImageInput
                        name="image"
                        imageUrl={data.image}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        error={errors.image ? errors.image.message : ''}
                    />
                </Col>
            <Col span={8}>
                <Label className="text-primary mt-4 mb-3">{ t('ourStory') }</Label>
                <textarea {...register('our_story')} className="border-2 rounded-2xl border-primary w-full p-3" rows={8} />
                {errors.our_story && <p className="text-xs text-red-500 dark:text-red-400">{errors.our_story.message}</p>}
            </Col>
            </Row>

            <div className="flex justify-between items-center mb-6">
                    <h3 className="text-primary text-3xl mt-8 mb-3">{ t('coffeeJourney') }</h3>
                    <Button
                            // variant="ghost"
                            type="button"
                            size="icon"
                            onClick={() => {appendStep({ title: '', description: '' })}}
                            className="flex px-3 py-2 justify-between bg-secondary text-primary hover:bg-secondary/60 farms-center w-[150px]"
                            // onClick={() => console.log((trader?.id))}
                          >
                            { t('addStep') }
                            <Plus className="size-5 fill-secondary" />
                          </Button>
                </div>
                <Row>
                { steps.map((_, index) => (
                    <div key={index} className="w-full">
                        <div className="flex justify-start items-end gap-2 mb-3">
                            <h4 className="text-primary text-2xl mt-6 ">{t('step')} #{index + 1}</h4>
                            <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeStep(index)}
                                >
                                    <Trash className="size-6 text-red-500" />
                                </Button>
                        </div>
                        <Row className="w-full">
                            <Col span={12}>
                            <HInput
                                label={t("title")}
                                {...register(`coffee_journey.${index}.title`)}
                                error={errors.coffee_journey?.[index]?.title ? errors.coffee_journey?.[index]?.title.message : ''}
                            />
                            </Col>
                            <Col span={12} sm={8}>
                            <Label className="text-primary mt-4 mb-3">{ t('description') }</Label>
                            <textarea {...register(`coffee_journey.${index}.description`)} className="mb-2 border-2 rounded-2xl border-primary w-full p-3" rows={6} />
                            {errors.coffee_journey?.[index]?.description && <p className="text-xs text-red-500 dark:text-red-400">{errors.coffee_journey?.[index]?.description.message}</p>}
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
