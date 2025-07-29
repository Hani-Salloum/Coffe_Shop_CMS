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
import { createOrUpdateContactUsPageData } from "@/requests/contact-us";

interface Props {
  data: unknown;
}

const openingHours = z.object({
  day: z.string().min(4, "Title must be at least 4 characters"),
  hours: z.string().min(6, "Title must be at least 6 characters"),
});

const schema = z.object({
  location: z.string().min(10, "Location must be at least 10 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(11, "Phone number must be at least 11 characters"),
  email: z.string().min(5, "must be a valid email address"),
  map_url: z.string().min(15, "Map Url must be at least 15 characters"),
  title: z.string().min(4, "Title must be at least 4 characters"),
  description: z.string().min(35, "Description must be at least 35 characters"),
  our_hours: z.array(openingHours),
});

type FormData = z.infer<typeof schema>;

export default function ContactUsView({ data }: Props) {
  const { t } = useLanguage();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const {
    fields: openingHours,
    append: appendOpeningHours,
    remove: removeHour,
  } = useFieldArray({
    control: control,
    name: "our_hours",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createOrUpdateContactUsPageData(data);
      toast.success(t("contact.updated"));
      router.push("/dashboard/contact-management");
    } catch (error) {
      toast.error(t("wrong"));
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{t("contactManagement")}</h2>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={0}>
          <Col span={6}>
            <HInput
              label={t("title")}
              {...register('title')}
              error={
                errors.title
                  ? errors.title.message
                  : ""
              }
            />
          </Col>
          <Col span={6}>
            <HInput
              label={t("location")}
              {...register('location')}
              error={
                errors.location
                  ? errors.location.message
                  : ""
              }
            />
          </Col>
          <Col span={6}>
            <HInput
              label={t("phone")}
              {...register('phone')}
              error={
                  errors.phone
                  ? errors.phone.message
                  : ""
              }
            />
          </Col>
          <Col span={6}>
          <HInput
              label={t("email")}
              {...register('email')}
              type="email"
              error={
                errors.email
                  ? errors.email.message
                  : ""
              }
            />
          </Col>
          <Col span={6}>
            <HInput
              label={t("mapUrl")}
              {...register('map_url')}
              error={
                  errors.map_url
                  ? errors.map_url.message
                  : ""
              }
            />
          </Col>
          <Col span={12}>
          <Label className="text-primary mt-4 mb-3">
                    {t("description")}
                  </Label>
                  <textarea
                    {...register('description')}
                    className="mb-2 border-2 rounded-2xl border-primary w-full p-3"
                    rows={6}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {errors.description.message}
                    </p>
                  )}
          </Col>
        </Row>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-primary text-3xl mt-8 mb-3">
            {t("openingHours")}
          </h3>
          <Button
            // variant="ghost"
            type="button"
            size="icon"
            onClick={() => {
              appendOpeningHours({ day: "", hours: "" });
            }}
            className="flex px-3 py-2 justify-between bg-secondary text-primary hover:bg-secondary/60 farms-center w-[150px]"
            // onClick={() => console.log((trader?.id))}
          >
            {t("addOpeningHours")}
            <Plus className="size-5 fill-secondary" />
          </Button>
        </div>
        <Row>
          {openingHours.map((_, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-start items-end gap-2 mb-3">
                <h4 className="text-primary text-2xl mt-6 ">
                  {t("time")} #{index + 1}
                </h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHour(index)}
                >
                  <Trash className="size-6 text-red-500" />
                </Button>
              </div>
              <Row className="w-full">
                <Col span={6}>
                  <HInput
                    label={t("days")}
                    {...register(`our_hours.${index}.day`)}
                    error={
                      errors.our_hours?.[index]?.day
                        ? errors.our_hours?.[index]?.day.message
                        : ""
                    }
                  />
                </Col>
                <Col span={6}>
                  <HInput
                    label={t("hours")}
                    {...register(`our_hours.${index}.hours`)}
                    error={
                      errors.our_hours?.[index]?.hours
                        ? errors.our_hours?.[index]?.hours.message
                        : ""
                    }
                  />
                </Col>
              </Row>
            </div>
          ))}
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
