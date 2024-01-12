import style from './button.module.scss'

/**
 * Enum for button appearances.
 * 
 * @enum {string}
 * @readonly
 * @property {string} primary - Primary button appearance.
 * @property {string} secondary - Secondary button appearance.
 * @property {string} success - Success button appearance.
 * @property {string} info - Info button appearance.
 * @property {string} warn - Warning button appearance.
 * @property {string} danger - Danger button appearance.
 */
export enum BtnAccent {
    /**
     * Primary button appearance.
     * @property {string} primary
    */
    primary = "primary",
    /**
     * Secondary button appearance.
     * @property {string} secondary
    */
    secondary = "secondary",
    /**
     * Success button appearance.
     * @property {string} success
    */
    success = "success",
    /**
     * Info button appearance.
     * @property {string} info
    */
    info = "info",
    /**
     * Warning button appearance.
     * @property {string} warn
    */
    warn = "warn",
    /**
     * Danger button appearance.
     * @property {string} danger
    */
    danger = "danger",
}
/**
 * Enum for button sizes.
 * 
 * @enum {string}
 * @readonly
 * @property {string} small - Small button size.
 * @property {string} normal - Normal/default button size.
 * @property {string} circle - Circular button size.
 * @property {string} chip - Button Chip.
 */
export enum BtnType {
    /**
     * Small button size.
     * @property {string} small
     */
    small = "small",
    /**
     * Normal/default button size.
     * @property {string} normal
     */
    normal = "normal",
    /**
     * Circular button.
     * @property {string} circle
     */
    circle = "circle",
    /**
     * Chip button.
     * @property {string} circle
     */
    chip = "chip"
}
/**
 * Interface for the Button component.
 * 
 * @interface ButtonInterface
 * @property {BtnAccent} [appearance] - The appearance style of the button.
 * @property {BtnType} [type] - The type of the button.
 * @property {React.ReactNode} [children] - The content to be displayed inside the button.
 * @property {boolean} [disabled] - Whether the button should be disabled.
 * @property {number} [tabIndex] - The tab order of the button within the page.
 * @property {() => unknown} [onClick] - The function to be called when the button is clicked.
 * @property {string} [toolTip] - The tooltip text to be displayed when hovering over the button.
 */
interface ButtonInterface {
    /**
     * The appearance style of the button.
     * @property {BtnAccent} [appearance]
    */
    readonly appearance?: BtnAccent
    /**
     * The type of the button.
     * @property {BtnType} [type]
    */
    readonly type?: BtnType
    /**
     * The content to be displayed inside the button.
     * @property {React.ReactNode} [children]
    */
    readonly children?: React.ReactNode
    /**
     * Whether the button should be disabled.
     * @property {boolean} [disabled]
    */
    readonly disabled?: boolean
    /**
     * The tab order of the button within the page.
     * @property {number} [tabIndex]
    */
    readonly tabIndex?: number
    /**
     * The function to be called when the button is clicked.
     * @property {() => unknown} [onClick]
    */
    readonly onClick?: () => unknown
    /**
     * The tooltip text to be displayed when hovering over the button.
     * @property {string} [toolTip]
    */
    readonly toolTip?: string
}
/**
 * Button Component
 * 
 * A customizable button component for use in React applications.
 * 
 * @component
 * @param {string} [props.appearance] - Additional classes: [ primary | secondary | success | info | warn | danger ] to be applied to the button.
 * @param {string} [props.type] - TODO: update this line
 * @param {boolean} [props.disabled] - Whether the button should be disabled.
 * @param {number} [props.tabIndex] - The tab order of the button within the page.
 * @param {function} [props.onClick] - The function to be called when the button is clicked.
 * @param {string} [props.toolTip] - The tooltip text to be displayed when hovering over the button.
 * @returns {JSX.Element} The custom rendered button element.
 * 
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * @example
 * // Button with custom class and click handler
 * <Button appearance={BtnAccent.primary} onClick={() => console.log("Button clicked!")}>Click me</Button>
 * 
 * @example
 * // Disabled button with custom tabIndex
 * <Button disabled tabIndex={-1}>Disabled Button</Button>
 */
export default function Button(props: ButtonInterface) {
    return (
        <button
            disabled={props.disabled}
            tabIndex={props.tabIndex}
            className={`${style.btn} ${style[props.appearance]} ${style[props.type]}}`}
            onClick={props.onClick}
            title={props.toolTip}
        >
            {props.children}
        </button>
    );
}
