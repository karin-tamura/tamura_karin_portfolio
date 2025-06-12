// src/utils/validation.ts
export function isValidSkillName(name: string): boolean {
  return name.trim().length > 0 && name.length <= 50
}

export function isValidDescription(description: string): boolean {
  return description.trim().length <= 200
}
