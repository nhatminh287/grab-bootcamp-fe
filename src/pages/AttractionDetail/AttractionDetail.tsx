import { Card } from '@/components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { attractionApi } from '@/services';
import { ImageCardProps } from '@/components/Card/Card'
import { IAttractionDetail, IReview, IHotel, IRestaurant } from '@/types';
import { Title, Image,Text, Divider, Flex, Button, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom'
import { Carousel } from '@mantine/carousel';
import { Rating } from '@smastrom/react-rating';
import { IconPencilPlus } from '@tabler/icons-react'

const cardProps = {
    name: "Beautiful Landscape",
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/b4/dd/eb/hue-imperial-city-citadel.jpg?w=1400&h=500&s=1",
    tag: "Nature",
    num_review: 150,
    rating: "4.5",
};


export default function AttractionDetail() {
    const location = useLocation();
  var { data } = location.state || {};
  const navigate = useNavigate();
  const [CardProps, setCardProps] = useState<ImageCardProps>()
  const [attraction, setAttraction] = useState<IAttractionDetail>()
  const [reviews, setReviews] = useState<IReview[]>()
  const [hotels, setHotels] = useState<IHotel[]>();
  const [restaurants, setRestaurants] = useState<IRestaurant[]>();
  useEffect(() => {
    getAttractionDetail();
  }, []);

  const getAttractionDetail = async () => {
    console.log("data:", data);
    const res = await attractionApi.attractionDetail(data);
    if (res) {
        console.log("res:", res);
        const props: ImageCardProps = {
            name: res.attraction.name,
            url:  res.attraction.image,
            tag: res.attraction.tag,
            num_review: res.attraction.num_review,
            rating: res.attraction.rating
        }
        await setCardPropsPromise(props);
        console.log("Card props", CardProps);
        setAttraction(res.attraction);
        setReviews(res.attraction.review);
        setHotels(res.hotel);
        setRestaurants(res.restaurant);
    }
  }

  const setCardPropsPromise = async (props: ImageCardProps) => {
    console.log('props: ', props);
    setCardProps(props);
  }
  const handleAddReview = (name: string) => {
    navigate('/contribute', { state: { data: name }})
  }
    return (
        <div className='w-full pt-6 gap-1'>
            {CardProps? <Card {...CardProps} /> : null}
            <div className='mx-auto w-11/12 pt-2'>
                <Flex className='gap-2'>
                    <Title order={2} className='indent-14'>{`${attraction?.state}, Vietnam`}</Title>
                    {attraction? <Rating
                    
                      style={{ width: 150 }}
                      value={parseFloat(attraction.rating)}
                      readOnly
                    /> : null}
                </Flex>
                <div>
                    <div className='mt-3 indent-2'>
                        <Title order={3}>Hotel</Title>
                    </div>
                    <Divider my="md" />
                    <Carousel
                        withIndicators
                        height={450}
                        slideSize="33.333333%"
                        slideGap="md"
                        loop
                        align="start"
                        slidesToScroll={3}
                    >
                        {
                            hotels? hotels.map(hotel =>
                                <Carousel.Slide>
                                    <Anchor className="hover:opacity-50" href={`https://${hotel.url}`} target="_blank" underline="never">
                                        <Image src={hotel.image} h={350} radius="lg" />
                                        <div className='text-black hover:opacity-50 hover:underline decoration-black'>
                                            <Text fw={500} size="lg">{hotel.name}</Text>
                                        </div>
                                        <Rating
                                            style={{ maxWidth: 120 }}
                                            value={parseFloat(hotel.rating)}
                                            readOnly
                                        />
                                    </Anchor>
                                </Carousel.Slide>
                            ) : null
                        }
                    </Carousel>
                </div>
                <div>
                    <div className='mt-3 indent-2'>
                        <Title order={3}>Restaurant</Title>
                    </div>
                    <Divider my="md" />
                    <Carousel
                        withIndicators
                        height={450}
                        slideSize="33.333333%"
                        slideGap="md"
                        loop
                        align="start"
                        slidesToScroll={3}
                    >
                        {
                            restaurants? restaurants.map(restaurant =>
                                <Carousel.Slide>
                                    <Anchor className="hover:opacity-50" href={`https://${restaurant.url}`} target="_blank" underline="never">
                                        <Image src={restaurant.image} h={350} radius="lg" />
                                        <div className='text-black hover:opacity-50 hover:underline decoration-black'>
                                            <Text fw={500} size="lg">{restaurant.name}</Text>
                                        </div>
                                        <Rating
                                            style={{ maxWidth: 120 }}
                                            value={parseFloat(restaurant.rating)}
                                            readOnly
                                        />
                                    </Anchor>
                                </Carousel.Slide>
                            ) : null
                        }
                    </Carousel>
                </div>
                <div>
                    <div className='flex mt-3 indent-2 justify-between'>
                        <Title order={3}>Review</Title>
                        <div className='mr-2'>
                            <Button onClick={() => handleAddReview(attraction!.name)} leftSection={<IconPencilPlus size={14} />} variant="default">
                                Add review
                            </Button>
                        </div>
                    </div>
                    {
                        reviews ? reviews.map(review => (
                            <div key={review._id} className='gap-1'> {/* Assuming each review has a unique 'id' */}
                                <Divider my="md" />
                                <Flex className='gap-2'>
                                    <Title order={4}>{review.username}</Title>
                                    <Rating
                                        style={{ maxWidth: 100 }}
                                        value={parseFloat(review.rating)}
                                        readOnly
                                    />
                                </Flex>
                                <Title order={4}>{review.title}</Title>
                                <Text size="xs" fs="italic">{review.time}</Text>
                                <Text>{review.content}</Text>
                                
                            </div>
                        )) : null
                    }
                </div>

            </div>
            <div className='w-full h-3'></div>
        </div>
    )
}