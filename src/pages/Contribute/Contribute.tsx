import { Grid, Image, Button, Title, Flex } from "@mantine/core";
import Logo from "@/assets/images/logo.png";
import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, TextInput, Textarea } from "react-hook-form-mantine";
import { notifications, } from "@mantine/notifications";
import { contributeApi } from '@/services'
import { useLocation } from "react-router-dom";

import * as yup from "yup";
interface IFormData {
  attraction: string;
  username: string;
  type_trip: string;
  rating: number;
  title: string;
  content: string;
}

const schema = yup.object().shape({
  attraction: yup.string().required("Attraction must not be empty"),
  username: yup.string().required("Username must not be empty"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  type_trip: yup.string().required("Type trip must not be empty"),
  title: yup.string().required("Title must not be empty"),
  content: yup.string().required("Content must not be empty"),
});

export default function Contribute() {
  const location = useLocation();
  var { data } = location.state || {};
  const {
    control,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      attraction: data? data : "",
      username: "",
      rating: 0, 
      type_trip: "",
      title: "",
      content: "",
    },
  });

  const handleSubmit = async (data: IFormData) => {  
   
    console.log("data:", data);
    const res = await contributeApi.postContribute(data);
    console.log(res);

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
    <div className="w-full mt-10">
        
      <Grid className="w-11/12 mx-auto mt-2">
        <div className="w-full text-center">
            <Title order={2} className="text-cyan-400">Write your contribute</Title>
        </div>
        <Grid.Col span={5}>
          <div className="mt-16 ">
              <Image className="bg-[#C5DDFF]" src={Logo} h={350} fit="contain" radius="lg" />
          </div>
        </Grid.Col>
        <Grid.Col span={7}>
          <Form
            control={control}
            onSubmit={e => handleSubmit(e.data)}
            onError={(e) => console.log(e)}
          >
            
              <div className=" mx-2">
                <TextInput
                  label="Attraction"
                  // miw={350}
                  name="attraction"
                  required
                  size="md"
                  mt="sm"
                  radius="md"
                  control={control}
                />
                <TextInput
                  label="Username"
                  // miw={350}
                  name="username"
                  required
                  size="md"
                  mt="sm"
                  radius="md"
                  control={control}
                />
            
              <Grid>
                <Grid.Col span={6}>
                  <Select
                    label="Rating"
                    placeholder="5"
                    required
                    name="rating"
                    size="md"
                    radius="md"
                    allowDeselect
                    data={["1", "2", "3", "4", "5"]}
                    searchable
                    w={"100%"}
                    control={control}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Select
                    label="Who did you go with"
                    placeholder=""
                    required
                    name="type_trip"
                    size="md"
                    radius="md"
                    allowDeselect
                    data={["Business", "Couples", "Family", "Friends", "Solo"]}
                    searchable
                    w={"100%"}
                    control={control}
                  />
                </Grid.Col>
              </Grid>
              <TextInput
                label="Title"
                // miw={350}
                name="title"
                required
                size="md"
                mt="sm"
                radius="md"
                control={control}
              />
              <Textarea
                label="Content"
                name="content"
                mt="sm"
                size="md"
                radius="md"
                rows={3}
                control={control}
              />
            </div>
            <Button
              className="mx-auto"
              fullWidth
              mt="xl"
              radius="sm"
              size="md"
              type="submit"
            >
              Contribute
            </Button>
          </Form>
        </Grid.Col>
      </Grid>
      
    </div>
  );
}
