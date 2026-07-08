import type { Establishment, ProgressionStatus } from '@/types'

export function generateId(): string {
  return crypto.randomUUID()
}

export function getGoogleMapsUrl(establishment: Establishment): string {
  const query = encodeURIComponent(`${establishment.name} ${establishment.city} ${establishment.address}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export function exportToJSON(data: Establishment[]): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `etablissements-sante-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importFromJSON(file: File): Promise<Establishment[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (!Array.isArray(data)) throw new Error('Format invalide')
        resolve(data as Establishment[])
      } catch (err) {
        reject(new Error('Fichier JSON invalide'))
      }
    }
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'))
    reader.readAsText(file)
  })
}

export function getStatusLabel(status: ProgressionStatus): string {
  const labels: Record<ProgressionStatus, string> = {
    a_contacter: 'À contacter',
    contact_etabli: 'Contact établi',
    rendez_vous_planifie: 'Rendez-vous planifié',
    formation_en_cours: 'Formation en cours',
    plateforme_activée: 'Plateforme activée',
    refus: 'Refus',
    a_relancer: 'À relancer',
  }
  return labels[status]
}

export function getTypeLabel(type: Establishment['type']): string {
  const labels: Record<Establishment['type'], string> = {
    hospital: 'Hôpital',
    clinic: 'Clinique',
    cabinet: 'Cabinet médical',
    pharmacy: 'Pharmacie',
    laboratory: 'Laboratoire',
    other: 'Autre',
  }
  return labels[type]
}
