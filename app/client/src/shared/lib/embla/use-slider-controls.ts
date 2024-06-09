import { useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from "embla-carousel"


export type UseSliderControlsReturnType = {
    isPrevBtnDisabled: boolean
    isNextBtnDisabled: boolean
    triggerScrollPrev: () => void
    triggerScrollNext: () => void
  }


export const useSliderControls = (
    carouselApi: EmblaCarouselType | undefined
  ): UseSliderControlsReturnType => {
    const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true)
    const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true)
  
    const triggerScrollPrev = useCallback(() => {
      if (!carouselApi) return
      carouselApi.scrollPrev()
    }, [carouselApi])
  
    const triggerScrollNext = useCallback(() => {
      if (!carouselApi) return
      carouselApi.scrollNext()
    }, [carouselApi])

    const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
      setIsPrevBtnDisabled(!carouselApi.canScrollPrev())
      setIsNextBtnDisabled(!carouselApi.canScrollNext())
    }, [])
  
    useEffect(() => {
      if (!carouselApi) return
  
      onSelect(carouselApi)
      carouselApi.on('reInit', onSelect).on('select', onSelect)
    }, [carouselApi, onSelect])
  
    return {
      isPrevBtnDisabled,
      isNextBtnDisabled,
      
      triggerScrollPrev,
      triggerScrollNext
    }
  }
  