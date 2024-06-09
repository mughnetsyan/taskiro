import { UseSliderControlsReturnType } from "shared/lib";

import prevImg from '../assets/single-arrow-left.svg'
import nextImg from '../assets/single-arrow-right.svg'

export type SliderControlsModeType = 'prev' | 'next' 

export function getSliderControlOptions(sliderControlsApi: UseSliderControlsReturnType, mode: SliderControlsModeType) {
    const optionsConfig = {
        prev: {
            isDisabled: sliderControlsApi.isPrevBtnDisabled,
            isActive: !sliderControlsApi.isPrevBtnDisabled,

            imgSrc: prevImg,
            imgAlt: 'To prev slide',

            onClick: () => sliderControlsApi.triggerScrollPrev()
        },
        next: {
            isDisabled: sliderControlsApi.isNextBtnDisabled,
            isActive: !sliderControlsApi.isNextBtnDisabled,

            imgSrc: nextImg,
            imgAlt: 'To next slide',
            
            onClick: () => sliderControlsApi.triggerScrollNext()
        }
    }

    return optionsConfig[mode]
}