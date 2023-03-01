import { GoogleSpreadsheetRow } from 'google-spreadsheet'

// eslint-disable-next-line n/no-missing-import
import { GoogleSpreadsheetValue } from '../models/google_spreadsheet_value'
// eslint-disable-next-line n/no-missing-import
import { ThreeThings } from '../models/three_things'
// eslint-disable-next-line n/no-missing-import
import { generateUniqueId } from '../utils/id_generator'

// eslint-disable-next-line n/no-missing-import
import { getTable } from './base'

const getDb = () => getTable(0)

const dbToThreeThings = (item: GoogleSpreadsheetRow): ThreeThings => ({
  identifier: item.identifier,
  first: item.first,
  second: item.second,
  third: item.third,
  // eslint-disable-next-line n/no-unsupported-features/es-syntax
  favorites: item.favorites ?? 0,
})

export const getRows = async (): Promise<ThreeThings[]> => {
  const sheet = await getDb()
  const rows = await sheet.getRows()
  return rows.map(dbToThreeThings)
}

export const addRow = async (data: ThreeThings) => {
  const dataWithId = {
    identifier: generateUniqueId(),
    favorites: data.favorites ? data.favorites : 0,
    ...data,
  }
  const sheet = await getDb()
  return await sheet.addRow(dataWithId as GoogleSpreadsheetValue)
}

export const deleteById = async (id: string) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  const row = rows.find((item) => dbToThreeThings(item).identifier === id.toString().toLowerCase())
  if (!row) {
    throw new Error('row not found')
  }
  await row.delete()
}

export const updateById = async (id: string, updateFn: (input: GoogleSpreadsheetRow) => GoogleSpreadsheetRow) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  const row = rows.find((item) => dbToThreeThings(item).identifier === id.toString().toLowerCase())
  if (!row) {
    throw new Error('row not found')
  }
  await updateFn(row).save()
}
