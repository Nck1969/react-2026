export const PASSWORD_SPECIAL_CHAR_REGEX =
	/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~-]/;

export const PASSWORD_PATTERN_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
