//@ts-nocheck
'use client'

import { HCheckbox } from "@/components/reusable/checkbox";
import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { getAllFarms, deleteFarmById } from "@/requests/farm";
import { Farm } from "@/types/farm";
import {  Check, CirclePause, CirclePlay, Edit, Eye, PlusCircle, Star, Trash, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface farmManagementProps {
  data: Array<Farm>
}

export default function FarmManagementView({ data: initialData }: farmManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [ data, setData ] = useState(initialData)

  
  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };
  
  const deleteFarm = async () => {
    try {
      await deleteFarmById(idToDelete)
      setIsDialogOpen(false);
      toast.success(t('farm.deleted'))
      router.refresh()
    } catch (error) {
      toast.error(t('wrong'))
      console.log(error)
    }
  };

  const columns = [
    { header: t("name"), accessorKey: "name" as const },
    { header: t("region"), accessorKey: "region" as const },
    { header: t("area"), accessorKey: "area" as const,
      cell: (farm: Farm) => (
        <>
          <div className="flex farms-center justify-start gap-2">
            <span>{ farm.area } m<sup>2</sup></span>
          </div>
        </>
      )
     },
    { header: t("temperature"), accessorKey: "temperature" as const,
      cell: (farm: Farm) => (
        <>
          <div className="flex farms-center justify-start gap-2">
            <span>{ farm.temperature }<sup>o</sup> C</span>
          </div>
        </>
      )
     },

    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (farm: Farm) => (
        <>
          <div className="flex gap-0">
            <Link href={`/dashboard/farm-management/edit-farm/${farm.id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5 text-primary" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((farm?.id).toString())}
              // onClick={() => console.log((farm?.id))}
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
        <Col span={12} className="flex farms-center justify-between">
          <h2 className="text-2xl font-semibold">{t('farm.farmManagement')}</h2>
          <div className="flex gap-1">
            <Button>
              <Link href='/dashboard/farm-management/add-farm' className="flex farms-center gap-1">
                <PlusCircle className="size-4" />
                {t('farm.addFarm')}
              </Link>
            </Button>
          </div>
        </Col>
        {/* <Col span={12}>
          <Row gutter={0}>
            <Col span={6} sm={6}>
              <HCheckbox
                label={t('isActive')}
                checked={isActive}
                onCheckedChange={() => setIsActive(isActive === null ? true : !isActive)}
              />
            </Col>
          </Row>
        </Col> */}
        <Col span={12}>
          <HTable data={data} columns={columns}/>
        </Col>
      </Row>
      <HDialog
        title={t("farm.deleteFarm")}
        description={t('farm.confirmDelete')}
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
            <Button onClick={deleteFarm} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
    </>
  );
}
