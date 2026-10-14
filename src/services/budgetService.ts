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
  lines?: BudgetLine[];
}

export interface BudgetLine {
  id: number;
  serviceTariffId: number;
  serviceName: string;
  unit: string;
  basePrice: number;
  initialSupplement: number;
  unitPrice: number;
  quantity: number;
  daysPerMonth: number;
  monthlyTotal: number;
  notes?: string;
}

export interface CreateBudgetPayload {
  clientId: number;
  hours?: number;
  hourlyRate?: number;
  vatPercent: number;
  description?: string;
  directDebitReceiptEnabled: boolean;
  directDebitIbanLast4?: string;
  lines?: CreateBudgetLinePayload[];
}

export interface CreateBudgetLinePayload {
  serviceTariffId: number;
  quantity: number;
  daysPerMonth: number;
  notes?: string;
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

export async function downloadBudgetPdf(id: number) {
  const response = await api.get<Blob>(`/Budgets/${id}/pdf`, { responseType: "blob" });
  const contentType = String(response.headers["content-type"] ?? "");
  if (!contentType.toLowerCase().startsWith("application/pdf")) {
    throw new Error("Unexpected PDF response type.");
  }
  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = `presupuesto-${id}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
