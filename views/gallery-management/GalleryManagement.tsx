//@ts-nocheck
'use client'

import { HCheckbox } from "@/components/reusable/checkbox";
import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { getAllGalleryImages, deleteGalleryImageById } from "@/requests/gallery";
import { GalleryImage } from "@/types/gallery";
import {  Check, CirclePause, CirclePlay, Edit, Eye, PlusCircle, Star, Trash, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface galleryImageManagementProps {
  data: Array<GalleryImage>
}

export default function GalleryManagementView({ data: initialData }: galleryImageManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [ data, setData ] = useState(initialData)

  
  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };
  
  const deletegalleryImage = async () => {
    try {
      await deleteGalleryImageById(idToDelete)
      setIsDialogOpen(false);
      toast.success(t('gallery.deleted'))
      router.refresh()
    } catch (error) {
      toast.error(t('wrong'))
      console.log(error)
    }
  };

  const columns = [
    { header: t("title"), accessorKey: "title" as const },
    { header: t("image"), accessorKey: "image" as const,
      cell: (galleryImage: GalleryImage) => (
        <>
          <div className="w-[100px] h-[70px] relative overflow-hidden rounded-2xl">
            <Image src={galleryImage.image ?? '/logo.jpg'} alt="image" fill objectFit='cover' />
          </div>
        </>
      )
     },

    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (galleryImage: GalleryImage) => (
        <>
          <div className="flex gap-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((galleryImage?.id).toString())}
              // onClick={() => console.log((galleryImage?.id))}
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
        <Col span={12} className="flex galleryImages-center justify-between">
          <h2 className="text-2xl font-semibold">{t('gallery.galleryManagement')}</h2>
          <div className="flex gap-1">
            <Button>
              <Link href='/dashboard/gallery-management/add-gallery-image' className="flex items-center gap-1">
                <PlusCircle className="size-4" />
                {t('gallery.addGalleryImage')}
              </Link>
            </Button>
          </div>
        </Col>

        <Col span={12}>
          <HTable data={data} columns={columns}/>
        </Col>
      </Row>
      <HDialog
        title={t("gallery.deleteGalleryImage")}
        description={t('gallery.confirmDelete')}
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
            <Button onClick={deletegalleryImage} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
    </>
  );
}
