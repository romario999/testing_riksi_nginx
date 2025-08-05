import { Button } from "@/shared/components/ui";
import { useCategories } from "@/shared/hooks";
import React from "react";
import { FaUpload } from "react-icons/fa";
import { FilterCheckbox } from "../../filter-checkbox";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: (message: string) => void;
}

export const AdminExportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const categories = useCategories();
  const [selectedCategories, setSelectedCategories] = React.useState<Set<string>>(new Set());
  const [isExporting, setIsExporting] = React.useState(false);

  const allCategoryIds = React.useMemo(
    () => new Set(categories?.categories.map((cat) => String(cat.id)) || []),
    [categories]
  );

  const isAllSelected = selectedCategories.size > 0 && selectedCategories.size === allCategoryIds.size;

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleAllChange = () => {
    if (isAllSelected) {
      setSelectedCategories(new Set());
    } else {
      setSelectedCategories(new Set(allCategoryIds));
    }
  };

  const handleExport = async () => {
    if (selectedCategories.size === 0) return;

    setIsExporting(true);

    const categoryParams = isAllSelected
      ? "categoryIds=all"
      : Array.from(selectedCategories)
          .map((id) => `categoryIds=${encodeURIComponent(id)}`)
          .join("&");

    const url = `/api/export-products?${categoryParams}`;

    try {
      const res = await fetch(url, {
        headers: {
          Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      if (!res.ok) throw new Error("Помилка при експорті файлу");

      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `products-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);

      if (onImportSuccess) {
        const selectedNames = categories?.categories
          .filter((category) => selectedCategories.has(String(category.id)))
          .map((category) => category.name);
        onImportSuccess(`Експорт категорій: ${selectedNames?.join(", ")}`);
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Не вдалося експортувати файл.");
    } finally {
      setIsExporting(false);
    }
  };

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="import-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Експорт товарів</h2>

        <div>
          <span className="block mb-2">Оберіть категорії</span>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto border p-2 rounded-md">
            <FilterCheckbox
              key="all"
              value="all"
              text="Всі товари"
              checked={isAllSelected}
              onCheckedChange={handleAllChange}
            />
            {categories?.categories.map((category) => (
              <FilterCheckbox
                key={category.id}
                value={String(category.id)}
                text={category.name}
                checked={selectedCategories.has(String(category.id))}
                onCheckedChange={() => handleCategoryChange(String(category.id))}
              />
            ))}
          </div>

          {selectedCategories.size > 0 && (
            <div className="mt-4 text-sm text-gray-700">
              <strong>Вибрані:</strong>{" "}
              {categories?.categories
                .filter((cat) => selectedCategories.has(String(cat.id)))
                .map((cat) => cat.name)
                .join(", ")}
            </div>
          )}

          <Button
            className="flex items-center gap-2 mt-6"
            onClick={handleExport}
            disabled={selectedCategories.size === 0 || isExporting}
          >
            <FaUpload />
            {isExporting ? "Експортується..." : "Експортувати"}
          </Button>
        </div>

        <button
          aria-label="Закрити"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
