import api from "./api";

export interface Budget {
  id: number;
  clientId: number;
  cliente: string;
  hours: number;
  hourlyRate: number;
  vatPercent: number;
  subtotal: number;
  vatAmount: number;
  total: number;
  monthlyEstimate: number;
  description?: string;
  isApproved: boolean;
  directDebitReceiptEnabled: boolean;
  directDebitIbanLast4?: string;
  createdAt: string;
}

export interface CreateBudgetPayload {
  clientId: number;
  hours: number;
  hourlyRate: number;
  vatPercent: number;
  description?: string;
  directDebitReceiptEnabled: boolean;
  directDebitIbanLast4?: string;
}

export async function getBudgets() {
  const response = await api.get<Budget[]>("/Budgets");
  return response.data;
}

export async function createBudget(payload: CreateBudgetPayload) {
  const response = await api.post<Budget>("/Budgets", payload);
  return response.data;
}

export async function approveBudget(id: number) {
  await api.put(`/Budgets/${id}/approve`);
}
