import z from "zod";

const goalSchema = z.object({
    goal: z.string({
        invalid_type_error: 'debe ser un string',
        required_error: 'es requerido'
    })
        .min(1, 'el objetivo no puede estar vacío'),
    frequency: z.number().int().positive('debe ser un número positivo').min(1, 'debe ser mayor a 1').max(99, 'debe ser menor a 99').default(1),
    frequencyUnit: z.enum(['Day', 'Week', 'Month', 'Year']).default('Day'),
    target: z.number().int().positive('debe ser un número positivo').min(1, 'debe ser mayor a 1').max(99, 'debe ser menor a 99').default(1),
    icon: z.string().emoji('debe ser un emoji válido').default('🏃‍♂️'),
    count: z.number().int().min(0).default(0)
});

export function validateGoal(input) {
    return goalSchema.safeParse(input);
}

export function validatePartialGoal(input) {
    return goalSchema.partial().safeParse(input);
}