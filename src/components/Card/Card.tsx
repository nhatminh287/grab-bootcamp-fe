import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme, Title } from '@mantine/core';
import classes from './ImageCard.module.css';
import { Rating } from '@smastrom/react-rating';

export interface ImageCardProps{
    name: string; 
    url: string;
    tag: string;
    num_review: number;
    rating: string;
}
const ImageCard: React.FC<ImageCardProps> = (props) => {
  const theme = useMantineTheme();
  console.log("props of component:", props);
  return (
    <Card
        
      p="lg"
      shadow="lg"
      className="relative w-[1280px] h-[480px] bg-[#F8F9FA] dark:bg-[#2E2E2E] mx-auto"
      radius="md"
      component="a"
      target="_blank"
    >
      <div
        className="absolute inset-0 bg-cover transition-transform duration-500 ease"
        style={{
          backgroundImage:
          `url(${props.url})`
        }}
      />
      <div className="absolute top-[20%] left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/85" />

      <div className="h-full relative flex flex-col justify-end z-10 text-white">
        <div>
          <Title className="text-white mb-[5px]" order={2}>
            {props.name}
          </Title>

          <Group justify="space-between" gap="xs">
            <Text size="sm" className="text-[#828282]">
              {props.tag}
            </Text>

            <Group gap="lg" className='text-[#828282]'>
              <Center >
              {/* <Rating
                
                  style={{ maxWidth: 180 }}
                  value={parseFloat(props.rating)}
                  readOnly
                /> */}
              </Center>
              <Center>
                <IconMessageCircle
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color="#828282"
                />
                <Text size="sm" className="ml-[7px] text-[#828282]">
                  {props.num_review}
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}

export default ImageCard