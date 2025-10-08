import z from "zod";

const goalSchema = z.object({
    goal: z.string({
        invalid_type_error: 'Debe ser un string',
        required_error: 'Es requerido'
    })
        .min(1, 'El objetivo no puede estar vacío'),
    frequency: z.number().int().positive('Debe ser un número positivo').min(1, 'Debe ser mayor a 1').max(99, 'Debe ser menor a 99').default(1),
    frequencyUnit: z.enum(['Day', 'Week', 'Month', 'Year']).default('Day'),
    target: z.number().int().positive('Debe ser un número positivo').min(1, 'Debe ser mayor a 1').max(99, 'Debe ser menor a 99').default(1),
    icon: z.string().emoji('Debe ser un emoji válido').default('🏃‍♂️'),
    count: z.number().int().min(0)
});

export function validateGoal(input) {
    return goalSchema.safeParse(input);
}

export function validatePartialGoal(input) {
    return goalSchema.partial().safeParse(input);
}


const newGoalSchema = z.object({
    goal: z.string({
        invalid_type_error: 'Debe ser un string',
        required_error: 'Es requerido'
    })
        .min(1, 'El objetivo no puede estar vacío'),
    frequency: z.number().int().positive('Debe ser un número positivo').min(1, 'Debe ser mayor a 1').max(99, 'Debe ser menor a 99').default(1),
    frequencyUnit: z.enum(['Day', 'Week', 'Month', 'Year']).default('Day'),
    target: z.number().int().positive('Debe ser un número positivo').min(1, 'Debe ser mayor a 1').max(99, 'Debe ser menor a 99').default(1),
    icon: z.string().emoji('Debe ser un emoji válido').default('🏃‍♂️')
});

export function validateNewGoal(input) {
    return newGoalSchema.safeParse(input);
}