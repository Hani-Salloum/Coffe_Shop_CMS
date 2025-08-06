"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addIngredient } from "@/requests/ingredient";
import { Ingredient } from "@/types/ingredient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/providers";


const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormData = z.infer<typeof schema>;


export default function AddIngredientView() {
  const { t } = useLanguage()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
        }
      });
    
      const onSubmit = async (data: FormData) => {
        try {
            await addIngredient({...data} as Ingredient)
            toast.success(t('ingredient.added'))
            router.push('/dashboard/ingredient-management')
        } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{ t('ingredient.addIngredient') }</h2>
        </Col>
      </Row>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Row gutter={0}>
                <Col span={6} sm={6}>
                    <HInput
                        label={t('name')}
                        {...register("name")}
                        error={errors.name ? errors.name.message : ''}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Button type="submit">
                        {isSubmitting ? <LoaderIcon className="ingredient-4" /> : t("submit")}
                    </Button>
                </Col>
            </Row>
          </form>
    </>
  );
}
