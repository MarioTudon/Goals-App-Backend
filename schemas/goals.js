import z from "zod";

const goalSchema = z.object({
    goal: z.string({
        invalid_type_error: 'must be a string',
        required_error: 'is required'
    })
        .min(1, 'cannot be empty'),
    frequency: z.preprocess(
        (val) => Number(val),
        z.number()
            .int()
            .positive('must be a positive number')
            .min(1, 'must be greater than 1')
            .max(99, 'must be greater than 99')
            .default(1)
    ),
    frequencyUnit: z.enum(['Day', 'Week', 'Month', 'Year']).default('Day'),
    target: z.preprocess(
        (val) => Number(val),
        z.number()
            .int()
            .positive('must be a positive number')
            .min(1, 'must be greater than 1')
            .max(99, 'must be greater than 99')
            .default(1)
    ),
    icon: z.string().emoji('must be a valid emoji').default('🏃‍♂️'),
    count: z.number().int().min(0).default(0)
});

export function validateGoal(input) {
    return goalSchema.safeParse(input);
}

export function validatePartialGoal(input) {
    return goalSchema.partial().safeParse(input);
}