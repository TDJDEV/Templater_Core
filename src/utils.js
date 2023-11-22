function regex(string, global){ return new RegExp(`${string}${global ? 'g' : ''}`) }
export function regexWord(word, global){ return regex(`/\b(${word})\b/i`, global) }
// export function regexSubString(word, global){ return regex(`/\b(${word})\b/i`, global) }