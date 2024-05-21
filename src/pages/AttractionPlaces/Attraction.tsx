import { Image, Title, Button, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import Logo from "@/assets/images/logo.png";
import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "react-hook-form-mantine";
import { attractionApi, statesApi, } from "@/services";
import { notifications } from "@mantine/notifications";
import { IAttraction } from "@/types";
import { Rating } from '@smastrom/react-rating'
import { useDisclosure } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

import * as yup from "yup";
interface IFormData {
  country: string;
  state: string;
}

const schema = yup.object().shape({
  country: yup.string().required("Country must be not empty"),
  state: yup.string().required("State must be not empty"),
});

export default function Attraction() {
  const location = useLocation();
  var { state } = location.state || {};
  const [visible, setVisible] = useState(false);
  const [states, setStates] = useState<string[]>()
  const [attractions, setAttractions] = useState<IAttraction[]>()
  const [province, setProvince] = useState<string>()
  const navigate = useNavigate();
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
      state: "",
    },
  });

  useEffect(() => {
    getStates();
    if (state){
      setValue("state", state);
      setValue("country","Vietnam");
      handleSubmit({state: state, country: "Vietnam"});
    }
    state = null;
  }, []);

  const getStates = async () => {
    const res = await statesApi.getStates();
    if (res) {
      console.log(res);
      let statesName = res.map(stateObject => stateObject.state);
      let uniqueArray = statesName.filter((item, index) => statesName.indexOf(item) === index);
      setStates(uniqueArray);
    }
  }

  const handleSubmit = async (data: IFormData) => {  
    setVisible(true)
    console.log("data:", data);
    const res = await attractionApi.getAttractions(data.state);
    console.log(res);
    setAttractions(res.recommendations);
    if (res) {
      
      setProvince(res.state);
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
    setVisible(false);
    console.log("toggle", visible);
  }

  return (
    
    <div className="w-full">
      <LoadingOverlay className="w-full h-[1000px]" visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <div className="mt-4 w-[700px] rounded-lg mx-auto bg-[#C5DDFF]">
        {attractions? <Image src={attractions[0].image} h={350} radius="lg" /> :
          <Image src={Logo} h={350} radius="lg" fit="contain" /> 
         }
      </div>

      <div className="mx-auto mt-4 text-center mb-2">
        <Title order={2} className="text-cyan-400">
          {province? `${province}` : "Attraction places recommendation" }
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
            label="State"
            placeholder="Choose state"
            required
            name="state"
            size="md"
            radius="md"
            allowDeselect
            data={
              states
            }
            searchable
        
            w={"100%"}
            control={control}
          />
          
        </div>       
        <Button className="mx-2" fullWidth mt="xl" radius="sm" size="md" type="submit">
              Request attraction places
        </Button>
      </Form>
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
              </div>
              <Image src={attraction.image} radius="lg"/>
            </div>
          ))}
        </div>
      ) : null}
          
    </div>
  );
}
