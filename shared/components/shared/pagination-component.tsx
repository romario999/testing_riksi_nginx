'use client';
interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, onPageChange }) => {

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const generatePageNumbers = () => {
        const range = 2; // кількість сторінок, що відображаються з кожного боку поточної
        let pages: (number | string)[] = [];

        // Завжди додаємо першу сторінку
        if (currentPage > 1) {
            pages.push(1);
        }

        // Додаємо "..." якщо є пропуск між першою сторінкою і початком діапазону
        if (currentPage > range + 2) {
            pages.push('...');
        }

        // Додаємо сторінки перед поточною
        for (let i = Math.max(2, currentPage - range); i < currentPage; i++) {
            pages.push(i);
        }

        // Поточна сторінка
        pages.push(currentPage);

        // Додаємо сторінки після поточної
        for (let i = currentPage + 1; i <= Math.min(totalPages - 1, currentPage + range); i++) {
            pages.push(i);
        }

        // Додаємо "..." якщо є пропуск між кінцем діапазону і останньою сторінкою
        if (currentPage + range < totalPages - 1) {
            pages.push('...');
        }

        // Завжди додаємо останню сторінку
        if (currentPage < totalPages) {
            pages.push(totalPages);
        }

        return pages;
    };

    const renderPageNumbers = (pageNumbers: (number | string)[]) => {
  return pageNumbers.map((page, index) => (
    <button
      key={index}
      onClick={() => {
        if (typeof page === 'number') {
          onPageChange(page);
        }
      }}
      className={`
        px-2 py-1 text-base sm:px-4 sm:py-2 sm:text-lg font-semibold
        ${page === currentPage
          ? 'text-black border-black border-b-2 font-bold'
          : 'text-black hover:text-gray-500'}
        transition-all duration-200
      `}
    >
      {page}
    </button>
  ));
};


    const pageNumbers = generatePageNumbers();

    return (
       <div className="flex items-center justify-center gap-3 mt-16">
            <button 
                onClick={handlePrev} 
                disabled={currentPage === 1} 
                className="flex items-center justify-center px-1.5 py-0.5 text-sm sm:px-3 sm:py-1 sm:text-sm text-black hover:text-gray-400 disabled:text-gray-400 transition-all duration-300"
            >
                ← Назад
            </button>

            {renderPageNumbers(pageNumbers)}

            <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages} 
                className="flex items-center justify-center px-1.5 py-0.5 text-sm sm:px-3 sm:py-1 sm:text-sm text-black hover:text-gray-400 disabled:text-gray-400 transition-all duration-300"
            >
                Вперед →
            </button>
        </div>

    );
};
