//@ts-nocheck
'use client'

import { HCheckbox } from "@/components/reusable/checkbox";
import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { getAllBaristas, deleteBaristaById } from "@/requests/barista";
import { Barista } from "@/types/barista";
import {  Check, CirclePause, CirclePlay, Edit, Eye, PlusCircle, Star, Trash, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface baristaManagementProps {
  data: Array<Barista>
}

export default function BaristaManagementView({ data: initialData }: baristaManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [ data, setData ] = useState(initialData)

  
  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };
  
  const deletebarista = async () => {
    try {
      await deleteBaristaById(idToDelete)
      setIsDialogOpen(false);
      toast.success(t('barista.deleted'))
      router.refresh()
    } catch (error) {
      toast.error(t('wrong'))
      console.log(error)
    }
  };

  const columns = [
    { header: t("name"), accessorKey: "name" as const },
    { header: t("age"), accessorKey: "age" as const },
    { header: t("position"), accessorKey: "position" as const },

    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (barista: Barista) => (
        <>
          <div className="flex gap-0">
            <Link href={`/dashboard/barista-management/edit-barista/${barista.id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5 text-primary" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((barista?.id).toString())}
              // onClick={() => console.log((barista?.id))}
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
        <Col span={12} className="flex baristas-center justify-between">
          <h2 className="text-2xl font-semibold">{t('barista.baristaManagement')}</h2>
          <div className="flex gap-1">
            <Button>
              <Link href='/dashboard/barista-management/add-barista' className="flex baristas-center gap-1">
                <PlusCircle className="size-4" />
                {t('barista.addBarista')}
              </Link>
            </Button>
          </div>
        </Col>
     
        <Col span={12}>
          <HTable data={data} columns={columns}/>
        </Col>
      </Row>
      <HDialog
        title={t("barista.deleteBarista")}
        description={t('barista.confirmDelete')}
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
            <Button onClick={deletebarista} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
    </>
  );
}
