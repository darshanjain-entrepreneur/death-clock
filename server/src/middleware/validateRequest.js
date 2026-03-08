export function validateRequest(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();
      const fieldMessages = Object.values(flattened.fieldErrors).flat().filter(Boolean);
      const message = flattened.formErrors[0] || fieldMessages[0] || 'Invalid request payload.';

      return res.status(400).json({
        message,
        errors: flattened
      });
    }

    req.validatedBody = result.data;
    return next();
  };
}
