import { cx } from 'class-variance-authority'

import { UseSliderControlsReturnType } from 'shared/lib/embla'

import { getSliderControlOptions } from '../../../config/get-slider-control-options'

import styles from './slider-controls.module.css'


interface Props {
    sliderControlsApi: UseSliderControlsReturnType
    mode: 'prev' | 'next'
}


export const SliderControl = ({sliderControlsApi, mode}: Props) => {
    const options = getSliderControlOptions(sliderControlsApi, mode)

    return (
        <button 
            className={cx(styles.control, options.isActive && styles.active)} 
            disabled={options.isDisabled}
            onClick={options.onClick}
        >
            <img src={options.imgSrc} alt={options.imgAlt}/>
        </button>
    )
}