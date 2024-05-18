import { Image, Title, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import Logo from "@/assets/images/logo.png";
import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "react-hook-form-mantine";
import { citiesApi, } from "@/services";
import { notifications } from "@mantine/notifications";
import { ICitiesNearby } from "@/types";
import Map, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import { IoLocation } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
interface IFormData {
  country: string;
  city: string;
}

const schema = yup.object().shape({
  country: yup.string().required("Country must be not empty"),
  city: yup.string().required("City must be not empty"),
});

export default function Nearbycities() {
  const navigate = useNavigate();
  const [cities, setCities] = useState<string[]>()
  const [citiesNearby, setCitiesNearby] = useState<ICitiesNearby[]>()
  const {
    control,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      country: "",
      city: "",
    },
  });

  useEffect(() => {
    getCities();

  }, []);

  const getCities = async () => {
    const res = await citiesApi.getCities();
    if (res) {
      console.log(res);
      let citiesName = res.map(cityObject => cityObject.city);
      let uniqueArray = citiesName.filter((item, index) => citiesName.indexOf(item) === index);
      setCities(uniqueArray);
    }
  }

  const handleSubmit = async (data: IFormData) => {
    
    console.log(data);

    const res = await citiesApi.getCitiesNearby(data.city);
    console.log(res);
    setCitiesNearby(res);
    if (res) {
      notifications.show({
        title: 'Success',
        message: 'Success',
        color: 'teal.5',
      });
      reset();

    }
    else {
      notifications.show({
        title: 'Error',
        message: 'Got error, please try again',
        color: 'red.5',
      });
    }
  }

  return (
    <div className="w-full">
      <div className="mt-4 w-[700px] rounded-lg mx-auto bg-[#C5DDFF]">
        <Image src={Logo} h={350} radius="lg" fit="contain" />
      </div>

      <div className="mx-auto mt-4 text-center">
        <Title order={2} className="text-cyan-400">
          Nearby citities recommendation system
        </Title>
      </div>

      <Form 
        control={control}
        onSubmit={e => handleSubmit(e.data)}
        onError={e => console.log(e)}>
        <div className="flex justify-between gap-4 items-end mx-2">
          <Select
            label="Country"
            placeholder="Choose country"
            required
            name="country"
            size="md"
            radius="md"
            allowDeselect
            data={
              ["Vietnam"]
            }
            searchable
            w={"100%"}
            control={control}
          />
          <Select
            label="City"
            placeholder="Choose city"
            required
            name="city"
            size="md"
            radius="md"
            allowDeselect
            data={
              cities
            }
            searchable
        
            w={"100%"}
            control={control}
          />
          
        </div>       
        <Button className="mx-2" fullWidth mt="xl" radius="sm" size="md" type="submit">
              Request nearby cities
        </Button>
      </Form>
      {citiesNearby? (
        <div className="mx-auto mt-2 w-1/2">
          {citiesNearby.map((city, index) => (          
            <div key={index} className="mx-2 mt-2 ">
              <div className="mb-3 cursor-pointer hover:opacity-50" onClick={() => navigate('/attraction',{ state: { state: city.state }})}>
                <Title className="hover:underline" order={3} >{`${index + 1}.${city.city}, ${city.state}`}</Title>
              </div>
              <Map
                mapboxAccessToken="pk.eyJ1IjoiY29uZ3R1YW4wMTA0IiwiYSI6ImNsczF2eXRxYTBmbmcya2xka3B6cGZrMnQifQ.AHAzE7JIHyehx-m1YJbzFg"
                mapLib={import('mapbox-gl')}
                initialViewState={{
                  longitude: city.longitude, 
                  latitude: city.latitude,
                  zoom: 10
                }}
                
                style={{width: 744, height: 595, borderRadius: 10}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
              >
                <FullscreenControl />
                <NavigationControl />
                {city.latitude && city.longitude && (
                  <Marker latitude={city.latitude} longitude={city.longitude}>
                    <IoLocation style={{ color: 'red' }} size={30} />
                  </Marker>
                )}
              </Map>
            </div>
          ))}
        </div>
      ) : null}
          
    </div>
  );
}
