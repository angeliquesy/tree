import cn from "classnames";

type ButtonKind = "primary" | "secondary";

interface Props {
	title: string;
	onClick: () => void;
	kind?: ButtonKind;
	className?: string;
}

export default function Button({ className, title, onClick, kind = "primary" }: Props) {
	const classes = cn("button", className, [`button--${kind}`]);

	return (
		<button className={classes} onClick={onClick} type="button">
			{title}
		</button>
	);
}
