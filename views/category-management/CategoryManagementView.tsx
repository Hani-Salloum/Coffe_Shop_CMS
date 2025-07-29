//@ts-nocheck
"use client";

import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { deleteCategoryById, getAllCategories } from "@/requests/category";
import { Category } from "@/types/category";
import {  Edit, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CategoryManagementProps {
  data: Array<Category>
}

export default function CategoryManagementView({ data: initialData }: CategoryManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [ data, setData ] = useState(initialData)

  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };

  const deleteCategory = async () => {
    try {
      await deleteCategoryById(idToDelete)
      toast.success(t('category.deleted'))
      setIsDialogOpen(false);
      router.refresh()
    } catch (error) {
      toast.success(t('wrong'))
    }
  };

  const columns = [
    // { header: t("ID"), accessorKey: "id" as const },
    { header: t("category"), accessorKey: "name" as const },
    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (category: Category) => (
        <>
          <div className="flex gap-0">
            <Link href={`/dashboard/category-management/edit-category/${category.id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5 text-primary" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((category.id).toString())}
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
          <h2 className="text-2xl font-semibold">{t('category.categoryManagement')}</h2>
          <div className="flex gap-1">
            <Button>
              <Link href='/dashboard/category-management/add-category' className="flex items-center gap-1">
                <PlusCircle className="size-4" />
                {t('category.addCategory')}
              </Link>
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <HTable data={data} columns={columns} />
        </Col>
      </Row>
      <HDialog
        title={(t('category.deleteCategory'))}
        description={t('category.confirmDelete')}
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
            <Button onClick={deleteCategory} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
    </>
  );
}
