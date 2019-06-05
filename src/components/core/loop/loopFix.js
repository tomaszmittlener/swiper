export default function () {
  const swiper = this;
  const {
    params, activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl, realIndex,
  } = swiper;
  let newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;

  const snapTranslate = -snapGrid[activeIndex];
  const diff = snapTranslate - swiper.getTranslate();


  // Fix For Negative Oversliding
  if (activeIndex < loopedSlides) {
    // LOGS
    const { slidesPerGroup, slidesPerView } = swiper.params

    const totalSlides = slides.length - (loopedSlides * 2);
    const totalSlidesItems = slides.length;

    const TEST_PATTERN = totalSlides % slidesPerView === 0

    console.group();

    console.log('slidesPerGroup', slidesPerGroup);
    console.log('slidesPerView', slidesPerView);
    console.log('totalSlides', totalSlides);
    console.log('slides + duplicates', totalSlidesItems);
    console.log('loopedSlides', loopedSlides);
    console.log('TEST_PATTERN', TEST_PATTERN);
    console.groupEnd()


    // FIX for Carousel 1, slidesPerView: 3, slidesPerGroup: 3, slidesAmount: 11
    // newIndex = slides.length - activeIndex - loopedSlides;

    // OLD FIX
    newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
    newIndex += loopedSlides;

    console.group();

    console.log('activeIndex', activeIndex);
    console.log('newIndex', newIndex);

    console.groupEnd()

    const slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }

  } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex >= slides.length - loopedSlides)) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    const slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
}
