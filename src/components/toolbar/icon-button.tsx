import { FunctionComponent, SVGProps, SyntheticEvent } from "react";
import cn from "classnames";

interface Props {
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	color: "blue" | "red";
	onClick: () => void;
}

function IconButton({ onClick, Icon, color }: Props) {
	const classes = cn("icon-button", { "icon-button--red": color === "red", "icon-button--blue": color === "blue" });

	function handleClick(e: SyntheticEvent) {
		e.stopPropagation();
		onClick();
	}

	return (
		<button className={classes} onClick={handleClick} type="button">
			<Icon />
		</button>
	);
}

export default IconButton;
