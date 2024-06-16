import useEmblaCarousel from 'embla-carousel-react'

import { Section } from 'shared/ui'
import { useSliderControls } from 'shared/lib'

import { SliderControl } from './slider-control'
import { carouselOptions } from '../../config'

import styles from './slider.module.css'


interface Props {
    children?: React.ReactNode
}


export const Slider = ({children}: Props) => {
    const [carouselRef, carouselApi] = useEmblaCarousel(carouselOptions)

    const sliderControlsApi = useSliderControls(carouselApi)

    return (
        <Section className={styles.slider} onMouseMove={e => e.stopPropagation()}>
            <div className={styles.sliderControlsGroup}>
                <SliderControl sliderControlsApi={sliderControlsApi} mode='prev'/>
                <SliderControl sliderControlsApi={sliderControlsApi} mode='next'/>
            </div>

            <div className={styles.sliderViewport} ref={carouselRef}>
                <div className={styles.slides}>
                    {children}
                </div>
            </div>
        </Section>
    )
}