// @ts-nocheck
"use client";

import { HDialog } from "@/components/reusable/dialog";
import { Col, Row } from "@/components/reusable/grid";
import { HTable } from "@/components/reusable/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers";
import { deleteIngredientById, getAllIngredients } from "@/requests/ingredient";
import { Ingredient } from "@/types/ingredient";
import {  Edit, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ingredientManagementProps {
  data: Array<Ingredient>
}

export default function IngredientManagementView({ data: initialData }: ingredientManagementProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [ data, setData ] = useState(initialData)

  const handleDelete = (id: string) => {
    setIsDialogOpen(true);
    setIdToDelete(id);
  };

  const deleteIngredient = async () => {
    try {
      await deleteIngredientById(idToDelete)
      toast.success(t('ingredient.deleted'))
      setIsDialogOpen(false);
      router.refresh()
    } catch (error) {
      toast.success(t('wrong'))
    }
  };

  const columns = [
    // { header: t("ID"), accessorKey: "id" as const },
    { header: t("ingredient"), accessorKey: "name" as const },
    {
      header: t("actions"),
      accessorKey: "actions" as const,
      cell: (ingredient: Ingredient) => (
        <>
          <div className="flex gap-0">
            <Link href={`/dashboard/ingredient-management/edit-ingredient/${ingredient.id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="size-5 text-primary" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete((ingredient.id).toString())}
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
          <h2 className="text-2xl font-semibold">{t('ingredient.ingredientManagement')}</h2>
          <div className="flex gap-1">
            <Button>
              <Link href='/dashboard/ingredient-management/add-ingredient' className="flex items-center gap-1">
                <PlusCircle className="ingredient-4" />
                {t('ingredient.addIngredient')}
              </Link>
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <HTable data={data} columns={columns} />
        </Col>
      </Row>
      <HDialog
        title={(t('ingredient.deleteIngredient'))}
        description={t('ingredient.confirmDelete')}
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
            <Button onClick={deleteIngredient} className="rounded-xl">
              {t('confirm')}
            </Button>
          </div>
        }
      />
    </>
  );
}
