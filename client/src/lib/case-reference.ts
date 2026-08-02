const REFERENCE_PATTERN = /^H4P-(20\d{2})-(\d{5})$/;

export function formatCaseReference(year: number, sequence: number) {
  if (!Number.isInteger(year) || year < 2020 || year > 2199) {
    throw new Error("Invalid reference year");
  }
  if (!Number.isInteger(sequence) || sequence < 1 || sequence > 99999) {
    throw new Error("Invalid reference sequence");
  }
  return `H4P-${year}-${sequence.toString().padStart(5, "0")}`;
}

export function normaliseCaseReference(value: string) {
  return value.trim().toUpperCase();
}

export function isCaseReference(value: string) {
  return REFERENCE_PATTERN.test(normaliseCaseReference(value));
}
