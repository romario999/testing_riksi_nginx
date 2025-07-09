'use client';

import { useState, useRef, useEffect } from "react";

const CategoryDescription = ({ description, page }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      const isContentOverflowing = descriptionRef.current.scrollHeight > 220;
      setIsOverflowing(isContentOverflowing);
    }
  }, [description]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      {page === 1 && description && (
        <div className={`${description && description !== "<p><br></p>" ? "block" : "hidden"}`}>
          <div
            ref={descriptionRef}
            className="mt-24 p-3 ql-editor [&>ul]:pl-6 [&>ul]:list-disc [&>ol]:pl-6 [&>ol]:list-decimal [&>li]:mb-2"
            style={{
              maxHeight: isExpanded ? `${descriptionRef.current?.scrollHeight}px` : "220px",
              overflow: "hidden",
              transition: "max-height 0.5s ease-out", // плавна анімація відкриття/закриття
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {isOverflowing && (
            <button
              onClick={toggleExpand}
              style={{
                display: "block",
                marginTop: "10px",
                color: "black",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              {isExpanded ? (
                <>
                  ↑ Згорнути
                </>
              ) : (
                <>
                  ↓ Розгорнути
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDescription;
