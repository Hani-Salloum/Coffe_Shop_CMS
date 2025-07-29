//@ts-nocheck
'use client'

import { HCheckbox } from "@/components/reusable/checkbox";
import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { getAllUserMessages, deleteUserMessageById } from "@/requests/mail-collector";
import { ContactUsFormPayload as Mail } from "@/types/general";
import {  Check, CirclePause, CirclePlay, Edit, Eye, PlusCircle, Star, Trash, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface mailManagementProps {
  data: Array<Mail>
}

export default function MailCollectorView({ data: initialData }: mailManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShowDialogOpen, setIsShowDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [currentMail, setCurrentMail] = useState<Mail | null>();
  const [ data, setData ] = useState(initialData)

  
  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };

  const handleShow = (mail: Mail) => {
    setIsShowDialogOpen(true);
    setCurrentMail(mail)
  };

  const handleCloseShow = () => {
    setIsShowDialogOpen(false)
    setCurrentMail(null)
  }
  
  const deleteMail = async () => {
    try {
      await deleteUserMessageById(idToDelete)
      setIsDialogOpen(false);
      toast.success(t('mail.deleted'))
      router.refresh()
    } catch (error) {
      toast.error(t('wrong'))
      console.log(error)
    }
  };

  const columns = [
    { header: t("name"), accessorKey: "name" as const },
    { header: t("phone"), accessorKey: "phone" as const },
    { header: t("email"), accessorKey: "email" as const },
    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (mail: Mail) => (
        <>
          <div className="flex gap-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShow(mail)}
              // onClick={() => console.log((mail?.id))}
            >
              <Eye className="size-5 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((mail?.id).toString())}
              // onClick={() => console.log((mail?.id))}
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
        <Col span={12} className="flex mails-center justify-between">
          <h2 className="text-2xl font-semibold">{t('mail.mailManagement')}</h2>
        </Col>
        <Col span={12}>
          <HTable data={data} columns={columns}/>
        </Col>
      </Row>
      <HDialog
        title={t("mail.deleteMail")}
        description={t('mail.confirmDelete')}
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
            <Button onClick={deleteMail} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
      <HDialog
        title={t("mail.showMail")}
        open={isShowDialogOpen}
        onOpenChange={setIsShowDialogOpen}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCloseShow}
              className="rounded-xl"
            >
              {t('close')}
            </Button>
          </div>
        }
      >
        <div className="mb-5">
            <h3 className="text-primary mb-3 text-2xl">{ t('userMessage') }</h3>
            <p className="text-md text-primary/40">{ currentMail?.message }</p>
        </div>
        <div>
            <h3 className="text-primary mb-3 text-2xl">{ t('aiResponse') }</h3>
            <p className="text-md text-primary/40">{ currentMail?.ai_response }</p>
        </div>
      </HDialog>
    </>
  );
}
