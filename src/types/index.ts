export type EstablishmentType =
  | 'hospital'
  | 'clinic'
  | 'cabinet'
  | 'pharmacy'
  | 'laboratory'
  | 'other'

export type ProgressionStatus =
  | 'a_contacter'
  | 'contact_etabli'
  | 'rendez_vous_planifie'
  | 'formation_en_cours'
  | 'plateforme_activée'
  | 'refus'
  | 'a_relancer'

export interface Establishment {
  id: string
  name: string
  type: EstablishmentType
  region: string
  city: string
  address: string
  phone: string
  contactPerson: string
  visitDate: string
  status: ProgressionStatus
  comments: string
  createdAt: string
  updatedAt: string
}

export const ESTABLISHMENT_TYPES: { value: EstablishmentType; label: string }[] = [
  { value: 'hospital', label: 'Hôpital' },
  { value: 'clinic', label: 'Clinique' },
  { value: 'cabinet', label: 'Cabinet médical' },
  { value: 'pharmacy', label: 'Pharmacie' },
  { value: 'laboratory', label: 'Laboratoire' },
  { value: 'other', label: 'Autre' },
]

export const PROGRESSION_STATUSES: { value: ProgressionStatus; label: string; color: string; dot: string }[] = [
  { value: 'a_contacter', label: 'À contacter', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300', dot: 'bg-gray-400' },
  { value: 'contact_etabli', label: 'Contact établi', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300', dot: 'bg-blue-400' },
  { value: 'rendez_vous_planifie', label: 'Rendez-vous planifié', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300', dot: 'bg-amber-400' },
  { value: 'formation_en_cours', label: 'Formation en cours', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300', dot: 'bg-blue-400' },
  { value: 'plateforme_activée', label: 'Plateforme activée', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300', dot: 'bg-emerald-400' },
  { value: 'refus', label: 'Refus', color: 'bg-red-50 text-red-600 dark:bg-red-900/50 dark:text-red-300', dot: 'bg-red-400' },
  { value: 'a_relancer', label: 'À relancer', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300', dot: 'bg-amber-500' },
]

export const REGIONS = [
  'Dakar',
  'Diourbel',
  'Fatick',
  'Kaffrine',
  'Kaolack',
  'Kédougou',
  'Kolda',
  'Louga',
  'Matam',
  'Saint-Louis',
  'Sédhiou',
  'Tambacounda',
  'Thiès',
  'Ziguinchor',
]

export type SortField = 'name' | 'type' | 'region' | 'city' | 'status' | 'visitDate'
export type SortDirection = 'asc' | 'desc'
