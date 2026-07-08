import { useState, useEffect, type FormEvent } from 'react'
import type { Establishment, EstablishmentType, ProgressionStatus } from '@/types'
import { ESTABLISHMENT_TYPES, PROGRESSION_STATUSES, REGIONS } from '@/types'
import { generateId } from '@/utils'

interface EstablishmentFormProps {
  establishment?: Establishment | null
  onSave: (data: Establishment) => void
  onCancel: () => void
}

export function EstablishmentForm({ establishment, onSave, onCancel }: EstablishmentFormProps) {
  const [form, setForm] = useState({
    name: '',
    type: 'hospital' as EstablishmentType,
    region: '',
    city: '',
    address: '',
    phone: '',
    contactPerson: '',
    visitDate: '',
    status: 'a_contacter' as ProgressionStatus,
    comments: '',
  })

  useEffect(() => {
    if (establishment) {
      setForm({
        name: establishment.name,
        type: establishment.type,
        region: establishment.region,
        city: establishment.city,
        address: establishment.address,
        phone: establishment.phone,
        contactPerson: establishment.contactPerson,
        visitDate: establishment.visitDate,
        status: establishment.status,
        comments: establishment.comments,
      })
    }
  }, [establishment])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const now = new Date().toISOString()
    const data: Establishment = {
      id: establishment?.id ?? generateId(),
      ...form,
      createdAt: establishment?.createdAt ?? now,
      updatedAt: now,
    }
    onSave(data)
  }

  const fields: { name: keyof typeof form; label: string; type: string; required?: boolean }[] = [
    { name: 'name', label: 'Nom de l\'établissement', type: 'text', required: true },
    { name: 'city', label: 'Ville', type: 'text', required: true },
    { name: 'address', label: 'Adresse', type: 'text' },
    { name: 'phone', label: 'Téléphone', type: 'tel' },
    { name: 'contactPerson', label: 'Responsable rencontré', type: 'text' },
    { name: 'visitDate', label: 'Date de visite', type: 'date' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.name === 'name' || f.name === 'address' ? 'sm:col-span-2' : ''}>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {f.label}
            </label>
            <input
              type={f.type}
              value={form[f.name] as string}
              onChange={(e) => setForm((prev) => ({ ...prev, [f.name]: e.target.value }))}
              required={f.required ?? false}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        ))}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as EstablishmentType }))}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {ESTABLISHMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Région</label>
          <select
            value={form.region}
            onChange={(e) => setForm((prev) => ({ ...prev, region: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Sélectionner une région</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Statut de progression</label>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ProgressionStatus }))}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {PROGRESSION_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Commentaires</label>
          <textarea
            value={form.comments}
            onChange={(e) => setForm((prev) => ({ ...prev, comments: e.target.value }))}
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {establishment ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  )
}
