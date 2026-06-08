import clsx from "clsx";
import { memo } from "react";
import { PASSWORD_SPECIAL_CHAR_REGEX } from "../../constants/passwordSpecialCharacterRegExp.ts";
import classes from "./PasswordStrengthIndicator.module.css";

interface PasswordStrengthIndicatorProps {
	value: string;
}

const PasswordStrengthIndicator = memo<PasswordStrengthIndicatorProps>(
	({ value = "" }) => {
		console.log("value", value);

		return (
			<div className={classes.passwordStrengthIndicator}>
				<div className={classes.passwordStrengthIndicatorRow}>
					<div
						className={clsx(
							classes.indicator,
							value.length >= 8 ? classes.indicatorGreen : classes.indicatorRed,
						)}
					/>
					<span>Min 8 characters</span>
				</div>
				<div className={classes.passwordStrengthIndicatorRow}>
					<span
						className={clsx(
							classes.indicator,
							/[A-Z]/.test(value)
								? classes.indicatorGreen
								: classes.indicatorRed,
						)}
					/>
					<span>1 Uppercase character</span>
				</div>
				<div className={classes.passwordStrengthIndicatorRow}>
					<span
						className={clsx(
							classes.indicator,
							/[a-z]/.test(value)
								? classes.indicatorGreen
								: classes.indicatorRed,
						)}
					/>
					<span>1 Lowercase character</span>
				</div>
				<div className={classes.passwordStrengthIndicatorRow}>
					<span
						className={clsx(
							classes.indicator,
							/\d/.test(value) ? classes.indicatorGreen : classes.indicatorRed,
						)}
					/>
					<span>1 Digit</span>
				</div>
				<div className={classes.passwordStrengthIndicatorRow}>
					<span
						className={clsx(
							classes.indicator,
							PASSWORD_SPECIAL_CHAR_REGEX.test(value)
								? classes.indicatorGreen
								: classes.indicatorRed,
						)}
					/>
					<span>1 Special Character</span>
				</div>
			</div>
		);
	},
);
PasswordStrengthIndicator.displayName = "PasswordStrengthIndicator";

export { PasswordStrengthIndicator };
