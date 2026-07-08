import { useState, useMemo, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import type { Establishment, EstablishmentType, ProgressionStatus } from '@/types'
import { useToast } from '@/hooks/useToast'
import { exportToJSON, importFromJSON } from '@/utils'
import { Pagination } from '@/components/UI/Pagination'
import { Modal } from '@/components/UI/Modal'
import { ToastContainer } from '@/components/UI/Toast'
import { EmptyState } from '@/components/UI/EmptyState'
import { TableSkeleton } from '@/components/UI/Skeleton'
import { EstablishmentTable } from '@/components/Establishment/EstablishmentTable'
import { EstablishmentForm } from '@/components/Establishment/EstablishmentForm'
import { EstablishmentFilters } from '@/components/Establishment/EstablishmentFilters'
import { Plus, Download, Upload } from 'lucide-react'

interface EstablishmentListProps {
  establishments: Establishment[]
  onSave: (data: Establishment) => void
  onDelete: (id: string) => void
}

const ITEMS_PER_PAGE = 10

export function EstablishmentList({ establishments, onSave, onDelete }: EstablishmentListProps) {
  const { toasts, addToast, removeToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  const search = searchParams.get('q') || ''
  const [statusFilter, setStatusFilter] = useState<ProgressionStatus | ''>('')
  const [typeFilter, setTypeFilter] = useState<EstablishmentType | ''>('')
  const [regionFilter, setRegionFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEstablishment, setEditingEstablishment] = useState<Establishment | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return establishments.filter((e) => {
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.region.toLowerCase().includes(q) ||
        e.contactPerson.toLowerCase().includes(q)
      const matchesStatus = !statusFilter || e.status === statusFilter
      const matchesType = !typeFilter || e.type === typeFilter
      const matchesRegion = !regionFilter || e.region === regionFilter
      return matchesSearch && matchesStatus && matchesType && matchesRegion
    })
  }, [establishments, search, statusFilter, typeFilter, regionFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  useEffect(() => { setCurrentPage(1) }, [search, statusFilter, typeFilter, regionFilter])

  const handleOpenAdd = () => {
    setEditingEstablishment(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (est: Establishment) => {
    setEditingEstablishment(est)
    setIsModalOpen(true)
  }

  const handleSave = (data: Establishment) => {
    onSave(data)
    setIsModalOpen(false)
    setEditingEstablishment(null)
    addToast(
      establishments.find((e) => e.id === data.id)
        ? 'Établissement modifié'
        : 'Établissement ajouté',
      'success',
    )
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      onDelete(deleteConfirmId)
      setDeleteConfirmId(null)
      addToast('Établissement supprimé', 'success')
    }
  }

  const handleExport = () => {
    exportToJSON(establishments)
    addToast('Données exportées', 'success')
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = await importFromJSON(file)
      data.forEach((est) => onSave(est))
      addToast(`${data.length} établissement(s) importé(s)`, 'success')
    } catch {
      addToast('Erreur lors de l\'import', 'error')
    }
    e.target.value = ''
  }

  const clearFilters = () => {
    setStatusFilter('')
    setTypeFilter('')
    setRegionFilter('')
    setSearchParams({})
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Établissements</h1>
          <p className="mt-0.5 text-sm text-[var(--color-text-tertiary)]">
            {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            {filtered.length !== establishments.length && ` (sur ${establishments.length})`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            <Download size={13} />
            Exporter
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            <Upload size={13} />
            Importer
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          <button
            onClick={handleOpenAdd}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-[var(--color-text)] px-3 text-xs font-medium text-[var(--color-bg)] hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            Ajouter
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearchParams(e.target.value ? { q: e.target.value } : {})
            }}
            placeholder="Rechercher par nom, ville, région..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-transparent py-1.5 pl-9 pr-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] outline-none transition-colors focus:border-emerald-500"
          />
        </div>
        <EstablishmentFilters
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          regionFilter={regionFilter}
          onStatusChange={(v) => setStatusFilter(v)}
          onTypeChange={(v) => setTypeFilter(v)}
          onRegionChange={(v) => setRegionFilter(v)}
          onClear={clearFilters}
        />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : paginated.length === 0 ? (
        <EmptyState
          action={
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-text)] px-3 py-1.5 text-xs font-medium text-[var(--color-bg)] hover:opacity-90 transition-opacity"
            >
              <Plus size={13} />
              Ajouter
            </button>
          }
        />
      ) : (
        <EstablishmentTable
          establishments={paginated}
          onEdit={handleOpenEdit}
          onDelete={(id) => setDeleteConfirmId(id)}
        />
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingEstablishment(null) }}
        title={editingEstablishment ? 'Modifier l\'établissement' : 'Ajouter un établissement'}
      >
        <EstablishmentForm
          establishment={editingEstablishment}
          onSave={handleSave}
          onCancel={() => { setIsModalOpen(false); setEditingEstablishment(null) }}
        />
      </Modal>

      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirmer la suppression"
      >
        <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
          Êtes-vous sûr de vouloir supprimer cet établissement ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteConfirmId(null)}
            className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
