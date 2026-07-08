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

export const PROGRESSION_STATUSES: { value: ProgressionStatus; label: string; color: string }[] = [
  { value: 'a_contacter', label: 'À contacter', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200' },
  { value: 'contact_etabli', label: 'Contact établi', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' },
  { value: 'rendez_vous_planifie', label: 'Rendez-vous planifié', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200' },
  { value: 'formation_en_cours', label: 'Formation en cours', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' },
  { value: 'plateforme_activée', label: 'Plateforme activée', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' },
  { value: 'refus', label: 'Refus', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' },
  { value: 'a_relancer', label: 'À relancer', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' },
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
