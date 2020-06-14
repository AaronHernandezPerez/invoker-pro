export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Abilities {
  abilities: Array<{ name: string, combination: number, icon: string }>;
}