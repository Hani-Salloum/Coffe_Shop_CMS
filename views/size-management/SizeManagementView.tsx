// @ts-nocheck
"use client";

import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { deleteSizeById, getAllSizes } from "@/requests/size";
import { Size } from "@/types/size";
import {  Edit, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface sizeManagementProps {
  data: Array<Size>
}

export default function SizeManagementView({ data: initialData }: sizeManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [ data, setData ] = useState(initialData)

  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };

  const deleteSize = async () => {
    try {
      await deleteSizeById(idToDelete)
      toast.success(t('size.deleted'))
      setIsDialogOpen(false);
      router.refresh()
    } catch (error) {
      toast.success(t('wrong'))
    }
  };

  const columns = [
    // { header: t("ID"), accessorKey: "id" as const },
    { header: t("size"), accessorKey: "name" as const },
    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (size: Size) => (
        <>
          <div className="flex gap-0">
            <Link href={`/dashboard/size-management/edit-size/${size.id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5 text-primary" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((size.id).toString())}
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
        <Col span={12} className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{t('size.sizeManagement')}</h2>
          <div className="flex gap-1">
            <Button>
              <Link href='/dashboard/size-management/add-size' className="flex items-center gap-1">
                <PlusCircle className="size-4" />
                {t('size.addSize')}
              </Link>
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <HTable data={data} columns={columns} />
        </Col>
      </Row>
      <HDialog
        title={(t('size.deleteSize'))}
        description={t('size.confirmDelete')}
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
            <Button onClick={deleteSize} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
    </>
  );
}
