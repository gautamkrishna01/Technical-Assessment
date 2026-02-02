import { memo } from "react";

interface Props {
  priorityDe: number;
  name: string;
  name2?: string;
  count?: string;
}

export const TableRow = memo(({ priorityDe, name, name2, count }: Props) => (
  <tr className="bg-[#FFEFD5]">
    <td className="border border-black px-0.5 py-0.5 text-center w-8">
      {priorityDe}
    </td>
    <td className="border border-black px-0.5 py-0.5">{name}</td>
    <td className="border border-black px-0.5 py-0.5">
      {name2 !== undefined ? name2 : ""}
    </td>
    <td className="border border-black px-0.5 py-0.5 text-center w-8">
      {count ?? ""}
    </td>
  </tr>
));
