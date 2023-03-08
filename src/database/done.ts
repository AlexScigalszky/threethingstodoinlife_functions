import { GoogleSpreadsheetRow } from 'google-spreadsheet'

// eslint-disable-next-line n/no-missing-import
import { Done } from '../models/done'
// eslint-disable-next-line n/no-missing-import
import { GoogleSpreadsheetValue } from '../models/google_spreadsheet_value'
// eslint-disable-next-line n/no-missing-import
import { generateUniqueId } from '../utils/id_generator'

// eslint-disable-next-line n/no-missing-import
import { getTable } from './base'

const getDb = () => getTable(1)

export const dbToDone = (item: GoogleSpreadsheetRow): Done => ({
  identifier: item.identifier,
  userIdentifier: item.userIdentifier,
  tttIdentifier: item.tttIdentifier,
  // eslint-disable-next-line unicorn/no-nested-ternary
  doneFirst: item.doneFirst === 'TRUE' ? true : item.doneFirst === 'FALSE' ? false : null,
  // eslint-disable-next-line unicorn/no-nested-ternary
  doneSecond: item.doneSecond === 'TRUE' ? true : item.doneSecond === 'FALSE' ? false : null,
  // eslint-disable-next-line unicorn/no-nested-ternary
  doneThird: item.doneThird === 'TRUE' ? true : item.doneThird === 'FALSE' ? false : null,
  date: item.date,
})

export const getRows = async (): Promise<Done[]> => {
  const sheet = await getDb()
  const rows = await sheet.getRows()
  return rows.map(dbToDone)
}

export const addRow = async (data: Done) => {
  const dataWithId = {
    ...data,
    date: new Date().toUTCString(),
    identifier: generateUniqueId(),
  }
  const sheet = await getDb()
  return await sheet.addRow(dataWithId as GoogleSpreadsheetValue)
}

export const deleteById = async (id: string) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  const row = rows.find((item) => dbToDone(item).identifier === id.toString().toLowerCase())
  if (!row) {
    throw new Error('row not found')
  }
  await row.delete()
}

export const updateById = async (id: string, updateFn: (input: GoogleSpreadsheetRow) => GoogleSpreadsheetRow) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  const row = rows.find((item) => dbToDone(item).identifier === id.toString().toLowerCase())
  if (!row) {
    throw new Error('row not found')
  }
  await updateFn(row).save()
}

export const updateByTttIdentifierUserIdentifier = async (
  tttIdentifier: string,
  userIdentifier: string,
  updateFn: (input: GoogleSpreadsheetRow, doneItem: Done) => GoogleSpreadsheetRow,
) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  const row = rows.find(
    (item) =>
      dbToDone(item).userIdentifier === userIdentifier.toString().toLowerCase() &&
      dbToDone(item).tttIdentifier === tttIdentifier.toString().toLowerCase(),
  )
  if (!row) {
    throw new Error('row not found')
  }
  const doneItem = dbToDone(row)
  await updateFn(row, doneItem).save()
}

export const getRowsByUserIdentifier = async (userIdentifier: string) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  return rows.filter((item) => dbToDone(item).userIdentifier === userIdentifier.toString().toLowerCase()).map(dbToDone)
}

export const getRowsByUserAndTttIdentifier = async (userIdentifier: string, tttIdentifier: string) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  return rows
    .filter(
      (item) =>
        dbToDone(item).userIdentifier === userIdentifier.toString().toLowerCase() &&
        dbToDone(item).tttIdentifier === tttIdentifier.toString().toLowerCase(),
    )
    .map(dbToDone)
}
