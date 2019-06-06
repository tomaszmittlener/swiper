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

    // find test condition which covers all broken cases
    const TEST_CONDITION = totalSlides % slidesPerView === 0
    console.group('LOOP FIX (negative)');

    console.group('RECEIVED PROPERTIES');
    console.log('slidesPerGroup', slidesPerGroup);
    console.log('slidesPerView', slidesPerView);
    console.log('totalSlides', totalSlides);
    console.log('slides + duplicates', totalSlidesItems);
    console.log('loopedSlides', loopedSlides);
    console.log('activeIndex', activeIndex);
    console.log('TEST_CONDITION', TEST_CONDITION);
    console.groupEnd()


    // FIX for Carousel 1, slidesPerView: 3, slidesPerGroup: 3, slidesAmount: 11
    // newIndex = slides.length - activeIndex - loopedSlides;

    // OLD FIX
    newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;

    if(totalSlides % slidesPerView === 0) {
      newIndex += loopedSlides;
    } else {
      newIndex += loopedSlides + (slidesPerGroup / slidesPerView) + slidesPerGroup + slidesPerView
    }


    console.group('MODIFIED PROPERTIES');
    console.log('newIndex', newIndex);
    console.groupEnd()

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
