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
  isRejected: boolean;
  acceptanceDate?: string | null;
  agreementId?: number | null;
  serviceStartDate?: string | null;
  serviceEndDate?: string | null;
  serviceType?: string | null;
  serviceDays?: string | null;
  serviceStartTime?: string | null;
  serviceEndTime?: string | null;
  serviceAddress?: string | null;
  serviceCity?: string | null;
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
  serviceStartDate?: string;
  serviceEndDate?: string;
  serviceType?: string;
  serviceDays?: string;
  serviceStartTime?: string;
  serviceEndTime?: string;
  serviceAddress?: string;
  serviceCity?: string;
}

export interface CreateBudgetAgreementPayload {
  budgetIds: number[];
  paymentMethod?: string;
  firstPaymentDate?: string;
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

export type BudgetStatus = "pending" | "accepted" | "rejected";

export async function updateBudgetStatus(id: number, status: BudgetStatus, acceptanceDate?: string) {
  await api.put(`/Budgets/${id}/status`, {
    status,
    acceptanceDate: status === "accepted" && acceptanceDate ? acceptanceDate : null,
  });
}

export async function createBudgetAgreement(payload: CreateBudgetAgreementPayload) {
  const response = await api.post<{ id: number }>("/Budgets/agreements", payload);
  return response.data;
}

export async function deleteBudget(id: number) {
  await api.delete(`/Budgets/${id}`);
}

export async function downloadBudgetPdf(id: number) {
  await downloadPdf(`/Budgets/${id}/pdf`, `presupuesto-${id}.pdf`);
}

export async function downloadAcceptancePdf(id: number) {
  await downloadPdf(`/Budgets/${id}/acceptance-pdf`, `aceptacion-presupuesto-${id}.pdf`);
}

async function downloadPdf(path: string, filename: string) {
  const response = await api.get<Blob>(path, { responseType: "blob" });
  const contentType = String(response.headers["content-type"] ?? "");
  if (!contentType.toLowerCase().startsWith("application/pdf")) {
    throw new Error("Unexpected PDF response type.");
  }
  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
