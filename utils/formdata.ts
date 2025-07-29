export function objectToFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();
  
    Object.entries(obj).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object' && value !== null) {
        // Optional: stringify objects like { foo: 'bar' } or arrays
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
  
    return formData;
  }