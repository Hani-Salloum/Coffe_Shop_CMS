//@ts-nocheck
"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { updateSizeById } from "@/requests/size";
import { Size } from "@/types/size";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/providers";

interface EditsizeProps {
  data: Size;
}

const schema = z.object({
    id: z.number(),
    name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormData = z.infer<typeof schema>;


export default function EditSizeView({ data }: EditsizeProps) {
  const { t } = useLanguage()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: data,
      });
    
      const onSubmit = async (payload: FormData) => {
        console.log(payload)
        console.log(data.id)
        try {
            await updateSizeById(data.id.toString(), {name: payload.name})
            toast.success(t('size.updated'))
            router.push('/dashboard/size-management')
          } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{ t('size.editSize') }</h2>
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
