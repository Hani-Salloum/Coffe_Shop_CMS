//@ts-nocheck
'use client'

import { HCheckbox } from "@/components/reusable/checkbox";
import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { getAllFaqs, deleteFaqById } from "@/requests/faq";
import { Faq } from "@/types/faq";
import {  Check, CirclePause, CirclePlay, Edit, Eye, PlusCircle, Star, Trash, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface faqManagementProps {
  data: Array<Faq>
}

export default function FaqManagementView({ data: initialData }: faqManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [ data, setData ] = useState(initialData)

  
  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };
  
  const deletefaq = async () => {
    try {
      await deleteFaqById(idToDelete)
      setIsDialogOpen(false);
      toast.success(t('faq.deleted'))
      router.refresh()
    } catch (error) {
      toast.error(t('wrong'))
      console.log(error)
    }
  };

  const columns = [
    { header: t("question"), accessorKey: "question" as const,
      cell: (faq: Faq) => (
        <p className="max-w-[300px]">{faq.question}</p>
      )
     },
    // { header: t("answer"), accessorKey: "answer" as const,
    //   cell: (faq: Faq) => (
    //     <p className="max-w-[300px]">{faq.answer}</p>
    //   )
    //  },

    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (faq: Faq) => (
        <>
          <div className="flex gap-0">
            <Link href={`/dashboard/faq-management/edit-faq/${faq.id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5 text-primary" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((faq?.id).toString())}
              // onClick={() => console.log((faq?.id))}
            >
              <Trash className="size-5 text-red-500" />
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col span={12} className="flex faqs-center justify-between">
          <h2 className="text-2xl font-semibold">{t('faq.faqManagement')}</h2>
          <div className="flex gap-1">
            <Button>
              <Link href='/dashboard/faq-management/add-faq' className="flex faqs-center gap-1">
                <PlusCircle className="size-4" />
                {t('faq.addFaq')}
              </Link>
            </Button>
          </div>
        </Col>
        
        <Col span={12}>
          <HTable data={data} columns={columns}/>
        </Col>
      </Row>
      <HDialog
        title={t("faq.deleteFaq")}
        description={t('faq.confirmDelete')}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="rounded-xl"
            >
              {t('cancel')}
            </Button>
            <Button onClick={deletefaq} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
    </>
  );
}
