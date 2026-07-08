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
    onSave({
      id: establishment?.id ?? generateId(),
      ...form,
      createdAt: establishment?.createdAt ?? now,
      updatedAt: now,
    })
  }

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const inputClass = "peer w-full rounded-lg border border-[var(--color-border)] bg-transparent px-3 pt-5 pb-1.5 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-emerald-500"
  const labelClass = "absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-tertiary)] transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-emerald-500 peer-[.filled]:top-2 peer-[.filled]:text-[10px]"
  const selectClass = "peer w-full rounded-lg border border-[var(--color-border)] bg-transparent px-3 pt-5 pb-1.5 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-emerald-500 appearance-none cursor-pointer"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative sm:col-span-2">
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
            className={`${inputClass} ${form.name ? 'filled' : ''}`}
            placeholder=" "
          />
          <label htmlFor="name" className={labelClass}>Nom de l'établissement</label>
        </div>

        <div className="relative">
          <select
            id="type"
            value={form.type}
            onChange={(e) => update('type', e.target.value)}
            className={selectClass}
          >
            {ESTABLISHMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <label htmlFor="type" className={labelClass}>Type</label>
        </div>

        <div className="relative">
          <select
            id="region"
            value={form.region}
            onChange={(e) => update('region', e.target.value)}
            className={selectClass}
          >
            <option value="" disabled></option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <label htmlFor="region" className={labelClass}>Région</label>
        </div>

        <div className="relative">
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
            required
            className={`${inputClass} ${form.city ? 'filled' : ''}`}
            placeholder=" "
          />
          <label htmlFor="city" className={labelClass}>Ville</label>
        </div>

        <div className="relative">
          <input
            id="address"
            type="text"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            className={`${inputClass} ${form.address ? 'filled' : ''}`}
            placeholder=" "
          />
          <label htmlFor="address" className={labelClass}>Adresse</label>
        </div>

        <div className="relative">
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={`${inputClass} ${form.phone ? 'filled' : ''}`}
            placeholder=" "
          />
          <label htmlFor="phone" className={labelClass}>Téléphone</label>
        </div>

        <div className="relative">
          <input
            id="contactPerson"
            type="text"
            value={form.contactPerson}
            onChange={(e) => update('contactPerson', e.target.value)}
            className={`${inputClass} ${form.contactPerson ? 'filled' : ''}`}
            placeholder=" "
          />
          <label htmlFor="contactPerson" className={labelClass}>Responsable rencontré</label>
        </div>

        <div className="relative">
          <input
            id="visitDate"
            type="date"
            value={form.visitDate}
            onChange={(e) => update('visitDate', e.target.value)}
            className={`${inputClass} ${form.visitDate ? 'filled' : ''}`}
            placeholder=" "
          />
          <label htmlFor="visitDate" className={labelClass}>Date de visite</label>
        </div>

        <div className="relative sm:col-span-2">
          <select
            id="status"
            value={form.status}
            onChange={(e) => update('status', e.target.value)}
            className={selectClass}
          >
            {PROGRESSION_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <label htmlFor="status" className={labelClass}>Statut de progression</label>
        </div>

        <div className="relative sm:col-span-2">
          <textarea
            id="comments"
            value={form.comments}
            onChange={(e) => update('comments', e.target.value)}
            rows={3}
            className={`${inputClass} resize-none ${form.comments ? 'filled' : ''}`}
            placeholder=" "
          />
          <label htmlFor="comments" className={labelClass}>Commentaires</label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded-lg bg-[var(--color-text)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] hover:opacity-90 transition-opacity"
        >
          {establishment ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  )
}
