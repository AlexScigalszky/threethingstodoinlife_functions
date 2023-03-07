import { GoogleSpreadsheetRow } from 'google-spreadsheet'

// eslint-disable-next-line n/no-missing-import
import { GoogleSpreadsheetValue } from '../models/google_spreadsheet_value'
// eslint-disable-next-line n/no-missing-import
import { Vote } from '../models/vote'
// eslint-disable-next-line n/no-missing-import
import { generateUniqueId } from '../utils/id_generator'

// eslint-disable-next-line n/no-missing-import
import { getTable } from './base'

const getDb = () => getTable(2)

const dbToVote = (item: GoogleSpreadsheetRow): Vote => ({
  identifier: item.identifier,
  userIdentifier: item.userIdentifier,
  tttIdentifier: item.tttIdentifier,
  value: item.value,
  date: item.date,
})

export const getRows = async (): Promise<Vote[]> => {
  const sheet = await getDb()
  const rows = await sheet.getRows()
  return rows.map(dbToVote)
}

export const addRow = async (data: Vote) => {
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

  const row = rows.find((item) => dbToVote(item).identifier === id.toString().toLowerCase())
  if (!row) {
    throw new Error('row not found')
  }
  await row.delete()
}

export const updateById = async (id: string, updateFn: (input: GoogleSpreadsheetRow) => GoogleSpreadsheetRow) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  const row = rows.find((item) => dbToVote(item).identifier === id.toString().toLowerCase())
  if (!row) {
    throw new Error('row not found')
  }
  await updateFn(row).save()
}

export const updateByTttIdentifierUserIdentifier = async (
  tttIdentifier: string,
  userIdentifier: string,
  updateFn: (input: GoogleSpreadsheetRow) => GoogleSpreadsheetRow,
) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  const row = rows.find(
    (item) =>
      dbToVote(item).userIdentifier === userIdentifier.toString().toLowerCase() &&
      dbToVote(item).tttIdentifier === tttIdentifier.toString().toLowerCase(),
  )
  if (!row) {
    throw new Error('row not found')
  }
  await updateFn(row).save()
}

export const getRowsByUserIdentifier = async (userIdentifier: string) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  return rows.filter((item) => dbToVote(item).userIdentifier === userIdentifier.toString().toLowerCase()).map(dbToVote)
}

export const getRowsByUserAndTttIdentifier = async (userIdentifier: string, tttIdentifier: string) => {
  const sheet = await getDb()
  const rows = await sheet.getRows()

  return rows
    .filter(
      (item) =>
        dbToVote(item).userIdentifier === userIdentifier.toString().toLowerCase() &&
        dbToVote(item).tttIdentifier === tttIdentifier.toString().toLowerCase(),
    )
    .map(dbToVote)
}
