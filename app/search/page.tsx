'use client'

import { useSearchParams } from 'next/navigation'
import Fetchsearchblogs from '@/components/search/fetchsearchblogs'
import { Searchbox } from "@/components/search/searchbox";

export default function SearchBar() {
  const searchParams = useSearchParams()
  const types = searchParams.getAll('types')
  const term = searchParams.get('term')

  if (types.length === 0 || !term) {
    return (
      <main>
        <Searchbox />
        <div className="mt-6">
          <p>Bitte gib einen Suchbegriff ein.</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Searchbox />
      <div className="mt-6">
        <Fetchsearchblogs items={types} term={term} />
      </div>
    </main>
  )
}
