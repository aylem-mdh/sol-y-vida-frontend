import api from "./api";

export interface ServiceTariff {
  id: number;
  code: string;
  name: string;
  basePrice: number;
  initialSupplement: number;
  finalPrice: number;
  unit: string;
}

export async function getServiceTariffs() {
  const response = await api.get<ServiceTariff[]>("/ServiceTariffs");
  return response.data;
}

// The API only accepts `name` for the "personalized" tariff; omit it for every other tariff.
export interface UpdateServiceTariffRequest {
  name?: string;
  basePrice: number;
  initialSupplement: number;
}

export async function updateServiceTariff(id: number, tariff: UpdateServiceTariffRequest) {
  const response = await api.put<ServiceTariff>(`/ServiceTariffs/${id}`, tariff);
  return response.data;
}
