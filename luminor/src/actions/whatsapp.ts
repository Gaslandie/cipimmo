export type WhatsAppResult = { message: string } | { error: string; field: string };

// Reject files, duplicate fields and oversized values before preparing a public link.
export function textField(data: FormData, name: string, max: number, required = true) {
    const values = data.getAll(name);
    if (!values.length && !required) return "";
    if (values.length !== 1 || typeof values[0] !== "string" || values[0].length > max) return null;
    const value = values[0].trim();
    return required && !value ? null : value;
}

export function validEmail(value: string) {
    return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
