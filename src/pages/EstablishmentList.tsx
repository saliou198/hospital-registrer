import { useState, useMemo, useRef } from 'react'
import type { Establishment, EstablishmentType, ProgressionStatus } from '@/types'
import { useToast } from '@/hooks/useToast'
import { exportToJSON, importFromJSON } from '@/utils'
import { SearchBar } from '@/components/UI/SearchBar'
import { Pagination } from '@/components/UI/Pagination'
import { Modal } from '@/components/UI/Modal'
import { ToastContainer } from '@/components/UI/Toast'
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

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProgressionStatus | ''>('')
  const [typeFilter, setTypeFilter] = useState<EstablishmentType | ''>('')
  const [regionFilter, setRegionFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEstablishment, setEditingEstablishment] = useState<Establishment | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

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
    addToast(data.id && establishments.find((e) => e.id === data.id) ? 'Établissement modifié avec succès' : 'Établissement ajouté avec succès', 'success')
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
    setSearch('')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Établissements</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Download size={16} />
            Exporter
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Upload size={16} />
            Importer
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Ajouter
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="w-full sm:w-72">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Nom, ville, région, responsable..."
          />
        </div>
        <EstablishmentFilters
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          regionFilter={regionFilter}
          onStatusChange={(v) => { setStatusFilter(v); setCurrentPage(1) }}
          onTypeChange={(v) => { setTypeFilter(v); setCurrentPage(1) }}
          onRegionChange={(v) => { setRegionFilter(v); setCurrentPage(1) }}
          onClear={clearFilters}
        />
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
        {filtered.length !== establishments.length && ` (sur ${establishments.length})`}
      </div>

      <EstablishmentTable
        establishments={paginated}
        onEdit={handleOpenEdit}
        onDelete={(id) => setDeleteConfirmId(id)}
      />

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
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Êtes-vous sûr de vouloir supprimer cet établissement ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteConfirmId(null)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Annuler
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
