import { Image, Title, Button, LoadingOverlay, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import Logo from "@/assets/images/logo.png";
import { attractionApi, statesApi, } from "@/services";
import { IAttraction } from "@/types";
import { Rating } from '@smastrom/react-rating'
import { useLocation, useNavigate } from 'react-router-dom';

import * as yup from "yup";

export default function Community() {
  const location = useLocation();
  var { state } = location.state || {};
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [attractions, setAttractions] = useState<IAttraction[]>()


  useEffect(() => {
   getAttractions();
  }, []);

  const getAttractions = async () => {
    const res = await attractionApi.getTopAttractions();
    if (res) {
      console.log(res);
      
      setAttractions(res);
    }
  }

  return (
    
    <div className="w-full">
      <LoadingOverlay className="w-full h-[1000px]" visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <div className="mt-4 w-[700px] rounded-lg mx-auto bg-[#C5DDFF]">
          <Image src={Logo} h={350} radius="lg" fit="contain" />  
      </div>

      <div className="mx-auto mt-4 text-center mb-2">
        <Title order={2} className="text-cyan-400">
           Top attraction places recommendation
        </Title>
      </div>

      
      {attractions? (
        <div className="mx-auto mt-2 w-1/2">
          {attractions.map((attraction, index) => (          
            <div key={index} className="mx-2 mt-2 ">
              <div className="mb-3">
                <div className="mb-3 cursor-pointer hover:opacity-50 hover:underline" onClick={() => navigate('/attraction/detail',{ state: { data: attraction.name }})}>
                  <Title order={3} >{`${index+1}.${attraction.name}`}</Title>
                </div>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={parseFloat(attraction.rating)}
                  readOnly
                />
                <Text size="md" c="gray">{attraction.tag} </Text>
              </div>
              <Image src={attraction.image} radius="lg"/>
            </div>
          ))}
        </div>
      ) : null}
          
    </div>
  );
}
