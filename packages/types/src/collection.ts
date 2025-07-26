export interface ICollection {
  id: string;
  project: string;
  amount: number;
  collection_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  workspace: string;
}

export interface ICollectionSummary {
  customer_id: string;
  customer_name: string;
  total_project_price: number;
  total_collected_amount: number;
  remaining_amount: number;
}
