export const schemaKeys = [
    'first_name',
    'last_name',
    'gender',
    'age',
    'acount_name',
    'city',
    'state'

] as const
export const schemaMapping = {
    first_name: "First Name",
    last_name: "Last Name",
    gender: "Gender",
    age: "Age",
    acount_name: "Account Name",
    city: "city",
    state: 'State'
}
export type Schema = Partial<Record<typeof schemaKeys[number], string>>