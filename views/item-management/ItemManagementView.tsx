//@ts-nocheck
"use client";

import { HCheckbox } from "@/components/reusable/checkbox";
import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import ItemReviews from "@/components/reusable/item-reviews";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { getAllItems, deleteItemById } from "@/requests/item";
import { Item } from "@/types/item";
import { Review } from "@/types/review";
import {  Check, CirclePause, CirclePlay, Edit, Eye, PlusCircle, Star, Trash, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ItemManagementProps {
  data: Array<Item>
}

export default function ItemManagementView({ data: initialData }: ItemManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShowDialogOpen, setIsShowDialogOpen] = useState(false);
  const [currentReviews, setCurrentReviews] = useState<Array<Review>>([])
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [ page, setPage ] = useState(1)
  const [ data, setData ] = useState(initialData)
  const [ isActive, setIsActive ] = useState(true)

  
  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };

  const handleShow = (id: string, reviews: Array<Review>) => {
    setIsShowDialogOpen(true);
    setIdToDelete(id);
    setCurrentReviews(reviews)
  };

  const handleCloseShow = () => {
    setIsShowDialogOpen(false)
    setIdToDelete('')
    setCurrentReviews([])
  }
  
  const deleteItem = async () => {
    try {
      await deleteItemById(idToDelete)
      setIsDialogOpen(false);
      toast.success(t('item.deleted'))
      router.refresh()
    } catch (error) {
      toast.error(t('wrong'))
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllItems()
      
      setData(res?.data)
    }
    fetchData()
  }, [page])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getAllitems(1, isActive)
  //     setPage(1)
      
  //     setData(res)
  //   }
  //   fetchData()
  // }, [isActive])

  const columns = [
    { header: t("name"), accessorKey: "name" as const },
    { header: t("price"), accessorKey: "price" as const },
    { header: t("rate"), accessorKey: "avg_rating" as const,
      cell: (item: Item) => (
        <>
          <div className="flex items-center justify-start gap-3">
            <span>{ item.avg_rating }</span>
            <Star className="size-6 text-primary fill-secondary" />
          </div>
        </>
      )
     },

    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (item: Item) => (
        <>
          <div className="flex gap-0">
            <Link href={`/dashboard/item-management/edit-item/${item.id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5 text-primary" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShow((item?.id).toString(), item?.reviews)}
              // onClick={() => console.log((item?.id))}
            >
              <Star className="size-5 text-primary fill-secondary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((item?.id).toString())}
              // onClick={() => console.log((item?.id))}
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
          <h2 className="text-2xl font-semibold">{t('item.itemManagement')}</h2>
          <div className="flex gap-1">
            <Button>
              <Link href='/dashboard/item-management/add-item' className="flex items-center gap-1">
                <PlusCircle className="size-4" />
                {t('item.addItem')}
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
        title={t("item.deleteItem")}
        description={t('item.confirmDelete')}
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
            <Button onClick={deleteItem} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
      <HDialog
        title={t("item.showReviews")}
        open={isShowDialogOpen}
        size="xl"
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
        <ItemReviews reviews={currentReviews} />
      </HDialog>
    </>
  );
}
