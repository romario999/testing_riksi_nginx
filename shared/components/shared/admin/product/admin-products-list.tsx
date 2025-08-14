'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@prisma/client';
import { PaginationComponent } from '../../pagination-component';
import { FaSpinner, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa6';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteProduct } from '@/app/actions';
import { Button } from '@/shared/components/ui';
import { AdminImportModal } from './admin-import-modal';
import { AdminExportModal } from './admin-export-modal';

interface AdminProductsListProps {
  initialProducts: Product[];
  initialTotal: number;
  totalPages: number;
  currentPage: number;
}

export const AdminProductsList: React.FC<AdminProductsListProps> = ({
  initialProducts,
  initialTotal,
  totalPages,
  currentPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalExportOpen, setModalExportOpen] = React.useState(false);
  const [importMessage, setImportMessage] = React.useState("");

  const [search, setSearch] = React.useState(searchParams.get('search') || '');
  const sortBy = searchParams.get('sortBy') || '';
  const [loading, setLoading] = React.useState(false);

  const onImportSuccess = (msg: string) => {
    setImportMessage(msg);
    setModalOpen(false);
    // можна зробити router.refresh() при потребі
  };

  const handleSortByPrice = () => {
    const query = new URLSearchParams(searchParams.toString());
    if (sortBy === 'asc') {
      query.set('sortBy', 'desc');
    } else {
      query.set('sortBy', 'asc');
    }
    query.set('page', '1'); // повернутись на першу сторінку
    router.push(`?${query.toString()}`, { scroll: false });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(searchParams.toString());
    query.set('search', search);
    query.set('page', '1'); // завжди починати з першої сторінки при пошуку
    router.push(`?${query.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    const query = new URLSearchParams(searchParams.toString());
    query.set('page', newPage.toString());
    router.push(`?${query.toString()}`, { scroll: false });
  };

  const handleDeleteProduct = async (id: number, name: string) => {
    const confirmed = window.confirm(`Ви дійсно хочете видалити товар ${name}?`);
    if (!confirmed) return;
    try {
      await deleteProduct(id);
      router.refresh(); // перезавантажити сторінку
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen relative">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Список товарів</h1>

      <form onSubmit={handleSearchSubmit} className="mb-4 flex">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук товарів..."
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          type="submit"
          disabled={loading || !search}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Пошук
        </button>
      </form>

      <div className="my-6 flex justify-end gap-4 items-center">
        <Button onClick={() => setModalOpen(true)} variant="outline">
          Імпортувати
        </Button>

        {importMessage && (
          <p className={`text-sm ${importMessage.toLowerCase().includes('помилка') ? 'text-red-600' : 'text-green-600'} max-w-xs`}>
            {importMessage}
          </p>
        )}

        <Button variant={'outline'} onClick={() => setModalExportOpen(true)}>Експорт</Button>

        <Link href="products/add-product">
          <Button>Додати товар</Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md relative">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
            <FaSpinner className="animate-spin" size={32} />
          </div>
        )}

        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Зображення</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Назва</th>
              <th
                className="py-3 px-6 text-left text-sm font-medium text-gray-900 cursor-pointer flex items-center gap-2"
                onClick={handleSortByPrice}
              >
                Ціна
                {sortBy === 'asc' ? <FaSortUp className="text-blue-500" /> :
                  sortBy === 'desc' ? <FaSortDown className="text-blue-500" /> :
                    <FaSort />}
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900">Кількість</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody>
            {initialProducts.length > 0 ? (
              initialProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-3 px-6 text-sm">
                    <img
                      src={product.imageUrl[0] || '/placeholder.jpg'}
                      alt={product.name}
                      className="w-10 h-16 rounded"
                    />
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900">{product.name}</td>
                  <td className="py-3 px-6 text-sm text-gray-900">{product.price}₴</td>
                  <td className={`py-3 px-6 text-sm ${product.stock ? 'text-green-500' : 'text-red-500'}`}>
                    {product.stock ? 'В наявності' : 'Немає в наявності'}
                  </td>
                  <td className="py-3 px-6 text-sm">
                    <div className="flex gap-3">
                      <Link href={`/admin/products/${product.id}`}>
                        <Pencil size={20} />
                      </Link>
                      <Trash2 size={20} className="cursor-pointer" onClick={() => handleDeleteProduct(product.id, product.name)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-3 px-6 text-center text-gray-500">
                  Немає товарів для відображення
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-10">
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      <AdminImportModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onImportSuccess={onImportSuccess} />
      <AdminExportModal isOpen={modalExportOpen} onClose={() => setModalExportOpen(false)} />
    </div>
  );
};
