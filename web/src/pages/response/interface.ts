export interface DataModel {
    name?: string,
    email?: string,
    phone?: string,
    contract_number?: string,
    role?: string,
    regional?: string,
    observations?: string,
    data_capture?: {
        what: String,
        why: String
    }
}