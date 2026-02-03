import { memo } from "react";
import { laboratorySchema } from "../../constants/laboratorySchema";
import { usePriorityCount } from "../../hooks/usePriorityCount";
import type { ApiItem } from "../../types";

interface LaboratoryTableProps {
  apiData: ApiItem[];
}

type TableItem = { type: "section" | "test"; data: any };

export const LaboratoryTable = memo(({ apiData }: LaboratoryTableProps) => {
  const countMap = usePriorityCount(apiData);

  // Function to generate column data based on number of columns
  const generateColumnData = (numColumns: number) => {
    const allItems: Array<{ type: "section" | "test"; data: any }> = [];
    laboratorySchema.forEach((section) => {
      allItems.push({ type: "section", data: section.title });
      section.tests.forEach((test) => {
        allItems.push({ type: "test", data: test });
      });
    });

    const itemsPerColumn = Math.ceil(allItems.length / numColumns);
    const columnData: (typeof allItems)[] = [];

    for (let i = 0; i < numColumns; i++) {
      columnData.push(
        allItems.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
      );
    }

    return {
      columnData,
      maxRows: Math.max(...columnData.map((col) => col.length)),
    };
  };

  // Define which priorityDe ranges should have merged test name cells
  const shouldMergeRanges = [
    [17, 18],
    [28, 30],
    [31, 32],
    [48, 49],
    [52, 53],
    [73, 74],
    [75, 76],
    [79, 82],
    [84, 87],
    [127, 132],
    [141, 142],
    [143, 144],
    [145, 146],
    [147, 148],
    [149, 150],
    [151, 152],
    [153, 154],
    [155, 156],
    [201, 202],
    [203, 204],
  ];

  const isInMergeRange = (priorityDe: number): boolean => {
    return shouldMergeRanges.some(
      ([start, end]) => priorityDe >= start && priorityDe <= end
    );
  };

  // Calculate rowSpan for each test name cell
  const getRowSpan = (column: TableItem[], startIndex: number): number => {
    const item = column[startIndex];
    if (item?.type !== "test" || !item.data.name2 || !item.data.name) return 1;
    if (!isInMergeRange(item.data.priorityDe)) return 1;

    let span = 1;
    for (let i = startIndex + 1; i < column.length; i++) {
      const nextItem = column[i];
      if (
        nextItem?.type === "test" &&
        nextItem.data.name === "" &&
        nextItem.data.name2 &&
        isInMergeRange(nextItem.data.priorityDe)
      ) {
        span++;
      } else {
        break;
      }
    }
    return span;
  };

  // Check if this row should skip rendering the test name cell
  const shouldSkipNameCell = (
    column: TableItem[],
    currentIndex: number
  ): boolean => {
    if (currentIndex === 0) return false;
    const currentItem = column[currentIndex];
    if (currentItem?.type !== "test" || !currentItem.data.name2) return false;
    if (currentItem.data.name !== "") return false;
    if (!isInMergeRange(currentItem.data.priorityDe)) return false;

    // Check if previous item is a test with name2
    for (let i = currentIndex - 1; i >= 0; i--) {
      const prevItem = column[i];
      if (prevItem?.type === "test" && prevItem.data.name2) {
        if (
          prevItem.data.name !== "" &&
          isInMergeRange(prevItem.data.priorityDe)
        )
          return true;
        continue;
      }
      break;
    }
    return false;
  };

  // Table rendering function
  const renderTable = (columns: number, className: string) => {
    const { columnData, maxRows } = generateColumnData(columns);

    return (
      <div className={className}>
        <table className="w-full border-collapse text-[10px] border-2 border-black">
          <thead>
            <tr className="bg-[#E8B87D]">
              {Array.from({ length: columns }).map((_, i) => (
                <>
                  <th
                    key={`de-${i}`}
                    className={`border border-black px-0.5 py-0.5 font-semibold ${
                      i === 0 ? "border-l-2" : "border-l-[1.5px]"
                    }`}
                  >
                    DE
                  </th>
                  <th
                    key={`test-${i}`}
                    className="border border-black px-0.5 py-0.5 font-semibold text-center"
                    colSpan={2}
                  >
                    Test
                  </th>
                  <th
                    key={`no-${i}`}
                    className={`border border-black px-0.5 py-0.5 font-semibold ${
                      i === columns - 1 ? "border-r-2" : ""
                    }`}
                  >
                    No.
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columnData.map((column, colIndex) => {
                  const item = column[rowIndex];

                  if (!item) {
                    return (
                      <>
                        <td
                          key={`empty-de-${colIndex}`}
                          className={`border border-black px-0.5 py-0.5 bg-[#FFFACD] ${
                            colIndex === 0 ? "border-l-2" : "border-l-[1.5px]"
                          }`}
                        ></td>
                        <td
                          key={`empty-test-${colIndex}`}
                          className="border border-black px-0.5 py-0.5 bg-[#FFFACD]"
                          colSpan={2}
                        ></td>
                        <td
                          key={`empty-no-${colIndex}`}
                          className={`border border-black px-0.5 py-0.5 bg-white ${
                            colIndex === columns - 1 ? "border-r-2" : ""
                          }`}
                        ></td>
                      </>
                    );
                  }

                  if (item.type === "section") {
                    return (
                      <td
                        key={`section-${colIndex}`}
                        colSpan={4}
                        className={`bg-[#D4A574] text-black font-extrabold text-left py-0.5 px-0.5 border-[1.5px] border-black ${
                          colIndex === 0 ? "border-l-2" : "border-l-[1.5px]"
                        } ${colIndex === columns - 1 ? "border-r-2" : ""}`}
                      >
                        {item.data}
                      </td>
                    );
                  }

                  const test = item.data;
                  const hasSecondary = test.name2 !== undefined;
                  const skipNameCell = shouldSkipNameCell(column, rowIndex);
                  const rowSpan = skipNameCell
                    ? 0
                    : getRowSpan(column, rowIndex);

                  return (
                    <>
                      <td
                        key={`de-${test.priorityDe}`}
                        className={`border border-black px-1 py-0.5 text-left bg-[#FFFACD] ${
                          colIndex === 0 ? "border-l-2" : "border-l-[1.5px]"
                        }`}
                      >
                        {test.priorityDe}
                      </td>
                      {hasSecondary ? (
                        <>
                          {!skipNameCell && (
                            <td
                              key={`name1-${test.priorityDe}`}
                              className="px-0.5 py-0.5 bg-[#FFFACD] border-t border-b border-l border-black align-middle"
                              rowSpan={rowSpan}
                            >
                              {test.name}
                            </td>
                          )}
                          <td
                            key={`name2-${test.priorityDe}`}
                            className="px-0.5 py-0.5 bg-[#FFFACD] border-t border-b border-r border-black border-l"
                          >
                            {test.name2}
                          </td>
                        </>
                      ) : (
                        <td
                          key={`name-${test.priorityDe}`}
                          className="border border-black px-0.5 py-0.5 bg-[#FFFACD]"
                          colSpan={2}
                        >
                          {test.name}
                        </td>
                      )}
                      <td
                        key={`count-${test.priorityDe}`}
                        className={`border border-black px-1 py-0.5 text-left bg-white ${
                          colIndex === columns - 1 ? "border-r-2" : ""
                        }`}
                      >
                        {countMap.get(test.priorityDe) ?? ""}
                      </td>
                    </>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {/* Extra Large screens (1536px+): 7 columns */}
      {renderTable(7, "hidden 2xl:block w-full")}

      {/* Large screens (1024px - 1535px): 4 columns */}
      {renderTable(4, "hidden lg:block 2xl:hidden w-full")}

      {/* Medium screens (768px - 1023px): 2 columns */}
      {renderTable(2, "hidden md:block lg:hidden w-full")}

      {/* Mobile & Small screens (< 768px): 1 column table layout */}
      {renderTable(1, "block md:hidden w-full")}
    </>
  );
});
