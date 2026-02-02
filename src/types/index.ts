export interface TestItem {
  priorityDe: number;
  name: string;
  name2?: string;
}

export interface Section {
  title: string;
  tests: TestItem[];
}

export interface ApiItem {
  ptcount: string;
  priorityDe: number;
}
