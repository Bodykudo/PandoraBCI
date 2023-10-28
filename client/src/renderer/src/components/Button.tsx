import { Tooltip } from 'react-tooltip';
import { IconType } from 'react-icons/lib';

interface Props {
  title?: string;
  icon?: IconType;
  clickHandler?: () => void | void;
  size?: 'small' | 'medium';
  tooltipText?: string;
}

export default function Button({
  title,
  icon: Icon,
  clickHandler,
  size = 'medium',
  tooltipText
}: Props) {
  return (
    <button
      className={`bg-transparent hover:bg-blue-500 transition-all duration-200 text-blue-dark font-semibold hover:text-white  border border-blue-500 hover:border-transparent rounded outline-none ${
        size === 'small' ? 'py-1 px-1' : 'py-2 px-4'
      }`}
      onClick={clickHandler}
      data-tooltip-id={`btn_${tooltipText}`}
      data-tooltip-content={tooltipText}
    >
      {title && title}
      {Icon && <Icon size={28} />}
      {tooltipText && <Tooltip id={`btn_${tooltipText}`} className="z-10" />}
    </button>
  );
}
