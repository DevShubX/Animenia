import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"

const SliderSkeleton = () => {

  return (
    <div className="w-full p-5 max-sm:px-2">
                <Swiper
                    className="MySwiper"
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                          slidesPerView: 2,
                          spaceBetween: 20
                        },
                        // when window width is >= 480px
                        480: {
                          slidesPerView: 4,
                          spaceBetween: 30
                        },
                        // when window width is >= 640px
                        640: {
                          slidesPerView: 3,
                          spaceBetween: 40
                        },
                        1500 : {
                            slidesPerView : 5,
                            spaceBetween : 40,
                        }
                      }}
                      >
                    {[...Array(10)].map((item,index) =>(
                            <SwiperSlide key={index}>
                                <Skeleton 
                                    className='flex-shrink-0 relative w-[250px] h-[330px] max-md:w-[180px] max-md:h-[235px] max-sm:w-[170px] max-sm:h-[235px]'    
                                />
                            </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div>

  )
}

export default SliderSkeleton