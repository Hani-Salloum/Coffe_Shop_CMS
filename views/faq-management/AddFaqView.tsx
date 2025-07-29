"use client";

import { Col, Row } from "@/components/reusable/grid";
import { HInput } from "@/components/reusable/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFaq } from "@/requests/faq";
import { Faq } from "@/types/faq";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLanguage } from "@/providers";
import { Label } from "@/components/ui/label";


const schema = z.object({
    question: z.string().min(15, "Question must be at least 15 characters"),
    answer: z.string().min(15, "Answer must be at least 15 characters"),
});

type FormData = z.infer<typeof schema>;


export default function AddFaqView() {
  const { t } = useLanguage()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            question: '',
            answer: '',
        }
      });
    
      const onSubmit = async (data: FormData) => {
        try {
            await addFaq({...data} as Faq)
            toast.success(t('faq.added'))
            router.push('/dashboard/faq-management')
        } catch (error) {
            toast.error(t('wrong'))
        }
      };

  return (
    <>
      <Row>
        <Col span={12}>
          <h2 className="text-2xl font-semibold">{ t('faq.addFaq') }</h2>
        </Col>
      </Row>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Row gutter={0}>
                <Col span={12}>
                  <Label className="text-primary mt-4 mb-3">{ t('question') }</Label>
                  <textarea {...register('question')} className="border-2 rounded-2xl border-primary w-full p-3 mb-3" rows={8} />
                  {errors.question && <p className="text-xs text-red-500 dark:text-red-400">{errors.question.message}</p>}
                </Col>
                <Col span={12}>
                  <Label className="text-primary mt-4 mb-3">{ t('answer') }</Label>
                  <textarea {...register('answer')} className="border-2 rounded-2xl border-primary w-full p-3 mb-3" rows={8} />
                  {errors.answer && <p className="text-xs text-red-500 dark:text-red-400">{errors.answer.message}</p>}
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
