import { memo } from "react";
import { TableRow } from "./TableRow";
import type { Section } from "../../types";

interface TableSectionProps {
  section: Section;
  countMap: Map<number, string>;
}

export const TableSection = memo(({ section, countMap }: TableSectionProps) => (
  <table className="w-full border-collapse text-[10px]">
    <thead>
      <tr>
        <th
          colSpan={4}
          className="bg-[#D4A574] text-black font-bold text-center py-1 border border-black"
        >
          {section.title}
        </th>
      </tr>
      <tr className="bg-[#D4A574]">
        <th className="border border-black px-1 py-0.5 font-semibold w-8">
          DE
        </th>
        <th
          className="border border-black px-1 py-0.5 font-semibold text-left"
          colSpan={2}
        >
          Test
        </th>
        <th className="border border-black px-1 py-0.5 font-semibold w-8">
          No.
        </th>
      </tr>
    </thead>
    <tbody>
      {section.tests.map((test) => (
        <TableRow
          key={test.priorityDe}
          priorityDe={test.priorityDe}
          name={test.name}
          name2={test.name2}
          count={countMap.get(test.priorityDe)}
        />
      ))}
    </tbody>
  </table>
));
