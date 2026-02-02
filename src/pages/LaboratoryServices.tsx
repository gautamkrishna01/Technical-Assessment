import { LaboratoryTable } from "../components/LaboratoryTable";
import apiData from "../../data.json";
import type { ApiItem } from "../types";

export default function LaboratoryServices() {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-center font-bold text-base py-2 bg-white text-black border-b border-gray-300">
        प्रयोगशाला सेवा (Laboratory Services)
      </h1>
      <div className="p-2">
        <LaboratoryTable apiData={apiData as ApiItem[]} />
      </div>
    </div>
  );
}
